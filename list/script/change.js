function displayInfoOnLoad(){
    if(decodeURIComponent(location.search.substring(1)).match("^\\D*$")){
        //CHANGE STUDENT
        var info = decodeURIComponent(location.search.substring(1)).split(" ");
        var surn = info[0];
            //name = info[1],
            //second = info[2];
        bd.transaction(function(tx){
            var str = request.selectFromStudentBySurname.replace(/\?/g, surn);
           tx.executeSql(str, [], displayInfoStudent());
            //
        });
    }
    else {
        var group = group = decodeURIComponent(location.search.substring(1));
        document.getElementById('numGr').value = group;
        bd.transaction(function(tx){
            var str = request.selectStudentFromGroup.replace(/\?/g, group);
            tx.executeSql(str, [], fillFieldYear());
        });
    }
}

function displayInfoStudent(){
    return function(tx, result){
        for(var i = 0; i < result.rows.length; i++) {
            document.getElementById('fam').value = result.rows.item(i)['surname'];
            document.getElementById('first').value = result.rows.item(i)['name'];
            document.getElementById('second').value = result.rows.item(i)['secondname'];
            document.getElementById('numGr').value = result.rows.item(i)['num'];
            var yearIn = result.rows.item(i)['yI'];
            var yearOut = result.rows.item(i)['yO'];
        }
        fillYear(yearIn, yearOut);
    }
}

function fillFieldYear(){
    return function(tx, result){
        for(var i = 0; i < result.rows.length; i++) {
            var yearIn = result.rows.item(i)['yearIn'];
            var yearOut = result.rows.item(i)['yearOut'];
        }
        fillYear(yearIn, yearOut);
    }
}

function fillYear(yearIn, yearOut){
    var yI = document.getElementById('yIn');
    var yO = document.getElementById('yOut');
    for(i = yearIn; i <= yearOut; i++){
        var optYearIn = document.createElement('option');
        var optYearOut = document.createElement('option');
        if(i == yearIn){
            optYearIn.selected = true;
        }
        if(i == yearOut){
            optYearOut.selected = true;
        }
        optYearIn.textContent = i;
        optYearOut.textContent = i;
        yI.appendChild(optYearIn);
        yO.appendChild(optYearOut);
    }
}

function clickYearInNewStudent(year){
    var yI = document.getElementById('yIn');
    var yO = document.getElementById('yOut');
    yO.innerHTML = "";
    var len = yI.length;
    var yearMax = yI.options[len-1].value;
    for(var i = year; i <= yearMax; i++){
        var optYearOut = document.createElement('option');
        if(i == yearMax){
            optYearOut.selected = true;
        }
        optYearOut.textContent = i;
        yO.appendChild(optYearOut);
    }
}

function saveStudent(){
    var surname = document.getElementById('fam').value,
    name = document.getElementById('first').value,
    secondname = document.getElementById('second').value,
    num = document.getElementById('numGr').value,
    yI = +document.getElementById('yIn').value,
    yO = +document.getElementById('yOut').value;
    if(decodeURIComponent(location.search.substring(1)).match("^\\D*$")){
        var info = decodeURIComponent(location.search.substring(1)).split(" ");
        var surn = info[0];
        bd.transaction(function(tx){
            var str = request.deleteDataFromTab.replace(/\?/g, surn);
            tx.executeSql(str);
            tx.executeSql(request.insertStudent, [surname, name, secondname, num, yI, yO], null, null);
        });
        alert("Сохранено...");
    }
    else{
        if(document.getElementById('fam').value === ""){
            alert("Ошибка ввода");
        }
        else{
            bd.transaction(function(tx){
                tx.executeSql(request.createTabStudent);
                tx.executeSql(request.insertStudent, [surname, name, secondname, num, yI, yO], null, null);
                document.getElementById('fam').value = "";
                document.getElementById('first').value = "";
                document.getElementById('second').value = "";
                document.getElementById('numGr').value = "";
                document.getElementById('yIn').value = "";
                document.getElementById('yOut').value = "";
            });
            alert("Сохранено...");
        }
    }
}
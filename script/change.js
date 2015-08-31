var yI = document.getElementById('yIn');
var yO = document.getElementById('yOut');

function displayInfoOnLoad(){
    var inf = decodeURIComponent(location.search.substring(1));
    var ch = inf.split('$');
    if(ch[0] == 'ch'){
        var ID = ch[1];
        //console.log(ID);
        bd.transaction(function(tx){
            var str = request.selectFromStudentByID.replace(/\?/g, ID);
           tx.executeSql(str, [], displayInfoStudent());
        });
    }
    else {
        //var group = decodeURIComponent(location.search.substring(1));
        var group = ch[1];
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
            var gr = result.rows.item(i)['num'];
        }
        bd.transaction(function(tx){
            tx.executeSql(request.selectDataForGr + "\'"+gr+"\'", [], function(tx, result){
                for(var i = 0; i < result.rows.length; i++){
                    yearIn = result.rows.item(i)['yearIn'];
                    yearOut = result.rows.item(i)['yearOut'];
                }
                fillYearCh(yearIn, yearOut);
            });
        });
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
    var i;
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

function fillYearCh(yearIn, yearOut){
    var i;
    var inf = decodeURIComponent(location.search.substring(1));
    var ch = inf.split('$');
        var ID = ch[1];
        //console.log(ID);
        bd.transaction(function(tx){
            var str = request.selectFromStudentByID.replace(/\?/g, ID);
            tx.executeSql(str, [], function(tx, result){
                for(var i = 0; i < result.rows.length; i++) {
                    var yearInStud = result.rows.item(i)['yI'];
                    var yearOutStud = result.rows.item(i)['yO'];
                }
                getYearForChangeStudent(yearIn, yearOut, yearInStud, yearOutStud);
            });
        });

}

function getYearForChangeStudent(yearIn, yearOut, yearInStud, yearOutStud){
    for(i = yearIn; i <= yearOut; i++){
        var optYearIn = document.createElement('option');
        var optYearOut = document.createElement('option');
        if(i == yearInStud){
            optYearIn.selected = true;
        }
        if(i == yearOutStud){
            optYearOut.selected = true;
        }
        optYearIn.textContent = i;
        optYearOut.textContent = i;
        yI.appendChild(optYearIn);
        yO.appendChild(optYearOut);
    }
}

function clickYearInNewStudent(year){
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
function clickYearOutNewStudent(year){
    yI.onchange = null;
}

function saveStudent(){
    var surname = document.getElementById('fam').value,
    name = document.getElementById('first').value,
    secondname = document.getElementById('second').value,
    num = document.getElementById('numGr').value,
    yI = +document.getElementById('yIn').value,
    yO = +document.getElementById('yOut').value;
    var inf = decodeURIComponent(location.search.substring(1));
    //console.log(inf);
    var ch = inf.split('$');
    if(ch[0] == 'ch'){
        var ID = ch[1];
        bd.transaction(function(tx){
            var str = request.deleteDataFromTab.replace(/\?/g, ID);
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
            });
            alert("Сохранено...");
        }
    }
}
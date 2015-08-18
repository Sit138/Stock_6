function displayInfoOnLoad(){
    if(decodeURIComponent(location.search.substring(1)).match("^\\D*$")){
        var info = decodeURIComponent(location.search.substring(1)).split(" ");
        var surn = info[0];
        bd.transaction(function(tx){
           tx.executeSql(request.selectFromStudentBySurname + "\'" + surn+ "\'", [], function(tx, result){
               for(var i = 0; i < result.rows.length; i++) {
                   document.getElementById('fam').value = result.rows.item(i)['surname'];
                   document.getElementById('first').value = result.rows.item(i)['name'];
                   document.getElementById('second').value = result.rows.item(i)['secondname'];
                   document.getElementById('numGr').value = result.rows.item(i)['num'];
                   document.getElementById('yIn').value = result.rows.item(i)['yI'];
                   document.getElementById('yOut').value = result.rows.item(i)['yO'];
               }
           });
        });
    }
    else {
        var group = group = decodeURIComponent(location.search.substring(1));
        document.getElementById('numGr').value = group;
        bd.transaction(function(tx){
           tx.executeSql(request.selectStudentFromGroup + "\'" + group + "\'", [], function(tx, result){
               for(var i = 0; i < result.rows.length; i++) {
                   document.getElementById('yIn').value = result.rows.item(i)['yearIn'];
                   document.getElementById('yOut').value = result.rows.item(i)['yearOut'];
               }
           });
        });
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
            tx.executeSql(request.deleteDataFromTab + "\'" + surn + "\'");
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
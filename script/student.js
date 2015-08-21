var bd = openDatabase("Journal", '0.1', 'Journal students', 20000);
if(!bd) {
    alert("Failed to connect to database");
}

var group, yearIn, yearOut;
group = decodeURIComponent(location.search.substring(1));

function addStudent(text){
    document.location.href = 'new_Student.html?'+text;
}
function showYear(yI, yO){
    var ul = document.getElementById('navYear');
    for(var i = yI; i <= yO; i++){
        var li = document.createElement('li');
        var div = document.createElement('div');
        div.innerHTML = i;
        div.onclick = function(){displayStudents(this.textContent)};
        li.appendChild(div);
        ul.appendChild(li);
    }
}
function getYear(){
    bd.transaction(function(tx){
        var str = request.selectStudentFromGroup.replace(/\?/g, group);
       tx.executeSql(str, [], function(tx, result){
           showYear(result.rows.item(0)['yearIn'], result.rows.item(0)['yearOut']);
           displayStudents(result.rows.item(0)['yearIn']);
       });
    });
}
function displayStudents(year){
    bd.transaction(function(tx){
        var str = request.selectFromStudForGroup.replace(new RegExp('group', 'g'), group);
        var sqlstr = str.replace(/year/g, year);
        tx.executeSql(sqlstr, [], addDivWithGroup(),null);
    });
}

function addDivWithGroup(){
    return function(tx, result){
        var mainDiv = document.getElementById('result');
        mainDiv.innerHTML = "";
        var arr = [];
        for(var i = 0; i < result.rows.length; i++) {
            arr[i] = result.rows.item(i)['surname'] + " " + result.rows.item(i)['name'] + " " + result.rows.item(i)['secondname'];
        }
        arr.sort();
        for(i = 0; i < arr.length; i++){
            var student = document.createElement('div');
            student.innerHTML = arr[i];//result.rows.item(i)['surname'] + " " + result.rows.item(i)['name'] + " " + result.rows.item(i)['secondname'];
            student.className = "group";
            student.id = "st"+i;
            student.onclick = function(){ changeStudent(this.textContent) };
            mainDiv.appendChild(student);
        }

    }
}

function changeStudent(text){
    addStudent(text);
}
function d(){
    bd.transaction(function(tx){
       tx.executeSql(request.deleteTab);
    });
}

function deleteRow(){
    bd.transaction(function(tx){
        tx.executeSql(request.deleteDataFromTab + "\'123\'");
    });
}
deleteRow();
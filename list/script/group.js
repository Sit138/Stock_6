var bd = openDatabase("Journal", '0.1', 'Journal students', 20000);
if(!bd) {
    alert("Failed to connect to database");
}
function saveGroup() {
    var number = document.getElementById('numGr').value,
        yearIn = +document.getElementById('yIn').value,
        yearOut = +document.getElementById('yOut').value;
    bd.transaction(function(tx){
        tx.executeSql(request.createTabGroup);
        tx.executeSql(request.insertGroup, [number, yearIn, yearOut], null, null);
    });
}
function displayGroup(year){
    bd.transaction(function(tx){
        tx.executeSql("SELECT * FROM Groups WHERE yearIn <= " + year + " AND yearOut >= " + year, [], function(tx, result){
            var mainDiv = document.getElementById('result');
            mainDiv.innerHTML = "";
            for(var i = 0; i < result.rows.length; i++) {
                console.log(result.rows.item(i)['number'], result.rows.item(i)['yearIn'], result.rows.item(i)['yearOut']);
                var group = document.createElement('div');
                group.innerHTML = result.rows.item(i)['number'];
                group.className = "group";
                group.id = "gr"+i;
                group.onclick = function(){ displayStudents(this.textContent) };
                mainDiv.appendChild(group);
        }},null);
    });
}
function displayStudents(gr){
    document.location.href = "students_List.html?"+gr;
}
function showYear(){
    var ul = document.getElementById('navYear');
    var nowYear = new Date().getFullYear();
    var i = nowYear;
    for(i; i > nowYear - 10 ; i--){
        var li = document.createElement('li');
        var div = document.createElement('div');
        div.innerHTML = i;
        div.onclick = function(){displayGroup(this.textContent)};
        li.appendChild(div);
        ul.appendChild(li);
    }
}

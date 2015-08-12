/**
 * Created by Alex on 10.08.2015.
 */
var bd = openDatabase("Journal", '0.1', 'Journal students', 20000);
if(!bd) {
    alert("Failed to connect to database");
}
function saveGroup() {
    var number = document.getElementById('numGr').value,
        yearIn = +document.getElementById('yIn').value,
        yearOut = +document.getElementById('yOut').value;
    bd.transaction(function(tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS Groups(number, yearIn, yearOut)");
        tx.executeSql("INSERT INTO Groups (number, yearIn, yearOut) values(?, ?, ?)", [number, yearIn, yearOut], null, null);
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
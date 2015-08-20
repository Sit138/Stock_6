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
        var str = request.selectBetweenYears.replace(/\?/g,   year);//"SELECT * FROM Groups WHERE yearIn <= " + year + " AND yearOut >= " + year
        tx.executeSql(str, [], addGroupAndDisplay(),null);
    });
}

function addGroupAndDisplay() {
    return function (tx, result) {
        var mainDiv = document.getElementById('result');
        mainDiv.innerHTML = "";
        for (var i = 0; i < result.rows.length; i++) {
            console.log(result.rows.item(i)['number'], result.rows.item(i)['yearIn'], result.rows.item(i)['yearOut']);
            var group = document.createElement('div');
            group.innerHTML = result.rows.item(i)['number'];
            group.className = "group";
            group.id = "gr" + i;
            group.onclick = function () {
                displayStudents(this.textContent)
            };
            mainDiv.appendChild(group);
        }
    }
}

function displayStudents(gr){
    document.location.href = "list/students_List.html?"+gr;
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

function loadYearNewGroup(){
    var nowYear = new Date().getFullYear();
    var yI = document.getElementById('yIn');
    var yO = document.getElementById('yOut');
    for(var i = nowYear + 2; i < nowYear + 15; i++){
        var optYearOut = document.createElement('option');
        if(i == nowYear + 5){
            optYearOut.selected = true;
        }
        optYearOut.textContent = i;
        yO.appendChild(optYearOut);
    }
    var yearMin = 1980,
        yearMax = nowYear + 20;
    for(i = yearMin; i < yearMax; i++){
        var opt = document.createElement('option');
        if (i == nowYear){
            opt.selected = true;
        }
        opt.textContent = i;
        yI.appendChild(opt);
    }
}

function clickYearIn(year){
    var yO = document.getElementById('yOut');
    yO.innerHTML = "";
    var yearO = +year + 5,
        yearMin = yearO - 3,
        yearMax = yearO + 10;
    for(var i = yearMin; i < yearMax; i++){
        var opt = document.createElement('option');
        if(i == yearO){
            opt.selected = true;
        }
        opt.textContent = i;
        yO.appendChild(opt);
    }
}
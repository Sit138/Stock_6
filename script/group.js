var bd = openDatabase("Jo", '0.1', 'Journal student', 20000);
if(!bd) {
    alert("Failed to connect to database");
}

function addTab(){
    bd.transaction(function(tx){
        tx.executeSql(request.createTabGroup);
        tx.executeSql(request.createTabStudent);
    });
}

addTab();

function saveGroup() {
    uniqGroup();
}

function uniqGroup(){
    bd.transaction(function(tx){
        tx.executeSql(request.selectData, [], checkUniqGroup(retTrue, save));
    });
}

function checkUniqGroup(busyCB, saveCB){
    return function (tx, result){
        var number = document.getElementById('numGr').value;
        var count = 0;
        for(var i = 0; i < result.rows.length; i++) {
            if(result.rows.item(i)['number'] == number){
                count++;
                busyCB();
                break;
            }
        }
        if(count == 0){
            saveCB();
        }
    };
}

function retTrue(){
    alert("Есть такая группа");
}

function save(){
    var data = getData();
    bd.transaction(function(tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS Groups(number, yearIn, yearOut)");
        tx.executeSql(request.insertGroup, [data.number, data.yearIn, data.yearOut], null, null);
        });
}

function getData(){
    var number,
        yearIn,
        yearOut;
    var result = {
        number: document.getElementById('numGr').value,
        yearIn: +document.getElementById('yIn').value,
        yearOut: +document.getElementById('yOut').value
    };
    return result;
}

function displayGroup(year){
    if(year == 0){
        bd.transaction(function(tx){
            tx.executeSql(request.selectData, [], addAllGroupAndDisplay(),null);
        });
    }
    else{
        bd.transaction(function(tx){
            var str = request.selectBetweenYears.replace(/\?/g,   year);//"SELECT * FROM Groups WHERE yearIn <= " + year + " AND yearOut >= " + year
            tx.executeSql(str, [], addGroupAndDisplay(),null);
        });
    }
}

function addAllGroupAndDisplay(){
    return function (tx, result) {
        var arr = [];
        var mainDiv = document.getElementById('result');
        mainDiv.innerHTML = "";
        for (var i = 0; i < result.rows.length; i++) {
            arr[i] = result.rows.item(i)['number'];
        }
        var res = sortGroup(arr);
        for(i = 0; i < res.length; i++){
            var group = document.createElement('div');
            group.innerHTML = res[i];
            group.className = "group";
            group.id = "gr" + i;
            group.onclick = function () {
                displayStudentsForAll(this.textContent)
            };
            mainDiv.appendChild(group);
        }
    }
}

function addGroupAndDisplay() {
    return function (tx, result) {
        var arr = [];
        var mainDiv = document.getElementById('result');
        mainDiv.innerHTML = "";
        for (var i = 0; i < result.rows.length; i++) {
            arr[i] = result.rows.item(i)['number'];
        }
        var res = sortGroup(arr);
        for(i = 0; i < res.length; i++){
            var group = document.createElement('div');
            group.innerHTML = res[i];
            group.className = "group";
            group.id = "gr" + i;
            group.onclick = function () {
                displayStudents(this.textContent)
            };
            mainDiv.appendChild(group);
        }
    }
}

function sortGroup(arr){
    var rg = /(\d*)([A-Za-zА-Яа-я_]*)/i;
    var result = [];
    var i;
    for(i = 0; i < arr.length; i++){
        result[i] = rg.exec(arr[i]);
    }
    var num = [];
    for(i = 0; i < result.length; i++){
        if(result[i][2] == "" && result[i].input != ""){
            num.push(result[i].input);
            result.splice(i, 1);
            i--;
        }
    }
    num.sort(onData);
    num.sort(onLength);
    var pgIng = /[A-Za-z]/;
    var eng = [];
    for(i = 0; i < result.length; i++){
        if(!isFinite(result[i][2]) && pgIng.test(result[i][2])){
            eng.push(result[i].input);
            result.splice(i, 1);
            i--;
        }
    }
    eng.sort(onLength);
    var pgRus = /[А-Яа-я]/;
    var rus = [];
    for(i = 0; i < result.length; i++){
        if(!isFinite(result[i][2]) && pgRus.test(result[i][2])){
            rus.push(result[i].input);
            result.splice(i, 1);
            i--;
        }
    }
    rus.sort(onLength);
    var res = num.concat(eng, rus);
    console.log(res);
    return res;
}

function onData(a, b){
    return (a < b) ? -1 : 1;
}

function onLength(a, b){
    if(a.length < b.length){
        return -1;
    }
    if(a.length > b.length){
        return 1;
    }
    return 0;
}

function displayStudents(gr){
        document.location.href = "list/students_List.html?"+gr;
}
function displayStudentsForAll(gr){
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
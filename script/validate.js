function validateFieldAndSave(id, func){
    var form = document.getElementById(id);
    var elem = form.elements,
        count = 0, i = 0,
        regNum = /^[1-9][0-9]{3}$/,
        regName = /^[А-ЯЁ][а-яё]*$/,
        regGr = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;

        if(id == 'newStudent'){
            var key = ['fam', 'first', 'second', 'numGr', 'yIn', 'yOut'],//ключи для регулярок
                regExp = {//объект, котоый хранит все наши регулярки
                    'fam': regName,
                    'first': regName,
                    'second': regName,
                    'numGr': regGr,
                    'yIn': regNum,
                    'yOut': regNum
                };
        }
        else {
            var key = ['numGr', 'yIn', 'yOut'],//ключи для регулярок
                regExp = {//объект, котоый хранит все наши регулярки
                    'numGr': regGr,
                    'yIn': regNum,
                    'yOut': regNum
                };

        }
    console.log(form.elements.length);
    for (i ; key.length > i; i++) {
        console.log(elem[key[i]].parentNode);
        resetError(elem[key[i]].parentNode);
        if (!elem[key[i]].value || !regExp[key[i]].test(elem[key[i]].value)) {
            showError(elem[key[i]].parentNode);
        }
        else {
            count++;
        }
    }
    console.log(count);
    if(count == form.elements.length){
        func();
    }
}

function showError(container) {
    container.className = 'error';
    var msgElem = document.createElement('span');
    msgElem.className = "error";
    msgElem.innerHTML = "*";
    container.appendChild(msgElem);
}

function resetError(container) {
    container.className = '';
    if (container.lastChild.className == "error") {
        container.removeChild(container.lastChild);
    }
}
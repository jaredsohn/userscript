// ==UserScript==
// @name        Founders Online [Fleet cargo]
// @namespace   Founders Online [Fleet cargo]
// @include     http://founders.icedice.org/g.php?m=fleet&a=cargo_fleet&flid=*
// @version     1.1
// ==/UserScript==
//Начало блока данных
var PostBlok = document.getElementById('gamemiddle');
//Всего загружено
var Total = 0;
//Свободно
var MaxCargo = 0;
//Максимальный размер объекта
var MaxObj = 0;
//Внутренний HTML объекта
var Text = PostBlok.innerHTML;
var IndexStart = Text.indexOf('Максимальная масса объекта')+1;
if (IndexStart) {
    //Обрезали лишку
    Text = Text.substr(IndexStart+28);
    IndexStart = Text.indexOf('<br');
    //Максимальная масса объекта
    MaxObj = parseInt(Text.substr(0, IndexStart), 10);
    IndexStart = Text.indexOf('Свободно трюма -');
    Text = Text.substr(IndexStart+17);
    IndexStart = Text.indexOf('<br');
    //Свободно трюма
    MaxCargo = parseInt(Text.substr(0, IndexStart), 10);
    IndexStart = Text.indexOf(':: Доступно для погрузки ::')+1;
    //Проверим, есть ли что грузить вообще :D
    if (IndexStart) {
        var Objects = document.getElementsByTagName('select');
        Text = '';
        for (var i = 0; i < Objects.length; i++) {
            if(Objects[i].name == 'obj') {
        		var Obj = Objects[i].firstChild.nextSibling;
                break;
            }
        }
        IndexStart = 0;
        //Объект TBody
        var ParentObject = Obj.parentNode.parentNode.parentNode.parentNode;
        var CargoTable = ParentObject.parentNode.parentNode;
        //Объект Form
        var ObjForm = ParentObject.parentNode.parentNode;
        //Куда данные надо передовать
        var ObjFormAction = ObjForm.action;
        //Форма не будет ничего никуда передавать
        ObjForm.removeAttribute('action');
        ObjForm.removeAttribute('method');
        //Установим обработчиик
        ObjForm.setAttribute('onsubmit', 'MaxObj(); return false');
        ObjForm.setAttribute('onclick', 'cl(event);');
        //Создадим скрипт для обработки действий формы
        var TextScriptObj = document.createElement('script');
        TextScriptObj.type = 'text/javascript';
        //Текст скрипта
        var TextScript;
        TextScript = 'var submit;\n';
        TextScript+= 'function cl(event) {\n';  //Эта хитрая процедура записывает в переменную submit, какая кнопка была нажата
        TextScript+= '    if (event.target) submit = event.target; else submit = event.srcElement;\n';
        TextScript+= '}\n';
        TextScript+= '\n';
        TextScript+= 'function MaxObj() {\n';                       //Тут будем считать сколько чего нам мона погрузить
        TextScript+= '    var Id = submit.name.substr(3);\n';       //Индекс элемента
        TextScript+= '    var ObjName = \'obj\'+Id;\n';             //Имя поля "Количество"
        TextScript+= '    var ObjMas = \'objMas\'+Id;\n';           //Имя поля "Масса 1 объекта"
        TextScript+= '    var ObjTotal = \'objTotal\'+Id;\n';       //Имя поля "Доступно объектов"
        TextScript+= '    var ObjMasTotal = \'objTotalMas\'+Id;\n';//Имя поля "Общая масса загруженных объектов"
        TextScript+= '    var valueElement = document.getElementById(ObjName);\n';  //Ссылка на поле "Количество"
        TextScript+= '    var linkMas = document.getElementById(ObjMas);\n';    //Ссылка на поле "Масса 1 объекта"
        TextScript+= '    var valueMas = parseInt(linkMas.value,10);\n';        //Масса 1 объекта
        TextScript+= '    var linkTotal = document.getElementById(ObjTotal);\n';//Ссылка на поле "Доступно объектов"
        TextScript+= '    var valueTotal = parseInt(linkTotal.value,10);\n';    //"Доступно объектов"
        TextScript+= '    var linkFree = document.getElementById("objFreeCargo");\n';   //Ссылка на поле "Свободно трюма"
        TextScript+= '    var valueFree = parseInt(linkFree.value,10);\n';              //Свободно трюма
        TextScript+= '    var linkMasTotal = document.getElementById(ObjMasTotal);\n';  //Ссылка на поле "Масса загруженных объектов"
        TextScript+= '    var valueMasTotal = parseInt(linkMasTotal.value,10);\n';      //Масса загруженных объектов
        TextScript+= '    var linkObjTotal = document.getElementById("objTotal");\n';   //Ссылка на поле "Занято трюма"
        TextScript+= '    var valueObjTotal = parseInt(linkObjTotal.value,10);\n';      //Занято трюма
        TextScript+= '    valueFree = valueFree + valueMasTotal;\n';    //Освободим место от текущего хлама
        TextScript+= '    var cnt = Math.floor(valueFree/valueMas);\n'; //Количество объектов, которое можно загрузить
        TextScript+= '    linkObjTotal.value = valueObjTotal + cnt*valueMas - valueMasTotal;\n';   //Вычислим сколько всего загрузили
        TextScript+= '    if (cnt > valueTotal) {\n';   //Загрузить можно не больше того количества, что доступно на складе
        TextScript+= '        cnt = valueTotal;\n';
        TextScript+= '    }\n';
        TextScript+= '    ';
        TextScript+= '    valueElement.value = cnt;\n';     //Установим в поле вычисленное количество
        TextScript+= '    linkFree.value = valueFree - cnt*valueMas;\n'; //Вычислим сколько трюма осталось свободно
        TextScript+= '    linkObjTotal.value = valueObjTotal + cnt*valueMas - valueMasTotal;\n';   //Вычислим сколько всего загрузили
        TextScript+= '    linkMasTotal.value = cnt*valueMas;\n';    //Масса загруженных объектов
        TextScript+= '    return false;\n';                 //Ничего никуда отправлять не надо!
        TextScript+= '}\n';
        //Текст скрипта
        TextScriptObj.innerHTML = TextScript;
        //Добавим скрипт перед формочкой
        ObjForm.parentNode.insertBefore(TextScriptObj, ObjForm);
        //Заменим HTML код внутри блока таблицы на нашу табличку
        Text = '<tr align="center"><td width="100%" colspan="5"><b>:: Доступно для погрузки ::</b></td></tr><tr><td>Объект</td><td>Доступно</td><td>Масса 1 шт</td><td>Загрузить</td><td>Масса</td></tr>';
  		ParentObject.innerHTML = Text;
        var SubTxt = '';
        var RecTotal = '';
        var RecCaption = '';
        var RecMas = 0;
        var ObjLastIdx;
        //Пройдем по всем доступным для загрузки объектам
        while (Obj!=undefined) {
		//Получим текст объекта
            SubTxt = Obj.textContent;
            IndexStart = SubTxt.indexOf('(');
            //Выделим его название
            RecCaption = SubTxt.substr(0, SubTxt.indexOf('('));
            //TxtRec = '<tr><td align=left>'+SubTxt.substr(0, SubTxt.indexOf('('))+'</td>';
            //В скобках сначало идет количество
            SubTxt = SubTxt.substr(IndexStart+1);
            IndexStart = SubTxt.indexOf(' ');
            RecTotal = SubTxt.substr(0, IndexStart);
            //TxtRec+= '<td>'+Total+'</td>';
            //Потом масса, после буквы "m"
            IndexStart = SubTxt.indexOf('m');
            SubTxt = SubTxt.substr(IndexStart+1);
            IndexStart = SubTxt.indexOf(')');
            SubTxt = SubTxt.substr(0, IndexStart);
            if (parseInt(SubTxt, 10) <= MaxObj || parseInt(SubTxt, 10) <= MaxCargo) {
                //Если масса не превышает максимально допустимую - отобразим объект
                //Да еще добавим поле для ввода количества :)
                RecMas = SubTxt;
                //Создадим объект - новая строка в табличке
                var NewRow = document.createElement('tr');
                //Создадим объект - новая колонка
                var NewCol1 = document.createElement('td');
                NewCol1.setAttribute('align', 'left');
                //Это первая колонка - запишем сюда наименование объекта
                NewCol1.textContent = RecCaption;
                //Создадим объект - новая колонка
                var NewCol2 = document.createElement('td');
                NewCol2.setAttribute('align', 'center');
                //Это вторая колонка - запишем сюда доступное количество объектов
                NewCol2.textContent = RecTotal;
                //Создадим объект - новая колонка
                var NewCol3 = document.createElement('td');
                NewCol3.setAttribute('align', 'center');
                //Это третья колонка - запишем сюда массу 1 объекта
                NewCol3.textContent = RecMas;
                //Создадим объект - новая колонка
                var NewCol4 = document.createElement('td');
                NewCol4.setAttribute('align', 'center');
                //Это четвертая колонка - здесь будем воодить количество для загрузки
                //Для начала добавим несколько скрытых полей - нужны для расчета в скрипте
                //Это поле массы 1 объекта
                var NewInputMas = document.createElement('input');
                NewInputMas.setAttribute('id', 'objMas'+Obj.value);
                NewInputMas.setAttribute('type', 'hidden');
                NewInputMas.setAttribute('value', RecMas);
                //Это поле доступного числа объектов
                var NewInputTotal = document.createElement('input');
                NewInputTotal.setAttribute('id', 'objTotal'+Obj.value);
                NewInputTotal.setAttribute('type', 'hidden');
                NewInputTotal.setAttribute('value', RecTotal);
                //Это поле сколько грузить - туда можно вводить данные
                var NewInput = document.createElement('input');
                NewInput.setAttribute('id', 'obj'+Obj.value);
                NewInput.setAttribute('size', '5');
                NewInput.setAttribute('maxlength', '6');
                //Напишем скрипт для обработки изменения значения поля
                TextScript = 'var TotalMas = parseInt(objTotalMas'+Obj.value+'.value, 10); ';   //Уже загружено было (масса)
                TextScript+= 'var NewMas = '+RecMas+'*parseInt(obj'+Obj.value+'.value,10); ';   //Скока будет весить
                TextScript+= 'if(isNaN(NewMas)) NewMas = 0; ';                                  //Если ввели чего-то не того - будет 0
                TextScript+= 'objTotal.value = parseInt(objTotal.value, 10) - TotalMas + NewMas; '; //Пересчет общей массы
                TextScript+= 'objFreeCargo.value = parseInt(objFreeCargo.value, 10) + TotalMas - NewMas; '; //Пересчет свободного места
                TextScript+= 'if(objFreeCargo.value < 0) alert("Перегруз!"); ';                 //Если вышли за лимиты грязно ругаемся
                TextScript+= 'objTotalMas'+Obj.value+'.value = NewMas;';                        //Обновим массу объектов
                //Установим скрипт
                NewInput.setAttribute('onchange', 'javascript: '+TextScript);
                //Добавим кнопочку для вычисления максимального количества объектов, чтобы загрузить мона было
                var NewButton = document.createElement('input');
                NewButton.setAttribute('type', 'submit');
                NewButton.setAttribute('value', 'Макс');
                NewButton.setAttribute('name', 'btn'+Obj.value);
                //Собираем 4-й столбец
                NewCol4.appendChild(NewInputTotal);
                NewCol4.appendChild(NewInputMas);
                NewCol4.appendChild(NewInput);
                NewCol4.appendChild(NewButton);
                //Новая колонка
                var NewCol5 = document.createElement('td');
                //Это 5-я колонка здесь будет содержаться масса загруженного числа объектов
                NewCol5.setAttribute('align', 'center');
                //Собственно поле для хранения массы
                var NewInput = document.createElement('input');
                NewInput.setAttribute('id', 'objTotalMas'+Obj.value);
                NewInput.setAttribute('size', '5');
                NewInput.setAttribute('value', '0');
                //Менять низя!
                NewInput.setAttribute('disabled', true);
                NewCol5.appendChild(NewInput);
                //Собираем строку
                NewRow.appendChild(NewCol1);
                NewRow.appendChild(NewCol2);
                NewRow.appendChild(NewCol3);
                NewRow.appendChild(NewCol4);
                NewRow.appendChild(NewCol5);
                //Добавим ее к табличке
                ParentObject.appendChild(NewRow);
                //Индекс последнего объекта
                ObjLastIdx = Obj.value;
            }
            Obj = Obj.nextSibling;
        }
        //Еще одна строчка - будем тут хранить сколько всего загрузили
        var NewRow = document.createElement('tr');
        var NewCol1 = document.createElement('td');
        NewCol1.setAttribute('align', 'right');
        NewCol1.setAttribute('colspan', '3');
        NewCol1.textContent = 'Всего загружено:';
        var NewCol5 = document.createElement('td');
        NewCol5.setAttribute('align', 'center');
        NewCol5.setAttribute('colspan', '2');
        var NewInput = document.createElement('input');
        NewInput.setAttribute('id', 'objTotal');
        NewInput.setAttribute('value', 0);
        NewInput.setAttribute('disabled', true);
        NewCol5.appendChild(NewInput);
        NewRow.appendChild(NewCol1);
        NewRow.appendChild(NewCol5);
        ParentObject.appendChild(NewRow);
        //Еще одна строчка - будем тут хранить сколько есть места свободного
        var NewRow = document.createElement('tr');
        var NewCol1 = document.createElement('td');
        NewCol1.setAttribute('align', 'right');
        NewCol1.setAttribute('colspan', '3');
        NewCol1.textContent = 'Свободное место:';
        var NewCol5 = document.createElement('td');
        NewCol5.setAttribute('align', 'center');
        NewCol5.setAttribute('colspan', '2');
        var NewInput = document.createElement('input');
        NewInput.setAttribute('id', 'objFreeCargo');
        NewInput.setAttribute('value', MaxCargo);
        NewInput.setAttribute('disabled', true);
        NewCol5.appendChild(NewInput);
        NewRow.appendChild(NewCol1);
        NewRow.appendChild(NewCol5);
        ParentObject.appendChild(NewRow);
        //Так а тут будет скрипт отправки :D
        var TextScriptObj = document.createElement('script');
        TextScriptObj.type = 'text/javascript';
        TextScript = 'function getXmlHttp(){\n';
        TextScript+= '    var xmlhttp;\n';
        TextScript+= '    try {\n';
        TextScript+= '       xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");\n';
        TextScript+= '    } catch (e) {\n';
        TextScript+= '        try {\n';
        TextScript+= '            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");\n';
        TextScript+= '        } catch (E) {\n';
        TextScript+= '            xmlhttp = false;\n';
        TextScript+= '        }\n';
        TextScript+= '    }\n';
        TextScript+= '    if (!xmlhttp && typeof XMLHttpRequest!="undefined") {\n';
        TextScript+= '        xmlhttp = new XMLHttpRequest();\n';
        TextScript+= '    }\n';
        TextScript+= '    return xmlhttp;\n';
        TextScript+= '}\n';
        TextScript+= 'function sendData() {\n';
        TextScript+= '    var xmlhttp = getXmlHttp();\n'; // Создаём объект XMLHTTP
        TextScript+= '    var objLnk;\n';
        TextScript+= '    var objName;\n';
        TextScript+= '    var q;\n';
        TextScript+= '    var SendPostStr;\n';
        TextScript+= '    for (i = 0; i <= '+ObjLastIdx+'; i++) {\n';
        TextScript+= '        objName = "obj"+i;\n';
        TextScript+= '        objLnk = document.getElementById(objName);\n';
        TextScript+= '        if(!(objLnk==null) && typeof objLnk!="undefined") {\n';
        TextScript+= '            q = parseInt(objLnk.value,10);\n';
        TextScript+= '            if(!isNaN(q) && q) {\n';
        TextScript+= '                xmlhttp.open("POST", "'+ObjFormAction+'", false);\n'; // Открываем синхронное соединение
        TextScript+= '                xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");\n';// Отправляем кодировку
        TextScript+= '                SendPostStr = "obj=" + encodeURIComponent(i) + "&q=" + encodeURIComponent(q)+"&u1="+encodeURIComponent("Погрузить");\n';
        TextScript+= '                xmlhttp.send(SendPostStr);\n';       // Отправляем POST-запрос
        TextScript+= '            }\n';
        TextScript+= '        }\n';
        TextScript+= '    }\n';
        TextScript+= '    window.open("'+ObjFormAction+'","_self");\n';
        TextScript+= '}\n';
        TextScriptObj.innerHTML = TextScript;
        var ParentObject = ObjForm.parentNode;
        var ObjForm = ObjForm.nextSibling;
        ParentObject.insertBefore(TextScriptObj, ObjForm);
        var NewPostForm = document.createElement('form');
        NewPostForm.setAttribute('onsubmit', 'sendData(); return false');
        var NewButton = document.createElement('input');
        NewButton.setAttribute('type', 'submit');
        NewButton.setAttribute('value', 'Загрузить');
        NewButton.setAttribute('name', 'load');
        var NewTable = document.createElement('table');
        NewTable.setAttribute('width', 520);
        NewTable.setAttribute('border', 0);
        var NewBody = document.createElement('tbody');
        var NewRow = document.createElement('tr');
        NewRow.setAttribute('align', 'center');
        var NewCol = document.createElement('td');
        NewCol.appendChild(NewButton);
        NewRow.appendChild(NewCol);
        NewBody.appendChild(NewRow);
        NewTable.appendChild(NewBody);
        NewPostForm.appendChild(NewTable);
        ParentObject.insertBefore(NewPostForm, ObjForm);     /**/
		//Кнопка загрузть перед таблицей
        var NewPostForm = document.createElement('form');
        NewPostForm.setAttribute('onsubmit', 'sendData(); return false');
        var NewButton = document.createElement('input');
        NewButton.setAttribute('type', 'submit');
        NewButton.setAttribute('value', 'Загрузить');
        NewButton.setAttribute('name', 'load');
        var NewTable = document.createElement('table');
        NewTable.setAttribute('width', 520);
        NewTable.setAttribute('border', 0);
        var NewBody = document.createElement('tbody');
        var NewRow = document.createElement('tr');
        NewRow.setAttribute('align', 'center');
        var NewCol = document.createElement('td');
        NewCol.appendChild(NewButton);
        NewRow.appendChild(NewCol);
        NewBody.appendChild(NewRow);
        NewTable.appendChild(NewBody);
        NewPostForm.appendChild(NewTable);
        CargoTable.parentNode.insertBefore(NewPostForm, CargoTable);
        //Номер определеим номер флота
        for(i=ObjFormAction.length; i>=0; i--) {
        	if(ObjFormAction[i]=='=') {
        		ObjFormAction = ObjFormAction.substr(i+1);
        		break;
        	}
        }
        //Добавим кнопки для управления кораблями и составления полетника
        //Табличка
        var NewTable = document.createElement('table');
        NewTable.setAttribute('width', 500);
        NewTable.setAttribute('border', 0);
        NewTable.setAttribute('cellspacing', 1);
		//Тело таблицы
        var NewBody = document.createElement('tbody');
        //Строка
        var NewTR = document.createElement('tr');
        NewTR.setAttribute('align', 'center');
        var NewTD = document.createElement('td');
        NewTD.setAttribute('width', '50%');
		var NewFormShips = document.createElement('form');
		NewFormShips.setAttribute('method', 'post');
		NewFormShips.setAttribute('action', 'http://founders.icedice.org/g.php?m=fleet&a=ships_fleet&flid='+ObjFormAction);
		var NewInput = document.createElement('input');
		NewInput.setAttribute('type', 'submit');
		NewInput.setAttribute('value', 'Перейти к управлению кораблями флота');
		NewInput.setAttribute('style', 'width : 230px;');
		NewFormShips.appendChild(NewInput);
		NewTD.appendChild(NewFormShips);
		NewTR.appendChild(NewTD);
		//Начнем собирать 2-й столбец
        var NewTD = document.createElement('td');
        NewTD.setAttribute('width', '50%');
		var NewForm = document.createElement('form');
		NewForm.setAttribute('method', 'post');
		NewForm.setAttribute('action', 'http://founders.icedice.org/g.php?m=fleet&a=orders_fleet&flid='+ObjFormAction);
		var NewInput = document.createElement('input');
		NewInput.setAttribute('type', 'submit');
		NewInput.setAttribute('value', 'Перейти к составлению полетного листа');
		NewInput.setAttribute('style', 'width : 230px;');
		NewForm.appendChild(NewInput);
		NewTD.appendChild(NewForm);
		NewTR.appendChild(NewTD);
		NewBody.appendChild(NewTR);
		NewTable.appendChild(NewBody);
        CargoTable.parentNode.insertBefore(NewTable, CargoTable);
   }
}

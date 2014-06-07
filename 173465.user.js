// ==UserScript==
// @name       Market tools
// @namespace  http://founders.icedice.org/g.php?m=market&s=3
// @version    1.0
// @description  Скрипт для ставок
// @match      http://founders.icedice.org/g.php?m=market&s=3*
// @copyright  LostAngel
// ==/UserScript==
 
//Заголовок
var Head = document.getElementsByTagName('head')[0];
//Объект для выбора элемента ставки
var Select = document.getElementsByTagName('select');
//Объект скрипт
var TextScriptObj = document.createElement('script');
//Родитель компонента
var Parent;
var Input = document.getElementsByTagName('input');
var i, NewScriptText;
	for(i=0; i < Select.length; i++) {
        if(Select[i].name=='obj') {
            Select = Select[i];
            break;
        }
    }
	for(i=0; i < Input.length; i++) {
        if(Input[i].name=='q') {
            Input = Input[i];
            break;
        }
    }
	NewScriptText = '';
	NewScriptText+= 'function getXmlHttp(){\n';//Функция возвращает объект для загрузки других страничек
	NewScriptText+= '    var xmlhttp;\n';
	NewScriptText+= '    try {\n';
	NewScriptText+= '       xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");\n';
	NewScriptText+= '    } catch (e) {\n';
	NewScriptText+= '        try {\n';
	NewScriptText+= '            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");\n';
	NewScriptText+= '        } catch (E) {\n';
	NewScriptText+= '            xmlhttp = false;\n';
	NewScriptText+= '        }\n';
	NewScriptText+= '    }\n';
	NewScriptText+= '    if (!xmlhttp && typeof XMLHttpRequest!="undefined") {\n';
	NewScriptText+= '        xmlhttp = new XMLHttpRequest();\n';
	NewScriptText+= '    }\n';
	NewScriptText+= '    return xmlhttp;\n';
	NewScriptText+= '}\n';
	NewScriptText+= 'var httpRequester = false;\n';					//Переменная хранит объект для AJAX запроса
	NewScriptText+= 'var couldProcess = false;\n';			//Флаг того, что обрабатывается текущий запрос
	NewScriptText+= 'var PriceCost = 0;\n';					//Рыночная цена за единицу
	NewScriptText+= 'var BuildCost = 0;\n';					//Себестоимость
	NewScriptText+= 'function OnObjChange(obj) {\n';		//Функция для запроса данных
	NewScriptText+= '	if (!httpRequester) {httpRequester = getXmlHttp();}\n';
    NewScriptText+= '	if (!couldProcess && httpRequester && (obj >= 0)) {\n';//http://founders.icedice.org/g.php?m=tech&a=obj&id=0
    NewScriptText+= '		httpRequester.open("GET", "http://founders.icedice.org/g.php?m=tech&a=obj&id="+obj, true);\n';
    NewScriptText+= '		httpRequester.onreadystatechange = processResponse;\n';
    NewScriptText+= '		couldProcess = true;\n';
    NewScriptText+= '		httpRequester.send(null);\n';
    NewScriptText+= '	}\n';
    NewScriptText+= '}\n';
	NewScriptText+= 'function processResponse() {\n';				//Обработка результатов запроса
	NewScriptText+= '	if ( httpRequester.readyState == 4) {\n';	//Загрузка завершена
    NewScriptText+= '		couldProcess = false;\n';				//Поставим флаг, что можно загружать еще
	NewScriptText+= '		if (httpRequester.status == 200) {\n';	//Ответ положительный
	NewScriptText+= '        	Answer = httpRequester.responseText;\n';	//Получим ответ сервера
	NewScriptText+= '        	Answer = Answer.substr(Answer.indexOf("Рыночная цена за единицу:")+30);\n';	//Найдем среднерыночную цену
	NewScriptText+= '        	PriceCost = parseFloat(Answer.substr(0, Answer.indexOf("<br")), 10);\n';
	NewScriptText+= '        	if (isNaN(PriceCost)) { PriceCost = 0; }\n';	//Если отсутсвует - товар не продается может быть - будет 0
	NewScriptText+= '        	Answer = Answer.substr(Answer.indexOf("Себестоимость единицы:")+27);\n';	//Найдем себестоимость производства
	NewScriptText+= '			BuildCost = parseFloat(Answer, 10);\n';
	NewScriptText+= '        	if (isNaN(BuildCost)) { BuildCost = 0; }\n';	//Если отсутсвует товар производить нельзя
	NewScriptText+= '			onEditChange();\n';					//Добавим цену и стоимость
	NewScriptText+= '    	}\n';
    NewScriptText+= '	}\n';
    NewScriptText+= '}\n';
	NewScriptText+= 'function onEditChange() {\n';				//Цена и стоимость
	NewScriptText+= '			Select = document.getElementsByTagName("select");\n';	//Найдем выпадающий список
	NewScriptText+= '			for(i=0; i < Select.length; i++) {\n';
	NewScriptText+= '       		if(Select[i].name=="obj") {\n';
	NewScriptText+= '           		Select = Select[i];\n';
	NewScriptText+= '            		break;\n';
	NewScriptText+= '        		}\n';
	NewScriptText+= '        	}\n';
	NewScriptText+= '			Pteg = document.createElement("p");\n';			//Создадим новый тег - абзац, 
	NewScriptText+= '			Pteg.innerHTML = "<b>Рыночная цена за единицу:</b> "+PriceCost;\n';	//в который запишем цены
	NewScriptText+= '			Pteg.innerHTML+= " IGC<br><b>Себестоимость единицы:</b> "+BuildCost+" IGC";\n';
	NewScriptText+= '			if (Select.parentNode.children.length > 1) {\n';	//Если цены уже добавляли 
	NewScriptText+= '				Select.parentNode.removeChild(Select.parentNode.lastChild);\n';	//удалим их
	NewScriptText+= '    		}\n';
	NewScriptText+= '			Select.parentNode.appendChild(Pteg);\n';		//Добавим тег с ценами под выпадающий список
	NewScriptText+= '			Input = document.getElementsByTagName("input");\n';	//Найдем поле ввода
	NewScriptText+= '			QInput = false; PInput = false;\n';
	NewScriptText+= '			for(i=0; i < Input.length; i++) {\n';
	NewScriptText+= '       		if(Input[i].name=="q") {\n';
	NewScriptText+= '           		QInput = Input[i];\n';
	NewScriptText+= '        		}\n';
	NewScriptText+= '       		if(Input[i].name=="price") {\n';
	NewScriptText+= '           		PInput = Input[i];\n';
	NewScriptText+= '        		}\n';
	NewScriptText+= '        	}\n';
	NewScriptText+= '    		Q = parseInt(QInput.value, 10);\n';
	NewScriptText+= '        	if (isNaN(Q)) { Q = 0; }\n';	//Если отсутсвует количество - будет 0
	NewScriptText+= '			if (PInput.parentNode.children.length > 3) {\n';	//Если суммы уже добавляли 
	NewScriptText+= '				PInput.parentNode.removeChild(PInput.parentNode.lastChild);\n';	//удалим их
	NewScriptText+= '    		}\n';
	NewScriptText+= '			Pteg = document.createElement("p");\n';			//Создадим новый тег - абзац, 
	NewScriptText+= '			Pteg.innerHTML = "<b>Рыночная:</b> "+Math.round(PriceCost*Q);\n';	//в который запишем суммы
	NewScriptText+= '			Pteg.innerHTML+= " IGC<br><b>Себестоимость:</b> "+Math.round(BuildCost*Q)+" IGC";\n';
	NewScriptText+= '			PInput.parentNode.appendChild(Pteg);\n';		//Добавим тег с суммами
    NewScriptText+= '}\n';
	TextScriptObj.type = 'text/javascript';
	//Текст скрипта
	TextScriptObj.innerHTML = NewScriptText;
	Select.setAttribute('onchange', 'OnObjChange(this.value)');
	Input.setAttribute('onchange', 'onEditChange()');
	Head.appendChild(TextScriptObj);

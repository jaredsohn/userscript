// ==UserScript==
// @name Superfilter
// @version 0.10
// @author gera_b
// @description Filter enhancements in provision
// @include http://fotomag.com.ua/admin/index.php?action=orders*provision*
// @match http://fotomag.com.ua/admin/index.php?action=orders*provision*
// ==/UserScript==

/* установка значений в куку в value нужно передать один или несколько параметров одной строкой */
function setCookie(name, value, expires, path, domain, secure) {
	if (!name || !value) return false;
	var str = name + '=' + encodeURIComponent(value);
	
	if (expires) str += '; expires=' + expires;
	if (path)    str += '; path=' + path;
	if (domain)  str += '; domain=' + domain;
	if (secure)  str += '; secure';
	
	document.cookie = str;
	return true;
}
/* получение всех значений из именованой куки */
function getCookie(name) {
	var pattern = "(?:; )?" + name + "=([^;]*);?";
	var regexp  = new RegExp(pattern);
	
	if (regexp.test(document.cookie))
	return decodeURIComponent(RegExp["$1"]);
	
	return false;
}
/* удаление куки */
function deleteCookie(name, path, domain) {
	setCookie(name, null, new Date(0), path, domain);
	return true;
}

// здесь начинается работа с настройками
var cookieFileName = 'superfiler';

// функция устанавливает в глобальный объект опции из superfiler
function setSettings(sts){
	for (val in sts){
		eval(val + "=" + sts[val] + ";");
	}
}
// функция для получения значения, указываем имя куки
// получить содержимое куки строкой
// записать пару имя значение в массив
// создать объект settingsObj и присвоить его аттрибутам  с именами свойств куки их значения
function getCookieParameters(csn){
		settingsObj = new Object();
		var cookieSettings = getCookie(csn); 
		var tempSetArr = cookieSettings.split(';');	
			for (val in tempSetArr){
					if(typeof tempSetArr[val].substring(0,tempSetArr[val].indexOf('=')) == 'string' && tempSetArr[val].substring(0,tempSetArr[val].indexOf('=')).length > 0){
						var objProp = "."+tempSetArr[val].substring(0,tempSetArr[val].indexOf('='));
						eval("settingsObj"+objProp+"="+"'"+tempSetArr[val].substring(tempSetArr[val].indexOf('=')+1)+"'"+";")
					}
			}
}
// подготовка и запись параметров в куки
function prepareCokieSettings(sts){
		var str = '';
		for (val in sts){
			str = str.concat(val + "=" + sts[val] + ";")
		}
		return str;
}
// если куки отсутствует установить из обьекта с умолчаниями и создать новый
if (getCookie(cookieFileName)){
	getCookieParameters(cookieFileName);
	setSettings(settingsObj);
}
/* else{
	setSettings(defaultSettings);
	var str = prepareCokieSettings(defaultSettings);
	setCookie(cookieFileName,str,'Mon, 01-Jan-2030 00:00:00 GMT');
}	 */						

var superGroups = new Array("Компьютеры",				// 0 ПАША
							"Мониторы",					// 1 ПАША
							"Носители информации",		// 2 СЕРЖ
							"Комплектующие",			// 3 ВИТАЛИК + ЛЁША
							"Манипуляторы",				// 4 АНДРЕЙ Г
							"Мультимедиа",				// 5 АНДРЕЙ Г
							"Системы энергопитания",	// 6 ПАША
							"Сетевое оборудование",		// 7 ВЛАД
							"Оргтехника и периферия",	// 8 АНДРЕЙ Г, ЖЕНЯ
							"Программное обеспечение",	// 9 ЖЕНЯ
							"Расходные материалы",		// 10 АНДРЕЙ Г, ЖЕНЯ
							"Серверное оборудование",	// 11 ДИМА
							"Кабель/шлейф/переходник",	// 12 ДИМА
							"Фильмы",
							"Аудиокниги",
							"Музыка",					// 15
							"Телефония",
							"Портативное аудио",
							"Проекторы",				// 18 ПАША
							"Игровые приставки",
							"Игры",						// 20
							"Бизнес книги",
							"Медиацентры",				// 22 АНДРЕЙ
                            "Фото-аксессуары"           // 23 СЕРГЕЙ
							);
// статус отображения фильтра как класс css							
var fieldsetStatus = "";							
// получаем строку-список групп и отдельно указанных товаров в группах менеджера
function getDescription(holder)
{
    var returnString = "";
	if (holder && typeof holder == 'object')
	{	
		for (key in holder)
		{
			if (holder[key][0] && typeof holder[key] == 'object')
			{
				for (downKey in holder[key])
				{
					if (lowerGroups[holder[key][0]][holder[key][downKey]])
					{
						if (downKey != "0")
						{
                            returnString += lowerGroups[holder[key][0]][holder[key][downKey]];
							
							if (downKey < holder[key].length - 1)
							{
								returnString += ", ";
							}
						}
						else
						{
						    returnString += superGroups[holder[key][0]];
					        if (downKey < holder[key].length - 1)
							{
								returnString += ": ";
							}
						}
                    }
				}
			}
			else
			{
                returnString += superGroups[holder[key]];
                if (key < holder.length - 1)
                {
                    returnString += ", ";
                }
			}
		}
	return returnString;	
	}
return false;	
}

// храним массив как глобал объект чтобы можно было суммировать несколько категорий

function getFullList(holder)
{
	if (holder)
	{
	var returnArray = new Array();
		for (key in holder)
		{
			if (holder[key][0] && typeof holder[key][1] == 'object')
			{
				for (i=1; i<holder[key].length; i++)
				{
				    returnArray.push(lowerGroups[holder[key][0]][holder[key][i]]);
				}
			}
			else
			{
				for (i=0; i<lowerGroups[holder[key]].length; i++)
				{
					returnArray.push(lowerGroups[holder[key]][i]);
				}
			}
		}
	return returnArray;	
	}
return false;
}

function runFilter(groups)
{
	if (typeof groups == 'object')
	{
		for (key in groups)
		{
			var returnArray = getFullList(window[groups[key]]);
			rowsProcessing(returnArray);
		}
	}
	returnArray = "";
}

function rowsProcessing(list)
{
	if (typeof list == 'object')
	{
		for (i=1; i<document.getElementsByClassName('grid')[0].children[0].children.length; i++)
		{
			for (y=0; y<list.length; y++)
			{
				if (document.getElementsByClassName('grid')[0].children[0].children[i].children[3].childNodes[1].textContent.indexOf(list[y]) == -1 && (y == list.length - 1))
				{
					document.getElementsByClassName('grid')[0].children[0].children[i].setAttribute('class','hide');
				}
				if (document.getElementsByClassName('grid')[0].children[0].children[i].children[3].childNodes[1].textContent.indexOf(list[y]) != -1)
				{
					break;
				}
				else
				{
				    continue;
				}
			}
		}
	}
}

var groupsPasha = new Array("0","1","6","18");
var groupsSerg = new Array("2","23");
var groupsAndrew = new Array("4","5","22",["8",["1"],["2"],["3"]],["10",["0"],["1"],["2"],["3"]]);
var groupsVlad = new Array("7");
var groupsPetrenko = new Array("9",["8",["0"],["4"],["5"],["6"],["7"],["8"],["9"],["10"],["11"],["12"]],["10",["4"],["5"],["6"],["7"]]);
var groupsDima = new Array("11","12");
var groupsVetal = new Array(["3",["2"],["3"],["4"],["5"],["8"],["12"]]);
var groupsLesha = new Array(["3",["0"],["1"],["6"],["7"],["9"],["10"],["11"]]);

var lowerGroups = new Array();

lowerGroups[0] = new Array("Сборка","Готовый ПК","Конфигуратор ПК","Неттоп","Сервер","Тонкий клиент");
lowerGroups[1] = new Array("Монитор");
lowerGroups[2] = new Array("Карта памяти","USB Flash накопитель","Видеокассета","Диски","CD холдер","Батарейки","Фотопленка","Внешний диск");
lowerGroups[3] = new Array("Материнская плата","Процессор","Жесткий диск","Карман для жестких дисков","Оптический привод","Видеокарта","Звуковая карта","Модуль памяти","Корпус","Система охлаждения","Блок питания","Контроллер","USB Hub");
lowerGroups[4] = new Array("Клавиатура","Мышь","Комплект (клавиатура+мышь)","Коврик","Планшет","Игровой манипулятор");
lowerGroups[5] = new Array("Компьютерная акустика","TV-тюнер","Web-камера");
lowerGroups[6] = new Array('Сетевой фильтр','Источник бесперебойного питания');
lowerGroups[7] = new Array('Wi-Fi и Bluetooth','Маршрутизатор Wi-Fi','Маршрутизаторы/коммутатор','Точка доступа','Модем','Сетевой адаптер','Сетевая карта','Принт-сервер','IP-телефон','VoIP-шлюз');
lowerGroups[8] = new Array('Шредер','МФУ','Принтер','Сканер','Ламинатор','Уничтожитель документов','Брошюровщик','Биндер','Резаки и триммеры','Счетчик банкнот','Степлер','Биговальное оборудование','Нумератор');
lowerGroups[9] = new Array('Операционная система','Офисная программа','Мультимедиа','Антивирусная программа','Переводчики и словари','Утилита','САПР','Бухгалтерия','Распознавание текста','Архиватор','Серверное ПО');
lowerGroups[10] = new Array('Картридж','СНПЧ','Чернила','Бумага для принтера','Пленка для ламинирования','Фольга','Обложки для переплета','Пружины');
lowerGroups[11] = new Array('Серверные платформа','NAS, дисковый массив','Шкаф монтажный');
lowerGroups[12] = new Array('Кабель','Кабель USB','Шлейф (HDD, FDD)','FireWire (IEEE 1394)','Антенный кабель','Кабель питания','Переходник','Переключатель KVM');
lowerGroups[13] = new Array('Кино');
lowerGroups[14] = new Array('Аудиокнига');
lowerGroups[15] = new Array('Audio CD');
lowerGroups[16] = new Array('Радиотелефон','Проводной телефон','Факс','Аксессуар');
lowerGroups[17] = new Array('MP3-плеер','Аксессуар к iPod','Цифровой диктофон','Наушники');
lowerGroups[18] = new Array('Проектор','Проекционный экран','Лампа для проектора','Стойка/кронштейн');
lowerGroups[19] = new Array('Игровая консоль','Игровой манипулятор','Аксессуар к приставкам');
lowerGroups[20] = new Array('Игра');
lowerGroups[21] = new Array('Книга');
lowerGroups[22] = new Array('Медиацентр');
lowerGroups[23] = new Array('Картридер');

var cssDD = document.createElement('style');
    cssDD.setAttribute('type','text/css');
    cssDD.innerHTML = "\/*DL, DT, DD TAGS LIST DATA*\/\
dl {\
	margin-bottom:0px;\
}\
\
dl dt {\
	background:#5f9be3;\
	color:#fff;\
	float:left;\
	font-weight:bold;\
	margin-right:10px;\
	padding:2px;\
	width:200px;\
}\
\
dl dd {\
	margin:2px 0;\
	display:table;\
\
}\
.hide {\
display: none;\
}\
\
.shown {\
display: inline;\
}\
.save {\
 background: #78D696;\
 width: 4em;\
}\
.delt {\
 background: #D97789;\
 width: 4em;\
}\
.run {\
 background: #9E9E9E;\
 width: 4em;\
}";

document.head.appendChild(cssDD);

var fieldset = document.createElement('fieldset');
fieldset.innerHTML = '	<legend><a id="hider" href="#">Фильтрик</a></legend>\
                            <div id="filter" class="'+ fieldsetStatus +'">\
                            <dl><dt><label><input type="checkbox" name="groups" value="groupsAndrew"> 1 Андрей</label></dt><dd>'+ getDescription(groupsAndrew) +'</dd></dl>\
							<dl><dt><label><input type="checkbox" name="groups" value="groupsDima"> 2 Дима</label></dt><dd>'+ getDescription(groupsDima) +'</dd></dl>\
							<dl><dt><label><input type="checkbox" name="groups" value="groupsPasha"> 3 Паша</label></dt><dd>'+ getDescription(groupsPasha) +'</dd></dl>\
							<dl><dt><label><input type="checkbox" name="groups" value="groupsPetrenko"> 4 Женя</label></dt><dd>'+ getDescription(groupsPetrenko) +'</dd></dl>\
							<dl><dt><label><input type="checkbox" name="groups" value="groupsSerg"> 5 Сергей</label></dt><dd>'+ getDescription(groupsSerg) +'</dd></dl>\
                            <dl><dt><label><input type="checkbox" name="groups" value="groupsVlad"> 6 Влад</label></dt><dd>'+ getDescription(groupsVlad) +'</dd></dl>\
                            <dl><dt><label><input type="checkbox" name="groups" value="groupsLesha"> 7 Лёша</label></dt><dd>'+ getDescription(groupsLesha) +'</dd></dl>\
                            <dl><dt><label><input type="checkbox" name="groups" value="groupsVetal"> 8 Виталик</label></dt><dd>'+ getDescription(groupsVetal) +'</dd></dl>\
							<div class="filter_btns"><input type="button" id="button_save" value="Save" class="save">&nbsp;<input type="button" id="button_clear" value="Clear" class="run">&nbsp;<input type="button" id="button_run" value="Run" class="run"></div>\
                            </div>';
	fieldset.style.width = "870px";
	
document.getElementById('mainpanel').children[0].appendChild(fieldset);

function hider()
{
	if (document.getElementById('filter').getAttribute('class').indexOf('hide') != -1)
	{
		document.getElementById('filter').setAttribute('class','shown');
	}
	else
	{
		document.getElementById('filter').setAttribute('class','hide');
	}
}

function clearer()
{
var size = document.getElementsByClassName('hide').length;
for(i=0; i<size; i++)
{
	document.getElementsByClassName('hide')[0].setAttribute('class','');
}
for(i=0; i<document.getElementsByName('groups').length; i++)
{
    document.getElementsByName('groups')[i].checked = false;
}
}

function savedelete()
{
    if (document.getElementById("button_save").getAttribute("class").indexOf("save") != -1)
	{
	    document.getElementById("button_save").value = "Delt";
		document.getElementById("button_save").setAttribute('class','delt');
	}
	else if (document.getElementById("button_save").getAttribute("class").indexOf("delt") != -1)
	{
	    document.getElementById("button_save").value = "Save";
		document.getElementById("button_save").setAttribute('class','save');
	}
	else
	{
	    return false;
	}
}

/*
function RunRunRun()
{
var param = new Array(); 
for (i=0; i<document.getElementsByName('groups').length; i++)
{
	if(document.getElementsByName('groups')[i].checked == true)
	{
		param.push(document.getElementsByName('groups')[i].value);
	}
}
runFilter(param);
}*/

var scriptWrap = document.createElement('script');
scriptWrap.innerHTML = '\
function RunRunRun(){var param = new Array(); \
for (i=0; i<document.getElementsByName("groups").length; i++){	\
if(document.getElementsByName("groups")[i].checked == true){\
param.push(document.getElementsByName("groups")[i].value);	}}\
runFilter(param);}\
' + hider + clearer + runFilter + getDescription + getFullList + rowsProcessing + '\
var groupsPasha = new Array("0","1","6","18");\
var groupsSerg = new Array("2","23");\
var groupsAndrew = new Array("4","5","22",["8",["1"],["2"],["3"]],["10",["0"],["1"],["2"],["3"]]);\
var groupsVlad = new Array("7");\
var groupsPetrenko = new Array("9",["8",["0"],["4"],["5"],["6"],["7"],["8"],["9"],["10"],["11"],["12"]],["10",["4"],["5"],["6"],["7"]]);\
var groupsDima = new Array("11","12");\
var groupsVetal = new Array(["3",["2"],["3"],["4"],["5"],["8"],["12"]]);\
var groupsLesha = new Array(["3",["0"],["1"],["6"],["7"],["9"],["10"],["11"]]);\
var lowerGroups = new Array();\
lowerGroups[0] = new Array("Сборка","Готовый ПК","Конфигуратор ПК","Неттоп","Сервер","Тонкий клиент");\
lowerGroups[1] = new Array("Монитор");\
lowerGroups[2] = new Array("Карта памяти","USB Flash накопитель","Видеокассета","Диски","CD холдер","Батарейки","Фотопленка","Внешний диск");\
lowerGroups[3] = new Array("Материнская плата","Процессор","Жесткий диск","Карман для жестких дисков","Оптический привод","Видеокарта","Звуковая карта","Модуль памяти","Корпус","Система охлаждения","Блок питания","Контроллер","USB Hub");\
lowerGroups[4] = new Array("Клавиатура","Мышь","Комплект (клавиатура+мышь)","Коврик","Планшет","Игровой манипулятор");\
lowerGroups[5] = new Array("Компьютерная акустика","TV-тюнер","Web-камера");\
lowerGroups[6] = new Array("Сетевой фильтр","Источник бесперебойного питания");\
lowerGroups[7] = new Array("Wi-Fi и Bluetooth","Маршрутизатор Wi-Fi","Маршрутизаторы/коммутатор","Точка доступа","Модем","Сетевой адаптер","Сетевая карта","Принт-сервер","IP-телефон","VoIP-шлюз");\
lowerGroups[8] = new Array("Шредер","МФУ","Принтер","Сканер","Ламинатор","Уничтожитель документов","Брошюровщик","Биндер","Резаки и триммеры","Счетчик банкнот","Степлер","Биговальное оборудование","Нумератор");\
lowerGroups[9] = new Array("Операционная система","Офисная программа","Мультимедиа","Антивирусная программа","Переводчики и словари","Утилита","САПР","Бухгалтерия","Распознавание текста","Архиватор","Серверное ПО");\
lowerGroups[10] = new Array("Картридж","СНПЧ","Чернила","Бумага для принтера","Пленка для ламинирования","Фольга","Обложки для переплета","Пружины");\
lowerGroups[11] = new Array("Серверные платформа","NAS, дисковый массив","Шкаф монтажный");\
lowerGroups[12] = new Array("Кабель","Кабель USB","Шлейф (HDD, FDD)","FireWire (IEEE 1394)","Антенный кабель","Кабель питания","Переходник","Переключатель KVM");\
lowerGroups[13] = new Array("Кино");\
lowerGroups[14] = new Array("Аудиокнига");\
lowerGroups[15] = new Array("Audio CD");\
lowerGroups[16] = new Array("Радиотелефон","Проводной телефон","Факс","Аксессуар");\
lowerGroups[17] = new Array("MP3-плеер","Аксессуар к iPod","Цифровой диктофон","Наушники");\
lowerGroups[18] = new Array("Проектор","Проекционный экран","Лампа для проектора","Стойка/кронштейн");\
lowerGroups[19] = new Array("Игровая консоль","Игровой манипулятор","Аксессуар к приставкам");\
lowerGroups[20] = new Array("Игра");\
lowerGroups[21] = new Array("Книга");\
lowerGroups[22] = new Array("Медиацентр");\
lowerGroups[23] = new Array("Картридер");document.getElementById("button_run").addEventListener("click",RunRunRun,false);';
document.head.appendChild(scriptWrap);

document.getElementById('hider').addEventListener("click",hider,false);
document.getElementById('button_clear').addEventListener("click",clearer,false);
document.getElementById('button_save').addEventListener("click",savedelete,false);
// ==UserScript==
// @name Fotomag tools
// @version 0.24.46
// @author gera_b
// @description Add visual enhancements
// @include http://fotomag.com.ua/admin/*
// @match http://fotomag.com.ua/admin/*
// @grant none
// ==/UserScript==
/* НАСТРОЕЧКИ! */
// объект хранит таблицу брендов по которым есть дисти
var brandNames = new Array("3Q", //0
                  "4U", //1
                  "A4Tech", //2
                  "Acme", //3
                  "Allied Telesyn", //4
                  "Apple", //5
                  "Asus", //6
                  "Axis", //7
                  "Belkin", //8
                  "Brother", //9
                  "Canon", //10
                  "Canyon", //11
                  "Cisco", //12
                  "Cooler Master", //13
                  "Creative", //14
                  "CYBORG ", //15
                  "Dell", //16
                  "D-Link", //17
                  "ED HARDY", //18
                  "Edifier", //19
                  "Edimax", //20
                  "Epson", //21
                  "FANATEC", //22
                  "Firtech", //23
                  "Genius", //24
                  "Gigabyte", //25
                  "HP", //26
                  "Intel", //27
                  "Konica Minolta", //28
                  "Lapara", //29
                  "Lenovo", //30
                  "Lexmark", //31
                  "LinkSys", //32
                  "Logitech", //33
                  "MADCATZ", //34
                  "Microlab", //35
                  "Microsoft", //36
                  "OKI", //37
                  "Panasonic", //38
                  "Pleomax", //39
                  "Prestigio", //40
                  "RAPOO", //41
                  "Razer", //42
                  "Retech", //43
                  "Roccat", //44
                  "SAITEK", //45
                  "Samsung", //46
                  "Sharp", //47
                  "Sony", //48
                  "SpeedLink", //49
                  "Speed-Link", //50
                  "SteelSeries", //51
                  "STLab", //52
                  "Sven", //53
                  "Tenda", //54
                  "Thermaltake", //55
                  "TP-LINK", //56
                  "TRENDnet", //57
                  "Trust", //58
                  "Ubiquiti", //59
                  "Wacom", //60
                  "Waltop", //61
                  "Xerox", //62
                  "ZALMAN", //63
                  "Zyxel" //64
                   );
// объект хранит значения и имена опций по-умолчанию
var defaultSettings = {	highlightExclamationMark 	: true,
						highlightGoodQuantity 		: true,
						highlightGoodQuantInProv 	: true,
						highlightGoodQuantInPrep 	: true,
						highliteLocalSuppliers 		: true,
						removeTop					: true,
						removeAnnoyingButtons 		: false,
						hidingDuration		 		: true,
						hidingSupplierSelect 		: true,
						hidingSupplierByDefault 	: false,
						pricingControl		 		: true,
						sortSuppliers		 		: false,
						buttonToDealer		 		: true,
						cityNamePriceUp		 		: true,
						clearSupplierBtns	 		: true,
						stones8				 		: true,
						productCodeToLinks	 		: false,
						linkButtonAdd		 		: true,
						shippingWarnTimer	 		: false,
						pager				 		: true,
						oneCitySupp			 		: false,
						highlightCheckboxes	 		: true,
						preparationQueryBtn	 		: true,
						disableStyleInPrep	 		: false,
						sortInPrep					: true,
                        highlightEmptyInputs        : true,
                        procurementForecast         : false
						};
// хранит описания для опций
var settingsDescription = {	highlightExclamationMark 	: "подсвечивать область с комментарием, содержащим \"!\"",
							highlightGoodQuantity 		: "подсвечиваем в заказе область с количеством товара если оно больше 1 шт",
							highlightGoodQuantInProv 	: "подсвечиваем количество в \"Обеспечении заказов\"",
							highlightGoodQuantInPrep 	: "подсвечиваем количество в \"Формировании заказов\"",
							highliteLocalSuppliers 		: "подсвечиваем поставщиков из города заказа, если есть",
							removeTop					: "скрываем верхнее меню",
							removeAnnoyingButtons 		: "скрываем кнопки WWW P O",
							hidingDuration		 		: "добавляем поле ввода количества дней заморозки статуса товара (вводим любое)",
							hidingSupplierSelect 		: "добавляем возможность прятать связи в заказе",
							hidingSupplierByDefault 	: "прячем связи по-умолчанию",
							pricingControl		 		: "проверяем не выше ли цена источика, чем цена продажи",
							sortSuppliers		 		: "сортируем поставщиков по цене, добавляем кнопку",
							buttonToDealer		 		: "добавляем кнопки перехода на сайт поставщика",
							cityNamePriceUp		 		: "выносим вверх название города и строимость доставки, если такая есть",
							clearSupplierBtns	 		: "добавляем кнопки очистки поставщика",
							stones8				 		: "красим  РЦ Хранение в красный",
							productCodeToLinks	 		: "создание ссылок из продакт-кодов",
							linkButtonAdd		 		: "создаём новую кнопку L вместо старых ссылок",
							shippingWarnTimer	 		: "показывает предупреждения о наступленни времени отгрузки поставщика",
							pager				 		: "показывает количество заказов, если меньше 2 страницы",
							oneCitySupp			 		: "показывает можно ли собрать заказ от поставщиков из одного города, если можно выводит подсветку",
							highlightCheckboxes	 		: "подсвечивает отмеченные чекбоксы О Ф С",
							preparationQueryBtn	 		: "всегда активная кнопка запроса",
							disableStyleInPrep	 		: "удаляем раскараску строк в \"Формировании Заказов\"",
							sortInPrep					: "сортировка в \"Формировании Заказов\"",
                            highlightEmptyInputs        : "подсвечивает незаполненные поля даты и города в обеспечении",
                            procurementForecast         : "быстрый выбор своих категорий в \"Прогнозе закупок\""
							};
// хранит описание зависимостей. в [0] - опция зависит от, [1] - зависимости от опции
var settingsDependencies = {	_showPromptOnLoad : [['_showAlertOnLoad'],[]],
								_showAlertOnLoad : [[],['_showPromptOnLoad']]
							};
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
var cookieFileName = 'settings';
// функция возвращает описание опции
function getDescription(sdesc){
	for(desc in settingsDescription){
		if (desc == sdesc){
			return settingsDescription[desc];
		}
	}
}							
// функция возвращает статус опции в чекбокс
function getCheckboxStatus(opt){
	if(typeof settingsObj[opt] == 'string' && settingsObj[opt].indexOf('false') == -1){ // костыль ff, возвращает порядковый номер кроме значения
		return 'checked=1';
	}
	else{
		return '';
	}
}
// функция проверяет наличие зависимостей и возвращает картинку с названием или ничего
function getDependencies(opt){
var dependencies = '';
	if (typeof settingsDependencies[opt] == 'undefined'){
		return '';
	}
	else{
		if(settingsDependencies[opt][0].length != 0){
			for (i=0;i<settingsDependencies[opt][0].length;i++){
				dependencies = dependencies + base64ImgDepOn + String(settingsDependencies[opt][0][i]) + br;
			}
		}
		if(settingsDependencies[opt][1].length != 0){
			for (i=0;i<settingsDependencies[opt][1].length;i++){
				dependencies = dependencies + base64ImgDepOf + String(settingsDependencies[opt][1][i]) + br;
			}
		}
	}
return dependencies;
}
							
// функция устанавливает в глобальный объект опции из settings
function setSettings(sts){
	for (val in sts){
		eval(val + "=" + sts[val] + ";");
	}
}
function makeCookieChange(){
	if (typeof settingsObj == 'undefined'){
		getCookieParameters(cookieFileName);
		setSettings(settingsObj);
	}
	if (this.checked){
		settingsObj[String(this.id)] = true;
		}
	else {
		settingsObj[String(this.id)] = false;
	}
	var str = prepareCokieSettings(settingsObj);
	setCookie(cookieFileName,str,'Mon, 01-Jan-2030 00:00:00 GMT');
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
else{
	setSettings(defaultSettings);
	var str = prepareCokieSettings(defaultSettings);
	setCookie(cookieFileName,str,'Mon, 01-Jan-2030 00:00:00 GMT');
}							
							
if (document.location.href == 'http://fotomag.com.ua/admin/us-config.php'){ /* управление настройками и их хранением в cookies */
/*заголовок таблицы настроек*/
var br = '<br/>';
var base64ImgDeps = '<img src=\'data:image/gif;base64,R0lGODlhEAAQAJECACNP2xKXJf///wAAACH5BAEAAAIALAAAAAAQABAAAAIilI+pF+vRXIJR0QsXxnZfCRrASJaAYppLSjptKJ6wONdwAQA7\' style=\'padding-right: 3px;\'/>';
var base64ImgDepOn = '<img src=\'data:image/gif;base64,R0lGODlhEAAQAIABABKXJf///yH5BAEAAAEALAAAAAAQABAAAAIfjI+pywitwINHzmjzdTrjbiWgx41fRwVhKqXG5sZMAQA7\' style=\'padding-right: 3px;\'/>';
var base64ImgDepOf = '<img src=\'data:image/gif;base64,R0lGODlhEAAQAOYBACNP2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAEALAAAAAAQABAAAAcwgAGCg4SFhoeIhACJhQCLjIKOj4ySlY6GlpaNmZWbnJeenIefk56Qg6CnAaWqrYiBADs=\' style=\'padding-right: 3px;\'/>';
var base64ImgVariable = '<img src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACu8AAArvAX12ikgAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAACLUlEQVQ4T7XTX0hTURzA8XN22bJsa7qaZW7MIf0ZW2NZhKPCfOkP1UMRvViRUJdaJDRCqBUXHNctsgm6WNQmmg9iKEi2Byl0f6yNmIRI7PH0mJiZrU4+5C9vnXXvQwU+dODzcA7n9z1PB6H/tTZHSZup+13KvGzTI3J9Re9sbZ/mNKH8N3T3LUg0HXkiBcIZpO16hfThjKr0n8H6h3kOB6YoCk4BQ6I5++nYZO33WK4WYpO7FqM52/6/Ruoj0xz25yjy54Ah4axZ7MxUQGdm47IK6MqYLvwOLI4jTFPa3XTC4KbJta4D4TccFrIUCVlgyL2XZrF9ogoU5ABNWnmaqAaaMAFNVsOXhOUEvpmmyJcGhgTTVjGQsoCCHCiMlAiFp2oo+jqi5nHLGEUtY8AQf2KL2DpeAwpyYOHJGmFhoASKCgOreOwdpcg7Cgy59cIm+p5vAwU5MN+rFeZ7SqHoc+9qHjfHKWqOA0O8cbt47ZkNFOTA3AO9MBfRQdGnSCmPPcMUeYaBIZeHdoiXhhygIAdmO8qF2ZAeij6GdDy+OEgRPwgMOdvnFBsfO0BBDsy0bRBmRAMUfRDLeNzUT1FTPzDk+H2neDTsAIVfAQ4hTG4Yz7+/bQRm6fVVw0nVmR6CzvWBRNXYna3zbffsCziAWdrbaj8izUoBDiNkCB4qd905XOa+Uqfbo0LIpjHWuNQ7TzX8tK7SKZ2ZGyrd1mNmt+VglbRfL82u6JP96fIPABtcz2kzS4gAAAAASUVORK5CYII=\' style=\'padding-right: 3px;vertical-align: bottom; border: 0; padding-right: 1px;\'/>';
var tableHeader = '<table width=\'90%\' cellpadding=\'3\' cellspacing=\'0\' border=\'1\'><tr><th width=\'2%\'>Состояние</th><th width=\'10%\' align=\'left\'>Название переменной</th><th width=\'30%\' style=\'text-align:left;\'>Краткое описание</th><th width=\'10%\'>'+base64ImgDeps+'Зависимости</th></tr>';
/*функция принимает название переменной настройки и возвращает строку управления ей
если параметр функции неопределен возвращаются строки управления всеми доступными настройками*/
function makeOptionRow(sopt){
var optionRow = "";
	if (typeof sopt != 'undefined'){
		var optionRow = '<tr><td align=\'center\'><input type=\'checkbox\' ' + getCheckboxStatus(String(sopt)) + ' id='+ String(sopt) +' name="box"></td><td style=\'text-align:left;\'>'+base64ImgVariable+'<b>' + String(sopt) + '</b></span></td><td style=\'text-align:left;\'>' + getDescription(sopt) + '</td><td align=\'center\'><img src=\'http://l-stat.livejournal.com/img/arrow-mutual.gif?v=10589\'></td></tr>';
	}
	else {
		for (opt in settingsObj){
			var optionRow = optionRow + '<tr><td align=\'center\'><input type=\'checkbox\' ' + getCheckboxStatus(String(opt)) + ' id='+ String(opt) +' name="box"></td><td style=\'text-align:left;\'>'+base64ImgVariable+'<b>' + String(opt) + '</b></span></td><td style=\'text-align:left;\'>' + getDescription(opt) + '</td><td align=\'center\'>'+getDependencies(String(opt))+'</td></tr>';
		}
	}
	return optionRow;
}
document.body.innerHTML = tableHeader + makeOptionRow();
	try{
		var boxes = document.getElementsByName('box');
			for(i=0;i<boxes.length;i++){
				boxes[i].addEventListener('change',makeCookieChange,false);
			}
	}
	catch(er){
		console.log(er);
	}    
    $("tr:even").css("background-color", "#EBEBFF");
}
/* флаг выключения на тех страницах, где не можем применить */ {
var currentLocation = window.location.href;
var suppExists = document.getElementsByClassName('supp').length;
var HREForderIdFlag = currentLocation.indexOf('orderid') + 1;				// заказ
var HREFordersFlag = currentLocation.indexOf('orders') + 1;					// общий список заказов
var HREFbasketPreviewFlag = currentLocation.indexOf('basket_preview') + 1;	// переоформление заказа
var HREFprovisionFlag = currentLocation.indexOf('provision') + 1;			// обеспечение заказов
var HREFproductFlag = currentLocation.indexOf('product') + 1;				// группы-связи
var HREFitemIdFlag = currentLocation.indexOf('itemid') + 1;					// редактирование товара
var HREFproductBindsFlag = currentLocation.indexOf('product/binds') + 1;	// связи товара
var HREFpreparation = currentLocation.indexOf('preparation') + 1;			// формирование заказов
var HREFforecast = currentLocation.indexOf('prognoz_zakupok') + 1;          // прогноз закупок
    
var currentDayOfWeek = new Date();
if(currentDayOfWeek.getDay() == 0 || currentDayOfWeek.getDay() == 6){
	var shippingWarnTimer = false;
}
if(cityNamePriceUp && HREForderIdFlag && !HREFprovisionFlag){
var tdNods = document.getElementsByTagName('td');
	for(i=0;i<tdNods.length;i++){
		if(tdNods[i].textContent && tdNods[i].textContent.indexOf('баланса') != -1){
			
			cityNamePriceUp = false;
			cityName = false;
		
			function checkCitySuppliers(){
				return false;
			}
		}
	}
}}	
/* города, поставщики, время отгрузки */ {
var supCities = new Array(	"Днепропетровск",			// 0, 
							"Киев",						// 1, каштан
							"Харьков",					// 2, 
							"Львов",					// 3, лев
							"Донецк",					// 4, 
							"Симферополь",				// 5, 
							"Запорожье"					// 6, 
							);
var supCity	= new Array();
supCity[0] = [	["Микротрон",17,'00'],
				["Прэксим-Д (IT)",12,'00'],
				["КЭН",13,'00'],
				["Сервис ПФ",14,'00'],
				["alles",12,'00'],
				["КПИ-Сервис",13,'00'],
				["МастерГруп",12,'00'],
				["DigitalSoft",12,'00'],
				["Юг-Контракт Днепр",14,'00'],
                ["Sven",9,'00'],
                ["Пс Шоп Днепр",10,'30'],
                ["РЦ Хранение Днепр",16,'00']
			];
supCity[1] = [	["БРАИН",11,'00'],
				["ЕРС",15,'00'],
				["ЕРС",10,'00'],
				["КПИ-Сервис",17,'00'],
				["СТЕК Киев",12,'00'],
				["К-Трейд",13,'00'],
				["Асбис ИТ",11,'00'],
				["Baden",12,'00'],
				["CTC",12,'00'],
				["Datalux",9,'00'],
				["ERC TV",15,'00'],
				["ERC_цены",15,'00'],
				["Exim standart",12,'00'],
				["EXMAR",12,'00'],
				["Kniga.biz.ua",12,'00'],
				["MediaLand",12,'00'],
				["МТиАй",10,'00'],
				["Navigator Impression",12,'00'],
				["Асбис",11,'00'],
				["АйТи-Линк",12,'00'],
				["Квазар-Микро",12,'00'],
				["МДМ",12,'00'],
				["МУК",12,'00'],
				["Синтекс",12,'00'],
				["Софтпром",12,'00'],
				["ЭЛКО",14,'00'],
				["ЭЛКО",10,'00'],
				["Этьен",11,'00'],
				["Юг-Контракт КИЕВ",12,'00'],
                ["Gembird",09,'00'],
                ["Eletek",10,'00'],
                ["Квазар-Микро HP",12,'00'],
                ["DAKO",09,'00'],
                ["РЦ Хранение Киев",16,'00'],
                ["Технопарк",16,'00']
			];
			
supCity[2] = [	["Юг-Контракт Харьков",12,'00'],
				["Пс Шоп",10,'00'],
				["ДС Линк",10,'00'],
				["NRG и Pixus",12,'00']
			];
			
supCity[3] = [	["Юг-Контракт Львов",12,'00'],
				["Техника для бизнеса",12,'00'],
				["СТЕК Львов",12,'00'],
				["БРАИН Львов",13,'00']
			];
supCity[4] = [	["Юг-Контракт Донецк",12,'00']
			];
supCity[5] = [	["Юг-контракт Сиферополь",12,'00']
			];
supCity[6] = [	["Микротрон",13,'00'],
				["Мидис",14,'00'],
				["ЮгЗапорожье",14,'00'],
                ["РОМА",12,'00'],
                ["ИТ Планет",13,'00']
			]; 
}
function getElementByTitle(tagName,elementTitle){
                        list = document.getElementsByTagName(tagName);
                        for (i=0;i!=list.length;i++) {
                                if (list[i].title == elementTitle) {
                                        elementTag = list[i];
                                }
                        }
                        return elementTag;
                }
function getElementsByTitle(tagName,elementTitle){
                        list = document.getElementsByTagName(tagName);
                        var listsArray = new Array();
						for (i=0;i!=list.length;i++) {
                                if (list[i].title == elementTitle) {
                                        listsArray.push(list[i]);
                                }
                        }
                        return listsArray;
                }
function getElementByInnerHTML(tagName,innerHTML){
						list = document.getElementsByTagName(tagName);
						for (i=0;i!=list.length;i++) {
								if (list[i].innerHTML.indexOf(innerHTML) != -1) {
											elementTag = list[i];
								}
						}
						return elementTag;
				}
if(HREFprovisionFlag){
	try{	
		var collectionCityArr = new Array();
	rgxp = /(collection_city_id\[)+[\d]*(\])+/g;
	wholeSelectNodes = document.getElementsByTagName('select');
		for (i=1; i<wholeSelectNodes.length; i++){
			if (rgxp.test(wholeSelectNodes[i].name)){
				collectionCityArr.push(wholeSelectNodes[i]);
			};
		}
		for (i=0; i<collectionCityArr.length; i++){
			collectionCityArr[i] = collectionCityArr[i].parentNode.children[4].textContent.replace(/^\s*([\S\s]*?)\s*$/, '$1');
			idx = collectionCityArr[i].indexOf(',');
				if (idx != -1){
					collectionCityArr[i] = collectionCityArr[i].substring(0,idx);
				}
		}
	}
	catch(er){
	txt = 'There is an error in module \'cityNamePriceUp\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}
}
				
if(highliteLocalSuppliers){
	function checkCitySuppliers(city){
		for(CCSG=0;CCSG<supCities.length;CCSG++){
			if (city == supCities[CCSG]){
				highliteLocalSuppliers = true;
				return CCSG;
			}
			else {
				highliteLocalSuppliers = false;
					if (CCSG == supCities.length - 1){
						return false;
					}
			}
		}
	}
}
if(disableStyleInPrep && HREFpreparation){
	try{
		var tableRows = document.getElementsByClassName('grid')[0].children[0].children;
		
		for(tr in tableRows){
			if(tableRows[tr].style){
				tableRows[tr].style.backgroundColor = '';
			}
		}
	}
	catch(er){
	txt = 'There is an error in module \'disableStyleInPrep\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}	
}
if(sortInPrep && HREFpreparation){
	try{
		var tableRows = document.getElementsByClassName('grid')[0].children[0].children;
		var tableRowsArr = [];
			for(i=1;i<tableRows.length;i++){
				tableRowsArr.push(tableRows[i]);
			}		
		tableRowsArr.sort(function(el1,el2){
			el1 = el1.children[3].textContent.replace(/^\s*([\S\s]*?)\s*$/, '$1');
			el2 = el2.children[3].textContent.replace(/^\s*([\S\s]*?)\s*$/, '$1');
			// return el1.charCodeAt(0) - el2.charCodeAt(0);
			return el1.localeCompare(el2);
		}
		)
		for(i=1;i<tableRows.length;i++){
			for(y=0;y<tableRowsArr.length;y++){
				tableRows[i].parentNode.appendChild(tableRowsArr[y]);
			}
		}	
	}
	catch(er){
		txt = 'There is an error in module \'sortInPrep\'\nError message text:\n';
		txt += er.message;
		console.log(txt);	
	}
}
if(preparationQueryBtn && HREFpreparation){
	try{
		var newBtn = document.createElement('input');
			newBtn.type = 'submit';
			
		document.getElementById('filterForm').insertBefore(newBtn,null);
	}
	catch(er){
		txt = 'There is an error in module \'preparationQueryBtn\'\nError message text:\n';
		txt += er.message;
		console.log(txt);
	}
}
				
if(highlightCheckboxes && HREForderIdFlag){
	try{
		var providedBoxes = document.getElementsByClassName('provided');
		var prepareBoxes = document.getElementsByClassName('prepare');
		var collectedBoxes = document.getElementsByClassName('collected');
		var toprovision = document.getElementsByClassName('toprovision');
     
			for(i=0;i<providedBoxes.length;i++){
					providedBoxes[i].disabled = false;
				// if(providedBoxes[i].checked){
					// providedBoxes[i].parentElement.bgColor = '#B9FFB0';
				// }
			}
			
			for(i=0;i<prepareBoxes.length;i++){
					prepareBoxes[i].disabled = false;
				// if(prepareBoxes[i].checked){
					// prepareBoxes[i].parentElement.bgColor = '#B9FFB0';
				// }
			}
			
			for(i=0;i<collectedBoxes.length;i++){
					collectedBoxes[i].disabled = false;
				// if(collectedBoxes[i].checked){
					// collectedBoxes[i].parentElement.bgColor = '#B9FFB0';
				// }
			}
			for(i=0;i<toprovision.length;i++){
					toprovision[i].disabled = false;
				// if(collectedBoxes[i].checked){
					// collectedBoxes[i].parentElement.bgColor = '#B9FFB0';
				// }
			}     
	}
	catch(er){
	txt = 'There is an error in module \'highlightCheckboxes\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}	
}
				
if(pager && HREFordersFlag && !HREForderIdFlag && !HREFbasketPreviewFlag && !HREFprovisionFlag && !HREFpreparation){
	try{
		if(document.getElementsByClassName('pager').length == 0){
			var orderCount = document.getElementsByTagName('table')[0].children[0].children.length - 1;
			var pagerNode = document.createElement('div');
			pagerNode.setAttribute('style','padding: 4px 8px; clear: both;')
			pagerNode.innerHTML = '<div class="pager"><b>1</b><span>(всего: '+orderCount+' зак.)</span></div>';
		
		document.body.insertBefore(pagerNode,document.getElementsByTagName('table')[0]);
		}
	}
	catch(er){
	txt = 'There is an error in module \'pager\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}
}
				
if(clearSupplierBtns && suppExists && HREForderIdFlag){
	try{
	 function fclearSupplierBtns(productId){
		document.getElementsByName('supplier_id['+productId+']')[0].selectedIndex = 0;
		return false;
	}
	var clearSupplierBtnsScript = document.createElement('script');
	clearSupplierBtnsScript.innerHTML = fclearSupplierBtns;
	document.body.appendChild(clearSupplierBtnsScript);
		var productIds = document.getElementsByName('product[]');
			for(i=0;i<productIds.length;i++){
			var clearSupplierBtn = document.createElement('button');
			clearSupplierBtn.innerHTML = '<div title="очистить">&nbsp;X&nbsp;</div>';
			clearSupplierBtn.type = 'button';
			clearSupplierBtn.setAttribute('style','padding: 0pt; margin: 0pt; border: medium 1px; border-radius: 2px 2px 2px 2px; font-size: 13px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
			clearSupplierBtn.setAttribute('onclick','fclearSupplierBtns('+productIds[i].value+');');
			clearSupplierBtn.setAttribute('href','#');
			document.getElementsByName('supplier_id['+productIds[i].value+']')[0].setAttribute('style','width: 200px;');
			document.getElementsByName('supplier_id['+productIds[i].value+']')[0].parentNode.appendChild(clearSupplierBtn);
			}
	}
	catch(er){
	txt = 'There is an error in module \'clearSupplierBtns\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}	
} 
				
if(cityNamePriceUp && !HREFproductFlag && !HREFprovisionFlag && !HREFpreparation && HREForderIdFlag){
	try{
		var cityName = document.getElementById('formUpdate').children[7].children[1].children[6].children[1].textContent;
			if(cityName.indexOf('Самовывоз') != -1){
				var cityIdx1 = cityName.indexOf(':') + 2;
				var cityIdx2 = cityName.indexOf(',');
				cityName = cityName.substring(cityIdx1,cityIdx2).replace(/^\s*([\S\s]*?)\s*$/, '$1');
			}
			else{
				var cityIdx1 = cityName.indexOf(':') + 2;
				cityName = cityName.substring(cityIdx1);
				var cityIdx2 = cityName.indexOf(' ');
				cityName = cityName.substring(0,cityIdx2).replace(/^\s*([\S\s]*?)\s*$/, '$1');
			}
		var devider = ', ';
			if(document.getElementById('formUpdate').children[7].children[1].children[6].children[1].childNodes[0].textContent.indexOf('Самовывоз') == -1){
			var deliveryType =  'Доставка';
			}
			else	{
			var deliveryType =  'Самовывоз';
			}
		var fullCityName = document.getElementById('formUpdate').children[7].children[1].children[6].children[1].childNodes[1].textContent;
		var deliveryCost = document.getElementById('formUpdate').children[7].children[1].children[8].childNodes[3].children[0].value + ' гривен';
		if(parseInt(deliveryCost)>0){deliveryCost = devider + deliveryCost;}else{deliveryCost = '';}
		var orderHeading = getElementByInnerHTML('h3','Заказ #');
		orderHeading.innerHTML = orderHeading.innerHTML + devider + deliveryType + ': ' + '<b style="color:#090">' + fullCityName + '</b>' +  deliveryCost;
	}
	catch(er){
	txt = 'There is an error in module \'cityNamePriceUp\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}	
}	
if(shippingWarnTimer && !suppExists){
	try{
		var base64ImgOk = document.createElement('img');
		base64ImgOk.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAA5UlEQVQoU2P4//8/Azqef37JfxDGJoeiOGB51H+Gdv7/DPOFILhb4L/FbGcUjXANCv06/xl2i/1n+K0ItBIJn5b6z9EuBtcE1gA2GaQYWSEy+7r0f43JJmBNYA0M/QKYJqNrXiz8f/nlNUCnAj3HsFoEt+kwjfsl/hdsr/jPMP303P8Mm0WJ0pCxuQASpAzTBQlrWC/6v//4VIgGcAgBPYbT0+/l4SEFD1ZQmDM8l8PU9Fke6G5BsOnwUILFqES36n8GoNUMQA+CMdBvoDiAKcbQABIABULC+sz/EasT/7cf7sNIHgD7iVVHAKxiZAAAAABJRU5ErkJggg==');
		base64ImgOk.setAttribute('style','padding:0px; vertical-align:text-bottom; margin:0pt; background: none repeat scroll 0% 0%;');
		
		var base64ImgWarn = document.createElement('img');
		base64ImgWarn.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfcAgwVHQfi2wIIAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAAFKSURBVChThY2/LwNhGMdvMIqh0UYrQbV3QnrXcrohVKqNmPzIYdVI43QRiUQiLLoYLEaJrbEIisRAgo2/wlLRup9NtZXUfb13ElJHDM/75Pt5ns/7UAConyUnlgiyc5PZlpXFFJ4IVpZXfpXsv3vdwBEPub31f0GJTiM378H2pg/Pggfq+JxNqrtQZJx4zHBwNDUgd8hB97v+FvKhYbxteCFfBjHQ1Qj9KoTKWgfy4WidZF3Q9w4gBRww7vpQOmGRiLtQPWPxfsPjpduB4n7mS7KEQmcvyjsMjNsQXo9Z7CbbUDllrVxO0yjQ4W9BW92CEnGi9tAP4zoIOcsiOdkC/YIjmUPtnocy1Ax9PW1JlDQYgxxwQx2joY74oI/6UY0z0Eg3sxqjIfe4IUUmPgXz0aYWoM2mSIlQBRHSjAiNdDNrAuFkXsqeW8IHyxNoefbqhoAAAAAASUVORK5CYII=');
		base64ImgWarn.setAttribute('style','padding:0px; vertical-align:text-bottom; margin:0pt; background: none repeat scroll 0% 0%;');
		
		var base64ImgStop = document.createElement('img');
		base64ImgStop.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfcAgwWJQ/52YiYAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAAGJSURBVChTlZHdK4NRHMePzFs9FqVlF0TsQmoXmlk9YcmKmiSvi0jsYnazISssVyskiyRXyMs82+wFY8zYkNisdqH4c77OnoexduXid77ndH6f0/l+fwQA+U9lNN82q3HXyOJepabF4rlfR9/KfDANeKSVOCUEPpIL77e6qUY1nRkQDzgKGLjoZQpIqZ+I+P0ZKYKT6q2STUPksFaOQHsnrjp6cDc0hjeLFRf1Cl4DFTI8juoRbtMgMTfPQ+SggUXME4R7YAQ3U2Ykj1wIT88jvrWDmG0Nyb1jvLv8SNpWBGCvRg7/8CRelu24kCsRGZnAw5QJwSY1XpfX8ek7R1hvQNxsEYD9OgUuF20IzlrhU7QgRL/gV7XiI/KE0LgBUcsSOOojbjAJwLasAZy4FBwjoQYLcJJfQo2LwJVX08ZCOJky3nhi1S4AqWVTUkWTIfCKxPDmFFEtptHmw5vH8M1Ro/k3pZ/BbEhrkMr9bznoOTRpzJ7DD7Sr7QXXNQhXtw5ubR+uZxayJv0FezRgzCTS2PYAAAAASUVORK5CYII=');
		base64ImgStop.setAttribute('style','padding:0px; vertical-align:text-bottom; margin:0pt; background: none repeat scroll 0% 0%;');
		var hours = new Date();
		
	var supplierSpans = document.getElementsByTagName('span');
		for(i=0;i<supplierSpans.length;i++){
			if(supplierSpans[i].title == 'Поставщик'){
				supColonIdx = supplierSpans[i].textContent.indexOf(':')+1;
				var supName = supplierSpans[i].textContent.substring(supColonIdx).replace(/^\s*([\S\s]*?)\s*$/, '$1');
					for(y=0;y<supCities.length;y++){
						for(z=0;z<supCity[y].length;z++){
							if(supName == supCity[y][z][0]){
								
								if(supCity[y][z][1] - hours.getHours()  == 1){
								base64ImgWarn.setAttribute('title',supCities[y]+'. Поставщик будет отгружаться в '+supCity[y][z][1]+':'+supCity[y][z][2]+'. Свяжитесь с менеджером!');
									if(supplierSpans[i].textContent.indexOf(':') != -1){
									supplierSpans[i].innerHTML = supplierSpans[i].innerHTML.replace('П: ',base64ImgWarn.outerHTML);}
									else{
									supplierSpans[i].innerHTML = base64ImgWarn.outerHTML + supplierSpans[i].innerHTML;}
								}
								else if(hours.getHours() < supCity[y][z][1]){
								base64ImgOk.setAttribute('title',supCities[y]+'. Поставщик будет отгружаться в '+supCity[y][z][1]+':'+supCity[y][z][2]+'.');
									if(supplierSpans[i].textContent.indexOf(':') != -1){
									supplierSpans[i].innerHTML = supplierSpans[i].innerHTML.replace('П: ',base64ImgOk.outerHTML);}
									else{
									supplierSpans[i].innerHTML = base64ImgOk.outerHTML + supplierSpans[i].innerHTML;}
								}
								else {
								base64ImgStop.setAttribute('title',supCities[y]+'. Поставщик уже отгрузился в '+supCity[y][z][1]+':'+supCity[y][z][2]+'!');
									if(supplierSpans[i].textContent.indexOf(':') != -1){
									supplierSpans[i].innerHTML = supplierSpans[i].innerHTML.replace('П: ',base64ImgStop.outerHTML);}
									else{
									supplierSpans[i].innerHTML = base64ImgStop.outerHTML + supplierSpans[i].innerHTML;}							
								}
								
							}
						}
					}
			}
		}
	}
	catch(er){
	txt = 'There is an error in module \'shippingWarnTimer\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}	
}
function getLocalSupplier(supplier){
	local = '<div type=\'text\' style=\'color:#69A2FF;\'>www</div>';
	nonLocal = 'www';
	
	if(!HREFprovisionFlag){
		cityIdx = checkCitySuppliers(cityName);
	}
	else{
		cityIdx = checkCitySuppliers(collectionCityArr[i]);
	}
	if(cityIdx !== false){
			for(GLSC=0;GLSC<supCity[cityIdx].length;GLSC++){
				if(supCity[cityIdx][GLSC][0] == supplier){
				return local;
				}
			}
		}
return nonLocal;
}
if(sortSuppliers && !HREFproductFlag){
	try{
		var supStringsNodes = document.getElementsByClassName('supp');
		for(i=0;i<supStringsNodes.length;i++){
		var items = supStringsNodes[i].children;
		var itemsArr = [];
		for (y=0;y<items.length;y++) {
				if (typeof items[y].children[2] != 'object' || typeof items[y].children[0].children[0] != 'object' ){
				supStringsNodes[i].children[y].style.display = 'none';
				}
				else {
				itemsArr.push(items[y]);
				}
			}
		itemsArr.sort(function(itemOne, itemTwo) {
			if (typeof itemOne.children[0] != 'object' || typeof itemTwo.children[0] != 'object' || typeof itemOne.children[0].children[0] != 'object' || typeof itemTwo.children[0].children[0] != 'object'){
			return -1;
			}
			else if (isNaN(itemOne.children[0].children[0].textContent) || isNaN(itemTwo.children[0].children[0].textContent)){
			return -1;
			}
			else{
			itemOne = parseFloat(itemOne.children[0].children[0].textContent);
			itemTwo = parseFloat(itemTwo.children[0].children[0].textContent);
			return itemOne - itemTwo;
			}
		});
		for (y = 0; y < itemsArr.length; ++y) {
			supStringsNodes[i].appendChild(itemsArr[y]);
			}
		}
	}
	catch(er){
	txt = 'There is an error in module \'sortSuppliers\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}		
}
				
if(highlightGoodQuantInProv && HREFprovisionFlag){
	try{
		var wholeOrderTable = document.getElementsByClassName('grid');
		var searchOne = wholeOrderTable[0].childNodes[1];
			for(coEl=0; coEl<searchOne.childNodes.length; coEl++)
			{
				if(searchOne.childNodes[coEl].nodeType == 1)
				{	
					if(searchOne.childNodes[coEl].childNodes[11].childNodes[0].nodeValue > 1)
					searchOne.childNodes[coEl].childNodes[11].style.background = '#FFEFC2';
				 }
				else
				continue;
			} 
	}
	catch(er){
	txt = 'There is an error in module \'highlightGoodQuantInProv\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}			
}
if(highlightGoodQuantInPrep && HREFpreparation){
	try{
		var wholeOrderTable = document.getElementsByClassName('grid');
		var searchOne = wholeOrderTable[0].childNodes[1];
			for(coEl=0; coEl<searchOne.childNodes.length; coEl++)
			{
				if(searchOne.childNodes[coEl].nodeType == 1)
				{	
					if(searchOne.childNodes[coEl].childNodes[9].childNodes[0].nodeValue > 1)
					searchOne.childNodes[coEl].childNodes[9].style.background = '#FFEFC2';
				 }
				else
				continue;
			} 
	}
	catch(er){
	txt = 'There is an error in module \'highlightGoodQuantInProv\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}	
}
	
 // костыль, убирает цену с del
	var deletedPrices = document.getElementsByTagName('del');
		for(i=0;i<deletedPrices.length;i++){
			deletedPrices[i].parentNode.removeChild(deletedPrices[i].parentNode.childNodes[2]);
			deletedPrices[i].parentNode.removeChild(deletedPrices[i]);
		} 
		
if(pricingControl){
try{
if(currentLocation.indexOf('orderid') != -1 && document.getElementsByClassName('supp').length != 0){
		var prodCodesObjs = document.getElementsByName('product[]');
		var priceInputs = new Array();
		var currCur = {};
			for(i=0;i<prodCodesObjs.length;i++){
			priceInputs.push(document.getElementsByName('price_in['+prodCodesObjs[i].value+']'));
			}
		var currentPriceMin = new Array();
		var pricingArray = new Array();
		var sellPriceArray = new Array();
			for(i=0;i<priceInputs.length;i++)
			{
			pricingArray[i] = new Array();
			pricingArray[i] = priceInputs[i][0].value;//.split(" ");
			currentPriceMin[i] = new Array();
			sellPriceArray[i] = new Array();
			var flag = true;
				var currentPrice = pricingArray[i];
				currentPrice = parseFloat(currentPrice.replace(",","."));
					if(!isNaN(parseFloat(currentPrice)))// && isFinite(currentPrice) == true)
					{
						if(flag == true)
						{
						currentPriceMin[i][0] = currentPrice;
						var flag = false;
						}
						if(currentPrice < currentPriceMin[i][0])
						{
						currentPriceMin[i][0] = currentPrice;
						}
					}
					
			alEl = i*2+1;
			var wholeOrderTable = document.getElementsByClassName('grid');
			var pricingNods = wholeOrderTable[0].childNodes[7];
				// for(cnt=0;cnt<)
					sellPriceArray[i][1] = pricingNods.childNodes[alEl].childNodes[7].childNodes[1].childNodes[5].textContent; // доллар 
					sellPriceArray[i][0] = pricingNods.childNodes[alEl].childNodes[7].childNodes[1].childNodes[1].textContent; // гривна
				currCur = document.getElementById('price_in_currency_name_' + String(prodCodesObjs[i].value));
				if(String(currCur.textContent).indexOf('uah') == -1){
					if(sellPriceArray[i][1] < Math.round(currentPriceMin[i][0]))
					{
					pricingNods.childNodes[alEl].childNodes[7].style.background = '#F0D1D1';
					}
					if(Math.round(sellPriceArray[i][1]) == Math.round(currentPriceMin[i][0]))
					{
					pricingNods.childNodes[alEl].childNodes[7].style.background = '#FACA87';
					}
				}
				else{
					if(parseInt(sellPriceArray[i][0]) < Math.round(currentPriceMin[i][0]))
					{
					pricingNods.childNodes[alEl].childNodes[7].style.background = '#F0D1D1';
					}
					if(Math.round(sellPriceArray[i][0]) == Math.round(currentPriceMin[i][0]))
					{
					pricingNods.childNodes[alEl].childNodes[7].style.background = '#FACA87';
					}
				}
			}
}
else if(currentLocation.indexOf('orderid') != -1 && document.getElementsByClassName('supp').length == 0){
		var priceSpans = document.getElementsByTagName('span');
		var priceInArray = new Array();
		var sellPriceArray = new Array();
			for (i=0;i<priceSpans.length;i++)
			{
				if (priceSpans[i].title == 'Вход')
				{
				ind = priceSpans[i].textContent.indexOf(':') + 1;
				priceInArray.push(priceSpans[i].textContent.substring(ind));
				}
			}
			for (i=0;i<priceInArray.length;i++){
				sellPriceArray[i] = new Array();
			alEl = i*2+1;
			var wholeOrderTable = document.getElementsByClassName('grid');
			var pricingNods = wholeOrderTable[0].childNodes[7];
			sellPriceArray[i][1] = parseFloat(pricingNods.childNodes[alEl].childNodes[7].childNodes[1].childNodes[5].textContent); // доллар, уже не пустой!
			sellPriceArray[i][0] = parseInt(pricingNods.childNodes[alEl].childNodes[7].childNodes[1].childNodes[1].textContent); // гривна 
			// pricingNods.childNodes[alEl].childNodes[7].childNodes[1].childNodes[3].textContent = Math.round(sellPriceArray[i][0] / exchCourse);
				if(priceInArray[i].indexOf('u') == -1 && priceInArray[i].indexOf('г') == -1)	
				{
					// if((sellPriceArray[i][0]/exchCourse) < parseFloat(priceInArray[i]))
					if((sellPriceArray[i][1]) < parseFloat(priceInArray[i]))
					{
					pricingNods.childNodes[alEl].childNodes[7].style.background = '#F0D1D1';
					}
					// else if(Math.round(sellPriceArray[i][0]/exchCourse) == Math.round(parseFloat(priceInArray[i])))
					else if(Math.round(sellPriceArray[i][1]) == Math.round(parseFloat(priceInArray[i])))
					{
					pricingNods.childNodes[alEl].childNodes[7].style.background = '#FACA87';
					}
				}
				else
				{
					if(sellPriceArray[i][0] < parseFloat(priceInArray[i]))
					{
					pricingNods.childNodes[alEl].childNodes[7].style.background = '#F0D1D1';
					}
					else if(Math.round(sellPriceArray[i][0]) == Math.round(parseFloat(priceInArray[i])))
					{
					pricingNods.childNodes[alEl].childNodes[7].style.background = '#FACA87';
					}
				}
			}
}
else if(currentLocation.indexOf('provision') != -1){
        function goCheckPriceValue(obj){
           var priceInNameRegex = /\d+/;
           var priceNameDigits = 'price_' + priceInNameRegex.exec(obj.name);
            if (Number(obj.value) > Number(obj.attributes['usd'].value)) {
               obj.style.backgroundColor = '#FACA87';
            }
            else {
               obj.style.backgroundColor = '';
            }
        }    
    
        var allInputs = document.getElementsByTagName('input');
        var priceInRegex = /price_in\[\d+\]/;
        var priceInNameRegex = /\d+/;
            for (i=0; i<allInputs.length; i++) {
               
                if (priceInRegex.test(allInputs[i].name)) {
                    var priceNameDigits = 'price_' + priceInNameRegex.exec(allInputs[i].name);
                    var dollarPrice = document.getElementById(priceNameDigits).nextElementSibling.nextElementSibling.innerText.substring(0,document.getElementById(priceNameDigits).nextElementSibling.nextElementSibling.innerText.indexOf('U')-1);
                    allInputs[i].setAttribute('usd',dollarPrice);
                    allInputs[i].addEventListener('blur',function(){goCheckPriceValue(this)});
            }
        
        }
    
}
else if (HREFpreparation) {
	var tableElement = document.getElementsByClassName('grid');
		for (i=0; i<tableElement[0].children[0].children.length; i++) {
			tableElement[0].children[0].children[i].children[7].hidden = true;
			tableElement[0].children[0].children[i].children[6].style.fontWeight = 'bold';
			if (i>0) {
				if (parseInt(tableElement[0].children[0].children[i].children[7].childNodes[0].textContent) == 0) {
					tableElement[0].children[0].children[i].children[5].style.background = '#FACA87';
					tableElement[0].children[0].children[i].children[6].style.background = '#FACA87';
				}
				else if (parseInt(tableElement[0].children[0].children[i].children[7].childNodes[0].textContent) < 0) {
					tableElement[0].children[0].children[i].children[5].style.background = '#842b2b';
					tableElement[0].children[0].children[i].children[6].style.background = '#842b2b';
				}
			}	
		}
}
}
	catch(er){
	txt = 'There is an error in module \'pricingControl\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}	 
}
	
if(hidingDuration && HREFitemIdFlag){
	try{
		var durationPapa = document.getElementsByName('freeze_ondump_days');
		var newInputElement = document.createElement('INPUT');
		newInputElement.type = 'textbox';
		newInputElement.value = '';
		newInputElement.size = '5';
		newInputElement.maxlength = '4';
		newInputElement.setAttribute('name','freeze_ondump_days');
		durationPapa[0].parentNode.appendChild(newInputElement);
		durationPapa[0].parentNode.removeChild(durationPapa[0].parentNode.childNodes[8]);
	}
	catch(er){
	txt = 'There is an error in module \'hidingDuration\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}	
}	
	
if(highlightExclamationMark && !HREFprovisionFlag){
	try{
        document.getElementsByClassName('grid')[0].children[1].children[0].children[1].style.width = "250px";
        document.getElementsByClassName('grid')[0].children[1].children[0].children[13].style.width = "240px";
		if (currentLocation.indexOf('orderid') != -1 && document.getElementsByClassName('comment').length != 0){
		var commentInputs = document.getElementsByClassName('comment');
		for(i=0;i<commentInputs.length;i++)
		{
		commentInputs[i].setAttribute('style','width:215px;');
		var searchString = commentInputs[i].value;
		var gettedVals = String(commentInputs[i].value);
		var result = searchString.indexOf("!");
		if(result != -1)
		{
		var alEl = i*2+1;
		var wholeOrderTable = document.getElementsByClassName('grid');
		var searchOne = wholeOrderTable[0].childNodes[7]; 
		searchOne.childNodes[alEl].children[12].style.background = '#FFEFC2';
		}
		}}
		else if (currentLocation.indexOf('orderid') != -1){
		var spansArray = new Array();
			for (z=0 ; z<document.getElementsByClassName('grid')[0].children[3].children.length ; z++){
			var spansArray = getElementsByTitle('span','Комментарий');
				if (spansArray[z].textContent.toString().indexOf('?') != -1){
				spansArray[z].parentElement.bgColor = '#F0D1D1';
				}
				else if (spansArray[z].textContent.toString().indexOf('!') != -1){
				spansArray[z].parentElement.bgColor = '#FFEFC2';
				}
			}	
		}
		else if (HREFpreparation) {
			var tableElement = document.getElementsByClassName('grid');
				for (i=0; i<tableElement[0].children[0].children.length; i++) {
					if (tableElement[0].children[0].children[i].children[10].textContent.indexOf('?') != -1) {
						tableElement[0].children[0].children[i].children[10].bgColor = '#F0D1D1';
					}
					else if (tableElement[0].children[0].children[i].children[10].textContent.indexOf('!') != -1) {
						tableElement[0].children[0].children[i].children[10].bgColor = '#FFEFC2';
					}
				}
		}
}
	catch(er){
	txt = 'There is an error in module \'highlightExclamationMark\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}
}
if(highlightGoodQuantity && HREForderIdFlag){
	try{
		var wholeOrderTable = document.getElementsByClassName('grid');
		var searchOne = wholeOrderTable[0].childNodes[7];
			for(coEl=0; coEl<searchOne.childNodes.length; coEl++)
			{
				if(searchOne.childNodes[coEl].nodeType == 1)
				{	
					if(searchOne.childNodes[coEl].childNodes[5].childNodes[0].nodeValue > 1)
					searchOne.childNodes[coEl].childNodes[5].style.background = '#FFEFC2';
				 }
				else
				continue;
			} 
	}
	catch(er){
	txt = 'There is an error in module \'highlightGoodQuantity\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}
}
if(highlightEmptyInputs && HREFprovisionFlag){
    try{
        function checkFullfillling(obj) {
           if (obj.nodeName == 'INPUT') {
               if (obj.value.length == 0) {
                  obj.style.backgroundColor = '#FFC4CF';
               }
               else {
                  obj.style.backgroundColor = '';
               }
           }
           if (obj.nodeName == 'SELECT') {
               if (obj.selectedIndex == 0) {
                  obj.style.backgroundColor = '#FFC4CF';
               }
               else {
                  obj.style.backgroundColor = '';
               }
              
           }
        }
        var dateInputs = document.getElementsByClassName('hasDatepicker');
        for (i=0; i<dateInputs.length; i++) {
           checkFullfillling(dateInputs[i]);
        }
        
        function findElements(){
        var elArray = [];
        var tmp = document.getElementsByTagName("select");
        var regex = /collection_city_id\[\d+\]/;
        for ( var i = 0; i < tmp.length; i++ ) {
            if ( regex.test(tmp[i].name) ) {
                elArray.push(tmp[i]);
            }
        }
        return elArray;
        }
        
        var elArray = findElements();
        
        for (i=0; i<elArray.length; i++){
           checkFullfillling(elArray[i]);
           elArray[i].addEventListener('change',function(){checkFullfillling(this)});
        }
        
    }
    
	catch(er){
	txt = 'There is an error in module \'highlightEmptyInputs\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}
}
if(linkButtonAdd && (HREForderIdFlag || HREFprovisionFlag || HREFpreparation)){
	try{
/*		 var lightboxCSSLink = document.createElement('LINK');
		  lightboxCSSLink.rel = 'stylesheet';
		  lightboxCSSLink.href = '/stat/admin/css/jquery.lightbox.css';
		  lightboxCSSLink.type = 'text/css';
		  lightboxCSSLink.media = 'screen';
		  document.body.insertBefore(lightboxCSSLink, null);
		  
		var nyroModalCSSLink = document.createElement('LINK');
		  nyroModalCSSLink.rel = 'stylesheet';
		  nyroModalCSSLink.href = '/stat/css/jquery.nyroModal.css';
		  nyroModalCSSLink.type = 'text/css';
		  nyroModalCSSLink.media = 'screen';
		  document.body.insertBefore(nyroModalCSSLink, null);    
		  
		var lightboxScriptLink = document.createElement('SCRIPT');
		  lightboxScriptLink.src = '/stat/admin/js/jquery/jquery.lightbox.js';
		  lightboxScriptLink.type = 'text/javascript';
		  document.body.insertBefore(lightboxScriptLink, null); 
		  
		var nyroModalScriptLink = document.createElement('SCRIPT');
		  nyroModalScriptLink.src = '/stat/js/jquery.nyroModal.js';
		  nyroModalScriptLink.type = 'text/javascript';
		  document.body.insertBefore(nyroModalScriptLink, null); */
          
        var startScript = document.createElement('SCRIPT');
        startScript.type = 'text/javascript';
        //startScript.setAttribute = ('onload',"\n\t$(document).ready(function(){\n\t$('.nyroModal').nyroModal();\n\t});\n");
        startScript.innerHTML = "function goNyro(){$('.nyroModal').nyroModal();}";
        document.head.insertBefore(startScript, null);
        
 /*        var lightboxCSSLink = document.createElement('LINK');
        lightboxCSSLink.rel = 'stylesheet';
        lightboxCSSLink.href = '/stat/js/jquery-ui-1.10.2.custom/css/ui-lightness/jquery-ui-1.10.2.custom.min.css';
        lightboxCSSLink.type = 'text/css';
        lightboxCSSLink.media = 'screen';
        document.body.insertBefore(lightboxCSSLink, null);
              
        var nyroModalCSSLink = document.createElement('LINK');
        nyroModalCSSLink.rel = 'stylesheet';
        nyroModalCSSLink.href = '/stat/js/jquery.nyroModal/styles/nyroModal.css';
        nyroModalCSSLink.type = 'text/css';
        nyroModalCSSLink.media = 'screen';
        document.body.insertBefore(nyroModalCSSLink, null);    
              
        var lightboxScriptLink = document.createElement('SCRIPT');
        lightboxScriptLink.src = '/stat/js/jquery-ui-1.10.2.custom/js/jquery-ui-1.10.2.custom.min.js';
        
        lightboxScriptLink.type = 'text/javascript';
        document.body.insertBefore(lightboxScriptLink, null); 
              
        var nyroModalScriptLink = document.createElement('SCRIPT');
        //nyroModalScriptLink.src = '/stat/js/jquery.nyroModal.js';
        nyroModalScriptLink.src = '/stat/js/jquery.nyroModal/js/jquery.nyroModal.custom.js';
        nyroModalScriptLink.type = 'text/javascript';
        document.body.insertBefore(nyroModalScriptLink, null); */          
		
		var dataNodes = document.getElementsByClassName('infolink');	
			
			for (i=0; i<dataNodes.length; i++){
				if (dataNodes[i].innerHTML == 'P'){
					Idx = dataNodes[i].href.lastIndexOf('=') + 1;
					hrefId = dataNodes[i].href.substring(Idx);
					var linkButton = document.createElement("a");
						linkButton.setAttribute('class','nyroModal infolink');
						linkButton.setAttribute('title','Link: поиск связей с товаром');
						linkButton.href = 'http://fotomag.com.ua/admin/index.php?action=product/binds&id=' + hrefId;
						linkButton.innerHTML = 'L';
						dataNodes[i].parentElement.insertBefore(linkButton,dataNodes[i].nextSibling.nextSibling);
				}
			}
		
            var startFunc = document.createElement('script');
		startFunc.innerHTML = 'setTimeout(\'goNyro();\',100)';
		document.body.appendChild(startFunc);
	}
	catch(er){
	txt = 'There is an error in module \'linkButtonAdd\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}
}
	
if(productCodeToLinks && HREForderIdFlag){
	try{
		 var lightboxCSSLink = document.createElement('LINK');
		  lightboxCSSLink.rel = 'stylesheet';
		  lightboxCSSLink.href = '/stat/admin/css/jquery.lightbox.css';
		  lightboxCSSLink.type = 'text/css';
		  lightboxCSSLink.media = 'screen';
		  document.body.insertBefore(lightboxCSSLink, null);
		  
		var nyroModalCSSLink = document.createElement('LINK');
		  nyroModalCSSLink.rel = 'stylesheet';
		  nyroModalCSSLink.href = '/stat/css/jquery.nyroModal.css';
		  nyroModalCSSLink.type = 'text/css';
		  nyroModalCSSLink.media = 'screen';
		  document.body.insertBefore(nyroModalCSSLink, null);    
		  
		var lightboxScriptLink = document.createElement('SCRIPT');
		  lightboxScriptLink.src = '/stat/admin/js/jquery/jquery.lightbox.js';
		  lightboxScriptLink.type = 'text/javascript';
		  document.body.insertBefore(lightboxScriptLink, null); 
		  
		var nyroModalScriptLink = document.createElement('SCRIPT');
		  nyroModalScriptLink.src = '/stat/js/jquery.nyroModal.js';
		  nyroModalScriptLink.type = 'text/javascript';
		  document.body.insertBefore(nyroModalScriptLink, null); 
		var ProductCodes = document.getElementsByName('product[]');
			if(ProductCodes.length > 0)
			{
				for(i=0;i<ProductCodes.length;i++)
				{
				var hrefID = ProductCodes[i].value;
				// переписать эту часть, ресурсы ж ёпт!
				var allCodes = document.evaluate( "//text()[contains(., '" + hrefID + "' )]", document, null, XPathResult. ORDERED_NODE_SNAPSHOT_TYPE , null);
					for(y = 0; y < allCodes.snapshotLength; y++)
					{
					var cur = allCodes.snapshotItem(y);
					var par = cur.parentNode;
					var textInd;
					var curName = cur.nodeName;
						do
						{
						var curText = cur.nodeValue;
						textInd = curText.indexOf(hrefID);
							if(textInd != -1)
							{
							var before = document.createTextNode( curText.substring(0, textInd ) );
							var linking = document.createElement("a");
							linking.name = 'toDistrib';
							linking.textContent = hrefID;
							linking.href = 'http://fotomag.com.ua/admin/index.php?action=product/binds&id=' + hrefID;
							// linking.target = '_blank';
							linking.setAttribute('class','nyroModal');
							var after = document.createTextNode( curText.substring(textInd + hrefID.length) );
							par.insertBefore(before, cur);
							par.insertBefore(linking, cur);
							par.insertBefore(after, cur);
							par.removeChild(cur);
							cur = after;
							}
						} 
						while(textInd != -1)
					}  
				}
			}
	}
	catch(er){
	txt = 'There is an error in module \'productCodeToLinks\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}
}
if(removeTop && !HREFproductBindsFlag){
	try{
		function hideTopMenu(){
		var menu = document.getElementsByClassName('topmenu');
		var sel_menu = document.getElementsByClassName('topmenu_selected');	
		if (menu[5].style.display=='none'){ //|| sel_menu[0].style.display=='none') {
			for (i=0; i<menu.length; i++){
			menu[i].style.display='';}
			for (i=0; i<sel_menu.length; i++){
			sel_menu[i].style.display='';
			}
			} 
		else {
			for (i=0; i<menu.length; i++){
			menu[i].style.display = 'none';
			}
			for (i=0; i<sel_menu.length; i++){
			sel_menu[i].style.display = 'none';
			}
			}
			}
		// здесь была ф-ция getElementByTitle			
		var linkToTop = document.createElement('a');
		linkToTop.setAttribute('onclick','hideTopMenu();');
		linkToTop.href = '#';
		var insertionPlace = getElementByTitle('div','Это отладочная штука, не обращайте внимания');
		linkToTop.innerHTML = insertionPlace.innerHTML;
		insertionPlace.innerHTML = '';
		insertionPlace.appendChild(linkToTop);
		hideTopMenu();
		var scriptTag = document.createElement('script');
		scriptTag.innerHTML = hideTopMenu;
		document.body.appendChild(scriptTag);
		
		var linkToSettings = document.createElement('a');
			linkToSettings.href = 'http://fotomag.com.ua/admin/us-config.php';
			linkToSettings.setAttribute('target','_blank');
			linkToSettings.setAttribute('style','margin-left: 10px;');
			linkToSettings.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAB2ElEQVQoU12SW0sbURDHF0yg+BJLEK8PCVSwRbyAWIK6TUybPjQPpmC8RPQ7qAXf6r5opC2tF6K1tRaSeqUmXoomipq46yU2bmoaRRHqwko/xt+dg+bBA8OZM/ObM2fODMfdLoPBkKXT6bJNJrPQ1d2jdnW/UU1ms0A28t1xbDcajbk2u1202hqkF46XsqL+BwnpZLPZn4vEMJiieatNTJyc4vefNPYTKUSicQTXowiFo9g7SoJ8vLVBNOQ8zOIoZW09L4lxGXL6ArF4EmvbB1hY3cLk7ArG/IuIxA5AjF6vz+YKi4oFSy0vJ1JnSGoBS+tbaGnvVFo8HcqXwE98mpzDeCAISx0vE8s1ezqvlyO7OLu8wvHfc7x2tyla1gckrqZWZXhqHoNjASxt7EJjVc7l9lxPhyI4vfiH49Q5nC53JsDZ2KQMf5uH1+cHMRqrcnn5BUJV9VN5Zz/BnjS9+AsOp0txvGpUPn72Y0h70rvxAIghlhVdWlYpDX2dwaGcZkWvbkqYXd5gRVMN3tHvIIZY9q3aQXz7fgL9I1MMDIVj+BEMs9v7PkyAfMRkGkhNKXlcLj4qLZNKnlTIvV4fegd8IJ3ZNF+mcfdHI8eYK9Q8c6gkpN8fjRtjEQVKuQStEQAAAABJRU5ErkJggg==">';
		insertionPlace.insertBefore(linkToSettings,null);
	}
	catch(er){
	txt = 'There is an error in module \'removeTop\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}
}
if(removeAnnoyingButtons && HREForderIdFlag){
	try{
		var info_menu = document.getElementsByClassName('infolink');
			for (i=0; i<info_menu.length; )
			{
			info_menu[i].parentNode.removeChild(info_menu[i]); // www
			i++;
			info_menu[i].parentNode.removeChild(info_menu[i]); // p
			info_menu[i].parentNode.removeChild(info_menu[i]); // o
			// info_menu[i].style.visibility = 'hidden';
			} 
	}
	catch(er){
	txt = 'There is an error in module \'removeAnnoyingButtons\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}
}
if(HREFforecast && procurementForecast){
    try{
        var myGroups = [239, // клавомыши
                        199, // клавиатуры
                        200, // мыши
                        240, // игровые манипуляторы
                        570, // игровые коврики
                        201, // планшеты
                        203, // компьютерная акустика
                        202, // ТВ тюнеры
                        226, // веб камеры
                        434, // маршрутизаторы WiFi
                        206, // роутеры свитчи
                        422, // точки доступа
                        204, // модемы
                        23, // сетевые адаптеры
                        423, // сетевые адаптеры
                        254, // сетевые карты
                        253, // принтсерверы
                        436, // ip телефоны
                        162, // voip шлюзы
                        186, // мфу
                        187, // принтеры
                        188, // сканеры
                        430, // картриджи
                        431, // снпч
                        432, // чернила
                        433, // бумага для принтеров
                        818 // средства для оргтехники
                        ];
        var forecastGroupSelect = document.getElementsByName('group_id')[0];
            for (i=0; i<forecastGroupSelect.length; i++){
                forecastGroupSelect.children[i].setAttribute('toremove','');
               }
          
        for (i=0; i<forecastGroupSelect.length; i++){
            for (y=0; y<myGroups.length; y++){
               if (forecastGroupSelect.children[i].value == myGroups[y]){
                   forecastGroupSelect.children[i].removeAttribute('toremove');
                   break;
               }
            }       
        }
        for (i=0; i<forecastGroupSelect.length; i++){
            if (forecastGroupSelect.children[i].hasAttribute('toremove')) {
                   forecastGroupSelect.children[i].parentNode.removeChild(forecastGroupSelect.children[i]);
                   i--;
               }  
        }
        /* for (i=0; i<forecastGroupSelect.length; i++){
            if (forecastGroupSelect.children[i].hasAttribute('disabled')){
                   forecastGroupSelect.children[i].hidden = true;
               }  
            }       */
        forecastGroupSelect.size = 8;        
    }
    catch(er){
	txt = 'There is an error in module \'procurementForecast\'\nError message text:\n';
	txt += er.message;
	console.log(txt);        
    }
}    
/* Copyright (C) 2007 Matthew Flaschen <matthew DOT flaschen AT gatech DOT edu>
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.*/
if(stones8){// && currentLocation.indexOf('action=product') != -1){
	try{
		var TEXT = 'РЦ Хранение';
		var COLOR = "red";
		var allText = document.evaluate( "//text()[contains(., '" + TEXT + "' )]", document, null, XPathResult. ORDERED_NODE_SNAPSHOT_TYPE , null);
		for(i = 0; i < allText.snapshotLength; i++)
		{
		var cur = allText.snapshotItem(i);
		var par = cur.parentNode;
		var textInd;
		var curName = cur.nodeName;
		do
		{
		var curText = cur.nodeValue;
		textInd = curText.indexOf(TEXT);
		if(textInd != -1)
		{
		var before = document.createTextNode( curText.substring(0, textInd ) );
		var highlight = document. createElement("span");
		highlight.class = "highlight";
		highlight.textContent = TEXT;
		highlight.style.color = COLOR;
		var after = document.createTextNode( curText.substring(textInd + TEXT.length) );
		par.insertBefore(before, cur);
		par.insertBefore(highlight, cur);
		par.insertBefore(after, cur);
		par.removeChild(cur);
		cur = after;
		}
		} while(textInd != -1)
		}
	}
	catch(er){
	txt = 'There is an error in module \'stones8\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}
}
if(buttonToDealer){
	try{
		/* функция и шаблон для отправки POST запросов */ 
		function post_to_url(path, params, method, target) {
			method = method || "post"; // Set method to post by default, if not specified.
			// The rest of this code assumes you are not using a library.
			// It can be made less wordy if you use one.
			var form = document.createElement("form");
			form.setAttribute("method", method);
			form.setAttribute("action", path);
			form.setAttribute("target", target || "_blank");
			for(var key in params) {
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", key);
				hiddenField.setAttribute("value", params[key]);
				form.appendChild(hiddenField);
			}
			document.body.appendChild(form);
			form.submit();
		}
		var postScriptTag = document.createElement('script');
		postScriptTag.innerHTML = post_to_url;
		document.body.appendChild(postScriptTag);
	
     function returnTrendImg(trendValue){
			if(trendValue){
			base64TrendUpImg = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfcAhUWBRYlJxzvAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAACBSURBVChTY/j//z8DMZgoRSCDsCrsmfQHKIdqE4bCM3op/98w8eBXuCZtz/8/TCxgfMQoB0UxiolfgCbBFIJokEaYE+AKr0i5oCgCKQRpxFBY0vUHbALMxDN2Of9LkDyFYvWaLCLdSLxCYn0NCugWoFt7+v78r2lCDXTKohBbIgEA0OeJkD4Z6S4AAAAASUVORK5CYII=" style="padding:0px; vertical-align:text-bottom; margin:0pt; background: none repeat scroll 0% 0%;" title="'+trendValue+'">';
			base64TrendDownImg = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfcAhUWBDjg6iBhAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAAChSURBVChTY/j//z8DMZgoRSCDUBT29P3539IFxEC6pukPUB5hG4rCnGVH/vPcU/kv8kjmv826FjwKF0EUgjB+hWATZfCb2FL1538O0ESRezpgxS67Wv6DxGDuhLtRZ1cKxH23dMBY5pbJf5FzJpgKQTpBEmAFQAwyFeQ5DBNBAghfE/AMSLHNthqglTYoQYMR4DBreiahBjZOhdjinui4BgDTHYuIa3wNNgAAAABJRU5ErkJggg==" style="padding:0px; vertical-align:text-bottom; margin:0pt; background: none repeat scroll 0% 0%;" title="'+trendValue+'">';
                
				if(trendValue > 0){
				return base64TrendUpImg;
				}
				else{
				return base64TrendDownImg;
				}
			
			}
			else{
			return '';
			}
		}
     
     
     
		var supSels = document.getElementsByClassName('supp');
			for (i=0;i<supSels.length;i++){
				for (y=0;y<supSels[i].children.length;y++){
					if(supSels[i].children[y].hidden == false && typeof supSels[i].children[y].children[0] == 'object' && typeof supSels[i].children[y].children[0].text != 'undefined')
					{
						
						var eqIdx = supSels[i].children[y].children[0].text.indexOf('=') ;
						var dealerName = supSels[i].children[y].children[0].text.substring(0,eqIdx);
						dealerName = dealerName.replace(/^\s*([\S\s]*?)\s*$/, '$1');
						
						if(supSels[i].children[y].children[0].text.substring(eqIdx).indexOf('(') != -1){
							var trendStartIdx = supSels[i].children[y].children[0].text.lastIndexOf('(')+1;
							var trendEndIdx = supSels[i].children[y].children[0].text.lastIndexOf(')');
							var currTrend = supSels[i].children[y].children[0].text.substring(trendStartIdx, trendEndIdx);
							supSels[i].children[y].children[0].innerHTML = supSels[i].children[y].children[0].innerHTML.replace(/[(]+[-]?(\d+[.]?\d*)+[)]/, returnTrendImg(currTrend));
						}
						
						// cherry
						var base64preferedSuppImg = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfcAhoTHg+20q0IAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAAFUSURBVChTdZHbK4MBGMa/uJAaIVKWkCJlQiPlMIeIhihCG2vJjsnhhhVRUxKb9RU3nyGHQuR0o9RSLsSF8QdIrpR2wZWk/Iy0pW0X7837Pr+3930eARDClTg97G+HzsKKf4Ruuwlp0hgCRQTGNHWMm9XoV9NRO+LotdX+wmGBgyUn084SXOflLJwVoTlKwraoDwIn0gbXLVbuOw2IJh2W/gqkNyN7tzqWvbVY7hMw7GfQM6VEcDkWeKzXQusoKBq4kys5NBnx2Sd5ER2cbnah88RQNx/NrHsEYUKjx5ddzru8mOfEfG6yVHz1zoDKymdxMw/J1cwN1LB7sRU8aTuniishkx1BzqWiCao7+Khs5zVFgScqG7GwLeBW4GlJP8RiYzdSn5kHWR5Psbl44wtYF9KYLfMv+cskrEtrai3HqaWsyBTYM5X/soiYg+hyMmMeDAnuG6F5W5iqAlYcAAAAAElFTkSuQmCC">';
						// plum
						var base64unpreferedSuppImg = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAfJJREFUKFNjYICCojavsOYpkWGlHQHe1d2B+UUNrgtKWu0OzFkTf2jSkqjZ9dP9ZGFqwXRkjq5PUJz/P2PXSf+t/fb+t3Bb+9/Jt+B/Rbvz/6Z+t//uoQrXp86rYQIrLsxeyWzlf7W7pufZv9MXX/6/eP3V/xlL3/wvqbn/X0Wt57+Vs+z/cA+Z97mxRvVgDRZel6ZPmvf6/5Mnr/+fPf3h/6xFX/87x774zyd74r+M7Jz/pso2zyd0BFgHxSrtZNB2uGARlvXy/5Ztn/+f3Pf1/4l9n/93T/ryX8P53n92oYP/OTna/3sF2f6v6jT6G52jlM+gaHO7r7Dpw/+O7i//ly388b+798t/p7Cn/3mVzv1n4978X0XD/39+ner/sDTZl2llNrwM6nY3N9uEPfvvEf3iv3/Cy/+Gng//86td+M/Gt+s/B9u0/5bOZv/zgBoCEhQLwO6X1TyxQFj9HFgRn8r5/xzix/6z8Wz9z8254L+kyKz/wQmW/3PqVJ8k5puKgzWoax5U5hbY+pmNe+t/Nq4N/9nZl/wX4Vv8X0pkyX8O1pb/IbGeR3tnu0ugxIGYxIaJbBwrgIqX/ufhWvyfk33qf37unr/6Wov6G5uOsKIoBnEiIhaxyctOaBIV6j0tIdxzTlGmf6aL/RJjDIVAAQDj/eA82UWKGgAAAABJRU5ErkJggg==">';
						// star
						var base64staredSuppImg = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAVJJREFUKFNj4OLiYkDHt49zRZ07zKWITQ5D8dalXEyf7xlceXOFaxpRGh5d4Ar6/zb+/+/7Kt/PneCSRNeEYsPu6VxcX26Ln/z/yuv//2ea/99e4pp/ZAWX+oaZXKwwjQy3j3CVfr7vsvv7Y7NHf1+a/v3/0gGoWOP//0dccPz1FtefT5e47u1dwdXKsGgKl8nraxbv/7/L/P//lTtQsTpQITeKhv/3uf4fXs31a/LExnCwkxZO4jJ/e5n7zf9naqgKobYc28z1e/Lk+jCQWrgfFvdxmQCd8Q/ZKSD291tc/2dOKk2E+wHGOLCCSx5dMYy/ZymXPYaGB0e5PGAKHp/i+n9zP9TTT7n+X97DlYOh4eV5ruJXF7j+b1jE9XbChIbCrpZqpdXTuObePsr1+/ZhLmCAQ1IE3A+b5vIW9HZmdCxctkIAObJaqqM1F/bKlMPEAL4U4LnwhwEFAAAAAElFTkSuQmCC">';				
						// cart
                        var base64CartImg = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAHdElNRQfdAQ8OJQd7fvT5AAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAAFoSURBVChTbZK9S0JhFMYvKIokekMQPxL8GhoUzUERi8C7uAiR9DEZ0RCoFLWKiQ32FxTVIAkXMbhgQ39AREMYNFUgNNTUElFT1PL0XBPpYsOP97zveZ57zznvKwDQcJFM4qtUYgghnU5DkiR0Op3+XmXE0BVFrPFYISIRBuTzeab/MfTsdsy73bgaG4N3IPaGQv1VzY8Yrik8zuXw4vdjLhrFeiSC92YTMyxPzY8YnhwObFksuNfrsenzoerxYJ8yKRjEabmsFatUDAasUvBMlineIA2dDncmE25cLq24225j3GrFhNGIIxrOzGZckgfGj+Q7HNYablstTLOMFfYh2myQKXoln/zDB9c39qUxqAQ5pSUmZ+NxHLCPNuMeSbHUxUxGK65UqzjhRHZjMUw6ndih0MIhFLJZTAUCWOBd9IWKoqBerzP83W8Xi9ir1XBeKCCVSOCw0Rjmhl9XkWUZST6Nv2daIPwAgVFM3FY4vnIAAAAASUVORK5CYII=">';
						switch(dealerName)
							{
							case 'БРАИН': // ок, по коду
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'http://mediawest.com.ua/index.php?30&backPID=30&category=first&swords=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);
								break;
							case 'БРАИН Львов': // ок, по коду
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'http://mediawest.com.ua/index.php?30&backPID=30&category=first&swords=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);
								break;
							case 'МТиАй': // ок, по коду
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'https://www.distri.mti.ua/search?q=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
									
									if (supSels[i].children[y].children[2].children[0].textContent.indexOf('/W606') != -1){
										productCode = productCode.replace(/\/W606/gi, '');
										var prompt = 'confirm(\"Привязанный товар на складе 606, повреждена упаковка!\\nУверены, что хотите его резервировать?\") ? window.open(\''+ link + productCode + '\',\'_blank\') : void 0;'
									}
									else {
									var prompt = 'window.open(\''+ link + productCode + '\',\'_blank\'); return false;';
									}
										
								newButtonWWW.setAttribute('onclick', prompt);
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);	
								break;
							case 'МТиАй_W300': // ок, по коду
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'https://www.distri.mti.ua/search?q=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
									
									if (supSels[i].children[y].children[2].children[0].textContent.indexOf('/W606') != -1){
										productCode = productCode.replace(/\/W606/gi, '');
										var prompt = 'confirm(\"Привязанный товар на складе 606, повреждена упаковка!\\nУверены, что хотите его резервировать?\") ? window.open(\''+ link + productCode + '\',\'_blank\') : void 0;'
									}
									else {
									var prompt = 'window.open(\''+ link + productCode + '\',\'_blank\'); return false;';
									}
										
								newButtonWWW.setAttribute('onclick', prompt);
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);	
								break;                                    
							case 'Сервис ПФ': // ок, грабим все от последней запятой, удаляем всё кириллическое 
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var lastIdx = productCode.lastIndexOf(',') + 1;
								productCode = productCode.substring(lastIdx);
								productCode = productCode.replace(/[а-яА-Я]/g,'');
								productCode = productCode.replace(/^\s*([\S\s]*?)\s*$/, '$1');
								var link = 'http://www.service.dp.ua/price?q=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
														
															
									if (supSels[i].children[y].children[2].children[2].textContent.indexOf('*Б/У') != -1){
										var prompt = 'alert(\"Привязанный товар бывший в употреблении!\\nЕго нельзя резервировать.\");'
									}
									else {
									var prompt = 'window.open(\''+ link + productCode + '\',\'_blank\'); return false;';
									}
										
														
								newButtonWWW.setAttribute('onclick',prompt);
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break; 
							case 'КЭН': // ок, по коду
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'http://can.dp.ua/partners/order/search/?a=1&page=1&search=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '&type=1&group=0\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;			
							case 'Пс Шоп': // ок, по коду
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'https://188.230.127.214/Catalog.aspx?Mode=Search&By=Code&Text=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;			
							case 'Пс Шоп Днепр': // ок, по коду
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'https://e-shop.pcshop.com.ua/Catalog.aspx?Mode=Search&By=Code&Text=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;			
							case 'МастерГруп': // ок, по коду
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'http://mastergroup.com.ua/catalog/?q=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								
									if (supSels[i].children[y].children[2].children[2].textContent.indexOf('(REF)') != -1){
									var prompt = 'confirm(\"Привязанный товар б/у!\\n Вы уверены, что хотите его резервировать?\") ? window.open(\''+ link + productCode + '\',\'_blank\') : void 0;';
									}
									else {
									var prompt = 'window.open(\''+ link + productCode + '\',\'_blank\'); return false;';
									}
									
								newButtonWWW.setAttribute('onclick', prompt);
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break; 
							case 'ДС Линк': // вроде работает, думаю будет процентов 75-85% попаданий
								var productCode = supSels[i].children[y].children[2].children[2].textContent.match(/[a-zA-Z0-9\-\.\+ *\,\(\)]+[^\sа-яА-Я]/g, '$1');
								var link = 'http://opt.dclink.com.ua/price.htm?type=43&s=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','searchPhrase = prompt(\'\\t\\tПодготовьте запрос к сайту ДС Линк\\t\\t\',\''+productCode+'\'); if(searchPhrase != null && searchPhrase != "") {window.open(\''+ link +'\' + searchPhrase,\'_blank\'); return false;} else {void 0;}');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;
							case 'Микротрон': // ок, по коду
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'http://www.microtron.zp.ua/goods#p';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;
							case 'ИТ Планет': // get, по коду
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'http://www.itplanet.zp.ua/catalog#p';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;                                    
							case 'Квазар-Микро': // ок, по коду
                                supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'https://b2b.kvazar-micro.com/#!np;t={%22a%22:{%22c%22:false,%22i%22:0,%22b%22:2,%22h%22:%22%3E==%22,%22d%22:%22';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + "%22},%22d%22:0,%22b%22:%22smp%22,%22c%22:[-1]}" +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;         
							case 'Квазар-Микро HP': // ок, по коду
                                supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'https://b2b.kvazar-micro.com/#!np;t={%22a%22:{%22c%22:false,%22i%22:0,%22b%22:2,%22h%22:%22%3E==%22,%22d%22:%22';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + "%22},%22d%22:0,%22b%22:%22smp%22,%22c%22:[-1]}" +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;                                          
							case 'КПИ-Сервис': // ок, по коду
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'http://kpi.com.ua/search/tabled/';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','post_to_url(\''+link+'\', {search:\''+productCode+'\',new_search:1}); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);
								break;			
							case 'АйТи-Линк': // get, по коду больше не работает, верификация cookie
                               /*  supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var Idx = productCode.indexOf(',')+1;
								Idx = productCode.indexOf(',',Idx);
								productCode = productCode.substring(0,Idx);
								productCode = productCode.replace(/^\s*([\S\s]*?)\s*$/, '$1');						
								var link = 'http://it-link.ua/Home/Search?q=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+link+productCode+'&page=1&vw=1\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);		*/
                                supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								productCode = '#' + productCode;
								var link = 'http://it-link.ua/';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);
								break;
							case 'Асбис ИТ': // get через hash с extra
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
									
									if(supSels[i].children[y].children[2].children[0].textContent.length > 0) {
										var productCode = supSels[i].children[y].children[2].children[0].textContent;
									}
									else {
										var productCode = supSels[i].children[y].children[2].children[2].textContent;
										var Idx = productCode.lastIndexOf(',')+1;
										productCode = productCode.substring(Idx);
										productCode = productCode.replace(/^\s*([\S\s]*?)\s*$/, '$1');	
									}
								productCode = '#' + productCode;
								var link = 'https://www.it4profit.com/lite/shopITProducts.jsp?OPT=1&SDATA=1';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);
                                break; 
							case 'Прэксим-Д (IT)': // ок, по коду*
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								productCode = '#' + productCode;
								var link = 'http://www1.prexim-d.com:81/items/search.php';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;	
							case 'ЕРС': // ок, по коду*
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								productCode = '#' + productCode;
								var link = 'https://connect.erc.ua/consumer/?rand=' + Math.floor((Math.random()*10000000)-1);;
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;
							case 'СТЕК Киев': // ок, по коду*
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								productCode = '#' + productCode;
								var link = 'https://web.stek.com.ua/start.asp';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								
									if (supSels[i].children[y].children[2].children[2].textContent.indexOf('у_') != -1){
										var prompt = 'alert(\"Привязанный товар бывший в употреблении!\\nЕго нельзя резервировать.\");'
									}
									else {
									var prompt = 'window.open(\''+ link + productCode + '\',\'_blank\'); return false;';
									}						
									
								newButtonWWW.setAttribute('onclick',prompt);
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;							
							case 'СТЕК Львов': // не работает, результат стремится отдать в свой фрейм, который не открыт
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								productCode = '#' + productCode;
								var link = 'https://web.stek.com.ua/start.asp';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								
									if (supSels[i].children[y].children[2].children[2].textContent.indexOf('у_') != -1){
										var prompt = 'alert(\"Привязанный товар бывший в употреблении!\\nЕго нельзя резервировать.\");'
									}
									else {
									var prompt = 'window.open(\''+ link + productCode + '\',\'_blank\'); return false;';
									}						
									
								newButtonWWW.setAttribute('onclick',prompt);
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;
							case 'Юг-Контракт КИЕВ': // ок, по коду*
								/*supSels[i].children[y].children[0].innerHTML = base64preferedSuppImg + supSels[i].children[y].children[0].innerHTML;
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								productCode = '#' + productCode;
								var link = 'http://wholesale.yugcontract.ua/wholesale/';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);	*/
                                // new method    
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'http://wholesale.yugcontract.ua/wholesale/list/search/#l20/sort-model/?q=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);    
								break;	
							case 'ЭЛКО': // ок, по коду*
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								productCode = '#' + productCode;
								var link = 'https://kiev.elkogroup.com/body.asp';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);			
								break;	
							case 'alles': // ок, по описанию
								var productCode = supSels[i].children[y].children[2].children[2].textContent;
								var newButtonWWW = document.createElement('button');
								var link = 'http://alles.dp.ua/find/?find='
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;
							case 'Асбис': // ок, с подстраховкой
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
									if(supSels[i].children[y].children[2].children[0].textContent.length > 0) {
										var productCode = supSels[i].children[y].children[2].children[0].textContent;
									}
									else {
										var productCode = supSels[i].children[y].children[2].children[2].textContent;
										var Idx = productCode.lastIndexOf(',')+1;
										productCode = productCode.substring(Idx);
										productCode = productCode.replace(/^\s*([\S\s]*?)\s*$/, '$1');	
									}
								productCode = '#' + productCode;
								var link = 'https://www.it4profit.com/lite/shopITProducts.jsp?OPT=1&SDATA=1';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break; 
							case 'Асбис Склад 2': // ок, с подстраховкой
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
									if(supSels[i].children[y].children[2].children[0].textContent.length > 0) {
										var productCode = supSels[i].children[y].children[2].children[0].textContent;
									}
									else {
										var productCode = supSels[i].children[y].children[2].children[2].textContent;
										var Idx = productCode.lastIndexOf(',')+1;
										productCode = productCode.substring(Idx);
										productCode = productCode.replace(/^\s*([\S\s]*?)\s*$/, '$1');	
									}
								productCode = '#' + productCode;
								var link = 'https://www.it4profit.com/lite/shopITProducts.jsp?OPT=1&SDATA=1';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;                                     
							case 'МУК': // ок, по описанию
                                supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[2].textContent;
								var lastIdx = productCode.lastIndexOf(',') + 1;
								productCode = productCode.substring(lastIdx);
								productCode = productCode.replace(/^\s*([\S\s]*?)\s*$/, '$1'); 					 
								var newButtonWWW = document.createElement('button');
								var link = 'http://muk.ua/catalog/index.php';
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','post_to_url(\''+link+'\', {a:\'\',art:\'\',name:\''+productCode+'\'}); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;		
							case 'Gembird': // ок, по коду*	
                                supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								productCode = '#' + productCode;
								var link = 'http://www.gembird.ua/b2b/add_position_frame.asp?mode=add_order';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);			
								break;
							case 'Юг-Контракт Днепр': // ок, по коду*
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'http://wholesale.yugcontract.ua/wholesale/list/search/#l20/sort-model/?q=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);    	
								break;      
							case 'Юг-Контракт Харьков': // ок, по коду*
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'http://wholesale.yugcontract.ua/wholesale/list/search/#l20/sort-model/?q=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);    		
								break;  
							case 'Юг-Контракт Львов': // ок, по коду*
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'http://wholesale.yugcontract.ua/wholesale/list/search/#l20/sort-model/?q=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);    			
								break;                                      
							case 'Юг-Контракт Донецк': // ок, по коду*
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'http://wholesale.yugcontract.ua/wholesale/list/search/#l20/sort-model/?q=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);    		
								break;  
							case 'Юг-контракт Сиферополь': // ок, по коду*
								supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var link = 'http://wholesale.yugcontract.ua/wholesale/list/search/#l20/sort-model/?q=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);    		
								break;                                      
							case 'К-Трейд': // не работает
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								var productCode = supSels[i].children[y].children[2].children[2].textContent;
								productCode = '#' + productCode;
								var link = 'http://eclient.k-trade.ua/Product/Products/';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								// newButtonWWW.setAttribute('disabled','true');
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;	
							case 'МДМ': // ок
                                supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var newButtonWWW = document.createElement('button');
								var link = 'http://mdm-ua.com/Orders/Goods.aspx?group=&brand=&name=&partNumber=';
								newButtonWWW.type = 'button';
								
									if (supSels[i].children[y].children[2].children[2].textContent.indexOf('_K') != -1){
										var prompt = 'confirm(\"Привязанный товар уценён, повреждена упаковка!\\nУверены, что хотите его резервировать?\") ? window.open(\''+ link + productCode + '\',\'_blank\') : void 0;'
									}
									else {
									var prompt = 'window.open(\''+ link + productCode + '\',\'_blank\'); return false;';
									}
								
								newButtonWWW.setAttribute('onclick', prompt);						
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;
							 case 'Datalux': // ок, коду из описания
                                supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[2].textContent;
								var lastIdx = productCode.lastIndexOf(',') + 1;
								productCode = productCode.substring(lastIdx);
								productCode = productCode.replace(/^\s*([\S\s]*?)\s*$/, '$1'); 					 
								var newButtonWWW = document.createElement('button');
								var link = 'http://b2b.vsinvest.com.ua/dealer/price.asp?t=';
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','post_to_url(\''+link+'\', {c:0,cfDate:1,cfNA:1,cfNo:1,cfYes:1,g:0,txt_pn:\''+productCode+'\'}); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;
							case 'РОМА': // ок, по описанию
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var newButtonWWW = document.createElement('button');
								var link = 'https://secure.roma.ua/sclad.php?search='
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode +'\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;   
                            case 'Eletek': // ок, по описанию
                                supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[2].textContent;
								var lastIdx = productCode.lastIndexOf(',') + 1;
								productCode = productCode.substring(lastIdx);
								productCode = productCode.replace(/^\s*([\S\s]*?)\s*$/, '$1'); 		
								var newButtonWWW = document.createElement('button');
								var link = 'http://www.eletek.ua/ru/search/'
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','post_to_url(\''+link+'\', {sname:\''+productCode+'\'}); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;
                            case 'Sven': // post, по описанию
								var productCode = supSels[i].children[y].children[2].children[2].textContent;
                                productCode = "#" + encodeURIComponent(productCode);
								var newButtonWWW = document.createElement('button');
								var link = 'http://www.sven.dp.ua/?m=search'
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
                                newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);                                
                                break;
                            case 'Неолоджик': // post, по описанию
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var newButtonWWW = document.createElement('button');
								var link = 'http://b2b.neologic.com.ua/products/'
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
                                newButtonWWW.setAttribute('onclick','post_to_url(\''+link+'\', {search:1, group:"", brand:"", word:\''+productCode+'\'}); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;                                    
                            case 'DAKO': // ок, по описанию
                                supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var newButtonWWW = document.createElement('button');
                                var link = 'http://b2b.dako.ua/products/?brand=&word=';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;
                            case 'Техника для бизнеса': // GET, по описанию
                                supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[2].textContent;
								var lastIdx = productCode.lastIndexOf(',') + 1;
								productCode = productCode.substring(lastIdx);
								productCode = productCode.replace(/^\s*([\S\s]*?)\s*$/, '$1'); 	
                                productCode = '#' + productCode;    
								var newButtonWWW = document.createElement('button');
                                var link = 'http://dealers.tdb.ua:3333/Reserv/CatalogView.aspx';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;    
                            case 'Техника АО_Днепропетровск': // GET, по описанию
								var productCode = supSels[i].children[y].children[2].children[2].textContent;
								var lastIdx = productCode.lastIndexOf(',') + 1;
								productCode = productCode.substring(lastIdx);
								productCode = productCode.replace(/^\s*([\S\s]*?)\s*$/, '$1');   
                                productCode = '#' + productCode;       
								var newButtonWWW = document.createElement('button');
                                var link = 'http://dealer.texnika.com.ua/catalog/?';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break; 
                            case 'Техника АО_Донецк': // GET, по описанию
								var productCode = supSels[i].children[y].children[2].children[2].textContent;
								var lastIdx = productCode.lastIndexOf(',') + 1;
								productCode = productCode.substring(lastIdx);
								productCode = productCode.replace(/^\s*([\S\s]*?)\s*$/, '$1');   
                                productCode = '#' + productCode;       
								var newButtonWWW = document.createElement('button');
                                var link = 'http://dealer.texnika.com.ua/catalog/?';
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\''+ link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;                                    
                            case 'Тринити': // hash, по коду
                                supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[0].textContent;
								var newButtonWWW = document.createElement('button');
                                var link = 'http://www.b2b-client.ru/catalogue/';
                                var productCode = '#' + productCode;    
                                var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\'' + link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;  
                            case 'Технопарк': // 
                                supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
                              	var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-color: black; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(200, 200, 200); color: rgb(255, 255, 255);');
								newButtonWWW.setAttribute('onclick','alert(\'Сайт поставщика "'+ dealerName +'" пока не имеет ссылки!\\nСвяжитесь с разработчиком, если нужно его добавить.\\nICQ:155510546\'); return false;');
                              	newButtonWWW.innerHTML = getLocalSupplier(dealerName);
                                supSels[i].children[y].appendChild(newButtonWWW);                              
                                break;
                            case 'Exim standart (A4tech)': // hash, по коду 
                                supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[2].textContent;
								var newButtonWWW = document.createElement('button');
                                var link = 'http://dealer.exims.kiev.ua/catalog/';
                                var productCode = '#' + productCode;    
                                var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\'' + link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;
                            case 'Эксим Сток': // hash, по коду Эксим Сток
                                supSels[i].children[y].children[0].innerHTML = base64staredSuppImg + supSels[i].children[y].children[0].innerHTML;
								var productCode = supSels[i].children[y].children[2].children[2].textContent;
								var newButtonWWW = document.createElement('button');
                                var link = 'http://dealer.exims.kiev.ua/catalog/';
                                var productCode = '#' + productCode;    
                                var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('onclick','window.open(\'' + link + productCode + '\',\'_blank\'); return false;');
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(102, 102, 102); color: rgb(255, 255, 255);');
								newButtonWWW.innerHTML = getLocalSupplier(dealerName);
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;                                         
							case 'РЦ Хранение Днепр': // 
								supSels[i].children[y].children[0].innerHTML = base64CartImg + supSels[i].children[y].children[0].innerHTML;
                              	var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-color: black; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(200, 200, 200); color: rgb(255, 255, 255);');
								newButtonWWW.setAttribute('onclick','alert(\'Сайт поставщика "'+ dealerName +'" пока не имеет ссылки!\\nСвяжитесь с разработчиком, если нужно его добавить.\\nICQ:155510546\'); return false;');
                              	newButtonWWW.innerHTML = getLocalSupplier(dealerName);
                                supSels[i].children[y].appendChild(newButtonWWW);                              
                                break;
							case 'РЦ Хранение Киев': //
								supSels[i].children[y].children[0].innerHTML = base64CartImg + supSels[i].children[y].children[0].innerHTML;
                              	var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-color: black; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(200, 200, 200); color: rgb(255, 255, 255);');
								newButtonWWW.setAttribute('onclick','alert(\'Сайт поставщика "'+ dealerName +'" пока не имеет ссылки!\\nСвяжитесь с разработчиком, если нужно его добавить.\\nICQ:155510546\'); return false;');
                              	newButtonWWW.innerHTML = getLocalSupplier(dealerName);
                                supSels[i].children[y].appendChild(newButtonWWW);
                                break;
                            default: // заглушка
								var newButtonWWW = document.createElement('button');
								newButtonWWW.type = 'button';
								newButtonWWW.setAttribute('style','padding: 0pt; margin: 0pt; border: medium none; border-color: black; border-radius: 2px 2px 2px 2px; font-size: 9px; background: none repeat scroll 0% 0% rgb(200, 200, 200); color: rgb(255, 255, 255);');
								newButtonWWW.setAttribute('onclick','alert(\'Сайт поставщика "'+ dealerName +'" пока не имеет ссылки!\\nСвяжитесь с разработчиком, если нужно его добавить.\\nICQ:155510546\'); return false;');
								newButtonWWW.innerHTML = 'www';
								supSels[i].children[y].appendChild(newButtonWWW);				
								break;
													
					}
					}
				}
			}
	}
	catch(er){
	txt = 'There is an error in module \'buttonToDealer\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}
}
if(hidingSupplierSelect && suppExists){
if(currentLocation.indexOf('orderid') != -1){
var value;
function hideSupSels(value){
	try{
		var supSels = document.getElementsByClassName('supp');
				for(i=0;i<supSels.length;i++)
				{
				supSels[i].style.textAlign = 'right';
				}
			
			if(value == undefined)
			{
				if(supSels[0].style.display == '')
				{	
					for(i=0;i<supSels.length;i++)
					{
					supSels[i].style.display = 'none';
					}
				}
				else
				{
					for(i=0;i<supSels.length;i++)
					{
					supSels[i].style.display = '';
					}
				}
			}
			else
			{
				var curSupSels = document.getElementsByClassName('supplier_select');
				for(i=0;i<curSupSels.length;i++)
				{
					if(curSupSels[i].getAttribute('op_id') == value)
					{
						if(curSupSels[i].parentNode.parentNode.style.display == '')
						{	
						curSupSels[i].parentNode.parentNode.style.display = 'none';	
						}
						else
						{
						curSupSels[i].parentNode.parentNode.style.display = '';	
						}
					break;
					}	
				} 
			}
	}
	catch(er){
	txt = 'There is an error in module \'hidingSupplierSelect\'\nError message text:\n';
	txt += er.message;
	console.log(txt);
	}
}
var linkSupPlace = document.getElementsByClassName('save_comment');
	for(i=0;i<linkSupPlace.length;i++)
	{
	product_id = linkSupPlace[i].value;
	var linkToShowSupSels = document.createElement('a');
	linkToShowSupSels.setAttribute('onclick','hideSupSels('+product_id+');');
	linkToShowSupSels.setAttribute('class','showSS');
	linkToShowSupSels.href = '#';
	linkToShowSupSels.innerHTML = '<br />'+'+++';
	linkSupPlace[i].parentNode.nextElementSibling.nextElementSibling.appendChild(linkToShowSupSels);
	}
var scriptSupTag = document.createElement('script');
scriptSupTag.innerHTML = hideSupSels;
document.body.appendChild(scriptSupTag);
if(hidingSupplierByDefault == true){
hideSupSels();}
else{
hideSupSels(false);}
}
else if (currentLocation.indexOf('provision') != -1){
var supSels = document.getElementsByClassName('supp');
	
	for(i=0;i<supSels.length;i++)
	{
	supSels[i].style.textAlign = 'right';
	}
}
}	
/* converting cyrillic to js-unicode
function convert(str) {
var str;
var outj = "";
for(i=0; i<str.length; i++)
{	var ch=str.charCodeAt(i);
	outj += "\\u";
	outj += ((ch>>12)&15) . toString(16);
	outj += ((ch>>8)&15) . toString(16);
	outj += ((ch>>4)&15) . toString(16);
	outj += (ch&15) . toString(16);
}
enc_string = outj;
return enc_string;
}*/
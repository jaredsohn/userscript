// ==UserScript==
// @name        FO Fleet Worker
// @namespace   Founders Online [Fleet worker]
// @include     http://founders.icedice.org/g.php?m=fleet
// @include     http://founders.icedice.org/g.php?m=fleet&a=cancel_orders
// @version     1.0
// ==/UserScript==
//Список таблиц
var Tables = document.getElementsByTagName('table');	//Список таблиц
var Child;												//Дочерний элемент
var IndexStr;											//Идекс в строке
var Str;												//Строка
var Str2;                                               //Еще одна строка
var Base;												//База флота
var CurrentPlanet;										//Текущая планета
var SelPlanet = document.getElementsByTagName('select')[0].firstChild; //Список планет
var FleetFlag = false;									//Признак генерации скрипта
var FleetId;											//Ссылка на флот
var TextScript;											//Текст скрипта
var i;

//Находим текущую планету
while (SelPlanet!= undefined) {
    if (SelPlanet.selected) {
        CurrentPlanet = SelPlanet.textContent;
    }
    SelPlanet = SelPlanet.nextSibling;
}

//Имя нам не надо, оставляем только координаты
while (CurrentPlanet.indexOf('[')+1) {
    CurrentPlanet = CurrentPlanet.substr(CurrentPlanet.indexOf('[')+1);
}

//Текущая планета
CurrentPlanet = CurrentPlanet.substr(0, CurrentPlanet.length-3);

//пройдем по списку таблиц
for (i = 0; i < Tables.length; i++) {
	//Первый дочерний элемент
    Child = Tables[i].firstChild;
    //Углубимся внутрь до столбца
    while (Child!=undefined && Child.tagName!='TD') {
        Child = Child.firstChild;
    }
    //Если это табличка с флотами - выходим
    if(Child!=undefined && Child.textContent.substr(0, 11) == ':: Флоты ::') {
        break;
    }
}

//Если нашли таблицу с флотами, пройдем по всем флотам
if (i < Tables.length) {
	//Нашли строки, первый дочерний элемент - TBODY, у него же первый дочерний TR
    var Rows = Tables[i].firstChild.firstChild;
	//Пройдем по строкам
    while (Rows!= undefined) {
		//Получим коллекцию столбцов
        Child = Rows.firstChild;
        if (Child.nextSibling!= undefined) {
            Str = Child.nextSibling.textContent;
            //Флот на орбите
            if(Str.indexOf('Статус: Ожидает задания на орбите планеты')+1) {
				//Если хотя бы 1 флот на орбите - надо добавить скрипт обработки
        		FleetFlag = true;
        		//Содержимое ячейки
                Str = Child.textContent;
                IndexStr = Str.indexOf('Координаты');
                Base = Str.substr(Str.indexOf('Приписан к')+10, IndexStr-10);
				Str = Child.nextSibling.innerHTML;
				FleetId = Str.substr(Str.indexOf('flid=')+5);
				FleetId = FleetId.substr(0, FleetId.indexOf('"'));
				//Проверим корабли флота на повреждения
                if(Str.indexOf('Корабли флота повреждены')+1) {
                	Str2 = ''; 	//Если повреждены - опускать нельзя
                } else {		//Ссылка для опускания флота
                	Str2 = ' [<b><a href="#" onclick="javascript: DropAll('+FleetId+', \''+Base+'\', true); return false;">Опустить&nbsp;корабли&nbsp;на&nbsp;планету</a></b>]';
                }
                //Функция для разгрузки флота
				FleetId = 'DropAll('+FleetId+', \''+Base+'\', false); return false;';
                IndexStr = Str.indexOf('<hr');
				//Добавим наши ссылки (ну или одну по крайней мере - разгружать можно всегда), да влом проверять, что в трюмах 0.
				Str = Str.substr(0, IndexStr) +
					'[<b><a href="#" onclick="javascript: '+FleetId+'">Выгрузить&nbsp;все</a></b>]'+
					Str2+
					Str.substr(IndexStr);
				//Заменим внутренний HTML
				Child.nextSibling.innerHTML = Str;
            }
        }
        //Перейдем к следующей строке
        Rows = Rows.nextSibling;
    }
    //Есть флоты к которым добавили ссылки, значит нужен скрипт для обработки :D
    if(FleetFlag) {
    	//Новый объект скрипта
    	var NewScript = document.createElement('script');
		//Тип
    	NewScript.type = 'text/javascript';
		//Текст скрипа
    	TextScript = '\n';
		TextScript+= 'function getXmlHttp(){\n';	//Функция возвращает объект для загрузки других страничек
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
		TextScript+= 'function DropAll(FleetId, Base, DownSheep) {\n';	//Функция для разгрузки трюмов и опускания кораблей
		TextScript+= '  var xmlhttp = getXmlHttp();\n'; 				// Создаём объект XMLHTTP
        TextScript+= '  if(!xmlhttp) {\n'; 								// Если объект не создан
        TextScript+= '    alert("Обломись, бабка, мы на корабле :(");\n';// Если объект не создан
        TextScript+= '    return false;\n';
		TextScript+= '  }\n';
        TextScript+= '	if(Base!="'+CurrentPlanet+'") {\n';	//Проверяем, что необходимо сменить планету
        TextScript+= '    var SelPlanet = document.getElementsByTagName("select")[0].firstChild;\n';//Список планет
        TextScript+= '    while (SelPlanet!= undefined) {\n';										//Будем перебирать все планеты в списке
        TextScript+= '      CurrentPlanet = SelPlanet.textContent;\n';								//Текст - имя планеты и ее координаты
        TextScript+= '      while (CurrentPlanet.indexOf("[")+1) {\n';								//Оставим только координаты
        TextScript+= '          CurrentPlanet = CurrentPlanet.substr(CurrentPlanet.indexOf("[")+1);\n';
        TextScript+= '      }\n';
        TextScript+= '      if(CurrentPlanet.substr(0, CurrentPlanet.length-3)==Base){\n';  //Нашли нужную
        TextScript+= '        break;\n';													//Выйдем из цикла
        TextScript+= '      }\n';															//Не нашли
        TextScript+= '      SelPlanet = SelPlanet.nextSibling;\n';							//Проверим следующу.
        TextScript+= '    }\n';
        TextScript+= '    if(SelPlanet!=undefined){\n';										//Планету аки нашли
		TextScript+= '	    xmlhttp.open("POST", "http://founders.icedice.org/g.php?m=fleet", false);\n'; //Создаем новый POST запрос
        TextScript+= '      xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");\n';// Отправляем кодировку
        TextScript+= '      SendPostStr = "changeplanet="+encodeURIComponent(SelPlanet.value);\n';	//Строка запроса
        TextScript+= '      xmlhttp.send(SendPostStr);\n';       									// Отправляем POST-запрос
        TextScript+= '    } else {\n'; //Планету не нашли =O
        TextScript+= '	    alert("Планета "+Base+" отсутствует в списке планет :(");\n';	//Отругать надо
        TextScript+= '	    return;\n';														//Ну и выйти, перегружать страничку не будем
        TextScript+= '    }\n';
        TextScript+= '  }\n';
		TextScript+= '  xmlhttp.open("GET", "http://founders.icedice.org/g.php?m=fleet&a=cargo_fleet&flid="+FleetId+"&drop=all", false);\n'; // Открываем синхронное соединение
        TextScript+= '  xmlhttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");\n';	//Кешировать не надо
		TextScript+= '  xmlhttp.send(null);\n';       	// Отправляем GET-запрос
        TextScript+= '  if(DownSheep){\n';				// Надо еще опустить корабли
		TextScript+= '    xmlhttp.open("GET", "http://founders.icedice.org/g.php?m=fleet&a=ships_fleet&flid="+FleetId+"&free=all", false);\n'; // Открываем синхронное соединение
        TextScript+= '    xmlhttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");\n';	//Кешировать не надо
		TextScript+= '    xmlhttp.send(null);\n';       // Отправляем GET-запрос
        TextScript+= '  }\n';
		TextScript+= '  window.open("http://founders.icedice.org/g.php?m=fleet","_self");\n';	//Перегрузим флоты
        TextScript+= '}\n';
		NewScript.innerHTML = TextScript;		//Добавим текст скрипта
        //Добавим скрипт перед телом таблицы с флотами
        Tables[i].insertBefore(NewScript, Tables[i].firstChild);
	}
}
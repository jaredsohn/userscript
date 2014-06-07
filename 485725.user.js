// ==UserScript==
// @id             AutoGanjaFarm@dexif
// @name           AutoGanjaFarm
// @namespace      ganjawars.ru
// @updateURL      https://github.com/dexif/AutoGanjaFarm/raw/master/AutoGanjaFarm.meta.js
// @downloadURL    https://github.com/dexif/AutoGanjaFarm/raw/master/AutoGanjaFarm.js
// @include        http://www.ganjawars.ru/ferma.php*
// @include        http://ganjawars.ru/ferma.php*
// @match          http://www.ganjawars.ru/ferma.php*
// @match          http://ganjawars.ru/ferma.php*
// @grant          none
// @version        0.3.1 [beta]
// @author         Evgeniy [Dexif] Spitsyn (http://Spitsyn.net)
// @license        GPL v3
// ==/UserScript==
//TODO: карта посадки
//SETTINGS
var req = false; //Запрос автопосадки (true), Автопосадка (false)
var r = false; //Стандартный выбор если без запроса автопосадки
var pageid = 1; //Страница на которой ноходится растение 1-10
var plantid = 1; //Номер растения на странице 1-4
//SETTINGS

var a = document.getElementsByTagName("body")[0].innerHTML;
var t = 1;
var interval = null;
pageid = (pageid < 1) ? 0 : (pageid - 1);
plantid = (plantid < 1) ? 0 : (plantid - 1);
if (a.match(/Грядка пустая./i) != null) {
	if (req != false) r = confirm("Посадить повторно?")
	if (r == true || req == false) {
		if (location.href.indexOf("page_id=" + pageid) < 0) {
			searchPageUrl(document.links);
		} else {
			document.getElementsByName("plant_id")[plantid].checked = true;
			document.forms[1].submit();
		}
	} else {
		alert("Вы отказались от посадки! Выберите вручную!");
		checktimer();
	}
} else {
	checktimer();

}

function searchUrl(arr) {
	for (var i = 0; i < arr.length; i++) {
		if ((arr[i].href.indexOf("action=cultivate") > -1
			|| arr[i].href.indexOf("action=extract") > -1
			|| arr[i].href.indexOf("action=water") > -1
			|| arr[i].innerHTML.indexOf("собрать") > -1
			|| arr[i].innerHTML.indexOf("полить") > -1) && arr[i].href.indexOf("#") == -1) {
			window.location.assign(arr[i].href);
		}
	}
}

function searchPageUrl(arr) {
	for (var i = 0; i < arr.length; i++) {
		if ((arr[i].href.indexOf("page_id=" + pageid) > -1) && arr[i].href.indexOf("#") == -1) {
			//window.location.assign(arr[i].href);
			interval = self.setInterval("window.location.assign('" + arr[i].href + "');", (Math.floor(Math.random() * 3000)));
			//console.log("searchUrl:"+arr[i].href);
			return true;
		}
	}
	return false;
	//console.log("searchUrl:null");
}

function checktimer() {
	if (a.match(/уже пора/i) != null || a.match(/Земля не обработана/i) != null) {
		searchUrl(document.links);
	} else {
		if (a.match(/через ([0-9]*) мин/i) != null) {
			t = (Math.floor(Math.random() * a.match(/через ([0-9]*) мин/i)[1])) + (Math.floor(Math.random() * 3));
			interval = self.setInterval("location.reload();", (((t == 0) ? 1 : t) * 60000));
			//console.log("checktimer:"+t);
		}
	}
}

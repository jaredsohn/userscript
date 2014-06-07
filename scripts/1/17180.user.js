// ==UserScript==
// @name          Aldebaran recense filter
// @include       http://lib.aldebaran.ru/newrecense/*
// ==/UserScript==
// Version: 0.3
// License: GPL
// Written by sdio ( http://www.linux.org.ru/whois.jsp?nick=sdio )


function $(id) {return document.getElementById(id);}

function $x(xpath, contextNode, resultType) {
	contextNode = contextNode || document.body;
	resultType = resultType || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	return document.evaluate(xpath, contextNode, null, resultType, null);
}

function $xFirst(xpath, contextNode) {
	var xpr = $x(xpath, contextNode, XPathResult.FIRST_ORDERED_NODE_TYPE);
	return xpr.singleNodeValue;
}

function $xLast(xpath, contextNode) {
	var xpr = $x(xpath, contextNode);
	return xpr.snapshotItem(xpr.snapshotLength - 1);
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// MAIN

var GenreTop = [
	"Фантастика",
	"Детективы и боевики",
	"Проза",
	"Любовные романы",
	"Приключения",
	"Детские",
	"Поэзия и драматургия",
	"Старинная литература",
	"Научно-образовательная",
	"Компьютеры и Интернет",
	"Справочная литература",
	"Документальное",
	"Религия и духовность",
	"Юмор",
	"Дом и Семья"
   ];

var Genre = [ 	
	// Фантастика
//	"НФ|Юмористическая фантастика|Космическая фантастика|Фантастический боевик|Детективная фантастика|Киберпанк",
	"НФ|Героическая фантастика|Юмористическая фантастика|Космическая фантастика|Фантастический боевик|Эпическая фантастика|Детективная фантастика|Киберпанк|Социально-философская фантастика|Фэнтези|Альтернативная история|Ужасы и мистика",

	// Детективы и боевики
	"Классические детективы|Полицейские детективы|Боевики|Иронические детективы|Исторические детективы|Шпионские детективы|Криминальные детективы|Политические детективы|Маньяки|Крутой детектив|Триллеры|Детективы",

	// Проза
	"Классическая проза|Историческая проза|Современная проза|Контркультура|Военная проза",

	// Любовные романы
	"Современные любовные романы|Исторические любовные романы|Остросюжетные любовные романы|Короткие любовные романы|Эротика",

	// Приключения
	"Вестерны|Исторические приключения|Приключения: Индейцы|Морские приключения|Путешествия и география|Природа и животные|Приключения",

	// Детские
	"Сказки|Детские стихи|Детская проза|Детская фантастика|Детские остросюжетные|Детские приключения|Детская образовательная|Детские",

	// Поэзия и драматургия
	"Поэзия|Драматургия",

	// Старинная литература
	"Античная литература|Европейская старинная литература|Древнерусская литература|Древневосточная литература|Мифы. Легенды. Эпос|Старинная литература",

	// Научно-образовательная
	"История|Психология|Культурология|Религиоведение|Философия|Политика|Деловая литература|Юриспруденция|Языкознание|Медицина|Физика|Математика|Биология|Технические науки|Научно-образовательная",

	// Компьютеры и Интернет
	"Интернет|Программирование|Компьютерное Железо|Программы|ОС и Сети|Компьютеры и Интернет: Прочее",

	// Справочная литература
	"Энциклопедии|Словари|Справочники|Путеводители|Справочная литература: Прочее",

	// Документальное
	"Биографии и мемуары|Публицистика|Критика|Документальная проза",

	// Религия и духовность
	"Религия|Эзотерика|Самосовершенствование|Религия и духовность: Прочее",

	// Юмор
	"Анекдоты|Юмористическая проза|Юмористические стихи|Юмор",

	// Дом и Семья
	"Кулинария|Домашние животные|Хобби и ремесла|Развлечения|Здоровье|Сад и Огород|Сделай сам|Спорт|Эротика и секс|Дом и Семья"
  ];

function filterHide(re, flag){
	var cmt = $xFirst("//table[@class='tab1']");
	var snap = $x(".//div[@class='BOOKDETAIL']", cmt);
	for (var i=0; i<snap.snapshotLength; i++) {
		elem = snap.snapshotItem(i);
		cont = $xFirst("./a[@class='black']", elem).textContent;
		if (flag) {
			if (! cont.match(re)){
				elem.parentNode.parentNode.style.display = "none";
				elem.parentNode.parentNode.className = "_hide_";
			}
		} else {
			if (cont.match(re))  {
				elem.parentNode.parentNode.style.display = "none";
				elem.parentNode.parentNode.className = "_hide_";
			}
		}
	}
}

function filterUnHide(re){
	var cmt = $xFirst("//table[@class='tab1']");
	var snap = $x(".//div[@class='BOOKDETAIL']", cmt);
	for (var i=0; i<snap.snapshotLength; i++) {
		elem = snap.snapshotItem(i);
		cont = $xFirst("./a[@class='black']", elem).textContent;
		if (cont.match(re)){
			elem.parentNode.parentNode.style.display = "";
			elem.parentNode.parentNode.className = "";
		}
	}
}

function CB_Click(ev) {
	var idx = ev.value;
	var str = Genre[idx];
	var genre_re = new RegExp ("^("+str+")$");
	if (ev.checked) {
		filterUnHide(genre_re);
		for (var i=0; i<arrShow.length; i++) {
			var j = arrShow[i];
			if (idx != j) str = str + "|" + Genre[j];
		}
		arrShow.push(idx);
		genre_re = new RegExp ("^("+str+")$");
		filterHide(genre_re, 1);
	} else {
		filterHide(genre_re, 0);
		var arrTmp = new Array;
		for (var i=0; i<arrShow.length; i++) {
			var j = arrShow[i];
			if (idx != j) arrTmp.push(j);
		}
		arrShow = arrTmp;
	}
str = "_" + arrShow.join("_");
createCookie(CookieName, str, 90);
}


var a = $x("//noindex");
if (a) {
	for (var i=0; i < a.snapshotLength; i++) {
		var x=a.snapshotItem(i);
		x.parentNode.removeChild(x);
	}
}
var menuTD = $xFirst("/html/body/table/tbody/tr/td[@class='kol3']");
menuTD.width = 220;
	menuTD.appendChild(document.createTextNode("Показать только след. жанры:"));
	menuTD.appendChild(document.createElement("br"));

var del = $xFirst("./center", menuTD);
if (del) {
	var menuTD = del.parentNode;
	menuTD.removeChild(del);
	menuTD.parentNode.removeChild($xLast("./td", menuTD.parentNode));
}

for (var i=0; i<GenreTop.length; i++){
	var newINP = document.createElement("input");
	newINP.className = "_genre_";
	newINP.id = "g_" + i;
	newINP.type = "checkbox";
	newINP.value = i;
	newINP.name = GenreTop[i];
	newINP.addEventListener(
				'click',
				function(evt) {
				CB_Click(evt.currentTarget);
				return false;
				},
				false
				); 
	menuTD.appendChild(newINP);
	menuTD.appendChild(document.createTextNode(GenreTop[i]));
	menuTD.appendChild(document.createElement("br"));
}

const CookieName = "sdioGenre";

var whatToShow = readCookie(CookieName);
if (! whatToShow) {
	whatToShow = "_0";
	createCookie(CookieName, whatToShow, 90);
}

var arrShow = new Array;
var firstRun = new Array;
firstRun = whatToShow.split("_");

var k;
for (var i=1; i<firstRun.length; i++) {
	k = firstRun[i];
	$('g_' + k).click();
}

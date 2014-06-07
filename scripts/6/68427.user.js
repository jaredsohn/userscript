// ==UserScript==
// @name           Zadolbali pretty pager
// @namespace      http://vkontakte.ru
// @include        http://zadolba.li/*
// ==/UserScript==

var p = document.getElementsByClassName("selector");
var p0 = p[0];
var p1 = p[1]
for (var i = 0; i < p0.childNodes.length; i++) {
	if (p0.childNodes[i].nodeName == "STRONG") {
		// текущий номер страницы
		var cur =  p0.childNodes[i].childNodes[0].nodeValue;
		break;
	}
}

// максимум страниц
var m = p0.childNodes[1].childNodes[0].nodeValue;

// удаляем все элементы в педжерах
while (p0.hasChildNodes())
	p0.removeChild(p0.childNodes[0]);
while (p1.hasChildNodes())
	p1.removeChild(p1.childNodes[0]);

// контейнер для стрелок
var cont = document.createElement("DIV");
cont.style.height = "20px";

// стрелка влево
var contA1 = document.createElement("DIV");
contA1.style.cssText = "float: left; padding-left: 20px;";
var a1 = document.createElement("A");
a1.innerHTML = "<---";
if (cur < m) {
	a1.setAttribute("href", "http://zadolba.li/page/" + (parseInt(cur) + 1));
}
contA1.appendChild(a1);

// стрелка вправо
var contA2 = document.createElement("DIV");
contA2.style.cssText = "float: right; padding-right: 20px;";
var a2 = document.createElement("A");
a2.innerHTML = "--->";
if (cur > 1) {
	a2.setAttribute("href", "http://zadolba.li/page/" + (parseInt(cur) - 1));
}
contA2.appendChild(a2);

cont.appendChild(contA1);
cont.appendChild(contA2);

var cont_bottom = cont.cloneNode(true);

// добавляем наши стрелки к педжеру
p0.appendChild(cont);
p1.appendChild(cont_bottom);

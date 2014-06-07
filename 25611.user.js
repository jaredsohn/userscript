// ==UserScript==
// @name           No Zero
// @namespace      ACTPOHABT 8110
// @description    Не показывает 0 как оценку
// @include        http://leprosorium.ru/comments/*
// @include        http://www.leprosorium.ru/comments/*
// ==/UserScript==

var divs = document.getElementsByTagName("span");

for (var i = 0; i < divs.length; i++) {
	var div = divs[i];
	if (div.className == "rating") {
		if (div.textContent == '0') {
			span.style.fontColor = white;
		} else { alert("WTF?!"); }
	}
}


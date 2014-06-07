// ==UserScript==
// @name           Font size according to rating, Classic
// @namespace      ACTPOHABT 8110, Marilyn Omen
// @description    Увеличивает шрифт комментария за хорошую оценку 
// @include        http://leprosorium.ru/comments/*
// @include        http://*.leprosorium.ru/comments/*
// ==/UserScript==

var divs = document.getElementsByTagName("div");
var divslen = divs.length;
var comment;
var rating;
var notPost = false;
for(var i = 0; i < divslen; i++) {
	comment = divs[i];
	if(comment.className.indexOf("post") != -1) {
		if(notPost) {
			rating = getRating(comment);
			comment.childNodes[1].style.fontSize=13+2*Math.log(Math.abs(rating)+1)+"px";  // это формула, где 13 начальный шрифт при оценке ноль, а множитель перед логарифмом - скорость роста шрифта
		} else {
			notPost = true;
		}
	}
}

function getRating(div) {
	var r = div.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].innerHTML;
	return parseInt(r, 10);
}
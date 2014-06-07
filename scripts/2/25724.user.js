// ==UserScript==
// @name           Size and color of rating according to it, no Zero
// @namespace      vnizzz 18787
// @description    Увеличивает размер и меняет цвет шрифта оценки в зависимости от nejo. Делает оценку O невидимой (белой).
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
			if (rating>255)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#00ff00";
			if (rating>0 && rating<=255)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#00d2h(rating)00";
			if (rating<0 && rating >=-255)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#d2h(rating)0000";
			if (rating<-255)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#ff0000";
			if (rating==0)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#ffffff";
			comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.fontSize = Math.min(16,9+2*Math.log(Math.abs(rating)+1)) + "px";
		} else {
			notPost = true;
		}
	}
}

function getRating(div) {
	var r = div.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].innerHTML;
	return parseInt(r, 10);
}

function d2h(d) {d=136+d/2; return d.toString(16);}
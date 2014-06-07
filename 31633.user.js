// ==UserScript==
// @name           Dirty.ru comments rating font
// @namespace      vnizzz
// @description    Изменяет размер и цвет шрифта рейтинга комментариев
// @include        http://dirty.ru/comments/*
// @include        http://www.dirty.ru/comments/*
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

			if (rating>99 && rating<=999)
			{
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].style.width = "40px";
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].style.height = "18px";
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.textAlign = "right";
			}
			if (rating>999) {
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].style.width = "45px";
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].style.height = "18px";
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.textAlign = "right";
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#ff0000";
			}
			if (rating>512 && rating<=999)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#cc0000";
			if (rating>255 && rating<=512)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#990000";
			if (rating>156 && rating<=255)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#000000";
			if (rating>64 && rating<=156)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#666666";
			if (rating>0)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.fontSize = Math.min(16,9+Math.round(0.3*Math.sqrt(Math.abs(rating*4)))) + "px";
			//comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].innerHTML=comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].innerHTML+" "+(9+Math.round(0.3*Math.sqrt(Math.abs(rating*4))));
			if (rating<=-5 && rating>-42)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#aaaa33";
			if (rating<=-42 && rating>-100)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#bb8833";
			if (rating<=-100 && rating>-150)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#aa7733";
			if (rating<=-150 && rating>-250)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#aa5533";
			if (rating<=-250)
				comment.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].style.color = "#993333";
		} else {
			notPost = true;
		}
	}
}

function getRating(div) {
	var r = div.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].innerHTML;
	return parseInt(r, 10);
}
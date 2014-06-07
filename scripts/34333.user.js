// Быстрое добавление жепок
// version 0.3 b
// 2008-09-23
// @author http://leprosorium.ru/users/antyrat
// ==UserScript==
// @name          Быстрое добавление жепок
// @namespace     http://leprosorium.ru
// @description   Находит в комментах жепки и прикрепляет к ним плюсик, для быстрого добавления
// @include       http://leprosorium.ru/comments/*
// @include       http://*.leprosorium.ru/comments/*
// ==/UserScript==
	
var jepkaPattern = /([^\s,:\>\<][a-zA-Zа-яА-ЯёЁїіЇІъЪ0-9;#&\s\-\—\.?]+[^\s,])(\[x\]|\s\[x\]|\s\[х\]|\[х\])+/gi;
var jepkaReplacement = "$1 [<a href=\"javascript:;\" id=\"jepka\" onclick=\"return makeOutWithJepka(this,'$1');\" style=\"font-size:1em;font-weight:bold;color:#999966;text-decoration:none;\">X</a>]";

if (!document.getElementsByClassName){
	document.getElementsByClassName = function(cl) {
		var retnode = [];
		var myclass = new RegExp('\\b'+cl+'\\b');
		var elem = this.getElementsByTagName('*');
		for (var i = 0; i < elem.length; i++) {
			var classes = elem[i].className;
			if (myclass.test(classes)) retnode.push(elem[i]);
		}
		return retnode;
	}; 
}

var commentsBlocks = document.getElementsByClassName('dt');
for(var i=0; i<commentsBlocks.length;i++) {
	str = commentsBlocks[i].innerHTML;
	var result = str.replace(jepkaPattern, jepkaReplacement);
	commentsBlocks[i].innerHTML = result;
}

var jepkaFunction = "function makeOutWithJepka(obj, jepka){if(obj.innerHTML == 'X') {var noJepka = false;var jepkaBlocks = document.getElementsByClassName('tag');	for(var i=0; i<jepkaBlocks.length;i++) {if(jepkaBlocks[i].innerHTML == jepka) {	obj.innerHTML = '-';noJepka = true;	}}if(!noJepka) {if (confirm('Вы уверены, что хотите добавить жепку: '+jepka+' ')) {	obj.innerHTML = '-';return addTag(jepka);}} else {return false;}} else {if (confirm('Вы уверены, что хотите удалить жепку: '+jepka+' ')) {obj.innerHTML = 'X';return delTag(jepka);	}}};";
jScript = document.createElement("SCRIPT");
jScript.type = "text/javascript";
jScript.innerHTML = jepkaFunction;
document.body.appendChild(jScript);
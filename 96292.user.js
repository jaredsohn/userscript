// ==UserScript==
// @name           afquote
// @namespace      http://www.animeforum.ru/
// @include        http://www.animeforum.ru/topic/*
// ==/UserScript==

function newStyle(str){
var pa= document.getElementsByTagName('head')[0];
var el= document.createElement('style');
el.type= 'text/css';
el.media= 'screen';
if(el.styleSheet) el.styleSheet.cssText= str;// IE method
else el.appendChild(document.createTextNode(str));// others
pa.appendChild(el);
return el;
}

var quote_sel = document.getElementsByClassName('frq_quote');
var quote = document.getElementsByClassName('multiquote');
var post = document.getElementsByClassName('post_controls');

if (quote_sel && quote && post) {
	for (i = 0; i < quote_sel.length; i++) {
	var new_li = document.createElement('li');
	quote[i].parentNode.insertBefore(new_li, quote[i].nextSibling);
	new_li.ClassName = 'quote_selected';
	new_li.appendChild(quote_sel[i]);
	quote_sel[i].innerHTML = 'Цитировать выделенное';
	}
}

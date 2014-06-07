// ==UserScript==
// @name           Ru.Board Keyword ads escaper
// @namespace      ru-board
// @description    Escapes keywords, which annoying ad links adhere to, in post (header) you are writing (editing) by pressing Ctrl-Alt-E in text area. 
// @author         ASE DAG
// @homepage       http://forum.ru-board.com/topic.cgi?forum=13&topic=2300&glp#lt
// @version        20121207a
// @license        BSD License (http://debian.org/misc/bsd.license)
// @updateURL      https://userscripts.org/scripts/source/138210.meta.js
// @include        http://forum.ru-board.com/topic.cgi*
// @include        http://forum.ru-board.com/postings.cgi*
// ==/UserScript==

var prohibitedWords = [ 'sendmail', 'Postfix', 'proxy', 'firewall', 'Microsoft', 'Майкрософт', 'Windows', 'сервер', 'server', 'оптимальный', 'Framework', 'Apache', 'Explorer', 'Win 8', 'Office', 'Visio', 'инфраструктура', 'cloud', 'Резервное копирование', 'скачать', 'Linux', 'виртуальная машина', 'виртуальные машины', 'virtual machine', 'VMWare' ]; 
var prohibitedWordsRegEx = new RegExp ( '(\\s)' + '(' + prohibitedWords.join('|') + ')' + '([\\s.!?])', 'gi');

function processPost() {
    t.value = t.value.replace(prohibitedWordsRegEx, '$1$2[color=#333]$3[/color]');
}

function keyPressTrigger(e) {
    if (e.ctrlKey && e.altKey) {
        switch (e.charCode) {
	    case 101: processPost(); break; // e
	}
    }
}   

var t = document.getElementsByName('post')[0];
t.addEventListener('keypress', keyPressTrigger, false);  

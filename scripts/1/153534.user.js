// ==UserScript==
// @name Bibigon Mars2025 Chat CCCP
// @namespace http://sfunion.ru
// @include http://mars2025.ru*
// @version 1.02
// @author nuti-naguti
// ==/UserScript==


(function(){
var elemento = document.getElementById('ctl00_ContentPlaceHolder1_lblTakeTurns');
var p = document.createElement("p");
var chat = '<iframe width="550" height="350"src="http://widget03.mibbit.com/?server=irc.nnov.net%3A6669&channel=%23cccpwar%20aaa27071975&charset=windows-1251"></iframe>'
;
p.innerHTML = chat;
elemento.appendChild(p);
})();
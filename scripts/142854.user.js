// ==UserScript==
// @name           MPCalc
// @namespace      NPCalc by NPlay
// @description    Calcule le nombre de messages d'un MP.
// @version        1.0
// @include        http://www.jeuxvideo.com/messages-prives/message.php?idd=*
// ==/UserScript==

(function () {
	var n = parseInt(document.getElementById('col1').getElementsByTagName('script')[2].innerHTML.split('= ')[1].split(';')[0])+document.getElementsByClassName('msg_header').length-1;
	var h = document.getElementsByTagName('h3')[0];
	if(n>1)h.innerHTML+=' <i>('+n+' messages)</i>';
	else h.innerHTML+=' <i>('+n+' message)</i>';
}());
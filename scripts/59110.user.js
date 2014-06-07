// ==UserScript==
// @name           3milliona.net popup remover
// @namespace      http://userscripts.org/users/104101
// @description    Removes popups that don't let you play the game and ask for money
// @include        http://3milliona.net/*
// @include        http://www.3milliona.net/*
// ==/UserScript==


function addJS(a){var b=document.getElementsByTagName('head')[0];if(!b){return}var c=document.createElement('script');c.type='text/javascript';c.innerHTML=a;b.appendChild(c)}

function remid (id) {
	var el = document.getElementById(id);
	el.parentNode.removeChild(el);
}

remid('shadow');
remid('shadow3');

addJS('function checkform(f){}');
addJS('function isEmpty(str){}');
addJS('function pretendplay() {document.getElementById("pretend").innerHTML="0"}');
addJS('function percplay()    {document.getElementById("perc")   .innerHTML="0"}');

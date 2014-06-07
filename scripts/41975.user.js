// ==UserScript==
// @name	Itamaram's ChatStamper
// @namespace	http://itamaram.selfip.com:8621/ChatStamper.user.js
// @description	Adds a timestamp to chat messages
// @include	http://*kingdomofloathing.com/lchat.php
// @include	http://127.0.0.1:60080/lchat.php
// ==/UserScript==

document.getElementById("ChatWindow").addEventListener('DOMNodeInserted', doSomething ,true);

function doSomething(e)
{
	var pars = e.relatedNode.getElementsByTagName('b');
	var d = new Date();
	var tag = d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
	if(pars.length < 1)
		return;
	for(var i = (pars.length-1) ; i >= 0 ; i--){
		var tText = pars[i].innerHTML;
		if (tText.indexOf('[') != 0){
			pars[i].innerHTML = '[' + tag + ']' + tText;
		}
		else{
			break;	
		}
	}
}
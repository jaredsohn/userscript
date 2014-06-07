// ==UserScript==
// @name          Kocheats Sur Google
// @namespace     Algeseven
// @version       1
// @description   Pour Kocheats :)
// @include       http://*.google.com/*
// @include       https://*.google.com/*

// ==/UserScript==

function addVoice()
{
	var listItem = document.createElement("li");
	listItem.setAttribute("class", "gbt");
	listItem.innerHTML = '<a class="gbzt" href="http://kocheats.perso.sfr.fr"><span class="gbtb2"></span><span class="gbts">Kocheats</span></a>';
	if(document.getElementById("gbz"))
	{
		var menuOpt = document.getElementById("gbz").getElementsByTagName("ol")[0];
		menuOpt.insertBefore(listItem, menuOpt.getElementsByTagName("li")[7]);	
	}
}

addVoice();
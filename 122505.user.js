// ==UserScript==
// @name           Kong Functions
// @namespace      http://userscripts.org/users/TeleKawaru
// @description    Various functions for Kongregate
// @include        http://www.kongregate.com/games/*
// @include        http://kongregate.com/games/*
// @include        http://a.kongregate.com/games/*/*
// ==/UserScript==

GM_registerMenuCommand("Get game path", getKongGamePath);

function getKongGamePath() {
	var gD = document.getElementById('game_wrapper');
	if (!gD) {
		alert('No Game Found!');
		return;
	}
	var iH = gD.innerHTML.split('>');
	var swfParam = {};
	for (i=0;i<iH.length;i++) {
		if (iH[i].indexOf('param') > 0) {
			var pVal = iH[i].replace(/.*value="([^\s]*)".*/gi, "$1");
			var pNam = iH[i].replace(/.*name="([^\s]*)".*/gi, "$1");
			swfParam[pNam] = pVal;
		}
	}
	if (swfParam.base) {
		var oA = [];
		dP = swfParam.base.replace('http://','').split('\/');
		for (i=0;i<dP.length;i++) if (!isNaN(dP[i])) oA.push(dP[i]);
		alert(oA.join('\n'));
	}
	return;
}
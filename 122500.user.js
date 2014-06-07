// ==UserScript==
// @name           Add allowFullScreen
// @namespace      http://userscripts.org/users/TeleKawaru
// @description    Adds allowFullScreen param to game flash object
// @include        http://www.kongregate.com/games/*
// @include        http://kongregate.com/games/*
// @include        http://a.kongregate.com/games/*/*
// ==/UserScript==

try {
	var addAllowFSParam = function() {
		var gamediv = document.getElementById('gamediv');
		if (gamediv == null || gamediv.tagName.toLowerCase() != 'object') return setTimeout(addAllowFSParam, 100);
		for (i=0,oChild=gamediv.children[0];i<gamediv.children.length;i++,oChild=gamediv.children[i]) if (oChild.tagName.toLowerCase() == 'param' && oChild.getAttribute('name') == 'allowfullscreen') return;
		var newParam = document.createElement('param');
		newParam.name = 'allowfullscreen';
		newParam.value = 'true';
		gamediv.appendChild(newParam);
		document.getElementById('game_wrapper').appendChild(document.getElementById('game_wrapper').removeChild(gamediv));
		return;
	}
	addAllowFSParam();
} catch (e) { }
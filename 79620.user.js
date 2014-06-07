// ==UserScript==
// @name           Ikariam - Forum & Barbarians
// @version	   1.0
// @namespace      http://s*.ikariam.*/*
// @description    Adds the Forum and Barbarian village to the island view to fix the bug in the 3.4 version of ikariam
// @include        http://s*.ae.ikariam.*/*
//
//
// ==/UserScript==


function put(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
}

// ---- barbarians and forum ----





put('#island #barbarianVilliage						{background-image:url(http://img709.imageshack.us/img709/1866/barbarians.gif)}');
put('#island #islandfeatures .forum					{background-image:url(http://img412.imageshack.us/img412/6772/iconforum.gif)}');

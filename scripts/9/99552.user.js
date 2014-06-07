// ==UserScript==
// @name           EuroGamer signature hider
// @namespace      http://eurogamer.it/*
// @description    Nasconde le firme
// @include        http://www.eurogamer.it/*
// @author	   demonbl@ck
// ==/UserScript==

//====== nasconde i div della sign

function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

	addGlobalStyle('div.sig {display:none;}');
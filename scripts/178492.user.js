// ==UserScript==
// @name        Hide Intrusive Ads LosTiempos.com
// @namespace   http://userscripts.org/users/510421
// @description Hide intrusive ads the newspaper "LosTiempos.com" ~~~ Oculta publicidad intrusiva del periódico «LosTiempos.com»

// @include     http://www.lostiempos.com/*

// @license	BSD License; http://www.opensource.org/licenses/bsd-license.php
// @version     0.1

// ==/UserScript==

// Execute
loadGlobalCSS();

// Functions
function addGlobalStyle(device, css) {
	var elmHead, elmStyle;
	elmHead = document.getElementsByTagName('head')[0];
	elmStyle = document.createElement('style');
	elmStyle.type = 'text/css';
	elmStyle.media = device;
	elmHead.appendChild(elmStyle);
	elmStyle.innerHTML = css;
}

function loadGlobalCSS() {
	addGlobalStyle('screen', '#modal { display: none !important; }');
}

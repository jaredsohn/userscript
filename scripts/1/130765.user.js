// ==UserScript==
// @name           Facebook AntiPolls
// @namespace      C:\Users\Darek\Desktop\
// @description    Ukrywa ankiety na Facebooku
// @include        http*://*.facebook.*
// ==/UserScript==


function dodajStyl(css) {
	var head = document.getElementsByTagName('head')[0];
	if(!head){ return; }
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

dodajStyl(
	'#pagelet_ego_pane_w {display:none!important;}' +
	'#pagelet_ego_pane {display:none!important;}' +
	'li.aid_10150110253435258 {display:none!important;}'
);
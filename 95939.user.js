// ==UserScript==
// @name           Show all links
// @namespace      http://userscripts.org/users/198925
// @include        *
// @version        0.1
// ==/UserScript==

function displayLinks() {

	var targets = document.getElementsByTagName('a');
	
	var cover = document.createElement('div');
	cover.id = 'pageCover'; 
	document.body.appendChild(cover);
	
	var container = document.createElement('div');
	container.id = 'linkContainer';
	document.body.appendChild(container);
	
	var textarea = document.createElement('textarea');	
	for (var i=0;i<targets.length;i++) {
		if (targets[i].href.indexOf('javascript:') == 0) continue;
		textarea.innerHTML += targets[i].href + (i!=targets.length-2?'\n':'');
	}
	container.appendChild(textarea);
	
	var close = document.createElement('span');
	close.innerHTML = 'close';
	close.id = 'linkClose';
	container.appendChild(close);
	
	close.addEventListener('click',closeWindow,false);	
	textarea.addEventListener('click',selectArea,false);
	
}

function closeWindow(e) {
	if (e.which != 1) return;
	document.body.removeChild(document.getElementById('linkContainer'));
	document.body.removeChild(document.getElementById('pageCover'));
}

function selectArea(e) {
		if (e.which != 1) return;
		this.select();
		this.removeEventListener('click',selectArea,false);
}

GM_addStyle('\
	html, body {height:100% !important;}\
	div#pageCover { position: fixed !important; top: 0px !important; left: 0px !important; width: 100% !important; height: 100% !important; opacity: 0.6 !important; background-color: black !important; }\
	div#linkContainer { position: fixed !important; width: 40% !important; height: 60% !important; top: 20% !important; left: 30% !important; text-align: center !important; }\
	div#linkContainer textArea { width: 100% !important; height: 100% !important; margin-bottom: 5px !important; }\
	div#linkContainer span#linkClose { font-weight: bold; text-decoration: underline !important; cursor: pointer !important; font-size: 15px !important; color: white !important; }\
');

GM_registerMenuCommand('Show all links',displayLinks);
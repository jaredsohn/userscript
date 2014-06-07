// ==UserScript==
// @name           NickBook
// @namespace      http://tourmentine.com/
// @description    my own settings :)
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

// addStyle() function borrowed to Faceboox Fixer UserScript

function addStyle(css) {
	if (heads = document.getElementsByTagName('head')) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		heads[0].appendChild(style);
	}
}

//addStyle('.comments_add_box img { display:none; }');
addStyle('.uiProfilePhotoMedium { display:none; }');
addStyle('#menubar_container { background-color:#000000; }');
addStyle('.profile .box .box_header { background-color:#000000; color:#FFFFFF; }');
addStyle('.UIFilterList .selected { background-color:#000000; color:#FFFFFF; }');
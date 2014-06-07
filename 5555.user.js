// ==UserScript==
// @name		Facebook Flyer Remover
// @author		Jeremy Christian
// @date		2006-09-09
// @description		Removes the flyer on the bottom left
// @namespace		(none)
// @include		http://*facebook.com/*
// ==/UserScript==

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];	
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style); 
}

// add css
addGlobalStyle('#flyer_upload_pic_holder { display:none!important; }');
addGlobalStyle('#ssponser { display:none!important; }');
addGlobalStyle('#announce { display:none!important; }');
addGlobalStyle('.sponsors { display:none!important; }');
addGlobalStyle('.advert { display:none!important; }');
addGlobalStyle('.clickable { display:none!important; }');

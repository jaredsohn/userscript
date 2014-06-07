// ==UserScript==
// @author         bodinho
// @name           Teracod reklam tilto
// @version        1.0
// @description    Az oldalon lévő hirdetéseket szünteti meg
// @include        http://teracod.com/*
// @grant          none
// ==/UserScript==


function addGlobalStyle(css){

    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
	
}

addGlobalStyle('[style="margin-top:15px;margin-bottom:15px;text-align:center;border:1px solid #bebebe;background-color:#bababa;"]{visibility: hidden !important;height:5px !important;}')
addGlobalStyle('[style="margin-top:15px;margin-bottom:15px;text-align:center;"]{visibility: hidden;height:5px !important;}')

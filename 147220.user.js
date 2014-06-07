// ==UserScript==
// @id             Pinterest-white-imageholder
// @name           Pinterest - White Pin Background & Border
// @version        1.0
// @namespace      
// @author         Legendeveryone
// @description    Changes the grey pin image background to white and adds a thin, black border.
// @include        http://pinterest.com/*
// @run-at         document-end
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
addGlobalStyle('#PinImageHolder { background-color:#FFF !important');
addGlobalStyle('.PinImage.ImgLink { background-color:#FFF !important');
addGlobalStyle('#pinCloseupImage { border: 1px solid #000 !important');
addGlobalStyle('.PinImageImg { border: 1px solid #000 !important');
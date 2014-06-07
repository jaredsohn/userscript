// ==UserScript==
// @name            KAORI Nusantara Private Interface
// @namespace       http://www.kaorinusantara.web.id/
// @description     Private Interface For Private Usage
// @include         http://www.kaorinusantara.web.id/forum/*
// @version         0.1.0
// @contributor     ChaosFred
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

addGlobalStyle('body { background-image:url(http://moetron.com/uploads/20111215_ia01.jpg);background-size:cover;background-attachment:fixed;background-position:center;}');
addGlobalStyle('.alt1, .alt1Active {background:none;color: #000000;}');
addGlobalStyle('.alt2, .alt2Active {background:none;color: #000000;}');
addGlobalStyle('.page {background:none;color: #000000;}');
addGlobalStyle('.tborder {background:url(http://icprojectgroup.webs.com/shared_folder/whitebgpanel.png);border: 1px solid #465786;color: #000000;}');
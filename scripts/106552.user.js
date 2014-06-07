// ==UserScript==
// @name           my_fixed_google_plus_stylesheet
// @namespace      www.mnc4.com
// @include        https://plus.google.com/*
// @include        http://plus.google.com/*
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

	
addGlobalStyle( '#gb {position: fixed; background:  black; height: 30px; width: 100%;top:0;}');
addGlobalStyle( '.a-U-T{margin-top:30px}');
addGlobalStyle( '.a-b-la-T{position:fixed; width:200px;}');
addGlobalStyle( '.a-A.a-U-A{background:#eee; position:fixed; z-index:2; width:100%; margin-top:-1px; border-bottom:1px solid #ccc;}');

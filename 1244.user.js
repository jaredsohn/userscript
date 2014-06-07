// ==UserScript==
// @name          HackaHackaday
// @namespace     http://www.kmonkey.com/greasemonkey/
// @description   make Hackaday.com readable
// @include       http://*.hackaday.com/*
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

addGlobalStyle(
'p { color: #000 ! important; }' +
'body {background: #fff ! important; color: #000 ! important}'+
'h1, h2, h3, h4 {color: #60f ! important; }' +
'a {color : #00f ! important; }' +
'a:hover {background-color : #fff ! important; color : #06f ! important;}' +
'#slice, #top, #content, #dogear, #dual, #sky, #nav, #promo, #legal, blockquote, p.sponsored, p.try-sponsored, .byline .postdata, .posthead, .posthead2 {color: #000 !important;  background: #fff !important; background-color: #fff ! important;}'
);


// get rid of google bs
//var allScripts, thisScript;
//allScripts = document.getElementsByTagName('script');
//for (var i = 0; i < allScripts.length; i++) {
//   thisScript = allScripts[i];
//  alert(thisScript);
//    thisScript.src = "";
//    thisScript.type = "";
//
//    thisScript.parentNode.removeChild(thisScript); 
//	}

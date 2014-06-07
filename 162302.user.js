// ==UserScript==
// @name         Ekstra Bladet Layout Fix
// @namespace    Ekstra Bladet Layout Fix
// @description  Properly center align Ekstrabladet's layout on every page.
// @include      http://*.ekstrabladet.dk/*
// @include      https://*.ekstrabladet.dk/*
// @match	 http://*.ekstrabladet.dk/*
// @match	 https://*.ekstrabladet.dk/*
// @grant        none
// @version	 1.0
// ==/UserScript==


// ==Script Options==
// Set this to true if you want to hide all Ads
var HideAds = true;

// ==/Script Options==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(HideAds?'.adform-adbox, .extracolumn, .bannercenter, .banner.gotads, #bGigaParent { display: none !important; }':'' )

addGlobalStyle( 'body { background: #EEE; }' )
addGlobalStyle( '.gluedtotop { width: 940px !important; }' )
addGlobalStyle( '.sitehead { margin: 0 auto; width: 940px !important; }' )  
addGlobalStyle( '.banner.vinkel { margin-bottom: 5px !important; }' )
addGlobalStyle( '.extracolumn { background: transparent !important; margin-right: -325px !important; }' )
addGlobalStyle( '.pagewrapper, .sitewrapper { float: none !important; width: 940px !important; min-height: 500px; margin: 0 auto; }' )
addGlobalStyle( '#front-37 .article-extract { border: none !important; }' )  
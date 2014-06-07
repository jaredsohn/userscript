// CSNation Tweaks
// version 0.1
// Tweaks CSNation

// ==UserScript==

// @name        CSNation User Tweaks
// @namespace   http://www.ianferguson.me.uk/greasemonkey.asp
// @description Tweaks CSNation.net to make it more streamlined. Removes all the adverts and reorganises the index page to make better use of the user's screen estate. 
// @include http://csnation.net/*
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

'a#sponsorFrame, a#sponsorSide, div#adFrame {' +
'  display: none !important;' +
'}' +

'div#topNav, div#mainFeatureFrame, div#featureFrame {' +
'  display: none !important;' +
'}' +

'div#contentFrame {' +
'  height: 600px !important;' +
'  overflow-y: scroll !important;' +
'}' +

'div#updatesFrame {' +
'  background:#434344 url(http://i4.photobucket.com/albums/y136/thepineapplehead/csnation_tweaks/updates.png) no-repeat top left !important;' +
'  height: 139px !important;' +
'  width: 640px !important;' +
'}' +

'div.head {' +
'  margin-top: 1em !important;' +
'  border-top: 1px dashed #ccc !important;' +
'}' +

'div#mainFrame {' +
'  background-image: none !important;' +
'  padding-top: 0 !important;' +
'}' +

'div#topBanner {' +
'  height: 57px !important;' +
'  background: url(http://i4.photobucket.com/albums/y136/thepineapplehead/csnation_tweaks/topBanner.jpg) !important;' + 
'  border-bottom: 2px solid #030303 !important;' +
'}'


'div#siteNavFrame {' +
'  top: 0 !important; /* Removes top gap from left sidebar */' +
'}' 

'div#topBanner a {' +
' background-image: none !important;' +
'}'

);
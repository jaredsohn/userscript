// ==UserScript==
// @name   Feedly Full Article Tweaks (lessChrome) 
// @namespace  http://www.example.com/~juliet/
// @description Alter Feedly Full Article layout to eliminte unnecessary chrome and sidebars
// @include  http://www.feedly.com/*
// ==/UserScript==

@-moz-document domain("feedly.com") {
div#sideArea, div#systembar { display: none !important; }

#feedlyTabsHolder{ margin-top:0px !important; height:100% !important; }

div#feedlyPart { width : 98% !important;}
div#feedlyPage, div#mainArea { width: 99% !important;}
}
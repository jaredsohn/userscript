// ==UserScript==
// @name           Set <SPAN> Visible (Facebook)
// @namespace      Custopootimus
// @description    Makes all <span> elements visible, so you don't have to become a fan to see the 'Bullshit Monkeys Tell Gurrillas' or whatnot.
// @include        http://www.facebook.com/*
// ==/UserScript==
styles='span{visibility:visible !important;} div { display: block !important; }'; newSS = document.createElement('link'); newSS.rel = 'stylesheet'; newSS.href = 'data:text/css,' + escape(styles); document.documentElement.childNodes[0].appendChild(newSS); void 0
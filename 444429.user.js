// ==UserScript==
// @name       Ref. System [Green Button]
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://referrals.lds.org/referralmanager/PersonList.put
// @include      http://referrals.lds.org/*
// @copyright  2012+, You
// ==/UserScript==

document.getElementsByClassName('directory')[1].style.cssText = "" +
    "background:limegreen;padding:8px;border-radius:5px;font-family:Calibri;font-size:15px;";

var newHTML         = document.createElement('div');
newHTML.innerHTML   = '\
	<style> A.directory:hover{color:white;;}</style>\
';
document.body.appendChild (newHTML);
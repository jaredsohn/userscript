// ==UserScript==
// @id             grttjla
// @name           Google Reader Tweak
// @version        0.11
// @namespace      
// @author         tjla
// @description    
// @include        https://www.google.*/reader*
// @include        http://www.google.*/reader*
// @run-at         document-end
// ==/UserScript==

var logo = document.getElementById('logo-link');
logo.innerHTML = 'Reader';

var css1 = "border-bottom: 0px;\
           left: 90px;\
           top: -57px;"

var btnadd = document.getElementById('lhn-add-subscription-section');
if (btnadd) {btnadd.setAttribute("style",css1);}

var css2 = "top: -57px;"

var btnadd = document.getElementById('scrollable-sections-holder');
if (btnadd) {btnadd.setAttribute("style",css2);}


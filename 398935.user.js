// ==UserScript==
// @include     http://*/SiteSupportP9/surveillance_SoUse/*
// @grant       none
// @name       Surveillance So.Use
// @namespace		http://userscripts.org/users/596630
// @description		Adds hide/show links on top of page
// @version			0.1
// @copyright		Do what you please
// ==/UserScript==

var next;
var link;

link = document.createElement("a");
link.text= 'show  ';
link.style['padding'] ='10px';
link.href='javascript:toggle("OKOK","")';
next = document.body.firstChild;
next.parentNode.insertBefore(link, next);

link = document.createElement("a");
link.style['padding'] ='10px';
link.text= 'hide';
link.href='javascript:toggle("OKOK","none")';
next = document.body.firstChild;
next.parentNode.insertBefore(link, next);


var s = document.createElement("script");
s.type = "text/javascript";
s.text = "\
function hasClass(element, cls) { \
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1; \
} \
 \
function toggle(tdClass, displayStatus) { \
\
   var td = document.getElementsByTagName('td'); \
   for (var i = 0; i < td.length ; i++) {\
     if ( hasClass(td[i], tdClass) ) {\
        td[i].parentNode.style.display = displayStatus;\
    }\
   }\
}\
";
var head = document.getElementsByTagName("head")[0];
head.appendChild(s);


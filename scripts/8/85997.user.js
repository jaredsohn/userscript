// ==UserScript==
// @name           ifolder autopresser and closer after prolong
// @namespace      script
// @versrion       0.1
// @include        http://*ifolder.ru/control/*
// ==/UserScript==
var subm=document.getElementsByName('prolong')[0];
setTimeout(function(){if(subm){document.body.setAttribute('onunload','window.close();');subm.click();}},3000)
var b=document.createElement('script')
b.setAttribute('type', 'text/javascript');
b.innerHTML="$(\"input[@name=prolong]\").bind(\"submit\",function(event){event.preventDefault();});"
document.getElementsByTagName('HEAD')[0].appendChild(b);
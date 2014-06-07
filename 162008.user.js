// ==UserScript==
// @name           My First Script 
// @description    Alerts Hello   
// @namespace      http://www.sarathonline.com/dyn/userscripts/hello/
// @author         blabla(http://userscripts.org/users/****) 
// @include        http://*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// ==/UserScript==


$(function(){
window.alert("Hello.. My Extension processed you..");
});

function addCss(cssString) {
var head = document.
getElementsByTagName('head')[0];
return unless head; var newCss = document.createElement('style');
newCss.type = "text/css";
newCss.innerHTML = cssString;
head.appendChild(newCss);
}
addCss (
'* { background-color: #ffffff ! important; }'
); 
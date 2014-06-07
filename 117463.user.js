// ==UserScript==
// @name Capcha Killer koc 
// @namespace http://localhost
// @description passer les captcha
// @author :)
// @version 1.0.0
// @include http://apps.facebook.com/kingdomsofcamelot/*
// @include https://apps.facebook.com/kingdomsofcamelot/*
// @exclude
// ==/UserScript==

var contents = document.getElementById("contents");
var link;
if(contents){
if(contents.textContent.match('.*(Routine Check).*')){
link = contents.getElementsByTagName("a")[1].href;
setTimeout(Captcha,250);//use a delay

}
}
function Captcha(){
location.href = link;
} 
// ==UserScript==
// @name           milosyki.com download link and human check skip
// @namespace      Aaron Russell
// @include        http://www.miloyski.com/media/*/*
// ==/UserScript==

if(document.evaluate( '//embed[contains(@wmode, "transparent")]' , document, null, 0, null ).iterateNext()){
var a = document.createElement('a');
var sometext = document.createTextNode('Download Video');
a.setAttribute('href', document.evaluate( '//embed[contains(@wmode, "transparent")]' , document, null, 0, null ).iterateNext().src.split('file=')[1].split('&')[0]);
a.appendChild(sometext);
document.getElementsByClassName('subleft rounded')[0].appendChild(a);
}
if(document.evaluate( '//input[contains(@value, "Continue")]' , document, null, 0, null ).iterateNext()){
document.evaluate( '//input[contains(@value, "Continue")]' , document, null, 0, null ).iterateNext().click();
}
function deletechild(id){
if(document.getElementById(id)){
document.getElementById(id).parentNode.removeChild(document.getElementById(id));
}
if(document.getElementsByClassName(id)[0]){
document.getElementsByClassName(id).parentNode.removeChild(document.getElementsByClassName(id)[0]);
}}
deletechild('ad_banner_example');
deletechild('right');
deletechild('ads');
deletechild('subleft rounded');
// ==UserScript==
// @name          Skipper v2
// @version       2.01
// @namespace     dark89ninja
// @description	  Helps you click on stuff
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include       http://*
// @include       /*
// @include       *

// ==/UserScript==


var url = document.body.getElementByTagName('a');
for(i=0;i<=100;i++){
var newurl = url[i].src;
var url2 = url[i];
var search = newurl.IndexOf("No Thanks");
if(search>=0){
url2.click();
}
var url = document.body.getElementByTagName('a');
for(i=0;i<=100;i++){
var newurl = url[i].src;
var url2 = url[i];
var search = newurl.IndexOf("No");
if(search>=0){
url2.click();
}
var url = document.body.getElementByTagName('a');
for(i=0;i<=100;i++){
var newurl = url[i].src;
var url2 = url[i];
var search = newurl.IndexOf("Skip");
if(search>=0){
url2.click();
}
var url = document.body.getElementByTagName('a');
for(i=0;i<=100;i++){
var newurl = url[i].src;
var url2 = url[i];
var search = newurl.IndexOf("SKIP");
if(search>=0){
url2.click();
}
var url = document.body.getElementByTagName('a');
for(i=0;i<=100;i++){
var newurl = url[i].src;
var url2 = url[i];
var search = newurl.IndexOf("PASS");
if(search>=0){
url2.click();
}
var url = document.body.getElementByTagName('a');
for(i=0;i<=100;i++){
var newurl = url[i].src;
var url2 = url[i];
var search = newurl.IndexOf("Next");
if(search>=0){
url2.click();
}
var url = document.body.getElementByTagName('a');
for(i=0;i<=100;i++){
var newurl = url[i].src;
var url2 = url[i];
var search = newurl.IndexOf("skip");
if(search>=0){
url2.click();
}
var url = document.body.getElementByTagName('a');
for(i=0;i<=100;i++){
var newurl = url[i].src;
var url2 = url[i];
var search = newurl.IndexOf("Skip");
if(search>=0){
url2.click();
}
var url = document.body.getElementByTagName('a');
for(i=0;i<=100;i++){
var newurl = url[i].src;
var url2 = url[i];
var search = newurl.IndexOf("Pass");
if(search>=0){
url2.click();
}

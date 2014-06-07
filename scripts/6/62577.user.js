// ==UserScript==
// @name           UploadBox.com Skip waiting
// @namespace      http://userscripts.org/users/105735
// @include        http://uploadbox.com/*
// ==/UserScript==
var first = document.getElementById('downl_free');
if(first){
first.click();
}else{
var captcha = document.getElementById('capbox');
if(captcha)
document.getElementsByTagName('body')[0].innerHTML = captcha.innerHTML;
var down = document.getElementById('pp');
if(down){
window.href = down.action;
//document.getElementsByTagName('body')[0].innerHTML = "";
}
}
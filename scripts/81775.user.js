// ==UserScript==
// @name           UploadRox v1
// @include        http://uploadbox.com/*
// @include        http://uploadbox.com/files/*
// ==/UserScript==
var begin = document.getElementById('downl_free');
if(begin){
begin.click();
}else{
var captcha = document.getElementById('capbox');
if(captcha)
document.getElementsByTagName('body')[0].innerHTML = captcha.innerHTML;
var getfile = document.getElementById('pp');
if(getfile){
window.href = getfile.action;
//document.getElementsByTagName('body')[0].innerHTML = "";
}
}
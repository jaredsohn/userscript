// ==UserScript==
// @name          ekşi sözlük beta bugün linki
// @description   başlıklara bugün linki koyar
// @include       http://beta.eksisozluk.com/*
// ==/UserScript==

var b = document.getElementById("title");
var u = document.URL;
if(u.indexOf("?a=today")==-1){
if(u.indexOf("?p=")>-1){
u = u.replace(/\?p=\d+/g,'');
}
var y;
if(u.indexOf("?")==-1)
y = u + "?a=today";
else
y = u + "&a=today";
b.innerHTML += '<i><a href="' + y + '" style="font-size:10px;">(bugün)</a></i>';
}
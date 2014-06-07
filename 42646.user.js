// ==UserScript==
// @name           tuentihacks
// @namespace      tuenti
// @include        http://www.tuenti.com/*
// ==/UserScript==

var column = document.getElementById(’column-550′);
var els = column.getElementsByTagName(’a');

myRe = /addFriend\(([0-9]+)/g;
for (var i = 0; i < els.length; i++) {
var clk = els[i].getAttribute(’onClick’);
var arr = myRe.exec(clk);
if(arr) {
var id = arr[1];
var btn = document.createElement(’a');
btn.setAttribute(’href’,'http://www.tuenti.com/#m=amigos&uid=’+id);
btn.className = ‘blue’;
btn.innerHTML = ‘ | Ver sus amigos’;
els[i].parentNode.appendChild(btn);
}
}
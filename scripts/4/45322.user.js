// ==UserScript==
// @name           alphabetizefavs
// @namespace      blah
// @include        http://www.okcupid.com/*
// ==/UserScript==

function init() {
var ul = document.getElementById('favs_online');
if (ul) {
var lis = ul.getElementsByTagName('li');
var names = new Array;
var tog;
for (var i=0;i<lis.length;i++) {
var li = lis[i];
if (li.getAttribute('id')) {
names.push(li.getAttribute('id').toLowerCase());
li.setAttribute('id',li.getAttribute('id').toLowerCase());
} else {
tog = li;
}
}

names.sort();
for (var i=0;i<names.length;i++) {
ul.appendChild(document.getElementById(names[i]));
}
ul.appendChild(tog);

}



}

init();
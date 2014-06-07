// ==UserScript==
// @name           FC Dick Header
// @version        8==D v.2
// @include        http://preludexiv.guildwork.com/*
// @include        https://preludexiv.guildwork.com/*
// @run-at         document-end
// ==/UserScript==

var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src == "http://cdn.guildwork.net/files/518f9012ab0eed140b7026f1/52cd5211c16e4d6b55259de5.png" || ilist[i].src == "https://cdn.guildwork.net/files/518f9012ab0eed140b7026f1/52cd5211c16e4d6b55259de5.png") {
         ilist[i].src = "http://cdn.guildwork.net/files/518f9012ab0eed140b7026f1/52cd58f5c16e4d6b55259e04.png";
    }
}

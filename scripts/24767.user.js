// ==UserScript==
// @name          King Khan Srk Google Skin 
// @namespace      Rezy
// @description   Srk Google Skin 
// @include        http://www.google.com/*
// @exclude        http://www.google.com/ig
// ==/UserScript==


x = 'body {background-color: black !important; font-family:segoe ui !important; font-style: Arial !important;}';
x += 'a{color:#64ABFB !important;}';
x += 'a:hover{color:#1160C7 !important;}';
x += 'span.a{color:#1160C7 !important;}';
x += 'table{background-color:Black !important; bottom-border: 1px;}';
x += 'div{color:#fff;}';
x += 'td,.n a,.n a:visited{color:#64ABFB !important;}';
x += '#logo span{background:url(http://i297.photobucket.com/albums/mm210/Sollalagi/My%20Own%20Work/Animated%20Icons/Animation1.gif) no-repeat}';

GM_addStyle(x);

document.images[0].src = "http://i127.photobucket.com/albums/p124/kirancita24/SHAHRUKH%20%20%20KHAN/FIRMASRK.gif"
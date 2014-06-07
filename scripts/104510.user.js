// ==UserScript==
// @name		fanpho
// @namespace		http://icewhite.us
// @description		Add an anchor for fanfou's photo upload.
// @include			http://fanfou.com/*
// ==/UserScript==


var nav = document.getElementById('navtabs');
var ul = nav.getElementsByTagName('ul')[0];
var li = document.createElement('li');
li.innerHTML = '<a href="http://m.fanfou.com/photo.upload" target="_blank"><span class="label">FanPho...</span></a>';
ul.appendChild(li);

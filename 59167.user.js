// ==UserScript==
// @name PDTCT
// @description PDT clock test
// @include http://*www.bungie.net/*
// ==/UserScript==


var banner = document.getElementById('ctl00_forumHeader_forumTitleImage');

banner.class = '';
var banner = document.getElementsByClassName('HeaderTheSeptagonForumId');

banner[0].src = 'http://www.clocklink.com/clocks/tawhill001-blue.swf?TimeZone=PST&';
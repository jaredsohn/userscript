// ==UserScript==
// @name OMG BBQ
// @description Changes the community forum banner
// @include http://*www.bungie.net/*
// ==/UserScript==


<a id="ctl00_forumHeader_hypGroupHome" href="http://www.bungie.net/fanclub/245336/Forums/topics.aspx?forumID=251826</a>;

banner.class = '';
var banner = document.getElementsByClassName('group_forum_header');

banner[0].src = 'http://img219.imageshack.us/img219/7042/1100.png';
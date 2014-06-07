// ==UserScript==
// @name OMG BBQ
// @description Changes the community forum banner
// @include http://*www.bungie.net/fanclub/245336/Forums/topics.aspx?foru mID=251826/*
// ==/UserScript==


var banner = document.getElementById('ctl00_forumHeader_groupForumHea derPanel');

banner.class = '';
var banner = document.getElementsByClassName('group_forum_header' ;);

banner[0].src = 'http://img66.imageshack.us/img66/7042/1100.png';
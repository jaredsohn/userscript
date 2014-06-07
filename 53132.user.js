// ==UserScript==
// @name kkk
// @description Changes the community forum banner
// @include http://*bungie.net/fanclub/245336/Forums/topics.aspx?forumID=251826*
// ==/UserScript==


var banner = document.getElementById('ctl00_forumHeader_forumTitleImage');

banner.class = '';
var banner = document.getElementsByClassName('HeaderTheSeptagonForumId');

banner[0].src = 'http://img66.imageshack.us/img66/7042/1100.png';
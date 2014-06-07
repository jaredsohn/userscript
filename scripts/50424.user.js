// ==UserScript==
// @name Bring back the Septagon
// @description Changes the community forum banner
// @include http://*www.bungie.net/*
// ==/UserScript==


var banner = document.getElementById('ctl00_forumHeader_forumTitleImage');

banner.class = '';
var banner = document.getElementsByClassName('HeaderTheSeptagonForumId');

banner[0].src = 'http://i442.photobucket.com/albums/qq144/Wolverfrog/Septagonv5.jpg';
// ==UserScript==
// @name Red Bungie Community
// @contributer Wolverfrog
// @description Changes the community forum banner
// @include http://*bungie.net/*
// ==/UserScript==


var banner = document.getElementById('ctl00_forumHeader_forumTitleImage');

banner.class = '';
var banner = document.getElementsByClassName('HeaderTheSeptagonForumId');

banner[0].src = 'http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/red-BungieCommunity.jpg';
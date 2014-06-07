// ==UserScript==
// @name New Bungie Community
// @contributer THElizzard01
// @description Changes the community forum banner for the better.
// @include http://*bungie.net/*
// ==/UserScript==


var banner = document.getElementById('ctl00_forumHeader_forumTitleImage');

banner.class = '';
var banner = document.getElementsByClassName('HeaderTheSeptagonForumId');

banner[0].src = 'http://i937.photobucket.com/albums/ad215/Simpsonizeme/COMMUNITY.jpg';
// ==UserScript==
// @name        Tumblr: Archive and Likes quick open
// @include   http://*.tumblr.com/*
// @description Opens a Tumblr user's archive and list of liked posts.
// @version     1
// ==/UserScript==

javascript:
var URL=document.URL;
var splitslash=URL.split('/');
var splitdot=splitslash[2].split('.');
var user=splitdot[0];
var likes='http://www.tumblr.com/liked/by/'+user;
var archive='http://'+user+'.tumblr.com/archive';
window.open(archive,"_self");
window.open(likes,"likes");
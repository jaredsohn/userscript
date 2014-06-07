// ==UserScript==
// @name            CrackHackForum - Improved top bar
// @namespace       Pl0xd/topbar
// @description     Adds link to the top navigation bar
// @author          Pl0xd
// @include         http://crackhackforum.com/*
// @include         http://www.crackhackforum.com/*
// @version         1.0
// ==/UserScript==


var regex = /CP<\/a>/;
var replace = 'CP</a> | <a href="http://www.crackhackforum.com/private.php">Private Messages</a> | <a href="http://www.crackhackforum.com/search.php?action=getnew">View New Posts</a> | <a href="http://www.crackhackforum.com/search.php?action=getdaily">View Today\'s Posts</a> | <a href="#top">Return to Top</a>';
document.body.innerHTML=document.body.innerHTML.replace(regex,replace);
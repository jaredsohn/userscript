// ==UserScript==
// @name          Eurogamer "Recent Posts" Button
// @namespace     http://www.eurogamer.net/
// @description   This is a script which adds a button in the toolbar taking you directly to your recent posts.
// @include       http://www.eurogamer.net/*
// @include       http://gamers.eurogamer.net/*
// ==/UserScript==

tobesearched = document.getElementById("toolBar").innerHTML

result = tobesearched.search("Logged in as")

if(result != -1){

marker = 'http://www.eurogamer.net'

if(location.href.substring(0,24)==marker){

firstpart = '';
firstpart = '<div class="details"><ul><li><a href="http://gamers.eurogamer.net/user_profile.php?tab=forum" class="button inbox">Recent Posts</a></li>';
secondpart = document.getElementById("toolBar").innerHTML.substring(58);
document.getElementById("toolBar").innerHTML = firstpart+secondpart;

}
else
{

firstpart = '';
firstpart = '<div class="details"><ul><li><a href="http://gamers.eurogamer.net/user_profile.php?tab=forum" class="button inbox">Recent Posts</a></li>';
secondpart = document.getElementById("toolBar").innerHTML.substring(57);
document.getElementById("toolBar").innerHTML = firstpart+secondpart;

}

}
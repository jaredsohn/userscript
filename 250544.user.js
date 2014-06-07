// ==UserScript==
// @name        Links On Userlist
// @author      Shadow Thief
// @namespace   DutchSaint
// @version     1
// @description Provides a link to each user's link.php page via userlist.php
// @include     http://nolinks.net/boards/userlist.php*
// @include     http://www.nolinks.net/boards/userlist.php*
// @grant       none
// ==/UserScript==

// Create a header for the links, which will go to the left of the usernames
var table_header = document.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0];
table_header.innerHTML = '<th class="tc3" scope="col">Links</th>'+table_header.innerHTML;

// Add a link to the user's links.php page to the left of their username
var table_body = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
for (var counter=0;counter<table_body.length;counter++)
{
	var user_id = table_body[counter].getElementsByTagName("a")[0].href.split("=")[1];
	table_body[counter].innerHTML = '<td class="tc3"><a href="../links/links.php?mode=user&uid='+user_id+'&page=1">Links</a></td>'+table_body[counter].innerHTML;
}
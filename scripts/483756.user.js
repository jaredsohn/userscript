// ==UserScript==
// @name        ACP Inserter
// @namespace   http://www.neocodex.us
// @description Inserts ACP link to admin_bar
// @include     http://www.neocodex.us/*
// @version     1
// @grant       none
// ==/UserScript==

var abar = document.getElementById("admin_bar");
var acplink = document.createElement("li");
acplink.innerHTML = "<a title=\"ACP\" href=\"http://www.neocodex.us/forum/admin/index.php\">AdminCP</a>";
abar.insertBefore(acplink,abar.firstChild);

if(document.location.hash != ""){
	var post = document.location.hash.substring(6);
	post = "post_id_"+post;
	document.location.hash = "";
	document.getElementById(post).scrollIntoView();
}
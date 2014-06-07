// ==UserScript==
// @name		WoTStatScript - Forums
// @version		0.4
// @description Adds a part of the signature from WoTLabs underneath the posterbox info for every post in a thread in the World of Tanks forums.
// @author		Orrie
// @namespace	http://forum.worldoftanks.eu/index.php?/topic/263423-
// @updateURL	http://userscripts.org/scripts/source/478120.meta.js
// @downloadURL http://userscripts.org/scripts/source/478120.user.js
// @icon		http://dl.dropboxusercontent.com/u/12497046/wot/projects/statscript/img/icon.png
// @include		http://forum.worldoftanks.eu/index.php?/topic/*
// @include		http://forum.worldoftanks.com/index.php?/topic/*
// @include		http://forum.worldoftanks.ru/index.php?/topic/*
// @match		http://forum.worldoftanks.eu/index.php?/topic/*
// @match		http://forum.worldoftanks.com/index.php?/topic/*
// @match		http://forum.worldoftanks.ru/index.php?/topic/*
// @grant		none
// ==/UserScript==

var server = document.location.host.match(/\.([^\.]+)$/)[1];
if (server == "com") {
	server = "na";
}
var post_block = document.getElementsByClassName('post_block');
for (var i=0; i<post_block.length; i++) {
	var author_name = post_block[i].getElementsByClassName('ipsUserPhotoLink')[0].getAttribute("hovercard-id");
	var author_info_box = post_block[i].getElementsByClassName('author_info')[0];
	author_info_box.innerHTML += "<div style='height: 100px; width: 106px; overflow: hidden; margin: 10px 0 0;'><img src='http://wotlabs.net/sig/"+server+"/"+author_name+"/signature.png'></div>";
}

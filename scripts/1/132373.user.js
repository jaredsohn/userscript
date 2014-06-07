// ==UserScript==
// @name           Steam wishlist missing images fix
// @description    Replaces "no image available" with an actual game image on Steam wishlists.
// @version        0.1
// @namespace      http://steampressure.track7.org/
// @author         misterhaan
// @run-at         document-end
// @include        http://steamcommunity.com/id/*
// @include        http://steamcommunity.com/profiles/*
// ==/UserScript==

var items = document.getElementById("wishlist_items");
if(items) {
	imgs = items.getElementsByTagName("img");
	for(var i = 0; i < imgs.length; i++)
		if(imgs[i].src == "http://media.steampowered.com/steamcommunity/public/images/avatars/33/338200c5d6c4d9bdcf6632642a2aeb591fb8a5c2.gif") {
			var gameurl = imgs[i].parentNode.href;
			imgs[i].src = "http://cdn.steampowered.com/v/gfx/apps/" + gameurl.substring(gameurl.lastIndexOf("/") + 1) + "/header.jpg";
		}
}

// ==UserScript==
// @name        Select and Go
// @namespace   eph
// @description Add short cuts of Pixiv, yande.re, Konachan, niconico, bilibili, AcFun, etc to context menu while selected id
// @include     *
// @grant       none
// @version     1.21
// ==/UserScript==


// You can remove some of the following websites.
var LINKS = [
	//[ "Google Search" , false , "https://www.google.com/search?q=" , "https://www.google.com/favicon.ico" ],
	[ "niconico" , /^[sn]m\d+$/i , "http://www.nicovideo.jp/watch/" , "http://www.nicovideo.jp/favicon.ico" ],
	[ "bilibili" , /^av\d+$/i , "http://www.bilibili.tv/video/" , "http://www.bilibili.tv/favicon.ico" ],
	[ "AcFun" , /^ac\d+$/i , "http://www.acfun.tv/v/" , "http://www.acfun.tv/favicon.ico" ],
	[ "Pixiv" , /^\d+$/ , "http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" , "http://www.pixiv.net/favicon.ico" ],
	//[ "Pixiv (member)" , /^\d+$/ , "http://www.pixiv.net/member.php?id=" , "http://www.pixiv.net/favicon.ico" ],
	[ "yande.re" , /^\d+$/ , "https://yande.re/post/show/" , "https://yande.re/favicon.ico" ],
	[ "Konachan" , /^\d+$/ , "http://konachan.com/post/show/" , "http://konachan.com/favicon.ico" ],
	[ "Sankaku Complex" , /^\d+$/ , "http://chan.sankakucomplex.com/post/show/" , "http://chan.sankakucomplex.com/favicon.ico" ],
	//[ "Danbooru" , /^\d+$/ , "http://danbooru.donmai.us/posts/" , "http://danbooru.donmai.us/favicon.ico" ],
	//[ "Gelbooru" , /^\d+$/ , "http://gelbooru.com/index.php?page=post&s=view&id=" , "http://gelbooru.com/favicon.png" ],
	//[ "3dbooru" , /^\d+$/ , "http://behoimi.org/post/show/" , "http://behoimi.org/favicon.ico" ],
	];


var selected_text = "";
var sago_menu = null;

document.addEventListener("contextmenu", function(e) {
	var n = e.target;
	if (n.contextMenu && n.contextMenu !== sago_menu) return;

	selected_text = ("" + window.getSelection()).trim();
	
	if (selected_text == "") {
		if (sago_menu && n.contextMenu === sago_menu) n.removeAttribute("contextmenu");
		return;
	}

	if (!sago_menu) {
		
		sago_menu = document.createElement("menu");
		sago_menu.id = "sago_menu";
		sago_menu.type = "context";
		document.body.appendChild(sago_menu);

		function createMenuItem (link) {
			var item = document.createElement("menuitem");
			item.label = "Go to " + link[0];
			if (link.length > 3 && link[3]) item.icon = link[3];
			item.onclick = function () { window.open(link[2] + encodeURIComponent(selected_text)); };
			return item;
		}
		for (i = 0; i < LINKS.length; ++i) sago_menu.appendChild(createMenuItem(LINKS[i]));
	}

	var show_menu = false;
	for (i = 0; i < LINKS.length; ++i) {
		if (LINKS[i][1] && !LINKS[i][1].test(selected_text)) {
			sago_menu.children[i].setAttribute("hidden", "");
		} else {
			if (sago_menu.children[i].hidden) sago_menu.children[i].removeAttribute("hidden");
			show_menu = true;
		}
	}

	if (show_menu) n.setAttribute("contextmenu", "sago_menu");
	else if (n.contextMenu === sago_menu) n.removeAttribute("contextmenu");

}, false);

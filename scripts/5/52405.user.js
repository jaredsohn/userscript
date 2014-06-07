// ==UserScript==
// @name           SSW Avatar Recognition
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Puts a small recognizable avatar in the corner of any player's new avatar
// @include        http://www.secretsocietywars.com/index.php?p=forums*
// @include        http://www.secretsocietywars.com/index.php?p=account&a=change_avatar*
// @include        http://www.secretsocietywars.com/index.php?p=syndicates*
// ==/UserScript==

var avatars = document.evaluate('//td[@class="main"]//img[contains(@src, "/avatars/")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var data = eval(GM_getValue("data", "({})"));
var recognized_text = "Recognized Avatar";

if(document.location.href.indexOf("a=change_avatar") > -1) {
	avatar_page();
} else {
	process_forum();
}

function process_forum() {
	for(var i = 0; i < avatars.snapshotLength; i++) {
		var username = get_username(avatars.snapshotItem(i));
		var src = pathonly(avatars.snapshotItem(i).src);
		GM_log("Processing avatar #"+i);
		if(username) {
			GM_log("username: " + username);
			if(!data[username]) {
				data[username] = src;
			} else if(data[username] != src) {
				add_mini_avatar(avatars.snapshotItem(i), data[username]);
			}
		}
	}
	GM_setValue("data", data.toSource());
}

function pathonly(src) {
	return src.replace(/^http:\/\/[^\/]+/, "");
}

function avatar_page() {
	var username = get_avatar_page_username();
	GM_log("username: " + username);
	GM_log("avatars: " + avatars.snapshotLength);
	if(username) {
		var current_avatar = data[username];
		for(var i = 1; i < avatars.snapshotLength; i++) {
			var src = pathonly(avatars.snapshotItem(i).src);
			var element;
			GM_log("src: " + src);
			GM_log("current_avatar: " + current_avatar);
			if(current_avatar == src) {
				element = document.createTextNode(recognized_text);
			} else {
				element = create_use_avatar_link();
			}
//			avatars.snapshotItem(i).parentNode.insertBefore(document.createTextNode(message), avatars.snapshotItem(i).nextSibling);
			avatars.snapshotItem(i).parentNode.insertBefore(element, avatars.snapshotItem(i).nextSibling);
		}
	}
}

function create_use_avatar_link() {
	var link = document.createElement('a');
	link.href = document.location.href;
	link.addEventListener('click', use_avatar, false);
	link.innerHTML = "Recognize this avatar";
	return link;
}

function use_avatar(ev) {
	var text = document.createTextNode(recognized_text);
	var link = create_use_avatar_link();
	var replace = document.evaluate('//text()[.="'+recognized_text+'"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var img = document.evaluate('./preceding-sibling::img[contains(@src, "/avatars/")]', ev.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var username = get_avatar_page_username();
	ev.preventDefault();
	ev.target.parentNode.replaceChild(text, ev.target);
	if(replace) {
		GM_log("replace!");
		replace.parentNode.replaceChild(link, replace);
		GM_log("replaced");
	}
	if(img && username) {
		GM_log("found img and username");
		data = eval(GM_getValue("data", "({})"));
		data[username] = pathonly(img.src);
		GM_setValue("data", data.toSource());
	}
}

function get_avatar_page_username() {
	var text = document.evaluate('//text()[contains(., "\'s Avatar History")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(text) {
		var re;
		GM_log("text: " + text.data);
		if(re = /([^\s]+)'s Avatar History/i.exec(text.data)) {
			return re[1];
		}
	}
}

function get_username(avatar) {
	var text = document.evaluate('./ancestor::td[1]/a[contains(@href, "a=homeworld")]/text()', avatar, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(text) {
		return text.data;
	}
}

function add_mini_avatar(img, minisrc) {
	var mini = document.createElement('img');
	var span = document.createElement('span');
	span.style.display = "block";
	span.style.position = "absolute";
	mini.src = minisrc;
	mini.width = 30;
	mini.height = 30;
	mini.border = 1;
	mini.style.display = "inline";
	mini.style.position = "relative";
	mini.style.top = -32;
	mini.style.left = 118;
	mini.addEventListener('mouseover', enlarge_mini, false);
	mini.addEventListener('mouseout', shrink_mini, false);
	span.appendChild(mini);
	img.parentNode.insertBefore(span, img.nextSibling);
}

function enlarge_mini(ev) {
	ev.target.style.top = -150;
	ev.target.style.left = 0;
	ev.target.border = 0;
	ev.target.width = 150;
	ev.target.height = 150;
}

function shrink_mini(ev) {
	ev.target.width = 30;
	ev.target.height = 30;
	ev.target.style.top = -32;
	ev.target.style.left = 118;
	ev.target.border = 1;
}

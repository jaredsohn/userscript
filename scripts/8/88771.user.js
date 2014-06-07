// ==UserScript==
// @name           VKontakte Audio Download Link
// @namespace      http://itsbth.com/
// @description    Adds a download link to VKontakte audio search.
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

var dl_img = "data:image/gif;base64,R0lGODlhEAAQAJEAAF99nZqxxv///////yH5BAEAAAMALAAAAAAQABAAAAIjXICpGLafzhJUwFmv3qBa7nFdpnkhZJKoCaobJXKS2MxaUwAAOw==";
function refresh() {
	var li = document.getElementsByClassName("play_new");
	for (var i = 0; i < li.length; i++) {
		if (li[i].getAttribute('vde') != 'true') {
			var root, link, atag, img;
			li[i].setAttribute('vde', 'true');
			root = li[i].parentNode.parentNode;
			link = root.getElementsByTagName("input")[0].value.split(',')[0];

			atag = document.createElement('a');
			atag.setAttribute('href', link);
			img = document.createElement('img');
			img.setAttribute('src', dl_img);
			atag.appendChild(img);
			root.appendChild(atag);
			
			root.style.width = "36px";
		}
	}
}

setInterval(refresh, 1000);
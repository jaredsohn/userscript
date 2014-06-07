// ==UserScript==
// @name           VKontakte Audio Downloader
// @namespace      http://userscripts.org/scripts/show/88771
// @description    Adds a download link to VKontakte audio search (original at namespace).
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

var dl_img = "data:image/gif;base64,R0lGODlhEAAQAJEAAF99nZqxxv///////yH5BAEAAAMALAAAAAAQABAAAAIjXICpGLafzhJUwFmv3qBa7nFdpnkhZJKoCaobJXKS2MxaUwAAOw==";
function refresh() {
	var li = document.getElementsByClassName("play_new");
	for (var i = 0; i < li.length; i++) {
		if (li[i].getAttribute('vde') != 'true') {
			var input, info, link, atag, img;
			li[i].setAttribute('vde', 'true');
			input = li[i].parentNode.parentNode.getElementsByTagName("input")[0];
			link = input.value.split(',')[0];

			atag = document.createElement('a');
			atag.setAttribute('href', link);
			atag.setAttribute('class', 'fl_r');
			atag.setAttribute('style', 'padding-left: 4px;');
			img = document.createElement('img');
			img.setAttribute('src', dl_img);
			atag.appendChild(img);

			info = li[i].parentNode.parentNode.parentNode.getElementsByTagName("td")[1];

			info.insertBefore(atag, info.firstChild);
		}
	}
}

setInterval(refresh, 1000);
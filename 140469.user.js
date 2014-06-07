// ==UserScript==
// @name        PxmPreview
// @namespace   http://www.atomer.sakura.ne.jp
// @description Pixivの漫画タイプの投稿をプレビュー
// @include     http://www.pixiv.net/member_illust.php*
// @version     0.1.2
// ==/UserScript==

var frame = document.querySelector(".works_display"),
	link = frame.querySelector("a");

if (!/mode=manga/.test(link.href)) {
	return;
}

function getBody(str) {
	str = str.replace(/\n/g, "");
	var a = str.match(/<body[^>]*?>(.+)<\/body>/m);
	
	return a ? a[1] || "" : "";
}

function getImageSrc(str) {
	var div = document.createElement("div"),
		image,
		src,
		images = [];
	
	div.innerHTML = str;
	image = div.querySelectorAll(".image");
	if (image) {
		for (var i = 0, len = image.length; i < len; i++) {
			images.push(image[i].getAttribute("data-src"));
		}
	}
	
	return images;
}

function preview(images) {
	var div = document.createElement("div"),
		html = [],
		id,
		img,
		dif;
	
	for (var i = 0, len = images.length; i < len; i++) {
		id = /^http:\/\/i\d+\.pixiv\.net\/img\d+\/img\/[^\/]+\/(\d+)_p\d+\.(jpg|gif|png)$/i.exec(images[i]);
		if (id) {
			html.push('<a href="http://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=' + id[1] + '&page=' + i + '" target="_blank">' +
						'<img src="' + images[i] + '" width="100"></a><br><br>');
		}
	}

	img = frame.querySelector("img");
	dif = frame.offsetWidth - img.offsetWidth;
	
	div.style.width = "120px";
	div.style.height = frame.offsetHeight + "px";
	div.style.position = "absolute";
	div.style.top = 0;
	div.style.left = (dif/2 + img.offsetWidth + 10) + "px";
	div.style.overflow = "auto";
	div.innerHTML = html.join("");
	
	frame.style.position = "relative";
	frame.appendChild(div);
}

var xhr = new XMLHttpRequest();
xhr.open("GET", link.href);
xhr.onreadystatechange = function() {
	if (xhr.readyState === 4 && xhr.status === 200) {
		preview(getImageSrc(getBody(xhr.responseText)));
	}
};
xhr.send();


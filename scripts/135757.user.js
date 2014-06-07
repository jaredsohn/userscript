// ==UserScript==
// @name           Imgur-urlchanger
// @namespace      mizze89
// @author         mizze89
// @include        http://imgur.com/*
// @ignore          http://imgur.com/include/tf-iframe.html
// ==/UserScript==
if (self.location == "http://imgur.com/") {}

else if (self.location == "http://imgur.com/include/tf-iframe.html") {}

else if (String(self.location).indexOf("gallery") > 0) {}

else if (String(self.location).indexOf("/r/") > 0) {}

else if (String(self.location).indexOf("/a/") > 0) {}

else {
	var url = String(self.location);
	var urls = url.split("imgur.com/");
	var pic_url = urls[1];
	var pic = String("http://i.imgur.com/" + (pic_url) + ".jpg");
	window.location.href = pic;
}
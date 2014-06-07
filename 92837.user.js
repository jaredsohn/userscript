// ==UserScript==
// @name           Image Host Checker - NudeCelebForum.com
// @version        2013-13-01
// @namespace      *
// @include        http://nudecelebforum.com/*
// @include        http://*.nudecelebforum.com/*
// ==/UserScript==

var allowed_hosts = new  Array(

	"depic.me",
	"imagebam.com",
	"imageupper.com",
	"imagevenue.com",
	"imgbox.com",
	"www.pics-sharing.net",
	"pimpandhost.com",
	"pixelup.net",
	"pixhost.ch",
	"postimage.org",
	"sharenxs.com",
	"shotpix.com",
	"stooorage.com",
	"turboimagehost.com",
	"uploadhouse.com"
);


var images = document.getElementsByTagName('img');
var images_count = images.length;
for(i = 0; i < images_count; i++){
	var image = images[i];
	
	// Set the title to url if no title already set
	if(image.hasAttribute("title") == false){
		image.setAttribute("title",image.src);
	}
	
	// Put a red border around pictures hosted on banned hosts
	var allowed_hosts_count = allowed_hosts.length;
	for(j = 0; j < allowed_hosts_count; j++){
		if(image.src.indexOf(allowed_hosts[j]) >= 0){
			image.style.border = "medium solid green";
		}
	}
}
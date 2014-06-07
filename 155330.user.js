// ==UserScript==
// @name           Image Host Checker - NudeCelebForum.com
// @version        2013-12-06
// @namespace      *
// @include        http://nudecelebforum.com/*
// @include        http://*.nudecelebforum.com/*
// ==/UserScript==

var banned_hosts = new  Array(

"depic.me",
"fapomatic.com",
"imagebam.com",
"imagescream.com",
"imagetwist.com",
"imageupper.com",
"imagevenue.com",
"imagezilla.net",
"imgbox.com",
"photosex.biz",
"pics-sharing.net",
"picturescream.com",
"pimpandhost.com",
"pixelup.net",
"pixhost.ch",
"pixhost.org",
"postimage.org",
"postimg.org",
"sharenxs.com",
"shotpix.com",
"stooorage.com",
"turboimagehost.com",
"uploadhouse.com");


var images = document.getElementsByTagName('img');
var images_count = images.length;
for(i = 0; i < images_count; i++){
	image = images[i];
	
	// Set the title to url if no title already set
	if(image.hasAttribute("title") == false){
		image.setAttribute("title",image.src);
	}
	
	// Put a green border around pictures hosted on allowed hosts
	banned_hosts_count = banned_hosts.length;
	for(j = 0; j < banned_hosts_count; j++){
		if(image.src.indexOf(banned_hosts[j]) >= 0){
			image.style.border = "medium solid green";
		}
	}
}
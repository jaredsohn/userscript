// ==UserScript==
// @name           Allowed Thumbnail Checker - planetsuzy.org
// @version        2014-04-03
// @namespace      *
// @include        http://planetsuzy.org/*
// @include        http://*.planetsuzy.org/*
// ==/UserScript==

var white_list = new  Array(
"depic.me",
"dodaj.rs",
"easyimghost.com",
"gfycat.com",
"fapomatic.com",
"imagebam.com",
"imageho.me",
"imagetwist.com",
"imageupper.com",
"imagevenue.com",
"imagezilla.net",
"imgbox.com",
"pics-hosting.com",
"pics-sharing.net",
"picszone.net",
"pimpandhost.com",
"pixelup.net",
"pixhost.org",
"pixroute.com",
"photosex.biz",
"postimage.org",
"postimg.org",
"sharenxs.com",
"stooorage.com",
"turboimagehost.com",
"uploadhouse.com",
"winimg.com",
"postxxximage.org");



var images = document.getElementsByTagName('img');
var images_count = images.length;
for(i = 0; i < images_count; i++){
	image = images[i];
	
	// Set the title to url if no title already set
	if(image.hasAttribute("title") == false){
		image.setAttribute("title",image.src);
	}
	
	// Put a red border around pictures hosted on banned hosts
	banned_hosts_count = white_list.length;
	for(j = 0; j < banned_hosts_count; j++){
		if(image.src.indexOf(white_list[j]) >= 0){
			image.style.border = "medium solid green";
		}
	}
}
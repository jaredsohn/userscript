// ==UserScript==
// @name           Topboard Allowed Image Hosts
// @version        2014-02-24
// @namespace      *
// @include        http://topboard.org/*
// @include        http://www.topboard.org/*
// ==/UserScript==

var white_list = new  Array(
"depic.me",
"depfile.com",
"fapomatic.com",
"imgadult.com",
"imgearn.net",
"imagebam.com",
"imagetwist.com",
"imagevenue.com",
"imagezilla.net",
"imageho.me",
"imgbox.com",
"imgpit.com ",
"photosex.biz",
"pimpandhost.com",
"picshareunit.com",
"pixtreat.com",
"pixhost.org",
"pixroute.com",
"postimage.org",
"sharenxs.com",
"stooorage.com",
"turboimagehost.com",
"uploadhouse.com",
"uploadhouse.com");



var images = document.getElementsByTagName('img');
var images_count = images.length;
for(i = 0; i < images_count; i++){
	image = images[i];
	
	// Set the title to url if no title already set
	if(image.hasAttribute("title") == false){
		image.setAttribute("title",image.src);
	}
	
	// Put a green border around pictures hosted on allowed hosts list
	banned_hosts_count = white_list.length;
	for(j = 0; j < banned_hosts_count; j++){
		if(image.src.indexOf(white_list[j]) >= 0){
			image.style.border = "medium solid green";
		}
	}
}
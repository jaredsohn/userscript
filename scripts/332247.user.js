// ==UserScript==
// @name           Kitty-Kats Allowed Image Hosts
// @version        2014-03-13
// @namespace      *
// @include        http://kitty-kats.net/*
// @include        http://kitty-kats.com/*
// ==/UserScript==

var white_list = new  Array(
"damimage.com",
"depic.me",
"dumpyourphoto.com",
"fapomatic.com",
"fastpic.ru",
"image18.org",
"imagebam.com",
"imageblinks.com",
"imagedecode.com",
"imageeer.com",
"imagefox.net",
"imageho.me",
"imageporter.com",
"imagesocket.com",
"imageteam.org",
"imagetwist.com",
"imagevenue.com",
"imagezilla.net",
"imgbox.com",
"imgchili.net",
"imgdino.com",
"imgempire.com",
"imgfap.net",
"imgftw.net",
"imgnook.com",
"imgpaying.com",
"imgproof.net",
"imgserve.net",
"imgspice.com",
"imgtiger.com",
"jovoimage.com",
"miragepics.com",
"photosex.biz",
"picturescream.com",
"pics-sharing.net",
"picsee.net",
"picstate.com",
"pimpandhost.com",
"pixelup.net",
"pixhost.org",
"pixpal.net",
"pixroute.com",
"pixtreat.com",
"postimage.org",
"postimg.org",
"sharenxs.com",
"stooorage.com",
"truepic.org",
"turboimagehost.com",
"uploadhouse.com ",
"xtupload.com");



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

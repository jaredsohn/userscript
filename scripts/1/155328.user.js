// ==UserScript==
// @name           Image Host Checker2 - PlanetSuzy.org
// @version        2013-02-18
// @namespace      *
// @include        http://planetsuzy.org/*
// @include        http://*.planetsuzy.org/*
// ==/UserScript==

var banned_hosts = new  Array(
	"10pix.ru",
	"abload.de",
	"cocoimage.com",
	"dippic.com",
	"easyloadfiles.net",
	"elitepx.com",
	"funnyzoneimages.hi2.ro",
	"hotlinkimage.com",
"imgbd.net",
	"imgbuck.com",
	"imgchili.com",
	"imgiga.com",
	"imageban.ru",
	"imagebanana.com",
"imagebax.com",
"imagebunk.com",
	"imagecarry.com",
	"imagecherry.com",
	"images-host.biz",
	"imagehyper.com",
	"imagekitty.com",
	"imagepix.org",
	"imageporter.com",
	"images.bz",
	"imageshack.us",
	"imagesocket.com",
"imageswitch.com",
"imgdino.com",
"imgrill.com",
	"imgur.com",
	"immage.de",
	"ipicture.ru",
	"jbthehot.com",
	"linkpic.ru",
	"megafotka.net",
	"messyshare.com",
	"pic2profit.com",
	"pic4you.ru",
	"pic5you.ru",
	"pic-mir.ru",
	"pic-upload.de",
	"pic.nhjnji.com",
	"picfoco.com",
	"picjackal.com",
	"picley.net",
	"picp2.com",
	"picxxx.org",
	"pixshock.net",
	"pornimghost.com",
	"radikal.ru",
	"screenlist.ru",
	"sfwimages4u.com",
	"sharedimages.org",
	"sharefoco.com",
	"skracaj.com",
	"spetson.com",
	"tinypic.com",
	"up-pic.ru",
	"ximages.net",
	"xoze.in",
"yuimgshare.info",
	"zimg.info");


var images = document.getElementsByTagName('img');
var images_count = images.length;
banned_hosts_count = banned_hosts.length;
for(i = 0; i < images_count; i++){
	image = images[i];
	
	// Set the title to url if no title already set
	if(image.hasAttribute("title") == false){
		image.setAttribute("title",image.src);
	}
	
	// Put a red border around pictures hosted on banned hosts
	var banned_image = false;
	for(j = 0; j < banned_hosts_count; j++){
		if(image.src.indexOf(banned_hosts[j]) >= 0){
			image.style.border = "medium solid red";
			banned_image = true;
		}
	}
	
	// When the image is not from a banned host
        // we check if the image links to a banned host (for cash per click host)
	if (banned_image == false) {
		var image_container = image.parentNode;
		
		if (image_container.localName == 'a')
			for(j = 0; j < banned_hosts_count; j++)
				if(image_container.href.indexOf(banned_hosts[j]) >= 0)
					image.style.border = "medium solid red";
	}
}
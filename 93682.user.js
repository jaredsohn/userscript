// ==UserScript==
// @name           Image Host Checker - NudeCelebForum.com
// @version        2013-13-01
// @namespace      *
// @include        http://fritchy.com/*
// @include        http://*.fritchy.com/*
// ==/UserScript==




var allowed_hosts = new  Array(

	"depic.me",
	"fapomatic.com",
	"fastpic.ru",
	"imaaage.com",
	"imagebam.com",
	"imagehaven.net",
	"imagetwist.com",
	"imagevenue.com",
	"imagezilla.net",
	"imgbox.com",
	"nudiehost.com",
	"picszone.net",
	"pimpandhost.com",
	"sharenxs.com",
	"stooorage.com",
	"turboimagehost.com",
	"uploadhouse.com",
	"upmyphoto.com"
);

var banned_hosts = new Array(

	"cashmoneyuploads",
    "easy-share",
    "eufile.eu",
    "fileace",
    "filebounty",
    "filehost.ws",
    "filemad",
    "fileme",
    "fileserve",
    "filesonic",
    "gigabase.com",
    "hitfile.net",
    "letitbit",
    "oron",
    "qube cash",
    "queenshare.com",
    "rapidgator",
    "shareflare.net",
    "shareloading.net",
    "st0rage.to",
    "storebit.net",
    "turbobit.net",
    "unibytes.com",
    "upfolder.net",
    "vip-file"
);




// Allowed images get a green border

var images = document.getElementsByTagName('img');
var images_count = images.length;
var allowed_hosts_count = allowed_hosts.length;


for (i = 0; i < images_count; i++) {

	var image = images[i];
	
	// Set the title to url if no title already set
	if(image.hasAttribute("title") == false)
		image.setAttribute("title",image.src);
	
	
	// Put a red border around pictures hosted on banned hosts
	for (j = 0; j < allowed_hosts_count; j++) {

		if(image.src.indexOf(allowed_hosts[j]) >= 0)
			image.style.border = "medium solid green";
	}
}




// Banned links get a red border

var urls = document.getElementsByTagName('a');
var urls_count = urls.length;
var banned_hosts_count = banned_hosts.length;


for (i = 0; i < urls_count; i++) {

	var url = urls[i];

	if (url.hasAttribute('href') == true) {

		for(j = 0; j < banned_hosts_count; j++){

			if(url.getAttribute('href').indexOf(banned_hosts[j]) >= 0) 
				url.style.border = "medium solid red";
		}
	}

}
// ==UserScript==
// @name        Planetsuzy Host Checker 2
// @version        2013-02-23
// @namespace   *
// @include     http://planetsuzy.org/*
// @include     http://*.planetsuzy.org/*
// ==/UserScript==




// -----------------------------------------------------------------------------
//     Image red border
// -----------------------------------------------------------------------------

var allowed_image_hosts = new  Array(

	// avoid the red border around images from the server itself
	"planetsuzy.org",

	"depic.me",
	"fapomatic.com",
	"imagebam.com",
	"imagetwist.com",
	"imagevenue.com",
	"imagezilla.net",
	"imgbox.com",
	"pimpandhost.com",
	"pixhost.org",
	"pixroute.com",
	"postimage.org",
	"sharenxs.com",
	"stooorage.com",
	"turboimagehost.com",
	"uploadhouse.com"
);




var images = document.getElementsByTagName('img');
var images_count = images.length;
var allowed_image_hosts_count = allowed_image_hosts.length;

for (i = 0; i < images_count; i++) {

	var image = images[i];
	

	// Set the title to url if no title already set
	if(image.hasAttribute("title") == false)
		image.setAttribute("title",image.src);
	
	
	// Put a red border around pictures hosted on banned hosts
	var allowed_image = false;

	j = 0;
	while (j < allowed_image_hosts_count && allowed_image == false) 
		if (image.src.indexOf(allowed_image_hosts[j++]) >= 0) 
			allowed_image = true;

	if (allowed_image == false)
		image.style.border = "medium solid red";
}










// -----------------------------------------------------------------------------
//     File link red border
// -----------------------------------------------------------------------------

var allowed_file_hosts = new  Array(

	// avoid the red border around images from the server itself
	"planetsuzy.org",

	// planetsuzy partners
	"bangmedia.go2cloud.org",

	"bitshare.com",
	"depositfiles",
	"dfiles",
	"extabit",
	"filefactory",
	"filepost.com",
	"fileswap",
	"hotfile",
	"luckyshare",
	"lumfile",
	"mediafire",
	"packupload",
	"putlocker",
	"rapidgator.net",
	"rapidshare.com",
	"ultramegabit",
	"uploaded.net",
	"uploaded.to",
	"ul.to",
	"uploading.com"
);




var a_balises = document.getElementsByTagName('a');
var a_balises_count = a_balises.length;

var links = new Array();
for (i = 0; i < a_balises_count; i++) 
	if (a_balises[i].hasAttribute("href") == true 
		&& (a_balises[i].hasChildNodes() == false || (a_balises[i].hasChildNodes() && a_balises[i].firstChild.localName != "img")))
		links.push(a_balises[i]);

var links_count = links.length;
var allowed_file_hosts_count = allowed_file_hosts.length;

for (i = 0; i < links_count; i++) {

	var link = links[i];
	var allowed_link = false;

	// Is it a relative link to planetsuzy?
	if (link.getAttribute("href").indexOf("http") != 0) { 
		allowed_link = true;

	// It's not. Is it from the allowed file hosts list?
	} else {

		j = 0;
		while (j < allowed_file_hosts_count && allowed_link == false) 
			if (link.getAttribute("href").indexOf(allowed_file_hosts[j++]) >= 0) 
				allowed_link = true;
	}

	// It's not. Is it from the allowed image hosts list?
	if (allowed_link == false) {
		j = 0;
		while (j < allowed_image_hosts_count && allowed_link == false) 
			if (link.getAttribute("href").indexOf(allowed_image_hosts[j++]) >= 0) 
				allowed_link = true;
	}

	
	if (allowed_link == false)
		link.style.border = "medium solid red";
}
// ==UserScript==
// @name           E-Hentai 'Pining For The Fjords' Auto-Transfer Script
// @description    When a user encounters a "pining for the fjords" gallery on e-hentai.org, this will automatically transfer the user to the matching exhentai.org gallery, allowing the user to view the gallery.
// @namespace      http://userscripts.org/users/434290
// @include        http://g.e-hentai.org/g/*
// @include        http://g.e-hentai.org/s/*
// ==/UserScript==

if(document.title == "Gallery Not Available - E-Hentai Galleries")
{
	document.location.href = "http://exhentai.org" + parse_gallery_identifier();
}

if (document.location.href.indexOf("http://exhentai.org/g/") != -1 || 
    document.location.href.indexOf("http://exhentai.org/s/") != -1)
{
	document.addEventListener("DOMContentLoaded", display_gal, true);
}

function display_gal() {
	var code = document.getElementsByTagName("textarea");
	document.open();
	document.write(code[0].value);
	document.close();
	document.releaseEvents();
}

function parse_gallery_identifier() {
	if (location.href.indexOf("/g/") != -1) {
		var identifier_start = location.href.indexOf("/g/");
	}
	else if (location.href.indexOf("/s/") != -1) {
		var identifier_start = location.href.indexOf("/s");
	}
	var identifier_end = location.href.length;
	var identifier = location.href.substr(identifier_start, identifier_end);
	return identifier;
}
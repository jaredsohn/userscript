// ==UserScript==
// @name        E-hentai Archive Redirecter
// @namespace   http://userscripts.org/scripts/show/144236
// @description Redirect Exhentai Archiver link  to E-hentai
// @include     *://exhentai.org/archiver.php?*
// @version     0.1
// ==/UserScript==

if(document.title == "Archiver")
{
	document.location.href = "http://g.e-hentai.org/" + parse_gallery_identifier();
}

if (document.location.href.indexOf("http://g.e-hentai.org/") != -1) 
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
	var identifier_start = location.href.indexOf("archiver.php?");
	var identifier_end = location.href.length;
	var identifier = location.href.substr(identifier_start, identifier_end);
	return identifier;
}
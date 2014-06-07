// ==UserScript==
// @name           MSNBC Printer Friendly
// @namespace      localhost
// @description    Redirect MSNBC stories to printer-friendly page without displaying the print dialog.
// @include        http://www.msnbc.msn.com/id/*
// ==/UserScript==

var url = window.location.href;
var id = url.match(/id\/(\d+)/)[1];
if (!url.match(/print/)) {
	var url_root = "http://www.msnbc.msn.com/id/";
// "/print/1/" offers the print dialog; "/print/0/" turns it off 
	var url_stem = "/print/0/displaymode/1098/";
	new_url = url_root + id + url_stem;
	window.location.replace(new_url);
}

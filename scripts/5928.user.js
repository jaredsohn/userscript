// Turbofunny.com Video Download Link
// v.1

// ==UserScript==
// @name          Turbofunny Video Download Link
// @namespace     http://www.digivill.net/~joykillr
// @description	  Adds a direct link to videos on turbofunny.com so you can download them.
// @include       http://*.turbofunny.com/*
// ==/UserScript==


(function() {
	if (document.body.getElementsByTagName("param")[0]) {
		var dltag = document.body.getElementsByTagName("param")[0];
		dltag = dltag.getAttribute("value");
		var movieid = dltag.split("movieid=")[1].split("&")[0];
		var moviename = dltag.split("moviename=")[1].split("&")[0];
		var dlfile = "http://www.turbofunny.com/pl/" + movieid + "/" + moviename + ".flv";
	
		var turbobox = document.createElement("div");
		turbobox.setAttribute("id", "hackdiv");
		turbobox.setAttribute("style", "display: inline !important;");
		turbobox.innerHTML = '<table style="width:auto;"><tr>' +
			'<td style="text-align:left;">' +
			'<a href="' + dlfile + '" style="color: #ffffff; background-color: #000000; border: 1px solid; #ffffff">Click here to download file</a>' + 
			'<br /></td></tr></table>';
		document.getElementsByTagName("object")[0].parentNode.insertBefore(turbobox, document.getElementsByTagName("object")[0].parentNode.lastChild);
	}

})();
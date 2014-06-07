// ==UserScript==
// @name          TF2R Sidepic Source
// @namespace     http://zemn.me
// @description   Adds a link to find the sidepic on Google Images, as well as hijacking your account and using it to make crate raffles.
// @match         *tf2r.com/k*.html
// @version       1.0
// @run-at        document-end
// @grant         none
// ==/UserScript==
var	ri=document.getElementsByClassName("raffleicon")[0];
if([]+ri != "undefined") {
	var	an = document.createElement("a");
	an.setAttribute(
			"href",
			"https://www.google.co.uk/searchbyimage?image_url=" +
				encodeURIComponent(ri.getElementsByTagName("div")[0].getAttribute("style").split("'")[1].split("'")[0]) +
				"&btnG=Search+by+image&image_content=&filename=&safe=off&hl=en&biw=1099&bih=584"
	);
	an.setAttribute("style", "float:right");

	document.getElementsByClassName("hfont")[0].appendChild(an).appendChild(document.createTextNode("Image source..."));
}

// ==UserScript==
// @name           Lista YouTube RSS Reader
// @description    Ciekawe.
// @version        0.01.01
// @author         look997
// @license        MIT License
// @include        *http://theoldreader.com*
// @resource       metadata http://userscripts.org/scripts/source/73380.meta.js
// @updateURL      http://userscripts.org/scripts/source/73380.meta.js
// @date 2014-02-08
// @grant		   none
// ==/UserScript==
document.addEventListener ("DOMContentLoaded", LocalMain, false);

function LocalMain () {
	$(".span3 .brand").html("hak");
	//document.getElementById("subscribe").innerHTML+="<div>Czekać</div>"
	//document.getElementsByTagName("body")[0].innerHTML+="<div>Czekać</div>"
	if ( document.getElementsByTagName("head")[0].getAttribute("data-alt") != "stop" ) {
			console.log(document.getElementsByTagName("head")[0].getAttribute("data-alt") +" - przed");
			document.getElementsByTagName("head")[0].setAttribute("data-alt", "stop");
				var scriptg = document.createElement("script");
			document.getElementsByTagName("head")[0].appendChild(scriptg);
			
			scriptg.setAttribute("src", "file:///D:/dobraytrss.js");
			//scriptg.setAttribute("src", "https://raw.github.com/look997/bardzo/bardzoYT/bardzoYTRSSlistGM.js");
			scriptg.onload = function() {
				console.log("tegib" );
			}
			console.log(document.getElementsByTagName("head")[0].getAttribute("data-alt") +" - po");
			var nonono = document.getElementsByTagName("head")[0].getAttribute("data-alt") =="stop";
			console.log("Licc Licz "+ nonono);
	}
    // Your code goes here.
}
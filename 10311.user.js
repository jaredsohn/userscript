// ==UserScript==
// @name           Google reader digg news
// @namespace      http://jordi.degroof.googlepages.com/
// @description    Adds a digg control to every post in google reader
// @version        1.2.2
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @include        http://digg.com/tools/diggthis.php?u=*#googlereader
// ==/UserScript==


// Check whether we're on the page with the digg-widget
if(location.href.indexOf("http://digg.com/tools/diggthis.php?u=") === 0 && location.hash.indexOf("#googlereader") === 0)
{	
	// Change target of links
	var links= document.getElementsByTagName("A");
	for (var a= 0; a < links.length; a++)
	{
		links[a].target= "_blank";
	}
	return;
}

var entries=document.getElementById("chrome");
if(entries)
	entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);

function nodeInserted(event){	
	if (event.target.tagName=="DIV"){
			if (event.target.className === "entry-actions"){
				// List mode
				var linkbar= event.target;
				var parent= event.target.parentNode;
			} else if (event.target.firstChild.className ==="card card-common"
			    ||  event.target.firstChild.className === "ccard-container card-common"){ 
				// Expanded mode
				var linkbar= event.target.getElementsByClassName("entry-actions")[0];
				var parent= event.target;
			} else
				return;

			var link = parent.getElementsByClassName("entry-title-link")[0].getAttribute('href');
			
			window.setTimeout(function() {
				GM_xmlhttpRequest({
					method: 'HEAD',
					url: link,
					onload: function (responseDetails) {
						var btn= document.createElement("iframe");
						btn.setAttribute("src", "http://digg.com/tools/diggthis.php?u="+escape(responseDetails.finalUrl)+"&s=compact&k=%23F3F5FC#googlereader");
						btn.setAttribute("style", "height:15.5px; width:120px;");
						btn.setAttribute("frameborder", "0");
						btn.setAttribute("scrolling", "no");
						linkbar.appendChild(btn);
					}
				});
			}, 0);


	}
}

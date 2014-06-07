// ==UserScript==
// @name           Youtube - Center, Hide Subscriptions and Recomendations
// @namespace      youtube-center-hide-subs-and-recommendations
// @include    	   *youtube.com/
// @match          http://www.youtube.com/
// @match          http://www.youtube.com/?*
// @match          http://www.youtube.com/watch*
// @match          https://www.youtube.com/
// @match          https://www.youtube.com/?*
// @match          https://www.youtube.com/watch*
// @include        http://www.youtube.com/
// @include        http://www.youtube.com/?*
// @include        http://www.youtube.com/watch*
// @include        https://www.youtube.com/
// @include        https://www.youtube.com/?*
// @include        https://www.youtube.com/watch*
// @require  	   http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version        1
// @grant          none
// ==/UserScript==

var container = document.getElementById("body-container");


function replaceStyleInContainer(matchClass) {
    var elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')
                > -1) {
            elems[i].style.visibility="hidden"
        }
    }
}

function replaceStyleInId(id) {
   var container = document.getElementById(id);
   container.style.display="none";
}

function centrePage()
{
	if (location.pathname === "/watch")
	{
		document.body.className="ltr gecko gecko-19 site-center-aligned exp-new-site-width exp-watch7-comment-ui hitchhiker-enabled guide-enabled guide-collapsed sidebar-expanded ";
		document.getElementById('guide-container').style.left="-120px";
		document.getElementById("watch-owner-container").style.position="relative";
		document.getElementById("watch-owner-container").style.margin="20px auto";
        document.getElementById("watch-owner-container").style.width="990px";
        document.getElementById("watch-owner-container").style.left="35px";
	}
	else
	{
	
		if (location.pathname === "/")
		{
			//window.location.replace("http://www.youtube.com/feed/subscriptions/u");
			document.body.className="ltr gecko gecko-19 site-center-aligned exp-new-site-width exp-watch7-comment-ui hitchhiker-enabled guide-enabled guide-expanded";
			
		}
		else
		{
			if (location.pathname === "/results"){
			document.body.className="ltr  gecko gecko-19      site-center-aligned     exp-watch7-comment-ui hitchhiker-enabled      guide-enabled       guide-expanded ";
			
			}
			else
			{
				document.body.className="ltr gecko gecko-19 site-center-aligned exp-new-site-width exp-watch7-comment-ui hitchhiker-enabled guide-enabled guide-expanded";
			}
		}
	}
}

$(document).ready(function () 
{	
    "use strict";
    centrePage();
    replaceStyleInContainer("branded-page-v2-secondary-col");
    replaceStyleInId("guide-subscriptions-section");
    container.style.display="block";
});

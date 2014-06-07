// ==UserScript==
// @name           Block Applications Link v0.1
// @namespace      http://greasemonkey.jaredmcateer.com
// @description    Adds a link to Facebook's news feed to block applications
// @include        http://*.facebook.com/home.php*
// ==/UserScript==

window.addEventListener("load", function(e){
    // Get all page div tags
    var divs = document.getElementsByTagName("div")

    // Find the News Feed Section
    for (var i=0; i < divs.length; i++){
        if (divs[i].className.match(/app_install_story/)){
			links = divs[i].childNodes[1].childNodes[0].childNodes[0];
			
			for(var j=links.childNodes.length-1;j>=0;j--){			
				if(links.childNodes[j].pathname == "/apps/application.php"){
					search = links.childNodes[j].search.substring(1);
					pairs = search.split("&");
					for(k=0;k<pairs.length;k++){
						keyValue = pairs[k].split("=");
						if(keyValue[0]=="id"){
							id=keyValue[1];
							break;
						}
					}
					blockLink = document.createElement("a");
					blockLink.setAttribute("href","http://www.facebook.com/apps/block.php?id="+id+"&action=block");
					blockLink.appendChild(document.createTextNode(" [Block App] "));
					links.childNodes[j].parentNode.appendChild(blockLink);
					break;
				}
			}
		}
	}
	

}, false)
// ==UserScript==
// @name        9gag painlessly
// @description Go directly from Facebook to 9gag, without necessity to subscribe and use 9gag Facebook application
// @namespace   http://userscripts.org/users/116116
// @include     https://www.facebook.com/*
// @version     1.0 - 9th Sep 2012
// @grant 		none
// ==/UserScript==

my_stream_content = document.getElementById("contentArea");

function changeLinks(){

	shared_items = my_stream_content.getElementsByClassName("shareRedesignContainer");

	for(i=0; i<shared_items.length; i++){

		shared_item = shared_items[i];
		links = shared_item.getElementsByTagName("a");

		for (j = 0; j<links.length; j++){

			link = links[j];
			href = link.getAttribute("href");
			regExp = /http:\/\/9gag\.com\/gag\/\d+/;
			found = regExp.exec(href);
			
			if(found){

				link.setAttribute("href", found);
				link.removeAttribute("onclick");
				link.removeAttribute("onmouseover");

			}
		}
	}
}

setInterval(function(){changeLinks();}, 2000);
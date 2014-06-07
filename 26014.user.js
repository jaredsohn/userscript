// ==UserScript==
// @name                Google Reader scroll reducer
// @namespace      	http://google.com/reader/userscript
// @description       	Adds title/link of every item to the bottom of the item as well as the top
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// @include             https://google.com/reader/*
// @include             https://*.google.com/reader/*
// ==/UserScript==

// Adapted from the below-listed scripts by jer@nyquil.org

// http://userscripts.org/scripts/show/22481 by Edo78
// Google Reader + del.icio.us
// Adapted from http://userscripts.org/scripts/show/6497 by JohnM
// All bugs are mine, and not JohnM's.

var entries=document.getElementById("entries");

entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);

function nodeInserted(event){	


	if (event.target.tagName=="DIV"){


		//GM_log("Added - "+event.target.className);

		try{

			if (event.target.className!=""){

				var link;
	

				if (event.target.firstChild && event.target.firstChild.className=="card"){
					
					link=event.target.firstChild.firstChild.childNodes[1].childNodes[1].firstChild.firstChild.childNodes[1].innerHTML;
					

					var link_container = document.createElement("h2");
					link_container.innerHTML = link;
					var link_style = event.target.firstChild.firstChild.childNodes[1].childNodes[1].firstChild.firstChild.childNodes[1].getAttribute("class");

					link_container.setAttribute("class", link_style);
					event.target.firstChild.firstChild.childNodes[1].childNodes[1].firstChild.firstChild.childNodes[1].nextSibling.nextSibling.nextSibling.appendChild(link_container);

					

				}


				else

					return;

        



			}
		}

		catch(e){

			//GM_log(e);

		}

	}

}



// ==UserScript==
// @name	FA-FuraffinityButton (GreaseMonkeyVersion)
// @description Preview Images by hovering the mouse over thumbnails anywhere on Furaffinity. Make's "warning thumbnails" a lot less annoying, especially in search results.
// @namespace   http://www.furaffinity.net/journal/1155289/
// @include	http://www.furaffinity.net/*
// @version	20100625
// ==/UserScript==

/**
 * Furaffinity Button - adaption for GreaseMonkey
 * copyright 2010 by Blackraven2,
 * distributed under GPLv2 or higher
 */

/**
 * This is a scaled down version of FuraffinityButton 5
 * It will enable previewing of thumbnails by hovering
 * over them with the mouse pointer.
 * The preview is displayed on the left
 * (under the advertisements respectively the menu)
 * using the "halfsize" image if available.
 * Additionally the "tabs" bar is added when viewing a submission,
 * allowing easier navigation to the users gallery
 * and other user pages.
 *
 * The original FuraffinityButton is a so called "CustomButton" 
 * used with the Custombuttons² extension
 * ( https://addons.mozilla.org/en-US/firefox/addon/5066 )
 * and can be found on my furaffinity journal page
 * http://www.furaffinity.net/journal/1155289/
 *
 * Limitations in the GreaseMonkey Adaption
 * NO PREFERENCES: Preview size width is locked at 200px
 *                 unless you edit this script
 * NO AUTO-LOGIN FEATURE
 * NO CUSTOM STYLE
 */

var furaffinityButtonPreviewSize = 200;

/**
 * site modifier function to alter target site (furaffinity.net)
 */
var furaffinityButtonSiteModifier = function(myWin) {

	/**
	 * run only once per page
	 */
	if (myWin.document.furaffinityButtonFullyLoaded) {
		return;
	}

	var url = "" + myWin.location;
	var divsize = furaffinityButtonPreviewSize;

	/**
	 * check whether the user is on the target site
	 */
	if (url.match(/^https?:\/\/[^\/]*furaffinity.net/)) {


		/**
		 * identify area where to add preview div
		 */
		var browserdiv=null;
		if (myWin.document.getElementsByClassName("innertable")) {
			/**
			 * New position: left of the "innertable"
			 */
			var par=myWin.document.getElementsByClassName("innertable")[0];
			browserdiv=par.getElementsByTagName("td")[0];
		}
		if (browserdiv) {

			/**
			 * create new HTML elements
			 */
			var newimg=myWin.document.createElement("img");
			newimg.setAttribute("id","imageviewimg1");
			newimg.setAttribute("class","alt1");
			newimg.setAttribute("width",divsize);
			newimg.style.overflow="hidden";
			newimg.style.padding="2px";
			/**
			 * new features: if no 'half' size image can be found, display the thumbnail instead
			 */
			newimg.setAttribute("onError","this.setAttribute('src',this.alt);");
			/**
			 * new features: hide image if the user moves the mouse there, to make the elements behind usable
			 */
			newimg.setAttribute("onMouseOver","this.setAttribute('src','');this.setAttribute('alt','');");

			var newdiv1=myWin.document.createElement("td");
			newdiv1.setAttribute("id","placeholder");
			newdiv1.width=(4+divsize)+"px";
			newdiv1.vAlign="top";
			var newdiv=myWin.document.createElement("div");
			newdiv.setAttribute("id","imageviewdiv1");
			newdiv.setAttribute("class","maintable");
			newdiv.appendChild(newimg);
			newdiv.style.position="fixed";
			newdiv.style.left="3px";
			newdiv.style.bottom="0";
			newdiv.style.width=(4+divsize)+"px";
			newdiv.style.overflow="hidden";
			newdiv.style.margin="2px";
			newdiv.style.padding="1px";

			/**
			 * new feature - move advertisements to the left
			 */
			if (myWin.document.getElementById("ads")) {
				var ads=myWin.document.getElementById("ads");
				ads=ads.parentNode.removeChild(ads);
				newdiv1.appendChild(ads);
			}

			newdiv1.appendChild(newdiv);

			/**
			 * insert new elements into webpage
			 */
			browserdiv.parentNode.insertBefore(newdiv1,browserdiv);
			browserdiv.width="*";

			/**
			 * define mouseover handler functions to preview images
			 */
			/**
			 * Some very old images use a different name for their 'half' image
			 */
			function furaffinityButtonImageHandlerAncient() {
				var newsrc=this.src;
				newsrc=newsrc.replace(/thumbnail[.]/,"smaller.");
				var img=myWin.document.getElementById("imageviewimg1");
				if (img.alt!=""+this.src) {
					img.setAttribute("alt",""+this.src);
					img.setAttribute("src",newsrc);
				}
			}

			/**
			 * All semi recent images have the default 'half' image
			 */
			function furaffinityButtonImageHandlerNew() {
				var newsrc=this.src;
				newsrc=newsrc.replace(/thumbnail[.]/,"half.");
				var img=myWin.document.getElementById("imageviewimg1");
				if (img.alt!=""+this.src) {
					img.setAttribute("alt",""+this.src);
					img.setAttribute("src",newsrc);
				}
			}

			/**
			 * set mouseover event for all thumbnails on page
			 */
			var images=myWin.document.getElementsByTagName("img");
			var L = images.length;
			for (var i=0;i<L;i++) {
				var uri=images[i].src;
				/**
				 * find out which handler to use, guessing by the thumbnail filename
				 */
				if (uri.match(/[.]thumbnail[.]+jpg/)) {
					images[i].addEventListener("mouseover",furaffinityButtonImageHandlerAncient,false);
				} else if (uri.match(/thumbnail[.]/)) {
					images[i].addEventListener("mouseover",furaffinityButtonImageHandlerNew,false);
				}
			}
		}

		/**
		 * Add tabs to submission view and submission full view pages
		 */
		if (url.match(/\/view\//) || url.match(/\/full\//)) {
			/**
			 * find out user name
			 */
			var image = myWin.document.getElementById("submissionImg");
			var imageurl = "" + image.src;
			var username = imageurl.replace(/^.*\/art\//,'').replace(/\/.*$/,'');
			
			/**
			 * find table position
			 */
			var place = myWin.document.getElementById("submission").getElementsByClassName("maintable")[0].parentNode;

			/**
			 * add tabs as in the other user info panes
			 */
			if (place && username) {
				var tabspace = "";
				tabspace += "<br/>\n";
				tabspace += "<b><a href=\"/user/"+username+"/\">User Page</a></b>\n";
				tabspace += "<b><a href=\"/user/info/"+username+"/\">Commission Information</a></b>\n";
				tabspace += "<b><a href=\"/journals/"+username+"/\">Journals</a></b>\n";
				tabspace += "<b><a href=\"/gallery/"+username+"/\">Gallery</a></b>\n";
				tabspace += "<b><a href=\"/scraps/"+username+"/\">Scraps</a></b>\n";
				tabspace += "<b><a href=\"/favorites/"+username+"/\">Favorites</a></b>\n";
				tabspace += "<b><a href=\"/newpm/"+username+"/\">Send Note</a></b>\n";
				/**
				 * watch/unwatch link is skipped, since we don't know the current status
				 */

				var newdiv = myWin.document.createElement("div");
				newdiv.setAttribute("class","tab");
				newdiv.setAttribute("style","text-align:left;");
				newdiv.innerHTML = tabspace;

				place.insertBefore(newdiv,place.firstChild);
			}

		}

		myWin.document.furaffinityButtonFullyLoaded = true;


	}
}


/**
 * execute
 */
furaffinityButtonSiteModifier(window);

/**
 * end of file
 */


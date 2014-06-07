// ==UserScript==
// @name           Gmail Disable Web Clip Sponsored Links
// @namespace      userscripts.org
// @description    Automatically skips any sponsored links (and optionally tips) detected in the Gmail Web Clips feed.
// @include        http*://*mail.google.com/*
// @copyright      James Nisbet
// @website        http://blog.bandit.co.nz
// @version        0.53
// ==/UserScript==

(function() {

	// disable gmail help tips too?
	var hideTips = true;
	
	// disable "in-email" adverts sidebar as well?
	var hideAds = true;

	// check for a sponsored link
	function check() {
		
		var html = document.getElementsByTagName("html")[0];
		
		if (html.className == "cQ") {  // only bother if we're in the canvas iframe
			
			var clip = document.getElementById(":rr"); // rq
			var cliptype = document.getElementById(":rq"); // rp
			
			if(cliptype) {
				
				// first find the "next clip" button
				var nextclip = document.getElementById(":rn");
		
				// check if it has the word "sponsored" or "ads" in it
				if(cliptype.innerHTML.indexOf("Sponsored")!=-1 || cliptype.innerHTML.indexOf("ads")!=-1)	{
					// this is a sponsored link, skip it, biatch
					
					// sponsored link detected! replace with the previous good web-clip's info
					clip.innerHTML = last_clip;
					cliptype.innerHTML = "Web Clip";
				
					// try to 'click' next button by simulating a user click
					fireEvent(nextclip, "click"); // won't work as gmail no longer listens for click events... bastards
			
				}
		
				// not an advert, is it a tip? also check if we're hiding tips
				else if(hideTips && cliptype.innerHTML.indexOf("Tip")!=-1) {
					
					// tip detected! replace with the previous good web-clip's info
					clip.innerHTML = last_clip;
					cliptype.innerHTML = "Web Clip";
					
					// 'click' next button by simulating a user click
					fireEvent(nextclip, "click");
					
				}
				
				// otherwise write the good clip to var
				else {
					
					last_clip = clip.innerHTML;
					
				}
				
			}
		}
		
	}
	
	var last_clip = "";

	// run this check every 100 milliseconds, gmail won't mind
	var clipcheck = setInterval(check, 100);

	// ... and hide ads if necessary
	if(hideAds) {
		
		// borrowed from rapportive.com with some modifications
		/* var css = "";
		css += "table[class='Bs nH iY'] tr td[class='Bu']:last-of-type div.nH div.nH div.nH:not(:first-of-type) {" + "display: none !important;" + "}";
		css += "table[class='Bs nH iY'] tr td[class='Bu']:not(:first-of-type) {" + "width: 1px !important;" + "max-width: 1px !important;" + "}";
		
		css += "div.hj {" + "position: absolute !important;" + "width: 500px !important;" + "top: 12px !important;" + "right: 10px;" + "}";
		css += "div.hk {" + "padding: 0px !important;" + "float: right !important;" + "margin-left: 15px !important;" + "}";
		css += "div.hk img {" + "vertical-align: baseline;" + "}";
		css += "div.hk u {" + "display: none !important;" + "}";
		css += "h1.ha {" + "margin-right: 160px !important;" + "position: relative;" + "z-index: 10;" + "}";
		css += "div.J-M.AW {" + "z-index: 20;" + "}";
		css += "div#goog-acr-0 {" + "z-index: 20;" + "}";
		css += "div.tq {" + "z-index: 20;" + "}"; */

		// Hide the adverts from the sidebar
		var css = "table[class='Bs nH iY'] tr td[class='Bu']:last-child > div.nH > div.nH > div.nH:last-child { display:none !important; }";

		if (typeof GM_addStyle != "undefined") GM_addStyle(css);
		else if (typeof addStyle != "undefined") addStyle(css);
		else {
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
				var node = document.createElement("style");
				node.type = "text/css";
				node.appendChild(document.createTextNode(css));
				heads[0].appendChild(node); 
			}
		}
		
	}

	// simple event firing function
	// http://jehiah.cz/archive/firing-javascript-events-properly
	function fireEvent(element, event) {
		if (document.createEventObject) {
			// dispatch for IE
			var evt = document.createEventObject();
			return element.fireEvent('on'+event,evt)
		}
		else {
			// dispatch for firefox + others
			// modified for mouse events only
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent(event, true, true); // event type, bubbling, cancelable
			return !element.dispatchEvent(evt);
		}
	}

}());
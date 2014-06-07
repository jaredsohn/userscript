// ==UserScript==
// @name           Updated Google Reader Button Fix
// @namespace      https://mail.google.com/mail/
// @description    Updated version of https://www.userscripts.org/scripts/show/114402
// @include        http://*.google.*/*
// @include        https://*.google.*/*
// @exclude        http://www.google.com/*
// @exclude        https://plus.google.com/*
// ==/UserScript==


if (window.top != window.self)  //don't run on frames or iframes
    return;

/*todo: possibly add a "load" event listener instead of tries*/
wait(0);

function wait(attempts){
	if(attempts > 5)
		return;
	
	// handles reader, docs, photos, ect
	if(top.document.getElementById("gb_38") != null &&
	   top.document.getElementById("gb_32") != null ){
		swap_buttons(top.document.getElementById("gb_32"),top.document.getElementById("gb_38"));
		return;
	}
	
	// handles gmail
	if(top.document.getElementById("canvas_frame") != null &&
	   top.document.getElementById("canvas_frame").contentDocument != null &&
	   top.document.getElementById("canvas_frame").contentDocument.getElementById("gb_38") != null &&
	   top.document.getElementById("canvas_frame").contentDocument.getElementById("gb_32") != null ){
	   
		doc = top.document.getElementById("canvas_frame").contentDocument;
		aReader = doc.getElementById("gb_32");
		aSites = doc.getElementById("gb_38");
		
		swap_buttons(doc.getElementById("gb_32"),doc.getElementById("gb_38"));
		return;
	}

	setTimeout(function(){wait(attempts++);}, 500);
	
}
/* todo: re-write this so that it doesn't use hard-coded html*/

function swap_buttons(aReader,aSites){
	var reader_highlight = "";
	if( (""+document.location).slice(0,30) == "https://www.google.com/reader/")
		reader_highlight = " gbz0l gbp1";
	
	aSites.parentNode.innerHTML = "<a id=\"gb_32\" class=\"gbzt" + reader_highlight + "\" onclick=\"gbar.logger.il(1,{t:32})\" href=\"https://www.google.com/reader/?hl=en&amp;tab=my\" target=\"_blank\"><span class=\"gbtb2\"></span><span class=\"gbts\">Reader</span></a>";
	
	aReader.parentNode.innerHTML = "<a onclick=\"gbar.logger.il(1,{t:38})\" href=\"https://sites.google.com/?tab=m3\" id=\"gb_38\" class=\"gbmt\" target=\"_blank\">Sites</a>";	
}


/* Complete credit goes to Josiah Baker for writing this script for swapping "Photos" with "Reader" -- I */
/* just wanted to swap with Sites instead of Photos, and thought others might also want this.   Original */
/* is being used without permission, hopefully he's cool with that.					 */
// ==UserScript==
// @name          DNUK instant voting
// @include       http://www.doctors.net.uk/*
// @include       http://www.doctors.org.uk/*
// @include       https://www.doctors.net.uk/*
// @include       https://www.doctors.org.uk/*
// @author        Christopher Lam
// @version       2012.06.3
// ==/UserScript==

// Adapted from Jesse Ruderman's BASH.org instant voting
// 
// Revision 2012.06.3:
//      Minor revision to preload grey icon, avoiding image placeholder
// Revision 2012.06.2:
//      Improved visuals using SVG
// Revision 2012.06.1:
//      Improved visuals
// Revision 2012-06:
//      Purple Power! Adapts to the Barney theme.
// Revision 2011-12:
//      http(s)
// Revision 2005-12:
//      Update for GM 0.6.4
// Revision 2005-08:
//      Clean up and update for GM 0.5
//      Now the illusion is even better

(function() {
	var i,x;
	all = document.getElementsByClassName("postvotingarea");
	for (i=0; i < all.length; i++) {
		x = all[i];
		if (x.childNodes[1].tagName=="A") { x.childNodes[1].addEventListener("click",asyncClick,true); }
		if (x.childNodes[3].tagName=="A") { x.childNodes[3].addEventListener("click",asyncClick,true); }
	}
})();
    
function asyncClick(event) {
	var imgtag = event.target;
	var linktag = imgtag.parentNode;
	var summary = linktag.previousSibling;
	
	event.stopPropagation();
	event.preventDefault();
	
	var src = imgtag.getAttribute("src").replace("blue","grey");
	linktag.innerHTML = '<svg width="13" height="16" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="0" x2="0" y2="1" y1="0" id="barney"><stop offset="0" stop-color="pink"/><stop offset="0.8" stop-color="purple"/></linearGradient></defs><polygon stroke-width="0" fill="url(#barney)" points="12 0 7 6 10 6 0 14 3 8 0 8 4 0 12 0"/></svg>'
	
	// prefetch grey icon - the prefetchimg object is not inserted into the DOM tree
	prefetchimg = new Image();
	prefetchimg.src = src;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: linktag.href,
		onload: processload});
		
	function processload(req) {
		if (req.status != 200) {
			linktag.parentNode.replaceChild(document.createTextNode("[Error: disable addon]"), linktag);
			return;
		} else {
			summary.data = parseInt(summary.data, 10) + 1;
			linktag.innerHTML = "<img src='"+src+"'/>";
			linktag.setAttribute("href","javascript:");
			linktag.removeEventListener("click",asyncClick,true);
		}
	}
	return false;
}
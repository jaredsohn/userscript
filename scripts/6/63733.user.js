// ==UserScript==
// @name           LokalistenAdCleaner
// @namespace      livinskull
// @author         livinskull
// @version        v0.02
// @include        http://www.lokalisten.de/*
// ==/UserScript==

var debug=false;

clean();
document.addEventListener("DOMAttrModified", clean, false);

function clean() {
	var oDivs = document.getElementsByTagName('div');
	for (i=0; i<oDivs.length; ++i) {
		if (oDivs[i].id && oDivs[i].id.indexOf("BANNER_") == 0) {
			oDivs[i].parentNode.removeChild(oDivs[i]);
			if (debug) GM_log("removed banner");
		}
	}

	// notify box (neues von den lokalisten)
	var oNotify = document.getElementsByClassName('notifyBox')[0];
	if (oNotify) {
		oNotify.parentNode.removeChild(oNotify);
		if (debug) GM_log("removed notify box");
	}
		

	var oInfoCol = document.getElementById('l_leftColumn');
	if (oInfoCol) {
		var oLinks = oInfoCol.getElementsByTagName('a');
		
		for (i=0; i<oLinks.length; ++i) {
			if (oLinks[i].innerHTML.indexOf("lokalisten fon") != -1) {
				oLinks[i].parentNode.parentNode.removeChild(oLinks[i].parentNode);
				if (debug) GM_log("removed lokalisten fon");
				continue;
			}
			
			if (oLinks[i].innerHTML.indexOf("freunde einladen") != -1) {
				oLinks[i].parentNode.parentNode.removeChild(oLinks[i].parentNode);
				if (debug) GM_log("removed freunde einladen");
				continue;
			}
			
			//if (debug) GM_log("link: "+oLinks[i].innerHTML);
		}
		
		// partner links
		var oPartner = oInfoCol.getElementsByClassName('partnerLinks');
		for (i=0; i<oPartner.length; ++i) {
			oPartner[i].parentNode.removeChild(oPartner[i]);
			if (debug) GM_log("removed partner links");
		}
		
		oPartner = oInfoCol.getElementsByClassName('partnerLinksInner');
		for (i=0; i<oPartner.length; ++i) {
			oPartner[i].parentNode.removeChild(oPartner[i]);
			if (debug) GM_log("removed partner links");
		}
			
		
	}
		
	var oLeftCol = document.getElementById('column1');
	if (oLeftCol) {
		var oLinks = oLeftCol.getElementsByTagName('a');
	
		for (i=0; i<oLinks.length; ++i) {
			// lokalisten-shop link
			if (oLinks[i].href == "http://tracking.lokalisten.de/redirect.php?id=home_shop") {
				oLinks[i].parentNode.removeChild(oLinks[i]);
				if (debug) GM_log("removed shop-link");
				continue;
			}
			
			// N24 news
			if (oLinks[i].className == "nlLink") {
				var N24Box = oLinks[i].parentNode.parentNode.parentNode;
				N24Box.parentNode.removeChild(N24Box);
				if (debug) GM_log("removed N24 Box");
				continue;
			}
		}
	}
}

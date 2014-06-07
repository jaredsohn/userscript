// ==UserScript==
// @name          Flickr - Display Animated GIFs
// @namespace     
// @description	  Display animated GIFs on Flickr photostreams
// @author        Tommy Au
// @version       1.1
// @include       http://www.flickr.com/photos/*
// ==/UserScript==

function fetch(o, dt) {
	var r = new XMLHttpRequest();
		r.open("GET", o, true);
		r.onreadystatechange = function() {
			if (r.readyState == 4) {
				var doc = document.createElement('div');
				doc.innerHTML = r.responseText;
				var oimg = document.evaluate("//div[@id='allsizes-photo']/img", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (oimg.snapshotItem(0).src.match(/\.[0-9a-z]+$/) == ".gif") {
					dt.src = oimg.snapshotItem(0).src;
				}
 			}
		};
		r.send();
}

function chkElmnts() {
	if (document.getElementById("photo") != null) {
		var plnk = window.location.href;
			plnk = plnk.replace(/\/in\/\D*\d*\//i, "");
			plnk = plnk.replace(/\/in\/\D*\d*/i, "");
			plnk = plnk + "/sizes/o/";
		var imfl = document.evaluate("//div[@class='photo-div']/img", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1);
		fetch(plnk, imfl);
	} else {
		var xpcm = document.evaluate("//span[contains(@class,'photo_container')]//a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var ximg = document.evaluate("//img[contains(@class,'pc_img')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		for (var i=0; i<xpcm.snapshotLength; i++) {
			var plnk = xpcm.snapshotItem(i).toString();
				plnk = plnk.replace(/in\/\D*\d*\//i, "");
				plnk = plnk.replace(/in\/\D*\d*/i, "");
				plnk = plnk + "/sizes/o/";
			var imfl = ximg.snapshotItem(i);
			fetch(plnk, imfl);
		}
	}
}

chkElmnts();
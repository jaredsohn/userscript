// ==UserScript==
// @name          Actiontec Advanced 0.1
// @namespace     http://www.cbwhiz.com/greasemonkey
// @description	  Clicks "yes" to all the advanced are you sure prompts. Designed for Actiontec MI424-WR Firmware 4.0.16.1.45.160.27
// @author        CBWhiz
// @homepage      http://www.cbwhiz.com/greasemonkey
// @updated	  2007-09-28
// @include       http://192.168.*.1/*
// ==/UserScript==



function XPathQuery(query, start) {
	//query needs to have x: in front of all elements.
	//this lets it work both in xhtml and html docs.
	//no support for any other namespaces, sorry.
	//-CBWhiz

	this.resolver = function(prefix) {
		return 'http://www.w3.org/1999/xhtml';
	}


	var snap = null;

	if (start == undefined) {
		start = document;
	}

	var xhtmlq = query;
	var htmlq = query.replace(new RegExp("x:", "g" ), "")

	try {
		snap = document.evaluate(htmlq, start, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (snap.snapshotLength == 0) {
			snap = document.evaluate(xhtmlq, start, this.resolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}
	} catch(err) {
		snap = document.evaluate(xhtmlq, start, this.resolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}


	this.length = function() {
		return snap.snapshotLength;
	}
	this.size = function() {
		return snap.snapshotLength;
	}
	this.get = function(i) {
		if (i < 0) {
			GM_log("XPathQuery asked for " + i + "th node");
			return null;
		}
		if (i >= this.size()) {
			GM_log("XPathQuery asked for " + i + "th node of " + this.size() + " elements");
			return null;
		}
		return snap.snapshotItem(i);
	}
	this.each = function(f) {
		for(i = 0; i < this.size(); i++) {
			f.apply(this.get(i), [ ]);
		}
	}
}


function main() {

	var buttons = new XPathQuery("//x:tr/x:td/x:input[contains(@onclick,'submit_button_yes')]");
	
	var pagetitle_el = new XPathQuery("//x:span[contains(@class,'PAGE_HEADER')]");

	GM_log("Found " + buttons.size() + " buttons...");
	GM_log("Found pagetitle " + pagetitle_el.get(0).innerHTML + " ...");

	if (buttons.size() != 1) {
		GM_log("Aborting, wrong number of Yes buttons");
		return;
	}
	if (pagetitle_el.get(0).innerHTML != "Warning") {
		GM_log("Aborting, wrong page title");
		return;
	}
	buttons.get(0).click();
	GM_log("Clicked Yes.");

}
main();
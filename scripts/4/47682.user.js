// ==UserScript==
// @name          Chan Unthumb 0.7
// @namespace     http://www.cbwhiz.com/greasemonkey
// @description	  Unthumbnails images
// @author        CBWhiz
// @homepage      http://www.cbwhiz.com/greasemonkey
// @updated	  2008-02-10
// @include       http://*muchan.org/*
// @include       http://*ko-chan.org/*
// @include       http://*wtfux.org/*
// @include       http://*foone.org/*
// @include       http://*4chan.org/*
// @exclude       http://*macrochan.org/*
// ==/UserScript==

var MAX_WIDTH = 600;

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


function Node(tagname) {
	//Node as in we're making an element, not a 'real dom node'
	var n = document.createElement(tagname);
	

	this.settext = function(txt) {
		var tn = document.createTextNode(txt);
		n.appendChild(tn);
	}
	this.setAttr = function(attr, val) {
		n.setAttribute(attr, val);
	}

	this.appendTo = function(realnode) {
		realnode.appendChild(n);
	}
	this.insertAfter = function(realnode) {
		realnode.parentNode.insertBefore(n, realnode.nextSibling);
	}

}


unsafeWindow.th_togglethumb = function() {
	var ddd = this.getAttribute('th_thumbed');
	if (ddd == "true") { //attributes are always strings
		this.removeAttribute('width');
		this.removeAttribute('height');
		this.setAttribute('th_thumbed', false);
	} else {
		this.width = this.getAttribute('th_width');
		this.height = this.getAttribute('th_height');
		this.setAttribute('th_thumbed', true);
	} 
	return false;
}



function main() {

	var st = new Node('style');
	st.setAttr('type', 'text/css');
	st.settext(".thumb { float: none; }");
	var h = document.getElementsByTagName('head')[0];
	st.appendTo(h);

	var imgtags = new XPathQuery("//x:a[contains(@href,'src')]//x:img[contains(@src,'thumb/')]");

	GM_log("Rethumbing " + imgtags.size() + " images...");
	window.status = "Rethumbing " + imgtags.size() + " images...";

	imgtags.each(function() {
		var w = this.width;
		var h = this.height;

		this.removeAttribute('width');
		this.removeAttribute('height');

		this.addEventListener('load', function() {
			var rw = parseInt(document.defaultView.getComputedStyle(this, "").width);
			if (rw > MAX_WIDTH) {
				GM_log('Image loaded; width = ' + rw + '; decision = thumb');
				this.setAttribute('width', MAX_WIDTH);
				this.setAttribute('height', MAX_WIDTH * (h/w));

				this.setAttribute('th_width', this.width);
				this.setAttribute('th_height', this.height);
				this.setAttribute('th_thumbed', true);
				this.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); return unsafeWindow.th_togglethumb.apply(this); }, false);
			} else {
				GM_log('Image loaded; width = ' + rw + '; decision = ignore');
				this.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); }, false);
				this.style.cursor = 'auto';
			}
		}, false);

		atag = this.parentNode;
		while(atag.nodeName.toUpperCase() != "A") {
			atag = atag.parentNode;
		}
		
		this.src = atag.href.replace('.cgi', ''); //4chan fix

		this.src = this.src.replace('/cb-nws', ''); //4chan /b/ fix
		this.src = this.src.replace('/cb-ws', ''); //4chan /g/ fix

		var br = new Node('br');
		br.insertAfter(atag);


	});

	GM_log("Done.");
	window.status = "Done rethumbing " + imgtags.size() + " images.";
}
main();

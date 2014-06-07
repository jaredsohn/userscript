/* vim: ts=4 noet ai :
$Id: linkchecker.user.js 13 2006-05-30 13:05:58Z joe $

Linkchecker - (c) 2006 J.Q. la Poutre

This script spiders all links on a web page and tries if they 
can be followed.

Somewhat more detailed:
Every HTTP link is polled with a HEAD request, and, depending on the 
returned status code, the link is visually marked (by color and title)
according to the result.

Some remarks
- pages in frames are omitted
- only HTTP(S) links are checked
- linked images are replaced by their ALT text (or "img")
- the script uses a spider pool of max. 4 simultaneous requests
- time out per request is handled by the browser, wchich can take some time
- check for the NoScript extension settings if "Initializing..." takes forever.
- relative links don't work in locally loaded files (GM security limitation)


LICENSE
=======

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA


CHANGELOG
=========

TODO:
	- smart handling of frame sites
	- use <base href...>
	- parse <area href...> elements
	- parse "invisible" link elements: <link rel=...> etc.

Version 1.01
    - fixed annoying typo
    - more friendly color scheme
    
Version 1.00
    - initial release
    

*/
// ==UserScript==
// @name           Linkchecker
// @namespace      http://joe.lapoutre.com/BoT/Javascript
// @description    Check all links on a web page
// @include        *
// @version	       1.01
// ==/UserScript==


// global object
var gLinkchecker = {
	MAXREQ:   4,      // max. number of simultaneous page requests
	links: [],        // link objects
	requests: 0,      // number of active XHR's
	errors:   0,      // number of erroneous links
	interval: null,   // heartbeat interval
	GREEN: "#7CFC00", // some color definitions
	RED:   "#FF6347",
	YELLOW: "yellow",
	ORANGE: "orange",
	GREY:  "silver",
	populate: function() {
		this.replaceImgs();
		var ll = document.evaluate("//a[@href]", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < ll.snapshotLength; i++) {
			var l = ll.snapshotItem(i);
			href = l.getAttribute("href");
			l.style.background = "white none";
			l.style.color = "darkblue";
			l.textDecoration = "underline";
			l.setAttribute("title", "Link wil be checked");
			// filter out javascript: mailto: ftp:// etc. links
			if (href.match(/^(?!http)[^\/:]{2,}:/i)) {
				l.setAttribute("title", "Link type not checked");
				l.style.backgroundColor = "silver";
				continue;
			}
			// skip links to internal anchors
			if (href.indexOf('#') == 0) {
				l.setAttribute("title", "Internal anchor, not checked");
				l.style.backgroundColor = "silver";
				continue;
			}
			this.links.push(new Link(l, href));
		}
	},
	replaceImgs: function() {
		var ll = document.evaluate("//a[@href]/img", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < ll.snapshotLength; i++) {
			var l = ll.snapshotItem(i);
				var txt = "[" + (l.getAttribute("alt") || "img") + "]";
				var tn = document.createTextNode(txt);
				l.parentNode.replaceChild(tn, l);
		}
	},
	evtStart: function() {
		var btn = document.getElementById("gm_lichckr_btn");
		btn.setAttribute("value", "Initializing...");
		btn.style.backgroundColor = gLinkchecker.ORANGE;
		btn.removeEventListener('click', gLinkchecker.evtStart, true);
		btn.addEventListener('click', gLinkchecker.evtStop, true);
		gLinkchecker.populate();
		gLinkchecker.interval = setInterval(heartBeat, 333);
	},
	evtStop: function() {
		if (window.confirm("Stop Link Checker?")) {
			clearInterval(gLinkchecker.interval);
			// output results right away
			var btn = document.getElementById("gm_lichckr_btn");
			btn.setAttribute("value", "Resume");
			btn.style.backgroundColor = gLinkchecker.GREEN;
			btn.removeEventListener('click', gLinkchecker.evtStop, true);
			btn.addEventListener('click', gLinkchecker.evtResume, true);
		}
	},
	evtResume: function() {
		gLinkchecker.interval = setInterval(heartBeat, 200);
		var btn = document.getElementById("gm_lichckr_btn");
		btn.setAttribute("value", "Resuming...");
		btn.style.backgroundColor = gLinkchecker.ORANGE;
		btn.removeEventListener('click', gLinkchecker.evtResume, true);
		btn.addEventListener('click', gLinkchecker.evtStop, true);
	},
	evtDone: function() {
		var btn = document.getElementById("gm_lichckr_btn");
		btn.setAttribute("value", "Found " + gLinkchecker.errors +
			" bad link" + ((gLinkchecker.errors != 1) ? "s" : ""));
		btn.setAttribute("disabled", "disabled");
		btn.style.backgroundColor = gLinkchecker.GREEN;
	},
	initialize: function() {
		// work in main window only (too many iframe crap sites, sorry)
		if (window != top) return;
	
		// "start" button on page
		var ovl = document.createElement("input");
		ovl.setAttribute("id", "gm_lichckr_btn");
		ovl.setAttribute("type", "button");
		ovl.setAttribute("value", "Check links");
		ovl.style.position = "fixed";
		ovl.style.zIndex = 99999; // insane, sometimes needed though
		ovl.style.top = "12px";
		ovl.style.right = "12px";
		ovl.style.backgroundColor = gLinkchecker.GREEN;
		// start watching request queue every interval period
		ovl.addEventListener('click', gLinkchecker.evtStart, true);
		document.getElementsByTagName("body")[0].appendChild(ovl);
	}
};

/*
 * returns a closure with embedded object reference
 * see: http://jibbering.com/faq/faq_notes/closures.html#clObjI
 */
function getProcessFunc(obj) {
	return (function(res) {
		// for more HTTP 1.1 status codes, see
		// http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
		switch (res.status) {
			// OK results
			case 200:
			case 302: // redirect of kinds
			case 303:
			case 304: // not modified
				// the 3XX family is handled by XHR, 
				// not likely that we see these codes
				obj.elt.style.backgroundColor = gLinkchecker.GREEN;
				break;
			// authorization required
			case 401: // only when no valid credentials were used
				obj.elt.style.backgroundColor = gLinkchecker.YELLOW;
				break;
			// likely persistent errors
			case 403: // forbidden
			case 404: // not found
			case 500: // internal server error
			case 501: // not implemented
			case 502: // bad gateway
				obj.elt.style.backgroundColor = gLinkchecker.RED;
				gLinkchecker.errors++;
				break;
			// possibly transient errors
			case 405: // method not allowed
			case 503: // service unavailable
				obj.elt.style.backgroundColor = gLinkchecker.ORANGE;
				gLinkchecker.errors++;
				break;
			case "XHR": // XHR throwed something
				obj.elt.style.backgroundColor = gLinkchecker.GREY;
				break;
			default:
		}
		obj.elt.setAttribute("title", 
			(res.status || 'Status:') + " " +
			(res.statusText || 'Unknonwn'));
		// flag this request as complete, decrease counter
		gLinkchecker.requests--;
		// now do away with the link object, to give garbage collection a chance
		obj = null;
	});
}

// link object
function Link(elt, href) {
	this.elt = elt;
	this.href = mkAbsolute(href);
	// do a HEAD request
	this.ping = function() {
		try {
			var func = getProcessFunc(this);
			// XHR, greasemonkey version works cross site.
			GM_xmlhttpRequest(
				{
					method: 'HEAD',
					url: this.href,
					headers: {
							'User-Agent': 'Mozilla/5.0 (compatible)',
							'Referer': window.location.href
					},
					onload: func,
					// weird behavior of XHR wit HEAD in Firefox,
					// apparently the error handler is called,
					// when the request works perfectly fine
					onerror: func
				});
				gLinkchecker.requests++;
		} catch (e) {
			func({status: "XHR", statusText: e.toString()});
		}
	};

}

// make link absolute,
// offset by current window.location.href
// FIXME: or the <base> element
function mkAbsolute(rel) {
	// weird slashdot, omits protocol part, 
	// like "//ask.slashdot.org/path"
	if (rel.indexOf("//") == 0) {
		rel = window.location.protocol + rel;
	}
	// not relative at all:
	if (rel.match(/^https?:/i)) return rel;
	var base = window.location.protocol + "//" + window.location.host;
	// absolute from document root (starts with slash):
	if (rel.indexOf("/") == 0) {
		return base + rel;
	}
	var b = window.location.pathname.split("/");
	// strip the page component, or last slash of path name:
	b.pop();
	var r = rel.split("/");
	// strip off one level for any "../" sequence
	while (r[0] == "..") {
		r.shift();
		b.pop();
	}
	return base + b.join("/") + "/" + r.join("/");
}


function heartBeat() {
	if ((gLinkchecker.requests < gLinkchecker.MAXREQ) &&
		gLinkchecker.links.length) {
		// update remaining links
		var btn = document.getElementById("gm_lichckr_btn");
		btn.setAttribute("value", "Spidering (" + gLinkchecker.links.length + ")..."); 
		// work: shift next URL from stack
		gLinkchecker.links.shift().ping();
	}
	if ((gLinkchecker.requests <= 0) && (gLinkchecker.links.length == 0)) {
		clearInterval(gLinkchecker.interval);
		// output results after last request has been processed
		//outputToTab(gLinkchecker.toDotString());
		gLinkchecker.evtDone();
	}
}



gLinkchecker.initialize();

// end user script
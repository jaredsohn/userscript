// ==UserScript==
// @name           Table of Contents Everywhere
// @namespace      TOCE
// @description    On pages which do not have a Table of Contents, but should do, create one!
// @include        http://*/*
// @include        https://*/*
// ==/UserScript==

var minimumItems = 4;   // Don't display a TOC for fewer than this number of entries.
var delayBeforeRunning = 1600;
var showAnchors = true;
var pushAnchorsToBottom = true;   // They can look messy interspersed amongst TOC tree

// 2012-02-19  Removed verbose log.  Added showAnchors.  Added https since everyone is forcing that now (e.g. github).
// 2012-02-18  Fixed sorting of TOC elements.  Added anchor unicode.
// 2012-01-30  Implemented GM_log and GM_addStyle so this script can be included on any web page.

// TODO: derbyjs.com is an example of a site with a <div id=toc> that has no
// hide or close buttons.  Perhaps we should add close and rollup buttons if we
// cannot find any recognisable buttons.  (Medawiki tocs for example, do have a
// show/hide button, so we don't want to add to them!)

// BUG: Displays links for elements which may be invisible due to CSS.  (e.g. see github markdown pages)

setTimeout(function(){



// Implementing these two means we can run as a stand-alone script on any page.
if (typeof GM_log == "undefined") {
	GM_log = function() {
		// Firefox's console.log does not have apply or call functions!
		var txt = Array.prototype.join.call(arguments," ");
		console.log(txt);
	};
}
if (typeof GM_addStyle == "undefined") {
	this.GM_addStyle = function(css) {
		var s = document.createElement("style");
		s.type = 'text/css';
		s.innerHTML = css;
		document.getElementsByTagName("head")[0].appendChild(s);
	};
}

// Implementing these allows us to remember toggled state.  (Chrome's set/getValue don't work.)
if (typeof GM_setValue == 'undefined' || window.navigator.vendor.match(/Google/)) {
	GM_log("[TOCE] Adding fallback implementation of GM_set/getValue");

	if (typeof localStorage == 'undefined') {

		GM_getValue = function(name, defaultValue) {
			return defaultValue;
		};

	} else {

		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			localStorage.setItem(name, value);
		};

		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(name);
			if (!value)
				return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		};

	}

}

function loadScript(url,thenCallFn) {
	GM_log("[TOCE] Loading fallback: "+url);
	var scr = document.createElement("script");
	scr.src = url;
	scr.type = "text/javascript";   // Konqueror 3.5 needs this!
	if (thenCallFn) {
		var called = false;
		function onceOnlyCallback(evt) {
			if (!called) {
				called = true;
				thenCallFn(evt);
			}
		}
		function errorCallback(evt) {
			GM_log("[TOCE] Failed to load: "+url,evt);
			onceOnlyCallback(evt);
		}
		scr.addEventListener('load',onceOnlyCallback,false);
		scr.addEventListener('error',errorCallback,false);
		// Fallback in case above events unsupported by browser (e.g. Konq 3.5)
		setTimeout(onceOnlyCallback,5000);
	}
	document.body.appendChild(scr);
}

function clearStyle(elem) {
	// We set some crucial defaults, so we don't inherit CSS from the page:
	elem.style.display = 'inline';
	elem.style.position = 'static';
	elem.style.top = 'auto';
	elem.style.right = 'auto';
	elem.style.bottom = 'auto';
	elem.style.left = 'auto';
	return elem;
}

function newNode(tag,data) {
	var elem = document.createElement(tag);
	if (data) {
		for (var prop in data) {
			elem[prop] = data[prop];
		}
	}
	return elem;
}

function newSpan(text) {
	return clearStyle(newNode("span",{textContent:text}));
}

// Modified for this script's needs.
// Returns e.g. "/*[2]/*[4]/*[9]"
function getXPath(node) {
	var parent = node.parentNode;
	if (!parent) {
		return '';
	}
	var siblings = parent.childNodes;
	var totalCount = 0;
	var thisCount = -1;
	for (var i=0;i<siblings.length;i++) {
		var sibling = siblings[i];
		if (true /*sibling.nodeType == node.nodeType*/) {
			totalCount++;
		}
		if (sibling == node) {
			thisCount = totalCount;
			break;
		}
	}
	// return getXPath(parent) + '/*' /*node.nodeName.toLowerCase()*/ + (totalCount>1 ? '[' + thisCount + ']' : '' );
	// Remain consistent:
	return getXPath(parent) + '/*' + '[' + thisCount + ']';
}

// Konqueror 3.5 lacks some things!
if (!Array.prototype.map) {
	Array.prototype.map = function(fn) {
		var l = [];
		for (var i=0;i<this.length;i++) {
			l.push(fn(this[i]));
		}
		return l;
	};
}
if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^[ \t]+/,'').replace(/[ \t]+$/,'');
	};
}

function addCloseButtonTo(where, toc) {
	var closeButton = newSpan("[X]");
	// closeButton.style.float = 'right';
	// closeButton.style.cssFloat = 'right'; // Firefox
	// closeButton.style.styleFloat = 'right'; // IE7
	closeButton.style.cursor = 'pointer';
	closeButton.style.paddingLeft = '5px';
	closeButton.onclick = function() { toc.parentNode.removeChild(toc); };
	closeButton.id = "closeTOC";
	where.appendChild(closeButton);
}

function addHideButtonTo(toc,table) {
	var rollupButton = newSpan("[-]");
	// rollupButton.style.float = 'right';
	// rollupButton.style.cssFloat = 'right'; // Firefox
	// rollupButton.style.styleFloat = 'right'; // IE7
	rollupButton.style.cursor = 'pointer';
	rollupButton.style.paddingLeft = '10px';
	function toggleRollUp() {
		if (table.style.display == 'none') {
			table.style.display = '';
			rollupButton.textContent = "[-]";
		} else {
			table.style.display = 'none';
			rollupButton.textContent = "[+]";
		}
		setTimeout(function(){
			GM_setValue("TOCE_rolledUp", table.style.display=='none');
		},5);
	}
	rollupButton.onclick = toggleRollUp;
	rollupButton.id = "togglelink";
	toc.appendChild(rollupButton);
	if (GM_getValue("TOCE_rolledUp",false)) {
		toggleRollUp();
	}
}

// The following mirrored in wikiindent.user.js

function addButtonsConditionally(toc) {

	function verbosely(fn) {
		return function() {
			// GM_log("[WI] Calling: "+fn+" with ",arguments);
			return fn.apply(this,arguments);
		};
	};

	// Provide a hide/show toggle button if the TOC does not already have one.

	// Wikimedia's toc element is actually a table.  We must put the
	// buttons in the title div, if we can find it!

	var tocTitle = document.getElementById("toctitle"); // Wikipedia
	tocTitle = tocTitle || toc.getElementsByTagName("h2")[0]; // Mozdev
	// tocTitle |= toc.getElementsByTagName("div")[0]; // Fingers crossed for general

	function addButtonsNow() {

		var hideShowButton = document.getElementById("togglelink");
		if (!hideShowButton) {
			var tocInner = toc.getElementsByTagName("ol")[0]; // Mozdev (can't get them all!)
			tocInner = tocInner || toc.getElementsByTagName("ul")[0]; // Wikipedia
			tocInner = tocInner || toc.getElementsByTagName("div")[0]; // Our own
			if (tocInner) {
				verbosely(addHideButtonTo)(tocTitle || toc, tocInner);
			}
		}

		// We do this later, to ensure it appears on the right of
		// any existing [hide/show] button.
		if (document.getElementById("closeTOC") == null) {
			verbosely(addCloseButtonTo)(tocTitle || toc, toc);
		}

	}

	// Sometimes Wikimedia does not add a hide/show button (if the TOC is small).
	// We cannot test this immediately, because it gets loaded in later!
	if (document.location.href.indexOf("wiki") >= 0) {
		setTimeout(addButtonsNow,2000);
	} else {
		addButtonsNow();
	}

}




// == Main == //

function buildTableOfContents() {

	// Can we make a TOC?
	var headers = "//h1 | //h2 | //h3 | //h4 | //h5 | //h6 | //h7 | //h8";
	var anchors = "//a[@name]";
	// For coffeescript.org:
	var elementsMarkedAsHeader = "//*[@class='header']";
	var nodeSnapshot = document.evaluate(headers+(showAnchors?"|"+anchors:"")+"|"+elementsMarkedAsHeader,document,null,6,null);
	//// Chrome needs lower-case 'h', Firefox needs upper-case 'H'!
	// var nodeSnapshot = document.evaluate("//*[starts-with(name(.),'h') and substring(name(.),2) = string(number(substring(name(.),2)))]",document,null,6,null);
	// var nodeSnapshot = document.evaluate("//*[starts-with(name(.),'H') and substring(name(.),2) = string(number(substring(name(.),2)))]",document,null,6,null);
	if (nodeSnapshot.snapshotLength > minimumItems) {

		GM_log("[TOCE] Making TOC with "+nodeSnapshot.snapshotLength+" nodes.");

		var toc = newNode("div");
		toc.id = 'toc';

		// var heading = newSpan("Table of Contents");
		var heading = clearStyle(newNode("h2",{textContent:"Table of Contents"}));
		heading.style.fontWeight = "bold";
		heading.style.fontSize = "100%";
		toc.appendChild(heading);

		var table = newNode("div");
		// addHideButtonTo(toc,table);
		toc.appendChild(table);

		// We need to do this *after* adding the table.
		addButtonsConditionally(toc);

		// The xpath query did not return the elements in page-order.
		// We sort them back into the order they appear in the document
		// Yep it's goofy code, but it works.
		var nodeArray = [];
		for (var i=0;i<nodeSnapshot.snapshotLength;i++) {
			var node = nodeSnapshot.snapshotItem(i);
			nodeArray.push(node);
			// We need to sort numerically, since with strings "24" < "4"
			node.magicPath = getXPath(node).substring(3).slice(0,-1).split("]/*[").map(Number);
			if (pushAnchorsToBottom && node.tagName==="A") {
				node.magicPath.unshift(+Infinity);
			}
		}
		nodeArray.sort(function(a,b){
			// GM_log("[TOCE] Comparing "+a.magicPath+" against "+b.magicPath);
			for (var i=0;i<a.magicPath.length;i++) {
				if (i >= b.magicPath.length) {
					return +1; // b wins (comes earlier)
				}
				if (a.magicPath[i] > b.magicPath[i]) {
					return +1; // b wins
				}
				if (a.magicPath[i] < b.magicPath[i]) {
					return -1; // a wins
				}
			}
			return -1; // assume b is longer, or they are equal
		});

		for (var i=0;i<nodeArray.length;i++) {
			var node = nodeArray[i];

			var level = (node.tagName.substring(1) | 0) - 1;
			if (level < 0) {
				level = 0;
			}

			var linkText = node.textContent && node.textContent.trim() || node.name;
			if (!linkText) {
				continue;   // skip things we cannot name
			}

			var link = newNode("A");
			if (linkText.length > 40) {
				link.title = linkText;   // Show full title on hover
				linkText = linkText.substring(0,32)+"...";
			}
			link.textContent = linkText;
			/* Dirty hack for Wikimedia: */
			if (link.textContent.substring(0,7) == "[edit] ") {
				link.textContent = link.textContent.substring(7);
			}
			if (node.tagName == "A") {
				link.href = '#'+node.name;
			} else {
				(function(node){
					link.onclick = function(evt){
						node.scrollIntoView();

						// Optional: CSS animation
						// NOT WORKING!
						/*
						node.id = "toc_current_hilight";
						["","-moz-","-webkit-"].forEach(function(insMode){
							GM_addStyle("#toc_current_hilight { "+insMode+"animation: 'fadeHighlight 4s ease-in 1s alternate infinite'; }@"+insMode+"keyframes fadeHighlight { 0%: { background-color: yellow; } 100% { background-color: rgba(255,255,0,0); } }");
						});
						*/

						evt.preventDefault();
						return false;
					};
				})(node);
				link.href = '#';
			}
			table.appendChild(link);

			// For better layout, we will now replace that link with a neater li.
			liType = "li";
			if (node.tagName == "A") {
				liType = "div";
			}
			var li = newNode(liType);
			link.parentNode.replaceChild(li,link);
			if (node.tagName == "A") {
				li.appendChild(document.createTextNode("\u2693 "));
			}
			li.appendChild(link);
			li.style.paddingLeft = (1.5*level)+"em";
			li.style.fontSize = (100-6*(level+1))+"%";
			li.style.size = li.style.fontSize;

			// Debugging:
			/*
			li.title = node.tagName;
			if (node.name)
				li.title += " (#"+node.name+")";
			li.title = getXPath(node);
			*/

		}

		document.body.appendChild(toc);

		// TODO scrollIntoView if newly matching 1.hash exists

		postTOC(toc);

	} else {
		GM_log("[TOCE] Not enough items found to create toc.");
	}

	return toc;

}

function postTOC(toc) {
	if (toc) {

		// We make the TOC float regardless whether we created it or it already existed.
		// Interestingly, the overflow settings seems to apply to all sub-elements.
		// E.g.: http://mewiki.project357.com/wiki/X264_Settings#Input.2FOutput
		// FIXED: Some of the sub-trees are so long that they also get scrollbars, which is a bit messy!
		// FIXED : max-width does not do what I want!  To see, find a TOC with really wide section titles (long lines).
		if (toc.id === "") {
			toc.id = "toc";
		}
		var tocID = toc.id;
		GM_addStyle("#"+tocID+" { position: fixed; top: 10%; right: 4%; background-color: white; color: black; font-weight: normal; padding: 5px; border: 1px solid grey; z-index: 9999999; max-height: 80%; max-width: 32%; overflow: auto; }"
			+ "#"+tocID+"       { opacity: 0.2; }"
			+ "#"+tocID+":hover { opacity: 1.0; }"
		);

	}
}

function searchForTOC() {

	try {

		var tocFound = document.getElementById("toc");
		// Konqueror 3.5 does NOT have document.getElementsByClassName(), so we check for it.
		tocFound = tocFound || (document.getElementsByClassName && document.getElementsByClassName("toc")[0]);
		tocFound = tocFound || document.getElementById("article-nav");   // developer.mozilla.org
		tocFound = tocFound || document.getElementById("page-toc");      // developer.mozilla.org
		tocFound = tocFound || (document.getElementsByClassName && document.getElementsByClassName("twikiToc")[0]);      // TWiki

		var toc = tocFound;

		// With the obvious exception of Wikimedia sites, most found tocs do not contain a hide/close button.
		// TODO: If we are going to make the toc float, we should give it rollup/close buttons, unless it already has them.
		// The difficulty here is: where to add the buttons in the TOC, and which part of the TOC to hide, without hiding the buttons!
		// Presumably we need to identify the title element (first with textContent) and collect everything after that into a hideable block (or hide/unhide each individually when needed).

		if (toc) {

			postTOC(toc);

			addButtonsConditionally(toc);

		} else {

			toc = buildTableOfContents();

		}

	} catch (e) {
		GM_log("[TOCE] Error! "+e);
	}

}

if (document.evaluate /*this.XPathResult*/) {
	searchForTOC();
} else {
	loadScript("http://hwi.ath.cx/javascript/xpath.js", searchForTOC);
}



},delayBeforeRunning);
// We want it to run fairly soon but it can be quite heavy on large pages - big XPath search.


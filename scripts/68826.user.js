// ==UserScript==
// @name           Gmail floating sidebars
// @namespace      joeyhewitt
// @description    Makes the sidebars of Gmail (folders, Compose Mail, Chat) float so that they're always in view even if you scroll down.
// @include        https://mail.google.com/a/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/mail/*
// ==/UserScript==

// the canvas frame is the only visible one, in the new version
// in the older version (accessible via link at bottom of page), there appear
// to be several vN frames, N=1 thru 4. I've only seen 1 and 2 used for visible things
var fe = window.frameElement;
if (fe)
	fe = fe.wrappedJSObject;
if (!fe || (fe.id != 'canvas_frame' && fe.id != 'v1' && fe.id != 'v2'))
	return;

// pretty much all the action happens on scrolling
document.addEventListener("scroll", onScroll, false);

// data
var cols = null, topHeight = 0;
var isRSCLab = false, isOldVersion = false, hasRightBar = false;
var numFloats = 0;

// constants - sort of. They get changed depending on the variety of layout, but only once
var LEFT_BAR = 1, RIGHT_BAR = 4, NUM_BARS = 1;

function onScroll() {
	//console.log("onScroll "+numFloats);

	// Set up our stuff if this is the first time we've scrolled
	if (!cols)
		if (!init()) return;

	// If we're not scrolled past the sidebars' original position, keep them there
	if (window.scrollY < topHeight) {
		if (numFloats)
			disableFloats();
	} else if (numFloats < NUM_BARS) {
		// Otherwise, let 'em go
		enableFloats();
	}
}

function onSidebarResize() {
	//console.log("onSidebarResize");
	var el1 = this.wrappedJSObject || this;

	el1.gfsLowestPoint = 0; // reset cached height
	if (isFloatEnabled(el1)) {
		if (isSidebarTooTall(el1)) {
			disableFloat(el1);
		}
	} else {
		// try to enable it - function returns early if sidebar too big
		enableFloat(cols, indexOf(el1, cols));
	}
}

function init() {
	cols = findCols();
	if (!cols) {
		GM_log("Sorry, couldn't figure out how to float the sidebars. Google might have changed their markup, or another Greasemonkey script or Labs feature is interfering.");
		document.removeEventListener("scroll", onScroll, false);
		return false;
	}

	topHeight = cols[LEFT_BAR].getBoundingClientRect().top+window.scrollY;
	//console.log("topHeight="+topHeight);
	GM_addStyle(".gfsSidebarFloat { position: fixed !important; top: 0px !important; }");

	return true;
}

function enableFloat(cols, n) {
	//console.log("  enableFloat "+n);
	
	if (isFloatEnabled(cols[n]))
		return;

	if (!isSidebarTooTall(cols[n])) {
		cols[n].className = "gfsSidebarFloat "+cols[n].className;
		if (isRSCLab) {
			cols[n].parentNode.style.minWidth = cols[n].clientWidth+'px';
		} else if (!isOldVersion) {
			cols[n].style.left = cols[n-1].clientWidth+'px';
			cols[n+1].style.paddingLeft = cols[n].clientWidth+'px';
		}
		numFloats++;
	}

	// add a listener to disable floating if the sidebar is bigger than the
	// page (which can happen dynamically [expanding a large list of labels]
	// and then change back to being small)
	var c = cols[n].wrappedJSObject || cols[n];
	c.addEventListener("overflow", onSidebarResize, false);
	//c.addEventListener("underflow", function(){console.log("underflow");}, false);

	//console.log(numFloats);
}

function enableFloats() {
	//console.log("enableFloats");

	// Float free, my little sidebars!
	enableFloat(cols, LEFT_BAR);
	if (hasRightBar)
		enableFloat(cols, RIGHT_BAR);
}

function isFloatEnabled(el2) {
	//console.log("isFloatEnabled");

	return el2.className.indexOf('gfsSidebarFloat') != -1;
}

function disableFloat(o) {
	//console.log("  disableFloat "+indexOf(o, cols));

	if (!isFloatEnabled(o))
		return;

	o.className = o.className.replace("gfsSidebarFloat", "");

	numFloats--;
	//console.log(numFloats);
}

function disableFloats() {
	//console.log("disableFloats");
	
	disableFloat(cols[LEFT_BAR]);
	if (hasRightBar)
		disableFloat(cols[RIGHT_BAR]);
}

function findCols() {
	//console.log("findCols");

	var cols = document.body.querySelectorAll("body > div > div.nH > div.nH > div.nH > div.no > div.nH");
	if (!cols.length) {
		// right-side chat Lab
		cols = document.body.querySelectorAll("body > div > div.nH > div.nH > table.nH tr > td.Bu > div.nH");
		if (cols.length) {
			isRSCLab = hasRightBar = true;
			NUM_BARS = 2;
		} else {
			cols = [document.body.querySelector("div#nav")];
			if (cols[0]) {
				isOldVersion = true;
				LEFT_BAR = 0;
			} else {
				cols = null;
			}
		}
	}
	return (cols ? cols.length : 0) ? (cols.wrappedJSObject || cols) : null;
}

function indexOf(val, arr) {
	for (var i in arr)
		if (arr[i] == val) return i;
	return -1;
}

function isSidebarTooTall(el3) {
	//console.log("isSidebarTooTall");
	el3 = el3.wrappedJSObject || el3;
	
	if (el3.clientHeight > window.innerHeight)
		return true;
	if (!el3.gfsLowestPoint)
		el3.gfsLowestPoint = getSidebarDeepHeight(el3);
	//console.log("tooTall="+(el3.gfsLowestPoint > window.innerHeight));
	return el3.gfsLowestPoint > window.innerHeight;
}

function getSidebarDeepHeight(el4) {
	//console.log("**getSideBarDeepHeight");
	// Have to see if a pop-up label list is too big.
	var rect = getElementDeepRect(el4);
	return rect.bottom+el4.ownerDocument.defaultView.scrollY;
}

function getElementDeepRect(el5) {
	// Ewww, I'm not sure why this is necessary, I would have thought Firefox
	// would provide a function to do something like this, but I can't seem to
	// find anything.  I'm just glad it won't be executing all the time
	var rect = el5.getBoundingClientRect();
	if (!rect)
		return null;
	rect = { top : rect.top, right : rect.right, bottom : rect.bottom, left : rect.left };
	var children = el5.querySelectorAll("*");
	for (var i in children) {
		if (!children[i].getBoundingClientRect)
			continue;
		var x = children[i].getBoundingClientRect();
		if (!x)
			continue;
		if (x.top < rect.top)
			rect.top = x.top;
		if (x.right > rect.right)
			rect.right = x.right;
		if (x.bottom > rect.bottom)
			rect.bottom = x.bottom;
		if (x.left < rect.left)
			rect.left = x.left;
	}

	return rect;
}

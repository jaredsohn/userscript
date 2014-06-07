// ==UserScript==
// @name           WikiIndent
// @namespace      joeytwiddle
// @include        *wiki*
// @include        http://www.buzztard.com/*
// @include        http://encyclopediadramatica.com/*
// @include        http://www.wormus.com/leakytap/*
// @include        http://theinfosphere.org/*
// @description    Four visual improvements for Wikipedia (and other wikis):  Indents sub-sections to make the layout clearer.  Hides the sidebar (toggle by clicking the header).  Floats the Table of Contents for access when scrolled.  Converts heading underlines to overlines.
// ==/UserScript==

//// Features:
var toggleSidebar = true;
var makeTableOfContentsFloat = true;
var indentSubBlocks = true;
var fixUnderlinesToOverlines = true;

// var minimisedSidebarSize = 6;   // Small
var minimisedSidebarSize = 16;

// Wikipedia's new transition displays the sidebar text before there is space
// for it, causing brief ugly overlap!  So we delay unhiding to look prettier.
var delayHide = 0;
var delayUnhide = ( document.getElementById("mw-panel") ? 250 : 0 );

var debug = true;


/* CONSIDER: As we scroll the page, light up the "current" section in the TOC.
 *
 * FIXED: One occasional problem with the TOC is when it is taller than the
 *      window!  (I usually work around this by zooming out (reducing font
 *      size), but perhaps we can use CSS overflow to solve it properly.)
 *
 * NOTE: The sidebar toggle now animates smoothly.  This is caused by animation
 * rules in Wikipedia's CSS.  I don't know why they are there, I haven't seen
 * anything that makes use of them, except by circumstance, this script!
 *
 * TODO: Indentation was not working well in edit preview on Hwiki(MW).
*/

/* Changelog
 *  5/ 2/2012 - Better (though more fragile) click-to-toggle areas.
 *  3/ 1/2012 - Fixed Chrome compatibility so it works!  Doh.
 * 23/ 3/2011 - Added Chrome compatibility.
*/

// Recent versions do not play nice together, so just in case we run WI twice:
if (unsafeWindow.WikiIndent_loaded) {
	return;
} else {
	unsafeWindow.WikiIndent_loaded = true;
}

function log(x) {
	x = "[WI] "+x;
	if (this.GM_log) {
		this.GM_log(x);
	} else if (this.console && console.log) {
		console.log(x);
	} else {
		window.status = ""+x;
		// alert(x);
	}
}

// For bookmarklets:
if (typeof GM_addStyle == "undefined") {
	GM_addStyle = function(css) {
		var head, style;
		head = document.getElementsByTagName("head")[0];
		if (!head) { return; }
		style = document.createElement("style");
		style.type = "text/css";
		style.innerHTML = css;
		head.appendChild(style);
	};
}

if (typeof GM_setValue == 'undefined' || window.navigator.vendor.match(/Google/)) {
	GM_log("WikiIndent: Adding fallback implementation of GM_set/getValue");

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
	return newNode("span",{textContent:text});
}

function addCloseButtonTo(where, toc) {
	var closeButton = newSpan("[X]");
	// closeButton.style.float = 'right';
	closeButton.style.cursor = 'pointer';
	closeButton.style.paddingLeft = '5px';
	closeButton.onclick = function() { toc.parentNode.removeChild(toc); };
	closeButton.id = "closeTOC";
	where.appendChild(closeButton);
}

function addHideButtonTo(toc, tocInner) {
	var rollupButton = newSpan("[hide]");
	// rollupButton.style.float = 'right';
	rollupButton.style.cursor = 'pointer';
	rollupButton.style.paddingLeft = '10px';
	function toggleRollUp() {
		if (tocInner.style.display == 'none') {
			tocInner.style.display = '';
			rollupButton.textContent = "[hide]";
		} else {
			tocInner.style.display = 'none';
			rollupButton.textContent = "[show]";
		}
		setTimeout(function(){
			GM_setValue("WI_toc_rolledUp", tocInner.style.display=='none');
		},5);
	}
	rollupButton.onclick = toggleRollUp;
	rollupButton.id = "togglelink";
	toc.appendChild(rollupButton);
	if (GM_getValue("WI_toc_rolledUp",false)) {
		toggleRollUp();
	}
}

// The following mirrored in table_of_contents_everyw.user.js

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

	// Sometimes Wikimedia does not add a hide/show button (if the TOC is small).
	// We cannot test this immediately, because it gets loaded in later!
	setTimeout(function(){

		var hideShowButton = document.getElementById("togglelink");
		if (!hideShowButton) {
			var tocInner = toc.getElementsByTagName("ol")[0]; // Mozdev (can't get them all!)
			tocInner = tocInner || toc.getElementsByTagName("ul")[0]; // Wikipedia
			if (tocInner) {
				verbosely(addHideButtonTo)(tocTitle || toc, tocInner);
			}
		}

		// We do this later, to ensure it appears on the right of
		// any existing [hide/show] button.
		if (document.getElementById("closeTOC") == null) {
			verbosely(addCloseButtonTo)(tocTitle || toc, toc);
		}

	},4000);

}

function doIt() {



	//// Feature #1 : Hide the sidebar.  Fullsize the content.

	// Toggle the sidebar by clicking the "page background" (empty space outside
	// the main content).  Sometimes clicking the content background is enough.

	if (toggleSidebar) {

		var content = document.getElementById("content")
			|| document.getElementById("column-content");
		var sideBar = document.getElementById("column-one")
			|| document.getElementById("panel")
			|| /* WikiMedia: */ document.getElementById("mw-panel")
			|| /* forgot:    */ document.getElementById("jq-interiorNavigation")
			|| /* pmwiki:    */ document.getElementById('wikileft');
		var toToggle = [ document.getElementById("page-base"), document.getElementById("siteNotice"), document.getElementById("head") ];
		var cac = document.getElementById("p-cactions");
		var cacOldHome = ( cac ? cac.parentNode : null );

		function toggleWikipediaSidebar(evt) {

			// We don't want to act on all clicked body elements (notably not the WP
			// image).  I detected two types of tag we wanted to click.
			//if (!evt || evt.target.tagName == "UL" || evt.target.tagName == "DIV") {

			// That was still activating on divs in the content!  (Gaps between paragraphs.)
			// This only acts on the header area.
			var thisElementTogglesSidebar;
			var inStartup = (evt == null);
			if (inStartup) {
				thisElementTogglesSidebar = true;
			} else {
				var elem = evt.target;
				var clickedHeader = (elem.id == 'mw-head');
				// For wikia.com:
				clickedHeader |= (elem.id=="WikiHeader");
				// For Wikimedia:
				var clickedPanelBackground = elem.id == 'mw-panel' || elem.className.indexOf('portal')>=0;
				clickedPanelBackground |= elem.id == 'column-content';  // for beebwiki (old mediawiki?)
				// Hopefully for sites in general.  Allow one level below body.  Needed for Wikia's UL.
				var clickedAreaBelowSidebar = (elem.tagName == 'HTML' || elem.tagName == 'BODY');
				var clickedBackground = (elem.parentNode && elem.parentNode.tagName == "BODY");
				thisElementTogglesSidebar = clickedHeader || clickedPanelBackground || clickedAreaBelowSidebar || clickedBackground;
			}
			if (thisElementTogglesSidebar) {

				if (evt)
					evt.preventDefault();
				if (debug) { GM_log("evt=",evt); }
				// if (evt) GM_log("evt.target.tagName="+evt.target.tagName);
				/* We put the GM_setValue calls on timers, so they won't slow down the rendering. */
				if (sideBar) {
					if (sideBar.style.display == '') {
						// Wikipedia's column-one contains a lot of things we want to hide
						sideBar.style.display = 'none';
						if (content) {
							content.oldMarginLeft = content.style.marginLeft;
							content.style.marginLeft = minimisedSidebarSize+'px';
						}
						for (var i in toToggle) {
							if (toToggle[i]) { toToggle[i].style.display = 'none'; }
						}
						// but one of them we want to preserve
						// (the row of tools across the top):
						if (cac)
							sideBar.parentNode.insertBefore(cac,sideBar.nextSibling);
						setTimeout(function(){
							GM_setValue("sidebarVisible",false);
						},200);
					} else {
						function unhide() {
							sideBar.style.display = '';
						}
						setTimeout(unhide,delayUnhide);
						if (content) {
							content.style.marginLeft = content.oldMarginLeft;
						}
						for (var i in toToggle) {
							if (toToggle[i]) { toToggle[i].style.display = ''; }
						}
						if (cac && cacOldHome)
							cacOldHome.appendChild(cac); // almost back where it was :P
						setTimeout(function(){
							GM_setValue("sidebarVisible",true);
						},200);
					}
				}

			}
		}

		// log("sideBar="+sideBar+" and content="+content);
		if (sideBar) {
			// We need to watch window for clicks below sidebar (Chrome).
			document.documentElement.addEventListener('click',toggleWikipediaSidebar,false);
		} else {
			log("Did not have sideBar "+sideBar+" or content "+content); // @todo Better to warn or error?
		}

		if (!GM_getValue("sidebarVisible",true)) {
			toggleWikipediaSidebar();
		}

		// TODO: Make a toggle button for it!

		// Fix for docs.jquery.com:
		/*
		var j = document.getElementById("jq-primaryContent");
		if (j) {
			j.style.setAttribute('display', 'block');
			j.style.setAttribute('float', 'none');
			j.style.setAttribute('width', '100%');
		}
		*/
		GM_addStyle("#jq-primaryContent { display: block; float: none; width: 100%; }");

	}



	//// Feature #2: Make Table of Contents float

	if (makeTableOfContentsFloat) {

		/* @consider If the TOC has a "Hide/Show" link ("button") then we could
		 * fire that instead of changing opacity.
		 */

		// document.getElementById('column-one').appendChild(document.getElementById('toc'));

		// createFader basically worked but was a little bit buggy.  (Unless the bugs were caused by conflict with other TOC script.)
		// Anyway createFader() has now been deprecated in favour of CSS :hover.

		function createFader(toc) {

			var timer = null;

			// BUG: this didn't stop the two fades from conflicting when the user wiggles the mouse to start both!
			function resetTimeout(fn,ms) {
				if (timer) {
					clearTimeout(timer);
				}
				setTimeout(fn,ms);
			}

			function fadeElement(elem,start,stop,speed,current) {
				if (current == null)
					current = start;
				if (speed == null)
					speed = (stop - start) / 8;
				if (Math.abs(current+speed-stop) > Math.abs(current-stop))
					current = stop;
				else
					current = current + speed;
				elem.style.opacity = current;
				if (current != stop)
					resetTimeout(function(){fadeElement(elem,start,stop,speed,current);},50);
			}

			toc.style.opacity = 0.3;
			var listenElement = toc;
			// var listenElement = toc.getElementsByTagName('TD')[0];
			var focused = false;
			var visible = false;
			listenElement.addEventListener('mouseover',function(){
				if (!visible)
					setTimeout(function(){ if (focused) { visible=true; fadeElement(toc,0.4,1.0,0.2); } },10);
				focused = true;
			},false);
			listenElement.addEventListener('mouseout',function(){
				if (visible)
					setTimeout(function(){ if (!focused) { visible=false; fadeElement(toc,1.0,0.2,-0.1); } },10);
				focused = false;
			},false);

		}


		function tryTOC() {

			// Find the table of contents element:
			var toc = document.getElementById("toc")   /* MediaWiki */
					 || document.getElementsByClassName("table-of-contents")[0]   /* BashFAQ */
					 || document.getElementsByClassName("toc")[0]   /* LeakyTap */
					 || document.getElementsByClassName("wt-toc")[0];   /* Wikitravel */

			if (toc) {

				addButtonsConditionally(toc);

				// toc.style.backgroundColor = '#eeeeee';
				// alert("doing it!");
				toc.style.position = 'fixed';
				toc.style.right = '16px';
				// toc.style.top = '16px';
				// A healthy gap from the top allows the user to access things fixed in the top right of the page, if they can scroll finely enough.
				// toc.style.top = '24px';
				toc.style.right = '4%';
				toc.style.top = '10%';   // We want to be below the search box!
				// toc.style.left = '';
				// toc.style.bottom = '';
				toc.style.zIndex = '5000';
				// fadeElement(toc,1.0,0.4);
				// This might work for a simple toc div
				toc.style.maxHeight = "80%";
				toc.style.maxWidth = "32%";

				/* 
				 * Sometimes specifying max-height: 80% does not work, the toc won't shrink.
				 * This may be when it's a table and not a div.  Then we must set max-height on the content.  (Maybe we don't actually need to set pixels if we find the right element.)
				 */
				toc.id = "toc";
				var maxHeight = window.innerHeight * 0.8 | 0;
				var maxWidth = window.innerWidth * 0.4 | 0;

				/*
				 * WikiMedia tree looks like this: <table id="toc" class="toc"><tbody><tr><td><div id="toctitle"><h2>Contents</h2>...</div> <ul> <li class="toclevel-1 tocsection-1">
				 Here is a long TOC: http://mewiki.project357.com/wiki/X264_Settings#Input.2FOutput
				 */
				// GM_addStyle("#toc ul { overflow: auto; max-width: "+maxWidth+"px; max-height: "+maxHeight+"px; }");
				var rootUL = toc.getElementsByTagName("UL")[0];
				if (!rootUL)
					rootUL = toc;
				rootUL.style.overflow = "auto";
				rootUL.style.maxWidth = maxWidth+'px';
				rootUL.style.maxHeight = maxHeight+'px';

				/*
				createFader(toc);
				*/
				//// Alternative rules from table_of_contents_everywhere script:
				toc.id = "toc";
				// GM_addStyle("#toc { position: fixed; top: 10%; right: 4%; background-color: white; color: black; font-weight: normal; padding: 5px; border: 1px solid grey; z-index: 5555; max-height: 80%; overflow: auto; }");
				GM_addStyle("#toc       { opacity: 0.2; }");
				GM_addStyle("#toc:hover { opacity: 1.0; }");

				return true;

			}

			return false;

		}

		// Ideally we want to act before # anchor position occurs, but we may
		// need to wait for the toc if it is not added to the DOM until later.
		if (!tryTOC()) {
			setTimeout(tryTOC,400);
		}

	}



	// In case you have * in your includes, only continue for pages which have
	// "wiki" before "?" in the URL, or who have both toc and content elements.
	var isWikiPage = document.location.href.split("?")[0].match("wiki")
		|| ( document.getElementById("toc") && document.getElementById("content") );

	if (!isWikiPage)
		return;



	// Delay.  Feature 3 and 4 can run a bit later, without *too* much page
	// change, but with significant processor saving!
	setTimeout(function(){



	//// Feature #3 : Indent the blocks so their tree-like structure is visible

	// Oct 2012: Disabled - was making a right mess of the header/nav on Wikia
	if (document.location.host.match(/wikia.com/)) {
		indentSubBlocks = false;
	}

	if (indentSubBlocks) {

		function indent(tag) {
			// By targetting search we avoid indenting any blocks in left-hand-column (sidebar).
			var whereToSearch = document.getElementById('bodyContent') || document.getElementById('content') || document;
			var elems = whereToSearch.getElementsByTagName(tag);
			if (elems.length == 1)
				return;
			// for (var i=0;i<elems.length;i++) {
			for (var i=elems.length;i-->0;) {
				var elem = elems[i];
				/* Don't fiddle with main heading, siteSub, or TOC. */
				if (elem.className == 'firstHeading')
					continue;
				if (elem.id == 'siteSub')
					continue;
				if (elem.textContent == 'Contents')
					continue;

				// We have found a "heading" element.  Every sibling after this
				// element should be indented a bit.

				//// Current method of indenting:  Create a UL and put everything
				//// inside that.
				// var newChild = document.createElement('blockquote');
				//// Unfortunately blockquotes tend to indent too much!
				// var newChild = document.createElement('DIV');
				var newChild = document.createElement('UL'); // UL works better with my Folding script, but we must not do this to the TOC!
				newChild.style.marginLeft = '1.0em';
				var toAdd = elem.nextSibling;
				while (toAdd && toAdd.tagName != tag) {
					// That last condition means a h3 might swallow an h2 if they
					// are on the same level!  But it *should* swallow an h4.
					// TODO: We should break if we encounter any marker with level
					// above or equal to our own, otherwise continue to swallow.
					var next = toAdd.nextSibling;
					newChild.appendChild(toAdd);
					toAdd = next;
				}
				elem.parentNode.insertBefore(newChild,elem.nextSibling);

				// CONSIDER: Alternative: Do not swallow at all, do not create
				// newChild and change the page's tree.  Just modify
				// style.marginLeft, resetting it if an incompatible element style
				// already exists there, updating it if we have already indented
				// this element!

				// GM_log("Placed "+newChild+" after "+elem);
			}
		}

		indent("H1"); indent("H2"); indent("H3"); indent("H4"); indent("H5"); indent("H6");

	}



	//// Feature #4: Change underlined headings to overlined headings.

	if (fixUnderlinesToOverlines) {

		GM_addStyle("h1, h2, h3, h4, h5, h6 { border-bottom: 0px solid #AAAAAA; }");
		GM_addStyle("h1, h2, h3, h4, h5, h6 { border-top: 1px solid #AAAAAA; }");
		// Do not use "text-decoration: underline;" - it makes text look like links.

	}



	},1000);




} // end doIt


// setTimeout(doIt,2000);
doIt();


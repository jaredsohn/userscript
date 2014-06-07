// ==UserScript==
// @name           Google Preview Pane
// @namespace      GPP
// @homepage       http://userscripts.org/users/89794
// @description    Displays Google results in a Preview Pane so you don't have to leave the results page.  Click a second time to load the selected page.
// @include        http://*.google.*/*q=*
// @include        http://google.*/*q=*
// @include        https://*.google.*/*q=*
// @include        https://google.*/*q=*
// @exclude        http://*.google.*/images*
// @exclude        http://google.*/images*
// @exclude        http://images.google.*/*
// @exclude        https://*.google.*/images*
// @exclude        https://google.*/images*
// @exclude        https://images.google.*/*
// @version        2012.02.07
// ==/UserScript==

// Notes on the patterns:
//
// Google hosts might include "www.google.co.uk" and "google.com"
// Google search URLs are sometimes "/search?" but sometimes "/#" with no "?" in sight.
// There is often "&q=" but "?q=" should probably also be considered valid.
//
// We want to exclude Google images search result pages.  This might be ok to
// do in the script.



// === Changelog ===
//
// 2012.02.05
//
//   * Restore the preview pane when it has been removed (when altering the
//     search replaces the content with new results.)  Needed this for a while!
//
// 2012.01.29
//
//   * Exclude Google Images search by "tbm" parameter match.
//   * Do not interfere with Shift-click or Ctrl-click.
//
// 2011.12.11
//
//   * RELEASE: Uploaded version to userscripts.org
//   * FIXED: Was not expanding over the sidebar
//
// 2011.--.--
//
//   * DONE: Google's new preview window is a bit distracting.
//   * DONE: scrollIntoView if you preview a later result with createPanelLater enabled.
//
// 2010.12.08
//
//   * Works with Google's new in-page auto-updating results.
//
// 2010.10.06
//
//   * ...
//
// 0.9.9.8
//
//   * Works with the new format (that sidebar thingy)
//   * New default createPanelLater, does not reframe the results until you request a preview.
//   * TODO: Fails to suck in the bottom of the page, sorry.
//
// 0.9.9.7
//
//   * fixed some bugs, created some new ones
//
// 0.9.9.6
//
//   * checkerRows, loadEarly, renderLikeTabs
//
// 0.9.9.5
//
//   * Borders, clearFrameWhenLeaving, and enough comments to keep you reading
//     until next release.
//
// ==== /Changelog ===


GM_log("[GPP] Running");


//// Settings ////

var previewWidth    = 0.75;    // Width of the preview pane (proportion of window width).
var gapBelow        = 190;     // Space left below panes (pixels).
var fillWholeWindow = true;    // Bring more of the page into the left pane.
var keepHeaderAbove = true;    // Do not bring the top of the page in.  (BUG: has little effect on new google)

// Mouse behaviour
var highlightHover  = true;    // Change colour of current / hovered result.
var focusWithHover  = false;   // If set, loads a preview when mouse hovers over a result.
var hoverTime       = 800;     // Milliseconds of mouse hover before preview.
var linksActNormally = true;   // clicking directly on a link skips the preview and goes directly to the result
                               // TODO: if this=true and we are hovering a link, then DON'T highlight!

// Reformatting
var miniLogo        = false;   // miniLogo or removeLogo can help to reduce the
var removeLogo      = false;   // width and the height of the header.
var reduceWidth     = true;    // Try lots of little things to make things fit into the left pane.
var reduceTextSize  = true;    // Reduce size of text in results area (maybe also top).
var panelHasBorder  = true;    // I like the preview pane to look sunken.
var loadEarly       = true;    // If other userscripts manipulate the page, or dislike our manipulations, it may be better to run earlier or later.
var checkerRows     = true;    // Alternates grey and white background to separate results.
var renderLikeTabs  = false;   // Different visual style.
var reduceIndent    = true;    // Our sidebar is not very wide.  Make indents more subtle.
var hideSponsoredLinks = false;
var removeSidebarEarly = false;

var createPanelLater = true;  // The split does not occur until a result is selected for preview.  Nice for a larger initial overview of results, but when we do select one, the re-arrangement loses our scroll position.

var clearFrameWhenLeaving = false; // Clears the preview iframe before travelling to the selected URL.  For some browsers this might make the journey faster.

var includeGeneralBodyLinks = true; // Make all page links previewable, not only result-related links.  Konqueror has problems if I disable this!

var killGooglesNewPreviewPopup = true;

var Colors = {
	focus:    { bg: "#eefbfb", border: "#ddeeee" },
	selected: { bg: "#ddeeff", border: "#ccddff" },
	travel:   { bg: "#ffeecc", border: "#ffccbb" },
	action:   { bg: "#ddccff", border: "#ccbbff" },
	checkers: { 0: "#fbfbfb", 1: "#f4f4f4" }
};

if (renderLikeTabs) {
	// Colors.selected = { bg: "#f7fcff", border: "#ccddff" };
	// Colors.selected = { bg: "#ffffee", border: "#ddddcc" };
	// Colors.checkers = { 0: '#f6f6f6', 1: '#eeeeee' };
}

var resultsWidth = 1.0 - previewWidth;



// Don't run on Google Images search results page.
if (document.location.search.match(/[?&]tbm=isch([?&]|$)/)) {
	return;
}

// Don't run if we are in a sub-frame:
// Mmm should be more like don't run if we have already run in a sub-frame. :P
// if (window != top)
	// return;

if (typeof GM_log === 'undefined') {
	GM_log = function() { };
}



//// Main Function ////

function initPreview() {

	// GM_log("Doing init.");

	//// Set up the Layout ////

	var resultsBlock = getResultsBlock(); // May change!

	// Non-essential reformatting which might break
	try {

		function fillWindow() {

			resultsBlock = document.createElement("DIV");

			document.body.appendChild(resultsBlock);

			document.body.style.margin = '0px 8px';
			// We need to push the 8px or i think the previewPane is too wide!

			// Google's #res class was defining margin: 0 16px
			getResultsBlock().style.margin = '0 0 0 0';
			// TODO: Various bits of the page below the results also have margins. :f

			// Only really needed if keepHeaderAbove==false.
			try {
				// Without this, the blue line at the top of the light blue bar
				// stretches over the preview!
				// Does getElementsByClassName even exist?!
				var annoyingLine = document.getElementsByClassName("gbh")[0];
				annoyingLine.parentNode.removeChild(annoyingLine);
				annoyingLine = document.getElementsByClassName("gbh")[0];
				annoyingLine.parentNode.removeChild(annoyingLine);
			} catch (e) {
				// GM_log("Failed to find annoying line: "+e);
			}

			// If we pulled more stuff than just the results into the left pane,
			// then we may need to reduce the width of the contents, or we will
			// get an unwanted horizontal scrollbar.
			// Just about everything can become too wide at some point, so this is
			// quite a fiddle...

			// document.getElementsByTagName('form')[0].getElementsByTagName("input")[1].size = 20;
			var inputs = resultsBlock.getElementsByTagName("INPUT");
			for (var i=0;i<inputs.length;i++) {
				if (inputs[i].name == 'q')
					inputs[i].size = 10;
			}

			/*
			// Cleanup wasted height at top:
			document.getElementById('gbar').style.height = '0px';
			document.getElementById('guser').style.position = 'fixed';
			document.getElementById('guser').style.right = '0px';
			document.getElementById('guser').style.top = '0px';
			*/

		}

		if (fillWholeWindow) {
			fillWindow();
		}

		// I tried doing this later, but things broke!
		reformatThingsEarly();

	} catch (e) {
		GM_log("Exception during layout: "+e);
	}


	var previewFrame;

	function createPreviewFrame() {

		var table     = document.createElement("TABLE");
		var tbody     = document.createElement("TBODY");
		var row       = document.createElement("TR");
		var leftCell  = document.createElement("TD");
		var rightCell = document.createElement("TD");

		previewFrame = document.createElement('IFRAME');
		previewFrame.id = 'Google_Preview_Pane';
		previewFrame.style.backgroundColor = '#eeeeee';
		if (!panelHasBorder)
			previewFrame.style.border = '0px solid white';
		rightCell.appendChild(previewFrame);

		tbody.appendChild(row);
		table.appendChild(tbody);
		row.appendChild(leftCell);
		row.appendChild(rightCell);

		resultsBlock = getResultsBlock();

		resultsBlock.parentNode.insertBefore(table,resultsBlock.nextSibling);
		leftCell.appendChild(resultsBlock);

		var div = null;

		if (renderLikeTabs) {
			// We create a "tab" rectangle that we use to meet up with the "tabs" and
			// surround the preview window.
			// TODO: Would be better if this span only joined tabs to the preview cell,
			// and have the preview cell tab-coloured, with the IFrame inside it.
			div = document.createElement("SPAN");
			leftCell.appendChild(div);
			div.style.backgroundColor = Colors.selected.bg;
			div.style.position = 'fixed';
			div.style.zIndex = -200;
			div.style.border = '2px solid '+Colors.selected.border;

			// rightCell.style.padding = '10px';
			// previewFrame.style.margin = '10px';
			rightCell.style.backgroundColor = Colors.selected.bg;
		}

		function setDimensions() {
			leftCell.width = Number(resultsWidth*100)+"%";
			rightCell.width = Number(previewWidth*100)+"%";
			// Chrome needs this for new Google 2011.
			table.style.width = (window.innerWidth-40|0)+"px";
			// previewFrame.width = '100%';
			previewFrame.style.width = '100%';
			//// If we leave room for vertical scrollbar, we won't need horizontal one. :)
			//// Fixed for sidebars.
			//// Fixed for previewWidth=0.8
			resultsBlock.style.width = (document.body.clientWidth * resultsWidth) +'px';
			// getResultsBlock().style.width = (document.body.clientWidth * resultsWidth - 32) +'px';
			// resultsBlock.style.width = '30em';
			// getResultsBlock().style.width = (resultsBlock.clientWidth - 16) +'px';
			// resultsBlock.style.width = (resultsBlock.clientWidth - 16) +'px';
			//// If we still fail to lose the horizontal scrollbar, in fact 32 is a little large for display with one, may as well use 24.
			resultsBlock.style.overflow = 'auto';
			// Old: resultsBlock.style.height = (window.innerHeight * pageHeightUsed) + 'px';
			// Old: previewFrame.height = (window.innerHeight * pageHeightUsed) + 'px';
			var heightFree = window.innerHeight - table.offsetTop - gapBelow;
			table.height = ''+heightFree;
			resultsBlock.style.height = heightFree+'px';
			previewFrame.height = heightFree+'px';
			// GM_log("resultsBlock.style.height = "+resultsBlock.style.height);
			// GM_log("previewFrame.height = "+previewFrame.height);
			if (div) {
				try {
					/*
					// Works in FF:
					var rect = leftCell.getClientRects()[0];
					div.style.left = (rect.left + resultsBlock.clientWidth - 16 - 2) +'px';
					div.style.right = (window.innerWidth - 8) +'px';
					div.style.top = (rect.top - 8) +'px';
					div.style.bottom = (rect.bottom - 2) +'px';
					*/
					// Works in FF and Konq:
					div.style.left = (table.offsetLeft + resultsBlock.clientWidth - 16 - 0) +'px';
					div.style.right = (table.offsetLeft + table.clientWidth + 4) +'px';
					div.style.top = (table.offsetTop - 8) +'px';
					div.style.bottom = (table.offsetTop + table.clientHeight - 2) +'px';
					//
					div.style.width = (Number(div.style.right) - Number(div.style.left)) +'px';
					div.style.height = (Number(div.style.bottom) - Number(div.style.top)) +'px';
				} catch (e) {
					GM_log("Exception during div setup: "+e);
				}
			}

		}

		// We will call setDimensions again if the user resizes the window:
		window.addEventListener('resize',setDimensions,false);

		setDimensions();
		//// This pause fixes the window's horizontal scrollbar without increasing gapBelow.
		setTimeout(setDimensions,1);

		removeSidebar();

		hideSidebar();

		// Squash any things on the left panel which may prevent our panes from
		// filling the whole width!
		GM_addStyle(".big #center_col, .big #foot { margin-left: 0px; }");
		GM_addStyle(".mdm #center_col, .mdm #foot { margin-left: 0px; }");

		// If the user has run the Google Search Sidebar userscript, we must
		// remove that from the preview area; so we add it to the results column.
		var gSearchSidebar = document.getElementById("gSearchSidebar");
		if (gSearchSidebar) {
			resultsBlock.appendChild(gSearchSidebar);
			// And undo its position: absolute, to stop it floating.
			gSearchSidebar.style.position = 'relative';
		}

		setTimeout(reformatThingsLater,20);

	}

	if (!createPanelLater) {
		createPreviewFrame();
	}


	//// Listeners ////

	function setupListeners() {

		var lastHover = null;
		var lastPreview = null;
		var currentTimerID = null;

		function closeFrame() {
			previewFrame.src = 'about:blank';
			// previewFrame.parentNode.removeChild(previewFrame);
		}

		function getAncestorByTagName(node,tagName) {
			if (node) {
				while (node = node.parentNode) {
					if (node.tagName == tagName)
						return node;
				}
			}
			return null;
		}

		// If user is hovering over startNode, which parent block should we highlight?
		// This could be re-written (to work better with Delicious Search Results for example)
		function getContainer(startNode) {

			/*
			// GM_log("Got startNode = "+startNode);
			var node = startNode;
			var link = null; // node.getElementsByTagName('A')[0];
			// To make it easier to select links, they can select results by hovering over the non-link areas.
			// We check this by going up parent nodes until we find a link, or hit the top of a results block.
			while (node) {
				if (!link) {
					if (node.tagName == "A") {
						link = node;
					}
				}
				// CONSIDER: My only remaining niggle with this algorithm is that the
				// Delicious Results userscript makes 'l' class links, but there is no
				// parent LI, so the very first one highlights the whole block.
				// We could fix this by aborting ascent if we can find other 'l' links
				// in the parent (rather than just an earlier link).
				var goUp = true;
				if (link) {
					// If we have found a link, only go up if that link was a main result.
					// Otherwise the Cache selects the div above it, which looks weird.
					if (link.className == 'l') {
					} else {
						return link;
					}
				}
				// If we have a link, we must not go to the parent if the parent
				// contains any earlier links.  Unlikely given former check.
				if (link != null) {
					var parentsFirstLink = node.parentNode.getElementsByTagName('A')[0];
					if (parentsFirstLink != link) {
						goUp = false;
					}
				}
				// Or have we reached a google result block?  If so, stop here.
				if ( node.tagName=='LI' || node.className == 'g' || node.className == 'g w0' ) {
					goUp = false;
					// link will be first 'A' child.
				}
				if (!goUp) {
					// We better check we do contain a link!
					return node;
				}
				node = node.parentNode;
			}
			// Don't highlight the whole document, but highlight the link if we got one.
			return link;
			*/

			// CONSIDER: Approach to finding coverage container of a link
			// If the link is some type of heading (h1,h2,h3,...) then we can find the eldest parent who does not have more headings in it.

			//// New Implementation:
			var link = startNode;
			if (link.tagName != "A")
				link = getAncestorByTagName(link,'A');
			if (!link) {
				// If we are not over a link, ascend to the parent LI block, and select that.
				var li = getAncestorByTagName(startNode.firstChild,"LI");
				if (li) {
					return li;
				}
				//// Ascend until we can find a link
				//// Bah ofc this stop ascension properly on Delicious, but
				//// prematurely on main google results, due to the earlier (lower)
				//// Cached and Similar.
				// var n = startNode;
				// while (n) {
					// if (n.getElementsByTagName("A"))
						// return n;
					// n = n.parentNode;
				// }
				return null;
			} else {
				// If we are over a class 'l' link, we may still want to ascend to
				// the parent LI, but only if its first link child is us.
				if (hasClass(link,"l")) {
					var li = getAncestorByTagName(startNode,"LI");
					if (li) {
						var lowerLinks = li.getElementsByTagName("A");
						if (lowerLinks && lowerLinks[0].href == link.href) {
							return li;
						}
					}
				}
				// Otherwise do a generic ascent, but only while we are the only link in the block!
				while (link.parentNode.getElementsByTagName('A').length == 1) {
					link = link.parentNode;
				}
				return link;
			}
			return startNode;
			// return null;

		}

		// If we are highlighting container, then what link does this relate to?
		function getLink(container) {
			return ( container.tagName == "A" ? container : container.getElementsByTagName('A')[0] );
		}

		function highlightNode(node,col,borderCol) {
			if (highlightHover) {
				var container = getContainer(node);
				realHighlightNode(container,col,borderCol);
				// var link = getLink(container);
				// if (link) {
					// realHighlightNode(link,borderCol);
				// }
			}
		}

		var oldBG = ({});
		var oldBorder = ({});
		function realHighlightNode(elem,col,borderCol) {
			var xp = getXPath(elem); // Hash used by our cache tables.  Storing in elem.oldBG wasn't working for me.  Argh this sucks, but at least it works.  I think maybe the problem was not the storage, but the ==null checks.  Maybe we could even do ===undefined.
			if (col) {
				if (oldBG[xp] == null) {
					oldBG[xp] = elem.style.backgroundColor;
					// GM_log(elem.tagName+" "+elem+" Stored to oldBG="+oldBG[xp]+" col="+col);
				}
				// if (!oldBG[xp])
					// oldBG[xp] = getComputedStyle(elem,'').backgroundColor;
				elem.style.backgroundColor = col;
			} else {
				// elem.style.backgroundColor = '';
				// elem.style.backgroundColor = ( oldBG[xp] ? oldBG[xp] : "" );
				if (oldBG[xp] == null) {
					// elem.style.backgroundColor = '';
				} else {
					// GM_log(elem.tagName+" "+elem+" Restoring from oldBG="+oldBG[xp]+" col="+col);
					elem.style.backgroundColor = oldBG[xp];
				}
			}
			if (borderCol) {
				// Before setting the border, we take a copy of the existing border.
				if (oldBorder[xp] == null) {
					oldBorder[xp] = elem.style.border.replace(/initial[ ]*/g,''); // "initial" is a bug we got from konqueror  <-- ? meaning?!
					// Hmmm now the style="..." in Chrome is filling up with repeated "border-width: initial; border-color: initial;".  It would be nice to stop that!
					// GM_log(elem.tagName+" "+elem+" Stored to oldBorder="+oldBorder[xp]);
				}
				elem.style.border = '2px solid '+borderCol;
				if (renderLikeTabs)
					elem.style.borderRight = '0px';
				// elem.style.margin = '-1px';
				//// Naff since we don't reach the edge:
				// if (elem.className == 'g') // Only visually sensible for main results.
					// elem.style.borderRight = 'none';
			} else {
				if (oldBorder[xp]) {
					// GM_log(elem.tagName+" "+elem+" Restoring from oldBorder="+oldBorder[xp]);
					elem.style.border = oldBorder[xp];
				} else {
					elem.style.border = 'none';
					// elem.style.border = '2px solid '+elem.style.backgroundColor;
				}
				// elem.style.border = '0px solid white';
				// elem.style.margin = '0px';
			}
		}

		function checkFocus() {
			if (lastHover && getContainer(lastHover) != lastPreview) {
				// We have decided we will preview this clicked result!
				if (lastPreview) {
					// highlightNode(lastPreview,'',''); // but lastPreview is the container already!
					realHighlightNode(lastPreview,'','');
					realHighlightNode(getLink(lastPreview),'','');
					showUnselected(lastPreview);
					// lastPreview.style.padding = '8px';
				}
				// We don't really seem to use lastHover much - we could have set it
				// to container from the start.
				// GM_log("Got lastHover = "+lastHover);
				var container = getContainer(lastHover);
				// GM_log("Got container = "+container);
				var link = getLink(container);
				// highlightNode(lastHover,'#ddeeff','#ccddff');
				highlightNode(lastHover,Colors.selected.bg,Colors.selected.border);
				showSelected(container);
				// container.style.padding = '6px';
				// realHighlightNode(container,'#ddeeff');
				// realHighlightNode(link,'#ccddee');
				// GM_log("Got link = "+link);
				setTimeout(function(){
					// Sometimes google's AJAX removes previewFrame from the page!
					// if (previewFrame && previewFrame.parentNode==null) {
					if (document.getElementById("Google_Preview_Pane") == null) {
						// GM_log("previewFrame has been removed from the DOM!");
						previewFrame = null;
					}
					if (!previewFrame) {
						// GM_log("Creating previewFrame");
						createPreviewFrame();
						// If the result we clicked on was low down, it might not be
						// visible now that we have moved the results into the side
						// panel.  So we ensure it is still visible...
						setTimeout(function(){
							// TODO: This probably needs to be moved later, so it occurs after the delayed font size reduction, or done in both places.  Oh it is already delayed quite a lot.
							//// Neither of these work for me in Firefox 4 alpha 6
							link.scrollIntoView(false); // Works in Chrome
							//// This one work in FF4 from the console!
							// link.name = "result"+Math.random();
							// unsafeWindow.document.location.hash = link.name;
						},500);
					}

					// setTimeout(function(){

						// Oh progress... Now sites can block embedding with X-Frame-Options.
						// So for the ones we know about, we ask politely for them not to.
						var targetPage = link.href;
						if (targetPage.match("youtube.com/watch.")) {
							targetPage = targetPage.replace("/watch.","/embed/");
							GM_log("Switching to embed for YouTube "+link.href+" becomes "+targetPage);
						}
						if (targetPage.match("maps.google.")) {
							/* TOCHECK: Might output already be set?  Would that break it? */
							targetPage = targetPage + '&output=embed';
							GM_log("Switching to embed for GoogleMaps "+link.href+" becomes "+targetPage);
						}

						if (link.protocol == "https:" || link.protocol != document.location.protocol) {
							previewFrame.innerHTML = "Warning!  Opening "+link.protocol+" link may not work!";
						}
						previewFrame.src = targetPage;
						if (killGooglesNewPreviewPopup) {
							/*
							var vspb = document.getElementById("vspb");
							if (vspb) {
								vspb.style.display = 'none';
							}
							*/
							GM_addStyle("#vspb { display: none; }");
							// Unfortunately google toggle the element's display value, overriding anything we do.
							// But the vspb is an only child, so let's hide the parent:
							GM_addStyle("#botstuff { display: none; }");
							// I think the vspb might appear at "some point" in the future, and write its own element styles.  But the GM_addStyle will override that if it is called after the vspb appears (a second preview).
						}

					// },10);

					// lastPreview = lastHover;
					lastPreview = container; // normalises - two different nodes might both hit the same container
				},10);
				return true;
			}
			return false;
		}

		/* Late check: should we do anything at all? */
		/* i.e. is it sane to act? */
		// I needed this when I was ignoring @include/@exclude rules: on random
		// pages without a place for the iframe (ie. next to resultsBlock)
		// previews were unhelpful!
		/* TODO: This should be done as a wrapper / curry / callback /
		 * second-order function to add the check around the original event
		 * handler function. */
		function eventsShouldAct() {
			resultsBlock = getResultsBlock();
			return (resultsBlock != null);
		}

		function checkClick(evt) {

			if (!eventsShouldAct())
				return;

			// Do not interfere with Ctrl-click or Shift-click or right-click (usually open-in-new-window/tab)
			if (evt.ctrlKey || evt.shiftKey || evt.button>0) {
				return;
			}

			helloMouse(evt); // Without this sometimes we fail to activate because we receive click before mouseover (or for some reason didn't get a mouseover).
			var node = evt.target;
			var overLink = ( node.tagName=="A" ? node : getAncestorByTagName(node,"A") );
			if (overLink)
				GM_log("overLink = "+getXPath(overLink)+" container="+getXPath(getContainer(overLink)));
			// GM_log("Mouseover "+node+" overLink="+overLink);
			if (linksActNormally && overLink && getContainer(overLink) != overLink) {

				// *** RESULT *** Click the link normally.  (User has clicked direclty on a link instead of its block.)

				return;   // The user could have previewed this by clicking the
							 // background, but since the user actually clicked the
							 // link, we perform a normal click.
				// Otherwise continue and maybe do a preview, or a click.
				// Specifically does not return if hovering over a lone link which
				// is not the main link of a block (a results link with no way to
				// preview it other than directly clicking it.)

			}
			if (node == lastHover) {
				// If the user is selecting a link to another results page, they
				// probably don't want a preview!
				var link = getLink(getContainer(node));
				if (link && link.tagName=='A' && link.host==document.location.host
					&& link.pathname.match('/(search|webhp)')
				) {

					// *** RESULT *** Click the link normally / force click.  (User has clicked on a navigation page, e.g. next/previous page.)

					// We will pass the event up to click on the actual link.
					// If it works, we can set this:
					// highlightNode(node,'#ffeecc','#ffeebb');
					highlightNode(node,Colors.travel.bg,Colors.travel.border);
					// Let's make sure it works ;p
					// document.location = link.href;
					// Pff we need to give FF time to colour the highlight :P
					if (clearFrameWhenLeaving) { setTimeout(function(){closeFrame();},10); }
					// setTimeout(function(){document.location = link.href;},20);

				} else {

					// Let's try to Preview what the user clicked
					if (checkFocus()) {

						// *** RESULT *** OK we have activated, the preview iframe should be loading.  User clicked on an area that loaded a new page.
						evt.preventDefault();
						GM_log("Previewing \""+link.textContent+"\" ("+link.href+")");

					} else {

						// Well we didn't want to focus this node.  Let's pass the event to other elements.  This means that if we click the focused node a second time, and there is a link below it, then we will follow it normally.
						// Nah let's force it.  We want this to work even if they didn't click directly:
						// BUG MAYBE FIXED: I fear we are sometimes not reaching here because we earlier failed the check container != lastPreview.
						if (link) {
							// highlightNode(node,'#ddccff','#ccbbff');
							highlightNode(node,Colors.action.bg,Colors.action.border);
							// if (clearFrameWhenLeaving) { closeFrame(); }
							// document.location = link.href;
							//// Were working ok, but then did once fail on me:
							if (clearFrameWhenLeaving) { setTimeout(function(){closeFrame();},10); }
							setTimeout(function(){document.location = link.href;},20);
							//// The failure occurred when trying a second click on the first result of
							//// "google reader help", maybe the IFrame messed with the top window?
						}
						GM_log("Dropout link="+getXPath(link));

					}
				}
			}
		}

		function helloMouse(evt) {

			if (!eventsShouldAct())
				return;

			// TODO: We should only really highlight the container IFF clicking on the currently focused element would cause a preview (and NOT if it would cause a normal link follow).

			var node = evt.target;
			var container = getContainer(node);
			// Should we hover on this?
			if (container) {
				// This is needed for when we hover a new thing *inside* something already hovered (i.e. we haven't done mouseout on lastHover yet).
				if (lastHover && getContainer(lastHover)!=lastPreview) {
					highlightNode(lastHover,'','');
					if (renderLikeTabs)
						showUnselected(getContainer(lastHover));
				}
				// OK start hover on this.  checkFocus() will check if we are still here in hoverTime ms, and if so activate.
				lastHover = node;
				if (focusWithHover) {
					if (currentTimerID)
						clearTimeout(currentTimerID);
					currentTimerID = setTimeout(checkFocus,hoverTime);
				}
				if (container != lastPreview) {
					// highlightNode(node,'#eeffee','#ddffdd');
					// highlightNode(node,'#eeffee','');
					// highlightNode(node,'#ddeeee','');
					//// TODO BUG: padding goes wrong because we didn't call showSelected()
					//// But showSelected wants to put a border on the right :f
					if (renderLikeTabs) {
						highlightNode(node,Colors.focus.bg,Colors.focus.border);
						showSelected(container);
					} else {
						highlightNode(node,Colors.focus.bg,'');
					}
					// highlightNode(node,'#eeffee','#ddffdd'); // extra border causes restructure which is slow
				}
			}
		}

		function goodbyeMouse(evt) {

			if (!eventsShouldAct())
				return;

			var node = evt.target;
			var container = getContainer(node);
			// Should we stop hovering on this?
			if (container && container!=lastPreview) {
				// Clear highlight:
				if (lastHover && getContainer(lastHover)!=lastPreview) {
					highlightNode(lastHover,'','');
					if (renderLikeTabs)
						showUnselected(getContainer(lastHover));
					// FIXED: Does not always fire properly (sometimes a clear highlight is flushed after?)
					// BUG: If we select a sub-element (not an LI) in tabs mode, the LI should look unselected but with the mouseover/out model it isn't.
				}
				lastHover = null;
				// highlightNode(node,'','');
				// showUnselected(node);
				// We don't need to clearTimeout checkFocus(), it knows we left.
			}
		}

		// var whereToListen = ( includeGeneralBodyLinks ? document.body : resultsBlock );
		//// I think the resultsBlock is sometimes being removed/replaced
		var whereToListen = document.body;

		whereToListen.addEventListener('mouseover',helloMouse,false);
		whereToListen.addEventListener('mouseout',goodbyeMouse,false);
		if (!focusWithHover) {
			whereToListen.addEventListener('click',checkClick,false);
		}

	}

	setupListeners();

}



//// Library Functions ////

function findIndexOf(item,list) {
	for (var i=0;i<list.length;i++) {
		if (list[i] == item)
			return i;
	}
	return -1;
}

function getXPath(elem) {
	if (!elem)
		return "[Null elem]";
	var list = document.getElementsByTagName(elem.tagName);
	// var index = Array.prototype.indexOf.call(list,elem);
	var index = findIndexOf(elem,list);
	if (index>=0) {
		return "(//"+elem.tagName+")["+(index+1)+"]";
	} else {
		// throw new Error("Not found: "+elem+" in "+list);   // e.g. it has not yet been added to the document's DOM.
		//// This can happen if google blits some new results with AJAX.
		return "(//"+elem.tagName+")[???]";
	}
}

function hasClass(elem,cla) {
	return new RegExp("(^|\\s)"+cla+"(\\s|$)").test(elem.className);
}

function getResultsBlock() {
	return document.getElementById("res")
		|| document.getElementById("web"); // For Google on other sites, e.g.: http://search.creativecommons.org/
}

function showSelected(elem) {
	if (elem.tagName != "LI")
		return;
	// elem.style.margin = '0px';
	// elem.style.padding = '8px';
	if (renderLikeTabs) {
		elem.style.border = '2px solid ' + Colors.selected.border;
		elem.style.padding = '8px';
		elem.style.borderRight = '2px solid ' + Colors.selected.bg;
		elem.style.paddingRight = '8px';
	}
}

function showUnselected(elem) {
	if (elem.tagName != "LI")
		return;
	// elem.style.margin = '0px';
	// elem.style.padding = '8px';
	if (renderLikeTabs) {
		elem.style.border = '0px';
		elem.style.padding = '10px';
		elem.style.borderRight = '2px solid '+Colors.selected.border;
		elem.style.paddingRight = '8px';
		elem.style.borderLeft = '2px solid white';
		elem.style.paddingLeft = '8px';
	}
}

function reformatThingsEarly() {

	if (removeLogo || miniLogo) {
		var logo = document.getElementsByTagName("IMG")[0];
		logo = logo.parentNode.parentNode; // A
		if (!miniLogo)
			logo = logo.parentNode; // TD
		var pNode = logo.parentNode;
		pNode.removeChild(logo);
		if (document.getElementById("sff"))
			document.getElementById('sff').getElementsByTagName('table')[0].style.marginTop = '5px'
		if (miniLogo) {
			var newImg = document.createElement("IMG");
			// newImg.src = "/favicon.ico";
			newImg.src = "http://www.google.com/intl/en_ALL/images/logo.gif";
			newImg.width = 276*0.3;
			newImg.height = 110*0.3;
			pNode.appendChild(newImg);
			pNode.style.paddingTop = '8px';
			pNode.style.paddingRight = '0px';
			try {
				document.getElementById('sft').style.marginTop = '0px';
				document.getElementById('sft').style.marginBottom = '0px';
				document.getElementById('sff').style.paddingBottom = '0px';
			} catch (e) { }
		}
	}

	if (hideSponsoredLinks) {
		// The "Sponsored Links" block can get in the way.
		var toKill = document.getElementsByClassName("std");
		toKill.push(document.getElementById("mbEnd"));
		toKill.push(document.getElementById("tads"));
		for (var i=0;i<toKill.length;i++)
			toKill[i].parentNode.removeChild(toKill[i]);
	}

	// Do some styling on the main result LI nodes.
	var resNodes = document.evaluate("//div[@id='res']//li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
	for (var i=0;i<resNodes.snapshotLength;i++) {
		var elem = resNodes.snapshotItem(i);
		// Alternate background color
		if (checkerRows)
			elem.style.backgroundColor = Colors.checkers[i%2];
	}

	if (checkerRows) {
		// Chequers look weird without padding
		GM_addStyle("li.g { padding: 8px 12px; margin: 0px; }");
		GM_addStyle("ul.g { padding: 8px 12px; margin: 0px; }");
	}

}

function hideSidebar() {
	// Hide the new sidebar
	var sidebar2010 = document.getElementById("leftnav");
	if (sidebar2010) {
		sidebar2010.style.display = "none";
	}
	GM_addStyle("#center_col { margin-left: 0px; }");
	// Somehow GPP must be adding some unwanted padding, because the searchform
	// width 100% gets too wide and creates a horizontal scrollbar!
	// We can workaround like this:
	GM_addStyle("#searchform { width: 98%; }");
	// 8px padding on the left and top/bottom margins made left column look weird.
	GM_addStyle("#res { padding: 0px; margin: 0px }");
}
// Hmm some redundancy here?  xD

// Removes the new sidebar and its layout
function removeSidebar() {
	GM_addStyle("#cnt { max-width: 9999999px; }");
	// GM_addStyle("#center_col { margin-right: 0px; }");
	// GM_addStyle("#center_col { margin-right: 0px; }");
	GM_addStyle("#leftnav { display: none; }");
	GM_addStyle("#center_col, #foot { margin: 0px; border: 0px; }");
	GM_addStyle("table { margin: 0px; border: 0px; }");

	if (document.getElementById("vspb")) {
		document.getElementById("vspb").style.display = 'none';
	}
}

function reformatThingsLater() {

	var resultsBlock = getResultsBlock();

	try {

		// Copy wanted parts of window into our left-pane block:
		if (keepHeaderAbove) {
			var ssb = document.getElementById("ssb") || document.getElementById("not_ssb")
				|| document.getElementById("mw") /*2012*/;
			if (!ssb) {
				GM_log("Failed to find ssb!");
			} else {
				// Bring everthing after the ssb into our sidebar
				var curNode = ssb.nextSibling;
				while (curNode) {
					var nextNode = curNode.nextSibling;
					resultsBlock.appendChild(curNode);
					curNode = nextNode;
				}
			}
		} else {
			while (document.body.childNodes.length > 0) {
				resultsBlock.appendChild(document.body.childNodes[0]);
			}
		}

	// Mainly this shrinks things down in the sidebar, so it displays better.

	// Do some styling on the main result LI nodes.
	var resNodes = document.evaluate("//div[@id='res']//li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
	for (var i=0;i<resNodes.snapshotLength;i++) {
		var elem = resNodes.snapshotItem(i);
		showUnselected(elem);
	}

	// TODO CONSIDER: We may want to use CSS "word-wrap: break-word;" in the
	// presence of very long URLs or words in the sidebar.

	if (reduceWidth) {

		//// TODO: Various things I haven't narrowed. ////
		// - Sometimes it is the row of Next/Previous Goooooooogle results.
		// - Google gave me a lot of "Searches related to: resize window
		//   iframe" at the bottom which were too wide (5 column table, one
		//   with long word "addeventlistener").
		// - Sometimes it is the <cite> URL of the result that it too wide!  (They wrap in Moz but not in Konq.))
		//   We can try forcing max-width of cite element for Konqueror.
		// - Or the result summary text may contain a really long word which does not wrap.
		// - Video results - 2 columns with text beside, can be wider than desired.

		// Makes a few pieces of text smaller, but most have custom style font sizes.
		// if (reduceTextSize) {
			// document.body.style.fontSize='90%';
			// // document.body.style.fontSize='10px';
		// }

		//// The first nobr was a lone child when I wrote this.
		//// We break it.
		// var nobr = document.getElementsByTagName('NOBR')[0];
		// nobr.parentNode.innerHTML = nobr.innerHTML;
		//// Remove all nobrs, leaving their children in their place:
		var nobrs = document.getElementsByTagName("NOBR");
		for (var i=nobrs.length-1; i>=0; i--) {
			var nobr = nobrs[i];
			while (nobr && nobr.firstChild) {
				nobr.parentNode.insertBefore(nobr.firstChild,nobr);
			}
			nobr.parentNode.removeChild(nobr);
		}

		// This avoids the white-space: wrap but kills the blue header background.
		if (document.getElementById("ssb")) {
			document.getElementById("ssb").id = 'not_ssb';
			// OK we restore the blue background:
			document.getElementById("not_ssb").style.backgroundColor = '#F0F7F9';
			document.getElementById("not_ssb").style.borderTop = '1px solid #6890DA';
			// TODO: Vertical alignment of text is still wrong.
			// document.getElementById("not_ssb").style.verticalAlign = 'middle';
			var resText = document.getElementById('prs').nextSibling;
			resText.style.textAlign = 'right';
		}

		// Footer
		if (document.getElementById("bsf"))
			document.getElementById("bsf").padding = '0px';

		// The last Goooooooogle TD has a silly huge margin
		var tds = document.getElementById('nav').getElementsByTagName('td');
		if (tds && tds.length) {
			tds[tds.length-1].getElementsByTagName('span')[0].style.marginRight = '0px';
		}
		// Remove all the images in that block
		var oooogs = document.getElementById('nav').getElementsByTagName('span')
		for (var i=oooogs.length-1;i>=0;i--) {
			var oog = oooogs[i];
			// The text links will appear very close together unless we space them
			oog.parentNode.style.padding = '3px';
			// Remove the span/image:
			oog.parentNode.removeChild(oog);
		}

	}

	if (reduceTextSize) {
		// This is heavy - delay it
		setTimeout(function(){
		// BUG TODO: In Chrome and Firefox, when doing this while zoomed IN, it
		// increases the size of the fonts.  We may need to parse whether oldSize
		// was specified in "em" or "px" or "" or something else.  The units will
		// affect how difference should operate on them.  (Percentage would be
		// better than adjusting by some fixed amount.)
		// var log = "";
		function resizeTextNode(node,difference) {
			for (var child=node.firstChild; (child); child = child.nextSibling) {
				resizeTextNode(child,difference);
			}
			if (node && node.style) {
				var oldSize = getComputedStyle(node,null).fontSize;
				if (oldSize) {
					var newSize = parseFloat(oldSize) + difference;
					// log+= node+" ("+oldSize+"->"+newSize+"px) \n";
					node.style.fontSize = newSize + "px";
				}
			}
		}
		resizeTextNode(getResultsBlock(),-2);
		// setTimeout(function(){ resizeTextNode(resultsBlock,-4); },1000);
		// NOTE: resultsBlock is no longer available in this scope
		// GM_log(log);
		},50);
	}

	if (reduceIndent) {
		// For some reason a load of <ul>s with style attributes appear
		// much later, so we delay the fix here.
		setTimeout(function(){
			var tocheck = document.getElementsByTagName("*");
			var i = tocheck.length;
			while (--i>=0) {
				var elem = tocheck[i];
				var pl = Number(elem.style.paddingLeft);
				if (pl>0)
					elem.style.paddingLeft = '4px';
				var ml = Number(elem.style.marginLeft);
				if (ml>0)
					elem.style.marginLeft = '4px';
			}
		},100);
		// GM_addStyle("li.g { padding-left: 0px; margin-left: 0px; }");
		// GM_addStyle("ul.g { padding-left: 0px; margin-left: 0px; }");
	}

	GM_addStyle("li.g { padding: 6px 8px; margin: 0px; }");
	GM_addStyle("ul.g { padding: 6px 8px; margin: 0px; }");
	GM_addStyle("li { padding: 6px 8px; margin: 0px; }");
	GM_addStyle("ul { padding: 6px 8px; margin: 0px; }");

	// Does not work
	/*
	function applyClassRule(className,ruleName,ruleValue) {
		var list = ( className.substring(0,1)=='#' ? [ document.getElementById(className.substring(1)) ] : document.getElementsByTagName(className) );
		for (var i=0;i<list.length;i++) {
			var elem = list[i];
			elem.style[ruleName] = ruleValue;
		}
	}
	applyClassRule("#cnt","max-width","9999999px");
	applyClassRule("#center_col","margin-right","0px");
	*/

	} catch (e) {
		GM_log("Exception during reformatThingsLater: "+e);
	}

}

// Add GM_addStyle so this script doesn't break outside GreaseMonkey.
function addSomeCSS(css) {
	var head = document.getElementsByTagName("head")[0];
	if (!head) { return; }
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = css;
	head.appendChild(style);
}
if (typeof GM_addStyle == 'undefined') {
	this.GM_addStyle = addSomeCSS;
}



//// Instantiation ////

if (removeSidebarEarly)
	removeSidebar();

var earlyResultsBlock = getResultsBlock();
if (earlyResultsBlock && loadEarly) {
	initPreview();
} else {
	/*
	function checkStart() {
		var rb = getResultsBlock();
		if (rb)
			initPreview();
		else
			setTimeout(checkStart,1000);
	}
	window.addEventListener('DOMContentLoaded',checkStart,false);
	*/
	setTimeout(initPreview,1000);
	// On webhp pages, I think the content is loaded by Javascript.  We must
	// wait for the page to finish loading before we can find the resultsBlock.
}



//// Developer notes ////

/*

DONE: If the user moves quickly onto and off the element to click it, and the
browser is still busy loading, I think the slowness means the click does not
match the current focus, and is not accepted.
This is wrong, we should accept all clicks and force the focus to be the
clicked element.  Even if highlight focus is lagging behind.
Focus and click should still remain equivalent for the same location of the
pointer.  Our previous assertion was a way to check that was true.  (Seems to
be ATM.)

CONSIDER: If we were to arrange things in a two or three framed page, the
user would be able to resize the results/preview panes by dragging their
vertical bar separator.  The SplitPreview bookmarklet demonstrates this.

DONE: We could extra highlight the link that will be followed.  It's not
always obvious.  This didn't really look nice.

DONE: New double-click to load behaviour is annoying for links which point
to further Google Results pages, e.g. Next/Prev/Similar pages.

DONE: We don't need the setTimeout on non-webhp pages.  We should check to
see if resultsBlock exists first, to avoid using it unneccessarily.

TODO: I suspect most users do not want the behaviour we have at the moment.
Users would probably be happier to have clicked links behave as normal, and
use only clicks on highlighted divs to load the preview.
But sometimes we might want to preview links which do not have a surrounding
div, for example the Google Cache page, or extra links embedded by the
Delicious Search Results userscript.

DONE: If we decide to click a link and follow it fullscreen, we could kill the
iframe, so if the page is still loading from the first (preview) click, the
browser will stop loading it cleanly and immediately, and devote full resources
to the new page load.

TODO: Some of our font scaling is going wrong.  Try using "em" instead of "px".

BUG TODO: fillWholeWindow=false is broken (width of iframe is wrong)

DONE: Broken on webhp pages, e.g.: http://www.google.com/webhp?hl=eN#hl=eN&source=hp&q=strip+exe&aq=f&aqi=g-p1g9&oq=&fp=fd871eff22583196

TODO: The focus color over an 'action' link should be related to the 'action' color not the main highlight color.

2010: google.com now has some "navleft" bar which messes with our shi.  I had
to clear the margin-left and margin-right of #center_col,#foot also.

TODO: Advanced search link is not detected as 'action'.

TODO BUG: It seems mouseout does not fire if the mouse remained still whilst
"Delicious Search Results on Google" moved the thing we were hovering over (by
inserting its results earlier in the page).  Well maybe it does fire; what I
actually observe is that the thing I was previously hovered over does not get
its highlighting reset, but highlighting is added to the new result under the
cursor.  The old thing is now stuck with the false highlight color forever.

*/


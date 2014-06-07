// ==UserScript==

// @name         Delicious.com - Bundle On Post
// @namespace    http://userscripts.org/users/7990
// @description  When you make a new post and use a tag that is not in a bundle, this script provides a bundling interface within the posting page so you can bundle it before saving the post.
// @include      http://delicious.com/save*
// @include      http://www.delicious.com/save*
// ==/UserScript==

var gBundleNames;
var gBundledTags;
var gUnbundledTags = [];
var gBundlesToUpdate = [];
var gSavedBundles = [];
var gFailedBundles = [];
var gBundledTagsErr = "";
var gUser = "";
var gHTMLErr = "false";
var gGotAccountErr = false;
var gTagNameErr = false;
var gBundleNameErr = false;
var gTagLengthErr = false;
var gBundleLengthErr = false;

if (checkWindowSize()) {
	addTagCheck();
	getBundledTags();
}

function checkWindowSize() {
	// need to figure out if this posting page is displaying in bookmarklet form, and if so,
	// if the size of the bookmarklet window is compatible with the Bundle On Post script	
	var bookmarklet = document.getElementById("bookmarklet");
	if (bookmarklet) {
		// indeed, we are in a bookmarklet window, so check the version
		var bookmarkletVersion = document.getElementById("version");
		if (bookmarkletVersion) {
			if (bookmarkletVersion.className == "v_minimum") {
				// this size of bookmarklet does not even show the Tags/Send panels, which
				// means it cannot show the Bundle On Post interface either. Log the problem
				// and exit this script without doing anything.
				GM_log("Bookmarklet window is too small to display Bundle On Post interface. Exiting script.");
				return false;
			}
			else if (bookmarkletVersion.className == "v_wide") {
				// this is the wide one, where the Tags/Send panels float to the right of the post
				// form in a very narrow column -- too narrow for the bundling interface. Remove all 
				// the inline styles that were set upon the initial size calibration, remove the 
				// v_wide class, resize the window, and then reinit the bookmarklet sizing script.
				// New height needs to be the min standard height (421) plus whatever height is added
				// outside the viewport by the title bar, etc. New width needs to be max standard
				// width, which is 674.
				var injectScript = document.createElement("script");
				injectScript.type = "application/javascript";
				injectScript.innerHTML = '' +
					'Dom.setStyle("tags-rec","height","auto");' +
					'Dom.setStyle("send-rec","height","auto");' +
					'Dom.setStyle("sendOptions","height","auto");' +
					'Dom.setStyle("tags-rec","min-height","auto");' +
					'Dom.setStyle("send-rec","min-height","auto");' +
					'Dom.setStyle("sendOptions","min-height","auto");' +
					'Dom.setStyle("saveitemBd","height","auto");' + 
					'Dom.removeClass(document.getElementById("version"),"v_wide");' + 
					'window.resizeTo(674, (window.outerHeight - Dom.getViewportHeight()) + 421);' + 
					'Delicious.BookmarkletVersion.init();' +
					'Delicious.BookmarkletVersion.resize();'
				document.body.appendChild(injectScript);
			}
		}
	}
	return true;
}

function addTagCheck() {
	// get the locally listed bundles used in this account
	gBundleNames = getBundleNames();
	
	// look at cookie to get currently logged in user (cookies must be enabled to login at all, so this will always be here)
	var userRegex = new RegExp("; _user=(.*?)%");
	var userArr = userRegex.exec(document.cookie);
	if (userArr) {
		gUser = userArr[1];
	}
	else {
		// user cookie storage has changed! Log and exit.
		GM_log("Bundle On Post can't get current user from cookie. Exiting script.");
		return;
	}
	
	// Hide the original save button so it can't be clicked by the user (we will click it programmatically)
	var realSave = getSaveBtn();
	if (realSave == -1) {
		// couldn't find save button! Log and exit.
		GM_log("Bundle On Post can't find the save button. Exiting script.");
		return;
	}	
	realSave.setAttribute("style", "display:none;");

	// Add a fake save button that will replace the real save button
	var fakeSave = document.createElement("a");
	fakeSave.innerHTML = "Save";
	fakeSave.id = "fakeSaveButton";
	realSave.parentNode.insertBefore(fakeSave, realSave);
	
	// Check to see if we can find the tags input in the form
	if (!document.getElementById("tags")) {
		// can't find the tags input so log and exit.
		GM_log("Bundle On Post can't find the tags input. Exiting script.");
		return;
	}
	
	// Add a confirm div that will block clicks to the rest of the screen so that we can "modally" ask for user input
	var confirmBlanket = document.createElement("div");
	confirmBlanket.id = "confirmBlanket";
	confirmBlanket.setAttribute("style", "display:none;");
	var confirmBox = document.createElement("div");
	confirmBox.id = "confirmBox";
	var confirmText = document.createElement("p");
	confirmText.id = "confirmText";
	var confirmButtons = document.createElement("div");
	var saveWithoutBundlingButton = document.createElement("input");
	saveWithoutBundlingButton.id = "saveWithoutBundlingButton";
	saveWithoutBundlingButton.setAttribute("type", "button");
	var cancelSaveButton = document.createElement("input");
	cancelSaveButton.id = "cancelSaveButton";
	cancelSaveButton.setAttribute("type", "button");
	var doBundlingButton = document.createElement("input");
	doBundlingButton.id = "doBundlingButton";
	doBundlingButton.setAttribute("type", "button");
	
	confirmButtons.appendChild(saveWithoutBundlingButton);
	confirmButtons.appendChild(cancelSaveButton);
	confirmButtons.appendChild(doBundlingButton);
	confirmBox.appendChild(confirmText);
	confirmBox.appendChild(confirmButtons);
	confirmBlanket.appendChild(confirmBox);
	var postForm = document.getElementById("saveitem");
	if (!postForm) {
		// can't find the spot to insert the confirm divs
		GM_log("Bundle On Post can't find the saveitem element. Exiting script.");
		return;
	}
	postForm.parentNode.insertBefore(confirmBlanket, postForm);
	
	// Make the fake save button check for unbundled tags before saving
	fakeSave.addEventListener("click", function(event) {
		// reset the gUnbundledTags array
		gUnbundledTags = [];
			
		// get the tags we're using for this url -- if none, just move on with the save
		var newTags = document.getElementById("tags");
		newTags = newTags.value;
		newTags = newTags.replace(/^\s+/g,'').replace(/\s+$/g,'');
		if (newTags == "") {
			GM_log("No tags! Continuing with bookmark save.");		
			doBookmarkSave();
			return; 
		}
		newTags = newTags.replace(/\s+/g,' ');
		newTags = newTags.split(" ");
		
		// For accounts that don't use any bundles, it would be annoying to be prompted to bundle each time you post,
		// so just move on with the save if there are no bundles. This looks at local bundle names, which means that
		// it will NOT detect a user's bundles if the only bundles they have are filled with tags that have not yet 
		// been used on any bookmarks. This is a minor gotcha, easily avoided by having even one tag in one bundle be
		// attached to a bookmark post (private or public).
		if (gBundleNames.length == 0) {
			GM_log("No bundles! Continuing with bookmark save.");
			doBookmarkSave();
			return; 
		}
		
		// Before we let the user make any bundling decisions, we need to check that all their tags conform to Delicious'
		// requirements: 50 or fewer per post, none exceeding 128 chars in length. If we detect problems with the tags,
		// immediately triger the bookmark save and Delicious will provide the error handling.
		var longTagErr = false;
		for (var i = 0; i < newTags.length; i++) {
			if (newTags[i].length > 128) {
				longTagErr = true;
				break;
			}
		}
		if ((newTags.length > 50) || longTagErr) {
			GM_log("Errors in tag field -- continuing with bookmark save to let Delicious catch them.");
			doBookmarkSave();
			return;
		}
			
		if ((typeof gBundledTags) == "undefined") {	
			// if we don't have any info about which tags are bundled yet (still waiting on XHR), give the user an extra
			// hint about when to try again by graying out the save button as they wait. The cylon wait gif will already be on.
			var saveBtn = document.getElementById("fakeSaveButton");
			saveBtn.parentNode.className = "btn btn-inactive";
			
			// the custom confirm, unlike the js confirm function, does not block, so while the user is deciding
			// what to do, the tags they are waiting for may come back from the XHR. Need to send the confirm
			// a param to tell it not to show the bundle interface even if the tags are ready -- the user has only
			// chosen to wait, they have not chosen to bundle yet. (With a blocking confirm, we could just test
			// (typeof gBundledTags) == "undefined" again, since the block meant no change could happen to that var 
			// during the confirm, but now that test is useless since the var is mutable during custom confirm.)
				 
			// then, ask them what to do, wait or save -- if they choose save, the display won't matter, if they choose
			// wait, the display will revert once the gBundledTags array is filled by the XHR
			customConfirm("The Bundle On Post script has not yet fetched information about which of your tags are bundled.", "Continue with Save", "Wait for Tags", false);
		}
		else if (gBundledTagsErr != "") {
			// the XHR to get bundled tags came back, but it failed to fetch the tags				
			customConfirm(gBundledTagsErr, "Continue with Save", "Cancel Save", false);
		} 
		else {
			// compare the assigned tags to the list of bundled tags we obtained
			for (var i = 0; i < newTags.length; i++) {
				if (gBundledTags.indexOf(newTags[i].toLowerCase()) == -1) {
					gUnbundledTags[gUnbundledTags.length] = newTags[i];
				}				
			}
			// if none of the tags we're assigning to this url are unbundled, just move on with the save
			if (gUnbundledTags.length <= 0) {
				doBookmarkSave();
				return;
			}
			// now ask the user if they want to save without bundling, or cancel the save and bundle first		
			var msg =	(gUnbundledTags.length == 1) ? "One of the assigned tags is unbundled: " : "Some of the assigned tags are unbundled: ";
			var plural = (gUnbundledTags.length == 1) ? "" : "s";
			customConfirm(msg + htmlSpecialChars(gUnbundledTags.join(", "), true) + ".", "Save Without Bundling", "Bundle Tag" + plural, true);
		}		
	}, false);
	
	// stop the real save button from responding to keyboard enter/return - make the fake save respond instead
	window.addEventListener("keypress", function(event) {
		if (event.keyCode == 13) {
			// you can hit return in the notes field without triggering the save
			if (event.target.id != "notes") {
				event.preventDefault();
				event.stopPropagation();
				
				mouseEvt = document.createEvent('MouseEvents');
				mouseEvt.initMouseEvent('click', true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
				fakeSave.dispatchEvent(mouseEvt);
			}
		}
	}, false);
		
	doBundlingButton.addEventListener("click", function(event) {
		// hide the confirm div and show the bundle panel
		confirmBlanket.setAttribute("style", "display:none;");
		
		// first remove any existing bundle panel
		if (document.getElementById("act-rec-bundles")) {
			// remove the tab
			var tabSpan = document.getElementById("act-rec-bundles");
			var tabLi = tabSpan.parentNode;
			tabLi.parentNode.removeChild(tabLi);
		}
		if (document.getElementById("panel-rec-bundles")) {
			// remove the panel
			var bundlePanel = document.getElementById("panel-rec-bundles");
			bundlePanel.parentNode.removeChild(bundlePanel);
		}
					
		// now add a new bundle panel
		addBundlePanel();
	}, false);
	
	cancelSaveButton.addEventListener("click", function(event) {
		// hide the confirm div and that's it!
		confirmBlanket.setAttribute("style", "display:none;");
	}, false);
	
	saveWithoutBundlingButton.addEventListener("click", function(event) {
		// hide the confirm div and trigger the form's original save button
		confirmBlanket.setAttribute("style", "display:none;");
		doBookmarkSave();
	}, false);	
}

function getBundledTags() {
	// Get all the bundled tags in this account, so that when the user clicks save,
	// we are ready to check for any unbundled tags they may have assigned. If the XHR
	// hasn't returned yet from getting the bundled tags, we'll need to alert them that 
	// we don't know about their tags bundled/unbundled status yet, and give them a chance 
	// to cancel the save and wait a bit. 
	
	// First, show the cylon gif next to the save button, to indicate that work is in progress
	var saveBtn = document.getElementById("fakeSaveButton");
	saveBtn.parentNode.parentNode.className = "buttons waiting";
			
	GM_xmlhttpRequest({
		method: "GET",
		url: "https://secure.delicious.com/settings/tags/bundle/edit",
		onload: function(details) {
			// Revert the display to indicate that the bundled tags are ready.
			// (Button back to active, remove cylon gif.)
			saveBtn.parentNode.className = "btn btn-active";
			saveBtn.parentNode.parentNode.className = "buttons";
		
			gBundledTags = [];
			var bundledTagsRegex = new RegExp("<input type=\"hidden\" id=\"tagsInOtherBundles\" name=\"tagsInOtherBundles\" value=\"(.*?)\">");
			var bundledTagsArr = bundledTagsRegex.exec(details.responseText);
			if (bundledTagsArr) {
				var bundledTagsStr = bundledTagsArr[1].toLowerCase();
				bundledTagsStr = bundledTagsStr.replace(/^\s+/g,'').replace(/\s+$/g,'');
				if (bundledTagsStr != "") {
					// decode the tags, which seem to have been passed through a function much like php's htmlspecialchars
					// to encode double quotes, single quotes, ampersands and the left and right arrows as their html entities
					bundledTagsStr = htmlSpecialChars(bundledTagsStr, false);
					gBundledTags = bundledTagsStr.split(" ");
				}
			}
			else {
				// set an error message to show that the bundled status of the tags could not be obtained
				gBundledTagsErr = "Sorry, the Bundle On Post script was unable to fetch information about your currently bundled tags." +
									"If you used any unbundled tags on this bookmark, you will have to bundle them manually using the Delicious " +
									"bundle management interface.";
			}
		}
	});
}

function addBundlePanel() {	
	// setup the bundles tab, which can be clicked to show the bundle panel
	var bundleTab = document.createElement("li"); 
	var bundleTabSpan = document.createElement("span");
	bundleTabSpan.id = "act-rec-bundles";
	bundleTabSpan.className = "act-rec";
	bundleTabSpan.appendChild(document.createTextNode("Bundles"));
	bundleTab.appendChild(bundleTabSpan);
	
	// insert it into the DOM
	var tagsTab = document.getElementById("act-rec-tags");
	if (!tagsTab) {
		// can't find spot to insert tab, so exit.
		GM_log("Bundle On Post can't insert bundle tab. Exiting script.");
		return;
	}
	tagsTab.parentNode.parentNode.appendChild(bundleTab);
	
	// setup the bundle panel, where the bundling interface gets displayed
	var bundlePanel = document.createElement("li");
	bundlePanel.id = "panel-rec-bundles";
	bundlePanel.className = "panel-rec hidden";
	bundlePanel.setAttribute("style", "height: 223px;");
	
	// insert it into the DOM
	var tagsPanel = document.getElementById("panel-rec-tags");
	if (!tagsPanel) {
		// can't find spot to insert tab, so exit.
		GM_log("Bundle On Post can't insert bundle panel. Exiting script.");
		return;
	}
	tagsPanel.parentNode.appendChild(bundlePanel);
	
	// add a status message to indicate we are fetching the bundle names
	var bundleFetchStatusP = document.createElement("p");
	bundleFetchStatusP.id = "bundleFetchStatus";
	var bundleFetchStatus = document.createElement("span");
	bundleFetchStatus.className = "waiting";
	bundleFetchStatus.innerHTML = "Getting bundle names...";	
	bundleFetchStatusP.appendChild(bundleFetchStatus); 
	bundlePanel.appendChild(bundleFetchStatusP);

	// add some event listeners to all the tabs so they hide/show properly when any of them are clicked
	addTabClickListener("tags");
	addTabClickListener("send");
	addTabClickListener("bundles");
	
	// pop the bundle panel to the top
	evt = document.createEvent('MouseEvents');
	evt.initMouseEvent('click', true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	bundleTabSpan.dispatchEvent(evt);
	
	// unfortunately, it is not possible to get a complete list of a user's bundles from this posting page
	// since it does not include bundles that have only placeholder tags in them (tags that have yet to be
	// used on a bookmark post). To get the complete list, we need to hit up the Manage Tag Bundles page -- 
	// once we've heard back from that page we can show the rest of the interface.
	GM_xmlhttpRequest({
		method: "GET",
		url: "https://secure.delicious.com/settings/tags/bundle",
		onload: function(details) {
			// was not able to fetch page
			if ((details.status != 200) || (details.finalUrl != "https://secure.delicious.com/settings/tags/bundle")) { 
				// remove the progress gif & update the status
				bundleFetchStatus.className = "";
				bundleFetchStatus.innerHTML = "Could not get bundle names. Please make sure you are logged into Delicious and then try clicking the Save button again.";
				return;
			} 
			
			// check that we are still logged into the original account
			if (isSameUser(details.responseText) != true) {
				// remove the progress gif & update the status
				bundleFetchStatus.className = ""; 
				bundleFetchStatus.innerHTML = "Your bundles cannot be updated because you are no longer signed into this Delicious account. Please sign back into the account you were using when you first opened this page and then try clicking the Save button again."
				return;
			}			
			
			// parse out the bundle names
			var arr;
			var remoteBundleNames = [];
			var bundleRegex = new RegExp("<a href=\"/settings/tags/bundle/edit.*?bundle=(.*?)\">Edit</a>","g");
			while (arr = bundleRegex.exec(details.responseText)) {
				// remove the urlencoding
				var name = arr[1];
				name = decodeURIComponent(name);
				remoteBundleNames.push(name);
			}
			gBundleNames = remoteBundleNames;
			gBundleNames.sort();
			
			// remove the waiting status
			bundleFetchStatusP.setAttribute("style", "display:none;");
			
			// create & insert the update bundle form
			var bundleDiv = document.createElement("div");
			bundleDiv.className = "bundleSettings";
			bundleDiv.id = "bundleSettings";
			var h3 = document.createElement("h3");
			h3.className = "item-title";
			h3.innerHTML = "Unbundled Tags";	
			var instructions = document.createElement("p");
			instructions.className = "bundlingInstructions";
			instructions.innerHTML = "Enter one bundle name per box; click the more link for additional boxes. You may use spaces in your bundle names."
			var bundleForm =	document.createElement("form");
			bundleForm.id = "updateBundles";
			var bundleFieldset = document.createElement("fieldset");
			bundleFieldset.id = "bundleFieldset";
			bundlePanel.appendChild(bundleDiv);
			bundleDiv.appendChild(h3);
			bundleDiv.appendChild(instructions);
			bundleDiv.appendChild(bundleForm);
			bundleForm.appendChild(bundleFieldset);

			// convert the bundles to tuples, but in string form (!!!)
			var bTuples = [];
			for (var i = 0; i < gBundleNames.length; i++) {
				// escape double quotes and backslashes
				var escapedBundle = gBundleNames[i].replace(/\\/g, '\\\\');
				escapedBundle = escapedBundle.replace(/"/g, '\\"');
				bTuples.push("{tag:\"" + escapedBundle + "\", count:\"\", type:\"tag\"}");
			}
	
			// set up the autocomplete data source. To use the autocomplete code that del uses, inject 
			// the code into the page so that the page methods/vars are in scope.
			var injectScript = document.createElement("script");
			injectScript.type = "application/javascript";
			injectScript.innerHTML = "" + 
				 "Delicious.BundleData = new Delicious.TagsDataObj;" + 
				 "Delicious.BundleData.objName = 'Delicious.BundleData';" +
				 'Delicious.BundleData.addTags([' + bTuples.join(",") + '], true, true);';
			document.body.appendChild(injectScript);
	
			// add the unbundled tags and corresponding bundle name inputs to the new panel 
			addUnbundledTags(gUnbundledTags, bundleFieldset.id, bundleForm.id);

			// add the status div
			var bundlesMsg = document.createElement("p");
			bundlesMsg.id = "bundles-message";
			bundlesMsg.setAttribute("style", "display: none;");
			bundlePanel.appendChild(bundlesMsg);
	
			// add the button div
			var bundlesActionDiv = document.createElement("div");
			bundlesActionDiv.id = "bundles-action";
			var bundlesActionButton = document.createElement("a");
			bundlesActionButton.id = "bundles-button";
			var plural = (gUnbundledTags.length == 1) ? "" : "s";
			bundlesActionButton.innerHTML = "Bundle Tag" + plural + " & Save Bookmark";
			bundlesActionDiv.appendChild(bundlesActionButton);
			bundlePanel.appendChild(bundlesActionDiv);
	
			// display a (non-clickable) list of the available bundles, so that users have a jumping off point for their autocomplete typing
			// the background colours of the bundles in this list will also change colour to indicate save progress
			var bundleListDiv = document.createElement("div");
			var bundleListH3 = document.createElement("h3");
			bundleListH3.className = "item-title";
			bundleListH3.innerHTML = "My Bundles";
			var bundleListUL = document.createElement("ul");
			bundleListUL.id = "bundles-blist";
	
			for (var i = 0; i < gBundleNames.length; i++) {
				var bundleListLI = document.createElement("li");
				// escape special chars
				bundleListLI.innerHTML = htmlSpecialChars(gBundleNames[i], true);
				bundleListUL.appendChild(bundleListLI);
			}
	
			bundleListDiv.appendChild(bundleListH3);
			bundleListDiv.appendChild(bundleListUL);
			bundlePanel.appendChild(bundleListDiv);
	
			// add an event listener to the Update Bundles link, such that it does stuff
			bundlesActionButton.addEventListener("click", function(event) {
				event.stopPropagation();		
				event.preventDefault();
		
				// reset the global gBundlesToUpdate, gSavedBundles and gFailedBundles arrays
				gBundlesToUpdate = [];
				gSavedBundles = [];
				gFailedBundles = [];
				gHTMLErr = false;
				gGotAccountErr = false;
				gTagNameErr = false;
				gBundleNameErr = false;
				gTagLengthErr = false;
				gBundleLengthErr = false;
		
				// reorg the bundles and tags so that each bundle is associated with a list of new tags that will be added to it
				for (var i = 0; i < gUnbundledTags.length; i++) {
					var j = 0;
					// access each tag bundle input until there are no more to get for that tag
					while (document.getElementById("tag" + i + "-bundle" + j)) {
						var bundleInput = document.getElementById("tag" + i + "-bundle" + j);
						var thisTagsBundle = bundleInput.value.replace(/^\s+/g,'').replace(/\s+$/g,'');
						if (thisTagsBundle != "") {
							var found = false;
							for (var k = 0; k < gBundlesToUpdate.length; k++) {
								if (gBundlesToUpdate[k].bname == thisTagsBundle) {
									gBundlesToUpdate[k].tags = gBundlesToUpdate[k].tags + " " + gUnbundledTags[i];
									found = true;
								 }
							}
							if (!found) {
								// this bundle was not yet in the array, so add it
								gBundlesToUpdate[gBundlesToUpdate.length] = {bname: thisTagsBundle, tags: gUnbundledTags[i]};
							}
						}
						j++;
					}
				} 
				
				// don't do anything if there's nothing to do
				if (gBundlesToUpdate.length == 0) {
					alert("Please enter some bundle names! Or use the regular Save button to save the post without bundling.");
					return;
				}
		
				// hide the update button and show a status message
				this.setAttribute("style", "display:none;");
				bundlesMsg.innerHTML = "Updating bundles...";		
				bundlesMsg.setAttribute("style", "display:block;");
				bundlesMsg.className = "updating";
		
				// reset the class of all bundles to empty, to make them all the default, then
				// set the class of each bundle that we're saving to pending
				var pendingBundles = document.evaluate("//ul[@id = 'bundles-blist']/li", document, null,
														XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
														null);
				for (var i = 0; i < pendingBundles.snapshotLength; i++) {
					pendingBundles.snapshotItem(i).className = "";
					for (var j = 0; j < gBundlesToUpdate.length; j++) {
						// bundles in html list have been encoded for display
						if ((pendingBundles.snapshotItem(i).innerHTML == htmlSpecialChars(gBundlesToUpdate[j].bname, true)) ||
							(pendingBundles.snapshotItem(i).innerHTML == gBundlesToUpdate[j].bname)) {
							pendingBundles.snapshotItem(i).className = "bundleSavePending";
						}
					}
				}
			
				// now initiate the save of each bundle
				for (var i = 0; i < gBundlesToUpdate.length; i++) {
					getBundle(gBundlesToUpdate[i].bname, gBundlesToUpdate[i].tags);				
				} 
			}, false);
		}
	});
}

function addUnbundledTags(tags, parentNodeId, formId) {
	for (var i = 0; i < tags.length; i++) {
		// create a container div for all of this tag's autocomplete inputs
		var unbundledTagDiv = document.createElement("div");
		unbundledTagDiv.id = "unbundledTag" + i;
		document.getElementById(parentNodeId).appendChild(unbundledTagDiv);
		
		// add the link that adds another autocomplete
		var moreLinkDiv = document.createElement("div");
		moreLinkDiv.className = "morelink";
		var moreLink = document.createElement("a");
		moreLink.id = "morelink" + i;
		moreLink.innerHTML = "more";
		moreLinkDiv.appendChild(moreLink);
		unbundledTagDiv.appendChild(moreLinkDiv);
				
		// add the initial autocomplete input
		addAutoComplete(i, tags[i], 0, unbundledTagDiv.id, formId);
		
		// make the link add a new auto complete input when clicked
		moreLink.addEventListener("click", function(event) {
			event.stopPropagation();		
			event.preventDefault();
			
			// remove the "morelink" text from the id to get the current tag number
			var linkId = this.id;
			var curTagNumber = linkId.substr(8, linkId.length);
			var curBundleNumber = 0;
			
			// to get the bundle number, keep trying to access successive bundle inputs until we fail -- that failed
			// id is the id of the one we need to add.
			while (document.getElementById("tag" + curTagNumber + "-bundle" + curBundleNumber)) {
				curBundleNumber++;
			}
			
			addAutoComplete(curTagNumber, "", curBundleNumber, "unbundledTag" + curTagNumber, formId);
		}, false);
	}
}

function addAutoComplete(tagNumber, tagName, bundleNumber, parentId, formId) {
	var inputDiv = document.createElement("div");
	inputDiv.className = "inputField tagfield field yui-ac";
		
	// add the unbundled tag as a label if this is the first autocomplete field
	if (bundleNumber == 0) {
		var inputLabel = document.createElement("label");
		inputLabel.id = "taglabel" + tagNumber;
		inputLabel.setAttribute("for", "tag" + tagNumber + "-bundle" + bundleNumber);
		var labelTxt = document.createElement("strong");
		// escape < > & " ' for display
		labelTxt.innerHTML = htmlSpecialChars(tagName, true);
		inputLabel.appendChild(labelTxt);
		inputDiv.appendChild(inputLabel);
	}
		
	var bundleInput = document.createElement("input");
	bundleInput.className = "yui-ac-input";
	bundleInput.id = "tag" + tagNumber + "-bundle" + bundleNumber;
	bundleInput.setAttribute("type", "text");
	bundleInput.setAttribute("size", "30");
	bundleInput.setAttribute("autocomplete", "off");
	bundleInput.value = "";
	inputDiv.appendChild(bundleInput);
		
	var parentDiv = document.getElementById(parentId);
	parentDiv.appendChild(inputDiv);
	 
	// to use the autocomplete code that del uses, inject the code into the page so that the
	// page methods/vars are in scope. Must do extra step that del doesn't do of setting the 
	// delim char to an empty string, since bundle names allow all chars, including spaces, so
	// cannot be properly delimited -- instead we are setting up separate inputs to assign a 
	// tag to multiple bundles.
	var injectScript = document.createElement("script");
	injectScript.type = "application/javascript";
	injectScript.innerHTML += "Delicious.AutoCompleteManager.add('" + formId + "', 'tag" + tagNumber + "-bundle" + bundleNumber + "', 'tag" + tagNumber + "-bundle" + bundleNumber + "-ac-results', Delicious.BundleData.tags_dataSource); var acObj = Delicious.AutoCompleteManager.get('tag" + tagNumber + "-bundle" + bundleNumber + "-ac-results'); acObj.delimChar = '';";
	document.body.appendChild(injectScript);	
}

function addTabClickListener(tabName) {
	var tab = document.getElementById("act-rec-"  + tabName);
	tab.addEventListener("click", function(event) {
		event.stopPropagation();		
		event.preventDefault();
		
		// deselect all the tabs
		var tabs = document.evaluate("//li[@id = 'recTabs']/ul/li", document, null,
										XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
										null);
		for (var i = 0; i < tabs.snapshotLength; i++){			
			tabs.snapshotItem(i).className = "";
		}
		
		// now select the tab that just got clicked
		this.parentNode.className = "selected";	
			
		// hide all the panels
		var panels = document.evaluate("//ul[@id = 'recs']/li[contains(@class, 'panel-rec')]", document, null,
										XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
										null);
		for (var i = 0; i < panels.snapshotLength; i++){			
			panels.snapshotItem(i).className = "panel-rec hidden";
		}
				
		// now show the panel that just got clicked
		var panel = document.getElementById("panel-rec-" + tabName);
		panel.className = "panel-rec";
	}, false);
}

function getBundle(bundleName, newTags) {	
	// get the current tags for the bundle -- theoretically, this step could be skipped for any brand new bundles
	// that the user manually typed into the bundle interface, but since the bundles can be updated via the del site
	// asnchronously to this posting process, it's much safer to treat each bundle as an old one and get up to date tag
	// info about it. The edit url works just as well for new bundles as for existing ones.
	var encodedBundle = encodeURIComponent(bundleName);
	GM_xmlhttpRequest({
		method: "GET",
		url: "https://secure.delicious.com/settings/tags/bundle/edit?edit=Edit&bundle=" + encodedBundle,
		onload: function(details) {		 		
			if (isSameUser(details.responseText) != true) {
				// no longer signed in to original account, so set the global account err flag, fail this bundle and
				// display results
				gGotAccountErr = true;
				showBundlingResults(false, bundleName);				
			}
			// otherwise, try to do the bundle update
			else {
				// get the currently bundled tags
				var oldTags = "";
				var oldTagsRegex = new RegExp("<input type=\"text\" id=\"tagBundleInput\" name=\"tagsInput\" value=\"(.*?)\">");
				var oldTagsArr = oldTagsRegex.exec(details.responseText);
				if (oldTagsArr) {
					oldTags = oldTagsArr[1];
					oldTags = oldTags.replace(/^\s+/g,'').replace(/\s+$/g,'');
					// once again, tags pulled from the Bundle Edit page need to have &, <, >, " and ' decoded from their html entities
					oldTags = htmlSpecialChars(oldTags, false);
					oldTags = moveBuggyTags(oldTags);
				}
				else {
					gHTMLErr = true;
				}
			
				// get the crumb (the right one! there are several, so grab the update form first, then parse the crumb out from there)
				var crumb = "";
				var formRegex = new RegExp("<form action=\"https://secure.delicious.com/settings/tags/bundle/update\"([\\s\\S]*)");
				var formArr = formRegex.exec(details.responseText);
				if (formArr) {
					var crumbRegex = new RegExp("<input type=\"hidden\" name=\"\.crumb\" value=\"(.*?)\">");
					var crumbArr = crumbRegex.exec(formArr[1]);
					if (crumbArr) {
						crumb = crumbArr[1];
					}
					else {
						gHTMLErr = true;
					}
				}
				else {
					gHTMLErr = true;
				}
			
				// now that we have the current tags, we can append the new tags and save the updated bundle
				if (gHTMLErr != true) {
					updateBundle(crumb, bundleName, newTags, oldTags);
				}
				else {
					showBundlingResults(false, bundleName);
				}
			}
		}
	});
}

// append the new tags we want to add and save the bundle
function updateBundle(crumb, bundleName, newTags, oldTags) {
	var encodedBundle = encodeURIComponent(bundleName);
	var tags = oldTags + " " + moveBuggyTags(newTags);
	tags = encodeURIComponent(tags);
	var formData = ".crumb=" + crumb + "&mode=edit&bundle=" + encodedBundle + "&old_bundle=" + encodedBundle + "&tagsInput=" + tags + "&save=Save";
	GM_xmlhttpRequest({
		method: 'POST',
		url: "https://secure.delicious.com/settings/tags/bundle/update",
		data: formData,
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		onload: function(details) {
			// usually when a bundle fails, it will be a logout issue, but bundling can also fail for a couple other weird reasons
			// 1. bundle name starts with <
			// 2. tag input string where the first tag ends in <
			// this is a flaw in the Del bundle edit page, not this script
			var success = false;
			if (details.status == 200) {		 
				// if it worked we, should be on the general Add/Edit Bundles page
				if (details.finalUrl == "https://secure.delicious.com/settings/tags/bundle") {
					// hooray! we managed to update this bundle with the new tags!!!
					success = true;
				}			 
			}
			
			if (success == false) {
				// if this bundle failed, look for specific reasons why that may have happened
				var newTagsArr = newTags.split(" ");
				for (var i = 0; i < newTagsArr.length; i++) {
					if (newTagsArr[i].length > 128) {
						gTagLengthErr = true;
						break;
					}
				}
				if ((newTagsArr[0].indexOf("<") != -1) || (newTagsArr[0].indexOf(">") != -1)) {
					gTagNameErr = true;
				}
				if (bundleName.length > 128) {
					gBundleLengthErr = true;
				}
				if (bundleName.indexOf("<") == 0) {
					gBundleNameErr = true;
				} 
			}
			showBundlingResults(success, bundleName);				
		}
	});
}

function showBundlingResults(bSaved, bName) {
	var bundleClass = "";
	if (bSaved) {					 
		// now set the className we'll use for this bundle to the success class and mark this
		// bundle as successfully saved.
		bundleClass = "bundleSaveSucceeded";
		gSavedBundles[gSavedBundles.length] = bName;
	}
	else {
		bundleClass = "bundleSaveFailed";
		gFailedBundles[gFailedBundles.length] = bName;
	}
	
	// update the interface so the user knows that a bundle has finished saving (successfully or not)
	var allBundles = document.evaluate("//ul[@id = 'bundles-blist']/li", document, null,
										XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
										null);
	for (var i = 0; i < allBundles.snapshotLength; i++) {
		// the bundle names in the list have been encoded for display
		if ((allBundles.snapshotItem(i).innerHTML == htmlSpecialChars(bName, true)) ||
			(allBundles.snapshotItem(i).innerHTML == bName)) {
			allBundles.snapshotItem(i).className = bundleClass;
		}
	}
							
	// Check to see if all the bundle update callbacks have been called -- that means we're done
	if ((gSavedBundles.length + gFailedBundles.length) >= gBundlesToUpdate.length) {
		// remove the progress gif
		var status = document.getElementById("bundles-message");
		status.className = "";
				
		// figure out which tags got fully saved to all their bundles -- add those to the global bundled tags list				
		for (var i = 0; i < gUnbundledTags.length; i++) {
			var j = 0;
			var tagSaved = true;
			var tagBundles = "";
			while (document.getElementById("tag" + i + "-bundle" + j)) {
				var bundleInput = document.getElementById("tag" + i + "-bundle" + j);
				var thisTagsBundle = bundleInput.value.replace(/^\s+/g,'').replace(/\s+$/g,'');				 		
				if (thisTagsBundle != "") {
					tagBundles += thisTagsBundle + " ";
					if (gSavedBundles.indexOf(thisTagsBundle) != -1) {
						// this was a successfully saved bundle, so clear the bundle input (but only if some bundles failed --
						// leave all bundles there if the update was completely successful)
						if (gFailedBundles.length > 0) {
							bundleInput.value = "";
						} 
					}
					else {
						// this bundle was not properly saved, so this tag was not fully saved either
						tagSaved = false;
					}
				}
				j++;
			}
					
			// this specific tag was assigned to be saved to at least one bundle and was successfully saved to
			// all of them, so it should be added to the already bundled array 
			if (tagSaved && (tagBundles != "")) {
				gBundledTags[gBundledTags.length] = gUnbundledTags[i];
			}
		}	
				
		// Update the bundle list since some new ones might have just been created	
		for (var i = 0; i < gSavedBundles.length; i++) {
			if (gBundleNames.indexOf(gSavedBundles[i]) == -1) {
				// this is a newly created bundle!
				gBundleNames[gBundleNames.length] = gSavedBundles[i];
			}
		}
				
		// Now update the status
		if (gFailedBundles.length > 0) {
			// post a message about which bundles failed
			var msg = "Sorry, something went wrong during the bundling! None of your bundles got updated.";
			if (gSavedBundles.length > 0) {
				var plural = (gFailedBundles.length > 1) ? "s" : "";
				msg = "Done! But the following bundle" + plural + " failed to get updated: " + htmlSpecialChars(gFailedBundles.sort().join(", "), true) + ".";
			}
			if (gHTMLErr) {
				// Delicious changed the html of the edit bundle page such that the bundle's existing
				// tags could not be retrieved.
				msg += " Delicious.com made some changes to the site HTML that prevent Bundle On Post from working.";
			}
			if (gGotAccountErr) {
				// if we discovered at any point that the current logged in user is not the original user, we can give a hint
				// about how to make the second attempt more succesful.
				msg += " Make sure you are still logged into this Delicious account and then try again.";
			}
			if (gBundleLengthErr) {
				msg += " Bundle names must be 128 characters or less."
			}
			if (gBundleNameErr) {
				msg += " You cannot create bundles whose names start with the < character."
			}
			if (gTagLengthErr) {
				msg += " Tags must be 128 characters or less."
			}
			if (gTagNameErr) {
				msg += " Delicious sometimes has trouble bundling tags that include the < or > characters."
			}
			status.innerHTML = msg;									 
			var button = document.getElementById("bundles-button");
			button.innerHTML = "Try Again";
			button.setAttribute("style", "display:inline;");
		}
		else {
			status.innerHTML = "Done!";
			// since everything worked, go on to the bookmark save
			doBookmarkSave();
		}
	}
}

// HELPERS & UTILITIES

// Get all the bundle names. This is a local operation, no XHR needed, so may as well do it while we wait for user to click Save
// <h3 class="item-title bundleTitle"><span class="toggle-button">Bundle Name
function getBundleNames() {
	var bundleNames = [];
	var tagsUL = document.getElementById('recs');
	var bundleSpans = document.evaluate(".//li[@id = 'save-bundle-tags']//h3[contains(@class, 'bundleTitle')]//span", tagsUL, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < bundleSpans.snapshotLength; i++) {
		var bundleSpan = bundleSpans.snapshotItem(i);
		bundleNames[bundleNames.length] = bundleSpan.textContent;
	}
	return bundleNames;
}

function getSaveBtn() {
	var submitButton = -1;
	var formElement = document.getElementById("saveitem");
	if (formElement) {
		var buttonElements = formElement.getElementsByTagName("button");
		if (buttonElements) {
			for (var i = 0; i < buttonElements.length; i++) {
				if (buttonElements[i].type == "submit") {
					submitButton = buttonElements[i];
				}
			}
		}
	}
	return submitButton;
}

function doBookmarkSave() {
	var saveBtn = getSaveBtn();
	evt = document.createEvent('MouseEvents');
	evt.initMouseEvent('click', true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	saveBtn.dispatchEvent(evt);	
}

function isSameUser(pageText) {
	// get the username of the currently signed in user, and compare it to the user that initially opened
	// the post a bookmark page -- these MUST remain the same throughout the bundle saving.
	// 20091201: Del changed the html of this part of the page.
	// 20100312: Del uses a different html id for yahoo usernames (signedInAsYahoo) and also shows the Yahoo profile
	// name, not the Del account name. Check the name used by the currscope link instead.
	var userRegex = new RegExp("<a href=\"/(.*?)\" class=\"currscope\" id=\"currscope\">");
	var userArr = userRegex.exec(pageText);
	var currUser = "";
	if (userArr) {
		currUser = userArr[1];
	}
	return (currUser == gUser);
}

function customConfirm(txt, button1, button2, showBundlePanel) {
	// customize the confirm div's text and buttons, then display it
	var confirmText = document.getElementById("confirmText");
	confirmText.innerHTML = txt;
	
	var saveWithoutBundlingButton = document.getElementById("saveWithoutBundlingButton");
	saveWithoutBundlingButton.value = button1;
	
	var cancelSaveButton = document.getElementById("cancelSaveButton");	
	var doBundlingButton = document.getElementById("doBundlingButton");
	
	// the save without bundling option always does the same thing, but canceling the save
	// sometimes requires showing the bundle panel after and sometimes not -- display the 
	// button that is appropriate for the situation.
	if (showBundlePanel) {
		cancelSaveButton.setAttribute("style", "display:none;");
		doBundlingButton.setAttribute("style", "display:inline;");
		doBundlingButton.value = button2;
	}
	else {
		doBundlingButton.setAttribute("style", "display:none;");
		cancelSaveButton.setAttribute("style", "display:inline;");
		cancelSaveButton.value = button2;
	}	
	
	var confirmBlanket = document.getElementById("confirmBlanket");
	confirmBlanket.setAttribute("style", "display:block;");
}

function htmlSpecialChars(string, encode) {
	var hash_map = {};
	hash_map[String.fromCharCode('38')] = '&amp;';
	hash_map[String.fromCharCode('34')] = '&quot;';
	hash_map[String.fromCharCode('60')] = '&lt;';
	hash_map[String.fromCharCode('62')] = '&gt;';

	var symbol = '', tmp_str = '', entity = '';
	tmp_str = string.toString();
 
	for (symbol in hash_map) {
		entity	= hash_map[symbol];
		if (encode) {
			tmp_str = tmp_str.split(symbol).join(entity);
		}
		else {
			tmp_str = tmp_str.split(entity).join(symbol);
		}
	}
	
	if (encode) {
		tmp_str = tmp_str.split("'").join('&#039;');
	}
	else {
		tmp_str = tmp_str.split('&#039;').join("'");
	}
		
	return tmp_str;
}

// due to a bug in Delicious that prevents it from saving a bundle when the first tag in the tag list
// has some mysterious combination of < and/or > going on, let's move those suspect tags to the end
function moveBuggyTags(tagString) {
	var tagArr = tagString.split(" ");
	for (var i = 0; i < tagArr.length; i++) {
		if ((tagArr[0].indexOf("<") != -1) || (tagArr[0].indexOf(">") != -1)) {
			var firstTag = tagArr.shift();
			tagArr.push(firstTag);
		}
		else {
			break;
		}
		i++;
	}
	return tagArr.join(" ");
}

// STYLES

// -style the confirm div, which needs to cover the whole form so clicks can't get past it
// -add a waiting for bundled tags style that sticks the cylon gif next to the save button
// -style the bundles panel
addGlobalStyle(
	'#confirmBlanket{position:absolute;z-index:999999;background:rgba(255,255,255,0.5);height:100%;text-align:center;left:0;right:0;margin:0;}' +
	'#confirmBlanket #confirmBox{position:fixed;z-index:9999999;left:0;right:0;background:#FFFFE0;color:black;text-align:center;padding:40px 10px;}' +
	'#confirmBlanket #confirmBox p{margin:10px;}' +
	'#confirmBlanket #confirmBox input{margin:5px 15px;}' +
	'#newitem form#saveitem div.submitbttns span.waiting {padding-left:60px;background:transparent url("../img/waitingDelicious01.gif") center left no-repeat;}' +
	'#newitem.fullpage #recs #panel-rec-bundles{min-height:165px;height:auto!important;overflow:auto!important;}' +
	'#newitem #recs #panel-rec-bundles #bundleFetchStatus{margin:4px;}' + 
	'#newitem #recs #panel-rec-bundles #bundleFetchStatus span.waiting{padding-left:58px;background:transparent url("../img/waitingDelicious01.gif") center left no-repeat;}' +
	'#newitem #recs #panel-rec-bundles fieldset{margin:10px 116px 0 10.6em;padding:0 0 5px 0;overflow:visible;}' +
	'#newitem #recs #panel-rec-bundles .field{position:relative;zoom:1;height:auto;margin-bottom:0.8em;}' +
	'#newitem #recs #panel-rec-bundles label{display:block;position:absolute;left:-10em;text-align:right;width:9.4em;padding:2px 0 0 0;overflow:hidden;}' +
	'#newitem #recs #panel-rec-bundles label strong{font-size:85%;font-weight:bold;}' +
	'#newitem #recs #panel-rec-bundles input{position:relative;width:100%;padding:2px 1px;border:1px solid #ddd;border-bottom-color:#bbb;}' +
	'#newitem #recs #panel-rec-bundles #updateBundles .yui-ac-container{margin:20px 0 0 0;left:0;_margin-top:40px;z-index:2 !important;}' +
	'#newitem #recs #panel-rec-bundles #updateBundles .yui-ac-container ul{padding:0 !important;}' +
	'#newitem #recs #panel-rec-bundles .morelink{font-size:85%;display:block;position:absolute;right:0;text-align:left;width:110px;padding:2px 0 0 0;}' +
	'#newitem #recs #panel-rec-bundles .morelink a:hover{text-decoration:none;cursor:pointer;}' +
	'#newitem #recs #panel-rec-bundles #bundles-blist{padding:0 10px;margin:.2em 0 .4em -4px;}' +
	'#newitem #recs #panel-rec-bundles #bundles-blist li{display:inline;float:left;padding:2px;background:#f2f2f2;color:#000;font-size:84%;margin:1px 3px 3px 1px;}' +
	'#newitem #recs #panel-rec-bundles #bundles-blist li.bundleSavePending{background:#EEE8AA;}' +
	'#newitem #recs #panel-rec-bundles #bundles-blist li.bundleSaveSucceeded{background:#C2FFAF;}' +
	'#newitem #recs #panel-rec-bundles #bundles-blist li.bundleSaveFailed{background:#8B0000;color:#fff;}' +
	'#newitem #recs #panel-rec-bundles h3.item-title{background:#F2F2F2;font-weight:bold;margin:4px;padding:2px .6em 2px 10px;}' +
	'#newitem #recs #panel-rec-bundles p.bundlingInstructions{margin:4px;padding:2px .6em 2px 10px;}' +
	'#newitem #recs #panel-rec-bundles #bundles-message{text-align: right;margin:4px;}' +
	'#newitem #recs #panel-rec-bundles #bundles-message.updating {padding-left:55px;background:transparent url("../img/waitingDelicious01.gif") center left no-repeat;}' +
	'#newitem #recs #panel-rec-bundles #bundles-action{text-align: right;margin:8px 4px;}' + 
	'#newitem #recs #panel-rec-bundles #bundles-action #bundles-button{color:#fff;background:#7cba0f;font-weight:bold;padding:2px;}' + 
	'#newitem #recs #panel-rec-bundles #bundles-action a#bundles-button:hover{text-decoration:none;color:#000;cursor:pointer}'
);

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
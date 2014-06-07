// ==UserScript==
// @name            BugList Hider
// @description	    Hides items in Peter(6)'s bug lists
// @namespace       MZ-forums-user
// @include         http://forums.mozillazine.org/viewtopic.php?*
// @license         GPL
// ==/UserScript==

window.addEventListener("load", function() {
	
	var xpath = function( aParent, aExpression, aIsMultiple ) {
		if ("undefined" == typeof(aIsMultiple))
			aIsMultiple = false;
		var res = document.evaluate(
	                             aExpression,
	                             aParent, 
	                             null, 
	                             aIsMultiple ? XPathResult.ORDERED_NODE_SNAPSHOT_TYPE
	                                         : XPathResult.FIRST_ORDERED_NODE_TYPE,
	                             null
	                  );
	    return (aIsMultiple ? res : res.singleNodeValue);
	};
	
	var readBadBugs = function() {
		var buglist = [];
		var badbugs = {};
		var cookieName = "MZ-forums-buglist-hide";
		for (var i = 0; i < document.cookie.split('; ').length; i++) {
			var oneCookie = document.cookie.split('; ')[i].split('=');
				if (oneCookie[0] == cookieName) {
					buglist = oneCookie[1].split(',');
				break;
			}
		}
		for (i = 0; i < buglist.length; ++i) {
			badbugs[parseInt(buglist[i])] = false;
		}
		return badbugs;
	};
	
	var setCookie = function(aList) {
		var aName = "MZ-forums-buglist-hide";
		var s = [];
		for (var i in aList)
			s.push(parseInt(i));
		if (s.length) {
			var date = new Date();
			var days = 365;
			date.setTime(date.getTime() + (days*24*60*60*1000));
			var expires = '; expires=' + date.toGMTString();
			document.cookie = aName + '=' + s.join(',') + expires + '; path=/';
		} else {
			document.cookie = aName + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
		}
	};
	
	var addBadBug = function(aNumber) {
		aNumber = parseInt(aNumber);
		if (aNumber in gBadBugs)
			return;
		gBadBugs[aNumber] = true;
		setCookie(gBadBugs);
		gBadBugs = readBadBugs();
    };
	
	var removeBadBug = function(aNumber) {
		delete gBadBugs[aNumber];
		setCookie(gBadBugs);
		gBadBugs = readBadBugs();
	};
	
	// Get stored hidden bugs from cookie
	var gBadBugs = readBadBugs();
	
	const XPATH_FIRSTSUBJECT = 'TABLE[@class="forumline"]//*[@class="postdetails"]/B/text()';
	const XPATH_FIRSTPOST = 'TABLE[@class="forumline"]//*[@class="postbody"]';
	const XPATH_OL = './/OL';

	// counters
	var i, j;

	// the main document container
	var pMain = document.getElementById('main');
	if (!pMain)
		return;
	
	// the thread title
	var pTitle = xpath(pMain, XPATH_FIRSTSUBJECT);
	if (!pTitle.nodeValue.match(/^The Official .* build is (not yet )?out.$/))
		return;
	
	// the first post in thread
	var pFirstPost = xpath(pMain, XPATH_FIRSTPOST);
	if (!pFirstPost)
		return;

	// find the red (unfixed bugs) list
	var vOL = xpath(pFirstPost, XPATH_OL, true);
	var pOL = null;
	for (i = 0; i < vOL.snapshotLength; ++i) {
		j = vOL.snapshotItem(i);
		if (j && j.parentNode && 'red' == j.parentNode.style.color) {
			pOL = j;
			break;
		}
	}
	if (!pOL) {
		return;
	}
	if (pOL.type != "1")
		return;
	
	// find each item in the red list
	var pLI;
	var pLIChild, pLIChildNext;
	for (pLI = pOL.firstChild; pLI; pLI = pLI.nextSibling) {
		// move the description text into a new span (but stop on empty line)
		var pNewSpan = document.createElement("SPAN");
		for (pLIChild = pLI.firstChild; pLIChild; pLIChild = pLIChildNext) {
			pLIChildNext = pLIChild.nextSibling;
			if ("BR" == pLIChild.nodeName && 
				"#text" == pLIChild.nextSibling.nodeName &&
				pLIChild.nextSibling.nextSibling && 
				"BR" == pLIChild.nextSibling.nextSibling.nodeName)
				break;
			pNewSpan.appendChild(pLIChild);
		}
		pLI.insertBefore(pNewSpan, pLI.firstChild);
		// style the description text
		try {
			var bugMatch = pNewSpan.firstChild.search.match(/\?id=(\d+)$/);
			if (!bugMatch)
				continue;
			pNewSpan.bugNumber = bugMatch[1];
			pNewSpan.addEventListener("dblclick", function(e) {
				// hiding a bug
				var pNewSpan = e.originalTarget;
				while ("undefined" == typeof(pNewSpan.bugNumber))
					pNewSpan = pNewSpan.parentNode;
				var pReplace = document.createElement("SPAN");
				pReplace.appendChild(document.createTextNode("[" + pNewSpan.bugNumber + "]"));
				pReplace.setAttribute("title", pNewSpan.textContent);
				pNewSpan.parentNode.insertBefore(pReplace, pNewSpan);
				pNewSpan.style.display='none';
				addBadBug(pNewSpan.bugNumber);
				pReplace.addEventListener("dblclick", function(e) {
					// showing a bug
					var pReplace = e.target;
					var pNewSpan = pReplace.nextSibling;
					pNewSpan.style.display='';
					pReplace.parentNode.removeChild(pReplace);
					removeBadBug(pNewSpan.bugNumber);
				}, false);
			}, false);
			if (pNewSpan.bugNumber in gBadBugs) {
				var myEvent = document.createEvent('MouseEvents');
				myEvent.initMouseEvent(
					"dblclick",
					true,
					true,
					window,
					0,
					0, 0,
					0, 0,
					false,
					false,
					false,
					false,
					0,
					pNewSpan 
				);
				pNewSpan.dispatchEvent(myEvent);
				gBadBugs[pNewSpan.bugNumber] = true;
			}
		} catch (ex) {
			// unexpected, probably was not a buglist entry, ignore
		}
	}
	
}, false);
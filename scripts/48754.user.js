// ==UserScript==
// @name           Reclaim CPU
// @namespace      http://userscripts.org/users/89794   (joeytwiddle)
// @description    Stops Firefox from using up CPU unnecessarily, by removing plugins and disabling javascript timers on tabs which have been left idle.  Useful if you have a slow PC, or you like to open 20 tabs and then do something else without closing them.  Allows the user to restart the plugins when they return to the tab, but not the timers.
@include        *
@exclude        http://youtube.*/*
@exclude        http://*.youtube.*/*
@exclude        http://last.fm/*
@exclude        http://*.last.fm/*
@exclude        http://spotify.com/*
@exclude        http://*.spotify.com/*
// @exclude        http://*.other.sites/where/we/want/to/leave/flash/or/javascript/running
// ==/UserScript==

////// Config //////

var idleSeconds = 30;       // Page will cleanup if mouse has been outside it
                            // for this many seconds.  Or if you set
                            // detectWhenIdle=false, page will cleanup this
                            // many seconds after loading.

var detectWhenIdle = true;  // This is much more user-friendly, but adds a small
                            // processing overhead until the cleanup occurs.

var reTrigger = false;      // When set, resumes idle detection if the user
                            // restores a hidden element.

var beAggressive = true;    // When attempting idle detection, if the user
                            // never touches the new window, it is hard to tell
                            // whether he is just watching/reading the page or
                            // doing something else.  beAggressive==true means
                            // we will cleanup in this situation.  You really
                            // want this on if you tend to open 10 tabs, but
                            // read only 5 of them.  It is easy to prevent
                            // unwanted triggering, just move your mouse once
                            // over the document you are reading, *after* it
                            // has finished loading.  (We often do this
                            // naturally during normal browsing.)  But beware
                            // this could trigger badly on pages which
                            // automatically reload or change URL, e.g. to
                            // present a slideshow.  If so, increase
                            // idleSeconds.

var stopJavascriptTimers = true;
var removePlugins = true;

// NOTE: One source of CPU hog not handled by Reclaim_CPU script is animated
// gifs.  Firefox has an option to stop animated gifs after one cycle.  You may
// wish to visit about:config and set image.animation_mode = "once".

// Other sources of CPU hog not handled by this script are of course extensions
// and Firefox itself.

// NOTE: Reclaim_CPU will only cleanup pages which automatically refresh
// themselves, IF the idleSeconds triggers cleanup *before* the page reloads
// itself!



/* Developer notes / Changes / Todos

DONE: Rename to CPU Reclaimer.

DONE: As well as killing JS timers, kill flash apps (remove all object and
embed tags I guess)!

TODO: Optionally remove all gif's.  (Presuming we can't just stop their
animation.)

DONE: Delay the script disabling until user has stopped using the page.  Detect
user-idle by checking if his mouse x/y has changed.  Hmm that might trigger
when not wanted, e.g. when user is just watching a video.  Can we check if the
user's focus has moved away from the current tab to another tab, or off the
browser window entirely?
Maybe we can have a global GM_setvar which can track the last tab(window) to
detect an event (e.g. mouse movement, but we should make this kbd-only
compatible too!).

DONE: Rather than removing elements, replace them with "[ELEMENT REMOVED]".
DONE: We could offer a link/button which the user can click if they want to
restore the element.

TODO: Make the new element match the size of the old element, so the page shape
does not change.

TODO: Is it possible to give the user a way to restart the javascript timers in
the same way?

TODO: Doing this on Google Maps page appears to cause some new transfers to
take place!  Mmm I think maybe Google Maps is pure Javascript anyway?  If so,
it might not be hogging the CPU anyway.

DONE: Will now optionally trigger if the mouse is outside the window when the
script inits.

TODO TEST: What if an <embed> plugin is living inside an IFrame on the page?
Will it be found and destroyed ok?

*/



////// Functions which perform the page cleanup. //////

var report;

function cleanupCPUHoggers() {
	report = "";

   if (stopJavascriptTimers)
      clearJavascriptTimers();
   if (removePlugins)
      removeNastyElements();

	window.status = report;
	if (GM_log) {
		// GM_log("On \""+document.title+"\": "+report);
		GM_log(report);
	}

	/*
	var d = document.createElement('DIV');
	d.innerHTML = "<style type='text/css'> .fatfoxinfo{ background-color: white; color: black; position: fixed; right: 4px; top: 4px; } </style><div class='fatfoxinfo'>Events stopped.</div>";
	// " + escapeHTML(report) + "
	// document.body.appendChild(d);
	document.body.insertBefore(d,document.body.firstChild);
	*/

}

function clearJavascriptTimers() {
	// Kill any existing Javascript timers:
	// (Thanks to Joel's Bookmarklets at squarefree.com)
	var c, tID, iID;
	tID = setTimeout(function(){}, 0);
	for (c=1; c<1000 && c<=tID; ++c)
		clearTimeout(tID - c);
	iID = setInterval(function(){},1000);
	for (c=0; c<1000 && c<=iID; ++c)
		clearInterval(iID - c);
	// alert("tID was "+tID+" iID was "+iID);
	report += "Stopped timers ("+tID+","+iID+")";
   // Haha I really don't know what tID and iID mean, but I keep printing them
   // out until I reach enlightenment.
}

function removeNastyElements() {
	// Clear embedded plugins (Flash/Java-applet/...)
	report += (report==''?'R':" and r") + "emoved ";
	removeElemsWithTag("object");
	report += " and ";
	removeElemsWithTag("embed");
	report += " and ";
	removeElemsWithTag("video");
	report += " from \""+document.title+"\"";
   if (document != top.document) {
      report += " (child frame of \""+top.document.title+"\")";
   }
   report += ".";
}

function removeElemsWithTag(tag) {
	var nasties = unsafeWindow.document.getElementsByTagName(tag);
	report += nasties.length+" "+tag.toUpperCase()+"s"; // .map("QWERTYUIOPASDFGHJKLZXCVBNM","qwertyuiopasdfghjklzxcvbnm");
	for (var i=nasties.length-1;i>=0;i--) {
		var lastLength = nasties.length;
		var node = nasties[i];
		// We must call a seperate function, to make a new context for the inner
		// function which contains unique variables.
		destroyNasty(node);
	}
}

function destroyNasty(node) {

	//// Grab stuff needed for restoring.
	// var elemHTML = node.outerHTML; // In all browsers except Mozilla :P
	var attribs = "";
	for (var j=0;j<node.attributes.length;j++) {
		var attr = node.attributes[j];
		attribs += ' ' + attr.name + '="' + attr.value.replace(/"/g,'%22') + '"';
	}
	var elemHTML = "<"+node.tagName+""+attribs+"/>";
	var sis = node.nextSibling;
   var sizeConstraints = "";
   if (node.width && node.height) {
      sizeConstraints = "width:"+node.width+"px; height:"+node.height+"px;";
   }
	var dad = node.parentNode;

	//// Put a Restore link in its place:

	var newNode = document.createElement('DIV');
   // BUG: vertical-align is not working.
   // sizeConstraints only works when newNode is a DIV, not a SPAN.
	newNode.innerHTML = "<STYLE type='text/css'> .WhiteOnRed{ color:#ffffff; background-color:#aa0000; padding: 2px; font-weight: bold; vertical-align: middle; "+sizeConstraints+" } </STYLE>";
	newNode.className = "WhiteOnRed";
	newNode.appendChild(document.createTextNode("["));

	var restoreElement = function(evt) {
		// TODO: We should really create the element type directly, without
		// creating a new SPAN.
		var restoredNode = document.createElement('SPAN');
		restoredNode.innerHTML = elemHTML;
		newNode.parentNode.insertBefore(restoredNode,newNode);
		newNode.parentNode.removeChild(newNode);
		window.status = "Restored: "+elemHTML;
		if (reTrigger) {
			initTimer();
		}
	};
	var restoreLink = unsafeWindow.document.createElement("A");
	restoreLink.textContent = "Restore Removed Plugin";
	restoreLink.onclick = restoreElement;
	restoreLink.title = elemHTML;
	restoreLink.href = "javascript:(function(){})();"; // Just to prevent browser changing page.
	restoreLink.className = "WhiteOnRed";
	newNode.appendChild(restoreLink);

	newNode.appendChild(document.createTextNode("]"));
	dad.insertBefore(newNode,sis);

   // newNode.style.width = node.width+'px';
   // newNode.style.height = node.height+'px';
   // restoreLink.style.width = node.width+'px';
   // restoreLink.style.height = node.height+'px';

	//// Main bit: remove the offending element:
	dad.removeChild(node);

}



////// Functions which perform idle page detection. //////

function initTimer() {

	if (!detectWhenIdle) {

		//// Cleanup automatically at fixed time after page has loaded.
		setTimeout(cleanupCPUHoggers,idleSeconds*1000);

	} else {

		//// Detect when page is idle (no longer in focus), and cleanup then.

		var mouseHasLeft = false;
		var timerRunning = false;
		var lastSawMouse = new Date().getTime();

		// var idleInfo = document.createElement('DIV');
		// document.body.insertBefore(idleInfo,unsafeWindow.document.body.firstChild);

		function checkIdle() {
			timerRunning = false;
			var now = new Date().getTime();
			var idleTime = (now-lastSawMouse)/1000;
			// idleInfo.textContent = "Last saw mouse "+ idleTime +"s ago.";
			if (mouseHasLeft && idleTime > idleSeconds) {
				cleanupCPUHoggers();
				// DONE: We should also disable all the event watchers.
				window.removeEventListener("mousemove", watchMouseMove, false);
				window.removeEventListener("focus", watchMouseMove, false);
				window.removeEventListener("mouseout", watchMouseLeave, false);
			} else {
				if (mouseHasLeft) {
					// GM_log("Unusual: Mouse has left but checkIdle() has triggered with idleTime only "+idleTime+".  Waiting..."); // Not so unusual really - it just means the user has wiggled their mouse over the edge: out, in, out.
					if (timerRunning) {
						GM_log("Blimey: Another timer started while checkIdle() was running!");
					} else {
						timerRunning = true;
						setTimeout(checkIdle,idleSeconds*1000); // Let's check again later
					}
				} else {
					// GM_log("Stopped timer loop since mouse is back.");
				}
			}
		}
		// DONE: We don't actually need to run the checkIdle timer at all, until the mouse has left!

		var watchMouseMove = function(e) {
			mouseHasLeft = false;
			lastSawMouse = new Date().getTime();
			// idleInfo.textContent = "(" + e.pageX + "," + e.pageY + ")";
			// window.status = "(" + e.pageX + "," + e.pageY + ")";
			// idleInfo.textContent = "Mouse is back.";
			return false;
		};
		// document.body.addEventListener("mousemove", watchMouseMove, false);
		window.addEventListener("mousemove", watchMouseMove, false);
		window.addEventListener("focus", watchMouseMove, false); // Catches when use re-enters window with keyboard.

		var watchMouseLeave = function(e) {
			// Oh of course - this is getting triggered for mouseout of all elements!
			// But fortunately it was immediately being disabled by watchMouseMove.
			// Well anyway let's fix that:
			if (e.target.tagName != 'HTML')
				return false;
			if (!mouseHasLeft) {
				if (timerRunning) {
					// Don't start a timer - we have one!
				} else {
					setTimeout(checkIdle,(idleSeconds+0.5)*1000);
					timerRunning = true;
				}
			}
			mouseHasLeft = true;
			lastSawMouse = new Date().getTime();
			// window.status = "Mouse has left the "+e.target.tagName;
			// idleInfo.textContent = "Mouse has left the window.";
			// GM_log("Mouse has left the "+e.target.tagName);
			return false;
		}
		window.addEventListener("mouseout", watchMouseLeave, false);

		// DONE TEST: Is catching the window fine-grained enough?  If we switch to other tabs, does original tab still think it is alive?  Yes, and No.  It works fine.  window only refers to current tab, not whole browser window.  ;)
		// BUG: If I Alt-Tab to get on/off the window, no events are fired.

		/*
		document.body.addEventListener("mousemove", function(ev){
			window.status = "hello";
		}, false);
		*/

		// setTimeout(checkIdle,5000);

		if (beAggressive) {
			mouseHasLeft = true;
			timerRunning = true;
			setTimeout(checkIdle,(idleSeconds-0.5)*1000); // -0.5 so it should run twice at least
		}

	}

}

initTimer();


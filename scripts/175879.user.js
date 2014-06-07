// ==UserScript==
// @name           Feedly Hide Read Items When Done
// @version        1.1.3
// @namespace      geekrunner
// @include        *cloud.feedly.com/*
// @include        *feedly.com/*
// @description    Hide the read items list when you have finished reading unread items.
// ==/UserScript==

// VERSION HISTORY
// 1.1.3 - Reference one fewer element from DOM in hopes of having less DOM-based bugs.
// 1.1.2 - Fix for Feedly's update to DOM.
// 1.1.1 - Fix issue where the page refreshes while you're still reading the last article.
// 1.1 - Fix for updated version of feedly.
// 1.0 - Initial Release.
(function() {
	console.debug("[FHRIWD] - running");
	
	var tweakXHR = function () {
		console.debug("[FHRIWD] Customizing XMLHttpRequest.");
		try {
			XMLHttpRequest.prototype.open_old = XMLHttpRequest.prototype.open;
			XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
				this.addEventListener("readystatechange", function() {
					try {
						var unreadCountSpan = document.querySelector("#feedlyTitleBar span.categoryUnreadCountHint");
						if (unreadCountSpan == null) {
							console.info("[FHRIWD] Could not find unread count message - doing nothing.");
						} else if (unreadCountSpan.textContent.trim()=="No unread articles") {
							if (document.getElementsByClassName("selectedEntry").length == 0) { //Don't hide when still reading the last article.
								console.info("[FHRIWD] All items read - hiding timeline.");
								document.getElementById("timeline").style.display = "none";
								document.getElementById("noUpdatesMessage").style.display = "block";
							}
						} 
					} catch (e) {
						console.error("[FHRIWD] " + e.message);
					}
				}, false);
				this.open_old.call(this, method, url, async, user, pass);
			};
		} catch (e) {
			console.error("[FHRIWD] " + e.message);
		}
		console.debug("[FHRIWD] Finished customizing XMLHttpRequest.");
	};
	
	//Inject the script into the page.
	var script = document.createElement('script');
	script.setAttribute('type','application/javascript');
	script.textContent = '(' + tweakXHR + ')();';
	document.body.appendChild(script); //run the script
	document.body.removeChild(script); //cleanup
	
	console.debug("[FHRIWD] - complete");
}());
// ==UserScript==
// @name        Facebook: Message quick-delete buttons
// @description Adds a direct delete button to message threads and replace the "archive" button with a immediate delete button.
// @namespace   privacyplease
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// @require     http://code.jquery.com/jquery-1.3.2.min.js
//
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function switchDeleteButtons() {
	var q = jQuery;
	// Restore global $ variable for sanity.
	$.noConflict();
	var running = false;
	var run = function() {
		if (running) return;
		if (!document.getElementById("MessagingDashboard")) return;
		running = true;
		try {
		if (document.getElementById("MessagingShelf")) {
			// console.log("Detected MessagingShelf.");
			if (!document.getElementById("QuickDelete")) {
				var actions = q("#MessagingFrame").find('form[class~="uiHeaderActions"]');
				var tid;
				actions.find('input[name="tid"]').each(function() {
					// console.log("Have tid:"+q(this).attr("value"));
					tid=q(this).attr("value");
				});
				if (tid) {
					var elem = q('<a class="uiButton uiButtonConfirm uiToolbarItem" id="QuickDelete" role="button" rel="dialog"><span class="uiButtonText">Delete All</span></a>');
					elem.attr("href","/ajax/messaging/async.php?action=deleteDialog&tid="+encodeURIComponent(tid));
					elem.attr("ajaxify","/ajax/messaging/async.php?action=deleteDialog&tid="+encodeURIComponent(tid));
					// console.log(elem, actions.find('div[class~="uiToolbarContent"]'));
					elem.insertBefore(actions.find('div[class~="uiToolbarContent"]').children().children().first());
				}
			}
		} else {
		// console.log("Looking for archive buttons to replace.");
		// Avoid false positives by class and structure matching. Better than URLs.
		q(document).find('li[class~="threadRow"]').each(function() {
		q(this).find('a[class~="archiveLink"]').each(function() {
			var a = q(this);
			var url = a.attr("ajaxify");
			url = url.replace("action=tag&","action=delete&");
			a.attr("ajaxify", url);

			a.find('span[class~="uiTooltipText"]').html("DELETE<br /> INSTANTLY");
			a.find('input').attr("value", "D");
			var l = a.find('label[class~="uiCloseButton"]');
			var old = l.attr("class");
			if (old) {
				l.attr("class", old.replace("uiCloseButton", "uiDeleteButton"));
			}
		});
		});
		}
		}catch(e){console.log("Exception:", e);};
		running = false;
	};

	run();
	jQuery(document).ready(run);
	jQuery(document).bind("DOMNodeInserted", run);
}

// load jQuery and execute the main function
addJQuery(switchDeleteButtons);

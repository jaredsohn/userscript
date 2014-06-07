// ==UserScript==
// @name           Gmail - add RTL buttons
// @namespace      http://www.splintor.com/userscripts
// @description    Add RTL and LTR buttons to the compose window of Gmail in non-RTL languages
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

/*  **************************************************************************************
    *
    *	This userscript is inspired by the GMail RTL extension by Geva Zeichner
    *   https://addons.mozilla.org/en-US/firefox/addon/2879
    *	http://forums.mozillazine.org/viewtopic.php?t=434514
    *
    **************************************************************************************/

// Change this variable to false if you don't want RTL to be set automatically.
var USE_RTL_BY_DEFAULT = true;

if(window[0] && window[0].name == "main") {
	// update automatically -  // see http://userscripts.org/scripts/show/2296 for details
	try {
		window.addEventListener("load", function () { try {
			(unsafeWindow || window.wrappedJSObject || window).UserScriptUpdates.requestAutomaticUpdates({
				name: "Gmail - add RTL buttons",
				namespace: "http://www.splintor.com/userscripts",
				source: "http://userscripts.org/scripts/show/10023",
				identifier: "http://userscripts.org/scripts/source/10023.user.js",
				version: "0.2",
				date: (new Date(2007, 8 - 1, 20)).valueOf()
			});
		} catch (ex) {} }, false);
	} catch (ex) {}

	// support Userscripts on IE
	try { var test = unsafeWindow; } catch(e) { window.unsafeWindow = window; }

	if(USE_RTL_BY_DEFAULT) {
		// this function is based on http://googlereader.blogspot.com/2005/11/warning-geekery-ahead.html
		unsafeWindow.simulateClick = function(node) {
			if(node.fireEvent) {
				node.fireEvent("onclick");
			} else {
				var event = node.ownerDocument.createEvent("MouseEvents");

				event.initMouseEvent("click",
				                     true, // can bubble
				                     true, // cancellable
				                     node.ownerDocument.defaultView,
				                     1, // clicks
				                     50, 50, // screen coordinates
				                     50, 50, // client coordinates
				                     false, false, false, false, // control/alt/shift/meta
				                     0, // button,
				                     node);

				node.dispatchEvent(event);
			}
		}
	}

	unsafeWindow.Insert_Buttons = function(doc, suffix) {
		if ((doc.getElementById("tb_Bold_" + suffix)) &&
			(!doc.getElementById("tb_+DirectionalityLTR_" + suffix))) {

			var last = doc.getElementById("tm_FontName_" + suffix);
			var span = doc.createElement('span');
			span.className = "tbr";
			span.innerHTML = ["<IMG title='Left To Right' ondragstart='return false' unselectable='on'",
							, "     id='tb_+DirectionalityLTR_", suffix, "' class='btbb ob'"
							, "     style='background-position: -18px 50%;' src='images/cleardot.gif'/>"
							, "<IMG title='Right To Left' ondragstart='return false' unselectable='on'"
							, "     id='tb_+DirectionalityRTL_", suffix, "' class='btbb'"
							, "     style='background-position: 0px 50%;' src='images/cleardot.gif'/>"].join("");

			last.parentNode.insertBefore(span, last);
			if(USE_RTL_BY_DEFAULT) {
				unsafeWindow.setTimeout(function() { unsafeWindow.simulateClick(doc.getElementById("tb_+DirectionalityRTL_" + suffix)); }, 100);
			}
		}
	}

  unsafeWindow.handle_compose_window = function() {
		for(var i = 0; i < frames[0].length; ++i) {
			var doc = frames[0][i].document;
			var msgs = doc.getElementById("msgs");
			if(msgs) {
				var msg_count = msgs && msgs.lastChild.id.split("_")[1];
				if(msg_count == 0) // in drafts
					msg_count = 1;
				for(var msg = 0; msg < msg_count; ++msg) {
					unsafeWindow.Insert_Buttons(doc, msg);
				}
			}
			else
				unsafeWindow.Insert_Buttons(doc, "compose");
		}

		unsafeWindow.setTimeout(unsafeWindow.handle_compose_window, 3000);
	}

	unsafeWindow.handle_compose_window();
}


















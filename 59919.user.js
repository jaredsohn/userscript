// AVIM Script Monitor user script
// Version r348
// 2009-10-16
// 
// Copyright (c) 2008-2009 Minh Nguyen.
// 
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
// 
// --------------------------------------------------------------------
// 
// This is a Greasemonkey user script. To install it:
//  1. Install Greasemonkey from <http://www.greasespot.net/>.
//  2. Restart Firefox and revisit this script.
//  3. Go to Tools > Greasemonkey > Install User Script.
//  4. Accept the default configuration and install.
// 
// To uninstall, go to Tools > Greasemonkey > Manage User Scripts, select
// "Disable Vietnamese IMEs", and click Uninstall.
// 
// --------------------------------------------------------------------
// 
// ==UserScript==
// @name        Disable Vietnamese IMEs
// @namespace   http://www.1ec5.org/software/avim/
// @description	Automatically disables Vietnamese IME scripts on webpages to
//              prevent conflicts with an installed IME. Based on the "script
//              monitor" feature in the AVIM Firefox extension.
// @include     *
// ==/UserScript==

window.AVIMScriptMonitor = {};

// Markers and disablers for embedded Vietnamese IMEs
window.AVIMScriptMonitor.disablers = {
	// For each of these disablers, we don't need a sanity check for an object
	// or member that served as a marker for the IME. Also, everything is
	// wrapped in a try...cach block, so we don't need sanity checks if the
	// disabler can halt on error without failing to reach independent
	// statements.
	
	AVIM: function (win, AVIMObj) {
		AVIMObj.setMethod(-1);
	},
	CHIM: function (win, CHIM) {
		if (parseInt(CHIM.method) == 0) return;
		CHIM.SetMethod(0);
	},
	HIM: function (win) {
		if ("setMethod" in win) win.setMethod(-1);
		win.on_off = 0;
	},
	Mudim: function (win, Mudim) {
		if (parseInt(Mudim.method) == 0) return;
		if ("Toggle" in Mudim) Mudim.Toggle();
		else win.CHIM.Toggle();
	},
	MViet: function (win) {
		if (typeof(win.MVOff) == "boolean" && win.MVOff) return;
		if ("MVietOnOffButton" in win &&
			win.MVietOnOffButton instanceof Function) {
			win.MVietOnOffButton();
		}
		else if ("button" in win) win.button(0);
	},
	VietIMEW: function (win) {
		if (!("VietIME" in win)) return;
		for (var memName in win) {
			var mem = win[memName];
			if (mem.setTelexMode != undefined &&
				mem.setNormalMode != undefined) {
				mem.setNormalMode();
				break;
			}
		}
	},
	VietTyping: function (win) {
		if ("changeMode" in win) win.changeMode(-1);
		else win.ON_OFF = 0;
	},
	VietUni: function (win) {
		win.setTypingMode();
	},
	Vinova: function (win, vinova) {
		vinova.reset(true);
	},
	XaLo: function (win, marker) {
		if (win._e_ && win.document.getElementsByClassName("vk").length) {
			win._e_(null, 0);
		}
	},
	xvnkb: function (win) {
		if (parseInt(win.vnMethod) == 0) return;
		win.VKSetMethod(0);
	}
};

window.AVIMScriptMonitor.markers = {
	// HIM and AVIM since at least version 1.13 (build 20050810)
	DAWEOF: window.AVIMScriptMonitor.disablers.HIM,
	// VietTyping, various versions
	UNIZZ: window.AVIMScriptMonitor.disablers.VietTyping,
	// VietUni, including vietuni8.js (2001-10-19) and version 14.0 by Tran Kien
	// Duc (2004-01-07)
	telexingVietUC: window.AVIMScriptMonitor.disablers.VietUni,
	// Mudim since version 0.3 (r2)
	Mudim: window.AVIMScriptMonitor.disablers.Mudim,
	// MViet 12 AC
	evBX: window.AVIMScriptMonitor.disablers.MViet,
	// MViet 14 RTE
	MVietOnOffButton: window.AVIMScriptMonitor.disablers.MViet,
	// CHIM since version 0.9.3
	CHIM: window.AVIMScriptMonitor.disablers.CHIM,
	// CHIM (xvnkb.js) versions 0.8-0.9.2 and BIM 0.00.01-0.0.3
	vnMethod: window.AVIMScriptMonitor.disablers.xvnkb,
	// HIM since at least version 1.1 (build 20050430)
	DAWEO: window.AVIMScriptMonitor.disablers.HIM,
	// HIM since version 1.0
	findCharToChange: window.AVIMScriptMonitor.disablers.HIM,
	// AVIM after build 20071102
	AVIMObj: window.AVIMScriptMonitor.disablers.AVIM,
	// Vinova (2008-05-23)
	vinova: window.AVIMScriptMonitor.disablers.Vinova,
	// VietIMEW
	GetVnVowelIndex: window.AVIMScriptMonitor.disablers.VietIMEW,
	// XaLộ (vn.xalo.client.vnk)
	_xalo_ga: window.AVIMScriptMonitor.disablers.XaLo
};

/**
 * Calls the given function with the given parameters, within the webpage's
 * sandboxed context.
 *
 * @param func	{function}	A function to execute.
 */
window.AVIMScriptMonitor.mapSafely = function (func) {
	location.href = "javascript:void((" + func + ")(" + args + "));";
};

/**
 * Given a context and marker, disables the Vietnamese JavaScript input method
 * editor (IME) with that marker.
 *
 * @param marker	{object}	A JavaScript object (possibly a function) that
 * 								indicates the presence of the IME.
 * @returns {boolean}	True if the disabler ran without errors (possibly
 * 						without effect); false if errors were raised.
 */
window.AVIMScriptMonitor.disableOther = function (marker) {
	try {
		var disabler = window.AVIMScriptMonitor.markers[marker];
		location.href = "javascript:void((" + encodeURI(disabler) +
			")(window, " + marker + "));";
		return true;
	}
	catch (e) {
		return false;
	}
};

/**
 * Given a HTML document node, disables any Vietnamese JavaScript input method
 * editors (IMEs) embedded in the document that may cause conflicts.
 */
window.AVIMScriptMonitor.disableOthers = function () {
	// Using wrappedJSObject to tell whether certain functions or properties are
	// defined in the page. All we do here is check whether the global variable
	// exists. A page could define the variable's getter; fortunately, the
	// getter will not be executed outside the page sandbox.
	var win = unsafeWindow;
	for (var marker in window.AVIMScriptMonitor.markers) {
		if (!(marker in win)) continue;
		if (window.AVIMScriptMonitor.disableOther(marker)) return;
	}
	
	// MViet 14 RTE
	if (window.frameElement && window.parent) {
		win = window.parent.wrappedJSObject;
	}
	if ("MVietOnOffButton" in win) {
		var disabler = window.AVIMScriptMonitor.disablers.MViet;
		location.href = "javascript:void((" + encodeURI(disabler) +
			")(window.parent));";
	}
};

document.addEventListener("keypress", function () {
	window.AVIMScriptMonitor.disableOthers();
}, true);

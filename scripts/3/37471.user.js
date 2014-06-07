// ==UserScript==
// @name          Gmail Fixed Font Toggle 2
// @namespace     http://martynov.info/greasemonkey/
// @description	  Fixed-font message bodies toggle for GMail (new UI/API version)
// @author        Sergey Martynov
// @version       0.3
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==

const FIXED_FONT_CSS =
	"div.ii { font: .9em monospace !important; } " +
	"div.ii div.im { color: #666 !important; } ";
const TOGGLE_FONT_IMAGE =
	"data:image/gif;base64,R0lGODlhEAAQAIABAAAAzP%2F%2F%2FyH5BAEAAAEALAAAAAAQ" +
	"ABAAAAImjI%2BJwO28wIGG1rjUlFrZvoHJVz0SGXBqymXphU5Y17Kg%2BnixKBYAOw%3D%3D";
const gmStateValueName = 'fixedFontState';

// read stored state (or use normal font by default)
var fixedFontState = GM_getValue ? GM_getValue(gmStateValueName,false) : false;

window.addEventListener('load', function() {
	if (unsafeWindow.gmonkey) {
		unsafeWindow.gmonkey.load("1.0", function (gmail) {

			// create css style node
			var styleNode = document.createElement("style");
			styleNode.type = "text/css";
			styleNode.appendChild(document.createTextNode(FIXED_FONT_CSS));

			// create toggle icon/link
			var toggleFontLink = document.createElement("div");
			toggleFontLink.className = "hk";
			toggleFontLink.innerHTML =
				'<span><img src="' + TOGGLE_FONT_IMAGE + '" /> ' +
				'<u>Fixed font</u></span>';

			// toggle link click handler
			toggleFontLink.addEventListener("click", function () {
				fixedFontState = !fixedFontState;
				styleNode.disabled = !fixedFontState;
				if (GM_setValue) {
					// store current state (setTimeout hack for unsafeWindow)
					window.setTimeout(GM_setValue, 0, gmStateValueName, fixedFontState);
				}
			}, false);

			// gmail UI view state change handler
			gmail.registerViewChangeCallback(function () {
				var rhs = gmail.getConvRhsElement();
				if (!rhs) { return; }
				try {
					// place css style node
					activeView = gmail.getActiveViewElement();
					if (activeView.firstChild != styleNode) {
						activeView.insertBefore(styleNode, activeView.firstChild);
						styleNode.disabled = !fixedFontState;
					}

					// place toggle link
					rhs.firstChild.firstChild.firstChild.appendChild(toggleFontLink);
				}
				catch (e) {}
			});
		});
	}
}, true);

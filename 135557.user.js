// ==UserScript==
// @name           mb. RADIO DOUBLE-CLICK SUBMIT
// @version        2012.1214.1919
// @description    Submits forms when double clicking any of its radio buttons
// @namespace      http://userscripts.org/scripts/show/135557
// @author         Tristan DANIEL (PATATE12 aka. jesus2099/shamo)
// @licence        CC BY-NC-SA 3.0 FR (http://creativecommons.org/licenses/by-nc-sa/3.0/fr/)
// @grant          none
// @include        http*://*musicbrainz.org/cdtoc/*
// @include        http*://*musicbrainz.org/edit/*
// @include        http*://*musicbrainz.org/search?*
// @include        http*://*musicbrainz.org/*/merge
// @run-at         document-end
// ==/UserScript==
(function() { "use strict";
	var radios = document.querySelectorAll("div#page form > *:not(.edit-list) input[type='radio']");
	if (radios) {
		for (var rad=0; rad<radios.length; rad++) {
			var obj = getParent(radios[rad], "label") || radios[rad];
			obj.addEventListener("mousedown", function(e) { e.preventDefault(); }, false);
			obj.addEventListener("dblclick", function(e) {
				var form = getParent(this, "form");
				if (form) {
					var submitpositive = form.querySelector("button.submit.positive");
					if (submitpositive) {
						submitpositive.click();
					} else {
						form.submit();
					}
				}
			}, false);
			obj.setAttribute("title", "double-click this radio button to submit its whole form");
		}
	}
	function getParent(obj, tag, cls) {
		var cur = obj;
		if (cur.parentNode) {
			cur = cur.parentNode;
			if (cur.tagName == tag.toUpperCase() && (!cls || cls && cur.className.match(new RegExp("\\W*"+cls+"\\W*")))) {
				return cur;
			} else {
				return getParent(cur, tag, cls);
			}
		} else {
			return null;
		}
	}
})();
// ==UserScript==
// @name         uso. SOURCE CODE SELECT
// @version      2014.0110.1853
// @description  userscripts.org. selects source code content (both Source Code tab and Edit source pages) source code page becomes wide to show everything uncropped
// @namespace    https://userscripts.org/104512
// @author       PATATE12 aka. jesus2099/shamo
// @licence      CC BY-NC-SA 3.0 (https://creativecommons.org/licenses/by-nc-sa/3.0/)
// @grant        none
// @include      http://userscripts.org/scripts/edit_src/*
// @include      http://userscripts.org/scripts/new?form=true
// @include      http://userscripts.org/scripts/review/*
// @include      https://userscripts.org/scripts/edit_src/*
// @include      https://userscripts.org/scripts/new?form=true
// @include      https://userscripts.org/scripts/review/*
// @run-at       document-end
// ==/UserScript==
(function(){"use strict";
/*set to false to wait for user click*/
var immediateEffect = true;
var source = document.getElementById("source");
if (source) {
	source.parentNode.style.setProperty("overflow", "visible");
	source.parentNode.parentNode.style.setProperty("overflow", "visible");
	source.parentNode.parentNode.style.setProperty("width", "auto");
	var butt = document.createElement("input");
	butt.setAttribute("type", "button");
	butt.setAttribute("value", "Switch source display \u2198");
	butt.addEventListener("click", function(e) {
		var nsource = document.getElementById("nsource");
		if (nsource == null) {
			nsource = document.createElement("textarea");
			nsource.setAttribute("id", "nsource");
			nsource.style.width = "94%";
			nsource.style.margin = "32px auto 0 auto";
			nsource.textContent = source.textContent;
			nsource.addEventListener("focus", function(e) { this.select(); }, false);
			source.parentNode.insertBefore(nsource, source);
			source.parentNode.appendChild(nsource);
		}
		if (source.style.getPropertyValue("display") != "none") {
			source.style.setProperty("display", "none");
			nsource.style.setProperty("display", "block");
			nsource.focus();
		} else {
			source.style.setProperty("display", "block");
			nsource.style.setProperty("display", "none");
		}
	}, false);
	source.parentNode.insertBefore(butt, source);
	if (immediateEffect) { butt.click(); }
}
else if (source = document.querySelector("textarea#script_src")) {
	source.select();
}
})();
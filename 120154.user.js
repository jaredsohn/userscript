// ==UserScript==
// @name         Fix for "Missing plug-in" in Google Chrome
// @author       Denilson Sá
// @version      1.0
// @description  Adds type="application/x-shockwave-flash" to "embed" objects
//               and removes the container "object".
//               This will (hopefully) fix some of the "Missing plug-in" erros
//               for Flash elements in some Google Chrome versions.
// @include      http://www.boadica.com.br/*
// @include      http://www.otempo.com.br/*
// ==/UserScript==

function add_type_flash_to_embed() {
	var embeds = document.querySelectorAll("embed");
	var i;
	for (i = 0; i < embeds.length; ++i) {
		var embed = embeds[i];
		if (embed.getAttribute("src").indexOf(".swf") > -1) {
			embed.setAttribute("type", "application/x-shockwave-flash");

			var parent_element = embed.parentNode;
			// tagName and nodeName are the same
			while (parent_element && parent_element.tagName && parent_element.tagName.toLowerCase() !== "object") {
				parent_element = parent_element.parentNode;
			}

			if (parent_element && parent_element.tagName && parent_element.tagName.toLowerCase() === "object") {
				// If child of <object>, let's remove the <object> and leave
				// only the <embed>
				var container = parent_element.parentNode;
				container.insertBefore(embed, parent_element);
				container.removeChild(parent_element);
			} else {
				// Let's try removing and re-adding the <embed>
				var sibling = embed.nextSibling;
				var parent_ = embed.parentNode;
				parent_.removeChild(embed);
				parent_.insertBefore(embed, sibling);
			}
		}
	}
}

// http://dev.chromium.org/developers/design-documents/user-scripts
// https://developer.mozilla.org/en/DOM/document.readyState
if (document.readyState === "complete") {
	add_type_flash_to_embed();
} else {
	window.addEventListener("load", add_type_flash_to_embed, false);
}

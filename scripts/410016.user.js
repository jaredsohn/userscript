// ==UserScript==
// @name           XKCD what-if title-text dispaly
// @namespace      http://userscripts.org/users/424650
// @author         JonnyRobbie
// @grant		   none
// @description    This script displays hidden title text of what-if images as simple image caption.
// @include        /^https?:\/\/(www\.)?what-if\.xkcd\.com\/([0-9]+\/)?$/
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/410016.meta.js
// @downloadURL    https://userscripts.org/scripts/source/410016.user.js
// @version        1.0
// ==/UserScript==

/*
CHANGELOG:
1.0
-initial release
*/

function main() {
	var illus = document.getElementsByClassName('illustration');
	for (var i=0; i<illus.length; i++) {
		var titleText = document.createElement('div');
		titleText.innerHTML = illus[i].title;
		titleText.className = "title-text";
		titleText.style.lineHeight = "1.7em";
		titleText.style.fontFamily = "Georgia,Times,serif";
		titleText.style.fontSize = "0.8em";
		titleText.style.fontStyle = "italic";
		titleText.style.textAlign = "center";
		titleText.style.margin = "auto";
		titleText.style.width = "40%";
		illus[i].parentNode.insertBefore(titleText, illus[i].nextSibling);
	}
}

main();
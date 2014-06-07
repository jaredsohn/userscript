// ==UserScript==
// @name           only-show-pics
// @namespace      vbulletin
// @include        *any-vBulletin-site.net/*
// ==/UserScript==

var oPosts = document.getElementById("posts");

var oItems = oPosts.getElementsByTagName("a");

var oAuxPosts = document.createElement("div");



for each (var oItem in oItems) {

	if (oItem && oItem.href) {

		if (oItem.getElementsByTagName("img").length > 0 && oItem.href.indexOf("/attachment.php?attachmentid=") != -1) {

			oItem.style.padding="3px";

			oAuxPosts.appendChild(oItem);

		}

	}

}


if (oPosts.innerHTML) {
	oPosts.innerHTML = "";
	
} else {

	dynamiccontentNS6("posts", "");
}



oPosts.appendChild(oAuxPosts);



function dynamiccontentNS6(elementid, content){

	if (document.getElementById && !document.all){

		var el = document.getElementById(elementid);
		
		if (el.innerHTML) {
			el.innerHTML = content ? content : "";
		} else {

			var rng = document.createRange();
			rng.setStartBefore(el);

		

			while (el.hasChildNodes()) {

				el.removeChild(el.lastChild);

			}

		

			if (content) {

				htmlFrag = rng.createContextualFragment(content);

				el.appendChild(htmlFrag);

			}
		}

	}

}

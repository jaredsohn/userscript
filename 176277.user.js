// ==UserScript==
// @name           Heavy.com Element Hider
// @description    Hides elements. Blocks sections of the page.
// @version        1.0
// @include        http://www.heavy.com/*
// @include        https://www.heavy.com/*
// ==/UserScript==

if ( self == top )
if (document) {
	var cssSelectorsHidden = [
				".share-top",
				".inline-share",
				".share-bottom",
				".tags",
				".post-lower-video",
				"#secondary",
				".sidebar right",
				".title-sub",
				".inline-post"
	];
	var cssHideSidebar = cssSelectorsHidden.join(", ") + " {display: none;}";
	var styleHideSidebar = document.createElement("style");
	styleHideSidebar.appendChild(document.createTextNode(cssHideSidebar));
	document.body.appendChild(styleHideSidebar);
	//alert("finished")
}


/* Shamelessly stolen some code from: Matthias Dailey's YouTube element hider script, which is so awesome and I love it. */
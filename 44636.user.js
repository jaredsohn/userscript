// ==UserScript==
// @name           Stack Overflow: Hide ignored
// @namespace      http://gecko.535design.com/grease/
// @description    Prevents questions with ignored tags from displaying unless they also have an interesting tag.
// @include        http://stackoverflow.com/*
// ==/UserScript==

if (document.getElementById("hideIgnored")) {
	function hideTags() {
		GM_setValue("enabled", true);
		document.getElementById("hideIgnored").checked = true;
		setTimeout("applyPrefs()", 0);
	}

	function showTags() {
		GM_setValue("enabled", false);
		document.getElementById("hideIgnored").checked = false;
		setTimeout("applyPrefs()", 0);
	}

	GM_addStyle(".tagged-ignored-hidden { opacity: 0.5; } .tagged-interesting { display: block !important; }");
	GM_registerMenuCommand("Hide ignored tags", hideTags);
	GM_registerMenuCommand("Show ignored tags", showTags);

	if (GM_getValue("enabled", true)) {
		hideTags();
	} else {
		showTags();
	}
}

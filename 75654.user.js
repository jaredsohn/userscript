// ==UserScript==
// @name           Wowhead Auto-Wide, FIXED!
// @namespace      http://userscripts.org/users/158665
// @description    Automatically "clicks" the Wowhead expand button.
// @include        http://*.wowhead.com*
// ==/UserScript==

function ViperHideEl(ID) {
	var element = document.getElementById(ID);
	if ( element ) {
		element.style.display = "none";
	}
}

document.getElementById("wrapper").className = "nosidebar";

ViperHideEl("infobox-ad");
ViperHideEl("sidebar-ad");
ViperHideEl("topbar-expand");
ViperHideEl("sidebar");
ViperHideEl("wrapper-right");
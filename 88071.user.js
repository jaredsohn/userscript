// ==UserScript==
// @name           Scanpix Comp Fix
// @namespace      http://userscripts.org/users/38722
// @description    Fixes Scanpix's stupid disabling of preview image copying.
// @include        http://scanpix.no/spWebApp/preview.action*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(
	/<div style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;">[\s\S]*?<\/div>/,
	""
);

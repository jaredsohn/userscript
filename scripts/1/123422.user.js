// ==UserScript==
// @name           FogBugz Fluid Bug View Width
// @description    Changes the default fixed width bug view to fluid width.
// @namespace      http://userscripts.org/users/damo007
// @include        https://beam.fogbugz.com/default.asp?*
// ==/UserScript==
var d = document.getElementById('bugviewContainer');
if (d != null){
	d.style.width="98%";
}
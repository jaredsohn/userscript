// ==UserScript==
// @name           MySpace's profile edit keyboard shortcuts
// @namespace      http://web2samus.com/
// @description    Adds keyboard shortcuts to the 'preview' and 'save' buttons of MySpace's profile edit window.
// @include        http://profileedit.myspace.com/index.cfm?fuseaction=profile.interests&MyToken=*
// ==/UserScript==


unsafeWindow.onkeypress = function(event) {
	if (event.ctrlKey && (event.charCode == 83 || event.charCode == 115)) {
		document.getElementById('ctl00_ctl00_cpMain_ProfileEditContent_editInterests_SaveTop').click();
		return false;
	}
}

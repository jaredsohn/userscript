// ==UserScript==
// @name           Bugzilla_Filter_Attachments
// @namespace      localhost
// @description    Bugzilla 3.0+ Filter Obsolete Attachments
// @include        https://bugs.eclipse.org/*
// ==/UserScript==
// Author: Karl Matthias -- Eclipse Foundation
// Released under the Eclipse Public License
// Copyright (C) 2007 Eclipse.org Foundation, Inc.

function get_link() {
	var hrefs = document.getElementsByTagName('a');
	for(var link = 0; link < hrefs.length; link++) {
		if(hrefs[link].innerHTML == 'Hide Obsolete') {
			return hrefs[link];
		}
	}
	return null;
}

var link = get_link();
if(link) {
	unsafeWindow.toggle_display(link);
}

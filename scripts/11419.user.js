// ==UserScript==

// @name           Dan Hill - Cope

// @namespace      Edit profile safety status.

// @description    Notifies myspace users when they should not edit their profile.

// @include        http://home.myspace.com/index.cfm?fuseaction=user*

// ==/UserScript==

var logo = document.createElement("div");
logo.innerHTML = '<div style="position:absolute; top:472px; left:50%; margin-left:-382px;"> ' +
    '<embed src="http://mocapoke.com/myspace_status/myspace_profile_edit_alert.swf" width="318" height="18" ' +
    '</div>';
document.body.insertBefore(logo, document.body.firstChild);
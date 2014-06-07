// ==UserScript==
// @name          Flashback forums offsite link fixer
// @namespace     http://henrik.nyh.se
// @description    Replaces the Flashback.info forums' offsite links redirect page with the actual page linked.
// @include       https://*flashback.info/leave.php?*
// ==/UserScript==

// Replace in history so we're not bounced back again when using the back button
location.replace(document.links[1].href);  
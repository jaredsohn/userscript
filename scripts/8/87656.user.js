// DeadJournal Full User Info Redirector //  ID so I know which one I'm looking at
//
// begin credits //
//
// Based on the Opera UserJS 'Insanejournal Format=light Redirector'
// by Ree (http://www.pokitty.com/code/#lj)
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "deadjournal Full User Info", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name              DeadJournal Full User Info Redirector
// @namespace         http://tearex.nfshost.com/gm/
// @description       Redirect to ?mode=full on all profile pages
// @attribution       Ree (http://www.pokitty.com.nyud.net/code/files/ij-format-light-redirect.js)
// @contributor       Ree (http://ree.insanejournal.com/)
// @contributor       Nox (http://userscripts.org/users/Nox)
// @author            Nox (http://userscripts.org/users/Nox)
// @version           0.0.1
//
// @include       http://*.deadjournal.com/profile
// @include       http://limbo.deadjournal.com/*/profile
//
// @exclude       http://www.deadjournal.com/*
// @exclude       http://*.deadjournal.com/*.html

// ==/UserScript==

// "I leave a trail of corpses in my wake," says Frank.

(function() {
location.replace(location+=(location.search?'&':'?')+'mode=full');
})();

// ==UserScript==
// @name           IMDb Login Redirect
// @namespace      muckl.com
// @description    Redirects to previous page after logging in, even if referrers are disabled in browser settings.
// @include        http*://*imdb.com*
// @exclude        https://secure.imdb.com/register-imdb/logout*
// @copyright      2009-2010, Muckl (http://userscripts.org/users/Muckl)
// @license        (CC) Attribution-Noncommercial-Share Alike 3.0 Unported; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version        0.0.2
// ==/UserScript==

/**

   ChangeLog       [REL] v0.0.2 [2010-03-31]
                   [FIX] Exlude url added
                   [FIX] Fixed link on login page
                   [REL] v0.0.1 (initial release) [2009-07-03]

   DevLog          [ADD] Adding redirect to all IMDb domains & logout page

**/

// modify login link and title links
var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
	if (/\/register\/login/.test(links[i].href)) {
		links[i].href = (/register-imdb\/login/.test(window.location.href)) ? window.location.href : links[i].href + '?u=' + window.location.href;
	}
}

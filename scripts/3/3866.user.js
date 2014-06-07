// ==UserScript==
// @name          Google login force SSL
// @namespace     tag:domnit.org,2006-04:gmscripts
// @include       https://www.google.com/accounts/ServiceLogin?*continue=http%3A*
// ==/UserScript==

/*

Google login is over SSL, but it sometimes redirects to non-SSL pages. Even if
GMailSecure [1] is installed, you will hit a non-secure page before being
redirected back to https, and your cookie can be stolen.

[1]: http://diveintomark.org/projects/greasemonkey/gmailsecure.user.js

(C) 2005 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2006-01-31 - Started, finished

*/

location.href = location.href.replace(/continue=http/, 'continue=https');
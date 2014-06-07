// ==UserScript==
// @name           MySpace - Hide Tom Announcement
// @namespace     http://userscripts.org/users/31527
// @homepage      http://userscripts.org/scripts/show/14271
// @description     Blocker for Tom's announcements to free up space on your page. If you still want to read the announcements first, keep this disabled and enable it after you read.
// @include        http://home.myspace.com/*fuseaction=user*
// @exclude        *fuseaction=user.*
// ==/UserScript==

GM_addStyle('#tomannouncement {display: none !important}')
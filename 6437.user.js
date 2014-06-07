// ==UserScript==
// @name           Yahoo! Mail Inbox Redirect
// @description    Redirects you to the Yahoo! Mail inbox
// @include        http://*.mail.yahoo.com/ym/login?*
// @include        http://*.mail.yahoo.com/ym/Welcome?*
// @exclude        http://*.mail.yahoo.com/ym/ShowFolder?rb=Inbox&reset=1&YY=50775&y5beta=yes&YN=1*
// @exclude        http://*.mail.yahoo.com/ym/ShowLetter?MsgId=*
// @exclude 	   http://*.mail.yahoo.com/ym/Compose?box=*
// ==/UserScript==

window.location = 'http://us.f376.mail.yahoo.com/ym/ShowFolder?rb=Inbox';

//change to Inbox url


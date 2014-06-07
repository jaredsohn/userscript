// ==UserScript==
// @name           No MSN on HoTMaiL signout
// @description    Stops hotmail redirecting you to msn when you sign out
// @namespace      http://userscripts.org/users/7063
// @include        https://login.live.com/logout*
// @include        http://login.live.com/logout*
// @version        20120913.2350
// @run-at         document-start
// ==/UserScript==


window.location = 'http://www.hotmail.com/';


//tip:
//if you want a blank page use 'about:blank' instead of 'http://www.hotmail.com/'

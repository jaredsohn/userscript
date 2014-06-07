// ==UserScript==
// @name           Redirect Tumblr to log in page, if not logged in.
// @description    Get redirected to tumblr log in, instead of signup when you visit tumblr.com.
// @author	       Ibby BITCH!
// @include        http://tumblr.com/
// @include        https://tumblr.com/
// @include        https://www.tumblr.com/


// @run-at         document-start
// ==/UserScript==

window.location.href = "http://tumblr.com/login";
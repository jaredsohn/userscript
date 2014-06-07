// ==UserScript==
// @name           Twitter Remember Me Maybe
// @namespace      http://userscripts.org/users/67390/
// @description    Changes the label for Twitter's Remember Me Checkbox
// @include        http://twitter.com/login
// ==/UserScript==



$ = unsafeWindow.jQuery;  
var rememberChk = $("#remember_me + label");

rememberChk[0].innerHTML = "Remember me. Maybe. Your guess is as good as ours."

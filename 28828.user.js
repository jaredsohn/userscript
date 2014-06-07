// ==UserScript==
// @name GMail Redirect - for blocked countries
// @description Redirects from "http://www.gmail.com/" to Google Mail
// @author KayKay
// @namespace kk.tools
// @version 1cm
// @include        http://mail.google.com/gmail/
// @include        https://mail.google.com/gmail/
// ==/UserScript==

self.location.pathname = "/mail/";
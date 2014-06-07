// ==UserScript==
// @name           Hotmail
// @namespace      hotmaillogin
// @description    Works around the "have to log in twice for msn.com e-mail addresses" bug https://bugzilla.mozilla.org/show_bug.cgi?id=415310
// @include        http://login.live.com/*
// ==/UserScript==

unsafeWindow.g_DO["msn.com"]=unsafeWindow.g_DO["hotmail.com"];

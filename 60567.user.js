// ==UserScript==
// @name iK2's 4Shared direct download without captcha or Wait time
// @author  K2 aka iK2 | http://www.orkut.co.in/Profile?uid=2613582691325639815
// @namespace
// @description No Captcha, Wait time or anything just download
// @include http://www.4shared.com/file/*
// ==/UserScript==

window.location.href = window.location.href.replace('/file/', '/download/');
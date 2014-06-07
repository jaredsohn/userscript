// ==UserScript==
// @name           Open 4Shared in Yemen// @namespace      4Shared secure https
// @description    Force 4shared urls to change from http to https to bypass the Blocking in Yemen
// @include        http://www.4shared.com/*
// ==/UserScript==
location.href = location.href.replace(/^http:/, 'https:');
// Thanks
// End
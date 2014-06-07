// ==UserScript==
// @name           5i01 to Mobile01
// @description    redirect 5i01.com to mobile01.com
// @include        http://5i01.com/*
// ==/UserScript==

url = document.location.href;
url = url.replace('5i01.com', 'www.mobile01.com');
document.location.href = url;
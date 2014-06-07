// ==UserScript==
// @name           Jamendo fast download
// @namespace      Jamendo
// @description    Allows you to download from Jamendo using one click less
// @include        http://www.jamendo.com/*/download/*
// ==/UserScript==

result=/^(http\:\/\/www\.jamendo\.com\/[a-z]{2}\/download\/(track|playlist|album)\/\d*)\/?($|\?.+$)/i.exec(window.location);
if(result) window.location.replace(result[1] + "/do" + result[3]);
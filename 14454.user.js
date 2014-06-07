// ==UserScript==
// @name           Wikipedia Hide Banner
// @namespace      Wikipedia Hide Banner
// @description    Hides the begging banner for wikimedia on wikipedia
// @include       http://*.wikipedia.org/*
// ==/UserScript==

document.getElementById("siteNotice").style.visibility="hidden"

document.getElementById("siteNoticeBig").style.visibility="hidden"

document.getElementById("siteNotice").style.display="none"

document.getElementById("siteNoticeBig").style.display="none"
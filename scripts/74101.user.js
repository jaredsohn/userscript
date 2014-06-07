// ==UserScript==
// @name          Automatic Megapid Downloads
// @description   Script which automatically starts downloads from Megapid
// @include       http://www.megapid.com/megaupload-premium-link-generator?link=*
// ==/UserScript==
location.href=document.getElementById('premiumlink').getAttribute('href');
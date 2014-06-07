// ==UserScript==
// @name           ok no ads
// @namespace      ok.co.il
// @description    Remove ad banner from ok.co.il
// @include        http://www.ok.co.il/
// ==/UserScript==

var banner = document.getElementById('BannerShadow');
banner.style.display = 'none';
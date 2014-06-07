// ==UserScript==
// @name           Wikipedia: del donation Ads
// @namespace      http://userscripts.org/users/69817
// @description    Removes donation Ads from Wikipedia
// @include        http://*.wikipedia.org/*
// @source         http://userscripts.org/scripts/show/119790
// @author         Alexandre Magno
// @version        1.0
// @date           2011-12-06
// @supported      Firefox 3.5+, Opera 10.50+, Chrome 4+
// ==/UserScript==

div = document.getElementById("siteNotice");
div.parentNode.removeChild(div);

// document.getElementById("siteNotice").style.display = "none";
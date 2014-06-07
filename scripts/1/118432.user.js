// ==UserScript==
// @name           JimBlock Plus
// @namespace      Fiskie
// @description    No more beg for donation banners on Wikipedia. Or any other site messages, for that matter.
// @include        http://*.wikipedia.org/*
// @include        http://en.wikipedia.org/*
// @version        1.0
// @copyright      2011, Catboy Studios
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @supported      Firefox 3.5+, Opera 10.50+, Chrome 4+
// ==/UserScript==

document.getElementById("siteNotice").style.display = "none";

//Wow that was hard
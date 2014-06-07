// ==UserScript==
// @name           AlloCine Ad Skipper
// @namespace      http://blog.kodono.info/wordpress/greasemonkey/
// @description    fin de la pub géante qui apparaît lors de la 1ère visite de la journée sur le site
// @version        2009103100
// @include        http://www.allocine.fr/*
// ==/UserScript==

unsafeWindow.ac.adRenderer.interstitialStop();
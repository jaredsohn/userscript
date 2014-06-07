// ==UserScript==
// @name           del.icio.us delete now
// @namespace      http://www.tweaksthelimbs.org/greasemonkey/
// @description    Removes the delete-bookmark-confirmation functionality from del.icio.us.
// @include        http://del.icio.us/*
// @version	    0.4
// @GM_version	    0.6.9
// @FF_version	    2.0.0.3
// @modifies	    http://del.icio.us/ui/static/delicious.js?v=61E-123
// ==/UserScript==

unsafeWindow.onclicks['rm'] = unsafeWindow.rmPostYes;
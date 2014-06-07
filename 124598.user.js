// ==UserScript==
// @name           Patch - Remove Annoying Alerts
// @description    Removes the annoying -read more- dialogs that slide-in towards the bottom of articles
// @include        http://*.patch.com/articles/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author         Rick Conklin
// @namespace      http://userscripts.org
// @version        1.1
// ==/UserScript==

$('#previous_in_category_for_publication').remove();

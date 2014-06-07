// ==UserScript==
// @name        Supprimer les suggestions d'amis sur facebook
// @namespace   facebook
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     1
// ==/UserScript==

function removeEgoPane (jNode) {
    jNode.remove ();
    unsafeWindow.console.log ("Removed");
}

waitForKeyElements ("#pagelet_ego_pane_w, #pagelet_ego_pane", removeEgoPane);
waitForKeyElements (".ogAggregation", removeEgoPane);

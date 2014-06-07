// ==UserScript==
// @name          Facebook - Hide recomended
// @description   Hide recomended groups and pages on facebook.
// @author        Maxime Ancelin
// @version       1
// @include       http*://www.facebook.*
// ==/UserScript==


// Select DOM element containing sugestions and remove it
pagelet_ego_pane = document.getElementById('pagelet_ego_pane');
pagelet_ego_pane.parentNode.removeChild(pagelet_ego_pane);
// ==UserScript==
// @name        facebookClean
// @namespace   remove ads
// @include     http://www.facebook.com/*
// @version     1
// ==/UserScript==
var element = document.getElementById('pagelet_side_ads');
if(element)element.parentNode.removeChild(element);

var element = document.getElementById('pagelet_ego_pane_w');
if(element)element.parentNode.removeChild(element);

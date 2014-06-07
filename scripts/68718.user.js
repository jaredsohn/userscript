// ==UserScript==
// @name           Print In Same Window
// @namespace      http://fitman2009.wordpress.com
// @description    Opens Full Page Recipes in Same Window
// @include        http://www.foodnetwork.com/recipes/*
// ==/UserScript==

document.getElementById('rcp-tools').getElementsByTagName('a')[0].removeAttribute('target')
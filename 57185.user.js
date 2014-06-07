// ==UserScript==
// @name           add pm link
// @namespace      bane427
// @description    adds a pm link
// @include        http://endoftheinter.net/*
// @include        http://*.endoftheinter.net/*
// @include        https://endoftheinter.net/*
// @include        https://*.endoftheinter.net/*
// ==/UserScript==



var priv = document.createElement('tagged');
priv.innerHTML = ' | <a href="http://endoftheinter.net/priv.php">Private Messages</a>';
document.getElementsByTagName('div')[1].appendChild(priv);


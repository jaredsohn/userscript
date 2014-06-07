// ==UserScript==
// @name           ModTheSims Facebook Like Removal
// @namespace      http://www.fluffy-demons.net/
// @description    This script removes the facebook like button from all pages on www.modthesims.info
// @include        http://modthesims.info/*
// @include        http://*.modthesims.info/*
// @exclude        http://chii.modthesims.info/*
// @exclude        http://skuld.modthesims.info/*
// @exclude        http://static-files*.modthesims.info/*
// ==/UserScript==

var fbLikeSpan = document.getElementById('facebooklike');
// Nuke the contents of the span so it doesn't get background loaded
fbLikeSpan.innerHTML = '';
// Then hide the span
fbLikeSpan.style.display = 'none';
// ==UserScript==
// @name           Remove Elance ShareThis link
// @namespace      Remove ShareThis of Elance
// @description    The ShareThis link on Elance project description page is so annoying. You can get rid of the link by this simple script
// @include        http://www.elance.com/*
// ==/UserScript==
sharethis = document.getElementById('sharethis');
sharethis.parentNode.removeChild(sharethis);
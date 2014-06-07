// ==UserScript==
// @name           govorimpro_old_to_new_url_redirect
// @namespace      DV2009_UA.govorimpro.redirect.old_to_new_url
// @description    Redirect from http://www.govorimpro.us/forum/showthread.php to http://www.govorimpro.us/showthread.php
// @include        http*://*govorimpro.us/forum/showthread.php*
// ==/UserScript==

document.location.href = document.location.href.replace('govorimpro.us/forum/showthread.php', 'govorimpro.us/showthread.php');



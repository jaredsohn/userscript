// ==UserScript==
// @name           d2jsp script
// @namespace      http://muszek.com
// @description    skips the redirect page
// @include        http://forums.d2jsp.org/r.php
// @version        1.0
// ==/UserScript==

var llink = document.documentElement.getElementsByTagName( "a" );
window.location = llink[0].getAttribute('href');

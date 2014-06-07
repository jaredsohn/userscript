// ==UserScript==
// @name           Open MWAP and MWAH in two windows.
// @include        http://www.facebook.com/home.php
// @exclude        http://www.facebook.com/home.php?filter=app_10979261223&show_hidden=true

// ==/UserScript==


window.location="http://apps.facebook.com/inthemafia/index.php";
onload = function () {location.reload()};
GM_openInTab("http://www.facebook.com/home.php?filter=lf&filter=app_10979261223&show_hidden=true")

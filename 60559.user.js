// ==UserScript==
// @name           Redirect Facebook To Mafia Wars And Open help script
// @include        http://www.facebook.com/home.php*
// @exclude        http://www.facebook.com/home.php?filter=app_10979261223&show_hidden=true

// ==/UserScript==



window.location="http://apps.facebook.com/inthemafia/";
onload = function () {location.reload()};

GM_openInTab("http://www.facebook.com/home.php?filter=app_10979261223&show_hidden=true")
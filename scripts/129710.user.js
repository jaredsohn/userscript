// ==UserScript==
// @name            Fanfiction.net Favorite Auto-login
// @description     Skips past interim page on FF.N favorite/alert page.
// @namespace       rimmington
// @include         https://www.fanfiction.net/fav_add.php?*
// ==/UserScript==

unsafeWindow.location.href = unsafeWindow.document.getElementsByTagName('a')[0].href;
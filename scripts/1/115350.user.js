// ==UserScript==
// @name           Game Only
// @namespace      http://echo.waw.pl/
// @include        http://www.gry.pl/gra/Wiejskie-Zycie.html*
// @include        http://www.gamesgames.com/game/Family-Barn.html*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

jQuery("body").append(
 jQuery('<div id="iframe_wrapper"> </div>')
);
jQuery("#iframe_wrapper").append(
  jQuery("#socialgame")
);
jQuery("#layout-container").remove();




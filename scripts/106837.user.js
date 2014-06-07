// ==UserScript==
// @name           Show Skin previews
// @namespace      http://userscripts.org/users/212524
// @description    Bring minecraft.net skin previews back again!
// @include        http://www.minecraft.net/skin/skin.jsp?user=*
// ==/UserScript==

unsafeWindow.$('.oneColeDiv p:eq(0)')
  .html('<iframe width="550" height="500" style="border: none" src="http://minecraft.novaskin.me/preview#' + 
    location.search.match(/user=(\w+)/)[1] + '"/>');
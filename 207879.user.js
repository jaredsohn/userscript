// ==UserScript==
// @name        farm
// @namespace   jeff
// @description farm
// @include     http://*.tribalwars.nl/game.php?*&screen=am_farm
// @exclude     javascript:void
// @exclude     $("a[class*='farm_icon_']").click(
// @exclude     function(){$(this).parent().parent().remove();});javascript:void
// @exclude     $("img[src*='attack.png']").parent().parent().remove();
// @version     1
// @grant       none
// ==/UserScript==

javascript:void $.each($("img[src*='attack.png']"), function(index, value){var id = $(this).parent().parent().attr('class');id = id.split('_');id = id[id.length - 1];$('.report_' + id).remove();});
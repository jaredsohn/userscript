// ==UserScript==
// @name            Full Inventory
// @author          HurPo
// @description     Moswar JS
// @namespace       *
// @version         1.2
// @include         http://www.moswar.ru/home/
// @include         http://www.moswar.ru/home/collections/
// @include         http://www.moswar.ru/nightclub/shakes/
// @run-at          document-end
// ==/UserScript==
  
javascript:function showFullInventory() {$(".object-thumbs").css({height:"auto",overflow:"hidden"}); $(".hint").remove();} showFullInventory();
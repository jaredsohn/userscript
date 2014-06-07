// ==UserScript==
// @name            SW Inventory
// @author          hamalin
// @description     No Scroll Invertory
// @version         v 0.1
// @include         http://*sofiawars.com/player/* 
// @run-at          document-end
// ==/UserScript==

function showFullInventory() {$(".object-thumbs").css({height:"auto",overflow:"hidden"}); $(".hint").remove();} showFullInventory();

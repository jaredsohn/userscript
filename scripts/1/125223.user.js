// ==UserScript==
// @name       инвентарь
// @namespace  
// @version    0.1
// @description  enter something useful
// @include         http://*moswar.ru/phone/*
// @include         http://*moswar.ru/player/*
// @include         http://*moswar.ru/clan/*
// @include         http://*moswar.ru/home/*
// @exclude         http://*moswar.ru/home/collection/*
// @copyright  2011+, You
// ==/UserScript==

//открытый инвентарь
function showFullInventory() {$(".object-thumbs").css({height:"auto",overflow:"hidden"}); $(".hint").remove();} showFullInventory();         
    
    

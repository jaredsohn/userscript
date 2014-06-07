// ==UserScript==
// @name            MosWar full
// @author          Romzik
// @description     MosWar full
// @version         1.0
// @include         http://*moswar.ru/home/* 
// @include         http://*moswar.ru/nightclub/shakes/*
// @run-at          document-end
// ==/UserScript==

javascript:function showFullInventory() {$(".object-thumbs").css({height:"auto",overflow:"hidden"}); $(".hint").remove();} showFullInventory();
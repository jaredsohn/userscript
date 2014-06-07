// ==UserScript==
// @name           Worldofwar.se Blacktop Remover
// @namespace      worldofwar.se
// @description    Tar bort det svarta utrymmet och bannern i toppen av worldofwar.se. //Althalus
// @include        http://www.worldofwar.se/
// @include        http://worldofwar.se
// @include        http://www.worldofwar.se/*
// @include        http://worldofwar.se/*
// ==/UserScript==

var adSidebar = document.getElementById('bannerTOP');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
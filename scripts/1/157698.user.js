// ==UserScript==
// @name           Pdarckelviz
// @namespace      http://userscripts.org/
// @description    Nd.
// @include        http://*.pokemon-vortex.com/*
// @exclude        http://*.pokemonvortex.org/adv.php*
// @exclude        http://*.pokemonvortex.org/ads2.htm
// ==/UserScript==


];
(function() {

    var dlh=document.location.href.toString();

    //buttons some times show up in the ads located in an iframe
    //dont run in a frame
    if(unsafeWindow.self!=unsafeWindow.top) return;

    var timeOuts={
        battleButton:0,
        moveAround:0,
        session:0,
        battleLoop:0
    }

    createButtons();

    var direction={
      
            direction.setDir();
            return(false);
        },
        r
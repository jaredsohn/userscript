// ==UserScript==
// @name          navigator.registerProtocolHandler Remover
// @author        TNT
// @description   Remove navigator.registerProtocolHandler from Yanoo Mail pages.
// @icon          https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config_icon_large.png
// @include       https://*.mail.yahoo.com/*
// @version       1.0
// @run-at        document-start
// ==/UserScript==

// check if browser support API
if(navigator.registerProtocolHandler){
    // replace standart API with fake one
    navigator.registerProtocolHandler = function(a, b, c){
        console.log("navigator.registerProtocolHandler is invoked with these parameters: "+a+", "+b+", "+c);
        // fuck you Yahoo
        return false;
    }
}
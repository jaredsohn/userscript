// ==UserScript==
// @name        Steam inventory price check
// @namespace   http://www.vplghost.com
// @version     1.1.3
// @author      VplGhost
// @description Display items' price from Community market inside inventory
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     http://steamcommunity.com/id/*/inventory
// @include     http://steamcommunity.com/id/*/inventory/*
// @include     http://steamcommunity.com/profiles/*/inventory
// @include     http://steamcommunity.com/profiles/*/inventory/*
// @updateURL   http://vplghost.com/download/inventscript.user.js
// @downloadURL http://vplghost.com/download/inventscript.user.js
// @resource    scriptFile http://vplghost.com/download/inventscript.js
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_getResourceURL
// ==/UserScript==


function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", GM_getResourceURL('scriptFile'));

    //script.addEventListener('load', function () {
    //    var script = document.createElement("script");
    //    script.textContent = "window.$J=jQuery.noConflict(true);(" + callback.toString() + ")();";
    //    document.body.appendChild(script);
    //}, false);

    document.body.appendChild(script);
}

var main = function () {

};


// load jQuery and execute the main function
addJQuery(main);
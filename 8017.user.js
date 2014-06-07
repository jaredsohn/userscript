// ==UserScript==
// @name           Google 100
// @namespace      http://manuelseeger.de
// @description    Set how many results per page Google should show
// @include        http://*google.*
// @exclude        http://maps.google.*
// ==/UserScript==
(function(){


var setprefs = function(e) {
    var rpp = prompt("Results per page Google should show (1-100):", 
                      GM_getValue("results_per_page"));
    if (rpp == null) return;
    
    while (isNaN(rpp) || rpp < 0 || rpp > 100) {
        alert("Sorry, please enter a number between 1 and 100");
        rpp = prompt("Results per page Google should show (1-100):", rpp);
        if (rpp == null) return;
    }
    GM_setValue("results_per_page", rpp);
}

GM_registerMenuCommand("Set Google results per page", setprefs);

var hidden_param = document.createElement('input');
hidden_param.setAttribute('type', 'hidden');
hidden_param.setAttribute('name', 'num');

var rpp = GM_getValue("results_per_page");
if (typeof(rpp) == "undefined") {
    GM_setValue("results_per_page", 100);
    rpp = 100;
}
hidden_param.setAttribute('value', rpp);
document.forms[0].appendChild(hidden_param);
})();
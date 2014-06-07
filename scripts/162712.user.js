// ==UserScript==
// @name       citibank-keepass
// @namespace  https://online.citibank.com/*
// @version    0.1
// @description  makes citibank work with keepass(x) autotype. 
//               keepass db entry comment requires line "Auto-Type:{TAB}{USERNAME}{TAB}{PASSWORD}"
// @match      https://online.citibank.com/*
// @copyright  2013+, Karl Hungus
// ==/UserScript==

function on(tag) {
    var elements = document.getElementsByTagName(tag);
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.getAttribute('type') == 'text')
        {
            element.removeAttribute('onkeydown'); 
        }
    }
}

on('input');

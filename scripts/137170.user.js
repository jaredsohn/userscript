// ==UserScript==
// @name           Leite's Culinaria - Automatically submit entries
// @description    Automatically submits entries for Leite's Culinaria, assuming the form has already been filled out
// @version        1.0
// @author         nick761
// @include        http://leitesculinaria.com/*/giveaways*
// ==/UserScript==

window.setTimeout(runScript, 1000);

function runScript() {
    document.forms[1].submit()
}
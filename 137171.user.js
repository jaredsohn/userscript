// ==UserScript==
// @name           Woman's World - Automatically submit entries
// @description    Automatically submits entries for Woman's World, assuming the form has already been filled out
// @version        1.0
// @author         nick761
// @include        http://winit.womansworldmag.com/enter/drawing*
// ==/UserScript==

window.setTimeout(runScript, 1000);

function runScript() {
    document.getElementById('enterButton').click();
}
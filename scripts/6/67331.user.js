// ==UserScript==
// @name           ASU Pipeline Browser Prompt Bypass
// @namespace      MrNerdHair
// @description    Bypasses the "Browser not supported" prompt issued by Pipeline on the Augusta State University website.
// @include        http*://pipeline.aug.edu/cp/home/check/post?supported=false
// ==/UserScript==

function pressContinue() {
    var script = document.createElement("script");
    script.type = "application/javascript";
    script.textContent = "doContinue('support');";

    document.body.appendChild(script);
}

window.addEventListener("load", pressContinue, false);

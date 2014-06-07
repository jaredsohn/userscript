// ==UserScript==
// @include        http://www.xanga.com/private/homemain.aspx*
// @name           MoveFeedbackLogUp
// @namespace      https://xanga.noandwhere.com/userscripts/
// ==/UserScript==

function MoveFeedBackLogUp() {
    document.getElementById("side1").insertBefore(document.getElementById("module--64"), document.getElementById("module--3"));
}

//MoveFeedBackLogUp();
window.addEventListener("load", MoveFeedBackLogUp, false)


// ==UserScript==
// @name           crucible_line_toggle
// @namespace      crucible
// @description    Toggle line numbering in Crucible
// @version        1.0
// @include        http://crucible.*
// @author         Charlie Smith and Mark Cottrell
// @email          r.charles.smith@gmail.com
// @updateURL      https://raw.github.com/emeraldo/crucible-line-toggle/master/crucible-line-toggle.js
// ==/UserScript==

var isLineNumberingOff = false;
var nodes = null;

// Thanks Gary Sieling - http://www.garysieling.com/blog/javascript-to-remove-line-number-author-revision-columns-from-fisheyecrucible
function storeNodes () {
    nodes = document.body.querySelectorAll(".tetrisColumn, .diffNav, .revision, .diffLineNumbers, .diffLineNumbersA, .diffLineNumbersB");
}

window.addEventListener("DOMContentLoaded", storeNodes, false);

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(storeNodes);

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document.getElementById("frxs"), {
  subtree: true,
  attributes: true
});

switch_button = document.createElement("button")
switch_button.id = "line-toggle-button"
switch_button_text = document.createTextNode("Hide line numbers")
switch_button.appendChild(switch_button_text)

switch_button.onclick = function() { 
    if (isLineNumberingOff) {
        for (var i = 0; i < nodes.length; i++)
        {
            nodes[i].style.display = "";
        }
        but = document.getElementById("line-toggle-button");
        but.innerHTML = "Hide line numbers"
        isLineNumberingOff = false;
    }
    else {
        for (var i = 0; i < nodes.length; i++)
        {
            nodes[i].style.display = "none";
        }
        but = document.getElementById("line-toggle-button");
        but.innerHTML = "Show line numbers"
        isLineNumberingOff = true;
    }
};
var toolbar = document.getElementsByClassName("toolbar")[0]
toolbar.appendChild(switch_button);
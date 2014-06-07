// ==UserScript==
// @name        Hide comment on minus
// @namespace   hide_on_minus
// @include     http://www.wykop.pl/link/*
// @version     1
// @grant       none
// ==/UserScript==

function main() {
    $('.icon.mini.minus.disabled')
        .filter(function(){ return ($('.icon.mini.plus.disabled', $(this).parent()).length === 0);})
        .closest('li')
        .addClass('hidden');
}

var script = document.createElement("script"); 
script.textContent = "(" + main.toString() + ")();"; 
document.body.appendChild(script);
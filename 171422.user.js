// ==UserScript==
// @name       ChessPro Live arrow navigation
// @version    0.2
// @description Use left and right arrow keyboard buttons to go to previous/next step.
// @match      http://www.chesspro.ru/*
// @match      http://chesspro.ru/*
// @copyright  2013+, leventov
// ==/UserScript==

function main() {
    window.onload = function () {
        window.onkeydown = function (e) {
            var key = e.keyCode || e.which;
            if (key == 37) {
                window.parent.comment.lookpreviousstep();
            } else if (key == 39) {
                window.parent.comment.looknextstep();
            }
        };
    };
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
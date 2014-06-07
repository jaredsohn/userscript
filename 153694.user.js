// ==UserScript==
// @name        Move to Top repair
// @namespace   http://userscripts.org/users/broken-pen/113977
// @description A temporary fix for the vanished move-to-top button on queued posts.
// @include     http://www.tumblr.com/blog/*/queue*
// @version     1
// ==/UserScript==

(function(){
    
    function map_arrows(ds) {
        arrows = document.getElementsByClassName("move_to_top");
        for(i = 0; i < arrows.length; ++i) {
            arrows[i].style.display = ds;
        }
    }
    
    function keydown(evt){
        if (!evt) {
            evt = event;
        }
        if (evt.altKey){
            map_arrows("block");
            show_arrows = true;
        }
    }

    function keyup(evt){
        if (!evt) {
            evt = event;
        }
        if (!evt.altKey && show_arrows){
            map_arrows("none");
            show_arrows = false;
        }
    }

    show_arrows = false;
    document.onkeydown = keydown;
    document.onkeyup = keyup;
})()

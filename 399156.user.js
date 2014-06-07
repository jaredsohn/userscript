// ==UserScript==
// @name        Gridify U18chan
// @description Modifies thread views to contain Only images, in a grid formation.
// @author      Magi
// @icon        https://u18chan.com/uploads/user/pawstika_thumb_U18chan.png
// @include     https://u18chan.com/board/u18chan/*
// @grant       none
// ==/UserScript==

(function() { // scope guard
    'use strict';
    

    var elems = Array.prototype.slice.call(document.querySelectorAll("table.ReplyBoxTable"), 0);
    elems.forEach(function(o) {
        var l = o.querySelector(".ReplyContentOuterImage img.lazy");
        if (l == null) {
            o.parentElement.removeChild(o);
        }
        else {
            var n = document.createElement('span');
            n.innerHTML = imgblock(l.getAttribute("data-original"), l.parentElement.href);
            o.parentElement.replaceChild(n, o);
        }
    });
    
    var e = document.querySelector('.OmissionText');
    for (var i=0; i<20; i++) {
        e.parentElement.insertBefore(document.createElement('br'), e.nextSibling);
    }
    
    /*
    window.addEventListener("load", function() {
        setTimeout(function() {
           unsafeWindow.jQuery('.lazy img').lazyload({
                threshold : 750
           });
        }, 500);
    });
    */
    

    // -- functions below

    function imgblock(smallImgUrl, bigImgUrl) {
        return '\
    <a style="width:200px; height:200px; display:inline-flex; justify-content:center; align-items:center" class="ReplyBoxTable ReplyBox lazy" href="'+ bigImgUrl +'"> \
        <span> \
            <img style="display:block; max-width:190px; max-height:190px" src="'+ smallImgUrl +'"> \
        </span>\
    </a>';
    }


})(); // scope guard

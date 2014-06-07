// ==UserScript== 
// @name        ChristianCafe Helper
// @author      Michael Soh 
// @namespace   christian-cafe-helper-SJNMMFP08Q
// @description Helps you navigate on ChristianCafe
// @version     0.2
// @license     GPL 3.0 
// @include     https://www.christiancafe.com/*
//
// @grant       GM_log
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
//
//  
// ==/UserScript== 
var j$ = 0;
load_jQuery();


// =-=-=-=-=- MAIN FUNCTIONS -=-=-=-=-= //

function load_jQuery() {
    if (typeof jQuery !== "undefined") {
        if (typeof $ !== "undefined")
            j$ = $;
        else 
            j$ = jQuery.noConflict();

        expand_images();
    } else if (++j$ < 5) {
        GM_log('jQuery == ' + typeof jQuery);
        setTimeout(doDetect, 1500);
    } else {
        alert('jQuery timed out: ' + j$);
    }
}

function expand_images() {
    j$('.imageLink').each(function() {
        var img = j$(this).attr('onmouseover');

        var regexp = new RegExp("src=\\\\'(https:.*jpg)\\\\'");
        var match = regexp.exec(img);

        if (match != null) {
            GM_log("Changed.");
            src = match[1];
            j$(this).find('img').first().attr('src', src);
            j$(this).find('img').first().removeAttr('width');
            j$(this).find('img').first().removeAttr('height');
            j$(this).removeAttr('onmouseover');
        } else {
            GM_log("no match found for " + img);
        }
    });

    j$('img[id^="photo_"]').each(function() {
        var regexp = new RegExp("photo_(.*jpg)");
        var match = regexp.exec(this.id);

        if (match != null) {
            GM_log("Changed.");
            src = match[1];
            this.src = src;
            this.removeAttribute('width');
            this.removeAttribute('height');
            this.removeAttribute('onmouseover');
        } else {
            GM_log("no match found for " + img);
        }
    });
}

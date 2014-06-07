// ==UserScript==
// @name       Empornium Description Blockquote Expander
// @namespace  http://metalfrog.us/scripts
// @version    0.1
// @description    Some users post descriptions with the screenshots hidden in spoilers. This expands them automatically. Might be rough on pages with a lot of images, but I haven't had a problem yet.
// @match      *://torrents.empornium.me/*
// @copyright  2013+, Keith J. Frank, keithjfrank@gmail.com
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
window.addEventListener("DOMContentLoaded", function() {
    $('#descbox.body > blockquote.spoiler').each( function(){
        $(this).toggleClass('hidden');
    });
}, false);

// ==UserScript==
// @name       Empornium Thanks Checker
// @namespace  http://metalfrog.us/scripts
// @version    0.1
// @description  Adds a banner to the page saying that you've thanked a torrent uploader to alleviate duplicate downloads
// @match      http://torrents.empornium.me/*
// @copyright  2012+, Keith J. Frank, keithjfrank@gmail.com
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
window.addEventListener("DOMContentLoaded", function() {
    if( $('#thanksbutton').is(':visible') === false ){
        $('.details').prepend('<h2 style="color:#fff; background: -webkit-linear-gradient(top, #c54949 0%,#933333 100%) !important; border-color:#732525 !important;">You have thanked the uploader for this torrent previously</h2>');
    }
}, false);

// ==UserScript==
// @name       Hide activity logs in Trello comments
// @namespace  http://taher-zadeh.com/
// @version    0.1
// @description  hides the logs from trello, leaves the rest untouched
// @match      https://trello.com/*
// @copyright  Public domain
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

jQuery(document).ready(function() {
    setTimeout(function(){
        jQuery('.phenom').not(':has(.action-comment), :has(img.attachment-image-preview)').hide();   
    },1000);
});
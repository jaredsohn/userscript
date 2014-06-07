// ==UserScript==
// @name       MTurk Auto-Accept changer for mturkgrind.com
// @version    0.1
// @description  Changes "preview" links to "previewandaccept" on the mturkgrind forum.
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @match      http://www.mturkgrind.com/*
// @copyright  2013+, You
// ==/UserScript==

$(function(){
    $('a').each(function() {
        if (this.href.indexOf("preview?") !== -1)
            $(this).attr('href', this.href.replace("preview?", "previewandaccept?"));
    });
});
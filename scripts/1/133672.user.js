// ==UserScript==

// @author        anthony <bakayarou@gmail.com>
// @name          reddit comment auto-expand
// @description   auto-expand a comment on mouseover instead of mouseclick
// @include       http://www.reddit.com/r/*/comments/*
// @grant         none

// ==/UserScript==

var $ = unsafeWindow.jQuery;

$('div.commentarea').on('DOMNodeInserted', function(event){
    $(event.target).find('span.morecomments > a').each(function(){
        $(this).attr('onmouseover', $(this).attr('onclick'));
    });
});

$('span.morecomments > a').each(function(){
    $(this).attr('onmouseover', $(this).attr('onclick'));
});


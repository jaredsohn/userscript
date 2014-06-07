// ==UserScript==
// @author	  anthony
// @name          Twitch.tv infinite scroll
// @grant         none
// @require       https://gist.github.com/BrockA/2625891/raw/waitForKeyElements.js
// @include       http://*.twitch.tv/directory/*
// ==/UserScript==

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 && rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
    );
}
waitForKeyElements('span.js-text,div.drag-handle',function(){
    var scrollBar = document.getElementsByClassName('drag-handle')[1];
    var more = document.getElementsByClassName('js-text')[0];
    $(scrollBar).on('DOMAttrModified', function(){
        if (isElementInViewport(more)){
            $(more).click();
        }
    });
});
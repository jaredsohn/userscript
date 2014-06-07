// ==UserScript==
// @name       Reddit Autoexpander
// @namespace  lainscripts_reddit_autoexpander
// @version    0.2
// @description  Expands comments
// @match      http://reddit.com/*
// @match      http://*.reddit.com/*
// @match      https://reddit.com/*
// @match      https://*.reddit.com/*
// @copyright  2014+, lainverse
// ==/UserScript==

function clickViewAll(btn) {
    function clickIt() {
        if (btn.innerHTML.search("view") != -1) {
            var ev = document.createEvent("MouseEvents");
            ev.initEvent("click",true,true);
            btn.dispatchEvent(ev);
        } else setTimeout(clickIt,100);
    }
    clickIt();
}

function viewAllImages() {
    var btn = document.querySelector("#viewImagesButton");
    if (btn) clickViewAll(btn);
    else setTimeout(viewAllImages,100);
}

viewAllImages();
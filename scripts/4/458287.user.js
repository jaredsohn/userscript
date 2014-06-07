// ==UserScript==
// @name        khanacademy_hint_disable
// @namespace   https://www.khanacademy.org/math/
// @description khanacademy hint disable
// @version     1
// @grant       none
// @include https://www.khanacademy.org/math/*
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @run-at document-end
// ==/UserScript==


setInterval (
    function () {
        if (    this.lastPathStr  !== location.pathname
            ||  this.lastQueryStr !== location.search
            ||  this.lastPathStr   === null
            ||  this.lastQueryStr  === null
        ) {
            this.lastPathStr  = location.pathname;
            this.lastQueryStr = location.search;
            disableHintBtn();
        }
    }
    , 222
);

function disableHintBtn() {
    
    waitForKeyElements ("#hint", 
    function(){
        setTimeout(function(){document.getElementById("hint").disabled=true;},1000)}
    ,true);  
}

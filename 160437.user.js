// ==UserScript==
// @name       Zerg Defense
// @namespace  http://mobilecoder.wordpress.com
// @version    1.0
// @description  The Zerg Rush is coming, prepare yourself with this handy script. Scans for and destroys all zerglings in half second intervals.
// @match      https://www.google.com/search?q=zerg+rush*
// ==/UserScript==

var doMouseEvent = function(element, args) {
    var event = document.createEvent("MouseEvents");
    event.initEvent.apply(event, Array.prototype.slice.call(arguments, 1));
    element.dispatchEvent(event);
};

setInterval(seekAndDestroy, 500);

function seekAndDestroy(){
    var zergs = document.getElementsByClassName("zr_zergling_container")
    for(var zergI = 0; zergI < zergs.length; zergI++){
        for(clickI = 0; clickI < 3; clickI++){
            doMouseEvent(zergs[zergI], 'mousedown');
        }
    }
}
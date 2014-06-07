// ==UserScript==
// @name           reverse LDR pins
// @namespace      http://fuba.s7.xrea.com
// @description    Reverse the order of LDR pins when you open them.
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

// This script is from http://twitter.com/kentaro/statuses/138565372
// Thanks to @kentaro

(function(){
    with(unsafeWindow){
        pin.__open_group = pin.open_group;
        pin.open_group = function () {
            pin.pins.reverse();
            pin.__open_group();
        } 
    }
})();

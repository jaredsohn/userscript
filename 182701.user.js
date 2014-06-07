// ==UserScript==
// @name       edX calculator disable
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://courses.edx.org/courses/MITx/8.01x/2013_SOND/courseware/Week_*/hw*/
// @copyright  2012+, You
// ==/UserScript==

var cache = $('.calc-main')

if (cache.length != 0){


    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 120) {
            $('.calc-main').html('')
        }      
    };
}
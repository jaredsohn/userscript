// -*- coding: utf-8 -*-
// ==UserScript==
// @name           TextageScoreEditor
// @namespace      https://github.com/temmings
// @description    TexTage IIDX 譜面集のノートをマウスで移動する
// @match          http://textage.cc/score/*/*
// @version        0.1
// ==/UserScript==

(function() {
    var dragging = false;
    var offsetY;
    var targetImg;

    function drag(event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e) {
            var self = e.target || e.srcElement;

            if (dragging) {
                targetImg.style.top = parseInt(targetImg.style.top, 10) + (e.clientY - offsetY) + 'px';
                offsetY = e.clientY;
            }

            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
        }
    }

    function dragOn(event) {
        dragging = true;
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e) {
            var self = e.target || e.srcElement;
            offsetY = e.clientY;
            document.addEventListener('mousemove', drag, false);
            targetImg = self;

            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
        }
    }

    function dragOff(event) {
        dragging = false;
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e) {
            document.removeEventListener('mousemove', drag, false);

            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
        }
    }

    function moveWheel(event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e) {
            var self = e.target || e.srcElement;
            var delta = e.detail || -e.wheelDelta;
            self.style.top = parseInt(self.style.top, 10) + ((0 < delta) ? 1 : -1) + 'px';

            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
        }
    }

    function isNoteImg(img) {
        return img.src.match(new RegExp('.+/score/(w|b|s|lw|lb|ls)\.gif$'));
    }

    // main
    var imgs = document.getElementsByTagName('img');
    for (var i = 0, img; img = imgs[i]; ++i){
        if (isNoteImg(img)) {
            img.addEventListener('mousewheel', moveWheel, false);
            img.addEventListener('DOMMouseScroll', moveWheel, false);
            img.addEventListener('mousedown', dragOn, false);
            img.style.zIndex = 1; // stop move under div.
        }
    }
    document.addEventListener('mouseup', dragOff, false);
})();

// ==UserScript==
// @name           Google Reader shortcut keys on facebook (J,K,N and R)
// @namespace      http://lusikas.com
// @description    J & N for next, K for previous and R for reload
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// ==/UserScript==
/*
 *  Should work/ tried with:
 *            Chrome (14.0.803.0 (Official Build 90483) dev)
 *            Firefox (5.0)
 *
 * */
(function(window, document) {
    var start = -1,
        lastHast = location.hash,
        lastElem = null,
        highlight = function(theElement) {
            theElement.style.background = '#EFEFEF';
        },
        donthightlight = function(theElement) {
            theElement.style.background = '#FFF';
        },
        ScrollToElement = function(theElement) {
            if (lastElem !== null) {
                donthightlight(lastElem);
            }
            highlight(theElement);
            lastElem = theElement;
            var selectedPosX = 0,
                selectedPosY = 0;
            while (theElement !== null) {
                selectedPosX += theElement.offsetLeft;
                selectedPosY += theElement.offsetTop;
                theElement = theElement.offsetParent;
            }
            if (selectedPosY > 50) {
                selectedPosY -= 50;
            }
            window.scrollTo(selectedPosX, selectedPosY);
        },
        fireEvent = function(obj, evt) {
            var fireOnThis = obj;
            if (document.createEvent) {
                var evObj = document.createEvent('MouseEvents');
                evObj.initEvent(evt, true, false);
                fireOnThis.dispatchEvent(evObj);
            } else if (document.createEventObject) {
                fireOnThis.fireEvent('on' + evt);
            }
        },
        check_key = function(e) {
            var srcElement = e.srcElement ? e.srcElement : e.target;
            if (srcElement.tagName != 'INPUT' && srcElement.tagName != 'TEXTAREA') {
                if (lastHast != location.hash) {
                    start = -1;
                    lastHast = location.hash;
                }
                var KeyID = e.keyCode,
                    before = start,
                    elems = document.getElementsByClassName('uiUnifiedStory') || document.getElementsByClassName('uiStreamStory');
                if (KeyID == 82) {
                    location.reload();
                    return false;
                } else if (start == -1) {
                    start = 0;
                } else if (KeyID == 74 || KeyID == 78) {
                    if (start + 1 < elems.length) {
                        start += 1;
                        ScrollToElement(elems[start]);
                    }
                } else if (KeyID == 75) {
                    if (start - 1 >= 0) {
                        start -= 1;
                        ScrollToElement(elems[start]);
                    }
                } else {
                    return false;
                }
                if ((before === start && start !== 0) || start === elems.length - 6) {
                    var more = document.getElementsByClassName('uiMorePager');
                    if (more) {
                        if (document.getElementsByClassName('uiMorePager')[0].getElementsByTagName('a')) {
                            fireEvent(document.getElementsByClassName('uiMorePager')[0].getElementsByTagName('a')[0], 'click');
                        }
                    }
                }
            }
        };
    window.addEventListener("keydown", check_key, true);
})(window, window.document);
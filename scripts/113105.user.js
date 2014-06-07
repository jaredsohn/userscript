// ==UserScript==
// @name           jQuery simulateMouseEvent For Scripts
// @namespace      http://userscripts.org/
// @description    [DON'T INSTALL IT] - this just for inclusion in other scripts !!!! §Please make sure that your script have included jQuery first.
// @author         birdhackor
// @version        0.1
//
//
// @history        0.1     First version. Have 'mouseover','click','mouseout' method.
//
// ==/UserScript==

;(function ($) {
        $.fn.simulateMouseEvent = function (eventType) {
                return this.each(function () {
                        var clickEvent;
                        var element = this;
                        switch (eventType) {
                        case 'mouseover':
                                clickEvent = document.createEvent("MouseEvents");
                                clickEvent.initEvent("mouseover", true, true);
                                element.dispatchEvent(clickEvent);
                                break;
                        case 'click':
                                clickEvent = document.createEvent("MouseEvents");
                                clickEvent.initEvent("mousedown", true, true);
                                element.dispatchEvent(clickEvent);

                                clickEvent = document.createEvent("MouseEvents");
                                clickEvent.initEvent("click", true, true);
                                element.dispatchEvent(clickEvent);

                                clickEvent = document.createEvent("MouseEvents");
                                clickEvent.initEvent("mouseup", true, true);
                                element.dispatchEvent(clickEvent);
                                break;
                        case 'mouseout':
                                clickEvent = document.createEvent("MouseEvents");
                                clickEvent.initEvent("mouseout", true, true);
                                element.dispatchEvent(clickEvent);
                                break;

                        }
                });
        }
})(jQuery);

/*function simulateMouseOver(element) {
        var clickEvent;
        clickEvent = document.createEvent("MouseEvents")
        clickEvent.initEvent("mouseover", true, true)
        element.dispatchEvent(clickEvent);
}

function simulateClick(element) {
        var clickEvent;
        clickEvent = document.createEvent("MouseEvents")
        clickEvent.initEvent("mousedown", true, true)
        element.dispatchEvent(clickEvent);

        clickEvent = document.createEvent("MouseEvents")
        clickEvent.initEvent("click", true, true)
        element.dispatchEvent(clickEvent);

        clickEvent = document.createEvent("MouseEvents")
        clickEvent.initEvent("mouseup", true, true)
        element.dispatchEvent(clickEvent);
}

function simulateMouseOut(element) {
        var clickEvent;
        clickEvent = document.createEvent("MouseEvents")
        clickEvent.initEvent("mouseout", true, true)
        element.dispatchEvent(clickEvent);
}*/
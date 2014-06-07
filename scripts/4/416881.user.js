// ==UserScript==
// @name       Google voice text keyboard send
// @namespace  
// @version    0.4
// @description Ctrl + enter sends google voice text messages
// @match      https://www.google.com/voice/b/0*
// @copyright  2014+, Eric Williams
// ==/UserScript==


var clickSendButton = function(e) {
    // get send button div for current textarea
    var ele = document.activeElement.parentElement.querySelector('.gc-message-sms-send');
    
    // fire our various events when passed
    var dispatchMouseEvent = function(target, event) {
        var e = document.createEvent("MouseEvents");
        
        // create params array for initEvent
        var opts = [true, true];
        opts.unshift(event);
        
        e.initEvent.apply(e, opts);
        target.dispatchEvent(e);
    };
    
    // simulate full-on click of the div
    var mouseClick = function(ele) {
        dispatchMouseEvent(ele, 'mouseover');
        dispatchMouseEvent(ele, 'mousedown');
        dispatchMouseEvent(ele, 'click');
        dispatchMouseEvent(ele, 'mouseup');
    };
    
    mouseClick(ele);
};

// fire on ctrl + enter
window.onkeyup = function(e) {
    if (e.keyCode == 13 && e.ctrlKey) {
        clickSendButton(e);
    }
};

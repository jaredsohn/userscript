// ==UserScript==
// @name           slideshare ad close
// @namespace      http://efcl.info/
// @description    Auto close slideshare's ad
// @include        http://www.slideshare.net/*
// ==/UserScript==
GM_addStyle(String(<>
    <![CDATA[
    .playerAd{
        display : none!important;
    }
]]></>));
window.addEventListener("load", function() {
    var closeButton = document.querySelector(".closeThis");
    dispatchMouseEvents({ type:'click', target:closeButton, button:0 });
}, false);

function dispatchMouseEvents(opt) {
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent(opt.type, opt.canBubble || true, opt.cancelable || true, opt.view || window,
            opt.detail || 0, opt.screenX || 0, opt.screenY || 0, opt.clientX || 0, opt.clientY || 0,
            opt.ctrlKey || false, opt.altKey || false, opt.shiftKey || false, opt.metaKey || false,
            opt.button || 0, opt.relatedTarget || null);
    opt.target.dispatchEvent(evt);
    return evt;
}

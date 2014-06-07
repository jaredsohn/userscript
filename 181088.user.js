// ==UserScript==
// @name FB Like Detector
// @author redphx
// @description Dùng để phát hiện site nào dùng like FB ẩn
// @version 1.0.1
// @namespace http://codekiem.com
// @include http://*/*
// @include https://*/*
// @run-at document-end
// ==/UserScript==

var MAX_TIMES = 20;

var timeout;
var checkTimes = 0;
var found = false;

var check = function(e) {
    timeout && clearTimeout(timeout);
    if (found || checkTimes >= MAX_TIMES) {
        document.removeEventListener("mousemove", check);
        return;
    }
    timeout = setTimeout(function() {
        ++checkTimes;
        var elm = document.elementFromPoint(e.x, e.y);
        if (elm.nodeName == "IFRAME" && elm.src && elm.src.indexOf("facebook.com/plugins/like") > -1) {
            var parent = elm;
            while (parent && parent.parentNode) {
                parent = parent.parentNode;
                if (parent.style.position == "absolute" && parent.style.opacity) {
                    var opacity = parent.style.opacity;
                    if (opacity.indexOf("0") === 0 && opacity.indexOf(".") === -1) {
                        found = true;
                        console.log("Phat hien like an");
                        parent.style.removeProperty("opacity");
                        parent.style.removeProperty("width");
                        parent.style.removeProperty("height");
                        
                        setTimeout(function() {
                            parent.parentNode.removeChild(parent);
                        }, 3000);
                        break;
                    }
                }
            }
        }
    }, 1000);
}

setTimeout(function() {
    document.addEventListener("mousemove", check);
}, 3000);
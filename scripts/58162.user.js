// ==UserScript==
// @name           Nico iframe replace
// @namespace      http://efcl.info/
// @include        http://dic.nicovideo.jp/a/*
// ==/UserScript==
(function() {
    var iframes = document.getElementsByTagName("iframe");
    if (!iframes) return;
    for (var i = iframes.length - 1; i >= 0; i--) {
        if (iframes[i].hasAttribute("src")) {
            var iframeURL = iframes[i].getAttribute("src");
            if (/nicovideo\.jp\/thumb(\/|\?v=)(\w+)/.test(iframeURL)) {
                var mId = RegExp.$2;
                var imgTag = document.createElement("img");
                // http://niconail.info/
                imgTag.src = "http://tn-skr.smilevideo.jp/smile?i=" + mId.substring(2, mId.length);
                imgTag.style.border = "double";
                var aNode = document.createElement("a");
                aNode.href = "http://www.nicovideo.jp/watch/" + mId;
                aNode.appendChild(imgTag);
                var parentIframe = iframes[i].parentNode;
                parentIframe.replaceChild(aNode, iframes[i]);
            }
        }
    }
})();
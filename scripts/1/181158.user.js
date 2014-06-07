// ==UserScript==
// @name       ForceFlashHardwareAccelerate
// @match      *://*/*
// ==/UserScript==
(function () {
    function handler(e) {
        if (e.nodeType !== 1 || e.getAttribute('type') !== 'application/x-shockwave-flash') {
            return;
        }
        if (e.nodeName.toLowerCase() === 'object') {
            var o = e;
            if (o.innerHTML.length == 0)
                return;
            pos = -1;
            params = o.getElementsByTagName("param");
            for (var k = 0, l = params.length; k < l; k++) {
                if (params[k].getAttribute("name").toLowerCase() === "wmode") {
                    pos = k;
                    param = (params[k].getAttribute("value").toLowerCase() === "direct") ? null : params[k];
                    break;
                }
            }
            if (pos !== -1 && !param) {
                return;
            }
            // Add or Update if necessary
            if (pos === -1) {
                param = document.createElement("param");
                param.setAttribute("name", "wmode");
                param.setAttribute("value", "direct");
                o.appendChild(param);
            } else {
                param.setAttribute("value", "direct");
            }
            newObj = o.cloneNode(true);
            o.parentNode.replaceChild(newObj, o);
        } else if (e.nodeName.toLowerCase() === 'embed') {
            var e = e;
            if (!e.getAttribute("wmode") || (e.getAttribute("wmode") && e.getAttribute("wmode").toLowerCase() != "direct")) {
                e.setAttribute("wmode", "direct");
                newEmbed = e.cloneNode(true);
                e.parentNode.replaceChild(newEmbed, e);
                //alert(e.outerHTML);
            }
        }
            }
    document.addEventListener('DOMContentLoaded', function () {
        var objects = document.getElementsByTagName('object');
        for (var i = 0; i < objects.length; i++) {
            handler(objects[i]);
        }
        var embeds = document.getElementsByTagName('embed');
        for (var i = 0; i < embeds.length; i++) {
            handler(embeds[i]);
        }
        document.body.addEventListener('DOMNodeInsertedIntoDocument',function(event){
            handler(event.target)
        },false);
        document.body.addEventListener('DOMNodeInserted', function (event) {
            handler(event.target)
        }, false);
    }, false);
})();
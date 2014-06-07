// ==UserScript==
// @name        t61 Growl Notifications
// @namespace   http://www.media.mit.edu/~azinman
// @description Uses Fluid notifications t61 notfications
// @include     http://www.thesixtyone.com/*
// @author      Aaron Zinman
// ==/UserScript==

(function () {
    if (window.fluid) {
        var attn = function() {
            window.fluid.unhide();
            window.fluid.activate();
        }

        t61.notice.create = function(msg, icn, height, options) {
            var cleanMsg = msg.replace(/<br>/g, '\n').replace(/<br\/>/g, '\n').replace(/<br \/>/g, '\n');
            cleanMsg = cleanMsg.replace(/<a.*?>/g, "").replace(/<\/a>/g,"");
            
            // Remove any html entities
            var temp = document.createElement("div");
            temp.innerHTML = cleanMsg;
            cleanMsg = temp.childNodes[0].nodeValue;
            temp.removeChild(temp.firstChild);
            
            var growlOptions = {
                title: "thesixtyone",
                description: cleanMsg,
                priority: 1,
                sticky: false,
                onclick: attn,
                icon: icn
            };
            window.fluid.showGrowlNotification(growlOptions);
        };
    }
})();
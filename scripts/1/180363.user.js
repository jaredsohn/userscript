// ==UserScript==
// @name            Tieba.OpenTail.UserAgent
// @description     A simple user-agent tail
// @namespace       me@itianda.com
// @include         http://tieba.baidu.com/*
// @version         1.1.2
// @grant           none
// @updateURL       https://userscripts.org/scripts/source/180363.meta.js
// @downloadURL     https://userscripts.org/scripts/source/180363.user.js
// ==/UserScript==


(function(undefined) {
    window.__opentail__ = $.extend(window.__opentail__ || {}, new function() {
        var _this = this;
        var opentail = function() {return window.__opentail__ || _this};
        opentail().tails = $.extend(opentail().tails || {}, {
            'UserAgent': function(type) {
                if(type == 'fire') {
                    var environment = arguments[1];
                    var content = environment.content();
                    environment.content(content + '<br/><br/>————' + navigator.userAgent);
                }
            }
        });
    });
}).apply(window);
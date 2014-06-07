// ==UserScript==
// @name           Twitter one-column mode
// @namespace      http://www.pruzaniec.com
// @description    Reduce the desktop version of twitter to one-column to resemble client
// @version        1.1
// @include        https://twitter.com/
// @grant          none

// ==/UserScript==
    var newStyle = document.createElement('style');
    newStyle.type = 'text/css';
    newStyle.innerHTML = '\
                div.dashboard{\
                display:none;\
            }\
            div#timeline{\
                width:100%;\
            }\
            #page-container{\
                width:100%;\
                padding-left:0;\
                padding-right:0;\
            }\
            .tweet-actions.js-actions {\
                position: absolute;\
                margin-top: 1.75em;\
                width:100%;\
            }\
            .stream-item-footer {\
                margin-bottom: 1em;\
            }\
    ';
    document.getElementsByTagName('head')[0].appendChild(newStyle); 
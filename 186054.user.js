// ==UserScript==
// @name           Facebook - Show exact timestamp of comment
// @namespace      Facebook
// @description    Shows the exact timestamp of comment for facebook
// @include        https://*.facebook.com/*
// @author         Krissana Inthawongsa
// ==/UserScript==

function exactTimestamp() {
        var e;
        if (document.getElementsByTagName && document.getElementsByTagName('abbr').length > 0) {
            for ( e = 0; e < document.getElementsByTagName('abbr').length; e++) {
                document.getElementsByTagName('abbr')[e].innerHTML += ' (' + (new Date(document.getElementsByTagName('abbr')[e].getAttribute('data-utime') * 1e3)).toLocaleString() + ')';
            }
        }
    }
exactTimestamp();
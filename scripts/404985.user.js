// ==UserScript==
// @name           IframeSourceCode Example
// @version        2.6.0
// @namespace      iframeSourceCode
// @author         Fenex
// @description    http://programmersforum.ru/showthread.php?t=256366
// @include        *
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
(function() {
    if (window.self == window.top) return;
    alert(document.body.innerHTML);
})()
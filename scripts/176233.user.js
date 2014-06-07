// ==UserScript==
// @name       Soundcloud hide reposts
// @namespace  m36
// @version    0.1
// @description  hides reposts in stream
// @match      http://soundcloud.com/stream
// @match      https://soundcloud.com/stream
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2013
// ==/UserScript==
(function () {
    function norepost() { $(".soundList__item:has('.repostingUser')").remove(); }
    window.addEventListener("DOMNodeInserted",norepost, false);
})() ;
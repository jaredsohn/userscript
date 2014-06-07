// ==UserScript==
// @name       youtube Force Flash
// @namespace  http://userscripts.org/users/23003
// @version    0.2
// @description  Disables html5-codecs on youtube to force it using flash player
// @match      http://www.youtube.com/*
// @match      https://www.youtube.com/*
// @run-at     document-start
// ==/UserScript==

// Override canPlayType:
document.createElement("video").constructor.prototype.canPlayType = function(type)
{
    return ""; // We dont support any codec ;D
};
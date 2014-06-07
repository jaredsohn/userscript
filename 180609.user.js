// ==UserScript==
// @name        Fix Capture for firefox
// @description Scopes the required function to fix Capture for Jira in FF
// @author      Joel Jenvey - eDigitalResearch
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==
if (document.readyState == "loading") {
    unsafeWindow.prepAccountInfo = function(){};
}
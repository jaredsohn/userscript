// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            MirrorCreator Auto Redirect
// @namespace       http://userscripts.org/users/masonwan
// @description     Automatically go to the download page.
// @match           http://www.mirrorcreator.com/redirect/*
// @run-at          document-end
// @updateURL       https://github.com/masonwan/JavaScriptCollection/raw/master/MirrorCreatorAutoRedirect/MirrorCreatorAutoRedirect.user.js
// @version         1.0
// ==/UserScript==

(function () {
    var anchorElement = document.querySelector('#redirectlink a');
    anchorElement.target = '_self';
    anchorElement.click();
})();
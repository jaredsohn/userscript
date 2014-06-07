// ==UserScript==
// @name           delete new results notification
// @revision       2
// @author         KID a.k.a. blueberrystream
// @description    Twitterの新着通知を行わないようにします。
// @namespace      http://kid0725.usamimi.info
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

void(function() {
var DELETE_TAG_ID = "new_results_notification";

var deleteElement = document.getElementById(DELETE_TAG_ID);

if (deleteElement != null && deleteElement != undefined) {
  deleteElement.parentNode.removeChild(deleteElement);
}

})();
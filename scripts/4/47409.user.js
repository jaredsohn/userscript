// ==UserScript==
// @name           Facebook - big audience alert
// @namespace      maeki.org
// @description    Highlight online friends if the count is higher than a certain amount
// @include        http://*.facebook.com/*
// ==/UserScript==

function highlight ( ) {
  var ALERT_THRESHOLD = 15;
  var friendcount = document.getElementsByClassName('buddy_count_num')[0];
  if (friendcount.textContent.match(/\d+/) >= ALERT_THRESHOLD)
    friendcount.parentNode.parentNode.style.backgroundColor = 'yellow';
}

unsafeWindow.onloadRegister( highlight );

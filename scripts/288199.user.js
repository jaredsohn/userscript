//
// ==UserScript==
// @name          Feedly Auto Refresh
// @description   Click the refresh button unless the page is active and scrolled down
// @version       1.1
// @author        kalhimeo
// @include       http://feedly.com/*
// @include       https://feedly.com/*
// @include       http://www.feedly.com/*
// @include       https://www.feedly.com/*
// @include       http://cloud.feedly.com/*
// @include       https://cloud.feedly.com/*
// @include       http://www.cloud.feedly.com/*
// @include       https://www.cloud.feedly.com/*
// @match         http://feedly.com/*
// @match         https://feedly.com/*
// @match         http://www.feedly.com/*
// @match         https://www.feedly.com/*
// @match         http://cloud.feedly.com/*
// @match         https://cloud.feedly.com/*
// @match         http://www.cloud.feedly.com/*
// @match         https://www.cloud.feedly.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require       https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant         none
// ==/UserScript==

//--- Set the refresh interval in seconds
var refresh_interval = 60;

//--- No need to edit below code
var window_focus;

$(window).focus(function() {
  window_focus = true;
})
.blur(function() {
  window_focus = false;
});
    
waitForKeyElements ("#pageActionRefresh", setTimeout (clickRefreshButton, 1000 * refresh_interval));

function checkScrolledToTop() {
  var timeline = document.getElementById('timeline');
  var clientTop = timeline.getBoundingClientRect().top;
  var elementTop = timeline.offsetTop;
  return clientTop == elementTop;
}

function clickRefreshButton () {
  if (!window_focus || checkScrolledToTop()) {
    var title_backup = document.title;
    var action_refresh = document.getElementById('pageActionRefresh');
    var clickEvent = document.createEvent ('MouseEvents');
    clickEvent.initEvent ('click', true, true);
    action_refresh.dispatchEvent (clickEvent);
    document.title = title_backup;
  }
  setTimeout (clickRefreshButton, 1000 * refresh_interval);
}
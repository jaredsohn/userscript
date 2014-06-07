// ==UserScript==
// @name           Meebo Status Updater from Twitter
// @namespace      http://twitter.com/ziru
// @include        http://www.meebo.com/*
// @include        https://www.meebo.com/*
// ==/UserScript==

var gblTimeout = null;
var gblUsername = null;
var gblCurrentStatus = null;
  
function init() {
  gblUsername = GM_getValue('username', '');
  if (gblUsername == '') {
    gblUsername = prompt('Enter your Twitter UserName');
    GM_setValue('username', gblUsername);
  }

  gblTimeout = GM_getValue('timeout', '');
  if (gblTimeout == '') {
    gblTimeout = prompt('Enter the timeout value');
    GM_setValue("timeout", gblTimeout);
  }
}

function fetchLatestTweet() {
  GM_log('Username: ' + gblUsername);
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://twitter.com/statuses/user_timeline/"+gblUsername+".json",
    onload: function (resp) {
      GM_log('Resp: ' + resp.responseText);
      var json = JSON.parse(resp.responseText);
      var newStatus = null;
      for (var i =0; i < json.length; i++) {
        if (json[i].text[0] != '@') {
          newStatus = json[i].text;
          break;
        }
      }
      GM_log('Latest Tweet: ' + newStatus);
      onTweetFetched(newStatus);
    },
  });

  // schedule the next tweet fetch event
  setTimeout(fetchLatestTweet, gblTimeout);
}

function onTweetFetched(tweet) {
  if (tweet == null || tweet == '') return;
  
  try {
    if (tweet != gblCurrentStatus) {
      unsafeWindow.meeboApp.setStatusMessage(tweet);
      GM_log('Update Meebo status from [' + gblCurrentStatus + '] to [' + tweet + ']');
      gblCurrentStatus = tweet;
    }
  } catch (e) {
    GM_log('Failed to update Meebo status!');
  }
}

function checkMeeboState() {
  if (unsafeWindow.gEventMgr && unsafeWindow.gEventMgr.getState() == 'im') {
    // on Meebo app completely loaded & initialized
    GM_log('Meebo App completely loaded & initialized');
    fetchLatestTweet();
  } else {
    setTimeout(checkMeeboState, 10 * 1000);
  }
}

// === MAIN ===
(function() { init();  checkMeeboState(); })();
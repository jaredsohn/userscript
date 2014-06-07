// ==UserScript==
// @version     1.2
// @name        Twitter Updates per Day
// @author      Zhou Meng
// @description Show the number of updates per day on a Twitter user page.  Supports New Twitter.
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// ==/UserScript==

var $;
(function waitJquery() {
  if (!unsafeWindow.jQuery) {
    setTimeout(waitJquery, 100);
  } else {
    $ = unsafeWindow.jQuery;
    doScript();
  }
})();

var users = {};
function doScript() {
  setInterval(function() {
    var $mainA = $("div.profile-dashboard a.user-stats-count:first");
    if ($mainA.length && !$mainA.html().match(/\(.+\)/)) {
      var screen_name = $("div.main-content span.screen-name").text().replace(/^@/, "");
      render(screen_name, $mainA);
    }

    var $detailA = $("div.active a.user-stats-count:first");
    if ($detailA.length && !$detailA.html().match(/\(.+\)/)) {
      var screen_name = $("div.active a.screen-name strong").text().replace(/^@/, "");
      render(screen_name, $detailA);
    }
  }, 100);
}

function render(screen_name, $a) {
  unsafeWindow.twttr.API.User.find(screen_name, function(user) {
    var statusesCount = user.statusesCount;
    var createdAt = new Date(user.createdAt);
    var perday = Math.round(statusesCount * 1000 * 3600 * 24 / (new Date() - createdAt) * 10) / 10;
    if (!$a.html().match(/\(.+\)/)) {
      $a.find("span").before("(" + perday + "/day)");
    }
  });
}
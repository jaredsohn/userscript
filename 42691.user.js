// ==UserScript==
// @name          Follow Cost for Twitter profiles
// @author        Barry Hess
// @namespace     http://followcost.com
// @description	  Display a user's Follow Cost right in his/her Twitter profile
// @include       http://twitter.com/*
// ==/UserScript==

function noFollowCostDefinedBeneath(element) {
  return 0 == element.find('.follow-cost').length
}

function findUsername(profileElement) {
  username = false;
  if(0 == profileElement.find('.screen-name strong').length) {
    // Grab from the URL
    var m=/^http[s]{0,1}:\/\/twitter.com\/(\w+)|(\#!\/(\w+))\/?/.exec(window.location.href);
    if(m) {
      username = (undefined == m[1] ? m[3] : m[1]);
    }
  } else {
    username = profileElement.find('.screen-name strong').html().replace(/^@/, '');
  }
  return username;
}

function updateFollowCost() {
  $('.profile-basics, .profile-dashboard').each(function() {
    if(noFollowCostDefinedBeneath($(this))) {
      var username = findUsername($(this));
      if(username) {
        var ul = $(this).find('.user-stats');
        $.getJSON("http://followcost.com/" + username + ".json?callback=?", function(json) {
          var markup = '<li><a class="user-stats-count follow-cost" href="http://followcost.com/' + username + '">' + Math.round(parseFloat(json.average_tweets_per_day)*100)/100 + '<span class="user-stats-stat">Follow Cost</span></a></li>';
          if(noFollowCostDefinedBeneath(ul)) {
            ul.html(ul.html() + markup);
          }
        });
      }
    }
  });
}

function updateFollowCostAfterInterval() {
  var executions = 0;
  intervalId = window.setInterval(function() {
    updateFollowCost();
    if(executions >= 300) {
      window.clearInterval(intervalId);
    }
    executions++;
  }, 2000);
}

function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined')
    {
        window.setTimeout(GM_wait,251);
    }
    else
    {
        $ = unsafeWindow.jQuery; letsJQuery();
    }
}

function letsJQuery()
{
  updateFollowCostAfterInterval();
}

if(navigator.appVersion.match('AppleWebKit')) {
  updateFollowCostAfterInterval();
} else {
  GM_wait();
}
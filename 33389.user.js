// ==UserScript==
// @name           FriendFeed Savior
// @namespace      bjornstar
// @description    Hide items that contain words you don't want to see.
// @include        http://beta.friendfeed.com/
// @include        http://beta.friendfeed.com/*
// @include        http://friendfeed.com/
// @include        http://friendfeed.com/*
// ==/UserScript==

var blackList = new Array('obama','mccain','iphone','baseball','palin','phelps','apartment therapy','travolta','steve jobs','steelers','football','superbowl','super bowl','snuggie','octuplet');
var whiteList = new Array('bjorn');

function needstobesaved(){
  var currentVal = unsafeWindow.$(this).html();
  var pVal = unsafeWindow.$(this).siblings(".summary").html();
  var whitelisted = false;
  var blacklisted = false;
  
  for(var j=0;j<=whiteList.length;j++) {
    if(currentVal.toLowerCase().indexOf(whiteList[j])>=0) {
      whitelisted = true;
    }
  }

  if (!whitelisted) {
    for(var i=0;i<=blackList.length;i++) {
      if(currentVal.toLowerCase().indexOf(blackList[i])>=0) {
        blacklisted = true;
      }
    }
  }
  
  if (blacklisted) {
    if (pVal.indexOf('<a href')<=5 && pVal.toLowerCase().indexOf('>you</a>')<=0 && currentVal.toLowerCase().indexOf('">you</a>')<=0) {
      unsafeWindow.$(this).attr("id", unsafeWindow.$(this).attr("eid"));
      var save_id = unsafeWindow.$(this).attr("id");
      var filtered_div = document.getElementById(save_id);
      var div_notice = document.createElement('div');
      div_notice.className = 'entry';
      div_notice.innerHTML = 'You have been saved from this post, it had something you didn\'t want to see in it.<br /><a onclick="this.parentNode.style.display=\'none\'; this.parentNode.nextSibling.style.display=\'\'; return false;" href="#"><i>Click here</i></a> if you cannot resist the temptation.';
      filtered_div.parentNode.insertBefore(div_notice, filtered_div);
      unsafeWindow.$(this).css("display", "none");
      return;
    }
  }
}

unsafeWindow.$("div.entry").each( needstobesaved );
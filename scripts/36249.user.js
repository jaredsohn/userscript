// ==UserScript==
// @name           WeHeartIt Savior
// @namespace      bjornstar
// @description    Hides posts on weheartit that you don't want to see.
// @include        http://weheartit.com/*
// @include        http://weheartit.com/
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
        else { unsafeWindow.$gm = unsafeWindow.jQuery.noConflict(); letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
      unsafeWindow.$gm("div.entry").each( needstobesaved );
    }

function needstobesaved(){
  var whiteList = new Array('bjorn');
  var blackList = new Array('patodeborracha','nsx24z','zeecollector','aaronkok','joker1007','evilpilotfish','likesbears','afuckaday');
  var whitelisted = false;
  var blacklisted = false;

  var currentVal = unsafeWindow.$gm(this).html();

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
    unsafeWindow.$gm(this).attr("id", unsafeWindow.$gm(this).attr("eid"));
    var save_id = unsafeWindow.$gm(this).attr("id");
    var filtered_div = document.getElementById(save_id);
    var div_notice = document.createElement('div');
    var div_info = document.createElement('div');
    div_info.className = 'info';
    div_info.innerHTML = '<p>You have been saved from this post, it had something you didn\'t want to see in it.</p><p><a onclick="this.parentNode.parentNode.parentNode.style.display=\'none\'; this.parentNode.parentNode.parentNode.nextSibling.style.display=\'\'; return false;" href="#">Click here</a> if you cannot resist the temptation.</p>';
    div_notice.className = 'entry';
    div_notice.appendChild(div_info);
    filtered_div.parentNode.insertBefore(div_notice, filtered_div);
    unsafeWindow.$gm(this).css("display", "none");
    return
  }
}
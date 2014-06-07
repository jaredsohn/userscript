// ==UserScript==
// @name           Twitter Savior
// @namespace      bjornstar
// @description    Twitter Savior saves you from tweets that contains words you don't want to see.
// @include        http://twitter.com/*
// @include        http://*.twitter.com/*
// ==/UserScript==

function needstobesaved(){
  var theList = new Array('obama','mccain','iphone','baseball', 'palin', 'travolta', 'steve jobs');
  for(var i=0;i<theList.length;i++) {
    var currentVal = unsafeWindow.$(this).html();
    if(currentVal.toLowerCase().indexOf(theList[i])>=0) {
      var save_id = unsafeWindow.$(this).parent().parent().attr("id");
      var filtered_div = document.getElementById(save_id);
      var tr_notice = document.createElement('tr');
      tr_notice.className = 'hentry status';
      var td_notice = document.createElement('td');
      td_notice.colSpan = 3;
      td_notice.innerHTML = 'You have been saved from this post, it had something you didn\'t want to see in it.<br /><a onclick="javascript:this.parentNode.style.display=\'none\';this.parentNode.parentNode.nextSibling.style.display=\'\';return false;" href="#"><i>Click here</i></a> if you cannot resist the temptation.';
      tr_notice.appendChild(td_notice);
      filtered_div.parentNode.insertBefore(tr_notice, filtered_div);
      unsafeWindow.$(this).parent().parent().css("display", "none");
      return
    }
  }
}

unsafeWindow.$("span.entry-content").each( needstobesaved );
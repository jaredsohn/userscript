// ==UserScript==
// @name        Blurb Blocker
// @namespace   sarken
// @description Hides Archive of Our Own work blurbs containing certain terms.
// @include     http://archiveofourown.org*
// @include     https://archiveofourown.org*
// @version     1.4
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
  GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js';
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
  unsafeWindow.$gm("li.blurb").each(checkBlurb);
}

function checkBlurb() {
  var whiteList = new Array('general audiences');
  var blackList = new Array('explicit', 'mature');
  var whitelisted = false;
  var blacklisted = false;

  var currentVal = unsafeWindow.$gm(this).html();

  for(var j=0;j<=whiteList.length;j++) {
    if(currentVal.indexOf(whiteList[j])>=0) {
      whitelisted = true;
    }
  }

  if (!whitelisted) {
    for(var i=0;i<=blackList.length;i++) {
      if(currentVal.indexOf(blackList[i])>=0) {
        blacklisted = true;
      }
    }
  }

  if (blacklisted) {
    unsafeWindow.$gm(this).attr("id", unsafeWindow.$gm(this).attr("id"));
    var save_id = unsafeWindow.$gm(this).attr("id");
    var blocked_blurb = document.getElementById(save_id);
    var blurb_placeholder = document.createElement('li');
    var blurb_message = document.createElement('p');
    blurb_message.className = 'caution';
    blurb_message.innerHTML = '<span>This work has been hidden by Blurb Blocker. <a onclick="this.parentNode.parentNode.parentNode.style.display=\'none\'; this.parentNode.parentNode.parentNode.nextSibling.style.display=\'\'; return false;" href="#">Click to reveal.</a></span>';
    blurb_placeholder.className = 'empty blurb';
    blurb_placeholder.appendChild(blurb_message);
    blocked_blurb.parentNode.insertBefore(blurb_placeholder, blocked_blurb);
    unsafeWindow.$gm(this).css("display", "none");
    return
  }
}
// ==UserScript==
// @name           Tumblr Savior
// @namespace      bjornstar
// @description    Saves Cass from ever having to see another post about certain things ever again
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/show/*
// ==/UserScript==

function needstobesaved(theStr){
  var blackList = new Array('justin bieber', 'supernatural', 'bieber', 'belieber', 'dr. who', 'Dr. Who', 'Doctor Who', 'kanye west', 'doctor who', 'nicki minaj' 'minaj', 'spoilers' 'tvd', 'TVD', 'The Vampire Diaries', 'the vampire diaries', 'boobs', 'pretty little liars, 'sherlock spoilers', 'liveblog: golden globes', 'lana del ray''one direction' '1D' 'zayn malik' 'niall horan''louis tomlinson' 'harry styles''otp: Larry stylinson');
  var whiteList = new Array();
  var blacklisted = false;
  var whitelisted = false;
  
  for(var i=0;i<=whiteList.length;i++) {
    if(theStr.toLowerCase().indexOf(whiteList[i])>=0) {
      whitelisted = true;
    }
  }

  if (!whitelisted) {
    for(var i=0;i<=blackList.length;i++) {
      if(theStr.toLowerCase().indexOf(blackList[i])>=0) {
        blacklisted = true;
      }
    }
  }
  return blacklisted;
}

var liPosts = document.getElementsByTagName('li');
var last_check = 0;
  
function check_for_saving() {
	for (var i=last_check;i<liPosts.length;i++) {
		if (liPosts[i].id.substring(0,4)=='post' && liPosts[i].className.indexOf('not_mine') >= 0) {
			var savedfrom = needstobesaved(liPosts[i].innerHTML);
			if (savedfrom) {
				var div_filtered = document.createElement('div');
				div_filtered.style.display = 'none';

				while (liPosts[i].childNodes.length > 1) {
					div_filtered.appendChild(liPosts[i].childNodes[0]);
				}

				var div_notice = document.createElement('div');
				div_notice.className = 'post_info';
				div_notice.innerHTML = 'You have been saved from this post, it had something you didn\'t want to see in it. <a onclick="this.parentNode.style.display=\'none\'; this.parentNode.nextSibling.style.display=\'\'; return false;" href="#"><i>Click here</i></a> if you cannot resist the temptation.';

				liPosts[i].appendChild(div_notice);
				liPosts[i].appendChild(div_filtered);
			}
		}
	}
	last_check = liPosts.length;
}

function addGlobalStyle(css) {
  var elmHead, elmStyle;
  elmHead = document.getElementsByTagName('head')[0];
  elmStyle = document.createElement('style');
  elmStyle.type = 'text/css';
  elmHead.appendChild(elmStyle);
  elmStyle.innerHTML = css;
}

var better_rule = '.source_url {display:none !important;}';
try {
  document.styleSheets[0].insertRule(better_rule, 0);
} catch (e) {
  addGlobalStyle(better_rule);
}

setInterval(check_for_saving, 200);
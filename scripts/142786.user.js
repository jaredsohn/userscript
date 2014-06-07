// ==UserScript==
// @name           Tumblr asanusta modifiye
// @namespace      asanusta
// @description    Bir daha asla bazı şeyleri (başkası tarafından değiştirilmiş)  Tumblr yazılan görmek zorunda kaydeder.-Saves you from ever having to see another post about certain things ever again (asanusta).
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/show/*
// ==/UserScript==

(function(){

function needstobesaved(thePost){
  var blackList = GM_getValue('blacklist', '');
  blackList = blackList ? blackList.split(";") : new Array();
  var whiteList = GM_getValue('whitelist', '');
  whiteList = whiteList ? whiteList.split(";") : new Array();
  var blacklisted = new Array();
  
  var theStr = thePost.innerHTML.toLowerCase();
  
  for(var i=0;i<=whiteList.length;i++) {
    if(theStr.indexOf(whiteList[i])>=0) {
      //GM_log('White:'+whiteList[i]);
      return blacklisted;
    }
  }

  for(var i=0;i<=blackList.length;i++) {
    if(theStr.indexOf(blackList[i])>=0) {
	  //GM_log('Black:'+blackList[i]);
      blacklisted.push(blackList[i]);
    }
  }
  return blacklisted;
}

var liPosts = document.getElementsByTagName('li');
var last_check = 0;
  
function check_for_saving() {
	for (var i=last_check;i<liPosts.length;i++) {
		if (liPosts[i].id.substring(0,4)=='post' && liPosts[i].className.indexOf('not_mine') >= 0) {
			var savedfrom = needstobesaved(liPosts[i]);
			if (savedfrom.length) {
				var id = liPosts[i].id.substring(5);
				var div_filtered = document.createElement('div');
				div_filtered.style.display = 'none';
				var post_content = document.getElementById('post_content_'+id);
				var div_notice = document.createElement('div');
				div_notice.className = 'post_info';
				div_notice.innerHTML = 'You have been saved from this post because of: '+savedfrom.join(';')+'. <a onclick="this.parentNode.style.display=\'none\'; this.parentNode.nextSibling.style.display=\'\'; return false;" href="#"><i>Click here</i></a> if you cannot resist the temptation.';

				liPosts[i].insertBefore(div_notice, post_content);
				liPosts[i].insertBefore(div_filtered, post_content);
				div_filtered.appendChild(post_content);
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

function setBlackList() {
  var list = GM_getValue('blacklist', '');
  list = prompt('Enter blacklisted words(delimiter is ";"):', list);
  if (list!=null)
    {
    GM_setValue('blacklist', list);
    location.reload();
    }
  }

function setWhiteList() {
  var list = GM_getValue('whitelist', '');
  list = prompt('Enter whitelisted words(delimiter is ";"):', list);
  if (list!=null)
    {
    GM_setValue('whitelist', list);
    location.reload();
    }
  }
  
if (false) {
  var better_rule = '.source_url {display:none !important;}';
  try {
    document.styleSheets[0].insertRule(better_rule, 0);
  } catch (e) {
    addGlobalStyle(better_rule);
  }
}
GM_registerMenuCommand('Edit blacklist', setBlackList);
GM_registerMenuCommand('Edit whitelist', setWhiteList);
check_for_saving();
setInterval(check_for_saving, 500);
})();


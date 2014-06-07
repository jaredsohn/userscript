// ==UserScript==
// @namespace     http://www.tweaksthelimbs.org/greasemonkey/
// @name          Feed43 Feed Cloner
// @description   Clone a feed on Feed43. Adds copy and paste links to the top of the feed creation page. Click copy while viewing the feed details that you want to clone. Open a blank feed and click paste.
// @include       http://feed43.com/feed.html*
// @version       0.2 - Oops, v.1 deleted the copied feed!!
// @FF_version    1.5
// @GM_version    0.6.4
// ==/UserScript==

function copyFeed(){
  var feed = new Array();
  var f = document.getElementsByTagName('form')[0];
  for(i=0;i<f.length;i++){
    feed[i] = f[i].value;
  }
  GM_setValue('feed',feed.join("`"));
}

function pasteFeed(){
  var feed = GM_getValue('feed').split("`");
  if(!feed) return;
  var f = document.getElementsByTagName('form')[0];
  for(i=1;i<f.length-9;i++){
    f[i].value=feed[i];
  }
}

var t = document.createElement('div');
t.innerHTML = '<table class="main" style="margin-top:10px"><tr><td class="menu" colspan="2"><a href="javascript:;" id="copy"><span class="bullet">&raquo;&nbsp;</span>Copy</a> <a href="javascript:;" id="paste"><span class="bullet">&raquo;&nbsp;</span>Paste</a></td></tr></table>';
document.getElementsByTagName('table')[0].parentNode.insertBefore(t,document.getElementsByTagName('table')[0].nextSibling);
document.getElementById('copy').addEventListener('click',copyFeed,false);
document.getElementById('paste').addEventListener('click',pasteFeed,false);
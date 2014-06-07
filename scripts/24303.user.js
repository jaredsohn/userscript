// ==UserScript==
// @name           Tibia Forum Post Number
// @include        http://forum.tibia.com/*
// @author         Pnoexz (pnoexz@hotmail.com)
// @description    Shows the direct link and the replace code of a post and the thread on the forums of the MMORPG Tibia.
// @version        2
// ==/UserScript==


var pagecheck = window.location.href.split("=");
if (pagecheck[1] == 'thread&threadid' || pagecheck[1] == 'thread&postid') {
  var getatd = document.evaluate('//td[@class="ff_white"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  var thrid = getatd.snapshotItem(2).textContent.split('#')[1].split(')')[0];
  getatd.snapshotItem(0).textContent = '[thread='+thrid+'][/thread]';
  var getalin = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i = 0; i < getalin.snapshotLength; i++) {
    var gotlin = getalin.snapshotItem(i).href
    var linspl = gotlin.split("=")
    if (linspl[1] == 'quote&postid') {
      var dirlin = window.location.href
      var dirclin = dirlin.split("#")
      getalin.snapshotItem(i).parentNode.innerHTML = '<a href='+gotlin+'>Quote</a><br><a href='+dirclin[0]+'#post'+linspl[2]+
      '>Direct Link</a>  ||  <span style="font-size=small">[post='+linspl[2]+'][/post]</span></br>';
    }
  }
}


// Change log
//
// v1 First release
// v2 Added replace code for thread
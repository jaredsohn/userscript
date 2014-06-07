// ==UserScript==
// @name           delicious show URL
// @namespace      http://onemorebug.com/greasemonkey/deliciousShowUrl.user.js
// @description    The original bookmarklet by Mislav Marohni is here: http://odin.irb.hr/~mislav/tmp/bookmark.html  All I've done is copy it into a user script, then add a regex which Mislav provided.  The bookmarklet was designed for bookmark-list pages.  By default this script is active on _any_ page of del; and that seems to work OK so far.
// @include        http://del.icio.us/*
// ==/UserScript==


(function(){
  n = document.getElementsByTagName('h4');
  for(var i=0; i < n.length; i++){
    if (n[i].className.match(/\bdesc\b/)) {
      var p = document.createElement('p');
      p.appendChild( document.createTextNode(n[i].firstChild.href) );
      p.style.color='gray';
      n[i].parentNode.insertBefore(p, n[i].parentNode.getElementsByTagName('div')[0].nextSibling);
    }}})();

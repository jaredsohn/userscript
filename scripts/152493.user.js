// ==UserScript==
// @id             www.newsweekjapan.jp-456060a5-fcb7-4566-8a0a-d0722edcd3ed@http://d.hatena.ne.jp/k2jp/
// @name           Newsweek Japan link activator for NoScript
// @version        1.0.2
// @namespace      http://d.hatena.ne.jp/k2jp/
// @author         k2jp
// @description    newsweekjapan.jp does NOT provide all the links to articles if you disable JavaScript, probably because of aggressive trackings. This script helps NoScript users by generating anchor wrappers :-P
// @match          *://www.newsweekjapan.jp/*
// @exclude        about:blank
// @run-at         document-end
// @icon           http://www.st-hatena.com/users/k2/k2jp/profile.gif
// @grant          none
// ==/UserScript==
//
//TARGET sample DIV: <div class="entry bottomDot clearfix containImg" onkeydown="clickLink('http://www.newsweekjapan.jp/picture/84602.php', '')" onclick="clickLink('http://www.newsweekjapan.jp/picture/84602.php', '');">
//
// URLs including ".entry"s without anchor
// http://www.newsweekjapan.jp/
// http://www.newsweekjapan.jp/column/
// http://www.newsweekjapan.jp/headlines/
// http://www.newsweekjapan.jp/picture/
// http://www.newsweekjapan.jp/stories/
//
(function(){
  var targetDIVs = document.getElementsByClassName("entry");
  targetDIVs = Array.prototype.slice.call(targetDIVs);  // Convert nodes to array
  targetDIVs.forEach(wrapExistentNode);

  function wrapExistentNode(targetDIV, idx, elms){
    // Wrap existent .entry nodes without anchor
    var onClickFn,
        targetURL,
        targetParent,
        wrapper;
    if( !(onClickFn = targetDIV.getAttribute("onclick")) ||
        !(targetURL = onClickFn.split("'")[1]) ||
        !(targetParent = targetDIV.parentNode) ||
        ("a" === targetParent.nodeName.toLowerCase()) ) return;
    wrapper = document.createElement("a");
    wrapper.setAttribute("href", targetURL);
    wrapper.appendChild(targetDIV.cloneNode(true));
    targetParent.replaceChild(wrapper, targetDIV);
  };
})();
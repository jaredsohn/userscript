// Remove undesirable comments from theblaze.com
// version 1.0.0
// 2011-01-26
// by John Woods
//
// ==UserScript==
// @name           TheBlaze Naked News
// @namespace      theblaze
// @description    Remove everything but the news articles. Get rid of all the ads and the asanine comments. Read the news and only the news.
// @include        http://*.theblaze.com/*
// ==/UserScript==

function xpath(query) {return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove;}
function hideById(theId) {var crap = document.getElementById(theId); if (crap && crap.style.display != 'none') crap.style.display = 'none';}
function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}
function removeByClassName(classname) {
  var els = getElementsByClassName(classname);
  for (var i=0,j=els.length; i<j; i++) {
    var e = els[i];
    remove(e);
  }
}

hideById('comments');
removeByClassName('ad');
removeByClassName('one-third');
removeByClassName('frontpagead');

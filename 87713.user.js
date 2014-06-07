// ==UserScript==
// @name   UnRetweet
// @version    0.0 
// @namespace  http://twitter.com/0x7E
// @description UnRetweet
// @include    http://twitter.com*
// @include    http://www.twitter.com*
// @include    https://twitter.com*
// @include    https://www.twitter.com*
// @exclude    http://twitter.com/account/*
// @exclude    https://twitter.com/account/*
// @exclude    http://twitter.com/logout*
// @exclude    https://twitter.com/logout*
// @exclude    https://twitter.com/invitations
// @run-at     document-start
// ==/UserScript==

(function() {


function unretweet() {

var rt = document.evaluate('//ol/li[@*]//span[@class="big-retweet-icon"]', document, null, XPathResult.ANY_TYPE, null);

var tr = rt.iterateNext();

try {
  while (tr) {
    var s = document.getElementById(tr.parentNode.parentNode.id);
    s.parentNode.removeChild(s);
    tr = rt.iterateNext();
  }	
} catch(e) {}

}

setInterval(unretweet,1000);

unretweet();

})() ;

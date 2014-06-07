// ==UserScript==
// @name KoL: There is no I in The Werefrog
// @author Aankhen
// @namespace http://userscripts.org/users/121156
// @description Replaces all instances of "The Werefrog" in posts on the Kingdom of Loathing forums with "I".
// @include http://forums.kingdomofloathing.com*showthread.php*
// @include http://forums.kingdomofloathing.com*showpost.php*
// ==/UserScript==

const xPathExpression = '//div[starts-with(@id, "post_message")]//text()';

var xPathResult = document.evaluate(xPathExpression, document.getElementById('posts') || document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0, j = xPathResult.snapshotLength; i < j; i++) {
  var current = xPathResult.snapshotItem(i);

  current.nodeValue = current.nodeValue.replace(/The Werefrog/g, 'I');
}

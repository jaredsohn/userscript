// ==UserScript==

// @name           de-archan

// @namespace      http://twgifttometro

// @description    apply once, then scrub thoroughly

// @include        http://z6.invisionfree.com/The_Legion_/index.php?showtopic*

// ==/UserScript==

// edit the hatelist variable to add/remove names to ignore
// keep names separated by ':' and also keep a ':' at the start and end of the string
// multiple names should look like this-
// var hatelist = ':Archan:MetroTW:chefjoe:rathboneTW:';

var hatelist = ':Archan:';

function main() {
  var allLinks, thisLink;
  allLinks = document.evaluate(
    '//TABLE/TBODY/TR/TD/SPAN/A/SPAN',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  for(var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    var matchtxt = ':' + thisLink.innerHTML + ':';
    if(hatelist.match(matchtxt)) {
      thisLink = thisLink.parentNode.parentNode.parentNode.parentNode.parentNode;
      thisLink.innerHTML = '';
    }
  }
}
window.addEventListener('load',function() {main()},false);
// ==UserScript==
// @name           lwignore
// @namespace      http://lwignore
// @description    ignore stuff
// @include        http://z7.invisionfree.com/LunarWars_Forum/index.php?showtopic*
// ==/UserScript==

// edit the hatelist variable to add/remove names to ignore
// keep names separated by ':' and also keep a ':' at the start and end of the string
// multiple names should look like this-
// var hatelist = ':TagUrIt:Supreme_Leader:';

var hatelist = ':Supreme_Leader:';

function main() {
  var allLinks, thisLink;
  allLinks = document.evaluate(
    '//TABLE/TBODY/TR/TD/SPAN/A',
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
// ==UserScript==
// @name          theshow Asshole Remover
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Hide comments on theshow that just say "first"
// @include       http://www.zefrank.com/theshow/*
// ==/UserScript==

/*

(C) 2006 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2006-06-01 - Started, finished

*/

var comments = document.evaluate('//div[@class="comments"]/div[div[@class="postedby"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var count = 0;

for(var c = 0, comment; comment = comments.snapshotItem(c); c++) {
  var words = comment.getElementsByTagName('p')[0].textContent.match(/\w+/);
  if(words && words.length == 1 && words[0].toLowerCase() == 'first') {
    comment.className += ' asshole';
    count++;
  }
}

GM_addStyle('.asshole { display: none; }');
var srcount = document.getElementById('srcount');
var countText = '(' + comments.snapshotLength + ', including ' + count + ' hidden assholes)';
srcount.parentNode.replaceChild(document.createTextNode(countText), srcount);
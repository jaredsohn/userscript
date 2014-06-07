// Remove undesirable comments from theblaze.com
// version 1.4.4
// 2010-11-12
// by John Woods
//
// ==UserScript==
// @name           TheBlaze Fixer
// @namespace      theblaze
// @description    Removes undesirable gratuitous comments from theblaze.com
// @include        http://*.theblaze.com/stories/*
// ==/UserScript==

function xpath(query) {return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove;}

var douchebagArray = [
'abc',                  // troll
'snowleopard3200',      // gratuitous links to unrelated website(s)
'rojotx',               // gratuitous links to unrelated website(s)
'broker0101',           // troll
'walkwithme1966',       // gratuitous links to unrelated website(s)
'garbybarengar',        // troll
'mossbrain',            // inappropriate comments
'exrepublisheep',       // troll
'incredulous',          // troll
'beckisnuts',           // troll - religion bashing
'rcscrolls',            // troll - religous intolerance against Mormons
'jf',                   // gratuitous links to unrelated website(s)
'izzyt84',              // troll - religous intolerance against Mormons
'poverty-sucks',        // troll - religous intolerance against Mormons
'deltahawk',            // troll - religous intolerance against Mormons
'whiteteaparty'        // troll
]

for (i in douchebagArray) {
  p = '//*[contains(concat( " ", @class, " " ), concat( " ", "comment-author-'+douchebagArray[i]+'", " " ))]';
  var items = xpath(p);
  for (var i = items.snapshotLength - 1; i >= 0; i--) {
    var item = items.snapshotItem(i);
    remove(item);
  }
}

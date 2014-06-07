// ==UserScript==
// @name           link sort
// @namespace      http://d.hatena.ne.jp/hatecha/
// @description    replacement by address-sorted links
// @include        http://*
// ==/UserScript==

var allLinks, thisLink;

allLinks = document.evaluate('//a',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

var newBody = 
'<html>' +
'<head>' +
'<title>all links</title>' +
'</head>' +
'<body>' +
'<p>replacement</p>' ;

alinks= new Array(allLinks.snapshotLength);
var co =0;
for (var i = 0; i < allLinks.snapshotLength; i++) {
     thisLink = allLinks.snapshotItem(i);
     //if(!thisLink.href.match('keyword')) continue;
     alinks[co] =thisLink.href;
     co++;
}

alinks.sort();
for (var i = 0; i < co; i++) {
     newBody +='<br><a href='+alinks[i]+'>'+alinks[i].substring(0,100)+'</a>';
}

newBody +=
'</body>' +
'</html>';

window.addEventListener(
    'load', 
    function() { document.body.innerHTML = newBody; },
    true);
    

// 2007/08/18 new
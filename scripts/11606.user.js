// ==UserScript==
// @name           link sort2
// @namespace      http://d.hatena.ne.jp/hatecha/
// @description    replacement by address-sorted links 2
// @include        http://*
// ==/UserScript==

var allLinks, thisLink;

allLinks = document.evaluate('//a',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

var newBody = 
'<html>' +
'<head>' +
'<title>all links</title>' +
'</head>' +
'<body>' ;

alinks= new Array();
var co =0;
for (var i = 0; i < allLinks.snapshotLength; i++) {
     thisLink = allLinks.snapshotItem(i);
     //if(!thisLink.href.match('keyword')) continue;
     alinks[co] =[thisLink.href, thisLink.firstChild.nodeValue];
     co++;
}

alinks.sort();
for (var i = 0; i < co; i++) {
     if (alinks[i][1]!=null) newBody +='<br><a href='+alinks[i][0]+'>'+alinks[i][1]+'</a>';
}

newBody +=
'</body>' +
'</html>';

window.addEventListener(
    'load', 
    function() { document.body.innerHTML = newBody; },
    true);
    

// 2007/08/18 new
// 2007/08/21 use text
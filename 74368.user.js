// ==UserScript==
// @name           Reddit comment box enhancements
// @namespace      leroy_twiggles
// @description    enhance's reddit's "comments" box
// @include        http://www.reddit.com/*
// ==/UserScript==


 
//Add a reference to the complete markdown reference
var nodesSnapshot = document.evaluate("//span[@class='help-toggle toggle']", document.body, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);  
for (var i=0 ; i < nodesSnapshot.snapshotLength; i++ )  
{  
  var s = nodesSnapshot.snapshotItem(i);
  if (!s.__GM_ADDED_REDDIT_LINKS)
  {
    s.__GM_ADDED_REDDIT_LINKS = true;
    var link = document.createElement('a');
    link.setAttribute('href','http://daringfireball.net/projects/markdown/syntax');
    link.appendChild(document.createTextNode('markdown reference'));
    s.appendChild(document.createTextNode(' | '));
    s.appendChild(link);
  }
}

//Make the comment boxes bigger
var s = document.createElement('style');
s.type = 'text/css';
s.innerHTML = '.usertext-edit textarea { height: 300px !important; }';
document.body.appendChild(s);







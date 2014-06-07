// ==UserScript==
// @name Haloscan Link Rewriter 
// @description Rewrites Haloscan links as proper URLs and not popups
// @include http://*
// ==/UserScript==
//  Inspired by Digbys Haloscan Comments Rewriter by Chris Cunningham 

(function()
{
  // Variables
  var scriptTags, thisScript;
  var haloscanRegex=/^.*haloscan.*(?:[=\/])(.*)$/i;
  var haloscanName;
  scriptTags = document.evaluate( 
    '//script[@src]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
  if (!scriptTags){ return; }
  
  for (var i = 0; i < scriptTags.snapshotLength; i++) 
  {
    if (typeof(haloscanName) != 'undefined')
    {
        break;
    }
    thisScript = scriptTags.snapshotItem(i);
    if(thisScript.src.match(haloscanRegex))
    {
        haloscanName = thisScript.src.match(haloscanRegex)[1];
    }
  }

  var haloscanID;
  var linkTags, thisLink;
  var JSRegex=/^javascript:HaloScan\(["']([0-9]*)['"]\)\;$/i;
  linkTags = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
  if (!linkTags){ return; }
  
  for (var i = 0; i < linkTags.snapshotLength; i++) 
  {
    thisLink = linkTags.snapshotItem(i);
    if(thisLink.href.match(JSRegex))
    {
        haloscanID = thisLink.href.match(JSRegex)[1];
        thisLink.href = "http://www.haloscan.com/comments/" + haloscanName + "/" + haloscanID;
    }
  }
  
}
)();

// ==UserScript==
// @name           WebGrader Link Rewriter
// @namespace      http://rasterweb.net/raster/
// @description    Rewrites Javascripts URLs as real URLs
// @include        http://www.webgrader.com/*
// ==/UserScript==
//

(function()
{
  // Variables
  var scriptTags, thisScript;
  var webgraderRegex=/^.*ShowAssignments.*(?:[=\/])(.*)$/i;
  scriptTags = document.evaluate( 
    '//script[@src]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
  if (!scriptTags){ return; }

  var webgraderID;
  var linkTags, thisLink;
  var JSRegex=/^javascript:ShowAssignments\(([0-9]*)\)\;$/i;
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
        webgraderID = thisLink.href.match(JSRegex)[1];
        thisLink.href = "http://www.webgrader.com/CLI.WebGrader.Web/ParentStudent/ClassAssignments.aspx?id=" + webgraderID;
    }
  }
  
}
)();

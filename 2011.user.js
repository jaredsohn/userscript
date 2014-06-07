// ==UserScript==
// @name          RateBeer Search Box Shortcut
// @namespace     http://www.ratebeer.com/
// @description   Assigns Alt+S as a shortcut key to the search box
// @include       http://www.ratebeer.com/*
// ==/UserScript==

var inputs, box;

inputs = document.evaluate(
    '//input[@type="text" and @name="BeerName"][1]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

if (inputs.snapshotLength > 0)
{
  // Give an ID for quick future reference
  box = inputs.snapshotItem(0);
  box.id = "searchBox";
    
  document.onkeypress = function(event)
  {
    if (event.charCode == 115 && event.altKey)
    {
      var box = document.getElementById("searchBox");
      
      if (box != null)
      {
        box.focus();
      }
    }
  }
  
}
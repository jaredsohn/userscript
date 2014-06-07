// ==UserScript==
// @name          NoRebate/BensBargains
// @namespace     http://invalid.dom/
// @description   Hides rebates on BensBargains.com
// @include       http://*bensbargains.net/*
// @version       0.1
// @author        ripped from NoRoland by Dave (http://davephp.net/)
// ==/UserScript==

(
function ()
{
  var find = "//div[@class='newsTitle']";
  var result = document.evaluate (find, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var re = new RegExp ('Rebate', 'g');

  for (var c = 0; c < result.snapshotLength; c++)
    {
      var txt = result.snapshotItem (c);

      if (txt.innerHTML.match (re))
        {
          txt.parentNode.style.MozOpacity = '0.20';
        }
    }
}
) ();

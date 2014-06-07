// Updated April 2, 2006
// Now removes all ylt strings.
//
// Updated 2 August 2006 by mr
// Yahoo! News seems to use 24-character ylt strings and 36-character
// ylu strings; this version handles these.  Sample strings:
//
// _ylt=A9FJqa6kNNBE8jQAEAJ34T0D
// _ylu=X3oDMTBjMHVqMTQ4BHNlYwN5bnN1YmNhdA--
//
// Still not perfect, because semi_links and slash_links only look for
// URLs with "ylt" in them.  This is a small sample, but every time I've
// seen a "ylu" so far it's been paired with a "ylt", so I haven't fixed
// this.
//
// Updated 2 April 2007 by mr
// Two main changes:
// 1.  Yahoo! News started using ylt strings with no ylu strings;
//     the previous version didn't handle this case.
// 2.  The ylt strings seem to have increased (sometime in 2007)
//     to 28 characters, from 24.  Sample string:
//     _ylt=AvvkzqjOHuSb96N1NrPQJkN34T0D
//
// Minor changes:
// Indent style and variable names for readability.
//
// ==UserScript==
// @name          Yahoo Link Tracking Removal (Modified)
// @namespace     http://userscripts.org/scripts/show/4975
// @description   Remove Yahoo Link Tracking (ylt and ylu in URLs)
// @include       http://*.yahoo.com/*
// ==/UserScript==

(function()
  {
  function selectNodes(doc, context, xpath)
    {
    var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var result = new Array( nodes.snapshotLength );

    for (var x=0; x<result.length; x++)
      {
      result[x] = nodes.snapshotItem(x);
      }

    return result;
    }

  doc = window.document;

  var semi_links = selectNodes(doc, doc.body, "//A[contains(@href,';_ylt=')]");
  var slash_links = selectNodes(doc, doc.body, "//A[contains(@href,'/_ylt=')]");

  var semi_ylt = ";_ylt=";
  var semi_ylu = ";_ylu=";
  var slash_ylt = "/_ylt=";
  var slash_ylu = "/_ylu=";

  var ylt_len = 28;
  var ylu_len = 36;

  var hsplt = "";

  for (var x=0; x<semi_links.length; x++)
    {
    hsplt = semi_links[x].href.split(semi_ylt);
    if(hsplt.length > 1)
      {
      var endlink = hsplt[1].substring(ylt_len);
      semi_links[x].href = (hsplt[0] + endlink);
      // GM_log(";ylt: hsplt[0] '" + hsplt[0] + "' hsplt[1] '" + hsplt[1] + "'");
      }

    hsplt = semi_links[x].href.split(semi_ylu);
    if(hsplt.length > 1)
      {
      endlink = hsplt[1].substring(ylu_len);
      semi_links[x].href = (hsplt[0] + endlink);
      // GM_log(";ylu: hsplt[0] '" + hsplt[0] + "' hsplt[1] '" + hsplt[1] + "'");
      }
    }

  for (var x=0; x<slash_links.length; x++)
    {
    hsplt = slash_links[x].href.split(slash_ylt);
    if(hsplt.length > 1)
      {
      var endlink = hsplt[1].substring(ylt_len);
      slash_links[x].href = (hsplt[0] + endlink);
      // GM_log("/ylt: hsplt[0] '" + hsplt[0] + "' hsplt[1] '" + hsplt[1] + "'");
      }

    hsplt = slash_links[x].href.split(slash_ylu);
    if(hsplt.length > 1)
      {
      endlink = hsplt[1].substring(ylu_len);
      slash_links[x].href = (hsplt[0] + endlink);
      // GM_log("/ylu: hsplt[0] '" + hsplt[0] + "' hsplt[1] '" + hsplt[1] + "'");
      }
    }
  }
)();
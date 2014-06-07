// ==UserScript==
// @name	Google Sponsored Link Remover
// @namespace	http://printf.se
// @description	Removes sponsored links from google search results
// @include	http://*google.*/search*
// ==/UserScript==

/* above the search results */
var all_divs, ad_div;
all_divs = document.evaluate ("//div[@id]", document, null,
			      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			      null);
for (var i = 0; i < all_divs.snapshotLength; ++i)
  {
    ad_div = all_divs.snapshotItem (i);
    if (/tpa[0-9]+/.test (ad_div.getAttribute ("id")))
      ad_div.parentNode.removeChild (ad_div);
  }

/* right side table */
var tables = document.getElementsByTagName ("table");
for (var i = 0; i < tables.length; ++i)
  {
    /* This should be enough of a heuristic for now.  */
    if (tables[i].getAttribute ("align") == "right"
	&& tables[i].getAttribute ("width") == "25%")
      {
	tables[i].parentNode.removeChild (tables[i]);
	break;
      }
  }

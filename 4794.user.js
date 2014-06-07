// ==UserScript==
// @name	Google/Froogle Sponsored Link Remover
// @namespace	http://printf.se
// @description	Based on http://userscripts.org/scripts/show/2313 -- removes sponsored links from Google AND Froogle search results
// @include	http://*google.*/search*
// @include     http://*google.*/froogle*
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
	if (tables[i].getAttribute ("cellspacing") == "0"
	&& tables[i].getAttribute ("cellpadding") == "0"
	&& tables[i].getAttribute ("align") == "right"
	&& tables[i].getAttribute ("border") == "0")
      {
	tables[i].parentNode.removeChild (tables[i]);
	break;
      }
	else if (tables[i].getAttribute ("align") == "right"
	&& tables[i].getAttribute ("width") == "25%")
      {
	tables[i].parentNode.removeChild (tables[i]);
	break;
      }
}
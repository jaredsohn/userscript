/*
Trader.ca Direct Links -- rewrite (auto)trader.ca search result URLs
     from javascript to something bookmarkable
0.1
2005-03-22
Copyright (c) 2005, Rich Lafferty <rich+greasemonkey@lafferty.ca>
Released under the BSD license
http://www.opensource.org/licenses/bsd-license.php

-----------------------------------------------------------------------

This is a Greasemonkey user script.

To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
Then restart Firefox and revisit this script.
Under Tools, there will be a new menu item to "Install User Script".
Accept the default configuration and install.

To uninstall, go to Tools/Manage User Scripts, select "Trader.ca Direct Link",
and click Uninstall.

*/


// ==UserScript==
// @name        Trader.ca Direct Link
// @namespace   http://www.lafferty.ca/software/greasemonkey/
// @description Rewrites Trader.ca search result javascript to permalinks
// @include     http://*.trader.ca/search/Results.asp*
// ==/UserScript==

(function() {

    var xpath = "//a[starts-with(@href,'javascript:goDetails')]";
    var res = document.evaluate(xpath, document, null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var i, link;
    for (i = 0; link = res.snapshotItem(i); i++) {

        // function goDetails(adValue, s_vlotid, s_type, vlotname, s_vlothomeurl)
        // TODO: need to pull the region and category out of the page

        // s_vlotid = 0 -> private ad
        link.href = link.href.replace(
                      /^javascript:goDetails\('(.*)','0','(.*)','(.*)','(.*)'\);/,
                      "http://www.trader.ca/Search/Details.asp?mknm=&Region=200&subcategory=-1&CAT=4&ADS=&adid=$1&dContact=0"
                    );
        // s_vlotid != 0 -> dealer ad
        link.href = link.href.replace(
                      /^javascript:goDetails\('(.*)','(.*)','(.*)','(.*)','(.*)'\);/,
                      "$4&adid=$1&dcontact=$2&VLot=$5&ADS=$1%7C&SRVlot=1&SRslts=1&category=4&len1=0&len2=0&mknm=-1&mdnm=&Region=200&subcategory=-1&alpha="
                    );
    } 

})();

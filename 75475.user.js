// ==UserScript==
// @name           EDBpriser Trustpilot linker
// @namespace      http://darkfox.dk
// @description    Changes the seller name link from linking to the product, to linking to trustpilot
// @include        http://www.edbpriser.dk/Product/Details.aspx?*
// ==/UserScript==

var hrefs = document.evaluate('//a[@id="anchor_dealerItem_dealer"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = 0; i < hrefs.snapshotLength; i++) {
    var hr = hrefs.snapshotItem(i);
    var re = new RegExp('^http://www\.edbpriser\.dk/Go/Product.aspx\\?vid=(.+)&purl=http%3a%2f%2f([a-z0-9\.-]+)%2f(.+)');
    var m = re.exec(hr.href);
    if(m != null) {
        hr.href = 'http://www.trustpilot.dk/review/' + encodeURIComponent(m[2]);
        hr.onClick = function(){};
    }
}

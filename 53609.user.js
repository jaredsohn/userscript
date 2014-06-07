// ==UserScript==
// @name           RMLSWebPlus
// @namespace      http://arcocene.org/
// @description    Add links to Zillow, Portland Maps, and Google Maps to RMLSWeb results pages.
// @include        http://*.rmlsweb.com/v2/public/report.asp*
// ==/UserScript==

var allLinks, thisLink;

allLinks = document.evaluate(
    "//a[@class='MAPLINK_ADDRESS_FULL']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);

    var re = new RegExp("address%3D([^']+)");
    var m = re.exec(thisLink.href);
    if (m != null) {
        var a2 = document.createElement('a');
        a2.href = "http://maps.google.com/?t=h&q="+m[1];
        a2.innerHTML = "G";
        a2.setAttribute("target", "_blank");
        a2.style.marginLeft = "4px";
        thisLink.parentNode.insertBefore(a2, thisLink.nextSibling);

        a2 = document.createElement('a');
        a2.href = "http://portlandmaps.com/parse_results.cfm?query=" +
            m[1].substring(0, m[1].length - 18);
        a2.innerHTML = "P";
        a2.setAttribute("target", "_blank");
        a2.style.marginLeft = "4px";
        thisLink.parentNode.insertBefore(a2, thisLink.nextSibling);

        a2 = document.createElement('a');
        a2.href = "http://www.zillow.com/search/Search.htm?addrstrthood=" + 
            m[1].substring(0, m[1].length - 18) + 
            "&citystatezip=" + m[1].substring(m[1].length - 14);
        a2.innerHTML = "Z";
        a2.setAttribute("target", "_blank");
        a2.style.marginLeft = "4px";
        thisLink.parentNode.insertBefore(a2, thisLink.nextSibling);
    }
}

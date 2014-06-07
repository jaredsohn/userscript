// ==UserScript==
// @name           RecordSearch Show Pages
// @namespace      http://wraggelabs.com/recordsearch_show_pages
// @description    Shows the number of pages in a digitised file in the NAA's RecordSearch database
// @version        0.22
// @date           2012-08-10
// @creator        Tim Sherratt
// @include        http://recordsearch.naa.gov.au/SearchNRetrieve/Interface/ListingReports/ItemsListing.aspx*
// @include        http://recordsearch.naa.gov.au/SearchNRetrieve/Interface/DetailsReports/ItemDetail.aspx*
// @include        http://recordsearch.naa.gov.au/NameSearch/Interface/ItemDetail.aspx*
// @include        http://recordsearch.naa.gov.au/NameSearch/Interface/ItemsListing.aspx*
// ==/UserScript==

function getLink() {
    if (type == 'single') {
        var total = 1;
    } else {
        var total = rs_links.snapshotLength;
    }
    if (link < total ) {
        getPages(rs_links.snapshotItem(link));
    }
}
function getPages(rs_link) {
    var barcode = rs_link.href.match(/\/scripts\/Imagine.asp\?B=(\d+)/)[1]
    var url = 'http://recordsearch.naa.gov.au/scripts/Imagine.asp?B=' + barcode
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function(response) {
            var item = response.responseText;
            pages = item.match(/VALUE="(\d+)" ID="Hidden3"/)[1];
            if (type == 'single') {
                rs_link.innerHTML = rs_link.innerHTML + ' (' + pages + ' pages)';
                rs_link.href = url;
            } else {
                rs_link.innerHTML = rs_link.innerHTML + '<br />' + pages + ' pages';
                rs_link.setAttribute('onclick','');
            }
            link++;
            getLink();
        }
    });
}
if (document.location.href.indexOf('ItemDetail.aspx') > 0) {
    var type = 'single';
} else {
    var type = 'multiple'
}
var rs_links = document.evaluate("//a[contains(@href, '/scripts/Imagine.asp?B=')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var link = 0;
getLink(link);

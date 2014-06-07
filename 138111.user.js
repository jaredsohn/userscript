// ==UserScript==
// @name           RecordSearch -- People Inside
// @namespace      http://wraggelabs.com/recordsearch_show_people
// @description    Records are about people. This userscript enriches the National Archives of Australia's database by inserting images of some of those people.
// @version        0.12
// @date           2012-07-10
// @creator        Tim Sherratt
// @include        http://recordsearch.naa.gov.au/SearchNRetrieve/Interface/ListingReports/ItemsListing.aspx*
// @include        http://recordsearch.naa.gov.au/SearchNRetrieve/Interface/DetailsReports/ItemDetail.aspx*
// ==/UserScript==
var processed_series = ['ST84/1']

function getLink() {
    if (type == 'single') {
        var total = 1;
    } else {
        var total = links.length;
    }
    if (link < total ) {
        //getPages(rs_links.snapshotItem(link));
        getPages(links[link]);
    }
}
function getPages(rs_link) {
    var barcode = rs_link.match(/\/scripts\/Imagine.asp\?B=(\d+)/)[1];
    if (type == 'single') {
        var url = 'http://invisibleaustralians.org/api/faces/' + barcode + '/?format=json';
    } else {
        var url = 'http://invisibleaustralians.org/api/faces/random/' + barcode + '/?format=json';
    }
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function(response) {
            var data = JSON.parse(response.responseText);
            if (type == 'single') {
                if (data.length > 0) {
                    cell = document.evaluate('//*[@id="ctl00_ContentPlaceHolderSNRMain_ucItemDetails_ctl01"]/tbody/tr/td/div/table/tbody/tr[1]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    var faces = '';
                    var num_faces = data.length;
                    for (i=0; i<num_faces; i++) {
                        faces += '<img style="margin-right:10px;margin-top:10px;" title="Page: ' + data[i].page + '" src="http://invisibleaustralians.org/image/' + data[i].id + '/?width=80">';
                    }
                    cell.innerHTML = cell.innerHTML + '<p style="margin-top: 10px;">' + faces + '</p>';
                }
            } else {
                if (data.id) {
                    xpath = "//a[contains(@href, '" + barcode + "')]/img";
                    img = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    img.setAttribute('src', 'http://invisibleaustralians.org/image/' + data.id + '/?width=80');
                    img.setAttribute('title', 'Page: ' + data.page);
                }
            }
            link++;
            getLink();
        }
    });
}
var links = [];
if (document.location.href.indexOf('ItemDetail.aspx') > 0) {
    var type = 'single';
    series = document.evaluate('//*[@id="ctl00_ContentPlaceHolderSNRMain_ucItemDetails_ctl01"]/tbody/tr/td/div/table/tbody/tr[3]/td[2]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    digitised = document.evaluate('//*[@id="ctl00_ContentPlaceHolderSNRMain_ucItemDetails_pnlDigitalCopy"]/a[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (digitised && processed_series.indexOf(series) != -1) {
        links.push(digitised.href);
    }
} else {
    var type = 'multiple'
    var rows = document.evaluate('//*[@id="ctl00_ContentPlaceHolderSNRMain_tblItemDetails"]/tbody/tr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for ( var i=0 ; i < rows.snapshotLength; i++ ) {
        var series = document.evaluate('td[2]', rows.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
        var digitised = document.evaluate('td[6]/a', rows.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (digitised && processed_series.indexOf(series) != -1) {
            links.push(digitised.href);
        }
    }
}
var link = 0;
getLink(link);

// ==UserScript==
// @name           RecordSearch Mapping Our Anzacs links
// @namespace      http://ozhistory.info/rs_moa_link
// @description    Adds links from B2455 items in RecordSearch to Mapping our Anzacs
// @version        0.21
// @date           2012-08-10
// @creator        Tim Sherratt
// @include        http://recordsearch.naa.gov.au/SearchNRetrieve/Interface/DetailsReports/ItemDetail.aspx*
// @include        http://recordsearch.naa.gov.au/NameSearch/Interface/ItemDetail.aspx*
// ==/UserScript==

function openMOA(barcode) {
    var url = 'http://mappingouranzacs.naa.gov.au/details-permalink.aspx?barcode_no=' + barcode;
    window.open(url);
}
function embedFunction(s) {
head.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
if (document.location.href.match(/ItemDetail.aspx/i)) {
    embedFunction(openMOA);
    var series = document.evaluate('//td[@class="field"][. ="Series number"]/following-sibling::td/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.lastChild.textContent;
    var barcode = document.location.href.match(/Barcode=(\d+)/)[1];
    if (series == 'B2455') {
        if (document.location.href.match(/NameSearch/)) {
            var div = document.getElementById('ucItemDetails_lblTitle');
        } else {
            var div = document.getElementById('ctl00_ContentPlaceHolderSNRMain_ucItemDetails_lblTitle');
        }
        moa_button = document.createElement('input');
        moa_button.setAttribute('type', 'button');
        moa_button.setAttribute('value', 'View in Mapping our Anzacs');
        moa_button.setAttribute('onclick','openMOA(' + barcode + '); return false;');
        div.appendChild(moa_button);
    }
}
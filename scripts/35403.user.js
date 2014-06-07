// ==UserScript==
// @name          eBay Recent Feedback Ratings Fix
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/35403
// @version       0.1.2
// @date          2010-10-26
// @copyright     2008-2010, thorbenhauer
// @license       GPL 2 or later
// @include       http://feedback*.ebay.tld/ws/eBayISAPI.dll?*
//                for Opera (which doesn't understand tld):
// @include       http://feedback.ebay.com.au/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.at/ws/eBayISAPI.dll?*
// @include       http://feedback.befr.ebay.be/ws/eBayISAPI.dll?*
// @include       http://feedback.benl.ebay.be/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ca/ws/eBayISAPI.dll?*
// @include       http://feedback.cafr.ebay.ca/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.fr/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.de/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com.hk/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.in/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ie/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.it/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com.my/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.nl/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ph/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.pl/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com.sg/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.es/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ch/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.co.uk/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com/ws/eBayISAPI.dll?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera
    
var trs = document.evaluate("//div[@class = 'frp']//tr", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var domainPath = document.domain + '/ws/eBayISAPI.dll?ViewFeedback2&items=200&';
var userid = document.evaluate("//td[@id = 'memberBadgeId']" +
    "//a[contains(@href, 'http://myworld.')]" +
    "//span[@class ='mbg-nw']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
var matrix = new Array(
    new Array(
    'http://' + domainPath + 'which=positive&interval=30&userid=' + userid,
    'http://' + domainPath + 'which=positive&interval=180&userid=' + userid,
    'http://' + domainPath + 'which=positive&interval=365&userid=' + userid
    ),
    new Array(
    'http://' + domainPath + 'which=neutral&interval=30&userid=' + userid,
    'http://' + domainPath + 'which=neutral&interval=180&userid=' + userid,
    'http://' + domainPath + 'which=neutral&interval=365&userid=' + userid
    ),
    new Array(
    'http://' + domainPath + 'which=negative&interval=30&userid=' + userid,
    'http://' + domainPath + 'which=negative&interval=180&userid=' + userid,
    'http://' + domainPath + 'which=negative&interval=365&userid=' + userid
    )
)
var tr, td, text, first, a;
for (var i = 0; i < trs.snapshotLength; i++) {
    tr = trs.snapshotItem(i);
    tds = tr.getElementsByTagName('td');
    for (var j = 2; j < tds.length; j++) {
        td = tds[j];
        //if (td.firstChild.tagName != 'A') {
            first = td.firstChild;
            text = first.innerHTML;
            a = document.createElement('a');
            a.href = matrix[i][j - 2];
            a.innerHTML = text;
            td.replaceChild(a, first);
                    
        //}
        first = td.firstChild;
        switch(i) {
            case 0: first.setAttribute('class', 'erfrfPos');
                    break;
            case 1: first.setAttribute('class', 'erfrfNeu');
                    break;
            case 2: first.setAttribute('class', 'erfrfNeg');
                    break;
        }
    }
}
var head = document.getElementsByTagName("head")[0];
var style = document.createElement("style");
style.innerHTML = 'a.erfrfPos {color: #009900 !important; ' +
    'text-decoration: underline !important;} a.erfrfNeu {color: #666666 ' +
    '!important; text-decoration: underline !important;} a.erfrfNeg {color: ' +
    '#FF0000 !important; text-decoration: underline !important;}';
head.appendChild(style); 

})(); // function wrapper for Opera
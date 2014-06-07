// ==UserScript==
// @name       Probux balance
// @include    http://www.probux.com/account.php
// ==/UserScript==

var element = document.evaluate("/html/body/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[4]/td[2]/strong", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (element != null) {
    document.getElementsByTagName("body")[0].innerHTML = "<style>body { background: white; }</style><font color='green'><strong>" + element.innerHTML + "</strong></font>";
}
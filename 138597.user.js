// ==UserScript==
// @name       Convert http address to https address
// @namespace  com.mehedi
// @version    0.1
// @description  converts http address to https and reload when a block is detected.
// @include      *
// @copyright  2012, Mehedi Hasan
// ==/UserScript==

var title = document.getElementsByTagName("title")[0];
if(title.innerHTML == "ERROR: The requested file download is not permitted by the departmental IT policy"){
    var adrs = window.location.href.toString();
    adrs = adrs.slice(4);
    adrs = "https".concat(adrs);
    document.write = "redirecting to " + adrs;
    window.location = adrs;
}
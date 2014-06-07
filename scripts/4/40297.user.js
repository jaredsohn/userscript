// ==UserScript==
// @name           Ocado: disable voucher autocomplete
// @namespace      http://raines.me.uk/
// @description    This script disables saving of gift voucher numbers at ocado.com, since you only ever use a gift voucher once.
// @include        https://www.ocado.com/webshop/VBVArrival.do
// @include        https://www.ocado.com/webshop/addDiscountFromSummary.do
// ==/UserScript==

var fields = ["serialNumber", "scratchCode"];
for (var i = 0; i < fields.length; ++i) {
    var field = document.getElementById(fields[i]);
    if (field) {
        field.setAttribute("autocomplete", "off");
    }
}


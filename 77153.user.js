// ==UserScript==
// @name           Powershop Price Sorter
// @namespace      http://userscripts.org/users/124800
// @description    Sorts products by lowest price automatically.
// @include        https://secure.powershop.co.nz/*buy_power/list
// ==/UserScript==

var orderBy = document.getElementById("supplier_order_by");
if (orderBy.selectedIndex != 2)
{
	orderBy.selectedIndex = 2;
	orderBy.form.submit();
}
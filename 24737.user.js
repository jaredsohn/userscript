// ==UserScript==
// @name           eBay Selling Manager Pro - Automatically Confirm Status Change
// @namespace      Seifer - http://userscripts.org/users/33118
// @description    Automatically submits the confirmation form.
// @include        http://k2b-bulk.ebay.com.au/ws/eBayISAPI.dll?MyEbaySellingSoldListingsAction*markselectedtop=Mark*
// ==/UserScript==

submitbut = document.createElement('input');
submitbut.setAttribute('type','hidden');
submitbut.setAttribute('name','confirm');
submitbut.setAttribute('value','Confirm Status');
document.getElementById('frmSubmit').appendChild(submitbut);
document.getElementById('frmSubmit').submit();
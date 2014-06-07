// ==UserScript==
// @name       Tradera Checkbox Enabler
// @namespace  http://popeen.com
// @version    0.1
// @description  Enables the checkboxes on Mitt Tradera
// @include      *tradera.com/MyTradera/Buyer.aspx*
// ==/UserScript==

var myTraderaRightContent = document.getElementById('myTraderaRightContent').innerHTML;
document.getElementById('myTraderaRightContent').innerHTML = myTraderaRightContent.replace(/disabled="disabled"/g, '');
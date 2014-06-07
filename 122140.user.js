// ==UserScript==
// @name AddKramm
// @include http://admin.emunity.net/products/smsbox/smsbox_sms.cfm?product_id*
// ==/UserScript==

var addText = document.getElementsByName('message')[0];
addText.innerHTML += " Puss & kram från 118800";


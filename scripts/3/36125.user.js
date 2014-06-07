// ==UserScript==
// @name           Facebook Mafia Wars script
// @description    Isi Duit Dale bank Bot
// @include http://apps.facebook.com/inthemafia/bank.php
// ==/UserScript==

var reload=true;
Array.forEach(document.getElementsByTagName("INPUT"),function(input){if (input.value=="Deposit") {input.click();reload=false;}});
if (reload) document.location.reload(true);
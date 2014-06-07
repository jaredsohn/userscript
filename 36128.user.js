// ==UserScript==
// @name           Facebook Bank MobWars script
// @namespace      http://sportexotics.net
// @description    Bank Hitlist Bot
// @include http://apps.facebook.com/mobwars/bank/
// @include http://apps.facebook.com/mobwars/bank/index.php
// @include http://apps.new.facebook.com/mobwars/bank/
// @include http://apps.new.facebook.com/mobwars/bank/index.php 
// ==/UserScript==

var reload=true;
Array.forEach(document.getElementsByTagName("INPUT"),function(input){if (input.value=="Deposit") {input.click();reload=false;}});
if (reload) document.location.reload(true); 

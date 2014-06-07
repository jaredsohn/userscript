// ==UserScript==
// @name           Facebook Bank DragonWars script
// @namespace      http://www.hotmail.com
// @description    Bank Hitlist Bot
// @include http://apps.facebook.com/dragonwars/bank.php
// @include http://apps.facebook.com/dragonwars/bank/index.php
// @include http://apps.new.facebook.com/dragonwars/bank/
// @include http://apps.new.facebook.com/dragonwars/bank/index.php 
// ==/UserScript==

var reload=true;
Array.forEach(document.getElementsByTagName("INPUT"),function(input){if (input.value=="Deposit") {input.click();reload=false;}});
if (reload) document.location.reload(true); 

// ==UserScript==
// @name           Facebook MobWars script
// @namespace      http://sportexotics.net
// @description    Hitlist Bot
// @include http://apps.facebook.com/mobwars/hitlist/
// @include http://apps.facebook.com/mobwars/hitlist/index.php
// @include http://apps.new.facebook.com/mobwars/hitlist/
// @include http://apps.new.facebook.com/mobwars/hitlist/index.php 
// ==/UserScript==

var reload=true;
Array.forEach(document.getElementsByTagName("INPUT"),function(input){if (input.value=="attack") {input.click();reload=false;}});
if (reload) document.location.reload(true); 

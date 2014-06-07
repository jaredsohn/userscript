// ==UserScript==
// @name           Facebook Mafia Wars script
// @namespace      http://sportexotics.net
// @description    Hitlist Bot
// @include http://apps.facebook.com/inthemafia/hitlist/
// @include http://apps.facebook.com/inthemafia/hits.php
// @include http://apps.new.facebook.com/inthemafia/hitlist/
// @include http://apps.new.facebook.com/inthemafia/hits.php
// ==/UserScript==

var reload=true;
Array.forEach(document.getElementsByTagName("INPUT"),function(input){if (input.value=="attack") {input.click();reload=false;}});
if (reload) document.location.reload(true);
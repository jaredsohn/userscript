// ==UserScript==
// @name           Bikorim No resize reload
// @namespace      http://www.theiceman.co.il/
// @description    Kills the autoreload
// @include        http://www.kipa.co.il/bikorim/
// ==/UserScript==
unsafeWindow.onresize = function(){};

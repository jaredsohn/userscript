// ==UserScript==
// @name           Redirect2MH
// @namespace      elie
// @description    To login FB and then redirect to MH
// @include        http://www.facebook.com/editapps.php?v=prototypes
// ==/UserScript==

var MH_SOUND_HORN_URL = "http://www.google.com.tw/dictionary";
self.setTimeout(function() {self.location = MH_SOUND_HORN_URL;}, 10000);
// ==UserScript==
// @name           Magellan Fix
// @description    Fixes Firefox 22 Magellan Communicator Problem on www.geocaching.com
// @include        http://www.geocaching.com/seek/sendtogps*
// @version 	   0.01
// ==/UserScript==
document.getElementById("pluginInfoText").innerHTML=""; document.getElementById("pluginId").removeAttribute("hidden"); if (InitializePlugin()) {jQuery('#checkDeviceBut').removeAttr("disabled"); OnCheckConnectionClick();}
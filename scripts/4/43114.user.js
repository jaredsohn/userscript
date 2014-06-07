// ==UserScript==
// @name           Kaskus Automatic Human Verify
// @namespace      Kaskus
// @include        http://www.kaskus.us/newreply.php?*
// @include        http://kaskus.us/newreply.php?*
// @include        http://kaskus.us/newthread.php?*
// @include        http://www.kaskus.us/newthread.php?*

// ==/UserScript==

var txtverify = document.getElementsByTagName("label")[0].innerHTML;
var subverify = txtverify.substring(8,txtverify.length-2);
subverify = subverify.replace(/x/, "*");
subverify = subverify.replace(/:/, "/");
document.getElementById("humanverify").value=eval(subverify);
// ==UserScript==
// @name           Autosubscribe
// @namespace      what.cd
// @description    Automatically checks "Subscribe to topic" when creating a new thread
// @include        https://ssl.what.cd/forums.php?action=new*
// @include        http://what.cd/forums.php?action=new*
// ==/UserScript==

var subscribeBox = document.getElementById('subscribebox');
subscribeBox.setAttribute('checked','checked');

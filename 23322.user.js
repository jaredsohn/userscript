// ==UserScript==
// @name           Flashback - auto-leave forum
// @namespace      flashback
// @description    When leaving the forums over at Flashback you're promted to manually accept it - this script sends the user to the correct URL directly
// @include        *flashback.info/leave.php*
// ==/UserScript==

var links = document.getElementsByTagName('a');
document.location=links[1];
// ==UserScript==
// @name           I'm Feeling Firefox Lucky
// @namespace      jaymac407@@tangowebsolutions.com
// @description    Adds a "I'm feeling lucky" button to Mozilla/Google's Firefox Start Page
// @include        http://*google*/firefox*
// ==/UserScript==

var googleSearchButton = document.getElementById('sf').nextElementSibling.nextElementSibling;
var imFeelingLuckyButton = document.createElement("span");
imFeelingLuckyButton.innerHTML = '<input type="submit" onclick="this.checked=1" class="lsb" value="I\'m Feeling Lucky" name="btnI">';
googleSearchButton.parentNode.insertBefore(imFeelingLuckyButton, googleSearchButton.nextSibling);
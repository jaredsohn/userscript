// ==UserScript==
// @name           script :P
// @namespace      ...
// @include        http://nl*.tribalwars.nl/staemme.php?village=*&screen=place*confirm*
// ==/UserScript==

var aantal_LC = 60


var form =  document.forms[0]
var i = document.forms[0].innerHTML
var i = i.replace(/" type="hidden/g, '" type="visible');
document.forms[0].innerHTML = i
var form =  document.forms[0]
form.getElementsByTagName('input')[9].value = aantal_LC
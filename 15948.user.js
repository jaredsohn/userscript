// ==UserScript==
// @name           Xenocide Steal Refresher
// @namespace      Xenocide
// @author         Flipper
// @description    Get reminded about stealing cars on Xenocide!
// @include        http://www.xenocide-rpg.com/garage.asp?action=steal
// @include        http://www.xenocide-rpg.net/garage.asp?action=steal
// @include        http://www.xenocide-rpg.org/garage.asp?action=steal
// @include        http://www.xenorpg.com/garage.asp?action=steal
// @include        http://xenocide-rpg.com/garage.asp?action=steal
// @include        http://xenocide-rpg.net/garage.asp?action=steal
// @include        http://xenocide-rpg.org/garage.asp?action=steal
// @include        http://xenorpg.com/garage.asp?action=steal
// ==/UserScript==

var p;
p = document.getElementsByTagName('P')[1].innerHTML;

if(p==""){
document.forms[1].elements[0].setAttribute('maxlength','3');
alert("Enter in the code!");
document.forms[1].elements[0].focus(); 
}
else {
setTimeout("window.location=window.location",121000);
}
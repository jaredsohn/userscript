// ==UserScript==
// @name           Redeem Quick
// @namespace      ArhAngeL
// @description      You can use it for redemption (from k0st4s & ArhAngeL)[country selected] - fucking pirated by Diz.
// @include		*lockerz*
// @include		*www.lockerz.com*
// @include        *cswiki.pl*
// @include        *ptzplace.lockerz.com*
// @include        *premium.retkinia.net*
// @include        *premiuminvites.info*

// ==/UserScript==

var country = "Ukraine";
var countryCode = "UA";

document.getElementById("country").value = country;
document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML = country;
document.getElementById("countryDetails").value = country;
window.location= "javascript: manipulateForm('"+countryCode+"');";


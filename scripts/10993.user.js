// ==UserScript==
// @name          DF_Bundle
// @namespace     http://gmscripts.bigsleep.net
// @description   DepositFiles helper script
// @include       http://depositfiles.com/*/files/*
// @version       0.1
// ==/UserScript==

/* Bypass DepositFiles pages and go directly to mirror site */

/* Click free button
    <input ... title="Download" ... type="image">
*/

var FreeForm = document.forms.namedItem("gateway_form");
if(FreeForm){
  var FreeButton = document.evaluate("//input[@title='Download' and @type='image']", FreeForm, null, 9, null).singleNodeValue;
  FreeForm.target = "_self";
  FreeButton.removeAttribute("onclick");
  FreeButton.click();
}

/* Load mirror URL
    <a href="http://depositfiles.com/mirror.php?id=...">DOWNLOAD</a>
*/

var MirrorLink = document.evaluate("//a[starts-with(@href,'http://depositfiles.com/mirror.php?id=')]", document, null, 9, null).singleNodeValue;
if(MirrorLink && MirrorLink.href){
  location.replace(MirrorLink.href);
}

// ==UserScript==
// @name        CS2 Choose Best Speed
// @namespace   userscripts.org
// @description disables the jump button with the higher turn usage
// @include     http://*.chosenspace.com/index.php
// @include     http://*.chosenspace.com/index.php?view=sector*
// @exclude     http://*.chosenspace.com/*/*
// ==/UserScript==
firebug=false;
function log(what){if(firebug)console.log(what);}
log("START CBS");
var LSa=document.evaluate("//input[@value='Light Speed']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var LS=LSa.snapshotItem(0);
if(LS){
log("Light Speed Button found");
  var LSt=LS.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild.nodeValue.split(" ")[1];
log("LS Turns: "+LSt);
  var HJa=document.evaluate("//input[@value='Hyper Jump']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var HJ=HJa.snapshotItem(0);
  var HJt=HJ.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild.nodeValue.split(" ")[1];
log("HJ Turns: "+HJt);
  if((LSt*1)<(HJt*1)){
    HJ.type='button';
    HJ.className='forms_btn_off';
  }
  else if((LSt*1)>(HJt*1)){
    LS.type='button';
    LS.className='forms_btn_off';
  }
}
log("END CBS");

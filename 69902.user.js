// ==UserScript==
// @name           Meebo Autocomplete for Opera
// @namespace      http://tomec.net/meebo-autocomplete
// @description    Go to meebo.com, fill out your meebo login and password, press Enter
// @include        http://www.meebo.com/
// @include        https://www.meebo.com/
// @include        http://meebo.com/
// @include        https://meebo.com/
// ==/UserScript==

(function(){
  var success = false;
  
  var renameInputs = function(){
    if (success == true) return;
    
    var xpath;
    var successLocal = true;
    
    // name
    xpath = document.evaluate("//input[@id='meeboid']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    successLocal &= (xpath.snapshotLength != 0);
    for(var i=0;i < xpath.snapshotLength; i++){
      xpath.snapshotItem(i).name = "meeboid";
      xpath.snapshotItem(i).setAttribute("autocomplete", "on");
    }
    
    // password
    xpath = document.evaluate("//input[@id='meebopassword']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    successLocal &= (xpath.snapshotLength != 0);
    for(var i=0;i < xpath.snapshotLength; i++){
      xpath.snapshotItem(i).name = "meebopassword";
      xpath.snapshotItem(i).setAttribute("autocomplete", "on");
    }
    
    success = successLocal;
  };
  
  // first attach the event in case the function should throw exception
  document.addEventListener("DOMContentLoaded", renameInputs, false);
  renameInputs();
})();

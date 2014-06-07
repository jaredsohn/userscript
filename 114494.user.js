// ==UserScript==
// @name           Footprints Checkboxes in Firefox 7
// @namespace      footprintcheckboxstyle
// @description    Unhides the checkboxes in footprints for use with Firefix 7
// @include        http*://*/MRcgi/MRhomepage.pl*
// ==/UserScript==
  unsafeWindow.enableCheckBoxes= function(){
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {  
      if (inputs[i].type == "checkbox") {  
        inputs[i].style.marginLeft = "1px";
      }
    }
}
unsafeWindow.setTimeout("enableCheckBoxes()", 2000)
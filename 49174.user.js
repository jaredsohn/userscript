// ==UserScript==
// @name        transmission
// @version     v0.1
// @namespace   http://fluidapp.com
// @description Integrates Fluid.app with the Transmission web-client.
// @include     *
// @author      Hans Larsen (aka Poltras), http://ofcodeandmen.poltras.com/
// 
// @todo        Add sound when download finishes.
//              Add menus to select between transfer speed and size.
//              Add menus to remove sounds and diverse options.
//              Add inspector window instead of pane.
// ==/UserScript==

(function () {
   if (!window.fluid) {
      return;
   }
   
   const kShowUploadSpeed = 1;
   const kShowDnloadSpeed = 2;
   
   var infoShown = kShowDnloadSpeed;
   
   updateDataShown();
   updateBadge();
   
   function getUnit(txt) {
      if (txt.match(/KB\/s/)) {
         return "k";
      }
      else if (txt.match(/MB\/s/)) {
         return "M";
      }
      else {
         return "b";
      }
   }
   
   function updateDataShown() {
      if (infoShown == kShowDnloadSpeed) {
         infoShown = kShowUploadSpeed;
      }
      else {
         infoShown = kShowDnloadSpeed;
      }
      
      window.setTimeout(updateDataShown, 2000);
   }
   
   function showUploadSpeed() {
      var upTxt = $('#torrent_global_upload').text();
      var up    = upTxt.match(/^\d+/);
      if (up == "0") {
         return false;
      }

      window.fluid.dockBadge = "\u2191 " + up   + getUnit("" + upTxt);
      return true;
   }
   
   function showDnloadSpeed() {
      var dnTxt = $('#torrent_global_download').text();
      var dn    = dnTxt.match(/^\d+/);
      if (dn == "0") {
         return false;
      }
      
      window.fluid.dockBadge = "\u2193 " + dn   + getUnit("" + dnTxt);
      return true;
   }
   
   
   function updateBadge() {
      // Get the text
      switch( infoShown ) {
         case kShowUploadSpeed:  if (!showUploadSpeed()) {
                                    if (!showDnloadSpeed()) {
                                       window.fluid.dockBadge = "";
                                    }
                                 }
                                 break;
                                 
         case kShowDnloadSpeed:  if (!showDnloadSpeed()) {
                                    if (!showUploadSpeed()) {
                                       window.fluid.dockBadge = "";
                                    }
                                 }
                                 break;

         default: window.fluid.dockBadge = "";
      }
      
      window.setTimeout(updateBadge, 200);
   }
})();

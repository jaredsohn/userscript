// ==UserScript==
// @name       Fix DOGGR
// @namespace  http://rscivil.com/
// @version    0.1
// @description  Makes Wells visible at higher zoom levels.
// @match      http://maps.conservation.ca.gov/doms/doms-app.html
// @copyright  2012+, Andrew Binning
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

    


$(document).ready(function() {
  
    
  $('body').append('<input type="button" value="Show All" id="CP">')
  $("#CP").css("position", "fixed").css("top", 0).css("left", 300).css("z-index", 9001);
  $('#CP').click(function(){ 
					// Set adminBoundaryCheckedMenuItem enabled and DOMS_Admin_Bounds layer visibility
					if (dijit.byId("adminBoundaryCheckedMenuItem").disabled) {
						dijit.byId("adminBoundaryCheckedMenuItem").set("disabled", false);
						// Also set adminBoundarySliderMenuItem enabled
						dijit.byId("adminBoundarySliderMenuItem").set("disabled", false);

						if (!map.getLayer("DOMS_Admin_Bounds").visible && dijit.byId("adminBoundaryCheckedMenuItem").checked) {
							map.getLayer("DOMS_Admin_Bounds").show();
							$("slider01").SetEnabled(true);
						}
					}
                  
						dijit.byId(mainDataCheckedMenuItemDijitID).set("disabled", false);
						dijit.byId("wellHighlightType").set("disabled", false);
						dijit.byId("wellHighlightType").set("title", "Click to Change Well Label");
						dijit.byId("wellHighlightType").set("tooltip", "Click to Change Well Label");

						// Set the visible layers for DOMS_Labels
						// NOTE: May not need this.
						//map.getLayer(mainDataSelectedLayerName).setVisibleLayers([0,1]);

						if (!map.getLayer(mainDataLayerName).visible && dijit.byId(mainDataCheckedMenuItemDijitID).checked) {
							map.getLayer(mainDataLayerName).show();
							map.getLayer(mainDataSelectedLayerName).show();
						}
                  
      
  });
});
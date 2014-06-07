// ==UserScript==
// @name          Tot_dem_winzigen - Death to the micros. 
// @namespace     http://browseimages.mozdev.org/
// @description   Increases the font size to 9pt of smaller text parts to make it readable.
// @include       *viewtopic*
// ==/UserScript==

var span = document.getElementsByTagName("span");

for(var i = 0; i < span.length; i++) {
    
    spst = span[i].getAttribute("style");
    
    if(spst != null && 
       (spst.toString() == "font-size: 8px; line-height: normal;" ||
        spst.toString() == "font-size: 7px; line-height: normal;" ||
        spst.toString() == "font-size: 6px; line-height: normal;" ||
        spst.toString() == "font-size: 5px; line-height: normal;" ||
        spst.toString() == "font-size: 4px; line-height: normal;" ||
        spst.toString() == "font-size: 3px; line-height: normal;" ||
        spst.toString() == "font-size: 2px; line-height: normal;" ||
        spst.toString() == "font-size: 1px; line-height: normal;")) {
        
         span[i].setAttribute("style", "font-size: 9px; line-height: normal;");
       
    }
    
    
}
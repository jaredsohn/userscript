// ==UserScript==
// @id             noWhiteBackgroundColor-1
// @name           noWhiteBackgroundColor-1
// @version        2.0
// @namespace      
// @author         HowardSmith
// @description    Version 2: Generic version which can now be configured to any background colour you like:
// @include        *
// @exclude        
// @run-at         document-start
// ==/UserScript==
(function () {
    function noWhiteBackgroundColor() {
    
        function changeBackgroundColor(x)  {  // auto change colors too close to white
            var backgroundColorRGB=window.getComputedStyle(x,null).backgroundColor;  // get background-color
            if(backgroundColorRGB!="transparent")  {  // convert hex color to rgb color to compare
                var RGBValuesArray = backgroundColorRGB.match(/\d+/g); //get rgb values
                var red   = RGBValuesArray[0];
                var green = RGBValuesArray[1];
                var blue  = RGBValuesArray[2];
                
                // ============================================================================
                // Set the base colors you require: 
                // use: http://www.colorpicker.com
                // to find the rgb values of the base colour you wish to suppress white backgrounds with:
                // Default gray provided:
                // ============================================================================
                
                var red_needed   = 220;
                var green_needed = 220;
                var blue_needed  = 220;
                
                
                if (red>=220&&green>=220&&blue>=220) {   // white range detection

                   if      (red>=250&&red<=255&&green>=250&&green<=255&&blue>=250&&blue<=255) {
                      red_needed   += 0;
                      green_needed += 0; }
  
                   else if (red>=240&&red<=255&&green>=240&&green<=255&&blue>=240&&blue<=255) {
                      red_needed   += 6;
                      green_needed += 3; }  

                   else if (red>=230&&red<=255&&green>=230&&green<=255&&blue>=230&&blue<=255) {
                      red_needed   += 10;
                      green_needed += 5; }

                   else if (red>=220&&red<=255&&green>=220&&green<=255&&blue>=220&&blue<=255) {
                      red_needed   += 14;
                      green_needed += 7; } 
                      
                   x.style.backgroundColor="rgb( " +red_needed+ ", " +green_needed+ ", " +blue_needed+ ")"; // the background-color you want 
                   }
                }
            }
        var allElements=document.getElementsByTagName("*");  // get all elements on a page
        for(var i=0; i<allElements.length; i++)  {
            changeBackgroundColor(allElements[i]);}
    }
    window.addEventListener("DOMContentLoaded",noWhiteBackgroundColor, false);
})() ; 

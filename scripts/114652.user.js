// ==UserScript==
// @id             noWhiteBackgroundColor
// @name           noWhiteBackgroundColor
// @version        1.0
// @namespace      
// @author         lazyPig
// @description    
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
                var red = RGBValuesArray[0];
                var green = RGBValuesArray[1];
                var blue = RGBValuesArray[2];
                if (red>=250&&red<=255&&green>=250&&green<=255&&blue>=250&&blue<=255)  {  //pick the color range to change
                    x.style.backgroundColor="rgb(192,220,192)";}  // the background-color you want 
                }
            }
        var allElements=document.getElementsByTagName("*");  // get all elements on a page
        for(var i=0; i<allElements.length; i++)  {
            changeBackgroundColor(allElements[i]);}
    }
    window.addEventListener("DOMContentLoaded",noWhiteBackgroundColor, false);
})() ; 
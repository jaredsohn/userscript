// ==UserScript==
// @name  YouTube: Arctic White
// @version  0.2
// @description  Change your YouTube Player theme to White.
// @include  *://*.youtube.*
// @include  *://*.googlevideo*
// @include  *://*.google.*
// @author  celliott1997
// @namespace  http://www.youtube.co.uk/
// @icon       http://s3.amazonaws.com/uso_ss/icon/174633/large.png
// ==/UserScript==

var colour = "theme=light&color=red";

var fla = document.getElementsByTagName("embed")[0]
if(fla != null){
    // Apply theme;
    fla.setAttribute("data", colour);
    fla.setAttribute("flashvars", fla.getAttribute("flashvars")+"&"+colour);
    
    // Reload YouTube;
    flaPt = fla.parentNode;
    inHtm = flaPt.innerHTML;
    flaPt.innerHTML = "";
    flaPt.innerHTML = inHtm;
};
// ==UserScript==
// @name           right click enable by Zabeltechcentre
// @namespace      quiethackermultiztc@gmail.com
// @description    Version 3.7
// @author         Zabel Iqbal
// @updateURL      https://userscripts.org/scripts/source/69797.meta.js
// @version        3.7
// ==/UserScript==


// Deshabilita botón derecho ratón

isNN = document.layers ? 1 : 0; 

function noContext(){return false;}

function noClick(e){
    if(isNN){
        if(e.which > 1) {return false;}
    } else { 
        if(event.button > 1){return false;}
    }
}

if(isNN){ 
    document.PrxOff_captureEvents(Event.MOUSEDOWN);
}

document.oncontextmenu = noContext;
document.PrxOff_onmousedown   = noClick;
document.onmouseup     = noClick;

//=====================================


// Deshabilita la selección de texto

function disabletext(e){
return false
}

function reEnable(){
return true
}

//if the browser is IE4+
document.onselectstart=new Function ("return false")

//if the browser is NS6
if (window.sidebar){
document.PrxOff_onmousedown=disabletext
document.onclick=reEnable
}
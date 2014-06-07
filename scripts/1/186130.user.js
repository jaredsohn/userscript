// ==UserScript==
// @name       Snow stopper
// @version    0.1
// @description  Stop dat snow!
// @match      http://www.epicraft.ru/*
// @match      http://epicraft.ru/*
// @copyright  2013+, Nacky
// ==/UserScript==

function stopDatSnow(){
    if (movesnow != "function movesnow() {console.log(\"Snow stopped!\");}")
        movesnow = function movesnow() {console.log("Snow stopped!");};
    else
        setTimeout("stopDatSnow()",100);        
}

stopDatSnow();
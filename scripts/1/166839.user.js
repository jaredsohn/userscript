// ==UserScript==
// @id             boards.4chan.org-44dbb5bf-4ba3-4f79-a9d2-952532a504d3
// @name           4chan - Translate to and from Ente Islean
// @version        1.0
// @namespace      
// @author         Hanzou URUSHIHARA
// @description    
// @include        http://boards.4chan.org/a/res/*
// @run-at         window-load
// ==/UserScript==


var alpha_eng = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var alpha_ente = "AZYXEWVTISRQPNOMLKJHUGFDCBazyxewvtisrqpnomlkjhugfdcb";

function tranchar(c_eng){
    var x = alpha_eng.indexOf(c_eng);
    if( x == -1 ){
        c_ente = c_eng;
    }else{
        c_ente = alpha_ente.charAt(x);
    }
    return(c_ente);
}

unsafeWindow.translate = function(id){
    var eng = document.getElementById(id).innerHTML;
    var ente = "";
    var inHTMLTag = false;
    for(var i = 0 ; i < eng.length ; i++){
        if(eng.charAt(i) == "<")
            inHTMLTag = true;
        if(eng.charAt(i) == ">")
            inHTMLTag = false;
        inHTMLTag ? ente += eng.charAt(i) : ente += tranchar(eng.charAt(i));
    }
    ente = ente.replace("&amp;vh;","&gt;");
    ente = ente.replace("&vh;","&gt;");
    ente = ente.replace("&apm;","&amp;");
    ente = ente.replace("vh;","gt;");
    document.getElementById(id).innerHTML = ente;
}

function addElement(type, id, targetElement){
    var element = document.createElement(type);
    element.setAttribute("id", id);
    targetElement.appendChild(element);
    return element;
}

function keyEvtListMaou(e){
    if(e.altKey && e.keyCode == 88) { // Was Alt + X pressed?
        var txa = document.getElementById("qr").getElementsByTagName("textarea")[0];
        var eng = txa.value;
        var ente = "";
        for(var i = 0 ; i < eng.length ; i++){
            ente += tranchar(eng.charAt(i));
        }
        txa.value = ente;
    }
}

var elements = document.getElementsByClassName("postInfo");
var spanToAdd;

for(var i = 0; i < elements.length; i++){
    spanToAdd = addElement("a", "translateToEnteIsla", elements[i]);
    spanToAdd.setAttribute("href","javascript:translate('m" + elements[i].getElementsByTagName("input")[0].name + "');");
    spanToAdd.innerHTML = " [¤]";
}
var txa;
txa = document.getElementById("qr").getElementsByTagName("textarea")[0];
txa.addEventListener("keyup", keyEvtListMaou);
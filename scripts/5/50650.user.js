// ==UserScript==
// @name           AncientApe
// @namespace      AncientApe
// @include        http://hanchi.ihp.sinica.edu.tw.nthulib-oc.nthu.edu.tw/*
// @include        http://hanchi.ihp.sinica.edu.tw/ihpc/*
// ==/UserScript==

function PatchClass(className)
{
    var allElements = document.getElementsByTagName("*");
    for (var i = 0; (element = allElements[i]) != null; i++) {
        var elementClass = element.className;
        if ( elementClass && elementClass == className) {
            //alert(element);
            element.className = className + "_AA" ; // AA For Ancient Ape
         }
    }
}

PatchClass("div1") ;
PatchClass("div2") ;
PatchClass("div3") ;
PatchClass("div4") ;

GM_addStyle(
    // Make the whole body scrollable
    'BODY {overflow:scroll;padding:0px!important;margin:0px!important;height:100%;}'
);

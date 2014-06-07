// MonopolyCityStreets - Compare Buildings
// version 0.1 BETA!
// 2009-09-15
// Copyright (c) 2005, Florian Beisel
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MonopolyCityStreets - Compare Buildings
// @namespace     http://pacey.me
// @description   This Greasemonkey Script adds a comparable emphasis to Hasbros Monopoly City Streets
// @include       http://*.monopolycitystreets.com/*
// ==/UserScript==

function embedFunction(s) {
    funcContent = document.createElement('script');
    funcContent.innerHTML = s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
    
    document.body.appendChild(funcContent)
}

function calc() { 
    
    var allBuildings, thisBuilding

    allBuildings = document.evaluate ( 
        "//ol[@class='clearfix']/li/p[@class='price']" ,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    for ( var i = 0; i < allBuildings.snapshotLength; i++) {
         thisBuilding = allBuildings.snapshotItem(i)
         thisPrice = thisBuilding.textContent.replace(/[A-Z]|,/ig, '').trim()
         thisEffect = thisBuilding.nextElementSibling.textContent.replace(/[A-Z]|,/ig, '').trim()
         
         var pTag = document.createElement("p");
             pTag.id = "pcP"+i;       
             pTag.className ="dynamicDiv";       
             pTag.innerHTML = (thisPrice / thisEffect).toFixed(2) + " Days";       
             if ( ! document.getElementById('pcP'+i) ) {
                 thisBuilding.parentNode.appendChild(pTag)
        }
    } 
}

function registerFunctions() {
    if ( typeof (MCS) == 'undefined' ) {
        window.setTimeout("registerFunctions()",1000);
        return;
    }
    MCS.DIALOG.show_wrapped = MCS.DIALOG.show
    MCS.DIALOG.show_wrapped.prototype = MCS.DIALOG.show.prototype

    MCS.DIALOG.show = function (id, data) { window.setTimeout("calc()", 10);return MCS.DIALOG.show_wrapped(id, data); }
    MCS.DIALOG.show.prototype = function (id, data) { window.setTimeout("calc()", 10);return MCS.DIALOG.show_wrapped(id, data); }
}

embedFunction(calc);
embedFunction(registerFunctions);

registerFunctions()
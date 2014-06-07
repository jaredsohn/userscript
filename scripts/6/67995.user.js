// ==UserScript==
// @name           HoN-Forum Banner Remover
// @namespace      forums.heroesofnewerth
// @description    Removes "Gift-box" and "Pre-purchase Banner"
// @include        http://forums.heroesofnewerth.com/*
// @include        http://*.heroesofnewerth.com/*
// ==/UserScript==

function isKnownTable(tab, headGrafikContent){
    var size = tab.getAttribute('width');
    if (size < 160 || size > 164){ // Grösse muss im Bereich der "rechten"-Spalte sein
        return false;
    }
    
    var img = tab.getElementsByTagName('img');
    if (img.length < 1){
        return false; // Tabelle muss Bilder enthalten
    }
    
    var src = img[0].getAttribute('src');
    var pos = src.indexOf(headGrafikContent, 0);
    if (pos == -1){ // die erste Grafik der Tabelle muss das Suchwort enthalten
        return false 
    }
    
    return true;
}


function hasAttribute(element, attribute, sollWert){
    if (element == null){
        return false;
    }
    
    var attrib = element.getAttribute(attribute);
    if (attrib == null){
        return false;
    }
    
    if (attrib != sollWert){
        return false;
    }
    
    return true;
}


function containsImage(element, alt){
    if (element == null){
        return false;
    }
    
    var img = element.getElementsByTagName('img');
    if (img == null){
        return false;
    }
    
    if (img.length != 1){
        return false;
    }
    
    if (!hasAttribute(img[0], "alt", alt)){
        return false;
    }
    
    return true;
}


function deleteBlock(element){
    if (element != null){
        element.innerHTML = "";
        element.style.visibility = "hidden";
        element.style.width = "0";
        element.style.height = "0";
    }
}


// Löscht ungewünschte Tabellen auf der rechten Seite:
deleteBlock(document.getElementById("giftbox"));
deleteBlock(document.getElementById("purchase_pref"));

var tbl = document.getElementsByTagName('table');
for(i=0; i<tbl.length;i++){
    curTable = tbl[i];
    
    if (isKnownTable(curTable, "giftbox")){
        deleteBlock(curTable); continue;
    }
    
    if (isKnownTable(curTable, "purchase_pref")){
        deleteBlock(curTable); continue;
    }
}
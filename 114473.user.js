// ==UserScript==

// @name           RemoveJunk_Repubblica.it
// @namespace      userscripts.org
// @description    Removes junk gossip right pannel from news website Repubblica.it
// @include        http://www.repubblica.it/*
// @copyright      Sergio Nasi
// @website        http://userscripts.org/users/111997
// @version        2.0

// ==/UserScript==

function deleteElementsByClass(vClass,vElem) {

    var elems = Array.filter(document.getElementsByClassName(vClass), 
                             function(elem){
                                return elem.nodeName == vElem;
                             });
                             
    for (i = 0; i < elems.length; i++) {
            elems[i].style.display = "none";
    }    
    
}


deleteElementsByClass("sidebar-content","DIV");
deleteElementsByClass("manchette-left","DIV");
deleteElementsByClass("manchette-right","DIV");
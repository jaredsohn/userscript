//
// ==UserScript==
// @name          Metalink Popup Remover
// @namespace     http://www.weaklogic.com/
// @description   Removes javascript popups from Metalink
// @include       https://metalink.oracle.com/*
// @include       https://updates.oracle.com/*
// ==/UserScript==


var allElements, thisElement;
allElements = document.getElementsByTagName('a');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    
        
    if (thisElement.href.match(/^javascript:popupURL\(/)) {
       var desturl;
       if (desturl = thisElement.href.match(/\'(.*)\'/)) {
          thisElement.href = "https://metalink.oracle.com/metalink/plsql/" + desturl[1];
       }
    }
    
    if (thisElement.href.match(/^javascript:viewSR\(/)) {
       var desturl;
       if (desturl = thisElement.href.match(/\(([0-9.]+),\d+\)/)) {
          thisElement.href = "https://metalink.oracle.com/metalink/plsql/tar_main.single_tar?p_tarNumber=" + desturl[1] + "&p_show=Show";
       }
    }
    
    if (thisElement.href.match(/^javascript:showDetails\(/)) {
       var desturl;
       if (desturl = thisElement.href.match(/\"(.*)\"/)) {
          thisElement.href = "https://updates.oracle.com" + desturl[1];
       }
    }
    
    if (thisElement.href.match(/^javascript:getdoc\(/)) {
    	
       var desturl;
       if (desturl = thisElement.href.match(/\'(NOTE)?\:(.*)\'/)) {
          thisElement.href = "https://metalink.oracle.com/metalink/plsql/showdoc?db=NOT&id=" + desturl[2];
       }
    }
    
}

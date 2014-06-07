// ==UserScript==
// @name           autokadabra_hide_negative
// @namespace      http://autokadabra.ru/clubs/all/*
// @include        http://autokadabra.ru/clubs/all/*
// ==/UserScript==

//для совместимости с opera script
if( location.href.indexOf('autokadabra.ru/clubs/all/') != -1 ) {

//получим список всех дивов
allDivs = document.evaluate("//div",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    a=thisDiv.className;
    var blockThis=false;
    
    
    if (a.match("post posttype")) {

    //получим все вложенные дивы
    nestedDivs=thisDiv.getElementsByTagName('div');
    for (var s=0; s<nestedDivs.length; s++) {
        curDiv=nestedDivs[s];
        
        if (curDiv.className=='content') bodyDiv=curDiv;
        
        if (curDiv.className.match('voting negative')) {
                bodyDiv.style.display='none';
	    //alert(a);
        }
    }
  }
    }
}//end opera compat


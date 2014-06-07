// ==UserScript==
// @name           Osud.cz - odstraneni komentaru nezadoucich uzivatelu
// @namespace      dave0402
// @description    Skript odstrani komentare nezadoucich autoru
// @include        http://www.osud.cz/node/*
// ==/UserScript==

// ------------------------------------------
// | Zde si muzete upravit chovani programu |
// ------------------------------------------

// zde je seznam uzivatelu oddeleny carkou 
// napr: var blackList="otrava,lempl,nechci.videt";
// nebo muzete nechat seznam uzivatlu prazdny: var blackList=""; 
var blackList="";

// zde si muzete nechat zobrazit pocet zablokovanych komentaru
// zobrazeni zpravy: var showMessage = true;
// nezobrazovani: var showMessage = false;   
var showMessage = true;


// ------------------------------------------------------------------------

var commentCount = 0;

function removeComment(name) {                                      
    var param = "//a[starts-with(@href,'/uzivatele/" + name + "')]/parent::*/parent::*";    
    var fNodes = document.evaluate(param, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);            
    var fLength = fNodes.snapshotLength;
    
    commentCount += fLength;
    
    var i, fItem;
    for (i = 0; i < fLength; i++) {
        fItem = fNodes.snapshotItem(i);        
        fItem.parentNode.removeChild(fItem);
    }    
}

function removeCommentAll() {  
  var arrBlackList=blackList.split(',');
  for (i in arrBlackList)
    var name = arrBlackList[i].toLowerCase().replace(".", "");
    if(name != "")                      
      removeComment(name);
    
  if(commentCount > 0 && showMessage)
    alert("Pocet zablokovanych komentaru: " + commentCount);
}

window.addEventListener('load', removeCommentAll, false);

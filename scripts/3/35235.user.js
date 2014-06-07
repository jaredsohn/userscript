// ImperaOnlineMouseOverInfo
// 2008-10-07
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox.
// Under Tools, there will be a new menu item to "Add New User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select the User Script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// Benutzung auf eigene Gefahr!
//
// ==UserScript==
// @name           imperadetails
// @namespace      GreaseImperaGame
// @include        http://www.imperaonline.de/game/detail.php*
// @description		mouseover effect for imperaonline.de
// ==/UserScript==

var x = document.getElementsByTagName('tr');        
if (x)
{
    for (var i=0; i<x.length; i++)
    {
        if (x[i].cells[1]!=null)
        {
            var linksInCells = x[i].cells[1].getElementsByTagName('a');
            
            if (linksInCells.length > 0 && x[i].parentNode.parentNode.className == 'main')
            {
                var infoBoxDiv = document.createElement('span');
                var newLink = linksInCells[0];
                newLink.parentNode.appendChild(infoBoxDiv);
                var plName = newLink.innerHTML;
                
                newLink.addEventListener("mouseover",  createInfoBox(infoBoxDiv,getUIDoutofString(x[i].innerHTML,plName)), false);
                newLink.addEventListener("mouseout",   crushInfoBox(infoBoxDiv), false);
            }
        }    
    }
}
function createInfoBox(infoBoxContainer,uid){
    return function (){
        if (uid!=null)
        {
            var infoBox = document.createElement("div");
               var iBAttr = document.createAttribute("name");
               iBAttr.nodeValue = "infoBox";
               infoBox.setAttributeNode(iBAttr);
               
               infoBox.style.position = 'absolute';
                              
               infoBox.innerHTML = '<img src="http://www.imperaonline.de/extern.php?uid='+uid+'" />';
               var infoBoxes = document.getElementsByName("infoBox");
               
               for (j = 0;j<infoBoxes.length;j++)
                   infoBoxes[j].parentNode.innerHTML="";
               
               infoBoxContainer.innerHTML = "";
               infoBoxContainer.appendChild(infoBox);
        }
    }

}
function crushInfoBox(infoBoxContainer) {
   return function () {
           infoBoxContainer.innerHTML = "";
   }
}
function getUIDoutofString (value,name) {
    var re = new RegExp("(\\d+).>"+name,"");
    var result = re.exec(value);
    if (result!=null)
          return result[1];
      else return null;
}
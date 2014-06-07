// ==UserScript==
// @name          Document.all 
// @namespace     http://moppy.4free.co.il
// @description	  Adds the IE array for unsupported mozilla sites Motty Katan(c) 
// @include       *
// ==/UserScript==
//Change Log:
function addDocumentAll(){
  var oAllObjects = new Array();
  var oAllResults = document.evaluate("//*", document, null,   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var i=0; i<oAllResults.snapshotLength;i++)    
  {
       if (oAllResults.snapshotItem(i).id!==""){
           oAllObjects[oAllResults.snapshotItem(i).id] =          oAllResults.snapshotItem(i);
       }
  }
  unsafeWindow.document.all =  oAllObjects;
}
if (typeof(document.all)==="undefined"){
addDocumentAll();
}
// ==UserScript==
// @name           Spelling City Easy Edits
// @namespace      leroy_twiggles
// @description    Edit spelling city lists easily
// @include        http://www.spellingcity.com/edit-spelling-list.html?*
// ==/UserScript==


function edit_all()
{ 
  //Mark all the links
  var nodesSnapshot = document.evaluate("//div[contains(@id,'wordCol')]/a", document.body, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
  {
    var element = nodesSnapshot.snapshotItem(i);
    if (element.offsetWidth > 0) element.wrappedJSObject.onclick();
  }
  
  //Set tab index on all delete items
  var nodesSnapshot = document.evaluate("//a[contains(@class,'RemoveRow')]", document.body, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
  {
    var element = nodesSnapshot.snapshotItem(i);
    element.setAttribute('tabindex',-1);
  }
  
  //Set tab index on all links
  var nodesSnapshot = document.evaluate("//div[contains(@id,'listEntryBlock')]//a", document.body, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
  {
    var element = nodesSnapshot.snapshotItem(i);
    element.setAttribute('tabindex',-1);
  }  
}

//Initialize the page after everything else
setTimeout(function()
{
  edit_all();
  
  //Hook the renumber word list function
  var __renumberWordList = unsafeWindow.renumberWordList;
  unsafeWindow.renumberWordList = function()
  {
    __renumberWordList.apply(this,arguments);
    edit_all();
  }
  
}, 0);

//Hide the "Save Word" button - it causes problems and is no longer important
GM_addStyle("a.SaveWord { display: none !important; }");


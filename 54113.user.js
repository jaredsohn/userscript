// ==UserScript==
// @name           SelectAll
// @namespace      CS
// @description    Adds Two new Buttons to the Messages Inbox and Saved Messages: Select All, Clear All
// @include        http://www.chosenspace.com/v2/*
// @exclude        http://www.chosenspace.com/v2/view/*
// ==/UserScript==
//many thanks to Jez Hailwood from which i took the de/selecting code (only small adaptions made) The code has been given free to use.
var test, TrashArray, Trash, newTD;
test=location.href.search('messages\_inbox');
if(test == -1) test=location.href.search('messages\_saved');
if(test != -1) {
   TrashArray=document.evaluate("//input[@value='Trash Selected']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   Trash=TrashArray.snapshotItem(0);
   if(Trash) {
      var ButtonSelectAll=document.createElement('input');
      ButtonSelectAll.className='forms_btn';
      ButtonSelectAll.type='button';
      ButtonSelectAll.value='Select All';
      ButtonSelectAll.style.margin='0px 2px 0px 0px';
      ButtonSelectAll.setAttribute('onclick',"var allTags=document.getElementsByTagName('input');for(i=0;i<allTags.length;i++){var checkbox=allTags[i];checkbox.checked=true;}");
      newTD=document.createElement('td');
      Trash.parentNode.parentNode.insertBefore(newTD,Trash.parentNode);
      newTD.appendChild(ButtonSelectAll);
      var ButtonDeselectAll=document.createElement('input');
      ButtonDeselectAll.className='forms_btn';
      ButtonDeselectAll.type='button';
      ButtonDeselectAll.value='Clear All';
      ButtonDeselectAll.style.margin='0px 2px 0px 0px';
      ButtonDeselectAll.setAttribute('onclick',"var allTags=document.getElementsByTagName('input');for(i=0;i<allTags.length;i++) {var checkbox=allTags[i];checkbox.checked=false;}");
      newTD=document.createElement('td');
      Trash.parentNode.parentNode.insertBefore(newTD,Trash.parentNode);
      newTD.appendChild(ButtonDeselectAll);
   }
}
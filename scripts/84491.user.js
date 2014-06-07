// DoH Item Sets
// 2009-12-07
// by Sae/Ryan
//---------------------------------------------------------------------
//---------------------------------------------------------------------
//
// ==UserScript==
// @name          DoH Item Sets
// @version       1.0.2
// @author        Athy/Charmaka
// @namespace     http://www.domainofheroes.com/
// @description   Create item sets for easy swapping and equipping of suits
// @include       http://domainofheroes.com/Game.aspx*
// @include       http://*.domainofheroes.com/Game.aspx*
// ==/UserScript==
//
// UID:
//

var ItemSets = new Array();
function LoadItemSets(){  var ItemSetsCount = GM_getValue("ItemSetsCount");  if ( ItemSetsCount )  {    for ( var i = 0; i <= ItemSetsCount - 1; i = i + 1 )    {      ItemSets[i] = GM_getValue("ItemSets" + i);    }  }}
function SaveItemSets(){  var ItemSetsCount = ItemSets.length;  GM_setValue("ItemSetsCount", ItemSetsCount);  if ( ItemSetsCount > 0 )  {    for ( var i = 0; i <= ItemSetsCount - 1; i = i + 1 )    {      GM_setValue("ItemSets" + i, ItemSets[i] );    }  }}

// Checkbox (Inv) a set
function ItemSetsAction(){
  var ItemSetsDrop, ItemSetIndex, ItemSetName, InvList;
  InvList = document.getElementById('muleList');
  ItemSetsDrop = document.getElementById('muleItemSetsDrop');  ItemSetIndex = ItemSetsDrop.selectedIndex;
  if ( ItemSetIndex == 0 ) {    return;  }  else  {    ItemSetName = ItemSetsDrop.options[ItemSetIndex].value;  }
  var ItemsInSet = 0;  var ItemSet = ItemSets[ItemSetIndex - 1].split("^");  ItemSet.splice(0,1);
  var Matches = ( InvList.childNodes[0].textContent.match(/\n/) ? 1 : 0 );
  for( var i = Matches; i <= InvList.childNodes.length - 1; i = i + 1)  {
    var ItemNum = 0;    ItemNum = String(InvList.childNodes[i].id).slice(3);
   if (ItemNum)    {
      var CheckBoxElement = document.getElementById('chk' + ItemNum);
     CheckBoxElement.checked = false;
     for ( var j = 0; j < ItemSet.length; j = j + 1)      {
        if ( ItemSet[j] == ItemNum )        {
          CheckBoxElement.checked = true;
          var removedItem = InvList.removeChild( InvList.childNodes[i] );
          InvList.insertBefore( removedItem, InvList.childNodes[Matches] );
          Matches = Matches + 1;
        }
      }
    }
  }
}

// Add Checked (Inv) items to a set
function ItemSetsAdd(){
  var ItemSetsDrop, ItemSetIndex, ItemSetName, InvList;
  InvList = document.getElementById('muleList');
  ItemSetsDrop = document.getElementById('muleItemSetsDrop');  ItemSetIndex = ItemSetsDrop.selectedIndex;
  if ( ItemSetIndex == 0 )  {
    ItemSetName = prompt("Please enter a new name for the set", "");
    if ( ItemSetName == "" )    {      return;    }  }  else  {    ItemSetName = ItemSetsDrop.options[ItemSetIndex].value;  }
  var ItemsInSet = 0;  var ItemSet = new Array();  var ItemNum = 0;
  for( var i = ( InvList.childNodes[0].textContent.match(/\n/) ? 1 : 0 ); i <= InvList.childNodes.length - 1; i = i + 1)  {
    ItemNum = String(InvList.childNodes[i].id).slice(3);
     if (ItemNum)    {
      var CheckBoxElement = document.getElementById('chk' + ItemNum);
       if ( CheckBoxElement.checked )      {        ItemSet[ItemsInSet] = ItemNum;        ItemsInSet = ItemsInSet + 1;      }
    }
  }
  if ( ItemsInSet > 0 )  {
    if ( ItemSetIndex == 0 )    {
      ItemSets[ItemSets.length] = ItemSetName + "^" + ItemSet.join("^"); // ALT-0159
      ItemSetsDrop.options[ItemSets.length] = new Option(ItemSetName,ItemSetName);
    }    else    {      ItemSets[ItemSetIndex - 1] = ItemSetName + "^" + ItemSet.join("^")[1]; // ALT-0159
    }
    SaveItemSets();
  }  else  {    confirm("No items were checked to be added!");  }
}

// Remove a set
function ItemSetsRemove(){
  var ItemSetsDrop, ItemSetIndex, ItemSetName;
  ItemSetsDrop = document.getElementById('muleItemSetsDrop');  ItemSetIndex = ItemSetsDrop.selectedIndex;  ItemSetName = ItemSetsDrop.options[ItemSetIndex].value;
  if ( confirm("Are you sure you want to remove " + ItemSetName + " from the list?") == true )  {    ItemSets.splice(ItemSetIndex - 1, 1);    document.getElementById('muleItemSetsDrop').remove(ItemSetIndex);    SaveItemSets();  }
}

function ItemSetsRename(){
  var ItemSetsDrop, ItemSetIndex, ItemSetName, ItemSetNewName;
  ItemSetsDrop = document.getElementById('muleItemSetsDrop');  ItemSetIndex = ItemSetsDrop.selectedIndex;  ItemSetName = ItemSetsDrop.options[ItemSetIndex].value;
  ItemSetNewName = prompt("Please enter a new name for the set", ItemSetName);
  if ( ItemSetNewName != "" )  {
    ItemSets[ItemSetIndex - 1] = ItemSetNewName + "^" + ItemSets[ItemSetIndex - 1].split("^")[1]; // ALT-0159
    document.getElementById('muleItemSetsDrop').options[ItemSetIndex].text = ItemSetNewName;    document.getElementById('muleItemSetsDrop').options[ItemSetIndex].value = ItemSetNewName;    SaveItemSets();
  }
}

// Add ItemSets dropdowns
function addItemSetsDrop(){
  if ( document.getElementById('tabInventory') == null )    {      return;    }
  var BodyTR = document.createElement('tr'); BodyTR.id = "setsID";
  document.getElementById('tabInventory').childNodes[17].childNodes[1].childNodes[1].childNodes[1].childNodes[1].appendChild(BodyTR);
  document.getElementById('setsID').innerHTML = "<tr><td>&nbsp</td><td>&nbsp</td><td align=\"left\"><span id=\"setsID1\"></span>&nbsp<span id=\"setsID2\"></span>&nbsp<span id=\"setsID3\"></span>&nbsp<span id=\"setsID4\"></span></td></tr>";
  var ItemSetsDrop = document.createElement('select');  ItemSetsDrop.id =  'muleItemSetsDrop';  ItemSetsDrop.style.width = "150px";  ItemSetsDrop.addEventListener('change', foo=function(){ItemSetsAction();}, false);  var ItemSetsCount = ItemSets.length;  ItemSetsDrop.options[0] = new Option("New set","");
  if ( ItemSetsCount > 0 )  {    for ( var ISI = 0; ISI <= ItemSetsCount - 1; ISI = ISI + 1 )    {      var ItemSetName = ItemSets[ISI].split("^")[0];       ItemSetsDrop.options[ISI + 1] = new Option(ItemSetName,ItemSetName);    }  }
  document.getElementById('setsID1').appendChild(ItemSetsDrop);
  var ItemSetsAddButton = document.createElement('input');  ItemSetsAddButton.type = 'button';  ItemSetsAddButton.value = '+';  ItemSetsAddButton.title = 'Add/Overwrite a set of items to/in the list';  ItemSetsAddButton.id = 'muleItemSetsAddButton';  ItemSetsAddButton.addEventListener('click', foo=function(){ItemSetsAdd();}, false);  document.getElementById('setsID2').appendChild(ItemSetsAddButton);
  var ItemSetsRemoveButton = document.createElement('input');  ItemSetsRemoveButton.type = 'button';  ItemSetsRemoveButton.value = '-';  ItemSetsRemoveButton.title = 'Remove a set of items from the list';  ItemSetsRemoveButton.id = 'muleItemSetsRemoveButton';  ItemSetsRemoveButton.addEventListener('click', foo=function(){ItemSetsRemove();}, false);  document.getElementById('setsID3').appendChild(ItemSetsRemoveButton);
  var ItemSetsRenameButton = document.createElement('input');  ItemSetsRenameButton.type = 'button';  ItemSetsRenameButton.value = 'R';  ItemSetsRenameButton.title = 'Rename a set of items in the list';  ItemSetsRenameButton.id = 'muleItemSetsRenameButton';  ItemSetsRenameButton.addEventListener('click', foo=function(){ItemSetsRename();}, false);  document.getElementById('setsID4').appendChild(ItemSetsRenameButton);
}

if ( document.getElementById('game2') != null ){  LoadItemSets();  addItemSetsDrop();}

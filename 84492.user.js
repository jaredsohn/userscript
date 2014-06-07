// DoH Sell/Recycle Checkboxer
// version 0.9 BETA!
// 2009-03-22
//---------------------------------------------------------------------
//---------------------------------------------------------------------
//
// ==UserScript==
// @name          DoH SRC
// @namespace     http://www.google.com/?q='Domain of Heroes'
// @description   sell/recycle 
// @include       http://domainofheroes.com/Game.aspx*
// @include       http://*.domainofheroes.com/Game.aspx*
// ==/UserScript==

function SetChecks(CheckType){
  var InvList;
  var ItemKEEP;
  var ItemRECYCLE;
  var isPocket;
  var ItemNum;
  var CheckBoxElement;
  var ItemNameElement;
  var ItemName;
  var ItemRQ;
  var iofq;



  InvList = document.getElementById('muleList');

  for( var i = 1; i <= InvList.childNodes.length - 1; i = i + 1) {
    ItemKEEP = 0;
    ItemRECYCLE = 0;
    isPocket = 0;
    ItemNum = String(InvList.childNodes[i].id).slice(3);

    if (ItemNum) {
      CheckBoxElement = document.getElementById('chk' + ItemNum);
      ItemNameElement = document.getElementById('Mule' + ItemNum);
      ItemName = ItemNameElement.childNodes[0].nodeValue.slice(1);
      ItemRQ = ItemNameElement.className;
      iofq = ItemRQ.indexOf('Q');

      ItemRarity = ItemRQ.match(/^R(\d+)Q(\d+)/i)[1];
      ItemQuality = ItemRQ.match(/^R(\d+)Q(\d+)/i)[2];

      if ( ItemRarity >= 6 ) { ItemKEEP = 1; }
      else if ( ItemName.match(/\s+Key$/i) ) { ItemKEEP = 1;}
      else if ( ItemName.match(/(^|\s+)(skull|soul)(\s+|$)/i)) { isPocket = 1; }
      else if ( (ItemQuality== 8) && ItemName.match(/(^|\s+)(dancing|paper|stone|beads)(\s+|$)/i) && !( ItemName.match(/string of/i) ) ) { ItemRECYCLE = 1; }
      if (ItemKEEP == 0 && isPocket == 0 && ItemNameElement.parentNode.childNodes[3].nodeName != "FONT") { ItemKEEP = 1; }
      if (ItemKEEP == 0) {
        if ( isPocket == 0 ) { var ItemD = ItemNameElement.parentNode.childNodes[3].innerHTML; }
        if ( ItemRarity >= 2 ) {
          var x = 5;
          var modOffset = 4;
          if ( isPocket == 1 ) { x = 3; modOffset = 2; }
          for (x = x;x <= ( ( ( ItemRarity - 1 ) * 2 ) + modOffset ); x = x + 2) {
            try { var ItemEnchant = ItemNameElement.parentNode.childNodes[x].innerHTML; }
            catch( err ) { ItemKEEP = 1; continue; }
            var EnchantMod = ItemEnchant.match(/\d*\.*\d+/);
            if ( ItemEnchant.search(/Magic Find/i) > -1 ) { ItemKEEP = 1; }
            else if ( ItemEnchant.search(/^Multiplies Ph/i) > -1 && EnchantMod > 5.0) { ItemRECYCLE = 1; }
            else if ( ItemEnchant.search(/Experience/i) > -1 )  { ItemKEEP = 1; }
            else if ( ItemEnchant.search(/skills/i) > -1 )  { ItemKEEP = 1; }
            else if ( ItemEnchant.search(/Regenerate/i) > -1 ) { ItemKEEP = 1; }
            else if ( ItemEnchant.search(/Extra/i) > -1 )          { ItemKEEP = 1; }
            else if ( ItemEnchant.search(/^Adds/i) > -1 ) {        if ( ItemEnchant.search( /(POW|LUK|MND|AGI|LIF|END)/i ) > -1 && EnchantMod > 25 ) { ItemRECYCLE = 1; }         }
          }
        }
      }
      if ( ItemName.match(/Potion$/i) ) { ItemRECYCLE = 0; ItemKEEP = 0;}

      CheckBoxElement.checked = false;
      if ( ItemKEEP == 0 ) {
        if   ( CheckType == "Recycle" && ItemRECYCLE == 1 ) { CheckBoxElement.checked = true; }
        else if ( CheckType == "Sell" && ItemRECYCLE == 0 ) { CheckBoxElement.checked = true; }
      }
    }
  }
}

function EquipChecks(){
  var ItemNum;  var InvList = document.getElementById('muleList');
  for( var i = 1; i <= InvList.childNodes.length - 1; i = i + 1) {
    ItemNum = String(InvList.childNodes[i].id).slice(3);
    if (ItemNum && document.getElementById('chk' + ItemNum).checked == true) {
  	  location.href = "javascript:Equip(" + ItemNum + ");";
    }
  }
}

function addLinks(){
	var sellLink = document.createElement('a');  	sellLink.href = 'javascript:void(0)';		sellLink.addEventListener('click',foo=function(){SetChecks('Sell');}, false);		sellLink.innerHTML ="Sell";
  	var eqLink = document.createElement('a');  	eqLink.href = 'javascript:void(0)';		eqLink.addEventListener('click',foo=function(){EquipChecks();}, false);		eqLink.innerHTML ="Equip";
  	var recyLink = document.createElement('a');  recyLink.href = 'javascript:void(0)';	recyLink.addEventListener('click',foo=function(){SetChecks('Recycle');}, false);	recyLink.innerHTML ="Recycle";
  	document.getElementById('lnkMassMoveToStorageFromMule').parentNode.align = "right";
   	document.getElementById('lnkMassShopRecycleItemsFromM').parentNode.parentNode.innerHTML="<td align=\"left\" nowrap><a href=\"javascript:MassRecycleItems('Mule');\" id='lnkMassShopRecycleItemsFromM' title=\"Cost: 10 coin per item. Collect Materials and Reagents\" ><img src='http://media.domainofheroes.com/clear.gif' class='h12px h12px-recycleToShop' border=0/>Recycle w/Shop</a><a href=\"javascript:MassRecycleItems('Mule');\" id='lnkMassHoboRecycleItemsFromM' title=\"Cost: 100 coin per item. Collect Materials and Reagents\" style=\"display:none\"><img src='http://media.domainofheroes.com/clear.gif' class='h12px h12px-recycleToShop' border=0/>Recycle w/Hobo</a></td><td align=\"center\" nowrap><span id=\"putLinksHere1\"></span>&nbsp&nbsp&nbsp&nbsp<span id=\"putLinksHere2\"></span>&nbsp&nbsp&nbsp&nbsp<span id=\"putLinksHere3\"></span></td><td align=\"right\" nowrap><a href=\"javascript:MassDonateToGuild('Mule');\" id='lnkMassDonateToGuildFromM'><img class='h12px h12px-moveToGuild' src='http://media.domainofheroes.com/clear.gif' border=0 title=\"Donate selected items to the Guild Vault (permanently)\" />Donate to Guild</a></td>";
	document.getElementById('putLinksHere1').appendChild(sellLink);
	document.getElementById('putLinksHere2').appendChild(recyLink);
	document.getElementById('putLinksHere3').appendChild(eqLink);
}

addLinks();

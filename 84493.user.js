// DoH Sell/Recycle Checkboxer
// version 0.9 BETA!
// 2009-03-22
//---------------------------------------------------------------------
//---------------------------------------------------------------------
//
// ==UserScript==
// @name          DoH Auto-SRC
// @namespace     http://www.google.com/?q='Domain of Heroes'
// @description   auto sell/recycle when mule is full then go back to fighting
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

/*
function myRand( minNum, maxNum ) {
  if ( maxNum == null )  {
    maxNum = minNum;
    minNum = 0;
  }

  minNum = parseInt( minNum );
  maxNum = parseInt( maxNum ) + 1;
  var diffNum = maxNum - minNum;
  var ranNum = Math.floor( minNum + ( Math.random() * diffNum ) );
  return ranNum;
}
*/

addLinks();


function OpenInv()		{  location.href = "javascript:ShowTab('Inventory');";  }
function OpenInfo()		{  location.href = "javascript:ShowTab('Info');";  }
function FightEm()		{  location.href = "javascript:JoinBattlePvE();";		setTimeout( CheckLoop, 210*60000 );  } //2mins recheck if just emptied
function GoGrind()		{  location.href = "javascript:MapGoTo('LOC157');";	setTimeout( FightEm, 10000 );  }
function SellEm()		{  location.href = "javascript:MassSellItems('Mule');";	setTimeout( GoGrind, 8*60000 );  }
function CheckSell()		{  SetChecks('Sell');							setTimeout( SellEm, 10000 );  }
function RecycleEm()		{  location.href = "javascript:MassRecycleItems('Mule');"; setTimeout( CheckSell, 40000 );  }
function CheckRecycle()	{  SetChecks('Recycle');						setTimeout( RecycleEm, 10000 );  }
function GoInn()			{  location.href = "javascript:GoToNearestInn();";		setTimeout( CheckRecycle, 10000 ); }
function CheckFullMule() {
  var muleNum = document.getElementById("MuleCount").innerHTML.match(/(\d+) \/ (\d+)/i)[1];
  if		( muleNum < 100 )	{ setTimeout( CheckLoop, 150*60000 );  }
  else if	( muleNum < 200 )	{ setTimeout( CheckLoop, 100*60000 );  }
  else if	( muleNum < 300 )	{ setTimeout( CheckLoop,   50*60000 );  }
  else if	( muleNum < 400 )	{ setTimeout( CheckLoop,   20*60000 );  }
  else if	( muleNum < 450 )	{ setTimeout( CheckLoop,   10*60000 );  }
  else 					{ setTimeout( GoInn,1000 );  }
}
function CheckLoop() {
  setTimeout( OpenInv,  20000 );
  setTimeout( OpenInfo, 58000 );
  setTimeout( CheckFullMule, 60000 );
}
setTimeout( CheckLoop, 2000 );

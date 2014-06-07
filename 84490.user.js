// DoH Inventory Sorter
// by Ryan & Sae
//---------------------------------------------------------------------
//---------------------------------------------------------------------
//
// ==UserScript==
// @name          DoH Inventory Sorter
// @version       1
// @author        Ryan & Sae
// @namespace     http://www.domainofheroes.com/
// @description   Sort Inventory, Mule, Storage, Shop and Vault items in DoH
// @include       http://domainofheroes.com/game*
// @include       http://*.domainofheroes.com/game*
// ==/UserScript==
//
// UID: 7a0cb3f2-796a-4ab7-b125-776b622ec722
//

// Used in Price sort option for shop to make comparisons via coin.
var CoinsPerWishDefault = GM_getValue("CoinsPerWishDefault");

if ( !( CoinsPerWishDefault ) ){  CoinsPerWishDefault = 850000;  GM_setValue("CoinsPerWishDefault", CoinsPerWishDefault ); }
var testtimes = 0;

function SortInv(ListType){
  var InvList, NameType, SortType, SortDrop;

  var CheckBy = false;
		   if (ListType == "Inv")			{    InvList = document.getElementById('invList');		SortDrop = document.getElementById('invsortDrop');			CheckBy = document.getElementById('invCheckBy').checked;  }
	else if (ListType == "Mule")			{    InvList = document.getElementById('muleList');		SortDrop = document.getElementById('mulesortDrop');		CheckBy = document.getElementById('muleCheckBy').checked;  }
	else if (ListType == "Storage")	{    InvList = document.getElementById('storageList');	SortDrop = document.getElementById('storagesortDrop');	CheckBy = document.getElementById('storageCheckBy').checked;  }
	else if (ListType == "Shop")		{    InvList = document.getElementById('shopList');		SortDrop = document.getElementById('shopsortDrop');		CheckBy = false;  }
	else if (ListType == "Vault")		{    InvList = document.getElementById('lstGuildInv');	SortDrop = document.getElementById('vaultsortDrop');		CheckBy = document.getElementById('vaultCheckBy').checked;  }

  SortType = SortDrop.options[SortDrop.selectedIndex].value;
  if ( SortType == "Reverse" )  		{    ReverseInv(ListType);	    return;  }

  var CoinsPerWish = 0;
  if ( SortType == "Price" )  {    CoinsPerWish = prompt("Please enter a coin price per wish", GM_getValue( "CoinsPerWishDefault" ) );
    if ( CoinsPerWish )    {      GM_setValue("CoinsPerWishDefault", CoinsPerWish );    }
    else    {      return;    }
  }

  var ItemStats = new Array();
  var MatchCount = 0;
  var FirstItem = 1;
  for( var i = ( InvList.childNodes[0].textContent.match(/\n/) ? 1 : 0 ); i <= InvList.childNodes.length - 1; i = i + 1)  {
    var ItemNum = 0;

    if ( ListType == "Shop" )    {      ItemNum = String(InvList.childNodes[i].id).slice(4);    }
    else    {      ItemNum = String(InvList.childNodes[i].id).slice(3);    }

    if (ItemNum)    {      ItemStats[ItemNum] = new ItemInfo( ListType, ItemNum, CoinsPerWish );
      var Matched = 0;
      for( var j = ( InvList.childNodes[0].textContent.match(/\n/) ? 1 : 0 ); j <= i; j = j + 1)      {
        var CheckItemNum = 0;
        if ( ListType == "Shop" )        {          CheckItemNum = String(InvList.childNodes[j].id).slice(4);        }
        else        {          CheckItemNum = String(InvList.childNodes[j].id).slice(3);        }
        if (CheckItemNum)        {          // Check sort type and do the actual sorting now
          var SwapEm = 0;

          if ( SortType == "Rarity" && ItemStats[ItemNum].ItemRarity > ItemStats[CheckItemNum].ItemRarity )	{	SwapEm = 1;	}
          else if ( SortType == "Quality" && ItemStats[ItemNum].ItemQuality > ItemStats[CheckItemNum].ItemQuality )	{	SwapEm = 1;	}
          else if ( SortType == "Price" && ( parseInt(ItemStats[ItemNum].TotalCoinPrice) > parseInt(ItemStats[CheckItemNum].TotalCoinPrice) ) )	{	SwapEm = 1;	}
          else if ( SortType == "Base Damage" && ItemStats[ItemNum].BDType == "Damage" )	{
            if ( Matched == 0 || FirstItem == 1 )	{	Matched = 1;	MatchCount = MatchCount + 1;	}
            if ( parseInt(ItemStats[ItemNum].BD) > parseInt(ItemStats[CheckItemNum].BD) || ItemStats[CheckItemNum].BDType != "Damage" )	{	SwapEm = 1;	}
          }
          else if ( SortType == "Base Defense" && ItemStats[ItemNum].BDType == "Defense" )	{
			if ( Matched == 0 || FirstItem == 1 )	{	Matched = 1;	MatchCount = MatchCount + 1;	}
            if ( parseInt(ItemStats[ItemNum].BD) > parseInt(ItemStats[CheckItemNum].BD) || ItemStats[CheckItemNum].BDType != "Defense" )	{	SwapEm = 1;	}
          }
          else if ( SortType == "Charms" && ItemStats[ItemNum].isCharm == 1 )	{
            if ( Matched == 0 || FirstItem == 1 )	{	Matched = 1;	MatchCount = MatchCount + 1;	}
            if ( ItemStats[CheckItemNum].isCharm == 0 )	{	SwapEm = 1;	}
          }
          else if ( SortType == "Keys" && ItemStats[ItemNum].isKey == 1 )	{
            if ( Matched == 0 || FirstItem == 1 )	{	Matched = 1;	MatchCount = MatchCount + 1;	}
            if ( ItemStats[CheckItemNum].isKey == 0 )	{	SwapEm = 1;	}
          }
          else if ( SortType == "Locked" && ItemStats[ItemNum].isLocked == 1 )	{
            if ( Matched == 0 || FirstItem == 1 )	{	Matched = 1;	MatchCount = MatchCount + 1;	}
            if ( ItemStats[CheckItemNum].isLocked == 0 )	{	SwapEm = 1;	}
          }
          else if ( SortType == "ForSale" && ItemStats[ItemNum].isForSale == 1 )	{
            if ( Matched == 0 || FirstItem == 1 )	{	Matched = 1;	MatchCount = MatchCount + 1;	}
            if ( ItemStats[CheckItemNum].isForSale == 0 )	{	SwapEm = 1;	}
          }
          else if ( SortType.match(/(MF|EXP|LUK|POW|MND|AGI|LIF|END|Regen|AddDam|Leech)/i) )	{
            if ( ItemStats[ItemNum].EnchantTier > 0 )	{
              if ( Matched == 0 || FirstItem == 1 )	{	Matched = 1;	MatchCount = MatchCount + 1;	}	}
            if ( ItemStats[ItemNum].EnchantTier > ItemStats[CheckItemNum].EnchantTier )	{	SwapEm = 1;	}
          }
          else if ( SortType.match(/(Strong Hand|Off Hand|Ammo Slot|Pocket|Head|Eyes|Neck|Chest|Wrists|Arms|Waist|Hands|Legs|Ring Finger|Feet)/i) )	{
            var SHType = 1;
            if ( SortType == "Strong Hand" )	{	SHType = SortDrop.options[SortDrop.selectedIndex].text.match( /(\d)H$/i )[1];	}
            if ( ItemStats[ItemNum].WearLoc == SortType && ItemStats[ItemNum].Handed == SHType )	{
              if ( Matched == 0 || FirstItem == 1 )	{	Matched = 1;	MatchCount = MatchCount + 1;	}
              if ( ItemStats[CheckItemNum].WearLoc != SortType || ItemStats[CheckItemNum].Handed != SHType )	{	SwapEm = 1;	}
            }
          }
          if ( SwapEm == 1 )	{	var removedItem = InvList.removeChild( InvList.childNodes[i] );		InvList.insertBefore( removedItem, InvList.childNodes[j] );	break;	}
        }
      }

      if ( CheckBy )      {
        var CheckBoxElement = document.getElementById('chk' + ItemNum);
        if ( Matched == 1 )	{	CheckBoxElement.checked = true;	}	 else	{	CheckBoxElement.checked = false;	}
      }
    }
  FirstItem = 0;
  }

  // Everything matches for these two
  if ( SortType.match(/(Rarity|Quality|Price)/i) )  {	MatchCount = InvList.childNodes.length - ( InvList.childNodes[0].textContent.match(/\n/) ? 1 : 0 );  }

  SortDrop.selectedIndex = 0;
  SortDrop.options[SortDrop.selectedIndex].text = 'Sorted ' + MatchCount + ' by ' + SortType;
  testtimes = 0;
}

function ItemInfo( ListType, ItemNum, CoinsPerWish ){
  var SortDrop, SortType, ListName;

  this.ItemName = 0;		this.ItemRarity = 0;	this.ItemQuality = 0;
  this.WearLoc = 0;			this.Handed = 1;		this.BDType = "";	this.BD = 0;			this.PriceType = 0;	this.Mods = 0;
  this.isPocket = 0;			this.isPotion = 0;	this.isKey = 0;		this.isCharm = 0;	this.isLocked = 0;	this.isForSale = 0;
  this.WishPrice = 0;		this.CoinPrice = 0;	this.TotalCoinPrice = 0;
  this.EnchantTier = 0;	this.EnchantTypeTotal = 0;
  ListName = ListType;

 		 if (ListType == "Inv")  		{    SortDrop = document.getElementById('invsortDrop');  }
  else if (ListType == "Mule") 		{    SortDrop = document.getElementById('mulesortDrop');  }
  else if (ListType == "Storage")	{    SortDrop = document.getElementById('storagesortDrop');  }
  else if (ListType == "Shop") 		{    SortDrop = document.getElementById('shopsortDrop');    ListName = 'spanShopBuy';  }
  else if (ListType == "Vault")		{    SortDrop = document.getElementById('vaultsortDrop');    ListName = 'Guild';  }
  SortType = SortDrop.options[SortDrop.selectedIndex].value;

  if (ListType && ItemNum > 0 )  {
    var ItemNameElement = document.getElementById(ListName + ItemNum);
    if ( ListType == "Shop" )			{	this.ItemName = ItemNameElement.childNodes[0].nodeValue;    }
    else	{	this.ItemName = ItemNameElement.childNodes[0].nodeValue.slice(1);    }

    if ( SortType == "Rarity" || SortType == "Quality" )    {      var ItemRQ = ItemNameElement.className;      this.ItemRarity = ItemRQ.match(/^R(\d+)Q(\d+)/i)[1];      this.ItemQuality = ItemRQ.match(/^R(\d+)Q(\d+)/i)[2];    }
    else if ( SortType == "Price" )    {
      if ( ListType == "Shop" )      {
        if ( ItemNameElement.parentNode.childNodes[1].nodeName.match(/^img$/i) )        {
          var WishPriceInfo = String(String(ItemNameElement.parentNode.childNodes[0].attributes[2].value.toString()).slice(4,-1)).split("\,");          this.WishPrice = WishPriceInfo[3];
          var CoinPriceInfo = String(String(ItemNameElement.parentNode.childNodes[1].attributes[2].value.toString()).slice(4,-1)).split("\,");          this.CoinPrice = CoinPriceInfo[2];
          this.PriceType = "Either";
        }      else        {
          var PriceInfo = String(String(ItemNameElement.parentNode.childNodes[0].attributes[2].value.toString()).slice(4,-1)).split("\,");          this.WishPrice = PriceInfo[3];          this.CoinPrice = PriceInfo[2];
          if ( PriceInfo[1].match(/and/i) )	{	this.PriceType = "Both";	}	else	{	this.PriceType = "Coin";	}
        }

        if ( String(this.PriceType).match(/(Both|Wish|Coin)/i) )        {          this.TotalCoinPrice = parseInt(this.CoinPrice) + ( parseInt( this.WishPrice ) * parseInt( CoinsPerWish ) );        }
        else        {          var WCP = parseInt( this.WishPrice ) * parseInt( CoinsPerWish );
        	if ( WCP == 0 || WCP > this.CoinPrice )          {            this.TotalCoinPrice = this.CoinPrice;          }          else          {            this.TotalCoinPrice = WCP;          }
        }
      }
    }
    else if ( SortType.match(/(Strong Hand|Off Hand|Ammo Slot|Pocket|Head|Eyes|Neck|Chest|Wrists|Arms|Waist|Hands|Legs|Ring Finger|Feet|Charms|Keys)/i) )    {
      if ( ListType == "Shop" )      {
        var WearLocOffSet = 0;
        if ( ItemNameElement.parentNode.childNodes[1].nodeName.match(/^img$/i) )        {          WearLocOffset = 4;        }
        else        {          WearLocOffset = 3;        }
        if ( !( ItemNameElement.parentNode.childNodes[WearLocOffset - 1].nodeName.match(/^br$/i) ) )        {          WearLocOffset = WearLocOffset - 1;        }
        this.WearLoc = ItemNameElement.parentNode.childNodes[WearLocOffset].nodeValue;
        this.WearLoc = this.WearLoc.slice( ( this.WearLoc.indexOf( '(' ) + 1 ) , ( this.WearLoc.indexOf( ')' ) )) ;
      }
      else      {
        this.WearLoc = ItemNameElement.parentNode.childNodes[2].nodeValue.slice(1,-2);
        if ( ItemNameElement.parentNode.innerHTML.match(/two handed/i) )        {          this.Handed = 2;        }
      }

      if ( this.WearLoc.match(/Inventory/i) )      {
        if ( this.ItemName.match(/Potion$/i) )        {          this.isPotion = 1;        }
        else if ( this.ItemName.match(/\s+Key$/i) )        {          this.isKey = 1;        }
        else        {          this.isCharm = 1;        }
      }
    }

    else if ( SortType == "Base Damage" || SortType == "Base Defense" )    {
      var BDInfo = ItemNameElement.parentNode.innerHTML.match( /Base (D.+): ([0-9]+)/i );

      if ( BDInfo != null )      {
        this.BDType = BDInfo[1];        this.BD = BDInfo[2];
      }
    }    else if ( SortType == "Locked" )    {      if ( ListType == "Inv" || ListType == "Mule" || ListType == "Storage" )      {        this.isLocked = ( ItemNameElement.parentNode.parentNode.childNodes[2].childNodes[1].title.match(/unlock/i) ? 1 : 0 );      }
    }    else if ( SortType == "ForSale" )    {      if ( ListType == "Inv" || ListType == "Mule" || ListType == "Storage")      {          this.isForSale = ( ItemNameElement.parentNode.parentNode.childNodes[2].innerHTML.match(/List this item/i) ? 0 : 1 );      }
    }

    else if ( SortType.match(/(MF|EXP|LUK|POW|MND|AGI|LIF|END|Regen|AddDam|Leech)/i) )    {        var Args = getItemEnchant( ItemNameElement, SortType );      this.EnchantTier = Args[0];      this.EnchantTotal = Args[1];    }
  }
}

function ReverseInv(ListType) {
  var InvList, NameType, ReverseButton, SortDrop;
  var CheckBy = false;
  var CheckedCount = 0;

  if (ListType == "Inv")  {    InvList = document.getElementById('invList');    NameType = 'Inv';    ReverseButton = document.getElementById('invReverseButton');    CheckBy = document.getElementById('invCheckBy').checked;    SortDrop = document.getElementById('invsortDrop');  }
  else if (ListType == "Mule")  {    InvList = document.getElementById('muleList');    NameType = 'Mule';    ReverseButton = document.getElementById('muleReverseButton');    CheckBy = document.getElementById('muleCheckBy').checked;    SortDrop = document.getElementById('mulesortDrop');  }
  else if (ListType == "Storage")  {    InvList = document.getElementById('storageList');    NameType = 'Storage';    ReverseButton = document.getElementById('storageReverseButton');    CheckBy = document.getElementById('storageCheckBy').checked;    SortDrop = document.getElementById('storagesortDrop');  }
  for( var i = ( InvList.childNodes[0].textContent.match(/\n/) ? 1 : 0 ); i <= InvList.childNodes.length - 1; i = i + 1)  {
    if ( CheckBy )    {
      var ItemNum = 0;      ItemNum = String(InvList.childNodes[i].id).slice(3);
      if (ItemNum)      {
        var CheckBoxElement = document.getElementById('chk' + ItemNum);
        if ( CheckBoxElement.checked )        {          CheckBoxElement.checked = false;        }
        else        {          CheckBoxElement.checked = true;          CheckedCount++;        }
      }
    }
    else    {
      // Take last item in inv and pop it to top of original list, bottom of new list.
      var removedItem = InvList.removeChild( InvList.childNodes[InvList.childNodes.length - 1] );
      InvList.insertBefore( removedItem, InvList.childNodes[i] );
    }
  }

  if ( !( CheckBy ) )  {    CheckedCount = InvList.childNodes.length - ( InvList.childNodes[0].textContent.match(/\n/) ? 1 : 0 );  }

  SortDrop.selectedIndex = 0;  SortDrop.options[SortDrop.selectedIndex].text = 'Sorted ' + CheckedCount + ' by Reverse';

}

function SearchInv(ListType){
  var InvList, NameType, SearchText, SortDrop;

  var CheckBy = false;

  if (ListType == "Inv")  {    InvList = document.getElementById('invList');    NameType = 'Inv';    SearchText = document.getElementById('invSearchText');    SortDrop = document.getElementById('invsortDrop');    CheckBy = document.getElementById('invCheckBy').checked;  }
  else if (ListType == "Mule")  {    InvList = document.getElementById('muleList');    NameType = 'Mule';    SearchText = document.getElementById('muleSearchText');    SortDrop = document.getElementById('mulesortDrop');    CheckBy = document.getElementById('muleCheckBy').checked;  }
  else if (ListType == "Storage")  {      InvList = document.getElementById('storageList');      NameType = 'Storage';      SearchText = document.getElementById('storageSearchText');      SortDrop = document.getElementById('storagesortDrop');      CheckBy = document.getElementById('storageCheckBy').checked;  }
  else if (ListType == "Shop")  {    InvList = document.getElementById('shopList');    NameType = 'spanShopBuy';    SearchText = document.getElementById('shopSearchText');    SortDrop = document.getElementById('shopsortDrop');    CheckBy = false;  }
  else if (ListType == "Vault")  {    InvList = document.getElementById('lstGuildInv');    NameType = 'Guild';    SearchText = document.getElementById('vaultSearchText');    SortDrop = document.getElementById('vaultsortDrop');    CheckBy = document.getElementById('vaultCheckBy').checked;  }
  var MatchCount = 0;  var SearchString = SearchText.value;
    var j = ( InvList.childNodes[0].textContent.match(/\n/) ? 1 : 0 );
    for( var i = ( InvList.childNodes[0].textContent.match(/\n/) ? 1 : 0 ); i <= InvList.childNodes.length - 1; i = i + 1)    {
      var ItemNum;
      if ( ListType == "Shop" )      {        ItemNum = String(InvList.childNodes[i].id).slice(4);      }
      else      {        ItemNum = String(InvList.childNodes[i].id).slice(3);      }
      if (ItemNum)      {
        var ItemNameElement = document.getElementById(NameType + ItemNum);        var ItemName;
        if ( ListType == "Shop" )        {          ItemName = ItemNameElement.childNodes[0].nodeValue;        }
        else        {          ItemName = ItemNameElement.childNodes[0].nodeValue.slice(1);        }
        var CheckBoxElement;

        if ( SearchString && ItemName.match( RegExp( SearchString, "i") ) )        {
          var removedItem = InvList.removeChild( InvList.childNodes[i] );
          InvList.insertBefore( removedItem, InvList.childNodes[j] );
          j = j + 1;          MatchCount = MatchCount + 1;
          if ( CheckBy )          {            CheckBoxElement = document.getElementById('chk' + ItemNum);            CheckBoxElement.checked = true;          }
        }        else if ( CheckBy )        {          CheckBoxElement = document.getElementById('chk' + ItemNum);          CheckBoxElement.checked = false;        }
      }      else      {        j = j + 1;      }
    }

  if ( !( SearchString ) )  {    MatchCount = 0;  }
  SortDrop.selectedIndex = 0;  SortDrop.options[SortDrop.selectedIndex].text = 'Sorted ' + MatchCount + ' by Name';
}

function ClearSearch(ListType){
  var SearchText;
  if (ListType == "Inv")  {    SearchText = document.getElementById('invSearchText');  }
  else if (ListType == "Mule")  {    SearchText = document.getElementById('muleSearchText');  }
  else if (ListType == "Storage")  {    SearchText = document.getElementById('storageSearchText');  }
  else if (ListType == "Shop")  {    SearchText = document.getElementById('shopSearchText');  }
  else if (ListType == "Vault")  {    SearchText = document.getElementById('vaultSearchText');  }
  if ( SearchText.value.match(/Type a name to sort by/) )  {    SearchText.value = "";  }
}

function getItemEnchant( ItemNameElement, EnchantType ){
  var EnchantTypeTotal = 0;  var EnchantTier = 0;

  for (var x = 0;x <= ItemNameElement.parentNode.childNodes.length - 1; x = x + 1)  {
    var EnchantElement = ItemNameElement.parentNode.childNodes[x];    var ElementName = EnchantElement.nodeName;    var ItemEnchant;
    if ( ElementName.match(/^i$/i) )    {      ItemEnchant = EnchantElement.innerHTML;    }    else    {      continue;    }
    var EnchantMod = parseFloat(ItemEnchant.match(/\d*\.*\d+/));

   if ( EnchantType == 'MF' && ItemEnchant.search(/Magic Find/i) > -1 )    {
      EnchantTypeTotal = EnchantTypeTotal + EnchantMod;
      if ( EnchantMod > 0 )      {		if ( EnchantMod > 12.5 )        {          EnchantTier = EnchantTier + 3;        }        else if ( EnchantMod > 6.3 )        {          EnchantTier = EnchantTier + 2;        }        else        {          EnchantTier = EnchantTier + 1;        }      }
    }
    else if ( EnchantType == 'EXP' && ItemEnchant.search(/Experience/i) > -1 )    {
      EnchantTypeTotal = EnchantTypeTotal + EnchantMod;
      if ( EnchantMod > 0 )      {        if ( EnchantMod > 12.5 )        {          EnchantTier = EnchantTier + 3;        }        else if ( EnchantMod > 6.3 )        {          EnchantTier = EnchantTier + 2;        }        else        {          EnchantTier = EnchantTier + 1;        }      }
    }
    else if ( EnchantType == 'Regen' && ItemEnchant.search(/Regenerate/i) > -1 )    {
      EnchantTypeTotal = EnchantTypeTotal + EnchantMod;      EnchantTier = EnchantTier + 1;
    }
    else if ( EnchantType == 'POW' && ItemEnchant.search(/Increases POW/i) > -1 )    {
      EnchantTypeTotal = EnchantTypeTotal + EnchantMod;
      if ( EnchantMod > 0 )      {        if ( EnchantMod > 3.8 )        {          EnchantTier = EnchantTier + 3;        }        else if ( EnchantMod > 1.9 )        {          EnchantTier = EnchantTier + 2;        }        else        {          EnchantTier = EnchantTier + 1;        }      }
    }
    else if ( EnchantType == 'LUK' && ItemEnchant.search(/Increases LUK/i) > -1 )    {
      EnchantTypeTotal = EnchantTypeTotal + EnchantMod;
      if ( EnchantMod > 0 )      {        if ( EnchantMod > 3.8 )        {          EnchantTier = EnchantTier + 3;        }        else if ( EnchantMod > 1.9 )        {          EnchantTier = EnchantTier + 2;        }        else        {          EnchantTier = EnchantTier + 1;        }      }
    }
    else if ( EnchantType == 'MND' && ItemEnchant.search(/Increases MND/i) > -1 )    {
      EnchantTypeTotal = EnchantTypeTotal + EnchantMod;
      if ( EnchantMod > 0 )      {        if ( EnchantMod > 3.8 )        {          EnchantTier = EnchantTier + 3;        }        else if ( EnchantMod > 1.9 )        {          EnchantTier = EnchantTier + 2;        }        else        {          EnchantTier = EnchantTier + 1;        }      }
    }
    else if ( EnchantType == 'AGI' && ItemEnchant.search(/Increases AGI/i) > -1 )    {
      EnchantTypeTotal = EnchantTypeTotal + EnchantMod;
      if ( EnchantMod > 0 )      {        if ( EnchantMod > 3.8 )        {          EnchantTier = EnchantTier + 3;        }        else if ( EnchantMod > 1.9 )        {          EnchantTier = EnchantTier + 2;        }        else        {          EnchantTier = EnchantTier + 1;        }      }
    }
    else if ( EnchantType == 'LIF' && ItemEnchant.search(/Increases LIF/i) > -1 )    {
      EnchantTypeTotal = EnchantTypeTotal + EnchantMod;
      if ( EnchantMod > 0 )      {        if ( EnchantMod > 3.8 )        {          EnchantTier = EnchantTier + 3;        }        else if ( EnchantMod > 1.9 )        {          EnchantTier = EnchantTier + 2;        }        else        {          EnchantTier = EnchantTier + 1;        }      }
    }
    else if ( EnchantType == 'END' && ItemEnchant.search(/Increases END/i) > -1 )    {
      EnchantTypeTotal = EnchantTypeTotal + EnchantMod;
      if ( EnchantMod > 0 )      {        if ( EnchantMod > 3.8 )        {          EnchantTier = EnchantTier + 3;        }        else if ( EnchantMod > 1.9 )        {          EnchantTier = EnchantTier + 2;        }        else        {          EnchantTier = EnchantTier + 1;        }      }
    }
    else if ( EnchantType == 'Leech' && ItemEnchant.search(/^Leech/i) > -1 )    {
      if ( ItemEnchant.search(/\%/i) == -1 )      {
        EnchantTypeTotal = EnchantTypeTotal + EnchantMod;
        if ( EnchantMod > 0 )	{          if ( EnchantMod > 2.5 )		{            EnchantTier = EnchantTier + 3;          }          else if ( EnchantMod > 1.3 )          {            EnchantTier = EnchantTier + 2;          }          else          {            EnchantTier = EnchantTier + 1;          }        }
      }
    }
    else if ( EnchantType == 'AddDam' && ItemEnchant.search(/^Adds up to/i) > -1 )    {
      EnchantTypeTotal = EnchantTypeTotal + EnchantMod;
      EnchantTier = EnchantTier + 1;
    }
  }
  var Args = new Array( EnchantTier, EnchantTypeTotal );   return Args;
}

function addSortDrop(Type){
  var ListLink;  var ListWrap;  var TbodyLoc;  var RowcolSpan;  var SortDropID;

  if (Type == 'Inv')  {
    if ( document.getElementById('tabInventory') == null )    {      return;    }
    TbodyLoc = document.getElementById('tabInventory').childNodes[13].childNodes[1].childNodes[1].childNodes[1].childNodes[1];
    RowcolSpan = '2';
    SortDropID = 'invsortDrop';
    ReverseButtonID = 'invReverseButton';
    CheckByID = 'invCheckBy';
    SearchTextID = 'invSearchText';
  }

  if (Type == 'Mule')  {
    if ( document.getElementById('tabInventory') == null )    {      return;    }
    TbodyLoc = document.getElementById('tabInventory').childNodes[17].childNodes[1].childNodes[1].childNodes[1].childNodes[1];
    RowcolSpan = '3';
    SortDropID = 'mulesortDrop';
    ReverseButtonID = 'muleReverseButton';
    CheckByID = 'muleCheckBy';
    SearchTextID = 'muleSearchText';
  }

  if (Type == 'Storage')  {
    if ( document.getElementById('tabInventory') == null )    {      return;    }
    TbodyLoc = document.getElementById('tabInventory').childNodes[21].childNodes[1].childNodes[1].childNodes[1].childNodes[1];
    RowcolSpan = '3';
    SortDropID = 'storagesortDrop';
    ReverseButtonID = 'storageReverseButton';
    CheckByID = 'storageCheckBy';
    SearchTextID = 'storageSearchText';
  }

  if (Type == 'Shop')  {
    if ( document.getElementById('envShop') == null )    {      return;    }
    TbodyLoc = document.getElementById('envShop').childNodes[1];
    RowcolSpan = '3';
    SortDropID = 'shopsortDrop';
    SearchTextID = 'shopSearchText';
  }

  if (Type == 'Vault')  {
    if ( document.getElementById('tabGuild') == null || document.getElementById('tabGuild').childNodes[7].childNodes.length < 2 )    {      return;    }
    TbodyLoc = document.getElementById('tabGuild').childNodes[5].childNodes[1].childNodes[0];
    RowcolSpan = '2';
    SortDropID = 'vaultsortDrop';
    CheckByID = 'vaultCheckBy';
    SearchTextID = 'vaultSearchText';
  }

  /* Inv Links */
  var LinkTable = document.createElement('table');
  LinkTable.width = "100%";
  LinkTable.border = "0";

  var LinkTR = document.createElement('tr');

  // Name Search box
  var LinkTDSearch = document.createElement('td');
  LinkTDSearch.align = "center";

  var SearchText = document.createElement('input');

  SearchText.type = 'text';
  SearchText.id = SearchTextID;
  SearchText.size = 21; // Was 25
  SearchText.defaultValue = 'Type a name to sort by';
  SearchText.select();
  SearchText.addEventListener('click', foo=function(){ClearSearch(Type);}, false);
  SearchText.addEventListener('keyup', foo=function(){SearchInv(Type);}, false);

  LinkTDSearch.appendChild(SearchText);
  LinkTR.appendChild(LinkTDSearch);

  // Dropdown Sort
  var LinkTDSort = document.createElement('td');
  LinkTDSort.align = "right";

  var SortDrop = document.createElement('select');
  SortDrop.id = SortDropID;
  SortDrop.style.width = ( Type == "Shop" ? "150px" : "200px" );

  SortDrop.addEventListener('change', foo=function(){SortInv(Type);}, false);

  var SDI = 0;
  SortDrop.options[SDI] = new Option("Sort by...","Rarity"); SDI++;
  if ( Type == "Shop" )  {    SortDrop.options[SDI] = new Option("Price","Price"); SDI++;  }
  SortDrop.options[SDI] = new Option("Reverse","Reverse"); SDI++;
  SortDrop.options[SDI] = new Option("Rarity","Rarity"); SDI++;
  SortDrop.options[SDI] = new Option("Quality","Quality"); SDI++;
  SortDrop.options[SDI] = new Option("Charms","Charms"); SDI++;
  SortDrop.options[SDI] = new Option("Regen","Regen"); SDI++;
  SortDrop.options[SDI] = new Option("Locked","Locked"); SDI++;
  SortDrop.options[SDI] = new Option("ForSale","ForSale"); SDI++;
  SortDrop.options[SDI] = new Option("Keys","Keys"); SDI++;
  SortDrop.options[SDI] = new Option("MF","MF"); SDI++;
  SortDrop.options[SDI] = new Option("EXP","EXP"); SDI++;
  SortDrop.options[SDI] = new Option("LUK","LUK"); SDI++;
  SortDrop.options[SDI] = new Option("POW","POW"); SDI++;
  SortDrop.options[SDI] = new Option("MND","MND"); SDI++;
  SortDrop.options[SDI] = new Option("AGI","AGI"); SDI++;
  SortDrop.options[SDI] = new Option("LIF","LIF"); SDI++;
  SortDrop.options[SDI] = new Option("END","END"); SDI++;
  SortDrop.options[SDI] = new Option("Adds Dam","AddDam"); SDI++;
  SortDrop.options[SDI] = new Option("Leech","Leech"); SDI++;
  SortDrop.options[SDI] = new Option("BDam","Base Damage"); SDI++;
  SortDrop.options[SDI] = new Option("BDef","Base Defense"); SDI++;
  SortDrop.options[SDI] = new Option("SH 1H","Strong Hand"); SDI++;
  SortDrop.options[SDI] = new Option("SH 2H","Strong Hand"); SDI++;
  SortDrop.options[SDI] = new Option("OH","Off Hand"); SDI++;
  SortDrop.options[SDI] = new Option("Ammo","Ammo Slot"); SDI++;
  SortDrop.options[SDI] = new Option("Pocket","Pocket"); SDI++;
  SortDrop.options[SDI] = new Option("Head","Head"); SDI++;
  SortDrop.options[SDI] = new Option("Eyes","Eyes"); SDI++;
  SortDrop.options[SDI] = new Option("Neck","Neck"); SDI++;
  SortDrop.options[SDI] = new Option("Chest","Chest"); SDI++;
  SortDrop.options[SDI] = new Option("Wrists","Wrists"); SDI++;
  SortDrop.options[SDI] = new Option("Arms","Arms"); SDI++;
  SortDrop.options[SDI] = new Option("Waist","Waist"); SDI++;
  SortDrop.options[SDI] = new Option("Hands","Hands"); SDI++;
  SortDrop.options[SDI] = new Option("Legs","Legs"); SDI++;
  SortDrop.options[SDI] = new Option("Finger","Ring Finger"); SDI++;
  SortDrop.options[SDI] = new Option("Feet","Feet"); SDI++;


  LinkTDSort.appendChild(SortDrop);

  LinkTR.appendChild(LinkTDSort);

  if ( Type == "Inv" || Type == "Mule" || Type == "Storage" || Type == "Vault" )  {
    var LinkTDCheckBy = document.createElement('td');
    LinkTDCheckBy.align = "left";
    LinkTDCheckBy.valign = "middle";
    var CheckBy = document.createElement('input');
    CheckBy.type = 'checkbox';
    CheckBy.id = CheckByID;
    CheckBy.checked = false;
    LinkTDCheckBy.appendChild(CheckBy);
    LinkTR.appendChild(LinkTDCheckBy);
  }

  LinkTable.appendChild(LinkTR);

  if ( Type == "Inv" || Type == "Mule" ||  Type == "Storage" ||Type == "Vault" )  {

    var BodyTR = document.createElement('tr');
    var BodyTD = document.createElement('td');
    BodyTD.align="center";
    BodyTD.appendChild(LinkTable);
    BodyTD.colSpan = RowcolSpan;
    BodyTR.appendChild(BodyTD);
    TbodyLoc.appendChild(BodyTR);
  }  else  {
    var BRa = document.createElement('br');
    var BRb = document.createElement('br');
    TbodyLoc.appendChild(BRa);
    TbodyLoc.appendChild(BRb);
    TbodyLoc.appendChild(LinkTable);
  }
}

if ( document.getElementById('game2') != null ){
  addSortDrop('Inv');
  addSortDrop('Mule');
  addSortDrop('Storage');
  addSortDrop('Shop');
  addSortDrop('Vault');
}
var DebugWindow = null;

function addDebug(Msg){
  var LinkTable;

  if ( !(DebugWindow) )  {
    DebugWindow = window.open( '', 'DebugWindow', 'directories=no, height=800, width=400, location=no, menubar=no, toolbar=no, top=500, left=500, scrollbars=yes' );
    var DebugBody = DebugWindow.document.getElementsByTagName("body")[0];
    LinkTable = DebugWindow.document.createElement('table');
    LinkTable.width = "100%";
    LinkTable.border = "0";
    LinkTable.id = "debugtable";
    DebugBody.appendChild(LinkTable);
  }
  LinkTable = DebugWindow.document.getElementById('debugtable');
  var LinkTR = DebugWindow.document.createElement('tr');
  var LinkTD = DebugWindow.document.createElement('td');
  LinkTD.align = "left";
  LinkTD.textContent = Msg;
  LinkTR.appendChild(LinkTD);
  LinkTable.appendChild(LinkTR);
}


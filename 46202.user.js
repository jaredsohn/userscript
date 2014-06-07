// ==UserScript==
// @name           StillAlive
// @namespace      DoorbellsDingDong
// @description    Makes the Still better
// @include        *.kingdomofloathing.com/guild*
// @include        *127.0.0.1:*/guild*
// ==/UserScript==


var AllDrinks;
var AllMixers;
var AllGarnishes;

Init();



function Init()
{
  var CalcuttaEmerald = { Name: "bottle of Calcutta Emerald", Improved: null, Id: 0, AvailableQuantity: 0, CurrentQuantity: 0};
  var Definit = { Name: "bottle of Definit", Improved: null, Id: 0, AvailableQuantity: 0, CurrentQuantity: 0 };
  var LieutenantFreeman = { Name: "bottle of Lieutenant Freeman", Improved: null, Id: 0, AvailableQuantity: 0, CurrentQuantity: 0 };
  var DomesticatedTurkey = { Name: "bottle of Domesticated Turkey", Improved: null, Id: 0, AvailableQuantity: 0, CurrentQuantity: 0 };
  var JorgeSinsonte = { Name: "bottle of Jorge Sinsonte", Improved: null, Id: 0, AvailableQuantity: 0, CurrentQuantity: 0 };
  var BoxedChampagne = { Name: "boxed champagne", Improved: null, Id: 0, AvailableQuantity: 0, CurrentQuantity: 0 };

  var Gin = { Name: "bottle of gin", Improved: CalcuttaEmerald, Id: 237, AvailableQuantity: 0, CurrentQuantity: 0 };
  var Vodka = { Name: "bottle of vodka", Improved: Definit, Id: 238, AvailableQuantity: 0, CurrentQuantity: 0 };
  var Rum = { Name: "bottle of rum", Improved: LieutenantFreeman, Id: 787, AvailableQuantity: 0, CurrentQuantity: 0 };
  var Whiskey = { Name: "bottle of whiskey", Improved: DomesticatedTurkey, Id: 328, AvailableQuantity: 0, CurrentQuantity: 0 };
  var Tequila = { Name: "bottle of tequila", Improved: JorgeSinsonte, Id: 1004, AvailableQuantity: 0, CurrentQuantity: 0 };
  var Wine = { Name: "boxed wine", Improved: BoxedChampagne, Id: 1005, AvailableQuantity: 0, CurrentQuantity: 0 };

  var CocktailOnion = { Name: "cocktail onion", Improved: null, Id: 0, AvailableQuantity: 0, CurrentQuantity: 0 };
  var Tangerine = { Name: "tangerine", Improved: null, Id: 0, AvailableQuantity: 0, CurrentQuantity: 0 };
  var Kumquat = { Name: "kumquat", Improved: null, Id: 0, AvailableQuantity: 0, CurrentQuantity: 0 };
  var Kiwi = { Name: "kiwi", Improved: null, Id: 0, AvailableQuantity: 0, CurrentQuantity: 0 };
  var Raspberry = { Name: "raspberry", Improved: null, Id: 0, AvailableQuantity: 0, CurrentQuantity: 0 };
  var TonicWater = { Name: "tonic water", Improved: null, Id: 0, AvailableQuantity: 0, CurrentQuantity: 0 };

  var Olive = { Name: "olive", Improved: CocktailOnion, Id: 245, AvailableQuantity: 0, CurrentQuantity: 0 };
  var Grapefruit = { Name: "grapefruit", Improved: Tangerine, Id: 243, AvailableQuantity: 0, CurrentQuantity: 0 };
  var Orange = { Name: "orange", Improved: Kumquat, Id: 242, AvailableQuantity: 0, CurrentQuantity: 0 };
  var Lemon = { Name: "lemon", Improved: Kiwi, Id: 332, AvailableQuantity: 0, CurrentQuantity: 0 };
  var Strawberry = { Name: "strawberry", Improved: Raspberry, Id: 786, AvailableQuantity: 0, CurrentQuantity: 0 };
  var SodaWater = { Name: "soda water", Improved: TonicWater, Id: 1003, AvailableQuantity: 0, CurrentQuantity: 0 };

  var CoconutShell = { Name: "coconut shell", Improved: null, Id: 1007, AvailableQuantity: 0, CurrentQuantity: 0 };
  var MagicalIceCubes = { Name: "magical ice cubes", Improved: null, Id: 1008, AvailableQuantity: 0, CurrentQuantity: 0 };
  var LittlePaperUmbrella = { Name: "little paper umbrella", Improved: null, Id: 635, AvailableQuantity: 0, CurrentQuantity: 0 };
  
  var Neuromancer = { Name: "Neuromancer", Booze: CalcuttaEmerald, Mixer: CocktailOnion, Garnish: CoconutShell, Color:"#DDCCAA" };
  var VodkaStratocaster = {Name: "vodka stratocaster", Booze: Definit, Mixer: CocktailOnion, Garnish: CoconutShell, Color:"#DDCCAA" };
  var MonTiki = {Name: "Mon Tiki", Booze: LieutenantFreeman, Mixer: Kiwi, Garnish: CoconutShell, Color:"#FFAAAA" };
  var TeqiwilaSlammer = {Name: "teqiwila slammer", Booze: JorgeSinsonte, Mixer: Kiwi, Garnish: CoconutShell, Color:"#FFAAAA" };
  var Divine = {Name: "Divine", Booze: DomesticatedTurkey, Mixer: Kumquat, Garnish: LittlePaperUmbrella, Color:"#CCAADD" };
  var GordonBennett = {Name: "Gordon Bennett", Booze: BoxedChampagne, Mixer: Kumquat, Garnish: LittlePaperUmbrella, Color:"#CCAADD" };
  var Gimlet = {Name: "gimlet", Booze: CalcuttaEmerald, Mixer: TonicWater, Garnish: LittlePaperUmbrella, Color:"#AAAAFF" };
  var YellowBrickRoad = {Name: "yellow brick road", Booze: Definit, Mixer: TonicWater, Garnish: LittlePaperUmbrella, Color:"#AAAAFF" };
  var MandarinaColada = {Name: "mandarina colada", Booze: LieutenantFreeman, Mixer: Tangerine, Garnish: MagicalIceCubes, Color:"#AADDCC" };
  var Tangarita = {Name: "tangarita", Booze: JorgeSinsonte, Mixer: Tangerine, Garnish: MagicalIceCubes, Color:"#AADDCC" };
  var MaeWest =  {Name: "Mae West", Booze: DomesticatedTurkey, Mixer: Raspberry, Garnish: MagicalIceCubes, Color:"#AAFFAA" };
  var PrussianCathouse =  {Name: "prussian cathouse", Booze: BoxedChampagne, Mixer: Raspberry, Garnish: MagicalIceCubes, Color:"#AAFFAA" };
  

  AllDrinks = [Gin, Vodka, Rum, Whiskey, Tequila, Wine, CalcuttaEmerald, Definit, LieutenantFreeman, DomesticatedTurkey, JorgeSinsonte, BoxedChampagne];
  AllMixers = [Olive, Grapefruit, Orange, Lemon, Strawberry, SodaWater, CocktailOnion, Tangerine, Kumquat, Kiwi, Raspberry, TonicWater];
  AllGarnishes = [CoconutShell, MagicalIceCubes, LittlePaperUmbrella];
  AllMakeables = [Neuromancer, VodkaStratocaster, MonTiki, TeqiwilaSlammer, Divine, GordonBennett, Gimlet, YellowBrickRoad, MandarinaColada, Tangarita, MaeWest, PrussianCathouse];
  
  for(var i=0; i<AllDrinks.length; ++i)
  {
    if(AllDrinks[i].Improved != null)
      AllDrinks[i].Improved.Base = AllDrinks[i];
  }
  
  for(var i=0; i<AllMixers.length; ++i)
  {
    if(AllMixers[i].Improved != null)
      AllMixers[i].Improved.Base = AllMixers[i];
  }


  GM_xmlhttpRequest({method:"GET", url:"http://" + window.location.host + "/craft.php?mode=cocktail", onload:Init2 });
}


function Init2(response)
{
  if(response.readyState != 4)
    return;

  // starting from the end of the list of all tables, get the one with the "stillfruit" keyword in it
  var aAllTables = document.getElementsByTagName("table");
  var eStillTable = null;
  for(var i=aAllTables.length - 1; i>0; --i)
  {
    if(aAllTables[i].innerHTML != null && aAllTables[i].innerHTML.indexOf("stillfruit") >= 0)
    {
      eStillTable = aAllTables[i];
      break;
    }
  }
  
  if(eStillTable == null)
  {
    // Could not find Still table in which to insert my love :(
    return;
  }

  var sCocktailCraftPageHtml = response.responseText;
  
  var bSuccess = false;
  for(var i=0; i<5; ++i)
  {
    if(GetQuantityFromPageHtml(sCocktailCraftPageHtml, AllDrinks) == true)
    {
      bSuccess = true;
      break;
    }
  }

  for(var i=0; i<5; ++i)
  {
    if(GetQuantityFromPageHtml(sCocktailCraftPageHtml, AllMixers) == true)
    {
      bSuccess = true;
      break;
    }
  }

  for(var i=0; i<5; ++i)
  {
    if(GetQuantityFromPageHtml(sCocktailCraftPageHtml, AllGarnishes) == true)
    {
      bSuccess = true;
      break;
    }
  }
  
  var tr = eStillTable.insertRow(eStillTable.rows.length);
  var tc = tr.insertCell(0);
  var sCellHtml = "<table><tr><th>Drinks</th><th>Mixers</th><th>Garnishes</th><th>Makeables</th></tr><tr style='font-size:8pt;'><td>";
  for(var i=0; i<AllDrinks.length; ++i)
  {
    if(AllDrinks[i].CurrentQuantity > 0)
      sCellHtml += AllDrinks[i].Name + " (" + AllDrinks[i].CurrentQuantity + ")<br>";
  }

  sCellHtml += "</td><td>";
  for(var i=0; i<AllMixers.length; ++i)
  {
    if(AllMixers[i].CurrentQuantity > 0)
      sCellHtml += AllMixers[i].Name + " (" + AllMixers[i].CurrentQuantity + ")<br>";
  }

  sCellHtml += "</td><td>";
  for(var i=0; i<AllGarnishes.length; ++i)
  {
    if(AllGarnishes[i].CurrentQuantity > 0)
      sCellHtml += AllGarnishes[i].Name + " (" + AllGarnishes[i].CurrentQuantity + ")<br>";
  }
  
  sCellHtml += "</td><td>";
  for(var i=0; i<AllMakeables.length; ++i)
  {
    sCellHtml += "<span style='background-color:" + AllMakeables[i].Color + "' title='";
    sCellHtml += AllMakeables[i].Booze.Name;
    if(AllMakeables[i].Booze.Base != null)
      sCellHtml += " (" + AllMakeables[i].Booze.Base.Name + ")";
    sCellHtml += " + " + AllMakeables[i].Mixer.Name;
    if(AllMakeables[i].Booze.Base != null)
      sCellHtml += " (" + AllMakeables[i].Mixer.Base.Name + ")";

    sCellHtml += " + " + AllMakeables[i].Garnish.Name;
    
    sCellHtml += "'>";
    var oBaseMixer = AllMakeables[i].Mixer;
    if(AllMakeables[i].Mixer.Base != null)
      oBaseMixer = AllMakeables[i].Mixer.Base;
    switch(ShortestMakeableMethod(AllMakeables[i]))
    {
      case 1: sCellHtml += "<b>" + AllMakeables[i].Name + "</b>"; break;
      case 2: sCellHtml += AllMakeables[i].Name + " (use still once)"; break;
      case 3: sCellHtml += AllMakeables[i].Name + " (use still twice)"; break;
      case 4: sCellHtml += AllMakeables[i].Name + " (buy " + oBaseMixer.Name + " and use still once)"; break;
      case 5: sCellHtml += AllMakeables[i].Name + " (buy " + oBaseMixer.Name + " and use still twice)"; break;
    }
    
    sCellHtml += "</span><br>";
  }
  
  sCellHtml += "</td></tr></table>";
  tc.innerHTML = sCellHtml;
}




// Takes a makeable concoction and returns a number representing the easiest method to create the makeable.
// 0 = cannot create
// 1 = creatable with currently available items
// 2 = creatable if the still is used once
// 3 = creatable if the still is used twice
// 4 = use the still once and buy the fruit
// 5 = use the still twice and by the fruit
function ShortestMakeableMethod(oMakeable)
{
  var iDrinkMethod = 0;
  for(var i=0; i<AllDrinks.length; ++i)
  {
    if(AllDrinks[i].CurrentQuantity < 1)
      continue;
      
    if(oMakeable.Booze == AllDrinks[i])
    {
      iDrinkMethod = 1;
      break;
    }
    else if(oMakeable.Booze == AllDrinks[i].Improved)
    {
      iDrinkMethod = 2;
    }
  }
  
  var iMixerMethod = 0;
  for(var i=0; i<AllMixers.length; ++i)
  {
    if(AllMixers[i].CurrentQuantity < 1)
      continue;
      
    if(oMakeable.Mixer == AllMixers[i])
    {
      iMixerMethod = 1;
      break;
    }
    else if(oMakeable.Mixer == AllMixers[i].Improved)
    {
      iMixerMethod = 2;
    }
  }
  
  var bHaveGarnish = false;
  for(var i=0; i<AllGarnishes.length; ++i)
  {
    if(AllGarnishes[i].CurrentQuantity < 1)
      continue;
      
    if(oMakeable.Garnish.Name == AllGarnishes[i].Name)
    {
      bHaveGarnish = true;
      break;
    }
  }
  
  //alert(oMakeable.Name + ": Drink=" + iDrinkMethod + ", Mix=" + iMixerMethod);
  
  if(bHaveGarnish == false || iDrinkMethod == 0)
    return 0;
  else if(iDrinkMethod == 2 && iMixerMethod == 2)
    return 3;
  else if( (iDrinkMethod == 2 && iMixerMethod == 1) || (iDrinkMethod == 1 && iMixerMethod == 2) )
    return 2;
  else if(iDrinkMethod == 1 && iMixerMethod == 0)
    return 4;
  else if(iDrinkMethod == 2 && iMixerMethod == 0)
    return 5;
  else
    return 1;
}


// This function takes the raw HTML of a page and scrapes it looking for items and their quantities
// The first param, sHtml, is just a big string that happens to be the HTML of a page.
// The second param, aItemArray is an array of objects. Each object should have a Name attribute (string) and a CurrentQuantity attribute (int)
// Assumptions: The quantity will be within 200 characters of the name of the item and will be of the form "(X)" where X is the quantity.
function GetQuantityFromPageHtml(sHtml, aItemArray)
{
  if(sHtml == null || sHtml.length < 1 || aItemArray == null || aItemArray.length < 1)
    return false;
    
  for(var i=0; i<aItemArray.length; ++i)
  {
    var iStartPos = sHtml.indexOf(aItemArray[i].Name);
    if(iStartPos < 0)
      continue;
    aItemArray[i].CurrentQuantity = parseInt(StringBetween(sHtml.substr(iStartPos, 200), "(", ")"), 10);
    
    // if we get insane numbers, pass that data back to the calling function so it can try again
    if(aItemArray[i].CurrentQuantity > 9999 || aItemArray[i].CurrentQuantity == NaN)
      return false;
  }
  
  return true;
}



// This function returns the string between 2 given characters.
// The first param, sInput, is the string to search
// The second param, sStart, is the start of the string you want. This string will NOT be included in the result
// The third param, sEnd, is the end of the string you want. This string will also NOT be included in the result
// Note: The function will only look for the first occurence of sStart, but will start at the END of that string to find sEnd.
// Example: StringBetween("ABC(2) DEF(3) GHI(4)", "DEF(", ")"); will return "3"
function StringBetween(sInput, sStart, sEnd)
{
  if(sInput == null)
    return null;
    
  var iStart = sInput.indexOf(sStart);
  if(iStart < 0)
    return null;
  
  iStart += sStart.length;

  if(sEnd != null)
  {
    var iEnd = sInput.indexOf(sEnd, iStart);
    if(iEnd < 0)
      return null;
    
    return sInput.substring(iStart, iEnd);
  }
  else
    return sInput.substring(iStart);
}

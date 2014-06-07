// ==UserScript==
// @name           WarHeroAlerter
// @namespace      DoorbellsDingDong
// @description    Puts up large red letters if you are fighting a war hero
// @include        *kingdomofloathing.com/fight.php*
// @include        *127.0.0.1*/fight.php*
// ==/UserScript==

var aAllHeroKeys =
[
  "Brutus, the toga-clad lout",
  "Danglin' Chad",
  "Monty Basingstoke-Pratt, IV",
  "Next-generation Frat Boy",
  "War Frat Streaker",
  "C.A.R.N.I.V.O.R.E",
  "Glass of Orange Juice",
  "Neil",
  "Slow Talkin' Elliot",
  "Zim Merman",
];

var aAllUltraRareKeys =
[
  "Temporal Bandit",
  "crazy bastard",
  "a Knott Slanding",
  "hockey elemental",
  "Hypnotist of Hey Deze",
  "infinite meat bug",
  "The Master Of Thieves",
  "Baiowulf",
  "Count Bakula"
];

setTimeout(Check, 100);

function Check()
{
  for(var i=0; i<aAllHeroKeys.length; ++i)
  {
    if(document.body.innerHTML.indexOf(aAllHeroKeys[i]) >= 0)
    {
      ChangeCombatBanner("<h3 style='color:red;'>WAR HERO COMBAT!!!</h3>");
      return;
    }
  }

  for(var i=0; i<aAllUltraRareKeys.length; ++i)
  {
    if(document.body.innerHTML.indexOf(aAllUltraRareKeys[i]) >= 0)
    {
      ChangeCombatBanner("<h3 style='color:red;'>ULTRA RARE COMBAT!!!</h3>");
      return;
    }
  }
}

function ChangeCombatBanner(sMessage)
{
  var aAllBolds = document.getElementsByTagName("b");
  for(var j=0; j<aAllBolds.length; ++j)
  {
    if(aAllBolds[j].innerHTML.indexOf("Combat!") >= 0)
    {
      aAllBolds[j].innerHTML = aAllBolds[j].innerHTML.replace("Combat!", sMessage);
      return;
    }
  }
}
// ==UserScript==
// @name Rekrutierungsskript
// @namespace none
// @description F�gt Standardwerte in die Eingabefelder ein
// @include http://de*.die-staemme.de/game.php*
// ==/UserScript==

var i,l;
var siteType = -1; //0 ... Barracks, 1 ... Stable, 2 ... Garage
var coords;
var regExBarracks = /'spear'/;
var regExStable = /'spy'/;
var regExGarage = /'ram'/;
var regExVillage = /screen=overview$/;

var villageType = new Array();
//Hier sind die D�rfer einzuf�gen, so wie im Beispiel (f�r Off: = 0; f�r Deff: = 1)
villageType["(500|501) K55"] = 0;
villageType["(501|500) K55"] = 1;


var truppen = new Array();
truppen[0] = new Array();
truppen[1] = new Array();

//OFF
truppen[0][0] = 0; //spear
truppen[0][1] = 0; //sword
truppen[0][2] = 450; //axe
truppen[0][3] = 0; //archer
truppen[0][4] = 0; //spy
truppen[0][5] = 150; //light
truppen[0][6] = 75; //marcher
truppen[0][7] = 0; //heavy
truppen[0][8] = 50; //ram
truppen[0][9] = 0; //catapult

//DEFF
truppen[1][0] = 25;
truppen[1][1] = 25;
truppen[1][2] = 0;
truppen[1][3] = 25;
truppen[1][4] = 0;
truppen[1][5] = 0;
truppen[1][6] = 0;
truppen[1][7] = 25;
truppen[1][8] = 0;
truppen[1][9] = 0;

for(i = 0; i < document.links.length && siteType < 0; i++)
{
  l = document.links[i];

  if(regExBarracks.test(l.href))
    siteType = 0;
  else
  {
    if(regExStable.test(l.href))
    siteType = 1;
    else
    {
      if(regExGarage.test(l.href))
        siteType = 2;
      else
        if(regExVillage.test(l.href))
            coords = l.nextSibling.nextSibling.firstChild.nodeValue;
    }
  } 
}

if(siteType >= 0)
{
  for(i = 0; i < document.getElementsByTagName("input").length - 1; i++)
  {
    document.getElementsByTagName("input")[i].value = truppen[villageType[coords]][i+4*siteType];
    if(i == 1 && siteType == 2)
      i = 4;
  }
}

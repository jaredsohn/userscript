// ==UserScript==
// @name           TPB Add Remover
// @namespace      Test
// @include        http://thepiratebay.org/*
// ==/UserScript==

//Fjerner den irriterende telefon
var IMGs = document.body.getElementsByTagName('img')
var IMGen = IMGs[1].parentNode.parentNode;
IMGen.parentNode.removeChild(IMGen);

//Get the numbers at the button
var Temp = document.getElementById('content');
var DIVs = Temp.getElementsByTagName('div')
var Numbers = DIVs[4].innerHTML;
Numbers = '<center>' + Numbers + '<\/center>';

//Fjerner dem i siden - (og gør midten bredere) - og sætter tal på
document.getElementById('content').innerHTML = document.getElementById('main-content').innerHTML + Numbers;

//Removes the lay down advertise
var FT = document.getElementById('foot');
var FT2 = FT.getElementsByTagName('iframe');
FT = FT2[0].parentNode;
FT.removeChild(FT2[0]);

//Remove open source advertise
var X = document.getElementById('open-software');
X.parentNode.removeChild(X);

//Removes the RSS-icon
var DoIt = false;
if (DoIt == true)
{
	X = document.getElementById('fbanners');
	X.parentNode.removeChild(X);
}
// ==UserScript==
// @name        OGame Reduced Shipyard
// @namespace	OGame Reduced Shipyard
// @description This script removes the ships you chose in your shipyard
// @author      Megrim
// @date        2007-02-19
// @version     v0.76
// @include http://ogame*.de/game/buildings.php*
// @exclude
// ==/UserScript==

(function() {

/************************************Put 1 on the ships you want to hide***************************/

	var SmallCargo=0;
	var LargeCargo=0;
	var LightFighter=0;
	var HeavyFighter=0;
	var Cruiser=0;
	var Battleship=0;
	var ColonyShip=0;
	var Recycler=0;
	var EspionageProbe=0;
	var Bomber=0;
	var SolarSatellite=0;
	var Destroyer=0;
	var DeathStar=0;
	var Battlecruiser=0;

/****************************thanks to klandestino, this is his idea*********************************/
	

	var trs = document.getElementsByTagName('tr');
	for (var i = 0; i < trs.length; i++) 
	{
		//alert(trs[i].innerHTML.indexOf("gebaeude/202.gif"));

		if(trs[i].innerHTML.indexOf("gebaeude/202.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/202.gif")<142) 
			{
				if(SmallCargo==1){trs[i].parentNode.removeChild(trs[i]);}
			}
		if(trs[i].innerHTML.indexOf("gebaeude/203.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/203.gif")<500) 
			{
				if(LargeCargo==1)trs[i].parentNode.removeChild(trs[i]);
			}
		if(trs[i].innerHTML.indexOf("gebaeude/204.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/204.gif")<500) 
			{
				if(LightFighter==1){trs[i].parentNode.removeChild(trs[i]);}
			}
		if(trs[i].innerHTML.indexOf("gebaeude/205.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/205.gif")<500) 
			{
				if(HeavyFighter==1)trs[i].parentNode.removeChild(trs[i]);
			}
		if(trs[i].innerHTML.indexOf("gebaeude/206.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/206.gif")<500) 
			{
				if(Cruiser==1)trs[i].parentNode.removeChild(trs[i]);
			}
		if(trs[i].innerHTML.indexOf("gebaeude/207.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/207.gif")<500) 
			{
				if(Battleship==1)trs[i].parentNode.removeChild(trs[i]);
			}
		if(trs[i].innerHTML.indexOf("gebaeude/208.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/208.gif")<500) 
			{
				if(ColonyShip==1)trs[i].parentNode.removeChild(trs[i]);
			}
		if(trs[i].innerHTML.indexOf("gebaeude/209.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/209.gif")<500) 
			{
				if(Recycler==1)trs[i].parentNode.removeChild(trs[i]);
			}
		if(trs[i].innerHTML.indexOf("gebaeude/210.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/210.gif")<500) 
			{
				if(EspionageProbe==1)trs[i].parentNode.removeChild(trs[i]);
			}
		if(trs[i].innerHTML.indexOf("gebaeude/211.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/211.gif")<500) 
			{
				if(Bomber==1)trs[i].parentNode.removeChild(trs[i]);
			}
		if(trs[i].innerHTML.indexOf("gebaeude/212.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/212.gif")<500) 
			{
				if(SolarSatellite==1)trs[i].parentNode.removeChild(trs[i]);
			}
		if(trs[i].innerHTML.indexOf("gebaeude/213.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/213.gif")<500) 
			{
				if(Destroyer==1)trs[i].parentNode.removeChild(trs[i]);
			}
		if(trs[i].innerHTML.indexOf("gebaeude/214.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/214.gif")<500) 
			{
				if(DeathStar==1)trs[i].parentNode.removeChild(trs[i]);
			}
		if(trs[i].innerHTML.indexOf("gebaeude/215.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/215.gif")<500) 
			{
				if(Battlecruiser==1)trs[i].parentNode.removeChild(trs[i]);
			}
	}		
})();
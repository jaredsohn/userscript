// ==UserScript==
// @name           Nie zabezpieczone surowce iw
// @namespace      "C:\rexgame bot on.js"
// @include        http://s1.infinite-wars.com/msg.php*
// ==/UserScript==

var SprawdzText = document.getElementById("msg_title").innerHTML;

if(SprawdzText == "Rapport d'espionnage")
{
	var text = document.getElementById("msg_text").innerHTML;
	var tab = text.split("<br>");
	var ile = tab.length;
	
	var titanium = "";
	var silicon = "";
	var water = "";
	var hydrogen = "";
	var MagTitaniumLvl = "0";
	var MagSiliconLvl = "0";
	var MagWaterLvl = "0";
	var MagHydrogenLvl = "0"; 
	
	var ZabezpieczoneTitanium = 1000;
	var ZabezpieczoneSilicon = 1000;
	var ZabezpieczoneWater = 1000;
	var ZabezpieczoneHydrogen = 1000;
	
	var NieZabezpieczoneTitanium = 0;
	var NieZabezpieczoneSilicon = 0;
	var NieZabezpieczoneWater = 0;
	var NieZabezpieczoneHydrogen = 0;
	
	var ktore = 1;
	
	for(i=0;i<tab[ile-2].length;i++)
	{
		if(tab[ile-2][i] == '0' || tab[ile-2][i] == '1' || tab[ile-2][i] == '2' || tab[ile-2][i] == '3' || tab[ile-2][i] == '4' || tab[ile-2][i] == '5' || tab[ile-2][i] == '6' || tab[ile-2][i] == '7' || tab[ile-2][i] == '8' || tab[ile-2][i] == '9')
		{
			if(ktore == 1)
			{
				titanium += tab[ile-2][i];					
			}
			else if(ktore == 2)
			{
				silicon += tab[ile-2][i];		
			}	
			else if(ktore == 3)
			{
				water += tab[ile-2][i];		
			}
			else if(ktore == 4)
			{
				hydrogen += tab[ile-2][i];		
			}
		}
		else
		{
			if(tab[ile-2][i] == 'T')
				ktore = 1;
			else if(tab[ile-2][i] == 'S')
				ktore = 2;
			else if(tab[ile-2][i] == 'E')
				ktore = 3;
			else if(tab[ile-2][i] == 'H')
				ktore = 4;
		}
	}
	
	for(j=0;j<tab.length;j++)
	{     																																																																																						
	 	if(tab[j][0] == "H" && tab[j][1] == "a" && tab[j][2] == "n" && tab[j][3] == "g" && tab[j][4] == "a" && tab[j][5] == "r" && tab[j][7] == "d" && tab[j][8] == "e" && tab[j][10] == "t" && tab[j][11] == "i" && tab[j][12] == "t" && tab[j][13] == "a" && tab[j][14] == "n" && tab[j][15] == "e")
		{
			for(i=tab[j].indexOf("(")+1;i<tab[j].indexOf(")");i++)
				MagTitaniumLvl += tab[j][i];		
		}       																																																																																																																																											
		else if(tab[j][0] == "E" && tab[j][1] == "n" && tab[j][2] == "t" && tab[j][3] == "r" && tab[j][4] == "e" && tab[j][5] == "p" && tab[j][7] == "t" && tab[j][8] == "s" && tab[j][10] == "d" && tab[j][11] == "e" && tab[j][13] == "s" && tab[j][14] == "i" && tab[j][15] == "l" && tab[j][16] == "i" && tab[j][17] == "c" && tab[j][18] == "i" && tab[j][19] == "u" && tab[j][20] == "m")
		{
			for(i=tab[j].indexOf("(")+1;i<tab[j].indexOf(")");i++)
				MagSiliconLvl += tab[j][i];	
		}             																																																																																																																																								
		else if(tab[j][0] == "R" && tab[j][2] == "s" && tab[j][3] == "e" && tab[j][4] == "r" && tab[j][5] == "v" && tab[j][6] == "o" && tab[j][7] == "i" && tab[j][8] == "r" && tab[j][10] == "d" && tab[j][12] == "h" && tab[j][13] == "y" && tab[j][14] == "d" && tab[j][15] == "r" && tab[j][16] == "o" && tab[j][17] == "g" && tab[j][19] == "n" && tab[j][20] == "e")
		{
			for(i=tab[j].indexOf("(")+1;i<tab[j].indexOf(")");i++)
				MagHydrogenLvl += tab[j][i];
		}	            																																																																																								
		else if(tab[j][0] == "R" && tab[j][2] == "s" && tab[j][3] == "e" && tab[j][4] == "r" && tab[j][5] == "v" && tab[j][6] == "o" && tab[j][7] == "i" && tab[j][8] == "r" && tab[j][10] == "d" && tab[j][12] == "e" && tab[j][13] == "a" && tab[j][14] == "u")
		{
			for(i=tab[j].indexOf("(")+1;i<tab[j].indexOf(")");i++)
				MagWaterLvl += tab[j][i];
		}		    
	}	
	
	ZabezpieczoneTitanium += parseInt(MagTitaniumLvl,10) * 15000;
	ZabezpieczoneSilicon += parseInt(MagSiliconLvl,10) * 15000;
	ZabezpieczoneWater += parseInt(MagWaterLvl,10) * 15000;
	ZabezpieczoneHydrogen += parseInt(MagHydrogenLvl,10) * 15000;
	
	NieZabezpieczoneTitanium = parseInt(titanium,10) - ZabezpieczoneTitanium;
	NieZabezpieczoneSilicon = parseInt(silicon,10) - ZabezpieczoneSilicon;
	NieZabezpieczoneWater = parseInt(water,10) - ZabezpieczoneWater;
	NieZabezpieczoneHydrogen = parseInt(hydrogen,10) - ZabezpieczoneHydrogen;
	
	if(NieZabezpieczoneTitanium < 0)
		NieZabezpieczoneTitanium = 0;
		
	if(NieZabezpieczoneSilicon < 0)
		NieZabezpieczoneSilicon = 0;
		
	if(NieZabezpieczoneWater < 0)
		NieZabezpieczoneWater = 0;
		
	if(NieZabezpieczoneHydrogen < 0)
		NieZabezpieczoneHydrogen = 0;	
		
	var div = document.getElementById("msg_text");
	
	var nowyelement = document.createElement('div');
	nowyelement.innerHTML = '<br>Nie zabezpieczone surowce:<br>Titanium: ' + NieZabezpieczoneTitanium + '<br>Silicon: ' + NieZabezpieczoneSilicon + '<br>Water: ' + NieZabezpieczoneWater + '<br>Hydrogen: ' + NieZabezpieczoneHydrogen;
												
	div.appendChild(nowyelement);			
}						
else if(SprawdzText == "Raport szpiegowski")
{
	var text = document.getElementById("msg_text").innerHTML;
	var tab = text.split("<br>");
	var ile = tab.length;
	
	var titanium = "";
	var silicon = "";
	var water = "";
	var hydrogen = "";
	var MagTitaniumLvl = "0";
	var MagSiliconLvl = "0";
	var MagWaterLvl = "0";
	var MagHydrogenLvl = "0"; 
	
	var ZabezpieczoneTitanium = 1000;
	var ZabezpieczoneSilicon = 1000;
	var ZabezpieczoneWater = 1000;
	var ZabezpieczoneHydrogen = 1000;
	
	var NieZabezpieczoneTitanium = 0;
	var NieZabezpieczoneSilicon = 0;
	var NieZabezpieczoneWater = 0;
	var NieZabezpieczoneHydrogen = 0;
	
	var ktore = 1;
	
	for(i=0;i<tab[ile-2].length;i++)
	{
		if(tab[ile-2][i] == '0' || tab[ile-2][i] == '1' || tab[ile-2][i] == '2' || tab[ile-2][i] == '3' || tab[ile-2][i] == '4' || tab[ile-2][i] == '5' || tab[ile-2][i] == '6' || tab[ile-2][i] == '7' || tab[ile-2][i] == '8' || tab[ile-2][i] == '9')
		{
			if(ktore == 1)
			{
				titanium += tab[ile-2][i];					
			}
			else if(ktore == 2)
			{
				silicon += tab[ile-2][i];		
			}	
			else if(ktore == 3)
			{
				water += tab[ile-2][i];		
			}
			else if(ktore == 4)
			{
				hydrogen += tab[ile-2][i];		
			}
		}
		else
		{
			if(tab[ile-2][i] == 'T')
				ktore = 1;
			else if(tab[ile-2][i] == 'S')
				ktore = 2;
			else if(tab[ile-2][i] == 'E')
				ktore = 3;
			else if(tab[ile-2][i] == 'H')
				ktore = 4;
		}
	}
	
	for(j=0;j<tab.length;j++)
	{     																																																																																																																																													
	 	if(tab[j][0] == "H" && tab[j][1] == "a" && tab[j][2] == "n" && tab[j][3] == "g" && tab[j][4] == "a" && tab[j][5] == "r" && tab[j][7] == "Z" && tab[j][10] == "e" && tab[j][11] == "l" && tab[j][12] == "a" && tab[j][13] == "z" && tab[j][14] == "o")
		{                
			for(i=tab[j].indexOf("(")+1;i<tab[j].indexOf(")");i++)
				MagTitaniumLvl += tab[j][i];		
		}       																																																																																																																																																																																																																																																																							
		else if(tab[j][0] == "E" && tab[j][1] == "n" && tab[j][2] == "t" && tab[j][3] == "r" && tab[j][4] == "e" && tab[j][5] == "p" && tab[j][7] == "t" && tab[j][8] == "s" && tab[j][10] == "Z" && tab[j][12] == "L" && tab[j][13] == "u" && tab[j][14] == "t" && tab[j][15] == "i" && tab[j][16] == "n" && tab[j][17] == "u" && tab[j][18] == "m")
		{
			for(i=tab[j].indexOf("(")+1;i<tab[j].indexOf(")");i++)
				MagSiliconLvl += tab[j][i];	
		}             																																																																																																																																																																																																																					
		else if(tab[j][0] == "R" && tab[j][2] == "s" && tab[j][3] == "e" && tab[j][4] == "r" && tab[j][5] == "v" && tab[j][6] == "o" && tab[j][7] == "i" && tab[j][8] == "r" && tab[j][10] == "d" && tab[j][12] == "W" && tab[j][13] == "o" && tab[j][14] == "d" && tab[j][16] == "r")
		{
			for(i=tab[j].indexOf("(")+1;i<tab[j].indexOf(")");i++)
				MagHydrogenLvl += tab[j][i];
		}	            																																																																																																																																																															
		else if(tab[j][0] == "R" && tab[j][2] == "s" && tab[j][3] == "e" && tab[j][4] == "r" && tab[j][5] == "v" && tab[j][6] == "o" && tab[j][7] == "i" && tab[j][8] == "r" && tab[j][10] == "d" && tab[j][12] == "W" && tab[j][13] == "o" && tab[j][14] == "d" && tab[j][15] == "a")
		{
			for(i=tab[j].indexOf("(")+1;i<tab[j].indexOf(")");i++)
				MagWaterLvl += tab[j][i];
		}		    
	}	
	
	ZabezpieczoneTitanium += parseInt(MagTitaniumLvl,10) * 15000;
	ZabezpieczoneSilicon += parseInt(MagSiliconLvl,10) * 15000;
	ZabezpieczoneWater += parseInt(MagWaterLvl,10) * 15000;
	ZabezpieczoneHydrogen += parseInt(MagHydrogenLvl,10) * 15000;
	
	NieZabezpieczoneTitanium = parseInt(titanium,10) - ZabezpieczoneTitanium;
	NieZabezpieczoneSilicon = parseInt(silicon,10) - ZabezpieczoneSilicon;
	NieZabezpieczoneWater = parseInt(water,10) - ZabezpieczoneWater;
	NieZabezpieczoneHydrogen = parseInt(hydrogen,10) - ZabezpieczoneHydrogen;
	
	if(NieZabezpieczoneTitanium < 0)
		NieZabezpieczoneTitanium = 0;
		
	if(NieZabezpieczoneSilicon < 0)
		NieZabezpieczoneSilicon = 0;
		
	if(NieZabezpieczoneWater < 0)
		NieZabezpieczoneWater = 0;
		
	if(NieZabezpieczoneHydrogen < 0)
		NieZabezpieczoneHydrogen = 0;	
		
	var div = document.getElementById("msg_text");
	
	var nowyelement = document.createElement('div');
	nowyelement.innerHTML = '<br>Nie zabezpieczone surowce:<br>Titanium: ' + NieZabezpieczoneTitanium + '<br>Silicon: ' + NieZabezpieczoneSilicon + '<br>Water: ' + NieZabezpieczoneWater + '<br>Hydrogen: ' + NieZabezpieczoneHydrogen;
												
	div.appendChild(nowyelement);
}													
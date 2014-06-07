/*
 *  http://userscripts.org/scripts/show/6453
 *
 *  This script is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public
 *  License as published by the Free Software Foundation; either
 *  version 2 of the License, or (at your option) any later version.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  General Public License for more details.
 *  http://www.gnu.org/copyleft/gpl.html
 */

// ==UserScript== 
// @name			oGame Galaxy Return 3
// @author	da_Panos, Original author aNTRaX(oGame Galaxy Return 2)
// @description Automatic random interval galaxy view.
// @include			http://ogame*.de/game/galaxy.php?session=*
// @include			http://*ogame*/game/galaxy.php?session=*

// ==/UserScript==

var Time_min = 5000;   //MINIMUM TIMER IN MILISECONDS
var Time_max = 20000;  //MAXIMUM TIMER IN MILISECONDS


function Galaxy() 
{
	
var galaxia=document.getElementsByName('galaxy')[0];
var sistema=document.getElementsByName('system')[0];
if(galaxia.value==9 && sistema.value==499)
				{//TELOS UNIVERSE
				alert('Universe ends...');
				clearInterval(id);
				return;
				} else if(sistema.value<499)
													{
													document.getElementById('auto').name = 'systemRight';
													} else
															{
															//	alert('Galaxia '+galaxia.value+' procesada. Continuando con la siguiente.');
															sistema.value=1;
															document.getElementById('auto').name = 'galaxyRight';
															}

document.getElementById('galaxy_form').submit();
setTimeout(Galaxy,(Math.random()*(Time_max-Time_min))+Time_min);
}

	var id = setInterval(Galaxy,(Math.random()*(Time_max-Time_min))+Time_min );
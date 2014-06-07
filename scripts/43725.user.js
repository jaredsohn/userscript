/*
 *  Designed for OGame 0.83
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
// @name			OGame Galaxytool Updater (OG Update) 1.0
// @author			Kin0x
// @description		Script som passer perfekt til Galaxytool, samt OGame. Virker til FireFox 3, og tager kun 18 minutter om at opdatere alle 9 galakser, og uploade dem direkte til galaxytooldatabasen.
// @include			http://uni*.ogame.dk/game/index.php?page=galaxy*
// ==/UserScript==




var Time = 100;
var galaxia=document.getElementsByName('galaxy')[0];
var sistema=document.getElementsByName('system')[0];
		function Galaxy() 
			{
				//funktion der forbinder galaxytoolbaren med Ogame galaksen
			var galaxytool_status=document.getElementById('galaxytool_status')
			if(galaxytool_status!=null){
			
			if(galaxia.value==9 && sistema.value==499)
				{
				alert('Universo procesado');
				clearInterval(id);
				return;
				}
				else if(sistema.value<499)
					{
					document.getElementById('auto').name = 'systemRight';
					}
					else
					{
		//alert('Galaxia '+galaxia.value+' forarbejdes. Keep Script 1');
					sistema.value=1;
					document.getElementById('auto').name = 'galaxyRight';
					}

			document.getElementById('galaxy_form').submit();

			setTimeout(Galaxy,Time);
			}			
			}
			


	var id = setInterval(Galaxy,Time);



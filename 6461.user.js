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
// @name			oGame Galaxy Return 2
// @author			aNTRaX
// @description			Recorre la galaxia automáticamente exportando los datos al Galaxy Tool. Mejorada la versión de YeIk0s
// @include			http://ogame*.de/game/galaxy.php?session=*
// ==/UserScript==

var Time = 1000;

		function Galaxy() 
{
	
var galaxia=document.getElementsByName('galaxy')[0];
var sistema=document.getElementsByName('system')[0];
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
	//	alert('Galaxia '+galaxia.value+' procesada. Continuando con la siguiente.');
sistema.value=1;
document.getElementById('auto').name = 'galaxyRight';
}

document.getElementById('galaxy_form').submit();

	setTimeout(Galaxy,Time);
}

	var id = setInterval(Galaxy,Time);
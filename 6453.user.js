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
// @name			oGame Galaxy Return
// @author			YeIk0s
// @description			Recorre la galaxia automáticamente exportando los datos al Galaxy Tool. En tan solo 8 minutos puede exportar el universo entero.
// @include			http://ogame*.de/game/galaxy.php?session=*
// ==/UserScript==

var Time = 1000;

function Galaxy() 
{
document.getElementById('auto').name = "systemRight";
document.getElementById('galaxy_form').submit();
}

if (document.getElementsByName('system')[0].value != 499) { setInterval(Galaxy,Time); }
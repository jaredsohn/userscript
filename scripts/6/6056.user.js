/*
 *  This file is part of CinentradasForFirefox
 *  Copyright (C) 2006 Unbrained (josuicida@gmail.com)
 *  Source code at http://userscripts.org/scripts/show/6056
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
// @name			CinentradasForFirefox
// @author			Unbrained
// @description			Habilita la opcion de mostrar la ficha de las peliculas en cinentradas.com desde Firefox
// @include			http://www.entradas.com/entradas/*.do
// ==/UserScript==

unsafeWindow.toggle = function (capa) {
	var div = document.getElementById(capa);
	if (div.style['display']=='none') div.style['display']='';
	else div.style['display']='none';
}

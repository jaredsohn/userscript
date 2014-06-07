/*
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
// @name			oGame Galaxy Return [THC]Fever
// @author			Lord Zorel y [THC]Fever
// @description		Recorre la galaxia automáticamente exportando los datos al Galaxy Tool. Se adapta a la velocidad de tu ordenador parándose donde tú le indiques. Pero si no tienes el GalaxieToolBar 2.0 o superior, NO FUNCIONARÁ.
// @include			http://*.ogame.*/game/index.php?page=galaxy*
// ==/UserScript==

//Versión mejorada ya puedes recorrer el universo entero, si lo deseas solo tiene que poner los valores a galaxia = 9 y sistema = 499



var Time = 100;
var galaxia=document.getElementsByName('galaxy')[0];
var sistema=document.getElementsByName('system')[0];
	function Galaxy(){
		//aqui esta el truco, avanzara, cuando encuentre la ventanita del galaxietool
		var galaxytool_status=document.getElementById('galaxytool_status')
		if(galaxytool_status!=null){
			if((galaxia.value==1 && sistema.value==200) || (galaxia.value==9 && sistema.value==499)){	//<= Cambia el 1 por el número de la galaxia y el 200 por el número de sistema donde quieras que pare
				alert('Ya hemos llegado a ' + galaxia.value + ':' + sistema.value + '. By [THC]Fever');
				clearInterval(id);
				return;
			}else if(sistema.value<499){
				document.getElementById('auto').name = 'systemRight';
			}else if(galaxia.value<9 && sistema.value==499){
				document.getElementById('auto').name = 'galaxyRight';
				sistema.value=1;
			}
			document.getElementById('galaxy_form').submit();
			setTimeout(Galaxy,Time);
		}			
	}
		
var id = setInterval(Galaxy,Time);
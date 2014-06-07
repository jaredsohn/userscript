// ==UserScript== 
// @name			OGame Galaxy Return 2
// @author			Mordillo
// @description			Actualiza automaticamente o galaxytool
// @include			http://*.ogame.*/game/index.php*page=galaxy*
// ==/UserScript==

var Time = 3000;

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
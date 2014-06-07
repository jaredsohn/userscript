// ==UserScript==
// @name           Ogame manzanasfrescas 2
// @author         mohace
// @date           18-09-2007
// @version        0.3
// @namespace     
// @description    Crea links desde la galaxia ogame (nuevo icono) a manzanasfrescas.
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// ==/UserScript==

// Editar esta instruccion poniendo el universo en el cual jugamos.
var uni = 1
// Editar esta instruccion poniendo la preferencia de las estadisticas a ver en forma predeterminada, 7, 30 o 90 dias (entre las comillas)
var dias = '30'

// Para averiguar el userID de los jugadores
var d_Snapshot = document.evaluate('//th/a/img', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

// Rutina principal
for ( var i=0 ; i < d_Snapshot.snapshotLength; i++ ) {

	if (d_Snapshot.snapshotItem(i).getAttribute('alt') == 'Escribir mensaje') { 

		var temp1 = extraer(d_Snapshot.snapshotItem(i).parentNode.getAttribute('href') + 'lim','&messageziel=','lim')
		var nuevo_a = document.createElement("a");
		nuevo_a.href ='http://www.manzanasfrescas.com/userdetails.php?startrange=0&g=' + dias + 'd&uni=' +  uni + '&id=' + temp1
		var nueva_img = document.createElement("img");
		nueva_img.src = 'http://www.manzanasfrescas.com/favicon.ico';
		nuevo_a.appendChild(nueva_img);
		d_Snapshot.snapshotItem(i).parentNode.parentNode.appendChild(nuevo_a);
		
	}

}

function extraer(texto, etqini, etqfin)
{
var ind0, ind1, parte ="";
ind0 = texto.indexOf(etqini);
if (ind0 >=0)
{
ind1 = texto.indexOf(etqfin);
if (ind1>ind0)
parte = texto.substring(ind0+etqini.length, ind1);
}
return parte;
}


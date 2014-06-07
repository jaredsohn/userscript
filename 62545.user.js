// ==UserScript==
// @name            Investigaciones
// @autor           nulan
// @description     Muestra información relativa al estado de las investigaciones.
// @version         1.0.1
// @homepage        inexistente
// @include         http://s*.ikariam.*/index.php?view=researchAdvisor*
// @namespace       nulan_investigaciones
// ==/UserScript==

// Historial de versiones:
//	- 1.0.0 21/11/2009 Versión inicial
//	- 1.0.1 25/11/2009 Añade al tanto por ciento de progreso de la investigación un barra que represante gráficamente dicho progreso.

function horasACadena(pHoras)
{
	var ret = "";
	
	//pHoras = 53.8;
	//pHoras = 3.8;
	var dias = parseInt((pHoras / 24) , 10);
	var horasAux = pHoras%24;
	var horas = parseInt(horasAux, 10);	
	var minutos = ((horasAux-horas) * 60).toFixed(0); //quitamos los decimales
	
	if (dias>0)
	{
		ret += dias + "D ";
	}
	ret += horas + "h " + minutos + "m" ;// + "__" + dias + "_" + horasAux + "_" +  horas + "_" + minutos;
	return ret;
}


function insertarEstilo(css) {
	var cabecera; var estilo;
	cabecera = document.getElementsByTagName('head')[0];
	if (cabecera) 
	{ 
		estilo = document.createElement('style');
		estilo.type = 'text/css';
		estilo.innerHTML = css;
		cabecera.appendChild(estilo);
	}
}



var s = 'informacion: <br>';

var puntosActuales;
var puntosHora;
var puntosNecesarios;
var porcentajeDescubierto;

var liPuntosActuales = document.evaluate("//li[@class='points']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
puntosActuales = liPuntosActuales.snapshotItem(0).innerHTML.substring(liPuntosActuales.snapshotItem(0).innerHTML.lastIndexOf(":") + 2, liPuntosActuales.snapshotItem(0).innerHTML.length).replace(/,/g,""); //reemplaza todos los , por la cadena vacia
liPuntosActuales.snapshotItem(0).innerHTML = "Puntos investigados: " + liPuntosActuales.snapshotItem(0).innerHTML.substring(liPuntosActuales.snapshotItem(0).innerHTML.lastIndexOf(":") + 2, liPuntosActuales.snapshotItem(0).innerHTML.length);

var liPuntosHora = document.evaluate("//li[@class='time']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
puntosHora = liPuntosHora.snapshotItem(0).innerHTML.substring(liPuntosHora.snapshotItem(0).innerHTML.lastIndexOf(":") + 2, liPuntosHora.snapshotItem(0).innerHTML.length).replace(/,/g,""); //reemplaza todos los , por la cadena vacia


//insertarEstilo('.puntosRestantes {display: block!important; background-position:10px 2px; font-size:14px; background-Image:url(data:image/gif;base64,R0lGODlhDQATAPcAAAUGCf8cH46IdZuTft68Mt/HNP7JH+vFKu7ZL+nWMvPLJ/7XJu3oN//lKf/rMv/3Kv/1NP//M//9PPr2QP/+RP//UKKahqqiiqakl7WvlsC4nszFp+zqz/7+/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBmAABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNmZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZmzGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZAJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+ZzP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zAAAACH5BAEAAB4ALAAAAAANABMAAAinADsI7ODAQYMGCwYqhDBBAgSDCRVKoEAxQAAHCwwMhECxAgWLEBBqdDBxQoUKFiM0UGDAAMkJFmPGbNkAggSZMlsucBAhAgOYARggyGhgQQMHDxgwsFiAqEajDRAkYMpSo8CiCw4oOHCgpcIOLbkS6PpVIIYLFwYIuFC2gwUNHDYMsNA2rQa1bMtayMBBgwW6ZTNo2KBBQ4a2AgZgsJC4bQcAkAEoDAgAOw%3D%3D); } ');
insertarEstilo('.puntosRestantes {display: block!important; background-position:10px 2px; font-size:14px; background-Image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAATCAYAAABLN4eXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYyLjFiT2tyLwAAAVRJREFUOE+Vkk8rRFEYxu9NlO+gZkfuRsaUjYWFD+DL2FpKFjaKoiwmUTZWysLCZpIoO5JipZjBgpiamvs4zzPnPfdMcXHr6fy57+993vOek6ZpmsRf3pyE1p22Brx1k4Hstj+IkAkfNXQ+Z4HuDDhHqwo8jCO/HkUcVwAMzOcKjVQAyoGE8rNKAAUpqwGY780N4j/vZmCiEryLSiNEGYQpQe/nY3KjAiTAAn8YC8hlUXl0+yvEQ6pEluH08jjd66BPwPXrzURohsoTRDeC7UwQZdD9aa0PEMTuBdDBzPp05RJ4J0JxE/QY7NJ0SN6HU6uRKZAjZQ2w2ADJ0bfUgu+OqwH69kXY5u7OBvbrK9LW2iJWlxc0L4Xqm0s4OdrGc/MSF409gdwrhcyB4L+cDg/W5USQLr86EWAwS+NIca+0PB6cZbEhdLB1KcSfg0PDiBUDnH8BcJHH5SrMhosAAAAASUVORK5CYII%3D); } ');
insertarEstilo('.tiempoRestante {display: block!important; background-position:10px 2px; font-size:14px; background-Image:url(http://s14.ikariam.es/skin/resources/icon_time.gif); } ');
insertarEstilo('.porcentaje {display: block!important; background-position:10px 22px; font-size:14px; position: relative; left:-20px } ');
//insertarEstilo('.porcentaje {display: inline !important; font-size:11px; margin:0px!important; padding:0px!important; width:300px!important} ');
insertarEstilo('.researchButton2 {display: none!important;}');
insertarEstilo('.costs {top: 10px!important;}');


var liPendientes;
var liPorcentajeDescubierto;
var liTiempoRestante;

var liPuntos = document.evaluate("//li[@class='researchPoints']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < liPuntos.snapshotLength; i++) 
{	
	puntosNecesarios = liPuntos.snapshotItem(i).innerHTML.replace(/,/g,""); //reemplaza todos los , por la cadena vacia
	porcentajeDescubierto = (puntosActuales / puntosNecesarios)*100;

	if (parseInt(puntosActuales,10) < parseInt(puntosNecesarios,10) ){	
			
		var horasRestantes = (puntosNecesarios - puntosActuales) / puntosHora;
			
		liPuntos.snapshotItem(i).setAttribute('title', 'Puntos de investigación necesarios');	
		
		//var licaja = document.createElement('li');
		//licaja.innerHTML = '<div style="border:solid 1px #73443E; width:60px; height:14px"><div style="background-color: #73443E; width:20px; height:14px"></div></div>';
		//liPuntos.snapshotItem(i).parentNode.appendChild(licaja);
		
		liPendientes = document.createElement('li');
		liPendientes.innerHTML = (puntosNecesarios - puntosActuales);
		liPendientes.setAttribute('class', 'puntosRestantes');	
		liPendientes.setAttribute('title', 'Puntos de investigación pendientes');	
		liPuntos.snapshotItem(i).parentNode.appendChild(liPendientes);
		
		liTiempoRestante = document.createElement('li');
		liTiempoRestante.innerHTML = horasACadena(horasRestantes);
		liTiempoRestante.setAttribute('class', 'tiempoRestante');	
		liTiempoRestante.setAttribute('title', 'Tiempo Restante');	
		liPuntos.snapshotItem(i).parentNode.appendChild(liTiempoRestante);
		
		liPorcentajeDescubierto = document.createElement('li');
		liPorcentajeDescubierto.innerHTML = '<div style="border:solid 1px #73443E; width:70px; height:12px"><div style="background-color: #73443E; width:' + porcentajeDescubierto.toFixed(0) + '%; height:12px;"></div></div><div style="position:relative; top:-20px; left:80px">' +  porcentajeDescubierto.toFixed(0) + "%</div>";
		liPorcentajeDescubierto.setAttribute('class', 'porcentaje');	
		liPorcentajeDescubierto.setAttribute('title', 'Progreso (%)');	
		liPuntos.snapshotItem(i).parentNode.appendChild(liPorcentajeDescubierto);
	}
}

/*
var div = document.getElementById('mainview');
var info = document.createElement('div');
div.insertBefore(info, div.childNodes[2]);
info.innerHTML = s;
*/





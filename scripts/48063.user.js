// ==UserScript==
// @name           Recursos Volando para XENOM
// @author         elpeter - Modificado por SPAWN
// @date           03-5-2009
// @version        1.0
// @namespace      http://userscripts.org/scripts/show/13299
// @description    Permite visionar en la Vision General los beneficios obtenidos en los robos actuales, y los recursos que se encuentran "volando". (Funciona con la version 0.78b)
// @include  	   	 http://*ogame*/*page=overview*
// ==/UserScript==

// Script original: http://userscripts.org/scripts/show/13070
// Modificado por elpeter para funcionar en la versiÃ³n 0.77c
// Agregado el 26-10-2007
// Solo se muestra cuando las naves vuelven de atacar, cuando hay recursos transportandose o desplegando y cuando los recicladores vuelven con la carga.
//
// Vers. 0.1.1
// Correguido el cartel "Recursos Robados" por "Recursos volando"
// Vers. 0.1.2
// Agregada una nueva fila con el total de recursos volando y cambio de colores en las distintas misiones.
// Vers. 0.1.3
// Modificaciones varias en el front-end del script, reestructuraciÃ³n en columnas para una mejor visiÃ³n de los recursos.

//////////////////////////////////////////////////////////////
/*
12-11-2007
Renombrado el script de "BeneficiosRobos_0.77c" a un nombre mÃ¡s adecuado: "RecursosVolando_0.77c"
*/
//////////////////////////////////////////////////////////////

/*
 Vers. 0.1.4
 Script Multi-lenguaje
   -  Carga automÃ¡ticamente los nombres de los recursos de la vision general.
   -  Detecta el dominio del servidor y traduce las misiones con respecto al dominio.
   	En caso de no encontrar idioma por defecto se pone en inglÃ©s.
*/

// Vers. 0.1.5
// AÃ±andida la mision de Expedicion / Added expedition mission
// AÃ±adido el Turko (Gracias Samet) / Turkish added (Thanks Samet)
// Vers. 0.1.5a
// Bug en mision expedicion arreglado / Fixed expedition mission bug
// Vers. 0.1.5b
// AÃ±adido el FrancÃ©s (Gracias liberator) / French added (Thanks liberator)
// Vers. 0.1.5b1
// Bug en francÃ©s solucionado / French bug solved
// Vers. 0.1.5b2
// Otro bug en francÃ©s solucionado / Another French bug solved
// Vers. 0.1.6
// Otro bug en francÃ©s solucionado / Another French bug solved
// Agregados los recursos del planeta actual / Added actual planet resources
// Vers. 0.1.6.1
// Bug en francÃ©s solucionado / French bug solved
// Arreglado bug en los recursos del planeta actual / Actual planet resources bug solved
// Vers. 0.1.7
// Recursos Volando mas recursos de la colonia activa se muestran en otra linea
// Flying Resources plus active plannet resources shown at other line
// Vers. 0.1.8
// Added ogame.org compatibility (Thanks skullcrusher) / Agregada compatibilidad con Ogame.org (Gracias skullcrusher)
// Vers. 0.2
// Agregada funcion para mostrar/ocultar la tabla de Recursos Volando / Added show/hide Flying Resources table function
// Vers. 0.2.1
// Bug on attacks mission on ogame.tr solved / Arreglado bug en las misiones de ataque en ogame.tr
// Vers. 0.2.2
// Error at ogame.tr translation fixed / Solucionado error en traducciÃ³n en ogame.tr
// Vers. 0.2.3
// Error at ogame.fr translation fixed / Solucionado error en traducciÃ³n en ogame.fr

//Declaracion de variables
var allElements, thisElement, overlib;
var allTr, thisTr, header;
var metal=0;
var cristal=0;
var deuterio=0;
var metalE=0;
var cristalE=0;
var deuterioE=0;
var metalT=0;
var cristalT=0;
var deuterioT=0;
var metalD=0;
var cristalD=0;
var deuterioD=0;
var metalX=0;
var cristalX=0;
var deuterioX=0;
var metalP=0;
var cristalP=0;
var deuterioP=0;
var colorP='#FFFFFF';
var color='#FFFFFF';
var colorE='#FFFFFF';
var colorT='#FFFFFF';
var colorD='#FFFFFF';
var colorA='#FFD700';
var colorX='#FFFFFF';
var activaP=false;
var activa=false;
var activaE=false;
var activaT=false;
var activaD=false;
var activaX=false;
var totalR=false;
var totalRC=false;
var Titulo_text = 'Flying Resources';
var Robos_text = 'Attacks';
var Escombros_text = 'Harvest';
var Transportes_text = 'Transports';
var Despliegues_text = 'Deploys';
var Expedicion_text = 'Expedition';
var Planet_text ='Planet';

// INICIO DeclaraciÃ³n de funciones para mostrar/ocultar la tabla de Recursos Volando
// Por cortesÃ­a de SpitFire

try {
	var contentSection = location.href.match(/page=([^&]+)/)[1];
} catch(e){'Error detecting section: '+GM_log(e)}

function getConf(nombre, confName, defConfName, separator) {
	var conf = GM_getValue(confName,defConfName).split(separator);
	for (var i=0; i<conf.length; i+=2) {
		if (conf[i]==nombre) {
			if (conf[i+1]=='false')
				return false;
			return conf[i+1];
		}
	}
	conf = defConfName.split(separator);
	for (var i=0; i<conf.length; i+=2) {
		if (conf[i]==nombre) {
			if (conf[i+1]=='false')
				return false;
			return conf[i+1];
		}
	}
	return false;
}

function setConf(nombre, valor, confName, defConfName, separator) {
	var confStr = GM_getValue(confName, '');
	if (confStr=='') {
		GM_setValue(confName, [nombre, valor].join(separator));
		return;
	}
	var conf = confStr.split(separator);
	var valorDef = (String(getDefConf(nombre, defConfName, separator))==String(valor));
		if (conf.length<=1) {
			if (!valorDef) GM_setValue(confName, [nombre, valor].join(separator))
			return;
		}
		for (var i=0; i<conf.length; i+=2) {
			if (conf[i]==nombre) {
				if (valorDef) conf.splice(i, 2);
				else conf[i+1]=valor;
				GM_setValue(confName, conf.join(separator));
				return;
			}
		}
		if (!valorDef) GM_setValue(confName, [confStr,nombre,valor].join(separator));
}

unsafeWindow.getConf=getConf;
unsafeWindow.setConf=setConf;

function setBooleanConf(nombre, value) {
	var hiddenStr = GM_getValue(nombre+'_'+location.hostname, '');
	var hiddenVec = hiddenStr.split(':');
	for (var h in hiddenVec) {
		if (hiddenVec[h]==value) {
			return false;
		}
	}
	GM_setValue(nombre+'_'+location.hostname, (hiddenStr==''?String(value):hiddenStr+':'+value));
	return true;
}

function delBooleanConf(nombre, value) {
	var hiddenVec = GM_getValue(nombre+'_'+location.hostname, '').split(':');
	for (var h in hiddenVec) {
		if (hiddenVec[h]==value) {
			hiddenVec.splice(h, 1);
			GM_setValue(nombre+'_'+location.hostname, hiddenVec.join(':'));
			return true;
		}
	}
	return false;
}

function getBooleanConf(nombre, value) {
	var hiddenVec = GM_getValue(nombre+'_'+location.hostname, '').split(':');
	for (var h in hiddenVec) {
		if (hiddenVec[h]==value) {
			return h;
		}
	}
	return false;
}

function setResourcesHidden(page) {
	hideIdNoEffects('resources_minus');
	showIdNoEffects('resources_plus');
	var i=0;
	while (hideId('resources'+i)) {i++;}
	return setBooleanConf('hiddenResources', 'overview');
} unsafeWindow.setResourcesHidden = setResourcesHidden;
		
function delResourcesHidden(page) {
	showIdNoEffects('resources_minus');
	hideIdNoEffects('resources_plus');
	var i=0;
	while (showId('resources'+i)) {i++;}
	return delBooleanConf('hiddenResources', 'overview');
} unsafeWindow.delResourcesHidden = delResourcesHidden;


	function hideEffects(path, list, level) {
		var object = locateSnapshot(path);
		var pos = list.split(':');
		if (!level) {
			setHidden(pos[0])
			var level = 1.0;
		}
		for (var i in pos) {
			object.snapshotItem(pos[i]).style['opacity']=level;
			if (parseFloat(level)<0.1) {
				object.snapshotItem(pos[i]).style['display']='none';
			}
		}
		if (parseFloat(level)>0.1) setTimeout("hide('"+path+"', '"+list+"', "+(parseFloat(level)-0.1)+")", 30);
		else {
			object.snapshotItem(parseInt(pos[0])-1, 10).setAttribute('onclick', "show('"+path+"', '" + list + "')");
			object.snapshotItem(parseInt(pos[0])-1, 10).title='Click aqui para expandir';
		}
	}
	function showEffects(path, list, level) {
		var pos = list.split(':');
		var object = locateSnapshot(path);
		if (!level) {
			delHidden(pos[0]);
			var level = 0.0;
		}
		for (var i in pos) {
			if (level==0.0) object.snapshotItem(pos[i]).style['display']='';
			object.snapshotItem(pos[i]).style['opacity']=level;
		}
		
		if (parseFloat(level)<0.9) {
			setTimeout("show('"+path+"', '"+list+"', "+String(parseFloat(level)+0.1)+")", 30);
		}
		else {
			object.snapshotItem(parseInt(pos[0])-1, 10).setAttribute('onclick', "hide('"+path+"', '" + list + "')");
			object.snapshotItem(parseInt(pos[0])-1, 10).title='Click aqui para contraer';
		}
	}
	function hideIdEffects(id, level) {
		if (!level) var level = 1.0;
		var object = document.getElementById(id);
		if (object) {
			object.style['opacity']=level;
			if (parseFloat(level)<0.1) {
				object.style['display']='none';
				object.style['opacity']='1.0';  // por el caso de mostrarlo desde otro frame
			}
			else setTimeout("hideId('"+id+"', "+(level-0.1)+")", 30);
			return true;
		} else return false;
	}
	function showIdEffects(id, level) {
		var object = document.getElementById(id);
		if (object) {
			if (!level) {
				var level = 0.0;
				object.style['display']='';
			}
			object.style['opacity']=level;
			if (parseFloat(level)<1.0) setTimeout("showId('"+id+"', "+(level+0.1)+")", 30);
			return true;
		} else return false;
	}
	function hideIdNoEffects(id, level) {
		try {
			document.getElementById(id).style['display']='none';
			return true;
		} catch(e) {return false}
	}
	function showIdNoEffects(id, level) {
		try {
			document.getElementById(id).style['display']='';
			return true;
		} catch(e) {return false}
	}
	function hideNoEffects(path, list, level) {
		var pos = list.split(':');
		var object = locateSnapshot(path);
		setHidden(pos[0]);
		for (var i in pos)
			object.snapshotItem(pos[i]).style['display']='none';
		object.snapshotItem(parseInt(pos[0])-1, 10).setAttribute('onclick', "show('"+path+"', '" + list + "')");
		object.snapshotItem(parseInt(pos[0])-1, 10).title='Click aqui para expandir';
	}
	function showNoEffects(path, list, level) {
		var pos = list.split(':');
		var object = locateSnapshot(path);
		delHidden(pos[0]);
		for (var i in pos)
			object.snapshotItem(pos[i]).style['display']='';
		object.snapshotItem(parseInt(pos[0])-1, 10).setAttribute('onclick', "hide('"+path+"', '" + list + "')");
		object.snapshotItem(parseInt(pos[0])-1, 10).title='Click aqui para contraer';
	}
	
	var hide = hideEffects;
	var show = showEffects;
	var hideId = hideIdNoEffects;
	var showId = showIdNoEffects;

unsafeWindow.hide = hide;
unsafeWindow.show = show;
unsafeWindow.hideId = hideId;
unsafeWindow.showId = showId;

// FIN DeclaraciÃ³n de funciones para mostrar/ocultar la tabla de Recursos Volando
		
//Cogemos el nombre del recurso para cada idioma
var metal_text = document.getElementsByTagName('i')[0].childNodes[0].childNodes[0].innerHTML;
var crystal_text = document.getElementsByTagName('i')[1].childNodes[0].childNodes[0].innerHTML;
var deuterium_text = document.getElementsByTagName('i')[2].childNodes[0].childNodes[0].innerHTML;

//Detectamos el idioma del servidor
var notdetected = false;

var ogtitle = window.location.href;
var ogserver = /http\:\/\/([\-\.0-9a-zA-Z]+)\//.exec(ogtitle);
if(ogserver != null){ ogserver = RegExp.$1; } else { ogserver = "0"; }
var langstr = /http\:\/\/[\-\.0-9a-zA-Z]+\.([a-z]+)\//.exec(ogtitle);
if(langstr != null){ langstr = RegExp.$1; } else { langstr = checker((ogserver+"langstr"),"not"); notdetected = true; }

//Modificamos los textos con referencia al idioma del servidor
if (langstr=='es'){
	var Titulo_text = 'Recursos Volando';
	var Robos_text = 'Robos';
	var Escombros_text = 'Escombros';
	var Transportes_text = 'Transportes';
	var Despliegues_text = 'Despliegues';
	var Expedicion_text = 'Expedicion';
	var Planet_text ='Planeta';
}

if (langstr=='tr'){
	var Titulo_text = 'UÃ§uÅŸ GÃ¶revleri';
	var Robos_text = 'Saldirmak';
	var Escombros_text = 'SÃ¶kmek';
	var Transportes_text = 'Nakliye';
	var Despliegues_text = 'Konuslandirmak';
	var Expedicion_text = 'Kesif';
	var Planet_text ='Gezegen';
}

if (langstr=='fr'){
	var Titulo_text = 'Resource en vol';
	var Robos_text = 'Attaquer';
	var Escombros_text = 'Exploiter';
	var Transportes_text = 'Transporter';
	var Despliegues_text = 'Stationner';
	var Expedicion_text = 'ExpÃ©dition';
	var Planet_text ='StockÃ©';
}

if (langstr=='org'){
	var Titulo_text = 'Flying resources';
	var Robos_text = 'Attack';
	var Escombros_text = 'Harvest';
	var Transportes_text = 'Transport';
	var Despliegues_text = 'Deploy';
	var Expedicion_text = 'Expedition';
	var Planet_text ='Planet';
}


////////////////////
//Codigo del script
////////////////////

allElements = document.getElementsByTagName('a');
for (var i = 0; i < allElements.length; i++){
	thisElement = allElements[i];

// Ataques
	if (thisElement.innerHTML.substring(0,6) == 'Atacar' || thisElement.innerHTML.substring(0,6) == 'Ataque' || thisElement.innerHTML.substring(0,9) == 'Saldirmak'  || thisElement.innerHTML.substring(0,8) == 'Attaquer'  || thisElement.innerHTML.substring(0,6) == 'Attack'){
		
		overlib = thisElement.attributes.item(2);
		datos=overlib.textContent.substring(overlib.textContent.indexOf(metal_text+':')+7,overlib.textContent.indexOf(crystal_text+':')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		metal=metal+parseInt(dato);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf(crystal_text+':')+9,overlib.textContent.indexOf(deuterium_text+':')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		cristal=cristal+parseInt(dato);

		datos=overlib.textContent.substring(overlib.textContent.indexOf(deuterium_text+':')+10,overlib.textContent.indexOf('")')).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		deuterio=deuterio+parseInt(dato);
		
	}

// Escombros
	if (thisElement.innerHTML.substring(0,10) == 'Recolectar' || thisElement.innerHTML.substring(0,6) == 'SÃ¶kmek'  || thisElement.innerHTML.substring(0,9) == 'Exploiter'  || thisElement.innerHTML.substring(0,7) == 'Harvest'){
		
		overlib = thisElement.attributes.item(2);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf(metal_text+':')+7,overlib.textContent.indexOf(crystal_text+':')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		metalE=metalE+parseInt(dato);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf(crystal_text+':')+9,overlib.textContent.indexOf(deuterium_text+':')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		cristalE=cristalE+parseInt(dato);

		datos=overlib.textContent.substring(overlib.textContent.indexOf(deuterium_text+':')+10,overlib.textContent.indexOf('")')).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		deuterioE=deuterioE+parseInt(dato);
		
	}
	
//Transportes
	if (thisElement.innerHTML.substring(0,11) == 'Transportar' || thisElement.innerHTML.substring(0,7) == 'Nakliye'  || thisElement.innerHTML.substring(0,11) == 'Transporter'  || thisElement.innerHTML.substring(0,9) == 'Transport'){
		
		overlib = thisElement.attributes.item(2);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf(metal_text+':')+7,overlib.textContent.indexOf(crystal_text+':')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		metalT=metalT+parseInt(dato);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf(crystal_text+':')+9,overlib.textContent.indexOf(deuterium_text+':')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		cristalT=cristalT+parseInt(dato);

		datos=overlib.textContent.substring(overlib.textContent.indexOf(deuterium_text+':')+10,overlib.textContent.indexOf('")')).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		deuterioT=deuterioT+parseInt(dato);
		
		
	}
//Despliegues
	if (thisElement.innerHTML.substring(0,9) == 'Desplegar' || thisElement.innerHTML.substring(0,14) == 'KonuÅŸlandÄ±rmak'  || thisElement.innerHTML.substring(0,10) == 'Stationner'  || thisElement.innerHTML.substring(0,10) == 'Deployment'){
		
		overlib = thisElement.attributes.item(2);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf(metal_text+':')+7,overlib.textContent.indexOf(crystal_text+':')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		metalD=metalD+parseInt(dato);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf(crystal_text+':')+9,overlib.textContent.indexOf(deuterium_text+':')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		cristalD=cristalD+parseInt(dato);

		datos=overlib.textContent.substring(overlib.textContent.indexOf(deuterium_text+':')+10,overlib.textContent.indexOf('")')).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		deuterioD=deuterioD+parseInt(dato);
		
	}	
	
//Expediciones
	if (thisElement.innerHTML.substring(0,10) == 'ExpediciÃ³n' || thisElement.innerHTML.substring(0,5) == 'Kesif'  || thisElement.innerHTML.substring(0,10) == 'ExpÃ©dition'  || thisElement.innerHTML.substring(0,10) == 'Expedition'){
		
		overlib = thisElement.attributes.item(2);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf(metal_text+':')+7,overlib.textContent.indexOf(crystal_text+':')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		metalX=metalX+parseInt(dato);
		
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf(crystal_text+':')+9,overlib.textContent.indexOf(deuterium_text+':')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		cristalX=cristalX+parseInt(dato);

		datos=overlib.textContent.substring(overlib.textContent.indexOf(deuterium_text+':')+10,overlib.textContent.indexOf('")')).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		deuterioX=deuterioX+parseInt(dato);
		
	}	
}

//Cogemos los recursos actuales del planeta.
var metalP = parseInt(document.getElementsByTagName('td')[14].childNodes[0].textContent.replace('.','').replace('.',''));
var cristalP = parseInt(document.getElementsByTagName('td')[15].childNodes[0].textContent.replace('.','').replace('.',''));
var deuterioP = parseInt(document.getElementsByTagName('td')[16].childNodes[0].textContent.replace('.','').replace('.',''));
// hasta aki la obtencion de datos

//Color de los recursos de cada misiÃ³n
//Planeta
	var colorP='#0099FF';
	var activaP=true;	
	var totalR=true;
	var totalRC=true;
	var colorAC='#FF0000';
//Ataques
if (metal>0 || cristal>0 || deuterio>0){
	var color='#CC0000';
	var activa=true;
	var totalR=true;
}
//Escombros
if (metalE>0 || cristalE>0 || deuterioE>0){
	var colorE='#cd853f';
	var activaE=true;
	var totalR=true;
}
//Transportes
if (metalT>0 || cristalT>0 || deuterioT>0){
	var colorT='#009933';
	var activaT=true;	
	var totalR=true;
}
//Despliegues
if (metalD>0 || cristalD>0 || deuterioD>0){
	var colorD='#adff2f';
	var activaD=true;	
	var totalR=true;
}
//Expediciones
if (metalX>0 || cristalX>0 || deuterioX>0){
	var colorX='#00FFCC';
	var activaX=true;	
	var totalR=true;
}

//Sumamos los recursos que hay volando para calcular los recursos totales.
metalA = metal+metalE+metalT+metalD+metalX;
cristalA = cristal+cristalE+cristalT+cristalD+cristalX;
deuterioA = deuterio+deuterioE+deuterioT+deuterioD+deuterioX;

//Sumamos los recursos que hay volando para calcular los recursos totales incluidos los de la colonia activa.
metalAC = metal+metalE+metalT+metalD+metalX+metalP;
cristalAC = cristal+cristalE+cristalT+cristalD+cristalX+cristalP;
deuterioAC = deuterio+deuterioE+deuterioT+deuterioD+deuterioX+deuterioP;

/*
////////////////////////////////////////////////////////////////////////
// Agrega un punto como separador de miles			      //
////////////////////////////////////////////////////////////////////////
// based in a function from 					      //
// http://www.forosdelweb.com/showthread.php?postid=265553#post265553 //
// put dot as separator :)					      //
////////////////////////////////////////////////////////////////////////
*/
function formatNmb(num){
    var sRes = "";
    var sign = "";
    if (parseInt(num) < 0) {	
	sign = "-";
	num = parseInt(num) * -1	
    }
    //Convert to string and remove espaces
    nNmb = '' + parseInt(num) + '';

    for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
     sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;

    return sign + sRes;
} 
/**/

//Comprobamos si hay algÃºn recurso volando para crear la tabla
if (metal>0 || cristal>0 || deuterio>0 || metalE>0 || cristalE>0 || deuterioE>0 || metalT>0 || cristalT>0 || deuterioT>0 || metalD>0 || cristalD>0 || deuterioD>0 || metalX>0 || cristalX>0 || deuterioX>0){

//Ahora creamos la tabla
     allTr = document.getElementsByTagName('tbody');
     thisTr = allTr[5];
     if (thisTr.innerHTML.substring(9,35) == '<td class="c" colspan="4">'){
         thisTr=allTr[5];
     }
     header=thisTr.childNodes.item(4);
     if (thisTr.childNodes.item(2).innerHTML.substring(91,97) == 'Tienes'){
         header=thisTr.childNodes.item(6);
     }

//Tabla Recursos Volando
	var recTableTd = document.createElement('td');
			recTableTd.setAttribute("colspan","4");

var hidden = getBooleanConf('hiddenResources', 'overview');

	var recTable = document.createElement('table');
	// INICIO atributos Mostrar/ocultar
			recTable.setAttribute("id","resources0");
			recTable.setAttribute("align","center");
			recTable.setAttribute("width","100%");
			if (!hidden) recTable.style['display']='';
			if (hidden) recTable.style['display']='none';
	// FIN atributos Mostrar/ocultar
			
	var recTitleRow = document.createElement('tr');

	var recTitleCell = document.createElement('th');
	var recTitleCell2 = document.createElement('th');
	var recTitleCell3 = document.createElement('th');
	var recTitleCell4 = document.createElement('th');

//Fila encabezado recursos
	recTitleCell.innerHTML='';
	recTitleCell2.innerHTML=metal_text;
	recTitleCell3.innerHTML=crystal_text;
	recTitleCell4.innerHTML=deuterium_text;
	
	var recRow = document.createElement('tr');
	var recCell = document.createElement('td');
			recCell.setAttribute("class","m");
	var recCell2 = document.createElement('th');
	var recCell3 = document.createElement('th');
	var recCell4 = document.createElement('th');
	
	recCell.innerHTML='';
	recCell2.innerHTML='';
	recCell3.innerHTML='';
	recCell4.innerHTML='';
	
	//Pongo el texto dentro de las celdas

	if (activa){
		recCell.innerHTML+=Robos_text+'<br>';
		recCell2.innerHTML+='<font color='+color+'>'+formatNmb(metal)+'</font><br>';
		recCell3.innerHTML+='<font color='+color+'>'+formatNmb(cristal)+'</font><br>';
		recCell4.innerHTML+='<font color='+color+'>'+formatNmb(deuterio)+'</font><br>';
	}
	if (activaE){
		recCell.innerHTML+=Escombros_text+'<br>';
		recCell2.innerHTML+='<font color='+colorE+'>'+formatNmb(metalE)+'</font><br>';
		recCell3.innerHTML+='<font color='+colorE+'>'+formatNmb(cristalE)+'</font><br>';
		recCell4.innerHTML+='<font color='+colorE+'>'+formatNmb(deuterioE)+'</font><br>';
	}
	if (activaT){
		recCell.innerHTML+=Transportes_text+'<br>';
		recCell2.innerHTML+='<font color='+colorT+'>'+formatNmb(metalT)+'</font><br>';
		recCell3.innerHTML+='<font color='+colorT+'>'+formatNmb(cristalT)+'</font><br>';
		recCell4.innerHTML+='<font color='+colorT+'>'+formatNmb(deuterioT)+'</font><br>';
	}
	if (activaD){
		recCell.innerHTML+=Despliegues_text+'<br>';
		recCell2.innerHTML+='<font color='+colorD+'>'+formatNmb(metalD)+'</font><br>';
		recCell3.innerHTML+='<font color='+colorD+'>'+formatNmb(cristalD)+'</font><br>';
		recCell4.innerHTML+='<font color='+colorD+'>'+formatNmb(deuterioD)+'</font><br>';
	}
	if (activaX){
		recCell.innerHTML+=Expedicion_text+'<br>';
		recCell2.innerHTML+='<font color='+colorX+'>'+formatNmb(metalX)+'</font><br>';
		recCell3.innerHTML+='<font color='+colorX+'>'+formatNmb(cristalX)+'</font><br>';
		recCell4.innerHTML+='<font color='+colorX+'>'+formatNmb(deuterioX)+'</font><br>';
	}
//Fila total recursos volando
	var recTotRow = document.createElement('tr');
	var recTotCell = document.createElement('td');
			recTotCell.setAttribute("class","g");
		//setAttribute('bgcolor','red')
		//recTotCell.setAttribute("BGCOLOR", )
	var recTotCell2 = document.createElement('th');
	var recTotCell3 = document.createElement('th');
	var recTotCell4 = document.createElement('th');
	
	recTotCell.innerHTML='';
	recTotCell2.innerHTML='';
	recTotCell3.innerHTML='';
	recTotCell4.innerHTML='';

	//Pongo el texto dentro de las celdas
	if (totalR){
		recTotCell.innerHTML+='Total:<br>';
		recTotCell2.innerHTML+='<font color='+colorA+'>'+formatNmb(metalA)+'</font><br>';
		recTotCell3.innerHTML+='<font color='+colorA+'>'+formatNmb(cristalA)+'</font><br>';
		recTotCell4.innerHTML+='<font color='+colorA+'>'+formatNmb(deuterioA)+'</font><br>';
	}

//Fila total recursos volando incluidos los de la Colonia

	var recTotCRow = document.createElement('tr');
	var recTotCCell = document.createElement('td');
			recTotCCell.setAttribute("class","g");
	var recTotCCell2 = document.createElement('th');
	var recTotCCell3 = document.createElement('th');
	var recTotCCell4 = document.createElement('th');
	
	recTotCCell.innerHTML='';
	recTotCCell2.innerHTML='';
	recTotCCell3.innerHTML='';
	recTotCCell4.innerHTML='';

	//Pongo el texto dentro de las celdas
	if (activaP){
		recTotCCell.innerHTML+=Planet_text+'<br>';
		recTotCCell2.innerHTML+='<font color='+colorP+'>'+formatNmb(metalP)+'</font><br>';
		recTotCCell3.innerHTML+='<font color='+colorP+'>'+formatNmb(cristalP)+'</font><br>';
		recTotCCell4.innerHTML+='<font color='+colorP+'>'+formatNmb(deuterioP)+'</font><br>';
	}
	if (totalRC){
		recTotCCell.innerHTML+='Total:<br>';
		recTotCCell2.innerHTML+='<font color='+colorAC+'>'+formatNmb(metalAC)+'</font><br>';
		recTotCCell3.innerHTML+='<font color='+colorAC+'>'+formatNmb(cristalAC)+'</font><br>';
		recTotCCell4.innerHTML+='<font color='+colorAC+'>'+formatNmb(deuterioAC)+'</font><br>';
	}

	
	
	//Pongo las celdas dentro de las filas
	recTableTd.appendChild(recTable);
	
	//Pongo las celdas de encabezado de recursos
	recTable.appendChild(recTitleCell);
	recTable.appendChild(recTitleCell2);
	recTable.appendChild(recTitleCell3);
	recTable.appendChild(recTitleCell4);
	
	//Pongo las celdas con los recursos de las misiones
	recTable.appendChild(recRow);
	recTable.appendChild(recCell);
	recTable.appendChild(recCell2);
	recTable.appendChild(recCell3);
	recTable.appendChild(recCell4);
	
	//Pongo las celdas del total de cada recurso
	recTable.appendChild(recTotRow);
	recTable.appendChild(recTotCell);
	recTable.appendChild(recTotCell2);
	recTable.appendChild(recTotCell3);
	recTable.appendChild(recTotCell4);
	
	//Pongo las celdas del total de cada recurso incluidos los de la colonia activa
	recTable.appendChild(recTotCRow);
	recTable.appendChild(recTotCCell);
	recTable.appendChild(recTotCCell2);
	recTable.appendChild(recTotCCell3);
	recTable.appendChild(recTotCCell4);

//Pongo la tabla en la pagina
	//thisTr.appendChild(recTableTd);	
	thisTr.insertBefore(recTableTd,header.previousSibling);


//Fila de titulo
	var myRowT = document.createElement('td');
		myRowT.setAttribute("class","c");
		myRowT.setAttribute("colspan","4");

	//Pongo el texto dentro de las celdas
	myRowT.innerHTML = '<img onclick="delResourcesHidden(\'overview\')" id="resources_plus" title="Mostrar '+Titulo_text+'" style="cursor: pointer; display: none;" src="data:image/gif;base64,R0lGODlhCQAJAPAAAAAAAP///yH5BAAAAAAALAAAAAAJAAkAAAghAAEIHEgwgMGDAQQeBLCQoUGHCRkSlAixYsWGCBtOHBgQADs="><img onclick="setResourcesHidden(\'overview\')" id="resources_minus" title="Ocultar '+Titulo_text+'" style="cursor: pointer;" src="data:image/gif;base64,R0lGODlhCQAJAPAAAAAAAP///yH5BAAAAAAALAAAAAAJAAkAAAggAAEIHEgwgMGDAQQiPKhwYUIADwc+dDjRYcOFBDMCCAgAOw=="> '+Titulo_text;
	//Pongo la fila en la pagina
	thisTr.insertBefore(myRowT,recTableTd);

}
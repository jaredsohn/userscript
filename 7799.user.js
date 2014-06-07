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
// @name			oGame pro
// @author			locutus of borg (Basado en oGame++ por Unbrained)
// @description		El oGame como me gusta
// @include			http://*/game/*
// @include			http://drago-sim.com/*
// ==/UserScript==

// Compatible con foxgame hasta la version 0.4.2 por lo menos
// Funciona con servidores galaxieTool a partir de la version 3.51

/*********************************************************/
/*********+-------------------------------+***************/
/*********|      Features list            |***************/
/*********+-------------------------------+***************/
/*********************************************************/
/** QUE HACE ESTE SCRIPT?
 ** Colores configurables para las cabeceras de los mensajes (ahora también se colorea
 *		el contenido de los mensajes)
 ** Auto marca determinados mensajes, también configurable
 ** Auto marca espionajes de planetas con pocos recursos
 ** Opción de crear links a partir de coordenadas en los mensajes y en la Visión General
 * 	 (idea sacada del script http://userscripts.org/scripts/show/5241)
 ** Se añade un enlace a Drago-Sim y otro a o-calc en el menú lateral
 ** Añade información sobre la carga de las naves al escoger la flota
 *		(adaptación del script http://userscripts.org/scripts/show/6189)  
 ** Se añade un botón con una D al lado de los informes de espionaje hechos que
 * 		envia los datos del informe a Drago-Sim para hacer analisis de ataques
 ** Se incorpora un compactador de batallas
 * 	(adaptacion del script http://userscripts.org/scripts/show/3482)
 ** Se incorpora un script de información extendida para los recursos
 * 	(modificación del script http://userscripts.org/scripts/show/6483/)
 ** Menú lateral plegable
 ** Se añade funcionalidad para GalaxieTool, se permiten múltiples cuentas
 * 		independientes para cada universo.
 ** Resaltado de campos de escombros. Esta idea la cogí del Foxgame y la he mejorado un poco:
 *		Escoges un color para resaltar, un mínimo de escombros resaltables y un máximo. El mínimo
 *		indica a partir de qué cantidad quieres que se resalte. Dependiendo de la cantidad de
 *		escombros que haya se colorea desde el blanco hasta el color indicado. El color indicado se
 *		alcanza cuando la cantidad de escombros supera el máximo especificado  
 ** Función de colorear etiquetas de alianzas. Se puede asociar un grupo de alianzas
 * 		con un color y una etiqueta (opcional). La alianza se mostrará del color especificado
 * 		en la visión de Galaxia y en las Estadísticas con la etiqueta, si existe, a
 * 		continuación. Es muy útil para reconocer alianzas amigas/enemigas o pactos con otras alianzas
 * 		NOTA IMPORTANTE: DESACTIVAR ESTA FUNCION SI SE ACCEDE A CUENTAS DE GALAXIETOOL O SIMILARES
 * 		POR UN MEDIO QUE NO SEA ESTE SCRIPT, YA QUE LOS INFORMES APARECERIAN DEFECTUOSOS
 * 		(idea sacada del script http://userscripts.org/scripts/show/4030)
 ** Se añade una tabla de alianza en el menú lateral. Para recoger los datos de la alianza
 *		es necesario abrir la pagina de Alianzas.
 *		(escrito a partir del script http://userscripts.org/scripts/show/3947)
 ** Se actualiza automáticamente
 */

/*********************************************************/
/*********+-------------------------------+***************/
/*********|      TODO List                |***************/
/*********+-------------------------------+***************/
/*********************************************************/
/* 
 * Reestructurar menu lateral (menudo caos!)
 * Modificar las tablas de configuracion de colores y automarcado
 * Error del linker en vision general (la hora del foxgame aparece en la siguiente linea)
 * 		Curiosamente se resuelve al activar la hora en formato completo
 * Colorear fondo de los mensajes
 * Calculo de naves en los espionajes
 * Separador de miles en retornos de saqueos
 * Mostrar total del saqueo, y el equivalente en metal por regla 3x2x1 (Unidades Comerciales)
 * Comentar más el código... algún día :-)
 * Actualizar el compactador y buscar una forma sencilla de acualizar mi version
 * Modificar el compactador para que diga cosas distintas (se destruyen todos, ninguno, pijadillas...)
 * Opción de pasar las cantidades en notación científica a notación normal
 * Añadir posibilidad de medir la rentabilidad del ataque en Unidades comerciales 
 * Añadir ogame tools (calculo de misiles con raksim...) al menu lateral (o incluso enlace
 * 		en informes tipo DS) y eliminar el enlace o-calc (si se consiguen sustituir todas sus funciones)
 * Mejorar GalaxieTool (comprobar que esta activado para nuestro universo o algo asi y mejorar la
 * 		vision de las lucecitas, mejorar el control de distintas cuentas)
 * Crear una paleta de colores para escoger colores (en una funcion) (de momento en la pagina de
 * 		configuración hay un enlace a una página que permite elegir colores y te dice el codigo html)
 * Ver la posibilidad de guardar y cargar la configuracion en un archivo de texto
 * 		Una posibilidad es mostar las variables para copiarlas al guardar y para cargar que salga un input 
 * Añadir etiquetas para nicks
 * Color del linkeador dependiente de la distancia con tu principal!! (en proceso)
 * Poner pestañas en la pagina de configuracion. Mediante una tabla emulas las pestañas y el contenido va en divs
 * 		Aun no le encontre la forma de aplicarlo
 */


/********************************************************/
/*********+-------------------------------+**************/
/*********|  Default configuration values |**************/
/*********+-------------------------------+**************/
/********************************************************/

var defScriptConf = [
		'version', '0.0.01',
		'colorMens', false,
			'colorTrans', '#aaaaff', 
			'colorTransR', '#33ff99', 
			'colorColo', '#99cc99',
			'colorAlianza', '#00ff00',
			'colorPriv', '#00aaff',
			'colorEsp', '#ff6666',
			'colorMisiles', '#ff3366',
			'colorRec', '#a96030',
			'colorConf', '#ff55dd',
		'autoMark', true,
			'AMTrans', true,
			'AMTransR', true,
			'AMColo', true,
			'AMAlianza', false,
			'AMPriv', false,
			'AMEsp', false,
			'AMEspP', false,
			'AMEspPRecMin', '175000',
			'AMAttack', false,
			'AMMisiles', false,
			'AMRec', true,
			'AMConf', false,
		'dragoSim', true,
		'dragoSimM', false,
		'ocalc', false,
		'compactar', true,
		'galaxyTool', false,
		'galaxyToolM', true,
		'GTGV', true,
		'allyTags', true,
		'allyTable', true,
			'allyName', '',
			'foroAlly', '',
			'ATColorN', 'lime',
			'ATMembers', true,
			'ATTopP', true,
			'ATTopA', true,
			'ATForo', true,
			'ATBaned', true,
			'ATCC', true,
			'ATCCPriv', false,
		'coordLinker', false,
			'coordLinkerVarG', false,
			'coordLinkerPlanet', '',
			'coordLinkerCM', 'lime',
			'coordLinkerCVG', '#ebff8a',
			'coordLinkerCG', 'lime',
			'coordLinkerVarSC', false,
		'minTransG', 4,
		'minTransP', 0,
		'flottenInfo', true,
		'debris', true,
			'debrisMin', '20000',
			'debrisMax', '100000',
			'debrisColor', '#6b3715',
		'modifyDate', true,
		'specialEffects', true,
		'LMSearch', false,
		'autoUpdate', false,
		'preDest', true,
			'PDGColor', 'orange',
		'proInputs', true,
		'expandTables', false,
		'tinyIMG', false,
		'tinyIMG1', true,
		'tinyIMG2', false,
		'tinyIMG3', true,
		'debugMode', false,
		'autoRefreshVisionGeneral', false,
			'autoRefreshVisionGeneral_Time1', '60',
			'autoRefreshVisionGeneral_Time2', '180',
		'dropUselessTech', false,
		'dropDescriptions', false,
		'enhanceStatics',false,
		'markResources', true,
	].join(':');
var defGTValues = '';
var defAllyTags = 'Prueba:y:#00aaff:y:Ally1|Ally2|Ally3';


/*********************************************************/
/*********+-------------------------------+***************/
/*********|     Translation section       |***************/
/*********+-------------------------------+***************/
/*********************************************************/
const aacento = String.fromCharCode(225);
const eacento = String.fromCharCode(233);
const iacento = String.fromCharCode(237);
const oacento = String.fromCharCode(243);
const uacento = String.fromCharCode(250);
const c_mainTable = 'Ajustes Generales';
const c_colorMens = 'Colorear los mensajes (cabeceras y contenido)';
const c_colorTrans = 'Mensajes de llegada a un planeta';
const c_colorTransR = 'Mensajes de retorno de un planeta';
const c_colorAlianza = 'Mensajes de la Alianza';
const c_colorPriv = 'Mensajes privados';
const c_colorRec = 'Mensajes de reciclajes';
const c_colorEsp = 'Mensajes de espionajes sufridos';
const c_colorConf = 'Invitación de ataque de confederación';
const c_colorColo = 'Mensajes de colonización';
const c_colorMisiles = 'Mensajes de ataques con misiles';
const c_autoMark = 'Auto marcar mensajes de transporte, recolección, etc.';
const c_allyTable = 'Activar tabla de alianza en el menú lateral (entrar en Alianzas para coger los datos)';
const c_tablaAllyTable = 'Ajustes de la tabla de alianza';
const c_coordLinker = 'Crear links a partir de las coordenadas en los mensajes y visión general';
const c_tablaCoordLinker = 'Configuración del linkeador de coordenadas';
const c_coordLinkerVarG = 'Color en visión general dependiente de la distancia a tu planeta principal (experimental)';
const c_coordLinkerCM = 'Color de los links en los Mensajes';
const c_coordLinkerCVG = 'Color de los links en la Visión General';
const c_coordLinkerCG = 'Color del número de planeta marcado en Galaxia';
const c_coordLinkerSC = 'Solo colorear no crear enlaces';
const c_dragoSim = 'Mostrar enlaces a Drago-Sim en los mensajes de espionaje';
const c_dragoSimM = 'Mostrar enlace a Drago-Sim en el menú lateral';
const c_ocalc = 'Mostrar enlace a O-Calc en el menú lateral';
const c_modifyDate = 'Mostrar fecha en formato completo y reducir a una sola linea';
const c_flottenInfo = 'Mostrar información de carga al escoger flota';
const c_debris = 'Activar resaltado avanzado de escombros';
const c_tablaDebris = 'Configuración del resaltado de escombros <a color="lightblue" title="De blanco (min) al color seleccionado (m'+aacento+'x)">(info)</a>';
const c_debrisColor = 'Color de resaltado';
const c_debrisMin = 'Mínima cantidad de escombros resaltable';
const c_debrisMax = 'Cantidad en la que el color es m'+aacento+'ximo';
const c_compactar = 'Usar compactador en los reportes de ataque';
const c_allyTags = 'Colorear etiquetas de alianzas en la visión de galaxia y en estadísticas';
const c_tablaAllyTags = 'Etiquetar alianzas en visión de galaxia y estadísticas';
const c_galaxyTool = "Usar <a href='http://www.galaxietool.de/spanish/index.php' title='¿Qué es esto?' target='new'>Galaxy Tool</a>";
const c_tablaGTool = 'Configuración de Galaxy Tool ('+location.hostname+')';
const c_AMTrans = 'Mensajes de llegada a un planeta';
const c_AMTransR = 'Mensajes de retorno de un planeta';
const c_AMColo = 'Mensajes de colonización';
const c_AMAlianza = 'Mensajes de la Alianza';
const c_AMPriv = 'Mensajes privados';
const c_AMEsp = 'Mensajes de espionajes sufridos';
const c_AMEspP = 'Mensajes de espionajes hechos';
const c_AMEspPRecMin = 'Espionajes con m'+aacento+'s recursos que esta cantidad';
const c_AMAttack = 'Informes de ataques';
const c_AMMisiles = 'Avisos de ataques con misiles';
const c_AMRec = 'Mensajes de reciclajes';
const c_AMConf = 'Mensajes de invitación a un ataque de confederación';
const c_ATMembers = 'Mostrar enlace a los miembros de alianza ordenados por puntuación';
const c_ATTopP = 'Mostrar enlace al top 100 de jugadores';
const c_ATTopA = 'Mostrar enlace al top 100 de alianzas';
const c_ATForo = 'Mostrar enlace al foro';
const c_ATCC = 'Mostrar enviar CC (si se tiene permiso)';
const c_ATBaned = 'Mostrar enlace a la p'+aacento+'gina de jugadores baneados';
const c_ATColorN = 'Color del nombre de alianza en la tabla';
const c_specialEffects = 'Activar efectos especiales';
const c_autoUpdate = 'Actualizar autom'+aacento+'ticamente';
const c_tinyIMG = 'Reducir tamaño imagenes';
const c_tablatinyIMG = 'Reduce el tamaño de las imagenes en las secciones seleccionadas';
const c_tinyIMG1 = 'En Edificios, Investigacion, Hangar y Defensa';
const c_tinyIMG2 = 'En vision general';
const c_tinyIMG3 = 'En vista de galaxia';
const c_autoRefreshVisionGeneral = 'Refrescar vision general automaticamente';
const tiempoMinimoRefresco = 10
const c_tablaautoRefreshVisionGeneral = 'Refresco automatico de vision general (Aleatorio entre Tiempo1 y Tiempo2, minimo '+tiempoMinimoRefresco+' seg.)';
const c_autoRefreshVisionGeneral_Time1 = 'Tiempo1 (segundos)';
const c_autoRefreshVisionGeneral_Time2 = 'Tiempo2 (segundos)';
const c_dropUselessTech = 'Eliminar tecnologias que han alcanzado su limite practico';
const c_dropDescriptions = 'Eliminar descripciones de Edificios, Investigacion, Hangar y Defensa';
const c_enhanceStatics = 'Estadisticas: Mostrar <font color=#00FF00>&uarr;</font> y <font color=#FF0000>&darr;</font> y el numero de puestos subidos/bajados'
const c_markResources = 'Marcar recursos faltantes en <font color=#FF0000>rojo</font> y disponibles en <font color=#00FF00>verde</font>';
const comillas = String.fromCharCode(34);
const minShip = 202;
const maxShip = 215;
const tinyImg1Size = 40; // Edificios
const tinyImg2Size = 150; // Planeta seleccionado vision general
const tinyImg3Size = 22; // Planetas en galaxia
	
/*********************************************************/
/*********+-------------------------------+***************/
/*********|        Misc functions         |***************/
/*********+-------------------------------+***************/
/*********************************************************/

function fill(string) {
	while (string.length<6) string += '0';
	return parseInt(string);
}

function validCoords(coords) {
	try {
		var sepCoords=coords.match(/^[1-9]:([1-4]\d{2}|[1-9]\d|[1-9]):(1[0-5]|[1-9])$/)[0];
		return true;
	}
	catch (e) {}
	return false;
}

function setHidden(n) {
	var hiddenStr = GM_getValue('hiddenTabs_'+location.hostname, '');
	var hiddenVec = hiddenStr.split(':');
	for (var h in hiddenVec) {
		if (hiddenVec[h]==n) {
			return false;
		}
	}
	GM_setValue('hiddenTabs_'+location.hostname, (hiddenStr==''?String(n):hiddenStr+':'+n));
	return true;
}

function delHidden(n) {
	var hiddenVec = GM_getValue('hiddenTabs_'+location.hostname, '').split(':');
	for (var h in hiddenVec) {
		if (hiddenVec[h]==n) {
			hiddenVec.splice(h, 1);
			GM_setValue('hiddenTabs_'+location.hostname, hiddenVec.join(':'));
			return true;
		}
	}
	return false;
}

function isHidden(n) {
	var hiddenVec = GM_getValue('hiddenTabs_'+location.hostname, '').split(':');
	for (var h in hiddenVec) {
		if (hiddenVec[h]==n) {
			return true;
		}
	}
	return false;
}

function checkUpdates(warn) {
	GM_xmlhttpRequest({
		method:"POST",
		url:"http://userscripts.org/scripts/show/",
		headers:{
			"User-Agent" : navigator.userAgent,
			"Accept" : "text/xml",
			"Content-type" : 'application/x-www-form-urlencoded'
		},
		onload:function(details) {
			try {
				var newVer = details.responseText.match(/Version (\d+)\.(\d+)\.(\d+)/);
				var Current = getDefScriptConf('version').match(/(\d+)\.(\d+)\.(\d+)/);
				if (fill(newVer[1])>fill(Current[1]) || (fill(newVer[1])==fill(Current[1])&&fill(newVer[2])>fill(Current[2])) || (fill(newVer[1])==fill(Current[1]) && fill(newVer[2])==fill(Current[2]) && fill(newVer[3])>fill(Current[3]))) {
					if (confirm('Hay una versión nueva!! Quieres instalarla?')) {
						win = window.open('http://userscripts.org/scripts/source/5550.user.js', 'Actualizar script');
						if (!win) alert('Firefox est'+aacento+' bloqueando las ventanas emergentes, habilita las ventanas emergentes para TU SERVIDOR concreto (el titulo de esta ventana de aviso) o bien dale a mostrar la pagina en el icono de bloqueo')
					}
				}
				else if (warn) alert('Tu versión es la m'+aacento+'s reciente');
			} catch (e) {}
		},
		data: ''
	});
}

function puntuar(numero) {
	var strNum=String(numero);
	var strNum2='';
	var i=0;
	for(i=strNum.length-4;i>=0;i-=3) {
		strNum2=(strNum[i]=='-'?'':'.')+strNum.substring(i+1, i+4)+strNum2;
	}
	strNum2=strNum.substr(0, i+4)+strNum2;
	return strNum2;
}

unsafeWindow.checkUpdates = checkUpdates;
unsafeWindow.fill = fill;
//unsafeWindow.validCoords=validCoords;
//unsafeWindow.puntuar=puntuar;

function AgregarBotonConfig(){
	var pagina = document.getElementsByTagName ('table');
	for (var i = 0; i < pagina.length; i++) {
		tmp = pagina[i].innerHTML;
		t = tmp.indexOf("Guardar cambios",0);
		if (t > 0){
			t2 = tmp.indexOf("</tr>",t);
			if (t2 > 0){
				pagina[i].innerHTML = tmp.substr(0,t2+5)+"<th colspan=2><a style='cursor:pointer' onclick='javascript:window.parent.frames[1].document.body.innerHTML=makeConfig()' >Opciones oGame Pro</a></th>"+tmp.substr(t2+5);
			}
		}
	}
}

/******************************************************************************/
/*********+----------------------------------------------------+***************/
/*********| Funciones relacionadas en el coloreado de recursos |***************/
/*********| remover descripciones y remover tecnologias        |***************/
/*********+----------------------------------------------------+***************/
/******************************************************************************/

// Obtener la cantidad actual de metal, cristal, deuterio y energia
function GetMCDE(){
	var tablenode = document.getElementsByTagName('table');
	var i=0;
	var Tab_Resources = new Array();
	var Cpt_Tab_Res = 0;
	var ResourcesNoFound = true;
	while(i<tablenode.length && ResourcesNoFound){

		//=================================
		// Find <TABLE> in ressources title
		//=================================
		if (tablenode[i].getAttribute("border")=="0" && tablenode[i].getAttribute("cellpadding")=="0" && tablenode[i].getAttribute("cellspacing")=="0" && tablenode[i].getAttribute("width")=="100%"){

			var trnode = tablenode[i].getElementsByTagName('tr');
			var tdnode = trnode[2].getElementsByTagName('td');
			var sentence2;
			var t=0;

			//======================
			// Scan column <td></td>
			//======================
			while(t<tdnode.length){
				sentence2 = tdnode[t].innerHTML;
				sentence2 = sentence2.replace('<font color="#ff0000">','');
				sentence2 = sentence2.replace("<font color='#ff0000'>","");
				sentence2 = sentence2.replace('</font>','');

				if(tdnode[t].getAttribute("align")=="center" && tdnode[t].getAttribute("width")=="85" && sentence2.indexOf("/",1)==-1){
					Tab_Resources[Cpt_Tab_Res] = RemovePoint(sentence2);
					Cpt_Tab_Res++;
				}
				if(tdnode[t].getAttribute("align")=="center" && tdnode[t].getAttribute("width")=="85" && sentence2.indexOf("/",1)>0){
					Tab_Resources[Cpt_Tab_Res] = RemovePoint(sentence2.substr(sentence2.indexOf("/",1)+1,sentence2.length));
					Cpt_Tab_Res++;
				}

				t++;
			}

			if (Tab_Resources.length==4) ResourcesNoFound=false;

		}

		i++;
	}
	return Tab_Resources;
}

// Agrega el . de separador de miles
function AddPoint(Sentence){
	var SentenceModified = '';
	var Rest = '';
	while (Sentence >= 1000 || Sentence <= -1000) {
		Rest = Sentence - Math.floor(Sentence/1000)*1000;
		if (Rest<10) Rest='00'+Rest;
		else if (Rest<100) Rest='0'+Rest;
		Sentence = Math.floor(Sentence/1000);
		SentenceModified = '.'+Rest+SentenceModified;
	}
	return (Sentence+SentenceModified);
}

// Saca el . de numeros
function RemovePoint(Sentence){
	var SentenceModified = Sentence;
	SentenceModified=SentenceModified.replace('.','');
	while (Sentence != SentenceModified){
		Sentence = SentenceModified;
		SentenceModified=SentenceModified.replace('.','');
	}
	return parseInt(Sentence);
}
unsafeWindow.RemovePoint=RemovePoint;

// Ver si hay recursos suficientes
function CheckRessourcesCost(Ressource,NodeHTML,ActualRessource){
	var sentence1 = Ressource+": <b>";
	var sentence2 = "</b>";
	var pos1 = NodeHTML.indexOf(sentence1,0);
	if (pos1>=0){
		var pos2 = NodeHTML.indexOf(sentence2,pos1+sentence1.length);
		var SentenceRessource  = RemovePoint(NodeHTML.substring(pos1+sentence1.length,pos2));
		//alert(SentenceRessource);
		// Colorear recursos
		var Difference = ActualRessource - SentenceRessource;
		if(Difference<0){
			var sentence3 = Ressource+": <a style=\"cursor: pointer;\" title=\"Faltan "+AddPoint(-Difference)+"\"><span class=\"noresources\">"+AddPoint(SentenceRessource)+"</span></a>"
			var sentence4 = NodeHTML.substring(pos1,pos2+sentence2.length);
			NodeHTML = NodeHTML.replace(sentence4,sentence3);
		}else{
			var sentence3 = Ressource+": <font color=#00FF00>"+AddPoint(SentenceRessource)+"</font>"
			var sentence4 = NodeHTML.substring(pos1,pos2+sentence2.length);
			NodeHTML = NodeHTML.replace(sentence4,sentence3);
			
		}
	}
	return NodeHTML;
}

function RemoverDescripcionesColorearRecursos(){
	//==========================================================
	// Remover la descripcion de las listas
	//==========================================================
	var Tab_Resources = GetMCDE();
	var tdnode = document.getElementsByTagName('td');
	var f=0;
	while (f<tdnode.length){
		if (tdnode[f].getAttribute("class")=="l" && (tdnode[f].innerHTML).indexOf("Requiere:",0)>=0 && (tdnode[f].innerHTML).indexOf("Tiempo de producci"+oacento+"n:",0)>=0){
		//alert((tdnode[f].innerHTML).indexOf("Requiere:",0));
		//if ((tdnode[f].innerHTML).indexOf("Requiere:",0)>=0 && (tdnode[f].innerHTML).indexOf("Tiempo de producci"+oacento+"n:",0)>=0){
			//alert("si ");
			if (getScriptConf('dropDescriptions')) {
				//===================
				// Quitar descripcion
				//===================
				var sentence1 = "<br>";
				var sentence2 = "<br>Requiere";
				var pos1 = (tdnode[f].innerHTML).indexOf(sentence1,0);
				if (pos1>=0) {
					var pos2 = (tdnode[f].innerHTML).indexOf(sentence2,pos1+sentence1.length);
					var SentenceDescription  = (tdnode[f].innerHTML).substring(pos1,pos2+sentence2.length);
					//alert(SentenceDescription);
					tdnode[f].innerHTML = (tdnode[f].innerHTML).replace(SentenceDescription,"<br>Requiere");
				}
			}
			if (getScriptConf('markResources')) {
				//===========================================
				// Check if building need ressource and how !
				//===========================================
				tdnode[f].innerHTML = CheckRessourcesCost("Metal",tdnode[f].innerHTML,Tab_Resources[0])
				tdnode[f].innerHTML = CheckRessourcesCost("Cristal",tdnode[f].innerHTML,Tab_Resources[1])
				tdnode[f].innerHTML = CheckRessourcesCost("Deuterio",tdnode[f].innerHTML,Tab_Resources[2])
				tdnode[f].innerHTML = CheckRessourcesCost("Energ"+iacento+"a",tdnode[f].innerHTML,Tab_Resources[3])
			}
		}
		f++;
	}
}

function RemoverTecnologiasObsoletas(){
	//==========================================
	// Scan research and destroy deprecated them
	//==========================================
	if (getScriptConf('dropUselessTech')) {
		var TabResearch=new Array();
		TabResearch[0] = new Array("Tecnolog"+iacento+"a de espionaje",-1);
		TabResearch[1] = new Array("Tecnolog"+iacento+"a de computaci"+oacento+"n",-1);
		TabResearch[2] = new Array("Tecnolog"+iacento+"a militar",-1);
		TabResearch[3] = new Array("Tecnolog"+iacento+"a de defensa",-1);
		TabResearch[4] = new Array("Tecnolog"+iacento+"a de blindaje",-1);
		TabResearch[5] = new Array("Tecnolog"+iacento+"a de energ"+iacento+"a",12);
		TabResearch[6] = new Array("Tecnolog"+iacento+"a de hiperespacio",8);
		TabResearch[7] = new Array("Motor de combusti"+oacento+"n",-1);
		TabResearch[8] = new Array("Motor de impulso",-1);
		TabResearch[9] = new Array("Propulsor hiperespacial",-1);
		TabResearch[10] = new Array("Tecnolog"+iacento+"a l"+aacento+"ser",12);
		TabResearch[11] = new Array("Tecnolog"+iacento+"a i"+oacento+"nica",5);
		TabResearch[12] = new Array("Tecnolog"+iacento+"a de plasma",7);
		TabResearch[13] = new Array("Red de investigaci"+oacento+"n intergal"+aacento+"ctica",-1);
		TabResearch[14] = new Array("Tecnolog"+iacento+"a de gravit"+oacento+"n",1);

		var tablenode = document.getElementsByTagName('table');
		var i=0;
		while(i<tablenode.length){

			//======================
			// Find the good <TABLE>
			//======================
			if(tablenode[i].getAttribute("width")==530){

				var trnode = tablenode[i].getElementsByTagName('tr');
				var j=0;

				//==============================
				// Scan Line by Line (<TR></TR>)
				//==============================
				while(j<trnode.length){

					//============================
					// Get All Columns (<TD></TD>)
					//============================
					var tdnode = trnode[j].getElementsByTagName('td');
					var TechnoRemoved = false;

					//======================================
					// Compare Column with Array TabResearch
					//======================================
					//alert(tdnode[1].innerHTML);
					for(var k=0;k<TabResearch.length;k++){
						var LevelTechno = -1;
						var sentence1 = ">"+TabResearch[k][0]+"</a> (Nivel ";
						var sentence2 = ")<br>";
						var pos1 = (tdnode[1].innerHTML).indexOf(sentence1,0);
						if (pos1>=0){
						    //alert(sentence1);
							var pos2 = (tdnode[1].innerHTML).indexOf(sentence2,pos1+sentence1.length);
							LevelTechno = (tdnode[1].innerHTML).substr(pos1+sentence1.length,pos2-(pos1+sentence1.length));
							//alert("pos1="+pos1+"\npos2="+pos2+"\n/"+LevelTechno+"/");

						    //alert(":"+LevelTechno+":"+TabResearch[k][1]);
							if(pos2 > pos1 && LevelTechno > 0 && TabResearch[k][1]<=LevelTechno && TabResearch[k][1]!=-1){
								//TagNode[i].parentNode.removeChild(TagNode[i]);
								trnode[j].parentNode.removeChild(trnode[j]);
								trnode = tablenode[i].getElementsByTagName('tr');
								TechnoRemoved = true;
							}
						}
					}

					if (TechnoRemoved==false) j++;

				}
			}

			i++;
		}
	}
}

function AchicarImagenes1(){
	if (getScriptConf('tinyIMG')) {
		var imgs = document.getElementsByTagName('img');
		for (var i=0; i<imgs.length; i++) {
			if (getScriptConf('tinyIMG1')) {
				if (imgs[i].getAttribute('width') == '120'){
					imgs[i].setAttribute('height', tinyImg1Size);
					imgs[i].setAttribute('width', tinyImg1Size);
					}
				}
		}
	}
}

function AchicarImagenes3(){
	if (getScriptConf('tinyIMG') && getScriptConf('tinyIMG3')) {
		var imgs = document.getElementsByTagName('img');
		for (var i=0; i<imgs.length; i++) {
			if (imgs[i].getAttribute('width') == '30'){
				imgs[i].setAttribute('height', tinyImg3Size);
				imgs[i].setAttribute('width', tinyImg3Size);
				}
		}
	}
}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|      Effects functions        |***************/
/*********+-------------------------------+***************/
/*********************************************************/

if (getScriptConf('specialEffects')) {
	function hide(path, list, level) {
		var object = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var pos = list.split(':');
		if (!level) {
			setHidden(pos[0])
			var level = 1.0;
		}
		for (var i in pos) {
			object.snapshotItem(pos[i]).style['opacity']=level;
			if (parseFloat(level)<0.1) {
				object.snapshotItem(pos[i]).style['display']='none';
				//object.snapshotItem(pos[i]).style['opacity']=1.0;
			}
		}
		if (parseFloat(level)>0.1) setTimeout("hide('"+path+"', '"+list+"', "+(level-0.1)+")", 30);
		else {
			object.snapshotItem(parseInt(pos[0])-1).setAttribute('onclick', "show('"+path+"', '" + list + "')");
			object.snapshotItem(parseInt(pos[0])-1).title='Click aqui para expandir';
		}
	}
	function show(path, list, level) {
		var pos = list.split(':');
		var object = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (!level) {
			delHidden(pos[0]);
			var level = 0.0;
			for (var i in pos) {
				object.snapshotItem(pos[i]).style['display']='';
				object.snapshotItem(pos[i]).style['opacity']=0.0;
			}
		}
		else {
			for (var i in pos) {
				object.snapshotItem(pos[i]).style['opacity']=level;
			}
		}
		if (parseFloat(level)<1) {
			setTimeout("show('"+path+"', '"+list+"', "+String(parseFloat(level)+0.1)+")", 30);
		}
		else {
			object.snapshotItem(parseInt(pos[0])-1).setAttribute('onclick', "hide('"+path+"', '" + list + "')");
			object.snapshotItem(parseInt(pos[0])-1).title='Click aqui para contraer';
		}
	}
	function hideId(id, level) {
		if (!level) var level = 1.0;
		var object = document.getElementById(id);
		object.style['opacity']=level;
		if (parseFloat(level)<0.1) {
			object.style['display']='none';
			object.style['opacity']=1.0;
		}
		else setTimeout("hideId('"+id+"', "+(level-0.1)+")", 30);
	}
	function showId(id, level) {
		if (!level) {
			var level = 0.0;
			var object = document.getElementById(id);
			object.style['display']='';
			object.style['opacity']=0.0;
		}
		else {
			var object = document.getElementById(id);
			object.style['opacity']=level;
		}
		if (parseFloat(level)<1.0) setTimeout("showId('"+id+"', "+(level+0.1)+")", 30);
	}
}
else { // no special effects
	function hideId(id, level) {
		document.getElementById(id).style['display']='none';
	}
	function showId(id, level) {
		document.getElementById(id).style['display']='';
	}
	function hide(path, list, level) {
		var pos = list.split(':');
		var object = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		setHidden(pos[0]);
		for (var i in pos)
			object.snapshotItem(pos[i]).style['display']='none';
		object.snapshotItem(parseInt(pos[0])-1).setAttribute('onclick', "show('"+path+"', '" + list + "')");
		object.snapshotItem(parseInt(pos[0])-1).title='Click aqui para expandir';
	}
	function show(path, list, level) {
		var pos = list.split(':');
		var object = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		delHidden(pos[0]);
		for (var i in pos)
			object.snapshotItem(pos[i]).style['display']='';
		object.snapshotItem(parseInt(pos[0])-1).setAttribute('onclick', "hide('"+path+"', '" + list + "')");
		object.snapshotItem(parseInt(pos[0])-1).title='Click aqui para contraer';
	}
}
unsafeWindow.hide = hide;
unsafeWindow.show = show;
unsafeWindow.hideId = hideId;
unsafeWindow.showId = showId;

/*********************************************************/
/*********+-------------------------------+***************/
/*********| Variable management functions |***************/
/*********+-------------------------------+***************/
/*********************************************************/


/******* Generalized conf functions section ***************/

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
	var confStr = GM_getValue(confName, defConfName);
	var conf = confStr.split(separator);
	var valorDef = (String(getDefConf(nombre, defConfName, separator))==String(valor));
//		GM_log(getDefConf(nombre, defConfName, separator)+' -> '+valor);
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

/*********** Specific conf functions *********************/

function getScriptConf(nombre) {
	return getConf(nombre, "scriptConf", defScriptConf, ':');
}

function setScriptConf(nombre, valor) {
	setConf(nombre, valor, "scriptConf", defScriptConf, ':');
}

function getSession(hostname) {
	return getConf(hostname, "session", '', ':');
}

function setSession(hostname, session) {
	return setConf(hostname, session, "session", '', ':');
}

function getMainP(hostname) {
	var temp = getConf(hostname, "MainP", '', ';');
	if (temp!=-1) return temp;
	else return '1:1:1';
}

function setMainP(hostname, MainP) {
	return setConf(hostname, MainP, "MainP", '', ';');
}

function getDefConf(nom, defConfNam, sep) {
	return getConf(nom, '', defConfNam, sep);
}

function getDefScriptConf(nom) {
	return getConf(nom, '', defScriptConf, ':');
}

unsafeWindow.getScriptConf=getScriptConf;
unsafeWindow.setScriptConf=setScriptConf;
unsafeWindow.getSession=getSession;
unsafeWindow.setSession=setSession;
unsafeWindow.getMainP=getMainP;
unsafeWindow.setMainP=setMainP;


/*************** GalaxieTool Section *********************/

function getGTName(hostname) {
	var GTValues = GM_getValue("GTValues",defGTValues);
	if (GTValues!='') GTValues=GTValues.split(':x:');
	else return '';
	for (var i=0; i<GTValues.length; i+=4) {
		if (GTValues[i]==hostname) {
			return GTValues[i+1];
		}
	}
	return '';
}
unsafeWindow.getGTName=getGTName;

function getGTPass(hostname) {
	var GTValues = GM_getValue("GTValues",defGTValues).split(':x:');
	for (var i=0; i<GTValues.length; i+=4) {
		if (GTValues[i]==hostname) {
			return GTValues[i+2];
		}
	}
	return '';
}
unsafeWindow.getGTPass=getGTPass;

function getGTUrl(hostname) {
	var GTValues = GM_getValue("GTValues",defGTValues).split(':x:');
	for (var i=0; i<GTValues.length; i+=4) {
		if (GTValues[i]==hostname) {
			return GTValues[i+3];
		}
	}
	return '';
}
unsafeWindow.getGTUrl=getGTUrl;

function addGTUser(hostname, username, pass, url) {
	var GTValuesStr = GM_getValue("GTValues",defGTValues);
	var GTValues = GTValuesStr.split(':x:');
	for (var i=0; i<GTValues.length; i+=4) {
		if (GTValues[i]==hostname) {
			GTValues[i+1]=username;
			GTValues[i+2]=pass;
			GTValues[i+3]=url;
			GM_setValue("GTValues", GTValues.join(':x:'));
			return;
		}
	}
	if (GTValuesStr!='') GM_setValue("GTValues", ([GTValuesStr,hostname,username,pass,url].join(':x:')));
	else GM_setValue("GTValues", ([hostname,username,pass,url].join(':x:')));
}
unsafeWindow.addGTUser=addGTUser;

function delGTUser(hostname) {
	var GTValuesStr = GM_getValue("GTValues",defGTValues);
	var GTValues = GTValuesStr.split(':x:');
	for (var i=0; i<GTValues.length; i+=4) {
		if (GTValues[i]==hostname) {
			GTValues.splice(i, 4);
			GM_setValue("GTValues", GTValues.join(':x:'));
			return;
		}
	}
}
unsafeWindow.delGTUser=delGTUser;

/*************** reset/save functions ********************/

unsafeWindow.saveScriptConf = function saveScriptConf(hostname) {
	var config = document.getElementsByName('conf');
	for (var i=0; i<config.length;i++) {
		if (config[i].value!='on') setScriptConf(config[i].id, config[i].value);
		else {
			setScriptConf(config[i].id, config[i].checked);
			if (config[i].id=='colorMens' && config[i].checked) {
				var color = document.getElementsByName('color');
				for (var j=0; j<color.length;j++) {
					setScriptConf(color[j].id, color[j].value);
				}    
			}
			else if (config[i].id=='autoMark' && config[i].checked) {
				var autoMark = document.getElementsByName('autoMark');
				for (var j=0; j<autoMark.length;j++) {
					setScriptConf(autoMark[j].id, autoMark[j].checked);
				}    
			}
			else if (config[i].id=='galaxyTool' && config[i].checked) {
				var nodos = document.getElementsByName('GTUser');
				var loc=location.hostname;
			  var j = '1';
				for (var k=1; k<nodos.length; k++)
					if (nodos[k].childNodes[1].firstChild.value!='') {
						addGTUser(loc+(j=='1'?'':j), nodos[k].childNodes[1].firstChild.value, nodos[k].childNodes[2].firstChild.value, nodos[k].childNodes[3].firstChild.value);
						j++;
					}
					for (var x=j; getGTName(loc+x!=''); x++)
						alert('borrando ' +loc+x);
						delGTUser(loc+x);
			}
			else if (config[i].id=='allyTags' && config[i].checked) {
				var nodos = document.getElementsByName('allyTag');
				var tags = document.getElementsByName('ATTag');
				var colores = document.getElementsByName('ATColor');
				var alianzas = document.getElementsByName('ATAllys');
				var cadena='';
				for (var k=1; k<nodos.length; k++) {
					if ((colores[k].value!='')&&(alianzas[k].value!='')) {
						if (cadena=='') cadena = [tags[k].value, colores[k].value, alianzas[k].value].join(':y:');
						else cadena = [cadena, [tags[k].value, colores[k].value, alianzas[k].value].join(':y:')].join(':x:');
					}
				}
				GM_setValue('allyTags', cadena);
			}
		}
	}
	window.parent.frames[0].location.reload();
}

unsafeWindow.resetScriptConf = function resetScriptConf() {
	GM_setValue('scriptConf', defScriptConf);
}
unsafeWindow.resetCompactConf = function resetCompactConf() {
	GM_setValue('compactConf', defCompactConf);
}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|      FarmList functions       |***************/
/*********+-------------------------------+***************/
/*********************************************************/

var server = location.host;

function addCoords(coords, name) {
	if (!coords) {
		var coords = prompt('Introduce coordenadas en formato X:XXX:XX');
		if (coords==null) return false;
	}
	if (!validCoords(coords)) {
		alert('Las coordenadas no son validas!');
		return false;
	}
	var name2 = searchCoords(coords);
	if (name2) {
		if (!confirm('Coordenadas guardadas como \''+name2+'\', quieres cambiar la descripción?'))
			return false;
	}
	var desc = prompt('Introduce una descripción para ' + coords, (name?name:(name2?name2:'')));
	if (!desc) return false;
	var coordList = GM_getValue('coordList_' + server, '');
	if (name2)
		GM_setValue('coordList_'+server, coordList.replace(new RegExp(coords+'|'+name2), coords+'|'+desc));
	else 
		GM_setValue('coordList_'+server, (coordList==''?'':coordList+'^')+coords+'|'+desc);
	if (typeof(ramka)!='undefined') makeCoordListPage();
	return true;
}

function searchCoords(coords) {
	var coordList = GM_getValue('coordList_'+server, '').split('^');
	for (var i in coordList) {
		var x = coordList[i].split('|');
		if (x[0]==coords) return x[1];
	}
	return false;
}

function delAll() {
	if (confirm ('Eliminar todas las coordenadas?')) {
		GM_setValue('coordList_'+server,'');
		alert('Coordenadas Eliminadas!');
		if (typeof(ramka)!='undefined') makeCoordListPage();
	}
}
	
function delCoord(nr) {
	newAddress = '';
	address = GM_getValue('coordList_'+server, '').split('^');
	address.splice(nr, 1);
	GM_setValue('coordList_'+server, address.join('^'));
	makeCoordListPage();
}
	
function moveCoord(nr) {
	CoordsTab = loadCoords();
	if ((poz = prompt ('Mover coordenadas a la posicion:', nr+1)) && (poz>0) && (poz<=CoordsTab.length)) {
		var moved = CoordsTab.splice(nr, 1);
		var rest = CoordsTab.splice(poz-1, CoordsTab.length);
		CoordsTab = CoordsTab.concat(moved, rest);
		saveCoords(CoordsTab);
		makeCoordListPage();
	}
}

function loadCoords() {
	var CoordsTab = new Array;
	address = GM_getValue('coordList_' + server, '').split( '^' );
	for (i in address)
			CoordsTab[i] = address[i].split('|');
	return CoordsTab;
}

function saveCoords(CoordsTab) {
	str = '';
	for (i in CoordsTab)
		str = (str==''?'':str + '^') + CoordsTab[i][0] + '|' + CoordsTab[i][1];
	GM_setValue ('coordList_' + server, str);
}

function editCoord(nr) {
	coordsTab = loadCoords();
	if (desc = prompt('Introduce una nueva descripción', coordsTab[nr][1])) {
		coordsTab[nr][1] = desc;
		saveCoords(coordsTab);
		makeCoordListPage();
	}
}

unsafeWindow.addCoords = addCoords;
unsafeWindow.searchCoords = searchCoords;
unsafeWindow.delAll = delAll;
unsafeWindow.delCoord = delCoord;
unsafeWindow.moveCoord = moveCoord;
unsafeWindow.loadCoords = loadCoords;
unsafeWindow.saveCoords = saveCoords;
unsafeWindow.editCoord = editCoord;


/*********************************************************/
/*********+-------------------------------+***************/
/*********|    sendGTool function         |***************/
/*********+-------------------------------+***************/
/*********************************************************/

if (getScriptConf('galaxyTool')) {
	sendGTool = function (nodo, typ, content) {
		nodo.innerHTML=nodo.innerHTML.fontcolor('orange');
		nodo.title='Enviando información...';
		var loc = location.hostname;
		for (var k=1; getGTName(loc+(k<2?'':k))!=''; k++) {
			GM_xmlhttpRequest({
				method:"POST",
				url:getGTUrl(loc+(k<2?'':k)),
				headers:{
					"User-Agent" : navigator.userAgent,
					"Accept" : "text/xml",
					"Content-type" : 'application/x-www-form-urlencoded'
				},
				onload:function(details) {
//					alert(details.responseText)
					if (details.status==403) {
						nodo.innerHTML+="<img title='Error: acceso denegado' src='data:image/gif;base64,R0lGODlhDgAOAMIGAL+/vwAAAP9EH+ozIOJtWZ02Ev///////yH5BAEAAAcALAIAAgAKAAsAAAMqeBoc+oFI4RYxRIjh4p0bI2TZYDKkthWiag5soA0bzB7Ba1e4fT+4xiMBADs=' >";
//						alert('Acceso denegado, comprueba tu nombre de usuario y tu password');
					}
					else if (details.status==404) {
						nodo.innerHTML+="<img title='Error: la p"+aacento+"gina no existe' src='data:image/gif;base64,R0lGODlhDgAOAMIGAL+/vwAAAP9EH+ozIOJtWZ02Ev///////yH5BAEAAAcALAIAAgAKAAsAAAMqeBoc+oFI4RYxRIjh4p0bI2TZYDKkthWiag5soA0bzB7Ba1e4fT+4xiMBADs=' >";
//						alert('P'+aacento+'gina no encontrada, comprueba la url de Galaxy Tool');
					}
					else if (details.status==200) {
						try {
							var code=parseInt(details.responseText.match(/(\d\d\d)$/)[1]);
						} catch (e) {}
						if (code==601)
							nodo.innerHTML+="<img title='Galaxia "+[typ.replace(/.*y=(\d+).*/, '$1'), typ.replace(/.*m=(\d+).*/, '$1')].join(':')+" actualizada' src='data:image/gif;base64,R0lGODlhDgAOAMIGAL+/vwAAADLNMi6LV5j7mC9PT////////yH5BAEAAAcALAIAAgAKAAsAAAMqeBoc+oFI4RYxRIjh4p0bI2TZYDKkthWiag5soA0bzB7Ba1e4fT+4xiMBADs=' >";
						else if (code==602)
							nodo.innerHTML+="<img title='Error al actualizar la galaxia "+[typ.replace(/.*y=(\d+).*/, '$1'), typ.replace(/.*m=(\d+).*/, '$1')].join(':')+"' src='data:image/gif;base64,R0lGODlhDgAOAMIGAL+/vwAAAP9EH+ozIOJtWZ02Ev///////yH5BAEAAAcALAIAAgAKAAsAAAMqeBoc+oFI4RYxRIjh4p0bI2TZYDKkthWiag5soA0bzB7Ba1e4fT+4xiMBADs=' >";						
						else if (code==611)
							nodo.innerHTML+="<img title='Informe de espionaje de "+content.replace(/.*%5B(\d)+%3A(\d+)%3A(\d+)%5D.*/, '$1:$2:$3')+" enviado' src='data:image/gif;base64,R0lGODlhDgAOAMIGAL+/vwAAADLNMi6LV5j7mC9PT////////yH5BAEAAAcALAIAAgAKAAsAAAMqeBoc+oFI4RYxRIjh4p0bI2TZYDKkthWiag5soA0bzB7Ba1e4fT+4xiMBADs=' >";
						else if (code==612)
							nodo.innerHTML+="<img title='Error al enviar informe de espionaje de "+content.replace(/.*%5B(\d)+%3A(\d+)%3A(\d+)%5D.*/, '$1:$2:$3')+"' src='data:image/gif;base64,R0lGODlhDgAOAMIGAL+/vwAAAP9EH+ozIOJtWZ02Ev///////yH5BAEAAAcALAIAAgAKAAsAAAMqeBoc+oFI4RYxRIjh4p0bI2TZYDKkthWiag5soA0bzB7Ba1e4fT+4xiMBADs=' >";							
						else if (code==621) {
							var cosa = typ.match(/.*who=(\d)&what=(\d)/);
							var cadena = (cosa[1]=='0'?'jugadores':'alianzas') +
									(cosa[2]=='0'?' en puntos':(cosa[2]=='1'?' en flotas':' por investigaciones'))
							nodo.innerHTML+="<img title='Estadísticas de "+cadena+" actualizadas' src='data:image/gif;base64,R0lGODlhDgAOAMIGAL+/vwAAADLNMi6LV5j7mC9PT////////yH5BAEAAAcALAIAAgAKAAsAAAMqeBoc+oFI4RYxRIjh4p0bI2TZYDKkthWiag5soA0bzB7Ba1e4fT+4xiMBADs=' >";
						}
						else if (code==622) {
							var cosa = typ.match(/.*who=(\d)&what=(\d)/);
							var cadena = (cosa[1]=='0'?'jugadores':'alianzas') +
									(cosa[2]=='0'?' en puntos':(cosa[2]=='1'?' en flotas':' por investigaciones'))
							nodo.innerHTML+="<img title='Error al actualizar las estadísticas de "+cadena+"' src='data:image/gif;base64,R0lGODlhDgAOAMIGAL+/vwAAAP9EH+ozIOJtWZ02Ev///////yH5BAEAAAcALAIAAgAKAAsAAAMqeBoc+oFI4RYxRIjh4p0bI2TZYDKkthWiag5soA0bzB7Ba1e4fT+4xiMBADs=' >";
						}
						else if (code==631)
							nodo.innerHTML+="<img title='Historial de alianza actualizado' src='data:image/gif;base64,R0lGODlhDgAOAMIGAL+/vwAAADLNMi6LV5j7mC9PT////////yH5BAEAAAcALAIAAgAKAAsAAAMqeBoc+oFI4RYxRIjh4p0bI2TZYDKkthWiag5soA0bzB7Ba1e4fT+4xiMBADs=' >";
						else if (code==632)
							nodo.innerHTML+="<img title='Error al actualizar el historial de alianza' src='data:image/gif;base64,R0lGODlhDgAOAMIGAL+/vwAAAP9EH+ozIOJtWZ02Ev///////yH5BAEAAAcALAIAAgAKAAsAAAMqeBoc+oFI4RYxRIjh4p0bI2TZYDKkthWiag5soA0bzB7Ba1e4fT+4xiMBADs=' >";
//					alert('La url especificada no es correcta');
						else {
							nodo.innerHTML+="<img title='Error: url incorrecta o error desconocido' src='data:image/gif;base64,R0lGODlhDgAOAMIGAL+/vwAAAP9EH+ozIOJtWZ02Ev///////yH5BAEAAAcALAIAAgAKAAsAAAMqeBoc+oFI4RYxRIjh4p0bI2TZYDKkthWiag5soA0bzB7Ba1e4fT+4xiMBADs=' >";
							if (getScriptConf('debugMode')) alert('Error desconocido, el contenido de la respuesta es:\n'+details.responseHeaders+details.responseText);
						}
					}
				},
				onerror: function(detError) {
					alert(detError.statusText);
				},
				data: 'user=' + getGTName(loc+(k<2?'':k)) + '&password=' + getGTPass(loc+(k<2?'':k)) + '&typ=' +typ+ '&content=' + content
			});
		}
	}
	unsafeWindow.sendGTool=sendGTool;     
}





	function makeCoordListPage() {
		ramka = window.parent.frames[1].document;
		body = ramka.body;
		body.innerHTML='';
		tab = document.createElement('TABLE');
		tab.style.padding=30;
		tr = tab.appendChild(document.createElement('TR'));
		td = tr.appendChild(document.createElement('TD'));
		td.className='c';
		td.colSpan=4;
		td.appendChild(document.createTextNode('Listado de coordenadas'));
		
		array1 = GM_getValue('coordList_'+server, '').split( '^' );
		len = array1.length;		
		for( i = 0; i < len; i++ ) {
			x = array1[i];
			arr = x.split( '|' );
			if( arr[0] != null && typeof(arr[1])!='undefined') {
				coord = arr[0].split(':');
				tr = tab.appendChild(document.createElement('TR'));
				
				th = tr.appendChild(document.createElement('TH'));
				a = document.createElement('A');
				a.style['cursor']='pointer';
				a.title='Cambiar orden';
				a.setAttribute('onclick', 'moveCoord('+i+')');
				a.appendChild(document.createTextNode(i+1));
				th.appendChild(a);
					
				th = tr.appendChild(document.createElement('TH'));
				a = document.createElement('A');
				a.href = 'galaxy.php?session=' + getSession(location.hostname) +
							'&p1='+coord[0] + '&p2=' + coord[1] + '&p3='+coord[2];
				a.title='Ver en galaxia';
				a.appendChild(document.createTextNode(arr[0]));
				th.appendChild(a);
				
				th = tr.appendChild(document.createElement('TH'));
				a = document.createElement('A');
				a.style['cursor']='pointer';
				a.title='Cambiar descripción';
				a.setAttribute('onclick', 'editCoord('+i+')');
				a.appendChild(document.createTextNode(arr[1]));
				th.appendChild(a);
				
				th = tr.appendChild(document.createElement('TH'));
				a = document.createElement('A');
				a.style['cursor']='pointer';
				a.title='Eliminar este destino';
				a.setAttribute('onclick', 'delCoord('+i+')');
				a.appendChild(document.createTextNode('Eliminar'));
				th.appendChild(a);
			}
		}
		body.appendChild(tab);
	}
	unsafeWindow.makeCoordListPage = makeCoordListPage;

/*********************************************************/
/*********+-------------------------------+***************/
/*********|         makecongig            |***************/
/*********+-------------------------------+***************/
/*********************************************************/

	unsafeWindow.makeConfig = function () {
		function newTable(title, colspan) {
			return "<table width='90%'><tr><td class='c' colspan ="+colspan+">"+title+"</td></tr>";
		}
		function endTable() {
			return '</table>';
		}
		function newNestledTable(id, depend, title, colspan, parentColspan) {
			return "<tr id='"+id+"' align='center' "+((depend!=''&&!getScriptConf(depend))?"style='display:none'":'')+"><td colspan='"+parentColspan+"'><table width='95%' colspan="+colspan+" >" +
			"<tr><td class='c' colspan ="+colspan+">"+title+"</td></tr>";
		}
		function endNestledTable() {
			return "</table></td></tr>";
		}
		function newTableRowCk(nam, id, desc, table) {
			return "<tr><th width='50'><input type='checkbox' name='"+nam+"' id='" + id + "' " +
			(getScriptConf(id)?'checked=true':'') +
			
			(table==''?" />":" onclick='if (this.checked) showId(\""+table+"\"); else hideId(\""+table+"\")' />") +
			"</th><th>" + desc + "</th></tr>";
		}

		function newTableRowNb(nam, id, desc) {
			return "<tr><th width='50'><input type='text' size='3' name='"+nam+"' id='" + id + "' " +
			"value='" + getScriptConf(id) + "'/>" +
			"</th><th>" + desc + "</th></tr>";
		}
		
		function newTableRowColor(nam, id, desc) {
			var temp = getScriptConf(id);
			return "<tr><th>" +
				"<input type='button' title='restaurar valor' value='<' style='display:none' " +
				"onclick='this.style[\"display\"]=\"none\";this.nextSibling.nextSibling.style[\"display\"]=\"none\";this.nextSibling.value=getScriptConf(this.nextSibling.id); this.parentNode.nextSibling.firstChild.attributes[0].value=this.nextSibling.value' />" +
				"<input type='text' name='"+nam+"' id='"+id+"' size='5' onkeyup='"+ "this.parentNode.nextSibling.firstChild.attributes[0].value=this.value;this.previousSibling.style[\"display\"]=\"\";this.nextSibling.style[\"display\"]=\"\"" +"' value='" + temp + "'/>" +
				"<input type='button' title='guardar valor' value='>' style='display:none' " +
				"onclick='this.style[\"display\"]=\"none\";this.previousSibling.previousSibling.style[\"display\"]=\"none\";setScriptConf(this.previousSibling.id, this.previousSibling.value)' />" + 
				"</th><th><font color='"+temp+"'>"+desc+"</font></th></tr>";
		}

		var size = 5;
		var cad = "<br><h1>Script <a href='http://userscripts.org/scripts/show/5550' target='_blank' style='color:lightblue'>oGame pro</a> by <a href='mailto:10cutu5.0f.b0r6@gmail.com'>Locutus of Borg</a> (Basado en oGame++ por Unbrained) <small title='click para buscar actualizaciones' onclick='checkUpdates(true)' style='color:orangered; cursor:pointer'> v"+getDefScriptConf('version')+"</small></h1>" +
			"<br /><center>Descubre los <a href='http://roble.cnice.mecd.es/~apuente/applet1.html' target='new'>colores</a>";

		// Ajustes

		cad += newTable(c_mainTable, 2);
		cad += newTableRowCk('conf', 'compactar', c_compactar, '');
		cad += newTableRowCk('conf', 'ocalc', c_ocalc, '');
		cad += newTableRowCk('conf', 'dragoSim', c_dragoSim, '');
		cad += newTableRowCk('conf', 'dragoSimM', c_dragoSimM, '');
		cad += newTableRowCk('conf', 'modifyDate', c_modifyDate, '');
		cad += newTableRowCk('conf', 'flottenInfo', c_flottenInfo, '');
		cad += newTableRowCk('conf', 'specialEffects', c_specialEffects, '');
		cad += newTableRowCk('conf', 'autoUpdate', c_autoUpdate, '');
		//cad += newTableRowCk('conf', 'coordLinker', c_coordLinker, 'tablaCoordLinker');
		//cad += newNestledTable('tablaCoordLinker', 'coordLinker', c_tablaCoordLinker, 2, 2);
		//cad += newTableRowCk('conf', 'coordLinkerVarG', c_coordLinkerVarG, '');
		//cad += newTableRowColor('color', 'coordLinkerCM', c_coordLinkerCM);
		//cad += newTableRowColor('color', 'coordLinkerCVG', c_coordLinkerCVG);
		//cad += newTableRowColor('color', 'coordLinkerCG', c_coordLinkerCG);
		//cad += newTableRowCk('conf', 'coordLinkerSC', c_coordLinkerSC);
		//cad += endNestledTable();
		cad += newTableRowCk('conf', 'allyTable', c_allyTable, 'tablaAllyTable');
		cad += newNestledTable('tablaAllyTable', 'allyTable', c_tablaAllyTable, 2, 2);
		cad += newTableRowCk('conf', 'ATMembers', c_ATMembers, '');
		cad += newTableRowCk('conf', 'ATTopP', c_ATTopP, '');
		cad += newTableRowCk('conf', 'ATTopA', c_ATTopA, '');
		cad += newTableRowCk('conf', 'ATForo', c_ATForo, '');
		cad += newTableRowCk('conf', 'ATCC', c_ATCC, '');
		cad += newTableRowCk('conf', 'ATBaned', c_ATBaned, '');
		cad += newTableRowColor('color', 'ATColorN', c_ATColorN);
		cad += endNestledTable();
		cad += newTableRowCk('conf', 'debris', c_debris, 'tablaDebris');
		cad += newNestledTable('tablaDebris', 'debris', c_tablaDebris, 4, 2);
		cad += newTableRowColor('color', 'debrisColor', c_debrisColor);
		cad += newTableRowNb('conf', 'debrisMin', c_debrisMin);
		cad += newTableRowNb('conf', 'debrisMax', c_debrisMax);
		cad += endNestledTable();
		// AllyTags
		
		cad += newTableRowCk('conf', 'allyTags', c_allyTags, 'tablaAllyTags');
		cad += newNestledTable('tablaAllyTags', 'allyTags', c_tablaAllyTags, 4, 2);
		cad += "<tr><th><input type='button' value='+' title='Añadir nueva etiqueta' onclick=\"this.parentNode.parentNode.parentNode.appendChild(this.parentNode.parentNode.nextSibling.cloneNode(true));this.parentNode.parentNode.parentNode.lastChild.style['display']=''\" ></th>" + 
			"<th>Etiqueta</th>" +
			"<th>Color</th>" +
			"<th>Alianza/s implicada/s (separar con '|' )</th>" +
			"</tr>";

		cad += "<tr style='display:none' name='allyTag'><th><input type='button' value='-' title='Eliminar etiqueta' " +
			" onclick=\"this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)\" /></th>" +
			"<th><input size='10' type='text' name='ATTag' value='' /></th>" +
			"<th><input size='10' type='text' name='ATColor' value='' onchange=\"this.parentNode.nextSibling.firstChild.style['color']=this.value\" /></th>" + 
			"<th><input size='48' type='text' name='ATAllys' value='' /></th></tr>";
		var tags = GM_getValue('allyTags', defAllyTags).split(':x:');
		for (var k=0; k<tags.length; k++) {
			tags2 = tags[k].split(':y:');
			cad += "<tr name='allyTag'><th><input type='button' value='-' title='Eliminar etiqueta' " + 		 
				" onclick='this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)' /></th>" +
				"<th><input size='10' type='text' name='ATTag' value='"+tags2[0]+"' /></th>" +
				"<th><input size='10' type='text' name='ATColor' value='"+tags2[1]+
				"' onchange=\"this.parentNode.nextSibling.firstChild.style['color']=this.value\" /></th>" + 
				"<th><input size='48' type='text' name='ATAllys' style='color:"+tags2[1]+"' value='"+
				tags2[2]+"' /></th></tr>";
		}
		cad += endNestledTable();
		// GalaxyTool
		
		cad += newTableRowCk('conf', 'galaxyTool', c_galaxyTool, 'tablaGTool');
		cad += newNestledTable('tablaGTool', 'galaxyTool', c_tablaGTool, 4, 2);
		cad += "<tr><th><input type='button' value='+' title='Añadir cuenta nueva' onclick=\"this.parentNode.parentNode.parentNode.appendChild(this.parentNode.parentNode.nextSibling.cloneNode(true));this.parentNode.parentNode.parentNode.lastChild.style['display']=''\" ></th>" + 
			"<th>Usuario:</th>" +
			"<th>Password:</th>" +
			"<th>Dirección de Galaxy Tool (pregunta al administrador)</th>" +
			"</tr>";

		var loc = location.hostname;
		cad += "<tr style='display:none' name='GTUser'><th><input type='button' value='-' title='Eliminar cuenta' " +
			" onclick=\"this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)\" /></th>" +
			"<th><input size='10' type='text' name='GTName' value='' /></th>" +
			"<th><input size='10' type='password' name='GTPass' value='' /></th>" +
			"<th><input size='48' type='text' name='GTUrl' value='' /></th></tr>";
		for (var k=1; getGTName(loc+(k<2?'':k))!=''; k++) {
			cad += "<tr name='GTUser'><th><input type='button' value='-' title='Eliminar cuenta' " + 		 
				" onclick='this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)' /></th>" +
				"<th><input size='10' type='text' name='GTName' value='"+getGTName(loc+(k<2?'':k))+"' /></th>" +
				"<th><input size='10' type='password' name='GTPass' value='"+getGTPass(loc+(k<2?'':k))+"' /></th>" +
				"<th><input size='48' type='text' name='GTUrl' value='"+getGTUrl(loc+(k<2?'':k))+"' /></th></tr>";
		}
		cad += endNestledTable();

		cad += newTableRowCk('conf', 'tinyIMG', c_tinyIMG, 'tablatinyIMG');
		cad += newNestledTable('tablatinyIMG', 'tinyIMG', c_tablatinyIMG, 4, 2);
		cad += newTableRowCk('conf', 'tinyIMG1', c_tinyIMG1);
		//cad += newTableRowCk('conf', 'tinyIMG2', c_tinyIMG2);
		cad += newTableRowCk('conf', 'tinyIMG3', c_tinyIMG3);
		cad += endNestledTable();
		
		cad += newTableRowCk('conf', 'autoRefreshVisionGeneral', c_autoRefreshVisionGeneral, 'tablaautoRefreshVisionGeneral');
		cad += newNestledTable('tablaautoRefreshVisionGeneral', 'autoRefreshVisionGeneral', c_tablaautoRefreshVisionGeneral, 4, 2);
		cad += newTableRowNb('conf', 'autoRefreshVisionGeneral_Time1', c_autoRefreshVisionGeneral_Time1);
		cad += newTableRowNb('conf', 'autoRefreshVisionGeneral_Time2', c_autoRefreshVisionGeneral_Time2);
		cad += endNestledTable();
		cad += newTableRowCk('conf', 'dropUselessTech', c_dropUselessTech, '');
		cad += newTableRowCk('conf', 'dropDescriptions', c_dropDescriptions, '');
		cad += newTableRowCk('conf', 'enhanceStatics', c_enhanceStatics, '');
		cad += newTableRowCk('conf', 'markResources', c_markResources, '');
		cad += newTableRowCk('conf', 'colorMens', c_colorMens, 'tablaColores');
		cad += newTableRowCk('conf', 'autoMark', c_autoMark, 'tablaAutoMark');
		// AutoMark

		cad += "</table><table width=\"600\"><tr><td width=\"50%\"><table id='tablaAutoMark' style='display:"+(getScriptConf('autoMark')?'':'none')+"' ><tr><td class=\"c\" colspan =\"2\">Auto marcar mensajes de:</td></tr>";
		
		cad += newTableRowCk('autoMark', 'AMTrans', c_AMTrans, '');
		cad += newTableRowCk('autoMark', 'AMTransR', c_AMTransR, '');
		cad += newTableRowCk('autoMark', 'AMColo', c_AMColo, '');
		cad += newTableRowCk('autoMark', 'AMAlianza', c_AMAlianza, '');
		cad += newTableRowCk('autoMark', 'AMPriv', c_AMPriv, '');
		cad += newTableRowCk('autoMark', 'AMEsp', c_AMEsp, '');
		cad += newTableRowCk('autoMark', 'AMEspP', c_AMEspP, '');
		cad += newTableRowNb('conf', 'AMEspPRecMin', c_AMEspPRecMin);
		cad += newTableRowCk('autoMark', 'AMAttack', c_AMAttack, '');
		cad += newTableRowCk('autoMark', 'AMMisiles', c_AMMisiles, '');
		cad += newTableRowCk('autoMark', 'AMRec', c_AMRec, '');
		cad += newTableRowCk('autoMark', 'AMConf', c_AMConf, '');

		// Colores

		cad += "</table></td><td width='50%'><table id='tablaColores' style='display:"+(getScriptConf('colorMens')?'':'none')+"' ><tr><td class=\"c\" colspan =\"2\">Colores de los mensajes</td></tr>";
    
		cad += newTableRowColor('color', 'colorTrans', c_colorTrans);
		cad += newTableRowColor('color', 'colorTransR', c_colorTransR);
		cad += newTableRowColor('color', 'colorAlianza', c_colorAlianza);
		cad += newTableRowColor('color', 'colorPriv', c_colorPriv);
		cad += newTableRowColor('color', 'colorRec', c_colorRec);
		cad += newTableRowColor('color', 'colorEsp', c_colorEsp);
		cad += newTableRowColor('color', 'colorConf', c_colorConf);
		cad += newTableRowColor('color', 'colorColo', c_colorColo);
		cad += newTableRowColor('color', 'colorMisiles', c_colorMisiles);
		
		cad += "</table></td></tr></table><table width='300'><tr><td><div align=left><input type='button' value='Guardar cambios' onclick='saveScriptConf(window.parent.frames[0].location.hostname)' /></div></td><td><div align=right><input type='button' align=right value='Valores iniciales' onclick='resetScriptConf()' /></div></td></tr></table></center>";

		return cad;
	} // makeConfig



/*********************************************************/
/*********+-------------------------------+***************/
/*********|         leftmenu.php          |***************/
/*********+-------------------------------+***************/
/*********************************************************/

if (location.pathname=='/game/leftmenu.php') {
	if (getScriptConf('autoUpdate')) checkUpdates();
	
	var nodo = document.evaluate("/html/body/center/table/tbody/tr/td/div/font[a='Alianzas']/../../..", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (nodo) {
    var indSession = nodo.innerHTML.indexOf('session=');
    setSession(location.hostname, nodo.innerHTML.substring(indSession+8, indSession+20));
		if (getScriptConf('dragoSimM')) {
			var drago = nodo.cloneNode(true);
			var drago2 = drago.getElementsByTagName('a')[0];
			drago2.href = "http://drago-sim.com/index.php?lang=spanish&style=g3ck0&template=Standard" + GM_getValue('misTech', '');
			drago2.innerHTML = "Drago-Sim";
			drago2.title = "Ir a Drago-Sim";
			nodo.parentNode.insertBefore(drago, nodo.nextSibling);
		}
		if (getScriptConf('galaxyTool')) {
			if (getScriptConf('galaxyToolM')) {
				var url = getGTUrl(location.hostname);
				if (url) {
					var GTM = nodo.cloneNode(true);
					var GTM2 = GTM.getElementsByTagName('a')[0];
					GTM2.href = getGTUrl(location.hostname).split('secret')[0]+'/secret/index.php';
					GTM2.innerHTML = 'GalaxieTool';
					GTM2.title = 'Ir al servidor GalaxieTool';
					nodo.parentNode.insertBefore(GTM, nodo.nextSibling);
				}
			}
			if (getScriptConf('GTGV')) {
				var Galaxia = document.evaluate("/html/body/center/table/tbody/tr/td/div/font[a='Galaxia']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				var GTGView = Galaxia.cloneNode(true);
				var GTGView2 = GTGView.getElementsByTagName('a')[0];
				GTGView2.style['color'] = 'lightblue';
				var coord = getMainP(location.hostname).split(':');
				GTGView2.href = getGTUrl(location.hostname).split('secret')[0]+'secret/view.php?gala='+coord[0]+'&system='+coord[1];
				GTGView2.innerHTML = 'GT';
				GTGView2.title = 'Ver galaxia a traves de GalaxieTool';
				Galaxia.parentNode.appendChild(GTGView);
			}
		}
		//var conf = nodo.cloneNode(true);
		//var conf2 = conf.getElementsByTagName('a')[0];
		//conf2.removeAttribute('target');
		//conf2.removeAttribute('href');
		//conf2.style['cursor']='pointer';
		//conf2.setAttribute('onclick', 'window.parent.frames[1].document.body.innerHTML=makeConfig()');
		//conf2.innerHTML = "oGame Pro";
		//nodo.parentNode.insertBefore(conf, nodo.parentNode.lastChild);

		if (getScriptConf('ocalc')) {
			var ocalc = nodo.cloneNode(true);
			var ocalc2 = ocalc.getElementsByTagName('a')[0];
			ocalc2.innerHTML = "o-calc";
			ocalc2.href='http://es.o-calc.com';
			nodo.parentNode.insertBefore(ocalc, nodo.parentNode.childNodes[18]);
		}

		var allyTable = document.createElement('table');
		allyTable.width='110';
		allyTable.cellSpacing=0;
		allyTable.cellPadding=0;
		allyTable.id='allyTable';
		var allyName=getScriptConf('allyName');
		var foroAlly=getScriptConf('foroAlly').replace(/;/g, ':');
		var Session=getSession(location.hostname);
		if (allyName=='' || !getScriptConf('allyTable')) allyTable.style['display']='none';
		allyTable.innerHTML=nodo.previousSibling.previousSibling.cloneNode('true').innerHTML + // añadimos la imagen separadora
			(getScriptConf('ATMembers')?'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=4&sort1=3&sort2=0" target="Hauptframe">Miembros <font id="allyName1" color="'+getScriptConf('ATColorN')+'">'+allyName+'</font></a></font></div></td></tr>':'')+
			(getScriptConf('ATTopP')?'<tr><td><div align="center"><font color="#FFFFFF"><a href="stat.php?session=' + Session + '&start=1&sort1=1&sort2=2" target="Hauptframe">Jugadores Top</a></font></div></td></tr>':'')+
			(getScriptConf('ATTopA')?'<tr><td><div align="center"><font color="#FFFFFF"><a href="stat.php?session=' + Session + '&start=1&who=ally" target="Hauptframe">Alianzas Top</a></font></div></td></tr>':'')+
			(getScriptConf('ATForo')?'<tr><td><div align="center"><font color="#FFFFFF"><a id="foroAlly" href='+foroAlly+' target="newwindow">Foro <font id="allyName2" color="'+getScriptConf('ATColorN')+'">'+allyName+'</font></a></font></div></td></tr>':'') +
			(getScriptConf('ATCC')?'<tr id="ATCC"' +(getScriptConf('ATCCPriv')?'':'style="display:none"')+'><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=17" target="Hauptframe">Enviar CC</a></font></div></td></tr>':'') +
			(getScriptConf('ATBaned')?'<tr><td><div align="center"><font color="#FFFFFF"><a href="pranger.php" target="Hauptframe">Baneos</a></font></div></td></tr>':'');
		nodo.parentNode.parentNode.parentNode.appendChild(allyTable);
		
		var coordTable = document.createElement('table');
		coordTable.width='110';
		coordTable.cellSpacing=0;
		coordTable.cellPadding=0;
		coordTable.id='coordTable';
		coordTable.innerHTML = nodo.previousSibling.previousSibling.cloneNode('true').innerHTML +
					"<tr><td><div align='center'><font color='#ffffff'><a onclick='addCoords()' style='cursor:pointer'>+ Coordenadas</a></font></div></td></tr>" +
					"<tr><td><div align='center'><font color='#ffffff'><a onclick='delAll()' style='cursor:pointer'>- Coordenadas</a></font></div></td></tr>" +
					"<tr><td><div align='center'><font color='#ffffff'><a onclick='makeCoordListPage()' style='cursor:pointer'>Lista</a></font></div></td></tr>";
		nodo.parentNode.parentNode.parentNode.appendChild(coordTable);
		
	}

	if (getScriptConf('LMSearch')) {
		var nodo = document.evaluate("/html/body/center/table/tbody/tr/td/div/font[a='Buscar']/..", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (nodo) {
			nodo.innerHTML='';
			
			var formulario = document.createElement('form');
			formulario.setAttribute("action","suche.php?session="+getSession(location.hostname));
			formulario.setAttribute("target","Hauptframe");
			formulario.setAttribute("method","post");
			formulario.heigth='0';
			formulario.innerHTML += '<select name="type"><option value="playername" selected>Jugador</option>' +
								'<option value="planetname" >Planeta</option>' +
								'<option value="allytag" >Etiqueta A.</option>' +
								'<option value="allyname" >Alianza</option></select>';
			nodo.appendChild(formulario);

			var texto = document.createElement('input');
			texto.size='13';
			texto.setAttribute("type","text");
			texto.setAttribute("name","searchtext");
			formulario.appendChild(texto);

			var boton = document.createElement('input');
			boton.setAttribute("type","submit");
			boton.setAttribute("value","Buscar");
			formulario.appendChild(boton);
		}
	}	

	// Hacemos el menu lateral plegable
	var path = '/html/body/center/table/tbody/tr/td';
	var tds = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var j=0;
	for (var i=0; i<tds.snapshotLength; i++) {
		if (tds.snapshotItem(i).firstChild.nodeName=='IMG' || i==tds.snapshotLength-1) {
			if (i!=0) {
				var string='';
				for (var k=j+1; k<i; k++) string = (string==''?string=k:string=[string, k].join(':'));
				if (i==tds.snapshotLength-1) string += ':'+i;
				if (isHidden(j+1)) {
					hide(path, string);
					//tds.snapshotItem(j).setAttribute('onclick', "show('"+path+"', '"+string+"')");
					//tds.snapshotItem(j).title='Click aqui para expandir';
				} else {
					tds.snapshotItem(j).setAttribute('onclick', "hide('"+path+"', '"+string+"')");
					tds.snapshotItem(j).title='Click aqui para contraer';
				}
				tds.snapshotItem(j).style['cursor']='pointer';
			}
			j=i;
		}
	}
}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|         overview.php          |***************/
/*********+-------------------------------+***************/
/*********************************************************/

else if (location.pathname=='/game/overview.php') {
	if (getScriptConf('autoRefreshVisionGeneral')) {
		tiempo1 = Math.round(getScriptConf('autoRefreshVisionGeneral_Time1'));
		tiempo2 = Math.round(getScriptConf('autoRefreshVisionGeneral_Time2'));
		if (tiempo1 < tiempoMinimoRefresco){
			tiempo1 = tiempoMinimoRefresco
		}
		if (tiempo2 < tiempoMinimoRefresco){
			tiempo2 = tiempoMinimoRefresco
		}
		if (tiempo1>tiempo2){
			tiempo=tiempo1;
			tiempo1=tiempo2;
			tiempo2=t;
		}
		tiempo=tiempo1;
		if (tiempo1 != tiempo2){
			tiempo = Math.random();
			tiempo = tiempo * (tiempo2-tiempo1);
			tiempo = tiempo1 + Math.round(tiempo)
		}
		tiempo = tiempo * 1000;
		window.setTimeout(function(){window.location.reload();},tiempo);
	}
	if (getScriptConf('modifyDate')) {
		nodo = document.evaluate("/html/body/center/table[last()]/tbody/tr[th[2]]/th[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		nodo.previousSibling.previousSibling.innerHTML='Hora';
		setMainP(location.hostname, document.getElementsByTagName('option')[0].innerHTML.match(/\[(.*)\]/)[1]);
		try{
			var days = ['Mon', 'Lunes',
				'Tue', 'Martes',
				'Wed', 'Miércoles',
				'Thu', 'Jueves',
				'Fri', 'Viernes',
				'Sat', 'S'+aacento+'bado',
				'Sun', 'Domingo'].join(':');
			var months = ['Jan', 'Enero',
				'Feb', 'Febrero',
				'Mar', 'Marzo',
				'Apr', 'Abril',
				'May', 'Mayo',
				'Jun', 'Junio',
				'Jul', 'Julio',
				'Aug', 'Agosto',
				'Sep', 'Septiembre',
				'Oct', 'Octubre',
				'Nov', 'Noviembre',
				'Dec', 'Diciembre'].join(':');
			var fecha=nodo.innerHTML.match(/(\S\S\S) (\S\S\S) (\d+) (\d+:\d\d:\d\d)/);
			nodo.innerHTML=getConf(fecha[1], 'undefined', days, ':')+' '+fecha[3]+' de '+getConf(fecha[2], 'undefined', months, ':')+', '+fecha[4];
		} catch(e) {}
	}
	
	if (getScriptConf('coordLinker')) {
		function getColorLinker(planet) {
			var mainP = getMainP(location.hostname).split(':');
			var coord = planet.split(':');
			var color = '';
			
			var distancia = 0;
			if (coord[0]!=mainP[0]) {
				distancia = 1000000 + 5000 * (Math.abs(parseInt(coord[0])-parseInt(mainP[0])));
				color = 'red';
			}
			else if (coord[1]!=mainP[1]) {
				distancia = 2700000 + 95000 * (Math.abs(parseInt(coord[1])-parseInt(mainP[1])));
				color = 'orange';
			}
			else if (coord[2]!=mainP[2]) {
				distancia = 20000000 * (Math.abs(parseInt(coord[2])-parseInt(mainP[2])));
				color = 'yellow';
			}
			else {
				distancia = 0;
				color = 'lightblue';
			}
			// eliminar color de los ifs y hacer que el color dependa de la distancia
//			GM_log(distancia);
			return color;
		}
		var session = getSession(location.hostname);
		var texto = document.evaluate("/html/body/center/table[last()]/tbody/tr[@class]/th[2]/span/text()[last()]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var colorVG = getScriptConf('coordLinkerCVG');
		var colorVariable = getScriptConf('coordLinkerVarG');
		for (var i=0; i<texto.snapshotLength; i++) {
			var texto2 = document.createElement('span');
			var texto3 = texto.snapshotItem(i).nodeValue;
			var planets = texto3.match(/\d+:\d+:\d+/g);
			for (var j=0; j<2; j++) {
				var p = planets[j].split(':');
				texto3 = texto3.replace("[" + p[0] + ":" + p[1] + ":" + p[2] + "]", "<a style='color:" +
							(colorVariable?getColorLinker(planets[j]):colorVG) +
							"' href=galaxy.php?session=" + session + 
							"&p1="+p[0]+"&p2="+p[1]+"&p3="+p[2]+">["+p[0]+":"+p[1]+":"+p[2]+"]</a>");
			}
			//GM_log(texto3);
			texto2.innerHTML=texto3;
			texto.snapshotItem(i).parentNode.replaceChild(texto2, texto.snapshotItem(i));		
		}
	}
	//AchicarImagenes();
}

	// Obtengo mis tecnologias
	if (document.baseURI.indexOf('mode=Forschung')!=-1) {
		var response = document.body.innerHTML.replace(/\n/g, '');
		var misTech="";
		var combustion=0;
		var impulso=0;
		var hiper=0;
		
		try {
			var temp = response.match(/gid=109.{0,50}Nivel (\d+)\)/)[1];
		}
		catch(e) {}
		if (temp) misTech+="&techs[0][0][w_t]=" + temp;

		try {
			var temp = response.match(/gid=110.{0,50}Nivel (\d+)\)/)[1];
		}
		catch(e) {}
		if (temp) misTech+="&techs[0][0][s_t]=" + temp;

		try {
			var temp = response.match(/gid=111.{0,50}Nivel (\d+)\)/)[1];
		}
		catch(e) {}
		if (temp) misTech+="&techs[0][0][r_p]=" + temp;
		
		try {
			combustion = response.match(/gid=115.{0,50}Nivel (\d+)\)/)[1];
		}
		catch(e) {}
		
		try {
			impulso = response.match(/gid=117.{0,50}Nivel (\d+)\)/)[1];
		}
		catch(e) {}
		
		try {
			hiper = response.match(/gid=118.{0,50}Nivel (\d+)\)/)[1];
		}
		catch(e) {}
		
		if (misTech!='') GM_setValue('misTech', misTech);
		
		GM_setValue('velocidades', [Math.round(impulso<5?5000*(1+combustion/10):10000*(1+impulso/5)), Math.round(7500*(1+combustion/10)), Math.round(12500*(1+combustion/10)), Math.round(10000*(1+impulso/5)), Math.round(15000*(1+impulso/5)), Math.round(10000*(1+hiper*0.3)), Math.round(2500*(1+impulso/5)), Math.round(2000*(1+combustion/10)), Math.round(100000000*(1+combustion/10)), Math.round(hiper<8?4000*(1+impulso/5):5000*(1+hiper*0.3)), 0, Math.round(5000*(1+hiper*0.3)), Math.round(100*(1+hiper*0.3))].join(':'));
		RemoverDescripcionesColorearRecursos();
		RemoverTecnologiasObsoletas();
		AchicarImagenes1();
	}
//	else if (document.baseURI.indexOf('mode=Forschung')!=-1) && location.pathname=='/game/buildings.php') {
//		}
	else 
	  if (((document.baseURI.indexOf('mode=Flotte')!=-1) && location.pathname=='/game/buildings.php') || 
				(document.baseURI.indexOf('mode=Verteidigung')!=-1)) {
		RemoverDescripcionesColorearRecursos();
		if (getScriptConf('proInputs')) {
			var inputs = document.evaluate("//input[@type='text' or not(@type)]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i=0; i<inputs.snapshotLength; i++) {
				inputs.snapshotItem(i).parentNode.appendChild(document.createElement('br'));
				
				var a = document.createElement("a");
				a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs.snapshotItem(i).name+"')[0];texto.value=999999;texto.onchange();");
				a.innerHTML = "&infin;";
				inputs.snapshotItem(i).parentNode.appendChild(a);

				var a = document.createElement("a");
				a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs.snapshotItem(i).name+"')[0];texto.value++;texto.onchange();");
				a.innerHTML='+';
				inputs.snapshotItem(i).parentNode.appendChild(a);

				var a = document.createElement("a");
				a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs.snapshotItem(i).name+"')[0];if (texto.value>0){ texto.value--;texto.onchange();}");
				a.innerHTML = "&minus;";
				inputs.snapshotItem(i).parentNode.appendChild(a);

				var a = document.createElement("a");
				a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs.snapshotItem(i).name+"')[0];texto.value=0;texto.onchange();");
				a.innerHTML = "&bull;";
				inputs.snapshotItem(i).parentNode.appendChild(a);
			}
		}
		var table = document.evaluate("//table[@width='530']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		if (getScriptConf('expandTables')) {
			table.width = '100%';
		}
		//if (getScriptConf('tinyIMG')) {
		//	var imgs = table.getElementsByTagName('img');
		//	for (var i=0; i<imgs.length; i++) {
		//		imgs[i].setAttribute('height', maxTinyImgHeight);
		//		imgs[i].setAttribute('width', maxTinyImgWidth);
		//	}
		//}
		AchicarImagenes1();
	}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|        resources.php          |***************/
/*********+-------------------------------+***************/
/*********************************************************/

else if (location.pathname=='/game/resources.php') {
	var element = document.evaluate('/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.getElementsByTagName('td');
	//var Metal = parseInt(element[1].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	//var Cristal = parseInt(element[2].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	//var Deut = parseInt(element[3].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var Metal = parseInt(element[1].innerHTML.replace(/\./g, ''));
	var Cristal = parseInt(element[2].innerHTML.replace(/\./g, ''));
	var Deut = parseInt(element[3].innerHTML.replace(/\./g, ''));

	var T_Recursos = document.getElementsByTagName("td");
	var PMetal = T_Recursos[40].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,'');
	var PCristal = T_Recursos[41].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,'');
	var PDeut = T_Recursos[42].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,'');
	//alert(PMetal + ' ' + PCristal + ' '+ PDeut);
	//for(i=30;i<=T_Recursos.length;i+=1) {
	//	alert(i + ' ' + T_Recursos[i].innerHTML);
	//}

	var AlmM = T_Recursos[35].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,'');
	var AlmC = T_Recursos[36].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,'');
	var AlmD = T_Recursos[37].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,'');
	AlmM = AlmM.replace(/k/,'000');
	AlmC = AlmC.replace(/k/,'000');
	AlmD = AlmD.replace(/k/,'000');
	//alert(AlmM + ' ' + AlmC + ' '+ AlmD);

	var XMetal = new Array(3);
	var XCristal = new Array(3);
	var XDeut = new Array(3);
	
	// producción diaria
	XMetal[0] = PMetal * 24;
	XCristal[0] = PCristal * 24;
	XDeut[0] = PDeut * 24;
	// producción semanal
	XMetal[1] = PMetal * 168;
	XCristal[1] = PCristal * 168;
	XDeut[1] = PDeut * 168;
	// producción mensual
	XMetal[2] = PMetal * 720;
	XCristal[2] = PCristal * 720;
	XDeut[2] = PDeut * 720;

	// Buscar Formulario de Recursos
	var ResForm = document.evaluate('//table[@width=500]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

	// Buscar Factor de Produccion
	var Factor = 0;
	try {
		Factor = parseFloat(document.body.innerHTML.match(/Factor[\s\S]+\:\d(.\d+)?/g)[0].split(':')[1])*100;
	} catch (e) {}
	var FactorPorc=parseInt(parseFloat(Factor) * 2.5);
	
	// Agregar tabla de factor de produccion
	if (ResForm) {
		// Buscar Produccion Real
	
		// Procesar Tablas
		var ProdFact = document.createElement('div');
		ProdFact.innerHTML = '<table width="500"><tr>'+
			'<td class="c">Nivel de Producci&oacute;n</td>'+
			'<th>'+Factor+'%</th>'+
			'<th width="250"><div style="border: 1px solid #9999FF; width: 250px;"><div id="prodBar" style="background-color: 		'+(Factor < 100 ? '#C00000' : '#00C000' )+'; width: 0px;">&nbsp;</div></div></th>'+
			'</tr></table><br />';
	
		var CuentaRec = document.createElement('div');
		CuentaRec.innerHTML = '<br /><table width="500">'+
			'<tr><td class="c" colspan="4">Producción extendida</td></tr>'+
			'<tr><th>&nbsp;</th>'+
			'<td class="c" align=center>Diaria</td>'+
			'<td class="c" align=center>Semanal</td>'+
			'<td class="c" align=center>Mensual</td>'+
			'</tr><tr>'+
			'<td class="c" align=center>Metal</td>'+
			'<th><font color="#00ff00">'+puntuar(XMetal[0])+'</font></th>'+
			'<th><font color="#00ff00">'+puntuar(XMetal[1])+'</font></th>'+
			'<th><font color="#00ff00">'+puntuar(XMetal[2])+'</font></th>'+
			'</tr><tr>'+
			'<td class="c" align=center>Cristal</td>'+
			'<th><font color="#00ff00">'+puntuar(XCristal[0])+'</font></th>'+
			'<th><font color="#00ff00">'+puntuar(XCristal[1])+'</font></th>'+
			'<th><font color="#00ff00">'+puntuar(XCristal[2])+'</font></th>'+
			'</tr><tr>'+
			'<td class="c" align=center>Deuterio</td>'+
			'<th><font color="#00ff00">'+puntuar(XDeut[0])+'</font></th>'+
			'<th><font color="#00ff00">'+puntuar(XDeut[1])+'</font></th>'+
			'<th><font color="#00ff00">'+puntuar(XDeut[2])+'</font></th>'+
			'</tr></table><br />';

		var EAlmM=(Metal / AlmM) * 100;
		var EAlmMPorc=parseInt((Metal / AlmM) * 250);
		var EAlmC=(Cristal / AlmC) * 100;
		var EAlmCPorc=parseInt((Cristal / AlmC) * 250);
		var EAlmD=(Deut / AlmD) * 100;
		var EAlmDPorc=parseInt((Deut / AlmD) * 250);

		EAlmM = Math.round(EAlmM);
		EAlmC = Math.round(EAlmC);
		EAlmD = Math.round(EAlmD);

		CuentaRec.innerHTML += '<table width="500">'+
			'<tr><td class="c" colspan="3">Estado de los Almacenes</td></tr>'+
			'<tr>'+
			'<td class="c" align=center>Metal</td>'+
			'<th>'+EAlmM+'%</th>'+
			'<th width="250"><div style="border: 1px solid #9999FF; width: 250px;"><div id="AlmMBar" style="background-color: '+(EAlmM > 100 ? '#C00000' : '#00C000' )+'; width: 0px;">&nbsp;</div></div></th>'+
			'</tr>'+
			'<tr>'+
			'<td class="c" align=center>Cristal</td>'+
			'<th>'+EAlmC+'%</th>'+
			'<th width="250"><div style="border: 1px solid #9999FF; width: 250px;"><div id="AlmCBar" style="background-color: '+(EAlmC > 100 ? '#C00000' : '#00C000' )+'; width: 0px;">&nbsp;</div></div></th>'+
			'</tr>'+
			'<tr>'+
			'<td class="c" align=center>Deuterio</td>'+
			'<th>'+EAlmD+'%</th>'+
			'<th width="250"><div style="border: 1px solid #9999FF; width: 250px;"><div id="AlmDBar" style="background-color: '+(EAlmD > 100 ? '#C00000' : '#00C000' )+'; width: 0px;">&nbsp;</div></div></th>'+
			'</tr>'+
			'</table><br />';

		ResForm.parentNode.insertBefore(CuentaRec, ResForm.nextSibling);
		ResForm.parentNode.insertBefore(ProdFact, ResForm);
		document.body.innerHTML = document.body.innerHTML.replace(/factor de producci(.)+n\:(.)*[0-9.]/gi,'');
		
		
		if (getScriptConf('specialEffects')) {
			function fillBar(ids, percents, max) {
				idList = ids.split(':');
				perList = percents.split(':');
				var continuar = false;
				for (var i=0; i<idList.length; i++) {
					var bar = document.getElementById(idList[i]);
					var width = parseInt(bar.style['width'].split('px')[0]);
					if (width<perList[i]*max/100) {
						bar.style['width'] = String(width+Math.max(perList[i]*max/5000,1)) + 'px';
						bar.style['opacity'] = 1.0-(perList[i]/100-width/max);
//						GM_log(idList[i]+' '+width);
						continuar = true;
					}
				}
				if (continuar) setTimeout('fillBar("'+ids+'", "'+percents+'", '+max+')', 30);
			}
		}
		else {
			function fillBar(ids, percents, max) {
				idList = ids.split(':');
				perList = percents.split(':');
				for (var i=0; i<idList.length; i++) {
					var bar = document.getElementById(idList[i]);
					bar.style['width'] = String(perList[i]*max/100) + 'px';
				}
			}
		}
		unsafeWindow.fillBar = fillBar;
		setTimeout('fillBar("'+["prodBar","AlmMBar","AlmCBar", "AlmDBar"].join(":")+'", "'+[Math.min(Factor, 100),Math.min(EAlmM, 100),Math.min(EAlmC, 100),Math.min(EAlmD, 100)].join(":")+'", 250)', 100);
	}
}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|         flotten1.php          |***************/
/*********+-------------------------------+***************/
/*********************************************************/

else if (location.pathname=='/game/flotten1.php') {
	var element = document.evaluate('/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.getElementsByTagName('td');
	var metal = parseInt(element[1].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var cristal = parseInt(element[2].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var deuterio = parseInt(element[3].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var recursos = metal + cristal + deuterio;
	
	function calculate() {
		var capacity=0;
		var speed=0;
		var consumption=0;
		for(i=minShip; i<maxShip+1; i++){
			x=document.getElementsByName("ship"+i);
			y=document.getElementsByName("capacity"+i);
			u=document.getElementsByName("speed"+i);
			v=document.getElementsByName("consumption"+i);
			if(x.length && y.length && x[0].value!=''){
				shipCount=parseInt(x[0].value, 10);
				shipCapacity=parseInt(y[0].value, 10);
				shipSpeed=parseInt(u[0].value, 10);
				shipConsumption=parseInt(v[0].value, 10);
				capacity+=shipCount*shipCapacity;
				if((speed > shipSpeed || speed == 0) && shipCount>0 ) speed=shipSpeed;
				consumption +=shipCount*shipConsumption;
			}
		}
		if(recursos>capacity){
			surstr = puntuar(recursos-capacity);
			var cp = 0;
			var cg = 0;
			try {cp = document.getElementsByName('maxship202')[0].value}
			catch (e) {}
			try {cg = document.getElementsByName('maxship203')[0].value}
			catch (e) {}
			surstr += '&nbsp;&nbsp;<font color="orangered" title="Cargueros pequeños"> CP: ' +
						puntuar(Math.ceil((recursos-capacity)/5000)) +
						(capacity==0?' (' + cp + ')':'') + '</font>' +
						'&nbsp;&nbsp;<font color="orange" title="Cargueros grandes"> CG: ' +
						puntuar(Math.ceil((recursos-capacity)/25000)) +
						(capacity==0?' (' + cg + ')':'') + '</font>';
		} else {
			surstr='0';
		}
		infoRow.innerHTML = '<font color="#9999FF">Recursos restantes: ' + surstr + '</font>' +
			  (capacity>0?'&nbsp;&nbsp;<font color="#00FF66">Capacidad: '	+ puntuar(capacity) + '</font>':'');
		//res = res + '<br /><font color="lightblue">Velocidad máx: ' + puntuar(speed) + '</font>' +
		//			'&nbsp;&nbsp;<font color="#77bb22">Consumo: ' + puntuar(consumption) + '</font>':'');

	}

	if (getScriptConf('flottenInfo')) {
		unsafeWindow.calculate = calculate;
	
		var infoRow = document.getElementsByTagName('tr');
		var as = infoRow[infoRow.length-3].getElementsByTagName('a');
		for (var i=0; i<as.length; i++)
			as[i].setAttribute('onclick', 'setTimeout(calculate, 20)');
		//alert(ir.innerHTML);
		infoRow = infoRow[infoRow.length-11].firstChild;
		calculate();
//		document.getElementsByTagName('tbody')[4].setAttribute('onchange', 'alert(1)');
		for(i=minShip; i<maxShip+1; i++){  // quiza se podria reducir los bucles de busqueda cogiendo directamente esa columna
			x=document.getElementsByName("ship"+i);
			if(x.length){
				x[0].addEventListener('keyup',calculate,true);
				x[0].parentNode.previousSibling.previousSibling.firstChild.setAttribute('onclick', 'setTimeout(calculate, 20)');
				x[0].setAttribute('onchange', "this.value=parseInt(Math.min(parseInt('0'+this.value, 10), parseInt(getElementsByName('max'+this.name)[0].value, 10)),10);setTimeout(calculate, 10)");
			}
		}
	}
	
	if (getScriptConf('proInputs')) {
		var cells = document.evaluate("/html/body/center[2]/form/table/tbody/tr/th[a='m"+aacento+"x']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i=0; i<cells.snapshotLength; i++) {
			var ship = cells.snapshotItem(i).firstChild.href.match(/ship\d+/)[0];
			cells.snapshotItem(i).innerHTML='';

			var a = document.createElement("a");
			a.setAttribute("href", "javascript:var texto=document.getElementsByName('" + ship +
						"')[0]; maxShip('" + ship + "');texto.onchange();");
			a.innerHTML = "&infin;";
			cells.snapshotItem(i).appendChild(a);

			var a = document.createElement("a");
			a.setAttribute("href", "javascript:var texto=document.getElementsByName('" + ship +
						"')[0]; texto.value++; texto.onchange();");
			a.innerHTML='+';		
			cells.snapshotItem(i).appendChild(a);

			var a = document.createElement("a");
			a.setAttribute("href", "javascript:var texto=document.getElementsByName('" + ship +
						"')[0];if (texto.value>0){ texto.value--;texto.onchange();}");
			a.innerHTML = "&minus;";
			cells.snapshotItem(i).appendChild(a);

			var a = document.createElement("a");
			a.setAttribute("href", "javascript:var texto=document.getElementsByName('" + ship +
						"')[0]; texto.value=0; texto.onchange();");
			a.innerHTML = "&bull;";
			cells.snapshotItem(i).appendChild(a);
  		}
	}
}
/*********************************************************/
/*********+-------------------------------+***************/
/*********|         flotten2.php          |***************/
/*********+-------------------------------+***************/
/*********************************************************/
else if (location.pathname=='/game/flotten2.php') {
	if (getScriptConf('preDest') && GM_getValue('coordList_'+server, '')!='') {
		var pos = document.evaluate("/html/body/form/center/table/tbody/tr[td[@class]]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		pos = pos.snapshotItem(pos.snapshotLength-1);

		var row = document.createElement( 'TR' );
		var cell = document.createElement( 'TD' );
		cell.colSpan = 2;
		cell.className = 'c';
		row.appendChild(cell);
		cell.innerHTML = 'Destinos guardados';
		
		pos.parentNode.insertBefore(row, pos);

		var locs = GM_getValue('coordList_'+server, '').split('^');
		var len = locs.length;
		for(i=0; i<len; i++) {
			x = locs[i];
			arr = x.split('|');
			
			cell = document.createElement('TH');
			var coords = arr[0].split(':');
			var link = document.createElement('A');
			link.href = 'javascript:setTarget('+coords[0]+','+coords[1]+','+coords[2]+',1); shortInfo()';				
			link.appendChild(document.createTextNode(arr[1]+' '+arr[0]));
			cell.appendChild(link);
			if(i%2==0)
				row = document.createElement('TR');
			else
				pos.parentNode.insertBefore(row, pos);
			row.appendChild(cell);
		}
		if (len%2==1) {
			row.appendChild(document.createElement('th'));
			pos.parentNode.insertBefore(row, pos);
		}
	}
}


/*********************************************************/
/*********+-------------------------------+***************/
/*********|         galaxy.php            |***************/
/*********+-------------------------------+***************/
/*********************************************************/

else if (location.pathname=='/game/galaxy.php') {
	var colspan = document.getElementsByTagName('table')[3].getElementsByTagName('td')[0].colSpan;
	var galaxy = document.getElementsByName('galaxy')[0].value;
	var system = document.getElementsByName('system')[0].value;
	
	if(getScriptConf('preDest')) {
		var planets = document.evaluate("/html/body/center/table/tbody/tr[th[2]/a]/th[position()=1 or position()=last()-5]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i=0; i<planets.snapshotLength-1; i+=2) {
			var planet = planets.snapshotItem(i).getElementsByTagName('a')[0];
			var name = planets.snapshotItem(i+1).getElementsByTagName('a');
			if (name[0]) name = name[0].innerHTML.replace(/\n/g, '');
			else name = planets.snapshotItem(i+1).innerHTML.replace(/\n/g, '');
			planet.setAttribute('onclick', 'if (addCoords("'+[galaxy, system, planet.innerHTML].join(':')+'", "'+ name+'")) {this.style["color"]="'+getScriptConf('PDGColor')+'";this.title="Destino guardado"}');
			if (searchCoords([galaxy, system, planet.innerHTML].join(':'))) {
				planet.style['color']=getScriptConf('PDGColor');
				planet.title='Destino guardado';
			}
			else {
				planet.title='Guardar destino';
			}
		}
	}
	if (getScriptConf('debris')) {
		element = document.evaluate("//center/table/tbody/tr[th[position()=1 and child::a[2]]]/th[last()-3]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i=0; i<element.snapshotLength; i++) {
			escombros=element.snapshotItem(i).parentNode.cells[0].getElementsByTagName('a')[1].title.replace(/\./g, '').match(/\d+/g);
			//alert(element.snapshotItem(i).parentNode.cells[0].getElementsByTagName('a')[0].innerHTML+'. Metal -> '+parseInt(escombros[0],10)+' Cristal -> ' + parseInt(escombros[1],10))
			escombros=parseInt(escombros[0],10)+parseInt(escombros[1],10);
			if (escombros>parseInt(getScriptConf('debrisMin'))) {
				var color=Math.min(Math.round(escombros/parseInt(getScriptConf('debrisMax'))*100),100);
				var color2 = getScriptConf('debrisColor');
				var red=parseInt(color2.substr(1,2), 16);
				red=Math.round(256-(256-red)*color/100);
				var green=parseInt(color2.substr(3,2), 16);
				green=Math.round(256-(256-green)*color/100);
				var blue=parseInt(color2.substr(5,2), 16);
				blue=Math.round(256-(256-blue)*color/100);
				//alert('rojo-> '+red+'\n verde-> '+green+'\n azul-> '+blue)
				element.snapshotItem(i).setAttribute('style',"background-color: rgb("+red+","+green+","+blue+"); background-image: none;");
			}
		}
	}

	if (getScriptConf('allyTags')) {
		var allys = document.evaluate("//center/table/tbody/tr/th[last()-1]/a | /html/body/div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var tags = GM_getValue('allyTags', defAllyTags).split(':x:');
		var tags2='';
		for (var i=0; i<tags.length; i++) {
			tags2+=tags[i].split(':y:')[2]+(i==tags.length-1?'':'|');
		}
		tags2=tags2.replace(/([\.\[\]\(\)\{\}\$])/g,'\\$1');
		for (var i=0; i<allys.snapshotLength; i++) {
			var ally='';
			try {
				ally=allys.snapshotItem(i).innerHTML.match(new RegExp('(Alianza |   )('+tags2+')( en la| $)', 'i'))[2];
			}
			catch (e) {}
			if (ally) {
				var color = '';
				var color2 = '';
				var etiquetas = '';
				for (var j=0; j<tags.length; j++) {
					tags3=tags[j].split(':y:');
					if (tags3[2].match(ally.replace(/([\.\[\]\(\)\{\}\$])/g,'\\$1'), 'i')) {
						color = tags3[1];
						if (tags3[0]!='') etiquetas+="<font color="+color+" >("+tags3[0]+")</font>";
						else color2=color;
					}
				}
				allys.snapshotItem(i).innerHTML=allys.snapshotItem(i).innerHTML.replace(new RegExp('(Alianza |   )('+ally+')( en la| $)', 'i'),
					'$1<font color='+(color2!=''?color2:color)+'>$2</font> '+etiquetas+'$3');
			}
		}
	}

	if (getScriptConf('coordLinker')) {
		try {
			var planeta = location.href.match(/&p3=(\d+)/);
		} catch(e){}
		if (planeta) {
			var link = document.evaluate("/html/body/center/table/tbody/tr/th[a='"+planeta[1]+"']/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			link.style['color']=getScriptConf('coordLinkerCG');
			GM_setValue("coordLinkerPlanet", '')
		}
	}
	
	if (getScriptConf('galaxyTool')) {
		var nodo = document.createElement('a');
		nodo.innerHTML='GT';
		document.getElementsByTagName('table')[0].childNodes[1].childNodes[2].childNodes[1].appendChild(nodo);

		var rows=document.evaluate('/html/body/center/table/tbody/tr/th/a/../..', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var content='';
		for (var i=0; i<15; i++) {
			var cells = rows.snapshotItem(i).cells;
			var c = cells.length;
			var cel1=cells[0].getElementsByTagName('a');
			content+=cel1[0].innerHTML+'|';  // añadimos la posicion

			if (c==7) {
				var pName=cells[c-6].getElementsByTagName('a');
				if (pName[0]) pName=pName[0].innerHTML;
				else pName=cells[c-6].innerHTML;
			}
			else var pName=cells[c-6].innerHTML;
			if (pName=='\nPlaneta destruido') { // si hay un planeta destruido
				content+='[Planeta destruido]|0|';
				if (cel1[1])	// si tiene escombros
					content+=cel1[1].title.replace(/\./g, '').match(/\d+/g).join('|')+'||||0';
				else
					content+='0|0||||0';
			}
			else if (pName.replace(/\s/, '')!='') { // si no hay nombre de planeta no tiene sentido comprobar el resto de campos
				content+=pName.replace('</a>', '').replace(/<a .*>/, '').split('&nbsp')[0].replace(/\s/, '').replace(/\n/, '')+'|'; // añadimos el planeta
				var moon = cells[c-5].getElementsByTagName('img');
				if (moon[0]) content+=parseInt(moon[0].alt.split(': ')[1]); // añadimos el tamaño de la luna si la hay
				content+='|';
				if (cel1[1]) // he descubierto que los escombros tb aparecen aqui, que es mas comodo cogerlos
					content+=cel1[1].title.replace(/\./g, '').match(/\d+/g).join('|')+'|';
				else content+='||';
				var player = cells[c-3].getElementsByTagName('span'); // añadimos el nombre del jugador
				content+=player[0].innerHTML+'|';
				for (var j=1; j<player.length; j++) content+=player[j].innerHTML; // añadimos los estados del jugador
				content+='|';
				var ally = cells[c-2].getElementsByTagName('font');
				if (!ally[0]) {
					ally = cells[c-2].getElementsByTagName('span');
					if (!ally[0])
						ally = cells[c-2].getElementsByTagName('a');
				}
				if (ally[0]) content+=ally[0].innerHTML.replace(/\n+/,'').replace(/^\s+/, '').replace(/\s+$/, '');
				content+='|';
				pId=parseInt(cells[c-1].innerHTML.replace(/\n/g, '').replace(/.*messageziel=(\d+).*/, '$1'), 10);
				content+=(isNaN(pId)?'0':pId);
			}
			else content+='|0|0|0||||0';
			content+=(i<14?'\n':'');
		}
		var solar_system = document.evaluate('/html/body/center/table/tbody/tr/td/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.nodeValue.replace(/\s/, '');
		sendGTool(nodo, 'galaxy&galaxy='+galaxy+'&system='+system, encodeURIComponent(solar_system+'\n\n'+content));
	}
	AchicarImagenes3();
}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|             stat.php          |***************/
/*********+-------------------------------+***************/
/*********************************************************/
else if (location.pathname=='/game/stat.php') {
	if (getScriptConf('allyTags')) {
		var allys = document.evaluate("//center/table/tbody/tr/th["+(document.getElementsByName('who')[0].selectedIndex=='0'?'4]':'2]/a'), document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		var tags = GM_getValue('allyTags', defAllyTags).split(':x:');
		var tags2='';
		for (var i=0; i<tags.length; i++) {
			tags2+=tags[i].split(':y:')[2]+(i==tags.length-1?'':'|');
		}
		tags2=tags2.replace(/([\.\[\]\(\)\{\}\$])/g,'\\$1');
		for (var i=0; i<allys.snapshotLength; i++) {
			var ally='';
			try {
				ally=allys.snapshotItem(i).innerHTML.match(new RegExp('^('+tags2+')$', 'i'))[1];
			}
			catch (e) {}
			if (ally) {
				var color = '';
				var color2 = '';
				var etiquetas = '';
				for (var j=0; j<tags.length; j++) {
					tags3=tags[j].split(':y:');
					if (tags3[2].match(ally.replace(/([\.\[\]\(\)\{\}\$])/g,'\\$1'), 'i')) {
						color = tags3[1];
						if (tags3[0]!='') etiquetas+="<font color="+color+" >("+tags3[0]+")</font>";
						else color2=color;
					}
				}
				allys.snapshotItem(i).innerHTML=allys.snapshotItem(i).innerHTML.replace(new RegExp('^('+ally+')$', 'i'),
					'<font color='+(color2!=''?color2:color)+'>$1</font> '+etiquetas);
			}
		}
	}
	if (getScriptConf('galaxyTool')) {
		var who = document.getElementsByTagName('select')[1];
		var what = document.getElementsByTagName('select')[2];
//		var content=document.getElementsByTagName("table")[5].innerHTML;
		var nodo=document.createElement('a');
		nodo.innerHTML='GT';
		who.parentNode.insertBefore(nodo, who.parentNode.lastSibling);
		
		var ranks='';
		var players='';
		var pIds='';
		var allys='';
		var points='';
		var members='';

		var ranksN=document.evaluate("/html/body/center[2]/table/tbody/tr/th[1]/text()[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var pointsN=document.evaluate("/html/body/center[2]/table/tbody/tr/th[5]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (who.selectedIndex=='0') {
			var playersN=document.evaluate("/html/body/center[2]/table/tbody/tr/th[2]//text()[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var pIdsN=document.evaluate("/html/body/center[2]/table/tbody/tr/th[3]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var allysN=document.evaluate("/html/body/center[2]/table/tbody/tr/th[4]//text()[..=.]/.. | /html/body/center[2]/table/tbody/tr/th[position()=4 and .='']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			for (var i=0; i<100; i++) {
				ranks+=(i==0?'&ranks=':'|')+parseInt(ranksN.snapshotItem(i).nodeValue);
				players+=(i==0?'&players=':'|')+playersN.snapshotItem(i).nodeValue;
				pIds+=(i==0?'&pIds=':'|');
				try {
					pIds+=pIdsN.snapshotItem(i).innerHTML.match(/messageziel=(\d+)/m)[1];
				}
				catch (e) {}
				allys+=(i==0?'&alliances=':'|')+allysN.snapshotItem(i).innerHTML;
				points+= (i==0?'&points=':'|')+pointsN.snapshotItem(i).innerHTML;
			}
		}
		else {
			var membersN=document.evaluate("/html/body/center[2]/table/tbody/tr/th[4]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var allysN=document.evaluate("/html/body/center[2]/table/tbody/tr/th[2]//text()[..=.]/.. | /html/body/center[2]/table/tbody/tr/th[position()=4 and .='']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			for (var i=0; i<100; i++) {
				ranks+=(i==0?'&ranks=':'|')+ranksN.snapshotItem(i).nodeValue;
				members+=(i==0?'&members=':'|')+membersN.snapshotItem(i).innerHTML;
				allys+=(i==0?'&alliances=':'|')+allysN.snapshotItem(i).innerHTML;
				points+= (i==0?'&points=':'|')+pointsN.snapshotItem(i).innerHTML;
			}		
		}
		sendGTool(nodo, 'stats&who=' + who.selectedIndex + '&what=' + what.selectedIndex, encodeURIComponent([ranks, players, pIds, allys, members, points].join('')));
	}
	if (getScriptConf('enhanceStatics')) {
		var pagina = document.getElementsByTagName('th');
		for (var i = 0; i < pagina.length; i++) {
			evento = pagina[i].innerHTML;
			if (evento.substr(0,2) != '<t'){
				pos=evento.search('this.T_WIDTH=30;return escape');
				if (pos != -1){
					pos=evento.search('\">');
					if(pos != -1 ) {
						mystring = evento.substr(pos+3,10);
						pos = mystring.search('<');
						if (pos != -1){
							mystring=mystring.substr(0,pos);
							mystring2 = pagina[i].childNodes[1].firstChild.innerHTML;
							ch = mystring2.substr(mystring2.length-1, 1);
							mystring2 = mystring2.substr(0, mystring2.length-1);
							if (ch=="+"){
							  ch2="&uarr;";
							}else
							{
							  ch2="&darr;";
							};
							pagina[i].childNodes[1].firstChild.innerHTML = mystring2+ch2+mystring;
						}
					}
				}
			}
		}
	}
}

else if (location.pathname=="/game/allianzen.php") {
	if ((document.URL.search('a=4')>-1) && getScriptConf('galaxyTool')) {
		var nodo=document.createElement('a');
		nodo.innerHTML='GT';
		var tabla = document.getElementsByTagName("table")[4];
		tabla.parentNode.insertBefore(nodo, tabla);
		sendGTool(nodo, "allyhistory", encodeURIComponent(tabla.innerHTML));
	}
	else if (getScriptConf('allyTable') && (document.URL.search('a=17')==-1)) {
		var nodo = document.evaluate('/html/body/center/table/tbody/tr[th="P"+aacento+"gina principal"]/th[2]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (nodo) {
			setScriptConf('foroAlly', nodo.innerHTML.replace(/:/g, ';'));
			window.parent.frames[0].document.getElementById('foroAlly').href=nodo.innerHTML;
		}
		nodo = document.evaluate('/html/body/center/table/tbody/tr[th="Etiqueta"]/th[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (nodo) {
			setScriptConf('allyName', nodo.innerHTML);
			window.parent.frames[0].document.getElementById('allyName1').innerHTML=nodo.innerHTML;
			window.parent.frames[0].document.getElementById('allyName2').innerHTML=nodo.innerHTML;
		}
		nodo = document.evaluate('/html/body/center/table/tbody/tr[th="Correo circular"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (nodo) {
			setScriptConf('ATCCPriv', true);
			window.parent.frames[0].document.getElementById('ATCC').style['display']='';
		}
		else {
			setScriptConf('ATCCPriv', false); // tag
			window.parent.frames[0].document.getElementById('ATCC').style['display']='none';
		}
		window.parent.frames[0].document.getElementById('allyTable').style['display']='';
	}
}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|         messages.php          |***************/
/*********+-------------------------------+***************/
/*********************************************************/
else if (location.pathname=='/game/messages.php') {
	// Funcion para parsear los strings
	function parse(nodo) {
		cad = nodo.innerHTML; 
		// defensa
		if (cad=='Lanzamisiles') return "&numunits[1][0][ra]=" + nodo.nextSibling.innerHTML;
		if (cad=='L'+aacento+'ser pequeño') return "&numunits[1][0][l_l]="  + nodo.nextSibling.innerHTML;
		if (cad=='L'+aacento+'ser grande') return "&numunits[1][0][s_l]="  + nodo.nextSibling.innerHTML;
		if (cad=='Cañón Gauss') return "&numunits[1][0][g]="  + nodo.nextSibling.innerHTML;
		if (cad=='Cañón iónico') return "&numunits[1][0][i]="  + nodo.nextSibling.innerHTML;
		if (cad=='Cañón de plasma') return "&numunits[1][0][p]="  + nodo.nextSibling.innerHTML;
		if (cad=='Cúpula pequeña de protección') return "&numunits[1][0][k_s]="  + nodo.nextSibling.innerHTML;
		if (cad=='Cúpula grande de protección') return "&numunits[1][0][g_s]="  + nodo.nextSibling.innerHTML;
		// flota
		if (cad=='Nave pequeña de carga') return "&numunits[1][0][k_t]=" + nodo.nextSibling.innerHTML;
		if (cad=='Nave grande de carga') return "&numunits[1][0][g_t]=" + nodo.nextSibling.innerHTML;
		if (cad=='Cazador ligero') return "&numunits[1][0][l_j]=" + nodo.nextSibling.innerHTML;
		if (cad=='Cazador pesado') return "&numunits[1][0][s_j]=" + nodo.nextSibling.innerHTML;
		if (cad=='Crucero') return "&numunits[1][0][kr]=" + nodo.nextSibling.innerHTML;
		if (cad=='Nave de batalla') return "&numunits[1][0][sc]=" + nodo.nextSibling.innerHTML;
		if (cad=='Colonizador') return "&numunits[1][0][ko]=" + nodo.nextSibling.innerHTML;
		if (cad=='Reciclador') return "&numunits[1][0][re]=" + nodo.nextSibling.innerHTML;
		if (cad=='Sonda de espionaje') return "&numunits[1][0][sp]=" + nodo.nextSibling.innerHTML;
		if (cad=='Bombardero') return "&numunits[1][0][bo]=" + nodo.nextSibling.innerHTML;
		if (cad=='Satélite solar') return "&numunits[1][0][so]=" + nodo.nextSibling.innerHTML;
		if (cad=='Destructor') return "&numunits[1][0][z]=" + nodo.nextSibling.innerHTML;
		if (cad=='Estrella de la muerte') return "&numunits[1][0][t]=" + nodo.nextSibling.innerHTML;
		// tecnologias
		if (cad=='Tecnología militar') return "&techs[1][0][w_t]=" + nodo.nextSibling.innerHTML;
		if (cad=='Tecnología de defensa') return "&techs[1][0][s_t]=" + nodo.nextSibling.innerHTML;
		if (cad=='Tecnología de blindaje') return "&techs[1][0][r_p]=" + nodo.nextSibling.innerHTML;
	} // parse()

	function getOptions(node) {
		// Declaracion de las variables
		var coord = "";
		// recursos
		var metal=0;
		var cristal=0;
		var deuterio=0;
		
		var tecnologias="";
		var defensas="";
		var flota="";
		
		// Empieza el codigo
		elementos = node.getElementsByTagName('table');
		if (elementos[0].firstChild.childNodes[4]) {
			metal=elementos[0].firstChild.childNodes[2].childNodes[1].innerHTML;
			cristal=elementos[0].firstChild.childNodes[2].childNodes[4].innerHTML;
			deuterio=elementos[0].firstChild.childNodes[4].childNodes[1].innerHTML;
			coord=elementos[0].firstChild.firstChild.firstChild.innerHTML.split("[")[1].split("]")[0];
		}
		if (elementos.length>=2) {	// Hay flota
			flotaNodes = elementos[1].firstChild.getElementsByTagName('tr');
			for (var k=1; k<flotaNodes.length; k++) {
				flotaNodes2 = flotaNodes[k].getElementsByTagName('td');
				for (j=0; j<flotaNodes2.length; j++) {
					flota+=parse(flotaNodes2[j]);
				}
			}
			if (elementos.length>=3) {	// Hay defensa
				defensaNodes = elementos[2].firstChild.getElementsByTagName('tr');
				for (var k=1; k<defensaNodes.length; k++) {
					defensaNodes2 = defensaNodes[k].getElementsByTagName('td');
					for (j=0; j<defensaNodes2.length; j++) {
						defensas+=parse(defensaNodes2[j]);
					}
				}
				if (elementos.length==5) {	// Hay investigaciones
					techNodes = elementos[4].firstChild.getElementsByTagName('tr');
					for (var k=1; k<=3&&k<techNodes.length; k++) {
						techNodes2 = techNodes[k].getElementsByTagName('td');
						for (var j=0; j<techNodes2.length; j++) {
							tecnologias+=parse(techNodes2[j]);
						}
					}
				}
			}
		}
		var opts = "&v_planet=" + coord;
		opts += "&v_met=" + metal;
		opts += "&v_kris=" + cristal;
		opts += "&v_deut=" + deuterio;
		opts += tecnologias;
		opts += defensas + flota;
		return opts;
	} //getOptions
	//element = document.getElementsByTagName('table')[6];
	//alert(element.innerHTML);
	element = document.getElementsByTagName('table')[6].getElementsByTagName('tr');
	var colorMens = getScriptConf("colorMens");
	var autoMark = getScriptConf("autoMark");
	var coordLinker = getScriptConf("coordLinker");
	for (i=2; i<element.length-3;i++) {
		var element2 = element[i].getElementsByTagName('th')[3];
		if (element2) {
			if (element2.firstChild.nodeName=="SPAN") {
				element2 = element2.firstChild;
				if (element2.className == "espionagereport") {
					element3 = element[i+1];
					if (getScriptConf('dragoSim')) {
						opciones = getOptions(element3.childNodes[2]);
						target = "";
						target = "target='nueva'";  // comentar esta linea para que se abra en la misma pagina
						accion = "http://drago-sim.com/index.php?style=g3ck0&lang=spanish&template=Standard";
						element3.childNodes[1].innerHTML += "<center><a title='Analizar en Drago-Sim' href=\"" + accion + GM_getValue('misTech', '') + opciones + "\" " + target + "><img src=\"http://drago-sim.com/favicon.ico\"</img></a></center>";
					}
					if (getScriptConf('galaxyTool'))
						element3.childNodes[1].innerHTML += "<br><center><a style='cursor:pointer' title='Compartir informe via GalaxyTool' onclick=\"sendGTool(this, 'reports', '"+encodeURIComponent(element3.innerHTML)+"')\">GT</a></center>";
 					//var rec = element3.childNodes[2].innerHTML.replace(/\n/g, '').match(/(Metal|Cristal|Deuterio):<\/td><td>-?\d+/g);
 					var rec = element3.childNodes[2].innerHTML.replace(/\n/g, '').match(/(Metal|Cristal|Deuterio):<\/td><td>-?(\d{1,3}[\.\d{3}]*)/g);
 					//var recTotal = parseInt(rec[0].match(/\d+/)) + parseInt(rec[1].match(/\d+/)) + parseInt(rec[2].match(/\d+/));
 					//var recTotal = 0;
 					//t = (rec[0].match(/\d{1,3}[\.\d{3}]*/)).replace(/./g,'');
 					//var t = '';
 					//t = (rec[0].match(/\d{1,3}[\.\d{3}]*/)).toString().replace(/\./g,'');
 					//t2 = t2.replace(/\./g,'');
 					//alert(t);
 					recTotal = parseInt((rec[0].match(/\d{1,3}[\.\d{3}]*/)).toString().replace(/\./g,''))+
 							   parseInt((rec[1].match(/\d{1,3}[\.\d{3}]*/)).toString().replace(/\./g,''))+
 							   parseInt((rec[2].match(/\d{1,3}[\.\d{3}]*/)).toString().replace(/\./g,''));
 					// + parseInt(RemovePoint(rec[1].match(/(\d{1,3}[\.\d{3}]*)/))) + parseInt(RemovePoint(rec[2].match(/(\d{1,3}[\.\d{3}]*)/)));
					//alert(recTotal);
					if (autoMark) {
						var marcar = getScriptConf("AMEspP")|recTotal<getScriptConf("AMEspPRecMin");
						element2.parentNode.parentNode.childNodes[1].firstChild.checked=marcar;
					}
					//if (recTotal/50000>getScriptConf('MinTransG')) {}
					//if (recTotal/10000>getScriptConf('MinTransP')) {}
				}
			}
			else if (colorMens || autoMark) {
				if (element2.previousSibling.previousSibling.innerHTML=='Orden de la flota ') {
					if (element2.innerHTML=='Ataque con misiles') {
						if (colorMens)
							element2.innerHTML = "<font color='"+getScriptConf("colorMisiles")+ "'>" + element2.innerHTML + "</font>";
						if (autoMark)
							element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMMisiles"));
					}
					else if (element2.innerHTML=='Llegada a un planeta') {
						if (colorMens)
							element2.innerHTML = "<font color='"+getScriptConf("colorTrans")+ "'>" + element2.innerHTML + "</font>";
						if (autoMark)
							element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMTrans"));
					}
					else if (element2.innerHTML=='Retorno de una flota') {
						if (colorMens)
							element2.innerHTML = "<font color='"+getScriptConf("colorTransR")+ "'>" + element2.innerHTML + "</font>";
						if (autoMark)
							element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMTransR"));
					}
					//else if (element2.innerHTML.search('orange')!='-1') { // espionaje, ya se mira antes junto con el drago-sim }
				}
				else if (element2.previousSibling.previousSibling.innerHTML=='Ordenes de la flota ') {
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMAttack"));
				}
				else if (element2.previousSibling.previousSibling.innerHTML=='Flota ') {
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorRec")+"')>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMRec"));
				}
				else if (element2.previousSibling.previousSibling.innerHTML=='Control del espacio ') {
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorEsp")+"'>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMEsp"));
				}
				else if (element2.previousSibling.previousSibling.innerHTML=='Colonizadores ') {
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorColo")+"'>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMColo"));
				}
				else if (element2.previousSibling.previousSibling.innerHTML.search('Alianza')!=-1) {
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorAlianza")+"'>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMAlianza"));
				}
				else if (element2.previousSibling.previousSibling.innerHTML.split('[').length==2) {
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorPriv")+"'>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMPriv"));
				}
				else if (element2.innerHTML.search('confeder')!=-1) {
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorConf")+"'>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMConf"));
				}
			}
		}
	}

	if (coordLinker || colorMens) {
		var session = getSession(location.hostname);
		var texto = document.evaluate("//table/tbody/tr/td[2]/table/tbody/tr/td[2] | //table/tbody/tr/td[2]/table/tbody/tr/th[3]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i=0; i<texto.snapshotLength; i++) {
			if (coordLinker) texto.snapshotItem(i).innerHTML=texto.snapshotItem(i).innerHTML.replace(/(\D)(\d):(\d+):(\d+)(\D)/g, "$1<a style='color:"+getScriptConf('coordLinkerCM')+"' href=galaxy.php?session="+session+"&p1=$2&p2=$3&p3=$4>$2:$3:$4</a>$5");
			if (colorMens) {
				var texto2 = texto.snapshotItem(i).innerHTML;
				//texto2=texto2.replace(/(metal|cristal|deuterio):? ?(\d\.\d+e\+\d\d|\d+)/ig, "<font color='#88aaff'>$1</font>: <font color=orange>$2 </font>");
				texto2=texto2.replace(/(metal|cristal|deuterio):? ?(\d{1,3}[\.\d{3}]*)/ig, "<font color='#88aaff'>$1</font>: <font color=orange>$2 </font>");
				//texto2=texto2.replace(/(\d\.\d+e\+\d\d|\d+)( metal| cristal| deuterio)/ig, "<font color=orange>$1 </font><font color='#88aaff'>$2</font>");
				texto2=texto2.replace(/(\d{1,3}[\.\d{3}]*)( metal| cristal| deuterio)/ig, "<font color=orange>$1 </font><font color='#88aaff'>$2</font>");
				texto2=texto2.replace(/enemigo de ([\s\S]*) entrega/, "enemigo de <font color="+getScriptConf('colorPriv')+">$1</font> entrega"); // nombre de jugador en entregas
				texto2=texto2.replace(/jugador ([\s\S]*) envía/, "jugador <font color="+getScriptConf('colorPriv')+">$1</font> envía"); // nombre de jugador en entregas
				texto2=texto2.replace(/(\d+ %)/, "<font color=pink>$1</font>"); // porcentaje en espionajes
				texto2=texto2.replace(/(\D):(\d+) /g, "$1: <font color='#88aaff'>$2 </font>"); // numero de naves en regresos
				texto2=texto2.replace(/(Tus) (\d+) (recicladores)/, "$1 <font color='#88aaff'>$2</font> $3"); // numero de naves en recicladas
				//texto2=texto2.replace(/(\d+)(\. En los escombros)/, "<font color=orange>$1</font>$2"); // capacidad total de los recicladores
				texto2=texto2.replace(/(\d{1,3}[\.\d{3}]*)(\. En los escombros)/, "<font color=orange>$1</font>$2"); // capacidad total de los recicladores
				texto.snapshotItem(i).innerHTML=texto2;
			}
		}
	}
}

// Le quitamos toda la publicidad a Drago-Sim
else if (location.hostname=='drago-sim.com') {
	unsafeWindow.initSimDataX = function () {}
	var nodo = document.forms[0];
	document.body.innerHTML="";
	nodo.removeChild(nodo.firstChild.nextSibling);
	nodo.removeChild(nodo.firstChild.nextSibling);
	nodo.removeChild(nodo.lastChild);
	nodo.removeChild(nodo.lastChild);
	nodo.removeChild(nodo.lastChild);
	document.body.appendChild(nodo);
	nodo = document.evaluate('/html/body/form/table/tbody/tr', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	nodo.removeChild(nodo.firstChild);
	nodo = nodo.lastChild.lastChild.firstChild.firstChild;
	nodo2 = nodo.childNodes[1].lastChild.firstChild;
	nodo2.removeChild(nodo2.childNodes[1]);
	nodo = nodo.lastChild;
	nodo.removeChild(nodo.lastChild);
}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|         b_building.php        |***************/
/*********+-------------------------------+***************/
/*********************************************************/
else if (location.pathname=='/game/b_building.php') {
		RemoverDescripcionesColorearRecursos();
		AchicarImagenes1();
	}
/*********************************************************/
/*********+-------------------------------+***************/
/*********|         options.php           |***************/
/*********+-------------------------------+***************/
/*********************************************************/
else if (location.pathname=='/game/options.php') {
		AgregarBotonConfig();
	}
/*********************************************************/
/*********+-------------------------------+***************/
/*********|         bericht.php           |***************/
/*********+-------------------------------+***************/
/*********************************************************/
else if (location.pathname=='/game/bericht.php' && getScriptConf('compactar')) {
	function getCompactConf(nombre) {
		return getConf(nombre, "compactConf", defCompactConf, ':x:');
	}
	function setCompactConf(nombre, valor) {
		setConf(nombre, valor, "compactConf", defCompactConf, ':x:');
	}

/*******************************************************
 * Modificacion del script Compactador-OGame
 * Fuente: http://userscripts.org/scripts/source/3482.user.js
 * version 0.3
 * 3 Mar 2006
 * Copyright (c) 2006, Guillermo Gutierrez
 * Released under the GPL license
 * http://www.gnu.org/copyleft/gpl.html
 * Script de compactacion automatica de batallas de ogame
 * visita http://eldaimon.blogspot.com/ para mas informacion
************************************************************/

//Looking for transtlators uncle Gobo needs you ;) if you want translate this script please mail me at eldaimon in g m a i l -remove the espaces- . com
//TODO: Remove repeat tags

//Constant pattern values for search in document, usefull for translate this script
/*
	If you want translate this script you must change the text between begin and end translation coment
	keep the espaces at the beggining and end of a phrase
*/
/* 
	======================
	BEGIN TRANSLATION ZONE
	======================
*/
	var atackertag 		 	= "Atacante";
	var defendertag		 	= "Defensor";
	var typetag 		 	= "Tipo";
	var amountag 		 	= "Cantidad";
	var damagetag		 	= "Armas:";
	var resulttag   	 	= "batalla";
	var drawtag  		 	= "combate";
	var loosestag   	 	= "perdido";
	var rubbletag   	 	= "flotan ahora";
	var metalrubbletag    	 	= "Metal y";
	var cristalrubbletag	 	= "Cristal";
	var stolentag		 	= "captura<br>";
	var metaltag		 	= "Metal,";
	var cristaltag		 	= "Cristal y";
	var deuteriumtag	 	= "Deuterio<br>";
	var atackerloosestag 	 	= "El atacante ha perdido en total";
	var defenderloosestag 	 	= "El defensor ha perdido en total";
	var atacker_result_tag 	 	= "atacante";
	var defender_result_tag 	= "defensor";
	var unitstag 		 	= "unidades.";
	var destroytag		 	= "Destruido";
	var br			 	= "<br>";
	var endtecnologytag	 	= '<table border="1">';
	var endtecnology2tag 	 	= '<br>Destruido';
	var no_ships_no_defenses_text 	= "Sin naves ni defensas";
	var roundtag			= 'La flota atacante dispara';
	var moon_tag		 	= 'La probabilidad de que una luna surja de los escombros es de';
	var moon_created_tag	 	= 'Las enormes cantidades de metal y de cristal se atraen y forman lentamente un satélite lunar en la órbita del planeta. ';
	var max_rentability	 	= 'M'+aacento+'xima';
	var min_rentability		= 'Mínima';
	var repaired_tag	 	= 'pueden ser reparados.';
	var months 			= new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre','Diciembre');
	var serverShiptsNames		= new Array('P.Carga','Gr.Carga','Cazador L.','Cazador P.','Crucero','Nave de Batalla','Colonizador','Reciclador.','Sonda','Bombardero','Satélite S.','Destructor','Est.Muerte');
	var userShiptsNames		= new Array('Nave pequeña de carga','Nave grande de carga','Cazador ligero','Cazador pesado','Crucero','Nave de batalla','Colonizador','Recicladores','Sonda de espionaje','Bombardero','Satélite solar','Destructor','Estrella de la muerte');
	var serverDefensesNames		= new Array('Misil','L'+aacento+'ser Peq.','L'+aacento+'ser Gr.','C.Gauss','C.Iónico','C.Plasma','Cúpula Peq.','Cúpula Gr.');
	var userDefensesNames		= new Array('Lanzamisiles','L'+aacento+'ser pequeño','L'+aacento+'ser grande','Cañón de gauss','Cañón iónico','Cañón de plasma','Cúpula pequeña de protección','Cúpula grande de protección');
//const strings
	const c_singleAtacker 		= 'Atacante';
	const c_multipleAtacker 	= 'Atacantes';
	const c_singleDefender 	= 'Defensor';
	const c_multipleDefender 	= 'Defensores';
	const c_battleInit		= 'Batalla del día ';
	const c_at			= ' a las ';
	const c_of			= ' de ';
	const c_duration		= 'La batalla duró ';
	const c_rounds			= ' rondas';
	const c_hiddenTecnology	= 'Armas: XXX% Escudos: XXX% Blindaje: XXX%';
	const c_lost			= ' perdió ';
	const c_noLost			= ' sin bajas';
	const c_maxLost		= ' volatilizados';
	const c_looses			= 'Perdidas ';
	const c_units 			= ' unidades.';
	const c_stolen			= 'Captura: ';
	const c_metalInfo		= ' Metal, ';
	const c_cristalInfo		= ' Cristal y ';
	const c_deuteriumInfo		= ' Deuterio';
	const c_consumption		= 'Consumo de deuterio (aprox.) al 100%: ';
	const c_atackerLooses		= 'Pérdidas del Atacante: ';
	const c_defenderLooses		= 'Pérdidas del Defensor: ';
	const c_totalLooses		= 'Pérdidas TOTALES: ';
	const c_rubbles		= 'Escombros';
	const c_metalRubble		= 'Metal: ';
	const c_cristalRubble		= 'Cristal: ';
	const c_deuteriumRubble		= 'Deuterio: ';
	const c_winAndLost		= 'GANANCIAS Y PÉRDIDAS';
	const c_recicleRentability   	= 'Rentabilidad con reciclaje: ';
	const c_notRecicleRentability   = 'Rentabilidad sin reciclaje: ';
	const c_with			= ' Con';
	const c_without		= 'Sin ';
	const c_recicle		= ' Reciclaje: ';
	const c_defenderWithRecicle	= 'Defensor Si Recicla: ';
	const c_showDeuterium		= ' Mostrar el consumo de deuterio <br />';
	const c_showTech		= ' Mostrar las tecnologías &nbsp;&nbsp;&nbsp;';
	const c_showCoords		= ' Mostrar las coordenadas<br>';
	const c_forumSkin		= ' Fondo de foro claro &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	const c_ogameSkin		= ' Fondo de skin claro<br>';
	const c_forumType0		= ' Compactar en html ';
	const c_forumType1		= ' Compactar para foro phpBB ';
	const c_forumType3		= ' Compactar para foro smf ';
	const c_forumType2		= ' Compactar en texto plano<br />';
	const c_showReport		= ' Ocultar el reporte original de batalla<br />';


	var version = getDefScriptConf('version');
	var added_link		= new Array('','[color=orangered][size=12]Compactado con el script [url=http://userscripts.org/scripts/show/5550]oGame++ v'+version+'[/url][/size][/color]','','[b][color=orangered]Compactado con el script [url=http://userscripts.org/scripts/show/5550]oGame++ v'+version+'[/url][/color][/b]');

/* 
	====================
	END TRANSLATION ZONE
	====================
*/

//Default values
	var defCompactConf = [
		'coords', true,
		'forum_type', 0,
		'hide_report', false,
		'light_forum', false,
		'light_skin', false,
		'tecnology', true,
		'partials', true,
		'deuterium', true,
	].join(':x:');

	var defShiptsSpeed = ['10000', '7500', '12500', '10000', '15000', '10000', '2500', '2000', '100000000', '5000', '0', '5000', '100'].join(':');
	var defShiptsConsumption = ['20','50','20','75','300','500','100','300','1','1000','0','1000','1'].join(':');

//Shipts properties
	var shiptsConsumption	= GM_getValue('consumosBase', defShiptsConsumption).split(':');
	var shiptsSpeed	= GM_getValue('velocidadesBase', defShiptsSpeed).split(':');

	//Shipts costs
	var shiptsMetalCost		= new Array('2000','6000','3000','6000','20000','40000','10000','10000','0','50000','0','60000','5000000');
	var shiptsCristalCost		= new Array('2000','6000','1000','4000','7000','20000','20000','6000','1000','25000','2000','50000','4000000');
	var shiptsDeuteriumCost		= new Array('0','0','0','0','2000','0','10000','2000','0','15000','500','15000','1000000');
	
//Defenses costs
	var defensesMetalCost		= new Array('2000','1500','6000','20000','2000','50000','10000','50000');
	var defensesCristalCost		= new Array('0','500','2000','15000','6000','50000','10000','50000');
	var defensesDeuteriumCost	= new Array('0','0','0','2000','0','30000','0','0');


//Report values conatiners
	//Atackers & Defenders info
	var atackerName 	 = new Array();
	var atackerTecnology     = new Array();
	var defenderName 	 = new Array();
	var defenderTecnology    = new Array();
	var atackerCount	 = 0;
	var defenderCount	 = 0;
	var rounds		 = 1;
	var loosesArr		 = new Array();

	//Rubbles info
	var rubbleMetal	 	 = 0;
	var rubbleCristal	 = 0;

	//looses info
	var defenderLoosesAmount = 0;
	var atackerLoosesAmount  = 0;

	//Stolen info
	var stolenMetal	 	 = 0;
	var stolenCristal	 = 0;
	var stolenDeuterium	 = 0;

	//Result Info
	var result_info		 = "";
	var date		 = "";
	var moon_probability	 = 0;
	var atackerRentability   = "";
	var atackerRentability2   = "";
	var defenderRentability  = "";
	var moon_and_defenses_info	 = "";
	var metalAtackersLooses = 0;
	var cristalAtackersLooses = 0;
	var deuteriumAtackersLooses = 0;
	var metalDefendersLooses = 0;
	var cristalDefendersLooses = 0;
	var deuteriumDefendersLooses = 0;

//Paralel arrays for get the flotes
	var atackerInitialShipsType = new Array();
	var atackerFinalShipsType = new Array();
	var atackerInitialShipsNumber = new Array();
	var atackerFinalShipsNumber = new Array();
	var atackerAuxFinalShipsNumber = new Array();
	var defenderInitialShipsType = new Array();
	var defenderFinalShipsType = new Array();
	var defenderInitialShipsNumber = new Array();
	var defenderFinalShipsNumber = new Array();
	var defenderAuxFinalShipsNumber = new Array(); 
	var atackerCoords = new Array();
	var defenderCoords = new Array();

//Colors for forums, we must get and set the options from the Grease monkey
	//For fleets 
	var fleetAtackerColor = new Array('red', 'lime');
	var fleetDefenderColor = new Array('blue', 'orange');
	var infoColor = new Array('purple', 'skyblue');
	//For nicks
	var atackerNameColor = new Array('red', 'lime');
	var defenderNameColor = new Array('blue', 'orange');
	//For looses
	var totalAtackerLoosesColor = new Array('red','lime');
	var partialAtackerLoosesColor = new Array('green','limegreen');
	var totalDefenderLoosesColor = new Array('blue','orange');
	var partialDefenderLoosesColor = new Array('orangered','orangered');
	//For consumption
	var atackerConsumptionColor = new Array('red','lime');
	var defenderConsumptionColor = new Array('blue','orange');
	//For stolen resources
	var stolenColor = new Array('purple', 'skyblue');
	//For rentabilitys
	var atackerWithRecicleColor = new Array('green','yellow');
	var atackerWithOutRecicleColor = new Array('orangered','orangered');
	var defenderWithRecicleColor = new Array('brown','orange');


//Tags for html, forums and plain text and smf :)
	var boldInit 		= new Array('<b>','[b]','','[b]');
	var boldEnd		= new Array('</b>','[/b]','','[/b]');
	var itallyInit		= new Array('<i>','[i]','','[i]');
	var itallyEnd		= new Array('</i>','[/i]','','[/i]');
	var crlf		= new Array('<br>','\n','\n','\n');	
	var sizeInit		= new Array('<font size="#replace">','[size=#replace]','','[size=#replace]');
	var sizeEnd		= new Array('</font>', '[/size]','', '[/size]');
	var colorInit		= new Array('<font color="#replace">','[color=#replace]','','[color=#replace]');
	var colorEnd		= new Array('</font>','[/color]','','[/color]');
	var hr			= new Array('<img src="http://www.science.siu.edu/images/line-hr-eyes.gif" />','[img]http://www.science.siu.edu/images/line-hr-eyes.gif[/img]','','[img]http://www.science.siu.edu/images/line-hr-eyes.gif[/img]');
	var round_size		= new Array('3px','18','','14pt');	
	var nick_size		= new Array('4px','19','','15pt');
	var section_size	= new Array('4px','17','','13pt');
	var resource_size	= new Array('4px','21','','17pt');
	var rentability_size	= new Array('4px','17','','13pt');

//Options of report:)
var color_skin = 1;
var color_forum = 0;

//////////////////////////////////////////////////////////
// Get the text between the begin text and the end text //
//////////////////////////////////////////////////////////


function get_from_to(strLine, begin, end) {

	return strLine.substring(strLine.indexOf(begin) + begin.length , strLine.indexOf(end));
}

////////////////////////////////////////////////////////
// Get the date of the battle and show it more gentle //
////////////////////////////////////////////////////////


function get_battle_date () {
        
        var header = document.getElementsByTagName('td')[0].firstChild.nodeValue;
	var dateArr = new Array();
        dateArr = header.match(/(\d\d)-(\d\d) (\d\d:\d\d:\d\d)/);
        date = parseInt(dateArr[2], 10) + ' ' + c_of + ' ' + months[parseInt(dateArr[1],10)-1] + c_at + dateArr[3];
        return date;
}

////////////////////////////////////////////////////////
// Get the distance factor from Origin to Destination //
////////////////////////////////////////////////////////


function distance(origin, destination) {
	var dist = 0;
	var originArr = new Array();
	var destinationArr = new Array();
	//Clear the strings
	origin = origin.replace("(","");
	origin = origin.replace(")","");
	destination = destination.replace("(","");
	destination = destination.replace(")","");
	//Convert the cordinates to an array galaxy 0, system 1, planet 2
	originArr = origin.split(":");
	destinationArr = destination.split(":");
	if ( originArr[0] == destinationArr[0]) { 
		//Same galaxy
		if ( originArr[1] == destinationArr[1]) {
			//Same system diferent planet
			dist = Math.abs(originArr[2] - destinationArr[2]) * 5 + 1000;
		}
		else {
			//Diferent System same galaxy
			dist = Math.abs(originArr[1] - destinationArr[1]) * 5 * 19 + 2700;
		}
	}
	else {
		//Diferent Galaxy
		dist = Math.abs(originArr[0] - destinationArr[0]) * 20000;
	}
	return dist;
}
function atackerConsumption (dist, minSpeed, player) {
	var duration = 0;
	var spd = 0;
	var searchPos;
	var basicCosumption = 0;
	var consumption = 0;
	duration = Math.round((35000/10 * Math.sqrt(dist*10/minSpeed) + 10));
	for (var i=0; i<atackerInitialShipsType[player].length; i++) {
		//For each ship in the attack :)
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (atackerInitialShipsType[player][i] == serverShiptsNames[j]) {
				searchPos = j;	
			 	break;
			}
		}
		if (searchPos != -1) {
			spd = 35000/(duration * 1 - 10) * Math.sqrt(dist*10/shiptsSpeed[searchPos]);
			basicConsumption = shiptsConsumption[searchPos] * atackerInitialShipsNumber[player][i];
			consumption += basicConsumption * dist / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1);
		}
	}
	return Math.round(consumption) + 1;
}
function defenderConsumption (dist, minSpeed, player) {
	var duration = 0;
	var spd = 0;
	var searchPos;
	var basicCosumption = 0;
	var consumption = 0;
	duration = Math.round((35000/10 * Math.sqrt(dist*10/minSpeed) + 10));
	for (var i=0; i<defenderInitialShipsType[player].length; i++) {
		//For each ship in the attack :)
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (defenderInitialShipsType[player][i] == serverShiptsNames[j]) {
				searchPos = j;	
			 	break;
			}
		}
		if (searchPos != -1) {
			spd = 35000/(duration * 1 - 10) * Math.sqrt(dist*10/shiptsSpeed[searchPos]);
			basicConsumption = shiptsConsumption[searchPos] * defenderInitialShipsNumber[player][i];
			consumption += basicConsumption * dist / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1);
		}
	}
	return Math.round(consumption) + 1;
}



/////////////////////////////////////////////////////////////////
// Get the final flotes from all players and store in a matrix //
/////////////////////////////////////////////////////////////////

function get_final_flotes () {
	var html = document.getElementsByTagName ('center');
	var strLine;
	var player = defenderCount;
 	var i;
	var j;
	var array_controler = 0;
	for (j=0;j< defenderCount; j++) {
		//Initialize the matrix
		defenderFinalShipsNumber[j] = new Array();	
	}
	for (i=html.length -1; i >= html.length - (defenderCount)  ; i--) {
		array_controler = 0;
		//Get defenders flotes
		strLine = html[i].innerHTML;
		player --;
		if (strLine.search(destroytag) != -1) {
			//The defensor was destroyed
			defenderFinalShipsType[player] = '';
			defenderAuxFinalShipsNumber[player] = '';

		}
		else {
			defenderFinalShipsType[player]=get_flote_type_from_string (strLine);
			defenderAuxFinalShipsNumber[player]=get_flote_number_from_string(strLine);
		}

		for (j=0;j<defenderInitialShipsType[player].length;j++) {
				if (defenderFinalShipsType[player][array_controler] == defenderInitialShipsType[player][j]) {
					//The ship type has survivors :)
					defenderFinalShipsNumber[player][j]=defenderAuxFinalShipsNumber[player][array_controler];
					array_controler++;
				}
				else {
					defenderFinalShipsNumber[player][j] = 0;
				}
		}
		//Check for set the destroyed player flote
		if (defenderAuxFinalShipsNumber[player]=='') {
			defenderFinalShipsType[player] = defenderInitialShipsType[player]
			for (j=0;j<defenderInitialShipsNumber[player].length;j++)
			defenderFinalShipsNumber[player][j] = 0; 
		}
	}
	player = atackerCount;
	for (j=0;j< atackerCount; j++) {
		//Initialize the matrix
		atackerFinalShipsNumber[j] = new Array();	
	}
	
	for (i=html.length-(defenderCount+1);i>=html.length-(defenderCount+atackerCount);i--) {
		//Get atackers flotes
		strLine = html[i].innerHTML;
		player --;
		if (strLine.search(destroytag) != -1) {
			//The defensor was destroyed
			atackerFinalShipsType[player] = '';
			atackerFinalShipsNumber[player] = '';

		}
		else {
			atackerFinalShipsType[player] = get_flote_type_from_string (strLine);
			atackerAuxFinalShipsNumber[player] = get_flote_number_from_string (strLine);
		}
		arrayController = 0;
		for (j = 0; j < atackerInitialShipsType[player].length; j++) {
			if (atackerInitialShipsType[player][j] == atackerFinalShipsType[player][arrayController] ) 	{
				atackerFinalShipsNumber[player][j]=atackerAuxFinalShipsNumber[player][arrayController];
				arrayController++;
			}
			else {
				atackerFinalShipsNumber[player][j] = 0;
			}
		}
		//Check for set the destroyed player flote
		
		if (atackerAuxFinalShipsNumber[player]==undefined) {
			atackerFinalShipsType[player] = atackerInitialShipsType[player];
			atackerFinalShipsNumber[player] = new Array();
			for (j=0;j<atackerInitialShipsNumber[player].length;j++) {
				atackerFinalShipsNumber[player][j] = 0; 
			}
		}
	}
}

/////////////////////////////////////////////////////////////////
// Get the initial info about players: flotes, name, tecnology //
/////////////////////////////////////////////////////////////////

function get_names_and_flotes () {
	//Extract the names of attackers and defenders.
	var html = document.getElementsByTagName ('center');
	var strLine;
	for (var i = 1; i <= html.length - 1; i++) {		
		strLine = html[i].innerHTML;
		if ( strLine.search(atackertag) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) == -1) {
			//Get only the atacker first aparition
			atackerName[atackerCount] = get_from_to(strLine,atackertag,br);
			atackerInitialShipsType[atackerCount]=get_flote_type_from_string(strLine);
			atackerInitialShipsNumber[atackerCount]=get_flote_number_from_string(strLine);
			atackerTecnology[atackerCount] = get_from_to(strLine,br,endtecnologytag);
			atackerCoords[atackerCount] = get_from_to(strLine,'(',')');
			atackerCount++; 
		}
		else if (strLine.search(defendertag) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) == -1) {
			//Get only the defender first aparition
			defenderName[defenderCount] = get_from_to(strLine,defendertag,br);
			defenderInitialShipsType[defenderCount]=get_flote_type_from_string (strLine);
			defenderInitialShipsNumber[defenderCount]=get_flote_number_from_string (strLine);
			defenderTecnology[defenderCount] = get_from_to(strLine,br,endtecnologytag);
			defenderCoords[defenderCount] = get_from_to(strLine,'(',')');
			defenderCount++; 
		}
		else if (strLine.search(defendertag) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) != -1 && defenderCount == 0) {
			//Get the defender when s/he didn't have float and defenses
			defenderName[defenderCount] = get_from_to(strLine,defendertag,br);
			defenderInitialShipsType[defenderCount] = no_ships_no_defenses_text;
			defenderInitialShipsNumber[defenderCount] = '';
			defenderTecnology[defenderCount]=get_from_to(strLine,br,endtecnology2tag);
			defenderCoords[defenderCount] = get_from_to(strLine,'(',')');
			defenderCount++; 
		}
	}
}

/////////////////////////////////////////////////////////
// Get the flotes type from one report realy useful :D //
/////////////////////////////////////////////////////////

function get_flote_type_from_string (strLine) {
//Get the flote type from a string
	var storeArray = new Array();
	var floteTypeArray = new Array();
	storeArray = strLine.split('<th>');
	for (var i=0; i < storeArray.length && storeArray[i+2].search(amountag) == -1; i++) {
		//Clean the string before store
		floteTypeArray[i] = storeArray[i+2].replace('</th>','').replace('</tr><tr>','');
	}
	return floteTypeArray;
}

////////////////////////////////////////////////////////////
// Get the flotes number from one report really useful :D //
////////////////////////////////////////////////////////////


function get_flote_number_from_string (strLine) {
//Get the flote number from a string
	var storeArray = new Array();
	var floteNumberArray = new Array();
	var array_controller = 0;
	storeArray = strLine.split('<th>');
	for (var i = 0; i < storeArray.length && storeArray[i].search(amountag) == -1; i++) {
		array_controller++;
	}
	array_controller++;
	for (i=array_controller; i < storeArray.length && storeArray[i].search(damagetag) == -1; i++) {
		//Clean the string before store
		floteNumberArray[i-array_controller] = storeArray[i].replace('</th>','').replace('</tr><tr>','');
	}
	return floteNumberArray;
}

//////////////////////////////
// Get the number of rounds //
//////////////////////////////

function get_rounds() {
	var html = document.getElementsByTagName ('tbody');
	var players = (atackerCount+defenderCount);
	var strLines = html[0].innerHTML;
	rounds = strLines.split(roundtag).length -1;
	if (rounds == 0) {
		rounds++;
	}
}

////////////////////////////////////////////////////////////////////////////
// Get general info about the battle like winner, stolen resources etc... //
////////////////////////////////////////////////////////////////////////////


function get_battle_info_result() {
	var html = document.getElementsByTagName ('p');	
	var strLine; 
	for (var i = 0; i <= html.length - 1; i++) {
		strLine = html[i].innerHTML;
		if ((strLine.search(resulttag) != -1) || (strLine.search(drawtag) != -1)) {	
			//Search for win loose or draw zone to recover winner info		
			result_info = get_from_to(strLine,'',br);
			if (result_info.search('!') != -1) {
				result_info = result_info.replace(' ','¡') ;
			} 
		}
		if ((strLine.search(resulttag) != -1) && (strLine.search(atacker_result_tag))) {
			//Search for stolenResources when atacker win
			stolenMetal = get_from_to(strLine,stolentag,metaltag);
			stolenCristal = get_from_to(strLine,metaltag,cristaltag);
			stolenDeuterium = get_from_to(strLine,cristaltag,deuteriumtag);
		}
		if (strLine.search(rubbletag) != -1)  {
			//Search for rubble
			rubbleMetal = get_from_to(strLine,rubbletag,metalrubbletag);
			rubbleCristal=get_from_to(strLine,metalrubbletag,cristalrubbletag);
		}
		if (strLine.search(moon_tag) != -1) {
			moon_probability = parseInt(get_from_to(strLine,moon_tag,'%'));
			strLine = strLine+ '<br>';
			moon_and_defenses_info = strLine.substring(strLine.indexOf(cristalrubbletag) + (cristalrubbletag.length +1),strLine.lastIndexOf(br)).replace('<b>','').replace('</b>','');
		}
		if (strLine.search(moon_created_tag) != -1) {
			moon_info = moon_created_tag;
		}
		//Get atacker looses value
		atackerLoosesAmount =  parseInt(get_from_to(strLine,atackerloosestag,unitstag));
		//Get defender looses value
		defenderLoosesAmount = parseInt(strLine.substring(strLine.indexOf(defenderloosestag) + (defenderloosestag.length +1),strLine.lastIndexOf(unitstag)-1));
					
	}
}

///////////////////////////////////////////////
// Get the rentabilitys from the report data //
///////////////////////////////////////////////


function get_rentabilitys () {
	var rubbleAmount = parseInt(rubbleCristal) + parseInt(rubbleMetal);
	if (isNaN(stolenMetal)) {
		stolenMetal = 0;
	}
	if (isNaN(stolenCristal)) {
		stolenCristal = 0;
	}
	if (isNaN(stolenDeuterium)) {
		stolenDeuterium = 0;
	}
	var stolenAmount = parseInt(stolenMetal) + parseInt(stolenCristal) + parseInt(stolenDeuterium);
	if (isNaN(rubbleAmount)) {
		rubbleAmount = 0;
	}
	if (atackerLoosesAmount == 0) {
		atackerRentability = max_rentability;
		atackerRentability2 = max_rentability;
	}
	else {
		if (isNaN(stolenAmount))
		{
			//This must fix the bug when nothing is stolen
			stolenAmount = 0;
		}
		atackerRentability = ((((rubbleAmount + stolenAmount)- atackerLoosesAmount) / atackerLoosesAmount)*100);
		atackerRentability = Math.round(parseInt(atackerRentability)) + '%';	
		atackerRentability2 = (((stolenAmount- atackerLoosesAmount) / atackerLoosesAmount)*100);
		atackerRentability2 = Math.round(parseInt(atackerRentability2)) + '%';	
	}
	if (defenderLoosesAmount == 0 && stolenAmount == 0) {
		defenderRentability = max_rentability;
	}
	else {
		defenderRentability = ((rubbleAmount - (defenderLoosesAmount + stolenAmount)) / (defenderLoosesAmount + stolenAmount))*100;
		defenderRentability = Math.round(parseInt(defenderRentability)) + '%';		
	}
}

////////////////////////////////////////////////////////////////////////
// based in a function from 					      //
// http://www.forosdelweb.com/showthread.php?postid=265553#post265553 //
// put dot as separator :)					      //
////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////
// create the flotes report zone  //
////////////////////////////////////

function createFloteView (fleetType, fleetInitialNumber, fleetFinalNumber, fleetColor, loosesColor, type_preference) {
	//Initizlize the report
	var fleetReport = '';
	for (var position=0; position < fleetType.length; position++) {
			//Calculate type, initial and final fleet row
			type = fleetType[position];
			initialNumber = formatNmb(fleetInitialNumber[position]);
			lostNumber   = formatNmb((fleetInitialNumber[position]-fleetFinalNumber[position]));
			//Set shipt color for initial representation
			fleetReport = fleetReport + fleetType[position] + ' ' +  colorInit[type_preference].replace('#replace', fleetColor);
			fleetReport = fleetReport + initialNumber + colorEnd[type_preference];
			//Set color for shipt looses
			fleetReport = fleetReport + colorInit[type_preference].replace('#replace', loosesColor) + 
				(lostNumber==0?c_noLost:(lostNumber==initialNumber?c_maxLost:c_lost + lostNumber)) + colorEnd[type_preference];
			fleetReport = fleetReport + crlf[type_preference];
	}
	return fleetReport;
}

function createPlayerName (playerName, view_coords, color, size, type) {
	//Initialize the string
	nameCreated = '';
	if (view_coords) {
		nameCreated = colorInit[type].replace('#replace', color) + sizeInit[type].replace('#replace',size);
		nameCreated = nameCreated + playerName.replace('(',sizeEnd[type] + colorEnd[type] + boldInit[type] + '[').replace(')', ']') + boldEnd[type] + crlf[type];
	}
	else {
		nameCreated = colorInit[type].replace('#replace', color) + sizeInit[type].replace('#replace',size);
		nameCreated = nameCreated + playerName.split('(')[0] + sizeEnd[type] + ' [XX:XXX:XX]' + colorEnd[type] + crlf[type];	
	}
	return nameCreated;
}

function createTecnology(tecnology, type) {
	tecnologyArr = tecnology.split(' ');
	tecnologyReport = tecnologyArr[0] + ' ' + boldInit[type] + tecnologyArr[1] + boldEnd[type] + ' ' + tecnologyArr[2] + ' ';
	tecnologyReport = tecnologyReport + boldInit[type] + tecnologyArr[3] + boldEnd[type] + ' ' + tecnologyArr[4] + ' ';
	tecnologyReport = tecnologyReport + boldInit[type] + tecnologyArr[5] + boldEnd[type] +crlf[type];
	return tecnologyReport;
}

function estimateLooses (initialShipsType,initialShipsNumber, finalShipsNumber, type, totalLoosesColor, partialLoosesColor, isAtacker) {
	var metalLoosesPlayer = 0;
	var cristalLoosesPlayer = 0;
	var deuteriumLoosesPlayer = 0;
	for (var i=0; i<initialShipsType.length; i++) {
		//Search for initialShipsType in serverShiptsNames to get shipt values
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (initialShipsType[i] == serverShiptsNames[j]) {
				searchPos = j;	
				 break;
			}
		}
		if (searchPos == -1) {
			//it's a defense :)
			for ( var j=0;j<serverDefensesNames.length; j++ ) {
				if (initialShipsType[i] == serverDefensesNames[j]) {
					searchPos = j;	
				 	break;
				}
			}
			if (searchPos != -1) {
				metalLoosesPlayer = parseInt(metalLoosesPlayer) + parseInt(defensesMetalCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]));
				cristalLoosesPlayer = cristalLoosesPlayer + defensesCristalCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);
				deuteriumLoosesPlayer = deuteriumLoosesPlayer + defensesDeuteriumCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);	
			}
		} 
		else {
			metalLoosesPlayer = metalLoosesPlayer + shiptsMetalCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);
			cristalLoosesPlayer = cristalLoosesPlayer + shiptsCristalCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);
			deuteriumLoosesPlayer = deuteriumLoosesPlayer + shiptsDeuteriumCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);
		}
	}
	totalLoose = formatNmb(metalLoosesPlayer + cristalLoosesPlayer + deuteriumLoosesPlayer);
	estimateReport =  c_looses + boldInit[type] + colorInit[type].replace('#replace', totalLoosesColor) + totalLoose + colorEnd[type] + boldEnd[type] + c_units + crlf[type];
	estimateReport = estimateReport + itallyInit[type] +'(';
	estimateReport = estimateReport + colorInit[type].replace('#replace', partialLoosesColor) + formatNmb(metalLoosesPlayer) + colorEnd[type] + c_metalInfo;
	estimateReport = estimateReport + colorInit[type].replace('#replace', partialLoosesColor) + formatNmb(cristalLoosesPlayer) + colorEnd[type] + c_cristalInfo;
	estimateReport = estimateReport + colorInit[type].replace('#replace', partialLoosesColor) + formatNmb(deuteriumLoosesPlayer) + colorEnd[type] + c_deuteriumInfo;
	estimateReport = estimateReport + ')' + itallyEnd[type] + crlf[type];
	if (isAtacker) {
		metalAtackersLooses += parseInt(metalLoosesPlayer);
		cristalAtackersLooses += parseInt(cristalLoosesPlayer);
	 	deuteriumAtackersLooses += parseInt(deuteriumLoosesPlayer);
	} else {
		metalDefendersLooses += parseInt(metalLoosesPlayer);
		cristalDefendersLooses += parseInt(cristalLoosesPlayer);
	 	deuteriumDefendersLooses += parseInt(deuteriumLoosesPlayer);
	}
	return estimateReport;
}

function deuteriumConsumption (shiptsType, shiptsNumber, origin, destination, type, color) {
	var duration = 0;
	var spd = 0;
	var searchPos = -1;
	var basicCosumption = 0;
	var consumption = 0;
	var dist = distance(origin,destination);
	//Get the minimal velocity
	var minSpeed = 100000000;
	for (var i=0; i<shiptsType.length; i++) {
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (shiptsType[i] == serverShiptsNames[j]) {
				searchPos = j;
				break;
			}
		}
		if (searchPos != -1) {
			//Get the slowest ship
			if ( parseInt(shiptsSpeed[searchPos]) < parseInt(minSpeed) ) {
				minSpeed = shiptsSpeed[searchPos]
			}
		}
	}
	duration = Math.round((35000/10 * Math.sqrt(dist*10/minSpeed) + 10));
	for (i=0; i<shiptsType.length; i++) {
		//For each ship in the attack :)
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (shiptsType[i] == serverShiptsNames[j]) {
				searchPos = j;	
			 	break;
			}
		}
		if (searchPos != -1) {
			spd = 35000/(duration * 1 - 10) * Math.sqrt(dist*10/shiptsSpeed[searchPos]);
			basicConsumption = shiptsConsumption[searchPos] * shiptsNumber[i];
			consumption += basicConsumption * dist / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1);
		}
	}
	consumption = formatNmb(Math.round(consumption) + 1);
	return boldInit[type] + c_consumption +  colorInit[type].replace('#replace', color) + consumption + colorEnd[type] + boldEnd[type] + c_units + crlf[type];
}

function resultAndStolen (type, stolenColor) {
	resultAndStolenReport = boldInit[type] + result_info + boldEnd[type] + crlf[type];
	if ((!isNaN(stolenMetal) || !isNaN(stolenCristal) || !isNaN(stolenDeuterium)) && (stolenMetal != 0 || stolenCristal != 0 || stolenDeuterium != 0) ) {
		resultAndStolenReport = resultAndStolenReport + c_stolen + colorInit[type].replace('#replace', stolenColor);
		resultAndStolenReport = resultAndStolenReport + boldInit[type] + formatNmb(stolenMetal) + boldEnd[type] + colorEnd[type];
		resultAndStolenReport = resultAndStolenReport + c_metalInfo + colorInit[type].replace('#replace', stolenColor);
		resultAndStolenReport = resultAndStolenReport + boldInit[type] + formatNmb(stolenCristal) + boldEnd[type] + colorEnd[type];
		resultAndStolenReport = resultAndStolenReport + c_cristalInfo + colorInit[type].replace('#replace', stolenColor);
		resultAndStolenReport = resultAndStolenReport + boldInit[type] + formatNmb(stolenDeuterium) + boldEnd[type] + colorEnd[type];
		resultAndStolenReport = resultAndStolenReport + c_deuteriumInfo + crlf[type];
	}
	return resultAndStolenReport;
}

function partialRentability (positiveResource, negativeResource) {
	var porcentage = Math.round(((positiveResource - negativeResource)/negativeResource)*100);
	if (isNaN(porcentage)) {
		porcentage = 0+ '%';
	}
	else if (Math.abs(porcentage) == Infinity) {
		if ( porcentage < 0 ) {
			porcentage = min_rentability;
		} 
		else {
			porcentage = max_rentability;
		}
	}
	else {
		porcentage = porcentage + '%';
	}
	return porcentage;
}

function do_report (type,color_set, view_tecnology, view_coords, view_partials, view_deuterium) {
	var resultReport = '';
	//Print date
	resultReport = boldInit[type] + c_battleInit + date + boldEnd[type] + crlf[type];
	//Print rounds;
	resultReport = resultReport + c_duration + sizeInit[type].replace('#replace',round_size[type]) + boldInit[type] + rounds + boldEnd[type] + sizeEnd[type] + c_rounds;
	resultReport = resultReport + crlf[type] + crlf[type];
	resultReport = resultReport + boldInit[type] + sizeInit[type].replace('#replace',section_size[type]);

	//Print atackers section
	if (atackerCount > 1) {
		resultReport = resultReport + c_multipleAtacker;
	}
	else {
		resultReport = resultReport +  c_singleAtacker;
	}
	resultReport = resultReport + (atackerCount>1?' (' + atackerCount +')':'')+ sizeEnd[type] + boldEnd[type] + crlf[type];
	//Print atacker fleets
	for (var i=0; i<atackerName.length; i++) {
		resultReport = resultReport + createPlayerName(atackerName[i], view_coords, atackerNameColor[color_set], nick_size[type], type);
		if (view_tecnology) {
			resultReport = resultReport + createTecnology (atackerTecnology[i], type);
		}
		resultReport = resultReport + createFloteView(atackerInitialShipsType[i], atackerInitialShipsNumber[i],atackerFinalShipsNumber[i],fleetAtackerColor[color_set], infoColor[color_set], type);
		resultReport = resultReport + crlf[type];
		if (view_partials) {
			resultReport = resultReport + estimateLooses(atackerInitialShipsType[i],atackerInitialShipsNumber[i], atackerFinalShipsNumber[i], type, totalAtackerLoosesColor[color_set], partialAtackerLoosesColor[color_set], true);
		}
		if (view_deuterium) {
			resultReport = resultReport + deuteriumConsumption(atackerInitialShipsType[i], atackerInitialShipsNumber[i], atackerCoords[i], defenderCoords[0],type, atackerConsumptionColor[color_set]);
		}
		if (view_partials || view_deuterium) {
			resultReport = resultReport + crlf[type];
		}
	}
	
	//Print defenders section
	resultReport = resultReport + boldInit[type] + sizeInit[type].replace('#replace',section_size[type]);
	if (defenderCount > 1) {
		resultReport = resultReport + c_multipleDefender;
	}
	else {
		resultReport = resultReport +  c_singleDefender;
	}
	resultReport = resultReport + (defenderCount>1?' (' + defenderCount +')':'')+ sizeEnd[type] + boldEnd[type] + crlf[type];
	//Print defender fleets
	for (var i=0; i<defenderName.length; i++) {
		resultReport = resultReport + createPlayerName(defenderName[i], view_coords, defenderNameColor[color_set], nick_size[type], type);
		if (view_tecnology) {
			resultReport = resultReport + createTecnology (defenderTecnology[i], type);
		}
		if (defenderInitialShipsType[i] != no_ships_no_defenses_text) {
			resultReport = resultReport + createFloteView(defenderInitialShipsType[i], defenderInitialShipsNumber[i],defenderFinalShipsNumber[i],fleetDefenderColor[color_set],infoColor[color_set], type);
		} else {
			//Defender has nothing
			resultReport = resultReport + no_ships_no_defenses_text + crlf[type];
		}
		resultReport = resultReport + crlf[type];
		if (view_partials) {
			resultReport = resultReport + estimateLooses(defenderInitialShipsType[i],defenderInitialShipsNumber[i], defenderFinalShipsNumber[i], type, totalDefenderLoosesColor[color_set], partialDefenderLoosesColor[color_set], false);
		}
		if (view_deuterium && i !=0) {
			resultReport = resultReport + deuteriumConsumption(defenderInitialShipsType[i], defenderInitialShipsNumber[i], defenderCoords[i], defenderCoords[0],type, defenderConsumptionColor[color_set]);
		}
		if (view_partials || (view_deuterium && i !=0)) {
			resultReport = resultReport + crlf[type];
		}
	}
	resultReport = resultReport + hr[type];
	resultReport = resultReport + crlf[type];
	resultReport = resultReport + resultAndStolen(type, stolenColor[color_set]);
	resultReport = resultReport + crlf[type];

	//ATACKER
	resultReport = resultReport + sizeInit[type].replace('#replace',rentability_size[type]);
	if (atackerCount > 1) {
		resultReport = resultReport + c_multipleAtacker;
	} 
	else {
		resultReport = resultReport + c_singleAtacker;
	}
	resultReport = resultReport + sizeEnd[type] + crlf[type];
	resultReport = resultReport + boldInit[type] + c_looses + boldEnd[type] + sizeInit[type].replace('#replace',round_size[type]);
	resultReport = resultReport + colorInit[type].replace('#replace', totalAtackerLoosesColor[color_set])  + formatNmb(atackerLoosesAmount) + colorEnd[type];
	resultReport = resultReport + sizeEnd[type] + c_units;
	resultReport = resultReport + crlf[type]; 
	
	//Atackers rentability with recicle
	resultReport = resultReport + boldInit[type] + c_recicleRentability +  ' ' +  sizeInit[type].replace('#replace',rentability_size[type]);
	rentability = formatNmb((parseInt(rubbleMetal)+parseInt(rubbleCristal)+parseInt(stolenMetal)+parseInt(stolenCristal)+parseInt(stolenDeuterium))-atackerLoosesAmount);
	resultReport = resultReport + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]) + rentability + ' (' + atackerRentability  + ')' + colorEnd[type] + sizeEnd[type] + boldEnd[type] + c_units + crlf[type];
	if (view_partials) {
			//Metal
			positive = parseInt(stolenMetal)+parseInt(rubbleMetal);
			negative = parseInt(metalAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_metalRubble + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(positive-negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Cristal
			positive = parseInt(stolenCristal)+parseInt(rubbleCristal);
			negative = parseInt(cristalAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_cristalRubble + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(parseInt(positive) - parseInt(negative))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
	}
	//Atackers rentability without recicle
	resultReport = resultReport + boldInit[type] + c_notRecicleRentability +  ' ' +  sizeInit[type].replace('#replace',rentability_size[type]);
	rentability = formatNmb((parseInt(stolenMetal)+parseInt(stolenCristal)+parseInt(stolenDeuterium))-atackerLoosesAmount);
	resultReport = resultReport + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]) +  rentability + ' (' + atackerRentability2  + ')' + colorEnd[type] + sizeEnd[type] + boldEnd[type] + c_units + crlf[type];
	if (view_partials) {
			//Metal
			positive = parseInt(stolenMetal);
			negative = parseInt(metalAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_metalRubble + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(positive-negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Cristal
			positive = parseInt(stolenCristal);
			negative = parseInt(cristalAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_cristalRubble + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(parseInt(positive) - parseInt(negative))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Deuterium
			positive = parseInt(stolenDeuterium);
			negative = parseInt(deuteriumAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_deuteriumRubble + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(parseInt(positive) - parseInt(negative))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
	}
	resultReport = resultReport + crlf[type];
	//DEFEDER
	resultReport = resultReport + sizeInit[type].replace('#replace',rentability_size[type]);
	if (defenderCount > 1) {
		resultReport = resultReport + c_multipleDefender;
	} 
	else {
		resultReport = resultReport + c_singleDefender;
	}
	resultReport = resultReport + sizeEnd[type] + crlf[type];
	resultReport = resultReport + boldInit[type] + c_looses + boldEnd[type] + sizeInit[type].replace('#replace',round_size[type]);
	resultReport = resultReport + colorInit[type].replace('#replace', totalDefenderLoosesColor[color_set])  + formatNmb(defenderLoosesAmount) + colorEnd[type];
	resultReport = resultReport + sizeEnd[type] + c_units;
	resultReport = resultReport + crlf[type]; 

	//Defenders rentability with recicle
	resultReport = resultReport + boldInit[type] + c_recicleRentability +  ' ' +  sizeInit[type].replace('#replace',rentability_size[type]);
	rentability = formatNmb((parseInt(rubbleMetal) + parseInt(rubbleCristal) - stolenMetal - stolenCristal - stolenDeuterium)-parseInt(defenderLoosesAmount));
	resultReport = resultReport + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]) + rentability + ' (' + defenderRentability  + ')' + colorEnd[type] + sizeEnd[type] + boldEnd[type] + c_units + crlf[type];
	if (view_partials) {
			//Metal
			positive = parseInt(rubbleMetal);
			negative = parseInt(stolenMetal)+parseInt(metalDefendersLooses);
			resultReport = resultReport +  itallyInit[type] + c_metalRubble + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(positive-negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Cristal
			positive = parseInt(rubbleCristal);
			negative = parseInt(stolenCristal)+parseInt(cristalDefendersLooses);
			resultReport = resultReport +  itallyInit[type] + c_cristalRubble + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(parseInt(positive) - parseInt(negative))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Deuterium
			positive = 0;
			negative = parseInt(deuteriumDefendersLooses)+parseInt(stolenDeuterium);
			resultReport = resultReport +  itallyInit[type] + c_deuteriumRubble + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(parseInt(positive) - parseInt(negative))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
	}
	resultReport = resultReport + crlf[type]; 
	
	//Total Looses
	resultReport = resultReport + c_totalLooses + boldInit[type] + sizeInit[type].replace('#replace',rentability_size[type]);
	resultReport = resultReport + formatNmb(atackerLoosesAmount + defenderLoosesAmount);
	resultReport = resultReport + sizeEnd[type] + boldEnd[type] + c_units + crlf[type] 
	resultReport = resultReport + crlf[type];
	
	//Rubles recicles
	if ((parseInt(rubbleCristal)+parseInt(rubbleMetal)) == 0) {
		resultReport = resultReport + boldInit[type] + c_rubbles + boldEnd[type] + crlf[type];
	}
	else {
		resultReport = resultReport + boldInit[type] + c_rubbles + boldEnd[type] + ' (';
		resultReport = resultReport + formatNmb(Math.floor((20000+parseInt(rubbleMetal)+parseInt(rubbleCristal))/20000));
		resultReport = resultReport + ' ' + userShiptsNames[7] + ')' + crlf[type];
	}
	
	//rubbles partials
	resultReport = resultReport + c_metalRubble +  colorInit[type].replace('#replace', infoColor[color_set])  + boldInit[type];
	resultReport = resultReport + formatNmb(rubbleMetal) + boldEnd[type] + colorEnd[type] + c_units + crlf[type];
	resultReport = resultReport + c_cristalRubble + colorInit[type].replace('#replace', infoColor[color_set]) + boldInit[type];
	resultReport = resultReport + formatNmb(rubbleCristal) + boldEnd[type] + colorEnd[type] + c_units + crlf[type];

	//Moon and defenses info :)

	if (moon_probability > 0) {
		resultReport = resultReport + moon_and_defenses_info.replace(moon_probability + ' %', sizeInit[type].replace('#replace',round_size[type]) + boldInit[type] +moon_probability+'%'+boldEnd[type] + sizeEnd[type]).replace(moon_created_tag,boldInit[type] + moon_created_tag + boldEnd[type]).replace(/<br>/g,crlf[type]);
	}
	else {
		resultReport = resultReport + moon_and_defenses_info.replace(/<br>/g,crlf[type]);
	}
	resultReport = resultReport + crlf[type] + crlf[type] + added_link[type];
	for (i = 0; i < userShiptsNames.length; i ++) {
		reg = new RegExp(serverShiptsNames[i], "g")
		resultReport = resultReport.replace(reg,userShiptsNames[i]);
		reg = null;
	}
	for (i = 0; i < userDefensesNames.length; i ++) {
		reg = new RegExp(serverDefensesNames[i], "g")
		resultReport = resultReport.replace(reg,userDefensesNames[i]);
		reg = null;
	}
	//Reset the looses :)
	cristalAtackersLooses = 0;
	metalAtackersLooses = 0;
	deuteriumAtackersLooses = 0;
	metalDefendersLooses = 0;
	cristalDefenderLooses = 0;
	deuteriumDefendersLooses = 0;
	return resultReport;
}

function set_tecnology() {
	setCompactConf("tecnology", document.getElementById("tecnology").checked());
}

/////////////////////////////////////////////////////////////////
// Call parser functions useful to take decisions about report //
// like color, tecnology, and coords			       //
/////////////////////////////////////////////////////////////////


function get_parts_from_web () {
	//Call functions to parse the battle report
	var report_text = "";
	var report_div = document.createElement("div");
	report_div.style.marginLeft = '15px';
	report_div.style.marginTop = '15px';
	var config_div = document.createElement("div");
	var report_input = document.createElement("textarea");
	report_input.id = "forum_compactation";
	report_input.name = "forum_text";
	date = get_battle_date();
	get_names_and_flotes();
	get_final_flotes ();
	get_rounds();
	get_battle_info_result();
	get_rentabilitys ();
	if (atackerName.length > 0) {
		if (getCompactConf('hide_report')) {
			document.body.innerHTML = '';
		}
		try {
			if (getCompactConf('light_forum')) {
				report = do_report(getCompactConf('forum_type'),0,getCompactConf('tecnology'),getCompactConf('coords'), getCompactConf('partials') , getCompactConf('deuterium'));
			}
			else {
				report = do_report(getCompactConf('forum_type'),1,getCompactConf('tecnology'),getCompactConf('coords'), getCompactConf('partials'), getCompactConf('deuterium'));
			}
		}
		catch (error) {
			report = do_report(1,1,false,false);
		}
		report_input.color = 'white';
		report_input.innerHTML =report;
		document.body.insertBefore(report_input,  document.body.firstChild);
		// first type, second color
		try {
			if (getCompactConf('light_skin')) {
				report = do_report(0,0,true,true, getCompactConf('partials'), getCompactConf('deuterium'));
			}
			else {
				report = do_report(0,1,true,true, getCompactConf('partials'), getCompactConf('deuterium'));
			}
		}
		catch (error) {
			report = do_report(0,1,true,true, true, true);
		}
		report_div.color = 'white';
		report_div.innerHTML = report;
		document.body.insertBefore(report_div,  document.body.firstChild);

		//Show partials check
		var view_partials = document.createElement("input");
		view_partials.type="checkbox";
		try {
			view_partials.checked = getCompactConf('partials');
		}
		catch (err) {
			view_partials.checked = true;
		}
		view_partials.addEventListener('click',function(ev) {
			setCompactConf('partials',this.checked);
			location.href=document.location;
		},true);
		var partials_span = document.createElement("span");
		partials_span.innerHTML = 'ver parciales<br>';
		config_div.appendChild(view_partials);
		config_div.appendChild(partials_span);

		//Show deuterium check
		var view_deuterium = document.createElement("input");
		view_deuterium.type="checkbox";
		try {
			view_deuterium.checked = getCompactConf('deuterium');
		}
		catch (err) {
			view_deuterium.checked = true;
		}
		view_deuterium.addEventListener('click',function(ev) {
			setCompactConf('deuterium',this.checked);
			location.href=document.location;
		},true);
		var deuterium_span = document.createElement("span");
		deuterium_span.innerHTML = c_showDeuterium;
		config_div.appendChild(view_deuterium);
		config_div.appendChild(deuterium_span);


		//Show tech check
		var view_tecnology = document.createElement("input");
		view_tecnology.type="checkbox";
		try {
			view_tecnology.checked = getCompactConf('tecnology');
		}
		catch (err) {
			view_tecnology.checked = true;
		}
		view_tecnology.addEventListener('click',function(ev) {
			setCompactConf('tecnology',this.checked);
			location.href=document.location;
		},true);
		var tecnology_span = document.createElement("span");
		tecnology_span.innerHTML = c_showTech;
		config_div.appendChild(view_tecnology);
		config_div.appendChild(tecnology_span);


		var view_coords = document.createElement("input");
		view_coords.type="checkbox";
		try {
			view_coords.checked = getCompactConf('coords');
		}
		catch (err) {
			view_coords.checked = true;
		}
		view_coords.addEventListener('click',function(ev) {
			setCompactConf('coords',this.checked);
			location.href=document.location;
		},true);
		var coords_span = document.createElement("span");
		coords_span.innerHTML = c_showCoords;
		config_div.appendChild(view_coords);
		config_div.appendChild(coords_span);
		report_input.parentNode.insertBefore(config_div,report_input.nextSibling);
		var light_forum = document.createElement("input");
		light_forum.type="checkbox";
		try {
			light_forum.checked = getCompactConf('light_forum');
		}
		catch (err) {
			light_forum.checked = true;
		}
		light_forum.addEventListener('click',function(ev) {
			setCompactConf('light_forum',this.checked);
			location.href=document.location;
		},true);
		var forum_span = document.createElement("span");
		forum_span.innerHTML = c_forumSkin;
		config_div.appendChild(light_forum);
		config_div.appendChild(forum_span);
		var light_skin = document.createElement("input");
		light_skin.type="checkbox";
		try {
			light_skin.checked = getCompactConf('light_skin');
		}
		catch (err) {
			light_skin.checked = true;
		}
		light_skin.addEventListener('click',function(ev) {
			setCompactConf('light_skin',this.checked);
			location.href=document.location;
		},true);
		var skin_span = document.createElement("span");
		skin_span.innerHTML = c_ogameSkin;
		config_div.appendChild(light_skin);
		config_div.appendChild(skin_span);
		var forum_type0 = document.createElement("input");
		forum_type0.type="radio";
		forum_type0.name="forum_type";
		try {
			if (getCompactConf('forum_type') == 0)
				forum_type0.checked = true;
		}
		catch (err) {
			forum_type0.checked = true;
		}
		forum_type0.addEventListener('click',function(ev) {
			setCompactConf('forum_type',0);
			location.href=document.location;
		},true);
		var forum_type0_span = document.createElement("span");
		forum_type0_span.innerHTML = c_forumType0;
		config_div.appendChild(forum_type0);
		config_div.appendChild(forum_type0_span);
		var forum_type1 = document.createElement("input");
		forum_type1.type="radio";
		forum_type1.name="forum_type";
		try {
			if (getCompactConf('forum_type') == 1)
				forum_type1.checked = true;
		}
		catch (err) {
			forum_type1.checked = true;
		}
		forum_type1.addEventListener('click',function(ev) {
			setCompactConf('forum_type',1);
			location.href=document.location;
		},true);
		var forum_type1_span = document.createElement("span");
		forum_type1_span.innerHTML = c_forumType1;
		config_div.appendChild(forum_type1);
		config_div.appendChild(forum_type1_span);
		var forum_type3 = document.createElement("input");
		forum_type3.type="radio";
		forum_type3.name="forum_type";
		try {
			if (getCompactConf('forum_type') == 3)
				forum_type3.checked = true;
		}
		catch (err) {
			forum_type3.checked = true;
		}
		forum_type3.addEventListener('click',function(ev) {
			setCompactConf('forum_type',3);
			location.href=document.location;
		},true);
		var forum_type3_span = document.createElement("span");
		forum_type3_span.innerHTML = c_forumType3;
		config_div.appendChild(forum_type3);
		config_div.appendChild(forum_type3_span);
		var forum_type2 = document.createElement("input");
		forum_type2.type="radio";
		forum_type2.name="forum_type";
		try {
			if (getCompactConf('forum_type') == 2)
				forum_type2.checked = true;
		}
		catch (err) {
			forum_type2.checked = true;
		}
		forum_type2.addEventListener('click',function(ev) {
			setCompactConf('forum_type',2);
			location.href=document.location;
		},true);
		var forum_type2_span = document.createElement("span");
		forum_type2_span.innerHTML = c_forumType2;
		config_div.appendChild(forum_type2);
		config_div.appendChild(forum_type2_span);
		var hide_report = document.createElement("input");
		hide_report.type="checkbox";
		hide_report.name="hide_report";
		try {
			hide_report.checked = getCompactConf('hide_report');
		}
		catch (err) {
			hide_report.checked = true;
		}
		hide_report.addEventListener('click',function(ev) {
			setCompactConf('hide_report',this.checked);
			location.href=document.location;
		},true);
		var hide_report_span = document.createElement("span");
		hide_report_span.innerHTML = c_showReport;
		config_div.appendChild(hide_report);
		config_div.appendChild(hide_report_span);
		report_input.parentNode.insertBefore(config_div,report_input.nextSibling);
	}
}


////////////////
// BEGIN HERE //
////////////////

get_parts_from_web ();
document.getElementById("forum_compactation").select();
}


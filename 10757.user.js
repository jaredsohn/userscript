/*
 *  This file is part of OGame PLus, based on OGame# version 0.1.4 by Unbrained
 *  Copyright (C) 2007 Mordillo (djmigas@sapo.pt)
 *  Source code 
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
// @name			OGame Plus
// @author			Trucas
// @description			Ogame melhorado para ogame
// @include			http://*/game/*
// @include			http://drago-sim.com/*
// ==/UserScript==


/********************************************************/
/*********+-------------------------------+**************/
/*********|         Script values         |**************/
/*********+-------------------------------+**************/
/********************************************************/

const scriptURL = 'http://userscripts.org/scripts/source/8555.user.js';
const scriptPage = 'http://userscripts.org/scripts/show/8555';
const scriptAuthor = 'Trucas';
const scriptName = 'Ogame Plus';
const scriptVersion = '0.1.5';
const debugMode = false;


/********************************************************/
/*********+-------------------------------+**************/
/*********|  Default configuration values |**************/
/*********+-------------------------------+**************/
/********************************************************/

var defScriptConf = [
		'colorMens', true,
			'colorTrans', '#aaaaff', 
			'colorTransR', '#33ff99', 
			'colorDesp', '#11aa99', 
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
			'AMDesp', true,
			'AMColo', true,
			'AMAlianza', false,
			'AMPriv', false,
			'AMEsp', false,
			'AMEspP', false,
			'AMEspPRecMin', '100000',
			'AMAttack', false,
			'AMMisiles', false,
			'AMRec', true,
			'AMConf', false,
		'dragoSim', true,
		'dragoSimM', false,
		'CSim', false,
		'CSimM', false,
		'ocalc', false,
		'estatisticas', true,
		'portal', true,
		'coresgalaxia', true,
		'coresvg', true,
		'actualiza', false,
		'compactar', true,
		'galaxyTool', false,
			'galaxyToolM', false,
			'GTGV', false,
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
		'coordLinker', true,
			'coordLinkerVarG', false,
			'coordLinkerVarM', false,
			'coordLinkerCM', 'lime',
			'coordLinkerCVG', '#ebff8a',
			'coordLinkerCG', 'lime',
		'flottenInfo', true,
		'debris', true,
			'debrisMin', '20000',
			'debrisMax', '100000',
			'debrisColor', '#6b3715',
		'modifyDate', true,
		'improvedResources', true,
		'specialEffects', true,
		'LMSearch', false,
		'autoUpdate', false,
		'preDest', true,
			'PDGColor', 'orange',
		'proInputs', true,
		'tinyIMG', false,
		'transportMode', false,
		'transportModeEnabled', false,
		'TMDestination', '0;0;0;1',
		'refMens', 0,
		'moonSpy', false,
		'pub', false,
		'delBanner', true,
		'delMenuCom', true,
		'delOfficerMenu', true,
		'delOfficer', true,
		'colorBuild', false,
		'SYConst', false,
		'SYReducible', true,
		'blockUselessTechs', true,
		'volMensaje', '10',
		'volEspionaje', '80',
		'volAtaque', '100',
		'min', 15,
		'max', 30,
		'blockUselessTechs', true,
		'blockUselessTechs', true,
	].join(':');
var defGTValues = '';
var defAllyTags = 'Prueba:y:#00aaff:y:Ally1|Ally2';

var listaElementos, elementoActual; //nos sirven para recorrer
var espionajeSound = "http://sounds.wavcentral.com/movies/starwars/target.mp3";
var ataqueSound    = "http://www.moviewavs.com/0028375953/WAVS/Movies/Star_Wars/imperial.wav";
var mensajeSound   = "http://sounds.wavcentral.com/movies/starwars/target.mp3";

var sonido=0;

// Funcion de aleatorio...........
var MIN = 15; // segundos (MINIMO)
var MAX = 30; // segundos (MAXIMO)


//---------------- EN VISTA GENERAL ---------------------EN VISTA GALAXIA-----------------

//---La mision:-------- Color en RGB --------Tipo de jugador:---------- Color en RGB -----

var esAtacar       = "rgb(000,200,000)";      var normal        = "rgb(255,255,240)";
var eraAtacar      = "rgb(150,150,150)";      var debil         = "rgb(064,128,128)";
var vieneAtaque    = "rgb(200,000,000)";      var fuerte        = "rgb(255,70,70)";
                                             
var esConfed       = "rgb(000,220,159)";      var inactivo      = "rgb(94,255,94)";
var eraConfed      = "rgb(150,150,150)";      var muyInactivo   = "rgb(000,147,000)";
var vieneConfed    = "rgb(200,000,000)";      var vacaciones    = "rgb(0,159,236)";

var esRecolectar   = "rgb(147,164,079)";      var suspendido    = "rgb(000,000,000)";
var eraRecolectar  = "rgb(150,150,150)";

var esTransportar  = "rgb(000,237,016)";
var eraTransportar = "rgb(150,150,150)";
var vieneTransporte= "rgb(120,244,244)";

var esEspionaje    = "rgb(245,160,075)";
var eraEspionaje   = "rgb(190,120,025)";
var vieneEspionaje = "rgb(255,083,083)";

var esDesplegar    = "rgb(009,208,208)";
var eraDesplegar   = "rgb(150,150,150)";

var esColonizar    = "rgb(255,255,255)";
var eraColonizar   = "rgb(150,150,150)";

var esMantener     = "rgb(000,255,000)";
var eraMantener    = "rgb(150,150,150)";


if (getScriptConf('coresgalaxia')) {
	if(document.baseURI.indexOf("galaxy.php") != -1) { //Si esta abierta la parte de galaxia...
		listaElementos = document.getElementsByTagName('span');
	
		for (var i = 0; i < listaElementos.length; i++) {
	              elementoActual = listaElementos[i];
	          
	          if (elementoActual.className.substring(0,6)=='normal')
	        	{
	        	elementoActual.style.color = normal;
	        	}
	
	          if (elementoActual.className.substring(0,8)=='inactive')
	        	{
	        	elementoActual.style.color = inactivo;
	        	}
	          if (elementoActual.className.substring(0,12)=='longinactive')
	        	{
	        	elementoActual.style.color = muyInactivo;
	        	}
	          if (elementoActual.className.substring(0,6)=='strong')
	        	{
	        	elementoActual.style.color = fuerte;
	        	}
	          if (elementoActual.className.substring(0,4)=='noob')
	        	{
	        	elementoActual.style.color = debil;
	        	}
	          if (elementoActual.className.substring(0,8)=='vacation')
	        	{
	        	elementoActual.style.color = vacaciones;
	        	}
	          if (elementoActual.className.substring(0,6)=='banned')
	        	{
	        	elementoActual.style.color = suspendido;
        		}
		}
	}
}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|     Translation section       |***************/
/*********+-------------------------------+***************/
/*********************************************************/

const ilegal = ' <font color=red title="This option is directly/indirectly forbidden by the regulation it OGame">(ilegal)</font>';
const ilegalCom = ' <font color=red title="This option is illegal because it implements functions of Commander ">(ilegal)</font>';
const ilegalPub = ' <font color=red title="This option is illegal because it eliminates the advertising">(illegal)</font>';
const ilegalMenu = ' <font color=orangered title="This option is illegal because it modifies the lateral menu">(illegal menu)</font>';
const ilegalDudosa = ' <font color=orangered title="This is potentially illegal option">(casi-ilegal)</font>';
const semiLegal = ' <font color=orange title="(Algunos dicen) that this función is 100% legal">(ilegal?)</font>';
const experimental = ' <font color=lightblue title="Función not completed">(experimental)</font>';

const c_mainTable = 'General adjustments';
const c_portal = 'Add buttons to select fleet in Vestibule (before launch)';
const c_pub = 'Remove Ads';
const c_coresgalaxia = 'Modify colors in view in Galaxy agreement in the state of player';
const c_coresvg = 'Modify colors in General View (as the mission?)';
const c_actualiza = ' Automatically update General View';
const c_estatiscas = 'Show changes in ranking in Statistics ';
const c_colorMens = 'Color messages';
const c_colorTrans = 'Incoming messages at a planet';
const c_colorTransR = 'Messages of return of a planet';
const c_colorDesp = 'Messages of transference of fleets';
const c_colorAlianza = 'Messages of the Alliance';
const c_colorPriv = 'Private messages';
const c_colorRec = 'Messages of recyclings ';
const c_colorEsp = 'Messages of suffered espionages';
const c_colorConf = 'Delivery of resources of another player';
const c_colorColo = 'Messages of collonization';
const c_colorMisiles = 'Messages of attacks with (misseis)';
const c_autoMark = 'Automatically mark transport messages, collected, etc.';
const c_allyTable = 'Activate table of Alliance in side menu'+ilegalMenu;
const c_tablaAllyTable = 'Alliance table Configuration';
const c_coordLinker = 'Color to enhance coordinates links in messages and general view';
const c_tablaCoordLinker = 'Coordinates Links Configuration';
const c_coordLinkerVarG = 'Color distance to your main planet in the (dependent) general view'+experimental;
const c_coordLinkerVarM = 'Color (in mensajes) dependent of in the distance your main planet'+experimental;
const c_coordLinkerCM = 'Color links in Messages';
const c_coordLinkerCVG = 'Color links in General View';
const c_coordLinkerCG = 'Color number of the planets marked in the Galaxy';
const c_dragoSim = 'Add link to Drago-Sim in the espionage messages';
const c_dragoSimM = 'Add link to Drago-Sim in side menu'+ilegalMenu;
const c_CSim = 'Mostrar links a CSim en los mensajes de espionaje';
const c_CSimM = 'Mostrar link a CSim en el menú lateral'+ilegalMenu;
const c_ocalc = 'Add link to O-Calc in side menu'+ilegalMenu;
const c_modifyDate = 'Show date in the complete format in Portuguese';
const c_flottenInfo = 'Show information of load when choosing a fleet';
const c_debris = 'Activate advanced detachment of (destroços)';
const c_tablaDebris = 'Configuration of detached (one of destroços) (info) <a color="lightblue" title="De branco (min) à cor seleccionada (máx)">(info)</a>';
const c_debrisColor = 'Color of detached ';
const c_debrisMin = 'Maximum detachable amount of (destroços)';
const c_debrisMax = 'Amount so that the color is maximum';
const c_compactar = 'Uae compact attack reports';
const c_tinyIMG = 'Small images of Buildings, Research, Defenses and Hangar';
const c_proInputs = 'To add buttons for control of units in the Hangar/Prohibited/Fleets';
const c_allyTags = 'Color TAG of the alliances in Galaxy View and Statistics';
const c_tablaAllyTags = 'Label alliances in in Galaxy View and Statistics ';
const c_galaxyTool = "Usar <a href='http://www.galaxietool.de/spanish/index.php' title='Qué es esto?' target='new'>Galaxy Tool</a>";
const c_GTGV = "Mostrar link a galaxia en galaxyTool al lado de Galaxia en el menú lateral"+ilegalMenu;
const c_galaxyToolM = "Mostrar link al servidor de GalaxyTool en el menú lateral"+ilegalMenu;
const c_tablaGTool = 'Configuración de Galaxy Tool ('+location.hostname+')';
const c_improvedResources = 'Show extra information in the resources section';
const c_moonSpy = 'Make possible to watch moons and to collect (destroços) in Galaxy'+ilegalCom;
const c_refMens = 'Intervalo de actualização da mensagens (0 desactiva)'+ilegal;
const c_transportMode = 'To use way has carried ';
const c_transportModeTable = 'Configuração do modo transporte';
const c_transportModeEnabled = 'Activar por defeito o modo transporte';
const c_delBanner = 'Eliminar banner da Vista Geral'+ilegalPub;
const c_delMenuCom = 'Eliminar letreiro Comandante do menu lateral'+ilegalPub;
const c_delOfficerMenu = 'Eliminar letreiro de Casino de Oficiais no menu lateral'+ilegalPub;
const c_delOfficer = 'Eliminar os icons de publicidade dos Oficiais em todas as páginas'+ilegalPub;
const c_colorBuild = 'Mark in red too expensive constructions and researches'+ilegalCom;
const c_SYConst = 'Indicate maximum of units to create in the hangar/defense and allow to construct more than 999'+ilegalCom;
const c_SYReducible = 'Add buttons [to occult/] to show units in the hangar/defense ';
const c_AMTrans = 'Incoming messages at a planet';
const c_AMTransR = 'Messages of return of a planet';
const c_AMDesp = 'Messages of transference of fleets';
const c_AMColo = 'Messages of colonization';
const c_AMAlianza = 'Messages of the Alliance ';
const c_AMPriv = 'Private messages';
const c_AMEsp = 'Messages of suffered espionages';
const c_AMEspP = 'Messages of done espionages';
const c_AMEspPRecMin = 'Espionages with little resources that this amount';
const c_AMAttack = 'Information of attacks';
const c_AMMisiles = 'Acknowledgments of misseis attacks con';
const c_AMRec = 'Messages of recyclings';
const c_AMConf = 'Messages de Entrega of resources';
const c_ATMembers = 'Show link to the members of an alliance (commanded by puntuação) ';
const c_ATTopP = 'Show link to top 100 players';
const c_ATTopA = 'Show link to top 100 aliances';
const c_ATForo = 'Show link to forum';
const c_ATCC = 'Show option to send CC (you will have permission)';
const c_ATBaned = 'Show link to the page with banned players ';
const c_ATColorN = 'Color the name of alliance in the table ';
const c_specialEffects = 'Activate special effects';
const c_autoUpdate = 'Automatically check for updates (once per day) ';
const c_LMSearch = 'Change search option in side menu (for a form) '+ilegalMenu;


/********************************************************/
/*********+-------------------------------+**************/
/*********|         Script graphics       |**************/
/*********+-------------------------------+**************/
/********************************************************/

const ledGreen = 'data:image/gif;base64,R0lGODlhDgAOAMIGAL+/vwAAADLNMi6LV5j7mC9PT////////yH5BAEAAAcALAIAAgAKAAsAAAMqeBoc+oFI4RYxRIjh4p0bI2TZYDKkthWiag5soA0bzB7Ba1e4fT+4xiMBADs=';
const ledRed = 'data:image/gif;base64,R0lGODlhDgAOAMIGAL+/vwAAAP9EH+ozIOJtWZ02Ev///////yH5BAEAAAcALAIAAgAKAAsAAAMqeBoc+oFI4RYxRIjh4p0bI2TZYDKkthWiag5soA0bzB7Ba1e4fT+4xiMBADs=';
const lessButton = 'data:image/gif;base64,R0lGODlhCQAJAPAAAAAAAP///yH5BAAAAAAALAAAAAAJAAkAAAggAAEIHEgwgMGDAQQiPKhwYUIADwc+dDjRYcOFBDMCCAgAOw==';
const moreButton = 'data:image/gif;base64,R0lGODlhCQAJAPAAAAAAAP///yH5BAAAAAAALAAAAAAJAAkAAAghAAEIHEgwgMGDAQQeBLCQoUGHCRkSlAixYsWGCBtOHBgQADs=';
const DSimIco = 'data:image/gif;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAEgAAABIAAAAAAAAAAAAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAP8AAP8AAP8AAP8AAP8AAP8AAP8AAP////////////////////////////////8AAP8AAP8AAP8AAP8AAP8AAP8AAP8AAP8AAP////////////////////////////////8AAP8AAP////////////////8AAP8AAP8AAP////////////////////////////8AAP8AAP////////////////////8AAP8AAP8AAP////////////////////////8AAP8AAP////////////////////////8AAP8AAP////////////////////////8AAP8AAP////////////////////////8AAP8AAP////////////////////////8AAP8AAP////////////////////////8AAP8AAP////////////////////////8AAP8AAP////////////////////////8AAP8AAP////////////////////////8AAP8AAP////////////////////8AAP8AAP8AAP////////////////////////8AAP8AAP////////////////8AAP8AAP8AAP////////////////////////8AAP8AAP8AAP8AAP8AAP8AAP8AAP8AAP8AAP////////////////////////////8AAP8AAP8AAP8AAP8AAP8AAP8AAP8AAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const CSimIco = 'data:image/gif;base64,R0lGODlhZABkAOYAAJGZpYOMm73Bybe8xHJ7jHuElKOptJqhrWFsfoyUokNQZWl0hcbJ0BkqRYqRnGxxe1VcZpSbqBYmQUFOZElVaUNMW0VSaElTYx4uSHyBisnM0kVHSzU3PFRXXCk5UoSJkktYbTJAWXF0eS08VVFdcTc7QlVhdMTIz8LGzmNqdSU0ThojMGZxgjhGXUpQXJ2ksIGFjGRnbDxJXURKVTZEXAYLE7/Ey6uxu3p9gltkcyktMl5pfD1BSFtgajxKYWRugCAwSpGWnS0xN1lleCIyTImOliMmKztFU3V6gzNCWm54iT5MYi8+V8PGzLK3v2lsciY2T5qepDpIYB8vSUlMUE5bb2t2h6KmrRcoQxwtR5eeq6CmssPHzsDDyRYaIjVEWr/DyjJAVneBkKmuuYCGkHB2gIePnS46UC01QXh+iS45SxssRyw7VJKXoaast2BncUBHUj9NZCc3UHV/j36Hlis6U8HFzWdueiQySyQzTc/S2BsrRoCJmHB4hhQlQRMkQCH5BAAAAAAALAAAAABkAGQAAAf/gH+Cg4SFhoeIiYqLjI2Oj45+kpOUkJaXmIaUm5sSnp+gnKJ+maWPo6CgWKusra6sqZ+jprR/oqmvDbq7vL2+Da+porWQnZ+uvXtry2tZWRjQ0dLOzGt7vq2hlcSKxhKtu8rN0FPlU0Do6errQOZT0FnL17rZnpvch5THq+Hj5elE8ghUQVAFlIMIDxZUITAPkXTlMMSbB2yVrEn4COnzxE+XMgz/gAQkCEWOHA8oUdZZyXJlSpQmoRB0iC7isl0W7WHMaEvSPo9rQJ4bWVJlHTYjko5gwrSpU6Uj2Lj0IEemwJoYrNHLuRPfJI4d/Yk0eHJlUqYh0oZIwrat27Zq/5kmlUrVarsp8XBi0UnKq89vWHQ1G5qnaJ2zadl+odGisePHkFvQ+PKFbQi5bOqqePhujV6dGf+GBTm27NK1SRg3lsLah+vXsGGzluJ4cpLLUakybJf1Gte+3HyOPpdHxcnTqVdL8bEkTpwJ0KNLnz7B+RLXtCXfZjKiTtU8vD1XBE1MtGDSxeUcZpJ8efMJCuJbmE+/vv368avH8ZH9dncPUIDXGT3k1SJcYHtkQZxxh4XwRQvLPafAfBRUCMKFGGaoIYYVUjBffHEsQdsXl2UWYHjjSRKcH9+cV1qDD/oQx4QWUIBhFThWQcKOJOToI48+cvjhflLQUCKAAoq3l/8EwNEiXAN7gEQEgyM42IIPE9R4IY4TyKAGGkKsIGYNZJZpppgrCIGGGjJMgOOFHiogopFM1OHBZkBklWJwgDWwBnHHWbnEhDKcgcYKXtSgAxod9PDEB5AacMOklE5qAKQfPNFDB2joUIMXK6BxxhEWKBBHkSF0J4cK7WRBYJOmsIiglCp4sFQSV6qRqA4z9PABAG4YYMAWW7xg7AHIJqssssa+QKywbgDwQQ8zoPEpGiKSOAKSeXq2l4oGtvgnEAyyd+UEXnzwwgFaRABAAvDGi0ASU0BhozsgwDsHBVBMkQQCUpgjhRVVQCTBFKsQUQcRDXiCE5OwZiKrn1MQAYX/rSHQIEUcFtQQQQEghyyyAiS4wYAAZpDAwMoMUPBDFXKYIQADblDwAssvfEEAyxp84YAddvABBAJjgOEEHVMAQ8oOLwgggBNmLIHJxBgAkYd65vqgAAU1mMHC12CDHccQLK88M8sUDAGFE2WfzPIBTOy8sgZO2AC0DQPYAMbeYNDxDQZNOy24ACZY4hOUVddapcYcc12ACZBHPsQOO0BxNssnlF0qARq0zcAJJ3ChhRxKcGE6A2DYfbcNevPNIh2Cv7CAE0474UExfgT2p8W24oqlBSDUoIR0ILCwwB0VVLG3AAME4EMBg0vtxgDUO3HhAE1kfgDpQNtxwgJ8oNB9/wJztA5GHFMMjsEfFAhOQE8RayLuFFfXYe6gFFRRww9OmfDpChiwAtBMpwIFNKAJCGyCAU1nOjGcQQ1zAIPT2iAHK7DOBlyQwARQID47KGACrNubcyQ4uMEBgEUQ60ohJvanq7HBQRsDnv6GoI4h1CAFKZCBEkJHQAXkoQkcRMECGViAxhQAdCeIgAeswLcMTgCIHIzPBcFQHb6V0GkRyN2SUhixiWWBXBiDUJZAQIIamKAV/sPhBYbAQy4kwAIBgKIQ82AA051gADu6nBKZuDcUSEABpouiAlY3ASDw7QWS8NeTKrKkbQjCi2Acge+2RsYakIAQZbzDHd4AhQG0Mf+QQVTAF0qHxMyVTYkLEJwfAcnA+HTQBoXkA98csICiGS0JyphHTlI4CKqB8X5bq4L/SECJTN7hBz5gYxsHEEgu1EgFBgAdy/RYBz6CYZVIdKYCOAi0CTCBCFvgmzjp0IB35IWRfHlki6oGBfslIYYgEKYlQVHGB7DgBz9oAQmiOQAlVIGBzgSBAlQQgJk5gQBy00AE2GBNbCJxPlzgpgKSwAYiWGELenOCA+KwBqu1Kgu6bGRffNlOJnwBniTwnwl44T97fk0KBFBBlFSQAIBKoQoIMIEUiJAFOYDAAtFoAAXy8IkGYCAM8tiDZHjBBlO1wANZ2AsWMHCx7xDBnL7/sQi4qGYx+52UY2T03xCkYUOX6gh0BjgAMxk4AAzs4AcLUAIBxCAGOvAhAGZwABru4AOlDKEEPSiDFaywgHvuYAgmIAEIPFQd/kgmLf8J0FUlklXQcLWkXwVeSmswhIbkoaxfe14pP6kEGSCABVYgwBwKYFcz5DUBHHiAKBezAx70oA8IVQJhf4CAIQyhR4u1wASWIKIWbMdEDsGLkr5Fist6FaX+Q0BLEFADl47gAKNlYACSMATUKmG1dMCrAxIAAACUoAwgIO4SWMCDN6QhDXOYAwGUUFgEHDaxVQiuqfhDJ+S2qrIqIulzwbrZH6glBD+o7teqMAISBCCad2zD/xCSQAK4ypW1eIUXACKghRIgwQQdUsIG3pCBkIlBvoRlgX0RC1zGFvdIJ5IIgZhki3UCoaS4mlH+/LeA2UhhATW4A9h+AAIaeGAPe5gCEyyAgNOmtq4BGO+GtYAsHmRgB5ETwwZSQIYP8IEPdCjAiee7AN7et8XC9YFxmZCZzSh3T75UHK7wJ08lxCc+SggyPu+Jzyb7GQE/QO1cwytlKjtrCxsggxX8zAcq3OEDRcirGQIA5gLIl76G9a0J8ivcJazZO24GKTBoDEnFheBcmq3BHDI0Bz3jc8+v3rOgoeyADR/gBcIqQhGEAAE4cODXOvCCEXRA7GJzgAfI7oALIP+Qg9Oq+LA9ooCcWnAZqoBHT0uqse6shjGNjVF/j4tcAVwt67AtIK5zLUAAyJuBB8TABSXgAAQgEAMcFCEK+KbbAJhHPeoZIAgAF8EDekAFDhhBCCWAgwtAsGlpezpVALqqqyyibYq50KQbC2YN+PBnOtQAAoEO9NfOvYDByhXKKeCBEDoggg+o1WkDuEL1nOCEmBtgDG7IubB2voWdQysIZHgCvL2ggyNQYAKoYsOqgCDqvfREdxXD8ZUo2TWSL6AAJTDCp4yABh7AAQIkgIBc5wDlNFDhCjfIObvaEARdtyHncL9BGyKALC3YPQLuKm+89j7lWxdBBx4SURKYEHH/vIz66RSbUhilMMYaJAChCBUDH8b7gTTcYVMcKEEJvMD5zntBCA7AFLw4XKx12d3uL/hAlF0bgNZ/mQ6wF5nsQRYBLzBWzamSA3gmLoGefCNKYHzhV7dWAwDMnrXhNYOGOXyAnhsg5w6AgAHi5YDqu/b62AdAGsRg4jHrlrAkD1vYzGD7C1THuNtiFUidXvEv1i9rWaqBFlpP//pfv/oanjKVYdABAMT3/1CmfLbWfBGABGkAAwgIAxmQBgEQZmJAZj9wX5EDOQWwAhdwAaZSJIQHBUSAbeoEdYpXJcNXAwbwLnvHd+Wlf7fmLJfSAWbwaiwwB22gazggAvP2ayWw/wEHVwLIxgMbsAG/xgFU4AIdkAJPUAZ9oAQRaAI/pQQr4AIYOAG4p3R5MAXe8oF+UjX1I0kQEgdG0ANk0Hzrwi54x2F2xyzO5wZjcAMO0AHhZgIIkAY5SAUdQG9PgAM48AQdoAMdEANP8AQiEIgC526bQgUbEG9CQIdvIGRmYAQVEIUPty1VOHFY2AAKonhskDUyEGzXUoS/AndwNwaiOCk05wRtAAGrdiFDUARUIAJ5GAMdAIRGcGyOIgJIgAMZkIAZkAE4gARIIHB/CItUoHI6UAJoAIUXYAGnkgTpx3TAoE7zYzUXcystIANLAB8VwAOdwnk1sAKa9wYxEANpAP9wbYBvUZABHcACZ7COSfAGRiBsmUcF9BaIt5gBkOYAQdAG+ghwDqBrH6CASFAGD5ACbzBvj3gBHaIAPkADhKd+z+h7CKIgVhMouCIDzFEB8XGBF+gCcDADmVcCQkBsQiAEvzaSFcAKZ/AEQlCLuIiAkKJrQRAFB3AFV+BzNIksUcB2oQcDaVAGm5QDPbAjVRB41FYHHEiJEKk7tKIeVZIcMmCNFYCRGkkB89YDOZADb5ACd/AAZYAEMbABJIAHYskEb8CDPrgBVJCWaukCVBAGSMYDHRCXcjmXLsCWhrgByFYCLpADibVYSJd7HfiQ5kExL3IrqvGU1wgfCBlPKZX/A1rJlQaYAmBZEB5gAW/wAJiZmZr5ADJAANRDAC2gSaJ5BzhUmqZJkHJoX4klbVLAjLqHAXuABY+EQvyQIENhHB6QiWtxmNaomPnTmG+1AH2QBu1GBSaAEHJwBg5SGXARAmFQJzQgTjSgHi9RndaJAEYQgb8lUEvAkB5QhbHZS7ISGH4ikVNyEkjBHkmwGNXIHJQkTJMDV4P2AMY5FdYZEwoBBHEgTnHwRXchDQAaDUOQnb3FhBbQnQ1phbI5m2AhGOZZGB5wFMjBnlhCSSQQnwswn1QwBE4hF1DBBiBqJ0cWAXsTAQ2gEAvBEJ7lWQOaAvdVBQfaAgm6BgsKPw3q/yd/siBlkZ5MYCUyUiPwiQBxVVf0uQOU8RbNmRZNAQQSQAM0cDBTAApV0zANQC5r4DBEgJ1XyZcw+nB3oqAagUJ9AiVBQRhkEaGHEQapwXiahaEEUAD06QBKMKd0Olh2OlgkZwIW8DmgYwF7UEoI5QQn4AQkwAQJwDpbAAJSYAQQADk9EqMh8KU0GqZi2hHlSRpWUxxFkYlrOkYXugMs8F1i4AI6MJIkGYQ4qHmqaowT0AWu2gUTIAGv2gVOMKu0egLdYwchwKiN+qheqgJgSqn7QJ6XGhIBcTHdxqZkNDmhSnYLKJB/+IeYKYjU2gMWUEoWsAaegzldwAC5SgAWCP92ihWjM1qjs/kVYEGsyvAM5jAl05gxMRSk6CZfAVkG9uqLt4iHuMiLKUABZUMBWVA2hHo5XUACAxBEByABFwB2nIagkmqu4omugGGpOBoUY9FtWLJjQwBXdwABD/BeuwgDXQZpulayRVAGFKABKqsBFDAFK6sBcyADL7CyEfAFWsBALyABC/cmCumd4AmxESuxE2upHxF8p6Y1O7YDOcABHcADOgCXgfUB+KiPG1aGq/ayIAAELzsHS7AFKssAEUAD2AU6Obuzi6UArSmJUxCe3cAJsdARwGccVdICS9CmILABALBu7RYDBZeIVOCHadBlDkAHIIC1Wvu1BKAGWuD/qk2gBUlwADijszbil2n7mmx7CACgBwAgCJl7QpSAAnpgBRLABXpQugQQgic1ATt2ARtgBqqFYQJoj0/wABBQl1QgBEswq7GaQFxAAGEwsyr7Ao+LM0+IkB4SB9Q2AnIQmEDLuZubgs+7uYKAAlbgB9TLBVYQGFlAunPwQgzABwpARhfAAwlwfHYlXvHSBle7siDgsisLmsDLADlzMyuzBStwkKXycEbJUw9pCOX1B9ALwNL7B9RLwFYAunqgBHvAvR5wAgUQr9kYAfU3wRQcAFaQsitLARjwsvC7si/QAsCrAfY7AwoQhRp4J87YvJxbus/LwoQAulZgwKOrBO53/wJikDH4k40vYIIn2MPx0r7mcCH4wgIBUw5SQMTmMAErAAcVAB0iAnGT2L+I8L/OOwgFXMAswgU0PAVcMAcewB5SULcTIAQP4HLFUndlmMZqvMZszHy3tgUHUARPoANMXAFLIANG4h1XdYWYG73/S8UGbMDUO8Nr0LsqcAJ6UADeZgEV0CmzuAFPkAZF8ALBIizEUnrNksmH5nzP9wJFUJwGV6o8cARPKQPJi8Lr13tTrLkrvLkHPL2hC8tKgAW9WzGIfMOMAx8KUAFHAJIhaQRGwAN0mJlSW33GXH0fkJkdMIzDNpKZ14OjfASNQQODhySGx37l0ScWC6GL4x4TUP8BMwAH4tyRM9CDQWiq6GyqqtqDMxDO43wE8AzPlFEZbLZ02KbK5TExtnmeX5wxV0JcURnQAh3Q7VzQBn3Q4ByVBQ3OMyAD8lwZuFF4E4fNBjKe5Vkx5WIl1rgEUZmRGnkBdRnSIj3SIw3SLhAfAW3KlfGc/pUX2YYIPncKHAElzyCNEdqjD2KR1ygfU4mQH/3TQP3T+XEdKs3S3CJjoxY/pUCbuiOREKqbD+LN8kEhHVLVVn3VyVgqH7QfKg1jAtJ035IIASzAgKwJFm2Jl/jUPYor7iEhFFIjVx3XHvIhIHId2pEqdnIib8YVocHUNC0lELoe/swaxCUhU30f9pH/HyFCXLRBzRG9Kl+tJAViCPTHB4JwV5SGCF/WemOaIIC9qcihGq2hXs3hHKZt2qQ9G3cd0UjyEBKxXBDDE4Nwowlinme6Hj26m6qhHD7GGo/hpLdxGdyRGVWBJ3ghauMR24kAee/zB8yNCMzN1OQpFiNhEiiBFEuR2we23dvtoZmhGTRx3MslUrItnj/hoBIpEppaFCmxEiAKFXMhFSIKEzLBEJxx3CG1RSp0CH8mCP3N334mCX82sUDhDEKBDgExEAaREAxe3ypKBA9xF85wTuiUTuWdCKpAses64UIREuxQE+YgEROuFXqxRVzkCDxySX+Q4oLA4ivOIy3OIxuRo64U6xHiUA04bg0UUeK7xEVKfeGI4La48ApEXuQ9zhf7DQnSIQhL/gdN/uTR0baoEAtUPgrgAuRYnuW1gBohIAgHJgjB3eV/EOZgvhZiruVonuZqngkyIROCYBAGIQgJ8eZw/uYKseZ4nud6bghIpgyC0Od78OdItgaCjmSCYA3WsOfcQB2M3uiOPlyKHumSPumUXumWfumYnumavumc3ulrHggAOw==';


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
	var confStr = GM_getValue(confName, '');
	if (confStr=='') {
		GM_setValue(confName, [nombre, valor].join(separator));
		return;
	}
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
	return getConf(nombre, "scriptConf_"+location.hostname, defScriptConf, ':');
}

function setScriptConf(nombre, valor) {
	setConf(nombre, valor, "scriptConf_"+location.hostname, defScriptConf, ':');
}

function getTech(nombre) {
	var tech = getConf(nombre, "techs_"+location.hostname, '', ':');
	if (tech) return parseInt(tech, 10);
	else return 0;
}

function setTech(nombre, valor) {
	setConf(nombre, valor, "techs_"+location.hostname, '', ':');
}

function getSession(hostname) {
	return getConf(hostname, "session", '', ':');
}

function setSession(hostname, session) {
	return setConf(hostname, session, "session", '', ':');
}

function getUserName() {
	return getConf(location.hostname, 'userName', '', ':');
}

function setUserName(name) {
	return setConf(location.hostname, name, "userName", '', ':');
}

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

function getMainP() {
	var temp = getConf(location.hostname, "MainP", '', ';');
	if (temp) return temp;
	else return '1:1:1';
}

function setMainP(MainP) {
	return setConf(location.hostname, MainP, "MainP", '', ';');
}

function getSpyReports(SpyID) {
	return GM_getValue('SpyReports_' + location.hostname, '').split(':y:');
}

function getSpyPosById(SpyID) {
	return getBooleanConf('SpyReportIDs', spyID);
}

function getSpyPosByCoords(coords) {
	var validatedCoords;
	if (validatedCoords = validCoords(coords))
		return getBooleanConf('SpyReportCoords', validatedCoords[0].replace(/:/g, ';'));
	return false;
}

function getSpy(n) {
	return GM_getValue('SpyReports_' + location.hostname, '').split(':y:')[n].split(':x:');
}

function saveSpy(SpyID, SpyCoords, SpyContent) {
	var validatedCoords;
	if (validatedCoords = validCoords(SpyCoords)) {
	// y por que no con setbooleanconf??????
		SIDs = GM_getValue('SpyReportIDs_' + location.hostname, '');
		GM_setValue('SpyReportIDs_' + location.hostname, (SIDs!=''?SIDs + ':':'') + SpyID);
		SCs = GM_getValue('SpyReportCoords_' + location.hostname, '');
		GM_setValue('SpyReportCoords_' + location.hostname, (SCs!=''?SCs + ':':'') + validatedCoords[0].replace(/:/g, ';'))
		SC = GM_getValue('SpyReports_' + location.hostname, '');
		return setConf(SpyID, SpyContent, 'SpyReports_' + location.hostname, '', ':y:');
	}
	return false;
}

function delSpy(n) {
	
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
unsafeWindow.getSpyReports=getSpyReports;
unsafeWindow.getSpyPosById=getSpyPosById;
unsafeWindow.saveSpy=saveSpy;


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
/*********|        Misc functions         |***************/
/*********+-------------------------------+***************/
/*********************************************************/

function fill(string) {
	while (string.length<6) string += '0';
	return parseInt(string, 10);
}

function validCoords(coords) {
	try {
		var sepCoords=coords.match(/^\[?([1-9]):([1-4]\d{2}|[1-9]\d|[1-9]):(1[0-5]|[1-9])\]?$/);
		return sepCoords;
	}
	catch (e) {}
	return false;
}

function getColorLinker(planet) {
	var mainP = getMainP().split(':');
	var coord = planet.replace(/[\[\]]/g, '').split(':');
	var color = '';
			
	var distancia = 0;
	if (coord[0]!=mainP[0]) {
		distancia = 1000000 + 5000 * (Math.abs(parseInt(coord[0], 10)-parseInt(mainP[0], 10)));
		color = 'red';
	}
	else if (coord[1]!=mainP[1]) {
		distancia = 2700000 + 95000 * (Math.abs(parseInt(coord[1], 10)-parseInt(mainP[1], 10)));
		color = 'orange';
	}
	else if (coord[2]!=mainP[2]) {
		distancia = 20000000 * (Math.abs(parseInt(coord[2], 10)-parseInt(mainP[2], 10)));
		color = 'yellow';
	}
	else {
		distancia = 0;
		color = 'lightblue';
	}
	// eliminar color de los ifs y hacer que el color dependa de la distancia
//	GM_log(distancia);
	return color;
}

function setHiddenShip(shipId) {
	hideId('photo_'+shipId);
	hideId('desc_'+shipId);
	hideId('input_'+shipId);
	showId('mini_'+shipId);
	return setBooleanConf('hiddenShips', shipId);
}

function delHiddenShip(shipId) {
	showId('photo_'+shipId);
	showId('desc_'+shipId);
	showId('input_'+shipId);
	hideId('mini_'+shipId);
	return delBooleanConf('hiddenShips', shipId);
}

function isHiddenShip(shipId) {
	return getBooleanConf('hiddenShips', shipId);
}

function setHidden(n) {
	return setBooleanConf('hiddenTabs', n);
}

function delHidden(n) {
	return delBooleanConf('hiddenTabs', n);
}

function isHidden(n) {
	return getBooleanConf('hiddenTabs', n);
}

function checkUpdates(manualUpdate) {
	if (manualUpdate || (new Date()).getDate() != GM_getValue('lastUpdate', 0)) // Se actualiza solo de forma manual o de forma automatica una vez al dia
	GM_xmlhttpRequest({
		method:"POST",
		url:scriptPage,
		headers:{
			"User-Agent" : navigator.userAgent,
			"Accept" : "text/xml",
			"Content-type" : 'application/x-www-form-urlencoded'
		},
		onload:function(details) {
			try {
				GM_setValue('lastUpdate', (new Date()).getDate());
				var newVer = details.responseText.match(/Version (\d+)\.(\d+)\.(\d+)/);
				var Current = scriptVersion.match(/(\d+)\.(\d+)\.(\d+)/);
				if (fill(newVer[1])>fill(Current[1]) || (fill(newVer[1])==fill(Current[1])&&fill(newVer[2])>fill(Current[2])) || (fill(newVer[1])==fill(Current[1]) && fill(newVer[2])==fill(Current[2]) && fill(newVer[3])>fill(Current[3]))) {
					if (confirm('Hay una versión nueva de '+scriptName+'!! Quieres instalarla?')) {
						win = window.open(scriptURL, 'Actualizar script');
						if (!win) alert('Firefox está bloqueando las ventanas emergentes, habilita las ventanas emergentes para TU SERVIDOR concreto (el titulo de esta ventana de aviso) o bien dale a mostrar la pagina en el icono de bloqueo')
					}
				}
				else if (manualUpdate) alert('Tu versión es la más reciente');
			} catch (e) {}
		},
		data: ''
	});
}

function puntuar(numero, separador) {
	if (!separador) var separador = '.';
	var strNum=String(parseInt(numero, 10));
	var strNum2='';
	var i=0;
	for(i=strNum.length-4;i>=0;i-=3) {
		strNum2=(strNum[i]=='-'?'':separador)+strNum.substring(i+1, i+4)+strNum2;
	}
	strNum2=strNum.substr(0, i+4)+strNum2;
	return strNum2;
}

unsafeWindow.checkUpdates = checkUpdates;
unsafeWindow.fill = fill;
unsafeWindow.setHiddenShip = setHiddenShip;
unsafeWindow.delHiddenShip = delHiddenShip;
unsafeWindow.isHiddenShip = isHiddenShip;
//unsafeWindow.validCoords=validCoords;
//unsafeWindow.puntuar=puntuar;


/*********************************************************/
/*********+-------------------------------+***************/
/*********|    Functions for proInputs    |***************/
/*********+-------------------------------+***************/
/*********************************************************/

if (getScriptConf('proInputs') && ((((document.baseURI.indexOf('mode=Flotte')!=-1) && location.pathname=='/game/buildings.php') || (document.baseURI.indexOf('mode=Verteidigung')!=-1)) || location.pathname=='/game/flotten1.php')) {
	unsafeWindow.incrementar = function incrementar(variable) {
		return variable += parseInt((1+variable)/2, 10);
	}

	unsafeWindow.contador = 5;
	unsafeWindow.incremento = 1;
	unsafeWindow.pressed = false;
				
	unsafeWindow.cambiar = function(nombre, aumentar, max) {
		if (debugMode) GM_log('contador: '+unsafeWindow.contador+ ' incremento: ' + unsafeWindow.incremento);
		var input = document.getElementsByName(nombre)[0];
		if (aumentar) 
			var newValue = parseInt(input.value, 10) + unsafeWindow.incremento;
		else
			var newValue = parseInt(input.value, 10) - unsafeWindow.incremento;
		if (unsafeWindow.pressed) {
			if ((newValue<=max && aumentar) || (newValue>=0 && !aumentar)) {
				input.value = newValue;
				setTimeout('cambiar("'+nombre+'", '+aumentar+', '+max+')', 200);
				unsafeWindow.contador--;
				if (unsafeWindow.contador==0) {
					unsafeWindow.incremento=unsafeWindow.incrementar(unsafeWindow.incremento);
					unsafeWindow.contador=5;
				}
			}
			else {
				if (aumentar) input.value = max;
				else input.value = 0;
				unsafeWindow.contador=5;
				unsafeWindow.incremento=1;
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
			}
		}
		if (parseFloat(level)>0.1) setTimeout("hide('"+path+"', '"+list+"', "+(parseFloat(level)-0.1)+")", 30);
		else {
			object.snapshotItem(parseInt(pos[0])-1, 10).setAttribute('onclick', "show('"+path+"', '" + list + "')");
			object.snapshotItem(parseInt(pos[0])-1, 10).title='Click aqui para expandir';
		}
	}
	function show(path, list, level) {
		var pos = list.split(':');
		var object = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
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
			object.snapshotItem(parseInt(pos[0])-1, 10).title='Click aqui para contrair';
		}
	}
	function hideId(id, level) {
		if (!level) var level = 1.0;
		var object = document.getElementById(id);
		object.style['opacity']=level;
		if (parseFloat(level)<0.1) {
			object.style['display']='none';
			object.style['opacity']='1.0';  // por el caso de mostrarlo desde otro frame
		}
		else setTimeout("hideId('"+id+"', "+(level-0.1)+")", 30);
	}
	function showId(id, level) {
		var object = document.getElementById(id);
		if (!level) {
			var level = 0.0;
			object.style['display']='';
		}
		object.style['opacity']=level;
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
		object.snapshotItem(parseInt(pos[0])-1, 10).setAttribute('onclick', "show('"+path+"', '" + list + "')");
		object.snapshotItem(parseInt(pos[0])-1, 10).title='Click aqui para expandir';
	}
	function show(path, list, level) {
		var pos = list.split(':');
		var object = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		delHidden(pos[0]);
		for (var i in pos)
			object.snapshotItem(pos[i]).style['display']='';
		object.snapshotItem(parseInt(pos[0])-1, 10).setAttribute('onclick', "hide('"+path+"', '" + list + "')");
		object.snapshotItem(parseInt(pos[0])-1, 10).title='Click aqui para contrair';
	}
}
unsafeWindow.hide = hide;
unsafeWindow.show = show;
unsafeWindow.hideId = hideId;
unsafeWindow.showId = showId;




/*********************************************************/
/*********+-------------------------------+***************/
/*********|      FarmList functions       |***************/
/*********+-------------------------------+***************/
/*********************************************************/

var server = location.host;

function addCoords(coords, name) {
	if (!coords) {
		var coords = prompt('Introduz coordenadas no formato X:XXX:XX');
		if (coords==null) return false;
	}
	if (!validCoords(coords)) {
		alert('As coordenadas não são válidas!');
		return false;
	}
	var name2 = searchCoords(coords);
	if (name2) {
		if (!confirm('Coordenadas guardadas como \''+name2+'\', queres mudar a descrição?'))
			return false;
	}
	var desc = prompt('Introduz uma descrição para ' + coords, (name?name:(name2?name2:'')));
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
	if (confirm ('Eliminar todas as coordenadas?')) {
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
	if ((poz = prompt ('Mover coordenadas para a posição:', nr+1)) && (poz>0) && (poz<=CoordsTab.length)) {
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
	if (desc = prompt('Introduz uma nova descrição', coordsTab[nr][1])) {
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
		td.appendChild(document.createTextNode('Lista de coordenadas'));
		
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
				a.title='Mudar ordem';
				a.setAttribute('onclick', 'moveCoord('+i+')');
				a.appendChild(document.createTextNode(i+1));
				th.appendChild(a);
					
				th = tr.appendChild(document.createElement('TH'));
				a = document.createElement('A');
				a.href = 'galaxy.php?session=' + getSession(location.hostname) +
							'&galaxy='+coord[0] + '&system=' + coord[1] + '&position='+coord[2];
				a.title='Ver na galáxia';
				a.appendChild(document.createTextNode(arr[0]));
				th.appendChild(a);
				
				th = tr.appendChild(document.createElement('TH'));
				a = document.createElement('A');
				a.style['cursor']='pointer';
				a.title='Mudar descrição';
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

if (getScriptConf('pub')) {
	if (getScriptConf('delOfficer')) {
		var tabla = document.evaluate("/html/body/center//table/tbody/tr[1]/td[last()]/table[tbody[tr[td[6]]]]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (tabla) tabla.style['display']='none';
		
	}

}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|             Auto              |***************/
/*********+-------------------------------+***************/
/*********************************************************/

function aleatorio(){
aleat = Math.random() * (getScriptConf("max")-getScriptConf("min"))
aleat = Math.round(aleat)
return parseInt(getScriptConf("min")) + aleat
} 

function playSound(){
     body = document.getElementsByTagName("body")[0];
     var emb = document.createElement("embed");
     emb.src = sonido;
     emb.setAttribute("autostart", "true");
     emb.setAttribute("loop", "false");
     emb.setAttribute("hidden", "true");
     emb.setAttribute("volume", volMensajes);
     body.appendChild(emb);
}



function autoReload()
{
	var tiempo=aleatorio();
	   
	var timeID = setTimeout("location.href= document.URL", tiempo*1000)  
	   
	

}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|        Reduced images         |***************/
/*********+-------------------------------+***************/
/*********************************************************/

if (location.pathname.match(/\/game\/(buildings|b_building)\.php/)) {
		var table = document.evaluate("//table[@width='530']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		if (getScriptConf('tinyIMG')) {
			var imgs = table.getElementsByTagName('img');
			for (var i=0; i<imgs.length; i++) {
				imgs[i].setAttribute('height', '70');
				imgs[i].setAttribute('width', '70');
			}
		}
}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|       Estatisticas.php        |***************/
/*********+-------------------------------+***************/
/*********************************************************/

if (location.pathname=='/game/stat.php') {	
	if (getScriptConf('estatisticas')) {
		var todo;
		var pos;
		var mouse;
		var menurows = document.getElementsByTagName('th');
		for (var i = 0; i < menurows.length; i++) {
			todo=menurows[i].innerHTML;
			pos=menurows[i].innerHTML.indexOf("+");
			mouse=menurows[i].innerHTML.indexOf("mouseover");
			if (pos!=-1 && mouse!=-1) {
				todo = "<font color=\"lime\">"+menurows[i].innerHTML.substring(pos,todo.indexOf('</font')+7);
				menurows[i].innerHTML=menurows[i].innerHTML.substring(0,menurows[i].innerHTML.indexOf('<a'))+todo;
			}
			pos=menurows[i].innerHTML.indexOf("-");
			if (pos!=-1 && mouse!=-1) {
				todo = "<font color=\"red\">"+menurows[i].innerHTML.substring(pos,todo.indexOf('</font')+7);
				menurows[i].innerHTML=menurows[i].innerHTML.substring(0,menurows[i].innerHTML.indexOf('<a'))+todo;
			}
		}
	}
}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|         leftmenu.php          |***************/
/*********+-------------------------------+***************/
/*********************************************************/

if (location.pathname=='/game/leftmenu.php') {
	if (getScriptConf('autoUpdate')) checkUpdates();	
	
	var nodo = document.evaluate("/html/body/center/table/tbody/tr/td/div/font[a='Alianças']/../../..", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (nodo) {
    var indSession = nodo.innerHTML.indexOf('session=');
    setSession(location.hostname, nodo.innerHTML.substring(indSession+8, indSession+20));
		if (getScriptConf('dragoSimM')) {
			var drago = nodo.cloneNode(true);
			var drago2 = drago.getElementsByTagName('a')[0];
			drago2.href = "http://drago-sim.com/index.php?lang=portuguese&style=g3ck0&template=Standard" +
				'&techs[0][0][w_t]=' + getTech('militar') + 
				'&techs[0][0][s_t]=' + getTech('defensa') + 
				'&techs[0][0][r_p]=' + getTech('blindaje');
			drago2.innerHTML = "Drago-Sim";
			drago2.title = "Ir a Drago-Sim";
			nodo.parentNode.insertBefore(drago, nodo.nextSibling);
		}
		if (getScriptConf('CSimM')) {
			var csim = nodo.cloneNode(true);
			var csim2 = csim.getElementsByTagName('a')[0];
			csim2.href = "http://www.o-o-d.com/tool/sim/index.cgi?lang=sp" +
				'&aattack=' + getTech('militar') +
				'&ashield=' + getTech('defensa') +
				'&aarmory=' + getTech('blindaje');
			csim2.innerHTML = "CSim";
			csim2.title = "Ir a CSim";
			nodo.parentNode.insertBefore(csim, nodo.nextSibling);
		}
		
		if (getScriptConf('pub')) {
			// Elimina el letrero de "info comandante" del menu lateral
			if (getScriptConf('delMenuCom')) {
				var bloque = document.getElementsByTagName ('center');
				for (var i = bloque.length - 1; i >= 0; i--) {
					if (bloque[i].innerHTML.match('commander')) {
						bloque[i].style['display']='none';
						i=-1;
					}
				}
			}
			// Elimina el letrero de "Casino de los oficiales" del menu lateral
			if (getScriptConf('delOfficerMenu')) {
				var bloque = document.getElementsByTagName ('div');
				for (var i = bloque.length - 1; i >= 0; i--) {
					if (bloque[i].innerHTML.match('offiziere')) {
						bloque[i].style['display']='none';
						i=-1;
					}
				}
			}
		}

/*		var conf = nodo.cloneNode(true);
		var conf2 = conf.getElementsByTagName('a')[0];
		conf2.removeAttribute('target');
		conf2.removeAttribute('href');
		conf2.style['cursor']='pointer';
		conf2.setAttribute('onclick', 'window.parent.frames[1].document.body.innerHTML=makeConfig()');
		conf2.innerHTML = "Configurar Script";
		nodo.parentNode.insertBefore(conf, nodo.parentNode.lastChild);
*/
		if (getScriptConf('ocalc')) {
			var ocalc = nodo.cloneNode(true);
			var ocalc2 = ocalc.getElementsByTagName('a')[0];
			ocalc2.innerHTML = "o-calc";
			ocalc2.href='http://www.o-calc.com/?sec=news&lang=pt';
			nodo.parentNode.insertBefore(ocalc, nodo.parentNode.childNodes[18]);
		}

		var rec = document.createElement('table');
		rec.width='110';
		rec.cellSpacing=0;
		rec.cellPadding=0;
		rec.style['display']='none';
		rec.id='tablaRecursos';
		var tMode = getScriptConf('transportMode');
		rec.setAttribute('onchange', "if (this.style['display']=='none') { showId('tablaRecursos'); " + (tMode?"hideId('trTrans');":"") + "} document.getElementById('total').innerHTML=Math.ceil((parseInt(document.getElementById('metal').value, 10)+parseInt(document.getElementById('cristal').value, 10)+parseInt(document.getElementById('deuterio').value, 10))/25000); if (document.getElementById('total').innerHTML=='0') this.firstChild.childNodes[1].onclick(); var coords1=document.getElementById('coord'); if (coords1.value!='') { coords = coords1.value.split(':'); document.getElementById('galaxy').value=coords[0]; document.getElementById('system').value=coords[1]; document.getElementById('planet').value=coords[2]; if (coords[3]=='3') document.getElementById('planetType').selectedIndex=1; else document.getElementById('planetType').selectedIndex=0; coords1.value=''}");
		rec.appendChild(nodo.previousSibling.previousSibling.cloneNode('true')); // añadimos la imagen separadora
		rec.lastChild.childNodes[1].colSpan=3;
		rec.lastChild.childNodes[1].title='Borrar tabla de recursos';
		rec.lastChild.childNodes[1].setAttribute('onclick', "document.getElementById('metal').value='0';document.getElementById('cristal').value='0';document.getElementById('deuterio').value='0';hideId('tablaRecursos');" + (tMode?"showId('trTrans');":""));

		// cuando queramos cambiar las coordenadas rellenamos este input y llamamos a onchange() de la tabla
		var input = document.createElement('input');
		input.type = 'hidden';
		input.id = 'coord';
		rec.lastChild.childNodes[1].appendChild(input.cloneNode(true));
		
		rec.appendChild(document.createElement('tr')).appendChild(document.createElement('td'));
		input.type = 'text';
		input.size = '3';
		
		input.id = 'galaxy';
		input.title = 'galaxia destino';
		rec.lastChild.lastChild.appendChild(input.cloneNode(true));

		input.id='system';
		input.title='sistema destino';
		rec.lastChild.appendChild(document.createElement('td')).appendChild(input.cloneNode(true));
		
		input.id='planet';
		input.title='planeta destino';
		rec.lastChild.appendChild(document.createElement('td')).appendChild(input.cloneNode(true));
		
		var select = rec.appendChild(document.createElement('tr')).appendChild(document.createElement('td'));
		select.colSpan=3;
		select.appendChild(document.createElement('select'));
		select.lastChild.id='planetType';
		select.lastChild.title='tipo de planeta destino';
		select.lastChild.innerHTML='<option value="1" title="El destino es un planeta">Planeta</option><option value="3" title="El destino es una luna">Luna</option>';
		
		rec.appendChild(document.createElement('tr'));
		rec.lastChild.appendChild(document.createElement('td'));
		rec.lastChild.appendChild(document.createElement('td'));
		rec.lastChild.lastChild.colSpan=2;
		rec.lastChild.firstChild.innerHTML="<a title='Borrar campo' onclick=\"document.getElementById('total').innerHTML=parseInt(parseInt(document.getElementById('total').innerHTML, 10)-parseInt(this.parentNode.nextSibling.firstChild.value, 10)/25000, 10);this.parentNode.nextSibling.firstChild.value='0'; \">M: </a>";
		rec.lastChild.lastChild.appendChild(document.createElement('input'));
		rec.lastChild.lastChild.lastChild.type='text';
		rec.lastChild.lastChild.lastChild.size='10';
		rec.lastChild.lastChild.lastChild.setAttribute('onchange', "if (this.value=='') this.value='0'");
		rec.lastChild.lastChild.lastChild.value='0';
		rec.lastChild.lastChild.lastChild.id='metal';
		rec.lastChild.lastChild.lastChild.title='metal a transportar';
		
		rec.appendChild(rec.lastChild.cloneNode(true));
		rec.lastChild.lastChild.lastChild.id='cristal';
		rec.lastChild.lastChild.lastChild.title='cristal a transportar';
		rec.lastChild.firstChild.firstChild.innerHTML='C: ';

		rec.appendChild(rec.lastChild.cloneNode(true));
		rec.lastChild.lastChild.lastChild.id='deuterio';
		rec.lastChild.lastChild.lastChild.title='deuterio a transportar';
		rec.lastChild.firstChild.firstChild.innerHTML='D: ';

		rec.appendChild(document.createElement('tr'));
		rec.lastChild.appendChild(document.createElement('td'));
		rec.lastChild.lastChild.colSpan=3;
		rec.lastChild.lastChild.innerHTML="<center>total <span id='total'></span> <a title='naves grandes de carga'>ngc</a></center";

		if (getScriptConf('transportMode')) {
			var trans = nodo.cloneNode(true);
			trans.id='trTrans';
			trans.getElementsByTagName('font')[0].innerHTML="<input type='checkbox' " +
				(getScriptConf('transportModeEnabled')?"checked='true'":"") +
				" id='transportMode'/>&nbsp;&nbsp;<b>Transporte</b>";
			nodo.parentNode.appendChild(trans);
		}
		nodo.parentNode.parentNode.parentNode.appendChild(rec);
		
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
			(getScriptConf('ATMembers')?'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=4&sort1=3&sort2=0" target="Hauptframe">Membros <font id="allyName1" color="'+getScriptConf('ATColorN')+'">'+allyName+'</font></a></font></div></td></tr>':'')+
			(getScriptConf('ATTopP')?'<tr><td><div align="center"><font color="#FFFFFF"><a href="stat.php?session=' + Session + '&start=1&sort1=1&sort2=2" target="Hauptframe">Top Jogadores </a></font></div></td></tr>':'')+
			(getScriptConf('ATTopA')?'<tr><td><div align="center"><font color="#FFFFFF"><a href="stat.php?session=' + Session + '&start=1&who=ally" target="Hauptframe">Top Alianças </a></font></div></td></tr>':'')+
			(getScriptConf('ATForo')?'<tr><td><div align="center"><font color="#FFFFFF"><a id="foroAlly" href='+foroAlly+' target="Hauptframe">Fórum <font id="allyName2" color="'+getScriptConf('ATColorN')+'">'+allyName+'</font></a></font></div></td></tr>':'') +
			(getScriptConf('ATCC')?'<tr id="ATCC"' +(getScriptConf('ATCCPriv')?'':'style="display:none"')+'><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=17" target="Hauptframe">Enviar CC</a></font></div></td></tr>':'') +
			(getScriptConf('ATBaned')?'<tr><td><div align="center"><font color="#FFFFFF"><a href="pranger.php" target="Hauptframe">Banidos</a></font></div></td></tr>':'');
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
		var nodo = document.evaluate("/html/body/center/table/tbody/tr/td/div/font[a='Procurar']/..", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (nodo) {
			nodo.innerHTML='';
			
			var formulario = document.createElement('form');
			formulario.setAttribute("action","suche.php?session="+getSession(location.hostname));
			formulario.setAttribute("target","Hauptframe");
			formulario.setAttribute("method","post");
			formulario.heigth='0';
			formulario.innerHTML += '<select name="type"><option value="playername" selected>Jogador</option>' +
								'<option value="planetname" >Planeta</option>' +
								'<option value="allytag" >TAG da Aliança</option>' +
								'<option value="allyname" >Nome da Aliança</option></select>';
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
					tds.snapshotItem(j).title='Click aqui para contrair';
				}
				tds.snapshotItem(j).style['cursor']='pointer';
			}
			j=i;
		}
	}
}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|         options.php          |***************/
/*********+-------------------------------+***************/
/*********************************************************/

else if (location.pathname=='/game/options.php') {
	function initTab(labels, ids) {
		var table = document.createElement('table');
		var row = table.appendChild(document.createElement('tr'));
		var tab = document.createElement('td');
		tab.className = 'b';
		tab.setAttribute('onclick', 'tab.position=this.id');
		tab.style['cursor']= 'pointer';
		for (var i in labels) {
			concreteTab = row.appendChild(tab.cloneNode(true));
			concreteTab.innerHTML = labels[i];
			concreteTab.id = ids[i];
		}
		return table;
	}

	var defConfigTab = "script";
	unsafeWindow.tab = {position:defConfigTab};
	unsafeWindow.tab.watch("position", function(id, oldval, newval) {
		document.getElementById(oldval).className = 'b';
		document.getElementById(newval).className = 'c';

		objects = document.getElementsByName(oldval);
		for (i=0;i<objects.length;i++)
			objects[i].style['display'] = 'none';
		objects = document.getElementsByName(newval);
		for (i=0;i<objects.length;i++)
			objects[i].style['display'] = '';

		if (debugMode) GM_log('tab.position ' + oldval + ' -> ' + newval);
		return newval;
	});
	
	var config = document.evaluate('//table[@width=519]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	config.setAttribute('name', 'ogame');
	
	
	
	
	
	
		makeConfig = function () {
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
		function newTableRowCk(nam, id, desc, table, colspan) {
			return "<tr><th width='50'><input type='checkbox' name='"+nam+"' id='" + id + "' " +
			(getScriptConf(id)?'checked=true':'') +
			
			(!table||table==''?" />":" onclick='if (this.checked) showId(\""+table+"\"); else hideId(\""+table+"\")' />") +
			"</th><th"+(colspan?" colspan='"+(colspan-1)+"'":"")+">" + desc + "</th></tr>";
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
		var cad = "<br><h1><a href='"+scriptPage+"' target='_blank' style='color:lightblue'>"+scriptName+"</a><small title='clica para buscar actualizações' onclick='checkUpdates(true)' style='color:lightgreen; cursor:pointer'>  v"+scriptVersion+"</small> by <font color='orangered'>"+scriptAuthor+"</font> </h1>" +
			"<br /><center>Descubre as <a href='http://roble.cnice.mecd.es/~apuente/applet1.html' target='new'>cores</a>";

		// Ajustes

		cad += newTable(c_mainTable, 2);
		cad += newTableRowCk('conf', 'compactar', c_compactar);
		cad += newTableRowCk('conf', 'ocalc', c_ocalc);
		cad += newTableRowCk('conf', 'dragoSim', c_dragoSim);
		cad += newTableRowCk('conf', 'dragoSimM', c_dragoSimM);
		cad += newTableRowCk('conf', 'modifyDate', c_modifyDate);
		cad += newTableRowCk('conf', 'tinyIMG', c_tinyIMG);
		cad += newTableRowCk('conf', 'proInputs', c_proInputs);
		cad += newTableRowCk('conf', 'flottenInfo', c_flottenInfo);
		cad += newTableRowCk('conf', 'specialEffects', c_specialEffects);
		cad += newTableRowCk('conf', 'autoUpdate', c_autoUpdate);
		cad += newTableRowCk('conf', 'improvedResources', c_improvedResources);
		cad += newTableRowCk('conf', 'portal', c_portal);
		cad += newTableRowCk('conf', 'estatisticas', c_estatiscas);
		cad += newTableRowCk('conf', 'coresgalaxia', c_coresgalaxia);
		cad += newTableRowCk('conf', 'coresvg', c_coresvg);
		cad += newTableRowCk('conf', 'actualiza', c_actualiza);

		cad += newTableRowCk('conf', 'pub', c_pub, 'tablaPub');
		cad += newNestledTable('tablaPub', 'pub', c_pub, 2, 2);
		cad += newTableRowCk('conf', 'delBanner', c_delBanner);
		cad += newTableRowCk('conf', 'delMenuCom', c_delMenuCom);
		cad += newTableRowCk('conf', 'delOfficerMenu', c_delOfficerMenu);
		cad += newTableRowCk('conf', 'delOfficer', c_delOfficer);
		cad += endNestledTable();
		
		cad += newTableRowCk('conf', 'colorBuild', c_colorBuild);
		cad += newTableRowCk('conf', 'SYConst', c_SYConst);
		cad += newTableRowCk('conf', 'SYReducible', c_SYReducible);
		cad += newTableRowCk('conf', 'LMSearch', c_LMSearch);
		cad += newTableRowCk('conf', 'coordLinker', c_coordLinker, 'tablaCoordLinker');
		cad += newNestledTable('tablaCoordLinker', 'coordLinker', c_tablaCoordLinker, 2, 2);
		cad += newTableRowCk('conf', 'coordLinkerVarG', c_coordLinkerVarG);
		cad += newTableRowCk('conf', 'coordLinkerVarM', c_coordLinkerVarM);
		cad += newTableRowColor('color', 'coordLinkerCM', c_coordLinkerCM);
		cad += newTableRowColor('color', 'coordLinkerCVG', c_coordLinkerCVG);
		cad += newTableRowColor('color', 'coordLinkerCG', c_coordLinkerCG);
		cad += endNestledTable();
		cad += newTableRowCk('conf', 'allyTable', c_allyTable, 'tablaAllyTable');
		cad += newNestledTable('tablaAllyTable', 'allyTable', c_tablaAllyTable, 2, 2);
		cad += newTableRowCk('conf', 'ATMembers', c_ATMembers);
		cad += newTableRowCk('conf', 'ATTopP', c_ATTopP);
		cad += newTableRowCk('conf', 'ATTopA', c_ATTopA);
		cad += newTableRowCk('conf', 'ATForo', c_ATForo);
		cad += newTableRowCk('conf', 'ATCC', c_ATCC);
		cad += newTableRowCk('conf', 'ATBaned', c_ATBaned);
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
		cad += "<tr><th><input type='button' value='+' title='Adicionar nova etiqueta' onclick=\"this.parentNode.parentNode.parentNode.appendChild(this.parentNode.parentNode.nextSibling.cloneNode(true));this.parentNode.parentNode.parentNode.lastChild.style['display']=''\" ></th>" + 
			"<th>Tag</th>" +
			"<th>Cor</th>" +
			"<th>Implied alliance/s (separate with '|' )</th>" +
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
			
		cad += newTableRowCk('conf', 'moonSpy', c_moonSpy);
		cad += newTableRowCk('conf', 'transportMode', c_transportMode, 'transportTable');
		cad += newNestledTable('transportTable', 'transportMode', c_transportModeTable, 2, 2);
		cad += newTableRowCk('conf', 'transportModeEnabled', c_transportModeEnabled);
	
		var temp = getScriptConf("TMDestination");
		
		cad += "<tr><input type=\"hidden\" name='conf' id=\"TMDestination\" value=\"" +
			temp + "\" />" +
			"<th width=90 onchange=\"document.getElementById('TMDestination').value=[this.childNodes[0].value,this.childNodes[1].value,this.childNodes[2].value,this.childNodes[3].value].join(';')\">";
		temp = temp.split(';');
		for (var i=0; i<temp.length-1; i++)
			cad += "<input size=1 type=\"text\" value=\""+temp[i]+"\">";
		cad += "<select><option value=1 "+(temp[3]=='1'?'selected=\"yes\"':'')+">Planeta</option><option value=3 "+(temp[3]=='3'?'selected=\"yes\"':'')+">Lua</option></select>";
		cad += "</th><th>Destino por defeito</th></tr>";
		cad += endNestledTable();

		cad += newTableRowCk('conf', 'colorMens', c_colorMens, 'tablaColores');
		cad += newTableRowCk('conf', 'autoMark', c_autoMark, 'tablaAutoMark');
		// AutoMark

		cad += "</table><table width=\"600\"><tr><td width=\"50%\"><table id='tablaAutoMark' style='display:"+(getScriptConf('autoMark')?'':'none')+"' ><tr><td class=\"c\" colspan =\"2\">Automark messages about:</td></tr>";
		
		cad += newTableRowCk('autoMark', 'AMTrans', c_AMTrans);
		cad += newTableRowCk('autoMark', 'AMTransR', c_AMTransR);
		cad += newTableRowCk('autoMark', 'AMDesp', c_AMDesp);
		cad += newTableRowCk('autoMark', 'AMColo', c_AMColo);
		cad += newTableRowCk('autoMark', 'AMAlianza', c_AMAlianza);
		cad += newTableRowCk('autoMark', 'AMPriv', c_AMPriv);
		cad += newTableRowCk('autoMark', 'AMEsp', c_AMEsp);
		cad += newTableRowCk('autoMark', 'AMEspP', c_AMEspP);
		cad += newTableRowNb('conf', 'AMEspPRecMin', c_AMEspPRecMin);
		cad += newTableRowCk('autoMark', 'AMAttack', c_AMAttack);
		cad += newTableRowCk('autoMark', 'AMMisiles', c_AMMisiles);
		cad += newTableRowCk('autoMark', 'AMRec', c_AMRec);
		cad += newTableRowCk('autoMark', 'AMConf', c_AMConf);

		// Colores

		cad += "</table></td><td width='50%'><table id='tablaColores' style='display:"+(getScriptConf('colorMens')?'':'none')+"' ><tr><td class=\"c\" colspan =\"2\">Colors of messages</td></tr>";
    
		cad += newTableRowColor('color', 'colorTrans', c_colorTrans);
		cad += newTableRowColor('color', 'colorTransR', c_colorTransR);
		cad += newTableRowColor('color', 'colorDesp', c_colorDesp);
		cad += newTableRowColor('color', 'colorAlianza', c_colorAlianza);
		cad += newTableRowColor('color', 'colorPriv', c_colorPriv);
		cad += newTableRowColor('color', 'colorRec', c_colorRec);
		cad += newTableRowColor('color', 'colorEsp', c_colorEsp);
		cad += newTableRowColor('color', 'colorConf', c_colorConf);
		cad += newTableRowColor('color', 'colorColo', c_colorColo);
		cad += newTableRowColor('color', 'colorMisiles', c_colorMisiles);
		
		cad += "</table></td></tr></table><table width='300'><tr><td><div align=left><input type='button' value='Apply' onclick='saveScriptConf(window.parent.frames[0].location.hostname)' /></div></td><td><div align=right><input type='button' align=right value='Reset settings' onclick='resetScriptConf()' /></div></td></tr></table></center>";

		return cad;
	} // makeConfig

	
	var scriptConf = document.createElement('table');
	scriptConf.setAttribute('name', 'script');
	scriptConf.innerHTML = makeConfig();

	config.parentNode.insertBefore(initTab(['Ogame Options', scriptName+ ' Options'],['ogame', 'script']), config);
	config.parentNode.insertBefore(scriptConf, config);
	unsafeWindow.tab.position = 'ogame';
}



/*********************************************************/
/*********+-------------------------------+***************/
/*********|         overview.php          |***************/
/*********+-------------------------------+***************/
/*********************************************************/

else if (location.pathname=='/game/overview.php') {
	setMainP(document.getElementsByTagName('option')[0].innerHTML.match(/\[(.*)\]/)[1]);
	nodo = document.evaluate("//td[@class='c']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	try {
		setUserName(nodo.innerHTML.match(/\((.*)\)/)[1]);
	}
	catch (e) {}
	if (getScriptConf('pub')) {
		if (getScriptConf('delBanner')) {
			//var nodo = document.evaluate('/html/body/center/table/tbody/tr/td/p', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			var nodo = document.getElementById('combox_container');
			if (nodo) nodo.style['display']='none';
		}
	}
	if (getScriptConf('modifyDate')) {
		nodo = document.evaluate("/html/body/center/table[last()]/tbody/tr[th[2]]/th[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		nodo.previousSibling.previousSibling.innerHTML='Time';
		try{
			var days = new Array();
			days['Mon'] = 'Mon';
			days['Tue'] = 'Tue';
			days['Wed'] = 'Wed';
			days['Thu'] = 'Thu';
			days['Fri'] = 'Fri';
			days['Sat'] = 'Sat';
			days['Sun'] = 'Sun';
			var months = new Array();
			months['Jan'] = 'Jan';
			months['Feb'] = 'Feb';
			months['Mar'] = 'Mar';
			months['Apr'] = 'Apr';
			months['May'] = 'May';
			months['Jun'] = 'Jun';
			months['Jul'] = 'Jul';
			months['Aug'] = 'Aug';
			months['Sep'] = 'Sep';
			months['Oct'] = 'Oct';
			months['Nov'] = 'Nov';
			months['Dec'] = 'Dec';
			var fecha=nodo.innerHTML.match(/(\S\S\S) (\S\S\S) (\d+) (\d+:\d\d:\d\d)/);
			nodo.innerHTML=days[fecha[1]]+' '+fecha[3]+'th of  '+months[fecha[2]]+', '+fecha[4];
		} catch(e) {}
	}
	
	if (getScriptConf('coordLinker')) {
		var links = document.evaluate("/html/body/center/table[@width=519]/tbody/tr[@class]/th[2]/span/a[text()]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var colorVG = getScriptConf('coordLinkerCVG');
		var colorVariable = getScriptConf('coordLinkerVarG');
		for (var i=0; i<links.snapshotLength; i++) {
			try {
				var linkText = links.snapshotItem(i).innerHTML;
				var coord = linkText.match(/\[(\d+:\d+:\d+)\]/)[1];
				links.snapshotItem(i).style['color'] = colorVariable?getColorLinker(coord):colorVG;
			}
			catch (e) {}
		}
	}

	//função para actualizar automaticamente a vista geral

	if (getScriptConf('actualiza')) {
	onload= autoReload();
	}
}
//==========================
//Opções do Portal de Salto
//==========================

else if (location.pathname=='/game/infos.php') {   
	if (getScriptConf('portal')) {
	function noShips() {
		if (document.getElementsByName(id)[0]) {
			document.getElementsByName(id)[0].value = 0;
		}
	}

	var cantidad = 0;
   	var ninguna = "";
  	var nombre = "";
	var texto = "";
	var todas = "";
	var table = document.evaluate("/html/body/center[2]/form[1]/table[last()]/tbody", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

	//Le ponemos un nombre al formulario para usarlo mas facilmente.

	table.parentNode.parentNode.setAttribute("name", "salto");
	table.rows[0].cells[0].setAttribute("colspan","5");
	table.rows[table.rows.length - 1].cells[0].setAttribute("colspan","5");

	var nodo = table.rows[0].cloneNode(true);
	table.insertBefore(nodo, table.rows[1]);
	nodo.innerHTML = "<th>Naves</th><th>Disponiveis</th><th>-</th><th>-</th><th>-</th>";

	for(var i = 2; i < table.rows.length - 1; i++) {
		cantidad = table.rows[i].cells[0].innerHTML.match(/\((\d+)/)[1];
		texto = table.rows[i].cells[0].innerHTML.match(/>(\S+(\s*\S*)*)</)[1];
		nombre = table.rows[i].cells[1].firstChild.name;

		//Modificamos o nome das naves, pondo unicamente o nome sem a quantidade disponivel.

		table.rows[i].cells[0].innerHTML = texto;

		//Agregamos una celda indicando la cantidad disponible.

		nodo = table.rows[i].cells[0].cloneNode(true);
		table.rows[i].insertBefore(nodo, table.rows[i].cells[table.rows[i].cells.length - 1]);
		nodo.innerHTML = cantidad;
		
		//Agregamos uma célula com un botão para seleccionar o minimo.

		nodo = table.rows[i].cells[0].cloneNode(true);
		table.rows[i].insertBefore(nodo, table.rows[i].cells[table.rows[i].cells.length - 1]);
		nodo.innerHTML = "<a href=\"javascript:void();\" onclick=\"salto." + nombre + ".value='" + 0 + "';\" >mín</a>";
		todas = todas + "salto." + nombre + ".value='" + cantidad + "';";
		ninguna = ninguna + "salto." + nombre + ".value='0';";
		
		//Agregamos uma célula com un botão para seleccionar o maximo.

		nodo = table.rows[i].cells[0].cloneNode(true);
		table.rows[i].insertBefore(nodo, table.rows[i].cells[table.rows[i].cells.length - 1]);
		nodo.innerHTML = "<a href=\"javascript:void();\" onclick=\"salto." + nombre + ".value='" + cantidad + "';\" >m&aacute;x</a>";
		todas = todas + "salto." + nombre + ".value='" + cantidad + "';";
		ninguna = ninguna + "salto." + nombre + ".value='0';";
	}

	nodo = table.rows[0].cloneNode(true);
	table.insertBefore(nodo, table.rows[table.rows.length - 1]);
	nodo.innerHTML = "<th colspan='2'><a href=\"javascript:void();\" onclick=\"" + ninguna + "\">Nenhuma nave</a></th><th colspan='3'><a href=\"javascript:void();\" onclick=\"" + todas + "\">Todas as naves</a></th>";
	}
}

else if ((location.pathname=='/game/b_building.php')
				|| (document.baseURI.indexOf('mode=Forschung')!=-1)
				|| (document.baseURI.indexOf('mode=Flotte')!=-1 && location.pathname=='/game/buildings.php')
				|| (document.baseURI.indexOf('mode=Verteidigung')!=-1)) {
	// Obtengo mis tecnologias
	if (document.baseURI.indexOf('mode=Forschung')!=-1) {
		var response = document.body.innerHTML.replace(/\n/g, '');
		var combustion=0;
		var impulso=0;
		var hiper=0;

		try {
			var tecComp = response.match(/gid=108.{0,50}Nível (\d+ )\)/)[1];
		}
		catch(e) {}
		if (tecComp) setTech('computacion', tecComp);
		
		try {
			var militar = response.match(/gid=109.{0,50}Nível (\d+ )\)/)[1];
		}
		catch(e) {}
		if (militar) setTech('militar', militar);

		try {
			var defensa = response.match(/gid=110.{0,50}Nível (\d+ )\)/)[1];
		}
		catch(e) {}
		if (defensa) setTech('defensa', defensa);

		try {
			var blindaje = response.match(/gid=111.{0,50}Nível (\d+ )\)/)[1];
		}
		catch(e) {}
		if (blindaje) setTech('blindaje', blindaje);
		
		try {
			combustion = response.match(/gid=115.{0,50}Nível (\d+ )\)/)[1];
		}
		catch(e) {}
		
		try {
			impulso = response.match(/gid=117.{0,50}Nível (\d+ )\)/)[1];
		}
		catch(e) {}
		
		try {
			hiper = response.match(/gid=118.{0,50}Nível (\d+ )\)/)[1];
		}
		catch(e) {}
		
		GM_setValue('velocidadesBase_'+location.hostname, [Math.round(impulso<5?5000*(1+combustion/10):10000*(1+impulso/5)), Math.round(7500*(1+combustion/10)), Math.round(12500*(1+combustion/10)), Math.round(10000*(1+impulso/5)), Math.round(15000*(1+impulso/5)), Math.round(10000*(1+hiper*0.3)), Math.round(2500*(1+impulso/5)), Math.round(2000*(1+combustion/10)), Math.round(100000000*(1+combustion/10)), Math.round(hiper<8?4000*(1+impulso/5):5000*(1+hiper*0.3)), 0, Math.round(5000*(1+hiper*0.3)), Math.round(100*(1+hiper*0.3)), Math.round(10000*(1+hiper*0.3))].join(':'));
		
		if (getScriptConf('blockUselessTechs')) {
			function blockTech(gid) {
				var blockedTech = locateFirst('//a[@href="infos.php?session='+getSession(location.hostname)+'&gid='+gid+'"]/../..');
//				if (blockedTech.lastChild.innerHTML != ' - ')
				blockedTech.lastChild.innerHTML = "<font color='red'>Máximo nível util alcançado</font>";
			}
		
			var gids = [
				113, // energy
				114, // hyperspace
				120, // laser
				121, // ionic
				122, // plasma
				199, // graviton
			];
			var limits = [12, 8, 12, 5, 7, 1];
			var tech=0;
			for (var i in gids) {
				try {
					tech = response.match(new RegExp("gid="+gids[i]+".{0,50}Nível (\\d+ )\\)"))[1];
				} 
				catch(e) {}
				if (tech>=limits[i]) blockTech(gids[i]);
				tech=0;
			}
		}
}
	
	else if (((document.baseURI.indexOf('mode=Flotte')!=-1) && location.pathname=='/game/buildings.php') || 
				(document.baseURI.indexOf('mode=Verteidigung')!=-1)) {
		if (getScriptConf('proInputs')) {
			var inputs = document.evaluate("//input[@type='text' or not(@type)]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			for (var i=0; i<inputs.snapshotLength; i++) {
				inputs.snapshotItem(i).parentNode.appendChild(document.createElement('br'));

				var a = document.createElement("a");
				a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs.snapshotItem(i).name+"')[0];texto.value=999999;texto.onchange();");
				a.innerHTML = "&infin;";
				inputs.snapshotItem(i).parentNode.appendChild(a);
					var a = document.createElement("a");
				a.style['cursor'] = 'pointer';
				a.setAttribute("onmousedown", "pressed=true;cambiar('"+inputs.snapshotItem(i).name+"', true, this.parentNode.lastChild.firstChild.value)");
				a.setAttribute("onmouseout", "if (pressed=true) {pressed=false; contador=5; incremento=1;}");
				a.setAttribute("onmouseup", "pressed=false; contador=5; incremento=1; this.parentNode.firstChild.onchange()");
				a.innerHTML="+";
				inputs.snapshotItem(i).parentNode.appendChild(a);

				var a = document.createElement("a");
				a.style['cursor'] = 'pointer';
				a.setAttribute("onmousedown", "pressed=true;cambiar('"+inputs.snapshotItem(i).name+"', false, this.parentNode.lastChild.firstChild.value)");
				a.setAttribute("onmouseout", "if (pressed=true) {pressed=false; contador=5; incremento=1;}");
				a.setAttribute("onmouseup", "pressed=false; contador=5; incremento=1; this.parentNode.firstChild.onchange()");
				a.innerHTML = "&minus;";
				inputs.snapshotItem(i).parentNode.appendChild(a);

				var a = document.createElement("a");
				a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs.snapshotItem(i).name+"')[0];texto.value=0;texto.onchange();");
				a.innerHTML = "&bull;";
				inputs.snapshotItem(i).parentNode.appendChild(a);
			}
		}
	}

	var element = document.evaluate('/html/body/center/center/table/tbody/tr/td[3]/table/tbody/tr[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.getElementsByTagName('td');
	var metal = parseInt(element[1].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''), 10);
	var cristal = parseInt(element[2].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''), 10);
	var deuterio = parseInt(element[3].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''), 10);
	var energia = parseInt(element[4].innerHTML.replace(/.*>(.*)<.*/g,'$1').split('/')[0].replace(/\./g, ''), 10);

	if ((document.baseURI.indexOf('mode=Flotte')!=-1) || (document.baseURI.indexOf('mode=Verteidigung')!=-1)) {
		if (GM_getValue('sinConstruir', '')=='') {
			if (getScriptConf('SYConst')) {
				element[1].innerHTML+= "<br/><font color=lightgreen id='metalRestante' title='Metal restante'>"+puntuar(metal)+"</font>";
				element[2].innerHTML+= "<br/><font color=lightgreen id='cristalRestante' title='Cristal restante'>"+puntuar(cristal)+"</font>";
				element[3].innerHTML+= "<br/><font color=lightgreen id='deuterioRestante' title='Deuterio restante'>"+puntuar(deuterio)+"</font>";

				var inputs = document.evaluate("//input[@type='text' or not(@type)]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var i=0; i<inputs.snapshotLength; i++) {
					var recursos = inputs.snapshotItem(i).parentNode.parentNode.getElementsByTagName('b');
					var metalNew=0;
					var cristalNew=0;
					var deuterioNew=0;
					for (var j=0; j<recursos.length; j++) {
						if (recursos[j].previousSibling.nodeValue.indexOf('Metal')!=-1)
							metalNew=parseInt(recursos[j].innerHTML.replace(/\./g, ''), 10);
						else if (recursos[j].previousSibling.nodeValue.indexOf('Cristal')!=-1)
							cristalNew=parseInt(recursos[j].innerHTML.replace(/\./g, ''), 10);
						else if (recursos[j].previousSibling.nodeValue.indexOf('Deutério')!=-1)
							deuterioNew=parseInt(recursos[j].innerHTML.replace(/\./g, ''), 10);
					}
					recursos = [metalNew, cristalNew, deuterioNew].join(':');
					inputs.snapshotItem(i).setAttribute('onchange', "if (this.value=='') this.value='0'; if (parseInt(this.value, 10)>parseInt(this.parentNode.lastChild.firstChild.value, 10)) this.value=this.parentNode.lastChild.firstChild.value; calcularMax(calcularRecursos())");
					inputs.snapshotItem(i).setAttribute('onkeyup', 'onchange()');
					var nodo = document.createElement('div');
					// faltaria poner el tiempo
					nodo.innerHTML="<input type='hidden' name='max'/><input type='hidden' name='recursos' value='"+recursos+"'/><input type='hidden' name='time'/><br/>máx <a name='maxRel'></a>";
					nodo.setAttribute("onclick", "this.parentNode.firstChild.value=parseInt(this.parentNode.firstChild.value, 10)+parseInt(this.lastChild.innerHTML, 10);this.parentNode.firstChild.onchange()");
					inputs.snapshotItem(i).parentNode.appendChild(nodo);
//					document.getElementById('max').id='max_'+inputs.snapshotItem(i).name.match(/\[(.*)\]/)[1];
				}

				unsafeWindow.calcularRecursos = function() {
					var metalNew = metal;
					var cristalNew = cristal;
					var deuterioNew = deuterio;
					for (var i=0; i<inputs.snapshotLength; i++) {
						var nShips = parseInt(inputs.snapshotItem(i).value, 10);
						var recursos = inputs.snapshotItem(i).parentNode.lastChild.childNodes[1].value.split(':');
						metalNew -= nShips*parseInt(recursos[0], 10);
						cristalNew -= nShips*parseInt(recursos[1], 10);
						deuterioNew -= nShips*parseInt(recursos[2], 10);
					}
//					alert('Recursos restantes:\nmetal: '+metalNew+' cristal: '+cristalNew+' deuterio: '+deuterioNew);
					return [metalNew, cristalNew, deuterioNew].join(':');
				} // calcularRecursos()
				
				unsafeWindow.calcularMax = function(recursos) {
					var metalNew = parseInt(recursos.split(':')[0], 10);
					var cristalNew = parseInt(recursos.split(':')[1], 10);
					var deuterioNew = parseInt(recursos.split(':')[2], 10);
					
					for (var i=0; i<inputs.snapshotLength; i++) {
						var recursos = inputs.snapshotItem(i).parentNode.lastChild.childNodes[1].value.split(':');
						var metal2=(recursos[0]=='0')?999999:Math.floor(metalNew/parseInt(recursos[0], 10));
						var cristal2=(recursos[1]=='0')?999999:Math.floor(cristalNew/parseInt(recursos[1], 10));
						var deuterio2=(recursos[2]=='0')?999999:Math.floor(deuterioNew/parseInt(recursos[2], 10));
						var min = metal2;
						min = Math.min(min, cristal2);
						min = Math.min(min, deuterio2);
						if (min==999999) min=0;
						inputs.snapshotItem(i).parentNode.lastChild.lastChild.innerHTML=min;
						inputs.snapshotItem(i).parentNode.lastChild.firstChild.value=parseInt(inputs.snapshotItem(i).value,10)+min;
						document.getElementById('metalRestante').innerHTML=puntuar(metalNew);
						document.getElementById('cristalRestante').innerHTML=puntuar(cristalNew);
						document.getElementById('deuterioRestante').innerHTML=puntuar(deuterioNew);
					}
				} // calcularMax()
				
				unsafeWindow.enviar = function enviar() {
					var cadena='';
					for (var i=0; i<inputs.snapshotLength; i++) {
						if (parseInt(inputs.snapshotItem(i).value, 10)>999) cadena=[cadena, inputs.snapshotItem(i).name, parseInt(inputs.snapshotItem(i).value, 10)-999].join(':');
					}
					GM_setValue('sinConstruir', cadena);
					if (debugMode) GM_log('Enviando, restantes: ' + cadena);
				} // enviar()
				
				document.forms[0].setAttribute('onsubmit', 'enviar()');
				unsafeWindow.calcularMax([metal, cristal, deuterio].join(':'));
				for (var i=0; i<inputs.snapshotLength; i++) {
					var div = inputs.snapshotItem(i).parentNode.lastChild;
					div.firstChild.value=div.lastChild.innerHTML; // maximo = maximo relativo
				}
			} // SYConst

			if (getScriptConf('SYReducible')) {
				var elements = document.evaluate("//td[@class='l' and position()=2]/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				
				var more = document.createElement('img');
				more.src = moreButton;
				more.style['cursor']='pointer';
				more.title = 'Mostrar unidade';
				more.setAttribute('onclick', 'delHiddenShip(this.parentNode.parentNode.id)');
				
				var less = document.createElement('img');
				less.src = lessButton;
				less.style['cursor']='pointer';
				less.title = 'Ocultar unidade';
				less.setAttribute('onclick', 'setHiddenShip(this.parentNode.parentNode.id)');

				var nodo = document.createElement('td');
				nodo.className='l';
				nodo.colSpan=3;
				nodo.style['display'] = 'none';
				nodo.appendChild(more);
				
				for (var i=0; i<elements.snapshotLength; i++) {
					var gid = elements.snapshotItem(i).href.split('gid=')[1];
					elements.snapshotItem(i).parentNode.insertBefore(less.cloneNode(true), elements.snapshotItem(i));
					elements.snapshotItem(i).innerHTML = '&nbsp;' + elements.snapshotItem(i).innerHTML;
					var father = elements.snapshotItem(i).parentNode.parentNode;
					father.appendChild(nodo.cloneNode(true));
					father.id = gid;
					father.childNodes[0].id = 'photo_'+gid;
					father.childNodes[1].id = 'desc_'+gid;
					father.childNodes[2].id = 'input_'+gid;
					father.childNodes[3].id = 'mini_'+gid;
					father.childNodes[3].innerHTML += elements.snapshotItem(i).innerHTML + (elements.snapshotItem(i).nextSibling.nodeValue==null?'':elements.snapshotItem(i).nextSibling.nodeValue);
					if (isHiddenShip(gid)) {
						father.childNodes[0].style['display'] = 'none';
						father.childNodes[1].style['display'] = 'none';
						father.childNodes[2].style['display'] = 'none';
						father.childNodes[3].style['display'] = '';
					}
				}
			} // SYReducible
		}
		else { // Hay naves por construir
			var faltan = GM_getValue('sinConstruir', '').split(':');
			var cadena='';
			for (var i=1; i<faltan.length-1; i+=2) {
				document.getElementsByName(faltan[i])[0].value=faltan[i+1];
				if (parseInt(faltan[i+1], 10)>999) cadena=[cadena, faltan[i], parseInt(faltan[i+1], 10)-999].join(':');
			}
			GM_setValue('sinConstruir', cadena);
			if (debugMode) GM_log('Recargando, restantes: ' + cadena);
			document.forms[0].submit();
		}
	}
	
	else if (getScriptConf('colorBuild')) {
		element = document.evaluate('/html/body/center/table/tbody/tr/td/table/tbody', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.getElementsByTagName('b');
		var coord=document.getElementsByTagName('select')[0];
		coord = coord.options[coord.selectedIndex].text.replace(/(.*)\[(.*)\].*/, '$1:$2').split(':');
		var planetType=1;
		try {
			coord[0].match(/Lua/i)[0];
			planetType=3;
		}
		catch (e) {}
		var galaxy=coord[1];
		var system=coord[2];
		var planet=coord[3];
		
		var string='window.parent.frames[0].document.getElementById';
		for (var i=0; i<element.length; i++) {
			var resta = 0;
			var cadena = '';
			if (element[i].previousSibling.nodeValue.indexOf('Metal')!=-1) {
				resta=metal-parseInt(element[i].innerHTML.replace(/\./g, ''), 10);
				cadena='metal';
			}
			else if (element[i].previousSibling.nodeValue.indexOf('Cristal')!=-1) {
				resta=cristal-parseInt(element[i].innerHTML.replace(/\./g, ''), 10);
				cadena='cristal';
			}
			else if (element[i].previousSibling.nodeValue.indexOf('Deutério')!=-1) {
				resta=deuterio-parseInt(element[i].innerHTML.replace(/\./g, ''), 10);
 				cadena='deuterio';
			}
			else if (element[i].previousSibling.nodeValue.indexOf('Energia')!=-1)
				resta=energia-parseInt(element[i].innerHTML.replace(/\./g, ''), 10);
			if (resta<0) {
				element[i].innerHTML = element[i].innerHTML.replace(/(.*)/, "<span class='noresources' title="+puntuar(resta)+">$1</span>");
				if (cadena!='') {
					element[i].firstChild.setAttribute('onclick', string+"('" + cadena +
						"').value='" + Math.abs(resta) + "';" + string + "('coord').value='" +
						[galaxy,system,planet,planetType].join(':') + "';" + string + "('tablaRecursos').onchange()");
				}
			}
		}
	}
}


else if (location.pathname=='/game/resources.php' && getScriptConf("improvedResources")) {
	var element = document.evaluate('/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.getElementsByTagName('td');
	var Metal = parseInt(element[1].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''), 10);
	var Cristal = parseInt(element[2].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''), 10);
	var Deut = parseInt(element[3].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''), 10);

	var T_Recursos = document.getElementsByTagName("td");
	var PMetal = T_Recursos[40].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,'');
	var PCristal = T_Recursos[41].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,'');
	var PDeut = T_Recursos[42].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,'');

	var AlmM = T_Recursos[35].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,'');
	var AlmC = T_Recursos[36].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,'');
	var AlmD = T_Recursos[37].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,'');
	AlmM = AlmM.replace(/k/,'000').replace(/\./g,'');
	AlmC = AlmC.replace(/k/,'000').replace(/\./g,'');
	AlmD = AlmD.replace(/k/,'000').replace(/\./g,'');

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
	var ResForm = document.evaluate('//table[@width=550]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

	// Buscar Factor de Produccion
	var Factor = 0;
	try {
		Factor = parseFloat(document.body.innerHTML.match(/Factor[\s\S]+\:\d(.\d+)?/g)[0].split(':')[1])*100;
	} catch (e) {}
	var FactorPorc=parseInt(parseFloat(Factor) * 2.5, 10);
	
	// Agregar tabla de factor de produccion
	if (ResForm) {
		// Buscar Produccion Real
	
		// Procesar Tablas
		var ProdFact = document.createElement('div');
		ProdFact.innerHTML = '<table width="550"><tr>'+
			'<td class="c">Nivel de Produção</td>'+
			'<th>'+Factor+'%</th>'+
			'<th width="250"><div style="border: 1px solid #9999FF; width: 250px;"><div id="prodBar" style="background-color: 		'+(Factor < 100 ? '#C00000' : '#00C000' )+'; width: 0px;">&nbsp;</div></div></th>'+
			'</tr></table><br />';
	
		var CuentaRec = document.createElement('div');
		CuentaRec.innerHTML = '<br /><table width="550">'+
			'<tr><td class="c" colspan="4">Produção extendida</td></tr>'+
			'<tr><th>&nbsp;</th>'+
			'<td class="c" align=center>Diária</td>'+
			'<td class="c" align=center>Semanal</td>'+
			'<td class="c" align=center>Mensal</td>'+
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
			'<td class="c" align=center>Deutério</td>'+
			'<th><font color="#00ff00">'+puntuar(XDeut[0])+'</font></th>'+
			'<th><font color="#00ff00">'+puntuar(XDeut[1])+'</font></th>'+
			'<th><font color="#00ff00">'+puntuar(XDeut[2])+'</font></th>'+
			'</tr></table><br />';

		var EAlmM=(Metal / AlmM) * 100;
		var EAlmMPorc=parseInt((Metal / AlmM) * 250, 10);
		var EAlmC=(Cristal / AlmC) * 100;
		var EAlmCPorc=parseInt((Cristal / AlmC) * 250, 10);
		var EAlmD=(Deut / AlmD) * 100;
		var EAlmDPorc=parseInt((Deut / AlmD) * 250, 10);

		EAlmM = Math.round(EAlmM);
		EAlmC = Math.round(EAlmC);
		EAlmD = Math.round(EAlmD);

		CuentaRec.innerHTML += '<table width="550">'+
			'<tr><td class="c" colspan="3">Estado do Armazenamento</td></tr>'+
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
			'<td class="c" align=center>Deutério</td>'+
			'<th>'+EAlmD+'%</th>'+
			'<th width="250"><div style="border: 1px solid #9999FF; width: 250px;"><div id="AlmDBar" style="background-color: '+(EAlmD > 100 ? '#C00000' : '#00C000' )+'; width: 0px;">&nbsp;</div></div></th>'+
			'</tr>'+
			'</table><br />';

		ResForm.parentNode.insertBefore(CuentaRec, ResForm.nextSibling);
		ResForm.parentNode.insertBefore(ProdFact, ResForm);
		document.body.innerHTML = document.body.innerHTML.replace(/factor de produção\:(.)*[0-9.]/gi,'');
		
		
		if (getScriptConf('specialEffects')) {
			function fillBar(ids, percents, max) {
				idList = ids.split(':');
				perList = percents.split(':');
				var continuar = false;
				for (var i=0; i<idList.length; i++) {
					var bar = document.getElementById(idList[i]);
					var width = parseInt(bar.style['width'].split('px')[0], 10);
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

else if (location.pathname=='/game/flotten1.php') {
	var element = document.evaluate('/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.getElementsByTagName('td');
	var metal = parseInt(element[1].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''), 10);
	var cristal = parseInt(element[2].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''), 10);
	var deuterio = parseInt(element[3].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''), 10);
	var recursos = metal + cristal + deuterio;
	
	function calculate() {
		var capacity=0;
		var speed=0;
		var consumption=0;
		for(i=202; i<215; i++){
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
			surstr += '&nbsp;&nbsp;<font color="orangered" title="Cargueiros pequenos"> CP: ' +
						puntuar(Math.ceil((recursos-capacity)/5000)) +
						(capacity==0?' (' + cp + ')':'') + '</font>' +
						'&nbsp;&nbsp;<font color="orange" title="Cargueiros grandes"> CG: ' +
						puntuar(Math.ceil((recursos-capacity)/25000)) +
						(capacity==0?' (' + cg + ')':'') + '</font>';
		} else {
			surstr='0';
		}
		infoRow.innerHTML= '<font color="#9999FF">Recursos restantes: ' + surstr + '</font>' +
						(capacity>0?'&nbsp;&nbsp;<font color="#00FF66">Capacidade: '	+ puntuar(capacity) + '</font>' +
						'<br /><font color="lightblue">Velocidade máx: ' + puntuar(speed) + '</font>' +
						'&nbsp;&nbsp;<font color="#77bb22">Consumo: ' + puntuar(consumption) + '</font>':'');
	}

	unsafeWindow.pressEnter=function (e) {
		return e.which==13;
	}
	document.body.setAttribute('onkeypress', 'if (pressEnter(event)) document.forms[document.forms.length-1].submit()');
	if (window.parent.frames[0].document.getElementById('tablaRecursos').style['display']==''
			&& document.getElementsByName('maxship203')[0]) {
		var metal2 = window.parent.frames[0].document.getElementById('metal').value;
		var cristal2 = window.parent.frames[0].document.getElementById('cristal').value;
		var deuterio2 = window.parent.frames[0].document.getElementById('deuterio').value;
		var maxships = parseInt(document.getElementsByName('maxship203')[0].value, 10);
		
		var ships = Math.ceil((Math.min(parseInt(metal,10),parseInt(metal2,10)) +
								Math.min(parseInt(cristal,10),parseInt(cristal2,10)) +
								Math.min(parseInt(deuterio,10),parseInt(deuterio2,10)))/25000);
		if (maxships<ships) {
			alert('Faltan '+String(ships-maxships)+' cargueros grandes');
			ships = maxships;
		}
		document.getElementsByName('ship203')[0].value = ships;
	}
	else if (window.parent.frames[0].document.getElementById('transportMode').checked) {
		document.getElementsByName('ship203')[0].value = Math.min(Math.ceil((metal+cristal+deuterio)/25000), document.getElementsByName('maxship203')[0].value);
	}

	if (getScriptConf('flottenInfo')) {
		unsafeWindow.calculate = calculate;

		var infoRow = document.evaluate('/html/body/center/form/table[last()]/tbody', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.getElementsByTagName('tr');

		var as = infoRow[infoRow.length-3].getElementsByTagName('a');
		for (var i=0; i<as.length; i++)
			as[i].setAttribute('onclick', 'setTimeout(calculate, 20)');
		infoRow = infoRow[infoRow.length-1].firstChild;
		calculate();
//		document.getElementsByTagName('tbody')[4].setAttribute('onchange', 'alert(1)');
		for(i=202; i<215; i++){  // quiza se podria reducir los bucles de busqueda cogiendo directamente esa columna
			x=document.getElementsByName("ship"+i);
			if(x.length){
				x[0].addEventListener('keyup',calculate,true);
				x[0].parentNode.previousSibling.previousSibling.firstChild.setAttribute('onclick', 'setTimeout(calculate, 20)');
				x[0].setAttribute('onchange', "this.value=parseInt(Math.min(parseInt('0'+this.value, 10), parseInt(getElementsByName('max'+this.name)[0].value, 10)),10);setTimeout(calculate, 10)");
			}
		}
	}
	
	if (getScriptConf('proInputs')) {
		var cells = document.evaluate("/html/body/center[2]/form/table/tbody/tr/th[a='máx']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		for (var i=0; i<cells.snapshotLength; i++) {
			var ship = cells.snapshotItem(i).firstChild.href.match(/ship\d+/)[0];
			cells.snapshotItem(i).innerHTML='';

			var a = document.createElement("a");
			a.setAttribute("href", "javascript:var texto=document.getElementsByName('" + ship +
						"')[0]; maxShip('" + ship + "');texto.onchange();");
			a.innerHTML = "&infin;";
			cells.snapshotItem(i).appendChild(a);

			var a = document.createElement("a");
			a.style['cursor'] = 'pointer';
			a.setAttribute("onmousedown", "pressed=true;cambiar('"+ship+"', true, getElementsByName('max" + ship +	"')[0].value)");
			a.setAttribute("onmouseout", "if (pressed=true) {pressed=false; contador=5; incremento=1;}");
			a.setAttribute("onmouseup", "pressed=false; contador=5; incremento=1; document.getElementsByName('" + ship +	"')[0].onchange()");
			a.innerHTML='+';		
			cells.snapshotItem(i).appendChild(a);

			var a = document.createElement("a");
//			a.setAttribute("href", "javascript:var texto=document.getElementsByName('" + ship +	"')[0];if (texto.value>0){ texto.value--;texto.onchange();}");
			a.style['cursor'] = 'pointer';
			a.setAttribute("onmousedown", "pressed=true;cambiar('"+ship+"', false, getElementsByName('max" + ship +	"')[0].value)");
			a.setAttribute("onmouseout", "if (pressed=true) {pressed=false; contador=5; incremento=1;}");
			a.setAttribute("onmouseup", "pressed=false; contador=5; incremento=1; document.getElementsByName('" + ship +	"')[0].onchange()");
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

	unsafeWindow.pressEnter=function (e) {
		return e.which==13;
	}

	document.body.setAttribute('onkeypress', 'if (pressEnter(event)) document.forms[0].submit()');
	if (window.parent.frames[0].document.getElementById('tablaRecursos').style['display']=='') {
		document.getElementsByName('galaxy')[0].value = window.parent.frames[0].document.getElementById('galaxy').value;
		document.getElementsByName('system')[0].value = window.parent.frames[0].document.getElementById('system').value;
		document.getElementsByName('planet')[0].value = window.parent.frames[0].document.getElementById('planet').value;
		document.getElementsByName('planettype')[0].value = window.parent.frames[0].document.getElementById('planetType').value;
	}
	else if (window.parent.frames[0].document.getElementById('transportMode').checked) {
		var temp = getScriptConf("TMDestination");
		if (temp = "0;0;0;1") {
			temp = getMainP().replace(/:/g, ';')+';1';
		}
		temp = temp.split(';');
		if (temp[0]!='0') {
			document.getElementsByName('galaxy')[0].value = temp[0];
			document.getElementsByName('system')[0].value = temp[1];
			document.getElementsByName('planet')[0].value = temp[2];
			document.getElementsByName('planettype')[0].value = temp[3];
		} 
	}
	unsafeWindow.shortInfo();
}

else if (location.pathname=='/game/flotten3.php') {
	unsafeWindow.pressEnter=function (e) {
		return e.which==13;
	}
	document.body.setAttribute('onkeypress', 'if (pressEnter(event)) document.forms[0].submit()');
	if (window.parent.frames[0].document.getElementById('tablaRecursos').style['display']=='') {
		var recNeeded = new Array(window.parent.frames[0].document.getElementById('metal'),
					window.parent.frames[0].document.getElementById('cristal'),
					window.parent.frames[0].document.getElementById('deuterio'));
		var thisrec = new Array(document.getElementsByName('thisresource1')[0].value,
					document.getElementsByName('thisresource2')[0].value,
					document.getElementsByName('thisresource3')[0].value);
		var rec = new Array(document.getElementsByName('resource1')[0],
					document.getElementsByName('resource2')[0],
					document.getElementsByName('resource3')[0]);
		for (var i=0; i<3; i++) {
			if (parseInt(thisrec[i], 10) >= parseInt(recNeeded[i].value, 10)) {
				rec[i].value=recNeeded[i].value;
			}
			else {
				rec[i].value=thisrec[i];
			}
		}
		unsafeWindow.enviar = function () {
			for (var i=0; i<3; i++) {
				if (parseInt(rec[i].value, 10) >= parseInt(recNeeded[i].value, 10)) {
					recNeeded[i].value = '0';
				}
				else {
					recNeeded[i].value = parseInt(recNeeded[i].value, 10) - parseInt(rec[i].value, 10);
				}
			}
			//window.parent.frames[0].document.getElementById('tablaRecursos').onchange();
			window.parent.frames[0].document.getElementById('total').innerHTML=Math.ceil((parseInt(recNeeded[0].value, 10)+parseInt(recNeeded[1].value, 10)+parseInt(recNeeded[2].value, 10))/25000);
		}
		document.forms[0].setAttribute('onsubmit', "enviar()");
	}
	else if (window.parent.frames[0].document.getElementById('transportMode').checked) {
		unsafeWindow.maxResources();
	}
	unsafeWindow.calculateTransportCapacity();
}

else if (location.pathname=='/game/flottenversand.php') {
	var recNeeded = new Array(window.parent.frames[0].document.getElementById('metal'),
				window.parent.frames[0].document.getElementById('cristal'),
				window.parent.frames[0].document.getElementById('deuterio'));
	if (parseInt(recNeeded[0].value, 10) + parseInt(recNeeded[1].value, 10) + parseInt(recNeeded[2].value, 10) == 0) {
		window.parent.frames[0].document.getElementById('tablaRecursos').style['display']='none';
		if (getScriptConf('transportMode')) window.parent.frames[0].document.getElementById('trTrans').style['display']='';
	}
}

else if (location.pathname=='/game/galaxy.php') {
	element = document.evaluate('/html/body/center/form/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	var session = element.value;
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

	unsafeWindow.whenResponse = function whenResponse(){
		retVals = this.response.split(" ");
		switch(retVals[0]) {
			case "600":
				unsafeWindow.addToTable("feito", "success");
				if (document.getElementById('slots')) {
					unsafeWindow.setShips("slots", retVals[1]);
					unsafeWindow.setShips("probes", retVals[2]);
					unsafeWindow.setShips("recyclers", retVals[3]);
					unsafeWindow.setShips("missiles", retVals[4]);
				}
				else {
					document.getElementById('status').style['display']='';
					if (document.getElementById('missiles')!=null) 
						document.getElementById('missiles').parentNode.parentNode.style['display']='none';
					unsafeWindow.setShips("slots2", retVals[1]);
					unsafeWindow.setShips("probes2", retVals[2]);
					unsafeWindow.setShips("recyclers2", retVals[3]);
					unsafeWindow.setShips("missiles2", retVals[4]);
				}
				break;
			case "601":
				unsafeWindow.addToTable("Ocorreu um erro", "error");
				break;
			case "602":
				unsafeWindow.addToTable("Não há lua", "error");
				break;
			case "603":
				unsafeWindow.addToTable("O jogador é demasiado fraco", "error");
				break;
			case "604":
				unsafeWindow.addToTable("O jogador é demasiado forte", "error");
				break;
			case "605":
				unsafeWindow.addToTable("O jogador está em modo férias", "vacation");
				break;
			case "610":
				unsafeWindow.addToTable("Só há "+retVals[1]+" sondas disponíveis, enviando", "notice");
				break;
			case "611":
				unsafeWindow.addToTable("Nâo há sondas de espionagem disponíveis", "error");
				break;
			case "612":
				unsafeWindow.addToTable("Não podes enviar mais frotas", "error");
				break;
			case "613":
				unsafeWindow.addToTable("Não tens deutério suficiente", "error");
				break;
			case "614":
				unsafeWindow.addToTable("Não há planeta", "error");
				break;
			case "615":
				unsafeWindow.addToTable("Não tens deutério suficiente", "error");
				break;
			case "616":
				unsafeWindow.addToTable("multialarme", "error");
				break;
		}
	}
	var tabla=document.createElement("tr");
	var td1 = document.createElement("td");
	td1.id="status";
	td1.setAttribute('colspan', colspan);
	td1.setAttribute('class','c');
	td1.style['display']='none';
	tabla.appendChild(td1);
	td1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;<span id='missiles2'></span> Misseis interplanetários"
			+ "&nbsp;&nbsp;&nbsp;&nbsp;<span id='recyclers2'></span> Recicladores"
			+ "&nbsp;&nbsp;&nbsp;&nbsp;<span id='probes2'></span> Sondas"
			+ "&nbsp;&nbsp;&nbsp;&nbsp;<span id='slots2'></span>/"+String(parseInt(getTech('computacion'))+1, 10)+" Frotas em missão"; 
	var status=document.getElementById("fleetstatusrow");
	status.parentNode.insertBefore(tabla, status);
   
	unsafeWindow.doit = function doit(order, galaxy, system, planet, planettype, shipcount){
		unsafeWindow.strInfo = "Enviando " + shipcount + (order==6?" sonda" + (shipcount>1?"s":""):" reciclador"
				+ (shipcount>1?"es":"")) + " a "+ galaxy + ":" + system + ":" + planet + (planettype==2?" -  Destroços":"")
				+ (planettype==3?" - Lua":"") + "...";
		unsafeWindow.ajax.requestFile = "flottenversand.php";
		unsafeWindow.ajax.runResponse = unsafeWindow.whenResponse;
		unsafeWindow.ajax.execute = true;
		unsafeWindow.ajax.setVar("session", session);
		unsafeWindow.ajax.setVar("order", order);
		unsafeWindow.ajax.setVar("galaxy", galaxy);
		unsafeWindow.ajax.setVar("system", system);
		unsafeWindow.ajax.setVar("planet", planet);
		unsafeWindow.ajax.setVar("planettype", planettype);
		unsafeWindow.ajax.setVar("shipcount", shipcount);
		unsafeWindow.ajax.setVar("speed", 10);
		unsafeWindow.ajax.setVar("reply", "short");
		unsafeWindow.ajax.runAJAX();
	}

	sondasPorDefecto = 5;
	try {
		sondasPorDefecto = document.body.innerHTML.match(/doit\(.*(\d+)\)/m)[1];
	}
	catch (e) {}
	if (getScriptConf('moonSpy')) {
		divs = document.getElementsByTagName('div').length;
		for(i=1; i<=divs; i++) {
			var path = '/html/body/div[';
			path += i;
			path += ']/table/tbody/tr/th/table/tbody/tr/th/table/tbody';
			element = document.evaluate(path + '/tr/td', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			if (element) {
				partes= element.innerHTML.split('[');
				teste= element.innerHTML.split('Lua')
				if (teste[0]=='') {
					planeta = partes[1].split(':')[2].split(']')[0];
					element2 = document.evaluate(path + '/tr[2]/th[2]/table/tbody/tr[5]/th', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
					element2.innerHTML = element2.innerHTML.replace(/<font.*>.*<\/font>/m, "<a style=\"cursor:pointer\" onclick=doit(6,"+ galaxy +","+ system +","+ planeta + ",3," + sondasPorDefecto + ")>Espiar</a>");
				}
				else if (partes[0]=='Destroços ') {
					planeta = partes[1].split(':')[2].split(']')[0];
					element2 = document.evaluate(path + '/tr[2]/th[2]/table/tbody', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
					metal = element2.childNodes[1].childNodes[1].innerHTML;
					cristal = element2.childNodes[2].childNodes[1].innerHTML;
					escombros = parseInt(metal.replace(/\./g,""), 10)+parseInt(cristal.replace(/\./g,""), 10);
					reciclas = parseInt(escombros/20000+1, 10);
					element2.childNodes[4].firstChild.innerHTML = "<a style=\"cursor:pointer\" onclick=doit(8,"+ galaxy +","+ system +","+ planeta + ",2," + reciclas + ") title='"+reciclas+" reciclador"+(reciclas>1?"es":"")+"'>Recolher</a>";
				}
			}
		}
	}

	if (getScriptConf('debris')) {
		element = document.evaluate("//center/table/tbody/tr[th[position()=1 and child::a[2]]]/th[last()-3]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i=0; i<element.snapshotLength; i++) {
			escombros=element.snapshotItem(i).parentNode.cells[0].getElementsByTagName('a')[1].title.replace(/\./g, '').match(/\d+/g);
			//alert(element.snapshotItem(i).parentNode.cells[0].getElementsByTagName('a')[0].innerHTML+'. Metal -> '+parseInt(escombros[0],10)+' Cristal -> ' + parseInt(escombros[1],10))
			escombros=parseInt(escombros[0],10)+parseInt(escombros[1],10);
			if (escombros>parseInt(getScriptConf('debrisMin'), 10)) {
				var color=Math.min(Math.round(escombros/parseInt(getScriptConf('debrisMax'), 10)*100),100);
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
				ally=allys.snapshotItem(i).innerHTML.match(new RegExp('(Aliança |   )('+tags2+')( en la| $)', 'i'))[2];
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
				allys.snapshotItem(i).innerHTML=allys.snapshotItem(i).innerHTML.replace(new RegExp('(Aliança |   )('+ally+')( en la| $)', 'i'),
					'$1<font color='+(color2!=''?color2:color)+'>$2</font> '+etiquetas+'$3');
			}
		}
	}

	if (getScriptConf('coordLinker')) {
		try {
			var planeta1 = location.href.match(/&planet=(\d+)/);
		} catch(e){}
		try {
			var planeta2 = location.href.match(/&position=(\d+)/);
		} catch(e){}
		try {
			var planeta3 = location.href.match(/&p3=(\d+)/);
		} catch(e){}
		
		if (planeta1) planeta = planeta1;
		else if (planeta2) planeta = planeta2;
		else if (planeta3) planeta = planeta3;
		
		if (planeta) {
			var link = document.evaluate("/html/body/center/table/tbody/tr/th[a='"+planeta[1]+"']/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			link.style['color']=getScriptConf('coordLinkerCG');
		}
	}
	
	

}


else if (location.pathname=='/game/stat.php') {
	if (getScriptConf('allyTags')) {
		// cogemos las etiquetas a colorear, dependiendo de la pantalla de estadisticas en la que estemos
		var allys = document.evaluate("//center/table/tbody/tr/th["+(document.getElementsByName('who')[0].selectedIndex=='0'?'4]/a':'2]/a'), document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		// obtenemos las etiquetas a cambiar
		var tags = GM_getValue('allyTags', defAllyTags).split(':x:');
		var tags2='';
		for (var i=0; i<tags.length; i++) {
			tags2+=tags[i].split(':y:')[2]+(i==tags.length-1?'':'|');
		}
		// hacemos que los simbolos en los nombres no afecten a la expresion
		tags2=tags2.replace(/([\.\[\]\(\)\{\}\$])/g,'\\$1');
		//alert (allys.snapshotItem(1).innerHTML.replace(/^\s*\n\s/, ''));
		for (var i=0; i<allys.snapshotLength; i++) {
			var ally='';
			try {
				ally=allys.snapshotItem(i).innerHTML.replace(/\s*\n\s*/, '').match(new RegExp('^('+tags2+')$', 'im'))[1];
			}
			catch (e) {}
			if (ally) { // si la etiqueta esta, procedemos a colorearla
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
				allys.snapshotItem(i).innerHTML=allys.snapshotItem(i).innerHTML.replace(/\s*\n\s*/, '').replace(new RegExp('^('+ally+')$', 'i'),
					'<font color='+(color2!=''?color2:color)+'>'+ally+'</font> '+etiquetas);
			}
		}
	}
	
}

else if(document.baseURI.indexOf("galaxy.php") != -1) { //Si esta abierta la parte de galaxia...
   listaElementos = document.getElementsByTagName('span');

      for (var i = 0; i < listaElementos.length; i++) {
              elementoActual = listaElementos[i];
          
          if (elementoActual.className.substring(0,6)=='normal')
        	{
        	elementoActual.style.color = normal;
        	}

          if (elementoActual.className.substring(0,8)=='inactive')
        	{
        	elementoActual.style.color = inactivo;
        	}
          if (elementoActual.className.substring(0,12)=='longinactive')
        	{
        	elementoActual.style.color = muyInactivo;
        	}
          if (elementoActual.className.substring(0,6)=='strong')
        	{
        	elementoActual.style.color = fuerte;
        	}
          if (elementoActual.className.substring(0,4)=='noob')
        	{
        	elementoActual.style.color = debil;
        	}
          if (elementoActual.className.substring(0,8)=='vacation')
        	{
        	elementoActual.style.color = vacaciones;
        	}
          if (elementoActual.className.substring(0,6)=='banned')
        	{
        	elementoActual.style.color = suspendido;
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
		var nodo = document.evaluate('/html/body/center/table/tbody/tr[th="Página principal"]/th[2]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (nodo) {
			setScriptConf('foroAlly', nodo.innerHTML.replace(/:/g, ';'));
			window.parent.frames[0].document.getElementById('foroAlly').href=nodo.innerHTML;
		}
		nodo = document.evaluate('/html/body/center/table/tbody/tr[th="TAG"]/th[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (nodo) {
			setScriptConf('allyName', nodo.innerHTML);
			window.parent.frames[0].document.getElementById('allyName1').innerHTML=nodo.innerHTML;
			window.parent.frames[0].document.getElementById('allyName2').innerHTML=nodo.innerHTML;
		}
		nodo = document.evaluate('/html/body/center/table/tbody/tr[th="Email colectivo"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (nodo) {
			setScriptConf('ATCCPriv', true);
			window.parent.frames[0].document.getElementById('ATCC').style['display']='';
		}
		else {
			setScriptConf('ATCCPriv', false);
			window.parent.frames[0].document.getElementById('ATCC').style['display']='none';
		}
		window.parent.frames[0].document.getElementById('allyTable').style['display']='';
	}
}


else if (location.pathname=='/game/messages.php') {
	var DRAGOSIM = 0;
	var CSIM = 1;	
	
	var parser = new Array();
	// defesas
	parser['Lançador de Mísseis'] = new Array("&numunits[1][0][ra]=", "&d14=");
	parser['Laser Ligeiro'] = new Array("&numunits[1][0][l_l]=", "&d15=");
	parser['Laser Pesado'] = new Array("&numunits[1][0][s_l]=", "&d16=");
	parser['Canhão de Gauss'] = new Array("&numunits[1][0][g]=", "&d17=");
	parser['Canhão de Iões'] = new Array("&numunits[1][0][i]=", "&d18=");
	parser['Canhão de Plasma'] = new Array("&numunits[1][0][p]=", "&d19=");
	parser['Pequeno Escudo Planetário'] = new Array("&numunits[1][0][k_s]=", "&d20=");
	parser['Grande Escudo Planetário'] = new Array("&numunits[1][0][g_s]=", "&d21=");
	// frota
	parser['Cargueiro Pequeno'] = new Array("&numunits[1][0][k_t]=", "&d0=");
	parser['Cargueiro Grande'] = new Array("&numunits[1][0][g_t]=", "&d1=");
	parser['Caça Ligeiro'] = new Array("&numunits[1][0][l_j]=", "&d2=");
	parser['Caça Pesado'] = new Array("&numunits[1][0][s_j]=", "&d3=");
	parser['Cruzador'] = new Array("&numunits[1][0][kr]=", "&d12=");
	parser['Nave de Batalha'] = new Array("&numunits[1][0][sc]=", "&d7=");	
	parser['Nave de Colonização'] = new Array("&numunits[1][0][ko]=", "&d6=");
	parser['Reciclador'] = new Array("&numunits[1][0][re]=", "&d5=");
	parser['Sonda de Espionagem'] = new Array("&numunits[1][0][sp]=", "&d4=");
	parser['Bombardeiro'] = new Array("&numunits[1][0][bo]=", "&d8=");
	parser['Satélite Solar'] = new Array("&numunits[1][0][so]=", "&d9=");
	parser['Destruidor'] = new Array("&numunits[1][0][z]=", "&d10=");
	parser['Estrela da Morte'] = new Array("&numunits[1][0][t]=", "&d11=");
	parser['Interceptor'] = new Array("&numunits[1][0][sk]=", "&d12=");
	// tecnologias
	parser['Tecnologia de Armas'] = new Array("&techs[1][0][w_t]=", "&dattack=");
	parser['Tecnologia de Escudo'] = new Array("&techs[1][0][s_t]=", "&dshield=");
	parser['Tecnologia de Blindagem'] = new Array("&techs[1][0][r_p]=", "&darmory=");

/*	var parser[''] = new Array("&v_met=", "&dmetal=");
	var parser[''] = new Array("&v_kris=", "&dcrystal=");
	var parser[''] = new Array("&v_deut=", "&ddeut=");
	var parser[''] = new Array("&v_planet=", "&dplanet="); // no implementado en CSIM
	var parser[''] = new Array("&techs[0][0][w_t]=", "&aattack=");
	var parser[''] = new Array("&techs[0][0][s_t]=", "&ashield=");
	var parser[''] = new Array("&techs[0][0][r_p]=", "&aarmory=");
*/	


	// arrays para los simuladores
	var RM = new Array("&v_met=", "&dmetal=");
	var RK = new Array("&v_kris=", "&dcrystal=");
	var RD = new Array("&v_deut=", "&ddeut=");
	var COORD = new Array("&v_planet=", "&dplanet="); // no implementado en CSIM
	var MTM = new Array("&techs[0][0][w_t]=", "&aattack=");
	var MTD = new Array("&techs[0][0][s_t]=", "&ashield=");
	var MTB = new Array("&techs[0][0][r_p]=", "&aarmory=");
	
	// Funcion para parsear los strings
	function parse(nodo, sim) {
		if (parser[nodo.innerHTML])
			return parser[nodo.innerHTML][sim] + nodo.nextSibling.innerHTML.replace(/\./g, '');
		else return "";
	}

	function getOptions(node, sim) {
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
			metal=elementos[0].firstChild.childNodes[2].childNodes[1].innerHTML.replace(/\./g, '');
			cristal=elementos[0].firstChild.childNodes[2].childNodes[4].innerHTML.replace(/\./g, '');
			deuterio=elementos[0].firstChild.childNodes[4].childNodes[1].innerHTML.replace(/\./g, '');
			coord=elementos[0].firstChild.firstChild.firstChild.innerHTML.split("[")[1].split("]")[0];
		}
		if (elementos.length>=2) {	// Hay flota
			flotaNodes = elementos[1].firstChild.getElementsByTagName('tr');
			for (var k=1; k<flotaNodes.length; k++) {
				flotaNodes2 = flotaNodes[k].getElementsByTagName('td');
				for (j=0; j<flotaNodes2.length; j+=2) {
					flota+=parse(flotaNodes2[j], sim);
				}
			}
			if (elementos.length>=3) {	// Hay defensa
				defensaNodes = elementos[2].firstChild.getElementsByTagName('tr');
				for (var k=1; k<defensaNodes.length; k++) {
					defensaNodes2 = defensaNodes[k].getElementsByTagName('td');
					for (j=0; j<defensaNodes2.length; j+=2) {
						defensas+=parse(defensaNodes2[j], sim);
					}
				}
				if (elementos.length==5) {	// Hay investigaciones
					techNodes = elementos[4].firstChild.getElementsByTagName('tr');
					for (var k=1; k<=3&&k<techNodes.length; k++) {
						techNodes2 = techNodes[k].getElementsByTagName('td');
						for (var j=0; j<techNodes2.length; j+=2) {
							tecnologias+=parse(techNodes2[j], sim);
						}
					}
				}
			}
		}
		var opts = COORD[sim] + coord;
		opts += RM[sim] + metal;
		opts += RK[sim] + cristal;
		opts += RD[sim] + deuterio;
		opts += tecnologias + defensas + flota;
		opts += MTM[sim] + getTech('militar') +
				MTD[sim] + getTech('defensa') +
				MTB[sim] + getTech('blindaje');

		return opts;
	} // getOptions()
/*
	var spyMens = getSpyReports();
	var spyHead = document.getElementsByTagName('tbody')[6].insertRow(3);
	for (var x=0; x<4; x++) spyHead.appendChild(document.createElement('th'));
	spyHead.childNodes[2].innerHTML = 'Orden de la flota ';
	var spyBody = document.getElementsByTagName('tbody')[6].insertRow(4);
	spyBody.appendChild(document.createElement('td'));
	spyBody.lastChild.className = 'b';
	spyBody.appendChild(document.createElement('td'));
	spyBody.lastChild.className = 'b';
	spyBody.lastChild.colSpan = '3';
		
	//for (i in spyMens) {
//		if (spyMens[0]) {
			spyHead.childNodes[0].innerHTML = spyMens[0]; // mensID
			spyHead.childNodes[1].innerHTML = spyMens[1]; // date
			spyHead.childNodes[3].innerHTML = spyMens[2]; // subject
			spyBody.lastChild.innerHTML = spyMens[3]; // content
	//	}
//	}
*/
	element = document.getElementsByTagName('table')[6].getElementsByTagName('tr');
	var colorMens = getScriptConf("colorMens");
	var autoMark = getScriptConf("autoMark");
	var coordLinker = getScriptConf("coordLinker");
	for (i=2; i<element.length-3; i++) {
		var element2 = element[i].getElementsByTagName('th')[3];
		if (element2) {
			if (element2.firstChild.nodeName=="SPAN") {
				element2 = element2.firstChild;
				if (element2.className == "espionagereport") {
					element3 = element[i+1];
/*					if (!getScriptConf('saveSpyReports')) {
						if (mensID = element[i].innerHTML.match(/<th><input name="delmes(\d+)" type="checkbox"><\/th>/i)) {
							var ths = element[i].getElementsByTagName('th');
							var date = ths[1].innerHTML;
							var subject = ths[3].innerHTML;
							var content = element3.getElementsByTagName('td')[1].innerHTML;

							saveSpyReport(mensID[1], [date, subject, content].join(':x:'));
						}
					}*/
					if (getScriptConf('dragoSim')) {
						opciones = getOptions(element3.getElementsByTagName('td')[1], DRAGOSIM);
						target = "";
						// target = "target='nueva'";  // comentar esta linea para que se abra en la misma pagina
						accion = "http://drago-sim.com/index.php?lang=portuguese&template=Standard";
						element3.getElementsByTagName('td')[0].innerHTML += "<center><a title='Analisar no Drago-Sim' href=\"" + accion + opciones + "\" " + target + "><img src='"+DSimIco+"' height=80% width=80%</img></a></center></br>";
					}
					element[i].setAttribute('name', 'mySpy');
					element[i+1].setAttribute('name', 'mySpy');
 					var rec = element3.getElementsByTagName('td')[1].innerHTML.replace(/\n|\./g, '').match(/(Metal|Cristal|Deutério):<\/td><td>-?\d+/g);
 					var recTotal = parseInt(rec[0].match(/\d+/), 10) + parseInt(rec[1].match(/\d+/), 10) + parseInt(rec[2].match(/\d+/), 10);
					if (autoMark) {
						var marcar = getScriptConf("AMEspP")|recTotal<getScriptConf("AMEspPRecMin");
						element2.parentNode.parentNode.childNodes[1].firstChild.checked=marcar;
					}
				}
			}
			else if (colorMens || autoMark) {
				if (element2.previousSibling.previousSibling.innerHTML=='Comando de Frota ') {
					if (element2.innerHTML=='Ataque de mísseis') {
						element[i].setAttribute('name', 'misil');
						element[i+1].setAttribute('name', 'misil');
						if (colorMens)
							element2.innerHTML = "<font color='"+getScriptConf("colorMisiles")+ "'>" + element2.innerHTML + "</font>";
						if (autoMark)
							element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMMisiles"));
					}
					else if (element2.innerHTML=='Chegada ao planeta') {
						element[i].setAttribute('name', 'arrival');
						element[i+1].setAttribute('name', 'arrival');
						if (colorMens)
							element2.innerHTML = "<font color='"+getScriptConf("colorTrans")+ "'>" + element2.innerHTML + "</font>";
						if (autoMark)
							element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMTrans"));
					}
					else if (element2.innerHTML=='Regresso da frota') {
						element[i].setAttribute('name', 'return');
						element[i+1].setAttribute('name', 'return');
						if (colorMens)
							element2.innerHTML = "<font color='"+getScriptConf("colorTransR")+ "'>" + element2.innerHTML + "</font>";
						if (autoMark)
							element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMTransR"));
					}
					else if (element2.innerHTML=='Transferir frotas') {
						element[i].setAttribute('name', 'deploy');
						element[i+1].setAttribute('name', 'deploy');
						if (colorMens)
							element2.innerHTML = "<font color='"+getScriptConf("colorDesp")+ "'>" + element2.innerHTML + "</font>";
						if (autoMark)
							element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMDesp"));
					}
					//else if (element2.innerHTML.search('orange')!='-1') { // espionaje, ya se mira antes junto con el drago-sim }
				}
				else if (element2.previousSibling.previousSibling.innerHTML=='Controlo Espacial ') {
					if (element2.innerHTML=='Entrega de recursos pela frota inimiga') {
						element[i].setAttribute('name', 'confeder');
						element[i+1].setAttribute('name', 'confeder');
						if (colorMens)
							element2.innerHTML = "<font color='"+getScriptConf("colorConf")+ "'>" + element2.innerHTML + "</font>";
						if (autoMark)
							element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMConf"));
					}
					else if (element2.innerHTML=='Ataque de espião') {
						element[i].setAttribute('name', 'spy');
						element[i+1].setAttribute('name', 'spy');
						if (colorMens)
							element2.innerHTML = "<font color='"+getScriptConf("colorEsp")+"'>" + element2.innerHTML + "</font>";
						if (autoMark)
							element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMEsp"));
					}
					else {
						element[i].setAttribute('name', 'attack');
//						element[i+1].setAttribute('name', 'attack');
						if (autoMark)
							element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMAttack"));
					}
				}
				else if (element2.previousSibling.previousSibling.innerHTML=='Frota ') {
					element[i].setAttribute('name', 'harvest');
					element[i+1].setAttribute('name', 'harvest');
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorRec")+"')>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMRec"));
				}
				else if (element2.previousSibling.previousSibling.innerHTML=='Comando de Frota ') {
					element[i].setAttribute('name', 'spy');
					element[i+1].setAttribute('name', 'spy');
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorEsp")+"'>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMEsp"));
				}
				else if (element2.previousSibling.previousSibling.innerHTML=='Explorar ') {
					element[i].setAttribute('name', 'colonization');
					element[i+1].setAttribute('name', 'colonization');
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorColo")+"'>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMColo"));
				}
				
				
				else if (element2.innerHTML.search('Email colectivo')!=-1) {
					element[i].setAttribute('name', 'ally');
					element[i+1].setAttribute('name', 'ally');
					element[i+2].setAttribute('name', 'ally');
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorAlianza")+"'>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMAlianza"));
				}
				else if (element2.previousSibling.previousSibling.innerHTML.split('[').length==2) {
					element[i].setAttribute('name', 'private');
					element[i+1].setAttribute('name', 'private');
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorPriv")+"'>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMPriv"));
				}
			}
		}
	}

	if (coordLinker || colorMens) {
		var session = getSession(location.hostname);
		var texto = document.evaluate("//table/tbody/tr/td[2]/table/tbody/tr/td[2] | //table/tbody/tr/td[2]/table/tbody/tr/th[3]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var colorCM = getScriptConf('coordLinkerCM');
		var colorVariable = getScriptConf('coordLinkerVarM');
		for (var i=0; i<texto.snapshotLength; i++) {
			if (coordLinker) {
				var as = texto.snapshotItem(i).getElementsByTagName('a');
				for (x in as) {
					if (coords = validCoords(as[x].innerHTML)) {
						as[x].style['color'] = colorVariable?getColorLinker(as[x].innerHTML):colorCM;
						as[x].href = "galaxy.php?galaxy=" + coords[1] + "&system=" + coords[2] + "&planet=" + coords[3] + "&session=" + getSession(location.hostname);
					}
				}
			}
			if (colorMens) {
				var texto2 = texto.snapshotItem(i).innerHTML;
				texto2=texto2.replace(/(metal|cristal|deutério):? ?(\d\.\d+e\+\d\d|\d+[\.\d]*)/ig, "<font color='#88aaff'>$1</font>: <font color=orange>$2 </font>");
				texto2=texto2.replace(/(\d\.\d+e\+\d\d|\d+[\.\d]*)( metal| cristal| deutério)/ig, "<font color=orange>$1 </font><font color='#88aaff'>$2</font>");
				texto2=texto2.replace(/inimiga de ([\s\S]*) entrega/, "inimiga de <font color="+getScriptConf('colorPriv')+">$1</font> entrega"); // nombre de jugador en entregas
				texto2=texto2.replace(/jogador ([\s\S]*) envia/, "jogador <font color="+getScriptConf('colorPriv')+">$1</font> envía"); // nombre de jugador en entregas
				texto2=texto2.replace(/(\d+ %)/, "<font color=pink>$1</font>"); // porcentaje en espionajes
				texto2=texto2.replace(/(\D):(\d+[\.\d]*) /g, "$1:<font color='#88aaff'>$2</font> "); // numero de naves en regresos
				texto2=texto2.replace(/(Tus) (\d+[\.\d]*) (recicladores)/, "$1 <font color='#88aaff'>$2</font> $3"); // numero de naves en recicladas
				texto2=texto2.replace(/(\d+[\.\d]*)(\. En los escombros)/, "<font color=orange>$1</font>$2"); // capacidad total de los recicladores
				texto2=texto2.replace(/(sin traer recursos)/, '<font color=violet>$1</font>');
				texto.snapshotItem(i).innerHTML=texto2;
			}
		}
	}
	
	if (window.parent.frames[0]) {
		var bl=window.parent.frames[0].document.getElementsByTagName('blink')[0];
		if (bl) bl.parentNode.innerHTML = 'Mensagens';
	}
}




else if (location.pathname=='/game/bericht.php' && getScriptConf('compactar')) {
	function getCompactConf(nombre) {
//		if (debugMode) GM_log("Obteniendo valor de CompactConf: " + nombre)
		return getConf(nombre, "compactConf", defCompactConf, ':x:');
	}
	function setCompactConf(nombre, valor) {
		if (debugMode) GM_log("Cambiando valor de CompactConf: " + nombre + " <- " + valor)
		return setConf(nombre, valor, "compactConf", defCompactConf, ':x:');
	}
	unsafeWindow.setCompactConf = setCompactConf;

	unsafeWindow.setHiddenCompact = function(id) {
		hideId(id);
		return setBooleanConf('compact', id);
	}
	
	unsafeWindow.delHiddenCompact = function(id) {
		showId(id);
		return delBooleanConf('compact', id);			
	}
	
	getHiddenCompact = function(id) {
		return getBooleanConf('compact', id);			
	}

	/*******************************************************
 * Modificacion del script Compactador-OGame
 * Fuente: http://userscripts.org/scripts/source/3482.user.js
 * version 0.8
 * 18 Feb 2007
 * Copyright (c) 2007, Guillermo Gutierrez
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
	const amountag = "Quantidade";
	const damagetag	= "Armas:";
	const resulttag = "batalha";
	const drawtag = "combate";
	const rubbletag = "flotan ahora";
	const metalrubbletag = "Metal e";
	const cristalrubbletag = "Cristal";
	const stolentag = "captura<br>";
	const metaltag = "Metal,";
	const cristaltag = "Cristal y";
	const deuteriumtag = "Deutério<br>";
	const atackerloosestag = "El atacante ha perdido en total";
	const defenderloosestag = "El defensor ha perdido en total";
	const atacker_result_tag = "atacante";
	const unitstag = "unidades.";
	const destroytag = "Destruido";
	const br = "<br>";
	var endtecnologytag	 	= '<table border="1">';
	var endtecnology2tag 	 	= '<br>Destruido';
	var no_ships_no_defenses_text 	= "Sin naves ni defensas";
	var roundtag			= 'La flota atacante dispara';
	var moon_tag		 	= 'La probabilidad de que una luna surja de los escombros es de';
	var moon_created_tag	 	= 'Las enormes cantidades de metal y de cristal se atraen y forman lentamente un satélite lunar en la órbita del planeta. ';
	var max_rentability	 	= 'Máxima';
	var min_rentability		= 'Máxima';
	var repaired_tag	 	= 'pueden ser reparados.';
	var months 			= new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre','Diciembre');
	var serverShiptsNames		= new Array('P.Carga','Gr.Carga','Cazador L.','Cazador P.','Crucero','Nave de Batalla','Colonizador','Reciclador.','Sonda','Bombardero','Satélite S.','Destructor','Est.Muerte','Acoraz.');
	var userShiptsNames		= new Array('Nave pequeña de carga','Nave grande de carga','Cazador ligero','Cazador pesado','Crucero','Nave de batalla','Colonizador','Recicladores','Sonda de espionaje','Bombardero','Satélite solar','Destructor','Estrella de la muerte','Acorazado');
	var serverDefensesNames		= new Array('Misil','Láser Peq.','Láser Gr.','C.Gauss','C.Iónico','C.Plasma','Cúpula Peq.','Cúpula Gr.');
	var userDefensesNames		= new Array('Lanzamisiles','Láser pequeño','Láser grande','Cañón de gauss','Cañón iónico','Cañón de plasma','Cúpula pequeña de protección','Cúpula grande de protección');

//const strings
	const c_singleAtacker 		= 'Attacker';
	const c_multipleAtacker 	= 'Attackers';
	const c_singleDefender 	= 'Defender ';
	const c_multipleDefender 	= 'Defenders';
	const c_battleInit		= 'Battle of the day ';
	const c_at			= ' to ';
	const c_of			= ' of ';
	const c_duration		= 'The battle lasted';
	const c_rounds			= ' rounds';
	const c_hiddenTecnology	= 'Arms: XXX% Shields : XXX% Shield: XXX%';
	const c_lost			= ' it lost  ';
	const c_noLost			= ' without losses';
	const c_maxLost		= ' volatilized ';
	const c_looses			= 'Losses  ';
	const c_units 			= ' units .';
	const c_stolen			= 'Capture: ';
	const c_metalInfo		= ' Metal, ';
	const c_cristalInfo		= ' Crystal and ';
	const c_deuteriumInfo		= ' Deuterium';
	const c_consumption		= 'Deuterium consumption (aprox.) to 100%: ';
	const c_atackerLooses		= 'Losses of the Attacker: ';
	const c_defenderLooses		= 'Losses of the Defender: ';
	const c_totalLooses		= 'Losses TOTAL: ';
	const c_rubbles		= 'Rubbish ';
	const c_metalRubble		= 'Metal: ';
	const c_cristalRubble		= 'Crystal: ';
	const c_deuteriumRubble		= 'Deuterium: ';
	const c_winAndLost		= '	GAINS AND LOSSES ';
	const c_recicleRentability   	= 'Yield with recycling: ';
	const c_notRecicleRentability   = 'Yield without recycling: ';
	const c_with			= ' With';
	const c_without		= 'Without ';
	const c_recicle		= ' Recycling: ';
	const c_defenderWithRecicle	= 'Defender Itself Recycle: ';
	const c_showDeuterium		= 'Show deutérium consumption <br />';
	const c_showTech		= ' Show technologies';
	const c_showCoords		= ' Show coordinates<br>';
	const c_ogameSkin		= ' Deep of skin: ';
	const c_forum_type		= 'compact for fórum of the type: ';
	const c_forum_color		= ' Deep of fórum: ';
	const c_light		= 'Clear';
	const c_dark		= 'Dark ';
	const c_old_favour		= ' See the “classic” report';
	const c_old_slooses		= 'Lost of';
	const c_oll_plooses		= 'Lost of';
	const c_old_rentabilitysAtacker = 'Yield of the Attacker: ';
	const c_old_rentabilitypAtacker = 'Yield of the Attackers: ';
	const c_old_rentabilitysDefender= 'Defender If It recycle: ';
	const c_old_rentabilitypDefender= 'Defender If They recycle: ';
	const c_old_atacker		= 'Attacker  ';
	const c_old_with		= 'With';
	const c_old_without		= 'Without ';	

	const c_link1 = 'Compacted with ';
	const c_link2 = 'Automatic Compacting of battles';
	const c_linkURL = 'http://userscripts.org/scripts/show/3482';

	var added_link		= new Array('',
		'[color=orangered][size=12]'+c_link1+'[url='+c_linkURL+']'+c_link2+'[/url][/size][/color]',
		'',
		'[b][color=orangered]'+c_link1+'[url='+c_linkURL+']'+c_link2+'[/url][/color][/b]',
		'[color=orangered][size=12]'+c_link1+'[url='+c_linkURL+']'+c_link2+'[/url][/size][/color]',
		'[color=orangered][size=12]'+c_link1+'[url='+c_linkURL+']'+c_link2+'[/url][/size][/color]',
		'[color=orangered][size=12]'+c_link1+'[url='+c_linkURL+']'+c_link2+'[/url][/size][/color]');

/* 
	====================
	END TRANSLATION ZONE
	====================
*/

//Default values
	var defCompactConf = [
		'coords', true,
		'forum_type', 0,
		'forum_color', 0,
		'skin_color', 1,
		'tecnology', true,
		'partials', true,
		'deuterium', true,
		'old_favour', false,
		'useMyTechs', false,
	].join(':x:');

	var defShiptsSpeed = ['10000', '7500', '12500', '10000', '15000', '10000', '2500', '2000', '100000000', '5000', '0', '5000', '100', '10000'].join(':');
	var defShiptsConsumption = ['20','50','20','75','300','500','1000','300','1','1000','0','1000','1', '250'].join(':');

//Shipts properties
	var shiptsConsumption = defShiptsConsumption.split(':');
	var shiptsSpeed = defShiptsSpeed.split(':');
	if (getCompactConf('useMyTechs')) {
		shiptsConsumption = GM_getValue('consumosBase_'+location.hostname, defShiptsConsumption).split(':');
		shiptsSpeed = GM_getValue('velocidadesBase_'+location.hostname, defShiptsSpeed).split(':');
	}

	//Shipts costs
	var shiptsMetalCost		= new Array('2000', '6000', '3000', '6000', '20000', '45000', '10000', '10000', '0', '50000', '0', '60000', '5000000', '30000');
	var shiptsCristalCost		= new Array('2000', '6000', '1000', '4000', '7000', '15000', '20000', '6000', '1000', '25000', '2000', '50000', '4000000', '40000');
	var shiptsDeuteriumCost		= new Array('0','0','0','0','2000','0','10000','2000','0','15000','500','15000','1000000','15000');
	
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

	//Report
	var original_body = "";

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

//Colors for forums, we must get and set the options from the Grease monkey (light, dark)
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
	var defenderWithRecicleColor = new Array('brown','coral');


	const c_line_URL = "http://www.science.siu.edu/images/line-hr-eyes.gif";
//Tags for html, forums and plain text and smf :) (html, phpbb, plain text, smf, ipb, vBulletin, punBB)
// SOLO HE COPIADO LOS TAGS DE PHPBB PARA IPB VBULLETIN Y PUNBB, HAY QUE COMPROBARLOS
	var boldInit 		= new Array('<b>','[b]','','[b]','[b]','[b]','[b]');
	var boldEnd		= new Array('</b>','[/b]','','[/b]','[/b]','[/b]','[/b]');
	var itallyInit		= new Array('<i>','[i]','','[i]','[i]','[i]','[i]');
	var itallyEnd		= new Array('</i>','[/i]','','[/i]','[/i]','[/i]','[/i]');
	var crlf		= new Array('<br>','\n','\n','\n','\n','\n','\n');	
	var sizeInit		= new Array('<font size="#replace">','[size=#replace]','','[size=#replace]','[size=#replace]','[size=#replace]','[size=#replace]');
	var sizeEnd		= new Array('</font>', '[/size]','', '[/size]', '[/size]', '[/size]', '[/size]');
	var colorInit		= new Array('<font color="#replace">','[color=#replace]','','[color=#replace]','[color=#replace]','[color=#replace]','[color=#replace]');
	var colorEnd		= new Array('</font>','[/color]','','[/color]','[/color]','[/color]','[/color]');
	var hr			= new Array('<img src="'+c_line_URL+'" />','[img]'+c_line_URL+'[/img]','','[img]'+c_line_URL+'[/img]','[img]'+c_line_URL+'[/img]','[img]'+c_line_URL+'[/img]','[img]'+c_line_URL+'[/img]');
	var round_size		= new Array('3px','18','','14pt','18','18','18');	
	var nick_size		= new Array('4px','19','','15pt','19','19','19');
	var section_size	= new Array('4px','17','','13pt','17','17','17');
	var resource_size	= new Array('4px','21','','17pt','21','21','21');
	var rentability_size	= new Array('4px','17','','13pt','17','17','17');

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

function get_date () {
	//var header = document.getElementsByTagName('td')[0].firstChild.nodeValue;
	var dateArr = new Array();
	dateArr = document.body.innerHTML.match(/(\d\d)-(\d\d) (\d\d:\d\d:\d\d)/);
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
		if ( strLine.search(c_singleAtacker ) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) == -1) {
			//Get only the atacker first aparition
			atackerName[atackerCount] = get_from_to(strLine,c_singleAtacker ,br);
			atackerInitialShipsType[atackerCount]=get_flote_type_from_string(strLine);
			atackerInitialShipsNumber[atackerCount]=get_flote_number_from_string(strLine);
			atackerTecnology[atackerCount] = get_from_to(strLine,br,endtecnologytag);
			atackerCoords[atackerCount] = get_from_to(strLine,'(',')');
			atackerCount++; 
		}
		else if (strLine.search(c_singleDefender ) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) == -1) {
			//Get only the defender first aparition
			defenderName[defenderCount] = get_from_to(strLine,c_singleDefender,br);
			defenderInitialShipsType[defenderCount]=get_flote_type_from_string (strLine);
			defenderInitialShipsNumber[defenderCount]=get_flote_number_from_string (strLine);
			defenderTecnology[defenderCount] = get_from_to(strLine,br,endtecnologytag);
			defenderCoords[defenderCount] = get_from_to(strLine,'(',')');
			defenderCount++;
		}
		else if (strLine.search(c_singleDefender) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) != -1 && defenderCount == 0) {
			//Get the defender when s/he didn't have float and defenses
			defenderName[defenderCount] = get_from_to(strLine,c_singleDefender,br);
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
		floteNumberArray[i-array_controller] = storeArray[i].replace('</th>','').replace('</tr><tr>','').replace(/\./g, '');
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
				result_info = result_info.replace(' ','') ;
			} 
		}
		if ((strLine.search(resulttag) != -1) && (strLine.search(atacker_result_tag))) {
			//Search for stolenResources when atacker win
			stolenMetal = get_from_to(strLine,stolentag,metaltag).replace(/\./g,'');
			stolenCristal = get_from_to(strLine,metaltag,cristaltag).replace(/\./g,'');
			stolenDeuterium = get_from_to(strLine,cristaltag,deuteriumtag).replace(/\./g,'');
		}
		if (strLine.search(rubbletag) != -1)  {
			//Search for rubble
			rubbleMetal = get_from_to(strLine,rubbletag,metalrubbletag).replace(/\./g,'');
			rubbleCristal = get_from_to(strLine,metalrubbletag,cristalrubbletag).replace(/\./g,'');
		}
		if (strLine.search(moon_tag) != -1) {
			moon_probability = parseInt(get_from_to(strLine,moon_tag,'%'), 10);
			strLine = strLine+ '<br>';
			moon_and_defenses_info = strLine.substring(strLine.indexOf(cristalrubbletag) + (cristalrubbletag.length +1),strLine.lastIndexOf(br)).replace('<b>','').replace('</b>','');
		}
		if (strLine.search(moon_created_tag) != -1) {
			moon_info = moon_created_tag;
		}
		//Get atacker looses value
		atackerLoosesAmount =  parseInt(get_from_to(strLine,atackerloosestag,unitstag).replace(/\./g,''), 10);
		//Get defender looses value
		defenderLoosesAmount = parseInt(strLine.substring(strLine.indexOf(defenderloosestag) + (defenderloosestag.length +1),strLine.lastIndexOf(unitstag)-1).replace(/\./g,''), 10);
					
	}
}


///////////////////////////////////////////////
// Get the rentabilitys from the report data //
///////////////////////////////////////////////

function get_rentabilitys () {
	var rubbleAmount = parseInt(rubbleCristal, 10) + parseInt(rubbleMetal, 10);
	if (isNaN(stolenMetal)) {
		stolenMetal = 0;
	}
	if (isNaN(stolenCristal)) {
		stolenCristal = 0;
	}
	if (isNaN(stolenDeuterium)) {
		stolenDeuterium = 0;
	}
	var stolenAmount = parseInt(stolenMetal, 10) + parseInt(stolenCristal, 10) + parseInt(stolenDeuterium, 10);
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
		atackerRentability = Math.round(parseInt(atackerRentability, 10)) + '%';	
		atackerRentability2 = (((stolenAmount- atackerLoosesAmount) / atackerLoosesAmount)*100);
		atackerRentability2 = Math.round(parseInt(atackerRentability2, 10)) + '%';	
	}
	if (defenderLoosesAmount == 0 && stolenAmount == 0) {
		defenderRentability = max_rentability;
	}
	else {
		defenderRentability = ((rubbleAmount - (defenderLoosesAmount + stolenAmount)) / (defenderLoosesAmount + stolenAmount))*100;
		defenderRentability = Math.round(parseInt(defenderRentability, 10)) + '%';		
	}
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
			initialNumber = puntuar(fleetInitialNumber[position]);
			lostNumber   = puntuar((fleetInitialNumber[position]-fleetFinalNumber[position]));
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
		nameCreated = nameCreated + playerName.split('(')[0] + sizeEnd[type] + colorEnd[type] + crlf[type];	
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
				metalLoosesPlayer = parseInt(metalLoosesPlayer, 10) + parseInt(defensesMetalCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]), 10);
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
	totalLoose = puntuar(metalLoosesPlayer + cristalLoosesPlayer + deuteriumLoosesPlayer);
	estimateReport =  c_looses + boldInit[type] + colorInit[type].replace('#replace', totalLoosesColor) + totalLoose + colorEnd[type] + boldEnd[type] + c_units + crlf[type];
	estimateReport = estimateReport + itallyInit[type] +'(';
	estimateReport = estimateReport + colorInit[type].replace('#replace', partialLoosesColor) + puntuar(metalLoosesPlayer) + colorEnd[type] + c_metalInfo;
	estimateReport = estimateReport + colorInit[type].replace('#replace', partialLoosesColor) + puntuar(cristalLoosesPlayer) + colorEnd[type] + c_cristalInfo;
	estimateReport = estimateReport + colorInit[type].replace('#replace', partialLoosesColor) + puntuar(deuteriumLoosesPlayer) + colorEnd[type] + c_deuteriumInfo;
	estimateReport = estimateReport + ')' + itallyEnd[type] + crlf[type];
	if (isAtacker) {
		metalAtackersLooses += parseInt(metalLoosesPlayer, 10);
		cristalAtackersLooses += parseInt(cristalLoosesPlayer, 10);
	 	deuteriumAtackersLooses += parseInt(deuteriumLoosesPlayer, 10);
	} else {
		metalDefendersLooses += parseInt(metalLoosesPlayer, 10);
		cristalDefendersLooses += parseInt(cristalLoosesPlayer, 10);
	 	deuteriumDefendersLooses += parseInt(deuteriumLoosesPlayer, 10);
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
			if ( parseInt(shiptsSpeed[searchPos], 10) < parseInt(minSpeed, 10) ) {
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
	consumption = puntuar(Math.round(consumption) + 1);
	return boldInit[type] + c_consumption +  colorInit[type].replace('#replace', color) + consumption + colorEnd[type] + boldEnd[type] + c_units + crlf[type];
}

function resultAndStolen (type, stolenColor) {
	resultAndStolenReport = boldInit[type] + result_info + boldEnd[type] + crlf[type];
	if ((!isNaN(stolenMetal) || !isNaN(stolenCristal) || !isNaN(stolenDeuterium)) && (stolenMetal != 0 || stolenCristal != 0 || stolenDeuterium != 0) ) {
		resultAndStolenReport = resultAndStolenReport + c_stolen + colorInit[type].replace('#replace', stolenColor);
		resultAndStolenReport = resultAndStolenReport + boldInit[type] + puntuar(stolenMetal) + boldEnd[type] + colorEnd[type];
		resultAndStolenReport = resultAndStolenReport + c_metalInfo + colorInit[type].replace('#replace', stolenColor);
		resultAndStolenReport = resultAndStolenReport + boldInit[type] + puntuar(stolenCristal) + boldEnd[type] + colorEnd[type];
		resultAndStolenReport = resultAndStolenReport + c_cristalInfo + colorInit[type].replace('#replace', stolenColor);
		resultAndStolenReport = resultAndStolenReport + boldInit[type] + puntuar(stolenDeuterium) + boldEnd[type] + colorEnd[type];
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

function do_old_report (type, color_set, view_tecnology, view_coords, view_partials, view_deuterium) {
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
	resultReport = resultReport + (atackerCount>1?' (' + atackerCount +')':'') + sizeEnd[type] + boldEnd[type] + crlf[type];
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
	resultReport = resultReport + (defenderCount>1?' (' + defenderCount +')':'') + sizeEnd[type] + boldEnd[type] + crlf[type];
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
	//Looses
	if (atackerCount > 1) {
		resultReport = resultReport + c_old_plooses + c_multipleAtacker;
	} 
	else {
		resultReport = resultReport + c_old_slooses + c_singleAtacker;
	}
	resultReport = resultReport + ': ' + sizeInit[type].replace('#replace', resource_size[type]) + colorInit[type].replace('#replace', totalAtackerLoosesColor[color_set])  + puntuar(atackerLoosesAmount) + colorEnd[type] + sizeEnd[type] + c_units + crlf[type];
	if (defenderCount > 1) {
		resultReport = resultReport + c_old_plooses + c_multipleDefender;
	} 
	else {
		resultReport = resultReport + c_old_slooses + c_singleDefender;
	}
	resultReport = resultReport + ': ' + sizeInit[type].replace('#replace', resource_size[type]) + colorInit[type].replace('#replace', totalDefenderLoosesColor[color_set])  + puntuar(defenderLoosesAmount) + colorEnd[type] + sizeEnd[type] + c_units + crlf[type];
	//total looses
	resultReport = resultReport + c_totalLooses + boldInit[type] + sizeInit[type].replace('#replace',rentability_size[type]);
	resultReport = resultReport + puntuar(atackerLoosesAmount + defenderLoosesAmount);
	resultReport = resultReport + sizeEnd[type] + boldEnd[type] + c_units + crlf[type] + crlf[type];
	//Rubles recicles
	if ((parseInt(rubbleCristal, 10)+parseInt(rubbleMetal, 10)) == 0) {
		resultReport = resultReport + boldInit[type] + c_rubbles + boldEnd[type] + crlf[type];
	}
	else {
		resultReport = resultReport + boldInit[type] + c_rubbles + boldEnd[type] + ' (';
		resultReport = resultReport + puntuar(Math.floor((20000+parseInt(rubbleMetal, 10)+parseInt(rubbleCristal, 10))/20000));
		resultReport = resultReport + ' ' + serverShiptsNames[7] + ')' + crlf[type];
		
	}
	
	//rubbles partials
	resultReport = resultReport + c_metalRubble +  colorInit[type].replace('#replace', infoColor[color_set])  + boldInit[type];
	resultReport = resultReport + puntuar(rubbleMetal) + boldEnd[type] + colorEnd[type] + c_units + crlf[type];
	resultReport = resultReport + c_cristalRubble + colorInit[type].replace('#replace', infoColor[color_set]) + boldInit[type];
	resultReport = resultReport + puntuar(rubbleCristal) + boldEnd[type] + colorEnd[type] + c_units + crlf[type];

	//Win and looses
	resultReport = resultReport + crlf[type] + boldInit[type] + c_winAndLost + boldEnd[type] + crlf[type];
	if (atackerCount == 1) {
		resultReport = resultReport + c_old_rentabilitysAtacker;
	}
	else {
		resultReport = resultReport + c_old_rentabilitypAtacker;
	}
	resultReport = resultReport + sizeInit[type].replace('#replace', rentability_size[type]) + boldInit[type] + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]) + atackerRentability + colorEnd[type] + boldEnd[type] + sizeEnd[type] + crlf[type];
	rentability = puntuar((parseInt(rubbleMetal, 10)+parseInt(rubbleCristal, 10)+parseInt(stolenMetal, 10)+parseInt(stolenCristal, 10)+parseInt(stolenDeuterium, 10))-atackerLoosesAmount);
	resultReport = resultReport + c_old_atacker + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]) + ' ' + c_old_with + colorEnd[type] + '/' + colorInit[type].replace('#replace', totalAtackerLoosesColor[color_set]) + c_old_without + colorEnd[type] + ' Reciclaje: '  + sizeInit[type].replace('#replace', rentability_size[type]) + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]) + rentability + colorEnd[type] + '/';
	rentability = puntuar((parseInt(stolenMetal, 10)+parseInt(stolenCristal, 10)+parseInt(stolenDeuterium, 10))-atackerLoosesAmount);
 	resultReport = resultReport + colorInit[type].replace('#replace', totalAtackerLoosesColor[color_set]) + rentability + colorEnd[type] + sizeEnd[type] + c_units + crlf[type];

	if (defenderCount > 1) {
		resultReport = resultReport + c_old_rentabilitypDefender;
	} 
	else {
		resultReport = resultReport + c_old_rentabilitysDefender;
	}
	rentability = puntuar((parseInt(rubbleMetal, 10) + parseInt(rubbleCristal, 10) - stolenMetal - stolenCristal - stolenDeuterium)-parseInt(defenderLoosesAmount, 10));
	resultReport = resultReport + sizeInit[type].replace('#replace', rentability_size[type]) + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]) + rentability;
	resultReport = resultReport + colorEnd[type] + sizeEnd[type] + c_units + crlf[type];

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

function do_report(type, color_set, view_tecnology, view_coords, view_partials, view_deuterium) {
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
	resultReport = resultReport + (atackerCount>1?' (' + atackerCount +')':'') + sizeEnd[type] + boldEnd[type] + crlf[type];
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
	resultReport = resultReport + (defenderCount>1?' (' + defenderCount +')':'') + sizeEnd[type] + boldEnd[type] + crlf[type];
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
	resultReport = resultReport + colorInit[type].replace('#replace', totalAtackerLoosesColor[color_set])  + puntuar(atackerLoosesAmount) + colorEnd[type];
	resultReport = resultReport + sizeEnd[type] + c_units;
	resultReport = resultReport + crlf[type]; 

	//Atackers rentability with recicle
	resultReport = resultReport + boldInit[type] + c_recicleRentability +  ' ' +  sizeInit[type].replace('#replace',rentability_size[type]);
	rentability = puntuar((parseInt(rubbleMetal, 10)+parseInt(rubbleCristal, 10)+parseInt(stolenMetal, 10)+parseInt(stolenCristal, 10)+parseInt(stolenDeuterium, 10))-atackerLoosesAmount);
	resultReport = resultReport + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]) + rentability + ' (' + atackerRentability  + ') ';
	
	resultReport = resultReport + colorEnd[type] + sizeEnd[type] + boldEnd[type] + c_units + crlf[type];
	if (view_partials) {
			//Metal
			positive = parseInt(stolenMetal, 10)+parseInt(rubbleMetal, 10);
			negative = parseInt(metalAtackersLooses, 10);
			resultReport = resultReport +  itallyInit[type] + c_metalRubble + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]);
			resultReport = resultReport + puntuar(positive-negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Cristal
			positive = parseInt(stolenCristal, 10)+parseInt(rubbleCristal, 10);
			negative = parseInt(cristalAtackersLooses, 10);
			resultReport = resultReport +  itallyInit[type] + c_cristalRubble + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]);
			resultReport = resultReport + puntuar(parseInt(positive, 10) - parseInt(negative, 10))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
	}
	//Atackers rentability without recicle
	resultReport = resultReport + boldInit[type] + c_notRecicleRentability +  ' ' +  sizeInit[type].replace('#replace',rentability_size[type]);
	rentability = puntuar((parseInt(stolenMetal, 10)+parseInt(stolenCristal, 10)+parseInt(stolenDeuterium, 10))-atackerLoosesAmount);
	resultReport = resultReport + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]) + rentability + ' (' + atackerRentability2  + ') ';
	resultReport = resultReport + colorEnd[type] + sizeEnd[type] + boldEnd[type] + c_units + crlf[type];
	if (view_partials) {
			//Metal
			positive = parseInt(stolenMetal, 10);
			negative = parseInt(metalAtackersLooses, 10);
			resultReport = resultReport +  itallyInit[type] + c_metalRubble + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]);
			resultReport = resultReport + puntuar(positive-negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Cristal
			positive = parseInt(stolenCristal, 10);
			negative = parseInt(cristalAtackersLooses, 10);
			resultReport = resultReport +  itallyInit[type] + c_cristalRubble + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]);
			resultReport = resultReport + puntuar(parseInt(positive, 10) - parseInt(negative, 10))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Deuterium
			positive = parseInt(stolenDeuterium, 10);
			negative = parseInt(deuteriumAtackersLooses, 10);
			resultReport = resultReport +  itallyInit[type] + c_deuteriumRubble + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]);
			resultReport = resultReport + puntuar(parseInt(positive, 10) - parseInt(negative, 10))  + ' (' + partialRentability(positive,negative) + ') ';
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
	resultReport = resultReport + colorInit[type].replace('#replace', totalDefenderLoosesColor[color_set])  + puntuar(defenderLoosesAmount) + colorEnd[type];
	resultReport = resultReport + sizeEnd[type] + c_units;
	resultReport = resultReport + crlf[type]; 

	//Defenders rentability with recicle
	resultReport = resultReport + boldInit[type] + c_recicleRentability +  ' ' +  sizeInit[type].replace('#replace',rentability_size[type]);
	rentability = puntuar((parseInt(rubbleMetal, 10) + parseInt(rubbleCristal, 10) - stolenMetal - stolenCristal - stolenDeuterium)-parseInt(defenderLoosesAmount, 10));
	resultReport = resultReport + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]) + rentability + ' (' + defenderRentability  + ') ';
	resultReport = resultReport + colorEnd[type] + sizeEnd[type] + boldEnd[type] + c_units + crlf[type];
	if (view_partials) {
			//Metal
			positive = 0;
			negative = 0;
			positive = parseInt(rubbleMetal, 10);
			negative = parseInt(stolenMetal, 10)+parseInt(metalDefendersLooses, 10);
			resultReport = resultReport +  itallyInit[type] + c_metalRubble + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]);
			resultReport = resultReport + puntuar(positive-negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Cristal
			positive = 0;
			negative = 0;
			positive = parseInt(rubbleCristal, 10);
			negative = parseInt(stolenCristal, 10)+parseInt(cristalDefendersLooses, 10);
			resultReport = resultReport +  itallyInit[type] + c_cristalRubble + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]);
			resultReport = resultReport + puntuar(positive - negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Deuterium
			positive = 0;
			negative = 0;
			negative = parseInt(deuteriumDefendersLooses, 10)+parseInt(stolenDeuterium, 10);
			resultReport = resultReport +  itallyInit[type] + c_deuteriumRubble + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]);
			resultReport = resultReport + puntuar(parseInt(positive, 10) - parseInt(negative, 10))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
	}
	resultReport = resultReport + crlf[type]; 
	
	//Total Looses
	resultReport = resultReport + c_totalLooses + boldInit[type] + sizeInit[type].replace('#replace',rentability_size[type]);
	resultReport = resultReport + puntuar(atackerLoosesAmount + defenderLoosesAmount);
	resultReport = resultReport + sizeEnd[type] + boldEnd[type] + c_units + crlf[type] 
	resultReport = resultReport + crlf[type];
	
	//Rubles recicles
	if ((parseInt(rubbleCristal, 10)+parseInt(rubbleMetal, 10)) == 0) {
		resultReport = resultReport + boldInit[type] + c_rubbles + boldEnd[type] + crlf[type];
	}
	else {
		resultReport = resultReport + boldInit[type] + c_rubbles + boldEnd[type] + ' (';
		resultReport = resultReport + puntuar(Math.floor((20000 + parseInt(rubbleMetal, 10) + parseInt(rubbleCristal, 10))/20000));
		resultReport = resultReport + ' ' + serverShiptsNames[7] + ')' + crlf[type];	
	}
	
	//rubbles partials
	resultReport = resultReport + c_metalRubble +  colorInit[type].replace('#replace', infoColor[color_set])  + boldInit[type];
	resultReport = resultReport + puntuar(rubbleMetal) + boldEnd[type] + colorEnd[type] + c_units + crlf[type];
	resultReport = resultReport + c_cristalRubble + colorInit[type].replace('#replace', infoColor[color_set]) + boldInit[type];
	resultReport = resultReport + puntuar(rubbleCristal) + boldEnd[type] + colorEnd[type] + c_units + crlf[type];

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
	cristalDefendersLooses = 0;
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
	original_body = document.body.innerHTML;
	date = get_date();
	create_page();
	if (original_body.search('Recursos en') != -1) {
		create_options(false);
	}
	else {
		create_options(true);
		get_names_and_flotes();
		get_final_flotes ();
		get_rounds();
		get_battle_info_result();
		get_rentabilitys ();
	}
	create_view();
}

function create_page() {
	document.body.innerHTML = '';
	var tabla = document.createElement('table');
	tabla.width='100%';
	document.body.appendChild(tabla);
	
	var less = document.createElement('img');
	less.src = lessButton;
	less.title = 'Ocultar';
	less.style['cursor']='pointer';
	less.setAttribute('onclick', "this.style['display']='none'; this.nextSibling.style['display']=''; setHiddenCompact(this.parentNode.id+'_in')");
	
	var more = document.createElement('img');
	more.src = moreButton;
	more.title = 'Mostrar';
	more.style['cursor']='pointer';
	more.setAttribute('onclick', "this.style['display']='none'; this.previousSibling.style['display']=''; delHiddenCompact(this.parentNode.id+'_in')");
				
	var row1 = document.createElement('tr');
	row1.appendChild(document.createElement('td'));
	row1.firstChild.className = 'c';
	row1.firstChild.colSpan = 3;
	row1.firstChild.appendChild(less);
	row1.firstChild.appendChild(more);
	
	var row2 = document.createElement('tr');
	row2.appendChild(document.createElement('td'));
	row2.firstChild.style['border'] = '1px #415680 solid';
	row2.firstChild.style['fontSize'] = '11px';
	row2.firstChild.style['padding'] = '15px';
	 
	tabla.appendChild(row1.cloneNode(true));
	tabla.appendChild(row2.cloneNode(true));
	
	tabla.appendChild(row1.cloneNode(true));
	tabla.appendChild(row2.cloneNode(true));
	
	tabla.appendChild(row1.cloneNode(true));
	tabla.appendChild(row2.cloneNode(true));
	
	tabla.childNodes[0].firstChild.id = "original";
	tabla.childNodes[1].firstChild.id = "original_in";
	
	tabla.childNodes[2].firstChild.id = "compactado";
	tabla.childNodes[3].firstChild.id = "compactado_in";
	
	tabla.childNodes[4].firstChild.id = "opciones";
	tabla.childNodes[5].firstChild.id = "opciones_in";

	tabla.childNodes[0].firstChild.innerHTML +=" Original Report";
	tabla.childNodes[1].firstChild.innerHTML = original_body;
	if (getHiddenCompact('original_in')) {
		tabla.childNodes[0].firstChild.childNodes[0].style['display'] = 'none';
		tabla.childNodes[1].firstChild.style['display'] = 'none';
	}
	else {
		tabla.childNodes[0].firstChild.childNodes[1].style['display'] = 'none';
	}
	
	tabla.childNodes[2].firstChild.innerHTML +=" Converted report";
	if (getHiddenCompact('compactado_in')) {
		tabla.childNodes[2].firstChild.childNodes[0].style['display'] = 'none';
		tabla.childNodes[3].firstChild.style['display'] = 'none';
	}
	else {
		tabla.childNodes[2].firstChild.childNodes[1].style['display'] = 'none';
	}
	
	tabla.childNodes[4].firstChild.innerHTML +=" Options";
	if (getHiddenCompact('opciones_in')) {
		tabla.childNodes[4].firstChild.childNodes[0].style['display'] = 'none';
		tabla.childNodes[5].firstChild.style['display'] = 'none';
	}
	else {
		tabla.childNodes[4].firstChild.childNodes[1].style['display'] = 'none';
	}
}

function create_options(battleOrSpy) {
	var content = document.getElementById('opciones_in');

	// create a generic checbox to duplicate
	var checkbox = document.createElement("input");
	checkbox.type="checkbox";
	checkbox.setAttribute('onclick', "setCompactConf(this.name,this.checked);create_view();");

	// create a generic combobox to duplicate
	var combobox = document.createElement('select');
	combobox.setAttribute('onchange', "setCompactConf(this.name, this.selectedIndex); create_view()");

	// create a combobox for the forum type
	var forum_type_box = combobox.cloneNode(true);
	forum_type_box.name = 'forum_type';
	forum_type_box.innerHTML = "<option>html</option><option>phpBB</option><option>Plain text</option><option>smf</option><option>ipb</option><option>vbulletin</option><option>punBB</option>";
	forum_type_box.selectedIndex=getCompactConf('forum_type');
	// and its description
	var forum_type_span = document.createElement("span");
	forum_type_span.innerHTML = c_forum_type;
	// now place them
	content.appendChild(forum_type_span);
	content.appendChild(forum_type_box);

	// another combo for the background style
	var forum_color = combobox.cloneNode(true);
	forum_color.name = 'forum_color';
	forum_color.innerHTML = "<option>"+c_light+"</option><option>"+c_dark+"</option>";
	forum_color.selectedIndex=getCompactConf('forum_color');
	// and its description
	var forum_color_span = document.createElement("span");
	forum_color_span.innerHTML = c_forum_color;
	// now place them
	content.appendChild(forum_color_span);
	content.appendChild(forum_color);

	// create the text area for copy&paste the report to a forum
	var report_input = document.createElement("textarea");
	report_input.id = "forum_compactation";
	// now place it
	content.appendChild(report_input);

	//Show table for options
	var config_div = document.createElement("div");
	content.appendChild(config_div);
	
	if (battleOrSpy) {
		//Show old_flavor check
		var old_favour = checkbox.cloneNode(true);
		old_favour.name = 'old_favour';
		old_favour.checked = getCompactConf('old_favour');
		
		var old_favour_span = document.createElement("span");
		old_favour_span.innerHTML = c_old_favour;
		config_div.appendChild(old_favour);
		config_div.appendChild(old_favour_span);

		//Show partials check
		var view_partials = checkbox.cloneNode(true);
		view_partials.name = 'partials';
		view_partials.checked = getCompactConf('partials');
		var partials_span = document.createElement("span");
		partials_span.innerHTML = ' See partial<br>';
		config_div.appendChild(view_partials);
		config_div.appendChild(partials_span);

		//Show deuterium check
		var view_deuterium = checkbox.cloneNode(true);
		view_deuterium.name = 'deuterium';
		view_deuterium.checked = getCompactConf('deuterium');
		var deuterium_span = document.createElement("span");
		deuterium_span.innerHTML = c_showDeuterium;
		config_div.appendChild(view_deuterium);
		config_div.appendChild(deuterium_span);


		//Show tech check
		var view_tecnology = checkbox.cloneNode(true);
		view_tecnology.name = 'tecnology';
		view_tecnology.checked = getCompactConf('tecnology');
		var tecnology_span = document.createElement("span");
		tecnology_span.innerHTML = c_showTech;
		config_div.appendChild(view_tecnology);
		config_div.appendChild(tecnology_span);

		//Show coords check
		var view_coords = checkbox.cloneNode(true);
		view_coords.name = 'coords';
		view_coords.checked = getCompactConf('coords');
		var coords_span = document.createElement("span");
		coords_span.innerHTML = c_showCoords;
		config_div.appendChild(view_coords);
		config_div.appendChild(coords_span);
	}
	else {
//		config_div.innerHTML = 'Foro de destino: <select id="tipoforo"><option value="phpbb" id="phpbb">phpBB</option><option value="ipb" id="ipb">IPB</option><option value="vbulletin" id="vbulletin">vBulletin</option><option value="punbb" id="punbb">punBB</option><option value="noformat" id="noformat">Sin formato</option><option value="html" id="html">HTML</option></select> Skin del foro: <select id="colorforo"><option value="foroclaro" id="foroclaro">Claro</option><option value="forooscuro" id="forooscuro">Oscuro</option></select> Color del skin: <select id="colorskin"><option value="skinclaro" id="skinclaro">Claro</option><option value="skinoscuro" id="skinoscuro">Oscuro</option></select><input type="button" id="buttoncompacta" value="Compactar">';
	}
/*		//Show skin_color check
		var skin_color = checkbox.cloneNode(true);
		skin_color.name = 'skin_color';
		skin_color.checked = getCompactConf('skin_color');
		var skin_span = document.createElement("span");
		skin_span.innerHTML = c_ogameSkin;
		config_div.appendChild(skin_color);
		config_div.appendChild(skin_span);
*/	
	// create a combobox for the skin color
	var skin_color = combobox.cloneNode(true);
	skin_color.name = 'skin_color';
	skin_color.innerHTML = "<option>"+c_light+"</option><option>"+c_dark+"</option>";
	skin_color.selectedIndex=getCompactConf('skin_color');
	// and its description
	var skin_color_span = document.createElement("span");
	skin_color_span.innerHTML = c_ogameSkin;
	// now place them
	content.appendChild(skin_color_span);
	content.appendChild(skin_color);
}

function create_view() {
//fenster('bericht.php?session=6d77eed32b0d&bericht=49488038', 'Bericht'); Atake en uni27
	//Call functions to parse the battle report
	report = "";
	var report_text = "";
	var report_div = document.getElementById('compactado_in');
	var report_input = document.getElementById('forum_compactation');
	
	if (atackerName.length > 0) {
		try {
			if(getCompactConf('old_favour')) {
				report = do_old_report(getCompactConf('forum_type'),getCompactConf('forum_color'),getCompactConf('tecnology'),getCompactConf('coords'), getCompactConf('partials') , getCompactConf('deuterium'));
			}	
			else {
				report = do_report(getCompactConf('forum_type'),getCompactConf('forum_color'),getCompactConf('tecnology'),getCompactConf('coords'), getCompactConf('partials') , getCompactConf('deuterium'));
			}
		}
		catch (error) {
			if (debugMode) alert(error);
			report = do_report(1,1,false,false,false, false);
		}
		report_input.color = 'white';
		report_input.innerHTML = report;
		// first type, second color
		try {
			if(getCompactConf('old_favour')) {
				report = do_old_report(0,getCompactConf('skin_color'),true,true, getCompactConf('partials'), getCompactConf('deuterium'));
			}	
			else {
				report = do_report(0,getCompactConf('skin_color'),true,true, getCompactConf('partials'), getCompactConf('deuterium'));
			}
		}
		catch (error) {
			if (debugMode) alert(error);
			report = do_report(0,1,true,true, true, true);
		}

		report_div.color = 'white';
		report_div.innerHTML = report;
	}
	else {
		compact_spy();
	}
}
unsafeWindow.create_view = create_view;

/*********************************************************/
/*********+-------------------------------+***************/
/*********|    Functions for spy          |***************/
/*********+-------------------------------+***************/
/*********************************************************/

function xreplace(checkMe,toberep,repwith) {
	return checkMe.replace(new RegExp(toberep.replace(/([\.\[\]\(\)\{\}\$])/g,'\\$1'), 'g'), repwith);
}

function compact_spy() {
	var contenido = '';
	var separador = ' | ';

	nuevodiv = document.getElementById('compactado_in');
	divbotones = document.getElementById('options_in');
	textareacompacta = document.getElementById('forum_compactation');
		
		tipoforoausar = getCompactConf('forum_type');
		colorforoausar = getCompactConf('forum_color');
		colorskinausar = getCompactConf('skin_color');

		contenidoweb = document.getElementById('original_in').getElementsByTagName('table');
		recursos = contenidoweb[1].getElementsByTagName('td');

		if (recursos) {
			// RECURSOS
			contenido += '[neg]' + recursos[0].innerHTML + '[/neg][br]Metal: [recstyle]' + recursos[2].innerHTML + '[spanend]' + separador + 'Cristal: [recstyle]' + recursos[4].innerHTML + '[spanend]' + separador + 'Deuterio: [recstyle]' + recursos[6].innerHTML + '[spanend]' + separador + 'Energia: [recstyle]' + recursos[8].innerHTML + '[spanend]';

			// LO PONGO AQUI PORQUE SI HAY INFORME, REPRESENTA Q SIEMPRE SALEN LOS RECURSOS...
			// FLOTA
			if (contenidoweb[2]) {
				flota = contenidoweb[2].getElementsByTagName('td')
				if (flota.length > '1') {
					vecesbucle = (flota.length - 1) / 2;
					contenido += '[br][neg]Frotas[/neg][br]';
					for (i = 0; i < vecesbucle; i++) {
						if (i != 0) {
							separa = separador;
						}
						else {
							separa = '';
						}
						posiciontdcosa = 1 + i * 2;
						posiciontdnum = 2 + i * 2;
						contenido += separa + flota[posiciontdcosa].innerHTML + ' [flotastyle]' + flota[posiciontdnum].innerHTML + '[spanend]';
					}
				}
				else {
					contenido += '[br][neg]Frotas[/neg][br](Sem Frotas)';
				}
			}
			
			// DEFENSA
			if (contenidoweb[3]) {
				defensa = contenidoweb[3].getElementsByTagName('td');
				if (defensa.length > '1') {
					vecesbucle = (defensa.length - 1) / 2;
					contenido += '[br][neg]Defesas[/neg][br]';
					for (i = 0; i < vecesbucle; i++) {
						if (i != 0) {
							separa = separador;
						}
						else {
							separa = '';
						}
						posiciontdcosa = 1 + i * 2;
						posiciontdnum = 2 + i * 2;
						contenido += separa + defensa[posiciontdcosa].innerHTML + ' [flotastyle]' + defensa[posiciontdnum].innerHTML + '[spanend]';
					}
				}
				else {
					contenido += '[br][neg]Defesas[/neg][br](Sem Defesas)';
				}

				// EDIFICIOS
				if (contenidoweb[4]) {
					edificios = contenidoweb[4].getElementsByTagName('td');
					if (edificios.length > '1') {
						vecesbucle = (edificios.length - 1) / 2;
						contenido += '[br][neg]Edificios[/neg][br]';
						for (i = 0; i < vecesbucle; i++) {
							if (i != 0) {
								separa = separador;
							}
							else {
								separa = '';
							}
							posiciontdcosa = 1 + i * 2;
							posiciontdnum = 2 + i * 2;
							contenido += separa + edificios[posiciontdcosa].innerHTML + ' [edificiostyle]' + edificios[posiciontdnum].innerHTML + '[spanend]';
						}
					}
				}

				// INVESTIGACION
				if (contenidoweb[5]) {
					investigacion = contenidoweb[5].getElementsByTagName('td');
					if (investigacion.length > '1') {
						vecesbucle = (investigacion.length - 1) / 2;
						contenido += '[br][neg]Pesquisas[/neg][br]';
						for (i = 0; i < vecesbucle; i++) {
							if (i != 0) {
								separa = separador;
							}
							else {
								separa = '';
							}
							posiciontdcosa = 1 + i * 2;
							posiciontdnum = 2 + i * 2;
							contenido += separa + investigacion[posiciontdcosa].innerHTML + ' [edificiostyle]' + investigacion[posiciontdnum].innerHTML + '[spanend]';
						}
					}
				}
			}
		}

		if (colorforoausar == '0') {
			recursoscolorforo = '#A144A1';
		}
		else {
			recursoscolorforo = '#FE875B';
		}
		if (colorskinausar == '0') {
			recursoscolorhtml = '#A144A1';
		}
		else {
			recursoscolorhtml = '#FE875B';
		}
		var formathtml = Array(
			Array('[neg]', '<span style="font-weight: bold;">'),
			Array('[/neg]', '</span>'),
			Array('[recstyle]', '<span style="font-weight: bold; font-size: 17px; color: ' + recursoscolorhtml + '">'),
			Array('[flotastyle]', '<span style="font-weight: bold; font-size: 17px; color: red;">'),
			Array('[edificiostyle]', '<span style="font-weight: bold; font-size: 17px; color: blue;">'),
			Array('[spanend]', '</span>'),
			Array('[br]', '<br />'),
			Array('[copyright]', '<br /><br />Compactado con el <a href="http://userscripts.org/scripts/show/5118">Compactador autom&aacute;tico de espionajes</a>')		
		);
		if (tipoforoausar == "0") { // html
			var format = Array(
				Array('[neg]', '<span style="font-weight: bold;">'),
				Array('[/neg]', '</span>'),
				Array('[recstyle]', '<span style="font-weight: bold; font-size: 17px; color: ' + recursoscolorforo + '">'),
				Array('[flotastyle]', '<span style="font-weight: bold; font-size: 17px; color: red;">'),
				Array('[edificiostyle]', '<span style="font-weight: bold; font-size: 17px; color: blue;">'),
				Array('[spanend]', '</span>'),
				Array('[br]', '<br />'),
				Array('[copyright]', '<br /><br />Compactado con el <a href="http://userscripts.org/scripts/show/5118">Compactador autom&aacute;tico de espionajes</a>')
			);
		}
		else if (tipoforoausar == "1" || tipoforoausar == "4" || tipoforoausar == "3") { // phpBB | ipb | smf
			var format = Array(
				Array('[neg]', '[b]'),
				Array('[/neg]', '[/b]'),
				Array('[recstyle]', '[b][size=17][color=' + recursoscolorforo + ']'),
				Array('[flotastyle]', '[b][size=17][color=red]'),
				Array('[edificiostyle]', '[b][size=17][color=blue]'),
				Array('[spanend]', '[/color][/size][/b]'),
				Array('[br]', '\n'),
				Array('[copyright]', '\n\nCompactado con el [url=http://userscripts.org/scripts/show/5118]Compactador autom&aacute;tico de espionajes[/url]')		
			);
		}
		else if (tipoforoausar == '5') { // vbulletin
			var format = Array(
				Array('[neg]', '[b]'),
				Array('[/neg]', '[/b]'),
				Array('[recstyle]', '[b][size=4][color=' + recursoscolorforo + ']'),
				Array('[flotastyle]', '[b][size=4][color=red]'),
				Array('[edificiostyle]', '[b][size=4][color=blue]'),
				Array('[spanend]', '[/color][/size][/b]'),
				Array('[br]', '\n'),
				Array('[copyright]', '\n\nCompactado con el [url=http://userscripts.org/scripts/show/5118]Compactador autom&aacute;tico de espionajes[/url]')
			);
		}
		else if (tipoforoausar == '6') { // punbb
			var format = Array(
				Array('[neg]', '[b]'),
				Array('[/neg]', '[/b]'),
				Array('[recstyle]', '[b][color=' + recursoscolorforo + ']'),
				Array('[flotastyle]', '[b][color=red]'),
				Array('[edificiostyle]', '[b][color=blue]'),
				Array('[spanend]', '[/color][/b]'),
				Array('[br]', '\n'),
				Array('[copyright]', '\n\nCompactado con el [url=http://userscripts.org/scripts/show/5118]Compactador autom&aacute;tico de espionajes[/url]')
			);
		}
		else if (tipoforoausar == '2') { // plain text
			var format = Array(
				Array('[neg]', '-'),
				Array('[/neg]', '-'),
				Array('[recstyle]', '('),
				Array('[flotastyle]', '('),
				Array('[edificiostyle]', '('),
				Array('[spanend]', ')'),
				Array('[br]', '\n'),
				Array('[copyright]', '\n\nCompactado con el compactador autom&aacute;tico de espionajes (url=http://userscripts.org/scripts/show/5118)')	
			);
		}
		//contenido += '[copyright]';
		contenidotextarea = contenido;
		for (i = 0; i < formathtml.length; i++) {
			contenido = xreplace(contenido, formathtml[i][0], formathtml[i][1]);
			contenidotextarea = xreplace(contenidotextarea, format[i][0], format[i][1]);
		}
		nuevodiv.innerHTML = contenido;
		textareacompacta.value = contenidotextarea;
}

////////////////
// BEGIN HERE //
////////////////

get_parts_from_web ();
document.getElementById("forum_compactation").select();
}

/*
 *  This file is part of OGame#, based on OGame++ version 0.9.97 by Unbrained
 *  Copyright (C) 2007 SpitFire (spitfirevampir@gmail.com)
 *  Source code http://userscripts.org/scripts/show/8555
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
// @name			OGame Plus [PT]
// @author			SpitFire
// @translation		Mena [Portuguese]
// @description			Terás sonhado com um Ogame melhor? [PT]
// @include			http://*ogame*
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
 ** Corrige los links de coordenadas en los mensajes y en la Visión General, y los colorea
 ** Se añade un enlace a Drago-Sim y otro a o-calc en el menú lateral
 ** Añade información sobre la carga de las naves al escoger la flota
 *		(adaptación del script http://userscripts.org/scripts/show/6189)  
 ** Se añade un botón con una D al lado de los informes de espionaje hechos que
 * 		envia los datos del informe a Drago-Sim para hacer analisis de ataques
 ** Se incorpora un compactador de batallas
 * 	(adaptacion del script http://userscripts.org/scripts/show/3482)
 ** Se incorpora un script de información extendida para los recursos
 * 	(modificación del script http://userscripts.org/scripts/show/6483/)
 ** menú lateral plegable
 ** Se añade funcionalidad para GalaxieTool, se permiten múltiples cuentas
 * 		independientes para cada universo.
 ** Resaltado de campos de escombros. Esta idea la cogí del Foxgame y la he mejorado un poco:
 *		Escoges un color para resaltar, un máximo de escombros resaltables y un mínimo. El máximo
 *		indica a partir de qué cantidad quieres que se resalte. Dependiendo de la cantidad de
 *		escombros que haya se colorea desde el blanco hasta el color indicado. El color indicado se
 *		alcanza cuando la cantidad de escombros supera el máximo especificado  
 ** Función de colorear etiquetas de alianzas. Se puede asociar un grupo de alianzas
 * 		con un color y una etiqueta (opcional). La alianza se mostrará del color especificado
 * 		en la visión de Galaxia y en las Estadísticas con la etiqueta, si existe, a
 * 		continuación. Es muy til para reconocer alianzas amigas/enemigas o pactos con otras alianzas
 * 		NOTA IMPORTANTE: DESACTIVAR ESTA FUNCION SI SE ACCEDE A CUENTAS DE GALAXIETOOL O SIMILARES
 * 		POR UN MEDIO QUE NO SEA ESTE SCRIPT, YA QUE LOS INFORMES APARECERIAN DEFECTUOSOS
 * 		(idea sacada del script http://userscripts.org/scripts/show/4030)
 ** Se añade una tabla de alianza en el menú lateral. Para recoger los datos de la alianza
 *		es necesario abrir la pagina de Alianzas.
 *		(escrito a partir del script http://userscripts.org/scripts/show/3947)
 ** Se pueden guardar coordenadas que aparecerán como destinos extra en la pantalla de escoger
 *		destino al enviar la flota
 *		(escrito a partir del script http://mapaogame.net/farmlist/)
 ** Se actualiza automáticamente
 */

/** NUEVAS OPCIONES EN LA VERSION DE SPITFIRE
 ** Borra los iconitos tan chulos de los oficiales
 ** Quita el letrero de los oficiales del menú lateral
 ** Se puede mandar construir más de 999 unidades en hangar y defensa, se muestra el máximo de unidades que se pueden
 *			construir con los recursos actuales (este máximo se actualiza cuando vamos añadiendo naves), y se muestran
 *			también los recursos que quedarían después de aceptar la construcción
 ** Se añade un simulador de batallas además de Drago-Sim: CSim
 ** Opción para reducir las imágenes de edificios/investigaciones/naves/defensas
 ** Opción para ocultar/mostrar unidades en naves/defensas
 * 	 (idea sacada del script http://userscripts.org/scripts/show/7594)
 ** Con el "modo transporte" podrás enviar los recursos de tus planetas a donde t quieras
 * 		sin ningn tipo de esfuerzo (solo dandole al enter y cambiando de planeta de origen)
 ** Se activa en la galaxia la opcion de espiar lunas y recolectar escombros
 ** Podrás ver si hay mensajes nuevos (aparecen parpadeando en el men, al lado de la opción
 * 		Mensajes). Se actualizan en un intervalo de tiempo determinado especificado, con cierta aleatoriedad
 * 		para no levantar sospechas. Es importante no poner un intervalo de tiempo mucho más pequeño que el
 * 		que hay por defecto.
 ** En Edificios e Investigaciones, si no llegan los recursos, aparecen en rojo, como en el modo
 * 		comandante. Si pasas por encima te sale un titulo con la cantidad que te falta y si pinchas
 * 		se añade esa cantidad a una tabla que aparece en el menú lateral. En esta tabla se guardan los
 * 		recursos en los que pinchaste y las coordenadas del planeta. Mediante esta tabla, podemos ir a otro/s
 * 		planeta/s para llevar los recursos que nos faltaban para poder hacer la construcción. Si no llegan
 * 		los recursos, se van restando los que envías, de modo que puedes mandar desde muchos planetas sin tener
 * 		que hacer círculos. (la tabla la podemos borrar en cualquier momento pinchando en la imagen que tiene encima)
 ** Opción de bloquear aquellas tecnologías que alcanzaron su máximo nivel práctico
 *  		inspirado en funciones de ogamePro
 ** Se cambia el aspecto de la página de salto cuántico
 *  		parte del codigo sacado de http://userscripts.org/scripts/show/7928
 ** Se colorean las coordenadas del planeta actual en la lista de viajes de la pantalla de flotas
 */


/*********************************************************/
/*********+-------------------------------+***************/
/*********|      TODO List                |***************/
/*********+-------------------------------+***************/
/*********************************************************/
/*
 * Colorear misiones a o desde el planeta actual en la vision de flotas
 * Reestructurar menu lateral (menudo caos!)
 * Modificar las tablas de configuración de colores y automarcado
 * Error del linker en vision general (la hora del foxgame aparece en la siguiente linea)
 * 		Curiosamente se resuelve al activar la hora en formato completo
 * Colorear fondo de los mensajes
 * Calculo de naves en los espionajes
 * Separador de miles en retornos de saqueos
 * Mostrar total del saqueo, y el equivalente en metal por regla 3x2x1 (Unidades Comerciales)
 * Comentar más el código... algún día :-)
 * Opción de pasar las cantidades en notación científica a notación normal
 * Añadir posibilidad de medir la rentabilidad del ataque en Unidades comerciales 
 * Añadir ogame tools (calculo de misiles con raksim...) al menu lateral (o incluso enlace
 * 		en informes tipo DS) y eliminar el enlace o-calc (si se consiguen sustituir todas sus funciones)
 * Mejorar GalaxieTool (comprobar que esta activado para nuestro universo o algo asi y mejorar la
 * 		vision de las lucecitas, mejorar el control de distintas cuentas)
 * Crear una paleta de colores para escoger colores (en una funcion) (de momento en la pagina de
 * 		configuración hay un enlace a una página que permite elegir colores y te dice el codigo html)
 * Ver la posibilidad de guardar y cargar la configuración en un archivo de texto
 * 		Una posibilidad es mostar las variables para copiarlas al guardar y para cargar que salga un input 
 * Añadir etiquetas para nicks
 * Color del linkeador dependiente de la distancia con tu principal!! (en proceso)
 * 		Y dependiente del planeta actual?
 */


/********************************************************/
/*********+-------------------------------+**************/
/*********|         Script values         |**************/
/*********+-------------------------------+**************/
/********************************************************/

const scriptSource = 'http://userscripts.org/scripts/source/8555.user.js';
const scriptPage = 'http://userscripts.org/scripts/show/8555';
const scriptAuthor = 'SpitFire';
const scriptName = 'OGame Plus';
const scriptVersion = '0.1.96';
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
			'colorBuddylist', '#66dddd',
		'autoMark', true,
			'AMTrans', true,
			'AMTransR', true,
			'AMDesp', true,
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
			'AMBuddylist', false,
		'dragoSim', true,
		'dragoSimM', false,
		'CSim', true,
		'CSimM', false,
		'ocalc', false,
		'compactar', false,
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
			'coordLinkerCF', 'orangered',
			'coordLinkerCM', 'lime',
			'coordLinkerCVG', '#ebff8a',
			'coordLinkerCG', 'lime',
		'flottenInfo', true,
		'debris', true,
			'debrisMin', '20000',
			'debrisMax', '100000',
			'debrisColor', '#6b3715',
		'modifyDate', false,
		'improvedResources', true,
		'improvedCuantic', true,
		'specialEffects', true,
		'LMSearch', false,
		'autoUpdate', true,
		'preDest', true,
			'PDGColor', 'orange',
		'proInputs', true,
		'tinyIMG', false,
		'transportMode', false,
		'transportModeEnabled', false,
		'TMDestination', '0;0;0;1',
		'refMens', 0,
		'moonSpy', false,
		'delBanner', false,
		'delBanners', false,
		'delOfficerMenu', false,
		'delOfficer', false,
		'colorBuild', false,
		'SYConst', false,
		'SYReducible', true,
		'colapseFlights', true,
		'blockUselessTechs', true,
		'menuCuantic', true,
		'buildingList', false,
		'imperium', false || debugMode
	].join(':');
var defGTValues = '';
var defAllyTags = 'Prueba:y:#00aaff:y:Ally1|Ally2|Ally3';


/*********************************************************/
/*********+-------------------------------+***************/
/*********|     Translation section       |***************/
/*********+-------------------------------+***************/
/*********************************************************/

const ilegal = ' <font color=red title="Esta opção está proibida directa/indirectamente pelo regulamento do OGame">(ilegal)</font>';
const ilegalCom = ' <font color=red title="Esta opção é ilegal porque implementa funções de Modo Comandante">(ilegal)</font>';
const ilegalPub = ' <font color=red title="Esta opção é ilegal porque elimina publicidade">(ilegal)</font>';
const ilegalMenu = ' <font color=orangered title="Esta opção é ilegal porque modifica o menú lateral">(menú ilegal)</font>';
const ilegalDudosa = ' <font color=orangered title="Esta função é potencialmente ilegal">(quase-ilegal)</font>';
const semiLegal = ' <font color=orange title="Alguns dizem que esta função não é legal a 100%">(ilegal?)</font>';
const experimental = ' <font color=lightblue title="Função por completar">(experimental)</font>';
const notYet = ' <font color=pink title="Ainda não funciona">(por acabar)</font>';

const c_mainTable = 'Ajustes Gerais';
const c_colorMens = 'Colorir as mensagens (títulos e conteúdos)';
const c_colorTrans = 'Mensagens de chegada a um planeta';
const c_colorTransR = 'Mensagens de retorno de um planeta';
const c_colorDesp = 'Mensagens de implementações num planeta';
const c_colorAlianza = 'Mensagens da aliança';
const c_colorPriv = 'Mensagens privadas';
const c_colorRec = 'Mensagens de reciclagem';
const c_colorEsp = 'Mensagens de espionagens sofridas';
const c_colorConf = 'Convides de ataques em ACS';
const c_colorColo = 'Mensagens de colonização';
const c_colorMisiles = 'Mensagens de ataques com misseis';
const c_colorBuddylist = 'Mensagens de pedidos de amigos';
const c_autoMark = 'Auto marcar mensagens de transporte, reciclagem, etc.';
const c_allyTable = 'Activar tabela de aliança no menú lateral (entrar em Alianças para colher os dados)'+menúIlegal;
const c_tablaAllyTable = 'Ajustes de tabela de Alianças';
const c_coordLinker = 'Colorir e corrigir links de coordenadas nas mensagens e vista geral';
const c_tablaCoordLinker = 'Configuração do link de coordenadas';
const c_coordLinkerVarG = 'Cor na vista geral dependente da distância ao teu planeta planeta principal'+experimental;
const c_coordLinkerVarM = 'Cor nas mensagens dependendo da distância ao teu planeta planeta principal'+experimental;
const c_coordLinkerCF = 'Cor do planeta actual na vista de frotas';
const c_coordLinkerCM = 'Cor dos links nas mensagens';
const c_coordLinkerCVG = 'Cor dos links na vista geral';
const c_coordLinkerCG = 'Cor do número de planeta marcado na Galáxia';
const c_dragoSim = 'Mostrar interligação do Drago-Sim nas mensagens de espionagem';
const c_dragoSimM = 'Mostrar interligação do Drago-Sim no menú lateral'+menúIlegal;
const c_CSim = 'Mostrar interligação do CSim nas mensagens de espionagem';
const c_CSimM = 'Mostrar interligação do CSim no menú lateral'+menúIlegal;
const c_ocalc = 'Mostrar interligação do CSim no menú lateral'+menúIlegal;
const c_modifyDate = 'Mostrar dia em formato completo e reduzir a uma só linha'+semiLegal;
const c_flottenInfo = 'Mostrar informação de carga ao escolher frota'+semiLegal;
const c_debris = 'Activar aviso de demasiados destroços';
const c_tablaDebris = 'Configuração do resultado de destroços <a color="lightblue" title="De branco (min) a cor seleccionada (máx)">(info)</a>';
const c_debrisColor = 'Color de destaque';
const c_debrisMin = 'Máxima cantidade de destroços destacados';
const c_debrisMax = 'Quantidade da cor no máximo';
const c_compactar = 'Usar compactador nos reports de ataque';
const c_tinyIMG = 'Ver as imagens de edifícios, pesquisas, defesas e hangar em pequeno';
const c_proInputs = 'Adicional botões para controlo de unidades no hangar/defesas/frota/portal salto quantico';
const c_allyTags = 'Colorir etiquetas de alianças na vista de galáxia e estatísticas'+semiLegal;
const c_tablaAllyTags = 'Etiquetar alianças na visão de galáxia e estatísticas';
const c_galaxyTool = "Usar <a href='http://en.wiki.galaxytool.eu/index.php' title='Que é isto?' target='new'>Galaxy Tool</a>";
const c_GTGV = "Mostrar ligação à galáxia no GalaxyTool ao lado da Galáxia no menú lateral"+menúIlegal;
const c_galaxyToolM = "Mostrar ligação ao servidor de GalaxyTool no menú lateral"+menúIlegal;
const c_tablaGTool = 'Configuração do Galaxy Tool ('+location.hostname+')';
const c_improvedResources = 'Mostrar informação extra na janela de recursos';
const c_improvedCuantic = 'Melhorar aspecto da janela de Portal de Salto Quântico';
const c_moonSpy = 'Habilita a posibilidade de espiar luas e recolher destroços na vista de Galáxia'+ilegalCom;
const c_refMens = 'Intervalo de actualização das mensagens (0 desabilita)'+ilegal;
const c_transportMode = 'Usar modo de transporte'+ilegalDudosa;
const c_transportModeTable = 'Configuracão do modo de transporte';
const c_delBanner = 'Eliminar banner da vista geral'+ilegalPub;
const c_delBanners = 'Eliminar banners de publicidade'+ilegalPub;
const c_delOfficerMenu = 'Eliminar publicidade de Casino dos Oficiais do menú lateral'+ilegalPub;
const c_delOfficer = 'Elimina os icones de publicidade dos oficiais em todas as páginas'+ilegalPub;
const c_colorBuild = 'Colorir a vermelho construções e investigações demasiado caras'+ilegalCom;
const c_SYConst = 'Indica máximo de unidades a criar no hangar/defesa e permite construir mais de 999'+ilegalCom;
const c_SYReducible = 'Adicionar botões para ocultar/mostrar unidades no hangar/defesa';
const c_colapseFlights = 'Adicional botões para ocultar/mostrar voos na vista geral e frotas';
const c_AMTrans = 'Mensagens de chegada a um planeta';
const c_AMTransR = 'Mensagens de retorno de um planeta';
const c_AMDesp = 'Mensagens de implementações num planeta';
const c_AMColo = 'Mensagens de colonização';
const c_AMAlianza = 'Mensagens da aliança';
const c_AMPriv = 'Mensagens privadas';
const c_AMEsp = 'Mensagens de espionagens sofridas';
const c_AMEspP = 'Mensagens de espionagens feitas';
const c_AMEspPRecMin = 'Espionagens com menos recursos que esta quantidade'+ilegalDudosa;
const c_AMAttack = 'Informações de ataques';
const c_AMMisiles = 'Avisos de ataques com mísseis';
const c_AMRec = 'Mensagens de reciclagens';
const c_AMConf = 'Mensagens de convite de ataques em ACS';
const c_AMBuddylist = 'Mensagens de pedidos de amigos';
const c_ATMembers = 'Mostrar interligação aos membros da aliança orientados por pontuação';
const c_ATTopP = 'Mostrar interligação ao top 100 de jogadores';
const c_ATTopA = 'Mostrar interligação ao 100 de alianças';
const c_ATForo = 'Mostrar interligação ao forum';
const c_ATCC = 'Mostrar enviar CC (sem se ter permissão)';
const c_ATBaned = 'Mostrar interligação à página de jogadores banidos';
const c_ATColorN = 'Cor do nome da aliança na tabela';
const c_specialEffects = 'Activar efeitos especiais';
const c_autoUpdate = 'Procurar actualizações automaticamente (uma vez por dia)';
const c_LMSearch = 'Alterar a opção de busca do menú lateral por um formulário'+menúIlegal;
const c_blockUselessTechs = 'Bloquear tecnologias que tenham chegado o seu limite prático';
const c_menuCuantic = 'Adicionar uma interligação ao Portal de Santo Quântico no menú lateral'+menúIlegal;
const c_buildingList = 'Opção de construções para os edifícios'+notYet+ilegalCom;

const c_cuantic = 'Portal de Salto Quântico';
const c_full = 'Cheio';
const c_noProduction = 'Sem produção';
const c_emptyingStore = '¡O armazém está a esvazear!';


// Names of buildings, ships, ...
const c_gidNames = new Array();
/* buildings */
c_gidNames['1'] = 'Mina de Metal';
c_gidNames['2'] = 'Mina de Cristal';
c_gidNames['3'] = 'Sintetizador de Deutério';
c_gidNames['4'] = 'Planta de Energia Solar';
c_gidNames['12'] = 'Planta de Fusão';
c_gidNames['14'] = 'Fábrica de Robots';
c_gidNames['15'] = 'Fábrica de Nanites';
c_gidNames['21'] = 'Hangar';
c_gidNames['22'] = 'Armazém de Metal';
c_gidNames['23'] = 'Armazém de Cristal';
c_gidNames['24'] = 'Tanque de Deutério';
c_gidNames['31'] = 'Laboratório de Pesquisas';
c_gidNames['33'] = 'Terra-Formador';
c_gidNames['34'] = 'Depósito da Aliança';
c_gidNames['41'] = 'Base Lunar';
c_gidNames['42'] = 'Sensor Phalanx';
c_gidNames['43'] = 'Portal de Salto Quântico';
c_gidNames['44'] = 'Silo de Mísseis';

/* investigaciones */
c_gidNames['106'] = 'Tecnologia de Espionagem';
c_gidNames['108'] = 'Tecnologia de Computadores';
c_gidNames['109'] = 'Tecnologia de Armas';
c_gidNames['110'] = 'Tecnologia de Escudo';
c_gidNames['111'] = 'Tecnologia de Blindagem';
c_gidNames['113'] = 'Tecnologia de Energia';
c_gidNames['114'] = 'Tecnologia de Hiperespaço';
c_gidNames['115'] = 'Motor de Combustão';
c_gidNames['117'] = 'Motor de Impulsão';
c_gidNames['118'] = 'Motor Propulsor de Hiperespaço';
c_gidNames['120'] = 'Tecnologia Laser';
c_gidNames['121'] = 'Tecnologia de Iões';
c_gidNames['122'] = 'Tecnologia de Plasma';
c_gidNames['123'] = 'Rede Intergaláctica de Pesquisas';
c_gidNames['199'] = 'Tecnologia de Gravitação';

/* naves */
c_gidNames['202'] = 'Cargueiro Pequeno';
c_gidNames['203'] = 'Cargueiro Grande';
c_gidNames['204'] = 'Caça Ligeiro';
c_gidNames['205'] = 'Caça Pesado';
c_gidNames['206'] = 'Cruzador';
c_gidNames['207'] = 'Nave de Batalha';
c_gidNames['208'] = 'Nave de Colonização';
c_gidNames['209'] = 'Reciclador';
c_gidNames['210'] = 'Sonda de Espionagem';
c_gidNames['211'] = 'Bombardeiro';
c_gidNames['212'] = 'Satélite Solar';
c_gidNames['213'] = 'Destruidor';
c_gidNames['214'] = 'Estrela da Morte';
c_gidNames['215'] = 'Interceptor';

/* defensas */
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';
c_gidNames[''] = '';


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
/*********|         content               |***************/
/*********+-------------------------------+***************/
/*********************************************************/

try {
	var contentSection = location.href.match(/page=([^&]+)/)[1];
	if (debugMode) GM_log('Section: ' + contentSection);
} catch(e){'Error detecting section: '+GM_log(e)}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|   Detecting some sections     |***************/
/*********+-------------------------------+***************/
/*********************************************************/

var buildingsSection = contentSection == 'b_building';
var techsSection = document.baseURI.indexOf('mode=Forschung')!=-1;
var hangarSection = document.baseURI.indexOf('mode=Flotte')!=-1 && document.baseURI.indexOf('page=buildings')!=-1;
var defenseSection = document.baseURI.indexOf('mode=Verteidigung')!=-1;
var cuanticSection = document.baseURI.indexOf('&gid=43')!=-1;


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

function getBuildings(planetCode) {
	if (planetCode) {
		return getConf(planetCode,'buildings_' + location.hostname, '', ':');
	}
	else return GM_getValue('buildings_' + location.hostname, '').split(':');
}

function setBuildings(planetCode, gids, levels) {
	return setConf(planetCode, [gids.join('-'), levels.join('-')].join(';'),'buildings_' + location.hostname, planetCode+':;', ':');
}

function getGidTag(gid) {
	return getConf(gid, 'gidTags', '', ':');
}

function setGidTag(gid, nam) {
	return setConf(String(gid), nam, 'gidTags', '', ':');
}

function getBLStatus(planetCode) {
	if (planetCode)
		return getConf(planetCode, 'BLStatus_'+location.hostname, '', ':');
	else return GM_getValue('BLStatus_'+location.hostname, '').split(':');
}

// status can be: 'stopped' or the UTC when the build ends
function setBLStatus(planetCode, status) {
	return setConf(planetCode, status, 'BLStatus_'+location.hostname, '', ':');
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
	location.reload();
}

unsafeWindow.resetScriptConf = function resetScriptConf() {
	GM_setValue('scriptConf', defScriptConf);
}
unsafeWindow.resetCompactConf = function resetCompactConf() {
	GM_setValue('compactConf', defCompactConf);
}
unsafeWindow.loadScriptConf = function loadScriptConf() {
	alert('Función aun no implementada');
}
unsafeWindow.printScriptConf = function printScriptConf() {
	alert('Función aun no implementada');
}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|        Misc functions         |***************/
/*********+-------------------------------+***************/
/*********************************************************/

function locate(xpath, xpres, where) {
	if (where==null)
		return document.evaluate(xpath, document, null, xpres, null);
	return document.evaluate(xpath, where, null, xpres, null);
}

function locateFirst(xpath, where) {
	return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE, where).singleNodeValue;
}

function locateSnapshot(xpath, where) {
	return locate(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, where);
}

function fill(string) {
	while (string.length<6) string += '0';
	return parseInt(string, 10);
}

function tiempo2str(max, cur, prod) {
	if (prod==0) return c_noProduction;
	if (prod<0) {
		var result = "<font color=red title='"+c_emptyingStore+"'>-";
		var negative = true;
		var totalSecs = Math.floor(-(max-cur)/prod * 3600);
	}
	else {
		if (cur>max) return c_full;
		var result = "";
		var totalSecs = Math.floor((max-cur)/prod * 3600);
	}
	var secs = Math.floor(totalSecs%60);
	var mins = Math.floor((totalSecs/60)%60);
	var hours = Math.floor((totalSecs/3600)%24);
	var days = Math.floor(totalSecs/(3600*24));

	if (days>0) result += days+'d ';
	if (hours>0 || days>0) result += hours+'h ';
	if (mins>0 || hours>0 || days>0) result += mins+'m ';
	if (secs>0 || mins>0 || hours>0 || days>0) result += secs+'s';
	if (negative) result += "</font>";
	return result;
}
		

function validCoords(coords) {
	try {
		var sepCoords=coords.match(/^\[?([1-9]):([1-4]\d{2}|[1-9]\d|[1-9]):(1[0-5]|[1-9])\]?$/);
		return sepCoords;
	} catch (e) {}
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

function setMoonList(list) {
	return GM_setValue('moonList_' + location.hostname, list);
}

/*function getMoonList() {
	return
}*/

function isMoon(planetCode) {
	return GM_getValue('moonList_' + location.hostname, '').indexOf(planetCode)!=-1;
}

function setHiddenShip(shipId) {
	hideIdNoEffects('photo_'+shipId);
	hideIdNoEffects('desc_'+shipId);
	hideIdNoEffects('input_'+shipId);
	showId('mini_'+shipId);
	return setBooleanConf('hiddenShips', shipId);
}

function delHiddenShip(shipId) {
	showId('photo_'+shipId);
	showId('desc_'+shipId);
	showId('input_'+shipId);
	hideIdNoEffects('mini_'+shipId);
	return delBooleanConf('hiddenShips', shipId);
}

function setFlightsHidden(page) {
	hideIdNoEffects('flight_minus');
	showIdNoEffects('flight_plus');
	showId('numFlights');
	var i=0;
	while (hideId('flight'+i)) {i++;}
	return setBooleanConf('hiddenFlights', page);
} unsafeWindow.setFlightsHidden = setFlightsHidden;
		
function delFlightsHidden(page) {
	showIdNoEffects('flight_minus');
	hideIdNoEffects('flight_plus');
	hideId('numFlights');
	var i=0;
	while (showId('flight'+i)) {i++;}
	return delBooleanConf('hiddenFlights', page);
} unsafeWindow.delFlightsHidden = delFlightsHidden;
		
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
				if (parseInt([fill(newVer[1]), fill(newVer[2]), fill(newVer[3])].join(''), 10)>parseInt([fill(Current[1]), fill(Current[2]), fill(Current[3])].join(''), 10)) {
					if (confirm('Hay una versión nueva de '+scriptName+' ('+newVer[0]+')!! Quieres instalarla?')) {
						win = window.open(scriptSource, 'Actualizar script');
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

if (getScriptConf('proInputs') && ((contentSection=='buildings' && (document.baseURI.indexOf('mode=Flotte')!=-1 ||
	document.baseURI.indexOf('mode=Verteidigung')!=-1)) || contentSection=='flotten1' || document.baseURI.indexOf('&gid=43')!=-1)) {
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
if (getScriptConf('specialEffects')) {
	var hide = hideEffects;
	var show = showEffects;
	var hideId = hideIdEffects;
	var showId = showIdEffects;
}
else { // no special effects
	var hide = hideNoEffects;
	var show = showNoEffects;
	var hideId = hideIdNoEffects;
	var showId = showIdNoEffects;
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
						nodo.innerHTML+="<img title='Error: acceso denegado' src='"+ledRed+"' >";
//						alert('Acceso denegado, comprueba tu nombre de usuario y tu password');
					}
					else if (details.status==404) {
						nodo.innerHTML+="<img title='Error: la página no existe' src='"+ledRed+"' >";
//						alert('Página no encontrada, comprueba la url de Galaxy Tool');
					}
					else if (details.status==200) {
						try {
							var code=parseInt(details.responseText.match(/(\d\d\d)$/)[1], 10);
						} catch (e) {}
						if (code==601)
							nodo.innerHTML+="<img title='Galaxia "+[typ.replace(/.*y=(\d+).*/, '$1'), typ.replace(/.*m=(\d+).*/, '$1')].join(':')+" actualizada' src='"+ledGreen+"' >";
						else if (code==602)
							nodo.innerHTML+="<img title='Error al actualizar la galaxia "+[typ.replace(/.*y=(\d+).*/, '$1'), typ.replace(/.*m=(\d+).*/, '$1')].join(':')+"' src='"+ledRed+"' >";						
						else if (code==611)
							nodo.innerHTML+="<img title='Informe de espionaje de "+content.replace(/.*%5B(\d)+%3A(\d+)%3A(\d+)%5D.*/, '$1:$2:$3')+" enviado' src='"+ledGreen+"' >";
						else if (code==612)
							nodo.innerHTML+="<img title='Error al enviar informe de espionaje de "+content.replace(/.*%5B(\d)+%3A(\d+)%3A(\d+)%5D.*/, '$1:$2:$3')+"' src='"+ledRed+"' >";							
						else if (code==621) {
							var cosa = typ.match(/.*who=(\d)&what=(\d)/);
							var cadena = (cosa[1]=='0'?'jugadores':'alianzas') +
									(cosa[2]=='0'?' en puntos':(cosa[2]=='1'?' en flotas':' por investigaciones'))
							nodo.innerHTML+="<img title='Estadísticas de "+cadena+" actualizadas' src='"+ledGreen+"' >";
						}
						else if (code==622) {
							var cosa = typ.match(/.*who=(\d)&what=(\d)/);
							var cadena = (cosa[1]=='0'?'jugadores':'alianzas') +
									(cosa[2]=='0'?' en puntos':(cosa[2]=='1'?' en flotas':' por investigaciones'))
							nodo.innerHTML+="<img title='Error al actualizar las estadísticas de "+cadena+"' src='"+ledRed+"' >";
						}
						else if (code==631)
							nodo.innerHTML+="<img title='Historial de alianza actualizado' src='"+ledGreen+"' >";
						else if (code==632)
							nodo.innerHTML+="<img title='Error al actualizar el historial de alianza' src='"+ledRed+"' >";
//					alert('La url especificada no es correcta');
						else {
							nodo.innerHTML+="<img title='Error: url incorrecta o error desconocido' src='"+ledRed+"' >";
							if (debugMode) alert('Error desconocido, el contenido de la respuesta es:\n'+details.responseHeaders+details.responseText);
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
		ramka = content;
		body = ramka;
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
				a.href = 'index.php?page=galaxy&session=' + getSession(location.hostname) +
							'&galaxy='+coord[0] + '&system=' + coord[1] + '&position='+coord[2];
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
/*********|        Reduced images         |***************/
/*********+-------------------------------+***************/
/*********************************************************/

if (buildingsSection || techsSection || hangarSection || defenseSection) {
		var table = locateFirst("//table[@width='530']");
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
/*********|    getting page parts         |***************/
/*********+-------------------------------+***************/
/*********************************************************/


var leftmenu  = document.getElementById('leftmenu');
var content = document.getElementById('content');
var messagebox = document.getElementById('messagebox');
var header_top = document.getElementById('header_top');
var errorbox = document.getElementById('errorbox');

/*********************************************************/
/*********+-------------------------------+***************/
/*********|    eliminar banners           |***************/
/*********+-------------------------------+***************/
/*********************************************************/

if (getScriptConf('delBanners')) {
	var banners = locateSnapshot("//a/div[@style]");
	for (var i=0; i<banners.snapshotLength; i++) {
		if (banners.snapshotItem(i).style['background-image']!='') {
			if (debugMode) GM_log('Banner deleted!');
			banners.snapshotItem(i).parentNode.parentNode.removeChild(banners.snapshotItem(i).parentNode)
		}
	}
}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|    Loading building lists     |***************/
/*********+-------------------------------+***************/
/*********************************************************/

unsafeWindow.loadBuilding = function(planet) {
	
}

/*
var dates = getBLStatus();
for (var i=0; i<dates.length; i+=2) {
// 	GM_log('Planeta '+dates[i]+' acaba '+new Date(parseInt(dates[i+1])));
	timeLeft = parseInt(dates[i+1])-new Date().getTime();
	if (timeLeft<0) {
		
	}
	else 
		setTimeout("alert('"+dates[i]+"'+' ha acabado')", timeLeft+Math.random()*10000);
}

var dataa = new Date();
dataa.setMinutes(29)
GM_log(dataa.getTime())
*/


/*********************************************************/
/*********+-------------------------------+***************/
/*********|         header_top            |***************/
/*********+-------------------------------+***************/
/*********************************************************/

if (header_top) {
	// save current planet coords
	var thisCoords = header_top.getElementsByTagName('select')[0];
	thisCoords = thisCoords.options[thisCoords.selectedIndex];
	var thisPlanetCode = thisCoords.value.split('cp=')[1].split('&')[0];
	thisCoords = thisCoords.innerHTML.split('[')[1].split(']')[0];
	if (debugMode) GM_log('Planet coords: ' + thisCoords + '\nPlanet code: ' + thisPlanetCode);

	// set Main Planet
	setMainP(header_top.getElementsByTagName('option')[0].innerHTML.match(/\[(.*)\]/)[1]);

	// save planet resources
	var resources = locateSnapshot("//table[@id='resources']//tr/td/font");
	var metal = parseInt(resources.snapshotItem(0).innerHTML.replace(/\./g, ''), 10);
	var cristal = parseInt(resources.snapshotItem(1).innerHTML.replace(/\./g, ''), 10);
	var deuterio = parseInt(resources.snapshotItem(2).innerHTML.replace(/\./g, ''), 10);
	var energia = parseInt(resources.snapshotItem(4).innerHTML.replace(/\./g, ''), 10);
	var energiaTotal = parseInt(resources.snapshotItem(4).nextSibling.nodeValue.replace(/[\.\/]/g, ''), 10);

	
	// delete officer stuff
	if (getScriptConf('delOfficer')) {
		// delete officer icons
		var aux = header_top.getElementsByTagName('tr');
		aux[aux.length-1].parentNode.parentNode.parentNode.style['display'] = 'none';

		// delete darkmatter counter
		var DMsnap = locateSnapshot("//table[@id='resources']/tbody/tr/td[4]");
		for (var i=0; i<DMsnap.snapshotLength; i++) {
			DMsnap.snapshotItem(i).style['display']='none';
		}
		// center header_top table
		header_top.getElementsByTagName('table')[0].width='50%';
	}
}


/*********************************************************/
/*********+-------------------------------+***************/
/*********|         leftmenu              |***************/
/*********+-------------------------------+***************/
/*********************************************************/

if (leftmenu) {
	if (getScriptConf('autoUpdate')) checkUpdates();
	
	var nodo = locateFirst("//font[a='Alianzas']/../../..");
	if (nodo) {
		var indSession = nodo.innerHTML.indexOf('session=');
		setSession(location.hostname, nodo.innerHTML.substring(indSession+8, indSession+20));
		if (getScriptConf('dragoSimM')) {
			var drago = nodo.cloneNode(true);
			var drago2 = drago.getElementsByTagName('a')[0];
			drago2.href = "http://drago-sim.com/index.php?lang=spanish&style=g3ck0&template=Standard" +
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
				var Galaxia = locateFirst("//table/tbody/tr/td/div/font[a='Galaxia']");
				var GTGView = Galaxia.cloneNode(true);
				var GTGView2 = GTGView.getElementsByTagName('a')[0];
				GTGView2.style['color'] = 'lightblue';
				var coord = getMainP().split(':');
				GTGView2.href = getGTUrl(location.hostname).split('secret')[0]+'secret/view.php?gala='+coord[0]+'&system='+coord[1];
				GTGView2.innerHTML = 'GT';
				GTGView2.title = 'Ver galaxia a traves de GalaxieTool';
				Galaxia.parentNode.appendChild(GTGView);
			}
		}

		if (parseInt(getScriptConf('refMens'), 10)>0) {
			unsafeWindow.actualizaMesg = function () {
				var numMens=0;
				GM_xmlhttpRequest({
					method:"GET",
					url:"http://"+location.hostname+"/game/index.php?page=overview&session=" + getSession(location.hostname),
					headers:{
						"User-Agent": navigator.userAgent,
						"Accept":"text/xml",
					},
					onload:function(details) {
						var texto = details.responseText;
						try {
							var numMens = parseInt(texto.match(/Tienes (\d+)/)[1], 10);
//							var ataque = texto.match(/(flight attack)/m)[0];
						} catch (e) {}
//						if (ataque!='') alert('Nos atacan!')
						if (!isNaN(numMens)) {
							var ind = 20;
							if (drago) ind++;
							var mesg = nodo.parentNode.getElementsByTagName('tr')[ind];
							var mesg2 = mesg.getElementsByTagName('a')[0];
							mesg2.innerHTML = "Mensajes <blink> (" + numMens + ")</blink>";
						}
					}
				});
		// generare el tiempo de actualizacion con algo de aleatoriedad, para que sea mas dificil saber
		// si usamos un script. Tener en cuenta que, a pesar de la aleatoriedad, el tiempo no puede
		// ser muy pequeña. La funcion de tiempo es: t(segundos) * (0.8+0.4*rand(0-1))
				var tiempo = parseInt(getScriptConf('refMens'), 10)*Math.floor(800+400*Math.random());
				if (tiempo!=0) unsafeWindow.setTimeout('actualizaMesg()', tiempo);
			}
			unsafeWindow.actualizaMesg();
		}

		// Elimina el letrero de "Casino de los oficiales" del menu lateral
		if (getScriptConf('delOfficerMenu')) {
			document.getElementById('darkmatter2').parentNode.parentNode.style['display']='none';
		}

		if (getScriptConf('ocalc')) {
			var ocalc = nodo.cloneNode(true);
			var ocalc2 = ocalc.getElementsByTagName('a')[0];
			ocalc2.innerHTML = "o-calc";
			ocalc2.href='http://es.o-calc.com';
			nodo.parentNode.insertBefore(ocalc, nodo.parentNode.childNodes[18]);
		}

		if (getScriptConf('menuCuantic') && isMoon(thisPlanetCode)) {
			var cuantic = nodo.cloneNode(true);
			var cuantic2 = cuantic.getElementsByTagName('a')[0];
			cuantic2.innerHTML = c_cuantic;
			cuantic2.href='index.php?session='+getSession(location.hostname)+'&page=infos&gid=43';
			nodo.parentNode.insertBefore(cuantic, nodo.parentNode.childNodes[18]);
		}


		unsafeWindow.saveResourcesTable = function(reset) {
			if (reset) return GM_setValue('resourcesTable_'+location.hostname, '');
			else return	GM_setValue('resourcesTable_'+location.hostname, [document.getElementById('RTGalaxy').value,
			document.getElementById('RTSystem').value, document.getElementById('RTPlanet').value,
			document.getElementById('RTDestType').selectedIndex, document.getElementById('RTmetal').value,
			document.getElementById('RTcristal').value, document.getElementById('RTdeuterio').value].join(':'));
		}

		unsafeWindow.RT = {coords:':::',resources:':'};
		unsafeWindow.RT.watch('coords', function(id, oldval, newval) {
			var coords = newval.split(':');
			var RTGalaxy = document.getElementById('RTGalaxy');
			var RTSystem = document.getElementById('RTSystem');
			var RTPlanet = document.getElementById('RTPlanet');
			var RTDestType = document.getElementById('RTDestType');
			if ([RTGalaxy.value,RTSystem.value,RTPlanet.value,RTDestType.selectedIndex].join(':')!= newval) {
				RTGalaxy.value = coords[0];
				RTSystem.value = coords[1];
				RTPlanet.value = coords[2];
				RTDestType.selectedIndex = coords[3];
				document.getElementById('RTmetal').value='0';
				document.getElementById('RTcristal').value='0';
				document.getElementById('RTdeuterio').value='0';
			}
			return newval;
		});
		unsafeWindow.RT.watch('resources', function(id, oldval, newval) {
			var values = newval.split(';');
			var cantidad = parseInt(values[1], 10);
			var cantidadActual = document.getElementById('RT'+values[0]);
			if (cantidad < 0) {
				cantidadActual.value = Math.max(parseInt(cantidadActual.value, 10)+cantidad, 0);
			}
			else {
				unsafeWindow.RT.coords = values[2];
				cantidadActual.value = cantidad;
			}
			setTimeout("document.getElementById('resourcesTable').onchange()", 100);
		});
		

		unsafeWindow.RTcalc = function() {
			var RTmetal = document.getElementById('RTmetal').value;
			var RTcristal = document.getElementById('RTcristal').value;
			var RTdeuterio = document.getElementById('RTdeuterio').value;
			var total = document.getElementById('RTtotal');
			var capacity = parseInt(document.getElementById('RTCargoType').value, 10);
			total.innerHTML = Math.ceil((parseInt(RTmetal,10) + parseInt(RTcristal,10) + parseInt(RTdeuterio,10))/capacity);
			if (parseInt(total.innerHTML)==0) {
				document.getElementById('resourcesTable').style['display']='none';
				return true;
			}
			document.getElementById('resourcesTable').style['display']='';
			return false;
		}


		var rec = document.createElement('table');
		rec.width='110';
		rec.cellSpacing=0;
		rec.cellPadding=0;
		rec.id='resourcesTable';
		rec.setAttribute('onchange', "saveResourcesTable(RTcalc());");
		rec.appendChild(nodo.previousSibling.previousSibling.cloneNode('true')); // añadimos la imagen separadora
		rec.lastChild.childNodes[1].colSpan=3;
		rec.lastChild.childNodes[1].title='Ocultar tabla de recursos';
		rec.lastChild.childNodes[1].style['cursor']='pointer';
		rec.lastChild.childNodes[1].setAttribute('onclick', "RT.resources='metal;0;0:0:0:0';");

		var data = GM_getValue('resourcesTable_'+location.hostname, '');
		if (data=='') {
			data = '0:0:0:0:0:0:0';
			rec.style['display']='none';
		}
		data = data.split(':');

		rec.appendChild(document.createElement('tr')).appendChild(document.createElement('td'));
		var input = document.createElement('input');
		input.type = 'text';
		input.size = '3';
		
		input.id='RTGalaxy';
		input.title = 'galaxia destino';
		input.value=data[0];
		rec.lastChild.lastChild.appendChild(input.cloneNode(true));

		input.id='RTSystem';
		input.title='sistema destino';
		input.value=data[1];
		rec.lastChild.appendChild(document.createElement('td')).appendChild(input.cloneNode(true));
		
		input.id='RTPlanet';
		input.title='planeta destino';
		input.value=data[2];
		rec.lastChild.appendChild(document.createElement('td')).appendChild(input.cloneNode(true));
		
		var select = rec.appendChild(document.createElement('tr')).appendChild(document.createElement('td'));
		select.colSpan=3;
		select.appendChild(document.createElement('select'));
		select.lastChild.id='RTDestType';
		select.lastChild.title='tipo de planeta destino';
		select.lastChild.innerHTML="<option value='1' title='El destino es un planeta'>Planeta</option><option value='3' "+(data[3]=='1'?'selected':'')+" title='El destino es una luna'>Luna</option>";
		
		rec.appendChild(document.createElement('tr'));
		rec.lastChild.appendChild(document.createElement('td'));
		rec.lastChild.appendChild(document.createElement('td'));
		rec.lastChild.lastChild.colSpan=2;
		rec.lastChild.firstChild.innerHTML="<a title='Borrar campo' onclick=\"this.parentNode.nextSibling.firstChild.value='0'; document.getElementById('resourcesTable').onchange() \">M: </a>";
		rec.lastChild.lastChild.appendChild(document.createElement('input'));
		rec.lastChild.lastChild.lastChild.type='text';
		rec.lastChild.lastChild.lastChild.size='10';
		rec.lastChild.lastChild.lastChild.setAttribute('onchange', "if (this.value=='') this.value='0'; else this.value=parseInt(this.value, 10)");
		rec.lastChild.lastChild.lastChild.id='RTmetal';
		rec.lastChild.lastChild.lastChild.value=data[4];
		rec.lastChild.lastChild.lastChild.title='metal a transportar';
		unsafeWindow.resources='metal;-2000';
		rec.appendChild(rec.lastChild.cloneNode(true));
		rec.lastChild.lastChild.lastChild.id='RTcristal';
		rec.lastChild.lastChild.lastChild.value=data[5];
		rec.lastChild.lastChild.lastChild.title='cristal a transportar';
		rec.lastChild.firstChild.firstChild.innerHTML='C: ';

		rec.appendChild(rec.lastChild.cloneNode(true));
		rec.lastChild.lastChild.lastChild.id='RTdeuterio';
		rec.lastChild.lastChild.lastChild.value=data[6];
		rec.lastChild.lastChild.lastChild.title='deuterio a transportar';
		rec.lastChild.firstChild.firstChild.innerHTML='D: ';


		unsafeWindow.setCargoType = function(value) {
			return GM_setValue('RTCargoType_'+location.hostname, value);
		}
		rec.appendChild(document.createElement('tr'));
		rec.lastChild.appendChild(document.createElement('td'));
		rec.lastChild.lastChild.colSpan=3;
		rec.lastChild.lastChild.innerHTML="<center>total <span id='RTtotal'></span> <select id='RTCargoType' onchange='setCargoType(this.selectedIndex)' title='Tipo de naves de transporte'><option title='Nave grande de carga' value='25000'>NGC</option><option title='Nave pequeña de carga' "+(GM_getValue('RTCargoType_'+location.hostname, '1')=='1'?'selected':'')+" value='5000'>NPC</option></select></center";

		nodo.parentNode.parentNode.parentNode.appendChild(rec);
		setTimeout("document.getElementById('resourcesTable').onchange()", 500);

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
			(getScriptConf('ATMembers')?'<tr><td><div align="center"><font color="#FFFFFF"><a href="index.php?page=allianzen&session=' + Session + '&a=4&sort1=3&sort2=0">Miembros <font id="allyName1" color="'+getScriptConf('ATColorN')+'">'+allyName+'</font></a></font></div></td></tr>':'')+
			(getScriptConf('ATTopP')?'<tr><td><div align="center"><font color="#FFFFFF"><a href="index.php?page=stat&session=' + Session + '&start=1&sort1=1&sort2=2">Jugadores Top</a></font></div></td></tr>':'')+
				(getScriptConf('ATTopA')?'<tr><td><div align="center"><font color="#FFFFFF"><a href="index.php?page=stat&session=' + Session + '&start=1&who=ally">Alianzas Top</a></font></div></td></tr>':'')+
			(getScriptConf('ATForo')?'<tr><td><div align="center"><font color="#FFFFFF"><a id="foroAlly" href='+foroAlly+' target="newwindow">Foro <font id="allyName2" color="'+getScriptConf('ATColorN')+'">'+allyName+'</font></a></font></div></td></tr>':'') +
				(getScriptConf('ATCC')?'<tr id="ATCC"' +(getScriptConf('ATCCPriv')?'':'style="display:none"')+'><td><div align="center"><font color="#FFFFFF"><a href="index.php?page=allianzen&session=' + Session + '&a=17">Enviar CC</a></font></div></td></tr>':'') +
			(getScriptConf('ATBaned')?'<tr><td><div align="center"><font color="#FFFFFF"><a href="pranger.php" target="new">Baneos</a></font></div></td></tr>':'');
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
		var nodo = locateFirst("//table/tbody/tr/td/div/font[a='Buscar']/..");
		if (nodo) {
			nodo.innerHTML='';
			
			var formulario = document.createElement('form');
			formulario.setAttribute("action","index.php?page=suche&session="+getSession(location.hostname));
			//formulario.setAttribute("target","Hauptframe");
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
	var path = "//div[@id=\"menu\"]/table/tbody/tr/td";
	var tds = locateSnapshot(path);
	var j=0;
	for (var i=0; i<tds.snapshotLength; i++) {
		if (tds.snapshotItem(i).firstChild.nodeName=='IMG' || i==tds.snapshotLength-1) {
			if (i!=0) {
				var string='';
				for (var k=j+1; k<i; k++) string = (string==''?string=k:string=[string, k].join(':'));
				if (i==tds.snapshotLength-1) string += ':'+i;
				if (isHidden(j+1)) {
					hideNoEffects(path, string);
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
/*********|           options             |***************/
/*********+-------------------------------+***************/
/*********************************************************/

if (contentSection == 'options') {
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
	
	var config = locateFirst('//table[@width=519]');
	config.setAttribute('name', 'ogame');
	
	
	
	makeConfig = function () {
		function newTable(title, colspan) {
			return "<table width='519'><tr><td class='c' colspan ="+colspan+">"+title+"</td></tr>";
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
		var cad = "<br><h1><a href='"+scriptPage+"' target='_blank' style='color:lightblue'>"+scriptName+"</a><small title='click para buscar actualizaciones' onclick='checkUpdates(true)' style='color:lightgreen; cursor:pointer'>  v"+scriptVersion+"</small> by <font color='orangered'>"+scriptAuthor+"</font> </h1>" +
			"<br /><center>Descubra as <a href='http://roble.cnice.mecd.es/~apuente/applet1.html' target='new'>cores</a>";

		// Ajustes

		cad += newTable(c_mainTable, 2);
		cad += newTableRowCk('conf', 'compactar', c_compactar);
		cad += newTableRowCk('conf', 'ocalc', c_ocalc);
		cad += newTableRowCk('conf', 'dragoSim', c_dragoSim);
		cad += newTableRowCk('conf', 'dragoSimM', c_dragoSimM);
		cad += newTableRowCk('conf', 'CSim', c_CSim);
		cad += newTableRowCk('conf', 'CSimM', c_CSimM);
		cad += newTableRowCk('conf', 'modifyDate', c_modifyDate);
		cad += newTableRowCk('conf', 'tinyIMG', c_tinyIMG);
		cad += newTableRowCk('conf', 'proInputs', c_proInputs);
		cad += newTableRowCk('conf', 'flottenInfo', c_flottenInfo);
		cad += newTableRowCk('conf', 'specialEffects', c_specialEffects);
		cad += newTableRowCk('conf', 'autoUpdate', c_autoUpdate);
		cad += newTableRowCk('conf', 'improvedResources', c_improvedResources);
		cad += newTableRowCk('conf', 'improvedCuantic', c_improvedCuantic);
		cad += newTableRowCk('conf', 'delBanner', c_delBanner);
		cad += newTableRowCk('conf', 'delBanners', c_delBanners);
		cad += newTableRowCk('conf', 'delOfficerMenu', c_delOfficerMenu);
		cad += newTableRowCk('conf', 'delOfficer', c_delOfficer);
		cad += newTableRowCk('conf', 'colorBuild', c_colorBuild);
		cad += newTableRowCk('conf', 'SYConst', c_SYConst);
		cad += newTableRowCk('conf', 'SYReducible', c_SYReducible);
		cad += newTableRowCk('conf', 'colapseFlights', c_colapseFlights);
		cad += newTableRowCk('conf', 'LMSearch', c_LMSearch);
		cad += newTableRowCk('conf', 'blockUselessTechs', c_blockUselessTechs);
		cad += newTableRowCk('conf', 'menuCuantic', c_menuCuantic);
		cad += newTableRowCk('conf', 'buildingList', c_buildingList);
		cad += newTableRowCk('conf', 'coordLinker', c_coordLinker, 'tablaCoordLinker');
		cad += newNestledTable('tablaCoordLinker', 'coordLinker', c_tablaCoordLinker, 2, 2);
		cad += newTableRowCk('conf', 'coordLinkerVarG', c_coordLinkerVarG);
		cad += newTableRowCk('conf', 'coordLinkerVarM', c_coordLinkerVarM);
		cad += newTableRowColor('color', 'coordLinkerCF', c_coordLinkerCF);
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
		cad += "<tr><th><input type='button' value='+' title='Añadir nueva etiqueta' onclick=\"this.parentNode.parentNode.parentNode.appendChild(this.parentNode.parentNode.nextSibling.cloneNode(true));this.parentNode.parentNode.parentNode.lastChild.style['display']=''\" ></th>" + 
			"<th>Etiqueta</th>" +
			"<th>Cor</th>" +
			"<th>Aliança(s) implicada(s) (separar com '|' )</th>" +
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
		cad += newTableRowCk('conf', 'galaxyToolM', c_galaxyToolM, '', 4);
		cad += newTableRowCk('conf', 'GTGV', c_GTGV, '', 4);
		cad += "<tr><th><input type='button' value='+' title='Adicionar nova conta' onclick=\"this.parentNode.parentNode.parentNode.appendChild(this.parentNode.parentNode.nextSibling.cloneNode(true));this.parentNode.parentNode.parentNode.lastChild.style['display']=''\" ></th>" + 
			"<th>User:</th>" +
			"<th>Password:</th>" +
			"<th>Página do Galaxy Tool (perguntar ao administrador)</th>" +
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
	
		cad += newTableRowNb('conf', 'refMens', c_refMens);
		cad += newTableRowCk('conf', 'moonSpy', c_moonSpy);
		cad += newTableRowCk('conf', 'transportMode', c_transportMode, 'transportTable');
		cad += newNestledTable('transportTable', 'transportMode', c_transportModeTable, 2, 2);
//		cad += newTableRowCk('conf', 'transportModeEnabled', c_transportModeEnabled);
	
		var temp = getScriptConf("TMDestination");
		if (temp == "0;0;0;1") {
			temp = getMainP().replace(/:/g, ';')+';1';
		}
		cad += "<tr><input type=\"hidden\" name='conf' id=\"TMDestination\" value=\"" +
			temp + "\" />" +
			"<th width=90 onchange=\"document.getElementById('TMDestination').value=[this.childNodes[0].value,this.childNodes[1].value,this.childNodes[2].value,this.childNodes[3].value].join(';')\">";
		temp = temp.split(';');
		for (var i=0; i<temp.length-1; i++)
			cad += "<input size=1 type=\"text\" value=\""+temp[i]+"\">";
		cad += "<select><option value=1 "+(temp[3]=='1'?'selected=\"yes\"':'')+">Planeta</option><option value=3 "+(temp[3]=='3'?'selected=\"yes\"':'')+">Luna</option></select>";
		cad += "</th><th>Destino por defecto</th></tr>";
		cad += endNestledTable();

		cad += newTableRowCk('conf', 'colorMens', c_colorMens, 'tablaColores');
		cad += newTableRowCk('conf', 'autoMark', c_autoMark, 'tablaAutoMark');
		// AutoMark

		cad += "</table><table width=\"600\"><tr><td width=\"50%\"><table id='tablaAutoMark' style='display:"+(getScriptConf('autoMark')?'':'none')+"' ><tr><td class=\"c\" colspan =\"2\">Auto marcar mensajes de:</td></tr>";
		
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
		cad += newTableRowCk('autoMark', 'AMBuddylist', c_AMBuddylist);

		// Colores

		cad += "</table></td><td width='50%'><table id='tablaColores' style='display:"+(getScriptConf('colorMens')?'':'none')+"' ><tr><td class=\"c\" colspan =\"2\">Colores de los mensajes</td></tr>";
    
		cad += newTableRowColor('color', 'colorTrans', c_colorTrans);
		cad += newTableRowColor('color', 'colorTransR', c_colorTransR);
		cad += newTableRowColor('color', 'colorDesp', c_colorDesp);
		cad += newTableRowColor('color', 'colorAlianza', c_colorAlianza);
		cad += newTableRowColor('color', 'colorPriv', c_colorPriv);
		cad += newTableRowColor('color', 'colorRec', c_colorRec);
		cad += newTableRowColor('color', 'colorEsp', c_colorEsp);
		cad += newTableRowColor('color', 'colorConf', c_colorConf);
		cad += newTableRowColor('color', 'colorBuddylist', c_colorBuddylist);
		cad += newTableRowColor('color', 'colorColo', c_colorColo);
		cad += newTableRowColor('color', 'colorMisiles', c_colorMisiles);
		
		cad += "</table></td></tr></table><center><table width='60%'><tr>" +
			"<td><div align=left><input type='button' value='Guardar cambios' onclick='saveScriptConf(location.hostname)' /></div></td>" +
			"<td><div><input type='button' value='Exportar configuraci&oacute;n' onclick='printScriptConf()' /></div></td>" +
			"<td><div><input type='button' value='Cargar configuraci&oacute;n' onclick='loadScriptConf()' /></div></td>" +
			"<td><div align=right><input type='button' value='Valores iniciales' onclick='resetScriptConf()' /></div></td>" +
			"</tr></table></center>";

		return cad;
	} // makeConfig

	
	var scriptConf = document.createElement('table');
	scriptConf.setAttribute('name', 'script');
	scriptConf.innerHTML = makeConfig();

	config.parentNode.insertBefore(initTab(['Configuraci&oacute;n OGame', 'Configuraci&oacute;n '+scriptName],['ogame', 'script']), config);
	config.parentNode.insertBefore(scriptConf, config);
	unsafeWindow.tab.position = 'ogame';
}

/*********************************************************/
/*********+-------------------------------+***************/
/*********|         overview              |***************/
/*********+-------------------------------+***************/
/*********************************************************/

else if (contentSection=='overview') {
	if (getScriptConf('delBanner')) document.getElementById('combox_container').style['display']='none';
	nodo = locateFirst("//td[@class='c']");
	try {
		setUserName(nodo.innerHTML.match(/\((.*)\)/)[1]);
	} catch (e) {GM_log(e)}
	if (getScriptConf('modifyDate')) {
		nodo = locateFirst("//div[@id='content']//table/tbody/tr[th[2]]/th[2]");
		nodo.previousSibling.previousSibling.innerHTML='Hora';
		try{
			var days = new Array();
			days['Mon'] = 'Segunda';
			days['Tue'] = 'Terça';
			days['Wed'] = 'Quarta';
			days['Thu'] = 'Quinta';
			days['Fri'] = 'Sexta';
			days['Sat'] = 'Sábado';
			days['Sun'] = 'Domingo';
			var months = new Array();
			months['Jan'] = 'Janeiro';
			months['Feb'] = 'Fevereiro';
			months['Mar'] = 'Março';
			months['Apr'] = 'Abril';
			months['May'] = 'Maio';
			months['Jun'] = 'Junho';
			months['Jul'] = 'Julho';
			months['Aug'] = 'Agosto';
			months['Sep'] = 'Setembro';
			months['Oct'] = 'Outubro';
			months['Nov'] = 'Novembro';
			months['Dec'] = 'Dezembro';
			var fecha=nodo.innerHTML.match(/(\S\S\S) (\S\S\S) (\d+) (\d+:\d\d:\d\d)/);
			nodo.innerHTML=days[fecha[1]]+' '+fecha[3]+' de '+months[fecha[2]]+', '+fecha[4];
		} catch(e) {GM_log(e)}
	}
	
	if (getScriptConf('coordLinker')) {
		var links = locateSnapshot("//div[@id='content']//table/tbody/tr[@class]/th[2]/span/a[text()]");
		var colorVG = getScriptConf('coordLinkerCVG');
		var colorVariable = getScriptConf('coordLinkerVarG');
		for (var i=0; i<links.snapshotLength; i++) {
			try {
				var linkText = links.snapshotItem(i).innerHTML;
				var coord = linkText.match(/\[(\d+:\d+:\d+)\]/)[1];
				links.snapshotItem(i).style['color'] = colorVariable?getColorLinker(coord):colorVG;
			} catch (e) {GM_log(e)}
		}
	}
	
	if (getScriptConf('buildingList')) {
		try {
			var blists = getBuildings(thisPlanetCode).split(';');
			var gids = blists[0].split('-');
			var levels = blists[1].split('-');
		
			var center = locateFirst("//img[@width=200]/../center");
			if (center) {
				var div = document.createElement('div');
				center.parentNode.appendChild(div);
				div.innerHTML='Cola de edificios';
				var select = div.appendChild(document.createElement('select'));
				select.size = 7;
				for (var i=0; i<gids.length; i++) {
					select.innerHTML += "<option>" + getGidTag(gids[i]) + ' (' + levels[i] + ")</option>";
				}
			}
		}catch(e){GM_log(e)}
	}
	
	if (getScriptConf('colapseFlights')) {
		var hidden = getBooleanConf('hiddenFlights', contentSection);
		
		var more = document.createElement('img');
		more.src = moreButton;
		more.style['cursor']='pointer';
 		if (!hidden) more.style['display']='none';
		more.title = 'Mostrar vuelos';
		more.id = 'flight_plus';
		more.setAttribute('onclick', "delFlightsHidden('"+contentSection+"')");

		var less = document.createElement('img');
		less.src = lessButton;
		less.style['cursor']='pointer';
		if (hidden) less.style['display']='none';
		less.title = 'Ocultar vuelos';
		less.id = 'flight_minus';
		less.setAttribute('onclick', "setFlightsHidden('"+contentSection+"')");

		var flightsHeader = locateFirst("//div[@id='content']//tr[position()>1]/td[@class='c']");
		flightsHeader.appendChild(more);
		flightsHeader.appendChild(less);
		flightsHeader.appendChild(flightsHeader.firstChild);

		var flights = locateSnapshot("//div[@id='content']//tr[@class]");
		var numFlights = document.createElement('font');
		numFlights.id = 'numFlights';
		numFlights.innerHTML=' ('+flights.snapshotLength+' vuelos)';
		if (!hidden) numFlights.style['display']='none';
		flightsHeader.appendChild(numFlights);

		for (var i=0; i<flights.snapshotLength; i++) {
			flights.snapshotItem(i).id = 'flight' + i;
			if (hidden) flights.snapshotItem(i).style['display'] = 'none';
		}
	}
}

else if (buildingsSection || techsSection || hangarSection || defenseSection || cuanticSection) {
				
	// Tech Section
	if (techsSection) {
		var response = document.body.innerHTML.replace(/\n/g, '');

		// Block technologies
		if (getScriptConf('blockUselessTechs')) {
			function blockTech(gid) {
				var blockedTech = locateFirst('//a[@href="index.php?page=infos&session='+getSession(location.hostname)+'&gid='+gid+'"]/../..');
//				if (blockedTech.lastChild.innerHTML != ' - ')
				blockedTech.lastChild.innerHTML = "<font color='red'>Máximo nivel útil alcanzado</font>";
			}
		
			var gids = [
				113, // energy
				114, // hyperspace
				120, // laser
				121, // ionic
				122, // plasma
				199 // graviton
			];
			var limits = [12, 8, 12, 5, 7, 1];
			var tech=0;
			for (var i in gids) {
				try {
					tech = response.match(new RegExp("gid="+gids[i]+".{0,50}Nivel (\\d+) ?\\)"))[1];
				} catch(e) {}
				if (tech>=limits[i]) blockTech(gids[i]);
				tech=0;
			}
		}

		// Save technologies
		var techsSaved = ['computacion', 'militar', 'defensa', 'blindaje'];
		var techsSavedIds = [108, 109, 110, 111];
		var tech=0;
		for (var i in techsSaved) {
			try {
				tech = response.match(new RegExp("gid="+techsSavedIds[i]+".{0,50}Nivel (\\d+)\\)"))[1];
			} catch(e) {}
			if (tech!=0) {
				setTech(techsSaved[i], tech);
				if (!debugMode) GM_log('Tecnologia ' + techsSaved[i] + ' nivel ' + tech + ' guardada');
			}
			tech=0;
		}

		// motor techs for consumptions
		var combustion=0;
		var impulso=0;
		var hiper=0;

		try {
			combustion = response.match(/gid=115.{0,50}Nivel (\d+)\)/)[1];
		} catch(e) {}
		
		try {
			impulso = response.match(/gid=117.{0,50}Nivel (\d+)\)/)[1];
		} catch(e) {}
		
		try {
			hiper = response.match(/gid=118.{0,50}Nivel (\d+)\)/)[1];
		} catch(e) {}
		
		GM_setValue('velocidadesBase_'+location.hostname, [Math.round(impulso<5?5000*(1+combustion/10):10000*(1+impulso/5)), Math.round(7500*(1+combustion/10)), Math.round(12500*(1+combustion/10)), Math.round(10000*(1+impulso/5)), Math.round(15000*(1+impulso/5)), Math.round(10000*(1+hiper*0.3)), Math.round(2500*(1+impulso/5)), Math.round(2000*(1+combustion/10)), Math.round(100000000*(1+combustion/10)), Math.round(hiper<8?4000*(1+impulso/5):5000*(1+hiper*0.3)), 0, Math.round(5000*(1+hiper*0.3)), Math.round(100*(1+hiper*0.3)), Math.round(10000*(1+hiper*0.3))].join(':'));
	}
	
	else if (cuanticSection && getScriptConf('improvedCuantic')) {
		var coordsTable = locateFirst('//table[@border=1]');
		var timeLeft = locateFirst("//center[font[@color='#ff0000']]");
		if (coordsTable) {
			// Añadimos un espacio
			coordsTable.parentNode.insertBefore(document.createElement('br'), coordsTable);
			// Ponemos la tabla algo mas chula
			coordsTable.removeAttribute('border');
			coordsTable.width='519';
			var select = coordsTable.getElementsByTagName('select')[0];
			// Guardamos los codigos de planeta de las lunas
			var options = select.options;
			var moonCodes = thisPlanetCode;
			for (var i=0; i<options.length; i++) moonCodes = [moonCodes, options[i].value].join(';');
			setMoonList(moonCodes);
			// Ahora modificamos un poco la tabla
			select.removeAttribute('size');
			select.selectedIndex='0';
			var tds = coordsTable.getElementsByTagName('td');
			for (var i in tds) tds[i].className='f';
			var trs = coordsTable.getElementsByTagName('tr');
			// juntamos las dos filas en una
			trs[0].appendChild(tds[2]);
			trs[0].appendChild(tds[3]);
			trs[1].parentNode.removeChild(trs[1]);
			// ponemos un titulo
			var title = document.createElement('tr');
			title.appendChild(document.createElement('td'));
			title.firstChild.className='c';
			title.firstChild.innerHTML='Coordenadas de origen y destino';
			title.firstChild.colSpan=4;
			trs[0].parentNode.insertBefore(title, trs[0]);
			// creamos un desplegable también para el origen
			var select2 = select.cloneNode(true);
			select2.removeAttribute('name');
			select2.setAttribute('onchange', 'haha(this)');
			var selectPlanet = document.getElementsByTagName('select')[0];
			var selectedPlanet = selectPlanet.options[selectPlanet.selectedIndex].cloneNode(true);
			for (var i in select2.options) {
				select2.options[i].value = selectedPlanet.value.replace(/(cp=)\d+/, '$1'+select2.options[i].value);
			}
			select2.insertBefore(selectedPlanet, select2.firstChild);
			tds[2].innerHTML='';
			tds[2].appendChild(select2);

			var shipsTable = coordsTable.nextSibling.nextSibling.lastChild;
			//Le ponemos un nombre al formulario para usarlo mas facilmente.
			shipsTable.parentNode.parentNode.setAttribute("name", "salto");
			shipsTable.rows[0].cells[0].setAttribute("colspan","4");
			shipsTable.rows[shipsTable.rows.length - 1].cells[0].setAttribute("colspan","4");

			title = shipsTable.rows[0].cloneNode(true);
			shipsTable.insertBefore(title, shipsTable.rows[1]);
			title.innerHTML = "<th>Naves</th><th>Disponibles</th><th>-</th><th>-</th>";
			
			var todas = '';
			var ninguna = '';
			for(var i = 2; i < shipsTable.rows.length - 1; i++) {
				matches = shipsTable.rows[i].cells[0].innerHTML.match(/(.*)\((\d+)/);
				cantidad = matches[2];
				texto = matches[1];
				nombre = shipsTable.rows[i].cells[1].firstChild.name;
				//if (getScriptConf('cuanticAllShips')) shipsTable.rows[i].cells[1].firstChild.value=cantidad;

				//Modificamos el nombre de las naves, quedando unicamente el nombre sin la cantidad disponible.
				shipsTable.rows[i].cells[0].innerHTML = texto;
				//Agregamos una celda indicando la cantidad disponible.
				nodo = shipsTable.rows[i].cells[0].cloneNode(true);
				shipsTable.rows[i].insertBefore(nodo, shipsTable.rows[i].cells[shipsTable.rows[i].cells.length - 1]);
				nodo.innerHTML = cantidad;
				//Agregamos una celda con un boton para seleccionar el maximo.
				nodo = shipsTable.rows[i].cells[0].cloneNode(true);
				nodo.innerHTML = '';
				shipsTable.rows[i].insertBefore(nodo, shipsTable.rows[i].cells[shipsTable.rows[i].cells.length - 1]);
				if (getScriptConf('proInputs')) {
					var a = document.createElement("a");
					a.setAttribute("href", "javascript:void(salto."+nombre+".value="+cantidad+");");
					a.innerHTML = "&infin;";
					nodo.appendChild(a);

					var a = document.createElement("a");
					a.style['cursor'] = 'pointer';
					a.setAttribute("onmousedown", "pressed=true;cambiar('"+nombre+"', true, "+cantidad+")");
					a.setAttribute("onmouseout", "if (pressed=true) {pressed=false; contador=5; incremento=1;}");
					a.setAttribute("onmouseup", "pressed=false; contador=5; incremento=1;");
					a.innerHTML='+';
					nodo.appendChild(a);

					var a = document.createElement("a");
					a.style['cursor'] = 'pointer';
					a.setAttribute("onmousedown", "pressed=true;cambiar('"+nombre+"', false, "+cantidad+")");
					a.setAttribute("onmouseout", "if (pressed=true) {pressed=false; contador=5; incremento=1;}");
					a.setAttribute("onmouseup", "pressed=false; contador=5; incremento=1;");
					a.innerHTML = "&minus;";
					nodo.appendChild(a);

					var a = document.createElement("a");
					a.setAttribute("href", "javascript:void(salto." + nombre + ".value=0);");
					a.innerHTML = "&bull;";
					nodo.appendChild(a);
				}
				else
					nodo.innerHTML = "<a href=\"javascript:void();\" onclick=\"salto." + nombre + ".value='" + cantidad + "';\" >m&aacute;x</a>";
				todas = todas + "salto." + nombre + ".value='" + cantidad + "';";
				ninguna = ninguna + "salto." + nombre + ".value='0';";
			}
			nodo = shipsTable.rows[0].cloneNode(true);
			shipsTable.insertBefore(nodo, shipsTable.rows[shipsTable.rows.length - 1]);
			nodo.innerHTML = "<th colspan='2'><a href=\"javascript:void();\" onclick=\"" + ninguna + "\">Ninguna nave</a></th><th colspan='2'><a href=\"javascript:void();\" onclick=\"" + todas + "\">Todas las naves</a></th>";
		}
		else if (timeLeft) {
			unsafeWindow.t = function t() {
				minDiv = document.getElementById('min');
				secDiv = document.getElementById('sec');
				min = parseInt(minDiv.innerHTML, 10);
				sec = parseInt(secDiv.innerHTML, 10);

				if (sec == 0)
					if (min == 0) {
						minDiv.innerHTML = '-';
						secDiv.innerHTML = '-';
						document.location.reload();
						return;
					}
					else {
						minDiv.innerHTML = min-1;
						secDiv.innerHTML = '59';
					}
				else {
					secDiv.innerHTML = sec-1;
				}
				unsafeWindow.setTimeout("t();", 999);
			}
			
			var time = timeLeft.innerHTML.match(/(\d+)/g);
			var tabla = document.createElement('table');
			tabla.width = '519';
			tabla.innerHTML = "<tbody><tr><td class='c'>"+timeLeft.firstChild.firstChild.nodeValue+"</td></tr>";
			tabla.innerHTML += "<tr><th>" +
					timeLeft.firstChild.lastChild.nodeValue.replace(/(\d+)([\s\S]* )(\d+)/, '<b id=min>$1</b> $2<b id=sec>$3</b> ') +
					"</th></tr></tbody>";
			timeLeft.parentNode.insertBefore(document.createElement('br'), timeLeft);
			timeLeft.parentNode.insertBefore(tabla, timeLeft);
			timeLeft.parentNode.removeChild(timeLeft);
			unsafeWindow.t();
		}
	}
	
	else if (getScriptConf('proInputs') && (hangarSection || defenseSection)) {
		var inputs = locateSnapshot("//div[@id='content']//input[@type='text' or not(@type)]");

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
	
	var element = locateFirst("//table[@id='resources']/tbody/tr[3]").getElementsByTagName('td');

	if (hangarSection || defenseSection) {
		if (GM_getValue('sinConstruir', '')=='') {
			if (getScriptConf('SYConst')) {
				element[0].innerHTML+= "<br/><font color=lightgreen id='metalRestante' title='Metal restante'>"+puntuar(metal)+"</font>";
				element[1].innerHTML+= "<br/><font color=lightgreen id='cristalRestante' title='Cristal restante'>"+puntuar(cristal)+"</font>";
				element[2].innerHTML+= "<br/><font color=lightgreen id='deuterioRestante' title='Deuterio restante'>"+puntuar(deuterio)+"</font>";

				var inputs = locateSnapshot("//div[@id='content']//input[@type='text' or not(@type)]");
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
						else if (recursos[j].previousSibling.nodeValue.indexOf('Deuterio')!=-1)
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
					if (debugMode) GM_log('Recursos restantes:\nmetal: '+metalNew+' cristal: '+cristalNew+' deuterio: '+deuterioNew);
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
				var elements = locateSnapshot("//td[@class='l' and position()=2]/a");
				
				var more = document.createElement('img');
				more.src = moreButton;
				more.style['cursor']='pointer';
				more.title = 'Mostrar unidad';
				more.setAttribute('onclick', 'delHiddenShip(this.parentNode.parentNode.id)');
				
				var less = document.createElement('img');
				less.src = lessButton;
				less.style['cursor']='pointer';
				less.title = 'Ocultar unidad';
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

	else if (getScriptConf('colorBuild') && !cuanticSection) {
		element = locateFirst("//div[@id='content']//table/tbody/tr/td/table/tbody").getElementsByTagName('b');
		var coord=document.getElementsByTagName('select')[0];
		coord = coord.options[coord.selectedIndex].text.replace(/(.*)\[(.*)\].*/, '$1:$2').split(':');
		var planetType=0;
		try {
			coord[0].match(/Luna/i)[0];
			planetType=1;
		} catch (e) {}
		var galaxy=coord[1];
		var system=coord[2];
		var planet=coord[3];
		
// 		var string='document.getElementById';
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
			else if (element[i].previousSibling.nodeValue.indexOf('Deuterio')!=-1) {
				resta=deuterio-parseInt(element[i].innerHTML.replace(/\./g, ''), 10);
 				cadena='deuterio';
			}
			else if (element[i].previousSibling.nodeValue.indexOf('Energía')!=-1)
				resta=energia-parseInt(element[i].innerHTML.replace(/\./g, ''), 10);
			if (resta<0) {
				element[i].innerHTML = element[i].innerHTML.replace(/(.*)/, "<span style='cursor:pointer' class='noresources' title="+puntuar(resta)+">$1</span>");
				if (cadena!='') {
					element[i].firstChild.setAttribute('onclick',"RT.resources='" + [cadena, Math.abs(resta), [galaxy,system,planet,planetType].join(':')].join(';') + "';");
				}
			}
		}
	}
		
		// COLA DE EDIFICIOS
/*		
		Se podria guardar la cola como una lista con pares codigoPlaneta-listaCodigosConstruccion
		Al cargar la pagina de construcciones, si el cp tiene una lista asociada y no se esta construyendo nada, se intenta construir.
		Problema para diferenciar construcciones de investigaciones, se puede construir edificios y no hacer investigaciones...
		Listas separadas? Parece ser la solucion mejor
		
		
		Cuando se carga la pagina, mirar si los edificios de la cola estan construidos, hasta q encontremos uno que no
		
		
		
		// orden para cancelar la construccion
		index.php?page=b_building&session=4851d2891fe6&unbau=31&cp=34015282
		pp=&quot;454&quot;;				// tiempo en segundos para finalizar construccion
		pk=&quot;31&quot;;				// codigo de la construccion
		pl=&quot;34015282&quot;;		// codigo del planeta
		ps=&quot;4851d2891fe6&quot;;	// sesion
*/	

		function storeBuilding(gid, gname, glevel) {
			GM_log('planeta[' + thisPlanetCode + '] gid['+gid+'] gname['+gname+'] nivel ['+ glevel +'] at['+new Date().getTime()+']')
		}

		if (buildingsSection) {
			// guardamos los nombres de los edificios
			var gidNames = locateSnapshot("//div[@id='content']//td[2]/a");
			for (var i=0; i<gidNames.snapshotLength; i++) {
				var gid = gidNames.snapshotItem(i).href.match(/gid=(\d+)/)[1];
				var gname = gidNames.snapshotItem(i).innerHTML;
				var glevel = gidNames.snapshotItem(i).nextSibling.nodeValue;
				if (glevel) glevel = glevel.match(/\d+/)[0];
				else glevel = 0;
				storeBuilding(gid, gname, glevel);
				setGidTag(gid, gname);
			}

			var building = document.getElementById('bxx');
			// && building && getScriptConf('buildingList')
			// guardamos el tiempo que falta para acabar la construccion
			var time = new Date();
			setBLStatus(thisPlanetCode, time.getTime()+unsafeWindow.pp*1000);

			
			// ponemos las pestañas
			var tab = locateFirst("//div[@id='header_top']/center/table/tbody");
			tab = tab.appendChild(document.createElement('tr'));
			tab.innerHTML = "<td onclick='tab.position=\"content\"' class='c'>Construcciones</td><td onclick='tab.position=\"buildingList\"' class='b' style='cursor:pointer'>Cola de construcción (<font>0</font> edificios en la cola)</td>";
			tab.firstChild.id = 'contentTab';
			tab.lastChild.id = 'buildingListTab';
			
			unsafeWindow.tab = {position:"content"};
			unsafeWindow.tab.watch("position", function(id, oldval, newval) {
				if (oldval != newval) {
					var aux = document.getElementById(oldval+'Tab');
					aux.className='b';
					aux.style['cursor']='pointer';
					aux = document.getElementById(newval+'Tab');
					aux.className='c';
					aux.style['cursor']='';
					document.getElementById(oldval).style['display']='none';
					document.getElementById(newval).style['display']='';
				}
				return newval;
			});

			var content = document.getElementById('content');
			var buildingList = document.createElement('div');
			content.parentNode.insertBefore(buildingList, content);
			buildingList.id = 'buildingList';
			buildingList.style['display']='none';
			buildingList.style['position']='absolute';
			buildingList.style['top']='91px';
			buildingList.style['left']='350px';
			var table = buildingList.appendChild(document.createElement('table'));
			var inputFields = locateSnapshot("//div[@id='content']//tr/td[@class='k']");
			for (var i=0; i<inputFields.snapshotLength; i++) {
				if (inputFields.snapshotItem(i).innerHTML=='') {
					var building = inputFields.snapshotItem(i).previousSibling.firstChild;
					var gid = building.href.match(/gid=(\d+)/)[1];
					building.id = gid;
					inputFields.snapshotItem(i).innerHTML="<a style='cursor:pointer' onclick='buildingList.buildings="+gid+";'>Añadir a la cola de construcción</a>";
				}
			}
			
			var loading = true;
			unsafeWindow.buildingList = {buildings:[], levels:[]};
			unsafeWindow.buildingList.watch("buildings", function(id, oldval, newval) {
				try {
					var values = newval.split(':');
					if (values[1]) {
						newval = values[0];
						var levelWanted = parseInt(values[1]);
					}
				}catch(e){}
				if (newval > 0) {
					var list = document.createElement('tr');
					table.appendChild(list);
					var building = document.getElementById(newval);
					var currentLevel = 0;
					try {
						currentLevel = parseInt(building.nextSibling.nodeValue.match(/\d+/)[0]);
					}catch(e){}
					var level = currentLevel+1+oldval.filter(function(element, ind, arr) {return element==newval}).length;
					if (!levelWanted || levelWanted>currentLevel) {
						unsafeWindow.buildingList.levels=unsafeWindow.buildingList.levels.concat(level);
						list.innerHTML = "<td onclick='buildingList.buildings=\"-\"+this.innerHTML' width='40' style='cursor:pointer' title='Eliminar de la cola'>"+(oldval.length+1)+"</td>" +
							"<td onclick='' width='300'>"+building.innerHTML +
							' (Nivel <font>'+level+'</font>)' +
							"</td>";
						oldval = oldval.concat(newval);
					}
				}
				else {
					var deletedRow = table.childNodes[-newval-1];
					for (var aux=deletedRow; aux!=null; aux=aux.nextSibling)
						aux.firstChild.innerHTML=parseInt(aux.firstChild.innerHTML)-1;
					table.removeChild(deletedRow);
					var deletedBuilding = oldval[-newval-1];
					oldval.splice(-newval-1, 1);
					unsafeWindow.buildingList.levels.splice(-newval-1, 1);
					for (var i=(-newval-1); i<oldval.length; i++)
						if (oldval[i]== deletedBuilding) {
							unsafeWindow.buildingList.levels[i]-=1;
							table.getElementsByTagName('tr')[i].lastChild.childNodes[1].innerHTML-=1;
						}
				}
				// guardar como variables de greasemonkey
				if (!loading) {
					setBuildings(thisPlanetCode, oldval, unsafeWindow.buildingList.levels);
					document.getElementById('buildingListTab').childNodes[1].innerHTML=oldval.length;
				}
				return oldval;
			});
			
			try {
				var blists = getBuildings(thisPlanetCode).split(';');
				var gids = blists[0].split('-');
				var levels = blists[1].split('-');
				for (var i=0; i<gids.length; i++) {
					if (i==gids.length-1) loading=false;
					unsafeWindow.buildingList.buildings=[gids[i], levels[i]].join(':');
				}
			}catch(e){GM_log('Error in buildings stack: '+e)}
			loading = false;
		}

}


else if (contentSection=='resources') {
	var T_Recursos = locateSnapshot("//div[@id='content']//font[@color]");

	var PMetal = T_Recursos.snapshotItem(T_Recursos.snapshotLength-4).innerHTML.replace(/\./g,'');
	var PCristal = T_Recursos.snapshotItem(T_Recursos.snapshotLength-3).innerHTML.replace(/\./g,'');
	var PDeut = T_Recursos.snapshotItem(T_Recursos.snapshotLength-2).innerHTML.replace(/\./g,'');

	var AlmM = T_Recursos.snapshotItem(T_Recursos.snapshotLength-8).innerHTML.replace(/k/, '000').replace(/\./g,'');
	var AlmC = T_Recursos.snapshotItem(T_Recursos.snapshotLength-7).innerHTML.replace(/k/, '000').replace(/\./g,'');
	var AlmD = T_Recursos.snapshotItem(T_Recursos.snapshotLength-6).innerHTML.replace(/k/, '000').replace(/\./g,'');

	if (getScriptConf('imperium')) {
		GM_log('Planeta '+thisPlanetCode+' produccion '+[PMetal, PCristal, PDeut].join('/'));
	}
	
	if (getScriptConf("improvedResources")) {
		// buscamos los satelites para indicar la energia aportada por cada uno
		try {
			var satEnergy = document.getElementsByName("last212")[0].parentNode.parentNode.getElementsByTagName('th');
			var satCount = satEnergy[0].innerHTML.match(/\d+/);
			var satProdEnergy = satEnergy[satEnergy.length-2].lastChild.lastChild.innerHTML.replace(/[\s\.]/g,'');
			var satFactor = 10-satEnergy[satEnergy.length-1].childNodes[1].selectedIndex;
			var individualEnergy = satEnergy[satEnergy.length-2].lastChild.appendChild(document.createElement('font'));
			individualEnergy.color = '#00ffaa';
			individualEnergy.innerHTML = ' ('+Math.round((satProdEnergy * 10 / satFactor) / satCount)+')';
			individualEnergy.title = 'Energía producida por cada satélite';
			individualEnergy.style['cursor']='pointer';
		} catch(e) {}
		
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
		var ResForm = locateFirst('//table[@width=550]');

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
				'<td class="c">Nivel de Producci&oacute;n</td>'+
				'<th>'+Factor+'%</th>'+
				'<th width="250"><div style="border: 1px solid #9999FF; width: 250px;"><div id="prodBar" style="background-color: 		'+(Factor < 100 ? '#C00000' : '#00C000' )+'; width: 0px;">&nbsp;</div></div></th>'+
				'</tr></table><br />';
		
			var EAlmM=(metal / AlmM) * 100;
			var EAlmMPorc=parseInt((metal / AlmM) * 250, 10);
			var EAlmC=(cristal / AlmC) * 100;
			var EAlmCPorc=parseInt((cristal / AlmC) * 250, 10);
			var EAlmD=(deuterio / AlmD) * 100;
			var EAlmDPorc=parseInt((deuterio / AlmD) * 250, 10);

			EAlmM = Math.round(EAlmM);
			EAlmC = Math.round(EAlmC);
			EAlmD = Math.round(EAlmD);

			unsafeWindow.puntuar = puntuar;

			var CuentaRec = document.createElement('div');
			CuentaRec.innerHTML = '<br /><table width="550">'+
				'<tr><td class="c" colspan="4">Producción extendida</td></tr>'+
				'<tr><th width=22%>&nbsp;</th>'+
				'<td width=26% class="c" align=center>Metal</td>'+
				'<td width=26% class="c" align=center>Cristal</td>'+
				'<td width=26% class="c" align=center>Deuterio</td>'+
				'</tr><tr>' +

					
				'<td class="c" colspan="4">Producción</td>'+
				'</tr><tr>'+
				'<td class="c" align=center>Diaria</td>'+
				'<th><font color="#00ff00">'+puntuar(XMetal[0])+'</font></th>'+
				'<th><font color="#00ff00">'+puntuar(XCristal[0])+'</font></th>'+
				'<th><font color="#00ff00">'+puntuar(XDeut[0])+'</font></th>'+
				'</tr><tr>'+
				'<td class="c" align=center>Semanal</td>'+
				'<th><font color="#00ff00">'+puntuar(XMetal[1])+'</font></th>'+
				'<th><font color="#00ff00">'+puntuar(XCristal[1])+'</font></th>'+
				'<th><font color="#00ff00">'+puntuar(XDeut[1])+'</font></th>'+
				'</tr><tr>'+
				'<td class="c" align=center>Mensual</td>'+
				'<th><font color="#00ff00">'+puntuar(XMetal[2])+'</font></th>'+
				'<th><font color="#00ff00">'+puntuar(XCristal[2])+'</font></th>'+
				'<th><font color="#00ff00">'+puntuar(XDeut[2])+'</font></th>'+
				'</tr><tr>' +

					
				'<td class="c" colspan="4">Calculadora de recursos</td>'+
				'</tr><tr>'+
					'<td class="c" title="Días y horas de producción" align=center onkeyup="' +
					'var dias = 0;' +
					'if (this.childNodes[0].value != \'\') ' +
					'dias = parseInt(this.childNodes[0].value,10);' +
					'var horas = 0;' +
					'if (this.childNodes[2].value != \'\') ' +
					'horas = parseInt(this.childNodes[2].value,10);' +
					'if (horas>=24) {' +
					'this.childNodes[2].value=horas%24;' +
					'this.childNodes[0].value=Math.floor(dias+horas/24); } ' +
					
					'this.parentNode.childNodes[1].firstChild.innerHTML=puntuar((dias*24+horas)*'+ PMetal +
					');this.parentNode.childNodes[2].firstChild.innerHTML=puntuar((dias*24+horas)*'+ PCristal +
					');this.parentNode.childNodes[3].firstChild.innerHTML=puntuar((dias*24+horas)*'+ PDeut +
					');"><input value="0" size="2" type=text />&nbsp;D&nbsp;&nbsp;&nbsp;&nbsp;<input value="0" size="2" type=text /> H</td>'+
				'<th><font color="#00ff00">0</font></th>'+
				'<th><font color="#00ff00">0</font></th>'+
				'<th><font color="#00ff00">0</font></th>'+
				'</tr><tr>'+

					
				'<td class="c" colspan="4">Almacenes</td>'+
				'</tr><tr>' +
				'<td class="c" align=center title="Capacidad de los almacenes">Estado</td>'+
					'<th><div title="'+EAlmM+'%" style="cursor: pointer; border: 1px solid #9999FF;"><div id="AlmMBar" style="background-color: '+(EAlmM > 100 ? '#C00000' : '#00C000' )+'; width: 0%;">'+EAlmM+'%</div></div></th>'+
					'<th><div title="'+EAlmC+'%" style="cursor: pointer; border: 1px solid #9999FF;"><div id="AlmCBar" style="background-color: '+(EAlmC > 100 ? '#C00000' : '#00C000' )+'; width: 0%;">'+EAlmC+'%</div></div></th>'+
					'<th><div title="'+EAlmD+'%" style="cursor: pointer; border: 1px solid #9999FF;"><div id="AlmDBar" style="background-color: '+(EAlmD > 100 ? '#C00000' : '#00C000' )+'; width: 0%;">'+EAlmD+'%</div></div></th>'+
				'</tr><tr>' +
				'<td class="c" align=center title="Tiempo restante para llenar cada almacén">LLenado en:</td>'+
				'<th>'+tiempo2str(AlmM, metal, PMetal)+'</th>' +
				'<th>'+tiempo2str(AlmC, cristal, PCristal)+'</th>' +
				'<th>'+tiempo2str(AlmD, deuterio, PDeut)+'</th>' +
				'</tr></table><br />';

			ResForm.parentNode.insertBefore(CuentaRec, ResForm.nextSibling);
			ResForm.parentNode.insertBefore(ProdFact, ResForm);
			document.getElementById('ressourcen').previousSibling.nodeValue='';
			
			function colorBar(porcentaje){
				if(porcentaje >= 100){
					return "rgb(255, 0, 0);";
				} else {
					var fstColor = Math.floor(2.55*porcentaje);
					var sndColor = Math.floor(2.55*(100-porcentaje));
					return "rgb("+fstColor+", "+sndColor+", 0);";
				}
			}
			
			if (getScriptConf('specialEffects')) {
				function fillBar(ids, percents) {
					idList = ids.split(':');
					perList = percents.split(':');
					var continuar = false;
					for (var i=0; i<idList.length; i++) {
						var bar = document.getElementById(idList[i]);
						var width = parseInt(bar.style['width'].split('%')[0], 10);
						if (width<perList[i]) {
							bar.style['width'] = String(width+Math.max(perList[i]/50,1)) + '%';
							if (i==0) width=100-width;
							bar.style['background'] = colorBar(width);
							continuar = true;
						}
					}
					if (continuar) setTimeout('fillBar("'+ids+'", "'+percents+'")', 40);
				}
			}
			else {
				function fillBar(ids, percents) {
					idList = ids.split(':');
					perList = percents.split(':');
					for (var i=0; i<idList.length; i++) {
						var bar = document.getElementById(idList[i]);
						bar.style['width'] = String(perList[i]) + '%';
						if (i==0) bar.style['background'] = colorBar(100-perList[i]);
						else bar.style['background'] = colorBar(perList[i]);
					}
				}
			}
			unsafeWindow.fillBar = fillBar;
			setTimeout('fillBar("'+["prodBar","AlmMBar","AlmCBar", "AlmDBar"].join(":")+'", "'+[Math.min(Factor, 100),Math.min(EAlmM, 100),Math.min(EAlmC, 100),Math.min(EAlmD, 100)].join(":")+'")', 100);
		}
	}
}

else if (contentSection=='flotten1') {
	var recursos = metal + cristal + deuterio;
	
	function calculate() {
		var capacity=0;
		var speed=0;
		var consumption=0;
		for(i=202; i<216; i++){
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
			try {
				cp = document.getElementsByName('maxship202')[0].value;
			} catch (e) {}
			try {
				cg = document.getElementsByName('maxship203')[0].value;
			} catch (e) {}
			surstr += '&nbsp;&nbsp;<font color="orangered" title="Cargueros pequeñas"> CP: ' +
						puntuar(Math.ceil((recursos-capacity)/5000)) +
						(capacity==0?' (' + cp + ')':'') + '</font>' +
						'&nbsp;&nbsp;<font color="orange" title="Cargueros grandes"> CG: ' +
						puntuar(Math.ceil((recursos-capacity)/25000)) +
						(capacity==0?' (' + cg + ')':'') + '</font>';
		} else {
			surstr='0';
		}
		infoRow.innerHTML= '<font color="#9999FF">Recursos restantes: ' + surstr + '</font>' +
						(capacity>0?'&nbsp;&nbsp;<font color="#00FF66">Capacidad: '	+ puntuar(capacity) + '</font>' +
						'<br /><font color="lightblue">Velocidad máx: ' + puntuar(speed) + '</font>' +
						'&nbsp;&nbsp;<font color="#77bb22">Consumo: ' + puntuar(consumption) + '</font>':'');
	}

	unsafeWindow.pressEnter=function (e) {
		return e.which==13;
	}
	document.body.setAttribute('onkeypress', 'if (pressEnter(event)) document.forms[document.forms.length-1].submit()');
	var usingNGC = document.getElementById('RTCargoType').selectedIndex==0;
	if (document.getElementById('resourcesTable').style['display']=='') {
		if (document.getElementsByName('maxship'+(usingNGC?'203':'202'))[0]) {
			var metal2 = document.getElementById('RTmetal').value;
			var cristal2 = document.getElementById('RTcristal').value;
			var deuterio2 = document.getElementById('RTdeuterio').value;
			var maxships = parseInt(document.getElementsByName('maxship'+(usingNGC?'203':'202'))[0].value, 10);
		
			var ships = Math.ceil((Math.min(parseInt(metal,10),metal2) +
								Math.min(parseInt(cristal,10),cristal2) +
								Math.min(parseInt(deuterio,10),deuterio2))/document.getElementsByName('capacity'+(usingNGC?'203':'202'))[0].value);
			if (maxships<ships) {
				alert('Faltan '+String(ships-maxships)+' cargueros '+(usingNGC?'grandes':'pequeños'));
				ships = maxships;
			}
			document.getElementsByName('ship'+(usingNGC?'203':'202'))[0].value = ships;
		}
	} else if (getScriptConf('transportMode')) {
		var trans = document.createElement('th');
		trans.colSpan='2';
		var aux = locateFirst("//div[@id='content']//form//table//input[@type='submit']");
		aux.parentNode.parentNode.insertBefore(trans, aux.parentNode);
		aux.colSpan='2';
		var TMOn = getScriptConf('transportModeEnabled');
		trans.innerHTML="<input type='checkbox' "+(TMOn?'checked':'')+" onclick='setScriptConf(\"transportModeEnabled\", this.checked)'/> Modo transporte";
		if (TMOn) {
			try{
				document.getElementsByName('ship203')[0].value = Math.min(Math.ceil((metal+cristal+deuterio)/25000), document.getElementsByName('maxship203')[0].value);
			}catch(e){}
		}
	}

	if (getScriptConf('coordLinker')) {
		var coords = locateSnapshot("//a[text()='["+thisCoords+"]']");
		for (var i=0; i<coords.snapshotLength; i++) coords.snapshotItem(i).style['color']=getScriptConf('coordLinkerCF');
	}

	if (getScriptConf('flottenInfo')) {
		unsafeWindow.calculate = calculate;

		var infoRow = locateFirst("//div[@id='content']//center/form/table[last()]/tbody").getElementsByTagName('tr');

		var as = infoRow[infoRow.length-3].getElementsByTagName('a');
		for (var i=0; i<as.length; i++)
			as[i].setAttribute('onclick', 'setTimeout(calculate, 20)');
		infoRow = infoRow[infoRow.length-1].firstChild;
		calculate();
//		document.getElementsByTagName('tbody')[4].setAttribute('onchange', 'alert(1)');
		for(i=202; i<216; i++){  // quiza se podria reducir los bucles de busqueda cogiendo directamente esa columna
			x=document.getElementsByName("ship"+i);
			if(x.length){
				x[0].addEventListener('keyup',calculate,true);
				x[0].parentNode.previousSibling.previousSibling.firstChild.setAttribute('onclick', 'setTimeout(calculate, 20)');
				x[0].setAttribute('onchange', "this.value=parseInt(Math.min(parseInt('0'+this.value, 10), parseInt(getElementsByName('max'+this.name)[0].value, 10)),10);setTimeout(calculate, 10)");
			}
		}
	}
	
	if (getScriptConf('proInputs')) {
		var cells = locateSnapshot("//div[@id='content']//form/table/tbody/tr/th[a='máx']");

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

	if (getScriptConf('colapseFlights')) {
		var hidden = getBooleanConf('hiddenFlights', contentSection);
		
		var more = document.createElement('img');
		more.src = moreButton;
		more.style['cursor']='pointer';
		if (!hidden) more.style['display']='none';
		more.title = 'Mostrar vuelos';
		more.id = 'flight_plus';
		more.setAttribute('onclick', "delFlightsHidden('"+contentSection+"')");
				
		var less = document.createElement('img');
		less.src = lessButton;
		less.style['cursor']='pointer';
		if (hidden) less.style['display']='none';
		less.title = 'Ocultar vuelos';
		less.id = 'flight_minus';
		less.setAttribute('onclick', "setFlightsHidden('"+contentSection+"')");

		var flights = locateSnapshot("//div[@id='content']//center/table/tbody/tr[th]");
		var flightsHeader = locateFirst("//div[@id='content']//center/table/tbody/tr[1]/td[@class='c']");
		flightsHeader.innerHTML = flightsHeader.getElementsByTagName('td')[0].innerHTML.replace(/\n/g, '').replace(/max. /, flights.snapshotLength-1+'/');
		flightsHeader.insertBefore(more, flightsHeader.firstChild);
		flightsHeader.insertBefore(less, flightsHeader.firstChild);

		for (var i=0; i<flights.snapshotLength; i++) {
			flights.snapshotItem(i).id = 'flight' + i;
			if (hidden) flights.snapshotItem(i).style['display'] = 'none';
		}
	}

	if (getScriptConf('imperium')) {
		
	}
}

else if (contentSection=='flotten2') {
	if (getScriptConf('preDest') && GM_getValue('coordList_'+server, '')!='') {
/*	if (getScriptConf('colapseFlights')) {
		var hidden = getBooleanConf('hiddenFlights', contentSection);
		
		var more = document.createElement('img');
		more.src = moreButton;
		more.style['cursor']='pointer';
 		if (!hidden) more.style['display']='none';
		more.title = 'Mostrar vuelos';
		more.id = 'flight_plus';
		more.setAttribute('onclick', "delFlightsHidden('"+contentSection+"')");

		var less = document.createElement('img');
		less.src = lessButton;
		less.style['cursor']='pointer';
		if (hidden) less.style['display']='none';
		less.title = 'Ocultar vuelos';
		less.id = 'flight_minus';
		less.setAttribute('onclick', "setFlightsHidden('"+contentSection+"')");

		var flightsHeader = locateFirst("//div[@id='content']//tr[position()>1]/td[@class='c']");
		flightsHeader.appendChild(more);
		flightsHeader.appendChild(less);
		flightsHeader.appendChild(flightsHeader.firstChild);

		var flights = locateSnapshot("//div[@id='content']//tr[@class]");
		var numFlights = document.createElement('font');
		numFlights.id = 'numFlights';
		numFlights.innerHTML=' ('+flights.snapshotLength+' vuelos)';
		if (!hidden) numFlights.style['display']='none';
		flightsHeader.appendChild(numFlights);

		for (var i=0; i<flights.snapshotLength; i++) {
			flights.snapshotItem(i).id = 'flight' + i;
			if (hidden) flights.snapshotItem(i).style['display'] = 'none';
		}
	}*/
		var pos = locateSnapshot("//form/center/table/tbody/tr[td[@class]]");
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
	if (document.getElementById('resourcesTable').style['display']=='') {
		document.getElementsByName('galaxy')[0].value = document.getElementById('RTGalaxy').value;
		document.getElementsByName('system')[0].value = document.getElementById('RTSystem').value;
		document.getElementsByName('planet')[0].value = document.getElementById('RTPlanet').value;
		document.getElementsByName('planettype')[0].value = document.getElementById('RTDestType').value;
	}
	else if (getScriptConf('transportModeEnabled')) {
		var temp = getScriptConf("TMDestination");
		if (temp == "0;0;0;1") {
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

else if (contentSection=='flotten3') {
	unsafeWindow.pressEnter=function (e) {
		return e.which==13;
	}
	document.body.setAttribute('onkeypress', 'if (pressEnter(event)) document.forms[0].submit()');
	if (document.getElementById('resourcesTable').style['display']=='') {
		var recNeeded = new Array(document.getElementById('RTmetal'),
					document.getElementById('RTcristal'),
					document.getElementById('RTdeuterio'));
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
			for (var i=0; i<3; i++) {/*
				if (parseInt(rec[i].value, 10) >= parseInt(recNeeded[i].value, 10)) {
					recNeeded[i].value = '0';
				}
				else {
					recNeeded[i].value = parseInt(recNeeded[i].value, 10) - parseInt(rec[i].value, 10);
				}*/
				GM_log(recNeeded[i].id.split('RT')[1]+';-'+parseInt(rec[i].value, 10))
				unsafeWindow.RT.resources = recNeeded[i].id.split('RT')[1]+';-'+parseInt(rec[i].value, 10);
			}
			//document.getElementById('resourcesTable').onchange();
			document.getElementById('total').innerHTML=Math.ceil((parseInt(recNeeded[0].value, 10)+parseInt(recNeeded[1].value, 10)+parseInt(recNeeded[2].value, 10))/25000);
		}
		document.forms[0].setAttribute('onsubmit', "enviar()");
	}
	else if (getScriptConf('transportModeEnabled')) {
		unsafeWindow.maxResources();
	}
	unsafeWindow.calculateTransportCapacity();
}

/*else if (contentSection=='flottenversand') {
	var recNeeded = new Array(document.getElementById('metal'),
				document.getElementById('cristal'),
				document.getElementById('deuterio'));
	if (parseInt(recNeeded[0].value, 10) + parseInt(recNeeded[1].value, 10) + parseInt(recNeeded[2].value, 10) == 0) {
		document.getElementById('resourcesTable').style['display']='none';
		if (getScriptConf('transportMode')) document.getElementById('trTrans').style['display']='';
	}
}*/

else if (contentSection=='galaxy') {
	element = locateFirst("//div[@id='content']//form/input");
	var session = element.value;
	var colspan = content.getElementsByTagName('table')[3].getElementsByTagName('td')[0].colSpan;
	var galaxy = document.getElementsByName('galaxy')[0].value;
	var system = document.getElementsByName('system')[0].value;
	
	if(getScriptConf('preDest')) {
		var planets = locateSnapshot("//div[@id='content']//center/table/tbody/tr[th[2]/a]/th[position()=1 or position()=last()-5]");
		for (i=0; i<planets.snapshotLength-1; i+=2) {
			var planet = planets.snapshotItem(i).getElementsByTagName('a')[0];
			var name = planets.snapshotItem(i+1).getElementsByTagName('a');
			if (name[0]) name = name[0].innerHTML.replace(/\n/g, '');
			else name = planets.snapshotItem(i+1).innerHTML.replace(/\n/g, '');
			planet.setAttribute('onclick', 'if (addCoords("'+[galaxy, system, planet.innerHTML].join(':')+'", "'+ name.split('&nbsp')[0] +'")) {this.style["color"]="'+getScriptConf('PDGColor')+'";this.title="Destino guardado"}');
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
				unsafeWindow.addToTable("hecho", "success");
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
				unsafeWindow.addToTable("ha ocurrido un error mientras se enviaba", "error");
				break;
			case "602":
				unsafeWindow.addToTable("no hay luna", "error");
				break;
			case "603":
				unsafeWindow.addToTable("el jugador está bajo la protección de novatos", "error");
				break;
			case "604":
				unsafeWindow.addToTable("el jugador es demasiado fuerte", "error");
				break;
			case "605":
				unsafeWindow.addToTable("el jugador está en modo vacaciones", "vacation");
				break;
			case "610":
				unsafeWindow.addToTable("solo hay "+retVals[1]+" sondas disponibles, enviando", "notice");
				break;
			case "611":
				unsafeWindow.addToTable("no hay sondas de espionaje disponibles", "error");
				break;
			case "612":
				unsafeWindow.addToTable("no puedes enviar más flotas", "error");
				break;
			case "613":
				unsafeWindow.addToTable("no tienes suficiente deuterio", "error");
				break;
			case "614":
				unsafeWindow.addToTable("no hay planeta", "error");
				break;
			case "615":
				unsafeWindow.addToTable("no hay suficiente combustible", "error");
				break;
			case "616":
				unsafeWindow.addToTable("multialarma", "error");
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
	td1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;<span id='missiles2'></span> Misiles interplanetarios"
			+ "&nbsp;&nbsp;&nbsp;&nbsp;<span id='recyclers2'></span> Recicladores"
			+ "&nbsp;&nbsp;&nbsp;&nbsp;<span id='probes2'></span> Sondas"
			+ "&nbsp;&nbsp;&nbsp;&nbsp;<span id='slots2'></span>/"+String(parseInt(getTech('computacion'))+1, 10)+" Flotas en mision"; 
	var status=document.getElementById("fleetstatusrow");
	status.parentNode.insertBefore(tabla, status);
	
	unsafeWindow.doit = function doit(order, galaxy, system, planet, planettype, shipcount){
		unsafeWindow.strInfo = "Enviando " + shipcount + (order==6?" sonda" + (shipcount>1?"s":""):" reciclador"
				+ (shipcount>1?"es":"")) + " a "+ galaxy + ":" + system + ":" + planet + (planettype==2?" -  Escombros":"")
				+ (planettype==3?" - Luna":"") + "...";
		unsafeWindow.ajax.requestFile = "index.php?ajax=1&page=flottenversand&session="+session;
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

	sondasPorDefecto = 1;
	try {
		sondasPorDefecto = document.body.innerHTML.match(/doit\(.*(\d+)\)/m)[1];
	} catch (e) {}
	if (getScriptConf('moonSpy')) {

		var moons = locateSnapshot("//div[@id='content']/center/center/table/tbody/tr/th[last()-4]/a");
		for (var i=0; i<moons.snapshotLength; i++) {
			attrib = moons.snapshotItem(i).getAttribute('onmouseover');
			attrib = attrib.replace(/<font color=#808080 >(.{1,10})<\/font>/, "<a style=\"cursor:pointer\" onclick=doit(6,"+ galaxy +","+ system +","+ attrib.split(']')[0].split(':')[2] + ",3," + sondasPorDefecto + ")>$1</a>");
			moons.snapshotItem(i).setAttribute('onmouseover', attrib);
		}
		
		var debrisFields = locateSnapshot("//div[@id='content']/center/center/table/tbody/tr/th[last()-3]/a");
		for (var i=0; i<debrisFields.snapshotLength; i++) {
			attrib = debrisFields.snapshotItem(i).getAttribute('onmouseover');
			var aux = debrisFields.snapshotItem(i).parentNode.parentNode.cells[0].getElementsByTagName('a')[1].title.replace(/\./g, '').match(/(\d+)/g);
			var escombros = parseInt(aux[0]) + parseInt(aux[1]);
			var recicles = parseInt(escombros/20000+1, 10);
			attrib = attrib.replace(/<font color=#808080 >(.{1,15})<\/font>/, "<a style=\"cursor:pointer\" onclick=doit(8,"+ galaxy +","+ system +","+ debrisFields.snapshotItem(i).parentNode.parentNode.cells[0].childNodes[1].innerHTML + ",2," + recicles + ") title=\""+recicles+ " reciclador" +(recicles>1?"es":"")+"\">$1</a>");
			debrisFields.snapshotItem(i).setAttribute('onmouseover', attrib);
		}
	}

	if (getScriptConf('debris')) {
		element = locateSnapshot("//center/table/tbody/tr[th[position()=1 and child::a[2]]]/th[last()-3]");
		for (var i=0; i<element.snapshotLength; i++) {
			escombros=element.snapshotItem(i).parentNode.cells[0].getElementsByTagName('a')[1].title.replace(/\./g, '').match(/\d+/g);
			GM_log(element.snapshotItem(i).parentNode.cells[0].getElementsByTagName('a')[0].innerHTML+'. Metal -> '+parseInt(escombros[0],10)+' Cristal -> ' + parseInt(escombros[1],10))
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
		var allys = locateSnapshot("//center/table/tbody/tr/th[last()-1]/a");
		var tags = GM_getValue('allyTags', defAllyTags).split(':x:');
		var tags2='';
// 		var options='';
		for (var i=0; i<tags.length; i++) {
			var subTags = tags[i].split(':y:');
			tags2+=subTags[2]+(i==tags.length-1?'':'|');
// 			options+="<option >"+subTags[0]+"</option>";
// 			options+="<option style='color:"+subTags[1]+"'>"+subTags[0]+"</option>";
		}
		tags2=tags2.replace(/([\.\[\]\(\)\{\}\$])/g,'\\$1');
		for (var i=0; i<allys.snapshotLength; i++) {
			var ally='';
			var tooltip = allys.snapshotItem(i).getAttribute('onmouseover');
			try {
				ally=allys.snapshotItem(i).innerHTML.match(new RegExp('   ('+tags2+') $', 'i'))[1];
			} catch (e) {}
			if (ally) { // coloreamos
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
				allys.snapshotItem(i).innerHTML=allys.snapshotItem(i).innerHTML.replace(new RegExp(ally, 'i'), '<font color='+(color2!=''?color2:color)+'>'+ally+'</font> '+etiquetas);

				tooltip = tooltip.replace(new RegExp(ally, 'i'), '<font color='+(color2!=''?color2:color)+'>'+ally+'</font> '+etiquetas)
				
			}
			// añado un menu para aplicar etiquetas
 			//tooltip = tooltip.replace('</td></tr></table></th></table>', '</td></tr><tr><td>Aplicar tag: <select><option >Etiqueta nueva...</option>'+options+'</select></td></tr></table></th></table>');
			allys.snapshotItem(i).setAttribute('onmouseover', tooltip);
		}
	}

	if (getScriptConf('coordLinker')) {
		var planeta;
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
			var link = locateFirst("//div[@id='content']//center/table/tbody/tr/th[a='"+planeta[1]+"']/a");
			if (link) link.style['color']=getScriptConf('coordLinkerCG');
		}
	}
	
	if (getScriptConf('galaxyTool')) {
		var nodo = document.createElement('a');
		nodo.innerHTML='GT';
		content.getElementsByTagName('table')[0].childNodes[1].childNodes[2].childNodes[1].appendChild(nodo);

		var rows=locateSnapshot("//div[@id='content']//center/table/tbody/tr/th/a/../..");
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
				if (moon[0]) content+=parseInt(moon[0].alt.split(': ')[1], 10); // añadimos el tamaño de la luna si la hay
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
		var solar_system = locateFirst('/html/body/center/table/tbody/tr/td/text()').nodeValue.replace(/\s/, '');
		sendGTool(nodo, 'galaxy&galaxy='+galaxy+'&system='+system, encodeURIComponent(solar_system+'\n\n'+content));
	}
}

else if (contentSection=='stat') {
	if (getScriptConf('allyTags')) {
		// cogemos las etiquetas a colorear, dependiendo de la pantalla de estadisticas en la que estemos
		var allys = locateSnapshot("//div[@id='content']//center/table/tbody/tr/th["+(document.getElementsByName('who')[0].selectedIndex=='0'?'4]/a':'2]/a'));
		// obtenemos las etiquetas a cambiar
		var tags = GM_getValue('allyTags', defAllyTags).split(':x:');
		var tags2='';
		for (var i=0; i<tags.length; i++) {
			tags2+=tags[i].split(':y:')[2]+(i==tags.length-1?'':'|');
		}
		// hacemos que los simbolos en los nombres no afecten a la expresion
		tags2=tags2.replace(/([\.\[\]\(\)\{\}\$])/g,'\\$1');
		for (var i=0; i<allys.snapshotLength; i++) {
			var ally='';
			try {
				ally=allys.snapshotItem(i).href.match(new RegExp('=('+tags2+')$', 'im'))[1];
			} catch (e) {}
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
				allys.snapshotItem(i).innerHTML='<font color='+(color2!=''?color2:color)+'>'+ally+'</font> '+etiquetas;
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

		var ranksN=locateSnapshot("/html/body/center[2]/table/tbody/tr/th[1]/text()[1]");
		var pointsN=locateSnapshot("/html/body/center[2]/table/tbody/tr/th[5]");
		if (who.selectedIndex=='0') {
			var playersN=locateSnapshot("/html/body/center[2]/table/tbody/tr/th[2]//text()[1]");
			var pIdsN=locateSnapshot("/html/body/center[2]/table/tbody/tr/th[3]");
			var allysN=locateSnapshot("/html/body/center[2]/table/tbody/tr/th[4]//text()[..=.]/.. | /html/body/center[2]/table/tbody/tr/th[position()=4 and .='']");

			for (var i=0; i<100; i++) {
				ranks+=(i==0?'&ranks=':'|')+parseInt(ranksN.snapshotItem(i).nodeValue, 10);
				players+=(i==0?'&players=':'|')+playersN.snapshotItem(i).nodeValue;
				pIds+=(i==0?'&pIds=':'|');
				try {
					pIds+=pIdsN.snapshotItem(i).innerHTML.match(/messageziel=(\d+)/m)[1];
				} catch (e) {}
				allys+=(i==0?'&alliances=':'|')+allysN.snapshotItem(i).innerHTML;
				points+= (i==0?'&points=':'|')+pointsN.snapshotItem(i).innerHTML;
			}
		}
		else {
			var membersN=locateSnapshot("/html/body/center[2]/table/tbody/tr/th[4]");
			var allysN=locateSnapshot("/html/body/center[2]/table/tbody/tr/th[2]//text()[..=.]/.. | /html/body/center[2]/table/tbody/tr/th[position()=4 and .='']");

			for (var i=0; i<100; i++) {
				ranks+=(i==0?'&ranks=':'|')+ranksN.snapshotItem(i).nodeValue;
				members+=(i==0?'&members=':'|')+membersN.snapshotItem(i).innerHTML;
				allys+=(i==0?'&alliances=':'|')+allysN.snapshotItem(i).innerHTML;
				points+= (i==0?'&points=':'|')+pointsN.snapshotItem(i).innerHTML;
			}		
		}
		sendGTool(nodo, 'stats&who=' + who.selectedIndex + '&what=' + what.selectedIndex, encodeURIComponent([ranks, players, pIds, allys, members, points].join('')));
	}
}

else if (contentSection == 'allianzen') {
	if ((document.URL.search('a=4')>-1) && getScriptConf('galaxyTool')) {
		var nodo=document.createElement('a');
		nodo.innerHTML='GT';
		var tabla = document.getElementsByTagName("table")[4];
		tabla.parentNode.insertBefore(nodo, tabla);
		sendGTool(nodo, "allyhistory", encodeURIComponent(tabla.innerHTML));
	}
	else if (getScriptConf('allyTable') && (document.URL.search('a=17')==-1)) {
		var nodo = locateFirst('//center/table/tbody/tr[th="Página principal"]/th[2]/a');
		if (nodo) {
			setScriptConf('foroAlly', nodo.innerHTML.replace(/:/g, ';'));
			document.getElementById('foroAlly').href=nodo.innerHTML;
		}
		nodo = locateFirst('//center/table/tbody/tr[th="Etiqueta"]/th[2]');
		if (nodo) {
			setScriptConf('allyName', nodo.innerHTML);
			document.getElementById('allyName1').innerHTML=nodo.innerHTML;
			document.getElementById('allyName2').innerHTML=nodo.innerHTML;
		}
		nodo = locateFirst('//center/table/tbody/tr[th="Correo circular"]');
		if (nodo) {
			setScriptConf('ATCCPriv', true);
			document.getElementById('ATCC').style['display']='';
			document.getElementById('allyTable').style['display']='';
		}
		else {
			setScriptConf('ATCCPriv', false);
			document.getElementById('ATCC').style['display']='none';
		}
	}
}

else if (contentSection == 'messages') {
	var DRAGOSIM = 0;
	var CSIM = 1;	
	
	var parser = new Array();
	// defensas
	parser['Lançador de Mísseis'] = new Array("&numunits[1][0][ra]=", "&d14=");
	parser['Laser Ligeiro'] = new Array("&numunits[1][0][l_l]=", "&d15=");
	parser['Laser Pesado'] = new Array("&numunits[1][0][s_l]=", "&d16=");
	parser['Canhão de Gauss'] = new Array("&numunits[1][0][g]=", "&d17=");
	parser['Canhão de Iões'] = new Array("&numunits[1][0][i]=", "&d18=");
	parser['Canhão de Plasma'] = new Array("&numunits[1][0][p]=", "&d19=");
	parser['Pequeno Escudo Planetário'] = new Array("&numunits[1][0][k_s]=", "&d20=");
	parser['Grande Escudo Planetário'] = new Array("&numunits[1][0][g_s]=", "&d21=");
	// flota
	parser['Cargueiro Pequeno'] = new Array("&numunits[1][0][k_t]=", "&d0=");
	parser['Cargueiro Grande'] = new Array("&numunits[1][0][g_t]=", "&d1=");
	parser['Caça Ligeiro'] = new Array("&numunits[1][0][l_j]=", "&d2=");
	parser['Caça Pesado'] = new Array("&numunits[1][0][s_j]=", "&d3=");
	parser['Cruzador'] = new Array("&numunits[1][0][kr]=", "&d4=");
	parser['Nave de Batalha'] = new Array("&numunits[1][0][sc]=", "&d5=");
	parser['Nave de Colonização'] = new Array("&numunits[1][0][ko]=", "&d6=");
	parser['Reciclador'] = new Array("&numunits[1][0][re]=", "&d7=");
	parser['Sonda de Espionagem'] = new Array("&numunits[1][0][sp]=", "&d8=");
	parser['Bombardeiro'] = new Array("&numunits[1][0][bo]=", "&d9=");
	parser['Satélite Solar'] = new Array("&numunits[1][0][so]=", "&d10=");
	parser['Destruidor'] = new Array("&numunits[1][0][z]=", "&d11=");
	parser['Estrela da Morte'] = new Array("&numunits[1][0][t]=", "&d12=");
	parser['Interceptor'] = new Array("&numunits[1][0][sk]=", "&d13=");
	// tecnologias
	parser['Tecnologia de Armas'] = new Array("&techs[1][0][w_t]=", "&dattack=");
	parser['Tecnologia de Escudo'] = new Array("&techs[1][0][s_t]=", "&dshield=");
	parser['Tecnologia de Blindagem'] = new Array("&techs[1][0][r_p]=", "&darmory=");

	parser['Metal:'] = new Array("&v_met=", "&dmetal=");
	parser['Cristal:'] = new Array("&v_kris=", "&dcrystal=");
	parser['Deuterio:'] = new Array("&v_deut=", "&ddeut=");

	// arrays para los simuladores
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
		var elementos = locateSnapshot("table/tbody/tr/td", node);
		var opts = COORD[sim] + elementos.snapshotItem(0).innerHTML.split('[')[1].split(']')[0];
		for (var i=0; i<elementos.snapshotLength; i++) {
			opts+=parse(elementos.snapshotItem(i), sim);
		}
		
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
//	element = document.getElementsByTagName('table')[6].getElementsByTagName('tr');
	element = document.getElementById('content').getElementsByTagName('tr');
	var colorMens = getScriptConf("colorMens");
	var autoMark = getScriptConf("autoMark");
	var coordLinker = getScriptConf("coordLinker");
	for (i=3; i<element.length-3; i++) {
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
					if (getScriptConf('galaxyTool'))
						element3.getElementsByTagName('td')[0].innerHTML += "<center><a style='cursor:pointer' title='Compartir informe via GalaxyTool' onclick=\"sendGTool(this, 'reports', '"+encodeURIComponent(element3.innerHTML)+"')\">GT</a></center><br>";
					if (getScriptConf('dragoSim')) {
						opciones = getOptions(element3.getElementsByTagName('td')[1], DRAGOSIM);
						target = "";
						target = "target='nueva'";  // comentar esta linea para que se abra en la misma pagina
						accion = "http://drago-sim.com/index.php?style=g3ck0&lang=spanish&template=Standard";
						element3.getElementsByTagName('td')[0].innerHTML += "<center><a title='Analizar en Drago-Sim' href=\"" + accion + opciones + "\" " + target + "><img src='"+DSimIco+"' height=80% width=80%</img></a></center></br>";
					}
					if (getScriptConf('CSim')) {
						opciones = getOptions(element3.getElementsByTagName('td')[1], CSIM);
						target = "";
						target = "target='new'";  // comentar esta linea para que se abra en la misma pagina
						accion = "http://www.o-o-d.com/tool/sim/index.cgi?lang=sp";
						element3.getElementsByTagName('td')[0].innerHTML += "<center><a title='Analizar en CSim' href=\"" + accion + opciones + "\" " + target + "><img src='"+CSimIco+"' height=80% width=80%</img></a></center>";
					}
					element[i].setAttribute('name', 'mySpy');
					element[i+1].setAttribute('name', 'mySpy');
 					var rec = element3.getElementsByTagName('td')[1].innerHTML.replace(/\n|\./g, '').match(/(Metal|Cristal|Deuterio):<\/td><td>-?\d+/g);
 					var recTotal = parseInt(rec[0].match(/\d+/), 10) + parseInt(rec[1].match(/\d+/), 10) + parseInt(rec[2].match(/\d+/), 10);
					if (autoMark) {
						var marcar = getScriptConf("AMEspP")|recTotal<getScriptConf("AMEspPRecMin");
						element2.parentNode.parentNode.childNodes[1].firstChild.checked=marcar;
					}
				}
			}
			else if (colorMens || autoMark) {
				if (element2.previousSibling.previousSibling.innerHTML=='Orden de la flota ') {
					if (element2.innerHTML=='Ataque con misiles ') {
						element[i].setAttribute('name', 'misil');
						element[i+1].setAttribute('name', 'misil');
						if (colorMens)
							element2.innerHTML = "<font color='"+getScriptConf("colorMisiles")+ "'>" + element2.innerHTML + "</font>";
						if (autoMark)
							element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMMisiles"));
					}
					else if (element2.innerHTML=='Llegada a un planeta ') {
						element[i].setAttribute('name', 'arrival');
						element[i+1].setAttribute('name', 'arrival');
						if (colorMens)
							element2.innerHTML = "<font color='"+getScriptConf("colorTrans")+ "'>" + element2.innerHTML + "</font>";
						if (autoMark)
							element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMTrans"));
					}
					else if (element2.innerHTML=='Retorno de una flota ') {
						element[i].setAttribute('name', 'return');
						element[i+1].setAttribute('name', 'return');
						if (colorMens)
							element2.innerHTML = "<font color='"+getScriptConf("colorTransR")+ "'>" + element2.innerHTML + "</font>";
						if (autoMark)
							element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMTransR"));
					}
					else if (element2.innerHTML=='Desplegar flota ') {
						element[i].setAttribute('name', 'deploy');
						element[i+1].setAttribute('name', 'deploy');
						if (colorMens)
							element2.innerHTML = "<font color='"+getScriptConf("colorDesp")+ "'>" + element2.innerHTML + "</font>";
						if (autoMark)
							element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMDesp"));
					}
					//else if (element2.innerHTML.search('orange')!='-1') { // espionaje, ya se mira antes junto con el drago-sim }
				}
				else if (element2.previousSibling.previousSibling.innerHTML=='Control espacial ') {
					element[i].setAttribute('name', 'attack');
//					element[i+1].setAttribute('name', 'attack');
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMAttack"));
				}
				else if (element2.previousSibling.previousSibling.innerHTML=='Flota ') {
					element[i].setAttribute('name', 'harvest');
					element[i+1].setAttribute('name', 'harvest');
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorRec")+"')>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMRec"));
				}
				else if (element2.previousSibling.previousSibling.innerHTML=='Control del espacio ') {
					element[i].setAttribute('name', 'spy');
					element[i+1].setAttribute('name', 'spy');
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorEsp")+"'>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMEsp"));
				}
				else if (element2.previousSibling.previousSibling.innerHTML=='Colonizadores ') {
					element[i].setAttribute('name', 'colonization');
					element[i+1].setAttribute('name', 'colonization');
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorColo")+"'>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMColo"));
				}
				else if (element2.previousSibling.previousSibling.innerHTML.search('Alianza')!=-1) {
					element[i].setAttribute('name', 'ally');
					element[i+1].setAttribute('name', 'ally');
					element[i+2].setAttribute('name', 'ally');
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorAlianza")+"'>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMAlianza"));
				}
				else if (element2.previousSibling.previousSibling.innerHTML.search('Buddylist')!=-1) {
					element[i].setAttribute('name', 'buddylist');
					element[i+1].setAttribute('name', 'buddylist');
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorBuddylist")+"'>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMBuddylist"));
				}
				else if (element2.previousSibling.previousSibling.innerHTML.split('[').length==2) {
					element[i].setAttribute('name', 'private');
					element[i+1].setAttribute('name', 'private');
					if (colorMens)
						element2.innerHTML = "<font color='"+getScriptConf("colorPriv")+"'>" + element2.innerHTML + "</font>";
					if (autoMark)
						element2.parentNode.childNodes[1].firstChild.checked=(getScriptConf("AMPriv"));
				}
				else if (element2.innerHTML.search('confeder')!=-1) {
					element[i].setAttribute('name', 'confeder');
					element[i+1].setAttribute('name', 'confeder');
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
		var texto = locateSnapshot("//table/tbody/tr/td[1]/table/tbody/tr/td[2] | //table/tbody/tr/td[1]/table/tbody/tr/th[3]");
		var colorCM = getScriptConf('coordLinkerCM');
		var colorVariable = getScriptConf('coordLinkerVarM');
		for (var i=0; i<texto.snapshotLength; i++) {
			if (coordLinker) {
				var as = texto.snapshotItem(i).getElementsByTagName('a');
				for (x in as) {
					if (coords = validCoords(as[x].innerHTML)) {
						as[x].style['color'] = colorVariable?getColorLinker(as[x].innerHTML):colorCM;
						as[x].href = "index.php?page=galaxy&galaxy=" + coords[1] + "&system=" + coords[2] + "&planet=" + coords[3] + "&session=" + getSession(location.hostname);
					}
				}
			}
			if (colorMens) {
				var texto2 = texto.snapshotItem(i).innerHTML;
				texto2=texto2.replace(/(metal|cristal|deuterio):? ?(\d\.\d+e\+\d\d|\d+[\.\d]*)/ig, "<font color='#88aaff'>$1</font>: <font color=orange>$2 </font>");
				texto2=texto2.replace(/(\d\.\d+e\+\d\d|\d+[\.\d]*)( metal| cristal| deuterio)/ig, "<font color=orange>$1 </font><font color='#88aaff'>$2</font>");
				texto2=texto2.replace(/enemigo de ([\s\S]*) entrega/, "enemigo de <font color="+getScriptConf('colorPriv')+">$1</font> entrega"); // nombre de jugador en entregas
				texto2=texto2.replace(/jugador ([\s\S]*) envía/, "jugador <font color="+getScriptConf('colorPriv')+">$1</font> envía"); // nombre de jugador en entregas
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
		var bl=document.getElementsByTagName('blink')[0];
		if (bl) bl.parentNode.innerHTML = 'Mensajes';
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
	nodo = locateFirst('/html/body/form/table/tbody/tr');
	nodo.removeChild(nodo.firstChild);
	nodo = nodo.lastChild.lastChild.firstChild.firstChild;
	nodo2 = nodo.childNodes[1].lastChild.firstChild;
	nodo2.removeChild(nodo2.childNodes[1]);
	nodo = nodo.lastChild;
	nodo.removeChild(nodo.lastChild);
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
		const amountag = "Cantidade";
		const damagetag	= "Armas:";
		const resulttag = "batalha";
		const drawtag = "combate";
		const rubbletag = "frota agora";
		const metalrubbletag = "Metal e";
		const cristalrubbletag = "Cristal";
		const stolentag = "captura<br>";
		const metaltag = "Metal,";
		const cristaltag = "Cristal e";
		const deuteriumtag = "Deuterio<br>";
		const atackerloosestag = "O atacante perdeu no total";
		const defenderloosestag = "O defensor perdeu no total";
		const atacker_result_tag = "atacante";
		const unitstag = "unidades.";
		const destroytag = "Destruído";
		const br = "<br>";
		var endtecnologytag	 	= '<table border="1">';
		var endtecnology2tag 	 	= '<br>Destruído';
		var no_ships_no_defenses_text 	= "Sem naves nem defesas";
		var roundtag			= 'A frota atacante dispara';
		var moon_tag		 	= 'A probabilidade de criação de lua devido aos destroços do combate é de';
		var moon_created_tag	 	= 'Após o combate, a grande quantidade de metal e cristal deixados nos destroços atraem-se, devido ao efeito gravitacional, e formam lentamente um satélite lunar na órbita do planeta. LUA. ';
		var max_rentability	 	= 'Máxima';
		var min_rentability		= 'Máxima';
		var repaired_tag	 	= 'podem ser reparados.';
		var months 			= new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro','Dezembro');
		var serverShiptsNames		= new Array('Cargueiro P.','Cargueiro G.','Caça L.','Caça P.','Cruz.','N. Bat.','N. Colon.','Recic.','Sonda','Bomb.','S. Solar','Destr.','Est. Morte','Interc.');
		var userShiptsNames		= new Array('Cargueiro Pequeno','Cargueiro Grande','Caça Ligeiro','Caça Pesado','Cruzador','Nave de Batalha','Nave de Colonização','Reciclador.','Sonda de Espionagem','Bombardeiro','Satélite Solar','Destruidor','Estrela da Morte','Interceptor');
		var serverDefensesNames		= new Array('Mísseis','Laser L.','Laser P.','C. Gauss','C. Iões','C. Plasma','Escudo Peq.','Escudo Gr.');
		var userDefensesNames		= new Array('Lançador de Mísseis','Laser Ligeiro','Laser Pesado','Canhão de Gauss','Canhão de Iões','Canhão de Plasma','Pequeno Escudo Planetário','Grande Escudo Planetário');

	//const strings
		const c_singleAtacker 		= 'Atacante';
		const c_multipleAtacker 	= 'Atacantes';
		const c_singleDefender 	= 'Defensor';
		const c_multipleDefender 	= 'Defensores';
		const c_battleInit		= 'Batalha do dia ';
		const c_at			= ' das ';
		const c_of			= ' de ';
		const c_duration		= 'A batalha teve ';
		const c_rounds			= ' rondas';
		const c_hiddenTecnology	= 'Armas: XXX% Escudo: XXX% Blindagem: XXX%';
		const c_lost			= ' perdeu ';
		const c_noLost			= ' sem baixas';
		const c_maxLost		= ' volatilizados';
		const c_looses			= 'Perdidas ';
		const c_units 			= ' unidades.';
		const c_stolen			= 'Captura: ';
		const c_metalInfo		= ' Metal, ';
		const c_cristalInfo		= ' Cristal e ';
		const c_deuteriumInfo		= ' Deuterio';
		const c_consumption		= 'Consumo de deuterio (aproximado) a 100%: ';
		const c_atackerLooses		= 'Perdas do Atacante: ';
		const c_defenderLooses		= 'Perdas do Defensor: ';
		const c_totalLooses		= 'Perdas TOTAIS: ';
		const c_rubbles		= 'Destroços';
		const c_metalRubble		= 'Metal: ';
		const c_cristalRubble		= 'Cristal: ';
		const c_deuteriumRubble		= 'Deuterio: ';
		const c_winAndLost		= 'GANHOS E PERDAS';
		const c_recicleRentability   	= 'Rentabilidade com reciclagem: ';
		const c_notRecicleRentability   = 'Rentabilidade sem reciclagem ';
		const c_with			= ' Com';
		const c_without		= 'Sem ';
		const c_recicle		= ' Reciclagem: ';
		const c_defenderWithRecicle	= 'Defensor Recicla: ';
		const c_showDeuterium		= ' Mostrar o consumo de deuterio <br />';
		const c_showTech		= ' Mostrar as tecnologias &nbsp;&nbsp;&nbsp;';
		const c_showCoords		= ' Mostrar as coordenadas<br>';
		const c_ogameSkin		= ' Skin de fundo: ';
		const c_forum_type		= 'Compactar para fórum do tipo: ';
		const c_forum_color		= ' Fundo do fórum: ';
		const c_light		= 'Claro';
		const c_dark		= 'Escuro';
		const c_old_favour		= ' Ver o report "clássico"';
		const c_old_slooses		= 'Perdas do ';
		const c_oll_plooses		= 'Perdas dos ';
		const c_old_rentabilitysAtacker = 'Rentabilidade do Atacante: ';
		const c_old_rentabilitypAtacker = 'Rentabilidade dos Atacantes: ';
		const c_old_rentabilitysDefender= 'Defensor recicla: ';
		const c_old_rentabilitypDefender= 'Defensores reciclam: ';
		const c_old_atacker		= 'Atacante ';
		const c_old_with		= 'Com';
		const c_old_without		= 'Sem';	

		const c_link1 = 'Compactado com o ';
		const c_link2 = 'Compactador automático de batalhas';
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

		tabla.childNodes[0].firstChild.innerHTML +="&nbsp;Reporte original";
		tabla.childNodes[1].firstChild.innerHTML = original_body;
		if (getHiddenCompact('original_in')) {
			tabla.childNodes[0].firstChild.childNodes[0].style['display'] = 'none';
			tabla.childNodes[1].firstChild.style['display'] = 'none';
		}
		else {
			tabla.childNodes[0].firstChild.childNodes[1].style['display'] = 'none';
		}
		
		tabla.childNodes[2].firstChild.innerHTML +="&nbsp;Reporte Compactado";
		if (getHiddenCompact('compactado_in')) {
			tabla.childNodes[2].firstChild.childNodes[0].style['display'] = 'none';
			tabla.childNodes[3].firstChild.style['display'] = 'none';
		}
		else {
			tabla.childNodes[2].firstChild.childNodes[1].style['display'] = 'none';
		}
		
		tabla.childNodes[4].firstChild.innerHTML +="&nbsp;Opciones";
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
			partials_span.innerHTML = ' Ver parciales<br>';
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
			} catch (error) {
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
			} catch (error) {
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
						contenido += '[br][neg]Flotas[/neg][br]';
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
						contenido += '[br][neg]Flotas[/neg][br](Sin Flotas)';
					}
				}
				
				// DEFENSA
				if (contenidoweb[3]) {
					defensa = contenidoweb[3].getElementsByTagName('td');
					if (defensa.length > '1') {
						vecesbucle = (defensa.length - 1) / 2;
						contenido += '[br][neg]Defensas[/neg][br]';
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
						contenido += '[br][neg]Defensas[/neg][br](Sin Defensas)';
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
							contenido += '[br][neg]Investigaci&oacute;n[/neg][br]';
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






















































/*****************************************************************************************
	BRAINSTORMING
	=============
	
	
	Creamos un nodo con id=imperium
		dentro de imperium habra nodos con id=planetCode
			dentro de cada planeta habra:
				- Niveles de edificios
				- Recursos actuales
				- Flota
				- Defensa
				- Campos libres
				- Nombre
				- Coordenadas
				- Imagen (url de la imagen, se coge en vision general) (para las lunas es siempre la misma)
				- Tipo (luna o planeta, tb ver si enlazar lunas y planetas...)
				- Cola de construccion (esto no se guarda aqui, ya esta guardado)
			cada uno de estos componentes es un ol con un name descriptivo, y dentro tendra li con nombres descriptivos y como contenido un numero
			habria que guardar tb la fecha de ultima actualizacion de cada dato
	
	Al mostrar el imperio, los recursos se pueden calcular a partir de los recursos que habia en un determinado momento y calculando los recursos generados a partir de la ultima fecha de modificacion y la produccion del planeta
	
	La produccion del planeta se puede ver en recursos o calcular desde edificios (para el deuterio se necesita la temperatura)


para usar XML:



*****************************************************************************************/
/*
function Planet(code, coords ) {
	this.coords = coords;
}

function Imperium() {
	this.planets = new Array();
}




alert(new Array.constructor)



*/



/*
function xmljsDOMExample() {
var xml;
xml =
// "<?xml version=\"1.0\"?>" +
"<planet code='' coords='' name='' imgURL='' fields='' freeFields=''>" +
	"<resources metal='' cristal='' deut=''>" +
	"</resources>" +
	"<production metal='' cristal='' deut=''>" +
	"</production>" +
	"<buildings>" +
	"</buildings>" +
	"<fleet>" +
	"</fleet>" +
	"<defense>" +
	"</defense>" +
"</planet>";

var domDoc = (new DOMParser()).parseFromString(xml, "text/xml");

var string = (new XMLSerializer()).serializeToString(domDoc);
alert(string);


}// end function xmljsDOMExample


//xmljsDOMExample();
*/


// if (contentSection == 'stat' && debugMode) {
if (getScriptConf('imperium')) {
	// Modificacion del script Imperium v2.0 by Fapsi

	//*****************************************************************************************************************************
	//******************Konstanten*************************************************************************************************
	//*****************************************************************************************************************************
	//*****************************************************************************************************************************
	const c_REGEXP= new Array(/cp=(\d+)/gi,
		/selected="selected"(.*)cp=(\d+)/gi,
		/\((.*) fields\)/i,
		/<th(.*)\(Rank(.*)\)/i);
	const c_REGEXP_GEB = new Array(/Metal Mine<\/a> \(level (\d+)/i,
		/Crystal Mine<\/a> \(level (\d+)/i,
		/Deuterium Synthesizer<\/a> \(level (\d+)/i,
		/Solar Plant<\/a> \(level (\d+)/i,
		/Fusion Reactor<\/a> \(level (\d+)/i,
		/Robotics Factory<\/a> \(level (\d+)/i,
		/Nanite Factory<\/a> \(level (\d+)/i,
		/Shipyard<\/a> \(level (\d+)/i,
		/Metal Storage<\/a> \(level (\d+)/i,
		/Crystal Storage<\/a> \(level (\d+)/i,
		/Deuterium Tank<\/a> \(level (\d+)/i,
		/Research Lab<\/a> \(level (\d+)/i,
		/Terraformer<\/a> \(level (\d+)/i,
		/Alliance Depot<\/a> \(level (\d+)/i,
		/Missile Silo<\/a> \(level (\d+)/i);
	const c_REGEXP_FLO = new Array(/Small Cargo(.*)\n(\W+)th>(\d+)/i,
		/Large Cargo(.*)\n(\W+)th>(\d+)/i,
		/Light Fighter(.*)\n(\W+)th>(\d+)/i,
		/Heavy Fighter(.*)\n(\W+)th>(\d+)/i,
		/Cruiser(.*)\n(\W+)th>(\d+)/i,
		/Battleship(.*)\n(\W+)th>(\d+)/i,
		/Colony Ship(.*)\n(\W+)th>(\d+)/i,
		/Recycler(.*)\n(\W+)th>(\d+)/i,
		/Espionage Probe(.*)\n(\W+)th>(\d+)/i,
		/Bomber(.*)\n(\W+)th>(\d+)/i,
		/Solar Satellite(.*)\n(\W+)th>(\d+)/,
		/Destroyer(.*)\n(\W+)th>(\d+)/i,
		/Deathstar(.*)\n(\W+)th>(\d+)/i,
		/Battlecruiser(.*)\n(\W+)th>(\d+)/i);
	const c_REGEXP_VER = new Array(/Rocket Launcher<\/a> \((.){0,10}\d available\)/i,
		/Light Laser<\/a> \((.){0,10}\d available\)/i,
		/Heavy Laser<\/a> \((.){0,10}\d available\)/i,
		/Gauss Cannon<\/a> \((.){0,10}\d available\)/i,
		/Ion Cannon<\/a> \((.){0,10}\d available\)/i,
		/Plasma Turret<\/a> \((.){0,10}\d available\)/i,
		/Small Shield Dome<\/a> \((.){0,10}\d available\)/i,
		/Large Shield Dome<\/a> \((.){0,10}\d available\)/i,
		/Anti-Ballistic Missiles<\/a> \((.){0,10}\d available/i,
		/Interplanetary Missiles<\/a> \((.){0,10}\d available/i);
	const c_GEBNAMEN = new Array("Metal Mine","Crystal Mine","Deuterium Syn.","Solar Plant","Fusion Reactor","Robotics Factory","Nanite Factory","Shipyard","Metal Storage","Crystal Storage","Deuterium Tank","Research Lab","Terraformer","Alliance Depot","Missile Silo");
	const c_FLONAMEN = new Array("Small Cargo", "Large Cargo","Light Fighter","Heavy Fighter","Cruiser","Battleship","Colony Ship","Recycler","Espionage Probe","Bomber","Solar Satellite","Destroyer","Deathstar","Battlecruiser");
	const c_VERNAMEN = new Array("Rocket Launcher", "Light Laser","Heavy Laser","Gauss Cannon","Ion Cannon","Plasma Turret","Small Shield Dome","Large Shield Dome","Anti-Ballistic Missiles","Interplanetary Missiles");
	const c_ROHNAMEN = new Array("Metal","Crystal","Deuterium");
	const c_Planeten="Planets";
	const c_Gesamt="Total";
	const c_Rohstoffe="resources";
	const c_Total="Total";
	const c_Produktion="Resource production";
	const c_Gebaeude="Buildings";
	const c_Flotten="Fleet";
	const c_Schiffe="ships";
	const c_Verteidigung="Defense";
	const c_Verteidigungsanlagen="defensive facilities";
	const c_Felder="fields";
	const c_Punkte="points";
	//*****************************************************************************************************************************
	//*****************************************************************************************************************************
	//******************Variabeln**************************************************************************************************
	//*****************************************************************************************************************************
	//*****************************************************************************************************************************
	try{
		var i=0;
		var session = document.URL.substr(document.URL.indexOf("session=") + 8,12);
		var loc = document.location;
		var reg = /http:\/\/(.*?)\/game\/(.*?)\?session=(.*?)/i;
		var result = reg.exec( loc );
		var server = result[1];
		var len = document.getElementsByTagName('option').length;
	} catch(e) {}
	//*****************************************************************************************************************************
	//*****************************************************************************************************************************
	//******************Global*Functions*******************************************************************************************
	//*****************************************************************************************************************************
	//*****************************************************************************************************************************
	function HolePlanetCode(Zahl) {
		var a = document.body.innerHTML.match(c_REGEXP[0])[Zahl];
		a= parseInt(a.split("=")[1]);
		return a;
	}
	function HolePlanetCodeAktPlani() {
		return thisPlanetCode;
	}


	/*
		guardar configuracion como por ejemplo secciones q se muestran
	*/
	defImperiumConf = '';
	function getImperiumConf(nombre) {
		return getConf(nombre, "imperiumConf", defImperiumConf, ':x:');
	}
	function setImperiumConf(nombre, valor) {
		return setConf(nombre, valor, "imperiumConf", defImperiumConf, ':x:');
	}
	unsafeWindow.setImperiumConf = setImperiumConf;




	function getImperiumValues(nombre) {
		return getConf(nombre, "imperiumValues"+location.hostname, '', ':x:');
	}
	function setImperiumValues(nombre, valor) {
		return setConf(nombre, valor, "imperiumValues"+location.hostname, '', ':x:');
	}


	function Speichern(key,value) {
		GM_setValue(key,value);
	}
	function Laden(key, defaultvalue) {
		return GM_getValue(key, defaultvalue);
	}

	//*****************************************************************************************************************************
	//*****************************************************************************************************************************
	//*********************My*Functions********************************************************************************************
	//*****************************************************************************************************************************
	//*****************************************************************************************************************************
	function Ressourcen() {
// 		try {
			if (contentSection == 'resources') {}
				

				

				
// 				var AktPLaniCode=HolePlanetCodeAktPlani();
// 				var td = document.getElementsByTagName("td");
// 				var Prod=new Array(0,0,0,0,0,0);
// 				var element = document.evaluate('/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.getElementsByTagName('td');
// 				Prod[0] = parseInt(element[1].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
// 				Prod[1] = parseInt(element[2].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
// 				Prod[2] = parseInt(element[3].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
// 				Prod[3] = parseInt(td[40].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,''));
// 				Prod[4] = parseInt(td[41].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,''));
// 				Prod[5] = parseInt(td[42].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g,''));
// 				if (isNaN(Prod[3])) Prod[3]=0;
// 				if (isNaN(Prod[4])) Prod[4]=0;
// 				if (isNaN(Prod[5])) Prod[5]=0;
// 
// 				Speichern(AktPLaniCode + "Rohstoff0", Prod[0])
// 				Speichern(AktPLaniCode + "Rohstoff1", Prod[1])
// 				Speichern(AktPLaniCode + "Rohstoff2", Prod[2])
// 				Speichern(AktPLaniCode + "Rohstoff3", Prod[3])
// 				Speichern(AktPLaniCode + "Rohstoff4", Prod[4])
// 				Speichern(AktPLaniCode + "Rohstoff5", Prod[5])
// 			}
// 		} catch(e) {
// 			Speichern("Fehlerkonsole","\nWarning:" +e+Laden("Fehlerkonsole",""));
// 		}
	}
	//*****************************************************************************************************************************
	function Gebaeude() {
		if (contentSection=='b_building') {
			var Suchmuster;
			var AktPLaniCode=HolePlanetCodeAktPlani();
			for (i=0; i<15; i++) {
				Suchmuster=0;
				try{
					Suchmuster =document.body.innerHTML.match(c_REGEXP_GEB[i])[0];
					Suchmuster=Suchmuster.split("level")[1];
				} catch(e) {
					Speichern("Fehlerkonsole","\nNotice:" +e+Laden("Fehlerkonsole",""));
				}
				GM_setValue(server + AktPLaniCode + c_GEBNAMEN[i],Suchmuster);
			}
		}
	}
	//*****************************************************************************************************************************
	function Flotten() {
		if (location.pathname=='/game/flotten1.php') {
			var Suchmuster;
			var AktPLaniCode=HolePlanetCodeAktPlani();
			for (i=0; i<14; i++) {
				Suchmuster=0;
				try{
					Suchmuster =document.body.innerHTML.match(c_REGEXP_FLO[i])[0];
					Suchmuster=Suchmuster.split("<th>")[1];
				} catch(e) {
					Speichern("Fehlerkonsole","\nNotice:" +e+Laden("Fehlerkonsole",""));
				}
				GM_setValue(server + AktPLaniCode + c_FLONAMEN[i],Suchmuster);
			}
		}
	}
	//*****************************************************************************************************************************
	function Verteidigung() {
		if (document.baseURI.indexOf('mode=Verteidigung')!=-1) {
			var Suchmuster;
			var AktPLaniCode=HolePlanetCodeAktPlani();
			for (i=0; i<10; i++) {
				Suchmuster=0;
				try{
					Suchmuster =document.body.innerHTML.match(c_REGEXP_VER[i])[0].replace(/\./,'');
					Suchmuster=Suchmuster.split("(")[1].split("available")[0];
				} catch(e) {
					Speichern("Fehlerkonsole","\nNotice:" +e+Laden("Fehlerkonsole",""));
				}
				GM_setValue(server + AktPLaniCode + c_VERNAMEN[i],Suchmuster);
			}
		}
	}
	//*****************************************************************************************************************************
	function Imperium_Ansicht() {
		if (location.href.indexOf('page=stat')!=-1) {
			//*********************************************
			function HoleImperiumCode() {
				var TAB_ROHSTOFF= new Array("","","","","","");
				var TAB_GEBAEUDE= new Array("","","","","","","","","","","","","","","");
				var TAB_FLOTTEN = new Array("","","","","","","","","","","","","","");
				var TAB_VERTEIDI = new Array("","","","","","","","","","")
				var ROHSTOFF_GES=new Array(0,0,0,0,0,0);
				var Flotten_GES= new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
				var VERTEIDI_GES=new Array(0,0,0,0,0,0,0,0,0,0,0);
				var Zahl=0, Name="", Code ,p=0,Zahl2=0,Felder="";
				var AktPLaniCode=HolePlanetCodeAktPlani();
				for (i=0;i<len;i++) {
					var AktPlaniCode_i=HolePlanetCode(i);
					if (AktPlaniCode_i == AktPLaniCode) var color="red"; 
					else var color="#00FF00";
					Felder += "<th>"+Laden(server+AktPlaniCode_i +"Felder", "")+"</th>";
					Name += "<th><a href='/game/overview.php?session="+session+"&cp="+AktPlaniCode_i+"&mode=&gid=&messageziel=&re=0'><font color='"+color+"'>"+document.getElementsByTagName('option')[i].innerHTML+"</font></a></th>";
					//**************Hole*Rohstoffe/Produktion******
					for (p=0; p<6; p++){
						Zahl = Laden(server+AktPlaniCode_i+"Rohstoff"+p,0);
						TAB_ROHSTOFF[p] += '<th>' + Zahl + '</th>';
						ROHSTOFF_GES[p] += Zahl;
					}
					//**************Hole*Gebaeude******************
					for (p=0; p<15; p++){
						TAB_GEBAEUDE[p] += '<th>' + Laden(server + AktPlaniCode_i + c_GEBNAMEN[p],0) + '</th>';
					}
					//**************Hole*Flotten*******************
					for (p=0; p<14; p++){
						Zahl = Laden(server + AktPlaniCode_i + c_FLONAMEN[p],0)
						TAB_FLOTTEN[p] += '<th>' + Zahl + '</th>';
						Flotten_GES[p] += parseInt(Zahl);
					}
					//**************Hole*Verteidigung**************
					for (p=0; p<10; p++){
						Zahl = Laden(server + AktPlaniCode_i + c_VERNAMEN[p],0)
						TAB_VERTEIDI[p] += '<th>' + Zahl + '</th>';
						VERTEIDI_GES[p] += parseInt(Zahl);
					}
					//*********************************************
				}//end for_i
				for (i=0; i<14; i++) Flotten_GES[14] += parseInt(Flotten_GES[i]);
				for (i=0; i<10; i++) VERTEIDI_GES[10] += parseInt(VERTEIDI_GES[i]);

				Code  = "<p></p><center><table>"
				Code += "<tr><td class='c'>"+c_Planeten+"</td>"+Name+"<th>"+c_Gesamt+"</th></tr>";
				Code += "<tr><td class='c' colspan='"+(len+3)+"'>"+c_Rohstoffe+" ("+c_Total+": <font color='orange'>"+puntuar(ROHSTOFF_GES[0]+ROHSTOFF_GES[1]+ROHSTOFF_GES[2])+" "+c_Rohstoffe+"</font>)<td></tr>";
				Code += "<tr><td class='c'>"+c_ROHNAMEN[0]+"</td>" + TAB_ROHSTOFF[0]+"<th>"+puntuar(ROHSTOFF_GES[0])+"</th></tr>";
				Code += "<tr><td class='c'>"+c_ROHNAMEN[1]+"</td>" + TAB_ROHSTOFF[1]+"<th>"+puntuar(ROHSTOFF_GES[1])+"</th></tr>";
				Code += "<tr><td class='c'>"+c_ROHNAMEN[2]+"</td>" + TAB_ROHSTOFF[2]+"<th>"+puntuar(ROHSTOFF_GES[2])+"</th></tr>";
				Code += "<tr><td class='c' colspan='"+(len+3)+"'>"+c_Produktion+"<td></tr>";
				Code += "<tr><td class='c'>"+c_ROHNAMEN[0]+"</td>" + TAB_ROHSTOFF[3]+"<th>"+puntuar(ROHSTOFF_GES[3])+"</th></tr>";
				Code += "<tr><td class='c'>"+c_ROHNAMEN[1]+"</td>" + TAB_ROHSTOFF[4]+"<th>"+puntuar(ROHSTOFF_GES[4])+"</th></tr>";
				Code += "<tr><td class='c'>"+c_ROHNAMEN[2]+"</td>" + TAB_ROHSTOFF[5]+"<th>"+puntuar(ROHSTOFF_GES[5])+"</th></tr>";
				Code += "<tr><td class='c' colspan='"+(len+3)+"'>"+c_Gebaeude+"<td></tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[0]+"</td>"+TAB_GEBAEUDE[0]+"<th rowspan='15'></th></tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[1]+"</td>"+TAB_GEBAEUDE[1]+"</tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[2]+"</td>"+TAB_GEBAEUDE[2]+"</tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[3]+"</td>"+TAB_GEBAEUDE[3]+"</tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[4]+"</td>"+TAB_GEBAEUDE[4]+"</tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[5]+"</td>"+TAB_GEBAEUDE[5]+"</tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[6]+"</td>"+TAB_GEBAEUDE[6]+"</tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[7]+"</td>"+TAB_GEBAEUDE[7]+"</tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[8]+"</td>"+TAB_GEBAEUDE[8]+"</tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[9]+"</td>"+TAB_GEBAEUDE[9]+"</tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[10]+"</td>"+TAB_GEBAEUDE[10]+"</tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[11]+"</td>"+TAB_GEBAEUDE[11]+"</tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[12]+"</td>"+TAB_GEBAEUDE[12]+"</tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[13]+"</td>"+TAB_GEBAEUDE[13]+"</tr>";
				Code += "<tr><td class='c'>"+c_GEBNAMEN[14]+"</td>"+TAB_GEBAEUDE[14]+"</tr>";
				Code += "<tr><td class='c' colspan='"+(len+3)+"'>"+c_Flotten+" ("+c_Total+": <font color='orange'>"+puntuar(Flotten_GES[14])+" "+c_Schiffe+"</font>)<td></tr>";
				Code += "<tr><td class='c'>"+c_FLONAMEN[0]+"</td>"+TAB_FLOTTEN[0]+"<th>"+Flotten_GES[0]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_FLONAMEN[1]+"</td>"+TAB_FLOTTEN[1]+"<th>"+Flotten_GES[1]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_FLONAMEN[2]+"</td>"+TAB_FLOTTEN[2]+"<th>"+Flotten_GES[2]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_FLONAMEN[3]+"</td>"+TAB_FLOTTEN[3]+"<th>"+Flotten_GES[3]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_FLONAMEN[4]+"</td>"+TAB_FLOTTEN[4]+"<th>"+Flotten_GES[4]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_FLONAMEN[5]+"</td>"+TAB_FLOTTEN[5]+"<th>"+Flotten_GES[5]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_FLONAMEN[6]+"</td>"+TAB_FLOTTEN[6]+"<th>"+Flotten_GES[6]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_FLONAMEN[7]+"</td>"+TAB_FLOTTEN[7]+"<th>"+Flotten_GES[7]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_FLONAMEN[8]+"</td>"+TAB_FLOTTEN[8]+"<th>"+Flotten_GES[8]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_FLONAMEN[9]+"</td>"+TAB_FLOTTEN[9]+"<th>"+Flotten_GES[9]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_FLONAMEN[10]+"</td>"+TAB_FLOTTEN[10]+"<th>"+Flotten_GES[10]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_FLONAMEN[11]+"</td>"+TAB_FLOTTEN[11]+"<th>"+Flotten_GES[11]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_FLONAMEN[12]+"</td>"+TAB_FLOTTEN[12]+"<th>"+Flotten_GES[12]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_FLONAMEN[13]+"</td>"+TAB_FLOTTEN[13]+"<th>"+Flotten_GES[13]+"</th></tr>";
				Code += "<tr><td class='c' colspan='"+(len+3)+"'>"+c_Verteidigung+" ("+c_Total+": <font color='orange'>"+puntuar(VERTEIDI_GES[10])+" "+c_Verteidigungsanlagen+"</font>)<td></tr>";
				Code += "<tr><td class='c'>"+c_VERNAMEN[0]+"</td>"+TAB_VERTEIDI[0]+"<th>"+VERTEIDI_GES[0]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_VERNAMEN[1]+"</td>"+TAB_VERTEIDI[1]+"<th>"+VERTEIDI_GES[1]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_VERNAMEN[2]+"</td>"+TAB_VERTEIDI[2]+"<th>"+VERTEIDI_GES[2]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_VERNAMEN[3]+"</td>"+TAB_VERTEIDI[3]+"<th>"+VERTEIDI_GES[3]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_VERNAMEN[4]+"</td>"+TAB_VERTEIDI[4]+"<th>"+VERTEIDI_GES[4]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_VERNAMEN[5]+"</td>"+TAB_VERTEIDI[5]+"<th>"+VERTEIDI_GES[5]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_VERNAMEN[6]+"</td>"+TAB_VERTEIDI[6]+"<th>"+VERTEIDI_GES[6]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_VERNAMEN[7]+"</td>"+TAB_VERTEIDI[7]+"<th>"+VERTEIDI_GES[7]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_VERNAMEN[8]+"</td>"+TAB_VERTEIDI[8]+"<th>"+VERTEIDI_GES[8]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_VERNAMEN[9]+"</td>"+TAB_VERTEIDI[9]+"<th>"+VERTEIDI_GES[9]+"</th></tr>";
				Code += "<tr><td class='c'>"+c_Planeten+"</td>"+Name+"<th>Gesamt</th></tr>";
				Code += "<tr><td class='c'>"+c_Felder+"</td>"+Felder+"<th></th><tr>";
				Code += "<tr><td class='c'>"+c_Punkte+"</td>"+Laden(server+"Punkte",<th>Punkte:-</th>)+"</tr>";
				Code += "</table>";
				return Code
			}
			//*********************************************
			document.getElementById('content').innerHTML= HoleImperiumCode();
		}
	}
// 	unsafeWindow.Imperium_Ansicht=Imperium_Ansicht;
	//*********************************************

/*	Ressourcen();
	Gebaeude();
	Flotten();
	Verteidigung();*/
	Imperium_Ansicht();
}


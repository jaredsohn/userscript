// ==UserScript==
// @name Travian3 Beyond Hacked HUN
// @author Victor Garcia
// @include http://*.travian*.*/*.php*
// @exclude http://*.travian*.*/hilfe.php*
// @exclude http://*.travian*.*/log*.php*
// @exclude http://*.travian*.*/index.php*
// @exclude http://*.travian*.*/anleitung.php*
// @exclude http://*.travian*.*/impressum.php*
// @exclude http://*.travian*.*/anmelden.php*
// @exclude http://*.travian*.*/gutscheine.php*
// @exclude http://*.travian*.*/spielregeln.php*
// @exclude http://*.travian*.*/links.php*
// @exclude http://*.travian*.*/geschichte.php*
// @exclude http://*.travian*.*/tutorial.php*
// @exclude http://*.travian*.*/manual.php*
// @exclude http://*.travian*.*/ajax.php*
// @exclude http://*.travian*.*/ad/*
// @exclude http://*.travian*.*/chat/*
// @exclude http://forum.travian*.*
// @exclude http://board.travian*.*
// @exclude http://shop.travian*.*
// @version 2.5
// @description	 Enables some Travian v3 features
// ==/UserScript==


/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/ 
 */

//# TMR variables.
var map_tooltipDelay=400;// delay on map mouseover before fetching resources for square (default in Beyond: 1000)
var VC_sort='horizontal';// vertical or horizontal sorting in the Village Center
var VC_showcomplete=1; //0 or 1 - hide/show completed buildings in the Village Center
var edificiosPorFila = 7; //number of columns in the Village Center
var Map_interval=500; //delay between fetchs for Get Resources on map
var showbookmarks=1; //show hardcoded bookmarks

var plustimers = new Object();
var minustimers = new Object();
var pageloadtime = new Date();
var in_reload=0;

//# TMR Changes
//embedded most images as data:image/gif;base64 to stop hitting the server so much
//calculateResourceTime
//  underline resource that will take the longest to produce
//  show time on mouseover for each resource
//Village Center
//  fixed padding for more than 2 columns
//  shrunk image height to fit more on screen
//  sort veritically or horizontally
//  list resources down so we can fit more columns
//for resources until next upgrade on Village Center/Overview, show next level's number, not current level
//fixed time remaining to Warehouse/Granary full to use full width to eliminate crunch/overlap
//hardcoded bookmarks
//added M link to Center Map next to village names
//moved Beyond load time to same line as Travian load time
//on map, show resource tooltip after 100ms. see map_tooltipDelay
//  button, get all resource fields.
//    display highest unit type ( wheat - 9 or 15)
//added link to Village Overview for each village
//Village Links
//  add village name to send resources/troops
//  Overview, Center Map
//  if on marketplace: populate X,Y with village coord if Send Resources (crop icon)
//  if on map: populate X,Y with village coord if Center Map clicked (M)
//  set accesskeys to 1,2,... for populating X,Y.  shift-alt-1 in firefox
//map: show oasis nature unit info on mouseover
//map: added North East, North West, South East, South West links at 4 corners of map
//show # of merchants in Marketplace
//13x13 plus map: 
//  enabled mouseover for resources/oasis unit
//  labeled X&Y axis with coordinates - fixed for world loopback at 400x400
//  Get Resources button on plus map
//  added North East, North West, South East, South West links at 4 corners of map
//  show player list on screen with scrollbar
//show reinforce icon instead of attack icon if it's next to one of our villages - fixed to account for leading/trailing whitespace
//fixed JS error on marketplace page
//focus on X coord on map
//fixed class on plus map
//fixed battle reports not showing profit/efficiency if moving between villages
//fixed JS error when attacking (not raiding) on confirmation screen.
//highlight allies on map/plus map with blue square (driven by alliance_list variable)
//put focus in Name field (spieler) on Statistics page
//fixed not using embedded image for completed buildings in Village Center
//fixed Attack link in linux
//MDL - added CP efficiency for upgrades
//TMR - fixed encoding issues
//changed M link on battle reports to show (x|y) instead
//  show distance from active village on mouseover
//fixed Reinforcements in Rally Point to show def2 icon instead of att
//fixed the class on the Search select box on the Marketplace Sell page 

//
//# TODO
//  embed more Village Center images


// Funcion principal ejecutada cuando se ha cargado toda la pagina
function funcionPrincipal(e){
	// Momento de inicio de ejecucion del script
	var tiempo_ejecucion = new Date().getTime();
	var version = "2.5";

	var lang_es = new Array();
	lang_es['ALIANZA'] 	= 'Alianza';
	lang_es['PERFIL'] 	= 'Perfil';
	lang_es['SIM'] 		= 'Simulador';
	lang_es['CALC'] 	= 'Calculadora';
	lang_es['SEGURO'] 	= 'Estas seguro?';
	lang_es['MARK'] 	= 'Marcar Todos';
	lang_es['PERDIDAS'] 	= 'P&eacute;rdidas en materiales';
	lang_es['RENT'] 	= 'Rentabilidad';
	lang_es['SUBIR_NIVEL'] 	= 'Ya puedes subirlo de nivel';
	lang_es['JUGADOR'] 	= 'Jugador';
	lang_es['ALDEA'] 	= 'Aldea';
	lang_es['HAB'] 		= 'Habitantes';
	lang_es['COORD'] 	= 'Coordenadas';
	lang_es['ACCION'] 	= 'Acciones';
	lang_es['ATACAR'] 	= 'Atacar';
	lang_es['COMERCIAR'] 	= 'Comerciar';
	lang_es['GUARDADO'] 	= 'Guardado';
	lang_es['DESP_ABR'] 	= 'Desp.';
	lang_es['FALTA'] 	= 'Falta';
	lang_es['HOY'] 		= 'hoy';
	lang_es['MANYANA'] 	= 'ma&ntilde;ana';
	lang_es['PAS_MANYANA'] 	= 'pasado ma&ntilde;ana';
	lang_es['MERCADO']	= 'Mercado';
	lang_es['CUARTEL']	= 'Cuartel';
	lang_es['PUNTO']	= 'Punto de encuentro';
	lang_es['CORRAL']	= 'Establo';
	lang_es['TALLER']	= 'Taller';
	lang_es['ENVIAR']	= 'Enviar';
	lang_es['COMPRAR']	= 'Comprar';
	lang_es['VENDER']	= 'Vender';
	lang_es['ENVIAR_IGM']	= 'Enviar IGM';
	lang_es['LISTO']	= 'Todo listo';
	lang_es['EL']		= 'el';
	lang_es['A_LAS']	= 'a las';
	lang_es['EFICIENCIA']	= 'Eficiencia';
	lang_es['NUNCA']	= 'Nunca';
	lang_es['PC']		= 'punto(s) de cultura';
	lang_es['FUNDAR']	= 'Ya puedes fundarla o conquistarla';
	lang_es['ALDEAS']	= 'aldea(s)';
	lang_es['ENV_TROPAS']	= 'Enviar Tropas';
	lang_es['RECURSO1']	= 'Le&ntilde;a';
	lang_es['RECURSO2']	= 'Barro';
	lang_es['RECURSO3']	= 'Hierro';
	lang_es['RECURSO4']	= 'Cereales';
	lang_es['TIEMPO']	= 'Tiempo';
	lang_es['COMP']		= 'Compactador';
	lang_es['STAT']		= 'Estad&iacute;stica';
	lang_es['OFREZCO']	= 'Ofrezco';
	lang_es['BUSCO']	= 'Busco';
	lang_es['TIPO']		= 'Tipo';
	lang_es['CUALQUIERA']	= 'Cualquiera';
	lang_es['DETALLES']	= 'Detalles';
	lang_es['MAP_EXT']	= 'Mapa extendido';
	lang_es['DISPONIBLE']	= 'S&oacute;lo disponibles';
	lang_es['SI']		= 'S&iacute;';
	lang_es['NO']		= 'No';
	lang_es['LOGIN']	= 'Login';
	lang_es['MARCADORES']	= 'Marcadores';
	lang_es['ANYADIR']	= 'A&ntilde;adir';
	lang_es['ENLACE']	= 'Direccion del nuevo marcador';
	lang_es['TEXTO']	= 'Texto para el nuevo marcador';
	lang_es['ELIMINAR']	= 'Eliminar';
	lang_es['MAPA']		= 'Mapa';
	lang_es['VERSION']	= 'La &uacute;ltima versi&oacute;n disponible es';
	lang_es['MAXTIME']	= 'Tiempo m&aacute;ximo';
	lang_es['CHECK']	= 'Comprobar nueva versi&oacute;n';
	lang_es['MAT_PRIMAS']	= 'Materias';
	lang_es['ATAQUES']	= 'Ataques';
	lang_es['CONSTR']	= 'Constr.';
	lang_es['TROPAS']	= 'Tropas';
	lang_es['ACTUALIZAR']	= 'Actualizar';
	lang_es['ARCHIVE']	= 'Archivo';
	lang_es['RESUMEN']	= 'Resumen';

	// Por IcEye y Andres_age
	var lang_en = new Array();
	var lang_uk = lang_en;
	var lang_us = lang_en;
	lang_en['ALIANZA'] 	= 'Alliance';
	lang_en['PERFIL'] 	= 'User Profile';
	lang_en['SIM'] 		= 'Combat simulator';
	lang_en['CALC'] 	= 'Travian Calc';
	lang_en['SEGURO'] 	= 'Are you sure?';
	lang_en['MARK'] 	= 'Select all';
	lang_en['PERDIDAS'] 	= 'Loss';
	lang_en['RENT'] 	= 'Profit';
	lang_en['SUBIR_NIVEL'] 	= 'Extension available';
	lang_en['JUGADOR'] 	= 'Player';
	lang_en['ALDEA'] 	= 'Village Name';
	lang_en['HAB'] 		= 'Population';
	lang_en['COORD'] 	= 'Coords';
	lang_en['ACCION'] 	= 'Actions';
	lang_en['ATACAR'] 	= 'Attack';
	lang_en['COMERCIAR'] 	= 'Send resources';
	lang_en['GUARDADO'] 	= 'Saved';
	lang_en['DESP_ABR'] 	= 'Mov.';
	lang_en['FALTA'] 	= 'You need';
	lang_en['HOY'] 		= 'today';
	lang_en['MANYANA'] 	= 'tomorrow';
	lang_en['PAS_MANYANA'] 	= 'day after tomorrow';
	lang_en['MERCADO'] 	= 'Marketplace';
	lang_en['CUARTEL'] 	= 'Barracks';
	lang_en['PUNTO'] 	= 'Rally point';
	lang_en['CORRAL'] 	= 'Stable';
	lang_en['TALLER'] 	= 'Workshop';
	lang_en['ENVIAR'] 	= 'Send resources';
	lang_en['GETRES'] 	= 'Get resources';
	lang_en['COMPRAR'] 	= 'Buy';
	lang_en['VENDER'] 	= 'Sell';
	lang_en['ENVIAR_IGM'] 	= 'Send IGM';
	lang_en['LISTO'] 	= 'Extension available';
	lang_en['EL'] 		= 'on';
	lang_en['A_LAS'] 	= 'at';
	lang_en['EFICIENCIA'] 	= 'Efficiency'; 
	lang_en['NUNCA']	= 'Never';
	lang_en['PC']						= 'culture points';
	lang_en['FUNDAR']				= 'You can found or conquer a new village';
	lang_en['ALDEAS']				= 'Village(s)';
	lang_en['ENV_TROPAS'] 	= 'Send troops';
	lang_en['RECURSO1']			= 'Wood';
	lang_en['RECURSO2']			= 'Clay';
	lang_en['RECURSO3']			= 'Iron';
	lang_en['RECURSO4']			= 'Crop';
	lang_en['TIEMPO']				= 'Time';
	lang_en['COMP']					= 'Report Compressor';
	lang_en['STAT']		= 'Statistics';
	lang_en['OFREZCO']	= 'Offering';
	lang_en['BUSCO']	= 'Searching';
	lang_en['TIPO']		= 'Type';
	lang_en['DISPONIBLE']	= 'Only available';
	lang_en['CUALQUIERA']	= 'Any';
	lang_en['SI']		= 'Yes';
	lang_en['NO']		= 'No';
				lang_en['MARCADORES']		= 'Bookmarks';
				lang_en['ANYADIR']			= 'Add';
				lang_en['ENLACE']				= 'New Bookmark URL';
				lang_en['TEXTO']				= 'New Bookmark Text';
	lang_en['ELIMINAR']	= 'Delete';
	lang_en['MAPA']		= 'Map';
	lang_en['CHECK']	= 'Check new version';
	lang_en['ARCHIVE']	= 'Archive';
	lang_en['RESUMEN']	= 'Summary';

	// Magyar
	var lang_hu = new Array();
	var lang_hu = lang_hu;
	var lang_sk = lang_hu;
	lang_hu['ALIANZA'] 	= 'Klán';
	lang_hu['PERFIL'] 	= 'Profil';
	lang_hu['SIM'] 		= 'Harc szimulator';
	lang_hu['CALC'] 	= 'Travian Számológép';
	lang_hu['SEGURO'] 	= 'Biztos benne?';
	lang_hu['MARK'] 	= 'Mindent kijelöl';
	lang_hu['PERDIDAS'] 	= 'Veszteség';
	lang_hu['RENT'] 	= 'Profit';
	lang_hu['SUBIR_NIVEL'] 	= 'Építető';
	lang_hu['JUGADOR'] 	= 'Játékos';
	lang_hu['ALDEA'] 	= 'Falu neve';
	lang_hu['HAB'] 		= 'Népesség';
	lang_hu['COORD'] 	= 'Koordináták';
	lang_hu['ACCION'] 	= 'Akció';
	lang_hu['ATACAR'] 	= 'Támadás';
	lang_hu['COMERCIAR'] 	= 'Nyersanyag küldése';
	lang_hu['GUARDADO'] 	= 'Mentve';
	lang_hu['DESP_ABR'] 	= 'Mov.';
	lang_hu['FALTA'] 	= 'Szükséged van még';
	lang_hu['HOY'] 		= 'ma';
	lang_hu['MANYANA'] 	= 'holnap';
	lang_hu['PAS_MANYANA'] 	= 'Holnapután';
	lang_hu['MERCADO'] 	= 'Piac';
	lang_hu['CUARTEL'] 	= 'Barak';
	lang_hu['PUNTO'] 	= 'Gyülekezőtér';
	lang_hu['CORRAL'] 	= 'Istálló';
	lang_hu['TALLER'] 	= 'Műhely';
	lang_hu['ENVIAR'] 	= 'Nyersanyag küldés';
	lang_hu['GETRES'] 	= 'Nyersanyagok mutatása';
	lang_hu['COMPRAR'] 	= 'Elad';
	lang_hu['VENDER'] 	= 'Vásárol';
	lang_hu['ENVIAR_IGM'] 	= 'Üzenet küldése';
	lang_hu['LISTO'] 	= 'Kész lesz';
	lang_hu['EL'] 		= 'on';
	lang_hu['A_LAS'] 	= 'at';
	lang_hu['EFICIENCIA'] 	= 'Hatékonyság'; 
	lang_hu['NUNCA']	= 'Soha';
	lang_hu['PC']		= 'Kultúrális pont';
	lang_hu['FUNDAR']	= 'You can found or conquer a new village';
	lang_hu['ALDEAS']	= 'Falvak';
	lang_hu['ENV_TROPAS'] 	= 'Egységek küldése';
	lang_hu['RECURSO1']	= 'Fa';
	lang_hu['RECURSO2']	= 'Agyag';
	lang_hu['RECURSO3']	= 'Vas';
	lang_hu['RECURSO4']	= 'Búza';
	lang_hu['TIEMPO']	= 'Idő';
	lang_hu['COMP']		= 'Riport tömörítő';
	lang_hu['STAT']		= 'Statisztika';
	lang_hu['OFREZCO']	= 'Ajánl';
	lang_hu['BUSCO']	= 'Keres';
	lang_hu['TIPO']		= 'Typus';
	lang_hu['DISPONIBLE']	= 'Elérhető';
	lang_hu['CUALQUIERA']	= 'Mind';
	lang_hu['SI']		= 'Igen';
	lang_hu['NO']		= 'Nem';
	lang_hu['MARCADORES']	= 'Könyvjelző';
	lang_hu['ANYADIR']	= 'Hozzáad';
	lang_hu['ENLACE']	= 'Új könyvjelző';
	lang_hu['TEXTO']	= 'New Bookmark Text';
	lang_hu['ELIMINAR']	= 'Töröl';
	lang_hu['MAPA']		= 'Térkép';
	lang_hu['CHECK']	= 'Új verzió';
	lang_hu['ARCHIVE']	= 'Archive';
	lang_hu['RESUMEN']	= 'Összesítés';

	// Por IcEye (corregido y actualizado por rosfe y Danielle) 
	var lang_it = new Array(); 
	lang_it['ALIANZA'] 	= 'Alleanza'; 
	lang_it['PERFIL'] 	= 'Profilo'; 
	lang_it['SIM'] 		= 'Combat simulator'; 
	lang_it['CALC'] 	= 'Travian Calc'; 
	lang_it['SEGURO'] 	= 'Sei sicuro?'; 
	lang_it['MARK'] 	= 'Seleziona tutto'; 
	lang_it['PERDIDAS'] 	= 'Perdita in materiale'; 
	lang_it['RENT'] 	= 'Guadagno'; 
	lang_it['SUBIR_NIVEL'] 	= 'Ampliamento disponibile'; 
	lang_it['JUGADOR'] 	= 'Proprietario'; 
	lang_it['ALDEA'] 	= 'Nome villaggio'; 
	lang_it['HAB'] 		= 'Popolazione'; 
	lang_it['COORD'] 	= 'Coordinate'; 
	lang_it['ACCION'] 	= 'Azioni'; 
	lang_it['ATACAR'] 	= 'Invia truppe'; 
	lang_it['COMERCIAR'] 	= 'Invia mercanti'; 
	lang_it['GUARDADO'] 	= 'Salvato';
	lang_it['DESP_ABR'] 	= 'Disp.';
	lang_it['FALTA'] 	= 'Mancano'; 
	lang_it['HOY'] 		= 'oggi'; 
	lang_it['MANYANA'] 	= 'domani'; 
	lang_it['PAS_MANYANA'] 	= 'dopodomani'; 
	lang_it['MERCADO'] 	= 'Mercato'; 
	lang_it['CUARTEL'] 	= 'Campo d&quot; addestramento'; 
	lang_it['PUNTO'] 	= 'Caserma'; 
	lang_it['CORRAL'] 	= 'Scuderia'; 
	lang_it['TALLER'] 	= 'Officina'; 
	lang_it['ENVIAR'] 	= 'Invia risorse'; 
	lang_it['COMPRAR'] 	= 'Compra risorse'; 
	lang_it['VENDER'] 	= 'Vendi risorse'; 
	lang_it['ENVIAR_IGM'] 	= 'Invia messaggio'; 
	lang_it['LISTO'] 	= 'Ampliamento disponibile'; 
	lang_it['EL'] 		= 'il'; 
	lang_it['A_LAS'] 	= 'alle'; 
	lang_it['EFICIENCIA'] 	= 'Efficienza'; 
	lang_it['NUNCA'] 	= 'Mai'; 
	lang_it['PC'] 		= 'punti cultura'; 
	lang_it['FUNDAR'] 	= 'Che puoi trovare e conquistare'; 
	lang_it['ALDEAS'] 	= 'Villaggio(i)'; 
	lang_it['ENV_TROPAS'] 	= 'Invia Truppe'; 
	lang_it['RECURSO1'] 	= 'Legno'; 
	lang_it['RECURSO2'] 	= 'Argilla'; 
	lang_it['RECURSO3'] 	= 'Ferro'; 
	lang_it['RECURSO4'] 	= 'Grano'; 
	lang_it['TIEMPO'] 	= 'Tempo'; 
	lang_it['COMP'] 	= 'Compattatore'; 
	lang_it['STAT'] 	= 'Statistica'; 
	lang_it['OFREZCO'] 	= 'Offerta'; 
	lang_it['BUSCO'] 	= 'Richiesta'; 
	lang_it['TIPO'] 	= 'Percentuale di scambio'; 
	lang_it['CUALQUIERA'] 	= 'Tutti'; 
	lang_it['DETALLES'] 	= 'Dettagli'; 
	lang_it['MAP_EXT'] 	= 'Mappa Estesa'; 
	lang_it['DISPONIBLE'] 	= 'Disponibile'; 
	lang_it['SI'] 		= 'Si'; 
	lang_it['NO'] 		= 'No'; 
	lang_it['MARCADORES'] 	= 'Obiettivi'; 
	lang_it['ANYADIR'] 	= 'Aggiungi obbiettivo'; 
	lang_it['ENLACE'] 	= 'Direzione del nuovo obbiettivo'; 
	lang_it['TEXTO'] 	= 'Caratteristiche del nuovo obbiettivo'; 
	lang_it['ELIMINAR'] 	= 'Eliminare'; 
	lang_it['LOGIN'] 	= 'Login'; 
	lang_it['MAPA'] 	= 'Mappa'; 
	lang_it['VERSION'] 	= 'L&quot; ultima versione disponible �'; 
	lang_it['MAXTIME'] 	= 'Tempo massimo'; 
	lang_it['CHECK'] 	= 'Controllare nuove versioni'; 
	lang_it['MAT_PRIMAS'] 	= 'Risorse'; 
	lang_it['ATAQUES'] 	= 'Attacchi'; 
	lang_it['CONSTR'] 	= 'Costruz.'; 
	lang_it['TROPAS'] 	= 'Truppe'; 
	lang_it['ACTUALIZAR'] 	= 'Aggiornare';

	// Autor anonimo a peticion expresa
	var lang_de = new Array();
	lang_de['ALIANZA'] 	= 'Allianz';
	lang_de['PERFIL'] 	= 'Profil';
	lang_de['SIM'] 		= 'Kampfsimulator';
	lang_de['CALC'] 	= 'Marktplatzrechner';
	lang_de['SEGURO'] 	= 'Wirklich?';
	lang_de['MARK'] 	= 'Alle';
	lang_de['PERDIDAS'] 	= 'Rohstoff-Verluste';
	lang_de['RENT'] 	= 'Rentabilit&auml;t';
	lang_de['SUBIR_NIVEL'] 	= 'Ausbau m&ouml;glich';
	lang_de['JUGADOR'] 	= 'Spieler';
	lang_de['ALDEA'] 	= 'Dorf';
	lang_de['HAB'] 		= 'Einwohner';
	lang_de['COORD'] 	= 'Koordinaten';
	lang_de['ACCION'] 	= 'Aktion';
	lang_de['ATACAR'] 	= 'Angreifen';
	lang_de['COMERCIAR'] 	= 'H�ndler schicken';
	lang_de['GUARDADO'] 	= 'Gespeichert';
	lang_de['DESP_ABR'] 	= 'Felder';
	lang_de['FALTA'] 	= 'Ben&ouml;tige';
	lang_de['HOY'] 		= 'heute';
	lang_de['MANYANA'] 	= 'morgen';
	lang_de['PAS_MANYANA'] 	= '&uuml;bermorgen';
	lang_de['MERCADO'] 	= 'Marktplatz';
	lang_de['CUARTEL'] 	= 'Kaserne';
	lang_de['PUNTO'] 	= 'Versammlungsplatz';
	lang_de['CORRAL'] 	= 'Stall';
	lang_de['TALLER'] 	= 'Werkstatt';
	lang_de['ENVIAR'] 	= 'Marktplatz';
	lang_de['COMPRAR'] 	= 'Kaufen';
	lang_de['VENDER'] 	= 'Verkaufen';
	lang_de['ENVIAR_IGM'] 	= 'IGM schreiben';
	lang_de['LISTO'] 	= 'Genug';
	lang_de['EL'] 		= '';
	lang_de['A_LAS'] 	= 'um';
	lang_de['EFICIENCIA'] 	= 'Effektivit&auml;t';
	lang_de['NUNCA'] 	= 'Nie';
	lang_de['PC'] 		= 'Kulturpunkte';
	lang_de['FUNDAR'] 	= 'Genug Kulturpunkte';
	lang_de['ALDEAS'] 	= 'weitere Siedlung(en)';
	lang_de['ENV_TROPAS'] 	= 'Truppen senden';
	lang_de['RECURSO1'] 	= 'Lehm';
	lang_de['RECURSO2'] 	= 'Holz';
	lang_de['RECURSO3'] 	= 'Eisen';
	lang_de['RECURSO4'] 	= 'Getreide';
	lang_de['TIEMPO'] 	= 'Zeit';
	lang_de['COMP'] 	= 'KB 2 BBCode';
	lang_de['MAPA']		= 'Karte';

	// Por Ferran -=(Killo)=- (ampliado y corregido por Prometeus)
	var lang_fr = new Array(); 
	lang_fr['ALIANZA'] 	= 'Alliance'; 
	lang_fr['PERFIL'] 	= 'Profil'; 
	lang_fr['SIM'] 		= 'Simulateur'; 
	lang_fr['CALC'] 	= 'Calculateur'; 
	lang_fr['SEGURO'] 	= 'Es-tu s&ucirc;r?'; 
	lang_fr['MARK'] 	= 'Marquer tous'; 
	lang_fr['PERDIDAS'] 	= 'Pertes en mat&eacute;riels'; 
	lang_fr['RENT'] 	= 'Rentabilit&eacute;'; 
	lang_fr['SUBIR_NIVEL'] 	= 'Tu peux d&eacute;j&agrave; augmenter son niveau'; 
	lang_fr['JUGADOR'] 	= 'Joueur'; 
	lang_fr['ALDEA'] 	= 'Village'; 
	lang_fr['HAB'] 		= 'Population'; 
	lang_fr['COORD'] 	= 'Coordonn&eacute;es'; 
	lang_fr['ACCION'] 	= 'Actions'; 
	lang_fr['ATACAR'] 	= 'Attaquer'; 
	lang_fr['COMERCIAR'] 	= 'Commercer'; 
	lang_fr['GUARDADO'] 	= 'Sauvegarde'; 
	lang_fr['DESP_ABR'] 	= 'D&eacute;placer'; 
	lang_fr['FALTA'] 	= 'Il manque'; 
	lang_fr['HOY'] 		= 'aujourd\'hui'; 
	lang_fr['MANYANA'] 	= 'demain'; 
	lang_fr['PAS_MANYANA'] 	= 'apr&egrave;s-demain'; 
	lang_fr['MERCADO'] 	= 'Place du march&eacute;'; 
	lang_fr['CUARTEL'] 	= 'Caserne'; 
	lang_fr['PUNTO'] 	= 'Place de rassemblement'; 
	lang_fr['CORRAL'] 	= 'Ecurie'; 
	lang_fr['TALLER'] 	= 'Atelier'; 
	lang_fr['ENVIAR'] 	= 'Envoyer des ressources'; 
	lang_fr['COMPRAR'] 	= 'Acheter des ressources'; 
	lang_fr['VENDER'] 	= 'Vendre des resources'; 
	lang_fr['ENVIAR_IGM'] 	= 'Envoyer MSG'; 
	lang_fr['LISTO'] 	= 'Pr&ecirc;t'; 
	lang_fr['EL'] 		= 'le'; 
	lang_fr['A_LAS'] 	= '&agrave;'; 
	lang_fr['EFICIENCIA'] 	= 'Efficacit&eacute;'; 
	lang_fr['NUNCA'] 	= 'Jamais'; 
	lang_fr['PC'] 		= 'point(s) de culture'; 
	lang_fr['FUNDAR'] 	= 'Tu peux d&eacute;j&agrave; coloniser ou conqu&eacute;rir'; 
	lang_fr['ALDEAS'] 	= 'village(s)'; 
	lang_fr['ENV_TROPAS'] 	= 'Envoyer unit&eacute;s'; 
	lang_fr['RECURSO1'] 	= 'Bois'; 
	lang_fr['RECURSO2'] 	= 'Terre'; 
	lang_fr['RECURSO3'] 	= 'Fer'; 
	lang_fr['RECURSO4'] 	= 'C&eacute;r&eacute;ales'; 
	lang_fr['TIEMPO'] 	= 'Temps'; 
	lang_fr['COMP'] 	= 'Compresseur';
	lang_fr['STAT']		= 'Statistiques';
	lang_fr['OFREZCO']	= 'Offre';
	lang_fr['BUSCO']	= 'Recherche';
	lang_fr['TIPO']		= 'Type';
	lang_fr['CUALQUIERA']	= 'Toutes';
	lang_fr['DETALLES']	= 'D&eacute;tail';
	lang_fr['MAP_EXT']	= 'Carte etendue';
				lang_fr['DISPONIBLE']		= 'Disponible';
				lang_fr['SI']						= 'Oui';
				lang_fr['NO']						= 'Non';
				lang_fr['MARCADORES']		= 'Liens';
				lang_fr['ANYADIR']			= 'Ajouter';
				lang_fr['ENLACE']				= 'URL du nouveau lien';
				lang_fr['TEXTO']				= 'Texte du nouveau lien';

	// Por autor anonimo
	var lang_nl = new Array(); 
	lang_nl['ALIANZA'] 	= 'Alliantie';
	lang_nl['PERFIL'] 	= 'Speler Profiel';
	lang_nl['SIM'] 		= 'Gevecht simulator';
	lang_nl['CALC'] 	= 'Travian Calc';
	lang_nl['SEGURO'] 	= 'Ben je zeker?';
	lang_nl['MARK'] 	= 'Selecteer alles';
	lang_nl['PERDIDAS'] 	= 'Verlies';
	lang_nl['RENT'] 	= 'Winst';
	lang_nl['SUBIR_NIVEL'] 	= 'Uitbreiding beschikbaar';
	lang_nl['JUGADOR'] 	= 'Speler';
	lang_nl['ALDEA'] 	= 'Dorpsnaam';
	lang_nl['HAB'] 		= 'Populatie';
	lang_nl['COORD'] 	= 'Co&ouml;rd';
	lang_nl['ACCION'] 	= 'Acties';
	lang_nl['ATACAR'] 	= 'Aanvallen';
	lang_nl['COMERCIAR'] 	= 'Stuur handelaren';
	lang_nl['GUARDADO'] 	= 'Bewaard';
	lang_nl['DESP_ABR'] 	= 'Velden';
	lang_nl['FALTA'] 	= 'Nog nodig';
	lang_nl['HOY'] 		= 'vandaag';
	lang_nl['MANYANA'] 	= 'morgen';
	lang_nl['PAS_MANYANA'] 	= 'overmorgen';
	lang_nl['MERCADO'] 	= 'Marktplaats';
	lang_nl['CUARTEL'] 	= 'Barakken';
	lang_nl['PUNTO'] 	= 'Verzamelpunt';
	lang_nl['CORRAL'] 	= 'Stal';
	lang_nl['TALLER'] 	= 'Werkplaats';
	lang_nl['ENVIAR'] 	= 'Stuur handelaren';
	lang_nl['COMPRAR'] 	= 'Koop';
	lang_nl['VENDER'] 	= 'Verkoop';
	lang_nl['ENVIAR_IGM'] 	= 'Stuur IGM';
	lang_nl['LISTO'] 	= 'Uitbreiding beschikbaar';
	lang_nl['EL'] 		= 'om';
	lang_nl['A_LAS'] 	= 'om';
	lang_nl['EFICIENCIA'] 	= 'Effici&euml;ntie';
	lang_nl['NUNCA'] 	= 'Nooit';
	lang_nl['PC'] 		= 'cultuur punten';
	lang_nl['FUNDAR'] 	= 'Je kan een nieuwe stad oprichten of veroveren';
	lang_nl['ALDEAS'] 	= 'Dorp(en)';
	lang_nl['ENV_TROPAS'] 	= 'Stuur troepen';
	lang_nl['RECURSO1'] 	= 'Hout';
	lang_nl['RECURSO2'] 	= 'Klei';
	lang_nl['RECURSO3'] 	= 'Ijzer';
	lang_nl['RECURSO4'] 	= 'Graan';
	lang_nl['TIEMPO'] 	= 'Tijd';
	lang_nl['COMP'] 	= 'Gevechtsverslag Compressor';
	lang_nl['STAT'] 	= 'Statistieken';
	lang_nl['OFREZCO'] 	= 'Bieden';
	lang_nl['BUSCO'] 	= 'Zoeken';
	lang_nl['TIPO'] 	= 'Type';
	lang_nl['CUALQUIERA'] 	= 'Alles';
	lang_nl['DETALLES'] 	= 'Details';
	lang_nl['MAP_EXT'] 	= 'Grotere kaart';
	lang_nl['SI'] 		= 'Ja';
	lang_nl['NO'] 		= 'Nee';
	lang_nl['MARCADORES'] 	= 'Links';
	lang_nl['ANYADIR'] 	= 'Toevoegen';
	lang_nl['ENLACE'] 	= 'Nieuwe Link URL';
	lang_nl['TEXTO'] 	= 'Nieuwe Link Text';
	lang_nl['ELIMINAR'] 	= 'Verwijderen';
	lang_nl['MAPA'] 	= 'Kaart';

	// Por MikeP (Dedicado � Li), corregido y amplicado por Jo�o Frade
	var lang_pt = new Array();
	lang_pt['ACCION'] 	= 'Ac&ccedil;&otilde;es';
	lang_pt['A_LAS'] 	= '&aacute;s';
	lang_pt['ALDEA'] 	= 'Nome da Aldeia';
	lang_pt['ALDEAS'] 	= 'Aldeia(s)';
	lang_pt['ALIANZA'] 	= 'Alian&ccedil;a';
	lang_pt['ANYADIR']	= 'Adicionar';
	lang_pt['ATACAR'] 	= 'Atacar';
	lang_pt['BUSCO']	= 'Pede';
	lang_pt['CALC'] 	= 'Calculadora';
	lang_pt['COMERCIAR'] 	= 'Enviar recursos';
	lang_pt['COMP'] 	= 'Compactador de Batalhas';
	lang_pt['COMPRAR']	= 'Comprar mat&eacute;rias primas';
	lang_pt['COORD'] 	= 'Coordenadas';
	lang_pt['CORRAL'] 	= 'Cavalari&ccedil;a';
	lang_pt['CUALQUIERA'] 	= 'Qualquer';
	lang_pt['CUARTEL'] 	= 'Quartel';
	lang_pt['DESP_ABR'] 	= 'Mov.';
	lang_pt['DETALLES']	= 'Detalhes';
	lang_pt['DISPONIBLE']	= 'S&oacute; dispon&iacute;veis';
	lang_pt['EFICIENCIA'] 	= 'Efici&ecirc;ncia';
	lang_pt['EL'] 		= 'a';
	lang_pt['ELIMINAR']	= 'Eliminar';
	lang_pt['ENLACE']	= 'Sitio do novo atalho';
	lang_pt['ENVIAR']	= 'Enviar mat&eacute;rias primas';
	lang_pt['ENVIAR_IGM'] 	= 'Enviar IGM';
	lang_pt['FALTA'] 	= 'Faltam';
	lang_pt['FUNDAR'] 	= 'Podes fundar ou conquistar uma nova aldeia';
	lang_pt['GUARDADO'] 	= 'Guardado';
	lang_pt['HAB'] 		= 'Habitantes';
	lang_pt['HOY'] 		= 'hoje';
	lang_pt['JUGADOR'] 	= 'Jogador';
	lang_pt['LISTO'] 	= 'Dispon&iacute;vel';
	lang_pt['LOGIN']	= 'Login';
	lang_pt['MANYANA'] 	= 'amanh&atilde;';
	lang_pt['MAP_EXT']	= 'Mapa extendido';
	lang_pt['MARCADORES']	= 'Atalhos';
	lang_pt['MARK'] 	= 'Seleccionar tudo';
	lang_pt['MERCADO']	= 'Mercado';
	lang_pt['NO'] 		= 'N&atilde;o';
	lang_pt['NUNCA']	= 'Nunca';
	lang_pt['OFREZCO']	= 'Oferece';
	lang_pt['PAS_MANYANA'] 	= 'depois de amanh&atilde;';
	lang_pt['PC'] 		= 'pontos de cultura';
	lang_pt['PERDIDAS'] 	= 'Perdas';
	lang_pt['PERFIL'] 	= 'Perfil';
	lang_pt['PUNTO'] 	= 'Ponto de encontro';
	lang_pt['RECURSO1'] 	= 'Madeira';
	lang_pt['RECURSO2']	= 'Barro';
	lang_pt['RECURSO3'] 	= 'Ferro';
	lang_pt['RECURSO4'] 	= 'Cereais';
	lang_pt['RENT'] 	= 'Lucro';
	lang_pt['SEGURO'] 	= 'Tem a certeza?';
	lang_pt['SIM'] 		= 'Simulador';
	lang_pt['SI'] 		= 'Sim';
	lang_pt['STAT'] 	= 'Estat&iacute;stica';
	lang_pt['SUBIR_NIVEL'] 	= 'J&aacute; podes subir de n&iacute;vel';
	lang_pt['TALLER'] 	= 'Oficina';
	lang_pt['TEXTO']	= 'Texto para o novo atalho';
	lang_pt['TIEMPO'] 	= 'Tempo';
	lang_pt['TIPO']		= 'Tipo';
	lang_pt['ENV_TROPAS'] 	= 'Enviar tropas';
	lang_pt['VENDER']	= 'Vender mat&eacute;rias primas';

	// Polaco (travian3.pl) gracias a Nidhog y corregido por Matrixik
	var lang_pl = new Array(); 
	lang_pl['ALIANZA'] 	= 'Sojusz';
	lang_pl['PERFIL'] 	= 'Profil';
	lang_pl['SIM'] 		= 'Symulator Walki';
	lang_pl['CALC'] 	= 'Travian Calc';
	lang_pl['SEGURO'] 	= 'Jeste&#347; pewny?';
	lang_pl['MARK'] 	= 'Zaznacz wszystko';
	lang_pl['PERDIDAS'] 	= 'Straty';
	lang_pl['RENT'] 	= 'Zysk';
	lang_pl['SUBIR_NIVEL'] 	= 'Rozbudowa mo&#380;liwa';
	lang_pl['JUGADOR'] 	= 'Gracz';
	lang_pl['ALDEA'] 	= 'Nazwa osady';
	lang_pl['HAB'] 		= 'Populacja';
	lang_pl['COORD'] 	= 'Koordynaty';
	lang_pl['ACCION'] 	= 'Akcja';
	lang_pl['ATACAR'] 	= 'Atak';
	lang_pl['COMERCIAR'] 	= 'Wy&#347;lij surowce';
	lang_pl['GUARDADO'] 	= 'Zapisane';
	lang_pl['DESP_ABR'] 	= 'Przes.';
	lang_pl['FALTA'] 	= 'Potrzebujesz';
	lang_pl['HOY'] 		= 'dzisiaj';
	lang_pl['MANYANA'] 	= 'jutro';
	lang_pl['PAS_MANYANA'] 	= 'pojutrze';
	lang_pl['MERCADO'] 	= 'Rynek';
	lang_pl['CUARTEL'] 	= 'Koszary';
	lang_pl['PUNTO'] 	= 'Miejsce zbi&#243;rki';
	lang_pl['CORRAL'] 	= 'Stajnia';
	lang_pl['TALLER'] 	= 'Warsztat';
	lang_pl['ENVIAR'] 	= 'Wy&#347;lij surowce';
	lang_pl['COMPRAR'] 	= 'Kup';
	lang_pl['VENDER'] 	= 'Sprzedaj';
	lang_pl['ENVIAR_IGM'] 	= 'Wy&#347;lij PW';
	lang_pl['LISTO'] 	= 'Rozbudowa mo&#380;liwa';
	lang_pl['EL'] 		= 'dnia';
	lang_pl['A_LAS'] 	= 'o';
	lang_pl['EFICIENCIA'] 	= 'Efektywno&#347;&#263;'; 
	lang_pl['NUNCA']	= 'Nigdy';
	lang_pl['PC']						= 'Punkty kultury';	
	lang_pl['FUNDAR']				= 'Mo&#380;esz za&#322;o&#380;y&#263; lub podbi&#263; now&#261; osad&#281;';	
	lang_pl['ALDEAS']				= 'Osada(y)';	
	lang_pl['ENV_TROPAS'] 	= 'Wy&#347;lij jednostki';	
	lang_pl['RECURSO1']			= 'Drewno';	
	lang_pl['RECURSO2']			= 'Glina';	
	lang_pl['RECURSO3']			= '&#379;elazo';	
	lang_pl['RECURSO4']			= 'Zbo&#380;e';	
	lang_pl['TIEMPO']				= 'Czas';	
	lang_pl['COMP']					= 'Konwerter Raport&#243;w';	
	lang_pl['STAT']		= 'Statystyka';
	lang_pl['OFREZCO'] 	= 'Oferuje';
	lang_pl['BUSCO']	= 'Szukam';
	lang_pl['TIPO']		= 'Przelicznik';
	lang_pl['CUALQUIERA']	= 'Dowolny';
	lang_pl['DETALLES']	= 'Detale';
	lang_pl['MAP_EXT']	= 'Wi&#281;ksza mapa';
	lang_pl['DISPONIBLE']	= 'Tylko wybrane';
	lang_pl['SI'] 		= 'Tak';
	lang_pl['NO']		= 'Nie';
	lang_pl['LOGIN']	= 'Zaloguj';
	lang_pl['MARCADORES']		= 'Zak&#322;adki';
				lang_pl['ANYADIR']			= 'Dodaj';
				lang_pl['ENLACE']				= 'URL Nowej Zakladki';
				lang_pl['TEXTO']				= 'Nazwa Nowej Zakladki';
	lang_pl['ELIMINAR']	= 'Kasuj';
	lang_pl['MAPA']		= 'Mapa';
	lang_pl['VERSION']	= 'Ostatnia dost&#281;pna wersja';
	lang_pl['MAXTIME']	= 'Maksymalny czas';
	lang_pl['CHECK']	= 'Sprawd&#378; czy jest nowsza wersja';
	lang_pl['MAT_PRIMAS']	= 'Sprawy';
	lang_pl['ATAQUES']	= 'Ataki';
	lang_pl['CONSTR']	= 'Budowa';
	lang_pl['TROPAS']	= 'Jednostki';
	lang_pl['ACTUALIZAR']	= 'Aktualizuj';
	lang_pl['ARCHIVE']	= 'Archiwum';
	lang_pl['RESUMEN']	= 'Podsumowanie';

	// Turco (travian.com.tr) Por Tarik
	var lang_tr = new Array(); 
	lang_tr['ALIANZA'] 	= 'Birlik';
	lang_tr['PERFIL'] 	= 'Profil';
	lang_tr['SIM'] 		= 'Savas-Simulat�r�';
	lang_tr['CALC'] 	= 'Travian Hesaplayici';
	lang_tr['SEGURO'] 	= 'Emin misiniz?';
	lang_tr['MARK'] 	= 'T�m�n� sec';
	lang_tr['PERDIDAS'] 	= 'Kayip';
	lang_tr['RENT'] 	= 'Kazanc';
	lang_tr['SUBIR_NIVEL'] 	= 'Bir �st seviyeye gelistirilebilir';
	lang_tr['JUGADOR'] 	= 'Oyuncu';
	lang_tr['ALDEA'] 	= 'K�y Adi';
	lang_tr['HAB'] 		= 'N�fus';
	lang_tr['COORD'] 	= 'Koordinat';
	lang_tr['ACCION'] 	= 'Eylemler';
	lang_tr['ATACAR'] 	= 'Saldir';
	lang_tr['COMERCIAR'] 	= 'Hammadde g�nder';
	lang_tr['GUARDADO'] 	= 'Saklanan';
	lang_tr['DESP_ABR'] 	= 'Mov.';
	lang_tr['FALTA'] 	= 'Gerekli';
	lang_tr['HOY'] 		= 'bug�n';
	lang_tr['MANYANA'] 	= 'yarin';
	lang_tr['PAS_MANYANA'] 	= 'ertesi g�n';
	lang_tr['MERCADO'] 	= 'Pazar';
	lang_tr['CUARTEL'] 	= 'Kisla';
	lang_tr['PUNTO'] 	= 'Askeri �s';
	lang_tr['CORRAL'] 	= 'Ahir';
	lang_tr['TALLER'] 	= 'Akademi';
	lang_tr['ENVIAR'] 	= 'Hammadde g�nder';
	lang_tr['COMPRAR'] 	= 'Satin Al';
	lang_tr['VENDER'] 	= 'Sat';
	lang_tr['ENVIAR_IGM'] 	= 'Send IGM';
	lang_tr['LISTO'] 	= 'Bir �st seviyeye gelistirme';
	lang_tr['EL'] 		= 'saat';
	lang_tr['A_LAS'] 	= '';
	lang_tr['EFICIENCIA'] 	= 'Verimlilik'; 
	lang_tr['NUNCA']	= 'Hi�';
	lang_tr['PC']						= 'K�lt�r puani';
	lang_tr['FUNDAR']				= 'Yeni bir k�y kurabilir veya fethedebilirsiniz';
	lang_tr['ALDEAS']				= 'K�yler';
	lang_tr['TROPAS']				= 'Asker g�nder';
	lang_tr['RECURSO1']			= 'Odun';
	lang_tr['RECURSO2']			= 'Tu�la';
	lang_tr['RECURSO3']			= 'Demir';
	lang_tr['RECURSO4']			= 'Tahil';
	lang_tr['TIEMPO']				= 'Zaman';
	lang_tr['COMP']					= 'Report Compressor';
	lang_tr['STAT']		= '�statistik';
	lang_tr['OFREZCO']	= '�nerilen';
	lang_tr['BUSCO']	= 'Talep edilen';
	lang_tr['TIPO']		= 'Oran';
	lang_tr['CUALQUIERA']	= 'Herhangi';
	lang_tr['DETALLES']	= 'Detaylar';
	lang_tr['MAP_EXT']	= 'Genisletilmis Harita';
	lang_tr['DISPONIBLE']	= 'Sadece mevcut olanlar';
	lang_tr['SI']		= 'Evet';
	lang_tr['NO']		= 'Hayir';
	lang_tr['LOGIN']	= 'Giris';
	lang_tr['MARCADORES']		= 'Yer imleri';
	lang_tr['ANYADIR']			= 'Ekle';
	lang_tr['ENLACE']				= 'Yeni yer imi URL';
	lang_tr['TEXTO']				= 'Yeni yer imi Text';
	lang_tr['ELIMINAR']	= 'Sil';
	lang_tr['MAPA']		= 'Harita';	
	lang_tr['VERSION']	= 'S�r�m';
	lang_tr['MAXTIME']	= 'Azami s�re';

	// Rumano (travian.ro) gracias a Dan Aslau
	var lang_ro = new Array();
	lang_ro['ALIANZA']		= 'Alianta';
	lang_ro['PERFIL']	 	= 'Profil';
	lang_ro['SIM']	 	= 'Simulator';
	lang_ro['CALC']	 	= 'Travian Calc';
	lang_ro['SEGURO']	 	= 'Esti sigur?';
	lang_ro['MARK']	 	= 'Selecteaza tot';
	lang_ro['PERDIDAS']	 	= 'Pierderi';
	lang_ro['RENT']	 	= 'Profit';
	lang_ro['SUBIR_NIVEL']	= 'Upgrade posibil acum';
	lang_ro['JUGADOR']		= 'Jucator';
	lang_ro['ALDEA']		= 'Nume sat';
	lang_ro['HAB']	 	= 'Populatie';
	lang_ro['COORD']		= 'Coordonate';
	lang_ro['ACCION']	 	= 'Actiuni';
	lang_ro['ATACAR']	 	= 'Ataca';
	lang_ro['COMERCIAR']		= 'Trimite resurse';
	lang_ro['GUARDADO']	 	= 'Salvat';
	lang_ro['DESP_ABR']	 	= 'Randuri';
	lang_ro['FALTA']		= 'Ai nevoie de';
	lang_ro['HOY']	 	= 'azi';
	lang_ro['MANYANA']		= 'maine';
	lang_ro['PAS_MANYANA']	= 'poimaine';
	lang_ro['MERCADO']		= 'Targ';
	lang_ro['CUARTEL']			= 'Cazarma';
	lang_ro['PUNTO'] 	= 'Adunare';
	lang_ro['CORRAL'] 	= 'Grajd';
	lang_ro['TALLER'] 	= 'Atelier';
	lang_ro['ENVIAR'] 	= 'Trimite';
	lang_ro['COMPRAR'] 	= 'Cumpara';
	lang_ro['VENDER'] 	= 'Vinde';
	lang_ro['ENVIAR_IGM'] 	= 'Trimite mesaj';
	lang_ro['LISTO'] 	= 'Upgrade posibil';
	lang_ro['EL'] 		= 'in';
	lang_ro['A_LAS'] 	= 'la';
	lang_ro['EFICIENCIA'] 	= 'Eficienta';
	lang_ro['NUNCA'] 	= 'Niciodata';
	lang_ro['PC']						= 'puncte de cultura';
	lang_ro['FUNDAR']				= 'Poti sa cuceresti sau sa formezi un nou sat';
	lang_ro['ALDEAS']				= 'Sat(e)';
	lang_ro['TROPAS']				= 'Trimite trupe';
	lang_ro['RECURSO1']			= 'Lemn';
	lang_ro['RECURSO2']			= 'Argila';
	lang_ro['RECURSO3']			= 'Fier';
	lang_ro['RECURSO4']			= 'Hrana';
	lang_ro['TIEMPO']				= 'Timp';
	lang_ro['COMP'] 	= 'Arhivare rapoarte';
	lang_ro['STAT'] 	= 'Statistici';
	lang_ro['CUALQUIERA'] 	= 'Oricare';
	lang_ro['SI'] 		= 'Da';
	lang_ro['NO'] 		= 'Nu';
	lang_ro['OFREZCO'] 	= 'Ofera';
	lang_ro['BUSCO'] 	= 'Cauta';
	lang_ro['TIPO'] 	= 'Tip';
	lang_ro['MAXTIME'] 	= 'Timp maxim';
	lang_ro['DISPONIBLE'] 	= 'Doar cele disponibile';
	lang_ro['MARCADORES'] 	= 'Scurtaturi';
	lang_ro['ANYADIR'] 	= 'Adauga';
	lang_ro['ENLACE'] 	= 'URL';
	lang_ro['TEXTO']	= 'Text';
	lang_ro['ELIMINAR'] 	= 'Sterge';
	lang_ro['MAPA'] 	= 'Harta';

/*
	// Ruso (travian.ru) Por Vladimir Yu Belov
	var lang_ru = new Array();

	// Danes (travian.dk)
	var lang_dk = new Array();

	// Checo (travian.cz)
	var lang_cz = new Array();

	// Hungaro (travian.hu)
	var lang_hu = new Array();

	// Chino (travian.cn)
	var lang_cn = new Array();

	// Hong Kong (travian.hk)
	var lang_hk = new Array();

	// Sueco (travian.se)
	var lang_se = new Array();

	// Finlandes (travian.fi)
	var lang_fi = new Array();

	// Noruego (travian.no)
	var lang_no = new Array();
*/

	// Lenyador
	var lenyadorCost = [
		[0, 0, 0, 0],
		[40, 100, 50, 60],
		[65, 165, 85, 100],
		[110, 280, 140, 165],
		[185, 465, 235, 280],
		[310, 780, 390, 465],
		[520, 1300, 650, 780],
		[870, 2170, 1085, 1300],
		[1450, 3625, 1810, 2175],
		[2420, 6050, 3025, 3630],
		[4040, 10105, 5050, 6060],	// Nivel 10
		[6750, 16870, 8435, 10125],
		[11270, 28175, 14090, 16905],
		[18820, 47055, 23525, 28230],
		[31430, 78580, 39290, 47150],
		[52490, 131230, 65615, 78740], // Nivel 15
		[87660, 219155, 109575, 131490],
		[146395, 365985, 182995, 219590],
		[244480, 611195, 305600, 366715],
		[408280, 1020695, 510350, 612420],
	];

	// Barrera
	var barroCost = [
		[0, 0, 0, 0],
		[80, 40, 80, 50],
		[135, 65, 135, 85],
		[225, 110, 225, 140],
		[375, 185, 375, 235],
		[620, 310, 620, 390],
		[1040, 520, 1040, 650],
		[1735, 870, 1735, 1085],
		[2900, 1450, 2900, 1810],
		[4840, 2420, 4840, 3025],
		[8080, 4040, 8080, 5050],	// Nivel 10
		[13500, 6750, 13500 ,8435],
		[22540, 11270, 22540, 14090],
		[37645, 18820, 37645, 23525],
		[62865, 31430, 62865, 39290],
		[104985, 52490, 104985, 65615], // Nivel 15
		[175320, 87660, 175320, 109575],
		[292790, 146395, 292790, 182995],
		[488955, 244480, 488955, 305600],
		[846555, 408280, 816555, 510350],
	];

	// Mina de hierro
	var hierroCost = [
		[0, 0, 0, 0],
		[100, 80, 30, 60],
		[165, 135, 50, 100],
		[280, 225, 85, 165],
		[465, 375, 140, 280],
		[780, 620, 235, 465],
		[1300, 1040, 390, 780],
		[2170, 1735, 650, 1300],
		[3625, 2900, 1085, 2175],
		[6050, 4840, 1815, 3630],
		[10105, 8080, 3030, 6060],	// Nivel 10
		[16870, 13500, 5060, 10125],
		[28175, 22540, 8455, 16905],
		[47055, 37645, 14115, 28230],
		[78580, 62865, 23575, 47150],
		[131230, 104985, 39370, 78740], // Nivel 15
		[219155, 175320, 65745, 131490],
		[365985, 292790, 109795, 219590],
		[611195, 488955, 183360, 366715],
		[1020695, 846555, 306210, 612420],
	];

	// Granja
	var cerealCost = [
		[0, 0, 0, 0],
		[70, 90, 70, 20],
		[115, 150, 115, 35],
		[195, 250, 195, 55],
		[325, 420, 325, 95],
		[545, 700, 545, 155],
		[910, 1170, 910, 260],
		[1520, 1950, 1520, 435],
		[2535, 3260, 2535, 725],
		[4235, 5445, 4235, 1210],
		[7070, 9095, 7070, 2020],	// Nivel 10
		[11810, 15185, 11810, 3375],
		[19725, 25360, 19725, 5635],
		[32940, 42350, 32940, 9410],
		[55005, 70720, 55005, 15715],
		[91860, 118105, 91860, 26245],	// Nivel 15
		[153405, 197240, 153405, 43830],
		[256190, 329385, 256190, 73195],
		[427835, 550075, 427835, 122240],
		[714485, 918625, 714485, 204140],
	];

	// Almacen
	var warehouseCost = [
		[0, 0, 0, 0],
		[130,160,90,40],
		[165,205,115,50],
		[215,260,145,65],
		[275,335,190,85],
		[350,430,240,105],
		[445,550,310,135],
		[570,705,395,175],
		[730,900,505,225],
		[935,1115,650,290],
		[1200,1475,830,370],
		[1535,1890,1065,470],
		[1965,2420,1360,605],
		[2515,3095,1740,775],
		[3220,3960,2230,990],
		[4120,5070,2850,1270],
		[5275,6490,3650,1625],
		[6750,8310,4675,2075],
		[8640,10635,5980,2660],
		[11060,13610,7655,3405],
		[14155,17420,9800,4355]
	];

	// Academia
	var academyCost = [
		[0, 0, 0, 0], 			// Level 0
		[220, 160, 90, 40], 		// Level 1
		[280, 205, 115, 50], 		// Level 2
		[360, 260, 145, 65], 		// Level 3
		[460, 335, 190, 85], 		// Level 4
		[590, 430, 240, 105], 		// Level 5
		[755, 550, 310, 135], 		// Level 6
		[970, 705, 395, 175], 		// Level 7
		[1240, 900, 505, 225], 		// Level 8
		[1585, 1155, 650, 290], 	// Level 9
		[2030, 1475, 830, 370], 	// Level 10
		[2595, 1890, 1065, 470], 	// Level 11
		[3325, 2420, 1360, 605], 	// Level 12
		[4255, 3095, 1740, 775], 	// Level 13
		[5445, 3960, 2230, 990], 	// Level 14
		[6970, 5070, 2850, 1270], 	// Level 15
		[8925, 6490, 3650, 1625], 	// Level 16
		[11425, 8310, 4275, 2075], 	// Level 17
		[14620, 10635, 5980, 2660], 	// Level 18
		[18715, 13610, 7655, 3405], 	// Level 19
		[23955, 17420, 9800, 4355] 	// Level 20
	];

	// Molino
	var flourMillCost = [
		[0, 0, 0, 0], 			// Level 0
		[500, 440, 380, 1240],		// Level 1
		[900, 790, 685, 2230],		// Level 2
		[1620, 1425, 1230, 4020],	 	// Level 3
		[2915, 2565, 2215, 7230], 	// Level 4
		[5250, 4620, 3990, 13015], 	// Level 5
	];

	// Ladrillar
	var brickyardCost = [
		[0, 0, 0, 0], 			// Level 0
		[440, 480, 320, 50],			// Level 1
		[790, 865, 575, 90],			// Level 2
		[1425, 1555, 1035, 160],		// Level 3
		[2565, 2800, 1865, 290], 	// Level 4
		[4620, 5040, 3360, 525], 	// Level 5
	];

	// Serreria
	var sawmillCost = [
		[0, 0, 0, 0], 			// Level 0
		[520, 380, 290, 90],			// Level 1
		[935, 685, 520, 160],	 		// Level 2
		[1685, 1230, 940, 290],	 	// Level 3
		[3035, 2215, 1690, 525], 	// Level 4
		[5460, 3990, 3045, 945], 	// Level 5
	];

	// Fundicion de hierro
	var ironFoundryCost = [
		[0, 0, 0, 0], 			// Level 0
		[200, 450, 510, 120],	 		// Level 1
		[360, 810, 920, 215],	 		// Level 2
		[650, 1460, 1650, 390],	 	// Level 3
		[1165, 2625, 2975, 700], 	// Level 4
		[2100, 4725, 5355, 1260], 	// Level 5
	];

	// Panaderia
	var bakeryCost = [
		[0, 0, 0, 0], 			// Level 0
		[1200, 1480, 870, 1600],		// Level 1
		[2160, 2665, 1565, 2880],	 	// Level 2
		[3890, 4795, 2820, 5185],	 	// Level 3
		[7000, 8630, 5075, 9330], 	// Level 4
		[12595, 15535, 9135, 16795], 	// Level 5
	];

	// Mercado
	var marketplaceCost = [
		[0, 0, 0, 0], 			// Level 0
		[80, 70, 120, 70], 		// Level 1
		[100, 90, 155, 90], 		// Level 2
		[130, 115, 195, 115], 		// Level 3
		[170, 145, 250, 145], 		// Level 4
		[215, 190, 320, 190], 		// Level 5
		[275, 240, 410, 240], 		// Level 6
		[350, 310, 530, 310], 		// Level 7
		[450, 395, 675, 395], 		// Level 8
		[575, 505, 865, 505], 		// Level 9
		[740, 645, 1105, 645], 		// Level 10
		[945, 825, 1415, 825], 		// Level 11
		[1210, 1060, 1815, 1060], 	// Level 12
		[1545, 1355, 2320, 1355], 	// Level 13
		[1980, 1735, 2970, 1735], 	// Level 14
		[2535, 2220, 3805, 2220], 	// Level 15
		[3245, 2840, 4870, 2840], 	// Level 16
		[4155, 3635, 6230, 3635], 	// Level 17
		[5315, 4650, 7975, 4650], 	// Level 18
		[6805, 5955, 10210, 5955], 	// Level 19
		[8710, 7620, 13065, 7620], 	// Level 20
	];

	// Granero
	var granaryCost = [
		[0, 0, 0, 0],
		[80,100,70,20],
		[100,130,90,25],
		[130,165,115,35],
		[170,210,145,40],
		[215,270,190,55],
		[275,345,240,70],
		[350,440,310,90],
		[450,565,395,115],
		[575,720,505,145],
		[740,920,645,185],
		[945,1180,825,235],
		[1210,1510,1060,300],
		[1545,1935,1355,385],
		[1980,2475,1735,495],
		[2535,3170,2220,635],
		[3245,4055,2840,810],
		[4155,5190,3635,1040],
		[5315,6645,4650,1330],
		[6805,8505,5955,1700],
		[8710,10890,7620,2180]
	];

	// Armeria
	var blacksmithCost = [
		[0, 0, 0, 0],
		[170,200,380,130],
		[220,225,485,165],
		[280,330,625,215],
		[355,420,795,275],
		[455,535,1020,350],
		[585,685,1305,445],
		[750,880,1670,570],
		[955,1125,2140,730],
		[1225,1440,2740,935],
		[1570,1845,3505,1200],
		[2005,2360,4485,1535],
		[2570,3020,5740,1965],
		[3290,3870,7350,2515],
		[4210,4950,9410,3220],
		[5390,6340,12045,4120],
		[6895,8115,15415,5275],
		[8825,10385,19730,6750],
		[11300,13290,25255,8640],
		[14460,17015,32325,11060],
		[18510,21780,41380,14155]
	];

	// Armamentaria
	var armouryCost = [
		[0, 0, 0, 0],
		[130,210,410,130],
		[165,270,525,165],
		[215,345,670,215],
		[275,440,860,275],
		[350,565,1100,350],
		[445,720,1410,445],
		[570,925,1805,570],
		[730,1180,2310,730],
		[935,1515,2955,935],
		[1200,1935,3780,1200],
		[1535,2480,4840,1535],
		[1965,3175,6195,1965],
		[2515,4060,7930,2515],
		[3220,5200,10150,3220],
		[4120,6655,12995,4120],
		[5275,8520,16630,5275],
		[6750,10905,21290,6750],
		[8640,13955,27250,8640],
		[11060,17865,34880,11060],
		[14155,22865,44645,14155]
	];

	// Edificio principal
	var mainBuildingCost = [
		[0, 0, 0, 0],
		[70,40,60,20],
		[90,50,75,25],
		[115,65,100,35],
		[145,85,125,40],
		[190,105,160,55],
		[240,135,205,70],
		[310,175,265,90],
		[395,225,340,115],
		[505,290,430,145],
		[645,370,555,185],
		[825,470,710,235],
		[1060,605,905,300],
		[1355,775,1160,385],
		[1735,990,1485,495],
		[2220,1270,1900,635],
		[2840,1625,2435,810],
		[3635,2075,3115,1040],
		[4650,2660,3990,1330],
		[5955,3405,5105,1700],
		[7620,4355,6535,2180]
	];

	// Plaza de reuniones
	var rallyPointCost = [
		[0, 0, 0, 0],
		[110,60,80,60],
		[140,205,115,90],
		[180,260,145,115],
		[230,355,190,145],
		[295,160,215,160],
		[380,550,310,240],
		[485,705,395,310],
		[620,900,505,395],
		[795,430,575,430],
		[1015,1475,830,645], 	// Nivel 10
		[1300,1890,1065,825],
		[1660,2420,1360,1060],
		[2130,3095,1740,1355],
		[2725,3960,2230,1735],
		[3465,5075,2845,2230],
		[4460,6490,3650,2840],
		[5680,8315,4665,3650],
		[7310,10635,5980,4650],
		[9360,13610,7655,5955],
		[11980,17420,9800,7620] 
	];

	// Embajada
	var embassyCost = [
		[0, 0, 0, 0],
		[180,130,150,80],
		[230,165,190,100],
		[295,215,245,130],
		[375,275,315,170],
		[485,350,405,215],
		[620,445,515,275],
		[790,570,660,350],
		[1015,730,845,450],
		[1295,935,1080,575],
		[1660,1200,1385,740],
		[2125,1535,1770,945],
		[2720,1965,2265,1210],
		[3480,2515,2900,1545],
		[4455,3220,3715,1980],
		[5705,4120,4755,2535],
		[7300,5275,6085,3245],
		[9345,6750,7790,4155],
		[11965,8640,9970,5315],
		[15315,11060,12760,6805],
		[19600,14155,16335,8710]
	];

	// Cuartel
	var barracksCost = [
		[0, 0, 0, 0],
		[210,140,260,120],
		[270,180,335,155],
		[345,230,425,195],
		[440,295,545,250],
		[565,375,700,320],
		[720,480,895,410],
		[925,615,1145,530],
		[1180,790,1465,675],
		[1515,1010,1875,865],
		[1935,1290,2400,1105],
		[2480,1655,3070,1415],
		[3175,2115,3930,1815],
		[4060,2710,5030,2320],
		[5200,3465,6435,2970],
		[6655,4435,8240,3805],
		[8520,5680,10545,4870],
		[10905,7270,13500,6230],
		[13955,9305,17280,7975],
		[17865,11910,22120,10210],
		[22865,15245,28310,13065]
	];

	// Corral / Establo
	var stableCost = [
		[0, 0, 0, 0],
		[260,140,220,100],
		[335,180,280,130],
		[425,230,360,165],
		[545,295,460,210],
		[700,375,590,270],
		[895,480,755,345],
		[1145,615,970,440],
		[1465,790,1240,565],
		[1875,1010,1585,720],
		[2400,1290,2030,920],
		[3070,1655,2595,1180],
		[3930,2115,3325,1510],
		[5030,2710,4255,1935],
		[6435,3465,5445,2475],
		[8240,4435,6970,3170],
		[10545,5680,8925,4055],
		[13500,7270,11425,5190],
		[17280,9305,14620,6645],
		[22120,11910,18715,8505],
		[28310,15245,23955,10890]
	];

	// Taller
	var workshopCost = [
		[0, 0, 0, 0],
		[460,510,600,320],
		[590,655,770,410],
		[755,835,985,525],
		[965,1070,1260,670],
		[1235,1370,1610,860],
		[1580,1750,2060,1100],
		[2025,2245,2640,1405],
		[2590,2870,3380,1800],
		[3315,3675,4325,2305],
		[4245,4705,5535,2950],
		[5430,6020,7085,3780],
		[6950,7705,9065,4835],
		[8900,9865,11605,6190],
		[11390,12625,14855,7925],
		[14580,16165,19015,10140],
		[18660,20690,24340,12980],
		[23885,26480,31155,16615],
		[30570,33895,39787,21270],
		[39130,43385,51040,27225],
		[50090,55535,65335,34845]
	];

	// Escondite
	var crannyCost = [
		[0, 0, 0, 0],
		[40,50,30,10],
		[50,65,40,15],
		[65,80,50,15],
		[85,105,65,20],
		[135,160,105,55],
		[170,205,135,70],
		[220,265,175,90],
		[280,340,225,115],
		[360,430,290,145],
		[370,460,275,90]
	];

	// Ayuntamiento
	var ayuntamientoCost = [
		[0, 0, 0, 0],
		[1250,1110,1260,600],
		[1600,1420,1615,770],
		[2050,1820,2065,985],
		[2620,2330,2640,1260],
		[3355,2980,3380,1610],
		[4295,3815,4330,2060],
		[5500,4880,5540,2640],
		[7035,6250,7095,3380],
		[9005,8000,9080,4325],
		[11530,10240,11620,5535],
		[14755,13105,14875,7085],
		[18890,16775,19040,9065],
		[24180,21470,27370,11605],
		[30950,27480,31195,14885],
		[39615,35175,39930,19015],
		[40705,45025,51110,24340],
		[64905,57635,65425,31155],
		[83075,73770,83740,39875],
		[106340,94430,107190,51040],
		[136115,120870,137200,65335]
	];

	// Residencia
	var residenceCost = [
		[0, 0, 0, 0],
		[580,460,350,180],
		[740,590,450,230],
		[950,755,575,295],
		[1215,965,735,375],
		[1555,1235,940,485],
		[1995,1580,1205,620],
		[2550,2025,1540,790],
		[3265,2590,1970,1015],
		[4180,3315,2520,1295],
		[5350,4245,3230,1660],
		[6845,5430,4130,2125],
		[8765,6950,5290,2720],
		[11220,8900,6770,3480],
		[14360,11390,8665,4455],
		[18380,14580,11090,5705],
		[23530,18660,14200,7300],
		[30115,23885,18175,9345],
		[38550,30570,23260,11965],
		[49340,39130,29775,15315],
		[63155,50090,38110,19600]
	];

	// Palacio
	var palaceCost = [
		[0, 0, 0, 0],
		[550,800,750,250],
		[705,1025,960,320],
		[900,1310,1230,410],
		[1155,1680,1575,525],
		[1475,2145,2015,670],
		[1890,2750,2575,860],
		[2420,3520,3300,1100],
		[3095,4505,4220,1405],
		[3965,5765,5405,1800],
		[5075,7380,6920,2305],
		[6495,9445,8855,2950],
		[8310,12090,11335,3780],
		[10640,15478,14505,4835],
		[13150,19805,18570,6190],
		[17430,25355,23770,7925],
		[22310,32450,30425,10140],
		[28560,41540,38940,12980],
		[36555,53170,49845,16615],
		[46790,68055,63805,21270],
		[59890,87110,81670,27225]
	];

	// Plaza de torneos
	var tournamentSquareCost = [
		[0, 0, 0, 0],
		[1750,2250,1530,240],
		[2240,2880,1960,305],
		[2865,3685,2505,395],
		[3670,4720,3210,505],
		[4700,6040,4105,645],
		[6015,7730,5255,825],
		[7695,9895,6730,1055],
		[9850,12665,8615,1350],
		[12610,16215,11025,1730],
		[16140,20755,14110,2215],
		[20660,26565,18065,2835],
		[26445,34000,23120,3625],
		[33850,43520,29595,4640],
		[43330,55705,37880,5940],
		[55460,71305,48490,7605],
		[70990,91270,62065,9735],
		[90865,117000,79440,12460],
		[116000,150000,102000,15950],
		[149000,191000,130000,20415],
		[191000,245000,167000,26135]
	];

	// Tesoro
	var tesoroCost = [
		[0, 0, 0, 0],
		[2890,2740,2580,990],
		[3685,3505,3300,1265],
		[4720,4490,4225,1620],
		[6040,5745,5410,2075],
		[7730,7355,6925,2660],
		[9595,9415,8865,3400],
		[12665,12050,11345,4355],
		[16215,15425,14525,5575],
		[20755,19745,18590,7135],
		[26565,25270,23795,9130]
	];

	// Oficina de comercio
	var oficinaComercioCost = [
		[0, 0, 0, 0],
		[1400,1330,1200,400],
		[1790,1700,1535,510],
		[2295,2180,1965,655],
		[2935,2790,2515,840],
		[3760,3570,3220,1075],
		[4810,4570,4125,1375],
		[6155,5850,5280,1760],
		[7780,7485,6755,2250],
		[10090,9585,8645,2880],
		[12915,12265,11070,6390],
		[16530,15700,14165,4720],
		[21155,20100,18135,6045],
		[27080,25725,23210,9905],
		[34660,32930,29710,9905],
		[44370,42150,38030,12675],
		[56790,53950,48680,16225],
		[72690,69060,62310,20770],
		[93045,88395,79755,26585],
		[119100,113145,102085,34030],
		[152445,144825,130670,43555]
	];

	// Cuartel grande
	var greatBarrackCost = [
		[0, 0, 0, 0],
		[630,420,780,360],		// Level 1
		[805,540,1000,460],
		[1030,690,1280,590],
		[1320,880,1635,755],
		[1690,1125,2095,965],		// Level 5
		[2165,1445,2680,1235],
		[2770,1845,3430,1585],
		[3545,2365,4390,2025],
		[4540,3025,5620,2595],
		[5810,3875,7195,3320],		// Level 10
		[7440,4960,9210,4250],
		[9520,6345,11785,5440],
								[12185,8125,15085,6965],
		[15600,10400,19310,8915],
		[19965,13310,24270,11410],	// Level 15
								[25555,17035,31640,14605],
		[32710,21810,40500,18690],
		[41870,27915,51840,23925],
		[53595,35730,66355,30625],
		[68600,45735,84935,39200]	// Level 20
	];

	// Corral / Establo grande
	var greatStableCost = [
		[0, 0, 0, 0],
		[780,420,660,300],
		[1000,540,845,385],
		[1280,690,1080,490],
		[1635,880,1385,630],
		[2095,1125,1770,805],
		[2680,1445,2270,1030],
		[3430,1845,2905,1320],
		[4390,2365,3715,1690],
		[5620,3025,4755,2160],
		[7195,3875,6085,2765],
		[9210,4960,7790,3540],
		[11785,6345,9975,4535],
		[15085,8125,12765,5805],
		[19310,10400,16340,7430],
		[24720,13310,20915,9505],	// Level 15
		[31640,17035,26775,12170],
		[40500,21810,34270,15575],
		[51840,27915,43865,19940],
		[66355,35730,56145,25520],
		[84935,45735,71870,32665]
	];

	// Muralla
	var wallRomansCost = [
		[0, 0, 0, 0],
		[70, 90, 170, 70],
		[90, 115, 220, 90],
		[115, 145, 280, 115],
		[145, 190, 355, 145],
		[190, 240, 455, 190],
		[240, 310, 585, 240],
		[310, 395, 750, 310],
		[395, 505, 955, 395],
		[505, 650, 1225, 505],
		[645, 830, 1570, 645],
		[825, 1065, 2005, 825],
		[1060, 1360, 2570, 1060],
		[1355, 1740, 3290, 1355],
		[1735, 2230, 4210, 1735],
		[2220, 2850, 5390, 2220],
		[2840, 3650, 6895, 2840],
		[3635, 4675, 8825, 3635],
		[4650, 5980, 11300, 4650],
		[5955, 7655, 14160, 5955],
		[7620, 9800, 18510, 7620]
	];

	// Empalizada
	var wallGaulsCost = [
		[0, 0, 0, 0],
		[160, 100, 80, 60],
		[205, 130, 100, 75],
		[260, 165, 130, 100],
		[335, 210, 170, 125],
		[430, 270, 215, 160],
		[550, 345, 275, 205],
		[705, 440, 350, 265],
		[900, 565, 450, 340],
		[1155, 720, 575, 430],
		[1475, 920, 740, 555],
		[1890, 1180, 945, 710],
		[2420, 1510, 1210, 905],
		[3095, 1935, 1545, 1160],
		[3960, 2475, 1980, 1485],
		[5070, 3170, 2535, 1900],
		[6490, 4055, 3245, 2435],
		[8310, 5190, 4155, 3115],
		[10635, 6645, 5315, 3990],
		[13610, 8505, 6805, 5105],
		[17420, 10890, 8710, 6535]
	];

	// Terraplen
	var wallTeutonsCost = [
		[0, 0, 0, 0],
		[120, 200, 0, 80],
		[155, 255, 0, 100],
		[195, 330, 0, 130],
		[250, 420, 0, 170],
		[320, 535, 0, 215],
		[410, 685, 0, 275],
		[530, 880, 0, 350],
		[675, 1125, 0, 450],
		[865, 1440, 0, 575],
		[1105, 1845, 0, 740],
		[1415, 2360, 0, 945],
		[1815, 3020, 0, 1210],
		[2320, 3870, 0, 1545],
		[2970, 4950, 0, 1980],
		[3805, 6340, 0, 2535],
		[4870, 8115, 0, 3245],
		[6230, 10385, 0, 4155],
		[7975, 13290, 0, 5315],
		[10210, 17015, 0, 6805],
		[13065, 21780, 0, 8710]
	];

	var cerveceriaCost = [
		[0, 0, 0, 0],
		[1200, 1400, 1050, 2200],
		[1535, 1790, 1345, 2815],
		[1965, 2295, 1720, 3605],
		[2515, 2935, 2200, 4615],
		[3220, 3760, 2820, 5905],
		[4125, 4810, 3610, 7560],
		[5280, 6155, 4620, 9675],
		[6755, 7880, 5910, 12385],
		[8645, 10090, 7565, 15855],
		[11070, 12915, 9685, 20290],
		[14165, 16530, 12395, 25975],
		[18135, 21155, 15865, 33245],
		[23210, 27080, 20310, 42555],
		[29710, 34660, 25995, 54470],
		[38030, 44370, 33275, 69720],
		[48680, 56790, 42595, 89245],
		[62310, 72690, 54520, 114230],
		[79755, 93045, 69785, 146215],
		[102085, 119100, 89325, 187155],
		[130670, 152445, 114335, 239560],
	];

	var casaHeroeCost = [
		[0, 0, 0, 0],
		[700, 670, 700, 240],
		[930, 890, 930, 320],
		[1240, 1185, 1240, 425],
		[1645, 1575, 1645, 565],
		[2190, 2095, 2190, 750],
		[2915, 2790, 2915, 1000],
		[3875, 3710, 3875, 1330],
		[5155, 4930, 5155, 1765],
		[6855, 6560, 6855, 2350],
		[9115, 8725, 9115, 3125],	// Nivel 10
		[12125, 11605, 12125, 4155],
		[16125, 15435, 16125, 5530],
		[21445, 20525, 21445, 7350],
		[28520, 27300, 28520, 9780],
		[37935, 36310, 37935, 13005],
		[50450, 48290, 50450, 17300],
		[67100, 64225, 67100, 23005],
		[89245, 85420, 89245, 30600],
		[118695, 113605, 118695, 40695],
		[157865, 151095, 157865, 54125]
	];

	var trampaCost = [
		[0, 0, 0, 0],
		[100, 100, 100, 100],
		[130, 130, 130,	130],
		[165, 165, 165,	165],
		[210, 210, 210, 210],
		[270, 270, 270,	270],
		[345, 345, 345, 345],
		[440, 440, 440,	440],
		[565, 565, 565, 565],
		[720, 720, 720, 720],
		[920, 920, 920, 920],	// Nivel 10
		[1180, 1180, 1180, 1180],
		[1510, 1510, 1510, 1510],
		[1935, 1935, 1935, 1935],
		[2475, 2475, 2475, 2475],
		[3170, 3170, 3170, 3170],
		[4055, 4055, 4055, 4055],
		[5190, 5190, 5190, 5190],
		[6645, 6645, 6645, 6645],
		[8505, 8505, 8505, 8505],
		[10890, 10890, 10890, 10890]
	];

	var canteroCost = [
		[0, 0, 0, 0],
		[155, 130, 125, 70],
		[200, 165, 160, 90],
		[255, 215, 205, 115],
		[325, 275, 260, 145],
		[415, 350, 335, 190],
		[535, 445, 430, 240],
		[680, 570, 550, 310],
		[875, 730, 705, 395],
		[1115, 935, 900, 505],
		[1430, 1200, 1155, 645],	// Nivel 10
		[1830, 1535, 1475, 825],
		[2340, 1965, 1890, 1060],
		[3000, 2515, 2420, 1355],
		[3840, 3220, 3095, 1735],
		[4910, 4120, 3960, 2220],
		[6290, 5275, 5070, 2840],
		[8050, 6750, 6490, 3635],
		[10300, 8640, 8310, 4650],
		[13185, 11060, 10635, 5955],
		[16880, 14155, 13610, 7620]
	];

	// MDL - prices per CP/day
	var stoneMasonCostPerCP = [
		"0", "480", "--", "790", "--", "--", 
		"1650", "2110", "--", "3455", "4430", 
		"5665", "3628", "4645", "5945", "7605", 
		"6492", "6231", "6380", "8167", "8711", 
	];

	var wallRomansCostPerCP = [
		"0", "400", "--", "655", "--", "--", 
		"1375", "1765", "--", "2885", "3690", 
		"4720", "3025", "3870", "4955", "6340", 
		"5408", "5192", "5316", "6805", "7258", 
	];

	var trapperCostPerCP = [
		"0", "400", "--", "660", "--", "--", 
		"1380", "1760", "--", "2880", "3680", 
		"4720", "3020", "3870", "4950", "6340", 
		"5407", "5190", "5316", "6804", "7260", 
	];

	var greatStableCostPerCP = [
		"0", "1080", "2770", "--", "4530", "5795", 
		"7425", "9500", "6080", "15560", "9960", 
		"8500", "10880", "13927", "10696", "13690", 
		"14603", "16022", "15951", "16705", "18093", 
	];

	var granaryCostPerCP = [
		"0", "270", "--", "445", "--", "--", 
		"930", "1190", "--", "1945", "2490", 
		"3185", "2040", "2610", "3342", "4280", 
		"3650", "3505", "3588", "4593", "4900", 
	];

	var warehouseCostPerCP = [
		"0", "420", "--", "685", "--", "--", 
		"1440", "1845", "--", "3030", "3875", 
		"4960", "3175", "4062", "5200", "6655", 
		"5680", "5452", "5583", "7146", "7622", 
	];

	var flourMillCostPerCP = [
		"0", "2560", "--", "8295", "--", "--", 
	];

	var barracksCostPerCP = [
		"0", "730", "--", "1195", "--", "--", 
		"2505", "3215", "--", "5265", "6730", 
		"8620", "5518", "7060", "9035", "11568", 
		"9872", "9476", "9703", "12421", "13248", 
	];

	var greatBarrackCostPerCP = [
		"0", "2190", "--", "3590", "--", "--", 
		"7525", "9630", "--", "15780", "20200", 
		"25860", "16545", "21180", "27112", "34702", 
		"29612", "28428", "29110", "37261", "39745", 
	];

	var academyCostPerCP = [
		"0", "102", "650", "830", "1070", "682", 
		"875", "1122", "957", "920", "1176", 
		"1204", "1285", "1409", "1578", "1469", 
		"1724", "1766", "1994", "1972", "2221", 
	];

	var breweryCostPerCP = [
		"0", "5850", "--", "9585", "--", "--", 
		"20105", "25730", "--", "42155", "53960", 
		"69065", "44200", "56578", "72418", "92698", 
		"79103", "75938", "77760", "99533", "106168", 
	];

	var townHallCostPerCP = [
		"0", "703", "5405", "3460", "8850", "5662", 
		"4833", "6187", "7920", "6082", "7785", 
		"8303", "7971", "10203", "9498", "10287", 
		"11412", "11533", "12748", "13296", "14360", 
	];

	var ironMineCostPerCP = [
		"0", "270", "--", "755", "--", "--", 
		"3510", "5855", "--", "16335", "27275", 
	];

	var marketplaceCostPerCP = [
		"0", "85", "--", "555", "710", "915", 
		"582", "750", "958", "1225", "784", 
		"1337", "1029", "1315", "1203", "1540", 
		"1533", "1471", "1738", "1808", "1948", 
	];

	var herosMansionCostPerCP = [
		"0", "2310", "--", "4090", "--", "--", 
		"9620", "12790", "--", "22620", "30080", 
		"40010", "26608", "35382", "47060", "62592", 
		"55497", "55358", "58902", "78338", "86825", 
	];

	var palaceCostPerCP = [
		"0", "392", "3010", "1925", "4935", "3152", 
		"2692", "3447", "4408", "3387", "4336", 
		"4624", "4439", "5682", "5289", "5729", 
		"6355", "6422", "7099", "7404", "7997", 
	];

	var treasuryCostPerCP = [
		"0", "919", "5878", "7528", "6423", "8223", 
		"7894", "8083", "10348", "9461", "9418", 
	];

	var cropLandCostPerCP = [
		"0", "250", "--", "695", "--", "--", 
		"3250", "5425", "--", "15125", "25255", 
	];

	var sawmillCostPerCP = [
		"0", "1280", "--", "4145", "--", "--", 
	];

	var tournamentSquareCostPerCP = [
		"0", "5770", "--", "9450", "--", "--", 
		"19825", "25375", "--", "41580", "53220", 
		"68125", "43595", "55802", "71428", "91430", 
		"78020", "74898", "76696", "98172", "104717", 
	];

	var stableCostPerCP = [
		"0", "360", "925", "--", "1510", "1935", 
		"2475", "3170", "2030", "5190", "3320", 
		"2833", "3627", "4643", "3564", "4563", 
		"4868", "5341", "5317", "5568", "6031", 
	];

	var embassyCostPerCP = [
		"0", "108", "685", "885", "1135", "728", 
		"928", "1185", "1013", "971", "1246", 
		"1275", "1360", "1491", "1671", "1556", 
		"1825", "1869", "2111", "2088", "2352", 
	];

	var woodCutterCostPerCP = [
		"0", "250", "--", "695", "--", "--", 
		"3250", "5425", "--", "15125", "25255", 
	];

	var wallTeutonsCostPerCP = [
		"0", "400", "--", "655", "--", "--", 
		"1370", "1760", "--", "2880", "3690", 
		"4720", "3022", "3868", "4950", "6340", 
		"5410", "5192", "5316", "6806", "7259", 
	];

	var brickyardCostPerCP = [
		"0", "1290", "--", "4175", "--", "--", 
	];

	var workshopCostPerCP = [
		"0", "472", "--", "3100", "3965", "5075", 
		"3245", "4158", "5320", "6810", "4359", 
		"7438", "5711", "7312", "6685", "8557", 
		"8519", "8178", "9662", "10049", "10832", 
	];

	var bakeryCostPerCP = [
		"0", "5150", "--", "16690", "--", "--", 
	];

	var armouryCostPerCP = [
		"0", "440", "1125", "--", "1850", "2365", 
		"3020", "3870", "2475", "6340", "4058", 
		"3463", "4433", "5673", "4358", "5578", 
		"5950", "6528", "6498", "6806", "7371", 
	];

	var mainBuildingCostPerCP = [
		"0", "95", "240", "--", "395", "510", 
		"650", "840", "538", "1370", "878", 
		"747", "957", "1225", "941", "1205", 
		"1285", "1409", "1403", "1470", "1592", 
	];

	var wallGaulsCostPerCP = [
		"0", "400", "--", "655", "--", "--", 
		"1375", "1760", "--", "2880", "3690", 
		"4725", "3022", "3868", "4950", "6338", 
		"5408", "5192", "5317", "6805", "7259", 
	];

	var rallyPointCostPerCP = [
		"0", "335", "--", "550", "--", "--", 
		"1155", "1480", "--", "2420", "3105", 
		"3965", "2540", "3250", "4160", "5325", 
		"4542", "4360", "4466", "5715", "6097", 
	];

	var tradeOfficeCostPerCP = [
		"0", "1082", "--", "7095", "9080", "11625", 
		"7440", "9522", "12185", "15600", "9985", 
		"17038", "13087", "16750", "15315", "19604", 
		"19516", "18736", "22137", "23022", "24816", 
	];

	var crannyCostPerCP = [
		"0", "130", "--", "210", "--", "--", 
		"445", "570", "--", "935", "1195", 
	];

	var ironFoundryCostPerCP = [
		"0", "1280", "--", "4150", "--", "--", 
	];

	var residenceCostPerCP = [
		"0", "785", "2010", "--", "3290", "4215", 
		"5400", "6905", "4420", "11310", "7242", 
		"6177", "7908", "10123", "7774", "9951", 
		"10615", "11646", "11594", "12142", "13150", 
	];

	var blacksmithCostPerCP = [
		"0", "440", "1125", "--", "1845", "2360", 
		"3020", "3870", "2475", "6340", "4060", 
		"3462", "4432", "5675", "4358", "5579", 
		"5950", "6527", "6498", "6805", "7371", 
	];

	var clayPitCostPerCP = [
		"0", "250", "--", "700", "--", "--", 
		"3250", "5425", "--", "15125", "25250", 
	];

  var maravillaCost = [
          [0, 0, 0, 0],
          [49800, 52700, 54800, 4400],
          [50695, 53650, 55785, 4480],
          [51610, 54615, 56790, 4560],
          [52540, 55595, 57815, 4640],
          [53485, 56600, 58855, 4725], // Nivel 5
          [54445, 57615, 59915, 4810],
          [55425, 58655, 60990, 4895],
          [56425, 59710, 62090, 4985],
          [57440, 60785, 63205, 5075],
          [58475, 61880, 64345, 5165], // Nivel 10
          [59525, 62990, 65505, 5260],
          [60600, 64125, 66680, 5355],
          [61690, 65280, 67880, 5450],
          [62800, 66455, 69105, 5550],
          [63930, 67650, 70350, 5650], // Nivel 15
          [65080, 68870, 71615, 5750], // Interpolado
          [66250, 70110, 72905, 5855],
          [67445, 71370, 74215, 5960],
          [68660, 72655, 75550, 6065],
          [69895, 73965, 76910, 6175], // Nivel 20
          [71150, 75295, 78295, 6285],
          [72430, 76650, 79705, 6400],
          [73735, 78030, 81140, 6515],
          [75065, 79435, 82600, 6630],
          [76415, 80865, 84085, 6750], // Nivel 25
          [77790, 82320, 85600, 6875],
          [79190, 83800, 87140, 6995],
          [80615, 85310, 88710, 7125],
          [82065, 86845, 90305, 7250],
          [83545, 88410, 91930, 7380], // Nivel 30
          [85050, 90000, 93585, 7515],
          [86580, 91620, 95270, 7650],
          [88135, 93270, 96985, 7785],
          [89725, 94950, 98730, 7925],
          [91340, 96655, 101000, 8070], // Nivel 35
          [92985, 98395, 102000, 8215],
          [94655, 100000, 104000, 8365],
          [96360, 102000, 106000, 8515],
          [98095, 104000, 108000, 8665],
          [99860, 106000, 110000, 8825], // Nivel 40
          [102000, 108000, 112000, 8980],
          [103000, 110000, 114000, 9145],
          [105000, 111000, 116000, 9310],
          [107000, 113000, 118000, 9475],
          [109000, 116000, 120000, 9645], // Nivel 45
          [111000, 118000, 122000, 9820],
          [113000, 120000, 125000, 9995],
          [115000, 122000, 127000, 10175],
          [117000, 124000, 129000, 10360],
          [119000, 126000, 131000, 10545], // Nivel 50
          [122000, 129000, 134000, 10735],
          [124000, 131000, 136000, 10930],
          [126000, 133000, 139000, 11125],
          [128000, 136000, 141000, 11325],
          [131000, 138000, 144000, 11530], // Nivel 55
          [133000, 141000, 146000, 11740],
          [135000, 143000, 149000, 11950],
          [138000, 146000, 151000, 12165],
          [140000, 148000, 154000, 12385],
          [143000, 151000, 157000, 12605], // Nivel 60
          [145000, 154000, 160000, 12835],
          [148000, 156000, 163000, 13065],
          [151000, 159000, 166000, 13300],
          [153000, 162000, 169000, 13540],
          [156000, 165000, 172000, 13780], // Nivel 65
          [159000, 168000, 175000, 14030],
          [162000, 171000, 178000, 14285],
          [165000, 174000, 181000, 14540],
          [168000, 177000, 184000, 14800],
          [171000, 180000, 188000, 15070], // Nivel 70
          [174000, 184000, 191000, 15340],
          [177000, 187000, 194000, 15615],
          [180000, 190000, 198000, 15895],
          [183000, 194000, 202000, 16180],
          [186000, 197000, 205000, 16475], // Nivel 75
          [190000, 201000, 209000, 16770],
          [193000, 204000, 213000, 17070],
          [197000, 208000, 216000, 17380],
          [200000, 212000, 220000, 17690],
          [204000, 216000, 224000, 18010], // Nivel 80
          [208000, 220000, 228000, 18335],
          [211000, 224000, 232000, 18665],
          [215000, 228000, 237000, 19000],
          [219000, 232000, 241000, 19345],
          [223000, 236000, 245000, 19690], // Nivel 85
          [227000, 240000, 250000, 20045],
          [231000, 244000, 254000, 20405],
          [235000, 249000, 259000, 20775],
          [239000, 253000, 263000, 21145],
          [244000, 258000, 268000, 21530], // Nivel 90
          [248000, 262000, 273000, 21915],
          [253000, 267000, 278000, 22310],
          [257000, 272000, 283000, 22710],
          [262000, 277000, 288000, 23120],
          [266000, 282000, 293000, 23535], // Nivel 95
          [271000, 287000, 298000, 23960],
          [276000, 292000, 304000, 24390],
          [281000, 297000, 309000, 24830],
          [286000, 303000, 315000, 25280],
          [291000, 308000, 320000, 25735], // Nivel 100
  ];

	// MDL - added buildingCostPerCP


	var buildingCost = new Array(38);
	var buildingCostPerCP = new Array(38);
	buildingCost[0] = lenyadorCost;
	buildingCostPerCP[0] = woodCutterCostPerCP;
	buildingCost[1] = barroCost;
	buildingCostPerCP[1] = clayPitCostPerCP;
	buildingCost[2] = hierroCost;
	buildingCostPerCP[2] = ironMineCostPerCP;
	buildingCost[3] = cerealCost;
	buildingCostPerCP[3] = cropLandCostPerCP;

	buildingCost[5] = sawmillCost;
	buildingCostPerCP[5] = sawmillCostPerCP;
	buildingCost[6] = brickyardCost;
	buildingCostPerCP[6] = brickyardCostPerCP;
	buildingCost[7] = ironFoundryCost;
	buildingCostPerCP[7] = ironFoundryCostPerCP;
	buildingCost[8] = flourMillCost;
	buildingCostPerCP[8] = flourMillCostPerCP;
	buildingCost[9] = bakeryCost;
	buildingCostPerCP[9] = bakeryCostPerCP;
	buildingCost[10] = warehouseCost;
	buildingCostPerCP[10] = warehouseCostPerCP;
	buildingCost[11] = granaryCost;
	buildingCostPerCP[11] = granaryCostPerCP;
	buildingCost[12] = blacksmithCost;
	buildingCostPerCP[12] = blacksmithCostPerCP;
	buildingCost[13] = armouryCost;
	buildingCostPerCP[13] = armouryCostPerCP;
	buildingCost[14] = tournamentSquareCost;
	buildingCostPerCP[14] = tournamentSquareCostPerCP;
	buildingCost[15] = mainBuildingCost;
	buildingCostPerCP[15] = mainBuildingCostPerCP;
	buildingCost[16] = rallyPointCost;
	buildingCostPerCP[16] = rallyPointCostPerCP;
	buildingCost[17] = marketplaceCost;
	buildingCostPerCP[17] = marketplaceCostPerCP;
	buildingCost[18] = embassyCost;
	buildingCostPerCP[18] = embassyCostPerCP;
	buildingCost[19] = barracksCost;
	buildingCostPerCP[19] = barracksCostPerCP;
	buildingCost[20] = stableCost;
	buildingCostPerCP[20] = stableCostPerCP;
	buildingCost[21] = workshopCost;
	buildingCostPerCP[21] = workshopCostPerCP;
	buildingCost[22] = academyCost;
	buildingCostPerCP[22] = academyCostPerCP;
	buildingCost[23] = crannyCost;
	buildingCostPerCP[23] = crannyCostPerCP;
	buildingCost[24] = ayuntamientoCost;
	buildingCostPerCP[24] = townHallCostPerCP;
	buildingCost[25] = residenceCost;
	buildingCostPerCP[25] = residenceCostPerCP;
	buildingCost[26] = palaceCost;
	buildingCostPerCP[26] = palaceCostPerCP;
	buildingCost[27] = tesoroCost;
	buildingCostPerCP[27] = treasuryCostPerCP;
	buildingCost[28] = oficinaComercioCost;
	buildingCostPerCP[28] = tradeOfficeCostPerCP;
	buildingCost[29] = greatBarrackCost;
	buildingCostPerCP[29] = greatBarrackCostPerCP;
	buildingCost[30] = greatStableCost;
	buildingCostPerCP[30] = greatStableCostPerCP;
	buildingCost[31] = wallGaulsCost;
	buildingCostPerCP[31] = wallGaulsCostPerCP;
	buildingCost[32] = wallRomansCost;
	buildingCostPerCP[32] = wallRomansCostPerCP;
	buildingCost[33] = wallTeutonsCost;
	buildingCostPerCP[33] = wallTeutonsCostPerCP;
	buildingCost[34] = canteroCost;
	buildingCostPerCP[34] = stoneMasonCostPerCP;
	buildingCost[35] = cerveceriaCost;
	buildingCostPerCP[35] = breweryCostPerCP;
	buildingCost[36] = trampaCost;
	buildingCostPerCP[36] = trapperCostPerCP;
	buildingCost[37] = casaHeroeCost;
	buildingCostPerCP[37] = herosMansionCostPerCP;

//	builgindCost[38] = greatWarehouseCost;
//	buildingCost[39] = greatGranaryCost;
	buildingCost[40] = maravillaCost;

	// Costes de produccion de cada unidad y su carga
	var uc = new Array(); 

	// Romanos 
	uc[1] = [120,100,180,40,40]; 		// Legionario 
	uc[2] = [100,130,160,70,20]; 		// Pretoriano 
	uc[3] = [150,160,210,80,50]; 		// Imperano 
	uc[4] = [140,160,20,40,0]; 		// Legati 
	uc[5] = [550,440,320,100,100];	 	// Imperatoris 
	uc[6] = [550,640,800,180,70]; 		// Caesaris 
	uc[7] = [900,360,500,70,0]; 		// Carnero 
	uc[8] = [950,1350,600,90,0]; 		// Catapulta 
	uc[9] = [30750,27200,4500,37500,0]; 	// Senador 
	uc[10] = [5800,5300,7200,5500,3000]; 	// Descubridor 

	// Germanos
	uc[11] = [95,75,40,40,60]; 		// Lanzador porras 
	uc[12] = [145,70,85,40,40]; 		// Luchador lanza 
	uc[13] = [130,120,170,70,50]; 		// Luchador hacha 
	uc[14] = [160,100,50,50,0]; 		// Emisario 
	uc[15] = [370,270,290,75,110]; 		// Paladin 
	uc[16] = [450,515,480,80,80]; 		// Caballista teutona 
	uc[17] = [1000,300,350,70,0]; 		// Ariete 
	uc[18] = [900,1200,600,60,0]; 		// Catapulta 
	uc[19] = [35500,26600,25000,27200,0]; 	// Cabecilla 
	uc[20] = [7200,5500,5800,6500,3000]; 	// Descubridor 

	// Galos
	uc[21] = [100,130,55,30,30]; 		// Falange 
	uc[22] = [140,150,185,60,45]; 		// Luchador espada 
	uc[23] = [170,150,20,40,0]; 		// Batidor 
	uc[24] = [350,450,230,60,75]; 		// Rayo 
	uc[25] = [360,330,280,120,35]; 		// Druida 
	uc[26] = [500,620,675,170,65]; 		// Haeduanos 
	uc[27] = [950,555,330,75,0]; 		// Carnero 
	uc[28] = [960,1450,630,90,0]; 		// Catapulta 
	uc[29] = [30750,45400,31000,37500,0]; 	// Cacique
	uc[30] = [5500,7000,5300,4900,3000]; 	// Descubridor 

	// Fauna
	uc[31] = [0, 0, 0, 0, 0];		// Rata
	uc[32] = [0, 0, 0, 0, 0];		// Ara�a
	uc[33] = [0, 0, 0, 0, 0];		// Serpiente
	uc[34] = [0, 0, 0, 0, 0];		// Murcielago
	uc[35] = [0, 0, 0, 0, 0];		// Jabali
	uc[36] = [0, 0, 0, 0, 0];		// Lobo
	uc[37] = [0, 0, 0, 0, 0];		// Oso
	uc[38] = [0, 0, 0, 0, 0];		// Cocodrilo
	uc[39] = [0, 0, 0, 0, 0];		// Tigre
	uc[40] = [0, 0, 0, 0, 0];		// Elefante

// Natares
	uc[41] = [0, 0, 0, 0, 0];		// Pikeman
	uc[42] = [0, 0, 0, 0, 0];		// Thorned warrior
	uc[43] = [0, 0, 0, 0, 0];		// Guardsman
	uc[44] = [0, 0, 0, 0, 0];		// Birds of prey
	uc[45] = [0, 0, 0, 0, 0];		// Axerider
	uc[46] = [0, 0, 0, 0, 0];		// Natarian knight
	uc[47] = [0, 0, 0, 0, 0];		// Warelephant
	uc[48] = [0, 0, 0, 0, 0];		// Ballista
	uc[49] = [0, 0, 0, 0, 0];		// Natarian emperor
	uc[50] = [0, 0, 0, 0, 0];		// Settler

	// Otra nueva raza! (demonios? ojos rojos?)
	uc[51] = [0, 0, 0, 0, 0];
	uc[52] = [0, 0, 0, 0, 0];
	uc[53] = [0, 0, 0, 0, 0];
	uc[54] = [0, 0, 0, 0, 0];
	uc[55] = [0, 0, 0, 0, 0];
	uc[56] = [0, 0, 0, 0, 0];
	uc[57] = [0, 0, 0, 0, 0];
	uc[58] = [0, 0, 0, 0, 0];
	uc[59] = [0, 0, 0, 0, 0];
	uc[60] = [0, 0, 0, 0, 0];
	
	uc[98] = [0, 0, 0, 0, 0];		// Trampa?
	uc[99] = [0, 0, 0, 0, 0];		// Trampa?


	// MDL - more detailed unit data (in string form, so kind of a pain to use with the other stuff)
	var unitNameIndex = 0;
	var unitAttackIndex = 2;
	var unitInfDefenseIndex = 3;
	var unitCavDefenseIndex = 4;
	var unitWoodCostIndex = 5;
	var unitClayCostIndex = 6;
	var unitIronCostIndex = 7;
	var unitCropCostIndex = 8;
	var unitCropConsumptionIndex = 9;
	var unitSpeedIndex = 10;
	var unitBuildingIndex = 11;
	var unitData = [
		[null, null, null, null, null, null, null, null, null, null, null, null, ], // dummy line to get indexes to line up (there is no unit 0)
		["Legionnaire","Legionnaire","40","35","50","120","100","180","40","1","6", 'build.php?gid=19'],
		["Praetorian","Praetorian","30","65","35","100","130","160","70","1","5",'build.php?gid=19'],
		["Imperian","Imperian","70","40","25","150","160","210","80","1","7", 'build.php?gid=19'],
		["Equites Legati","Equites Legati","0","20","10","140","160","20","40","2","16",'build.php?gid=20'],
		["Equites Imperatoris","Equites Imperatoris","120","65","50","550","440","320","100","3","14",'build.php?gid=20'],
		["Equites Caesaris","Equites Caesaris","180","80","105","550","640","800","180","4","10",'build.php?gid=20'],
		["Battering Ram","Battering Ram","60","30","75","900","360","500","70","3","4",'build.php?gid=21'],
		["Fire catapult","Fire catapult","75","60","10","950","1350","600","90","6","3",'build.php?gid=21'],
		["Senator","Senator","50","40","30","30750","27200","45000","37500","4","4",'build.php?gid=21'],
		["Settler","Settler","0","80","80","5800","5300","7200","5500","1","5",],
		["Clubswinger","Clubswinger","40","20","5","95","75","40","40","1","7",'build.php?gid=19'],
		["Spearfighter","Spearfighter","10","35","60","145","70","85","40","1","7",'build.php?gid=19'],
		["Axefighter","Axefighter","60","30","30","130","120","170","70","1","6",'build.php?gid=19'],
		["Scout","Scout","0","10","5","160","100","50","50","1","9",'build.php?gid=19'],
		["Paladin","Paladin","55","100","40","370","270","290","75","2","10",'build.php?gid=20'],
		["Teuton Knight","Teuton Knight","150","50","75","450","515","480","80","3","9",'build.php?gid=20'],
		["Ram","Ram","65","30","80","1000","300","350","70","3","4",'build.php?gid=21'],
		["Catapult","Catapult","50","60","10","900","1200","600","60","6","3",'build.php?gid=21'],
		["Chief","Chief","40","60","40","35500","26600","25000","27200","4","4",],
		["Settler","Settler","10","80","80","7200","5500","5800","6500","1","5",],
		["Phalanx","Phalanx","15","40","50","100","130","55","30","1","7",'build.php?gid=19'],
		["Swordfighter","Swordfighter","65","35","20","140","150","185","60","1","6",'build.php?gid=19'],
		["Pathfinder","Pathfinder","0","20","10","170","150","20","40","2","17",'build.php?gid=20'],
		["Theutates Thunder","Theutates Thunder","90","25","40","350","450","230","60","2","19",'build.php?gid=20'],
		["Druidrider","Druidrider","45","115","55","360","330","280","120","2","16",'build.php?gid=20'],
		["Haeduan","Haeduan","140","50","165","500","620","675","170","3","13",'build.php?gid=20'],
		["Ram","Ram","50","30","105","950","555","330","75","3","4",'build.php?gid=21'],
		["Trebuchet","Trebuchet","70","45","10","960","1450","630","90","6","3",'build.php?gid=21'],
		["Chieftain","Chieftain","40","50","50","30750","45400","31000","37500","4","5",],
		["Settler","Settler","0","80","80","5500","7000","5300","4900","1","5",],
		["Rat","Rat","10","25","10","/","/","/","/","1","20",],
		["Spider","Spider","20","35","40","/","/","/","/","1","20",],
		["Serpent","Serpent","60","40","60","/","/","/","/","1","20",],
		["Bat","Bat","80","66","50","/","/","/","/","1","20",],
		["Wild boar","Wild boar","50","70","33","/","/","/","/","2","20",],
		["Wolf","Wolf","100","80","70","/","/","/","/","2","20",],
		["Bear","Bear","250","140","200","/","/","/","/","3","20",],
		["Crocodile","Crocodile","450","380","240","/","/","/","/","3","20",],
		["Tiger","Tiger","200","170","250","/","/","/","/","3","20",],
		["Elephant","Elephant","600","440","520","/","/","/","/","5","20",],
	];

	var actual = new Array(4);		// Informacion de recursos almacenados
	var total = new Array(4);		// Capacidad de los almacenes y granero
	var produccion = new Array(4);		// Produccion por segundo
	var imagenes = new Array();		// Imagenes pre-cargadas

	// Indica para que servidores esta disponible el servicio de Travian World
	// IMPORTANTE: Por favor, no cambiar / Please, don't change. Travian World is only available for the servers indicated below
	var tw_server = ["s3.travian.net"];
	var tw_serverUS = ["s1.travian.us","s2.travian.us"]; //TMR link to analyzer on us1/us2

	// Se estima cada linea como una altura de 20 pixeles
	var pixelsPorLinea = 20;

	// Imagen de un sobre para enviar IGM
	imagenes["igm"] = 'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAICAYAAAAvOAWIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QsKFws6qttDxQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAkUlEQVQY05XQTUpDQRAE4K8yz9BuPEduEH8C2Tw8haeT3CQbPZEiIeNmhLdIAvamqerqaqqDdxxwcr0mvAWv+MYHfi4I13hErXCuqmOSp9batFS11qYk26o64gzzmCXJPsl64DvskYHn1cKo995PvfdnPOBl5OjLa/PY3qEGtxm9Bh/MfwG/8Hkj4Bb3+c/rfgHKwRzhskmMfQAAAABJRU5ErkJggg==';
	// Imagen compuesta para el mercado con 3 secciones: enviar recursos, compra y venta
	imagenes["mercado"] = 'R0lGODlhRgBkAOf/AAABAAYIDhUDABgJAhAPCgQfBSEXBAAbTh8YDRsYHRcYKSsXAAQhQkcMAB0dGygcAzQYBDoeAyglFTEiDSYnERgyCzkmB0EpAAI1cSwuKiU5I10jCTs0D3cYAkMwEDs0HUkxC08wAjU5HEwyBD80HTk2KjU3OlYxAig7UEQ2MSJTAwJLiSNCYBpUIUs5Nz1APE09IVg8Dls5HFVADUhANUJHIVBCGEhBOy9WD2k7CExHIDpITUFGSWlAB1xANA9sHoI1EmdFDGRGFFVKKm87NVNFTC9ZVY42E2NNETVSdkJQYWRMGk9PTU5VNlBXK2FRH1VSRjRmOXNPEmJORlFUWHxPAGtQNHFSIXtSDWleF1RkOHFaKIRSIGBjLzOBCVlfZVljU15fXH5bHkBlk2RfWMI/CLRFD0RnjHlhHHdYVIlcEIxYIIlfBHBjN1dkeIdeGmhnTYVlCVpyPnZkPnNpMWBxVoBnOHJoXW10LmpxSIhhUZxkDHhqUWpta4hyBnJxSJRoHZloEm1wYmB0dn50KJNsJ99NBXZycIN+HoduaatvD3p3daFzIZV9DqhzEJ1+AnyFO0uEynp8eYh7W3OJTHGHXYyBOXl+gp96MHx/dnuCcLV4Do54e558RbF9I759CZCKVpqRG4mOaqiRCoGVY8iEEIqNio6XT8GHJIeaYY6RiJeRcpyZO5KSgYqSmrWaEJCVl5KjaM2SLNWTIZmcmaCehMOYSpyflpWgrZmmgpqiqsyrAOSbHaCmqN+gL5yruO6hG6mtqaa4jam1or23aqmzt928Aq22q/GsMbO1sqa6yMauuMK3l+fHA7e9v+zGAf61MbTHqrfDyrnNpvTPAbbI1rzKwMTGw7zSor/Ky77L0sLOvLzVrMrMyf3ZAtTQwsXZu8bT2s7VvMnYxczX2M3a0svY59XX087a4uzV0tze2tPqwdrm0Nfqydbk7N7o3tfo9+Xn4+Dp6+fr2ufr5ePw2d/t9Ob23+/y7uX1/fD26Pj37vb49PD7/P3//P///yH5BAEKAP8ALAAAAABGAGQAAAj+AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzpk2FknL2ctZNXbyfP891cwZLEs1e3fwpXcq0qT98RGEuxeePn9Wr/ARiZQoV1qGU6qb6s/e0qll+Z6+WReuvm0lYYcuSVTrXHlW7Y/PizUfVqtJrI5MpZVs2nVKqThEfXtx3cK9FHmHJG+xv8uR8S9NZ9pcOH7papOQZ5kyXaj5+iN1uDLMILT7EVEe/dtotFqtXjUj1U4p5sWHX/uJtnEy3stO5VPFtIxVqFzVv1EINQ6x56e7ZaLNibLx0M3HS8L7+kWrknNqzZ9SMnVJH2LjcxfwAWyxNuv7dv6dCGTNvzFiz89FJU9Z3xN2HmDMUhdUeU5iNJk8miDz3zC79NWPhebsIM1d9pAGHHIIRxcWZd03hMwwUUgTySnq7/PeMi+ZZItpclyk12mBoxQOiQyIy5eCNx3CgxiaKqLGfhf814x96r0Tj41K9TTYaWufI1xA6Sk22YVP5DKPDHkRuAkgj1FjYn3//edMMHt18V5Z7/vBVFT/9FGOlQkn5mA9Z96WzDh5qfLLJoHtg4s2LaCLZzCtOiJPXZhzqlWUyDUnpZpZKgROLHGiUUsqgmwQCyIVJomfMK4QEU5ZiTMnDKj7+aO2oUFNSLjWNKF3EMEIMWCjy6aBqOJckNbg14kcX47Bl2GTwuLesbMH1stB9bsazTR5bBBGEFG8EMYEUgg4qxijQKblLHB4IAYIFdIAyT282OjUVYtdImxCtecXThQUeBIHFEh70qogimwi6RyHG7GJLIzMg4EEVEVSSiw1/1IKPm82mgxmfeVUGi6wExVPfjfjMI4ITlMDQRitPfPKroJ6UIgQHSMywRAwBeODJBLmU04ooOszBDD753NiqWP4kQ+lBXLr3jRPDMMNJJeps8YmgqIS5CQjfcutJK1bwMosleQwjTC611ACHk8bJs09sTyXnzzmwINR2ie908U3+LS5U0o0UnpYiqCNEgiAEIJ4g44kPMkhRSCmegCJHNOxoAUUX9AR3jCqQDKPPm2NR9THTmC77lDpdiNMHBiiA8YQaQuzxqSOCBnHFG774YkYDAUyxTCKdoMIIKJXUUY4c8+AzjRMy9PBE2eps6U8vSxO0WJxilaNFLElgYIQGD8DAAQKAhxmEGJ74IosLKEjASTqcFOEJNLJg0kYqlNTDzz7f5OGBFFhAgx1qsSyqdKMX5ygIpuJlnHNwQAMrOAAFnsCvGIhBCpv41Qh0Rj8lMGAAMEiBBN4gC18gg34P0MTb0HKNGgzhCjmYQQ3Y0SpYqEYg5+iODvdWDjRIQQH+HwgBCEaAPlkE4moZnIABGIEMX0wAAULwRAwC0cQSMiIGA7gEO1yFj6dBQRCU0EINvqGl1/QiGwTpkcbKUokFwEEHskDFG2YgBFTI4o5bCNQsSsGvK4DAE3HM3R3jWIglWGAGF3hBNroxjW/AoQYsGIQ+hOGEbXBlJwQxXWbw0Y9VRGADG5jBGzwhBjvakRetwMUV9lCFCXhgADswQQ5MGEdZeOIK/JpBDCwgAF3kwxUfMIAEVuAGf9BDb6ShSjGql40ABEAAzgQAAAIAAHWswQxlMAMEAlDE3PFiD5mAhzkkMYAFLAAG2chEAgwAiCa+wQPwlEEIIvABSYTjF1b+6MEDIJCAHWCjHF2YpjOpWQx7/aMbfblKP/TBjmQcwRBl4AIMCpAFRsgCGZ+4gi6qoY1+5MMUNyCDLnBxCVpkoAQysIEHYhCDIIygBF/QRj6YQD5UBEIGEJiBDYbQBXYkNGnJSOA/nIEY14gDG9M4RyKAIANWQMILOODCJjCRiWrsCR3acEc++iGPLwBACUMhAwEQ0NITgGAR8vCoNqaQhg+MoBSoAMQMALGHLqzjKf9ASzYQKJBr9CUer4nGNszhjmqEQxuCwIEXVDABPlTDH+K0hzvC4Q552EMevfhCMeJU0AEI4AJQKAY/pLHZcIAhCsdYxASq4AtGAAMQYJj+Bnb8US+htokx7ShHNqqBDnf0oxp1wIEmZOoOZ+iBCL3IBznQ0dve5sMc1dCFTHVxA1NsVRcm+AIuvvCDH9AiH8pYhBiwYAddyEMd10DNU/aqDhwa6CnsYMc4pHFYczwXHv3oAwIksIAGUCEf7iAHObIhj3zowhKjeMUrQJENj+LDFTzggw3scIcWVMAEjwXvJaoBjwBHryzO0EV7/3GOyfwjL35hBz2skQ132EMbRYimNKVJgC9QAQDSyIc0/LAL9DzDGH7IMTy+YAdbCKETWwiAApIRDnLYAx7wYG40wLEUsiSjGCP2CVP80g+rTKMc8rjENAFQglIoYgwsmPH+NN1hjj84p8fP8MYrTNEPV8yYmtKk5iXQYQ908EDN00zAU3pxDXkI5LxxM9Bu+KEOB8yYFspAchLG4GhpvgDKq4Dzj3dBiGr04xclIACgM+AKyaLjGsPQRAak6YBF5BAfhCYIluBUVH+sWppfsKo7zhCJMQTCA9KcQHLJ0QZLEOPYdLgEPMKhDnSQQc0ZyEc+wnGNadSDKrQAQAYI5Iob/uMaOkymPw4xYwJ8uclMSEISCoEKaUZgAsHIxhfMAeVf3gLAfDbHnR1AjmtsQx71KEsCAgArfNgjHeqAi6zjVReoqLkPJbOGOWhBAzIoYxKinoEHgHCEL9ijHyCHBRn+eNAHdGTDHia4czTe8R4x02JLzuiFodMoL3+kfMYN5sc6wLFcc8jDHDyA5xjS0AELwMEUtMgEDATQAB/AQx7ZuHGej1EV6hDABGKBdfUGEhYSnQPQVceHPtYRjWtoIxz5QIcbIrGDC0jhBCcIgRBPUAY9RLkYfVCzKfLyGiYEwHRUkQcsyGEQEdXKFGq+QVHRoo9xsFiyv1DCCLAgC0YAQg2MaC0VnAFgctxCzVRgSjECYArgTOYasBCOQYxWFa/OOPQc46Q/2PGOY3A+G1CwwSzUd1Fg2IG31njH59TMA8NcLAEpwItsMHkQcjCGHzdQ8yXekxw6tUMc4TCHOS7+8QZUeH8TV/juNsDRD05WeppLWQQAwN0UdMBCqAeZNWJuPs33cSUt+HiHNchxT1VMohW6UAzkIA/3sBZMcGdEdQ4BcAjv4Sq00Av4kBA5tBkHOGPTRxaGQRZ8Ig+ooQ/v8G/0Rg7ccA/64BfJIWZ5tgz4YAImYHA+kg664G0GgQ4kg3gzhnX3pxSwkACT8Rr6cH3vAA7vYBXvFQzSl23LEG74oAvBwBDFQBwHB2jpQBa1gg/LAACLABuY0Q8A4CGMkQ5qZgIE0AeoERuYkQ2LUAxXMhr5FYajgRn4AAsAEHpwghoC0DEjMhZ0AmgJUB1MkXAgkxADuCr0BwAJ8DH+y7CDAHAIhGEPhAEASMMVhbhZC5QOv/B+D+EMrpJ+ogZoAOAASVgr9AGJfJclsOIPYTBjTCA3hpEPzkALaAQRzqCCfSEPtBAGL3ADJiAJgnEdxSEbAKAYxPEb/mCDAdCDTNENi7AMqgcRJ7cWcSJ7gwEbvFF1/hAANoIYvQEr5yAJi9ALVTYW3eAKzjBiIZKEHLMqpSiK90Fw2AMtW/IatdINnNAL5igR8qCC4oYXcBKOg4GN+PKLTpENsCBiF6EOWFaJmbExvlEVwWgcc8F6VMgZznAJyXCPFZEO0qCP4eYjxIEZ/ACQTpGBaDEa7tALsHCRHHEOy9B1NtIg8jK0GQRXKx9JK+ngCnzlEe6wDNWwRk1Rku7BD3eIPdczIOegCyk5cx+BD+cwi+pAIkdzjTpkGc+iC6aAQNohEvYwFMugGVAobvggAJvIIafmCjh5DhF4EvJADs4wi84wheEGkIGXDsswUrTQkmm5EvJwDtKgC365E8vQlgCwDMngl2ZJPSU2E/iAcEPhDErjDMt0Dd1QYll5E4nGRXl5E5q5mZzZmZ75maAZmqI5mqRZmqZ5EAEBADs=';
	// Imagen compuesta para militar con 4 secciones: plaza de reuniones, cuartel, establo / corral y taller
	imagenes["militar"] = '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';
	// Imagen de una grafica para las estadisticas
	imagenes["stat"] = 'R0lGODlhDAAKAIABAAAAAP///yH5BAEAAAEALAAAAAAMAAoAAAIVjA1wi82eFJP0RIhD1Xn77mhKIhoFADs=';

	// Imagenes de los tipos de murallas
	imagenes["empalizada"] = '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';
	imagenes["muralla"] = 'R0lGODdhSwBkAOf/AAkFBA8OAxkIDCYTAx0YCBgbCBwZFiofABQxAD0hAC4lGSgnISspFCkpGjEpDSwyEUYoADsoK0EzBTg1JzI3MDo2IEA2GDs0MSRQBDdCKE0+LEdEKFw9H0hFMUNESEhFOmBBD0NJOzxTGjRdE1JLJ1tKFUdUKm1KCCtsBlRUIFxLTVdRPlJUPVNSRTltCl9RPFpVOVZUT3xTDUJvH0ZrK4RXCWBeTjl/CXZeIlxlRHFfL1lnVGlmL2JhXmliR0x6GUaAF1pyOEx8KmpnV4BoH3RoQYZpC31gWoplH1Z8OpNmEkSUBYBvPGp0YXdwVXJxYG9xbG13VE2SG31tY1WNJVaLLYxwNHtxZWSNQGuJTp57E5V8KpF6QoB9YXt+a1CmDmiIc4x/TneHYZiFFHqKUn6BeIiDWIeEX4aBcl+hMX6Dgq6DAI6AaYuGa4SIdX6WTXGeTVi5E3mbXa6NKIeWcZeRbJmNgJSSdZyRZ5KSfYmTlImbao6UhYOahJWShXysVrGbIqWWf62bWXXCOnu9SqCfkZ2khZSpg5qljpamlpaseaekd6akfZCydKWjjqekhqyihZ+npJ6xd6mnmo/CbrWteaG5hbCyiaKyu6O6kKa2pau2nq62l6i1s7Ozpbaznre0lryylLu2iJjQcMi+i7zEjLDImMPAqcDHlsjDnrzJor/GrLnJrbXGyb3GtLjHvc3El8nKi8XIo9HDnsXEvcjEtcvHsK/cktnEs9LOmbrR3bzbqMrXsMfXudPUrdDTu9jSrM3T1+DRrsPY2tfTxMvYztDYxtvUvtbVzdnbq9DfwMPb+djcw8/k6Nfnzdrnx+jivN3lzcvm+dHj/N7l093m3Nvsw83q9NPn9OTk3uvm1+npz+/m0NXu8uHvzvLqu+Lu1Nzs8fLrxOXt4tTx/Obu3P3nxuTs9Nrw/evs6OHu/9j1/+Pz+On32vfzzP3wzfr1vd74+//yxfHz6fXz4/z1xvHz7/rz3O/09/j43vX38/781fX6/fn79/397f3//CwAAAAASwBkAAAI/gD/CRxIsKDBgwgF9luoT5+9hw8bNlxIkWLCixgN8tvIsaPHjxvxiRyJD+THjCgJbkyJMJ29dDBdRmRJMyM/g/oE5sz5L51AnzKzCZ03LyY+oP94/ru5tKbGlQJv8pMIE1/EdPqIaiVKT9s8aq7CFssWM+ZPpwg7DuSoU6TEeQ/n0Su3bVu5ctTolmPWixWnQ4cysTKmzWvMnFj1+WzIFu3CgQ19FoVJVFs5cNHAYcbsTFkvXqYs7ZGTRc4ewax6/WIWTRu9dPQiS4yakunSxlS1lqNHbRvmaN6cOQOnTBnoXY2SY0kiREgSOY0yCVZ17N29e/TMXddWVp/ti41//irml26e5buZo2UG5+yZ+86gG/35k6ZKleYzhFSBI8f0JV7iyCOOO9dxcw833BX1XU0OyXXPXdSoF41wzxRHYYW8yEdfGlLcRwMNLtwgRRpUYKGIL9C4I86KK0JzDDHEIOMTSAUxxRRMPc0zznATTujMhMV5Vpw1z1iziyn0fbFEh0mAYcIMS3whZRpvoJLMit9k+Q0wqXziCS0yomRjSERdFo17EzLDjDLMdPZZL70U95kllKTBIRVCkAFGBkJEGccXacBRii++JJMMocCA8kgeeUwiI1b/9COVRgXhM085mVHjJpxCusnLZ8o481kmjcCBRXM0iNEEGEkAAYQU/lIA8YYio0lSSi6qXGKIF0+0EcgpyJA1KUY5ERWhm7+4ssomm3AqZ6huZmJJI3IkEUQUTqxwwRXMkIHACD8EsQcPNAgRBBmSLEJHE048kUcbjgTy6FqUNnXUXW3yxYomiSDCByKsKOPee9H0YkqpWFQBBA0s9KqBD/vUwoEwkDySwwwuuPDDDNbm0HAXaLDxhCOPLpbWTcVqKqormhQSySSR8NHEJsW9J1wvisBBhRRKztAEA1k8EIQcKTjhDhkzYICBxiiMMIIJGXRxRxtOsBDIJ7hwR15SGPUzTzT6ahJJJ50Eg4kaapThyoVFsiLHDV/E8ScQWWBAxQ9A3ADE/ghJ/CDlDUvEgfEMBZxByix2NJCHJ5/UQkw2JS2I01f6epIILa0EozkmZfSQSJzgPONNL5ZUwfOff6KQhpJyfyEF3HLHMcgXIoiAgBnCpFLHAJNo40ghjtSSjUT4XDSPqH1x0sflmWveChRQ7LA2ON4Ep0gVUkoRZRoYSBG73CjAHvsXCDDwiDCzsFHAHVBc4YYfkwjv0z/2IHQpL9Jlcoi/fCRCth56iF4ZdoAIgTkjOJlQnZSWsAQMZGEGUqBCGm4wgxmgYHZSAgICSIAGO0CCDQbwxD60YQM/mBAXZMGHPorXkYXMAxzIaYQiLPGXPvAhD25wQxN2sINEJOIQ/gf0Bnva0QsahI8KSROBI8SAARGMAAEBCAAAEIAAGkAxB6mARCFWcABP0AMcxPACo8rgiWD8o3jp+A4/XniLUdBHDorIxCY4wQlmbUI4yjCGMqJhDW+0ox19+MQ8lCGJIEDtE7DIhj8kAcUMqGAKHrhAAQAAgB7gQhalIEEDaPGIVHCjCZ/wAxrQMAlcwMQhTRHIC3cxikEQIg1/iGNqONWZ6lmDSO2IRiGg8AFh3GMbewgCHXxwBGGYQxsR6AAdHgGJSlzCEzGgJCNycQoGTKAQNpgAGoagiS44Ag1l8AMtzpHG+TXEHv5gJSFcSYg/ROdTBgRHLuXpjHYoowlt/lhFPu6xD6TdDRVTAEEYjgAAFrQBEpC4RBcIYIAeAAAUjGjABKhxj0IUwhPa+IQhHMEHNdiBFpBTjHeSYg9ntHEQKG1nLHchnJa24zKvQERdeOGOfdTjHsn4QeBQgAEfWEEHGiDABA5AgAGsAABXQAYxDEABAvjANfewwRNWUItjMMMReUBDJGgBE/LUzx78KIc1TkqIsv4BDo1ITR6jQQ1q9MEYj3hEPvYhjnrAAx75+Ibf/kSDKAxoBRMAhSGc0AEAXIAe99AGABTQA3/cgxiA9UQhGuUHPriBD54IVmTA+hAYtnGdZSUEf1Sxil+sYhWcgMEdorGP1u7jG+74/oY8XvsGFwChaXW4xzEm0ABIMEIUkMjmNtxhCwZkIwaecIQbbKENYqBBlKNsVC2qAbmeQKSku6DEKEJLIhOpYo6rOMUjDJGPfMDDrvXYx2zlIY961IMMSXgaNE4xhAV84BGLWIQongADf+TDEA4gxhNO4QfHnWKUpPSCG8BLjFPKBB87MkWd7GSnKmDBErI4xSyYIY650tW98viGetULj328wxwh5sUT3GAMLxTgEaJgBCOeYANi+MEALShDyIaAhg88dwi/8IMXJrGJ0hoDR+kQSTrGYQxTyEFnVKACEH5QJWhAYxspam97xfGOEH8DHt+wKzzMsQ9YMGIbtbAG/jhoAQASnAESn2ABJSkZiUKUwRjBywMJiVEIL2iCE6dlxeOsshN8VKMXmTjVD27wA/28IRnuODE3AgSPE9eDy9aRx11b+0sWIOKP7XCGPloQgA28wAYCaMATahGDCxDjOm64xy/C6IcQGOIUssjwK8ZSkodYJRysOEQSMNacLFDCEtYQB2zN8Y67lriuzi6xO+ohijr4Jh/DUTM1KOAEULRBAwCYhD/84YnD2uJdtViBDTxRgDacghWn2IQrdh0Ol7DQHtlwBR2SQIMKZsESyZBFJSDhjtiK+cv7cIez0xsKd0ThDvlgT3Cs0Q5jFKALcYWEAU5xnUl84BdtuIMj/p7gj0kEwAvRSIUsNqGJVwQjHOwongqXUg1W0CEII6BBEvbgC1v4gAg60LSY08sN3XUgABcgpRu80UfhtEOeai7HA+6wCEaEogFo2EZFp0CPO/ziFP2oRgsa4AxorNx/w2hGM8hplaiMwxViCEIQaJAFUSQDFxoABBPcW49IO2IKKiDABtAQAwMA4ANDYEU7/OgN0YFDzRa/gygWUQcFuKG8NoDCJxwgV2JMoAn3iMYqQOGIYnSjGd2AuT1EMhB7wN0EsN+DLKAhDAUAYgt83wcuAiAAAeQBEipPBSeuEIACuKId7qlekbxBjQzQoeqQCIAf8kENBdiBGJ8ohDYK/tAEsLHCEE14RTe6cY3x4+McDYkKP35hBhyUgARmmMWW8n4CaNh0H5BQwAoUQEkCwOARTpABABAAifBHjScwwWEMPmAI+aVxheAPxEcL8+AFFNAAXbANz+ALnJADrRAPHjh+3XAOI8EU/eAKgrAFRlACRZAK0JAMEzAHW3AKCrcPdwAD27AIVzABcxYCtcAKDUUPznBLcNIXtBACRXAJwHUBEfABDQAAaoAMBAAAheAMhsIJiKAJ5JCFWogO8SCCxTMQvyAIt2cFdZAL4gANB7AFawAJCecOXeAEqQALsJAKNkAAhfAL3EAPFwAAXgAnrDBH+rMJIbBYbdAFAgAA/k1AD34AABTwAIhwDISyConQCuuwDh4YD+OHDjHHekthD8cgCHMwBlaABywIDxNQAmsQCCqyDz4AA7JACqIADDnoD+BwD7UAAHzQBVHwh5uACIewCV4gRQEQAtH0BPvEZhTQB6DACYqyCh5Yieuwhd2ADl54I584B1pABEWAB8AADT1gAXNgB6/lDizgBK9ICnS4Ar90D6cAAL+wD8nwfXRAB32ACBlAAbQwCTZAarZAIJ5gAHmACIbACV3AB+MQD9FYieQwfuQQDuvghQMxD8BwgtlIBETABGjQAwcwBmxQV/ugAFNgC6RwOA+TD9AgDrgwALNQD99gBjngi4kQ/gIF8AHZ0A+TsAALwAwnyQ0nJ2N0kAjNsA7oYInRqIXY0JAQeRPZIAwnaARGoAVQeQISIABzEAZ25Q4ToABX8AlcYgNtkA/bkA+3CAyvpQqGQAc50AcB0AANkHmkJgDZcA/5EAoMQAd7IAaa0A3xIA3ogA7dYIlaKA18eQ4iGJG2gAdE4JRQuQZrMAYCAAglwAOp8AgHMAEBMAB1cApPMAnlVQgxQADMAGbQAAyysAduYD5d8AKOsA3lhgbccAwbwAJiIAadgInQKJRaeA26eQ3YoA6E2RP8kA2HyQSJuZiNOQBawAMOAAAN4ATAcAoXIAC8VQiaYAOUhAan0F7m/mAOLVhNkAAMkPACbfBYaDABDNAEmtAJxRAP16CQ0cgO5BCN1yCY0oANm9gU2VAMhhAFKVCcjQkIESCVAvBIixALohABkzSAABADagAAIQADRQAN7yCh9ZAPJMAIszCHbbACp5APp9ACIRAJmCgNt3mbWUif0hAOEJkU6UALfBAFOVACOHACRjAGRjBJFtAGx/AJCqABC9ADtkABFBAAnHAP8yCF/uADZ2BT4sBsJAAJi4AHlZALleADTkAM/aAGHqAH6jCUloiQ18Ce6ECf2CANXth2+JANw5AIYJADOZACJSABCSAAFsADwCAMjwADDNACnlByGoAGDVBetmAA/lBADG2wASbWXtzwApBANSGXCrPwbXnQD8HQA1DQgUUJmOhADmQKcyIxFWdUDa+gCWAABk2QAyRgAQ4wBafQBV0wBATQAcdwHfQgUVfQAlrnCVI0AU8wBF1gf+IQAwJwAQqgAFmJBqnAJUUAA7bgD7UABWrQDO25DnpJDrs5jeEQDlbBevoQDsOgCX0ABjvAAjbQBbEQC7gABQCwApOQh7/UBkNwATFgA/u0VPA6BfPAB0NwBxlwAWUQAx/gCZ7gBy1AAjAACccACTm6D+PAByGgBsPwgbqJDZoIc2eqQvZQDK8QruK6r6mQCnfQAAowCV0xBB7KAobwCRPgAR+w/k9oEAEaugK0IHYNMAlDELBXMLBPgHgdsAKOgAuteAr+YAxNQAGY0Ak9oAe6kK3scJTayg8qxA/jUAyd0Ac7MARP4ARo4AYRIABskA+4UAv+4AUd8AS/QG4T0AND4A+nIEWVAAuzAAkrgAbZMAkN4AZ9xgcNcFExgAzIYLMd8AmhAAM+YAz+0AkUsAB60AMU0Alqhw3YsA7swFnnt7E5FAho4AMXcAGFKpdosAJdcQy+cwqTQAAXMAFX1QIAQIofKww+wKHa4AXs+gQPWAgeEEl2MAm2sAJtIAxtAANt4A9l0AJyUQs9gAnNALnUuHowgQwD2wZ1cAbZ5AS2MFf7/uQDn0AP3EANQ+AJ44AGUbSuiWUAbTALogCLs1AHf0oPhTAEk/CvF5C7fvABNnAPjpADRSAMoSBVn6ABn5BYLaC010AO7BBz9qAYf+sGTzBVaOAJ2/AJjnAPHocGiUUPT3AH1wEFNoAGBfAL+fALBrAIuQC3JEwKGvAC1FANNrBcoRADtVAL19QCLUAPfGADoCAMTgADV/ABMSCkAqyX4xAR+EALhXAFWKu72HEHLIC1tFAg94Cw3OAPU1CuQ0AP23AMAZDDNuAEV3BQwAAMXbABQusGUOAHNqAAOJYN1HAFhYAMT/Ck+usDfxoChKoLqFcN1RAO45BkyFAIHXQM/tRQCCTHDcFDD/OgW3LZBj4ADVKMBhuwttzQjguKNlDQAyGwA11wCpdAAk6QD8jwSJ5gBzawbmXQATZQCKegAaEQCsAQstADBXbcC7uGZMhAC19CDMcgSsGzDQjiCadQF9zADXdgC9vwAZCwAVOQDv6wVHxQDLRANp2gCQEUAoEADEWgAZ6AD2hwBfpIC37wBMWwChgMChowC6lACi1QDmgzDM7ACoMRxCt0DtmAC9RQC368tY7ADLbwTa55xeUFlhrABh2Ar8ewAgsACqMnsGNDNpEQAk4gDGxwACxAD7XQAnZws3ZQqLziCR3QBalQCR0wD1CgB8UQbKxQDEEs/hnZgH2FYEKFUAvGcAynoLWN4wXYi4f5MAF50AEjXQAFwAemwAiGsAmv0AmREAmYcLRqq8kWUAHEoA0NYKkBAAVuMARDANMWoDs24A8h0Ad9QAeZ0AvlABdgpQ/Z4M2FMAkX9cLMcAyP8AmTgAaWlQdeQA/0QAEFIEUUQAeXoDz8ogetUNRkk9TPEwIfawMV4Agd4An94AkAwNhu0Kc2wAYiMw4U0AR0cAhxMtb1kxRnLbCeMAmT4Ai2wA3GoM954DgX1TtuYABuEAL42At7YAIDbK3XoAvDgAmaoAlJfTYdEAq48Ak2YAAEgAZqYADX99puYAcfMAVPkA0E0ASq/oAm8AxWUIsMteAlL3wKp/AJtvB1n3AMxxAKp+AGC2AAiucLd7oJPlTbkbupulDUvY0JeuABqHA4TjCsHrAAtYAGHfDCVxADMeAI5fDT+SA6dtEPSoFv2G0LtoALpxAvpD0JnkAM9vwBE6AH1cAMwPALqWAIrqCX0kAOfVni0jAMrTDfZ7MBs9DifuAB0TQERPwJpyBUCiBOAdAC43Am4DAP6bcY2YDd3A3Bn5B9RL5LPYAGxNCCtiAMjtAEiXCJ0MiF/CCUt90KrdAJvR0CbYALsxAKwxgDPTAJxsAABwAJtuAACvACUPB5euQMPu4dHJEO2vDCEAwKp5Bcor3A/thpWr4gCrOgCW7QCboZD/FZifGwqSWO21je23rw27PQBSwwD2VgB9nwAhsgC62VCj4ACr+gPACTwgc8EDCx0rZA47WwChAsM15QQKqwCHvAC8zwC30wDIF56ENZ4n1JrYHdCrqQ1DEQCLBwBh2giFPQs/ZnU333DVYmC5zACr/AHTvBokrFOL6cfU3gA4WwCryACpIgCWHdDeu5DvMpmOoglFNO4rs+DLrg676uBjCQCl2QA/7gUItMV+d1V1pyKMDADNXgEg0hEkFuC4wz2m7QBW4AaKqgCntABn3wChFr6OUumF6K7iWehWMqDe2e4p2wAaDgA2t7ARj8WujF/ndaYmXboA0PAbU9sdKMUwg3JHKysAq+UAqK8JOv0J6CuQz0WaKbeps/P5S3/QqY8Ao2cAcV4AfaoAHC8GHudV5YwuxXZhjz0BM9UcuewAcc9QmpcAofmwqZYAivwKnSsAxmP+KHXolequtCuanSUH7NMAx8QAsd4AaBSwwNQGbQhl5a8g1nmPKUcUZp6rwWNQl0xAqoIAuIkAeJMPaCOQ2CqYUJmfYVf+gkvg6QOwzFoAc3iwZODcMSGmLuFWbyoCIronVecRXnV8ua8AmasAnxtgr+AvHNQPYJWaK4juu5noWV2AzhEAwu6gUhMAQTlQcvsCL1oGmmH2IDsiLY/lEUVa8Y+WnLrV8LRTZvwzDxaS/lao/ubd/9RRkP4VANoS0G4AAGUrQCPpAP7BViXcYipi8OqE880q9UtRAWu71rDIn27smFUl7xALEu3jqC69Chk4Zu3Ks+UQy1e+ZsUwUW0PbJq5exnjx38r59lPfu3T16+tL9+2cyXbVir1y+ajVsWLeC5AYSjIeuXzx20qahExgUJ0F17IZpOpTpkjVn7Zyy4pRvm7t93+q9CynunTiu37jRO4lPHz9+6dJlQ1ZM7athza5dI0eQXFyc7OKpm5ZXmkB0NoEOjGfP2CYxh6wdBgfumbfDvBy6c1fvo+RvHiPfu6fv38mU+PBV/gtXTOawt27hzsUZj18/dT5/oosXO55Ngt2uHRJDx5Ipb87GJWbcGOqqS8msueP67uM3cdw2/+MH3SS+dOeqNcNO+m031LL5DVymjiC/vwbV4cu2ClWpQ4d6OfXWblwvZfW9Md72TNUhVLySQfsGGq7cGYkelA4ky6xszgkHu9LQuaYbCbvhCaFppJHmmoJk66YZWq5YYQMYxHjPGWueAccZFetTJkVvnlGGFVZUkcUXYJbTSpuT0tEMJX48MyscIZtBh0hs+urmIGwuxJC27naxJBMTJKBSggMeYKUdb6BpBxxvtknxmW3uU4yXXlRB0xdfBBTnHh+j8xElfTzD/uccO8PBBs88seETwybfuqaZVlrR5A4xonBAAghASCABABKBqEtnvBTTmd6ceSYia3oxUxU1oblHR86gO5DOdDwLRx0838LwGj6xkQbW0obphI8nYNBgg0RP4BUEEDgoxMtLJ10M00xhdIYXZXj5hRc1fdnGwAMRjE4zfuypU88l+8SwGWwCDVTQQpwgoQQQIJAAhBOUUKIGEEi4g5lMvVEsIkydiSaaFZ1R5pd+e/mFGW7Mem5asn6k0zM7+XQVO2ya0SXQ0TTJgwl1TwAhXRnYdfeFO1bp5V5jmWGRZGeYYeZklJmhRhtt5hmVMzitJStbdV719mGJZXKpEDyY/kCihhpk4LUGdmUAoYgzOOkl5EzxPVkZFfN1hppoqMG65WwIlvlNslLSZ6xzFD5H1exGc8kVTQIxwwok2q0BY6PZPaGILjhhJWRl9E15ZZazpqaaasapBmaxDp428YPHOjVbO7Nr6RVNNHmkjTCsYLdddXFAonMdmKADb/pSvvpqrKuhZhzVxylnnq25VjzxHqMjayxU8QltGJdY0QQRQyx3W4nOcSgBByaON8MMQ0Q3JuWsBS9nddXNSscebMd67us4v+Y+JX7CtkefcMZpppdXWNmEk00MueOMyzsngokiikg+eUMe4cQVY6oOXHDBVc8GzOZhvbDho2CxgxOc/lCCD9rV7B/UYckreiEjTrDvDHgIAxc0aAYxnIEOhlie+lbxC2IYoxrRm55ZYAY+Av7DHg1UYOIMhqA4Hc4ehDNGMWS0CUQ8AhJ1wAMe6lAHQyACFOrjxCpWUUITBm4cZrFH9Rg4J+wZME7UItUMZYigsfBjHoSrhjGI8QtXbOIUp/jEJzhxilXUohauIEYxSlgM1KkOZtYTS9hol8UYZlGLCeRjILuojyj6DxmHNAY11JLDamSjkf8bXDaiiK3wGTBsW+zjFjWZyQP1ox/eo449vkg9AaZQQaeKIvjyyEA/+lF7moQlqQ6WQNr1qB82dCEhwxdFz1iPgIT0HiBlQknDWBYTlgrs3h7htEsCvvCB35vW7AJpTGrGkpNXhA4tU4Kgk2jGitUEZziRWcw9bk+Y4UTnJg3WR21uj5jTDGdAAAA7';
	imagenes["terraplen"] = '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';

	// Imagenes para cada una de las celdas productoras de un recurso
	imagenes["r0"] = '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';
	imagenes["r1"] = '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';
	imagenes["r2"] = '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';
	imagenes["r3"] = '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';

  
  //resources  # TMR
  imagenes["res0"]='R0lGODlhEgAMAOYAAP/////+/v/++/38+/369/v6+fHt6e/p4+7n4u/f1OPc1tjUz9rTy9zRyNrQxfzIi/fEnvTEkdLGvfa/i+/BcO6+btK9pPSzgOe1g9e4lu+0b+u1dvGxiNe4ht60eOqwdeSxd/qradCxguinb+WnatOnh9+mdOGked6jfuCmU9CnZrSqnuWgcNyicdija+aeYrukkdqgVNGbctGadeOXZM+afNibVuOXXLeeitGaXNWaVLWcjtKUd9qXSKmckK+bibWYfr+UedCUSN6OWteSQbWVft2NRdqJRtyKOsSLV6qPbMWKRL6HZ8GKRZ6MgbuJU8qDTKiJb72CVNZ+NLaBadt7OcF8T8l5SMZ1W8Z4Qq96UsdyPqx1UrB3PbB1P7BxTLtpMaNnPKRkO3tiTptQKHpYM5BSLoxOOGNRSIBJNoFIOHNKKnk7Kmw7LGc7H10zGk4yJ0M0KEUzJ1YsIlArFEUuH0wlEjgiGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAAASAAwAAAeRgACCg4SCChYIAYqFgytOPzUnTFRDVg6MAAtRJRA5ZW0xWGoEjEVaLDdgb2wbPHMGjDMtLhdpcF80WXE7jEo9HSAyZ1wjV2hAhQVjKFVINlBiEVtudweDA0EmE09hdHY6Lw9mcoUJRykfFV51FBgqQms+hQ1TRhxNTRJEIRokMJg4kpDxwABABildRAjAxLBhIAA7';
  imagenes["res1"]='R0lGODlhEgAMAOYAAJBcMPHWwMahh7R4VMdQHP727ci6sNt6VqtlPsltT+rl48JrQtivpbaIZ96FXI9YSOjGr+m1iNphNrxqPvPr3dGomc14VOVsSZxxSeCeduPHvPB8S9u+sqFWLubhwLteNP///8iwlNJpRcmKacldMNdrNeSJY9JuS6VkT+17U9CCWt62l92HTcl5Wvjz8PjdxeDEvLxwUfTQsKZhPNephfHg2JNhROrYz9jCs8OWduFpKtW3pZtzWu/mz8xvS/B+W8lyQOzMsfR+Q+qDVqxmTPDHp/fy6+ZrQMyZZrdtS+R1U86betSunNh9WeaWaNFgK9uzo7+Pcei0kp5bOtdxOeR6S869tNBZF//69o9jVu6BPqVbN8SRZvKQYOJ2SeHRx61jQeTPvfDh29a2qs1ySs2DYNh+Uu6GVMxyQpNaOPLWxdBrP7eLdOa1jORmN+ZzSr9jNNCslNyynMOAXfb19PTjyaRmQevYzqN1V+aLVb1rSv///wAAAAAAAAAAAAAAACH5BAUUAHsALAAAAAASAAwAAAeygHuCglhYg4eIg3Q5RWFhAS8FiYcKAxF4KAlmQZOCODtsNHMnKV1FnXsCMhQhZSYZEVxxapKDYndLIzwDJGQ2aWA+DhCHVnUQIxNUWiwICwcpVSuHBh49UWhvZ05JTUpKXipyhntWGA0qJVMAM3pAWw9EC2ZSRntfHXAlQjN2FiJVwGRp8WNDnhp7bnwgcEUHmglrJLghE+PJkQtDEGIZU4EJkzAcGDBgogEGFCgMOLgIBAA7';
  imagenes["res2"]='R0lGODlhEgAMAOYAAA4SDOvhzaaOdXZrXM/EtFJKPv///7Ozqj05NIR5aPDu62VXT+jeyTAkFYZuXKWXkV9JM5yEb9nSynZuaCQiG8y/r+3n45N8bGlUQ6OSgVZTTd/f3Ec4MYtzZPr38q6bkSEbGMK1pW5XSD8xItvOxIuFepmGeOXXvH5zcHpnVGZWRkxBMrWjlK+bj2lkVOTe1/LlyF1JOYBxXMO2raCLcz0rGCkhGUM5Mt3TyaORe3VwZurl4HxtXPn49/bx7JRzY0dEPYt7amZfUpaCbsvGv7+3sDInHJqFcR4hH3JVQ1NRUK6gmpmJfHZjUPDmzVlLRYFzZEJCMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAYALAAAAAASAAwAAAeFgAaCg4SFhocWPoeLGxo6BAEMAYceOEsPSkgALicwToUKFSEVHxw2FFEFMzgHhAoJPBAtLCkqIUcrQAVChEUYTTEdOQIXDwsNHAMjhDNJPEFQCUMiIDc1ND8OhDsdHSsoCAMZRkwXIYczDilPICsyQjMkiwoZESYTJUQ9PYuCPS8S+PULBAA7';
  imagenes["res3"]='R0lGODlhEgAMAOYAAIhNJfn05+LHqcyogumqOqKFYuGRKvvlxLp3Jt+ybP///+DEicSISODQwPHp3+GqY+vGj821ncORQ/j39OGfT+CpUPHIdu7Xr/HavNx7GujHnPPo1cWgbtezjfG6W6JSFtvBpvfw6NiBKv778LiQZ+zdw/DXs96+oPKWI+urUOjUtuy8Qfvq0//13ujRhPjIbOW2ctS1g//mxfzx4d7Fn8mMWuzRn82NNvbbqfrt0vHNgObYvNq9jP/89uiULvTZvOfNlv/55vz59ezgtv/x5evbzPbq2Y1VJfjsxt7FlPfm3vLGefTAXd69pfCyVeTKivG3dvvo0f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAFIALAAAAAASAAwAAAeCgFKCUkIhg4KFh4obMTlGIBsbJyo9ij0BQTQ8NkkcAxdAFwIHAYMBQ0gLC086LzAQHT8CKqWDPTsRGC4eK0wWF0QNIFGHMyVFRjhOBChLI4rQUgESCB8k0dATBUcANZXYgyMPIhk+LeCDQlApBhQs6IINCRU3DBrf4A4HJiYltYeBAAA7';
  //clock
  imagenes["clock"]='R0lGODlhEgAMAPcAAP///2JyjWFxjHCAmpaitvLZ1ezn5pWitXyLpHyLp9XFw/LRyvnr6KScpfPj4GZ0jImQoIqSo4OLnLixt4CImvns6vDd2vPd2ci5uPzj3rvF2IaIi3d8gXiLpvz8+O3Szmp4loqXr+PT0mh4k7O90ayvs19pgODR0HF1fGZzjvXd2Pfs6vH09qOosffc1v///EROWezQy/ny8HiBlmd0j/Xa1HaEneHZ2fDNxe/w8qOwwIOHmfDX0v36+dPb5sjQ2v/8+97l7p2ovQoUHJSToezU0N/Lyd7GwpWLiqipsN3V14GQp8TDxbavtWx/oMm7vNTGxVlphn+Jml1tivDV0HmDjeHm6/Xk4MvT2vDz9NPS1neGm/3+/+ru8bG5xHKElq+zuPH1+LjEzvnm4q25xObq78LK0//8/HSDnPPy8qmkpOLGwfn485uWob7I1lZlh9LZ4fj6+yE5Tmt7mdXV1llph6ifnfDz9fL192x3jPHRytLY3uvQzNbe51triv7m4YuasnOGpcK/vsjO2PP3+ZCeroCPq3B/m6SvvW18laCms6ecpOfp6eLT0IiVqLK7ydXb4Whzi1ZjfurSz8rT4YiJkXCAmZWjuL/DyeHl6QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAASAAwAQAjJAAEIFMjoEaBATjpcGuRhoMAwhihcYbBCBhCHACBF0SEwCIgJf6BwQDEpwwkYQ9Sc2YIgjsAcEkwkaeRiAQ49NURAkORlIAkaa2IUuTDmixxMDsW8sTKwT4JEiPZ0yZLJjKMpB1hgZFMizwwiDRa12fFACh2HXIREuiFoAwYqfAooQGJHUZ0fAjWkOPKBh5FKTZS0qMKkBwAyfsoAoBTgiQoLDipoAZPGYaERdwT6mBPBwAuMALAIWIIHIyE3IdAMOGTJBgE4DgMCADs=';
  //del X
  imagenes["del"]='R0lGODlhDAAMANU2AN4ZCtAgFNAgHdsgA9waCs4cDMwkHPNfHcspJ9oYCsoYDc8pINAYCvg0AORNOeFFPtA7O+c+QNRTU8BMSb4gHN5lTNooGsc1N+g+PuEkJOhOKLlVWOwxD9MlGtUiFMwjFcI7LtcfDPY9ANs5L+JMSOxhJLRDO+YfDdYEAPdvHORZRMkZC9EcDcwXE8ssLtonG9gbG+M8EOEZGdkZDNwVCb0pKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAMAAwAQAZJQNNgYisajzZVDHRMBJC2TEvxOY40HNfRsEJGYBKS51gS1aA2gCXVQEApDONDBikuCmgMioV2vC5FMx1GFQchG0g0BDYnAmhFQQA7';
  //attack
  //imagenes["att"]='R0lGODlhEAAQAOZ/APT09Lq6ut7e3uKdOP39/bCwsOPj46WlpY+Pj7W1tfv7+8zMzKuGUfb29s/Pz+G6gb29vbmrlpOTk5SUlKmpqZ2dne/v76enp/7+/qiDTuzs7Orj19ra2ubm5s3Nzbi4uNLBqLGxsaGhodTBp9/f37KyspSBZLixp6x4Lefn57OISvDw8KOjo/j4+KaZhqWKYqRvJLe3t3R0dLN/NpiYmMSXU6x2Jf/QiLutl7V5JMTCv/+8WZaWltrSx+3t7c2LKunm4tPT06V4NsOHMczO0deQKtm4h9+gRrOEP/P2+vv49J99Sr+cae3r6MWAHKurq9CXQ8nJyYWFhaKkpf/Je+XayuTo7eDe3eXn6qNzL4V0XNeiVGlRL8Sxle3s6+zZvPbbtaSgmvT086yqqYeIiYFTEuCjS+inSbCys5dvNdXV1drVz4KCgq2mnejo6Ovr68zMzdyPIM25nbqwo5GRke2uUff39vf39/Ly8reRWo2NjYCAgLm5udHR0aioqP///yH5BAEAAH8ALAAAAAAQABAAAAfHgA4hIgl/hoeGAhUUMVILBAt8iIYWFAQaNAJ7QQAeHIgrHw0dEwd/BnpRdx8ChyUAAiwBh24yagoBHngIFik8E5MObBwtCRA+GgWmk399BwINdG8QfhjMhgESJB0IEteHT8oGChXMQEZdcERJZFNYVmgnDz2GG0hZKmAjYToRXw8wZoBAhOPGmR9LGNgYQIWJGERjUAyRo4RLmSob0hTRAsDQnBxO2hiy48XQFSFxTDR5AWVHBmvMXAyowyCDmS0Rvq3Jc6RGIAA7';
  //reinforcements
  imagenes["def1"]='R0lGODlhEAAQAPcAAP///xprJU5MlAd1CBRwGDY0Zgx5BfTy8g52DE9VlGN+Xwx6BRR0Gy0rVWObQzAuW0hGeBFzE0lHijteQAZ0CBJ1FChoQRNYKydmQUhHijw6fDc1ZxVxGRZ4HFBQnBpsJQ9PGT8/gEdFjluSQt3b3Pn1+JOclFmTQd2/NUVLjQdpBbu5vTU0aOnn6UZLhU9VlTw7bwp5BDp2SK63rRRxGdzZ3CBoOz16R9rAM3+OVf38/rm5vAxuFlRZnjEwXkREjhNWEg9kHBZQHhBSCzg2ahp+DEVEg0VDgtLU0E1MlTI0brW1txpTMwt4DBB4DlpaazFjMqKRZCFmNktRjRN6E1+YPXF0T0JIhufl5whcD8TExhNwGF5flnh8S2uAM/f29BttJxN0FiYlSYiOijd1O01Tkd6+LBeAG09NZ01SkQt4BA11DCsrVjc1ZgRzBklHi3eMISJnNUtJjmNhd8y7Menm6LScV05Tkbq4vBxrLU5MlQtNG36QexZvIBpULx5mMydnP2GDHBtiNhF1EwZOEkpIZA9SHkJGiEJDhQdYFK6zr2pvr0lNkAd0Ci5bLkZFiImYhcnIyubFUTk4avfy95OVlx9FJn10hyBsMRtpLiRpORV0GhBFHyJiPEJDgaCpnURGghBzEwFoA1NZnQp1Dk5NlQp3BS0sXG2DbV9hdUdWUgNJACxxNh1oPjQxYF2ZSRdwIoCrQgVzBm2HbZaLgkdFd0lPiZKdk7KytztAcmVqrSNjOnxyXlNQbzSCFEpJjSRoOfz9+zAuWbakektJjUtLnB1/IhtoLa6VYF2XQwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAj/AHeIaSDsgQ9XBWpBILKhTYFTTwCYyDIoQhgHZuB0CFWBx4QSALRMevTjUhRakuwMQ+ZBTxIYkQAAwOIoyIcAOMEkUqBDJoAZKmKoMdVIlhsKAwYYMLBA1Kw6lv7EkSLoBg4vrWwA03QBlcwvhUJIyHAoBaNfxBD1OuDTZyVOsPrsUUWiLQBcuVzYmlLmRQ9di0YluJPmSipFfnZ1khGryqtkJ0ZYwACIya0aQJqsKULFGJ1AZ3w5QUAKCqVgczS8kSOCCwpexQQIKMVihUwkQvIcY5XDShcymTAZ+tR2DKFNHAgQ2EKDAYgldgHgYePJyBFQStC0iO4T0qohfNjaAg0IADs=';
  imagenes["def2"]='R0lGODlhEAAQAPcAAP///924GMqqJffNCEpLlfjOBbicNjIzZvHy8ubBE6qkhTMzZvDJDkVGi0VFiubAE/bMBkpLlKWJHlpXkfnQBN++G+Tl6frQBUVGjkdHjcurJc2tJ2hiUufCFFVTieTIHPTRIkBCV8KnLd25GUNDd4RyHLa3vbm5vKailJ2DG9G4SbS1vEpLZykpVdS0IEZEcsSoMfDIDJuAANKyFOPl6EVEgXZoIefDE2RjdWBhekRFeP39+7ecNZ2UbcauQXZ0r7m3r863QzEyaPjNCJqDM56KMrqiSE9NhllZa1pYkVdWkLafO15YT01Ob459LqqPK5+GC/7//76nR7iYFElKlEJCg8WtPXFvrZeAL01JMV9ggl9dnebCFjQ1aod5QIF4VfDy+Pn6/khHgr+lNt++GvfYG+7HDPbNCiIjSTU2ajMzZ9XU0KWIEv3+//XOE72hO7CYQVlXkdbY3FJSnJaWl0lJjbmeObSxnaOKEtja3MG+rbqgOd65GTY1bi0uXtW3Ik5NiPXLBiorVrOyt+Lj5zExLMKfD8KrQue8A8TExjAwYDg4fCwtW3RoMz9CYGBbS0JDiN23BZWSiq6WOjg5b1xZlb2oPj49M3NkJkdHjlJTnCwsWUtLlUZHjvfMBa6VPJqAGfjOBIZwH0BCUTU1NUJBXsbHyqikk8KlLfDNDFJQhZ6TX2BenqWbbaafe/b29EZGZOG7FkJCgkNDhfHJDsKmLreeM8uyQ1tZlLW1tykqXFZXhz4+gFhVjV9gd0ZGilVUjV1dlrKZQe3u95Z+HsSnHE9QZLGaP7yoQvDHDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAj/AE+gabGJkR9FB0jo6KJmwQFdSACgMHTjAZcghWx8SNAhlhcwABKlgYRhlzEto0LkcKSJAAFKpgAAIOSkmAYBODdMWRVGJgA9kSiE8nQGQqABQwYUKHABUSsamGzxMGBAyqVGlt7Y2fOkRxsAr2DxcvALEDAldTLMaoLAp086ov64SMEhj1sAg16o8tArSSVWV35swTUhzhEcQLBM+mQEmRUVt3wcEgbnGJFTcvCkSmbGDYgsJcrMoBWDQZFhO3wtapCpUzBSpeZQicBJiAmZa4iJQDXmC5NHS2rBkHDHrSQ2ZPgEWD6iAqhcdwGsEFSjiiwxfVhYiC4zigIZUFy1A70bEAA7';
  //gradient
  imagenes["c2"]='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';
  //ok button
  imagenes["ok1"]='R0lGODlhMgAUAMQfANHzpLbEoPb/5NH9eo7eLe390tb8iOb+t/L+2979oNv9lLPqa6HkScPwg+j8w9z4se39zKnmWrTwU6nrRr/1X878csf5ap7mOZPhLIrdIYLaGHHQAH/YFMDAwND9dP///yH5BAEAAB8ALAAAAAAyABQAAAX/4Pd1ZGmeaKqunTgGXizP9GDb8Z3jdB8HrQ7M5zMojkeDMblUGAZEGrATrRkSh2w2gd12DwkFtBojkXPXQ0HARjjUAjfcnRiTzef0esPfICACfAV7Gw51Zx54VQMKcHwQCHwIgX6Ub2KIilGMB5QQB4B8lJ5gBoiJHRWqq6yqnJZZo32SYAOtt6skFru8vbyNkYVYwcGzhgO+ybwkFM3Oz84GD8EOD9OSj9QAA9DdziQS4eLj4g0ABYIPDpTU6BsFDw0U5PThJBP4+fr5FOYQkpbcWRPYQMK+g/hIXFjIsCFDBgvMOZj1AMDEDQAs8gHQgIHDjwtJYBhJsmTJCxEWVmRc2UBlxpYsI1wwSXMkiQw4c+rcSQDigp8LIjBIGXToT487k+YkoaGp06dQmxKYOhUnVatVo2ptSiIAh69gw4odS7asWQ5AXpxdy3ZtWhEs4sqdKyIEADs=';
  //numbers
  imagenes["s1"]='R0lGODlhEQAMAMQAAP34wf/6wv/8xCopIJqXdf//zP75wiMiG//+yre1juzntPb1wURDNC0sIv/7xA4OC///1v//y6OgfYiGanJwVzc2KlJQP5eUcpyZd//9x///xywrIv/9xZiVdP//zf//yiH5BAAAAAAALAAAAAARAAwAAAU+ICCOIheRKKopkmGk6LcwhxDAY5Y0T2XjIg9l0tn8gCIIZnAEBgoE5g0JgEqp1WgT6LnUpkiPxOIAIwPmUQgAOw==';
  imagenes["s2"]='R0lGODlhEQAMAMQAAP34wXRzWgMDAjc1KYqHav/9xv//zS4uJP//1P//yvz3wNfTpCgnHvLvu5mWdf/6w/75wf77xZ+bebOviP75whkYE6Ohfn99Yfz5wqmmgby4j4F+Yr29lZOQcMrInZ2ZdyH5BAAAAAAALAAAAAARAAwAAAVcICCOkWFGY5oWjRQ4TaGuzXAExxHPouEIDQSgQjDwAJGFpvBIMDbGYyEBQXwEC9kR8DBYBJLosUsQWAyULSURqHgQCS0vkRFcOJPJAjWDsHMMgR0JWwoACoiGKiEAOw==';
  imagenes["s3"]='R0lGODlhEQAMAMQAAP34wZmWdTs6Lerntv//yQMDAv/9xllYRP//1ffzvm1rVSwsIv//zeLdraOgff75wv/6w/74wbOviOXgrr+8kg0MCRwbFXp3XMXAliUlHPLuud3aqxEQDaekgP/7xGNhTCH5BAAAAAAALAAAAAARAAwAAAVgICCOHsMQz6iqRhJckgGtqpcIi2IpKC0SEs4AgSlMDD7AQzMhICSVATIJITQOhQAjkhQZNoHDYjP1GQglQkbBSBI6HwKBIfi0fQRKdhAoUAhJDwQOC4UdPV0ECRMJgCshADs=';
  imagenes["s4"]='R0lGODlhEQAMAMQAAP34wf//yzs6LQcHBYqKb/Dtuq2phCQkG//6w0tKOf75wVVTQf/+x///0KilgB0dFri0jNzXqRISDZyaef75wvn0vqKfe21rU/v5w358YIOAZMPAlv77xrGuh7y6kzAvJSH5BAAAAAAALAAAAAARAAwAAAVRICCOIhUwZEpSjBVhqto4gxPEJBM9g3HjAERAoPnYgIpGRsA4HHGBzaHQOHQaOATmICBoJAsPJ4aoXBaJxOAzQcUUgUAj8DBggSIEIAFx4/EhADs=';
  imagenes["s5"]='R0lGODlhEQAMAMQAAP34wQEBAS0sI5uYd///1cvHm+nmt0VENf//yf/+xhkYE///zfbyvaelgdrVpv75wf/7xKWifqGde/34wP/5wl1cSP76wyopIA4NCuThr+PerfHsuH57YLy4kLi1jWtpUiH5BAAAAAAALAAAAAARAAwAAAVmICCKU7KcCzSuI+REUmxY7Lp8mHAJBVKLlIRgQFgkLI8fALJRRBoeS0IJQBQCl4PiwKD9LA6OZqFRcBbKCYJAI1QO6B+i8UEkCIdKvIboBCQGEgEFUz8PCBI7Ag0ISVQIDBkMPiwhADs=';
  imagenes["s6"]='R0lGODlhEQAMAMQAAP34wcXBlmxrVEZFNf//3QQEA///yenntsvHnP/9xSQjG3h1W///zvXwu5uYdjk4LBMTDv75wSkpIdnVpv/6wxYVEYB+YjAvJKGee//7xFxaRuXhr6ilgPv6yY6LbJCNbiH5BAAAAAAALAAAAAARAAwAAAVdICCOkcEwyaiqZbB8h7GyhgUJj3KkM2BMBQTBcOHIegzPwxCYZHojBm4guSUoUGkB00EUjFmBwpBgDDSMrKOSMQ0E6V7iAFkcOIXAsWdAPCQSGAYRUCIGFBsNeyMhADs=';
  imagenes["s7"]='R0lGODlhEQAMAMQAAP34wf//zdXRov//ygEBAScmHisrIcjEmP/6w/77xXl3XP75wqKee///yf/+xuTfrfn1v8zInP/8xP//0D08LsK+lP75wVZUQaOgfaungoiGaJ+ceWtpUjU0KDg3Kv/+xSH5BAAAAAAALAAAAAARAAwAAAVNICCKTmCazaiKicC8WBYl6zhsRm4QSlCPCIlkoihAFj/RYjGIEA6DJHBAuQQsUlHDKUhlAQFOZ4D4IhYFje/reBAq0W9D4Hl8virkLwQAOw==';
  imagenes["s8"]='R0lGODlhEQAMAMQAAP34wQMDAv//zJKPcFlXRDc2KtfTpP//1UxLO83InOfltmtqVP/+xysqIfjzvf77xP76wv75wXt4XaShfrCth+PfriQkHJ+ce/75wsK+lB8eGH57YPr4w/r2wA8PDPz4wiH5BAAAAAAALAAAAAARAAwAAAViICCOj2A+Y5o+3yRdHaqOEEdoi4Vw0CwyhoDhUAlkGD4A0HgIJpBJwcCD8EgEkeRDUSBcCIWKbCbYWEyCwkIQXRQOjAOCwPYxMoGJghKg1GcRDBMNhAMMGEkiAg4VDgKIKSEAOw==';
  imagenes["s9"]='R0lGODlhEQAMAMQAAP34wbSwiY6Mbf//zAoJBxcWEWxqU+nnt0dGNnd0Wv//0/PwvP/9xtjUpf/6w1lXQ/75wZ6cfP34wGJhTCsqIT08L/77xeLfricmHv36wx8eF/j1wKWjf8fDmObisPLtuCH5BAAAAAAALAAAAAARAAwAAAVnICCOzmA6Y5oyW5QEFqqKkrUhmoFNjDwPEYJHcSAEBjPRwFAZQAaVBDI5EBQYikxhMp1ZPAVE5EEwdFWSweWB4CDMSYClEVAoBgXOOTXoGA8GGgsWSRJPAhgUFQ17Kk8fHgwDEhIpIQA7';
  imagenes["s10"]='R0lGODlhEQAMAMQAADo5LJeUc///zP34wbSxigkJB+nmtnh1Wx4eF//+xyUkHM7KnVhWQ///2EtJOffyvS8uJGlnUv/7wz49L4B9YYeFaKGeexIRDaekf93Zqfv5w3BuVmJgS2FfSuXhr/j2wSH5BAAAAAAALAAAAAARAAwAAAV34CAOiTBKQjquSYZJg/QEB5Gsg2BAgCB9E0jkUjGJEgTFxVGyXB4NQsFwI3EClEmKwRAkHheCUdTIpiYbn0QRqMYE2RLgoGaPc2aBI+IbICx3cFoCBz06BQtuOYVeCwUWBgwQGjgCARwJKBYKPBmKOCICDx4abiEAOw==';
  imagenes["s11"]='R0lGODlhEQAMAMQAAP34wf/+yMC8kv//yvr1vv/8xBcWEfDst//9xf75wv77xP//0MzIm09OPdDMnp6beb66kd7ZqailgAAAAAgIBg8OC0NBMh0cFRAPDMXBlmNhTPPvucK+lP78xe3ruf35wSH5BAAAAAAALAAAAAARAAwAAAVXICCKAzIC5TkmgxR1AOvCZ7E8kzDYuH4qHg2GkhkEh8VTgNNwXAQLptM3+hAGBIPumqWuEAftIAEWqwCFsC9tVrHX6sE5XYHI6fazYmNhBAB7fX9nhGchADs=';
  imagenes["s12"]='R0lGODlhEQAMAMQAADk4K///y/z3wOzotk9OPAUEA5yaecjEmf/+x7eziycmHXp3XJSRcR0cFmtqVf75wv/7xP/6wn98Yf//1YF+Yv34wWBeSfv4xC0sIqmmgbKwid/bqz8+MBAQDDAwJb26kSH5BAAAAAAALAAAAAARAAwAAAV7YCVWSDCWQRCNY7BlEDkwSybE7eABAbI1HEeDcFk9EBpFh1CyYAKTTeFjOloMEk4AcjggEINCwiR6TCjaIyISEA4QI3Y28KhAAovCgdyaHy8WHXssIgFzEBcEHgMTW4R4PHgFBh8aGgOPDBZwihgKn1SED3UVAqUCqCMhADs=';
  imagenes["s13"]='R0lGODlhEQAMAMQAAP//yzk4K/34wbKxiwQEA0hGN5iWdenmtcjFmv//1Hh1W//+x4yJa//6wy0sIiUkHH98YP75wuTgrx0dFv74wf77xYF+Yg8PDPDtuWJgSz49L6ilgMG+lP35w+DcrGZlUSH5BAAAAAAALAAAAAARAAwAAAWCoCAKCzCWAECNI+BtFbUcDMQBEQtgTgAsnknhczGYBJHF4HEppCCORYIxiTSQi4zBogE0DgdAAlq5iiIJLq4CQBQIN1YDAOlGkghDoYCp6Oo4C4IJGAQbRyJ0XQsQDD8NRYgCAAo+AAxwBwoXHgs6BhkLHRUWDz0IkiwicxgSFZ4iIQA7';
  imagenes["s14"]='R0lGODlhEQAMAMQAAP34wTc2KrWzjP//y5iVdE5MO9bTpOvntHp4Xf/+xwICAv//0/75wt/bqg0MCv/7w/77xFlYRIB9YYeHbj8+MCMiGxMSDuXhr/DsuP75wQoKBx0cFvn0vmFfSmJgS3FvViH5BAAAAAAALAAAAAARAAwAAAV1ICACyTCKz/Cc4tAIHCNCHHFA53AEwSAzA4TCkBBlEoKKo5CQDQQOB1HESHgIEooPgqkQNtMRY5FVDQofjCWMGpQHhMBCfTHlyhdFZPLRfAw4I25aFxEFBRQaFAJFggg9KQMLBxoNKjkEHk0iCRcUDY0soqIhADs=';
  imagenes["s15"]='R0lGODlhEQAMAMQAALWzjP//y3BvVpWScf34wQAAAMrHm+jltjs6Lv/9xv//0xgYEv/6wysrIX57YDU0KCUkHP75wv77xYSBZP74wfbxvEA/MZ6bee/ruKakf2JgS7+8kg8OC+PfrTAwJTg4KyH5BAAAAAAALAAAAAARAAwAAAWCICESSTAGKBqNYtBlUiQZ2XVlFXNiHhIwicei0UBgEoRIAgDhWAIJzMKggFJEMs1l8gwYFpuM4ceKKBzdS+GB4GgCKxEjgIZuHBVvAWA61SMBCgxzDQ59LXV0AwoJCQsDhwR0DygTBRsHAgsHEiwBAxoJEgkOEA0fYyyqBHMYHRKHIQA7';
  imagenes["s16"]='R0lGODlhEQAMAMQAADc2Kv//y/34wZqXdgICAaqog0xKOv//1uvouMbCl//9xhsbFVVUQSMiGmxrViwrIuDcq9TQov/6w4F+Yn98Yfn0vuTgrvv2wGNhSw8OC3t4XUE/MWFfSvr4wz49L/f3xSH5BAAAAAAALAAAAAARAAwAAAV5oCAKSjBKQSqNYwAVqyQV2iCsLQIAgaQwDUfD0MEpCo2MIVXIIA6WRkQhCmAGE0+K4fgkLIoLS3LIpjYGwCMzMJ0CFK3Ck0kEBoQpC64NABgHJQ1te3EpGBsqC4QtGjwKCQQDCBROVC0DGAooBQ+ediyhVRUWAm4CIQA7';
  imagenes["s17"]='R0lGODlhEQAMAMQAAP34wWRiTDg3KwcHBevntZaUc0xKOv//yf/9xf75wv//zS0tI7WzjKqngv/6wyIhGv77xnx5X6Gdev34wP75wfTxvIF+YuDcqxAQDL26kT49L9vXp8K+lKWifv//17CshiH5BAAAAAAALAAAAAARAAwAAAV4ICBOxwGQSpoikygeVwNBnGR3zQa5CrEIB0hkQXwMGiYKgvHAGA6JKOJgMCAcgAQkULBooFGFBEMwuRIeLxSAqGAKOxfAoVAnAIoCpoKQi+pfUQcCAQp+f3YIBAMZZn4KEUAJBwwDBH2HBwUBJgcfBhNYh4ctLXIhADs=';
  imagenes["s18"]='R0lGODlhEQAMAMQAADc2Kv34wZORcv//ywsLCEhHN3Z0WurntSQjG///1//9xrSxiqShfX57YIF+YmFfSvbyvaqngv/7w+/suBoZFNzYqWloVioqITAwJWJgS1JQPsTCmBQTD+Xgrvv3wD49LyH5BAAAAAAALAAAAAARAAwAAAV3YCAGyjCWgzmOQxVJ5CQ0i7IGw4QBg6IDFo5BRVogCJoSgxBILAgHGCkjcHxSz0NiOZGKEtaBZPCgFAgRYmDcuA42F4OgoIF4ce0UPTGAEBhqA3kDAAYJJRQCgQ08AwIEGwePFXeOGQoSEg4IFxgLajdrOR04IyEAOw==';
  imagenes["s19"]='R0lGODlhEQAMAMQAADY2KZaUdP//y/34wevotQYGBUtKOa2qhXRyWdTQoyYlHf//1P/+x+HermhmT8bDl2ppVP74wf75wn57YP77xv/6w8O/lT8+MIF+YlNSP2JgS/v5w/z2wBsaFP/8ww8PDCH5BAAAAAAALAAAAAARAAwAAAWC4CAOjDCWghCNo9AcUsQQwWQJEisQACAwDQUA0gmoBhLGQfExpCCKzcJSaDCQDE0Ac0kBEAtP5HMwiSQLbipjWCwaBeOoIph0GVRH4PKRt+wqCw8GBksHV39dFQ8PbnAJiCJ1PgIBBQkNFwYMOS0BGgwVGwgKChkEHiyqA3QEBAyRIQA7';
  imagenes["s20"]='R0lGODlhEQAMAMQAANbSpP//y5WScm1rU/34wezmtDo5LBsbFc3JnP//0xMSDqejfy0sI//+x11cSCclHbe0jfv3wfHuuk5MO/f1wAwMCbq4j/XzwP/7w4SCZd7aq7KuiMPAlX98YREQDeXgriH5BAAAAAAALAAAAAARAAwAAAWNICEGZCASZXOOSNdxZgB0mWaOS+U4lZBwHsdEoVFhIopOIiFQRAyD5cRhpGwKmMCG6IEFFocIZoRpXB6DTwXQCFg8BdVIYmBINOv2Oz7SPAwSAXgIJFsSKg0aBwMBCQEUBwtLGQxVDAcWEBsQDQMPGggKAiYNAAynD38SFA6pAxhjBBEnEbUEWQUFAbEhADs=';
  imagenes["s21"]='R0lGODlhEQAMAMQAADk4K///y/34wZmWdQUFBPHuu3h2XCcmHf//0/75wv/9xry4j4qIai8vJPv2wNfTpH98Yf/6w/77xYF+Yv74waKffKmmgbOwiRkYE2xtWWJgSz49L+Dcq01LOsrInb29lSH5BAAAAAAALAAAAAARAAwAAAV6oCAqQSmJY4CORWUMhSIGnCUlLNBkTVNIgUIDEMAJAgNCASHAMBCXA6FTFEkeC0UkcJggNIPJpppKIJIPhVlMFm0rhEqAsoWMjYItI66a2ckJAQYYHggBMkd/RgEWBBAfFxcPJ4JEOIE8DQebAypIGmooDgkOpaYrKCEAOw==';
  imagenes["s22"]='R0lGODlhEQAMAMQAADY1Kf34wUdFNtvYqenls5WSch0cFs3KngwMCf//yfr2wf//1CcmHqmmgiwrIr67k2RjTv//zf/6wvDuu/f0v//8xV1cSLGuh3t4XRUVEP/7w7ayi4F+Yv75wf75wn17YCH5BAAAAAAALAAAAAARAAwAAAWIYCAmUZSIHWmKbHJw35N4ycNxxzk2iAUhhUUBAbEgGieNIsNZCDMEoBPD8EgkiguhErkgCJcJt2CwBmiVBIVhMWkShAwmwgokJgCH2E5gCBQaLQN+EycuBn8VggYQJQkuGR8LJh0BGhQOBg8bFw9xAJudCh0VAw4ADKkCG6epfhSBCiKys7V1IQA7';
  imagenes["s23"]='R0lGODlhEQAMAMQAAGZlT///y+nlsv34wSYlHdjUpjg3K0hGNx4dF//+xqmmgfbyvf//1QwMCSsqIc3JnPDuuvv3wJWTc7i2joaEaP77xJGOboF+Yl1cSLGth8PAlX16X2FfS/f1wRUVEOHfsCH5BAAAAAAALAAAAAARAAwAAAWO4CAGZCAOZXKOz7VpZqJtlqCOSoNxjcRIDcCB8FFVIp4L4+eBECyMAOFiGkQygkog04AIFoEIwlJFVRILAieQSFAIhkFlFYAYHJDKXPGWlAMfcBAmAVoMFg0LcwkFCAABUQIHBZA5EAkVHQ4IExMZEwsOBx+NGDEFDqkOcAsfB6sAiiIRclYRt20CAoUiIQA7';
  imagenes["s24"]='R0lGODlhEQAMALMAAP34wX58YD89MO3otc3JnV5cSN3ZqR8eF66qhI6LbAAAAA8PCy8uJL66kZ6beE5NPCH5BAAAAAAALAAAAAARAAwAAARSEMhJayUhkIsqWkWxONNwCNUSSM4yiY83SN/sCAFqSUcBGAdDbjcQMGYCUiBWMTAEs4QikBAcEhSgj1Z4PBggCuPQaCAalOHEyRg/Z6ztbj6JAAA7';
  imagenes["s25"]='R0lGODlhEQAMALMAAP34wX58YD89MO3otc3JnV5cSJ6beN3ZqR8eF66qhAAAAA8PC766kS8uJI6LbG5sVCH5BAAAAAAALAAAAAARAAwAAARYEMhJayUhkJlM39xSFIsBEEqjBtTCAsYCN5aUDLY8MnctIQWAYCFoLBiWQVESSEgKiMqhIcBdFIfJAfGYDApZAGNhBTQQDB4SUd0GJVMVgjpQnru+Sp0SAQA7';
  //buildings
  imagenes["g5"]='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';
  imagenes["g6"]='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';
  imagenes["g7"]='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';
  imagenes["g8"]='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';
  imagenes["g9"]='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';
  imagenes["g10"]='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';
  imagenes["g11"]='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';
  imagenes["g12"]='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';
  imagenes["g13"]='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';
  imagenes["g14"]='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';
  imagenes["g15"]='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';
  imagenes["g16"]='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';
  imagenes["g17"]='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';
  imagenes["g18"]='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';
  imagenes["g19"]='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';
  imagenes["g20"]='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';
  imagenes["g21"]='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';
  imagenes["g22"]='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';
  imagenes["g23"]='R0lGODlhSwBkAMQfAElfLFpnTdzo7ousYVaxE5ZjDauwsnKOTxEUBUmXECxXDTVsDJu/bY2Sk2R+QF1ACzVAIFu9FMPM0dnznLt9EX6DhaClp6/Jfra7vj+BD290cUNLOn2bTZidniQ4Df///yH5BAEAAB8ALAAAAABLAGQAAAX/4CeOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/oIEcBOK8TikGZ4clkFAi5+KBQ2BcKB2N1dnYKEAcAelwDB4SFGR4LBB4ODAcOHFYAC3UEfZAKHgkRBJSkGYtREB4RfqUIooCtpRERGQS2bVIBk6a5t4gHEHakprURu1CcucARnQEidAgZpcd3mlEAzcfPGQt627XACcpQDhkJpLbAGdkBd+kR6u5NHACVDh/boAl3CR7MeUCwAQKBBQAELWHAqo4HDwcG4IPTyUMcEQ7wIVDoQJURBpb2/TFUSSQAfB5G/wx48ACiNAcBDnBg8MGBQiEKAAZ4tGCBHYgXaO5LifEBBBIKYM0iUC/IhqRwEPjsAyiSBwgANDly0BHCgw3ZPijIRQrQvJs+AHyzdefhOosemCY4ekBqJIB+FIjAR66sxx0H1nW7ww7XpFIWO91aECEuJay4frFFcPQHA8bWgIlaxy6XT1e/Pv2S1HmcTsuekH2TF5qsAl/sEgAza83YPH9odait6muUrc7O7naz9mwBHFN+yCkIuyOn1Z4ZWKWTPC+XnwQ9Zf+KBCCWqZ6/Dv2Q6DZgRuPQ09EDCAjQa5+AOuYE9Evd3CASFejb12e+T6YPIfCQTz+J0gYfouRET/8f+xnBATWdyBYJTQFA4ABcd1g4AgdcSSIVBDEpAQAbT4mCAE0MbMRAdwGhQJADEAjlBANyAFAZKx9w8BUKECBwgSMBhKQEBwPImKImF3JYwC4oDvNQTZOMYo4RuyHExkoPzBTQAQU8AABLLBVAAVGjkFXZEej8hgtAHjzQJQKUUcCSnCxB0ONVArrGHBEX/vYbJQc8QEEBhMpZAAQDJCpNd5H9dmYRCtYHRxsrUWCppQ/IOAIAstkHx55CMNDfe354IBQHYl66AQkrQrCBJNdl0KAREIgiyQJ2hrVSqhQ0OEwFEmDgUF6aFjFAkCNO+QGWqe7nwAYWSCCAABUGoIH/hlUwIOil0QSwQQMGTDuttAJIsGq2YVrqqgYNdECuuOKeS4W2hRbgQQMaAPsuvAJUkJsTx27gppgFbGAtBuRKUMHCGmAwLVYb/JuEAxpYoIGgBINYAcICGADnxwgovEEHBoCFxLEBaFWxBRUMrG4A7k47EMgCBoDBzRg8OsQBNmNw7QYGWNBBBRAUSsHIFtysAc1wamAABhXYrAGoPgywQcU4Q9uBBQ0QbfQDGjjdwAZkgwyzBUFXYEAHOvvAwdk4d2AzyxVcfOmY1gZFU6IFfduuAQY0nPOsPTAQgAVo44yBAfiSLbDRLZIwAQMMXJBvBQ0kHfjCFVJtgxzQtosB/+IdkFwB2TZ6wOsDA0wwgQkHhI255g3ULoEBbd8QMNc3N2BtAERndY/LcjIw+QkaAJ/501DDLMHUOwTQHdDBYlChRplwwCHxrE9wAQoMdLA8zhZj0ADhNtyDDwQNjI4VPtlr78C2mLb+wQHfl3AA5iQr/jTuASgWDRKFCUwU5H3C0972VneA130gfyS4QNf6l7isgQgIdkodBzChPa/c7VAq4AC7EBc1cN3uetHwQSJSh4CTWMiDvJJTA0/gPW8FoEJkuyFWIOC5GWxQUwwgko2k9xDiWaoADnDgB5RYuWXxLCAWEqAOFHU/BXIlKxcISADg5CYw4e+BFyhSRAiHCSr0FU4E2ksUjRQRxJp4yVsyCaAJpMgEGglFKBdKgx73yMc++vGPgPRBCAAAOw==';
  imagenes["g24"]='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';
  imagenes["g25"]='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';
  imagenes["g26"]='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';
  imagenes["g37"]='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';
  //roman
  imagenes["unit1"]='R0lGODlhEAAQAIcAACAtITJONTNVNzpUOz9UQEJHQkxbTERoS0tnUFVqWGdsaGZwZnl8eVmCXmeEaGaPamiAbHCFcXWXeI2ajouTlI6YmJCPj5icnIKhh4qkjZujo5+uoKWwsKywsLK2trW5ubq+vrbItrnAubvIvLzAwL7Gxr/Hx8PLy8PMzMbMzcbNzcnWy83V1c/U1NDR0tDW1tXf1dDY2NHZ2dLZ2dTZ2dne3t3i4uHm4eru7uzy7Ozw8PDz8/fz9/T4+PX4+Pj5+fv9/fz//P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAEIALAAAAAAQABAAAAh6AIUIHEhwIA4bNQoqFHKwBoeFBHHIUMGBB0SBPVio0ODiohAdMUpU8OARCA0TFEh49DEDBQUQHoW8OEGhg8cfLVx+WLhjA4wfNVJQuADxRgICEDBYIOpxxYMDAiKI8BgiwIQgBgpAzJFhAIOYIyQ0ABBTyAIHCBSUDQgAOw';
  imagenes["unit2"]='R0lGODlhEAAQAOZYAP7//+SVnurb3rRQXbqMkuvb3eCiqeKiq/v7+9jBxIlTWfj395FLU7FRXeScpZtPWOOutK2Ymua+xMRdaa13fvnz9OaRm7KQlL2sruKnrtzV1uepsbqys6een8uKk9h+iYw1P40vO7hUYd2kq+KGkebi4uWPmemMl+HFydOaoc5WZfv5+dFmdMK3uPDe4N2mrcelqLyKkOSXoKiYmtezuLpBUM5mc6+MkPj09N3GyaJlbWRMT/Hm59mts+vt7ZwyP6xWYNxwfeKkq9Fmc8g7TZVpb6BGUKxeZ/v//+vN0JAqN/z7+9mgp5mLjaWBhr2jprFKVq1KVrVocfb29olZXs5pdeTb3OKSm////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFgALAAAAAAQABAAAAd6gFiCg4SCODFANIWLKz0bJx6LhEsSBxZGLZKCAEkGJCIcmlgAKEImUU2iWC4ZARMzqgUvASwXqjwjV0NOqgJMMjY3kiUECT4QDkFFCJJWDyBHH1UUqgA5KjU/OhiiSClKTxUMO5oaUiEdggtTkjADRAqqglRQDRHyWIEAOw';
  imagenes["unit3"]='R0lGODlhEAAQAOZWAP3///X29/7//4IRDIQQDejp6G8QC+TFt3pQUHZqSa6Sk9uGbMaimIEIBO7x8bFuauXk4764n/v8/cS+tbm5m9vS0oIWE95/Zu7w8LqtgfT49bKunvz9/saflZUvKuDFuaeXYItjY+/u6+WMcrdHOc2Oh9ivpN1nVZBkZNR8a7m5p76mp/z9+7CIiff6+unp6IUNCbW1rKCDYtqIbfz+/+HCtPf39fv+/nVsS4c2KJSRc/zy8IIvIeeaf5VDNtnJy6CSc/n49fXbz+/z6vr+/peRdXl1R+/Z0duOc5NzcmxAN9S3qvf5+tnY1Obh4nUPCbRUS6B4eLOcgIMTDuZwWodjY////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFYALAAAAAAQABAAAAd4gFaCg4SEOyWFiVYSRykPioQ0HzMeFZCCHEJITwqXVgFLPQZJApcCNQtTVUSXDgcjBC0AiS8QVkwdFwNRkE0bNyZUMCiziiwUDCcNCC6XQ1IkFiEYnioZOUoanj8yRgk6ESKQTlA+MQUBQTaKRUA8K56COCAT8YKBADs';
  imagenes["unit4"]='R0lGODlhEAAQAPe6AP/+/ry8vP39/V9fX/T09Ka8zUZJUGNjY19fXsrY3iMsPPHx8TM8QSUrNQQFCtbX1v7//MfS2kNDQzA+SOLi4p2qs5KSlEdGRmuKm8/U2t/l532KjzhHS8jHxzJBR4GBgf///nRzdJCPj32er7e3uHl4d6ysrFJpfFdvfeHh4vz9/JOerXKUoFF0jo2jq2uHkcvLy6Cgn2l8hmd8j3SMlXOIkd/g39TT1e3x8ZeYmszR04WEhOjp5klMTf39+8PExW6DjIqktri0sIaGgZ2dnbG/wnGIj72/wIefrlhYV8C+vrrHyouLi46eor+/v2yIj7K/x32Unebm5WhoaGFqbtXf5M3Ly+/z9vv8+7y6uAoHBUVbbyMoKa2urURJUY6OjoKCgsC/v9bW1V5eXvX09Hx8fPDw8OPj42+Qrebl5r29vWyKnoCeunmbr7a6vXCPmf7+/n6JjHN2erXH01d4lN7e3fz8/HaUn2iHlevt8rCurWiFjDw8O+Ln5G+Oovv7+3Z4el5mbOnp6a26vpyprp2yv4yMjH+MmYmMirO+v2JiYuzs7GeLsY+Pj////crKypmYl7CwsG+FjldmbePp63KRqZSUlIaeuUlaYoKctsrNzra+x2iDjfr6+b/N17nDxZqip6Kos0xMTPn5+fj4+HGQmvz9/TU1Ne7u7nOMlPf396urq3x8ds7OzqKion5+fXSOnG2Gk+bt8LfGzfv9/amsrunq7cLJzgAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALoALAAAAAAQABAAAAj/AHUJHCjQRy4sm67k+kOwoS4cgVbkStNJlyobP9zkKMFqCCIqCkABCiWwVRcLBhzgarClBZ1DXmbIAqArUZEomCacQHOJDaMEtjJAoLlhkgcUbSoVuNEnk6dcWXgIxIWLAaw1UHLpEZJn0AMrO+zo0sJhBIYKjkCASZHLDIIYhgjo4vLCDxIyucQwycX3SK0wqHRxYoFnFt9IX3LRyhVhTp0Auu6UekMpl4AFA0ioyFUoiBRIo2g8cWEKQK4ABxQlkSMpVhUlBFLtWZILDqlTJnSJ6BGHkKYyMGoY0cD3jARBAl/xCdFhygcgMm7xDTBgoBNRF1wRWfWpiQ6+j8YICRi4yFIjNRQCAgA7';
  imagenes["unit5"]='R0lGODlhEAAQAPcAAP////7+/qCJYgAAAKeRbc6/pf7+/aOMZquWdaSNabGefq2Zd7Gdfa+be6aQbK+bektALfz8+6mSbYl7Y4t7YqCUgauVc6uVdJiNelxSQKqVcndsWHdtW6SOaqeci/v6+Lijgp2HY56JaL6rjMKymb2ulIyGe6yXdLSeez0zI4NwUltQQKiSbnNkS66aeqmUcqqUcfHu55aDZKSMZzswH/Xx7qGLZf79/JiIbqyWdHFlUmZUNqeRbNDEsvTx62laQ8i+rbScdXptWLqxoayVcOzo4HJoWv/8+KWTdIR7bI2Cb6iRbrGnk725sY6IfaWPa+fk33tsUi8oHY1+Y7mmiKeRbqWQb5mGZ5OFbpqFY19QNsu+qdHIuPb08KWPbJB9XJ2Vh21jU6eYf7Kefa+aeLemiczCsZiHbZWCZK6YdraliQwIAZyGZPDt5qWOaYB7cq6ZeJ2Mb6aSc5+HYaSOacKyl7Gef2BROZWBX7SdeKiSb/39/IRzWaCYipGEcLCcfI5/Z66ZeZuJa6CReqeQbKSVfa2YdaiRbbqumgkHBaqbgV9PNbWjhLKiiHhvX414VvDs5rKdfZSMgLGdfp6McK2YdqeQa6mSb6KLZMTAuaSNaJ+Mbq6Zd6+ZePv7+byqjfj49fr49u7q5NPHs/n49qeQba+kkbOefqWOaLKde6mTcHFhRufi2GFSOaCJY6iTbrCadVBFM6ybfriigIB6cdnRwVxRP1FELqWQbEc+LXtyY6qUbqiTcNbPwuHZyrKfgLCZdId3W6OUeqCOcKWOagAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAj/AAEIBBBgYAQAR8x0AXBQSpZdhBIQsIKDAbFIgiiNqQGgQAEkPyBEAYaCzIk6o3wZEIhpjhdVh4jcaXIDzA46D2QF60WKFZctHmi9MSFpQwomSRAVHDAg15NXDy5tGkZFzS85GPYAkKApgQMXcCS0ODMLxB8FkxR5EiCAV4NOV3QRBJCp1aJBcYYM3CvQhxFTAIp8AFCLhBgtawbQWPXoizBbgCAJdKIDgoogsGAEstNgAYMSbQQmipWHh4MlOSjgYpEqzBQ/oADgsXSgiptTaCqM0PAizScEPQIccNWhVCVDbCZwyCAkBCoFjUIJsEHAgh4EK0QJVHJLRhk+WBjND7iwgJMIRysFxuhTCAiUgAA7';
  imagenes["unit6"]='R0lGODlhEAAQAPcAAP///wAAANOsauXCivDQmfDOmNqzdtixcf//29+6feK7fenHjuzKlOzKk924e0MxESwbAOTAhXZdNv/ks9qzdK+Uatq1eMmlbP/lsYRpO//xx9+4fZSFbNu4exQIANCxguzauv///efCifXMiuzJj72lfrGnlNu9ie7JioduQ+S/fufKmY+AZeXAh8KibrOggGVMIE04EunFitu4gPDfvb+xnY59XvPQmd27h///8/3dquvFjPjbrLWqmP/w1V5MMfHOlNCsdMCgbv//4riYYP/xxKSUe4RvT4V0XbWbc+vHkZR7T/vWndq1dsqseeK/hfbYpOTKn/DOmdOsbGBNL+vHjj0tEcWpfZ2ThOC9gtGpafvYoOvHj+C7ftu1duK7gPHWqtGxfigWAKyUbPHOmNO1gvXOj457Wd/Mr+K9guXAiaSHW9+4e+fAgv//+9+4ebqkgs6xgP//6c6pbOfEiZN9Wdqxc+vJk/DQm+zHj7OPVvHRnX1sUcenc3FTIJ2UhdO6k/HQmNavbv//8eC7gMynbu7HieC6ft+6ftu2e2BPMdu2ecWqft/Fm8CfZfrdrKmOXtrAmNWvb+nFjGlPJeC6fWdNJf//8P/rye7Mlt+6e9u1ePXQlOS/hLOZbOC9fs7AqdO/n9i/k0w5G6KCT//98NPFrsWzk2VKHv/rv9u1dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAjxAAEIHEgQwCWCHi6oYGMgwQxGBTaRcfIhkEAECE5IeLDEECcSdIrkIChIS6I0ldpYKgUAlJ8mDVZAGuhmCBosf0zUOAOBhhFMAgMEsLLoU4MvYcro4LEHxymBCigYcHCHi4IUV5hsyURAShQAAgRkYZCnD4eBISihAhTHR8GCSEAU1NAIhlAxGfQQEUUlycAeRx6QGoGikxI8DBYUSDUwwCgzmhwcElGhQxcgfDzBEejozQFEXm4ICYUhwpMdEwYMAnBgioUNk2QUGmNDUZ05qgiAASspQQtCA34MfBHDxaM1JaDYUbOgShAWBU1FkgMgIAA7';
  imagenes["unit7"]='R0lGODlhEAAQANUwAPPy8+PBrMWHXOPJt/jfy8uWdP76+reAYE4/RWA/NBQGDm9RTOzq6/zy6atXJ+/Xx9O3qQAAAJlmZsxmM/vu5pmZZmYzM00wLf339vjm1N/a2syZZjMzM/v7+2ZmZszMzH5oY5kzM8yZma2qsP///rGoqfr7/P/9+/39/vPUvuewhPHKrO3AnPjq3NWpjpmZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAQABAAAAaXQJhwSCwahQbD8dhoZQgto6FFJRBYqhRFulKtCKeCi9U4DsYpUiGwwphdgQdMMGBRGqnoMABJPVoCLi4qGxspQgAAgl0TDg5rGW4wDAsLCRMHKgcOdSkAQwwIFyEiBCsrBQMCFhwjQxULAgEVCQUqLBIKFh4oiC8uBwoKHAIHCREXJUYvERIgEBofLy8mRqEIGktFHZ9LQQA7';
  imagenes["unit8"]='R0lGODlhEAAQAOZRAP/EAP/OAP/KAP+sAP/AAP/FAP/JAP+zAP++AP+5AP/TAP/PAP+QAP+1AP+ZAP+rAP+NAP+0AP/GAP/CAP/kAP/QAP/dAP/nAP+eAP/UAP+gAP+cAP/BAP+uAP+bAP+pAP+3AP/jAP+IAP+9AP/DAP/HAP+PAP+fAP9UAP/mAP9bAP+kAP+DAP/bAP+jAP+BAP/IAP/XAP+hAP+WAP+7AP/lAP9gAP/fAP+yAP+EAP+6AP/RAP/cAP+2AP/LAP+SAP+CAP/NAP+TAP+/AP/VAP/pAP+nAP9cAP+LAP+4AP/ZAP/MAP+UAP/WAP+aAP+vAP+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFEALAAAAAAQABAAQAe5gFGCg4SFggICJQ1COTYoEEgyICQBgxg7PDFGHg0jBCQAAIUmOh0OMwgTAC1KhlEXFDUVJidODYUGPgsTGhs/QCIeBBISMIIOHxwECQcPAy7IBRWVhSEpQRkUIa6DRRcLCAEJ3BYUCgYIT809JYQbAwpEBxpQDxE4NAX6ggaIBEwMVBxhAWFFBAACBC2RAGDEAQgvRGBgMCBAgAWDOgzhkCRCghMMJgQwoMAQiAwABlS40cQCt5eDAgEAOw';
  imagenes["unit9"]='R0lGODlhEAAQAPeVAP7+/vz8/Pb39quRf4YvL0hcKYVBJ0lbJO7Boa+DcqmQf6EcHeKtlePi4IkTGHpGL404O8CbhvLy8dGdhXdOLfr6+rGNeKqQgc+agfb19MKSfYNfPe2zm+mxlu/x7+3w6ktiMffTtJ4aHY4gHOHk4dmli9qhir+9usvFwN3Z2cqVgIQaHryvpqmhl6GnlHhzRfL09LAXHNbTz9fHxqJlZb3DtJMbHribi9TT1qg3Nk1lJKOBedSsl9K9rlZqONKLObEkIHZMMefl37vAwYNmY4x9cY1iQf/FRebp6HwzH2h2QuXp4auBbY+cgvn5+eCslf39/b61rq+UgvGzmL/AvOaul3QmJoosL8jHxz5XKfS2nPz8+7rCuHtgVYcREqQbHadEP9LCwrBlZaeVhcmfiN3f3YaUjNyjh6IjHdvS0sKZgsPKvLyzrqxbW7aNfPj5+Ku1l6+Fg4CJdpSDZY4SGKYYGbuciMaNes3EvLWFN72NdZwTFLunocqjjHhbTtOfPnOBX3SAc9Wiitaiia+HdNSfiUJZH6wWFoZVPNqmjb2CN7OSgcS5tPDw8cnOx9/Ry5RAOcLHvKgaG2JzVn5ZPP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJUALAAAAAAQABAAAAjKACsJHEiwoEGBADy4gLMkwMEPkUg08WFIhxyHBtdMKnAAhJI5WHAAMFgjUJYXF/gkGIPEIABHZlr4KcLIgoI3BhsB4vKICZlBep4IOVjmBIxFU0xgKMTiYCUqKAhpOVNCUBSnQ26o4DChCh4BBbdAqSRggAY3DOxIMCimzYwMUhKp6cPGCcEKYSDs8bKDR4cIRK7QaDAwjQ1JX+isuIMgRI8ch6ykENjlASIKin4kIQAJDBARDuIIDGKE0oY8R/6MiFFnARoDMgQGBAA7';
  imagenes["unit10"]='R0lGODlhEAAQAPebAD09PTk5OUVFRTU1NVhYWFtbWzc3N4mSoLnD0lJSUkJCQjw8PDc6QEFOYjk4OFdXV0VEQzU1NGdnZ5+tw0ZGRkdQXDIxL39/fzg3NHJyciYqMEBDSF5eXlFOSWFhYeft905bcEpSXebt9snU5MrV5WxsbDE3Py0zPVNgdMzW5FVgcEBAQENCQFppfzk4N01TXT4+Pj49PJGguKazyDMyMikpKK+80TAyM8PM2rTC1lRTUTMyMVBccEhGRVpaWuHp9GR1jYCAgG5ubnx8fDc3NsXQ4HBwcEVRYsfR4igtNEFAP4CMnqi0xzIxMXmGmTA2QSopJzMxMCooJ0lHRktLSysrKklRXjo6OneDlE9PT1lZWTEwLIeRnkpKSjI4QFFQUNni7d/n8kRCQD9KW0NOXqe1ykVTZ9Xe7UxMTHt7eycmJKWyw05NS+bs9bvI3khJSn5+frjBzuPq9lBQT1ZWVoGBgTU0M0NMWYqVpjEwMDIxLjk9RDQ0NE5OTmNjYsfR4V5rf3h4eFNSUXOBlignJTg+RoaQnT5AQ0JIUo6dtElJSUhISDExMDk6OlVVVb/K2U1QVXNzczQ9S0pYbGZmZnZ2dtff7TU0MoiXro+Pj11cWv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJsALAAAAAAQABAAAAjbADcJHEhwoBsEcQoqHOEkBKQKCgnKuAOhA6I1ETf9GMSAjY4XMzIWaaBAEIE3eDIiISPmSwE/GyYobPNoDIsEHIxoUvGBYBkQkrwomVOgUqQePAaKAKJBDZQYfRyVqENpypMUAm2Y0HNlAJoEHoLA0SKgxhEwmxDssdOFwgoCgTIJyQKjCiEzYXIUugRAgCIJF4b4WASAj4UkODYB2kIkAAA6aTI8oKJgQJQTfzaRQNEIgwMDARYsCGAggpQWBDFZOeSCRpM8jHbcmGSp4BkmSw4c4GIISyI5AgMCADs';
  
  //Teuton
  imagenes["unit11"]='R0lGODlhEAAQAOZgAP39/TElMTAmMoJ5eF1VYIJ4eTUlMDEiLhgaJ9jY2eTg3jIgH0gzPCwcD0AsNEE9QsjAv8G3tNDIxx4WIy4fLbCpqCYbJaugnVhOV/Hv725iZlFLU0gtGlE4Hvby8tvT0ZSLikI4QkIwPN3W1MS4uT4zOmdaXD8yQGNRVyMUEE9BTff19Ly0s0s2NNjNtpSGhjosOpF5ZUo1PjUfJSYjM2E/TEAyP0k8RDMkKv38/KSSi4R6ekQ2PVNNT1A2ISobIf79/cK9vTYtL2tbWxgPFkw2QYNvXTQtPOjg3VVCSDYjGyUhMTAsNuTg3yIhMHBjYMjAwO3q6ezo5+rm5aOWmUUqMSMgMEInLjcnMzIiJVQ6RU49Q5SPkTkrM5eOj8DAwP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGAALAAAAAAQABAAAAeFgGCCg2AALF8PIE2EjABcMw48XVkjjINBOF8oW183O5aCFTJFBCoiGBCgYBFfNl8hAV6qUk8CRxtMJVOqCkIITktfJlGqH0RWNBYSqoIvFCcTUMxgSAsMBwUAzBlGHT4tHtM6HEoNMUDTVFgwKS7TJFdaBkM50z1VNT8X02AJGkkDVjALBAA7';
  
  imagenes["unit12"]='R0lGODlhEAAQAOZkAP38/fr3+O7m6piJlaaVsP37/PXw8qWVsu7s7Pbx86ubpe/q7X51hvn4+cTD0qqZoXxsfp2Lm6qUnpiLmKSVn1FNYHxrfN7Q16iUpf79/ZeRl3FgfWBAS5qIksO1vOrl6MOxvZN/izo1PUI2SV48R8q2wMSyvNzP1s/Ey8nAwtbI0IeMk5+Pp49+jINuioN0gp2Zpenh5bOdpn5zg5COoJmJloBrilI3Qv38/JWCkINud9PIzcq6wbats/fy9XxwfLurs5OCmfDp7FVTXvf09XdleYeDk4qAmV5CSbWlroh2gu3m6oJthnpnfcK2u6aUrse4wMu5xZ2NkqWToGZaavv6+ry9yY58mIRuhsCttt7T2nhofOXa4f7+/pSJlot/h0gxP8S1vX5pdpSFlP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGQALAAAAAAQABAAAAeJgGSCg4SFhoJZPIeHEjoAGQWLgkQyUk4BIUk+izsaXjlkCjQvBodCY1cgMVhHVhSGFw9hNkxbBCwONThkAFxRGEMVIy5PUy0bBxFkJUpUTRYQRR4oRlBkA0FaZAIJVQBdgx8ME2QnKpJkDTMwC+iDPytA7oJfIh3zZD1gYvgpJBxL5iFAcsPEoEAAOw';
  
  imagenes["unit13"]='R0lGODlhEAAQAOZqAIeFi4iKm2RojT0/SPv8/IF/gG5tdYB/gnp8kXp/kGlBEYaFi19fblpfaeHh4m5tfWY7Bujp68jIyMrKy5KRlqagmI18ZVY2EHVzfv79/Zh1TP38/JpzQOfd1Ww+BaysrIWHh6uqraiqsVtjX/Hx8ff4+Jyep5eOq7W1td3Z1Mm/s354enFwclVXb29EE+7p45OTiHZnUMHBw66pqG9uclUpAG9xhWVod2Zlc/v8/VVWZXF0jT84LXFxfnN2imk+DYCAk6+vtd7e4fLw7tTJvKuQb4JdMn9/fu/s6WtSM9LS0Y+PlXRZO8nBxWNlb7q7xXBWOj0/TFxaYpaHd9TSz4OFkYyRnpCQneno6FVZW7GZe/z8+VJVZ5CPk6KmroWJmv///ot2YHl5fcq3oPv7/Ly5vnFLH3N3e2dmdWhrf////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGoALAAAAAAQABAAAAeOgGqCg2obTSdbhIqCGWUgWSszZIuDH1VAA1EtS08RQopYIzoIOFwMNg89GIo5MEk8TmgCO1cLBoodHB4xPjdpASJHXYQvGjUWagkNX14ULEqDREZmKgRqVmcmAFIFg2MuFxWDQWIHNCgkakNaP1BUhBIhMhODRQpTJYpgixBhDpSLmCABuCgFwYMIEyoKBAA7';
  
  imagenes["unit14"]='R0lGODlhEAAQANU/AOrz5FuGPoKtZGqYSlN8OYyyc/H06vT58qjEk1qEPYWvaPj49E1zNYKla4coK+Tv3v7//pEqLlB0OHCYVXqnXPn8+ExuNFF3N5G9c3GiUJaNWdjUwb6miX2rXlaAOqlSTbJVTm1SMsXatcfcuIClZvLs5tnozqZdU4ivbaPAj5q9gevv4nu0X71vZmyRUnViOZnAflJ5OMrivJm+f8BKTpoxM7KNertMTFqAQZa7fGZFLbLOnn5JM6RuX1qNQP///yH5BAEAAD8ALAAAAAAQABAAAAaBwJ9wSCwaj8aNrXf6tBbIH8jhiNRuq2grQo3QSlEOTxd6aQxRmY9B8LEAUcDAcgkIHtEDhXFJUEZRFQIXMR4dM3hHggwSCQMYOSIAEEUVCgQXBAkZGDAoBSmJPxAqjDgJFx4DCgUoAkQ7FxY4CCkkExMFCIBDJiQuDWgQBweUUVFBADs';
  
  imagenes["unit15"]='R0lGODlhEAAQAPcAAP///////P///v//9v/+/P///f/++YVsPP/++u3cnu3dne3cnf//+v//9+/gqPPovPDirqyYV+7eo45lJOrdlO7founele7hou7fpI9xO56NVdPIeKWRVe3dn8GjUe/gpmtPHYNdKtPKeKJ6N8e9c7SZXvDirayLTm9MGIJmMd3ajV5FFZJrMYBjOcGkVE43EHNOG4pyQ0A1DJ99O5uETntcJ+7fpZBoJeTYhYBgMpVtOO3doPXryJZ6PtjQgMaycLKaVcS0Z9LCmKyFPMWwaH9gM8+/csq0YIJZJcixYb+xa6eRYfPovsaoU4hkKuHap7ebXbWdWNTSjaGBQvPowMevXYZdKWVGF4hsQqqTWO/ux8mzjYpwO+ffwJ53NqJ+PPLot7aVR+zdlrmmXurbkdzSrZJoLqGFWM/Fderaj2JIFfDlrT0wC9rQdYx0RNbOpmVIGopxPrygUsmzaObjotHFfKeTV/TqxfTpwphwMca/eJR8Se7ipXdTHeDYg31XHn1UJOjcj6+TUe/iqV5TLJmCTu7jpfHktFBEFPHkserin8i+cuXek6uFOohuP+3gm5Z9RMasWcGuXI9mJqB+ScOzdevhoufkosu3l+LWf56LUo55RaR9NZxzNDowC4NlL4tyPvHlte/gp5lyMPDjr2ZIGtrPdaWPUqmRU5J/Spl7OpN7QnZOHaWBRoRsN8u0ZLyfVPXtzK2JRe3fnsvBioJmP6mNVox1P8i0adTDbvHlsW9NF52FVY98S5d+Q8K8fsewY+ffmpyFS6iCPIphItrNdtXTf596Qo5mJtLGe5duNPPpvvbw0KqEPufcjrGRUczFg5h+XJF7Q3BKGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAj/AA0gIFCAgQABAAYkrAQmIYAXoPacmiXKVKMECxIckfPqEYA3tJYUAfGJRhY7hYxR8NEgAIAYB/Q8ODRoF6wAzf7MALJBWTJmWrqU2UIpj5cvTlYIYlHCpScZV3xBCmLDQxMyktrkGtEAQK9N0oKRciBmQiQFEsZEcCZLV60W0O7gIYIEgEtcrKY9OwFFIMGDBwHwCWGLiaJlAJ4IwRSNECI1NVxxmdIngyWXZ3LASaFJmJJiOFCh+VAlEAAAbEppWBUFQwVOmRakuRFm2AUAB1LdImHCgYshHRTsELHID7AAbuJwCJUIQhJkk4iNUtVDxZw1WBzRofKAEQwLpzuhFzBjxIqOX7ykxOJRBxCD0wAMtTr241JAADs';
  
  imagenes["unit16"]='R0lGODlhEAAQAPeyAM7a2gAAAI2VlTw/P8PPzyswMCktMwMCAT5CQkxnboSYoJGYmGBmZjs+PsrY2EdhbUpjakVibFVaWc7a2czY2JGXl1NYWJqxuFFVVI6Wlklrhm1ycXN6eSg8TXV8fK+6uxEVFll2jzVVbh0eHlx4kld4k5ukpD1JTEJYak1pdiYpKUZleI2TkSkrKxsjJ2B+j7vGxrXAv7jEx1Rud77O0a27vaawr01QUcfT01F1iE5ueZ2kpFNYU19nZW58gLW/wI6YmWNpaX6FhZOip4ugo7fDwLXHy7zMzDY5OU1nb4KHhsrS0YiQkUJmikNhZ7C4un+TlztFSsTPzzVNWbrHzcvY12N4fFVkZ7m+v2d4hhonLG+Ch5ers2Vqaj9DQxklLVhdXX2EhElhaV15hzFRaUpqc2tydFR4iFxhXaavrqSsrktsgnuFh5CmsJyqrL3IyJqjo2J9hGRqalZnc5qmp7C7vEZjakNib3B3d6+/wVtgYFleXkVldSEjI3CLmExjbGhubkRYYYmNiTVFS5CYmFRlap+ts4KJiQEBA3WBjBEYIzw/Ps3Z2U5VVxIXHis7QqW5vkprdB8sL0NfaLPDxbG8vElpfK24t7/Ly3mVpoifpkhfZzJIWLjDw4eXoM7a2LO9vSctNMDMzJigoGdtbktuekNHR7/FxXCDjLHBvi0wMKuwr87Z2YqcnsvY2ExTV4agrGFnZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALIALAAAAAAQABAAQAj+AGUJHEhQlicaA0FEsDRGCoA0DABIBMJmwRtZH2rMePSFkwYSJZpckGFoYAInRAAwwjFCiKwuBa5soWPBhKwlWJ6YwcADTY8Tinw0SiQwQAAXKVYoAKBEEBUoNnboEagjUhlKACiIGsCkCgA/L2JskLUp0BCJAgYMJKSqhQc8YQoSPBIlC4AfAk+tImUAUQBHHciImBMKhRGBhQZpmZJjTSY1qUK0AcCiiMADks7wQfVpwp46ADAt4hCLgKxJpe5okngoCAAHALjAuiRAVhI7cVyxAiDACwIkr8Q8gFSBwB8IeSSCUtFJoIQ+N0aZAtPKihuJcBoQhAFIToZKAQEAOw';
  
  imagenes["unit17"]='R0lGODlhEAAQANUwAPPy8+PBrMWHXOPJt/jfy8uWdP76+reAYE4/RWA/NBQGDm9RTOzq6/zy6atXJ+/Xx9O3qQAAAJlmZsxmM/vu5pmZZmYzM00wLf339vjm1N/a2syZZjMzM/v7+2ZmZszMzH5oY5kzM8yZma2qsP///rGoqfr7/P/9+/39/vPUvuewhPHKrO3AnPjq3NWpjpmZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAQABAAAAaXQJhwSCwahQbD8dhoZQgto6FFJRBYqhRFulKtCKeCi9U4DsYpUiGwwphdgQdMMGBRGqnoMABJPVoCLi4qGxspQgAAgl0TDg5rGW4wDAsLCRMHKgcOdSkAQwwIFyEiBCsrBQMCFhwjQxULAgEVCQUqLBIKFh4oiC8uBwoKHAIHCREXJUYvERIgEBofLy8mRqEIGktFHZ9LQQA7';
  
  imagenes["unit18"]='R0lGODlhEAAQAOZgAD8/PxMTEzY2NiQkJDMzMx0dHS0tLRQUFBcXF3JyciEhISwsLDs7O2xsbFdXVxwcHGdnZxUVFSkpKRISEkdHRyYmJkFBQYSEhGBgYH5+fmFhYVZWVoqKimNjYx4eHhgYGCAgIDk5OTAwMCoqKhYWFm9vb5GRkXh4eHl5eZaWljU1NYmJibS0tJqammtra2hoaCgoKA8PD62trXR0dKWlpYCAgCMjIzc3Nzg4OEVFRUJCQn9/f46OjltbW5+fnzIyMmpqaoiIiIyMjKKiolFRUWVlZRoaGouLi4WFhZSUlJOTk2RkZENDQw0NDS8vLzo6OkRERCUlJUhISH19fVxcXHd3d1paWo+PjysrKz4+PnV1dVVVVU5OTh8fHz09PaampgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGAALAAAAAAQABAAQAfHgGCCg4SFggQbHChQKStUVls2TQo5D4MJJQk8JhcXIRYUAAMBByIdEgEICwIGByQPFYaCXFdJQEIlAlEwHoMLGlkzWjsQEAYVIkYRB14tGTIJDhYjAA4TBgAgE4UHHlgEA7KyBqA/CBEBhg0mRzQuHBA6A04ggyNDJ1M+QUo1RE8bmERAAAZHjwwJbgBogEIDhgcxCghQheRElRcdMFyQIkDCBwZFJIBR0YDFFwoMlihwECJAgQoMBn2YUKAACQUEwHURx5NQIAA7';
  
  imagenes["unit19"]='R0lGODlhEAAQAPewAPT19v///52dnW5tbSgoKDM4PTk9Pjs8Pp6cnePj43F8hJGFfjlDS7u7uebm5ebm5hkaG7u6uZGaoZCbokJDQ7O/yVJQUNvc3Pf4+ZmZm5iYmUhLT9zc23J3eXBsand2d2BsdfHx8Ts6OdDQz+rs7k9WW05RVurd0evu70RJTmFVU4SEg1JUVllgZjg+Qz4/QtvPwS8uL5+nsyYpLu7t7N3e3lFSU+zu77i5uGVlZ9rZ2O3v8fv7/FBTWNTU0/Hw7jVARoiFgu/w8Xx7epKcphMQD7i4t/Xx7bOztFVaYTQ2O2pvc6KipJidp6yrqENMV5CQj5ahqeHj5dXV1UM2LtHR0llZWDxJUr3H09PU1G5tbvn6+5ydnXaEjDU1NTI4PSIiIllYWDs9QHB8gvX19Z6rtfn6+vLy8r++vpCRkE5PUkpLUUNFSkdHSFFUWGhxd66tq2t0ezlCR4qKiYiIiouLi1VXXu7p5YiTmmJnbr/Av1lcXbG3u2hmZa+yua+5wnl5eZiYlqmmpNjW1oeHhjg7QYqKiiopKTI1N7nEyqq1vCImKztFTJKQkFlcYCQmJvb4+DA4Q399e8vGwVxaWIuXnkpMUWBiacbHxqKhoZ6dnV9hY4iQlh0dH2BpcWBlajQ+RURBQBcaH8zMzMHBxQ4RFB0dHr29vF9fYqampxISFPz8/J6QgywrLF9eXXF0eP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALAALAAAAAAQABAAAAjoAGHBUuQmhRwglSAJXLiQU6kBmB5IajTGDEOBfFRB0ZNhEJcGXhLBEgJgoZ0VZxxMWQMI1Z4onlwUUoACViRXqU5RIAXLT5IZFnT8oMRohwlNAThYYSKQjZMLaWqg6dMFiY05OCIooZMDgpEQZESEgQMKAwNBhFoZuNSpzqhACEq8KSIK1gQCGywtaYLIR4Ash/DAugICgKNPMrD8kSAmk4YPMZ6s2iLwCAxWWohUYDGiiqEDX25chEUjyKYeQwS0AbOIxGiBk0Ll6aDmUQEerwXeUVHmlak4uReeoNLihZTgCxd4SMAwIAA7';
  
  imagenes["unit20"]='R0lGODlhEgASAPfUAC5jKDBlLfr8/j+FO06iSUSQQDFnLkSRQDl5NjFoLi9lKUKNPkOOP0iaQy5hKylWJihUJi5iK0OPP0maQ02iSEqfRUGIPTp6Ni1eKkeLXS9iLD14VEeJVVawUStdJUWSPkSQPkF/UEF9VkB/V3KfoD6EOtvm81GiTNzm8vv8/ixdKTx9OkCEPi9kLEeAcUqRRkGOOEGNOzJpL0GKOTVwLUiYQ1GoTEONPj6DOWiIjj6DOj2COWC3W0V0ckd9aD2AObnK3EV7e1SwTtnk7Z+1xE6BdGa4YkaIVEJ3YS1ZOHehqjl3NUCJOyxYM0J8Wtjj7EmcRWGsXcHV36C71fn7/TdqTkCHPDl7MEORPC9gMi1fJitbJ8jX6EqEctjk5rzN4EGCTypXKPD0+DBnLTyBMjNkPDBpJvf6/TZnUDNtK0KKPSVOHyVOHi1eKS5lK+Lr9E6DhUCKOT1/OD6BQi9mLC9jKkqeRC9lKzdzMzBnLkB9UDBmKy9cOp67z1OrTjVvMl61WarAyUeLVVixU0KOOjZzM9Lf6UWVPEKLPTd1LkGKPdXk7D6GNbrM2kqdRUNzZzVxMuvx+H6rqEaUQU19dy1fKjVoQz1sXWG5XE2NcJi4xS1bKDp4PEiaRO3z+CtZKDJqLDRuLS9jLEWFUyxfKT1+OTBnKCtdJHSeoECJPJ27x87c58bW6idTHzt9N2K0XUKBV0N2fdrm70aYQWm6ZGy+Zzd4LipaIDFpJ1WHe5Wyxa/Gyzd0NC5gKz53VqXB1cXV3TFmLlisU3uhqpCyw0qNY1+dikueRlavUeLp7jd1NC1gKFaZfjBlLjh4LUOJSTVwMbTI2USEU0CHO////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANQALAAAAAASABIAAAj/AKkJHEhw4JkpQZhlKsiQGisSYAbM0NNwIBVdTsjEgDECSEVqYoZxYsQAS4ZoH7lQWhHnwIdnuz6uQuKMSYEahzYkq2jIx5VUEqBQIJQrUkEUwBo9SjStwDEhduYEIviG2CU+TULhWDBhEDIQWYgM/NJjU6s1dX4ommQDEwE1oHIMjLVsC4YHFywwqMAD0KwSd5JoEuiikgM5haDdaNChlp8Frj6xKaNKQJdeDhDo+LOjgRFajqzgCQPhFponcJpFMKBsSSdhrwggKsVLhgoPlrxIEWEmQDADkF5EOXFgAIIWpE5VGZKiDywae/IkoONmTIIAojS00YJKgMBFxljYHkqjAIB5AApM4Soii6CnX5KKCeJwZJS0EL6UmBAYEAA7';
  
  //Gaul
  imagenes["unit21"]='R0lGODlhEAAQAOZ6APr6+vb29vv7/Hx/Z8nJyfT09Pz8/PLy8urq6urr63x8fPX19L/Bvnp9bIWGd1RXSlJTTHl5bFVWSW1vaKWllfj59/Pz8zs8OvLy866uq62trfz8/enp6oKCeWlraYGEcbGwsd3d3czMzLe5tnBwcaSln7e3uM/RurCxoWRmV4SId9jY2M7O0Nrb2IeHh7q6u1lZWby8r5aXl9rdzsjIyCEhIGJkWvLy8cvLzENGQNLVyMDApmptZQsLCYGFcPj4+aGhoVhbUbi6ooyMjJeXhIuMiX5+f9HR0YCBf4OGc15eVN3e3d/f37S1scHDwH+CdXV1YqOlnWhrXJCQf7CxmsXGqLm6opGRkZiXmoCAb56gmPHy8NfX11tbUKWql/j4+KCgoNTU1O/v76enp36AfNbW156ei5OUkpubiWlqYpqej+Pj5KutrP39/Xd6aZKWg9nZ28/Pz6Kho7S0n9fX02FhYPHx8YyNdPv7+6anmv///wAAAAAAAAAAAAAAAAAAACH5BAEAAHoALAAAAAAQABAAAAejgHqCg4IGbRklhIQCFTpOLCB5M4qCAWsraVlCVBRRCZRiNGNGEURmcycoWi2EFgRDdVM7VVYdMU1bhAFxLl1KDR8OZHAbigciVzA5SU9oZwcAigVhYCQQbjJ0C5R6ACEaHileZRjcel9HWCpSDAIG5ggvSBJqP+bdXHI8PiP3eggmJgwIsuReARxFHkB5w8EcHiZALtwZwOaeHQIKavSwceNeIAA7';
  
  imagenes["unit22"]='R0lGODlhEAAQAOZuAN/f3/j4+KGhoZubm1JSUlFRUWlpaYwVAISEhJmZmdHQ0OTj4piYmP///owaAJeXl/Ly8vr29O3t7e/t7ZgsAMGwlbOzssLCwMDAwJaWlsaaQLmgadOrWc7O0r3AycWbRJ+fn+Hg4Lqqh/Dw8ZyIWJtcKfv39ebg062trbGztM7Fwqqpqcyzfurq6qFrUMmpbIsXAOHk6tza2UtLS8rQ1caPH9TV19PT04wXAGpqapNUNd/LosTExNrJwfHy9mFhYePl5svN0PPz852dnfv685JQLpAbAJMrBqiprqKiocqcQtvEk/7//8fO0PT29rZwEoWFhUhMVH1+fvTx6cnJyaers3FxcdHR0YqKiqdXLnFxclRUVMKiYdC+mbSfhrx/GsTHyvv48mNjY7JtSOfn55qampeBT7zDxpNUNtDU1W5ubpU8FZGRkfr6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAG4ALAAAAAAQABAAQAeSgG6Cg4SDbUIQZEEiNS8eUjNqQ4WUhAoCYlZlglcoRUY4a14aSkuVp4M3AlAggiM+TII8bAQGA4QBAGBVJU9mSECVTS5HYyZObidEqMxuCysWzRgZCAmoVAxbPw+DuR1dOzEXWAU5t4QtNhUbHyRRWkmVE2kpaA4UXywSUw2FZzoHYGRRQYMLhzCUQsjoEaGZm0AAOw';
  
  imagenes["unit23"]='R0lGODlhEAAQAPe6AP/+/ry8vP39/V9fX/T09Ka8zUZJUGNjY19fXsrY3iMsPPHx8TM8QSUrNQQFCtbX1v7//MfS2kNDQzA+SOLi4p2qs5KSlEdGRmuKm8/U2t/l532KjzhHS8jHxzJBR4GBgf///nRzdJCPj32er7e3uHl4d6ysrFJpfFdvfeHh4vz9/JOerXKUoFF0jo2jq2uHkcvLy6Cgn2l8hmd8j3SMlXOIkd/g39TT1e3x8ZeYmszR04WEhOjp5klMTf39+8PExW6DjIqktri0sIaGgZ2dnbG/wnGIj72/wIefrlhYV8C+vrrHyouLi46eor+/v2yIj7K/x32Unebm5WhoaGFqbtXf5M3Ly+/z9vv8+7y6uAoHBUVbbyMoKa2urURJUY6OjoKCgsC/v9bW1V5eXvX09Hx8fPDw8OPj42+Qrebl5r29vWyKnoCeunmbr7a6vXCPmf7+/n6JjHN2erXH01d4lN7e3fz8/HaUn2iHlevt8rCurWiFjDw8O+Ln5G+Oovv7+3Z4el5mbOnp6a26vpyprp2yv4yMjH+MmYmMirO+v2JiYuzs7GeLsY+Pj////crKypmYl7CwsG+FjldmbePp63KRqZSUlIaeuUlaYoKctsrNzra+x2iDjfr6+b/N17nDxZqip6Kos0xMTPn5+fj4+HGQmvz9/TU1Ne7u7nOMlPf396urq3x8ds7OzqKion5+fXSOnG2Gk+bt8LfGzfv9/amsrunq7cLJzgAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALoALAAAAAAQABAAAAj/AHUJHCjQRy4sm67k+kOwoS4cgVbkStNJlyobP9zkKMFqCCIqCkABCiWwVRcLBhzgarClBZ1DXmbIAqArUZEomCacQHOJDaMEtjJAoLlhkgcUbSoVuNEnk6dcWXgIxIWLAaw1UHLpEZJn0AMrO+zo0sJhBIYKjkCASZHLDIIYhgjo4vLCDxIyucQwycX3SK0wqHRxYoFnFt9IX3LRyhVhTp0Auu6UekMpl4AFA0ioyFUoiBRIo2g8cWEKQK4ABxQlkSMpVhUlBFLtWZILDqlTJnSJ6BGHkKYyMGoY0cD3jARBAl/xCdFhygcgMm7xDTBgoBNRF1wRWfWpiQ6+j8YICRi4yFIjNRQCAgA7';
  
  imagenes["unit24"]='R0lGODlhEAAQAOZZAP//AKuiffr5/v/+ANzXAL+9Ffn5AOvp9Oro8bu4CPr4ALu4Adva5pyUUc3MB8jEuN3dfMrKAqKYPsjAS6CcNMO9gbW0Tujn8Pf2+J+cWPPz+7SwkLW0F9DPzurqAPz7+f39/+fn7tbU5Oro38XCveDgv9fWncPBAK6qVbGxarm3PZ2WgtbQP+fn8Pj4AL+8E7+8rdnXAOjn78W9ApiVVb+5ct7d5fHv9aWjPL69A/f3/rmxB/Lx6ezp5bq2cN3fANnVC8XCDq6lINPTCeTh3/v7/720JMTEF8nCvp6aHvn4+uDfAH1zZvr6952bctjW1ezsAMfGqv7+/7y8VpWGQvr5//38/MzLuq+lPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFkALAAAAAAQABAAQAd5gFmCg4QBNYSIWVcnKSCJiURCCgAGQRMVI4RFGxFJIo+JGBIxLzMuGS2gVj1RDg1GK6BZTzkoArJKTlA/MLKIHyYlCEg7EL4MWAMAAEtHUw+JN1QsQx4ETFKyGioFFzxNsjoWCR2+WVU+CyTmNhwAOCG+MjRAFAeygQA7';
  
  imagenes["unit25"]='R0lGODlhEAAQAPe6AP/+/ry8vP39/V9fX/T09Ka8zUZJUGNjY19fXsrY3iMsPPHx8TM8QSUrNQQFCtbX1v7//MfS2kNDQzA+SOLi4p2qs5KSlEdGRmuKm8/U2t/l532KjzhHS8jHxzJBR4GBgf///nRzdJCPj32er7e3uHl4d6ysrFJpfFdvfeHh4vz9/JOerXKUoFF0jo2jq2uHkcvLy6Cgn2l8hmd8j3SMlXOIkd/g39TT1e3x8ZeYmszR04WEhOjp5klMTf39+8PExW6DjIqktri0sIaGgZ2dnbG/wnGIj72/wIefrlhYV8C+vrrHyouLi46eor+/v2yIj7K/x32Unebm5WhoaGFqbtXf5M3Ly+/z9vv8+7y6uAoHBUVbbyMoKa2urURJUY6OjoKCgsC/v9bW1V5eXvX09Hx8fPDw8OPj42+Qrebl5r29vWyKnoCeunmbr7a6vXCPmf7+/n6JjHN2erXH01d4lN7e3fz8/HaUn2iHlevt8rCurWiFjDw8O+Ln5G+Oovv7+3Z4el5mbOnp6a26vpyprp2yv4yMjH+MmYmMirO+v2JiYuzs7GeLsY+Pj////crKypmYl7CwsG+FjldmbePp63KRqZSUlIaeuUlaYoKctsrNzra+x2iDjfr6+b/N17nDxZqip6Kos0xMTPn5+fj4+HGQmvz9/TU1Ne7u7nOMlPf396urq3x8ds7OzqKion5+fXSOnG2Gk+bt8LfGzfv9/amsrunq7cLJzgAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALoALAAAAAAQABAAAAj/AHUJHCjQRy4sm67k+kOwoS4cgVbkStNJlyobP9zkKMFqCCIqCkABCiWwVRcLBhzgarClBZ1DXmbIAqArUZEomCacQHOJDaMEtjJAoLlhkgcUbSoVuNEnk6dcWXgIxIWLAaw1UHLpEZJn0AMrO+zo0sJhBIYKjkCASZHLDIIYhgjo4vLCDxIyucQwycX3SK0wqHRxYoFnFt9IX3LRyhVhTp0Auu6UekMpl4AFA0ioyFUoiBRIo2g8cWEKQK4ABxQlkSMpVhUlBFLtWZILDqlTJnSJ6BGHkKYyMGoY0cD3jARBAl/xCdFhygcgMm7xDTBgoBNRF1wRWfWpiQ6+j8YICRi4yFIjNRQCAgA7';
  
  imagenes["unit26"]='R0lGODlhEAAQAPe6AP/+/ry8vP39/V9fX/T09Ka8zUZJUGNjY19fXsrY3iMsPPHx8TM8QSUrNQQFCtbX1v7//MfS2kNDQzA+SOLi4p2qs5KSlEdGRmuKm8/U2t/l532KjzhHS8jHxzJBR4GBgf///nRzdJCPj32er7e3uHl4d6ysrFJpfFdvfeHh4vz9/JOerXKUoFF0jo2jq2uHkcvLy6Cgn2l8hmd8j3SMlXOIkd/g39TT1e3x8ZeYmszR04WEhOjp5klMTf39+8PExW6DjIqktri0sIaGgZ2dnbG/wnGIj72/wIefrlhYV8C+vrrHyouLi46eor+/v2yIj7K/x32Unebm5WhoaGFqbtXf5M3Ly+/z9vv8+7y6uAoHBUVbbyMoKa2urURJUY6OjoKCgsC/v9bW1V5eXvX09Hx8fPDw8OPj42+Qrebl5r29vWyKnoCeunmbr7a6vXCPmf7+/n6JjHN2erXH01d4lN7e3fz8/HaUn2iHlevt8rCurWiFjDw8O+Ln5G+Oovv7+3Z4el5mbOnp6a26vpyprp2yv4yMjH+MmYmMirO+v2JiYuzs7GeLsY+Pj////crKypmYl7CwsG+FjldmbePp63KRqZSUlIaeuUlaYoKctsrNzra+x2iDjfr6+b/N17nDxZqip6Kos0xMTPn5+fj4+HGQmvz9/TU1Ne7u7nOMlPf396urq3x8ds7OzqKion5+fXSOnG2Gk+bt8LfGzfv9/amsrunq7cLJzgAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALoALAAAAAAQABAAAAj/AHUJHCjQRy4sm67k+kOwoS4cgVbkStNJlyobP9zkKMFqCCIqCkABCiWwVRcLBhzgarClBZ1DXmbIAqArUZEomCacQHOJDaMEtjJAoLlhkgcUbSoVuNEnk6dcWXgIxIWLAaw1UHLpEZJn0AMrO+zo0sJhBIYKjkCASZHLDIIYhgjo4vLCDxIyucQwycX3SK0wqHRxYoFnFt9IX3LRyhVhTp0Auu6UekMpl4AFA0ioyFUoiBRIo2g8cWEKQK4ABxQlkSMpVhUlBFLtWZILDqlTJnSJ6BGHkKYyMGoY0cD3jARBAl/xCdFhygcgMm7xDTBgoBNRF1wRWfWpiQ6+j8YICRi4yFIjNRQCAgA7';
  
  imagenes["unit27"]='R0lGODlhEAAQANUwAPPy8+PBrMWHXOPJt/jfy8uWdP76+reAYE4/RWA/NBQGDm9RTOzq6/zy6atXJ+/Xx9O3qQAAAJlmZsxmM/vu5pmZZmYzM00wLf339vjm1N/a2syZZjMzM/v7+2ZmZszMzH5oY5kzM8yZma2qsP///rGoqfr7/P/9+/39/vPUvuewhPHKrO3AnPjq3NWpjpmZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAQABAAAAaXQJhwSCwahQbD8dhoZQgto6FFJRBYqhRFulKtCKeCi9U4DsYpUiGwwphdgQdMMGBRGqnoMABJPVoCLi4qGxspQgAAgl0TDg5rGW4wDAsLCRMHKgcOdSkAQwwIFyEiBCsrBQMCFhwjQxULAgEVCQUqLBIKFh4oiC8uBwoKHAIHCREXJUYvERIgEBofLy8mRqEIGktFHZ9LQQA7';
  
  imagenes["unit28"]='R0lGODlhEAAQAPfHAIl6YGxjSpGKbevWsqGVeLq0o6GRdtrIp9DEo62Wd5uDY7OacdHEosa3mYZ5XoV7XLKac5uOdbesl3pwXJ6Yf4JoSbmljbaigbCgg8q1kZOCabSggMa4l+/hwLqihKOSbqeUbqSUeLijh5eGabSfhc26nLeph5WHaNLDo4FwWoZpSZiPbFpPOsi9pIRyWbqoip6GZLusiLGlir2ujbuvkZyNb52ObN3GpMWxi8Gke+LOrOXYvNW9laGPbIh4XXt0VWpcR7WjfNO7lJ+RddfEoZCAYZOGZbqqh6uUbrGigZ2Pesq6lK6igGdeRa6PZcKsiqWHX8aofsavjop/Y97LqaqZeKubf7Cdedm7lYBsUqaYgX9oSbOihNzWxZOLdLemjJ2LctG9m6eXf8Gzj5KEbm1hSZGFb6OUfqiVePHiwHxvWObVsrerlYt7YcS3mX1yWquVd5GDZ5yKZJyHa6KFXZZ5V7eulpSHa9LBoIN0XNjFodHCnlZHMr6xlt7Sr5V6WKefgJmJaZV/X4+FaL2tia2acdK+l+DTsp6Rc4x/ZKOYd72oiMCujHx1ZcOwk5OFaKeTdp+Oda+cf3dsS5yDX7ymgKKQdYh6YJKLbtnJp7ajeqyghsetgZmEat/Rrm1hRpmOd7+wkbqee6eNaLypkJqQb9rQtp6PbZ6Mb62khsG0kZeKaMCxl9XGpbmojK6chL2mh9PAm62adpqDYWVeTqeVe8izkNvLo9/UtXJgSJ+XdqSScXRpUJ+KZtXGosy9ntrSvZuNcH5uWK6nisa5osKph7ugegAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMcALAAAAAAQABAAQAj5AI8JFFhMhagSFgYOhPSnSBJPikr1yCXoRS0NBsC8Elhn1AE9fnyFmkEk0w0RZwTKsYHoUpk4BIJZ6pRlAq0CCo0tyKCDWBdgLRJEUjgripA1YxgMcYOCiiRYi6Sw+QAiiIlHS26dCFQJVQofI+BIEJhq1Yofk4xMyUNGyyaFA51AyfGkT4MLrOAeg4HkSIdWv3aYwhPG0RyFdHrxuEKIhgwEaQZgIeFKYAVKhg7h2oMjli0MVjZw8SAGAidZMap80vWAzxYFQIS1QUNql6ZCqt7UYOQgEYcvLlioASWQyalBAZrwugMgQggzShrpPUZhGCABmLzYURgQADs';
  
  imagenes["unit29"]='R0lGODlhEAAQAPfCAP7+/v+OAP39/fHx8f+PADqNItV2CLS9x5BfK8G1pO18ANd2BHp2b7J6NqZlFrEAF91zAOp9Af/Xoty1io2FfjMzM/2IAYiFfy0jFzokDb6BOG40HrSjj+7GmZ1fGLiiey9zHP///4YoLYBOFN93AJyEZtF0C5NQAJxqL/+KAJF/auCUO//ToPeCAJd/ZIh0Wp0AHK2rqv2HAJ+kqLFaALuceGxLIMFwE5sMI9avhaIAHLfDzlRUVNZuAP/Tnvr6+nxbCZiDaON4AaJ7Xi2XI7+bdJaboJ2dnbSXdZ99Wd64j6F6S5KTln9hQfuFAJyHbZiCZsCQWaWlpYl/cJmFao57YnIwHmFTKaGVh/fy63sDHJyHa6d0OKaPc46TmOjo6K+xtHYuHqpcAqdjGzo7PMjIyNV3CmZmZvz8/IRtU0JfFN+3iv/bpcipf6NzPP/YpKBaB//Uoih7HL2hfMXM0oeHiJRmMf+KAzefJZF7XzKWIurq6oOJj11dXct1FNrb2rAAHLqyp9GcYP3Qo5qFanJjUcC/vcF6KK+vr/3Wp9Swh29hTea/kx1FEriegP/nrzdnFSFsGKKTf6lbAbB6Oo2NjZpaE2VjYv7NnJyCZcvLy/Dw8DmPI2NLE/z7+fvPm7rH1YOCgf+IAPiCAIluT8BlANzCkmVIH6F8UjBzHIJDBMjIybq6utnZ2pOPisida2NVQ4wmN4GGjD+CJZV2T87OzcCGRPf29s1tAqdZA957CmxeRntMF62KYoBqUOnq6KuGWuaBDf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMIALAAAAAAQABAAAAj3AIUJ7HNGgMCDCA+WqXBECphVXwAkPFiJRwhNRuh4YTIgoUQ0ZBDVkgVqx4wLrAwK3BOKwiU+BwK94rIFQx2EsOCQKPUEiyUnBl4s6niQV4QUKxi18dUjWI0pPxCisiBKQyEoS0bpQhIkwS+JwsQEWOCmRJVDAfw4UvQpB4c/wk44SJNoDZUbQqIIsjWIhY8ihjLs+vBoQq9cI7rgMqEkDiYJLrTgEDHEFDAaKCjJaGGnwxs2eWDoAPQgFoJJpMwQuEPL1ZxMMTbYOGUljCoPSRRAaCDJU6tNwiLJwaOHCJBOV8Y0YZAFYapGIApwUgNpFiEVtxIGBAA7';
  
  imagenes["unit30"]='R0lGODlhEAAQAPexAIYbAH8eAMQwBXscANPM2HYYAIdHTsUsAKQlAK0lAH4YAJIkAIseAKglAKUmAO9NHu5OH/Hz+IceAJohA5sjAHomFKojAKQ2ImwXAngkEaaKnaE1IpdseZEmCMgtALwrAL8oANY7D87S5q4mAPpiPIQdALsrAMXN4684IYQqGnQbAMopAHwcAJZMSIkYAIMgAJQyIrYqALIoAKxTS31ZbtY4CI4gAL64zdNEIO5pU28wKZMdAJMiAODf5+zr8qkpBKs4IqAkANjd6uXh56aVqrFPRI5FSK1OTIZFRaIvDN9BEotibXsVAK6FkupIGIggALG1zt06CIldaLYsA5iQpdxOLeFaP5wwD/tqT/b3+uPl74tUWasiAI4hAH8YAIEaAKCRqXUYAIIhB5MnDKguEIkfALstA7gnAH0YALomAMssALgqAWIVAH4dANMxAaE+L9EzA768zZhLQvr7/WkqI/hcM/NaNv7+/rezyaMhALu81dra594+D6tIQcQpAOLm8+zv9+rv+MEsAOlVM602Hak3Ip8oAnE7PIMbAHQYAMQzC4UgAKMlAMYuAMYsALgkAJZcXddOL8bO5YMdAPz8/urv95UoD8UtALYnAHsZAPhWJ3cYAKomANk6C88xAtk6Cu3v94siAnxfa7SlspU6LZ6Wq9hCHuZhSrgpAJNZX2gTAG4zMsCktp4oCpuPp3dIU34aAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALEALAAAAAAQABAAAAjoAGMJHEhQoCQaR/oULBgBzJs1IOQsHHhiywg/K1oImUgJD6lHjtQU2TPxDhVLaTy4MTNqYiwirc4c6BSFTJyCWoaUGoOpEZ8HcCBlGfjH1So6YhII+qTJiQVRcwRCOVRAVSIEHzxBqBOCi44eAl+hYdGmjIlLSkgMEhAEgxQfsYwM6BKDB6cadrCYQmWDTZgllQwEeMHIwRQcp6woavBExaYMBDR0QCSBwY9IOaoIkEEhQKYKBEBxmABgUolQV5IYWrBoABMkgGIFYkUozw4AXhTA+gLARYobBEU0mYECSKELG2Ck0iMwIAA7';
  
  //nature
  imagenes["unit31"]='R0lGODlhEAAQAPeWAN7EwEQ7NxoWE8+poqaIgtq+ukUyLCcgHWpaVmJRS6GDfp2CfTEoJWpaVSMeGTIpJ3JaViEcGUo/O62EfEo+OnhjXZ99dXJcVquHfmhPSYxxakU6N4RpZde4s45xaquRi6qGfkk5NSQfHYFqZpBza4FsZ1VHRaSGfzs1Mj4xLZN4c7uUjaKBenBhX2dYVl9PS2RUU6J8dUc4NHleVEQ5N0QxKjkzMbSRimpOSC4lIY90bMael6iEfllFP6J+eHxiXXliXIdtZbqTi31mYYZqZYJpZG5YVIpsYsujm4htaEE3M7mOiFhGQiggHdq8t2pUSks+OxsZFLqdml9JQz0uKD4wLLeXks2wqzcvLdGxqz8vKtGwqn5jYNi4tDwwK5JxandlYUY7ON2/u5J7dWJQTHxhW9OxqntoZNOyrB4aFqqCec2qphEQD3lnYg0NC7KOhnJbVZF0b2BLRYhoYJ58dT4xLGJQS9Cuqkw6Nd/EwIVnX6SEfT82M0k4M5p6ckAwKzgrJ0M4NkQ2M9vAvSIdGCIdGS8lIFlPTsiclEYzLJ+Detq4szgrJsunoVBAO4tvZmZRTMyvqn9oYk9BPHBcVl9KRP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJYALAAAAAAQABAAAAjYAC0JHEiwoMGDCAt2QQLAkpk8CTssUUMiCgQfDQUWGPiFwwRERGSkYTJAYMY5WthgYfFGRSFBDwY21JPITQQ5PSDxcNHiRQBLGWsIIBTIiB1GB8jEOXHHUhZLMQQ0MeSoDY0QVRh8KLDDUiRLP5TkcFCHAhgvBhJMOiTQiiUTZ/zAESHBwx9AFQauIGAJxgggQ1BsoJOiT5KBGPhCwZPhwpgAIMJQsjDwkQ5LfKjgmCJJ0RoEW9AMPBJkQYkylWxwubLI0iAxBJ/MaKBhj5BGUhQUuTHAicCAADs=';
  imagenes["unit32"]='R0lGODlhEAAQAOZcAHxYPDgoG003JcSNaEw5J3NXQlc8KMKlkVpCLXJWQHtdRF1CKnxYO040HkgxHGtLMDcnGUMtHJt8YrKdjLaZhIpnS7OWgaqWhKiJcFVCMamAYoFsW516XbSDYZhwUc6+spNoRda9rsOjjEEvING5qFA6KeLKucutlevUxcufgqWBZXVSNqOEbp2Hdj40KjsoGWxLMVI/L5V5ZH1NKpRsT8GkkMGkj9CbeIRjSjwrG+HQw3JRO7SbicS6rrKZhoFdQ+nd1GlQP7ididDDt7CNdH1fSa+WgmxKM5V1W5dxU4puWbOHaJ+Hc7iTeZNfO5x2WVY6IqyGa35cQ1o/LZt9ZrFuQtnEtXJaRLqWfZd6YtCqj1U+Kv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFwALAAAAAAQABAAAAeHgFyCg4SFhoeIJCcpiIMXFSBVAzeNTDslMDNOHYgfPzQZDlANR1wyRUiEWFwtMS4QLxELBlwmGoVBChwPASM5W1NSWUaDPVRcIgxJKwIEgjgqgwWCVgA8HgiEShiCLIJAElxPCYUUNhODOhZDXE1XhQdChFo+glEbjYJEg0v5XDWDUPgL0SgQADs=';
  imagenes["unit33"]='R0lGODlhEAAQAPeLAIiEbU5NOl1ZQ3d0YEVFMWplSsG8nVZSO1pQPFFNNU5IM5GNcEJDLlFNOE5LM4qEaaqmjaShj6Wijb27pIiEa5SUfHRxW42KcpeUfGxqUTAvHGhlUoyIbnx4X356XZyZgsbDrbW0m4+MdImIa2djTHZEM7SxnXQ+LIeFc358YK2slX17ZV9fSlRQNEVCLbSul7q5oVBALnNxWGRfTEA7IlomFailk4V5YXdzXL+9pZeHbra0oLGumI+OgGs5J21kTamokKiljXx3X3x3Wc3GsV1aRGhnTF5YP7++q2tmSVxZQkNBLFlSPZFyXnZzWX51XWdlT2JZRUM/KFxXRGtpVnFIOYSAZaakjJ+cg15aSKimkFtZSYdQPtPTw6qmh7+/sGtqWFZRQImGdWdiQ2tiTH1xXEU0IIeDa4uIdFJPN4J/Z7y3oo+Lc767plVRPY1WP21lUFtXPsXCrn97YpBfTol+ZrCsk01ILbOyp4yFbmNfRq2qk4+LdKelkDs1I4yDaWdhS3RvUZWTd356X4J/ZpGPccXCrI+LcsfFsXc5I3l1XP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIsALAAAAAAQABAAAAi7ABcJHEiwoMGDCAf2UCCARJ41CZksMUKAxQIvBsQUDNDARQZFI/7cqPPkx8AuYBhoUJKiSYkaVQoioeHnwIwBhXS8SeTjBBc6AhPoOQQhiI0dFcjEMBNmC5FFKKYIerGHRxtEERBEgVOmj0AqGx5csYPFhBw+gAxmOWIFAAYRWkCwkWEwwJ0hAC6oAWKIgpODUsZ4EGJBRY45OA5yaBFoEBQJE86gQeggSYEiH2AQ+oIQT5o4blaE6HAwIAA7';
  imagenes["unit34"]='R0lGODlhEAAQAOZsAB0dLUxVhC4rQB4bLJeMoigfPy0rQT1HfVJcizY7aiw1Y1FflXJ6o5qny0ZVji83aEhXh3N4oDs0VTcxS0JenTs2UYSWyjoxTY+cyT06Z1FHX0dRg2lnh1dPXHBmeHhkfzw6XF9pmPW8twwJEGI/VlZkl0REcoqYuk5UfYeSuYSXx1Fxsj04YWhrk6Gu1H14lWJnkYyPqn5zkllmlXR0k2hXa2BOdT9Ng1BelERQhFBbi6abskFNfjE5ajglPW56rEglL0hajVdPb5ObvYudy001QWRhhllwq3mHw01FX9OxtSolPZaGpnWCrlJXfHuLvY6Qt0lJckVPfzA+dTQxSmJtn550hmp7q0c2UD4xVTpAaVBYgUMqP5CdxUlOf3JbaT5Ke////bF1hp9seVdrpS4uTDE/dkpNdUZcmTs8YXV2mEVZkf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGwALAAAAAAQABAAAAeNgD9VbISFhoZdOGABh42ESApmJo6HUlNrK1GUhTQ3FEdeLJuECw45CVmjbBsPPRlYqmRoBxc+bAabQ0E8FVxlQmwClBEFEl9WHxMdJGmNOzZMIjVjYkBUWmeHUAMvYUoaRSMQIQhOhkY6ADIeSUsgM08lMIYxahwEhC1bJ0RXFiiqGrhoooKBqkIYUgQCADs=';
  imagenes["unit35"]='R0lGODlhEAAQANUsAPn289LKxvTYvq6im19FOFJIRpqSjEs4LGhURHRZQXtoV6iJZox4bLqegpl9ZTYuKoFjRcOnkeS8lZR2XzglF4VqVKeNdIZyXpyHdhULCH5ya9C2m3FdTY1xQ5BrR5FvVaF+X4BeSLOTd7KRbKqVgti+p45ubIZ+iZN7bWBOQru0rl5YVf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAAAQABAAAAalQJZwSCwaj0hWoHBKsjQUQwXVPGoMjw5lG0KuLofMApI4BI4pByaDAC0Sm3OREAIdHh/QgyNgAeQsKSEeZR8IGQcSAAAaQwgVEBAjCyIKDBECABwBAwAHBAkTFg0SDSIlABEUGRkqBxcKIg0bERgkJQYHWx8mKQoXFhENKwUWDhkFDxULgRUKKBYgHAgHBQUcFw5CHAkIDBwEB94DRgkEyRQECklBADs=';
  imagenes["unit36"]='R0lGODlhEAAQAPcAAAAAAP///yUkGdDOwt/d19LQy1FNRQkHBPHt59za13ZlTrm0rTQkEEo/Mf/q0LSlky4fD4VyXJyGbk85IpmCanBgT+7QssC0qLesoeDWzOrn5HBUO1RBL2dQO31lTpN3XWBQQZ2Da7mdgt++oMirkKqTfdDBszorHmFKNn9kTrGNcJx9Y9ewkI91YJF4Y4NtWsmoi56Ebp2Dbo13ZevOtZaEdUIuHkg0JGFHM29WQlxIONqrhnxjUHhhT2tXR2pWRsymiYlvXIpxXpF4Za6Re6qRfridibOZhmpbUO/Pt+rPuv7jzvHXw+LLuoV5cPjj09C/sufb0tPPzFtCMYJhSjosIl5IOLWKbVpGOFxJPFlHO3ReTtOskaWLeZ6FdN+8pH5rXo2Ad/Tm3P/y6f3w5zUaCcaRb3hbSHVaSVtGObuQdo1xYL6ahKyPfKuQf5yFdrqhkaeQgtO3pYl5b9LAtZJgQrB5WaR1Wat+ZIZrW6WGdFBCOr+gj6aLfJiAcpR+ccKmluLDsuDCsOfJuLSfk9S+svrn3P/28XZHL2dJOolrXNezoOfPwppkSs+6sUwyKEg8Of///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJEALAAAAAAQABAAAAjDACMJHEiwoMFIBCJJOViwTwoNUxgO1INGhxYsBSQmwXPmhI8hGA4+WbKjzo0eK7oAWlDQgQUWZhCVmfEHjBc6CQgCGXHFTiMqFebsAWAiCkE2X7jcUeMCCaFCccIwIchnEQwVIoQ4MiTm0JhBSgbKCeSBiCAjjJpkQBCADJQaAknQkLHhAw44b7akcTLAwAGBFCIoYGAjTwkJaxI9giRg4AsQDSBYcdPCT6QiirIQDPKjCocJIY5cYNiGRwcUOWI8kBgQADs=';
  imagenes["unit37"]='R0lGODlhEAAQAPepAAoCEo9sXwcAE9DFqQcAEQAADw0HFhgKFQUAEZhiPAcAD142KT4lH0MtJi0WGjUkJIlWNS4eIG9IMlEvLap1SWM9LmlBLEMqJxYIFd/cyyQTHSQQGKRySiMSGYBcNR4bJ4tbOko3Li4XInpTPIhfSJ1zUF88K1s5K1w4LXVSOGA7LW9VPOXDmYFkXFo2L4SBesuXYs+ZYl07MYxgQKZqQLZ9TWRDMGBGNq13S2lGNbqUdIlUNWxHNKp8U1UzK1AwL/3Yq00yNUtEPUM1PaWBYmo+LPHSqayEX21kasO0oDcrPsONWmlCLjc7QNipfWhFMZhyT9+zgNWZc6h+aVI5ModfQPDVsllGQO+0iS8WHkEsJF03K6dxRrWLeHFGMmpBLo9aNjgZH2xUVKt0SDsjHmA8LBgOIyAQHJhzUeLgy72RX45fPzQYG4B+gUlGR0RNTHFDLZ1xS/zcqu/ewnJPRVI0KqCCaLqBUzwrL1c5K3VOOEc4OnBIN1c2K/Lt2WE9MZRtTLSIXYldQV82JzchIWU9LYpiQIhYOKyPek0xJy8YIYteTKFvSEkrJ+HUvYNvXzYfJqh1Usavo/3XrFs6LG1AKwkBE35ZQJliO9WaYCwbHcWLbWpDMGZHNcWkf/fdsQ4FFR4OFzEZIZ9sRFs1K6FoQ3NHMffUqlUzJv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKkALAAAAAAQABAAAAjcAFMJHEiwIMEMSQhaQWRQIBEGQtL4YSGFyhuDA2aQUTBETIApV5oUdKTD1IYCBM5ACoLnA0FPJFxsIXQhBx8ZE0QpejGw1JcKXspwEvQnjAgNdB4NxLSGA6kFhUY08pHlx6ZJnwQmYLQEThEVeur0QbEIC5A5SFJRGIMDDAQmPExIiOREzilJSlLByMSFxg4LlGwYuhPFSJcWZlKpiTHqUKVBDjqkqAHiiJ09AgP1qHICFRsMCLR4WFEwDiAolxKFAiDATcMnedCU6HTAkoGGqRpoihDixgNQbXAHBAA7';
  imagenes["unit38"]='R0lGODlhEAAQAPefAI+cXquFYXd0IsnIrllcFF1hGV9iGGxwIVpbFFteKlFRGVheJlxUGZWMMK6rW3ZpGYh7dHZ+OE1IDnNuGpKMMVhQEY1pTDk6CpSJLIOAKpp4VoeAJZOWSayIVot6XaSXMnhwGayOVm5xJEZECltJJ0JfNkNDD0pMGXBoFdCnbUdDEVdUDm98OGRoOmZvNWFjOX2XY4BqNDY4CsaZdXp8K6OyidCebHR4J7KGUWhNNvK4l3eGP9/JlmJ0NN/Pc5qTNqyfO4FdQkpMCzw6BpmbTlRMFIhwQnqJSbu3bIqVTIZjPkRKDaKYNn6AM3d3REFDB2J9QkRMMlZbFHd1IbWKdFJaFUZCCJaaTy80CqCSMVBRFNSxbF5TFlpWDL2yWpCXTlhRDWVlKoCMSUdDDUdJH4h8HoJzO6yqX35oTFd0PbGdUNvQinGOXn1fQ7uJWpulcpCQPF1xQJaQMpKURzo6E5OIKKKkV4JbP5mUPFpdPD09Bz0+DndvIyk0A3NyHoh+IZSIKTg0DNPFd66rWEFFCYaGhsy3ce28iaezk1xXDs+8XB4eCpWcV4x6cmKBTk1MCoN9IoxwPK6kTDdADKuwb7yPYXOIS15fMlBWEHqHP8mpaD89D7eLUtvYuopsSP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJ8ALAAAAAAQABAAAAjSAD8JHEiwoMGDCD85aREnDaOBAzoNRGRnQaFFCUpAqfHpzZkXa5A4uBJByx46LhyxgZFkkA9Fgoh8EXOkxw5LAABQUsPJjacAaEQ0mcOBRSYzMUh0sJHjEwSBCAoIiKTkThALbWZ8aiTQAw8pBjJQwFGJio5DGlKE0GRki6EbmKrQgIMHw4YGgP7UySLJyyc5ByZN+QDkBxM/JhRcIgiJD4MKEspMIHAhj0EQD7gUUbEp0JgwB7uAGUFoCRYZJxCiSCTk0ZM+URKuGKLHCpmEAgMCADs=';
  imagenes["unit39"]='R0lGODlhEAAQANUsANnUzWIhBVM9Jta7gc7CpvfuqhgVE9CSZ6Z9StCKOJeXlfv21XNqVo5wTOR8J3hIH72smLGXdFZVTebNrLVuQHhya7GOVPv7+Yx0Zf+tT8KYT6Q0Bc6le/37572+womGfO7o5L5qHqdLDKRfJsXBlL6+teGYSJlLHZVnPLWwa4RdQPnIj////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAAAQABAAAAazQJZQ6FEMj0iAxPABII+TAgcREKwmTxYJYaGEEohNCPIkcCQPEacTCVGwRwhFEJgMPBdCwYSEqB4PCwQGFRUdBRAgQw0BAQkFFo1MFhkHcBgBDxopDSMmfwEhoRQsmCeIAAAFERkbG40bIJkHHRcgJRgRByIOCSoBLA8Ba7ZLDAYIIxQmTigCDwIfJQYKEgIMKgwcQifQAgbX3wbgAk4szwYSEoUVCgAe5kKZARIfCh5ZQkEAOw==';
  imagenes["unit40"]='R0lGODlhEAAQAPfAAM/OvaqqnBkYFRkYFj46NB8eGpKQhkVDPMHCuVVUTIWDdouLfvn57j47Nbm5qlxYUHd2bYSCd8rIuPf27dPTw9TTzLi5qYiGe6qnmKKimIF/d2pnXnhzaWhmXLizonNxZe7u7n19ebW1qJ6bjkVCPdnWy7m3qO7u4/b27mFgW8fFtY6Ng7Kvo5GPfuHi0bCtoLCtmru6t05MQ97d3fLy6E5MRcLCsUlIQOXj02lqZO/v4dTRwcvJt9nXw6GfkL+7q3lxZu7t219dVWpoXltaUL+9q76/trSwmp2bkYiFdI6OgaysoFFQSLm4tNzcy5aWkdvcyqimmHt5benq2fj35tfXxt7e0PTz4CwqJ3BxbMPCtpGOg316cHp5d3d0aXt6cUdFQPPz5RcXFCMiIR0bGVxbUX59dL26sSMiILi3tnV1bPHx3svJuaSimXBxZ6Gej9TRvYqKf0VCPrq3q9TTvMjFtbe2qmZjWoiIgOPi0YuLgUNCPcTFt/Lx64B+fG5rYYyKe+jp2aOgk7+/sJWWj1VTTlJRTK6qnqempMPEteHi0tzdzrW1sygmJsfHv1JPSY+PgPDv26GelpWUiNLSwlZUTZiYji8uLNLUx4B/dISEd6OilZyai8vKu83LurGvnsfIuUZFOwQEBIKDeaqrm9vay05NTCcoJfj49p2dj6CcjqCenO7t7H99dT48OLm3tWtsZJmYivj4+FpYTrm5rH1+fPr68uLiz0JAO/Lx5BcXFaaklGlmXi4rKb24qOvr2v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMAALAAAAAAQABAAAAj4ADEZ6QOsoMGDBgkhmMBgzQ4JQdiwKFEKhcFafGjYutLjUxQfgjzhyGVQTRUogcJEmhOLU4siPPJUKBjHiQtFJ3RMuWAAkIo6VGgVXGLDCihKi361ejBpywg6twrmSGVnkwMLFDoRkFFpTxI4joCdWqEEUgBSibTU2BCKzKwjJoCJMWQm0wIkg/QU+MCrkCYYL4BdEgAGwhcNIlKMGSAqC55dP4DJwYLGFSw3GboA87NqxisuvoAlwNVAV5lRltIYZAQihgdgRJgIucGhzZmDIRCxQvXkUYc7f1QhBGaql6QmsoZ4ifAGwPBGJA4VlKIAg/PhB4AYDAgAOw==';
  //7x7 lines
  imagenes["lines"]='R0lGODlhAgIcAeZXAKiEFPj27f79/Pv58/z69qqHGtvMnamGF+vjycixau3mz/Ls2/38+djJl+HVr/Tv4fn38LCRLLOUMqyLIOTauNXEjtK/hfDp1cKqW66OJvbz57WXOLicQcWuZL+lUt7Qps67fMu2c+jewLygSbKSL6+PKdG+gsq0cMGoWPPu3vf06raZO/Hr2LqfRreaPrmdQ8mzbcCmVauJHdTCi+zlzMOrXuPYtcewZ62MI+bbu9nKmsStYdPBiLSVNc+8f825eb2iTOrhxuLXstzNoL6jT+fdvt3Po+7o0ungw/Xx5My4duDUrNfHlNbGkd/SqdjIlrOVNPDq1sCnVqaCELugSLWXOaSAC////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFcALAAAAAACAhwBAAf/gFeCg4SFhoeIiYqLjI2Oj5CRkpOUlZYClpmam5ydnp+goaKjpKWmp6iCDlYmA6mvsLGys7S1tre4mgocEU8oBQ2YucPExcbHyMnKkQ81B8GCNC8ZTsvW19jZ2tvcVxBKACCuhTkSPUXd6err7O3uhwxMAB0aih8ZIwrv+/z9/v+lHOA70ohBgwM1UgBcyLChQ4AINkjIEWmACQAwAjzcyLGjx2ELYsgwUCkADACtPqpcybKlJZMALBDQlMJZAwYuc+rcuZLADAAJNHZSMCLDB55Ikyp9Z2SCBxaiREikuLSq1avFREjYgMTUkhIvaGAdS7YsqQtFj6ISoKMAigVm/+PKnetIw40DFXDCImABaD26gAObtQggBIRaAU6EOyy4seOdAgwUwKAQ14MdAJrofcy580MKETggMHYEyIQhnlOr3rcrggNlSDaQsLG6tm1szZ4JW+YggovRt4MLvwXhR7hx2CLL8HBhuPPnpgzO+8vN57wk0LNr1yQwX7tvAJQw3k6+fKKIEijwS9IBwIyZ5uOXDzkS4AUPI3fL3x8cpsyGCLjgGn8ErmZdUBzZQMIGQRTooGMfOAXVR0NMQERzD2ZollZctcRAE/M8oOGIVV0ABA5q5QQBCAeEIBSJMLZkFwB5JaVBAgDwAF+MPG5EmGFWLfCLDvr1aCQ/kU1WGf9W0pSwxJFQvgOaaHKVs4EIUWbJTWuvAXaPd1qGmcxlAEAjWDwAJCTmmrkUd1xnA/iA0Yts1pmKdB1gp5oKOKZk55+kdKfPbQtg8MxmgCaqCXrqOadAC0YpKikl9JGkXRE9TDTppowkFtOO2zmRQViclkoIARUARWd5AjTgFlymbhohcw4O0FcC1MVqJ4dYaugpCOPpGqaJKPJIpmbCZjljjUaWdlqyRv4Y7JGxkdAotCNKRhmbvVGJrYNTAlencjFM+G18CrxQQpeJWndDrudCR6aZk4L3w7Tx3uamOLqyhxeo+aqGp57J3jeBpQGnJmi+AUYgRMKcIbBCehBfoeD/Cg1WTJeQBSCssQEWYqgxWZ7+N/IgqIZ4slUpJ6DCyoa46SLMSM0qMs2FzKgjzi3xyrMiLMRQAJE/d0RsikWfx4GTSTd0I42INp0IBVv1KvU+thaG79WJGIEDmFyvoy2sYTuCppplbwPab2lLEuecbVuT7rpxU8InSsjVPcy8ReoNSaGH+k0cCG8Kbsmj1BguS6vXKb4Jpuc4jopALQwq+SaiVn65KBJbu7knrU5G9ueZcOwx6ZzYeoDLqFNSMsCtc+KpD3nHrkjLL9suCplMRK07ITb/XkppOBghPCEi9HDl8afERvHvFxAxAdLMm+JACd6i/jSz1afCVgHlfp71/8zdy0IADwC8K/nY5dsSQAgA3Cv42uK2b8sD7VUA+9WP0m0/MdE7WNnwV6a+/Q8XQViBw6S2osUcUBlCiADGfsa4DojogdYA2YVoRjnLYdAaKbPgyDp3rQ9mQ2ar+pbpTKgOne0vVu/7FAvZEbSOGXBTDEgV62boDgTwgl2litAGecgPqnVoU8nrgdWI2A+vAYEgiQog9ZjYDzTt4IJs2p7vqOiPt50ghUfiS2HAyEWA8OkAFqhdj9hXRo8UChg3zBAFSLCC+rXRI4irBowQB8Q7rqQckcsQAenlR5fcQ3MEaiCwCokUgxwAA6MjTwWxyEikEGaH2+lgJa8CE9plJ/9AntvkWGoCgN4N542nEyVWiFK828Qwjaqci1Se55kc+iWWgflK9iAUMlw25nvhE0wSl+hLwZwvffAqi8GmWMzGxFB+Zbkb95rpGQJOcyli/CI1bxNA1FRFMm/Z5nASOJukzLGO4oROBNmWEz6mczsgo9VKBhnHdwYHVQfIk0cGQLhF2tM8bhLPQyb5T/7M6D0Mud4LPFjQ/QQtP/5oWAkbWqCG9XEdqKQojBR0RHW8Uo0azVCFntgNW+IqpEb6EACuqI0P4GCIKD1SA7W5jFkSM6ZHehosj7FMnLKJY4S8hTRf6NMoSSNxt8gmGYsaJkCigxbgjCRT/3RIhp7inHb/nGqiHAlJVBAlAxfVqqQumTtRsKeAYhUWTPzkCX7Gb2tpLVVNArcJxrE0ruf6KjMjoVCr4hVbs6SKJCT6V419hVSPSAEGOlbYk30vnIuAAPx22tiTHfOk8EiV+iqLs/cdwJ+DcCkQbsZZnBEQWVGAggRuWlqeHYEKBXjAEKYApNY2TTJSEMSyiGpbiHHIjgbzZm9HtgAPTC8RQZDIRId7LpP8ixFLyAAimYstky7VEK1CCCWpa6rukNYRbyMfdzfVmuVGYnu8Ha+W8GdDTgRXvXZyK78+kVxawjdL2truJ/p6Xyj99hTZxYB++/sgFngAqakI73UJXJ4A4OiaqXga/0IZvB/r3sLAAqSwebxLjPqaV8PB2YV9icFfEAvnAYtNZTFCty0Tr0a+ID3GjxbsYrnklxsSTm+Nx6IVdqYDwyre8VhMBNZ3kFDIZXEw1PpRYiQvxcL/YPGSnLwTgYzWIYShKZVbEqDVduRuE96yR1DMWJUAWcwcgbFLjoxmhty4yqHxa5vZUQ4OyLkl32vxnNmBliJbJcs03jMylAzhpdxtZ4LGBpTNEpIMJ1oZ0X1KYNj86GKgh7Vz6ZZYKm2ZFHsmz1PmNCzUrJqsaVnUqJCMPm9zaB2jWhNTurNqKvVqUfQ5rMIB5YdrPQlCb/E5EeTApnlNiRwe4NSsaktXif8dCZd6QKrxMXWgmX3pETn4AIhm9iHIHGQH0VrbhODnATxpJMJqO3T00FKwh/3qWK8pScvm9K3/lLWMPPrayErUtbMtZp+0CK52ElJ9xDwraEvKhxGgDZKrDa1gZ5XBKB74t+Bt8PGuCI2uLhVfDmDv+1Ywmfm6tsm4626YrZC58/4ZwhVe2msHlWc2CM3Dxbrx2l4tSZCNa8HjtvGOT5XhenPuyGOK4gkYz3GorKc4v4Hxz62coh+PXcx3Kc6S684AMsh5M9GS8OptHEG+vJFu2if0jPNQjDa3X9IruXMT0oAXD7tjRDo6w6nP/IOKPW4Zsa71D0pWhnc83+qmrbv/qFfydQcEzXRFufbucX3XlXz7Ao+ngfa83Jdz9HHr0A7wYvK94oaLUN/tKXiwS27ud7dnyWKctkbvVaOKbW/d/j50pko+7mXLbrr/mvnU0ww0I/guXkEWA9CP7FERgHxc/W16mFUercxd/co4D9/YE61iERIwg9M1+XzFZgO+JzkJNJ+s4uq9xsQ3fqJob3b1HojwYcouJqn80U3FPPiCtr7So1ReTnMf11HyfJcnaFSDTmGycaBVaxVSfFmSfQP2agdSVjHyX+BGCDHEVhpifq8Hbs0wNPu3HZJ1AGFWgYjwfwUif/AHbgUYfsNxPfhHgpFQIc9WHv0Hg5OAO9lR/3lwZIMvAT8YaBsIyHo8CAkdOICcATLaN4RD0QIDohoUqISfUA4G+BjFFSlQOAoyaC6AEYKFdoWegINzEQ+D54WoEII/iBUcRoavUIQf6BK7EEpqGAv9A4A5oYPdFoeoIIUs2BGqM194aAtNIWk68WZ/iAstA3Ic8YSFOAxmKIQAUYV0uIj3swM7+BBc+GuSOAxE4T8LsWiZuAxWsofckIafmA2BqIXtIGJPVYrbYGyYtQ52yIrrEILkxg3i5oeyqA6XUYnZQIi5mIojwIk1JQHC9ov+UARbkTHIAInGuBCnaAzO1YXN+A6uiIix4InTuBBMV4uzIBDylI0bgT9jJ46HHOBl4PgRmxiJn8Bed3iODoGMDGIKpOaOLeFswscJknFX9JgTxrZZnaAVdraPSbGNjugIzCiQSyGORtgpD4aJCKkTR1AUTxIJxuZzD3kV8KiMjOCN6neRNYMD31iC5YhpHnkVH3IA/kgIHdiOJXkVxfFZyHGLBdmSWKGQSbJ7NOkYEVkFAZmTnjGT9hMIADs=';
  //blue block around alliance members on map
  imagenes["blueblock"]='R0lGODlhRwAnAJECAOXp/iZF/v///wAAACH5BAEAAAIALAAAAABHACcAAAK0lI+puxEMo5w0BQBe3bwLJwCG6JWmhTXgyVbkgr3tjKybRreXTGV4ztHwNilgcHj6GRkXo29pEUKL0A+1elDSkNinTotNXEu7cMVGkZpdmXRz7eGK5XC3AlyPizSOcf7khfZXsicYQjcIg2fQl+iyWOMIUQQJg7jm5dEo+TGjBufneTmTafQWVqkz4jQKVEZquBbLscd50IqAkVr3KkEyKwl8u2t7qFh8dvqLHHRIzHz3XFIAADs=';
  imagenes["blackblock"]='R0lGODlhRwAnAJECANvO0ZQmPf///wAAACH5BAEAAAIALAAAAABHACcAAAK0lI+puxEMo5w0BQBe3bwLJwCG6JWmhTXgyVbkgr3tjKybRreXTGV4ztHwNilgcHj6GRkXo29pEUKL0A+1elDSkNinTotNXEu7cMVGkZpdmXRz7eGK5XC3AlyPizSOcf7khfZXsicYQjcIg2fQl+iyWOMIUQQJg7jm5dEo+TGjBufneTmTafQWVqkz4jQKVEZquBbLscd50IqAkVr3KkEyKwl8u2t7qFh8dvqLHHRIzHz3XFIAADs=';
  imagenes["att_all"]='R0lGODlhEAAQAOZ/APT09Lq6ut7e3uKdOP39/bCwsOPj46WlpY+Pj7W1tfv7+8zMzKuGUfb29s/Pz+G6gb29vbmrlpOTk5SUlKmpqZ2dne/v76enp/7+/qiDTuzs7Orj19ra2ubm5s3Nzbi4uNLBqLGxsaGhodTBp9/f37KyspSBZLixp6x4Lefn57OISvDw8KOjo/j4+KaZhqWKYqRvJLe3t3R0dLN/NpiYmMSXU6x2Jf/QiLutl7V5JMTCv/+8WZaWltrSx+3t7c2LKunm4tPT06V4NsOHMczO0deQKtm4h9+gRrOEP/P2+vv49J99Sr+cae3r6MWAHKurq9CXQ8nJyYWFhaKkpf/Je+XayuTo7eDe3eXn6qNzL4V0XNeiVGlRL8Sxle3s6+zZvPbbtaSgmvT086yqqYeIiYFTEuCjS+inSbCys5dvNdXV1drVz4KCgq2mnejo6Ovr68zMzdyPIM25nbqwo5GRke2uUff39vf39/Ly8reRWo2NjYCAgLm5udHR0aioqP///yH5BAEAAH8ALAAAAAAQABAAAAfHgA4hIgl/hoeGAhUUMVILBAt8iIYWFAQaNAJ7QQAeHIgrHw0dEwd/BnpRdx8ChyUAAiwBh24yagoBHngIFik8E5MObBwtCRA+GgWmk399BwINdG8QfhjMhgESJB0IEteHT8oGChXMQEZdcERJZFNYVmgnDz2GG0hZKmAjYToRXw8wZoBAhOPGmR9LGNgYQIWJGERjUAyRo4RLmSob0hTRAsDQnBxO2hiy48XQFSFxTDR5AWVHBmvMXAyowyCDmS0Rvq3Jc6RGIAA7';
  imagenes["def_i"]='R0lGODlhEAAQAOZ/ACIlkEFEoD5AnkJFoDY5miotlCYpkmBirzI0mCgrk7W9vSUokmlrtEhLo1JUqHd5u1FWqS00oDo9nFhaqywvlWJmtHBytjI1mGBjr3N4s1lcrDg6mSYqkL7DxkZfWn+ImWtvrmpstENGnIefiU1nYjU4mtzg8SEjjTs+nS0wllNbm7a3yV9kpX9re6ertVp3djE2n4GFumFin0BGlLm5y29XYVRXqUpMpCkskzM2mSMmkJCWpLjAwODj8nFzuDc6mufp8WxwsGJksEVHnnN1uSwulWJPcS4xlnh6ux4hkGldflJXoImPtFZYqomOn11SfI2VkT5RXGd+b5ebxjxBebi812ZagoWItG1nh1JHhXyVgbvA2LS4zUpOmzs+mzw/n19djzQrgC4zjUxPoUxPpTc6lV1of0RGoX59rzQ3kk5ZXJecqCYpj8fOznh9taWnzXV3uhwdhYCBtoSGtGltqK6w015gq25wtjg6m0lKolRYgEZJoiImj3J0uDk6mP///yH5BAEAAH8ALAAAAAAQABAAAAfCgHkwABQoA4eIDTYYIXIRAAA6eAGUlTdTXH0PG5AACAKgoTFtTERIRp0JBKurbgouFj5wWZ0ABbcFGQprdgcMd361nUE8OyINE0IMX7VLMywdTmUIDU0HIBVhkF4fUlpQXQs5ew4ac3VJBgsAHCMeUXqqZ2RjNH9DJwAqL2pifGxFfgTYI+PPnzdxAJghQQWSgRQlJKRZYfAPBGGQcBy5QKfinx5KMAIwAMajQRMtMGIBYrIimhqdrrQ0WcXKky0tAwEAOw==';
  imagenes["def_c"]='R0lGODlhEAAQAOZ/ACIlkEJFoEFEoCotlCUokiYpkmlrtGpstCMmkFlcrGBirzQ3kjQrgDM2kltdoyksk66w0yEjjWJksDg6m25voUlKoiotkn19hlxerS0wllBToTE2n42NlGZagjU4mqCgr3d3nDs+nX59rxwdhTI1mHt9qqqpsjk6mFxerG1nh2ldfra0u7/AwUxPoYuMrpWVkZmYnXFyoEpMpCgrkywvlR4hkEVHnjU4lllboVNVp7CusLCxsGltqGhqs2BjryQnkZiZtbm5y3N1uS4xlnJ0uDg6mVJVqXd4rU5QkWJPcVJHhW9XYV9dj6OgpVtbkKmoqbvA2Hd5u3h6u2Finzw/n29vly00oJeVndzg8ZCQp2dps5mar0ZJokxPpV1SfLi8125wtkBCn39re0FEmIWItFhaq7Oxt+Dj8ufp8XFzuHV3unZ3mLCuuKajrICBtoSGtGtvrnN1pYGBgKWnzVRXqWJmtFZYqpWWtHR1n7a3yTo9nEhLoykskjI0mHx8hP///yH5BAEAAH8ALAAAAAAQABAAAAe+gBUbADQhAYeIe3Q+B25WAAAIEwKUlTIJWkRRRZAAfWExbU0wIDkYB0JSSZ0zJSx4SBQrWSg9aWpKnWM7JQO+OE9xCgZgJ51rJnydAB8XZRIGVJ0vLssId3J2CnB1DJAcQMsEW35GCW8QNQUETmYWkD83OlVdLUF/NhEADWwOkARHrmjgMuXPnzkjlkEqkMGDngV5DP4xohDSgyEkeEj8c0ZFRQAFmGw0iEVMxRRoRkoUsaQTGZUjv3TwAkVlIAA7';
 
  
	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;		// Constante que devuelve el primer elemento por XPath
	var XPList	= XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Constante que devuelve una lista de elementos por XPath
	var XPIter	= XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		// Constante que deuvelve un iterador de elementos por XPath

	/**
	 * Funcion que no hace absolutamente nada. Usada cuando no hay mas remedio que usar alguna funcion
	 */
	function dummy(){}

	function basename(path) { return path.replace( /.*\//, "" ); }

	/**
	 * Funcion que convierte un numero en su version de 2 digitos. Anyade un 0 si solo tiene un digito
	 *
	 * Params:
	 *	n	Numero a convertir
	 * 
	 * Returns:
	 * 	El numero convertido con al menos dos digitos
	 */
	function LZ(n){	return (n > 9 ? n : '0' + n); }

	/**
	 * Crea un nuevo elemento de tipo DIV con un contenido prefijado
	 * 
	 * Params:
	 *	content	Contenido del nuevo elemento creado
	 * 
	 * Returns:
	 * 	Referencia al nuevo elemento
	 */
	function div(content){ return elem("div", content); }

	/**
	 * Wrapper para la funcion getElementById
	 *
	 * Params:
	 *	id	Texto del ID del elemento a buscar
	 * 
	 * Returns:
	 * 	Elemento del documento con el ID especificado
	 */
	function get(id){ return document.getElementById(id); }

	/**
	 * Multiplica cada elemento de un array por un valor
	 *
	 * Params:
	 *	a	Array con los elementos a procesar
	 *	n	Valor numero por el que multiplicar el array
	 *
	 * Returns:
	 *	Nuevo array con los valores calculados
	 */
	function arrayByN(a, n){ 
		var b = arrayClone(a); 
		for(var i in b){ b[i] *= n; } 
		return b; 
	} 

	/**
	 * Realiza una copia por valor de un array
	 * 
	 * Params:
	 *	a	Array a copiar
	 *
	 * Returns:
	 *	Referencia a un nuevo array con el mismo contenido que el original
	 */
	function arrayClone(a){ 
		var b = new Array(); 
		for(var i in a){ b[i] = a[i]; } 
		return b; 
	} 

	/**
	 * Suma el contenido de dos arrays. Si cualquiera de los dos tiene valor nulo, se devuelve una copia del otro
	 * 
	 * Params:
	 *	a	Primer array sumando
	 *	b	Segundo array sumando
	 *
	 * Returns:
	 *	Referencia a un nuevo array con la suma
	 */
	function arrayAdd(a, b){ 
		if(!a){ return arrayClone(b); } 
		if(!b){ return arrayClone(a); } 
		var c = new Array(); 
		for(var i = 0; i < Math.max(a.length,b.length); c[i] = a[i] + b[i++]); 
		return c; 
	}

	/**
	 * Comprueba si un valor esta presente en un array determinado
	 *
	 * Params:
	 *	array	Array a comprobar
	 *	value	Valor a buscar en el array
	 *
	 * Returns:
	 *	true si el valor esta en el array, false en caso contrario
	 */
	function arrayValueExist(array, value){
		for(var i = 0; i < array.length; i++) if (array[i] == value) return true;
		return false;
	}

	/**
	 * Elimina un elemento
	 *
	 * Param:
	 *	elem	El elemento a eliminar
	 */
	function removeElement(elem){ if (elem) elem.parentNode.removeChild(elem) }

	/**
	 * Convierte ciertas entidades HTML en su equivalente ASCII
	 *
	 * Params:
	 *	string: Cadena a convertir
	 *
	 * Returns:
	 *	Cadena convertida
	 */

	function decodeEntity(string){
		return string.replace(/&lt;/g,"<").
			replace(/&gt;/g,">").
			replace(/&apos;/g,"'").
			replace(/&quot;/g,"\"").
			replace(/&amp;/g, "&");
	}

	/**
	 * Mueve un elemento de lugar en un arbol DOM
	 *
	 * Params:
	 *	elem: Elemento a desplazar
	 *	dest: Nuevo padre del elemento
	 */
	function moveElement(elem, dest){
		removeElement(elem);
		dest.appendChild(elem);
	}


	/**
	 * Suma todos los valores de un array
	 * 
	 * Params:
	 *	a	Array a sumar
	 *
	 * Returns:
	 *	Valor con la suma de todos los elementos del array
	 */
	function arrayToInt(a){ 
		var h = 0; 
		for(var i in a){ h += a[i]; }
		return h; 
	}

	/**
	 * Inserta un nodo despues de otro
	 * 
	 * Params:
	 *	node		Nodo de referencia
	 *	referenceNode	Nodo a insertar
	 */
	function insertAfter(node, referenceNode) {
		node.parentNode.insertBefore(referenceNode, node.nextSibling);
	}

	/**
	 * Crea un elemento cualquiera con un contenido
	 * 
	 * Params:
	 *	tag	Etiqueta del nuevo elemento
	 *	content	Contenido del nuevo elemento en formato texto
	 *
	 * Returns:
	 *	Referencia al nuevo elemento creado
	 */
	function elem(tag, content){ 
		var ret = document.createElement(tag);	
		ret.innerHTML = content;	
		return ret;
	}

	/**
	 * Realiza una busqueda en el documento usando XPath
	 * 
	 * Params:
	 *	xpath	Expresion de busqueda
	 *	xpres	Tipo de busqueda
	 *
	 * Returns:
	 *	Referencia a un elemento resultado de XPath
	 */
	function find(xpath, xpres){
		var ret = document.evaluate(xpath, document, null, xpres, null);
		return	xpres == XPFirst ? ret.singleNodeValue : ret;
	}

	/**
	 * Crea o actualiza el valor de una cookie con una determinada duracion
	 * 
	 * Params:
	 *	name	Nombre de la cookie
	 *	value	Contenido de la cookie
	 *	days	Duracion de la validez de la cookie
	 */
	function createCookie(name, value, days){
		if (typeof GM_setValue == "undefined"){
			if (days){
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			}else var expires = "";
			document.cookie = name + "=" + value + expires + "; path=/";
		}else GM_setValue(name, value);
	}

	/**
	 * Recupera el valor de una cookie
	 * 
	 * Params:
	 *	name	Nombre de la cookie
	 *
	 * Returns:
	 *	Contenido de la cookie o null si no existe
	 */
	function readCookie(name){
		if (typeof GM_getValue == 'undefined'){
			var ca = document.cookie.split(';');
			var nameEQ = name + "=";
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length); // Elimina espacios
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		}else return GM_getValue(name, null);
	}

	/**
	 * Elimina una cookie
	 * 
	 * Params:
	 *	name	Nombre de la cookie
	 */
	function eraseCookie(name){ createCookie(name, "", -1); }

	/**
	 * Crea una ruta a una imagen basandose en el path del pack grafico
	 * 
	 * Params:
	 *	ref	Ruta relativa a la imagen
	 *
	 * Returns:
	 *	Ruta absoluta a la imagen
	 */
	function img(ref, lang_dependant){ return (!lang_dependant ? pack_grafico + "img/un/" + ref : pack_grafico + "img/" + idioma + '/' + ref); }

	/**
	 * Calcula el identificador de una casilla partiendo de sus coordenadas X e Y
	 *
	 * Params:
	 *	x	Coordenada X
	 *	y	Coordenada Y
	 *
	 * Returns:
	 *	ID de la casilla correspondiente a las coordenadas
	 */
	function xy2id(x, y){ return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400))); }
  
  function id2xy(id)  {
    var x=(id%801)-401;
		var y=400-(id-401-x)/801;
		//alert(id-401-x);
		//alert(x+'|'+y);
		return {x:x,y:y};
	}
				
	/**
	 * Calcula el numero de segundos de una hora expresada en formato xx:xx:xx
	 * 
	 * Params:
	 *	myElement	Texto con la hora a calcular
	 *
	 * Returns:
	 *	Numero de segundos que expresa la hora
	 */
	function calcular_segundos(myElement) {
		var p = myElement.split(":");
		return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);
	}

	/**
	 * Convierte una cantidad en segundos en su representacion en horas. 
	 * Funcion inversa de "calcular_segundos"
	 * 
	 * Params:
	 *	s	Numero de segundos
	 *
	 * Returns:
	 *	Texto con la representacion en horas o la cadena "0:00:0?" si es negativo
	 */
	function formatear_tiempo(s){
		if(s > -1){
			var horas = Math.floor(s/3600);
			var minutos = Math.floor(s/60) % 60;
			var segundos = s % 60;
			var t = horas + ":" + LZ(minutos) + ":" + LZ(segundos);
		}else var t = "0:00:0?";
		return t;
	}

	/**
	 * Funcion encargada de mostrar el texto de recursos restantes para una construccion
	 */
	function calculateBuildTime(){
		// Las celdas son los enlaces susceptibles de ser sustituidos por la nueva informacion
		var celdas = find("//span[@class='c']", XPList);
		// Las tablas son por cada uno de los edificios ampliables que se han detectado en la pagina
    for(var j=0; j<celdas.snapshotLength; j++)  {
      if(celdas.snapshotItem(j).previousSibling && celdas.snapshotItem(j).previousSibling.previousSibling)  {
        tablas=celdas.snapshotItem(j).previousSibling.previousSibling;
        if(tablas.tagName=='TABLE')  {
          var recursos = tablas.innerHTML.split(/<[^<>]+>/g).join("").split(" | ");
      		
      		recursos.pop();
      		recursos.pop(); //Get only resources. Not worried about time or pop increase
      		
      		var a = calculateResourceTime(recursos); //returns an array of resources
      		var b = celdas.snapshotItem(j);
      		
      		if(a != null) // && b
      		{
      			b.innerHTML = a;
      		}
      	}
      }
    }		
	}

	/**
	 * Recupera el identificador de la aldea activa
	 *
	 * Returns:
	 *	El ID de la aldea o 0 si es la unica aldea
	 */
	function getIdAldea(){
		var a = find("//span[@class='c2']/a", XPFirst);
		if (a){
			a.getAttribute("href").search(/\?newdid=(\d+)/);
			return RegExp.$1;
		}else return 0;
	}

	/**
	 * Calcula el desplazamiento en pixeles a partir del 23� enlace 
	 * lateral (aldeas o enlaces personalizados)
	 *
	 * Returns:
	 *	El desplazamiento en pixeles
	 */
	function longitudPantalla(){
		var enlaces = 0;

		// Se estima que caben 19 enlaces hasta que empiecen a ser demasiados y a ser tenidos en cuenta
		//var a = find("//div[preceding-sibling::div[@class='div4'] and @id='ba']//span[text()]", XPList).snapshotLength;
		var a = find("//div[@id='lright1']//span[text()]", XPList).snapshotLength;
		if (a > 0) a += 3;

		var b = obtenerValorCookie("marcadores").length;
		if (b > 0) a += b + 2;

		var c = find("//ul/li", XPList);
		if (c > 0) a += c + 2;

		a -= 23;
		if (a > 0) enlaces += a * pixelsPorLinea;

		// Se tiene en cuenta el numero de construcciones
		//var a = find("//div[@id='ba']//table[@class='f10' and @width='100%']//tr", XPList).snapshotLength - 2;
		var a = find("//div[@id='ltrm']//table[@class='f10']//tr", XPList).snapshotLength - 2; // and @width='100%'
		if (a) enlaces += pixelsPorLinea * (a > 0 ? a : 0);

		// Se tiene en cuenta el banner de publicidad
		var a = find("//iframe", XPFirst);
		if (a != null) enlaces += parseInt(a.height);

		return enlaces;
	}

	// MDL - get cost per CP/day for given building + level
	function calculateCostPerCP(buildingId, buildingLevel)
	{
		return buildingCostPerCP[buildingId][buildingLevel];
	}

	// MDL - format output for cost per CP/day
	function formatCostPerCP(cost)
	{
		if (cost == null)
		{
			cost = 'unknown';
		}
		return 'cost/CP: ' + cost;
	}

	function getNameOfActiveVillage()
	{
		var villageNode = find("//a[@class='active_vl']", XPFirst);
		var ret;
		if (villageNode == null)
		{
			ret = '';
		}
		else
		{
			ret = villageNode.innerHTML;
		}
		return ret;
	}
	
	/**
	 * Calcula los recursos restantes y el tiempo necesario para unas cantidades deseadas y devuelve
	 * una cadena de texto en HTML con esa informacion
	 *
	 * Params:
	 *	necesario:	Array con la cantidad deseada de cada tipo de recurso
	 *
	 * Returns:
	 *	Cadena de texto en HTML con la informacion sobre el tiempo y recursos que faltan
	 */
	function calculateResourceTime(necesario){
		var texto_restante = new Array();
		var tiempo_max = 0;
		var tiempo_index = -1; //store index of resource that will take the longest
		var a = null;
    var restante = new Array(4);
    var tiempo = new Array(4);
    // Calcula y crea una cadena con lo que falta de cada recurso
    // TMR - underline item that will take the longest
		for (i = 0; i < 4; i++){
			restante[i] = necesario[i] - actual[i];
			if (restante[i] > 0){
				tiempo[i] = Math.round(restante[i] / produccion[i]);
				if (tiempo[i] > tiempo_max) {tiempo_max = tiempo[i]; tiempo_index=i;}
				if (tiempo[i] < 0) {tiempo_max = 'Infinity';tiempo_index=i;}
				if (total[i] - actual[i] == 0) {tiempo_max = 'Infinity';tiempo_index=i;}
			}
		}
		for (i = 0; i < 4; i++) {
		  if(restante[i] > 0) {
		    resNeeded[i] = restante[i];
		    texto_restante.push('<span style="cursor:default;" title="' + T('RECURSO' + (i+1)) + ' in '+formatear_tiempo(tiempo[i])+'"><img src="data:image/gif;base64,' + imagenes["res"+i] + '" width="18" height="12" border="0">');
		    if(tiempo_index==i)
		      texto_restante.push('<span id="timeout' + i + '" style="text-decoration:underline;">' + restante[i] + '</span></span> | ');
		    else
		      texto_restante.push('<span id="timeout' + i + '">' + restante[i] + '</span></span> | ');
		  }
		  else
		  {
		  	resNeeded[i] = 0;
		  }
		}
		if (location.href.indexOf("build.php") != -1)
		{
			
			//All Narbsy playing around in here
			
			var buildingTitleAndLevel = get("lmid2").firstChild.innerHTML.split(/<[^<>]+>/g).join("").split(" level ");
			
			if (buildingTitleAndLevel == null)
			{
				return;
			}
			
			var buildingTitle = buildingTitleAndLevel[0];	
			
			var nextLevel = buildingTitleAndLevel[1]*1 + 1;
			
			resNeededForWhatBuilding = buildingTitle + " level " + nextLevel;

			var village = getNameOfActiveVillage();
			if (village != '')
			{
				resNeededForWhatBuilding += " in " + village;
				villageNeedingRes = village;
			}

			storeResNeeded();
		}
		
		// Calcula y crea una cadena con el tiempo que falta hasta conseguir los recursos
		if (tiempo_max == 'Infinity'){
			//# TMR
			a = T('FALTA') + ' ' + texto_restante.join('') + ' <img src="data:image/gif;base64,' + imagenes["clock"] + '" width="18" height="12" title="' + T('TIEMPO') + '"> ' + T('NUNCA');
		}else if (tiempo_max > 0){
			var tiempo2 = formatear_tiempo(tiempo_max + 5); // # TMR +5?...Introduce un margen de 5 segundos para compensar la desviancion de los temporizadores de javascript
			var fecha = new Date();
			fecha.setTime(fecha.getTime() + (tiempo_max * 1000));
      //# TMR
			a = T('FALTA') + ' ' + texto_restante.join('') + ' <img src="data:image/gif;base64,' + imagenes["clock"] + '" width="18" height="12" title="' + T('TIEMPO') + '"> <span id="timeout">' + tiempo2 + '</span><br/> ' + T('LISTO') + ' ' + calcularTextoTiempo(fecha);
		}
		return a;
	}
	
	function calculateResourceTime_br(necesario){
		var texto_restante = new Array();
		var tiempo_max = 0;
		var tiempo_index = -1; //store index of resource that will take the longest
		var a = null;
    var restante = new Array(4);
    var tiempo = new Array(4);
    // Calcula y crea una cadena con lo que falta de cada recurso
    // TMR - underline item that will take the longest
		for (i = 0; i < 4; i++){
			restante[i] = necesario[i] - actual[i];
			if (restante[i] > 0){
				tiempo[i] = Math.round(restante[i] / produccion[i]);
				if (tiempo[i] > tiempo_max) {tiempo_max = tiempo[i]; tiempo_index=i;}
				if (tiempo[i] < 0) {tiempo_max = 'Infinity';tiempo_index=i;}
				if (total[i] - actual[i] == 0) {tiempo_max = 'Infinity';tiempo_index=i;}
			}
		}
		for (i = 0; i < 4; i++) {
		  if(restante[i] > 0) {
		    texto_restante.push('<span style="padding-left:8px;cursor:default;" title="' + T('RECURSO' + (i+1)) + ' in '+formatear_tiempo(tiempo[i])+'"><img src="data:image/gif;base64,' + imagenes["res"+i] + '" width="18" height="12" border="0">');
		    if(tiempo_index==i)
		      texto_restante.push('<span id="timeout' + i + '" style="text-decoration:underline;">' + restante[i] + '</span></span><br>');
		    else
		      texto_restante.push('<span id="timeout' + i + '">' + restante[i] + '</span></span><br>');
		  }
		}
		
		// Calcula y crea una cadena con el tiempo que falta hasta conseguir los recursos
		if (tiempo_max == 'Infinity'){
			//# TMR 
			a = texto_restante.join('') + '<img style="padding-left:8px;" src="data:image/gif;base64,' + imagenes["clock"] + '" width="18" height="12" title="' + T('TIEMPO') + '"> ' + T('NUNCA');
		}else if (tiempo_max > 0){
			var tiempo2 = formatear_tiempo(tiempo_max + 5); // # TMR - was +5...Introduce un margen de 5 segundos para compensar la desviancion de los temporizadores de javascript
			var fecha = new Date();
			fecha.setTime(fecha.getTime() + (tiempo_max * 1000));
      //# TMR
			a = texto_restante.join('') + '<img style="padding-left:8px;" src="data:image/gif;base64,' + imagenes["clock"] + '" width="18" height="12" title="' + T('TIEMPO') + '"> <span id="timeout">' + tiempo2 + '</span><br/> Available ' + calcularTextoTiempo(fecha);
		}
		return a;
	}

	/**
	 * Formatea el tiempo necesario hasta alcanzar determinada fecha
	 *
	 * Params:
	 *	fecha:	Objeto de tipo Date con la fecha futura
	 *
	 * Returns:
	 *	Cadena de texto con el calculo de tiempo restante
	 */
	function calcularTextoTiempo(fecha){
		ahora = new Date();

		// Calcula la diferencia de horas entre la fecha dada y la actual
		// para saber si se trata de las proximas 72 horas
		horas = ((fecha.getTime() - ahora.getTime()) / 1000 / 60 / 60);
		horas += ahora.getHours() + (ahora.getMinutes() / 60);
		if (horas < 24) tiempo_restante = T('HOY');
		else if (horas < 48) tiempo_restante = T('MANYANA');
		else if (horas < 72) tiempo_restante = T('PAS_MANYANA');
		else tiempo_restante = T('EL') + " " + LZ(fecha.getDate()) + "/" + LZ((fecha.getMonth()+1));

		return tiempo_restante + " " + T('A_LAS') + " " + LZ(fecha.getHours()) + ":" + LZ(fecha.getMinutes());
	}

	/**
	 * Calcula el tiempo maximo estimado hasta conseguir los recursos especificados basandose
	 * en la cantidad actual y en la produccion de cada tipo de recurso
	 *
	 * Params:
	 *	necesario:	Array con la cantidad deseada de cada tipo de recurso
	 *
	 * Returns:
	 *	Tiempo maximo en segundos hasta conseguir los recursos deseados
	 */
	function calculateTime(necesario){
		var tiempo_max = 0;
		var tiempo = 0;

		for (i = 0; i < 4; i++){
			var restante = necesario[i] - actual[i];	
			if (restante > 0){
				tiempo = Math.round(restante / produccion[i]);
				if (tiempo > tiempo_max) tiempo_max = tiempo;
				if (tiempo < 0) tiempo_max = 'Infinity';
			}
		}

		if (tiempo_max > 0 && tiempo_max != 'Infinity') tiempo_max = formatear_tiempo(tiempo_max + 5); // Se introduce un margen de 5 segundos para compensar posibles desviaciones en los temporizadores de javascript
		return tiempo_max;
	}

	/**
	 * Calcula y muestra el tiempo estimado hasta el llenado/vaciado de los almacenes y graneros
	 */
	function calculateFillTime(){
		// Por cada tipo de recurso calcula el tiempo hasta el llenao
		// TMR rewrote this function to use all available space
		var a = get('l4').parentNode;
		while(a.tagName != 'TABLE') {
			a=a.parentNode;
		}

	//	var a = find("//div[@id='lres0']", XPFirst).firstChild;

	var overflow;
	
	if(find("//tr[@valign='top']", XPFirst).lastChild.className == 's7') overflow = true;
	
		var txt=new Array();
		txt.push('<tr class="f10" valign="top">');

		
		for (var i = 0; i < 4; i++){
		
				var produccionHora = parseInt(get('l' + (4-i)).title)/3600;
				
				if(produccionHora < 0){ //Negative
					var tiempo = Math.round(get('l' + (4-i)).innerHTML.split("/")[0] / produccionHora*(-1));
				}
				else if(produccionHora == 0){ var tiempo = -1; }
				else {
					var res = get('l' + (4-i)).innerHTML.split("/");
					var tiempo = Math.round( (res[1] - res[0]) / produccionHora);
				}
      		var tiempoRestante = "<span id='timeouta' style='font-weight:bold'>" + formatear_tiempo(tiempo) + "</span>";
      
			txt.push("<td colspan=2 align=center><span style='font-size:9px; color:#909090; white-space: nowrap; text-align:right;'>(" + (produccionHora > 0 ? '+' : '') + parseInt(produccionHora*3600,10) + ', ' + (produccionHora < 0 ? '<font color="#FF0000">' + tiempoRestante + '</font>' : tiempoRestante) + ')</span></td>\n');	

		}
	

			a.innerHTML+=txt.join('');
			a.cellPadding=0;
			a.cellSpacing=0;	
		//if overflow...
		
//		if(find("//tr[@valign='top']", XPFirst).lastChild.className != 's7')
//		{
//			a = get('lres0');
//			a.style.height = '60px';
//			a = find("//div[@class = 'dname']", XPFirst);
//			a.style.position = 'relative';
//			a = get('f3');
//			a.style.top = '117px';		}

}

	/**
	 * Traduce una cadena de texto usando el idioma global detectado
	 *
	 * Params:
	 *	texto:	Cadena de texto a traducir
	 *
	 * Returns:
	 *	Cadena de texto traducida
	 */
	function T(texto){
		// Intenta usar el array del idioma, y si no esta disponible utiliza el castellano por defecto
		try{
			eval('var language = lang_' + idioma);
		}catch(e){
			eval('var language = lang_es');
		}
		// Si una cadena concreta no esta traducida en el idioma, utiliza por defecto el castellano
		if (language[texto] == undefined) return lang_es[texto]; else return language[texto];
	}

	function F(texto, args){
		// "args" debe ser un array asociativo del tipo {'a':'b', 'c':'d'} y puede ser opcional
		try{ eval('var language = lang_' + idioma); }
		catch(e){ eval('var language = lang_es'); }
		if (language[texto] == undefined) texto = lang_es[texto]; else texto = language[texto];

		if (args != undefined) for(var i in args) texto = texto.replace(i, args[i]);
		return texto;
	}

	/**
	 * Recupera informacion generica inicial para el resto de funciones
	 */
	function getGeneralData(){
		// Idioma
//		find("//script[@type='text/javascript']", XPFirst).src.search(/\/([^\/]+)?3.js$/);
		find("//img[contains(@src, 'plus.gif')]", XPFirst).src.search(/\/img\/([^\/]+)\//);
		idioma = RegExp.$1;

		// Ruta al pack grafico
		//find("//link[@rel='stylesheet']", XPFirst).href.search(/^(.*\/)(.*)3.css$/);
		find("//link[@rel='stylesheet']", XPFirst).href.search(/^(.*\/)(.*)\.css$/);
		pack_grafico = RegExp.$1;

		// Identificador de aldea actual
		id_aldea = getIdAldea();

		// Identificador de usuario
		find("//td[@class='menu']", XPFirst).innerHTML.search(/spieler.php\?uid=(\d+)/);
		uid = RegExp.$1;

		// Nombre del servidor
		location.href.search(/http:\/\/(.*)\//);
		server = RegExp.$1;

		// Por cada tipo de recurso: cantidad actual almacenada, capacidad total del almacen / granero y produccion por segundo
		for (var i = 0; i < 4; i++){
			//actual[i] = get('l'+(i+1)).innerHTML.split("/")[0];
			//total[i] = get('l'+(i+1)).innerHTML.split("/")[1];
			//produccion[i] = get('l'+(i+1)).title/3600;
			var a = get('l' + (4-i));
			actual[i] = a.innerHTML.split("/")[0];
			total[i] = a.innerHTML.split("/")[1];
			produccion[i] = a.title/3600;

		}

		// Plus
		if (find("//img[contains(@src, 'travian1.gif')]", XPFirst)) plus = true; else plus = false;
	}

	/**
	 * Funcion que devuelve la version del juego de Travian que esta tratando
	 *
	 * Returns:
	 *			La version del juego
	 */
	function getVersion(){
		var a = find("//script[@type='text/javascript']", XPFirst);
		if (a){ 
			a.src.search(/(\d).js$/);
			return RegExp.$1;
		}else return null;
	}

	/**
	 * Oculta el anuncio de publicidad
	 */
	function hideAd(){
		var ad = find("//iframe", XPFirst);
		if (ad) ad.style.display = 'none';

		// Comentar el resto de la funcion desde aqui se se produce un efecto de 
		// salto al cargar las paginas
/*
		var a = find("//table[@bgcolor='#747273']", XPFirst);
		if (a) a.style.display = 'none';

		var a = find("//div[@style]", XPList);
		for (var i = 0; i < a.snapshotLength; i++){
			var b = a.snapshotItem(i);
			if (b.style.top == '42px') b.style.top = '0px';
		}
*/
	}

	/**
	 * Crea nuevos enlaces en la barra de menu izquierda. Son enlaces internos y externos al juego separados por una linea
	 */
	function quickLinks(){
		var menu = find("//td[@class='menu']", XPFirst);
		for (var j = 0; j < 2; j++) for (var i = 0; i < menu.childNodes.length; i++) if (menu.childNodes[i].nodeName == 'BR') removeElement(menu.childNodes[i]);
		/*menu.innerHTML += '<hr/>';
		menu.innerHTML += '<a href="login.php">' + T('LOGIN') + '</a>';
		menu.innerHTML += '<a href="allianz.php">' + T('ALIANZA') + '</a>';
		menu.innerHTML += '<a href="a2b.php">' + T('ENV_TROPAS') + '</a>';
		menu.innerHTML += '<a href="warsim.php">' + T('SIM') + '</a>';
		menu.innerHTML += '<hr/>';
		menu.innerHTML += '<a href="http://trcomp.sourceforge.net/index.php?lang=en" target="_blank">' + T('COMP') + '</a>';
//		menu.innerHTML += '<a href="http://travmap.shishnet.org/?lang=' + idioma + '" target="_blank">' + T('MAPA') + '</a>';
//		menu.innerHTML += '<a href="http://www.denibol.com/~victor/travian_calc/" target="_blank">' + T('CALC') + '</a>';
		menu.innerHTML += '<a href="http://www.denibol.com/proyectos/travian_beyond/" target="_blank">Travian Beyond</a>';
		//menu.innerHTML += '<hr/>';
		//menu.innerHTML += '<a href="build.php?gid=16">Rally Point</a>';*/
		var links = [	0,
				[T('LOGIN'), "login.php"],
				[T('ALIANZA'), "allianz.php"],
				[T('ENV_TROPAS'), "a2b.php"],
				[T('SIM'), "warsim.php"],
				0,
				[T('COMP'), "http://trcomp.sourceforge.net/?lang=" + idioma, "_blank"],
//				[T('MAPA'), "http://travmap.shishnet.org/?lang=" + idioma, "_blank"],
//				[T('CALC'), "http://www.denibol.com/~victor/travian_calc/", "_blank"],
				["Travian Beyond", "http://accipter.org/svn/travianBeyond", "_blank"]
		];

		for(var i = 0; i < links.length; i++){
			if(links[i]){
				var a = elem("A", links[i][0]);
				a.href = links[i][1];
				if(links[i][2]) a.setAttribute('target', links[i][2]);
				menu.appendChild(a);
			}else menu.appendChild(document.createElement('HR'));
		}
	}

	/**
	 * Anyade un dialogo de confirmacion a los enlaces de cancelacion de construcciones
	 */
	function confirmDelete(){
		//var links = document.getElementsByTagName("a");
		//for(var i = 0; i < links.length; i++){
		//	if(links[i].href.search(/\?d=(\d+)&a=(\d+)/) > 0) {
		//		links[i].setAttribute('onClick', 'javascript:return confirm("' + T('SEGURO') + '");');
		//	}
		//}
  	var links = find("//img[contains(@src, 'del.gif')]", XPList);
		for (var i = 0; i < links.snapshotLength; i++){
			links.snapshotItem(i).setAttribute('onClick', 'javascript:return confirm("' + T('SEGURO') + '");');

		}
	}

	/**
	 * Anyade nuevos enlaces a edificios en la barra superior
	 */
	/*function buildingLinks(){
		// Localiza la barra de enlaces superiores
		var barra = find("//div[@class='div2']",XPFirst);

		// Mapa para el mercado
		barra.innerHTML = '<map name="mercado"><area shape="rect" coords="0,0,70,50" href="build.php?gid=17" title="' + T('ENVIAR') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=17&t=1" title="' + T('COMPRAR') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=17&t=2" title="' + T('VENDER') + '"></map>' + barra.innerHTML;

		// Mapa para los edificios militares
		barra.innerHTML = '<map name="militar"><area shape="rect" coords="0,0,35,50" href="build.php?gid=16" title="' + T('PUNTO') + '"><area shape="rect" coords="35,0,70,50" href="build.php?gid=19" title="' + T('CUARTEL') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=20" title="' + T('CORRAL') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=21" title="' + T('TALLER') + '"></map>' + barra.innerHTML;

		// Asocia el mapa del mercado con la imagen especifica creada
		barra.innerHTML += '<img usemap="#mercado" class="fl2" src="data:image/gif;base64,' + imagenes["mercado"] + '" border="0" title="' + T('MERCADO') + '">';

		// Asocia el mapa de los edificios militares con la imagen creada a tal efecto
		barra.innerHTML += '<img usemap="#militar" class="fl2" src="data:image/gif;base64,' + imagenes["militar"] + '" border="0" title="' + T('CUARTEL') + '">';

		// Desplaza la barra superior ligeramente a la derecha para no tapar la hora del juego
		barra.style.left = '173px';

		// Desplaza el menu del Plus a la izquierda para hacer hueco a las nuevas imagenes
		find("//div[@class='plus']", XPFirst).style.left = '50px';
	}*/
	function buildingLinks(){
		// Localiza la barra de enlaces superiores

		var barra = find("//div[@id='ltop5']", XPFirst);

		
		// Asocia el mapa del mercado con la imagen especifica creada
		barra.innerHTML += '<img usemap="#mercado" class="fl2" src="data:image/gif;base64,' + imagenes["mercado"] + '" border="0" title="' + T('MERCADO') + '">';

		// Asocia el mapa de los edificios militares con la imagen creada a tal efecto
		barra.innerHTML += '<img usemap="#militar" class="fl2" src="data:image/gif;base64,' + imagenes["militar"] + '" border="0" title="' + T('CUARTEL') + '">';

		// Mapa para el mercado
		barra.innerHTML += '<map name="mercado"><area shape="rect" coords="0,0,70,50" href="build.php?gid=17" title="' + T('ENVIAR') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=17&t=1" title="' + T('COMPRAR') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=17&t=2" title="' + T('VENDER') + '"></map>';

		// Mapa para los edificios militares
		barra.innerHTML += '<map name="militar"><area shape="rect" coords="0,0,35,50" href="build.php?gid=16" title="' + T('PUNTO') + '"><area shape="rect" coords="35,0,70,50" href="build.php?gid=19" title="' + T('CUARTEL') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=20" title="' + T('CORRAL') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=21" title="' + T('TALLER') + '"></map>';

		// Desplaza el menu del Plus a la izquierda para hacer hueco a las nuevas imagenes
		var a = find("//a[contains(@href, 'plus.php')]", XPFirst);
		barra.removeChild(a);
		
		barra.style.width = '720px';
		barra.style.left = '120px';
		
		barra.insertBefore(a, barra.firstChild);
	//	barra.appendChild(a);
		a.childNodes[0].style.left = '-20px';	
	}

	/**
	 * Crea un enlace al servicio de estadisticas de Travian World que recibe la busqueda como parametro
	 *
	 * Params:
	 *	param	Parametro de busqueda para la estadistica
	 */
	function createStatLink(param){
		var statlink = elem('a', "<img src='data:image/gif;base64," + imagenes["stat"] + "' style='margin:0px 1px 0px 1px; display: inline' title='" + T('STAT') + "' alt='Stat' border=0>");
		statlink.href = "javascript:void(0);";
		var ref = 'http://www.denibol.com/proyectos/travian_world/stat2.php?server=' + server + '&' + param;
		statlink.addEventListener("mouseover", function(){ timeout = setTimeout(function(){ var a = get("tb_tooltip"); a.innerHTML = "<img src='" + ref + "' border='0'/>"; a.style.display = 'block'; }, 1000); }, 0);
		statlink.addEventListener("mouseout", function(){ clearTimeout(timeout); get("tb_tooltip").style.display = 'none'; }, 0);
		statlink.addEventListener("click", function(){ var popup = window.open(ref, 'popup', 'width=350, height=250'); popup.focus(); return false; }, 0);
		return statlink;
	}
	
	function createStatLinkUS(param){
		var statlink = elem('a', "<img src='data:image/gif;base64," + imagenes["stat"] + "' style='margin:0px 1px 0px 1px; display: inline' title='" + T('STAT') + "' alt='Stat' border=0>");
		if(server.match(/s1/))
		  var thisserver='us1';
		else if(server.match(/s2/))
		  var thisserver='us2';
		else  
		  return;
		var ref = 'http://travian.spb.ru/analyser.pl?s='+thisserver+'&'+param;
		statlink.href = ref;
		statlink.target='_blank';
		return statlink;
	}

	function getUnitAttack(unitNum)
	{
		return unitData[unitNum][unitAttackIndex];
	}

	function getUnitInfDefense(unitNum)
	{
		return unitData[unitNum][unitInfDefenseIndex];
	}

	function getUnitCavDefense(unitNum)
	{
		return unitData[unitNum][unitCavDefenseIndex];
	}

	function getUnitSpeed(unitNum)
	{
		return unitData[unitNum][unitSpeedIndex];
	}

	function getUnitName(unitNum)
	{
		return unitData[unitNum][unitNameIndex];
	}
	function getUnitBuilding(unitNum)
	{
		return unitData[unitNum][unitBuildingIndex];
	}

	function setUnitStatsTooltip(unitNum)
	{
		return function() {
		var tooltip = get('tb_tooltip');
		tooltip.style.display = 'block';
		var table = elem('table', '');
		var row = elem('tr', '');
		table.appendChild(row);
		td = elem('td', getUnitName(unitNum));
		td.setAttribute('colspan', '3');
		row.appendChild(td);
		row = elem('tr', '');
		table.appendChild(row);
		var td;
		td = elem('td', '<img title="attack" src="data:image/gif;base64,' + imagenes["att_all"] +'">' + getUnitAttack(unitNum));
		row.appendChild(td);
		td = elem('td', '<img title="defense against infantry" src="data:image/gif;base64,' + imagenes["def_i"] +'">' + getUnitInfDefense(unitNum));
		row.appendChild(td);
		td = elem('td', '<img title="defense against cavalry" src="data:image/gif;base64,' + imagenes["def_c"] +'">' + getUnitCavDefense(unitNum));
		row.appendChild(td);
		row = elem('tr','');
		table.appendChild(row);
		td = elem('td', 'Speed ' + getUnitSpeed(unitNum));
		td.setAttribute('colspan', '3');
		row.appendChild(td);
		
		row = elem('tr','');
		table.appendChild(row);
		td = elem('td', 'Capacity ' + uc[unitNum][4]);
		td.setAttribute('colspan', '3');
		row.appendChild(td);
		
		tooltip.innerHTML = "";
		tooltip.appendChild(table);
		};
	}

	// MDL
	// surround unit images with an href to their manual page
	function unitStats(){
		var images = document.getElementsByTagName("img");
		for (var i = 0; i < images.length; i++)
		{
			// make sure it's an unit image, and get the number
			if (!images[i].src.match(/img\/un\/u\/(\d+)\.gif/)) { continue; }
			var unitNum = RegExp.$1;

			var finalObject = images[i];


			// don't overwrite any existing links
			if (images[i].parentNode.nodeName.toLowerCase() != "a")
			{
				// change the image to a link to the unit's manual page

				var link = elem('a', '');
				var image = images[i].cloneNode(true);

				images[i].parentNode.replaceChild(link, images[i]);
				link.appendChild(image);
				link.setAttribute('href', 'javascript:void(0)');
				link.setAttribute('onClick', "Popup(" + unitNum + ",1); return false;");
				image.setAttribute('border', 0);
				image.removeAttribute('title');
				finalObject = link;
			}
			
			// set up tool tip to show stats on mouseover
			finalObject.addEventListener("mouseover", setUnitStatsTooltip(unitNum), 0);
			finalObject.addEventListener("mouseout", function(){ get("tb_tooltip").style.display = 'none'; }, 0);
		}
	}

	var resNeeded = new Array();
	var resNeededForWhatBuilding = "";
	var villageNeedingRes = "";
	function storeResNeeded()
	{
		for (var i = 0; i < 4; i++)
		{
			GM_setValue("r" + (i+1) + "needed", resNeeded[i]);
		}

		GM_setValue("resNeededForWhatBuilding", resNeededForWhatBuilding);
		if (villageNeedingRes == null) { villageNeedingRes = ''; }
		GM_setValue("villageNeedingRes", villageNeedingRes);
	}

	function loadResNeeded()
	{
		for (var i = 0; i < 4; i++)
		{
			resNeeded[i] = GM_getValue("r" + (i+1) + "needed", 0);
		}
		resNeededForWhatBuilding = GM_getValue("resNeededForWhatBuilding", '');
		villageNeedingRes = GM_getValue("villageNeedingRes", '');
		if (villageNeedingRes == null) { villageNeedingRes = ''; }
	}

	function addSendNeededResLink(respermerch)
	{
		// we don't want to fill in res for the current village
		if (getNameOfActiveVillage() == villageNeedingRes)
		{ 
			return;
		}
		var form = find("//form[@name='snd']", XPFirst);
		var buildingTitle = find("//div[@id='lmid2']/h1/b", XPFirst);
		if (form == null || window.top.location.href.indexOf('build.php') == -1 || buildingTitle.innerHTML.indexOf('Marketplace') == -1)
		{
			return;
		}


		var p = elem('p', '');
		var a = elem('a', 'Fill in res for ' + resNeededForWhatBuilding);
		p.appendChild(a);
		a.href = "javascript:void(0);";
		var onClick = "";
		var totalNeeded = 0;
		for (var i = 0; i < 4; i++)
		{
			onClick += 'document.snd.r' + (i+1) + '.value=' + resNeeded[i] + ';';
			totalNeeded += resNeeded[i];
		}
		a.setAttribute('onClick', onClick);
		a.addEventListener("click", function() { updateMerchantTotal(respermerch); }, 0);
		// don't do any links if we don't need any res
		if (totalNeeded > 0 && resNeededForWhatBuilding != '')
		{
			var okButton = find('//input[@value="ok"]', XPFirst);
			okButton.parentNode.insertBefore(p, okButton);
		}
	}


	/**
	 * Crea un enlace para mandar un IGM cuando aparece un enlace al perfil de un jugador, un enlace de
	 * ataque rapido cuando aparece un enlace a una ubicacion del mapa, y otro enlace de estadisticas si
	 * esta soportado para el idioma del servidor activo
	 */
	function playerLinks(){
		var links = document.getElementsByTagName("a");
		//get x|y of our current selected village for distance calculation
		if(find("//a[@class='active_vl']",XPFirst) == null) {
		  var activeX=0;
  		var activeY=0
	  }
	  else  {
  		find("//a[@class='active_vl']",XPFirst).parentNode.nextSibling.textContent.match(/\(([-\d]+)\n\|\n([-\d]+)\)/);
  		var activeX=RegExp.$1;
  		var activeY=RegExp.$2;
  	}
		for(var i = 0; i < links.length; i++){
			// Por cada enlace a una ficha de jugador 
			if(links[i].href.search(/spieler.php\?uid=(\d+$)/) > 0) {
			  var a = RegExp.$1;
			  //if (RegExp.$1 == 0) continue;
				if (links[i].parentNode.className == 'menu') continue;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('uid=' + a), links[i].nextSibling);
				//TMR link to our analyzer for s1/s2
				if (arrayValueExist(tw_serverUS, server)) links[i].parentNode.insertBefore(createStatLinkUS('uid=' + a), links[i].nextSibling);

				// Introduce el enlace para enviar mensajes usando su ID	
				var igmlink = elem('a', "<img src='data:image/gif;base64," + imagenes["igm"] + "' style='margin:3px 0px 1px 3px; display: inline' title='" + T('ENVIAR_IGM') + "' alt='" + T('ENVIAR_IGM') + "' border=0>");
				igmlink.href = 'nachrichten.php?t=1&id=' + a;
//				links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
			// Por cada enlace a una localizacion del mapa
			}else if (links[i].href.search(/karte.php\?d=(\d+)/) > 0){
			  var linkval=RegExp.$1;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('id=' + linkval), links[i].nextSibling);
        //TMR - do we want a link to the Analyzer by village?  We're getting crowded.
        // add it here if we decide we do.
        
				// Agrega un enlace para lanzar un ataque usando su posicion
				//# TMR - insert link to Center Map
				var xy=id2xy(linkval); //get x|y of this link
				var coordanchor = "#" + xy.x + "|" + xy.y;
				links[i].setAttribute('href', links[i].getAttribute('href') + coordanchor);
								
				atklink = elem('a','('+xy.x+'|'+xy.y+')');
				atklink.setAttribute('style','font-size:9px;');
				atklink.href = 'karte.php?z=' + linkval + coordanchor;
				// set up tool tip to show distances on mouseover
				var mover='getVillageDist("'+xy.x+'", "'+xy.y+'")';
	  		atklink.addEventListener("mouseover", eval(mover), 0);
  			atklink.addEventListener("mouseout", function(){ get("tb_tooltip").style.display = 'none'; }, 0);
  			links[i].parentNode.insertBefore(atklink, links[i].nextSibling);
				
				n = find("//table[@class='f10']//*/a[preceding-sibling::span]", XPList);
				var img='att_all';
				for(var j=0; j<n.snapshotLength;j++)  {
				  //alert('"'+n.snapshotItem(j).textContent+'" "'+links[i].textContent.replace(/^\s|\s$|^Reinforcement for /,"")+'"');
				  if(n.snapshotItem(j).textContent == links[i].textContent.replace(/^\s|\s$|^Reinforcement for /g,"") || links[i].textContent.match(/^Reinforcement for /)) {
				    img='def2';
				    break;
				  }
				}
				var atklink = elem('a',"<img src='data:image/gif;base64," + imagenes[img] + "' style='margin:3px 0px 1px 3px; display: inline' height='10' width='10' title='" + T('ATACAR') + "' alt='" + T('ATACAR') + "' border='0'> ");
				atklink.href = 'a2b.php?z=' + linkval + "#" + xy.x + "|" + xy.y;
				links[i].parentNode.insertBefore(atklink, links[i].nextSibling);
			// Por cada enlace a la ficha de una alianza
			}
			else if (links[i].textContent.match(/Center map$/) && links[i].href.search(/karte.php\?z=(\d+)/) > 0){
			  var linkval=RegExp.$1; //# TMR - insert coords/mouseover to Center Map link
				var xy=id2xy(linkval); //get x|y of this link
				links[i].innerHTML+='&nbsp;<span style="font-size:9px">('+xy.x+'|'+xy.y+')</span>';
				var mover='getVillageDist("'+xy.x+'", "'+xy.y+'")';
	  		links[i].addEventListener("mouseover", eval(mover), 0);
  			links[i].addEventListener("mouseout", function(){ get("tb_tooltip").style.display = 'none'; }, 0);
			}
			else if (links[i].href.search(/allianz.php\?aid=(\d+$)/) > 0){
				var a = RegExp.$1;
				if (a == 0) continue;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('aid=' + a), links[i].nextSibling);
				//TMR link to our analyzer for s1/s2
				if (arrayValueExist(tw_serverUS, server)) links[i].parentNode.insertBefore(createStatLinkUS('aid=' + a), links[i].nextSibling);
			}
		}
	}
	
	//show distance from all villages in tooltip
	function getVillageDist(x,y)  {
	  return function(e) {
			var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
			if(cities){
  			var txt1=new Array();
  			txt1.push('<tr><td colspan=2 align=center><b>'+x+'|'+y+'</b><tr><td style="border-bottom:solid 1px #00C000;"><b>Village</b><td align=right style="border-bottom:solid 1px #00C000;"><b>Dist</b>');
				cities = cities.firstChild;
				for (var j = 0; j < cities.childNodes.length; j++){
					var city = cities.childNodes[j];
					var cityname=city.childNodes[0].childNodes[2].textContent;
          city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
					var x2=parseInt(RegExp.$1,10);
					var y2=parseInt(RegExp.$2,10);
					var dist=Math.sqrt(Math.pow(x-x2,2)+Math.pow(y-y2,2)).toFixed(2);
					txt1.push('<tr><td>'+cityname+'<td align=right>'+dist);
				}
				var table = elem('table', txt1.join(''));
  			var tooltip = get('tb_tooltip');
    		document.body.appendChild(tooltip);
    		
  		  tooltip.innerHTML = "";
  		  tooltip.appendChild(table);
  		  tooltip.style.display = 'block';
			}
		}
	}

	/**
	 * Anyade un nuevo boton en la vista de informes y mensajes para marcar todas las casillas
	 */
	function opcionesMensajes(){
		var a = find("//*[@class='s7']", XPList);
		for (var i = 0; i < a.snapshotLength - 1; i++){
			var fila = a.snapshotItem(i);
			if ((fila.firstChild != null) && (fila.firstChild.nodeName == "INPUT")){
				fila.innerHTML += '<input style="font-weight:bold; font-size:8pt; height:14pt" name="mtodo" type="button" value="' + T('MARK') + '" onClick="for(var x = 0; x < document.msg.elements.length; x++) document.msg.elements[x].checked = \'checked\';"/>';
				if (!plus) fila.innerHTML += '<input style="font-weight:bold; font-size:8pt; height:14pt" name="archive" type="Submit" value="' + T('ARCHIVE') + '"/>';
				return;
			}
		}
	}

	/**
	 * Crea eventos para enviar al formulario de envio de materias primas del mercado las coordenadas 
	 * de las propias aldeas.
	 *
	 * Codigo sugerido por Bafox
	 */
	function quickCity(){ 
	  //alert('here');
		// Comprueba si esta el formulario de envio
		var map=0;
		if (find("//form[@name='snd']", XPFirst) == null) {
		  if(document.getElementsByName('xp')[0]) { //TMR added this for the map page
		    map=1;
		  }
		  else { 
		    return;
		  }
    }
      
    
    var ciudades = new Array(); 
    
		// Recupera la coordenada X
		//var n = find("//table[@class='f8']//*/td[@align='right']", XPList); 
		var n = find("//table[@class='dtbl']//td[@class='right dlist1']", XPList); 
		for(var i = 0; i < n.snapshotLength; i++){
			ciudades[i] = new Object();
			try{ ciudades[i].x = n.snapshotItem(i).innerHTML.split('(')[1]; }catch(e){}
		} 

		// Recupera la coordenada Y
		//n = find("//table[@class='f8']//*/td[@align='left']", XPList); 
		n = find("//table[@class='dtbl']//td[@class='left dlist3']", XPList); 
		for(var i = 0; i < n.snapshotLength; i++){ 
			try{ ciudades[i].y = n.snapshotItem(i).innerHTML.split(')')[0]; } catch(e){}
		} 
		// Por cada par de coordenadas crea un evento para copiarlas al formulario
		//n = find("//table[@class='f8' and @width='73']//tr", XPList);  // TMR - added @width='73' for map page
		n = find("//table[@class='dtbl']//tr", XPList);
		for (var i = 0; i < ciudades.length; i++){
			var elem = n.snapshotItem(i);
			if(map==1)
			  elem.setAttribute('onClick',"document.getElementsByName('xp')[0].value='" + ciudades[i].x + "';document.getElementsByName('yp')[0].value='" + ciudades[i].y + "'");
			else
 			  elem.setAttribute('onClick',"snd.x.value='" + ciudades[i].x + "';snd.y.value='" + ciudades[i].y + "'");
			elem.setAttribute('onMouseOver', 'this.style.color="red"');
			elem.setAttribute('onMouseOut', 'this.style.color="black"');
			elem.style.cursor = "pointer";
		}
	}

	// determines if the current page is a scout report
	function isScoutAttackReport()
	{
		// only worry about this on reports
		if (window.top.location.href.indexOf('berichte.php', 0) == -1)
		{
			return false;
		}

		var attackerVillage;
		var defenderVillage;
		var attackMessage
		var tds = document.getElementsByTagName("td")
		for (var i = 0; i < tds.length; i++)
		{
			if (tds[i].innerHTML == "Attacker")
			{
				attackerVillage = tds[i].parentNode.getElementsByTagName("a")[1].innerHTML;
			}
			if (tds[i].innerHTML == "Defender")
			{
				var hrefs = tds[i].parentNode.getElementsByTagName("a");
				if (hrefs.length >= 2) {
					defenderVillage = hrefs[1].innerHTML;
				}
			}
		}
		var attackMessage = find("//tr[@class='rbg']//td", XPList).snapshotItem(1).innerHTML;


		return (attackMessage.indexOf(attackerVillage + " scouts " + defenderVillage, 0) != -1);
	}
	
	// Triggers as long as you're not being attacked...
	function isRaid()
	{
		//link to defending village:
		var foo = find("//tbody//tr//td[@colspan='10']//a", XPList);
		foo = foo.snapshotItem(2);
		foo += "";
		foo = foo.match(/\d+(?=&)/gi); //Village ID of defending village / z
		
		// your villages:
		var right = find("//tbody//tr//td[@class='right']", XPList);
				
		var village;
		var id;
		
		for( i = 0; i < right.snapshotLength; i++)
		{
			//goes through your list of villages to see if you are defending.
			
			village = right.snapshotItem(i);
			
			//get coordinates: x = 0, y = 1;
			village = village.innerHTML.replace(/\n/gi, "").split(/<[^<>]+>/).join("").replace(/[()]/g, "").split("|");
			
			id = xy2id(village[0], village[1]);
			
			if(id*1 == foo*1){return false;}
		}
		
		return true;
	}
	
	//b is title, a is link
	function addBookmark(b, a)
	{
		b += "";
		a += "";
		
		agregarElementoCookie("marcadores", [b, a]); 
		removeElement(find("//div[@id='marcadores']", XPFirst));
		mostrarMarcadores();
	}

	/**
	 * Calcula y muestra informacion adicional en los informes de los ataques
	 * Codigo inicial de Bafox
	 */
	function reportBatalla(){ 
		//var t = find("//table//table//table[@class='tbg']", XPList); 
		var t = find("//table[@class='tbg']//table[@class='tbg']", XPList); 
		if (t.snapshotLength < 1) return; 
    
    location.href.match(/id=(\d+)/);
    var delreporthref='berichte.php\?n1='+RegExp.$1+'&del=Delete';
    var delreport = document.createElement("TR");
    delreport.className = "cbg1";
    delreport.innerHTML='<td class=rgb colspan=2>&nbsp;<input style="font-weight:bold; font-size:8pt; height:14pt" onClick="document.location.href=\''+delreporthref+'\'" type=button value="Delete">';
		find("//table//table[@class='tbg']", XPFirst).parentNode.appendChild(delreport);
		
    //if(find("//table//table//tr[@class='rbg']", XPFirst).textContent.match(/ supplies | reinforces /))  return;
    if(find("//table[@class='tbg']//tr[@class='rbg']", XPFirst).textContent.match(/ supplies | reinforces /))  return;
      
  	var bookmarkRaid = '&nbsp;<input style="font-weight:bold; font-size:8pt; height:14pt" onClick="javascript:void(0);" value="Bookmark Raid" type=button id=orange />';
  	
  	var raidhref = find("//tbody//tr[@class='cbg1']//a", XPList);
  	var where = "Raid " + raidhref.snapshotItem(raidhref.snapshotLength - (raidhref.snapshotLength / 2)).innerHTML + "\'s " + raidhref.snapshotItem(raidhref.snapshotLength - 3).innerHTML;
  	where = where.replace("\n", "");
  	
  	raidhref = raidhref.snapshotItem(raidhref.snapshotLength - 2).href;
  	
  	var foo = find("//tbody//tr[@class='cbg1']", XPList)
  	foo.snapshotItem(foo.snapshotLength - 1).innerHTML+=(bookmarkRaid);
  	
  	document.getElementById("orange").addEventListener('click', function(){ addBookmark(where, raidhref)}, false);
  
		// Encuentra y suma todas las cantidades del botin
		var botin = null;
		var a = find("//tr[@class='cbg1']", XPList);
		if (a.snapshotLength >= 3){
			// FIXME: Apa�o para Firefox. FF mete nodos de tipo texto vacios
			if (a.snapshotItem(1).childNodes.length == 4){
				var b = a.snapshotItem(1).childNodes[3];
			}else{
				var b = a.snapshotItem(1).childNodes[1];
			}
			if (b.childNodes.length == 8){ 
				var cantidades_botin = new Array();
				cantidades_botin[0] = parseInt(b.childNodes[1].nodeValue);
				cantidades_botin[1] = parseInt(b.childNodes[3].nodeValue);
				cantidades_botin[2] = parseInt(b.childNodes[5].nodeValue);
				cantidades_botin[3] = parseInt(b.childNodes[7].nodeValue);
				botin = arrayToInt(cantidades_botin);
				var info_botin = '';
				for (var i = 0; i < 4; i++){
					//# TMR
					info_botin += '<img src="data:image/gif;base64,' + imagenes["res"+i] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">';
					info_botin += cantidades_botin[i];
					if (i < 3) info_botin += ' + '; else info_botin += ' = ';
				}
				info_botin += botin;
				b.innerHTML = info_botin;
			}
		}

		var perds = new Array();
		var carry = new Array();
		// Por cada participante en la batalla (atacante, defensor y posibles apoyos)
		for(var g = 0; g < t.snapshotLength; g++){ 
			perds[g] = [0, 0, 0, 0];
			carry[g] = 0;	
			var tt = t.snapshotItem(g); 
			var num_elementos = tt.rows[1].cells.length - 1;
			// ignore row 3 if it's prisoners and we freed them
			var countPrisonersAsLosses = false;

			var gotPrisoners = 0;
			for(var i=0; i<tt.rows.length; i++) { //freed line is variable depending on if there were casualites/catapult attacks
			  if(tt.rows[i].cells[0].innerHTML == "Prisoners")
			    gotPrisoners = i;
			  if(gotPrisoners && tt.rows[i].cells[1].innerHTML.indexOf("freed") != -1)
			    countPrisonersAsLosses = true;
			}
			for(var j = 1; j < 11; j++){ 
				// Recupera la cantidades de tropa de cada tipo que han intervenido
				var u = uc[tt.rows[1].cells[j].getElementsByTagName('img')[0].src.replace(/.*\/.*\//,'').replace(/\..*/,'')]; 
				var unitsLost = 0;
				
  			if (!countPrisonersAsLosses || (gotPrisoners && gotPrisoners !=3)) //no casualties and captured/freed, or unit casualties
				{
				  unitsLost = tt.rows[3] ? tt.rows[3].cells[j].innerHTML : 0; //use row 3, which is either casualties, or no casualties and units captured.
					// Basandose en el coste por unidad y su capacidad, se calculan las perdidas y la capacidad de carga total
					var ptu = arrayByN(u, unitsLost);
					perds[g] = arrayAdd(perds[g], ptu.slice(0, 4)); 
				}
				if(gotPrisoners && gotPrisoners != 3) { //if we had prisoners captured and unit casualties
				  if(!countPrisonersAsLosses) {
  				  unitsLost = tt.rows[gotPrisoners] ? tt.rows[gotPrisoners].cells[j].innerHTML : 0; //use our captured line
  				  // Basandose en el coste por unidad y su capacidad, se calculan las perdidas y la capacidad de carga total
  					var ptu = arrayByN(u, unitsLost);
  					perds[g] = arrayAdd(perds[g], ptu.slice(0, 4)); 
  				}
				}
				carry[g] += (tt.rows[2] ? tt.rows[2].cells[j].innerHTML - unitsLost : 0) * u[4];
			}

			// Anyade la nueva informacion como una fila adicional en cada tabla
			var informe = document.createElement("TD");
			for (var i = 0; i < 4; i++){
				//# TMR
				informe.innerHTML += '<img src="data:image/gif;base64,' + imagenes["res"+i] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">';
				informe.innerHTML += perds[g][i];
				if (i < 3) informe.innerHTML += ' + '; else informe.innerHTML += ' = ';
			}		
			var perdidas = arrayToInt(perds[g]);
			informe.innerHTML += perdidas;
			informe.colSpan = num_elementos;
			informe.className = "s7";
			var fila = document.createElement("TR");
			fila.className = "cbg1";
			fila.appendChild(elem("TD", T('PERDIDAS')));
			fila.appendChild(informe);
			tt.appendChild(fila);

			// Solo para el atacante se calcula y muestra la rentabilidad y eficiencia del ataque
			// don't print efficiency and profit for scout reports
			if (!isScoutAttackReport() && g == 0 && botin != null){
				var datos = document.createElement("TD");
				var fila_datos = document.createElement("TR");
				datos.colSpan = num_elementos;

				// La rentabilidad muestra el botin en comparacion con las perdidas
				var rentabilidad = Math.round((botin - perdidas) * 100 / botin);
				if (botin == 0)	if (perdidas == 0) rentabilidad = 0; else rentabilidad = -100;	
				datos.innerHTML = rentabilidad + "%";
				datos.className = "s7";
				fila_datos.className = "cbg1";
				fila_datos.appendChild(elem("TD", T('RENT')));
				fila_datos.appendChild(datos);
				tt.appendChild(fila_datos);

				var datos = document.createElement("TD");
				var fila_datos = document.createElement("TR");
				datos.colSpan = num_elementos;

				// La eficiencia muestra el botin en comparacion con la cantidad de tropas utilizadas
				var eficiencia = 100 - Math.round((carry[g] - botin) * 100 / carry[g]);			
				if (carry[g] == 0) eficiencia = 0;
				datos.innerHTML = eficiencia + "%";
				datos.className = "s7";
				fila_datos.className = "cbg1";
				fila_datos.appendChild(elem("TD", T('EFICIENCIA')));
				fila_datos.appendChild(datos);
				tt.appendChild(fila_datos);
			}
		}
	}

	/**
	 * Realiza un resumen de la pagina de produccion
	 */
	function preCalculate1(){
		var datos = 0;

		// Crea una matriz inicializada a 0 con todos los posibles niveles de cada tipo de recurso
		var grid = new Array(4);
		for(i = 0; i < 4; i ++) {
			grid[i] = new Array(26);
			for(j = 0; j <= 25; j++) {
				grid[i][j] = 0;
			}
		}

		// Solo hay 6 tipos de aldeas de 15 casillas cada uno. Se describe el tipo de recurso por casilla
		var dist = [
			[3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], // 9 cereales
			[2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3] // 15 cereales
		];

		//find("//img[@usemap='#rx']", XPFirst).src.search(/\/f(\d).jpg$/);
		find("//div[starts-with(@id, 'f')]", XPFirst).id.search(/f(\d)/);
		var tipo = RegExp.$1;

		// Recupera todas las casillas y rellena la matriz con los niveles detectados
		for (var i = 1; i <= 18; i++){
			var a = find("//img[@class='rf" + i + "']", XPFirst);
			if (a){
				a.src.search(/\/s(\d+).gif$/);
				grid[dist[tipo - 1][i - 1]][RegExp.$1]++;
			}else{
				grid[dist[tipo - 1][i - 1]][0]++;
			}
		}

		// Crea una tabla mostrando por cada tipo de recurso un representante de cada nivel que se ha encontrado
		// Muestra al lado de cada uno los recursos y tiempo restantes hasta poder subirlo de nivel
		var table = document.createElement('TABLE');
		table.setAttribute("class", "tbg");
		table.setAttribute("align", "center");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");
		var fila1 = document.createElement('TR');
		var fila2 = document.createElement('TR');
		//fila1.setAttribute("class", "rbg");	
		fila1.setAttribute("style","font-weight:bold;background-image: url(data:image/gif;base64,"+imagenes["c2"]+")");
		table.appendChild(fila1);
		table.appendChild(fila2);
		for (var i = 0; i < 4; i++){
			//# TMR 
			var td1 = elem('TD', '<img src="data:image/gif;base64,' + imagenes["res"+i] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">');
			fila1.appendChild(td1);

			var td2 = document.createElement('TD');
			fila2.appendChild(td2);

			var table2 = document.createElement('TABLE');
			table2.setAttribute("align", "center");
			td2.appendChild(table2);
			for (var j = 0; j < 25; j++){
				if (grid[i][j] > 0 && buildingCost[i][j+1] != null){
					datos = 1;
					var fila3 = document.createElement('TR');
					var imagen = '<div style="width: 0%;"><img src="data:image/gif;base64,' + imagenes["r" + i] + '" border="0" title="' + T('RECURSO' + (i+1)) + '">';
					// TMR
					// changed this to use (j+1) so it shows what i'm upgrading to, not upgrading from
					//if (j > 0) 
					imagen += '<img src="data:image/gif;base64,' + imagenes["s" + (j+1)] + '" style="position:relative; bottom:52px; left: 27px;" border="0">';
					imagen += '</div>';
					var td = elem("TD", imagen);
					fila3.appendChild(td);

					var restante = calculateResourceTime(buildingCost[i][j+1]);
					var td3 = document.createElement('TD');
					td3.setAttribute('class', 'c f7');
					fila3.appendChild(td3);
					table2.appendChild(fila3);

					if (restante != null) td3.innerHTML = restante;
					else td3.innerHTML = T('SUBIR_NIVEL');
					
					//# MDL - list culture per day per res
					var fila4 = document.createElement("TR");
					table2.appendChild(fila4);
					var td4 = document.createElement("TD");
					td4.setAttribute('class', 'c f7');
					td4.setAttribute('align', 'center');
					td4.setAttribute('colspan', '2');
					fila4.appendChild(td4);
					td4.innerHTML = formatCostPerCP(calculateCostPerCP(i,j+1));
				}
			}
		}
		table.style.position = 'absolute';
		table.setAttribute("id", "resumen");
		// Se desplaza la tabla hacia abajo para no interferir con la lista de aldeas / enlaces derecha
		table.style.top = 580 + longitudPantalla() + 'px';
		if (datos == 1) document.body.appendChild(table);
	}

	/**
	 * Realiza un resumen de la pagina de edificios de la aldea
	 */
	function preCalculate2(){
		var datos = 0;
		var buildingsImages = new Array();
		var buildingsDescs = new Array();
		var buildingsLinks = new Array();

		// recoge los nombres de cada uno
		xpathResult = find('//map[@name="map1"]/area/@title', XPIter);
		while ((buildingsDescs[buildingsDescs.length] = xpathResult.iterateNext())) {}

		// los enlaces para acceder directamente a ellos
		xpathResult = find('//map[@name="map1"]/area/@href', XPIter);
		while ((buildingsLinks[buildingsLinks.length] = xpathResult.iterateNext())) {}

		// Procesa as imagenes de los edificios
		//var xpathResult = find('//td[@class="s3"]/img/@src', XPIter);
		var xpathResult = find('//div[@id="lmid2"]/img/@src', XPIter);
		buildingsImages[0] = document.createTextNode(img("g/g16.gif"));
		while ((buildingsImages[buildingsImages.length] = xpathResult.iterateNext())) {}
		// Soporte para murallas
		var a = find("//div[starts-with(@class, 'd2_x')]", XPFirst);
		if (a){
			switch(a.className){
				case 'd2_x d2_0': break;
				case 'd2_x d2_1': var b = "g/g31.gif"; break;
				case 'd2_x d2_11': var b = "g/g32.gif"; break;
				case 'd2_x d2_12': var b = "g/g33.gif"; break;
			}
			if (b) buildingsImages[buildingsDescs.length - 4] = document.createTextNode(img(b));
		}

		var table = document.createElement('TABLE');
		table.setAttribute("class", "tbg");
		table.setAttribute("align", "center");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "0");
		table.setAttribute("style", "padding-left:1px;");
    
    //# TMR loop below was -3, so remove last 3 before sorting.
    buildingsDescs.splice(buildingsDescs.length-3,3);
    
    //# TMR sort.  don't want to swap every array, so store index as sortRef to use with buildingsLinks,buildingsImages
    var temp;
    for(var i=0; i<buildingsDescs.length; i++)  {
      buildingsDescs[i].sortRef=i;
    }      
    for(var i=0; i<buildingsDescs.length-1; i++)  {
      for(j=i+1; j<buildingsDescs.length; j++)  {
        if(buildingsDescs[i].nodeValue > buildingsDescs[j].nodeValue) {
          temp=buildingsDescs[i];
          buildingsDescs[i]=buildingsDescs[j];
          buildingsDescs[j]=temp;
        }
      }
    }
    
    //TMR - get the currently constructing buildings so we can list the correct level
    var underconstructiontable=find("//div[@id='lbau2']//table[@class='f10' and @width='100%']", XPFirst);
    var underconstruction=new Object();
    if(underconstructiontable!=null)  {
      for(var i=0; i<underconstructiontable.rows.length; i++)  {
        underconstructiontable.rows[i].textContent.match(/([\w\s']*)\s\(level (\d+)\)/);
        underconstruction[RegExp.$1+' L'+RegExp.$2]=1;
      }
    }
    
    var tablecells=new Array(); //this will store the code for each building as a TD element

		//# MDL - track min cost/CP
		var minCostPerCPValue = null;
		var minCostPerCPTD = null;
    var useimage=new Array();
		var j = 0;
		for(var i = 0; i < buildingsDescs.length; i++) {
  		//# TMR - use our sortRef
      sortRef=buildingsDescs[i].sortRef;
			if(buildingsDescs[i] != null && basename(buildingsImages[sortRef].nodeValue) != 'iso.gif' && buildingsDescs[i].nodeValue != 'Outer building site') {
				// Por cada edificio se recoge su nivel y su codigo en el juego
				buildingLevel = buildingsDescs[i].nodeValue.split(" ");
				buildingLevel = parseInt(buildingLevel[buildingLevel.length-1]);
        
				buildingCode = buildingsImages[sortRef].nodeValue.split("/");
				buildingCode = buildingCode[buildingCode.length-1].split(".");
				//buildingCode = parseInt(buildingCode[0].substring(1, buildingCode[0].length));
				if (buildingCode[0].search(/(\d+)/)) buildingCode = parseInt(RegExp.$1);
				
				// TMR - show the level we're upgrading to, not what we're at
				if(buildingsDescs[i].nodeValue == 'Rally Point building site')  {
          buildingLevel=0;
          var nextbuildinglevel=buildingsDescs[i].nodeValue;
          var uselevel=1;
        }
        else  {
          var nextbuildinglevel=buildingsDescs[i].nodeValue.replace(/level ([0-9]+)$/,'L');
  				var currentlevel=parseInt(RegExp.$1);
  				var uselevel=1;
  				if(underconstruction[nextbuildinglevel+(currentlevel+1)])  {
  				  uselevel+=1;
            if(underconstruction[nextbuildinglevel+(currentlevel+2)])  { //could have the building queue'd twice
              uselevel+=1;
            }
          }
          nextbuildinglevel+=(currentlevel+uselevel);
        }
        
            
				// Si es actualizable se muestra junto con los recursos que necesita
				if (buildingCost[buildingCode] != null && buildingCost[buildingCode][buildingLevel+uselevel] != null){
					j++;
					datos = 1;

					// Soporte para murallas
					if(buildingCode>=5 && buildingCode<=26 || buildingCode==37) {
					  useimage[sortRef]='data:image/gif;base64,' + imagenes["g"+buildingCode];
					}
					else  {
  					switch(buildingCode){
  						case 31: useimage[sortRef] = 'data:image/gif;base64,' + imagenes["empalizada"]; break;
	  					case 32: useimage[sortRef] = 'data:image/gif;base64,' + imagenes["muralla"]; break;
		  				case 33: useimage[sortRef] = 'data:image/gif;base64,' + imagenes["terraplen"]; break;
			  		}
			  	}
          //TMR shrink font size a bit.  set img height to show more on screen
					var td = document.createElement("TD");
					td.setAttribute('width', Math.floor(100/edificiosPorFila)+'%');
          td.setAttribute("valign", "top");
          td.setAttribute("align", "left");
					
					var table2 = document.createElement('TABLE');
					table2.setAttribute("width", "100%");
					td.appendChild(table2);

					var fila2 = document.createElement('TR');
					table2.appendChild(fila2);

					var td2 = document.createElement("TD");
					td2.setAttribute('class', 'f10');
					td2.setAttribute('width', '100%');
					td2.setAttribute('colspan', '2');
					td2.setAttribute('align', 'left');
					td2.innerHTML = '<a style="font-size:11px;" href="' + buildingsLinks[sortRef].nodeValue + '">&nbsp;' + nextbuildinglevel + '</a>'
					fila2.appendChild(td2);
					
					var fila2b = document.createElement('TR');
					table2.appendChild(fila2b);
					var td2b = document.createElement("TD");					
					td2b.innerHTML = '<a style="font-size:11px;" href="' + buildingsLinks[sortRef].nodeValue + '"><tr><td><img style="padding-left:3px;height:50px" src="' + useimage[sortRef] + '" border="0"></a>'
					fila2b.appendChild(td2b);

					var restante = calculateResourceTime_br(buildingCost[buildingCode][buildingLevel+uselevel]);
					var td3 = document.createElement("TD");
					td3.setAttribute('class', 'c f7');
					td3.setAttribute('align', 'left');
					fila2b.appendChild(td3);
					if (restante != null){
						td3.innerHTML = restante;
					}else{
						td3.innerHTML = T('SUBIR_NIVEL');
					}
					
					
					//# MDL - list culture per day per res
					var fila2b = document.createElement("TR");
					table2.appendChild(fila2b);
					var td4 = document.createElement("TD");
					td4.setAttribute('class', 'c f7');
					td4.setAttribute('align', 'center');
					td4.setAttribute('colspan', '2');
					fila2b.appendChild(td4);
					var costPerCP = calculateCostPerCP(buildingCode, buildingLevel+uselevel);
					td4.innerHTML = formatCostPerCP(costPerCP);
					if ((minCostPerCPValue == null && costPerCP != "--") || (costPerCP != "--" && parseInt(costPerCP) < parseInt(minCostPerCPValue)))
					{
						minCostPerCPValue = costPerCP;
						minCostPerCPTD = td4;
					}

					//# TMR - push into array by sorted alpha order
					tablecells.push(td);
				}
				if(VC_showcomplete && buildingCost[buildingCode][buildingLevel+uselevel]==null) {
				  if(buildingCode>=5 && buildingCode<=26 || buildingCode==37) {
					  useimage[sortRef]='data:image/gif;base64,' + imagenes["g"+buildingCode];
					}
					else  {
  					switch(buildingCode){
  						case 31: useimage[sortRef] = 'data:image/gif;base64,' + imagenes["empalizada"]; break;
	  					case 32: useimage[sortRef] = 'data:image/gif;base64,' + imagenes["muralla"]; break;
		  				case 33: useimage[sortRef] = 'data:image/gif;base64,' + imagenes["terraplen"]; break;
			  		}
			  	}
          var td = document.createElement("TD");
				  td.setAttribute('width', Math.floor(100/edificiosPorFila)+'%');
				  td.setAttribute('valign',"top");
				  td.setAttribute("align", "left");
				  td.setAttribute("bgcolor", "#E5E5E5");
				  
				  var table2 = document.createElement('TABLE');
					table2.setAttribute("width", "100%");
					td.appendChild(table2);
				  var nextbuildinglevel=buildingsDescs[i].nodeValue.replace(/ level \d+/,' L'+(buildingLevel+uselevel-1)); //TMR fixed to show correct level for buildings under construction that are completing their last level(s)
				  table2.innerHTML = '<tr><td bgcolor=#E5E5E5><a style="font-size:11px;" href="' + buildingsLinks[sortRef].nodeValue + '">&nbsp;' + nextbuildinglevel + '<br/><img style="padding-left:3px;height:50px" src="' + useimage[sortRef] + '" border="0"><span style="position:relative;top:-15px;left:20px;">&nbsp;&nbsp;Complete</span></a>'
				  tablecells.push(td);
				  j++;
				  datos = 1;
				}
			}
		}

		//# MDL - make cheapest costPerCP in black
		if (minCostPerCPTD != null)
		{
			minCostPerCPTD.setAttribute('class', 'f7');
		}
		
		//# TMR - output by column
    var h=-1;
    var len=Math.ceil((tablecells.length)/edificiosPorFila);
		for(i=0; i<len*edificiosPorFila;i++) {
      if(i%edificiosPorFila==0) {
        h++;
        var fila = document.createElement('TR');
				table.appendChild(fila);
			}
			
			if(VC_sort=='vertical') {
        k=len*(i%edificiosPorFila)+h;
      }
      else  {
        k=i;
      }

      if(k>tablecells.length-1)
        fila.appendChild(document.createElement("TD"));
      else
        fila.appendChild(tablecells[k]);
		}
		
		table.style.position = 'absolute';
		table.setAttribute("id", "resumen");
		// Se desplaza la tabla hacia abajo para no interferir con la lista de aldeas / enlaces derecha
		table.style.top = 625 + longitudPantalla() + 'px';
		if (datos == 1) document.body.appendChild(table);
	}

	/**
	 * Realiza un resumen de la pagina del mapa
	 */
	function preCalculate3(){
		var datos = 0;
		var a = find("//*/area[@onmouseover]", XPList);

		var table = document.createElement('TABLE');
		table.setAttribute("id", "tabla_mapa");
		table.setAttribute("sortCol", -1);
		table.setAttribute("class", "tbg");
		table.setAttribute("align", "center");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");
		var thead = document.createElement("THEAD"); 
		var tbody = document.createElement("TBODY");
		var fila = document.createElement('TR');
		//fila.setAttribute('class', "rbg");
		fila.setAttribute("style","font-weight:bold;background-image: url(data:image/gif;base64,"+imagenes["c2"]+")");
		thead.appendChild(fila); 
		table.appendChild(thead);
		var etiquetas_tabla = ["JUGADOR", "ALIANZA", "ALDEA", "HAB", "COORD", "ACCION"];
		for (var i = 0; i < 6; i++){
			var td = elem('TD', T(etiquetas_tabla[i]));
			if (i < 4){
				switch(i){
					case 3: td.addEventListener("click", sortTable('tabla_mapa', i, 'int'), 0); break;
					default: td.addEventListener("click", sortTable('tabla_mapa', i), 0); 
				}
				td.style.cursor = "pointer";
			}
			fila.appendChild(td);
		}
		// Procesa todas las casillas visibles del mapa
		for(var i = 0; i < a.snapshotLength; i++) {
			var aldea = a.snapshotItem(i);
			var mouseOver = aldea.getAttribute("onmouseover");
			// Por cada aldea se muestra toda la informacion posible y enlaces rapidos para atacar y enviar recursos
			if(mouseOver.substring(0,1) != "x") {
				datos = 1;
				var fila = document.createElement('TR');
				tbody.appendChild(fila);
				datos_aldea = mouseOver.substring(4, mouseOver.length - 1).split(",");
				var href = aldea.getAttribute("href");
				
				fila.appendChild(elem('TD', datos_aldea[1].substring(1, datos_aldea[1].length - 1)));
				fila.appendChild(elem('TD', datos_aldea[3].substring(1, datos_aldea[3].length - 1)));
				//fila.appendChild(elem('TD', datos_aldea[0].substring(1, datos_aldea[0].length - 1)));
				//fila.appendChild(elem('TD', datos_aldea[2].substring(1, datos_aldea[2].length - 1)));
				//fila.appendChild(elem('TD', '<a href="' + href + '">' + datos_aldea[4].substring(1, datos_aldea[4].length - 1) + ", " + datos_aldea[5].substring(1, datos_aldea[5].length - 1) + '</a>'));
				//fila.appendChild(elem('TD', '<a href="' + href.replace("karte.php?d", "a2b.php?z") + '">' + T('ATACAR') + '</a> / <a href="' + href.replace("karte.php?d", "build.php?ze") + '&gid=17">' + T('COMERCIAR') + '</a>'));
				fila.appendChild(elem('TD', decodeEntity(datos_aldea[0].substring(1, datos_aldea[0].length - 1))));
				fila.appendChild(elem('TD', datos_aldea[2].substring(1, datos_aldea[2].length - 1)));
				var td=elem('TD', '<a href="' + href + '">' + datos_aldea[4].substring(1, datos_aldea[4].length - 1) + ", " + datos_aldea[5].substring(1, datos_aldea[5].length - 1) + '</a>');
				var mover='getVillageDist("'+datos_aldea[4].substring(1, datos_aldea[4].length - 1)+'", "'+datos_aldea[5].substring(1, datos_aldea[5].length - 1)+'")';
	  		td.addEventListener("mouseover", eval(mover), 0);
  			td.addEventListener("mouseout", function(){ get("tb_tooltip").style.display = 'none'; }, 0);
  			fila.appendChild(td);
				//fila.appendChild(elem('TD', '<a href="' + href + '">' + datos_aldea[4].substring(1, datos_aldea[4].length - 1) + ", " + datos_aldea[5].substring(1, datos_aldea[5].length - 1) + '</a>'));
				fila.appendChild(elem('TD', '<a href="' + href.replace("karte.php?d", "a2b.php?z") + '">' + T('ATACAR') + '</a> / <a href="' + href.replace("karte.php?d", "build.php?z") + '&gid=17">' + T('COMERCIAR') + '</a>'));

			}
		}
		table.appendChild(tbody);
		if(location.href.match(/karte2.php/)) {
		  if(window.innerHeight==550 || window.innerHeight==700) { //if open in window (not tab), or already resized.
  	    tbody.style.overflowY='scroll';
	      tbody.style.overflowX='hidden';
  	  	tbody.style.height=126;
    		window.innerHeight=700;
    	}
  		table.style.position = 'absolute';
	    table.style.top = 550+'px';
	  }
	  else  {
	    table.style.position = 'absolute';
	    table.style.top = 580 + longitudPantalla() + 'px';
	  }
		if (datos == 1) document.body.appendChild(table);
	}
  
  /*
    Loads resource types for all map locations.  called when the Get Resources button is clicked
  */
  var resMap = new Object();
  var rescount=0;
  function getResourceTypes()  {
    var funcion = function (){
      this.value="Loading...";
      var timer=100;
      if(location.href.match(/karte.php/)) {
        var plus=0;
        skip=8;
        var casillas = find("//img[starts-with(@class, 'mt')]", XPList);
      }
      else  {
        plus=1;
        skip=4;
        var casillas = find("//img[starts-with(@style, 'position')]", XPList);
      }
      //alert(casillas.snapshotLength);
		  //var areas = find("//map[@name='map2']//area[@shape='poly']", XPList);
		  var areas = find("//map[starts-with(@name, 'map')]/area", XPList);
		  //alert(areas.snapshotLength);
      for(var i = 0; i < casillas.snapshotLength; i++) {
        var aldea = casillas.snapshotItem(i);
    		if (aldea.src.match(/\/(d|t)\d*.gif$/)){
    		  var area = areas.snapshotItem(i+skip);
    		  area.getAttribute("onmouseover").search(/'(-?\d+)','(-?\d+)'\)/);
    		  var xy=RegExp.$1+'_'+RegExp.$2;
    		  resMap[xy]=area.coords;
    		  if(plus)  {
    		    area.getAttribute("onclick").match(/"(karte.*)"/);
    		    area.href=RegExp.$1;
    		  }
    		  //don't want to pound the server, so delay with a setTimeout.  have to rig this with an eval cause js is ghetto.
    		  var ajax='function() { ajaxRequest("'+area.href+'", "GET", null, procesarCasilla_inline,dummy);}';
    		  setTimeout(eval(ajax),timer);//*(plus+1));
    		  timer+=Map_interval;
    		  //if(timer>2000)
    		  //  break;
    	  }
    	}
      var ajax='function() { (find("//input[@name=\'getresources\']", XPFirst)).value="Kész!";}';
    	setTimeout(eval(ajax),timer);
    };
		return funcion;
	}

	/*
     TMR - Processes resource types for all map locations.  called from setTimeout via XMLHttpRequest 
  */
	function procesarCasilla_inline(t){
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath - what?  no habla espanol. es no espanol! so says freetranslation.com
		var ans = document.createElement('DIV');
		ans.innerHTML = t.responseText;
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		//var res = ansdoc.evaluate("//img[@class='rf0']", ans, null, XPFirst, null).singleNodeValue;
		//res.src.search(/\/f(\d)\.jpg$/);

		var isfield=0;
		// Parece haber dos versiones del juego, asi que se contemplan las dos
		if (ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue)  {
			ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue.id.search(/f(\d)/);
			isfield=1;
		}
		else {
		  isfield=2;
		  ansdoc.evaluate("//img[@id='resfeld']", ans, null, XPFirst, null).singleNodeValue.src.search(/\/f(\d)\.jpg$/);
		}
		var info = RegExp.$1 - 1;
    
    var h1 = ansdoc.evaluate("//h1", ans, null, XPFirst, null).singleNodeValue;
    h1.innerHTML.search(/(-?\d+)\|(-?\d+)/);
    var xy=RegExp.$1+'_'+RegExp.$2;
    
    var pos = resMap[xy].split(",");
		var x=parseInt(pos[0]);
		var y=parseInt(pos[1]);
		
		if(location.href.match(/karte.php/)) {
        var leftbase=150;
        var topbase=102;
      }
    else  {
      var leftbase=15;
      var topbase=-8;
    }
      
		var div = document.createElement('DIV');
		div.style.zIndex = 99; //below mouseover tooltip
		div.style.position = 'absolute';
		div.style.top = y+topbase+'px';
		div.style.backgroundColor='#FEFFE3';
		div.style.border='solid 1px #00C000';
		div.setAttribute("name",'resourcebox');
		
		switch(info)  {
		  case 0: //9 crop (3 3 3 9)
			  div.innerHTML+='9<img src="data:image/gif;base64,' + imagenes["res"+(3)] + '" width="18" height="12" border="0">';
			  div.title='3 3 3 9';
			  div.style.left = x+leftbase+8+'px';
			  div.style.backgroundColor='#FFFFFF';
			  break;
			case 1: //5 iron (3 4 5 6)
			  div.innerHTML+='<img src="data:image/gif;base64,' + imagenes["res"+(2)] + '" width="18" height="12" border="0">';
			  div.title='3 4 5 6';
			  div.style.left = x+leftbase+11+'px';
			  break;
			case 2: //(4 4 4 6) show what?
			  div.title='4 4 4 6';
			  div.innerHTML+='&nbsp;=&nbsp;';
			  div.style.fontSize='8px;'
			  div.style.left = x+leftbase+14+'px';
			  break;
			case 3: //5 clay (4 5 3 6)
			  div.innerHTML+='<img src="data:image/gif;base64,' + imagenes["res"+(1)] + '" width="18" height="12" border="0">';
			  div.title='4 5 3 6';
			  div.style.left = x+leftbase+11+'px';
			  break;
			case 4: //5 wood (5 3 4 6)
			  div.innerHTML+='<img src="data:image/gif;base64,' + imagenes["res"+(0)] + '" width="18" height="12" border="0">';
			  div.title='5 3 4 6';
			  div.style.left = x+leftbase+11+'px';
			  break;
			case 5: //15 crop (1 1 1 15)
			  div.innerHTML+='15<img src="data:image/gif;base64,' + imagenes["res"+(3)] + '" width="18" height="12" border="0">';
			  div.title='1 1 1 15';
			  div.style.left = x+leftbase+5+'px';
			  div.style.backgroundColor='#FFFFFF';
			  break;
		}
		document.body.appendChild(div);
	}


	/** 
	* Ordena en orden ascendete y descendente 
	*
	* Params: 
	* 	sTableID: 	ID de la tabla a ordenar 
	* 	iCol: 		Indice de la columna a ordenar 
	* 	sDataType:	Tipo de datos de la columna, valor por defecto:texto 
	*/ 
	function sortTable(sTableID, iCol, sDataType) { 
		return function(){
			var oTable = document.getElementById(sTableID); 
			var oTBody = oTable.tBodies[0]; 
			var colDataRows = oTBody.rows; 
			var aTRs = new Array; 

			for (var i = 0; i < colDataRows.length; i++) aTRs[i] = colDataRows[i]; 
			if (oTable.getAttribute("sortCol") == iCol) aTRs.reverse(); 
			else aTRs.sort(generateCompareTRs(iCol, sDataType)); 

			var oFragment = document.createDocumentFragment(); 
			for (var i = 0; i < aTRs.length; i++) oFragment.appendChild(aTRs[i]); 

			oTBody.appendChild(oFragment); 
			oTable.setAttribute("sortCol", iCol); 
		};
	} 

	function convert(element, sDataType) { 
		switch(sDataType) { 
			case "int": return ((element.nodeValue == null) || !element.nodeValue.match(/\d+/)) ? 0 : parseInt(element.nodeValue); 
			case "float": return ((element.nodeValue == null) || !element.nodeValue.match(/\d+/)) ? 0 : parseFloat(element.nodeValue); 
			//default: return (element == null) ? '' : element.nodeValue.toString().toLowerCase();									 
			default: return (element == null) ? '' : element.textContent.toLowerCase();
		} 
	} 

	function generateCompareTRs(iCol, sDataType) {			 
		return	function compareTRs(oTR1, oTR2) { 
			var vValue1 = convert(oTR1.cells[iCol].firstChild, sDataType); 
			var vValue2 = convert(oTR2.cells[iCol].firstChild, sDataType); 

			if (vValue1 < vValue2) return -1; 
			else if (vValue1 > vValue2) return 1; 
			else return 0; 
		}; 
	}

	/**
	 * Implementa y muestra un bloc de notas. Guarda las notas como cookies en el navegador local
	 */
	function blocNotas(){
		var a = find("//form[@name='msg']", XPFirst);

		// Importar notas de versiones antiguas del script
		// FIXME: Eliminar dentro de unas cuantas versiones
		//var b = readCookie("notas"); if (b != null && b != ''){ createCookie("notas_" + server, b, 365); eraseCookie("notas"); }

		// Carga las notas previas si existen
		var notas = readCookie("notas_" + server);
		if (notas == null) notas = ''; else notas = unescape(notas);

		// Crea la estructura HTML del bloc
		var tabla = document.createElement("TABLE");
		var tr = document.createElement("TR");
		var td = document.createElement("TD");
		var p1 = document.createElement("P");
		var p2 = document.createElement("P");
		var textarea = elem("TEXTAREA", notas);
		var input = document.createElement("INPUT");

		tabla.setAttribute("width", "430");
		td.setAttribute("align", "center");
		td.setAttribute("background", img('msg/block_bg.gif', true));
		textarea.setAttribute("cols", "30");
		textarea.setAttribute("rows", "16");
		textarea.setAttribute("style", 'background-image: url(' + img('msg/underline.gif', true) + '); border : 0px; overflow:auto');
		input.setAttribute("type", "image");
		input.setAttribute("border", "0");
		input.setAttribute("src", "data:image/gif;base64,"+imagenes["ok1"]);
		// En el evento del boton de guardado actualiza el valor de la cookie (1 a�o de duracion por defecto)
		input.addEventListener("click", function(){ createCookie("notas_" + server, escape(textarea.value), 365); alert(T('GUARDADO')); }, 0);

		td.appendChild(elem("P", "&nbsp;"));
		p1.appendChild(textarea);
		td.appendChild(p1);
		p2.appendChild(input);
		td.appendChild(p2);
		tr.appendChild(td);
		tabla.appendChild(tr);
		a.parentNode.appendChild(document.createElement("P"));
		a.parentNode.appendChild(tabla);
	}

	/**
	 * Crea una funcion que se encarga del evento al desplazarse en el mapa. Actualiza la direccion destino en
	 * base al desplazamiento configurado
	 *
	 * Params:
	 * 	i:	Ordinal sobre la orientacion de la flecha
	 * 
	 * Returns:
	 *	La funcion que gestiona el evento
	 */
	function createEventoMapa(i, href, plus){
		var funcion = function (){
			var despl = [-801, 1, 801, -1];
			if(location.href.match(/karte2/) || href.match(/karte2/))
			  var cname="desp2";
 			else
			  var cname="desp";

			var d = document.getElementsByName(cname)[0].value;
			if (d < 1) d = 1;
			// Actualiza el valor de la cookie
			createCookie(cname, d, 365);
			var base = parseInt(href.split("=")[1]);
			if(plus)
			  this.href = href.replace(/z=(\d+)/, 'z=' + (base + (despl[i] * (d - 1))));
			else
  			ajaxRequest("ajax.php?action=map_content&z=" + (base + (despl[i] * (d - 1))), "GET", null,
  				function(t){
  					get("map_content").innerHTML = t.responseText;
  					infoRecursos();
  					desplazarMapa();
  					removeElement(get("tabla_mapa"));
  					preCalculate3();
  				}
  			, dummy);
		};
		return funcion;
	}
	
	function createEventoMapa_2d(i,j,href,plus){ //takes 2 paramaters for bi-directional movement - based on center, so no (d - 1)
		var funcion = function (){
			var despl = [-801, 1, 801, -1];
			if(location.href.match(/karte2/))
			  var cname="desp2";
 			else
			  var cname="desp";

			var d = document.getElementsByName(cname)[0].value;
			// Actualiza el valor de la cookie si se ha introducido un cantidad correcta
			if (d < 1) d = 1;
			// Actualiza el valor de la cookie
			createCookie(cname, d, 365);
			var base = parseInt(href.split("=")[1]);
			if(plus)
			  this.href = href.replace(/z=(\d*)/, 'z=' + (base + (despl[i] * (d))+(despl[j] * (d))));
			else
  			ajaxRequest("ajax.php?action=map_content&z=" + (base + (despl[i] * (d))+(despl[j] * (d))), "GET", null,
  				function(t){
  					get("map_content").innerHTML = t.responseText;
  					infoRecursos();
  					desplazarMapa();
  					removeElement(get("tabla_mapa"));
  					preCalculate3();
  				}
  			, dummy);
		};
		return funcion;
	}

	/**
	 * Crea una casilla para introducir el desplazamiento deseado en el mapa e inserta los
	 * eventos en las flechas de direccion
	 */
	function desplazarMapa(){
		// Carga el ultimo valor utilizado si existe
		if(location.href.match(/karte2/)) {
		  plus=1;
		  var cname="desp2";
		  var b = find("//form[@method='post']", XPFirst).parentNode;
		}
		else  {
		  var cname="desp";
		  plus=0;
		  var b = find("//form[@method='post']/table", XPFirst);
		}
		
		// Crea y anyade la casilla del desplazamiento
		//var b = find("//form[@method='post']", XPFirst).parentNode;
		
		//alert(b.child);
		var tr = document.createElement("TR");
		
		var d = readCookie(cname);
		var td1 = elem("TD", "<b>" + T('DESP_ABR') + "</b>");
		var td2 = elem("TD", '<input name="'+cname+'" value="' + (d == null ? '1' : d) + '" size="2" maxlength="4" class="fm fm25">');
		var td3 = document.createElement("TD");
		td1.setAttribute("colspan", 2);
		td2.setAttribute("colspan", 2);
		td3.setAttribute("colspan", 2);

		//# MDL pretty up the location links
		var locations = find("//area[@onMouseOver]", XPList);
		for (var i = 0; i < locations.snapshotLength; i++)
		{
			var item = locations.snapshotItem(i);
			var url = item.getAttribute('href');
			//GM_log("url is " + url);
			url.search(/d=(\d+)/);
			var d = RegExp.$1;
			//GM_log("d is " + d);
			var xy = id2xy(d);
			url += "#" + xy.x + "|" + xy.y;
			item.setAttribute('href', url);
		}

		//# TMR add our button to pull all resources
		var but = document.createElement("INPUT");
		but.setAttribute("name",'getresources');
		but.setAttribute("type",'button');
		but.setAttribute("value",'Nyersanyag mutatása');
		but.setAttribute("class","fm");
		but.setAttribute("style","font-weight:bold;background-image:url(data:image/gif;base64,"+imagenes["c2"]+");");//opacity:.9;
		but.addEventListener("click", getResourceTypes(), 0); 
		td3.appendChild(but);
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		b.appendChild(tr);

		/*if (location.href.match(/karte.php($|\?z=)/) && arrayValueExist(tw_server, server)){
			var center_id = xy2id(find("//input[@name='xp']", XPFirst).value, find("//input[@name='yp']", XPFirst).value);
			var href = "http://www.denibol.com/proyectos/travian_world/karte3.php?z=" + center_id + "&server=" + server + "&user=" + uid;
			var td3 = elem("TD", '<a href="' + href + '" onClick="pop(\'' + href + '\'); return false;" target="_blank"><img src="' + img('m/max.gif') + '" width="33" height="25" border="0" alt="' + T('MAP_EXT') + '" title="' + T('MAP_EXT') + '"></a>');
			td3.setAttribute("colspan", 2);
			tr.appendChild(td3);
		}*/

		// Inserta los eventos para manipular los desplazamientos
		/*var a = find("//map[@name='map2']", XPFirst);
		// FIXME: Apa�o para Firefox. FF mete nodos de tipo texto vacios
		if (a.firstChild.nodeName != "AREA") var e = 1; else var e = 0;
		for (var i = 0; i < 4; i++){
		  var link = a.childNodes[i + e];
			link.addEventListener("click", createEventoMapa(i), 0);
		}*/
		//var a = find("//map/area[@onclick]", XPList);
		/*var a = find("//map[starts-with(@name, 'map')]/area", XPList);
		//alert(a.snapshotLength);
		for (var i = 0; (i < 4 && plus) || (i < 8 && !plus); i++){
		  //alert(a.snapshotItem(i));
			var b = a.snapshotItem(i);
			b.setAttribute("onclick", '');
			b.addEventListener("click", createEventoMapa(i % 4, b.href,!plus), 0);
			//b.href = 'javascript:void(0)';
		}*/
		
		// Inserta los eventos para manipular los desplazamientos
		//var a = find("//map/area[@onclick]", XPList);
		//for (var i = 0; i < a.snapshotLength; i++){
		var a = find("//map[starts-with(@name, 'map')]/area", XPList);
		for (var i = 0; (i < 4 && plus) || (i < 8 && !plus); i++){
			var b = a.snapshotItem(i);
			b.setAttribute("onclick", '');
			b.addEventListener("click", createEventoMapa(i % 4, b.href, plus), 0);
			b.href = 'javascript:void(0)';
		}

    
    if(plus)  {
		  var left=1;
		  var top=1;
		  var link="karte2.php";
		  var swcoord="0,273,25";
		  var swpos="left:0px;top:261px;";
		  
		  var secoord="490,533,25";
		  var sepos="left:483px;top:534px;";
		  
		  var nwcoord="478,13,25";
		  var nwpos="left:470px;top:2px;";
		  
		  var necoord="959,273,25";
		  var nepos="left:959px;top:261px;"
		  var zindex=401;
		  var blueboxzindex=50;
		}
		else  {
		  var left=136;
		  var top=111;
		  var link="karte.php";
		  var swcoord="0,230,25";
		  var swpos="left:132px;top:328px;";
		  var secoord="265,370,25";
		  var sepos="left:399px;top:486px;";
		  var nwcoord="265,90,25";
		  var nwpos="left:392px;top:178px;"
		  var necoord="524,230,25";
		  var nepos="left:667px;top:328px;"
		  var zindex=5;
		  var blueboxzindex=5;
		}
		var xp=find("//input[@name='xp']", XPFirst);
		var yp=find("//input[@name='yp']", XPFirst);
		//# TMR for - directional links to 4 corners of map.
		var base = xy2id(xp.value, yp.value);
		
		//show the blue box around our custom defined alliance_list
		var ourcities = find("//table[@class='f10']//*/a[preceding-sibling::span]", XPList);
		var playerlist = find("//area[contains(@onMouseOver, 'map\(')]", XPList);
		var alliance_list = readCookie("alliance_list");
		if (alliance_list == null)
		{
			alliance_list ="LLJK"+unescape('%B9')+",LLJK"+unescape('%B2')+",LLJKp,SC,SL,SN";
			createCookie("alliance_list", alliance_list, 365);
		}
    
    //new css layout uses ajax to reload the map, so clear any existing blocks
		var clearlist=document.getElementsByName('blueblock');
		for(var i=0; i<clearlist.length; i++)  {
		  clearlist[i].style.display='none;'
		}
		var clearlist=document.getElementsByName('blackblock');
		for(var i=0; i<clearlist.length; i++)  {
		  clearlist[i].style.display='none;'
		}
		var clearlist=document.getElementsByName('resourcebox');
		for(var i=0; i<clearlist.length; i++)  {
		  clearlist[i].style.display='none;'
		}
		var alliance_array = alliance_list.split(",");
		for(var i=0; i<playerlist.snapshotLength; i++)  {
		  var alliance=playerlist.snapshotItem(i).getAttribute("onmouseover").split("','")[3];
		  var cityname=playerlist.snapshotItem(i).getAttribute("onmouseover").split("','")[0].replace(/map\('/,"");
		  //alert(cityname);
		  //if(alliance=='')
		  //  continue;
		  var iscity=0;
		  for(var j=0; j<ourcities.snapshotLength; j++)  {
  		  if(ourcities.snapshotItem(j).textContent == cityname) {
  		    iscity=1;
  		    break;
  		  }
		  }
		  if(iscity)  { //if one of our cities, don't cover up the orange.
		    iscity=0;
		    continue;
		  }
		  gotblue=0;
		  if (alliance_array != null && alliance!='')
		  {
		  	for (var j=0; j<alliance_array.length; j++) {
    	  		if(alliance_array[j] == alliance) {
    	    		var lineimg=document.createElement("IMG");
    	  			var xcoord=left+parseInt(playerlist.snapshotItem(i).getAttribute("coords").split(",")[0]);
    	  			var ycoord=top+parseInt(playerlist.snapshotItem(i).getAttribute("coords").split(",")[3]);
    	  			lineimg.setAttribute("name","blueblock");
    	  			lineimg.setAttribute("src","data:image/gif;base64,"+imagenes["blueblock"]);
    	  			lineimg.setAttribute("style","z-index:"+blueboxzindex+";position:absolute;left:"+xcoord+"px;top:"+ycoord+"px;");
    	  			lineimg.setAttribute("border",0);
    	  			lineimg.setAttribute("width",71);
    	  			lineimg.setAttribute("height",39);
    	  			document.body.appendChild(lineimg);
      	  		gotblue=1;
    	  		}
    		}
		  }
		  if(gotblue==0 && cityname.search(/Occupied oasis/) != -1)  {
  		  var lineimg=document.createElement("IMG");
  			var xcoord=left+parseInt(playerlist.snapshotItem(i).getAttribute("coords").split(",")[0]);
  			var ycoord=top+parseInt(playerlist.snapshotItem(i).getAttribute("coords").split(",")[3]);
  			lineimg.setAttribute("name","blackblock");
  			lineimg.setAttribute("src","data:image/gif;base64,"+imagenes["blackblock"]);
  			lineimg.setAttribute("style","z-index:"+blueboxzindex+";position:absolute;left:"+xcoord+"px;top:"+ycoord+"px;");
  			lineimg.setAttribute("border",0);
  			lineimg.setAttribute("width",71);
  			lineimg.setAttribute("height",39);
  			document.body.appendChild(lineimg);
	  	}
    }
		
		//directional arrows
		document.styleSheets[0].insertRule("a.compass {cursor:hand;z-index:"+zindex+";position:absolute;line-height:12px;font-size:10px;letter-spacing:2px;}",0);
		
	  //remove any existing directionals
	  var compass=document.getElementsByName('compass8');
	  for(var i=0; i<compass.length;) {
	    removeElement(compass[i]);
	  }
		//South West - left
	  var SW=document.createElement("AREA"); //left
		SW.addEventListener("click", createEventoMapa_2d(2,3,link+"?z="+base, plus), 0);
		SW.setAttribute("href", 'javascript:void(0)'); 
		SW.setAttribute("coords", swcoord);
		SW.setAttribute("shape", "circle");
		SW.setAttribute("title", "South West");
		var SWa=document.createElement("a");
		SWa.setAttribute("class","compass");
		SWa.setAttribute("style",swpos+"text-align:center;color:#000000;font-weight:normal;");
		SWa.addEventListener("click", createEventoMapa_2d(2,3,link+"?z="+base, plus), 0);
		SWa.setAttribute("name", 'compass8');
		SWa.setAttribute("href", 'javascript:void(0)'); 
		SWa.setAttribute("title", "South West");
		SWa.setAttribute("href", 'javascript:void(0)'); 
		SWa.innerHTML="S<br>W";
		
		//South East - bottom
		var SE=document.createElement("AREA");
		SE.addEventListener("click", createEventoMapa_2d(2,1,link+"?z="+base, plus), 0);
		SE.setAttribute("href", 'javascript:void(0)');
		SE.setAttribute("coords", secoord);
		SE.setAttribute("shape", "circle");
		SE.setAttribute("title", "South East");
		var SEa=document.createElement("a");
		SEa.setAttribute("class","compass");
		SEa.setAttribute("style",sepos+"text-align:center;color:#000000;font-weight:normal;");
		SEa.addEventListener("click", createEventoMapa_2d(2,1,link+"?z="+base, plus), 0);
		SEa.setAttribute("name", 'compass8');
		SEa.setAttribute("href", 'javascript:void(0)'); 
		SEa.setAttribute("title", "South East");
		SEa.innerHTML="SE";
		
		//North West - top
		var NW=document.createElement("AREA");
		NW.addEventListener("click", createEventoMapa_2d(0,3,link+"?z="+base, plus), 0);
		NW.setAttribute("href", 'javascript:void(0)');
		NW.setAttribute("coords", nwcoord);
		NW.setAttribute("shape", "circle");
		NW.setAttribute("title", "North West");
		var NWa=document.createElement("a");
		NWa.setAttribute("class","compass");
		NWa.setAttribute("style",nwpos+"text-align:center;color:#000000;font-weight:normal;");
		NWa.addEventListener("click", createEventoMapa_2d(0,3,link+"?z="+base, plus), 0);
		NWa.setAttribute("name", 'compass8');
		NWa.setAttribute("href", 'javascript:void(0)'); 
		NWa.setAttribute("title", "North West");
		NWa.innerHTML="NW";
		
		//North East - right
		var NE=document.createElement("AREA");
		NE.addEventListener("click", createEventoMapa_2d(0,1,link+"?z="+base, plus), 0);
		NE.setAttribute("href", 'javascript:void(0)');
		NE.setAttribute("coords", necoord);
		NE.setAttribute("shape", "circle");
		NE.setAttribute("title", "North East");
		var NEa=document.createElement("a");
		NEa.setAttribute("class","compass");
		NEa.setAttribute("style",nepos+"text-align:center;color:#000000;font-weight:normal;");
		NEa.addEventListener("click", createEventoMapa_2d(0,1,link+"?z="+base, plus), 0);
		NEa.setAttribute("name", 'compass8'); 
		NEa.setAttribute("href", 'javascript:void(0)'); 
		NEa.setAttribute("title", "North East");
		NEa.innerHTML="N<br>E";
		
		var a = find("//map[starts-with(@name, 'map')]", XPFirst);
		a.appendChild(SW);
		a.appendChild(SE);
		a.appendChild(NW);
		a.appendChild(NE);
		document.body.appendChild(SWa);
		document.body.appendChild(SEa);
		document.body.appendChild(NWa);
		document.body.appendChild(NEa);
  	
  	if(plus) {  //put coordinates on X/Y axis - 13x13
  	  var left=10;
  	  var top=283;
  	  var xdiff=36;
  	  var ydiff=20;
  	  var x=find("//input[@name='xp']", XPFirst).value-6;
  	  var y=find("//input[@name='yp']", XPFirst).value-6;
  	  var txt='';
  	  document.styleSheets[0].insertRule("div.xyaxis {z-index:550;position:absolute;font-size:9px;}",0);
  	  for(var i=0; i<13;i++)  {
	      var div=document.createElement("DIV"); //X axis
    		div.setAttribute("class","xyaxis");
    		div.setAttribute("style","left:"+(left+(i*(xdiff+1)))+"px;top:"+(top+2+(i*ydiff))+"px;");
    		var xout=x+i;
    		if(xout > 400)
    		  xout-=801;
    		else if (xout < -400)
    		  xout+=801;
    		div.innerHTML=xout;
    		document.body.appendChild(div);
    		div=document.createElement("DIV"); //Y axis
    		div.setAttribute("class","xyaxis");
    		div.setAttribute("style","left:"+(left+(i*xdiff))+"px;top:"+(top-34-(i*ydiff))+"px;");
    		var yout=y+i;
    		if(yout > 400)
    		  yout-=801;
    		else if (yout < -400)
    		  yout+=801;
    		div.innerHTML=yout;
    		document.body.appendChild(div);
  	  }
  	  //TMR show 7x7 outline on 13x13 image
  	  var lineimg=document.createElement("IMG");
  	  lineimg.setAttribute("src","data:image/gif;base64,"+imagenes["lines"]);
  	  lineimg.setAttribute("style","z-index:50;position:absolute;left:228px;top:132px;");
  	  lineimg.setAttribute("border",0);
  	  lineimg.setAttribute("width",514);
  	  lineimg.setAttribute("height",284);
  	  document.body.appendChild(lineimg);
  	  //put the missing class on the input boxes
  	  xp.setAttribute("class","fm fm25");
  	  yp.setAttribute("class","fm fm25");
  	}
  	
  	xp.focus();
  	xp.select();
	}

	/**
	 * Crea una nueva columna en las ofertas del mercado para mostrar la alianza de los
	 * vendedores
	 */
	function alianzaMercado(){
	  if(find("//tr[@class='rbg']", XPFirst)==null)
	    return;
		var a = find("//tr[@class='rbg']", XPFirst).parentNode;
		// Prepara la insercion de la nueva columna
		var b = a.getElementsByTagName("TR");
		// FIXME: Apa�o para Firefox. FF mete nodos de tipo texto vacios
		b[0].childNodes[b[0].childNodes.length == 3 ? 1 : 0].setAttribute('colspan', '8');
		
		if(b[b.length - 1].childNodes[0].tagName=='TD') 
  		b[b.length - 1].childNodes[0].setAttribute("colspan", "8");
  	else
  	  return;

		// Crea e inserta la columna
		var columna = document.createElement("TD");
		columna.innerHTML = T('ALIANZA');
		b[1].appendChild(columna);

		// Rellena la columna con los nombres de las alianzas
		for(var i = 2; i < b.length - 1; i++){
			var alianza = document.createElement("TD");
			// FIXME: Apa�o para Firefox. FF mete nodos de tipo texto vacios
			var alianza_txt = b[i].childNodes[b[i].childNodes.length == 12 ? 8 : 4].getAttribute('title');
			if (alianza_txt != null) alianza.innerHTML = alianza_txt;
			b[i].appendChild(alianza);
		}
	}

	/**
	 * Crea una funcion que procesa el evento al seleccionar una cantidad de un recurso al enviar materias primas
	 * desde el mercado
	 *
	 * Params:
	 *	recurso:	Ordinal del recurso
	 *	cantidad:	Cantidad a incrementar del determinado recurso
	 *
	 * Returns:
	 *	La funcion que gestiona el evento
	 */
	function crearEventoRecursosMercado(recurso, cantidad){
		return function(){
			var a = document.getElementsByTagName('input')[recurso + 1].value;
			if (a == '') var suma = 0; else var suma = parseInt(a);
			suma += cantidad;
			// La cantidad a enviar no puede superar lo disponible
			if (suma > actual[recurso]) suma = actual[recurso];
			// La cantidad a enviar no debe poder superar la capacidad de los comerciantes disponibles
			var max_capacidad = parseInt(find("//p//b", XPFirst).innerHTML);
			var max_comercian = parseInt(find("//table[@class='f10']//tr//td[@colspan='2']", XPFirst).innerHTML.split(' ')[1].split('/')[0]);
			var max_transport = max_capacidad * max_comercian;
			if (suma > max_transport) suma = max_transport;

			document.getElementsByTagName('input')[recurso + 1].value = suma;
		}
	}

	function updateMerchantTotal(merchantCapacity)
	{
		var total = 0;
		for (var i = 1; i <= 4; i++)
		{
			var resField = find("//input[@name='r" + i + "']", XPFirst);
			var num = parseInt(resField.value);
			if (!isNaN(num))
			{
				total += num;
			}
		}
		document.getElementById("merchantTotal").innerHTML = total;
		var merchantCount = (total / merchantCapacity) | 0;
		var extra = total % merchantCapacity;
		if (extra != 0) {
			merchantCount += 1;
		}
		var capacityWasted = merchantCount * merchantCapacity - total;
		document.getElementById("merchantCount").innerHTML = merchantCount;
		document.getElementById("capacityWasted").innerHTML = capacityWasted;
	}

	/**
	 * Inserta nuevas cantidades seleccionables al enviar recursos desde el mercado
	 */
	function recursosMercado(){
		if (find("//input[@type='text']", XPList).snapshotLength != 7) return;

		document.body.innerHTML.search(/Each of your merchants can carry <b>(\d+)/);
		var respermerch=RegExp.$1;

    // Array con las nuevas cantidades	
		var max_capacidad = parseInt(find("//p//b", XPFirst).innerHTML);
		var cantidades = [100, 250, 500, 1000];
		var repetido = false;
		for (var i = 0; i < cantidades.length; i++) if (max_capacidad == cantidades[i]){ repetido = true; break; }
		if (!repetido) cantidades = [100, 500, 1000, max_capacidad];
		var a = find("//table[@class='f10']", XPFirst);
		var k = 0;
		// FIXME: Apa�o para Firefox. FF mete nodos de tipo texto vacios
		a = a.childNodes[a.childNodes.length == 2 ? 1 : 0].childNodes;
		for (var i = 0; i < a.length; a.length == 8 ? i += 2 : i++){
			// Se eliminan las posibilidades originales
			// FIXME: Apa�o para Firefox. FF mete nodos de tipo texto vacios
			a[i].removeChild(a[i].childNodes[a[i].childNodes.length > 4 ? 5 : 3]);

			// Por cada nueva cantidad y recurso se crea un enlace con el evento asociado
			for(var j = 0; j < cantidades.length; j++){
				var enlace = document.createElement('A');
				enlace.href = "javascript:void(0)";
				enlace.innerHTML = '(' + cantidades[j] + ')';
				enlace.addEventListener('click', crearEventoRecursosMercado(k, cantidades[j]), false);
				enlace.addEventListener('click', function() { updateMerchantTotal(respermerch) }, false);

				a[i].appendChild(enlace);
			}
			k++;
		}
		
		var rescount=find("//tr[@class='cbg1']", XPList);
		var restotal=0;
		for(var i=0; i<rescount.snapshotLength;i++) {
  			if(rescount.snapshotItem(i)!=null)  {
    			if(rescount.snapshotItem(i).textContent.search(/Resources/)!=-1)  {
    			  restotal=0;
    			  var num=rescount.snapshotItem(i).textContent.match(/\d+/g);
    			  for(var j=0; j<num.length; j++) { 
    			    restotal+=parseInt(num[j]);
    			  }
    			  rescount.snapshotItem(i).lastChild.lastChild.setAttribute("style", "float:left;");
    			  rescount.snapshotItem(i).lastChild.innerHTML+='<span class='+rescount.snapshotItem(i).lastChild.lastChild.getAttribute("class")+' style="float:right;">'+(Math.ceil(restotal/respermerch))+' merchants</span>';
    			}
    		}
  		}
		var okButton = find("//input[@name='s1']", XPFirst);
		var merchEff = elem('p', 'Total: <span id="merchantTotal">0</span> (merchants: <span id="merchantCount">0</span>, wasted space: <span id="capacityWasted">0</span>)');
		okButton.parentNode.insertBefore(merchEff, okButton);
		for (var i = 1; i <= 4; i++)
		{
			var resInput = find("//input[@name='r" + i + "']", XPFirst);
			resInput.addEventListener("keyup", function() { updateMerchantTotal(respermerch); }, 0);
		}

		addSendNeededResLink(respermerch);
	}

	function pc2aldeas(puntos){ return Math.round(Math.pow((puntos / 1000) / 1.6, 1 / 2.3)); }
	function aldeas2pc(aldeas){ return Math.round(1.6 * Math.pow(aldeas, 2.3)) * 1000; }

	/**
	 * Calcula y muestra los puntos de cultura necesarios para la siguiente aldea y el tiempo para conseguirlo, o
	 * las aldeas adicionales que se pueden fundar con los puntos actuales
	 */
	function puntosCultura(){
		//var a = find("//td[@class='s3']//b", XPList);
		var a = find("//div[@id='lmid2']//b", XPList);
		if (a.snapshotLength != 5) return;

		// Produccion de puntos de cultura de todas las aldeas
		var pc_prod_total = parseInt(a.snapshotItem(2).innerHTML);
		// Cantidad de puntos de cultura actuales
		var pc_actual = parseInt(a.snapshotItem(3).innerHTML);
		// Puntos de cultura necesarios para fundar la siguiente aldea
		var pc_aldea_prox = parseInt(a.snapshotItem(4).innerHTML);

		// Numero de aldeas actuales
		var aldeas_actuales = pc2aldeas(pc_aldea_prox);
		// Numero de aldeas que se pueden tener con los PC actuales
		var aldeas_posibles = pc2aldeas(pc_actual);
    var texto = new Array();
		texto.push('<table class="tbg" align="center" cellspacing="1" cellpadding="2"><tr style="font-weight:bold;background-image: url(data:image/gif;base64,'+imagenes["c2"]+')><td>' + T('ALDEA') + '</td><td>' + T('PC') + "</td></tr>");
		for (var i = 0; i < 3; i++){
			texto.push('<tr><td>' + (aldeas_actuales + i + 1) + '</td><td>');

			// PC necesarios para conseguir la siguiente aldea
			var pc_necesarios = aldeas2pc(aldeas_actuales + i);

			// Si hay PC de sobra
			if (pc_necesarios < pc_actual) texto.push(T('FUNDAR'));
			else{
				// Tiempo en segundos hasta conseguir los puntos de cultura necesarios
				var tiempo = ((pc_necesarios - pc_actual) / pc_prod_total) * 86400;
	
				var fecha = new Date();
				fecha.setTime(fecha.getTime() + (tiempo * 1000));
				var texto_tiempo = calcularTextoTiempo(fecha);

				texto.push(T('FALTA') + ' <b>' + (pc_necesarios - pc_actual) + '</b> ' + T('PC') +'<br/>');
				texto.push(T('LISTO') + " " + texto_tiempo);
			}
			texto.push('</td></tr>');
		}
		texto.push('</table>');

		a.snapshotItem(4).parentNode.innerHTML += "<p>" + texto.join('') + "</p>";
	}

	function asignarFiltro(oferta, filtro){
		oferta.setAttribute("style", "display:none"); 
		oferta.setAttribute("filtro" + filtro, "on");
	}

	function quitarFiltro(oferta, filtro, filtros){
		oferta.removeAttribute("filtro" + filtro);
		var remove = true;
		for (var i = 0; i < filtros.length; i++) if (oferta.getAttribute("filtro" + filtros[i]) == 'on') remove = false;
		if (remove == true) oferta.removeAttribute("style");
	}

	/**
	 * Crea la funcion que gestiona el evento de los filtros en el mercado
	 *
	 * Param:
	 *	tipo	Tipo de filtro (0 para ofrezco, 1 para busco y 2 para tipo)
	 *	recurso	Recurso del filtro (0-4 recursos basicos, 5 para cualquiera)
	 *
	 * Returns:
	 *	La funcion que gestiona el evento
	 */
	function funcionFiltrosMercado(tipo, recurso){
		var funcion = function (){
			var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]//tr[not(@class)]", XPList);
			for (var i = 0; i < a.snapshotLength - 1; i++){
				var b = a.snapshotItem(i);		
				// FIXME: Apa�o para Firefox. FF mete nodos de tipo texto vacios
				if (b.childNodes.length > 8) var error = true; else var error = false;
				b.childNodes[error ? 1 : 0].firstChild.src.search(/\/(\d).gif$/); var ofrezco = RegExp.$1;
				b.childNodes[error ? 4 : 2].firstChild.src.search(/\/(\d).gif$/); var busco = RegExp.$1;
				var ofrezco_cantidad = parseInt(b.childNodes[error ? 2 : 1].innerHTML);
				var busco_cantidad = parseInt(b.childNodes[error ? 6 : 3].innerHTML);
				if (b.childNodes[error ? 11 : 6].className == 'c') var carencia = true; else var carencia = false;
				var tiempo = calcular_segundos(b.childNodes[error ? 10 : 5].innerHTML); 

				// Para mantener 4 filtros activos a la vez sobre cada oferta, utiliza 3 atributos distintos
				// sobre cada fila
				switch(tipo){
					case 0: if ((ofrezco != recurso) && recurso != 5) asignarFiltro(b, "Ofrezco");
						else quitarFiltro(b, "Ofrezco", ["Busco", "Tipo", "Carencia", "Tiempo"]);
						break;
					case 1: if ((busco != recurso) && recurso != 5) asignarFiltro(b, "Busco");
						else quitarFiltro(b, "Busco", ["Ofrezco", "Tipo", "Carencia", "Tiempo"]);
						break;
					case 2: switch(recurso){
							case 1: if (ofrezco_cantidad != busco_cantidad) asignarFiltro(b, "Tipo");
								else quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
							case 2: if (ofrezco_cantidad <= busco_cantidad) asignarFiltro(b, "Tipo");
								else quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
							case 3: if (ofrezco_cantidad >= busco_cantidad) asignarFiltro(b, "Tipo");
								else quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
							case 4: quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
						} break;
					case 3: switch(recurso){
							case 1: if (carencia == true) asignarFiltro(b, "Carencia");
								else quitarFiltro(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]);
								break;
							case 2: quitarFiltro(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]);
								break;
						} break;
					case 4: switch(recurso){
							case 1: if (tiempo > (60*60)) asignarFiltro(b, "Tiempo");
								else quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
							case 2: if (tiempo > (2*60*60)) asignarFiltro(b, "Tiempo");
								else quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
							case 3: if (tiempo > (3*60*60)) asignarFiltro(b, "Tiempo");
								else quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
							case 4: quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
						} break;
				}
			}

			// Para mantener un unico sombreado por cada filtro, activa el que se ha seleccionado y elimina
			// el resto de su tipo
			for (var i = 0; i < 5; i++){
				for (var j = 0; j < 6; j++){
					var a = find("//td[@id='filtro" + i + j + "']", XPFirst);
					if (a){
						if (i == tipo && j == (recurso - 1)){
							a.setAttribute("style", "background-color:#F5F5F5");
						}else if (i == tipo){
							a.removeAttribute("style");
						}
					}
				}
			}
		};
		return funcion;
	}

	/**
	 * Establece filtros por tipo de recurso y proporcion de intercambio en las oferta de venta del 
	 * mercado
	 */
	function filtrosMercado(){
		var table = document.createElement("TABLE");
		table.setAttribute("class", "tbg");
		table.setAttribute("style", "width:100%");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");

		// Se crea la tabla con 3 filas, Ofrezco, Busco y Tipo
		var etiquetas = [T('OFREZCO'), T('BUSCO')];
		for (var j = 0; j < 2; j++){
			var tr = document.createElement("TR");
			tr.appendChild(elem("TD", etiquetas[j]));
			// Para Ofrezco y Busco se muestran 4 materiales y un quinto comodin
			for (var i = 0; i < 4; i++){
				var td = document.createElement("TD");
				td.setAttribute("id", "filtro" + j + i);
				//# TMR 
				var ref = elem("A", "<img src='data:image/gif;base64," + imagenes['res'+i] + "' width='18' height='12' border='0' title='" + T('RECURSO' + (i+1)) + "'>");
				td.addEventListener("click", funcionFiltrosMercado(j, i+1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			}
			var td = document.createElement("TD");
			td.setAttribute("style", "background-color:#F5F5F5");
			td.setAttribute("id", "filtro" + j + "4");
			var ref = elem("A", T('CUALQUIERA'));
			ref.setAttribute("href", "javascript:void(0)");
			td.addEventListener("click", funcionFiltrosMercado(j, 5), 0);
			td.appendChild(ref);
			tr.appendChild(td);
			table.appendChild(tr);
		}

		// La fila del tipo especifica transacciones 1:1 o 1:x
		var tr = document.createElement("TR");
		tr.appendChild(elem("TD", T('TIPO')));
		table.appendChild(tr);
		var etiquetas_tipo = ["1:1", "1:>1", "1:<1", "1:x"];
		for (var i = 0; i < 4; i++){
			var td = document.createElement("TD");
			td.setAttribute("id", "filtro" + 2 + i);
			if (i == 3) td.setAttribute("style", "background-color:#F5F5F5");
			var ref = elem("A", etiquetas_tipo[i]); 
			ref.setAttribute("href", "javascript:void(0)"); 
			td.addEventListener("click", funcionFiltrosMercado(2, (i+1)), 0);
			td.appendChild(ref); 
			tr.appendChild(td);
		}
		tr.appendChild(document.createElement("TD"));

		var tr = document.createElement("TR");
		tr.appendChild(elem("TD", T('MAXTIME')));
		table.appendChild(tr);
		var etiquetas_tipo = ["1", "2", "3", ">3"];
		for (var i = 0; i < 4; i++){
			var td = document.createElement("TD");
			td.setAttribute("id", "filtro" + 4 + i);
			if (i == 3) td.setAttribute("style", "background-color:#F5F5F5");
			var ref = elem("A", etiquetas_tipo[i]); 
			ref.setAttribute("href", "javascript:void(0)"); 
			td.addEventListener("click", funcionFiltrosMercado(4, (i+1)), 0);
			td.appendChild(ref); 
			tr.appendChild(td);
		}
		tr.appendChild(document.createElement("TD"));

		var tr = document.createElement("TR");
		tr.appendChild(elem("TD", T('DISPONIBLE')));
		table.appendChild(tr);
		var etiquetas_carencia = [T('SI'), T('NO')];
		for (var i = 0; i < 2; i++){
			var td = document.createElement("TD");
			td.setAttribute("colspan", "2");
			td.setAttribute("id", "filtro" + 3 + i);
			if (i == 1) td.setAttribute("style", "background-color:#F5F5F5");
			var ref = elem("A", etiquetas_carencia[i]);
			ref.setAttribute("href", "javascript:void(0)");
			td.addEventListener("click", funcionFiltrosMercado(3, (i+1)), 0);
			td.appendChild(ref);
			tr.appendChild(td);
		}
		tr.appendChild(document.createElement("TD"));

		// Busca la tabla de ofertas y la inserta justo antes
		var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]", XPFirst);
		if(!a)  return;
		var p = document.createElement("P");
		p.appendChild(table);
		a.parentNode.insertBefore(p, a);
	}

				function crearFuncionExplorarUnidades(id, coste){
								var funcion = function (){
												var a = find("//input[@type='text']", XPList).snapshotItem(id - 1);
												var b = find("//div[@name='exp" + id + "']", XPFirst);
												var c = calculateResourceTime(arrayByN(coste, a.value));
												if (c) b.innerHTML = c; else b.innerHTML = '';
								};
								return funcion;
				}

				function tiempoExplorarUnidades(){
								if (!find("//form[@name='snd']//input[@type='image' and @value='ok']", XPFirst)) return;
								var a = find("//table[@class='tbg']//tr[not(@class)]//table[@class='f10']", XPList);
                for (var i = 0; i < a.snapshotLength; i++){
                  var b = a.snapshotItem(i);
	            		var c = b.getElementsByTagName("TD")[2].textContent.split(" ")[0].split("|");
 
								//var a = find("//table[@class='tbg']//tr[@bgcolor]", XPList);
								//for (var i = 0; i < a.snapshotLength; i++)
								//				var b = a.snapshotItem(i);
								//				var c = b.getElementsByTagName("TABLE")[0].getElementsByTagName("TD")[2].textContent.split(" ")[0].split("|");
												
												var div = document.createElement("DIV");
												div.setAttribute("name", "exp" + (i+1));
												var tr = document.createElement("TR");
												var td = document.createElement("TD");
												td.setAttribute("colspan", "2");
												td.setAttribute("class", "c f7 s7");
												td.appendChild(div);
												tr.appendChild(td);

												// FIXME: Apa�o para Firefox. FF mete un nodo extra al principio de la tabla
												//var d = b.getElementsByTagName("TABLE")[0].childNodes;
												//d[d.length - 1].appendChild(tr);
                        // FIXME: Apanyo para Firefox. FF mete un nodo extra al principio de la tabla
                        var d = b.childNodes;
                        d[d.length - 1].appendChild(tr);
                        b.parentNode.parentNode.getElementsByTagName("INPUT")[0].addEventListener("keyup", crearFuncionExplorarUnidades((i+1), c), 0);

												//b.getElementsByTagName("INPUT")[0].addEventListener("keyup", crearFuncionExplorarUnidades((i+1), c), 0);
												//  populate on load with the time to create 1 troop
												var a2 = find("//input[@type='text']", XPList).snapshotItem(i);
												if(a2.value==0) { 
													var a2val=1;
												}
												else	{
													var a2val=a2.value;
												}
												var b2 = find("//div[@name='exp" + (i+1) + "']", XPFirst);
												var c2 = calculateResourceTime(arrayByN(c, a2val));
												if (c2) b2.innerHTML = c2; else b2.innerHTML = '';
								}
				}

				function tiempoExplorar(){
								var a = find("//table[@class='tbg']//tr[@class='cbg1']", XPFirst);
								
								if (a == null || (a.childNodes.length != 2 && a.childNodes.length != 4)) return;

            		var a = a.parentNode.childNodes;
            		for (var i = 1; i < a.length; i++){
            			var b = a[i];
            			if (b.getElementsByTagName == null)  continue;
            			var c = b.getElementsByTagName("DIV");
            			if (c.length == 2 && c[1].className == 'c'){
            				var d = b.getElementsByTagName("TD")[3].textContent.split("|").splice(0,4);
            				if(d[0].search(/[\d+\-]/) == -1) //fix for city hall 
            				  d = b.getElementsByTagName("TD")[2].textContent.split("|").splice(0,4);
            				var e = calculateResourceTime(d);
            				if (e) c[1].innerHTML = e;
            			}
            		}
            		
		// FIXME: Apa�o para Firefox. FF mete varios nodos extras entre las columnas
								/*if (a == null || (a.childNodes.length != 2 && a.childNodes.length != 4)) return;

								var a = a.parentNode.childNodes;
								for (var i = 1; i < a.length; i++){
												var b = a[i];
												if (b.getElementsByTagName == null)
												{
													continue;
												}
												var c = b.getElementsByTagName("DIV");
												if (c.length == 2 && c[1].className == 'c'){
																var d = b.getElementsByTagName("TD")[3].textContent.split("|").splice(0,4);
																var e = calculateResourceTime(d);
																if (e) c[1].innerHTML = e;
												}
								}*/
				}

				/**
				 * Modifica el valor por defecto del tipo de ataque a enviar
				 */
				function ataqueDefecto(){
								var accion = 4; // 2 -> Apoyo, 3 -> Ataque, 4 -> Atraco

								//var cities = find("//div[preceding-sibling::div[@class='div4']]//table[@class='f10']", XPFirst);
								var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
								if(cities && location.href.search(/z=(\d+)/) >= 0){
												var z = RegExp.$1;
												cities = cities.firstChild;
												for (var i = 0; i < cities.childNodes.length; i++){
																var city = cities.childNodes[i];
				city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
																var id = xy2id(RegExp.$1, RegExp.$2);
																if (id == z) accion = 2;
												}
								}

								if(find("//input[@name='c' and @value='" + accion + "']", XPFirst))
								  find("//input[@name='c' and @value='" + accion + "']", XPFirst).checked = true;
				}

	/**
	 * Inserta un nuevo marcador y lo almacena
	 *
	 * Params:
	 *	texto:	Texto del marcador
	 *	enlace:	Enlace a donde apunta el marcador
	 */
	function agregarElementoCookie(cookie, values){
		var nuevo = '';
		for (var i = 0; i < values.length; i++){ 
			if (values[i] != ''){ 
				nuevo += values[i]; 
				if (i != values.length - 1) nuevo += '$'; 
			}else return;
		}
		var a = readCookie(cookie + "_" + server);
		if (a != null && a != '') a += "$$" + nuevo;
		else a = nuevo;
		createCookie(cookie + "_" + server, a, 365);
	}

	/**
	 * Crea el evento de eliminar un marcador. Lo elimina y ademas refresca la lista donde estan mostrados
	 *
	 * Params:
	 * 	num:	Identificador de marcador a eliminar
	 */
	function crearEventoEliminarCookie(cookie, num, funcion){
								return function(){
			var a = readCookie(cookie + "_" + server);
			if (a != null){
				a = a.split("$$");
				a.splice(num, 1);
				createCookie(cookie + "_" + server, a.join("$$"), 365);
				removeElement(find("//*[@id='" + cookie + "']", XPFirst));
				funcion();
			}
		}
	}

	/**
	 * Recupera los marcadores almacenados. Dos marcadores estan separados por el simbolo $$ y
	 * en cada marcador el enlace y el texto estan separados por $. No se espera encontrar esos simbolos
	 * en el texto o en los enlaces, ya que de lo contrario fallaria.
	 *
	 * Returns:
	 *	Un array con cada uno de los marcadores
	 */
	function obtenerValorCookie(cookie){
		// Importar marcadores de versiones antiguas del script
		// FIXME: Eliminar dentro de unas cuantas versiones
		var b = readCookie(cookie); if (b != null && b != ''){ createCookie(cookie + "_" + server, b, 365); eraseCookie(cookie); }

		var res = new Array();
		var a = readCookie(cookie + "_" + server);
		if (a != null && a != ''){
			a = a.split("$$");
			for (var i = 0; i < a.length; i++) res[i] = a[i].split("$");
		}
		return res;
	}

	/**
	 * Muestra los marcadores almacenados
	 */
	function mostrarMarcadores(){
		// Intenta insertarlos en la lista derecha, si no existe la crea
		/*var ba = find("//div[preceding-sibling::div[@class='div4'] and @id='ba']", XPFirst);
		if (!ba){
			ba = document.createElement("DIV");
			ba.setAttribute("style", "position:absolute; z-index:5; border: 0px solid #000000; left: 700px; top: 100px;");
			ba.setAttribute("id", "ba");
			insertAfter(find("//div[@class='div4']", XPFirst), ba);
		}*/
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba){
			ba = document.createElement("DIV");
			ba.setAttribute("id", "lright1");
			find("//body", XPFirst).appendChild(ba);
		}
		var div = document.createElement("DIV");
		var titulo = elem("B", T('MARCADORES') + ":");
		var enlace = elem("A", T('ANYADIR'));
		var tabla = document.createElement("TABLE");
		tabla.setAttribute("class", "f10");
		div.setAttribute("id", "marcadores");
		enlace.href = "javascript:void(0);";
		// Al anyadir se pide el texto y el enlace, si se cancela o se deja vacio alguno se aborta
		// Despues de insertar se refresca la lista volviendola a insertar
		enlace.addEventListener("click", function(){ 
								var a = prompt(T('ENLACE')); 
								if (a == null || a == '') return;
								var b = prompt(T('TEXTO'));
								if (b == null || b == '') return;
								agregarElementoCookie("marcadores", [b, a]); 
								removeElement(find("//div[@id='marcadores']", XPFirst));
								mostrarMarcadores();
						}, 0);
		titulo.setAttribute("class","f10");
		div.appendChild(titulo);
		div.appendChild(document.createTextNode(" (")); div.appendChild(enlace); div.appendChild(document.createTextNode(")"));
		div.appendChild(tabla);
		var p = document.createElement("P");
		p.appendChild(div);
		ba.appendChild(p);
		div.parentNode.setAttribute('style', 'white-space:nowrap');
		//ba.appendChild(div);
    
	showbookmarks = readCookie("showbookmarks");

    if(showbookmarks==true || showbookmarks == null) {
      // TMR - set bookmarks.
      var arrCities = new Array();           
      var cities = find("//div[@id='lright1']/table[@class='f10']/tbody", XPFirst);
      if (cities != null && cities.firstChild != null){
    		for (var i = 0; i < cities.childNodes.length; i++){
    			// Utiliza el texto de las coordenadas para averiguar el ID necesario para los enlaces
    			var city = cities.childNodes[i];
    			city.innerHTML.search(/newdid=(\d+)/);
    			var newdid=RegExp.$1;
    			arrCities.push(newdid);
    		}
    	}
      
      var bookmarks = new Array();
      bookmarks.push('Akademia::build.php?gid=22');
      bookmarks.push('Kuźnia::build.php?gid=13');
      bookmarks.push('Kaszary::build.php?gid=19');
      bookmarks.push('Zbrojownia::build.php?gid=12');
      //bookmarks.push('Brickworks::build.php?gid=6');
      //bookmarks.push('Embassy::build.php?gid=18');
      //bookmarks.push('Flour Mill::build.php?gid=8');
      //bookmarks.push('Foundry::build.php?gid=5');
      //bookmarks.push('Granary::build.php?gid=11');
      bookmarks.push('Dwór bohaterów::build.php?gid=37');
      //bookmarks.push('Main Building::build.php?gid=15');
      bookmarks.push('Rynek::build.php?gid=17');
      bookmarks.push('Pałac::build.php?gid=26');
      bookmarks.push('Miejsce zbiórki::build.php?gid=16');
      bookmarks.push('Rezydencja::build.php?gid=25');
      //bookmarks.push('Sawmill::build.php?gid=7');
      bookmarks.push('Warsztat::build.php?gid=21');
      bookmarks.push('Stajnia::build.php?gid=20');
      bookmarks.push('Ratusz::build.php?gid=24');
      //bookmarks.push('Warehouse::build.php?gid=10');
      
      //
      //bookmarks.push('Workshop::build.php?gid=20');
      //bookmarks.push('Culture Points::build.php?gid=25&s=2');
      for (var i = 0; i < bookmarks.length; i++){
        var temp=bookmarks[i].split('::');
  			var tr = document.createElement("TR");
  			var RG=new RegExp(temp[1]);
  			var class='';
  			if(location.href.substring(location.href.length-temp[1].length,location.href.length) == temp[1]) //highlight if we're on this page
  			  class='class=c2';
  			var td = elem("TD", "<span "+class+">&#8226;</span>&nbsp; <a href='" + temp[1] + "'>" + temp[0] + "</a>");
  			td.style.whiteSpace='nowrap';
  			tr.appendChild(td);
  			for(var j = 0; j < arrCities.length; j++){
  				td = elem("TD", "<a href='" + temp[1] + "&newdid=" + arrCities[j] + "'> " + (j + 1) + " </a>");
   				tr.appendChild(td);			
  			}
  			tabla.appendChild(tr);
  		}
  	}
    
		// Se obtienen los marcadores y se insertan junto con un enlace para eliminarlos
		var marcadores = obtenerValorCookie("marcadores");
		for (var i = 0; i < marcadores.length; i++){
			var tr = document.createElement("TR");
			var td = elem("TD", "<span>&#8226;</span>&nbsp; <a href='" + marcadores[i][1] + "'>" + marcadores[i][0] + "</a>");
			//# TMR 
			var enlace = elem("A", " <img src='data:image/gif;base64," + imagenes["del"] + "' width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>");
			enlace.href = "javascript:void(0);";
			enlace.addEventListener("click", crearEventoEliminarCookie("marcadores", i, mostrarMarcadores), 0);
			td.appendChild(enlace);
			tr.appendChild(td);
			tabla.appendChild(tr);
		}
	}

	/**
	 * Crea enlaces directos en la lista de aldeas para enviar tropas o enviar comerciantes
	 */
	function cityLinks(){
		// Localiza la lista de aldeas
		//var cities = find("//div[preceding-sibling::div[@class='div4']]//table[@class='f10']", XPFirst);
		
		
		var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);

		if (!cities) return;
		
		if (find("//img[contains(@src, 'travian1.gif')]", XPFirst)) //if Plus, then...
		{
			var village = find("//span[@class='f10 c0 s7 b']", XPFirst); // Villages:
			village.parentNode.removeChild(village);
			var tabla = document.createElement("table");
			var fila = document.createElement("TR");
			
			var foo = '<TD><a href="dorf3.php"><span class="f10 c0 s7 b">Villages\n</span></a></TD><TD><a href="dorf3.php?s=2"><span class="f10 c0 s7 b">Resources\n</span></a></TD><TD><a href="dorf3.php?s=3"><span class="f10 c0 s7 b">Warehouse\n</span></a></TD><TD><a href="dorf3.php?s=4"><span class="f10 c0 s7 b">CP\n</span></a></TD><TD><a href="dorf3.php?s=5"><span class="f10 c0 s7 b">Troopsies\n</span></a></TD>';	
			
			fila.innerHTML+= foo;
			tabla.appendChild(fila);
			cities.parentNode.insertBefore(tabla, cities);
			cities.parentNode.setAttribute('style','white-space:nowrap');
		}
		
		cities = cities.firstChild;
		var currentCityID = getCurrentCityID();
		
		find("//td[@class='menu']", XPFirst).childNodes[5].href.search(/uid=(\d+)/);
		var uid = RegExp.$1 + "";
		
		var prefs = readTroopPrefs("troopPrefs" + uid); // Array of arrays of troop preferences... [cityIndex][unitNums]

		for (var i = 0; i < cities.childNodes.length; i++){
			// Utiliza el texto de las coordenadas para averiguar el ID necesario para los enlaces
			var city = cities.childNodes[i];
			city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
			//alert(city.innerHTML);
			//alert(city.textContent);
			var x=RegExp.$1;
			var y=RegExp.$2;
			var id = xy2id(x, y);
			city.innerHTML.search(/newdid=(\d+)/);
			var newdid=RegExp.$1;
			
			city.textContent.search(/\s+(.*)\n/);
			var cityname=RegExp.$1;
			
			city.appendChild(elem("TD", "<a href='a2b.php?z=" + id + "&dname="+cityname+"'><img src='data:image/gif;base64," + imagenes["def2"] + "' width='12' border='0' title='Send Reinforcements'></a>"));
			
			if(location.href.match(/build.php\?(.*)gid=17/))  { //# TMR if we're on the marketplace, populate X,Y coordinate with village's
			  var findstr="\"document.getElementsByName('dname')[0].value='"+cityname+"';document.getElementsByName('x')[0].value='"+x+"';document.getElementsByName('y')[0].value='"+y+"';\"";
			  city.appendChild(elem("TD", "<a accesskey="+(i+1)+" href='javascript:void(0);' onclick="+findstr+"><img src='data:image/gif;base64," + imagenes["res3"] + "' height='12' border='0' title='" + T('ENVIAR') + " - Populate X,Y'></a>"));
			}
			else
			  city.appendChild(elem("TD", "<a href='build.php?z=" + id + "&gid=17&dname="+cityname+"'><img src='data:image/gif;base64," + imagenes["res3"] + "' height='12' border='0' title='" + T('ENVIAR') + "'></a>"));
			  city.appendChild(elem("TD", "<a href='build.php?newdid="+ newdid +"&z=" + currentCityID + "&gid=17&dname="+cityname+"' title='" + T('GETRES') + "'>G</a>"));
			city.appendChild(elem("TD", "<a href='dorf1.php?newdid=" + newdid + "' title='Village Overview'>O</a>"));
			city.appendChild(elem("TD", "<a href='dorf2.php?newdid=" + newdid + "' title='Village Center'>C</a>"));
			if(location.href.match(/karte.php/))  { //# TMR if we're on the map, populate X,Y coordinate with village's
			  var findstr="\"document.getElementsByName('xp')[0].value='"+x+"';document.getElementsByName('yp')[0].value='"+y+"';\"";
			  city.appendChild(elem("TD", "<a accesskey="+(i+1)+" href='javascript:void(0);' onclick="+findstr+" title='Center Map - Populate X,Y'>M</a>"));
			}
			else  {
  		  city.appendChild(elem("TD", "<a href='karte.php?newdid=" + newdid + "' title='Center Map'>M</a>"));
  		}
	  		if(prefs && prefs.length == cities.childNodes.length)
	  		{
		  		
	  			var troops = prefs[i];
	  			
	  			for(var j = 0; j < troops.length; j++)
	  			{
		  			if((troops[j]+"").length > 0)
	  				{
		  				city.appendChild(elem("TD", "<a href=" + getUnitBuilding(troops[j]) + "&newdid=" + newdid + "><img src='data:image/gif;base64," + imagenes["unit" + troops[j]] + " /></a>"));
		  			}
	  			}
			}
		}
	}
	
	/**
	 * Returns the ID of the current city (often referred to as Z)
	 */	
	function getCurrentCityID(){
			var xy = getCurrentCityXY();
			return xy2id(xy[0], xy[1]);
	}
	
	/**
	 * Returns an array containing the xy co-ordinates of the current city.  0 is X, 1 is Y
	 */	
	function getCurrentCityXY(){
		var xy = new Array();

		var activeX;
		var activeY=0;
		if(find("//a[@class='active_vl']",XPFirst) == null) {
			xy.push(0);
			xy.push(0);
		}
		else  {
			find("//a[@class='active_vl']",XPFirst).parentNode.nextSibling.textContent.match(/\(([-\d]+)\n\|\n([-\d]+)\)/);
			xy.push(RegExp.$1);
			xy.push(activeY=RegExp.$2);
		}
		return xy;
	}

	/**
	 * Convierte todos los enlaces a la propia pagina del tipo "#" como enlaces vacios de javascript
	 */
	function sanearEnlaces(){
		var a = find("//a[@href='#']", XPList);
		for (var i = 0; i < a.snapshotLength; i++) a.snapshotItem(i).href = 'javascript:void(0)';
	}

	/**
	 * Muestra una tabla en la pagina de perfil con los valores almacenados en cookies por el script
	 */
	function mostrarConfiguracion(){
		var a = find("//form", XPFirst);
		var tabla = document.createElement("TABLE");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("id", "configuracion");

		var fila = document.createElement("TR");
		var td = elem("TD", "Travian Beyond");
		//.setAttribute("class", "rbg");
		td.setAttribute("style","font-weight:bold;background-image: url(data:image/gif;base64,"+imagenes["c2"]+")");
		td.setAttribute("colspan", "2");
		fila.appendChild(td);
		tabla.appendChild(fila);

// Parametros reconocidos
		var parametros = ["desp","desp2", "marcadores_" + server, "notas_" + server, "ventas_" + server, "alliance_list"];
		var parameterDescriptions = {};
		parameterDescriptions["desp"] = "7x7 map movement";
		parameterDescriptions["desp2"] = "13x13 map movement";
		parameterDescriptions["marcadores_" + server] = "Bookmarks";
		parameterDescriptions["notas_" + server] = "Notepad";
		parameterDescriptions["ventas_" + server] = "Marketplace sales";
		parameterDescriptions["alliance_list"] = "Highlighted alliances";

		for (var i = 0; i < parametros.length; i++){
			fila = document.createElement("TR");
			fila.appendChild(elem("TD", parameterDescriptions[parametros[i]]));
			var valor = readCookie(parametros[i]);
			fila.appendChild(elem("TD", "<input type='text' name='" + parametros[i] + "' value='" + (valor != null ? valor : '') + "' class='fm' style='width:275px;'/>"));
			tabla.appendChild(fila);
		}
		
		parametros.push("showbookmarks");
		parameterDescriptions["showbookmarks"] = "Show hardcoded bookmarks";
		
		
		fila = document.createElement("TR");
		fila.appendChild(elem("TD", "Show hardcoded bookmarks"));
		var valor = readCookie("showbookmarks");
		fila.appendChild(elem("TD", "<input type='checkbox' name='showbookmarks' " + (valor == true ? 'checked' : '') + "/>"));
		
		tabla.appendChild(fila);
		
		insertAfter(a, tabla);

		var imagen = document.createElement("IMG");
		imagen.setAttribute("src", "data:image/gif;base64,"+imagenes["ok1"]);
		imagen.addEventListener("click", function(){
						var parametros = get('configuracion').getElementsByTagName("INPUT");
						for (var i = 0; i < parametros.length - 1; i++) {createCookie(parametros[i].name, parametros[i].value, 365);}
						createCookie(parametros[parametros.length-1].name, parametros[parametros.length-1].checked, 365);
						alert(T('GUARDADO'));
		}, 0);
		var p = document.createElement("P");
		p.setAttribute("align", "center");
		p.appendChild(imagen);
		insertAfter(tabla, p);
		
		villageTroopPreferences();
  }
  
  // sets troop preferences per village, adds images to city links and times in mouseover.
  function villageTroopPreferences()
  {
	  //find city list
	  //make them an array, and for each city, show troops for that race.
	  //click selects them
	  //add functionality to city links, too. default = none.
	  //add times for those troops to mouseover.
	  
	  find("//td[@class='menu']", XPFirst).childNodes[5].href.search(/uid=(\d+)/);
	var uid = RegExp.$1 + "";
	  
	  var valor = readCookie("raceOf" + uid);
	  	  
  if(!valor){
	  //Use an XMLHttpRequest to get race... assume not on sitter's profile when updating.
	  
	  //url
	  var url = find("//td[@class='menu']", XPFirst).childNodes[5];
	  var foo = find("//tr[@class='s7']//td", XPList); //Gets race on profile page
	  
	  
	  ajaxRequest(url, "GET", null, getRace, dummy);
	
	  valor = readCookie("raceOf" + uid);
  }
  
  if(valor != null){  
  
  var start;
  
  if(valor.search(/Roman/i) != -1){
	  start = 1;
  }
  if(valor.search(/Teuton/i) != -1){
	  start = 11;
  }
  if(valor.search(/Gaul/i) != -1){
	  start = 21;
  } 
  
  // your villages:
  var right = find("//tbody//tr//td[@class='nbr']", XPList);

  var tabla = document.createElement("table");
  tabla.setAttribute("id", "troopConfig");
  tabla.setAttribute("class", "tbg");
  tabla.setAttribute("cellspacing", "1");
  tabla.setAttribute("cellpadding", "2");
  
  var moo = document.createElement("TR");
	var td = elem("TD", "Villages / Troopsies");
	td.setAttribute("colspan", "11");
	td.setAttribute("style","font-weight:bold;background-image: url(data:image/gif;base64,"+imagenes["c2"]+")");
	moo.appendChild(td);
	tabla.appendChild(moo);
	
  for( i = 0; i < right.snapshotLength; i++)
  {
	  var village = right.snapshotItem(i); //village name is at: village.childNodes[2]
	  var villagename=village.innerHTML.match(/<a\b[^>]*>(.*?)<\/a>/g);
	  var moo = document.createElement("TR");
	  var td=elem("td",villagename);
   	  moo.appendChild(td);
	  for(var j = start; j < start + 10; j++) {
      var td=elem("td",'<td><img src="data:image/gif;base64,' + imagenes["unit" + j] + '" style="border: 2px solid white;width:16px; height:16px" alt="' + getUnitName(j) + '" name="troop' + j + '"  onClick=\'if (this.style.borderColor.indexOf("white")!=-1) {this.style.borderColor="red"; this.className = "selected";} else {this.style.borderColor="white"; this.className = "not";}\'>');
      moo.appendChild(td);
	}
	  moo.setAttribute("class", "unit");
	  moo.setAttribute("id", i);
	  tabla.appendChild(moo);
	
  	//get coordinates: village[0] = x, y = [1];
  //	village = bar.innerHTML.replace(/\n/gi, "").split(/<[^<>]+>/).join("").replace(/[()]/g, "").split("|");
	
  //	id = xy2id(village[0], village[1]);
  }
	insertAfter(find("//table[@id='configuracion']", XPFirst).nextSibling, tabla);
	
	var prefs = readTroopPrefs("troopPrefs" + uid); //Select currently selected troops
	
	if(prefs)
	{
		for(i = 0; i < right.snapshotLength; i++)
		{
			var troops = prefs[i];
			
				for(j = 0; j < troops.length; j++)
				{
					var rawr = find('//tr[@id='+ i + ']//img[@name="troop' + troops[j] + '"]', XPFirst);
					if(rawr)
					{
						rawr.style.borderColor="red";
						rawr.className = "selected";
					}
				}
			}
	}
  
  var moo = document.createElement("TR");
  var td=elem("td",'');
  td.setAttribute("colspan",11);
  var imagen = document.createElement("IMG");
	imagen.setAttribute("src", "data:image/gif;base64,"+imagenes["ok1"]);
	imagen.addEventListener("click", function(){
					var villages = find("//tbody//tr//td[@class='nbr']", XPList);
					var foo = new Array(villages.snapshotLength);
					find("//td[@class='menu']", XPFirst).childNodes[5].href.search(/uid=(\d+)/);
					var uid = RegExp.$1 + "";
					var prefs = find("//img[@class='selected']", XPList);
					//alert(prefs.snapshotLength);
					for (var j = 0; j < prefs.snapshotLength; j++) 
					{
						foo[prefs.snapshotItem(j).parentNode.parentNode.id * 1].push(prefs.snapshotItem(j).name.replace("troop", "")*1);
					}
					for(var i = 0; i < foo.length; i++){ foo[i] = "[" + foo[i].join(",") + "]";}
					foo = foo.join("");
          createCookie("troopPrefs" + uid, foo, 365);
					alert(T('GUARDADO'));
	}, 0);
	//tabla.lastChild.appendChild(imagen);
	td.appendChild(imagen);
	moo.appendChild(td);
	tabla.appendChild(moo);
//	var p = document.createElement("P");
//	p.setAttribute("align", "center");
//	p.appendChild(imagen);
//	insertAfter(find("//table[@id='troopConfig']", XPFirst), p);
	}
 }
 function getRace(t)
 {
	var ans = document.createElement('DIV');
	ans.innerHTML = t.responseText;
	var ansdoc = document.implementation.createDocument("", "", null);
	ansdoc.appendChild(ans);
	
	var foo = ansdoc.evaluate("//tr[@class='s7']", ans, null, XPFirst, null);
	
	createCookie("race", foo.childNodes[1].innerHTML, 365);
 }
 
 function readTroopPrefs(string)
 {
	 // wrote as: [a,b,c][a,b,c]
	 //CHANGE TO MATCH!!! durrr
	 
	 var foo = readCookie(string);
	 //alert(foo);
	 if(!foo) return; //If there is no cookie
	 
	 var moo = new Array();
	 var temp;
	 
	 foo = foo.match(/\[[^\[\]]*\]/g);
	 if(!foo) return; //If no troops are saved as a preference.
	 
	 for(var i = 0; i < foo.length; i++)
	 {
		moo[i] = foo[i].replace(/[\[\]]/g, "").split(",");
	 }
	 
	 return moo;
 }

	/**
	 * Calcula y muestra el tiempo que ha tardado desde el inicio de ejecucion del script
	 */
	function calcularTiempoEjecucion(){
		var tiempo = new Date().getTime() - tiempo_ejecucion;
		//var div = find("//div[@class='div3']", XPFirst);
		var div = find("//div[@id='ltime']", XPFirst);
		// TMR - put this on the same line, not down in the graphics...
		//div.appendChild(elem("P", "TB: " + tiempo + " ms"));
		div.innerHTML=div.innerHTML.replace(" ms<br>",'ms.&nbsp;Beyond: <b>'+tiempo+'</b>ms<br>');
	}

	/**
	 * Procesa una respuesta XmlHttpRequest de la pagina de una casilla para mostrar un tooltip con 
	 * informacion sobre sus recursos
	 */
	function procesarCasilla(t){ 
		if (timeout == 0) return;

		// Solo hay 6 tipos de casillas
		var dist = [
			[3, 3, 3, 9],
			[3, 4, 5, 6],
			[4, 4, 4, 6],
			[4, 5, 3, 6],
			[5, 3, 4, 6],
			[1, 1, 1, 15]
		];

		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = document.createElement('DIV');
		ans.innerHTML = t.responseText;
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		//var res = ansdoc.evaluate("//img[@class='rf0']", ans, null, XPFirst, null).singleNodeValue;
    var isfield=0;
		// Parece haber dos versiones del juego, asi que se contemplan las dos
		if (ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue)  {
			ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue.id.search(/f(\d)/);
			isfield=1;
		}
		else {
		  isfield=2;
		  ansdoc.evaluate("//img[@id='resfeld']", ans, null, XPFirst, null).singleNodeValue.src.search(/\/f(\d)\.jpg$/);
		}
		

		var txt1=new Array();
  	//if(res.src.search(/\/f(\d)\.jpg$/)!=-1) //village - has resources
  	if(isfield==1)  {
  		var info = dist[RegExp.$1 - 1];
  		for (var i = 1; i < 5; i++) 
  		  txt1.push('<img src="data:image/gif;base64,' + imagenes["res"+(i-1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + i) + '">' + info[i-1] + ' ');
  	}

    //oasis info
		var res2 = ansdoc.evaluate('//table[preceding-sibling::div[@class="f10 b"]]', ans, null, XPFirst, null).singleNodeValue;
		var txt2=new Array();
		if(res2 != null)  {
  		//if(res.src.search(/m\/w\d+\.jpg/) != -1)  //oasis
  		if(isfield==2)  {
    		var unittext=res2.textContent.match(/\s(\d+)([a-z ]+)/gi);
    		if(unittext!=null)  {
      		var unitimg=res2.innerHTML.match(/(\d+)(?=\.gif)/g);
      		for(var i = 0; i<unitimg.length; i++) {
      		  var imgtxt='<img src="data:image/gif;base64,' + imagenes["unit"+unitimg[i]] + '" width="16" height="16" border="0">';
      		  unittext[i].match(/(\d+)([a-z ]+)/i);
      		  txt2.push(imgtxt+'&nbsp;'+RegExp.$1+'&nbsp;'+RegExp.$2+'<br/>');
      		}
      	}
      	else  { //should only get this if there's no units?
      	  txt2.push('No Nature Units - Unoccupied/Available');
      	}
      }
  	}
  	if(txt1.length || txt2.length)  {
    	var div = get("tb_tooltip");
  		div.style.display = 'block';
  		div.innerHTML=txt1.join('')+txt2.join('');
  	}
	}

	/**
	 * Actualiza la posicion del tooltip. Solo puede haber un tooltip a la vez porque solo hay un puntero de cursos
	 */
	function updateTooltip(e){
		var div = get("tb_tooltip");
		//if(div.clientWidth==0 || div.clientHeight==0) return;
		if(div.clientWidth!=0 && e.pageX+5+div.clientWidth - document.documentElement.scrollLeft > document.documentElement.clientWidth)
		  div.style.left = (e.pageX - 5 - div.clientWidth) + "px";
		else
  		div.style.left = (e.pageX + 5) + "px";
  		
  	if(div.clientHeight!=0 && e.pageY+5+div.clientHeight - document.documentElement.scrollTop > document.documentElement.clientHeight)
		  div.style.top = (e.pageY - 5 - div.clientHeight) + "px";
		else
  		div.style.top = (e.pageY + 5) + "px";
	}

	/**
	 * Crea el objeto usado para meter la informacion del tooltip
	 */
	function crearTooltip(){
		var div = document.createElement("DIV");
		div.setAttribute("id", "tb_tooltip");
		div.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 100000; border: solid 1px #00C000; background-color: #FEFFE3; display: none;");
		document.body.appendChild(div);

		// Solo puede haber un tooltip simultaneamente
		document.addEventListener("mousemove", updateTooltip, 0);
	}

	/**
	 * Crea el evento de cuando se coloca el raton sobre una casilla del mapa
	 *
	 * Params:
	 *	href: URL de la casilla
	 */
	function crearEventoRecursosCasilla(href){
		// Espera 1 segundo antes de realizar la peticion asincrona
		return function(){ timeout = setTimeout(function(){ ajaxRequest(href, "GET", null, procesarCasilla, dummy); }, map_tooltipDelay); }; // TMR 14:44 map_tooltipDelay is at the beginning of the file
	}

	/**
	 * Agrega un evento para mostrar la informacion de recursos sobre las casillas del mapa
	 */
	function infoRecursos(){
		if(location.href.match(/karte.php/)) {
      var plus=0;
      var casillas = find("//img[starts-with(@class, 'mt')]", XPList);
      var areas = find("//map//area[@shape='poly' and not(@onclick)]", XPList);
    }
    else  {
      plus=1;
      var casillas = find("//img[starts-with(@style, 'position') and not (@usemap)]", XPList);
      var areas = find("//map//area[@shape='poly']", XPList);
    }
    //var casillas = find("//img[starts-with(@class, 'mt')]", XPList);
		//var areas = find("//map[@name='map2']//area[@shape='poly   //alert(areas.snapshotLength);
    
		for (var i = 0; i < casillas.snapshotLength; i++){
			if (casillas.snapshotItem(i).src.match(/\/(o|d|t)\d*.gif$/)){
				var area = areas.snapshotItem(i);
				if(plus)  {
  		    area.getAttribute("onclick").match(/"(karte.*)"/);
  		    area.href=RegExp.$1;
  		  }
  		  if(area.getAttribute("onmouseover").search(/Occupied oasis/)!=-1)
  		    continue;
				area.addEventListener("mouseover", crearEventoRecursosCasilla(area.href), 0);
				area.addEventListener("mouseout", function(){ clearTimeout(timeout); timeout = 0; get("tb_tooltip").style.display = 'none'; }, 0);
			}
		}
	}

	/**
	 * Funcion que realiza una peticion XML asincrona
	 *
	 * Params:
	 *	url: Direccion a la que realizar la peticion
	 *	method: Metodo de la peticion. Puede ser GET o POST
	 *	param: Parametros codificados como URI (solo con POST, null si no se usan)
	 *	onSuccess: Funcion a invocar cuando se reciba el resultado
	 *	onFailure: Funcion a invocar si la peticion falla
	 */
	function ajaxRequest(url, method, param, onSuccess, onFailure){
		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.onreadystatechange = function() {
			if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) onSuccess(xmlHttpRequest);
			else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200) onFailure(xmlHttpRequest);
		};
		xmlHttpRequest.open(method, url, true);
		if (method == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttpRequest.send(param);
	}

	function checkUpdate(){
		//var b = find("//td[@class='s3']", XPFirst);
		var b = find("//div[@id='lmid2']", XPFirst);
		var div = document.createElement("DIV");
		div.innerHTML = "<b>Travian Beyond v" + version + "</b><br/>";
		var a = elem("A", T('CHECK'));
		a.setAttribute("href", "javascript:void(0)");
		a.addEventListener("click", function(){ this.parentNode.innerHTML = T('VERSION') + " <img style='vertical-align: bottom;' src='http://www.denibol.com/proyectos/travian_beyond/version.php'/>"; }, 0);
		var div2 = document.createElement("DIV");
		div2.appendChild(a);
		div.appendChild(div2);
		b.appendChild(div);
	}

	function mostrarVentas(){
		if (!find("//input[@type='hidden' and @name='t' and @value='2']", XPFirst)) return;
		find("//form", XPFirst).setAttribute("name", "sell");
    
    find("//select[@name='rid2']", XPFirst).setAttribute("class","fm");//TMR - fix the class on this
		
		var a = find("//input[@type='image' and @name='s1']", XPFirst);
		a.addEventListener("click", function(){ 
			var param = ["m1", "m2", "rid1", "rid2", "d2"];
			var checks = ["d1", "ally"];
			var values = new Array();
			for(var i = 0; i < param.length; i++) eval("values[" + i + "] = find(\"//*[@name='" + param[i] + "']\", XPFirst).value");
			for(var i = 0; i < checks.length; i++){
				try{
					eval("var b = find(\"//*[@name='" + checks[i] + "']\", XPFirst).checked");
					if (b == true) values[i + param.length] = '1'; else values[i + param.length] = '0';
				}catch(e){}
			}
			agregarElementoCookie("ventas", values);
		}, 0);

		var ventas = obtenerValorCookie("ventas");
		if (ventas.length > 0){
			var tabla = document.createElement("TABLE");
			tabla.setAttribute("id", "ventas");
			tabla.setAttribute("class", "tbg");
			tabla.setAttribute("align", "center");
			tabla.setAttribute("cellspacing", "1");
			tabla.setAttribute("cellpadding", "2");

			var tr = document.createElement("TR");
			//tr.setAttribute("class", "rbg");	
			tr.setAttribute("style","font-weight:bold;background-image: url(data:image/gif;base64,"+imagenes["c2"]+")");
			var columnas = [T('OFREZCO'), T('BUSCO'), T('MAXTIME'), T('ALIANZA'), T('VENDER'), T('ELIMINAR')];
			for (var i = 0; i < columnas.length; i++) tr.appendChild(elem("TD", columnas[i]));
			tabla.appendChild(tr);

			for (var i = 0; i < ventas.length; i++){
				var tr = document.createElement("TR");

				//# TMR 
				td = elem("TD", '<img src="data:image/gif;base64,' + imagenes["res"+(ventas[i][2]-1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][2])) + '"> ' + ventas[i][0]); tr.appendChild(td);
				td = elem("TD", '<img src="data:image/gif;base64,' + imagenes["res"+(ventas[i][3]-1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][3])) + '"> ' + ventas[i][1]); tr.appendChild(td);
				
				td = elem("TD", ventas[i][5] == '1' ? ventas[i][4] : T('NO')); tr.appendChild(td);
				td = elem("TD", ventas[i][6] == '1' ? T('SI') : T('NO')); tr.appendChild(td);

				td = elem("TD", '<a href="javascript:void(0);" onClick="sell.m1.value=' + ventas[i][0] + ';sell.m2.value=' + ventas[i][1] + ';sell.rid1.value=' + ventas[i][2] + ';sell.rid2.value=' + ventas[i][3] + ';sell.d2.value=' + ventas[i][4] + ';sell.d1.checked=' + (ventas[i][5] == '1') + (ventas[i][6] ? ';sell.ally.checked=' + (ventas[i][6] == '1') : '') + ';sell.submit();"><img src="data:image/gif;base64,'+imagenes["ok1"]+'" title="' + T('VENDER') + '" alt="' + T('VENDER') + '" border="0"></a>'); tr.appendChild(td);
				tabla.appendChild(tr);

				//# TMR 
				var enlace = elem("A", " <img src='data:image/gif;base64," + imagenes['del'] + "' width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>");
				
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoEliminarCookie("ventas", i, mostrarVentas), 0);
				var td = document.createElement("TD");
				td.appendChild(enlace);
				tr.appendChild(td);;
			}
			insertAfter(a, tabla);
		}
	}

	/*function procesarAldea(t){
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// ID de aldea
		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
		var did = RegExp.$1;
		var mov_tropas = (ansdoc.evaluate("//div[@class='f10 b']", ans, null, XPList, null).snapshotLength == 3) ? true : false;
		var constr = (ansdoc.evaluate("//div[@id='ba']", ans, null, XPList, null).snapshotLength == 2 ? true : false);

		// Materias primas
		var a = '';
		for (var i = 1; i < 5; i++){
			var b = ansdoc.getElementById("l" + i);
			var perc = Math.round((b.innerHTML.split("/")[0] * 100) / b.innerHTML.split("/")[1]);
			var cant = b.innerHTML.split("/")[0];
			// Espero que la "k" sea internacional
			if (cant % 1000 == 0) txt_cant = (cant / 1000) + "k"; else txt_cant = cant;
			var c = '';
			c += '<img src="' + img('r/' + i + '.gif') + '" border="0" title="' + T('RECURSO' + i) + '">';
			c += '<span title="' + b.title + '">' + (cant < 0 ? '<font color="#ff0000">' + txt_cant + '</font>' : txt_cant) + '</span> <span style="font-size:9px; color:#909090" title="' + b.innerHTML + '">(' + perc + '%)</span>';
			a += '<nobr>' + c + '</nobr>';
			if (i != 4) a += " | ";
		}
		find("//td[@id='aldea" + did + "_0" + "']", XPFirst).innerHTML = a;
		
		// Ataques
		var casilla = find("//td[@id='aldea" + did + "_1" + "']", XPFirst);
		if (mov_tropas){
			var a = ansdoc.evaluate("//div[@class='f10 b']", ans, null, XPFirst, null).singleNodeValue.nextSibling;
			if (a.firstChild.childNodes.length > 0){
				a = a.firstChild;
				var b = new Array();
				for (var i = 0; i < a.childNodes.length; i++){
					var tr = a.childNodes[i];
					// FIXME: Apa�o para FF. Firefox mete nodos vacios
					var error = (tr.childNodes.length == 5 ? false : true);
					b[i] = '<nobr><a href="build.php?newdid=' + did + '&gid=16" title="' + tr.childNodes[error ? 3 : 1].textContent.split(" ")[1] + '">' + tr.childNodes[error ? 1 : 0].firstChild.innerHTML + "</a> <span id='timeouta'>" + tr.childNodes[error ? 9 : 4].textContent.split(" ")[0] + '</span></nobr>';
				}
				casilla.innerHTML = b.join(" | ");
			}else casilla.innerHTML = '-';
		}else casilla.innerHTML = '-';

		// Construcciones
		var casilla = find("//td[@id='aldea" + did + "_2" + "']", XPFirst);
		if (constr){
			var a = ansdoc.evaluate("//div[@id='ba']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
			var b = new Array();
			for (var i = 0; i < a.firstChild.childNodes.length; i++){ b[i] = '<nobr><img src="' + img('a/bau.gif') + '" title="' + a.firstChild.childNodes[i].childNodes[1].innerHTML + '"/> <span id="timeouta">' + a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0] + "</span></nobr>"; }
			casilla.innerHTML = b.join(" | ");
		}else casilla.innerHTML = '-';

		// Tropas
		var a = ansdoc.evaluate("//div[@class='f10 b']", ans, null, XPList, null).snapshotItem(mov_tropas ? 2 : 1).nextSibling;
		var casilla = find("//td[@id='aldea" + did + "_3" + "']", XPFirst);
		if (a.firstChild.firstChild.childNodes.length > 1){
			a = a.firstChild;
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++){
				var tr = a.childNodes[i];
				tr.childNodes[0].firstChild.firstChild.setAttribute("title", tr.childNodes[2].innerHTML);
				b[i] = '<nobr>' + tr.childNodes[0].firstChild.innerHTML + tr.childNodes[1].innerHTML + '</nobr>';
			}
			casilla.innerHTML = b.join(" | ");
		}else casilla.innerHTML = '-';

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='ba']]", XPFirst).parentNode.firstChild.className = 'c2';
		
		// FIXME: Firefox rendering bug
		casilla.parentNode.setAttribute("style", "width:100%");
	}*/
	function procesarAldea(t){
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// ID de aldea
		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
		var did = RegExp.$1;
		var times = new Array();

		// Materias primas
		var a = '';
		for (var i = 1; i < 5; i++){
			var b = ansdoc.getElementById("l" + (5-i));
			var perc = Math.round((b.innerHTML.split("/")[0] * 100) / b.innerHTML.split("/")[1]);
			var cant = b.innerHTML.split("/")[0];
			// Espero que la "k" sea internacional
			if (cant % 1000 == 0) txt_cant = (cant / 1000) + "k"; else txt_cant = cant;
			var c = '';
			c += '<img src="' + img('r/' + i + '.gif') + '" border="0" title="' + T('RECURSO' + i) + '">';
			c += '<span title="' + b.title + '">' + (cant < 0 ? '<font color="#ff0000">' + txt_cant + '</font>' : txt_cant) + '</span> <span style="font-size:9px; color:#909090" title="' + b.innerHTML + '">(' + perc + '%)</span>';
			a += '<nobr>' + c + '</nobr>';
			if (i != 4) a += " | ";
		}
		find("//td[@id='aldea" + did + "_0" + "']", XPFirst).innerHTML = a;
		
		// Ataques
		var casilla = find("//td[@id='aldea" + did + "_1" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='ltbw1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var a = a.firstChild;
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++){
				var tr = a.childNodes[i];
				// FIXME: Apanyo para FF. Firefox mete nodos vacios
				var error = (tr.childNodes.length == 5 ? false : true);
				times.push(tr.childNodes[error ? 9 : 4].textContent.split(" ")[0]);
				b[i] = '<nobr><a href="build.php?newdid=' + did + '&gid=16" title="' + tr.childNodes[error ? 3 : 1].textContent.split(" ")[1] + '">' + tr.childNodes[error ? 1 : 0].firstChild.innerHTML + "</a> <span id='timeouta'>" + tr.childNodes[error ? 9 : 4].textContent.split(" ")[0] + '</span></nobr>';
			}
			casilla.innerHTML = b.join(" | ");
		}else casilla.innerHTML = '-';

		// Construcciones
		var casilla = find("//td[@id='aldea" + did + "_2" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='lbau1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var b = new Array();
			for (var i = 0; i < a.firstChild.childNodes.length; i++){ 
				times.push(a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0]);
				b[i] = '<nobr><img src="' + img('a/bau.gif') + '" title="' + a.firstChild.childNodes[i].childNodes[1].innerHTML + '"/> <span id="timeouta">' + a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0] + "</span></nobr>"; 
			}
			casilla.innerHTML = b.join(" | ");
		}else casilla.innerHTML = '-';

		// Tropas
		var casilla = find("//td[@id='aldea" + did + "_3" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='ltrm']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue.firstChild;
		if (a.firstChild.childNodes.length == 3){
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++){
				var tr = a.childNodes[i];
				tr.childNodes[0].firstChild.firstChild.setAttribute("title", tr.childNodes[2].innerHTML);
				b[i] = '<nobr>' + tr.childNodes[0].firstChild.innerHTML + tr.childNodes[1].innerHTML + '</nobr>';
			}
			casilla.innerHTML = b.join(" | ");
		}else casilla.innerHTML = '-';

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';

                // Auto Refresh
		if (times.length > 0){
	                var time = Number.POSITIVE_INFINITY;
        	        for (var i = 0; i < times.length; i++) {
                	        times[i] = calcular_segundos(times[i]);
                        	if (times[i] < time) time = times[i];
	                }
        	        setTimeout(crearEventoActualizarAldea(did), 1000 * time);
		}
		
		// FIXME: Firefox rendering bug
		casilla.parentNode.setAttribute("style", "width:100%");
	}

	function crearEventoActualizarAldea(did){
		return function(){ 
			find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b3.gif');
			
			ajaxRequest("dorf1.php?newdid=" + did, "GET", null, procesarAldea, 
				function(){ find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b4.gif'); }
			);
		};
	}

	function resumenAldeas(){
		if (plus) return;
		//var ba = find("//div[preceding-sibling::div[@class='div4'] and @id='ba']", XPFirst);
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba) return;

		var aldeas = ba.getElementsByTagName("A");
		//var a = find("//td[@class='s3']", XPFirst);
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = document.createElement("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = document.createElement("TR");
		var td = elem("TD", T('RESUMEN'));
		td.setAttribute("colspan", "3");
		tr.appendChild(td);
		//tr.setAttribute("class", "rbg");
		tr.setAttribute("style","font-weight:bold;background-image: url(data:image/gif;base64,"+imagenes["c2"]+")");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++){
			//alert(aldeas[i].getAttribute("title"));
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0 && aldeas[i].getAttribute("title").search(/Village Overview|Village Center|Center Map/)==-1){
				var did = RegExp.$1;
				var tr = document.createElement("TR");

				var td = document.createElement("TD");
				var enlace = elem("A", "<img src='" + img('a/b5.gif') + "' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoActualizarAldea(did), 0);
				var nobr = document.createElement("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild(elem("SPAN", ' <a href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "2");
				td.setAttribute("align", "left");
				tr.appendChild(td);

				for (var j = 0; j < 4; j++){
					if (j != 2 && j != 0) tr = document.createElement("TR");
					td = elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "center");
					if (j != 1 && j != 2) td.setAttribute("width", "100%");
					if (j == 0) td.setAttribute("colspan", "2");
					else if(j == 3){
						td.setAttribute("colspan", "3");
						td.setAttribute("style", "border-bottom-style: solid; border-bottom-width: thin");
					}
					tr.appendChild(td);
					if (j != 1) tabla.appendChild(tr);
				}
			}
		}
		if (a.firstChild) insertAfter(a.firstChild, tabla);
		else a.appendChild(tabla);
	}

	function borrarCuenta(){
		//var a = find("//div[@class='f10' and parent::td[@class='s3'] and @style]", XPFirst);
		//if (a) a.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 2; border: solid 1px #00C000; background-color: #FEFFE3; width:130px; text-align:center; right:0px; top:0px;");
		var a = find("//p[parent::div[@id='lleft'] and @style]", XPFirst);
		if (a){
			moveElement(a, document.body);
			a.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 2; border: solid 1px #00C000; background-color: #FEFFE3; width:130px; text-align:center; right:0px; top:0px;");
		}
	}

	function opcionMenuSuperior(texto){
		//var a = find("//td[@class='s3']/p", XPFirst);
		var a = find("//p[@class='txt_menue']", XPFirst);
								if (a) a.innerHTML += texto;
	}

	function opcionOcultaAlianza(){ if (find("//td[@class='s3']/p", XPList).snapshotLength > 1) opcionMenuSuperior(' | <a href="allianz.php?s=7">' + T('STAT') + '</a>'); }
	function opcionOcultaMensajes(){ if (!plus) opcionMenuSuperior(' | <a href="nachrichten.php?t=3">' + T('ARCHIVE') + '</a>'); }
	function opcionOcultaInformes(){ if (!plus) opcionMenuSuperior(' | <a href="berichte.php?t=5">' + T('ARCHIVE') + '</a>'); }

	function crearTemporizadorRecurso(i){
		return function(){
			/*
			 * Actualiza las cantidades restantes por cada tipo de recurso si corresponde hacerlo en este
			 * ciclo de reloj segun la adaptacion de frecuencias anterior
			 */
			var recursos = find("//*[@id='timeout" + i + "']", XPList);
			for (var j = 0; j < recursos.snapshotLength; j++){
				var cantidad = recursos.snapshotItem(j).innerHTML - 1;
				if (cantidad >= 0) recursos.snapshotItem(j).innerHTML = cantidad;
				else document.location.reload();
			}
		};
	}

	/**
	 * Crea el temporizador encargado de actualizar los nuevos relojes y las cantidades de recursos que faltan
	 */
	function setTimers(){
		// Calcula cada cuantos segundos debe actualizar cada contador de recursos restantes para 
		// aprovechar el temporizador del resto de relojes
		var frecuencia = new Array(4);
		for (var i = 0; i < 4; i++){
			frecuencia[i] = (1 / produccion[i]) * 1000;
			if (!isFinite(frecuencia[i]) || frecuencia[i] < 0) frecuencia[i] = Number.POSITIVE_INFINITY;
												if (total[i] - actual[i] == 0) frecuencia[i] = Number.POSITIVE_INFINITY;
			setInterval(crearTemporizadorRecurso(i), Math.floor(frecuencia[i]));
		}

		setInterval(function () {
			/*
			 * Se distinguen dos tipos de temporizadores, timeout y timeouta. Solo los primeros 
			 * provocan que la pagina se actualice al llegar a 0.
			 */
			var relojes = find("//*[@id='timeout' or @id='timeouta']", XPList);
			for (var i = 0; i < relojes.snapshotLength; i++){
				var tiempo = calcular_segundos(relojes.snapshotItem(i).innerHTML) - 1;
				if (tiempo >= 0) relojes.snapshotItem(i).innerHTML = formatear_tiempo(tiempo);
				else if (relojes.snapshotItem(i).id == 'timeout' && in_reload==0) { in_reload=1; document.location.reload();  }
			}
		},1000);

	}

	//if (getVersion() != 3)					return;
	if (location.href.match(/karte2.php($|\?z=)/))  {	
	  location.href.search(/http:\/\/(.*)\//);
		server = RegExp.$1;	//get this for our cookie
		idioma = 'us';
		crearTooltip();
		preCalculate3(); 
		desplazarMapa(); 
		infoRecursos(); 
		return; 
	}

	/* Acciones generales a todas las paginas */
	loadResNeeded();
	getGeneralData();
	sanearEnlaces();
	hideAd();
	quickLinks();
	buildingLinks();
	playerLinks();
	calculateFillTime();
	cityLinks();
	crearTooltip();
	unitStats();
	borrarCuenta();
	confirmDelete();
	/* Acciones especificas para algunas paginas */
	if (location.href.indexOf('build.php?') != -1){
		quickCity();
		recursosMercado();
		tiempoExplorarUnidades();
		tiempoExplorar(); 
	}
	if (location.href.indexOf('build.php') != -1)
	{ 		
		if (location.href.indexOf('build.php?') == -1)  { //don't need to call these twice.
		  tiempoExplorarUnidades(); 
		  tiempoExplorar(); 
		}
		mostrarVentas(); 
		calculateBuildTime(); 
	}
	//if (location.href.indexOf('dorf') != -1) 		confirmDelete();
	if (location.href.indexOf('dorf1') != -1)		preCalculate1();
	if (find("//div[starts-with(@class,'d2_x')]",XPFirst) != null) preCalculate2(); //if (location.href.indexOf('dorf2') != -1)  TMR - fixed so village center info always shows up
	if (location.href.match(/berichte.php\?(.*&)?id=/))	{ reportBatalla();  } // TMR - fixed this not showing profit/efficiency if moving between villages
	if (location.href.indexOf('a2b.php') != -1){		quickCity(); ataqueDefecto(); }
	//if (location.href.indexOf('allianz.php') != -1)		opcionOcultaAlianza();
	if (location.href.indexOf('nachrichten.php') != -1)	opcionOcultaMensajes();
	if (location.href.indexOf('berichte.php') != -1)	opcionOcultaInformes();
	if (location.href.match(/dorf3.php($|\?newdid=(\d+)$)/)) resumenAldeas();
	if (location.href.match(/build.php\?(.*)&s=2/))		puntosCultura();
	if (location.href.match(/build.php\?(.*)&t=1/)){	alianzaMercado(); filtrosMercado(); }
	if (location.href.match(/karte(2)?.php($|\?z=|\?new)/) && !location.href.match(/\&d\=/)){ preCalculate3(); desplazarMapa(); infoRecursos(); quickCity(); }
  //if (location.href.match(/ajax.php/))  {preCalculate3(); desplazarMapa(); infoRecursos(); quickCity(); }
	if (location.href.match(/nachrichten.php($|\?t=|\?s=)/) || location.href.match(/berichte.php($|\?t=|\?s=)/)) opcionesMensajes();
	if (location.href.match(/nachrichten.php$/))		blocNotas();
	if (location.href.match(/spieler.php\?(.*&)?s=2/))						mostrarConfiguracion();
	if (location.href.match(/statistiken.php/))  { try{find("//input[@name='spieler']", XPFirst).focus();}catch(e){}} //TMR
	if (location.href.match(/plus.php\?(.*&)?id=3/))		checkUpdate();
  
	/* Mas acciones generales */
	mostrarMarcadores();
	setTimers();
	calcularTiempoEjecucion();


  //# TMR - replace the timer functionality in http://s1.travian.us/un3.js to be more accurate
  //unsafeWindow.start = function (){ //overwrite this function so it doesn't call t_plus() and t_minus()
  //  unsafeWindow.p_plus1(1);
  //  unsafeWindow.p_plus2(1);
  //  unsafeWindow.p_plus3(1);
  //  unsafeWindow.p_plus4(1);
  //}
  //start(){G("l1");G("l2");G("l3");G("l4");ak();};
  unsafeWindow.start = function (){ 
  	unsafeWindow.G("l1");
  	unsafeWindow.G("l2");
  	unsafeWindow.G("l3");
  	unsafeWindow.G("l4");
  }
  
  //set up timers on page load
  function setTravianTimers() {
    for(var i=1;; i++) { //store the start time in ms for all incremental timers
      var myElement = document.getElementById("tp"+i);
      if(myElement != null){
        var p = myElement.innerHTML.split(":");
        plustimers["tp"+i]=(parseInt(p[0],10)*3600 + parseInt(p[1],10)*60 + parseInt(p[2],10))*1000;
      }
      else break;
    }

    for(var i=1;; i++) { //store end time in ms for all decremental timers
      var myElement = document.getElementById("timer"+i);
      if(myElement != null){
        var p = myElement.innerHTML.split(":");
        var endtime=(parseInt(p[0],10)*3600 + parseInt(p[1],10)*60 + parseInt(p[2],10)) * 1000;
        minustimers["timer"+i]=endtime+pageloadtime.getTime();
      }
      else break;
    }

    setInterval(t_timers(),250); //call our timer
  }  
 
  //this increments/decrements timers relative to your system clock
  function t_timers()  {
    return function(){
      var now=new Date();
      for (var i in plustimers) {
        var newtime=now.getTime()-pageloadtime.getTime()+plustimers[i];
        newtime=(newtime > 86400000) ? newtime - 86400000 : newtime;
        var hours=Math.floor(newtime/3600000);
        newtime-=hours*3600000;
        var mins=Math.floor(newtime/60000);
        newtime-=mins*60000;
        var secs=Math.floor(newtime/1000);
        document.getElementById(i).innerHTML=hours+':'+padlength(mins)+':'+padlength(secs);
      }
      
      for (var i in minustimers) {
        var newtime=minustimers[i]-now.getTime();
        if(newtime>0)  {
          var hours=Math.floor(newtime/3600000);
          newtime-=hours*3600000;
          var mins=Math.floor(newtime/60000);
          newtime-=mins*60000;
          var secs=Math.floor(newtime/1000);
          document.getElementById(i).innerHTML=hours+':'+padlength(mins)+':'+padlength(secs);
        }
        if(minustimers[i]<=now.getTime() && in_reload==0) {
          in_reload=1;
          document.location.reload();
          //var href=location.href;
          //alert(href);
          //document.location.href=href;
        }
      }
    }
  }
  
  function padlength(d){
    return (d.toString().length==1) ? "0"+d : d
  }
  
  setTravianTimers();

};
  
// GreaseMonkey ejecuta sus scripts en el evento DOMContentLoaded, por lo que se puede ejecutar directamente,
// Opera por el contrario necesita agregar la funcion a dicho evento
window.addEventListener('DOMContentLoaded', funcionPrincipal, false);
if (document.body) funcionPrincipal();



/*
TODO:
	- A�adir resumen a la vista de todas las aldeas
	- Temporizadores para recursos en la vista resumen de todas las aldeas
	- Refresco automatico de una aldea en la vista resumen cuando un contador de construccion o ataque termina
	- Solo mostrar ampliaciones de niveles superiores al 10 para la aldea principal
	- Calculo de tiempo de llegada de ataque para coordinar ataques
				- Bloc de notas para cada aldea o jugador?
	- Conseguir enlace a una calculadora multilenguaje
	- Cola de espera
	- Estudiar la posibilidad de dividir el script en varios ficheros
	- Sistema de traduccion por frases en vez de por palabras (al estilo printf)
	- Calculo de la capacidad defensiva/ofensiva de una aldea
	- Calculo del numero de experiencia necesaria para subir de nivel al heroe
	- Traduccion a ruso, danes, checo, hungaro, chino, hongkones, sueco y finlandes (por favor, usando entidades HTML de Unicode como &#334; / please, use Unicode HTML entities like &#334;)

FIXME:
	- El mapa de Travian World no funciona por la constante "c" asociada a cada casilla
	- El calculo de los puntos de cultura cambia para los servidores Speed
	- Comprobar los costes de los niveles de todos los edificios asi como las posibles diferencias entre servidores (http://help.travian.com)
	- Costes para el nivel 20 de todas las minas
	- Refinar las traducciones
	- Hacer las traducciones compatibles con idiomas de caracteres espciales (ruso, turco, etc) con UTF8
	- Mejorar los apa�os en el codigo marcados por FIXMEs (14 aprox)
	- Comentar mas en detalle algunas cosas
*/

//^ *'|'\+\r

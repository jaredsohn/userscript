// ==UserScript==
// @name Travian3 Beyond - all language (ترافيان بلس بكل اللغات حتى العربية)
// @author Victor Garcia (aka Croc), Szabka
// @namespace   t3
// @version 2.6cm
// @description  ياحبايبي هذا السكريبت يجعل ترافيان العادي مثل ترافيان بلس بدون استخدام الذهب هذا السكريبت يعمل فقط على متصفح فايرفوكس ويجب تحمـــGreasemonkeyــيل 
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
// ==/UserScript==
//Styles
var cssStyle = "";
cssStyle += "body{font-family:tahoma;}"; 
cssStyle += "h1{font-family:arial;font-size:190%;}"; 
cssStyle += ".p1 label{float:right;}"; 
cssStyle += "#ltbw0{right:284px;}"; 
GM_addStyle(cssStyle);
// $Revision: 35 $
/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/ 
 */

// Funcion principal ejecutada cuando se ha cargado toda la pagina
function funcionPrincipal(e){
	// Momento de inicio de ejecucion del script
	var tiempo_ejecucion = new Date().getTime();

	var version = "2.6c MunLightDoll";

	var lang_es = new Array();
	var lang_ar = lang_es;
	var lang_cl = lang_es;
	var lang_mx = lang_es;
	lang_es['ALIANZA'] 	= 'Alianza';
	lang_es['PERFIL'] 	= 'Perfil';
	lang_es['SIM'] 		= 'Simulador';
	lang_es['CALC'] 	= 'Calculadora';
	lang_es['SEGURO'] 	= 'Estas seguro?'; //prompt message doesn't allow HTML Entities
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
	lang_es['GUARDADO'] 	= 'Guardado'; //prompt message doesn't allow HTML Entities
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
	lang_es['ENLACE']	= 'Direccion del nuevo marcador'; //prompt message doesn't allow HTML Entities
	lang_es['TEXTO']	= 'Texto para el nuevo marcador'; //prompt message doesn't allow HTML Entities
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
	lang_en['SEGURO'] 	= 'Are you sure?'; //prompt message doesn't allow HTML Entities
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
	lang_en['GUARDADO'] 	= 'Saved'; //prompt message doesn't allow HTML Entities
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
	lang_en['COMPRAR'] 	= 'Buy';
	lang_en['VENDER'] 	= 'Sell';
	lang_en['ENVIAR_IGM'] 	= 'Send IGM';
	lang_en['LISTO'] 	= 'Ready';
	lang_en['EL'] 		= 'on';
	lang_en['A_LAS'] 	= 'at';
	lang_en['EFICIENCIA'] 	= 'Efficiency'; 
	lang_en['NUNCA']	= 'Never';
	lang_en['PC']           = 'culture points';
	lang_en['FUNDAR']       = 'You can found or conquer a new village';
	lang_en['ALDEAS']       = 'Village(s)';
	lang_en['ENV_TROPAS'] 	= 'Send troops';
	lang_en['RECURSO1']     = 'Wood';
	lang_en['RECURSO2']     = 'Clay';
	lang_en['RECURSO3']     = 'Iron';
	lang_en['RECURSO4']     = 'Crop';
	lang_en['TIEMPO']       = 'Time';
	lang_en['COMP']         = 'Report Compressor';
	lang_en['STAT']		= 'Statistic';
	lang_en['OFREZCO']	= 'Offering';
	lang_en['BUSCO']	= 'Searching';
	lang_en['TIPO']		= 'Type';
	lang_en['DISPONIBLE']	= 'Only available';
	lang_en['CUALQUIERA']	= 'Any';
	lang_en['SI']		= 'Yes';
	lang_en['NO']		= 'No';
    lang_en['LOGIN'] = 'Login';
    lang_en['MARCADORES']   = 'Bookmarks';
    lang_en['ANYADIR']      = 'Add';
    lang_en['ENLACE']       = 'New Bookmark URL'; //prompt message doesn't allow HTML Entities
    lang_en['TEXTO']        = 'New Bookmark Text'; //prompt message doesn't allow HTML Entities
	lang_en['ELIMINAR']	= 'Delete';
	lang_en['MAPA']		= 'Map';
    lang_en['VERSION']      = 'Available version';
    lang_en['MAXTIME']      = 'Maximum time';
	lang_en['CHECK']	= 'Check new version';
	lang_en['ARCHIVE']	= 'Archive';
	lang_en['RESUMEN']	= 'Summary';
	lang_en['MAXTIME']			= 'Max time';
	lang_en['VERSION']			= 'Newest version';
	lang_en['DETALLES']			= 'Details';
	lang_en['MAP_EXT']			= 'Extended map';
	lang_en['MAT_PRIMAS']		= 'Resources';
	lang_en['ATAQUES']			= 'Attack';
	lang_en['CONSTR']			= 'build';
	lang_en['TROPAS']			= 'Troops';
	lang_en['ACTUALIZAR']		= 'Check new version';
	lang_en['RES'] 				= 'Research tree';
    lang_en['STOREURL']         = 'Storage URL';
    lang_en['STOREPASSWORD']    = 'Storage password';
    lang_en['OPTIONS']    		= 'Options';
    lang_en['VENTAS']    		= 'Saved Offers';
    lang_en['SHOWINFO']    		= 'Show Res Info';
    lang_en['HIDEINFO']    		= 'Hide Res Info';
    lang_en['MAPSCAN']    		= 'Scan the map';

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
	lang_it['VERSION'] 	= 'L&quot; ultima versione disponible č'; 
	lang_it['MAXTIME'] 	= 'Tempo massimo'; 
	lang_it['CHECK'] 	= 'Controllare nuove versioni'; 
	lang_it['MAT_PRIMAS'] 	= 'Risorse'; 
	lang_it['ATAQUES'] 	= 'Attacchi'; 
	lang_it['CONSTR'] 	= 'Costruz.'; 
	lang_it['TROPAS'] 	= 'Truppe'; 
	lang_it['ACTUALIZAR'] 	= 'Aggiornare';

	// Autor anonimo a peticion expresa (ampliado por Blabla Blubb)
	var lang_de = new Array();
	lang_de['ALIANZA'] 	= 'Allianz';
	lang_de['PERFIL'] 	= 'Profil';
	lang_de['SIM'] 		= 'Kampfsimulator';
	lang_de['CALC'] 	= 'Marktplatzrechner';
	lang_de['SEGURO'] 	= 'Sind Sie sicher?';
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
	lang_de['COMERCIAR'] 	= 'H&auml;ndler schicken';
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
	lang_de['MAXTIME'] 	= 'Maximale Dauer';
	lang_de['RECURSO3'] 	= 'Eisen';
	lang_de['RECURSO4'] 	= 'Getreide';
	lang_de['TIEMPO'] 	= 'Zeit';
	lang_de['COMP'] 	= 'KB 2 BBCode';
	lang_de['MAPA'] 	= 'Karte';
	lang_de['STAT'] 	= 'Statistik';
	lang_de['OFREZCO'] 	= 'Biete';
	lang_de['BUSCO'] 	= 'Suche';
	lang_de['TIPO'] 	= 'Tauschverh&auml;ltnis';
	lang_de['DISPONIBLE'] 	= 'Nur annehmbare Angebote';
	lang_de['CUALQUIERA'] 	= 'Beliebig';
	lang_de['SI'] 		= 'Ja';
	lang_de['NO'] 		= 'Nein';
	lang_de['MARCADORES'] 	= 'Lesezeichen';
	lang_de['ANYADIR'] 	= 'Hinzuf&uuml;gen';
	lang_de['ENLACE'] 	= 'URL von neuem Lesezeichen';
	lang_de['TEXTO'] 	= 'Text von neuem Lesezeichen';
	lang_de['ELIMINAR'] 	= 'Entfernen';
	lang_de['CHECK'] 	= 'Nach neuer Version suchen';
	lang_de['ARCHIVE'] 	= 'Archiv';
	lang_de['RESUMEN'] 	= 'Zusammenfassung';

	// Por Ferran -=(Killo)=- (ampliado y corregido por Prometeus)
	var lang_fr = new Array(); 
	lang_fr['ALIANZA'] 	= 'Alliance'; 
	lang_fr['PERFIL'] 	= 'Profil'; 
	lang_fr['SIM'] 		= 'Simulateur'; 
	lang_fr['CALC'] 	= 'Calculateur'; 
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
    lang_fr['DISPONIBLE']   = 'Disponible';
    lang_fr['SI']           = 'Oui';
    lang_fr['NO']           = 'Non';
    lang_fr['MARCADORES']   = 'Liens';
    lang_fr['ANYADIR']      = 'Ajouter';
    lang_fr['ENLACE']       = 'URL du nouveau lien';
	lang_fr['TEXTO']        = 'Texte du nouveau lien';
	lang_fr['SEGURO'] 	= 'Es-tu certain ?'; 
	lang_fr['ELIMINAR'] 	= 'Supprimer'; 
	lang_fr['MAPA'] 	= 'Carte'; 
	lang_fr['VERSION'] 	= 'La derniere version disponible est la '; 
	lang_fr['MAXTIME']	= 'Temps maximum'; 
	lang_fr['CHECK'] 	= 'V&eacute;rifier version'; 
	lang_fr['ARCHIVE'] 	= 'Archive'; 
	lang_fr['RESUMEN'] 	= 'R&eacute;sum&eacute;';

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

	// Por MikeP (Dedicado a Li), corregido y ampliado por Joao Frade
	var lang_pt = new Array();
	var lang_br = lang_pt; // Es realmente igual el brasilenyo al portugues? :S
	lang_pt['ACCION'] 	= 'Ac&ccedil;&otilde;es';
	lang_pt['A_LAS'] 	= '&agrave;s';
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
	lang_pl['PC']           = 'Punkty kultury';	
	lang_pl['FUNDAR']       = 'Mo&#380;esz za&#322;o&#380;y&#263; lub podbi&#263; now&#261; osad&#281;';	
	lang_pl['ALDEAS']       = 'Osada(y)';	
	lang_pl['ENV_TROPAS'] 	= 'Wy&#347;lij jednostki';	
	lang_pl['RECURSO1']     = 'Drewno';	
	lang_pl['RECURSO2']     = 'Glina';	
	lang_pl['RECURSO3']     = '&#379;elazo';	
	lang_pl['RECURSO4']     = 'Zbo&#380;e';	
	lang_pl['TIEMPO']       = 'Czas';	
	lang_pl['COMP']         = 'Konwerter Raport&#243;w';	
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
	lang_pl['MARCADORES']   = 'Zak&#322;adki';
    lang_pl['ANYADIR']      = 'Dodaj';
    lang_pl['ENLACE']       = 'URL Nowej Zakladki';
    lang_pl['TEXTO']        = 'Nazwa Nowej Zakladki';
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
    lang_tr['ALIANZA']      = 'Birlik';
    lang_tr['PERFIL']       = 'Profil';
    lang_tr['SIM']          = 'Savas-Simulat&#246;r&#252;';
    lang_tr['CALC']         = 'Travian Hesaplayici';
    lang_tr['SEGURO']       = 'Emin misiniz?';
    lang_tr['MARK']         = 'T&#252;m&#252;n&#252; sec';
    lang_tr['PERDIDAS']     = 'Kayip';
    lang_tr['RENT']         = 'Kazanc';
    lang_tr['SUBIR_NIVEL']  = 'Bir &#252;st seviyeye gelistirilebilir';
    lang_tr['JUGADOR']      = 'Oyuncu';
    lang_tr['ALDEA']        = 'K&#246;y Adi';
    lang_tr['HAB']          = 'N&#252;fus';
    lang_tr['COORD']        = 'Koordinat';
    lang_tr['ACCION']       = 'Eylemler';
    lang_tr['ATACAR']       = 'Saldir';
    lang_tr['COMERCIAR']    = 'Hammadde g&#246;nder';
    lang_tr['GUARDADO']     = 'Saklanan';
    lang_tr['DESP_ABR']     = 'Mov.';
    lang_tr['FALTA']        = 'Gerekli';
    lang_tr['HOY']          = 'bug&#252;n';
    lang_tr['MANYANA']      = 'yarin';
    lang_tr['PAS_MANYANA']  = 'ertesi g&#252;n';
    lang_tr['MERCADO']      = 'Pazar';
    lang_tr['CUARTEL']      = 'Kisla';
    lang_tr['PUNTO']        = 'Askeri &#220;s';
    lang_tr['CORRAL']       = 'Ahir';
    lang_tr['TALLER']       = 'Akademi';
    lang_tr['ENVIAR']       = 'Hammadde g&#246;nder';
    lang_tr['COMPRAR']      = 'Satin Al';
    lang_tr['VENDER']       = 'Sat';
    lang_tr['ENVIAR_IGM']   = 'Send IGM';
    lang_tr['LISTO']        = 'Bir &#252;st seviyeye gelistirme';
    lang_tr['EL']           = 'saat';
    lang_tr['A_LAS']        = '';
    lang_tr['EFICIENCIA']   = 'Verimlilik';
    lang_tr['NUNCA']        = 'Hi&#231;';
    lang_tr['PC']           = 'K&#252;lt&#252;r puani';
    lang_tr['FUNDAR']       = 'Yeni bir k&#246;y kurabilir veya fethedebilirsiniz';
    lang_tr['ALDEAS']       = 'K&#246;yler';
    lang_tr['TROPAS']       = 'Asker g&#246;nder';
    lang_tr['RECURSO1']     = 'Odun';
    lang_tr['RECURSO2']     = 'Tu&#240;la';
    lang_tr['RECURSO3']     = 'Demir';
    lang_tr['RECURSO4']     = 'Tahil';
    lang_tr['TIEMPO']       = 'Zaman';
    lang_tr['COMP']         = 'Report Compressor';
    lang_tr['STAT']         = '&#221;statistik';
    lang_tr['OFREZCO']      = '&#214;nerilen';
    lang_tr['BUSCO']        = 'Talep edilen';
    lang_tr['TIPO']         = 'Oran';
    lang_tr['CUALQUIERA']   = 'Herhangi';
    lang_tr['DETALLES']     = 'Detaylar';
    lang_tr['MAP_EXT']      = 'Genisletilmis Harita';
    lang_tr['DISPONIBLE']   = 'Sadece mevcut olanlar';
    lang_tr['SI']           = 'Evet';
    lang_tr['NO']           = 'Hayir';
    lang_tr['LOGIN']        = 'Giris';
    lang_tr['MARCADORES']   = 'Yer imleri';
    lang_tr['ANYADIR']      = 'Ekle';
    lang_tr['ENLACE']       = 'Yeni yer imi URL';
    lang_tr['TEXTO']        = 'Yeni yer imi Text';
    lang_tr['ELIMINAR']     = 'Sil';
    lang_tr['MAPA']         = 'Harita';
    lang_tr['VERSION']      = 'S&#252;r&#252;m';
    lang_tr['MAXTIME']      = 'Azami s&#252;re';

	// Rumano (travian.ro) gracias a Dan Aslau
	var lang_ro = new Array();
	lang_ro['ALIANZA']  	= 'Alianta';
	lang_ro['PERFIL']  	= 'Profil';
	lang_ro['SIM']   	= 'Simulator';
	lang_ro['CALC']  	= 'Travian Calc';
	lang_ro['SEGURO']  	= 'Esti sigur?';
	lang_ro['MARK']  	= 'Selecteaza tot';
	lang_ro['PERDIDAS']  	= 'Pierderi';
	lang_ro['RENT']  	= 'Profit';
	lang_ro['SUBIR_NIVEL']  = 'Upgrade posibil acum';
	lang_ro['JUGADOR']  	= 'Jucator';
	lang_ro['ALDEA']  	= 'Nume sat';
	lang_ro['HAB']   	= 'Populatie';
	lang_ro['COORD']  	= 'Coordonate';
	lang_ro['ACCION']  	= 'Actiuni';
	lang_ro['ATACAR']  	= 'Ataca';
	lang_ro['COMERCIAR']  	= 'Trimite resurse';
	lang_ro['GUARDADO']  	= 'Salvat';
	lang_ro['DESP_ABR']  	= 'Randuri';
	lang_ro['FALTA']  	= 'Ai nevoie de';
	lang_ro['HOY']   	= 'azi';
	lang_ro['MANYANA']  	= 'maine';
	lang_ro['PAS_MANYANA']  = 'poimaine';
	lang_ro['MERCADO']  	= 'Targ';
	lang_ro['CUARTEL']      = 'Cazarma';
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
	lang_ro['PC']           = 'puncte de cultura';
	lang_ro['FUNDAR']       = 'Poti sa cuceresti sau sa formezi un nou sat';
	lang_ro['ALDEAS']       = 'Sat(e)';
	lang_ro['TROPAS']       = 'Trimite trupe';
        lang_ro['ENV_TROPAS']   = 'Trimite trupe';
	lang_ro['RECURSO1']     = 'Lemn';
	lang_ro['RECURSO2']     = 'Argila';
	lang_ro['RECURSO3']     = 'Fier';
	lang_ro['RECURSO4']     = 'Hrana';
	lang_ro['TIEMPO']       = 'Timp';
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

	// Chino (travian.cn MagicNight)
	var lang_cn = new Array();
	lang_cn['ALIANZA'] 	= '&#32852;&#30431;&#27010;&#20917;';
	lang_cn['PERFIL'] 	= '&#20010;&#20154;&#36164;&#26009;';
	lang_cn['SIM'] 		= '&#25112;&#26007;&#27169;&#25311;&#22120;';
	lang_cn['CALC'] 	= 'Travian Calc';
	lang_cn['SEGURO'] 	= '&#20320;&#30830;&#23450;?';
	lang_cn['MARK'] 	= '&#20840;&#37096;&#36873;&#25321;';
	lang_cn['PERDIDAS'] 	= '&#25439;&#22833;';
	lang_cn['RENT'] 	= '&#25112;&#26007;&#21033;&#28070;';
	lang_cn['SUBIR_NIVEL'] 	= '&#21487;&#20197;&#21319;&#32423;&#20102;';
	lang_cn['JUGADOR'] 	= '&#29609;&#23478;';
	lang_cn['ALDEA'] 	= '&#26449;&#24196;&#21517;';
	lang_cn['HAB'] 		= '&#20154;&#21475;';
	lang_cn['COORD'] 	= '&#22352;&#26631;';
	lang_cn['ACCION'] 	= '&#21160;&#20316;';
	lang_cn['ATACAR'] 	= '&#25915;&#20987;';
	lang_cn['COMERCIAR'] 	= '&#36816;&#36865;&#36164;&#28304;';
	lang_cn['GUARDADO'] 	= '&#24050;&#20445;&#23384;';
	lang_cn['DESP_ABR'] 	= '&#31227;&#21160;.';
	lang_cn['FALTA'] 	= '&#20320;&#38656;&#35201;';
	lang_cn['HOY'] 		= '&#20170;&#22825;';
	lang_cn['MANYANA'] 	= '&#26126;&#22825;';
	lang_cn['PAS_MANYANA'] 	= '&#21518;&#22825;';
	lang_cn['MERCADO'] 	= '&#24066;&#22330;';
	lang_cn['CUARTEL'] 	= '&#20853;&#33829;';
	lang_cn['PUNTO'] 	= '&#38598;&#32467;&#28857;';
	lang_cn['CORRAL'] 	= '&#39532;&#21417;';
	lang_cn['TALLER'] 	= '&#24037;&#22330;';
	lang_cn['ENVIAR'] 	= '&#36816;&#36865;&#36164;&#28304;';
	lang_cn['COMPRAR'] 	= '&#20080;&#20837;';
	lang_cn['VENDER'] 	= '&#21334;&#20986;';
	lang_cn['ENVIAR_IGM'] 	= '&#21457;&#36865;IGM';
	lang_cn['LISTO'] 	= '&#21487;&#20197;&#21319;&#32423;&#20102;';
	lang_cn['EL'] 		= '&#22312;';
	lang_cn['A_LAS'] 	= '&#20110;';
	lang_cn['EFICIENCIA'] 	= '&#25112;&#26007;&#25928;&#29575;';
	lang_cn['NUNCA'] 	= '&#27704;&#19981;';
	lang_cn['PC'] 		= '&#25991;&#26126;&#28857;';
	lang_cn['FUNDAR'] 	= '&#20320;&#21487;&#24314;&#31435;&#25110;&#24449;&#26381;&#19968;&#20010;&#26032;&#26449;&#24196;';
	lang_cn['ALDEAS'] 	= '&#26449;&#24196;';
	lang_cn['ENV_TROPAS'] 	= '&#20986;&#20853;';
	lang_cn['RECURSO1'] 	= '&#26408;&#26448;';
	lang_cn['RECURSO2'] 	= '&#27877;&#22303;';
	lang_cn['RECURSO3'] 	= '&#38081;';
	lang_cn['RECURSO4'] 	= '&#31918;&#39135;';
	lang_cn['TIEMPO'] 	= '&#26102;&#38388;';
	lang_cn['COMP'] 	= 'Report Compressor';
	lang_cn['STAT'] 	= '&#32479;&#35745;';
	lang_cn['OFREZCO'] 	= '&#25552;&#20379;';
	lang_cn['BUSCO'] 	= '&#25628;&#32034;&#20013;';
	lang_cn['TIPO'] 	= '&#31867;&#22411;';
	lang_cn['DISPONIBLE'] 	= '&#20165;&#21487;&#29992;';
	lang_cn['CUALQUIERA'] 	= '&#20219;&#20309;';
	lang_cn['SI'] 		= '&#30830;&#23450;';
	lang_cn['NO'] 		= '&#21542;';
	lang_cn['MARCADORES'] 	= '&#20070;&#31614;';
	lang_cn['ANYADIR'] 	= '&#28155;&#21152;';
	lang_cn['ENLACE'] 	= '&#26032;&#20070;&#31614; URL';
	lang_cn['TEXTO'] 	= '&#26032;&#20070;&#31614;&#26631;&#39064;';
	lang_cn['ELIMINAR'] 	= '&#21024;&#38500;';
	lang_cn['MAPA'] 	= '&#22320;&#22270;';
	lang_cn['CHECK'] 	= '&#26816;&#26597;&#26032;&#29256;';
	lang_cn['ARCHIVE'] 	= '&#23384;&#26723;';
	lang_cn['RESUMEN'] 	= '&#31616;&#25253;';

	// Finlandes (travian.fi) thanks to Pasi Pekkala
	var lang_fi = new Array();
	lang_fi['ALIANZA'] 	= 'Liittouma';
	lang_fi['PERFIL'] 	= 'Profiili';
	lang_fi['SIM'] 		= 'Taistelusimulaattori';
	lang_fi['CALC'] 	= 'Laskuri';
	lang_fi['SEGURO'] 	= 'Oletko varma?';
	lang_fi['MARK'] 	= 'Valitse kaikki';
	lang_fi['PERDIDAS'] 	= 'Menetykset';
	lang_fi['RENT'] 	= 'Saalis';
	lang_fi['SUBIR_NIVEL'] 	= 'Laajennus saatavilla';
	lang_fi['JUGADOR'] 	= 'Pelaaja';
	lang_fi['ALDEA'] 	= 'Kyl&auml;';
	lang_fi['HAB'] 		= 'Asukkaita';
	lang_fi['COORD'] 	= 'Koordinaatit';
	lang_fi['ACCION'] 	= 'Toiminnot';
	lang_fi['ATACAR'] 	= 'Hy&ouml;kk&auml;ys';
	lang_fi['COMERCIAR'] 	= 'L&auml;het&auml; resursseja';
	lang_fi['GUARDADO'] 	= 'Tallennettu';
	lang_fi['DESP_ABR'] 	= 'Mov.';
	lang_fi['FALTA'] 	= 'Tarvitset';
	lang_fi['HOY'] 		= 't&auml;n&auml;&auml;n';
	lang_fi['MANYANA'] 	= 'huomenna';
	lang_fi['PAS_MANYANA'] 	= 'ylihuomenna';
	lang_fi['MERCADO'] 	= 'Marketti';
	lang_fi['CUARTEL'] 	= 'Kasarmi';
	lang_fi['PUNTO'] 	= 'Kokoontumispiste';
	lang_fi['CORRAL'] 	= 'Talli';
	lang_fi['TALLER'] 	= 'Ty&ouml;paja';
	lang_fi['ENVIAR'] 	= 'L&auml;het&auml; resursseja';
	lang_fi['COMPRAR'] 	= 'Osta';
	lang_fi['VENDER'] 	= 'Myy';
	lang_fi['ENVIAR_IGM'] 	= 'L&auml;het&auml; viesti';
	lang_fi['LISTO'] 	= 'Laajennettavissa';
	lang_fi['EL'] 		= '';
	lang_fi['A_LAS'] 	= '';
	lang_fi['EFICIENCIA'] 	= 'Teho';
	lang_fi['NUNCA'] 	= 'Ei koskaan';
	lang_fi['PC'] 		= 'Kulttuuripistett&auml;';
	lang_fi['FUNDAR'] 	= 'Voit perustaa tai valloittaa uuden kyl&auml;n';
	lang_fi['ALDEAS'] 	= 'Kyl&auml;(t)';
	lang_fi['ENV_TROPAS'] 	= 'L&auml;het&auml; joukkoja';
	lang_fi['RECURSO1'] 	= 'Puu';
	lang_fi['RECURSO2'] 	= 'Savi';
	lang_fi['RECURSO3'] 	= 'Rauta';
	lang_fi['RECURSO4'] 	= 'Vilja';
	lang_fi['TIEMPO'] 	= 'Aika';
	lang_fi['COMP'] 	= 'Taisteluraportin tiivist&auml;j&auml;';
	lang_fi['STAT'] 	= 'Tilastot';
	lang_fi['OFREZCO'] 	= 'Tarjoaa';
	lang_fi['BUSCO'] 	= 'Etsii';
	lang_fi['TIPO'] 	= 'Suhde';
	lang_fi['MAXTIME'] 	= 'Maksimi kuljetusaika (h)';
	lang_fi['DISPONIBLE'] 	= 'Samasta liittoumasta';
	lang_fi['CUALQUIERA'] 	= 'Kaikki';
	lang_fi['LOGIN'] 	= 'Kirjaudu sis&auml;&auml;n';
	lang_fi['SI'] 		= 'Kyll&auml;';
	lang_fi['NO'] 		= 'Ei';
	lang_fi['MARCADORES'] 	= 'Kirjanmerkit';
	lang_fi['ANYADIR'] 	= 'Lis&auml;&auml;';
	lang_fi['ENLACE'] 	= 'Uuden kirjanmerkin URL';
	lang_fi['TEXTO'] 	= 'Uuden kirjanmerkin kuvaus';
	lang_fi['ELIMINAR'] 	= 'Poista';
	lang_fi['MAPA'] 	= 'Kartta';
	lang_fi['CHECK'] 	= 'Tarkista uusi versio';
	lang_fi['ARCHIVE'] 	= 'Arkisto';
	lang_fi['RESUMEN'] 	= 'Katsaus';

	// Sueco (travian.se) gracias a Paul Nilsson y actualizada por Gummit-the-killer
	var lang_se = new Array();
	lang_se['ALIANZA'] 	= 'Allians';
	lang_se['PERFIL'] 	= 'Anv&#228;ndarprofil'; 
	lang_se['SIM'] 		= 'Krigssimulator';
	lang_se['CALC'] 	= 'Travian R&#228;knare';
	lang_se['SEGURO'] 	= '&#195;r du helt s&#228;ker?';
	lang_se['MARK'] 	= 'Markera alla';
	lang_se['PERDIDAS'] 	= 'F&#246;rlust';
	lang_se['RENT'] 	= 'Vinst';
	lang_se['SUBIR_NIVEL'] 	= 'Kan byggas nu!';
	lang_se['JUGADOR'] 	= 'Spelare';
	lang_se['ALDEA'] 	= 'By namn';
	lang_se['HAB'] 		= 'Befolkning';
	lang_se['COORD'] 	= 'Kordinater';
	lang_se['ACCION'] 	= 'Kommando';
	lang_se['ATACAR'] 	= 'Anfall';
	lang_se['COMERCIAR'] 	= 'Skicka resurser';
	lang_se['GUARDADO'] 	= 'Sparad';
	lang_se['DESP_ABR'] 	= 'Flytta';
	lang_se['FALTA'] 	= 'Det saknas';
	lang_se['HOY'] 		= 'idag';
	lang_se['MANYANA'] 	= 'i morgon';
	lang_se['PAS_MANYANA'] 	= 'i &#246;vermorgon';
	lang_se['MERCADO'] 	= 'Marknadsplats';
	lang_se['CUARTEL'] 	= 'Baracker';
	lang_se['PUNTO'] 	= 'Samlingsplats';
	lang_se['CORRAL'] 	= 'Stall';
	lang_se['TALLER'] 	= 'Verkstad';
	lang_se['ENVIAR'] 	= 'Skicka resurser';
	lang_se['COMPRAR'] 	= 'K&#246;p';
	lang_se['VENDER'] 	= 'S&#228;lj';
	lang_se['ENVIAR_IGM'] 	= 'Skicka IGM';
	lang_se['LISTO'] 	= 'Kan byggas';
	lang_se['EL'] 		= 'den';
	lang_se['A_LAS'] 	= 'klockan';
	lang_se['EFICIENCIA'] 	= 'Effektivitet';
	lang_se['NUNCA'] 	= 'Aldrig';
	lang_se['PC'] 		= 'Kulturpo&#228;ng';
	lang_se['FUNDAR'] 	= 'Du kan grunda eller er&#246;vra en ny by';
	lang_se['ALDEAS'] 	= 'By(ar)';
	lang_se['ENV_TROPAS'] 	= 'S&#228;nd trupper';
	lang_se['RECURSO1'] 	= 'Tr&#228;';
	lang_se['RECURSO2'] 	= 'Lera';
	lang_se['RECURSO3'] 	= 'J&#228;rn';
	lang_se['RECURSO4'] 	= 'Vete';
	lang_se['TIEMPO'] 	= 'Tid';
	lang_se['COMP'] 	= 'Rapport Komprimering';
	lang_se['STAT'] 	= 'Statistik';
	lang_se['OFREZCO'] 	= 'Erbjuder';
	lang_se['BUSCO'] 	= 'S&#246;ker';
	lang_se['TIPO'] 	= 'F&#246;rh&#229;llande';
	lang_se['DISPONIBLE'] 	= 'Visa enbart det du kan k&#246;pa';
	lang_se['CUALQUIERA'] 	= 'Vilken som';
	lang_se['SI'] 		= 'Ja';
	lang_se['NO'] 		= 'Nej';
	lang_se['MARCADORES'] 	= 'Bokm&#228;rke';
	lang_se['ANYADIR'] 	= 'L&#228;gg till';
	lang_se['ENLACE'] 	= 'Nytt bokm&#228;rke, ange URL';
	lang_se['TEXTO'] 	= 'Ange bokm&#228;rkets namn';
	lang_se['ELIMINAR'] 	= 'Ta bort';
	lang_se['MAPA'] 	= 'Karta';
	lang_se['CHECK'] 	= 'S&#246;k ny version';
	lang_se['MAXTIME']	= 'Max tid';
	lang_se['ARCHIVE'] 	= 'Arkiv';
	lang_se['RESUMEN'] 	= 'Summering';

	// Checo (travian.cz) thanks to nofak and Darius updated by Dvozdik
	var lang_cz = new Array();
	lang_cz['ALIANZA']      = 'Aliance';
	lang_cz['PERFIL']       = 'Profil';
	lang_cz['SIM']          = 'Bitevn&#237; simul&#225;tor';
	lang_cz['CALC']         = 'Travian kalkula&#269;ka';
	lang_cz['SEGURO']       = 'Jseš si jisty?';
	lang_cz['MARK']         = 'Vybrat v&scaron;e';
	lang_cz['PERDIDAS'] 	= 'Materi&aacute;ln&iacute; ztr&aacute;ta';
	lang_cz['RENT']         = 'V&yacute;nos';
	lang_cz['SUBIR_NIVEL']  = 'M&#367;&#382;e&scaron; stav&#283;t';
	lang_cz['JUGADOR']      = 'Hr&aacute;&#269;';
	lang_cz['ALDEA']        = 'Jm&eacute;no vesnice';
	lang_cz['HAB']          = 'Populace';
	lang_cz['COORD']        = 'Sou&#345;adnice';
	lang_cz['ACCION']       = 'Akce';
	lang_cz['ATACAR']       = '&Uacute;tok';
	lang_cz['COMERCIAR']    = 'Poslat suroviny';
	lang_cz['GUARDADO']     = 'Uloženo';
	lang_cz['DESP_ABR']     = 'Mov.';
	lang_cz['FALTA']        = 'Pot&#345ebuje&scaron;';
	lang_cz['HOY']          = 'dnes';
	lang_cz['MANYANA']      = 'z&iacute;tra';
	lang_cz['PAS_MANYANA']  = 'poz&iacute;t&#345;&iacute;';
	lang_cz['MERCADO']      = 'Tr&#382;i&scaron;t&#283;';
	lang_cz['CUARTEL']      = 'Kas&aacute;rny';
	lang_cz['PUNTO']        = 'Shroma&#382;di&scaron;t&#283;';
	lang_cz['CORRAL']       = 'St&aacute;je';
	lang_cz['TALLER']       = 'D&iacute;lna';
	lang_cz['ENVIAR']       = 'Poslat suroviny';
	lang_cz['COMPRAR']      = 'Koupit';
	lang_cz['VENDER']       = 'Prodat';
	lang_cz['ENVIAR_IGM']   = 'Poslat zpr&aacute;vu';
	lang_cz['LISTO']        = 'Bude&scaron; moci stav&#283;t';
	lang_cz['EL']           = 'dne';
	lang_cz['A_LAS']        = 'v';
	lang_cz['EFICIENCIA']   = '&Uacute;sp&#283;&scaron;nost'; 
	lang_cz['NUNCA']        = 'Nikdy';
	lang_cz['PC']           = 'Kulturn&iacute; body';
	lang_cz['FUNDAR']       = 'M&#367;&#382;e&#353; zalo&#382;it nebo dob&#237;t vesnici';
	lang_cz['ALDEAS']       = 'Vesnice';
	lang_cz['ENV_TROPAS']   = 'Poslat voj&aacute;ky';
	lang_cz['RECURSO1']     = 'D&#345;evo';
	lang_cz['RECURSO2']     = 'Hl&iacute;na';
	lang_cz['RECURSO3']     = '&#381;elezo';
	lang_cz['RECURSO4']     = 'Obil&iacute;';
	lang_cz['TIEMPO']       = '&#268;as';
	lang_cz['COMP']         = 'Report Compressor';
	lang_cz['STAT']         = 'Statistiky';
	lang_cz['OFREZCO']      = 'Nab&iacute;z&iacute;';
	lang_cz['BUSCO']        = 'Hled&aacute;';
	lang_cz['TIPO']         = 'Pom&#283;r';
	lang_cz['CUALQUIERA']   = 'Cokoliv';
	lang_cz['DETALLES']     = 'Detaily';
	lang_cz['MAP_EXT']      = 'Roz&#353;&#237;&#345;en&#225; mapa';
	lang_cz['DISPONIBLE']   = 'Jen dostupn&eacute;';
	lang_cz['SI']           = 'Ano';
	lang_cz['NO']           = 'Ne';
	lang_cz['LOGIN']        = 'Login';
	lang_cz['MARCADORES']   = 'Z&aacute;lo&#382;ky';
	lang_cz['ANYADIR']      = 'P&#345;idat';
	lang_cz['ENLACE']       = 'URL adresa';
	lang_cz['TEXTO']        = 'Popisek záložky';
	lang_cz['ELIMINAR']     = 'Smazat';
	lang_cz['MAPA']         = 'Mapa';
	lang_cz['VERSION']      = 'Dostupn&aacute; verze';
	lang_cz['MAXTIME']      = 'Maxim&aacute;ln&iacute; &#269;as';
	lang_cz['CHECK']        = 'Zjistit novou verzi';
	lang_cz['MAT_PRIMAS']   = 'Materi&aacute;l';
    lang_cz['ATAQUES']      = '&#218;tok';
    lang_cz['CONSTR']       = 'Stavba';
    lang_cz['TROPAS']       = 'Jednotky';
    lang_cz['ACTUALIZAR']   = 'Aktualizuj TBeyond';
    lang_cz['ARCHIVE']      = 'Archivovat';
    lang_cz['RESUMEN']      = 'P&#345;ehled';

// Ruso (travian.ru) gracias a Vladimir Yu Belov, mod by 7bit
     var lang_ru = new Array();
    lang_ru['ALIANZA']      = '&#1040;&#1083;&#1100;&#1103;&#1085;&#1089;';
    lang_ru['LOGIN']        = '&#1042;&#1093;&#1086;&#1076;';
    lang_ru['ENV_TROPAS']   = '&#1055;&#1086;&#1089;&#1083;&#1072;&#1090;&#1100; &#1074;&#1086;&#1081;&#1089;&#1082;&#1072;';
    lang_ru['PERFIL']       = '&#1055;&#1088;&#1086;&#1092;&#1080;&#1083;&#1100;';
    lang_ru['SIM']          = '&#1057;&#1080;&#1084;&#1091;&#1083;&#1103;&#1090;&#1086;&#1088;';
    lang_ru['CALC']         = 'Travian Calc';
    lang_ru['SEGURO']       = 'Вы уверены?'; //prompt message doesn't allow HTML Entities
    lang_ru['MARK']         = '&#1042;&#1099;&#1073;&#1088;&#1072;&#1090;&#1100; &#1074;&#1089;&#1077;';
    lang_ru['PERDIDAS']     = '&#1055;&#1086;&#1090;&#1077;&#1088;&#1080;';
    lang_ru['RENT']         = '&#1044;&#1086;&#1093;&#1086;&#1076;';
    lang_ru['SUBIR_NIVEL']  = '&#1042;&#1086;&#1079;&#1084;&#1086;&#1078;&#1085;&#1086; &#1088;&#1072;&#1079;&#1074;&#1080;&#1090;&#1080;&#1077;';
    lang_ru['JUGADOR']      = '&#1048;&#1075;&#1088;&#1086;&#1082;';
    lang_ru['ALDEA']        = '&#1053;&#1072;&#1079;&#1074;&#1072;&#1085;&#1080;&#1077; &#1087;&#1086;&#1089;&#1077;&#1083;&#1077;&#1085;&#1080;&#1103;';
    lang_ru['HAB']          = '&#1053;&#1072;&#1089;&#1077;&#1083;&#1077;&#1085;&#1080;&#1077;';
    lang_ru['COORD']        = '&#1050;&#1086;&#1086;&#1088;&#1076;&#1080;&#1085;&#1072;&#1090;&#1099;';
    lang_ru['ACCION']       = '&#1044;&#1077;&#1081;&#1089;&#1090;&#1074;&#1080;&#1103;';
    lang_ru['ATACAR']       = '&#1040;&#1090;&#1072;&#1082;&#1086;&#1074;&#1072;&#1090;&#1100;';
    lang_ru['COMERCIAR']    = '&#1055;&#1086;&#1089;&#1083;&#1072;&#1090;&#1100; &#1088;&#1077;&#1089;&#1091;&#1088;&#1089;&#1099;';
    lang_ru['GUARDADO']     = 'Сохранено'; //prompt message doesn't allow HTML Entities
    lang_ru['DESP_ABR']     = 'Mov.';
    lang_ru['FALTA']        = '&#1053;&#1077;&#1086;&#1073;&#1093;&#1086;&#1076;&#1080;&#1084;&#1086;';
    lang_ru['HOY']          = '&#1089;&#1077;&#1075;&#1086;&#1076;&#1085;&#1103;';
    lang_ru['MANYANA']      = '&#1079;&#1072;&#1074;&#1090;&#1088;&#1072;';
    lang_ru['PAS_MANYANA']  = '&#1087;&#1086;&#1089;&#1083;&#1077;&#1079;&#1072;&#1074;&#1090;&#1088;&#1072;';
    lang_ru['MERCADO']      = '&#1056;&#1099;&#1085;&#1086;&#1082;';
    lang_ru['CUARTEL']      = '&#1050;&#1072;&#1079;&#1072;&#1088;&#1084;&#1072;';
    lang_ru['PUNTO']        = '&#1055;&#1091;&#1085;&#1082;&#1090; &#1089;&#1073;&#1086;&#1088;&#1072;';
    lang_ru['CORRAL']       = '&#1050;&#1086;&#1085;&#1102;&#1096;&#1085;&#1103;';
    lang_ru['TALLER']       = '&#1052;&#1072;&#1089;&#1090;&#1077;&#1088;&#1089;&#1082;&#1072;&#1103;';
    lang_ru['ENVIAR']       = '&#1055;&#1086;&#1089;&#1083;&#1072;&#1090;&#1100; &#1088;&#1077;&#1089;&#1091;&#1088;&#1089;&#1099;';
    lang_ru['COMPRAR']      = '&#1050;&#1091;&#1087;&#1080;&#1090;&#1100;';
    lang_ru['VENDER']       = '&#1055;&#1088;&#1086;&#1076;&#1072;&#1090;&#1100;';
    lang_ru['ENVIAR_IGM']   = '&#1055;&#1086;&#1089;&#1083;&#1072;&#1090;&#1100; &#1089;&#1086;&#1086;&#1073;&#1097;&#1077;&#1085;&#1080;&#1077;';
    lang_ru['LISTO']        = '&#1056;&#1072;&#1079;&#1074;&#1080;&#1090;&#1080;&#1077; &#1073;&#1091;&#1076;&#1077;&#1090; &#1074;&#1086;&#1079;&#1084;&#1086;&#1078;&#1085;&#1086;';
    lang_ru['EL']           = '';
    lang_ru['A_LAS']        = '&#1074;';
    lang_ru['EFICIENCIA']   = '&#1069;&#1092;&#1092;&#1077;&#1082;&#1090;&#1080;&#1074;&#1085;&#1086;&#1089;&#1090;&#1100;';
    lang_ru['NUNCA']        = '&#1053;&#1080;&#1082;&#1086;&#1075;&#1076;&#1072;';
    lang_ru['PC']           = '&#1077;&#1076;&#1080;&#1085;&#1080;&#1094; &#1082;&#1091;&#1083;&#1100;&#1090;&#1091;&#1088;&#1099;';
    lang_ru['FUNDAR']       = '&#1042;&#1099; &#1084;&#1086;&#1078;&#1077;&#1090;&#1077; &#1086;&#1089;&#1085;&#1086;&#1074;&#1072;&#1090;&#1100; &#1085;&#1086;&#1074;&#1086;&#1077; &#1080;&#1083;&#1080; &#1079;&#1072;&#1093;&#1074;&#1072;&#1090;&#1080;&#1090;&#1100; &#1095;&#1091;&#1078;&#1086;&#1077; &#1087;&#1086;&#1089;&#1077;&#1083;&#1077;&#1085;&#1080;&#1077;';
    lang_ru['ALDEAS']       = '&#1044;&#1077;&#1088;&#1077;&#1074;&#1085;&#1080;';
    lang_ru['TROPAS']       = '&#1055;&#1086;&#1089;&#1083;&#1072;&#1090;&#1100; &#1074;&#1086;&#1081;&#1089;&#1082;&#1072;';
    lang_ru['RECURSO1']     = '&#1044;&#1088;&#1077;&#1074;&#1077;&#1089;&#1080;&#1085;&#1072;';
    lang_ru['RECURSO2']     = '&#1043;&#1083;&#1080;&#1085;&#1072;';
    lang_ru['RECURSO3']     = '&#1046;&#1077;&#1083;&#1077;&#1079;&#1086;';
    lang_ru['RECURSO4']     = '&#1047;&#1077;&#1088;&#1085;&#1086;';
    lang_ru['TIEMPO']       = '&#1042;&#1088;&#1077;&#1084;&#1103;';
    lang_ru['COMP']         = '&#1051;&#1086;&#1075;&#1080;';
    lang_ru['STAT']         = '&#1057;&#1090;&#1072;&#1090;&#1080;&#1089;&#1090;&#1080;&#1082;&#1072;';
    lang_ru['OFREZCO']      = '&#1055;&#1088;&#1086;&#1076;&#1072;&#1078;&#1072;';
    lang_ru['BUSCO']        = '&#1055;&#1086;&#1082;&#1091;&#1087;&#1082;&#1072;';
    lang_ru['TIPO']         = '&#1057;&#1086;&#1086;&#1090;&#1085;&#1086;&#1096;&#1077;&#1085;&#1080;&#1077;';
    lang_ru['CUALQUIERA']   = '&#1042;&#1089;&#1077;';
    lang_ru['SI']           = '&#1044;&#1072;';
    lang_ru['NO']           = '&#1053;&#1077;&#1090;';
    lang_ru['MARCADORES']   = '&#1047;&#1072;&#1082;&#1083;&#1072;&#1076;&#1082;&#1080;';
    lang_ru['ANYADIR']      = '&#1044;&#1086;&#1073;&#1072;&#1074;&#1080;&#1090;&#1100;';
    lang_ru['ENLACE']       = 'URL новой закладки'; //prompt message doesn't allow HTML Entities
    lang_ru['TEXTO']        = 'Название новой закладки'; //prompt message doesn't allow HTML Entities
    lang_ru['ELIMINAR']     = '&#1059;&#1076;&#1072;&#1083;&#1080;&#1090;&#1100;';
    lang_ru['MAPA']         = '&#1050;&#1072;&#1088;&#1090;&#1072;';
    lang_ru['DISPONIBLE']   = '&#1058;&#1086;&#1083;&#1100;&#1082;&#1086; &#1076;&#1086;&#1089;&#1090;&#1091;&#1087;&#1085;&#1099;&#1077; &#1076;&#1083;&#1103; &#1087;&#1086;&#1082;&#1091;&#1087;&#1082;&#1080;';


    // Danes (travian.dk) gracias a coocsnake
    var lang_dk = new Array();
    lang_dk['ALIANZA']      = 'Alliance';
    lang_dk['PERFIL']       = 'Brugerprofil';
    lang_dk['SIM']          = 'Kampsimulator';
    lang_dk['CALC']         = 'Travian Calc';
    lang_dk['SEGURO']       = 'Er du sikker?'; //prompt message doesn't allow HTML Entities
    lang_dk['MARK']         = 'V&aelig;lg alle';
    lang_dk['PERDIDAS']     = 'Tab';
    lang_dk['RENT']         = 'Profit';
    lang_dk['SUBIR_NIVEL']  = 'Udvidelse tilg&aelig;ngelig';
    lang_dk['JUGADOR']      = 'Spiller';
    lang_dk['ALDEA']        = 'Bynavn';
    lang_dk['HAB']          = 'Befolkning';
    lang_dk['COORD']        = 'Koordinater';
    lang_dk['ACCION']       = 'Handlinger';
    lang_dk['ATACAR']       = 'Angrib';
    lang_dk['COMERCIAR']    = 'Send r&aring;stoffer';
    lang_dk['GUARDADO']     = 'Gemt';
    lang_dk['DESP_ABR']     = 'Mov.';
    lang_dk['FALTA']        = 'Du har brug for';
    lang_dk['HOY']          = 'i dag';
    lang_dk['MANYANA']      = 'i morgen';
    lang_dk['PAS_MANYANA']  = 'i overmorgen';
    lang_dk['MERCADO']      = 'Markedsplads';
    lang_dk['CUARTEL']      = 'Kaserne';
    lang_dk['PUNTO']        = 'Forsamlingsplads';
    lang_dk['CORRAL']       = 'Stald';
    lang_dk['TALLER']       = 'V&aelig;rksted';
    lang_dk['ENVIAR']       = 'Send r&aring;stoffer';
    lang_dk['COMPRAR']      = 'K&oslash;b';
    lang_dk['VENDER']       = 'S&aelig;lg';
    lang_dk['ENVIAR_IGM']   = 'Send IGM';
    lang_dk['LISTO']        = 'Udvidelse tilg&aelig;ngelig';
    lang_dk['EL']           = 'p&aring;';
    lang_dk['A_LAS']        = 'kl.';
    lang_dk['EFICIENCIA']   = 'Effektivitet';
    lang_dk['NUNCA']        = 'Aldrig';
    lang_dk['PC']           = 'kultur points';
    lang_dk['FUNDAR']       = 'Du kan grundl&aelig;gge eller overtage en ny by';
    lang_dk['ALDEAS']       = 'By(er)';
    lang_dk['ENV_TROPAS']   = 'Send tropper';
    lang_dk['RECURSO1']     = 'Tr&aelig;';
    lang_dk['RECURSO2']     = 'Ler';
    lang_dk['RECURSO3']     = 'Jern';
    lang_dk['RECURSO4']     = 'Korn';
    lang_dk['TIEMPO']       = 'Tid';
    lang_dk['COMP']         = 'Rapport-kompressor';
    lang_dk['STAT']         = 'Statistik';
    lang_dk['OFREZCO']      = 'Tilbyder';
    lang_dk['BUSCO']        = 'S&oslash;ger';
    lang_dk['TIPO']         = 'Type';
    lang_dk['DISPONIBLE']   = 'Kun tilg&aelig;ngelig';
    lang_dk['CUALQUIERA']   = 'Alle';
    lang_dk['SI']           = 'Ja';
    lang_dk['NO']           = 'Nej';
    lang_dk['MARCADORES']   = 'Bogm&aelig;rker';
    lang_dk['ANYADIR']      = 'Tilf&oslash;j';
    lang_dk['ENLACE']       = 'Nyt bogmærke URL'; //prompt message doesn't allow HTML Entities
    lang_dk['TEXTO']        = 'Nyt bogmærke tekst'; //prompt message doesn't allow HTML Entities
    lang_dk['ELIMINAR']     = 'Slet';
    lang_dk['MAPA']         = 'Kort';
    lang_dk['CHECK']        = 'Check ny version';
    lang_dk['ARCHIVE']      = 'Arkiv';
    lang_dk['RESUMEN']      = 'Resume';

	// Hrvatski/Croatian (travian.com.hr) por Croat
	var lang_hr = new Array(); 
	lang_hr['ALIANZA'] 	= 'Savez'; 
	lang_hr['PERFIL'] 	= 'Korisni&#269;ki profil'; 
	lang_hr['SIM'] 		= 'Simulator borbe'; 
	lang_hr['CALC'] 	= 'Travian Calc'; 
	lang_hr['SEGURO'] 	= 'Jeste li sigurni?'; 
	lang_hr['MARK'] 	= 'Ozna&#269;i sve'; 
	lang_hr['PERDIDAS'] 	= 'Gubitak'; 
	lang_hr['RENT'] 	= 'Profit'; 
	lang_hr['SUBIR_NIVEL'] 	= 'Nadogradnja dostupna'; 
	lang_hr['JUGADOR'] 	= 'Igra&#269;'; 
	lang_hr['ALDEA'] 	= 'Ime Sela'; 
	lang_hr['HAB'] 		= 'Populacija'; 
	lang_hr['COORD'] 	= 'Koordinate'; 
	lang_hr['ACCION'] 	= 'Akcije'; 
	lang_hr['ATACAR'] 	= 'Napad'; 
	lang_hr['COMERCIAR'] 	= 'Po&#353;alji Resurse'; 
	lang_hr['GUARDADO'] 	= 'Spremljeno'; 
	lang_hr['DESP_ABR'] 	= 'Korak'; 
	lang_hr['FALTA'] 	= 'Trebate'; 
	lang_hr['HOY'] 		= 'danas'; 
	lang_hr['MANYANA'] 	= 'sutra'; 
	lang_hr['PAS_MANYANA'] 	= 'prekosutra'; 
	lang_hr['MERCADO'] 	= 'Tr&#382;nica'; 
	lang_hr['CUARTEL'] 	= 'Vojarna'; 
	lang_hr['PUNTO'] 	= 'Okupljali&#353;te'; 
	lang_hr['CORRAL'] 	= '&#352;tala'; 
	lang_hr['TALLER'] 	= 'Radionica'; 
	lang_hr['ENVIAR'] 	= 'Po&#353;alji resurse'; 
	lang_hr['COMPRAR'] 	= 'Kupi'; 
	lang_hr['VENDER'] 	= 'Prodaj'; 
	lang_hr['ENVIAR_IGM'] 	= 'Po&#353;alji poruku'; 
	lang_hr['LISTO'] 	= 'Dostupno'; 
	lang_hr['EL'] 		= ''; 
	lang_hr['A_LAS'] 	= 'u'; 
	lang_hr['EFICIENCIA'] 	= 'Efikasnost'; 
	lang_hr['NUNCA'] 	= 'Nikada'; 
	lang_hr['PC'] 		= 'Kulturalni bodovi'; 
	lang_hr['FUNDAR'] 	= 'Mo&#382;ete Izgraditi ili pokoriti novo naselje'; 
	lang_hr['ALDEAS'] 	= 'Naselja'; 
	lang_hr['ENV_TROPAS'] 	= 'Po&#353;alji vojsku'; 
	lang_hr['RECURSO1'] 	= 'Drvo'; 
	lang_hr['RECURSO2'] 	= 'Glina'; 
	lang_hr['RECURSO3'] 	= '&#381;eljezo'; 
	lang_hr['RECURSO4'] 	= 'Hrana'; 
	lang_hr['TIEMPO'] 	= 'Vrijeme'; 
	lang_hr['COMP'] 	= 'Report Compressor'; 
	lang_hr['STAT'] 	= 'Statistika'; 
	lang_hr['OFREZCO'] 	= 'Nudi'; 
	lang_hr['BUSCO'] 	= 'Tra&#382;i'; 
	lang_hr['TIPO'] 	= 'Tip'; 
	lang_hr['DISPONIBLE'] 	= 'Dostupno samo'; 
	lang_hr['CUALQUIERA'] 	= 'Bilo koji'; 
	lang_hr['SI'] 		= 'Da'; 
	lang_hr['NO'] 		= 'Ne'; 
	lang_hr['MARCADORES'] 	= 'Bookmarks'; 
	lang_hr['ANYADIR'] 	= 'Dodaj'; 
	lang_hr['ENLACE'] 	= 'Novi Bookmark URL'; 
	lang_hr['TEXTO'] 	= 'Novi Bookmark Text'; 
	lang_hr['ELIMINAR'] 	= 'Izbri&#353;i'; 
	lang_hr['MAPA'] 	= 'Zemljovid'; 
	lang_hr['CHECK'] 	= 'Provjeri novu verziju'; 
	lang_hr['ARCHIVE'] 	= 'Arhiv'; 
	lang_hr['RESUMEN'] 	= 'Sa&#382;etak';

	// Bulgaro (travian.bg) gracias a IYI-Aryan
	var lang_bg = new Array(); 
	lang_bg['ALIANZA'] 	= '&#1057;&#1098;&#1102;&#1079;'; 
	lang_bg['PERFIL'] 	= '&#1055;&#1088;&#1086;&#1092;&#1080;&#1083;'; 
	lang_bg['SIM'] 		= '&#1057;&#1080;&#1084;&#1091;&#1083;&#1072;&#1090;&#1086;&#1088;-&#1073;&#1080;&#1090;&#1082;&#1080;'; 
	lang_bg['CALC'] 	= 'Travian &#1082;&#1072;&#1083;&#1082;&#1091;&#1083;&#1072;&#1090;&#1086;&#1088;'; 
	lang_bg['SEGURO'] 	= '&#1057;&#1080;&#1075;&#1091;&#1088;&#1077;&#1085; &#1083;&#1080; &#1089;&#1080;?'; 
	lang_bg['MARK'] 	= '&#1048;&#1079;&#1073;&#1077;&#1088;&#1080; &#1074;&#1089;&#1080;&#1095;&#1082;&#1086;'; 
	lang_bg['PERDIDAS'] 	= '&#1047;&#1072;&#1075;&#1091;&#1073;&#1080;'; 
	lang_bg['RENT'] 	= '&#1055;&#1077;&#1095;&#1072;&#1083;&#1073;&#1072;'; 
	lang_bg['SUBIR_NIVEL'] 	= '&#1052;&#1086;&#1078;&#1077;&#1090;&#1077; &#1076;&#1072; &#1085;&#1072;&#1076;&#1089;&#1090;&#1088;&#1086;&#1081;&#1074;&#1072;&#1090;&#1077;'; 
	lang_bg['JUGADOR'] 	= '&#1048;&#1075;&#1088;&#1072;&#1095;'; 
	lang_bg['ALDEA'] 	= '&#1048;&#1084;&#1077; &#1085;&#1072; &#1089;&#1077;&#1083;&#1086;'; 
	lang_bg['HAB'] 		= '&#1055;&#1086;&#1087;&#1091;&#1083;&#1072;&#1094;&#1080;&#1103;'; 
	lang_bg['COORD'] 	= '&#1050;&#1086;&#1086;&#1088;&#1076;&#1080;&#1085;&#1072;&#1090;&#1080;'; 
	lang_bg['ACCION'] 	= '&#1044;&#1077;&#1081;&#1089;&#1090;&#1074;&#1080;&#1103;'; 
	lang_bg['ATACAR'] 	= '&#1040;&#1090;&#1072;&#1082;&#1072;'; 
	lang_bg['COMERCIAR'] 	= '&#1048;&#1079;&#1087;&#1088;&#1072;&#1090;&#1080; &#1088;&#1077;&#1089;&#1091;&#1088;&#1089;&#1080;'; 
	lang_bg['GUARDADO'] 	= '&#1047;&#1072;&#1087;&#1080;&#1089;&#1072;&#1085;&#1086;'; 
	lang_bg['DESP_ABR'] 	= '&#1055;&#1088;&#1077;&#1084;&#1077;&#1089;&#1090;&#1074;&#1072;&#1085;&#1077; &#1089; '; 
	lang_bg['FALTA'] 	= '&#1058;&#1088;&#1103;&#1073;&#1074;&#1072;&#1090; &#1074;&#1080;'; 
	lang_bg['HOY'] 		= '&#1076;&#1085;&#1077;&#1089;'; 
	lang_bg['MANYANA'] 	= '&#1091;&#1090;&#1088;&#1077;'; 
	lang_bg['PAS_MANYANA'] 	= '&#1074;&#1076;&#1088;&#1091;&#1075;&#1080;&#1076;&#1077;&#1085;'; 
	lang_bg['MERCADO'] 	= '&#1055;&#1072;&#1079;&#1072;&#1088;'; 
	lang_bg['CUARTEL'] 	= '&#1050;&#1072;&#1079;&#1072;&#1088;&#1084;&#1080;'; 
	lang_bg['PUNTO'] 	= '&#1065;&#1072;&#1073;'; 
	lang_bg['CORRAL'] 	= '&#1050;&#1086;&#1085;&#1102;&#1096;&#1085;&#1103;'; 
	lang_bg['TALLER'] 	= '&#1056;&#1072;&#1073;&#1086;&#1090;&#1080;&#1083;&#1085;&#1080;&#1094;&#1072;'; 
	lang_bg['ENVIAR'] 	= '&#1048;&#1079;&#1087;&#1088;&#1072;&#1090;&#1080; &#1088;&#1077;&#1089;&#1091;&#1088;&#1089;&#1080;'; 
	lang_bg['COMPRAR'] 	= '&#1050;&#1091;&#1087;&#1080; &#1088;&#1077;&#1089;&#1091;&#1088;&#1089;&#1080;'; 
	lang_bg['VENDER'] 	= '&#1055;&#1088;&#1086;&#1076;&#1072;&#1081; &#1088;&#1077;&#1089;&#1091;&#1088;&#1089;&#1080;'; 
	lang_bg['ENVIAR_IGM'] 	= '&#1048;&#1079;&#1087;&#1088;&#1072;&#1090;&#1080; &#1051;&#1057;'; 
	lang_bg['LISTO'] 	= '&#1042; &#1085;&#1072;&#1083;&#1080;&#1095;&#1085;&#1086;&#1089;&#1090;'; 
	lang_bg['EL'] 		= '&#1085;&#1072;'; 
	lang_bg['A_LAS'] 	= '&#1074;'; 
	lang_bg['EFICIENCIA'] 	= '&#1045;&#1092;&#1077;&#1082;&#1090;&#1080;&#1074;&#1085;&#1086;&#1089;&#1090;'; 
	lang_bg['NUNCA'] 	= '&#1053;&#1080;&#1082;&#1086;&#1075;&#1072;'; 
	lang_bg['PC'] 		= '&#1082;&#1091;&#1083;&#1090;&#1091;&#1088;&#1085;&#1080; &#1090;&#1086;&#1095;&#1082;&#1080;'; 
	lang_bg['FUNDAR'] 	= '&#1052;&#1086;&#1078;&#1077;&#1090;&#1077; &#1076;&#1072; &#1079;&#1072;&#1089;&#1077;&#1083;&#1080;&#1090;&#1077; &#1080;&#1083;&#1080; &#1079;&#1072;&#1074;&#1083;&#1072;&#1076;&#1077;&#1077;&#1090;&#1077; &#1085;&#1086;&#1074;&#1086; &#1089;&#1077;&#1083;&#1086;'; 
	lang_bg['ALDEAS'] 	= '&#1057;&#1077;&#1083;&#1086;(&#1072;)'; 
	lang_bg['ENV_TROPAS'] 	= '&#1048;&#1079;&#1087;&#1088;&#1072;&#1090;&#1080; &#1072;&#1088;&#1084;&#1080;&#1103;'; 
	lang_bg['RECURSO1'] 	= '&#1044;&#1098;&#1088;&#1074;&#1086;'; 
	lang_bg['RECURSO2'] 	= '&#1043;&#1083;&#1080;&#1085;&#1072;'; 
	lang_bg['RECURSO3'] 	= '&#1046;&#1077;&#1083;&#1103;&#1079;&#1086;'; 
	lang_bg['RECURSO4'] 	= '&#1046;&#1080;&#1090;&#1086;'; 
	lang_bg['TIEMPO'] 	= '&#1042;&#1088;&#1077;&#1084;&#1077;'; 
	lang_bg['COMP'] 	= '&#1050;&#1086;&#1084;&#1087;&#1088;&#1077;&#1089;&#1080;&#1088;&#1072;&#1081; &#1076;&#1086;&#1082;&#1083;&#1072;&#1076;&#1072;'; 
	lang_bg['STAT'] 	= '&#1057;&#1090;&#1072;&#1090;&#1080;&#1089;&#1090;&#1080;&#1082;&#1072;'; 
	lang_bg['OFREZCO'] 	= '&#1055;&#1088;&#1086;&#1076;&#1072;&#1074;&#1072;'; 
	lang_bg['BUSCO'] 	= '&#1050;&#1091;&#1087;&#1091;&#1074;&#1072;'; 
	lang_bg['TIPO'] 	= '&#1058;&#1080;&#1087;'; 
	lang_bg['DISPONIBLE'] 	= '&#1057;&#1072;&#1084;&#1086; &#1074;&#1098;&#1079;&#1084;&#1086;&#1078;&#1085;&#1080;&#1090;&#1077;'; 
	lang_bg['CUALQUIERA'] 	= '&#1042;&#1089;&#1103;&#1082;&#1072;&#1082;&#1074;&#1080;'; 
	lang_bg['SI'] 		= '&#1044;&#1072;'; 
	lang_bg['NO'] 		= '&#1053;&#1077;'; 
	lang_bg['MARCADORES'] 	= '&#1054;&#1090;&#1084;&#1077;&#1090;&#1082;&#1080;'; 
	lang_bg['ANYADIR'] 	= '&#1044;&#1086;&#1073;&#1072;&#1074;&#1080;'; 
	lang_bg['ENLACE'] 	= '&#1055;&#1098;&#1090; &#1085;&#1072; &#1085;&#1086;&#1074;&#1072;&#1090;&#1072; &#1086;&#1090;&#1084;&#1077;&#1090;&#1082;&#1072;'; 
	lang_bg['TEXTO'] 	= '&#1058;&#1077;&#1082;&#1089;&#1090; &#1085;&#1072; &#1085;&#1086;&#1074;&#1072; &#1086;&#1090;&#1084;&#1077;&#1090;&#1082;&#1072;'; 
	lang_bg['ELIMINAR'] 	= '&#1048;&#1079;&#1090;&#1088;&#1080;&#1081;'; 
	lang_bg['MAPA'] 	= '&#1050;&#1072;&#1088;&#1090;&#1072;'; 
	lang_bg['CHECK'] 	= '&#1055;&#1088;&#1086;&#1074;&#1077;&#1088;&#1080; &#1079;&#1072; &#1085;&#1086;&#1074;&#1072; &#1074;&#1077;&#1088;&#1089;&#1080;&#1103;'; 
	lang_bg['ARCHIVE'] 	= '&#1040;&#1088;&#1093;&#1080;&#1074;'; 
	lang_bg['RESUMEN'] 	= '&#1054;&#1073;&#1097;&#1086;'; 
	lang_bg['LOGIN'] 	= '&#1042;&#1083;&#1080;&#1079;&#1072;&#1085;&#1077;'; 
	lang_bg['TIPO'] 	= '&#1050;&#1086;&#1077;&#1092;&#1080;&#1094;&#1080;&#1077;&#1085;&#1090;'; 
	lang_bg['MAXTIME'] 	= '&#1052;&#1072;&#1082;&#1089;. &#1074;&#1088;&#1077;&#1084;&#1077;';

	// Hungarian (travian.hu)
	var lang_hu = new Array();
	lang_hu['ALIANZA'] 			= 'Kl&#225;n';
	lang_hu['PERFIL'] 			= 'Felhaszn&#225;l&#243; Profil';
	lang_hu['SIM'] 				= 'Harc Szimul&#225;tor';
	lang_hu['CALC'] 			= 'Travian Kalkul&#225;tor';
	lang_hu['SEGURO'] 			= 'Biztos vagy benne?';
	lang_hu['MARK'] 			= 'Kijel&#246;li mindet';
	lang_hu['PERDIDAS'] 		= 'vesztes&#233;g';
	lang_hu['RENT'] 			= 'Haszon';
	lang_hu['SUBIR_NIVEL'] 		= '<font color="red"><strong>B&#337;v&#237;t&#233;s lehets&#233;ges</strong></font>';
	lang_hu['JUGADOR']	 		= 'J&#225;t&#233;kos';
	lang_hu['ALDEA'] 			= 'Falu neve';
	lang_hu['HAB'] 				= 'N&#233;pess&#233;g';
	lang_hu['COORD'] 			= 'Koordin&#225;t&#225;k';
	lang_hu['ACCION'] 			= 'Esem&#233;nyek';
	lang_hu['ATACAR'] 			= 'T&#225;mad&#225;s';
	lang_hu['COMERCIAR'] 		= 'Nyersanyag k&#252;ld&#233;se';
	lang_hu['GUARDADO'] 		= 'Mentve';
	lang_hu['DESP_ABR'] 		= 'Mozg&#225;s:';
	lang_hu['FALTA'] 			= 'Sz&#252;ks&#233;ged van';
	lang_hu['HOY'] 				= 'ma';
	lang_hu['MANYANA'] 			= 'holnap';
	lang_hu['PAS_MANYANA'] 		= 'holnaput&#225;n';
	lang_hu['MERCADO'] 			= 'Piac';
	lang_hu['CUARTEL'] 			= 'Kasz&#225;rnya';
	lang_hu['PUNTO'] 			= 'Gy&#252;lekez&#337;t&#233;r';
	lang_hu['CORRAL'] 			= 'Ist&#225;ll&#243;';
	lang_hu['TALLER'] 			= 'M&#369;hely';
	lang_hu['ENVIAR'] 			= 'Nyersanyag k&#252;ld&#233;se';
	lang_hu['COMPRAR'] 			= 'V&#225;s&#225;rl&#225;s';
	lang_hu['VENDER'] 			= 'Elad&#225;s';
	lang_hu['ENVIAR_IGM'] 		= '&#220;zenet k&#252;ld&#233;se';
	lang_hu['LISTO'] 			= 'B&#337;v&#237;t&#233;s lehets&#233;ges';
	lang_hu['EL'] 				= '';
	lang_hu['A_LAS'] 			= '';
	lang_hu['EFICIENCIA'] 		= 'Hat&#233;konys&#225;g'; 
	lang_hu['NUNCA']			= 'Soha';
	lang_hu['PC']          	 	= 'kult&#250;ra pontok';
	lang_hu['FUNDAR']     	 	= 'Alap&#237;thatsz vagy megh&#243;d&#237;thatsz egy &#250;j falut';
	lang_hu['ALDEAS']      		= 'Falu(k)';
	lang_hu['ENV_TROPAS'] 		= 'Egys&#233;g k&#252;ld&#233;se';
	lang_hu['RECURSO1']    		= 'Fa';
	lang_hu['RECURSO2']    		= 'Agyag';
	lang_hu['RECURSO3']    		= 'Vas';
	lang_hu['RECURSO4']    		= 'B&#250;za';
	lang_hu['TIEMPO']      		= 'Id&#337;';
	lang_hu['COMP']        		= 'Riport t&#246;m&#246;r&#237;t&#337;';
	lang_hu['STAT']				= 'Statisztika';
	lang_hu['OFREZCO']			= 'Aj&#225;nl&#225;s';
	lang_hu['BUSCO']			= 'Keres&#233;s';
	lang_hu['TIPO']				= 'Ar&#225;ny';
	lang_hu['DISPONIBLE']		= 'Csak elfogadhat&#243;ak';
	lang_hu['CUALQUIERA']		= 'B&#225;rmelyik';
	lang_hu['SI']				= 'Sz&#369;rt';
	lang_hu['NO']				= 'Mind';
	lang_hu['LOGIN']			= 'Bejelentkez&#233;s';
    lang_hu['MARCADORES']		= 'K&#246;nyvjelz&#337;k';
    lang_hu['ANYADIR']			= 'Hozz&#225;ad';
    lang_hu['ENLACE']			= '&#218;j URL';
    lang_hu['TEXTO']			= '&#218;j sz&#246;veg';
	lang_hu['ELIMINAR']			= 'T&#246;rl&#233;s';
	lang_hu['MAPA']				= 'T&#233;rk&#233;p';
	lang_hu['CHECK']			= '&#218;j verzi&#243; keres&#233;se';
	lang_hu['ARCHIVE']			= 'Arch&#237;vum';
	lang_hu['RESUMEN']			= '&#214;sszesen';
	lang_hu['MAXTIME']			= 'Maximum id&#337;';
	lang_hu['VERSION']			= 'A legfrissebb verzi&#243;';
	lang_hu['DETALLES']			= 'R&#233;szletek';
	lang_hu['MAP_EXT']			= 'Kiterjesztett t&#233;rk&#233;p';
	lang_hu['MAT_PRIMAS']		= 'Nyersanyagok';
	lang_hu['ATAQUES']			= 'T&#225;mad&#225;s';
	lang_hu['CONSTR']			= '&#201;p&#237;t&#233;s';
	lang_hu['TROPAS']			= 'Sereg';
	lang_hu['ACTUALIZAR']		= 'Friss&#237;t';
	lang_hu['RES'] 				= 'Kutat&#225;sifa';
    lang_hu['STOREURL']         = 'Storage URL';
    lang_hu['STOREPASSWORD']    = 'Storage jelsz&#243;';
    lang_hu['OPTIONS']    		= 'Be&#225;ll&#237;t&#225;sok';
    lang_hu['VENTAS']    		= 'Mentett eladások';
    lang_hu['SHOWINFO']    		= 'Nyersanyagot mutat';
    lang_hu['HIDEINFO']    		= 'Nyersanyagot elrejt';
    lang_hu['MAPSCAN']    		= 'Nyersanyagscan';


	// Eslovaco - Slovakia (travian.sk) transl. Kolumbus
	var lang_sk = new Array();
	lang_sk['ALIANZA']      = 'Aliancia';
	lang_sk['PERFIL']       = 'Profil';
	lang_sk['SIM']          = 'Bojov&#253; simul&#225;tor';
	lang_sk['CALC']         = 'Travian kalkula&#269;ka';
	lang_sk['SEGURO']       = 'Si si istý?';
	lang_sk['MARK']         = 'Vybra&#357; v&#353;etko';
	lang_sk['PERDIDAS'] 	= 'Straty';
	lang_sk['RENT']         = 'Zisk';
	lang_sk['SUBIR_NIVEL']  = 'M&#244;&#382;e&#353; stava&#357;';
	lang_sk['JUGADOR']      = 'Hr&#225;&#269;';
	lang_sk['ALDEA']        = 'Meno dediny';
	lang_sk['HAB']          = 'Popul&#225;cia';
	lang_sk['COORD']        = 'S&#250;radnice';
	lang_sk['ACCION']       = 'Akcia';
	lang_sk['ATACAR']       = '&#218;tok';
	lang_sk['COMERCIAR']    = 'Posla&#357; suroviny';
	lang_sk['GUARDADO']     = 'Uložené';
	lang_sk['DESP_ABR']     = 'Pohyb o (po&#269;et) pol&#237;';
	lang_sk['FALTA']        = 'Potrebuje&#353;';
	lang_sk['HOY']          = 'dnes';
	lang_sk['MANYANA']      = 'zajtra';
	lang_sk['PAS_MANYANA']  = 'pozajtra';
	lang_sk['MERCADO']      = 'Trhovisko';
	lang_sk['CUARTEL']      = 'Kas&#225;rne';
	lang_sk['PUNTO']        = 'Zhroma&#382;di&#353;te';
	lang_sk['CORRAL']       = 'Stajne';
	lang_sk['TALLER']       = 'Diel&#328;a';
	lang_sk['ENVIAR']       = 'Posla&#357; suroviny';
	lang_sk['COMPRAR']      = 'K&#250;pi&#357;';
	lang_sk['VENDER']       = 'Preda&#357;';
	lang_sk['ENVIAR_IGM']   = 'Posla&#357; spr&#225;vu';
	lang_sk['LISTO']        = 'Bude&#353; m&#244;c&#357; stava&#357;';
	lang_sk['EL']           = 'd&#328;a';
	lang_sk['A_LAS']        = 'o';
	lang_sk['EFICIENCIA']   = 'Efekt&#237;vnos&#357;'; 
	lang_sk['NUNCA']        = 'Nikdy';
	lang_sk['PC']           = 'Kult&#250;rne body';
	lang_sk['FUNDAR']       = 'Mo&#382;e&#353; zalo&#382;i&#357; alebo dobi&#357; nov&#250; dedinu';
	lang_sk['ALDEAS']       = 'Dedina';
	lang_sk['ENV_TROPAS']   = 'Posla&#357; jednotky';
	lang_sk['RECURSO1']     = 'Drevo';
	lang_sk['RECURSO2']     = 'Hlina';
	lang_sk['RECURSO3']     = '&#381;elezo';
	lang_sk['RECURSO4']     = 'Obilie;';
	lang_sk['TIEMPO']       = '&#268;as';
	lang_sk['COMP']         = 'Komprimova&#357; z&#225;znam';
	lang_sk['STAT']         = '&#352;tatistiky';
	lang_sk['OFREZCO']      = 'Pon&#250;ka';
	lang_sk['BUSCO']        = 'H&#318;ad&#225;';
	lang_sk['TIPO']         = 'Pomer';
	lang_sk['CUALQUIERA']   = 'Hoci&#269;o';
	lang_sk['DETALLES']     = 'Detaily';
	lang_sk['MAP_EXT']      = 'Roz&#353;&#237;ren&#225; mapa';
	lang_sk['DISPONIBLE']   = 'Len dostupn&#233;';
	lang_sk['SI']           = '&#193;no';
	lang_sk['NO']           = 'Nie';
	lang_sk['LOGIN']        = 'Prihl&#225;si&#357;';
	lang_sk['MARCADORES']   = 'Z&#225;lo&#382;ky';
	lang_sk['ANYADIR']      = 'Prida&#357;';
	lang_sk['ENLACE']       = 'URL adresa';
	lang_sk['TEXTO']        = 'Popis záložky';
	lang_sk['ELIMINAR']     = 'Zmaza&#357;';
	lang_sk['MAPA']         = 'Mapa';
	lang_sk['VERSION']      = 'Dostupn&#225; verzia';
	lang_sk['MAXTIME']      = 'Maxim&#225;lny &#269;as';
	lang_sk['CHECK']        = 'Zisti&#357; nov&#250; verziu';
	lang_sk['MAT_PRIMAS']   = 'Materi&#225;l';
    lang_sk['ATAQUES']      = '&#218;toky';
    lang_sk['CONSTR']       = 'V&#253;stavba';
    lang_sk['TROPAS']       = 'Jednotky';
    lang_sk['ACTUALIZAR']   = 'Aktualizuj';
    lang_sk['ARCHIVE']      = 'Archivova&#357;';
    lang_sk['RESUMEN']      = 'Preh&#318;ad';

	// Norsk oversettelse av ThePirate (TheEvilPirate), minor fix by Baosen.
	var lang_no = new Array();
	lang_no['ALIANZA']      = 'Allianse';
    lang_no['PERFIL']       = 'Brukerprofil';
	lang_no['SIM']          = 'Kampsimulator';
	lang_no['CALC']         = 'Travian Kalkulator';
	lang_no['SEGURO']       = 'Er du sikker?';
	lang_no['MARK']         = 'Velg alle';
	lang_no['PERDIDAS']     = 'Tap';
	lang_no['RENT']         = 'Fortjeneste';
	lang_no['SUBIR_NIVEL']  = 'Utvidelse tilgjengelig';
	lang_no['JUGADOR']      = 'Spiller';
	lang_no['ALDEA']        = 'Bynavn';
	lang_no['HAB']          = 'Befolkning';
	lang_no['COORD']        = 'Koordinater';
	lang_no['ACCION']       = 'Handlinger';
	lang_no['ATACAR']       = 'Angrip';
	lang_no['COMERCIAR']    = 'Send r&#229;stoffer';
	lang_no['GUARDADO']     = 'Gjemt';
    lang_no['DESP_ABR']     = 'Flytt';
	lang_no['FALTA']        = 'Du trenger';
	lang_no['HOY']          = 'i dag';
	lang_no['MANYANA']      = 'i morgen';
	lang_no['PAS_MANYANA']  = 'i overmorgen';
	lang_no['MERCADO']      = 'Markedsplass';
	lang_no['CUARTEL']      = 'Kaserne';
	lang_no['PUNTO']        = 'Forsamlingsplass';
	lang_no['CORRAL']       = 'Stall';
	lang_no['TALLER']       = 'Verksted';
	lang_no['ENVIAR']       = 'Send r&#229;stoffer';
	lang_no['COMPRAR']      = 'Kj&#248;p';
	lang_no['VENDER']       = 'Selg';
	lang_no['ENVIAR_IGM']   = 'Send IGM';
	lang_no['LISTO']        = 'Utvidelse tilgjengelig';
	lang_no['EL']           = 'den';
	lang_no['A_LAS']        = 'ved';
	lang_no['EFICIENCIA']   = 'Effektivitet';
	lang_no['NUNCA']        = 'Aldri';
	lang_no['PC']           = 'kulturpoeng';
	lang_no['FUNDAR']       = 'Du kan grunnlegge eller overta en ny by';
	lang_no['ALDEAS']       = 'By(er)';
	lang_no['ENV_TROPAS']   = 'Send tropper';
	lang_no['RECURSO1']     = 'Tre';
	lang_no['RECURSO2']     = 'Leire';
	lang_no['RECURSO3']     = 'Jern';
	lang_no['RECURSO4']     = 'Korn';
	lang_no['TIEMPO']       = 'Tid';
	lang_no['COMP']         = 'Rapport kompressor';
    lang_no['STAT']         = 'Statistikk';
    lang_no['OFREZCO']      = 'Tilbyr';
	lang_no['BUSCO']        = 'Leter etter';
	lang_no['TIPO']         = 'Type';
	lang_no['DISPONIBLE']   = 'Kun tilgjengelig';
	lang_no['CUALQUIERA']   = 'Alle';
	lang_no['SI']           = 'Ja';
	lang_no['NO']           = 'Nei';
	lang_no['MARCADORES']   = 'Bokmerker';
	lang_no['ANYADIR']      = 'Tilf&#248;y';
	lang_no['ENLACE']       = 'Ny Bokmerke URL';
	lang_no['TEXTO']        = 'Ny Bokmerke Tekst';
	lang_no['ELIMINAR']     = 'Slett';
	lang_no['MAPA']         = 'Kart';
	lang_no['MAXTIME']      = 'Maksimum tid';
	lang_no['CHECK']        = 'Se etter ny versjon';
	lang_no['ARCHIVE']      = 'Arkiv';
	lang_no['RESUMEN']      = 'Fortsett';

    // Bosnia and Herzegowina Autor anoniman-author anonimo
	var lang_ba = new Array();
    lang_ba['ALIANZA']      = 'Alijansa';
    lang_ba['PERFIL']       = 'Profil';
    lang_ba['SIM']          = 'Simulator borbe';
    lang_ba['CALC']         = 'Traviankalkulator';
    lang_ba['SEGURO']       = 'Jeste li sigurni?';
    lang_ba['MARK']         = 'Selektuj sve';
    lang_ba['PERDIDAS']     = 'Prekini';
    lang_ba['RENT']         = 'Profit';
    lang_ba['SUBIR_NIVEL']  = 'Ekstenzija moguca';
    lang_ba['JUGADOR']      = 'Igrac';
    lang_ba['ALDEA']        = 'Ime sela';
    lang_ba['HAB']          = 'Populacija';
    lang_ba['COORD']        = 'Koordinati';
    lang_ba['ACCION']       = 'Akcije';
    lang_ba['ATACAR']       = 'Napadi';
    lang_ba['COMERCIAR']    = 'salji resurse';
    lang_ba['GUARDADO']     = 'Zasticen';
    lang_ba['DESP_ABR']     = 'Mov.';
    lang_ba['FALTA']        = 'Potrebno';
    lang_ba['HOY']          = 'Danas';
    lang_ba['MANYANA']      = 'Sutra';
    lang_ba['PAS_MANYANA']  = 'Prekosutra';
    lang_ba['MERCADO']      = 'Pijaca';
    lang_ba['CUARTEL']      = 'Taraba';
    lang_ba['PUNTO']        = 'Mjesto okupljanja';
    lang_ba['CORRAL']       = 'Stala';
    lang_ba['TALLER']       = 'Radionica';
    lang_ba['ENVIAR']       = 'Posalji resurse';
    lang_ba['COMPRAR']      = 'Kupi';
    lang_ba['VENDER']       = 'Prodaj';
    lang_ba['ENVIAR_IGM']   = 'Posalji IGM';
    lang_ba['LISTO']        = 'Spremno';
    lang_ba['EL']           = 'Tu';
    lang_ba['A_LAS']        = 'Na';
    lang_ba['EFICIENCIA']   = 'Eficijencija';
    lang_ba['NUNCA']        = 'Nikad';
    lang_ba['PC']           = 'Kulturalni poeni';
    lang_ba['FUNDAR']       = 'Mozete pronaci ili okupirati drugo selo';
    lang_ba['ALDEAS']       = 'selo/a';
    lang_ba['ENV_TROPAS']   = 'Posalji trupe';
    lang_ba['RECURSO1']     = 'Drvo';
    lang_ba['RECURSO2']     = 'Glina';
    lang_ba['RECURSO3']     = 'Zeljezo';
    lang_ba['RECURSO4']     = 'Zitarice';
    lang_ba['TIEMPO']       = 'Vrijeme';
    lang_ba['COMP']         = 'Dostavljac reporta';
    lang_ba['STAT']         = 'Statistika';
    lang_ba['OFREZCO']      = 'Ponude';
    lang_ba['BUSCO']        = 'Pretraga';
    lang_ba['TIPO']         = 'Tip';
    lang_ba['DISPONIBLE']   = 'Jedino moguce';
    lang_ba['CUALQUIERA']   = 'Bilo koji';
    lang_ba['SI']           = 'Da';
    lang_ba['NO']           = 'Ne';
    lang_ba['MARCADORES']   = 'Bukmarksi';
    lang_ba['ANYADIR']      = 'Dodaj';
    lang_ba['ENLACE']       = 'Novi Bookmark URL';
    lang_ba['TEXTO']        = 'Novi Bookmark Text';
    lang_ba['ELIMINAR'] = 'Izbrisi';
    lang_ba['MAPA']             = 'Mapa';
    lang_ba['CHECK']    = 'Potrazi novu verziju';
    lang_ba['ARCHIVE']  = 'Arhiv';
    lang_ba['RESUMEN']  = 'Svota';


    // Translation in Slovenian by Andraz Oberstar aka 5p1der
    // Prevedel v slovenscino Andraz Oberstar aka 5p1der
	var lang_si = new Array();
	lang_si['ALIANZA'] = 'Aliansa';
	lang_si['PERFIL'] = 'Profil';
	lang_si['SIM'] = 'Simulator bitk';
	lang_si['CALC'] = 'Travian Kalkulator';
	lang_si['SEGURO'] = 'Ali ste prepričani?';
	lang_si['MARK'] = 'Izberi vse';
	lang_si['PERDIDAS'] = 'Izguba';
	lang_si['RENT'] = 'Profit';
	lang_si['SUBIR_NIVEL'] = 'Nadgradnja mo&#382;na';
	lang_si['JUGADOR'] = 'Igralec';
	lang_si['ALDEA'] = 'Ime naselja';
	lang_si['HAB'] = 'Populacija';
	lang_si['COORD'] = 'Koordinate';
	lang_si['ACCION'] = 'Mo&#382;nosti';
	lang_si['ATACAR'] = 'Napadi';
	lang_si['COMERCIAR'] = 'Po&#353;lji surovine';
	lang_si['GUARDADO'] = 'Za&#353;&#269;iten';
    lang_si['DESP_ABR'] = 'Pomik';
    lang_si['FALTA'] = 'Manjka';
    lang_si['HOY'] = 'danes';
    lang_si['MANYANA'] = 'jutri';
    lang_si['PAS_MANYANA'] = 'pojutri&#353;njem';
    lang_si['MERCADO'] = 'Tr&#382;nica';
    lang_si['CUARTEL'] = 'Barake';
    lang_si['PUNTO'] = 'Zbirali&#353;&#269;e';
    lang_si['CORRAL'] = 'Konju&#353;nica';
    lang_si['TALLER'] = 'Izdelovalec oblegovalnih naprav';
    lang_si['ENVIAR'] = 'Po&#353;lji surovine';
    lang_si['COMPRAR'] = 'Kupi';
    lang_si['VENDER'] = 'Ponudi';
    lang_si['ENVIAR_IGM'] = 'Po&#353;lji sporo&#269;ilo';
    lang_si['LISTO'] = 'Na voljo';
    lang_si['EL'] = '';
    lang_si['A_LAS'] = 'ob';
    lang_si['EFICIENCIA'] = 'Izkoristek';
    lang_si['NUNCA'] = 'Nikoli';
    lang_si['PC'] = 'Kulturne to&#269;ke';
    lang_si['FUNDAR'] = 'Lahko zgradite ali zasedete novo vas';
    lang_si['ALDEAS'] = 'Vas(i)';
    lang_si['ENV_TROPAS'] = 'Po&#353;lji enote';
    lang_si['RECURSO1'] = 'Les';
    lang_si['RECURSO2'] = 'Glina';
    lang_si['RECURSO3'] = '&#381;elezo';
    lang_si['RECURSO4'] = '&#381;ito';
    lang_si['TIEMPO'] = '&#268;as';
    lang_si['COMP'] = 'Generator poro&#269;ila napada';
    lang_si['STAT'] = 'Statistika';
    lang_si['OFREZCO'] = 'Ponuja';
    lang_si['BUSCO'] = 'I&#353;&#269;e';
    lang_si['TIPO'] = 'Tip';
    lang_si['DISPONIBLE'] = 'Samo mo&#382;ne ponudbe';
    lang_si['CUALQUIERA'] = 'Karkoli';
    lang_si['SI'] = 'Da';
    lang_si['NO'] = 'Ne';
    lang_si['MARCADORES'] = 'Zaznamki';
    lang_si['ANYADIR'] = 'Dodaj';
    lang_si['ENLACE'] = 'URL novega zaznamka';
    lang_si['TEXTO'] = 'Ime novega zaznamka';
    lang_si['ELIMINAR'] = 'Izbri&#353;i';
    lang_si['MAPA'] = 'Zemljevid';
    lang_si['MAXTIME'] = 'Najdalj&#353;i &#269;as';
    lang_si['CHECK'] = 'Poglej za novo verzijo';
	lang_si['ARCHIVE'] = 'Arhiv';
	lang_si['RESUMEN'] = 'Vsota';
  
	// Taiwanese (Trd. Chinese) translation
    var lang_tw = new Array();
    var lang_hk = lang_tw;
    lang_tw['ALIANZA']     = '\聯\盟';
    lang_tw['PERFIL']     = '\個\人\資\料';
    lang_tw['SIM']         = '\戰\鬥\模\擬\器';
    lang_tw['CALC']     = 'Travian\計\算\機';
	lang_tw['SEGURO']     = '\你\真\的\確\定\?';
    lang_tw['MARK']     = '\全\選';
    lang_tw['PERDIDAS']     = '\損\失';
    lang_tw['RENT']     = '\獲\益';
    lang_tw['SUBIR_NIVEL']     = '\已\可\升\級\!';
    lang_tw['JUGADOR']     = '\玩\家';
    lang_tw['ALDEA']     = '\村\莊';
    lang_tw['HAB']         = '\人\口';
    lang_tw['COORD']     = '\座\標';
    lang_tw['ACCION']     = '\行\動';
    lang_tw['ATACAR']     = '\攻\擊';
    lang_tw['COMERCIAR']     = '\運\送\資\源';
    lang_tw['GUARDADO']     = '\儲\存';
    lang_tw['DESP_ABR']     = '\移\動\格\數';
    lang_tw['FALTA']     = '\您\要';
    lang_tw['HOY']         = '\今\天';
    lang_tw['MANYANA']     = '\明\天';
    lang_tw['PAS_MANYANA']     = '\後\天';
    lang_tw['MERCADO']     = '\市\場';
    lang_tw['CUARTEL']     = '\兵\營';
    lang_tw['PUNTO']     = '\集\結\點';
    lang_tw['CORRAL']     = '\馬\廄';
    lang_tw['TALLER']     = '\工\場';
    lang_tw['ENVIAR']     = '\運\送\資\源';
    lang_tw['COMPRAR']     = '\買';
    lang_tw['VENDER']     = '\賣';
    lang_tw['ENVIAR_IGM']     = '\發IGM';
    lang_tw['LISTO']     = '\升\級\可\於';
    lang_tw['EL']         = '\-';
    lang_tw['A_LAS']     = '\-';
    lang_tw['EFICIENCIA']     = '\效\率';
    lang_tw['NUNCA']    = '\永\不';
    lang_tw['PC']           = '\文\明\點';
    lang_tw['FUNDAR']       = '\您\可\以\興\建\或\者\佔\領\一\座\村\莊';
    lang_tw['ALDEAS']       = '\村\莊';
    lang_tw['ENV_TROPAS']    = '\派\兵';
    lang_tw['RECURSO1']     = '\木\材';
    lang_tw['RECURSO2']     = '\磚\塊';
    lang_tw['RECURSO3']     = '\鋼\鐵';
    lang_tw['RECURSO4']     = '\穀\物';
    lang_tw['TIEMPO']       = '\時\間';
    lang_tw['COMP']         = '\報\告\壓\縮\器';
    lang_tw['STAT']        = '\統\計';
    lang_tw['OFREZCO']    = '\提\供';
    lang_tw['BUSCO']    = '\搜\索';
    lang_tw['TIPO']        = '\比\例';
    lang_tw['DISPONIBLE']    = '\太\小\物\資\不\顯\示';
    lang_tw['CUALQUIERA']    = '\任\何';
    lang_tw['SI']        = '\是';
    lang_tw['NO']        = '\否';
    lang_tw['LOGIN']    = '\登\入';
    lang_tw['MARCADORES']   = '\書\籤';
    lang_tw['ANYADIR']      = '\加\入';
    lang_tw['ENLACE']       = '\新\書\籤\網\址';
    lang_tw['TEXTO']        = '新書籤標題(只限英文及數字)';
    lang_tw['MAXTIME']    = '\最\大\運\輸\時\間';
    lang_tw['ELIMINAR']    = '\刪\除';
    lang_tw['MAPA']        = '\地\圖 \(TravMap\)';
    lang_tw['CHECK']    = '\檢\查\新\版\本';
    lang_tw['ARCHIVE']    = '\封\存';
    lang_tw['RESUMEN']    = '\概\要';  
   	
    // Lithuania translation
    var lang_lt = new Array();
    lang_lt['ALIANZA']     = 'Aljansas';
    lang_lt['PERFIL']     = 'Profilis';
    lang_lt['SIM']         = 'M&#363;&#353;i&#371; simuliatorius';
    lang_lt['CALC']     = 'Kalkuliatorius';
    lang_lt['SEGURO']     = 'Ar esi įsitikinęs?';
    lang_lt['MARK']     = 'Visi';
    lang_lt['PERDIDAS']     = 'Nuostoliai';
    lang_lt['RENT']     = 'Pelnas';
    lang_lt['SUBIR_NIVEL']     = '&#302;manoma prapl&#279;sti';
    lang_lt['JUGADOR']     = '&#381;aid&#279;jas';
    lang_lt['ALDEA']     = 'Miesto pavadinimas';
    lang_lt['HAB']         = 'Populiacija';
    lang_lt['COORD']     = 'Koordinat&#279;s';
    lang_lt['ACCION']     = 'Veiksmai';
    lang_lt['ATACAR']     = 'Puolimas';
    lang_lt['COMERCIAR']     = 'Si&#371;sti resursus';
    lang_lt['GUARDADO']     = 'I&#353;saugota';
    lang_lt['DESP_ABR']     = 'Mov.';
    lang_lt['FALTA']     = 'Tau reikia';
    lang_lt['HOY']         = '&#353;iandien';
    lang_lt['MANYANA']     = 'rytoj';
    lang_lt['PAS_MANYANA']     = 'poryt';
    lang_lt['MERCADO']     = 'Turgaviet&#279;';
    lang_lt['CUARTEL']     = 'Kareivin&#279;s';
    lang_lt['PUNTO']     = 'Susib&#363;rimo vieta';
    lang_lt['CORRAL']     = 'Arklid&#279;';
    lang_lt['TALLER']     = 'Dirbtuv&#279;s';
    lang_lt['ENVIAR']     = 'Si&#371;sti resursus';
    lang_lt['COMPRAR']     = 'Pirkti';
    lang_lt['VENDER']     = 'Parduoti';
    lang_lt['ENVIAR_IGM']     = 'Si&#371;sti &#382;inut&#281;';
    lang_lt['LISTO']     = 'Pakankamai resurs&#371; bus';
    lang_lt['EL']         = '';
    lang_lt['A_LAS']     = '';
    lang_lt['EFICIENCIA']     = 'Efektyvumas';
    lang_lt['NUNCA']    = 'Niekada';
    lang_lt['PC']           = 'kult&#363;ros ta&#353;kai (-&#371;)';
    lang_lt['FUNDAR']       = 'Gal&#279;si &#303;kurti nauj&#261; miest&#261;';
    lang_lt['ALDEAS']       = 'Miestas (-ai)';
    lang_lt['ENV_TROPAS']     = 'Si&#371;sti karius';
    lang_lt['RECURSO1']     = 'Mediena';
    lang_lt['RECURSO2']     = 'Molis';
    lang_lt['RECURSO3']     = 'Gele&#382;is';
    lang_lt['RECURSO4']     = 'Gr&#363;dai';
    lang_lt['TIEMPO']       = 'Laikas';
    lang_lt['COMP']         = 'Ataskaitos';
    lang_lt['STAT']        = 'Statistika';
    lang_lt['OFREZCO']    = 'Si&#363;lo';
    lang_lt['BUSCO']    = 'Ie&#353;ko';
    lang_lt['TIPO']        = 'Tipas';
    lang_lt['DISPONIBLE']    = 'Tik &#303;manomus';
    lang_lt['CUALQUIERA']    = 'Any';
    lang_lt['SI']        = 'Taip';
    lang_lt['NO']        = 'Ne';
    lang_lt['MARCADORES']   = 'Nuorodos';
    lang_lt['ANYADIR']      = '&#302;d&#279;ti';
    lang_lt['ENLACE']       = 'Nauja URL nuoroda';
    lang_lt['TEXTO']        = 'Nauja Tekstinė nuoroda';
    lang_lt['ELIMINAR']    = 'I&#353;strinti';
    lang_lt['MAPA']        = '&#381;em&#279;lapis';
    lang_lt['MAXTIME']    = 'Maksimalus gabenimo laikas';
    lang_lt['CHECK']    = 'Naujos versijos tikrinimas';
    lang_lt['ARCHIVE']    = 'Archyvas';
    lang_lt['RESUMEN']    = 'Santrauka';
    lang_lt['LOGIN']    = 'Prisijungti';
    lang_lt['MAP_EXT']    = '&#381;em&#279;lapio i&#353;pl&#279;timas'; 


	// Arabic Translate
	var lang_ae = new Array();
	lang_ae['ALIANZA'] = '&#1578;&#1581;&#1575;&#1604;&#1601;';
    lang_ae['PERFIL'] = '&#1575;&#1604;&#1605;&#1604;&#1601; &#1575;&#1604;&#1588;&#1582;&#1589;&#1610;';
    lang_ae['SIM'] = '&#1605;&#1581;&#1575;&#1603;&#1610; &#1575;&#1604;&#1605;&#1593;&#1585;&#1603;&#1607;';
    lang_ae['CALC'] = '&#1581;&#1575;&#1587;&#1576;&#1577; &#1578;&#1585;&#1575;&#1601;&#1610;&#1575;&#1606;';
    lang_ae['SEGURO'] = 'هل انت نتأكد؟';
    lang_ae['VB'] = 'المنتدى';
    lang_ae['MARK'] = '&#1578;&#1581;&#1583;&#1610;&#1583; &#1575;&#1604;&#1603;&#1604;';
    lang_ae['PERDIDAS'] = '&#1582;&#1587;&#1575;&#1585;&#1607;';
    lang_ae['RENT'] = '&#1575;&#1604;&#1601;&#1575;&#1574;&#1583;&#1607;';
    lang_ae['SUBIR_NIVEL'] = '&#1605;&#1578;&#1575;&#1581;';
    lang_ae['JUGADOR'] = '&#1575;&#1604;&#1604;&#1575;&#1593;&#1576;';
    lang_ae['ALDEA'] = '&#1575;&#1587;&#1605; &#1575;&#1604;&#1602;&#1585;&#1610;&#1607;';
    lang_ae['HAB'] = '&#1575;&#1604;&#1587;&#1603;&#1575;&#1606;';
    lang_ae['COORD'] = '&#1575;&#1604;&#1575;&#1581;&#1583;&#1575;&#1579;&#1610;&#1575;&#1578;';
    lang_ae['ACCION'] = '&#1575;&#1604;&#1575;&#1605;&#1585;';
    lang_ae['ATACAR'] = '&#1607;&#1580;&#1608;&#1605;';
    lang_ae['COMERCIAR'] = '&#1575;&#1585;&#1587;&#1575;&#1604; &#1605;&#1589;&#1575;&#1583;&#1585;';
    lang_ae['GUARDADO'] = 'تم الحفظ بنجاح';
    lang_ae['DESP_ABR'] = 'Mov.';
    lang_ae['FALTA'] = '&#1578;&#1581;&#1600;&#1578;&#1575;&#1580; ';
    lang_ae['HOY'] = '&#1575;&#1604;&#1610;&#1608;&#1605; ';
    lang_ae['MANYANA'] = '&#1594;&#1583;&#1575;&#1611;';
    lang_ae['PAS_MANYANA'] = '&#1576;&#1593;&#1583; &#1594;&#1583;';
    lang_ae['MERCADO'] = '&#1575;&#1604;&#1587;&#1608;&#1602;';
    lang_ae['CUARTEL'] = '&#1579;&#1603;&#1606;&#1607;';
    lang_ae['PUNTO'] = '&#1606;&#1602;&#1591;&#1577; &#1578;&#1580;&#1605;&#1593;';
    lang_ae['CORRAL'] = '&#1575;&#1587;&#1591;&#1576;&#1604;';
    lang_ae['TALLER'] = '&#1608;&#1585;&#1588;&#1577; &#1593;&#1605;&#1604;';
    lang_ae['ENVIAR'] = '&#1575;&#1585;&#1587;&#1575;&#1604; &#1605;&#1589;&#1575;&#1583;&#1585;';
    lang_ae['COMPRAR'] = '&#1588;&#1585;&#1575;&#1569;';
    lang_ae['VENDER'] = '&#1576;&#1610;&#1593;';
    lang_ae['ENVIAR_IGM'] = '&#1573;&#1585;&#1587;&#1575;&#1604; &#1585;&#1587;&#1575;&#1604;&#1607;';
    lang_ae['LISTO'] = '&#1610;&#1578;&#1575;&#1581;';
    lang_ae['EL'] = '&#1601;&#1610;';
    lang_ae['A_LAS'] = '&#1601;&#1610;';
    lang_ae['EFICIENCIA'] = '&#1575;&#1604;&#1601;&#1593;&#1575;&#1604;&#1610;&#1607;';
    lang_ae['NUNCA'] = '&#1575;&#1576;&#1583;&#1575;&#1611;';
    lang_ae['PC'] = '&#1606;&#1602;&#1575;&#1591; &#1575;&#1604;&#1579;&#1602;&#1575;&#1601;&#1607;';
    lang_ae['FUNDAR'] = '&#1578;&#1587;&#1578;&#1591;&#1610;&#1593; &#1573;&#1610;&#1580;&#1575;&#1583; &#1571;&#1608; &#1575;&#1581;&#1578;&#1604;&#1575;&#1604; &#1602;&#1585;&#1610;&#1607; &#1580;&#1583;&#1610;&#1583;&#1607;';
    lang_ae['ALDEAS'] = '&#1575;&#1604;&#1602;&#1585;&#1609;';
    lang_ae['ENV_TROPAS'] = '&#1573;&#1585;&#1587;&#1575;&#1604; &#1580;&#1606;&#1608;&#1583;';
    lang_ae['RECURSO1'] = '&#1582;&#1588;&#1576;';
    lang_ae['RECURSO2'] = '&#1591;&#1610;&#1606;';
    lang_ae['RECURSO3'] = '&#1581;&#1583;&#1610;&#1583;';
    lang_ae['RECURSO4'] = '&#1602;&#1605;&#1581;';
    lang_ae['TIEMPO'] = '&#1575;&#1604;&#1608;&#1602;&#1578;';
    lang_ae['COMP'] = '&#1590;&#1575;&#1594;&#1591; &#1575;&#1604;&#1578;&#1602;&#1585;&#1610;&#1585;';
    lang_ae['STAT'] = '&#1573;&#1581;&#1589;&#1575;&#1569;';
    lang_ae['OFREZCO'] = '&#1575;&#1604;&#1593;&#1585;&#1590;';
    lang_ae['BUSCO'] = '&#1576;&#1581;&#1579;';
	lang_ae['TIPO'] = '&#1575;&#1604;&#1606;&#1608;&#1593;';
    lang_ae['DISPONIBLE'] = '&#1601;&#1602;&#1591; &#1575;&#1604;&#1605;&#1578;&#1575;&#1581;';
    lang_ae['CUALQUIERA'] = '&#1571;&#1610;';
    lang_ae['SI'] = '&#1606;&#1593;&#1605;';
    lang_ae['NO'] = '&#1604;&#1575;';
    lang_ae['MARCADORES'] = '&#1575;&#1604;&#1585;&#1608;&#1575;&#1576;&#1591;';
    lang_ae['ANYADIR'] = '&#1573;&#1590;&#1575;&#1601;&#1607;';
    lang_ae['ENLACE'] = 'ضع عنوان الرابط كاملا ';
    lang_ae['TEXTO'] = 'الاسم';
    lang_ae['ELIMINAR'] = '&#1581;&#1584;&#1601;';
    lang_ae['MAPA'] = '&#1575;&#1604;&#1582;&#1585;&#1610;&#1591;&#1607;';
    lang_ae['CHECK'] = '&#1576;&#1581;&#1579; &#1593;&#1606; &#1578;&#1581;&#1583;&#1610;&#1579;';
    lang_ae['ARCHIVE'] = '&#1575;&#1604;&#1575;&#1585;&#1588;&#1610;&#1601;';
    lang_ae['RESUMEN'] = '&#1575;&#1604;&#1605;&#1608;&#1580;&#1586;';


	// Srpski/Serbian (travian.com) prevod bojovic djurdje
	var lang_rs = new Array(); 
	lang_rs['ALIANZA'] 	= '&#1057;&#1072;&#1074;&#1077;&#1079;'; 
	lang_rs['PERFIL'] 	= '&#1050;&#1086;&#1088;&#1080;&#1089;&#1085;&#1080;&#1095;&#1082;&#1080; &#1087;&#1088;&#1086;&#1092;&#1080;&#1083;'; 
	lang_rs['SIM'] 		= '&#1057;&#1080;&#1084;&#1091;&#1083;&#1072;&#1090;&#1086;&#1088; &#1073;&#1086;&#1088;&#1073;&#1077;'; 
	lang_rs['CALC'] 	= 'Travian &#1082;&#1072;&#1083;&#1082;&#1091;&#1083;&#1072;&#1090;&#1086;&#1088;'; 
	lang_rs['SEGURO'] 	= 'Jeste li sigurni?'; 
	lang_rs['MARK'] 	= '&#1054;&#1079;&#1085;&#1072;&#1095;&#1080; &#1089;&#1074;&#1077;'; 
	lang_rs['PERDIDAS'] 	= '&#1043;&#1091;&#1073;&#1080;&#1090;&#1072;&#1082;'; 
	lang_rs['RENT'] 	= '&#1055;&#1088;&#1086;&#1092;&#1080;&#1090;'; 
	lang_rs['SUBIR_NIVEL'] 	= '&#1053;&#1072;&#1076;&#1086;&#1075;&#1088;&#1072;&#1076;&#1114;&#1072; &#1076;&#1086;&#1089;&#1090;&#1091;&#1087;&#1085;&#1072;'; 
	lang_rs['JUGADOR'] 	= '&#1048;&#1075;&#1088;&#1072;&#1095;'; 
	lang_rs['ALDEA'] 	= '&#1048;&#1084;&#1077; &#1089;&#1077;&#1083;&#1072;'; 
	lang_rs['HAB'] 		= '&#1055;&#1086;&#1087;&#1091;&#1083;&#1072;&#1094;&#1080;&#1112;&#1072;'; 
	lang_rs['COORD'] 	= '&#1050;&#1086;&#1086;&#1088;&#1076;&#1080;&#1085;&#1072;&#1090;&#1077;'; 
	lang_rs['ACCION'] 	= '&#1040;&#1082;&#1094;&#1080;&#1112;&#1077;'; 
	lang_rs['ATACAR'] 	= '&#1053;&#1072;&#1087;&#1072;&#1076;'; 
	lang_rs['COMERCIAR'] 	= '&#1055;&#1086;&#1096;&#1072;&#1113;&#1080; &#1088;&#1077;&#1089;&#1091;&#1088;&#1089;&#1077;'; 
	lang_rs['GUARDADO'] 	= 'Sacuvano'; 
	lang_rs['DESP_ABR'] 	= '&#1050;&#1086;&#1088;&#1072;&#1082;'; 
	lang_rs['FALTA'] 	= '&#1055;&#1086;&#1090;&#1088;&#1077;&#1073;&#1085;&#1086;'; 
	lang_rs['HOY'] 		= '&#1076;&#1072;&#1085;&#1072;&#1089;'; 
	lang_rs['MANYANA'] 	= '&#1089;&#1091;&#1090;&#1088;&#1072;'; 
	lang_rs['PAS_MANYANA'] 	= '&#1087;&#1088;&#1077;&#1082;&#1086;&#1089;&#1091;&#1090;&#1088;&#1072;'; 
	lang_rs['MERCADO'] 	= '&#1055;&#1080;&#1112;&#1072;&#1094;&#1072;'; 
	lang_rs['CUARTEL'] 	= '&#1050;&#1072;&#1089;&#1072;&#1088;&#1085;&#1072;'; 
	lang_rs['PUNTO'] 	= '&#1052;&#1077;&#1089;&#1090;&#1086; &#1086;&#1082;&#1091;&#1087;&#1113;&#1072;&#1114;&#1072;'; 
	lang_rs['CORRAL'] 	= '&#1064;&#1090;&#1072;&#1083;&#1072;'; 
	lang_rs['TALLER'] 	= '&#1056;&#1072;&#1076;&#1080;&#1086;&#1085;&#1080;&#1094;&#1072;'; 
	lang_rs['ENVIAR'] 	= '&#1055;&#1086;&#1096;&#1072;&#1113;&#1080; &#1088;&#1077;&#1089;&#1091;&#1088;&#1089;&#1077;'; 
	lang_rs['COMPRAR'] 	= '&#1050;&#1091;&#1087;&#1080;'; 
	lang_rs['VENDER'] 	= '&#1055;&#1088;&#1086;&#1076;&#1072;&#1112;'; 
	lang_rs['ENVIAR_IGM'] 	= '&#1055;&#1086;&#1096;&#1072;&#1113;&#1080; &#1087;&#1086;&#1088;&#1091;&#1082;&#1091;'; 
	lang_rs['LISTO'] 	= '&#1044;&#1086;&#1089;&#1090;&#1091;&#1087;&#1085;&#1086;'; 
	lang_rs['EL'] 		= ''; 
	lang_rs['A_LAS'] 	= '&#1091;'; 
	lang_rs['EFICIENCIA'] 	= '&#1045;&#1092;&#1080;&#1082;&#1072;&#1089;&#1085;&#1086;&#1089;&#1090;'; 
	lang_rs['NUNCA'] 	= '&#1053;&#1080;&#1082;&#1072;&#1076;&#1072;'; 
	lang_rs['PC'] 		= '&#1053;&#1080;&#1082;&#1072;&#1076;&#1072;'; 
	lang_rs['FUNDAR'] 	= '&#1052;&#1086;&#1078;&#1077;&#1090;&#1077; &#1080;&#1079;&#1075;&#1088;&#1072;&#1076;&#1080;&#1090;&#1080; &#1080;&#1083;&#1080; &#1086;&#1089;&#1074;&#1086;&#1112;&#1080;&#1090;&#1080; &#1085;&#1086;&#1074;&#1086; &#1089;&#1077;&#1083;&#1086;'; 
	lang_rs['ALDEAS'] 	= '&#1053;&#1072;&#1089;&#1077;&#1113;&#1072;'; 
	lang_rs['ENV_TROPAS'] 	= '&#1055;&#1086;&#1096;&#1072;&#1113;&#1080; &#1074;&#1086;&#1112;&#1089;&#1082;&#1091;'; 
	lang_rs['RECURSO1'] 	= '&#1044;&#1088;&#1074;&#1086;'; 
	lang_rs['RECURSO2'] 	= '&#1043;&#1083;&#1080;&#1085;&#1072;'; 
	lang_rs['RECURSO3'] 	= '&#1043;&#1074;&#1086;&#1078;&#1106;&#1077;'; 
	lang_rs['RECURSO4'] 	= '&#1061;&#1088;&#1072;&#1085;&#1072;'; 
	lang_rs['TIEMPO'] 	= '&#1042;&#1088;&#1077;&#1084;&#1077;'; 
	lang_rs['COMP'] 	= 'Report Compressor'; 
	lang_rs['STAT'] 	= '&#1057;&#1090;&#1072;&#1090;&#1080;&#1089;&#1090;&#1080;&#1082;&#1072;'; 
	lang_rs['OFREZCO'] 	= '&#1053;&#1091;&#1076;&#1080;'; 
	lang_rs['BUSCO'] 	= '&#1058;&#1088;&#1072;&#1078;&#1080;'; 
	lang_rs['TIPO'] 	= '&#1058;&#1080;&#1087;'; 
	lang_rs['DISPONIBLE'] 	= '&#1044;&#1086;&#1089;&#1090;&#1091;&#1087;&#1085;&#1086; &#1089;&#1072;&#1084;&#1086;'; 
	lang_rs['CUALQUIERA'] 	= '&#1041;&#1080;&#1083;&#1086; &#1082;&#1086;&#1112;&#1080;'; 
	lang_rs['DETALLES']	= '&#1044;&#1077;&#1090;&#1072;&#1113;&#1080;';
	lang_rs['MAP_EXT']	= '&#1042;&#1077;&#1083;&#1080;&#1082;&#1072; &#1084;&#1072;&#1087;&#1072;';
	lang_rs['SI'] 		= '&#1044;&#1072;'; 
	lang_rs['NO'] 		= '&#1053;&#1077;'; 
	lang_rs['LOGIN']	= '&#1055;&#1088;&#1080;&#1112;&#1072;&#1074;&#1080; &#1089;&#1077;';
	lang_rs['MARCADORES'] 	= 'Bookmarks'; 
	lang_rs['ANYADIR'] 	= '&#1044;&#1086;&#1076;&#1072;&#1112;'; 
	lang_rs['ENLACE'] 	= 'Novi Bookmark URL'; 
	lang_rs['TEXTO'] 	= 'Novi Bookmark Text'; 
	lang_rs['ELIMINAR'] 	= '&#1048;&#1079;&#1073;&#1088;&#1080;&#1096;&#1080;'; 
	lang_rs['MAPA'] 	= '&#1052;&#1072;&#1087;&#1072;'; 
	lang_rs['VERSION']	= '&#1044;&#1086;&#1089;&#1090;&#1091;&#1087;&#1085;&#1077; &#1074;&#1077;&#1088;&#1079;&#1080;&#1112;&#1077;';
	lang_rs['MAXTIME']	= '&#1059;&#1076;&#1072;&#1113;&#1077;&#1085;&#1086;';
	lang_rs['CHECK'] 	= 'Check new version'; 
	lang_rs['ATAQUES']	= '&#1053;&#1072;&#1087;&#1072;&#1076;&#1080;';
	lang_rs['CONSTR']	= '&#1043;&#1088;&#1072;&#1106;&#1077;&#1074;&#1080;&#1085;&#1072;';
	lang_rs['TROPAS']	= '&#1042;&#1086;&#1112;&#1089;&#1082;&#1072;';
	lang_rs['ACTUALIZAR']	= '&#1040;&#1078;&#1091;&#1088;&#1080;&#1088;&#1072;&#1112;';
	lang_rs['ARCHIVE'] 	= '&#1040;&#1088;&#1093;&#1080;&#1074;&#1072;'; 
	lang_rs['RESUMEN'] 	= '&#1055;&#1088;&#1077;&#1075;&#1083;&#1077;&#1076;';


	var lang_gr = new Array();
	var lang_el = lang_gr;
	lang_gr['ALIANZA'] 	= 'Συμμαχία';
	lang_gr['PERFIL'] 	= 'Προφίλ';
	lang_gr['SIM'] 		= 'Προσομ. μάχης';
	lang_gr['CALC'] 	= 'Travian Calc';
	lang_gr['SEGURO'] 	= 'Είσαι σίγουρος?'; //prompt message doesn't allow HTML Entities
	lang_gr['MARK'] 	= 'Επιλογή όλων';
	lang_gr['PERDIDAS'] 	= 'Ζημιά';
	lang_gr['RENT'] 	= 'Κέρδος';
	lang_gr['SUBIR_NIVEL'] 	= 'Διαθέσιμη αναβάθμιση ';
	lang_gr['JUGADOR'] 	= 'Παίκτης';
	lang_gr['ALDEA'] 	= 'Όνομα χωριού';
	lang_gr['HAB'] 		= 'Πληθυσμός';
	lang_gr['COORD'] 	= 'Συντεταγμένες';
	lang_gr['ACCION'] 	= 'Ενέργειες';
	lang_gr['ATACAR'] 	= 'Επίθεση';
	lang_gr['COMERCIAR'] 	= 'Αποστολή πρώτων υλών';
	lang_gr['GUARDADO'] 	= 'Αποθηκεύτηκαν'; //prompt message doesn't allow HTML Entities
	lang_gr['DESP_ABR'] 	= 'Mov.';
	lang_gr['FALTA'] 	= 'Χρειάζεσαι';
	lang_gr['HOY'] 		= 'σήμερα';
	lang_gr['MANYANA'] 	= 'αύριο';
	lang_gr['PAS_MANYANA'] 	= 'μεθαύριο';
	lang_gr['MERCADO'] 	= 'Αγορά';
	lang_gr['CUARTEL'] 	= 'Στρατώνας';
	lang_gr['PUNTO'] 	= 'Πλατεία συγκεντρώσεως';
	lang_gr['CORRAL'] 	= 'Στάβλος';
	lang_gr['TALLER'] 	= 'Εργαστήριο';
	lang_gr['ENVIAR'] 	= 'Αποστολή πρώτων υλών';
	lang_gr['COMPRAR'] 	= 'Αγορά';
	lang_gr['VENDER'] 	= 'Πώληση';
	lang_gr['ENVIAR_IGM'] 	= 'Αποστολή μηνύματος';
	lang_gr['LISTO'] 	= 'Έτοιμο';
	lang_gr['EL'] 		= 'την';
	lang_gr['A_LAS'] 	= 'στις';
	lang_gr['EFICIENCIA'] 	= 'Efficiency'; 
	lang_gr['NUNCA']	= 'Ποτέ';
	lang_gr['PC']           = 'πόντους πολιτισμού';
	lang_gr['FUNDAR']       = 'Μπορείς να ιδρύσεις ή να κατακτήσεις νέο χωριό';
	lang_gr['ALDEAS']       = 'Χωριό(ά)';
	lang_gr['ENV_TROPAS'] 	= 'Στρατεύματα';
	lang_gr['RECURSO1']     = 'Ξύλο';
	lang_gr['RECURSO2']     = 'Πηλός';
	lang_gr['RECURSO3']     = 'Σίδερο';
	lang_gr['RECURSO4']     = 'Σιτάρι';
	lang_gr['TIEMPO']       = 'Χρόνος';
	lang_gr['COMP']         = 'Συμπ. αναφορών';
	lang_gr['STAT']		= 'Στατιστικά';
	lang_gr['OFREZCO']	= 'Προσφορά';
	lang_gr['BUSCO']	= 'Αναζήτηση';
	lang_gr['TIPO']		= 'Τύπος';
	lang_gr['DISPONIBLE']	= 'Μόνο διαθέσιμα';
	lang_gr['CUALQUIERA']	= 'Όλα';
	lang_gr['SI']		= 'Ναι';
	lang_gr['NO']		= 'Όχι';
    lang_gr['LOGIN'] = 'Σύνδεση';
    lang_gr['MARCADORES']   = 'Σελιδοδείκτες';
    lang_gr['ANYADIR']      = 'Προσθήκη';
    lang_gr['ENLACE']       = 'URL σελιδοδείκτη'; //prompt message doesn't allow HTML Entities
    lang_gr['TEXTO']        = 'Κείμενο σελιδοδείκτη'; //prompt message doesn't allow HTML Entities
	lang_gr['ELIMINAR']	= 'Διαγραφή';
	lang_gr['MAPA']		= 'Χάρτης';
    lang_gr['VERSION']      = 'Διαθέσιμη έκδοση';
    lang_gr['MAXTIME']      = 'Μέγιστος χρόνος';
	lang_gr['CHECK']	= 'Νέα έκδοση';
	lang_gr['ARCHIVE']	= 'Αρχειοθέτηση';
	lang_gr['RESUMEN']	= 'Σύνοψη';
	lang_gr['MAXTIME']			= 'Μέγιστος χρόνος';
	lang_gr['VERSION']			= 'Νεότερη έκδοση';
	lang_gr['DETALLES']			= 'Λεπτομέρειες';
	lang_gr['MAP_EXT']			= 'Εκτεταμένος χάρτης';
	lang_gr['MAT_PRIMAS']		= 'Πρώτες ύλες';
	lang_gr['ATAQUES']			= 'Επίθεση';
	lang_gr['CONSTR']			= 'build';
	lang_gr['TROPAS']			= 'Στρατεύματα';
	lang_gr['ACTUALIZAR']		= 'Νέα έκδοση';
	lang_gr['RES'] 				= 'Research tree';
    lang_gr['STOREURL']         = 'URL Αποθήκευσης';
    lang_gr['STOREPASSWORD']    = 'Κωδικός Αποθήκευσης';
    lang_gr['OPTIONS']    		= 'Επιλογές';
    lang_gr['VENTAS']    		= 'Αποθηκευμένες Προσφορές';
    lang_gr['SHOWINFO']    		= 'Εμφάνιση πληρ. υλικών';
    lang_gr['HIDEINFO']    		= 'Απόκρυψη πληρ. υλικών';
    lang_gr['MAPSCAN']    		= 'Σάρωση του χάρτη';


var lang_ua = new Array();
    lang_ua['ALIANZA']      = '&#1040;&#1083;&#1100;&#1103;&#1085;&#1089;';
    lang_ua['PERFIL']       = '&#1055;&#1088;&#1086;&#1092;&#1110;&#1083;&#1100; &#1075;&#1088;&#1072;&#1074;&#1094;&#1103;';
    lang_ua['SIM']          = '&#1057;&#1080;&#1084;&#1091;&#1083;&#1103;&#1090;&#1086;&#1088; &#1073;&#1086;&#1102;';
    lang_ua['CALC']         = 'Travian &#1082;&#1072;&#1083;&#1100;&#1082;&#1091;&#1083;&#1103;&#1090;&#1086;&#1088;';
    lang_ua['SEGURO']       = 'Ви впевнені?'; //prompt message doesn't allow HTML Entities
	lang_ua['MARK']         = '&#1042;&#1080;&#1073;&#1088;&#1072;&#1090;&#1080; &#1091;&#1089;&#1077;';
    lang_ua['PERDIDAS']     = '&#1042;&#1090;&#1088;&#1072;&#1090;&#1080;';
    lang_ua['RENT']         = '&#1055;&#1088;&#1080;&#1073;&#1091;&#1090;&#1086;&#1082;';
    lang_ua['SUBIR_NIVEL']  = '&#1044;&#1086;&#1089;&#1090;&#1091;&#1087;&#1085;&#1080;&#1081; &#1088;&#1086;&#1079;&#1074;&#1080;&#1090;&#1086;&#1082;';
    lang_ua['JUGADOR']      = '&#1043;&#1088;&#1072;&#1074;&#1077;&#1094;&#1100;';
    lang_ua['ALDEA']        = '&#1053;&#1072;&#1079;&#1074;&#1072; &#1089;&#1077;&#1083;&#1080;&#1097;&#1072;';
    lang_ua['HAB']          = '&#1053;&#1072;&#1089;&#1077;&#1083;&#1077;&#1085;&#1085;&#1103;';
    lang_ua['COORD']        = '&#1050;&#1086;&#1086;&#1088;&#1076;&#1080;&#1085;&#1072;&#1090;&#1080;';
    lang_ua['ACCION']       = '&#1044;&#1110;&#1111;';
    lang_ua['ATACAR']       = '&#1040;&#1090;&#1072;&#1082;&#1091;&#1074;&#1072;&#1090;&#1080;';
    lang_ua['COMERCIAR']    = '&#1055;&#1086;&#1089;&#1083;&#1072;&#1090;&#1080; &#1088;&#1077;&#1089;&#1091;&#1088;&#1089;&#1080;';
    lang_ua['GUARDADO']     = 'Збережено'; //prompt message doesn't allow HTML Entities
	lang_ua['DESP_ABR']     = 'Mov.';
    lang_ua['FALTA']        = '&#1055;&#1086;&#1090;&#1088;&#1110;&#1073;&#1085;&#1086;';
    lang_ua['HOY']          = '&#1089;&#1100;&#1086;&#1075;&#1086;&#1076;&#1085;&#1110;';
    lang_ua['MANYANA']      = '&#1079;&#1072;&#1074;&#1090;&#1088;&#1072;';
    lang_ua['PAS_MANYANA']  = '&#1087;&#1110;&#1089;&#1083;&#1103;&#1079;&#1072;&#1074;&#1090;&#1088;&#1072;';
    lang_ua['MERCADO']      = '&#1056;&#1080;&#1085;&#1086;&#1082;';
    lang_ua['CUARTEL']      = '&#1050;&#1072;&#1079;&#1072;&#1088;&#1084;&#1072;';
    lang_ua['PUNTO']        = '&#1055;&#1091;&#1085;&#1082;&#1090; &#1079;&#1073;&#1086;&#1088;&#1091;';
    lang_ua['CORRAL']       = '&#1057;&#1090;&#1072;&#1081;&#1085;&#1103;';
    lang_ua['TALLER']       = '&#1052;&#1072;&#1081;&#1089;&#1090;&#1077;&#1088;&#1085;&#1103;';
    lang_ua['ENVIAR']       = '&#1055;&#1086;&#1089;&#1083;&#1072;&#1090;&#1080; &#1088;&#1077;&#1089;&#1091;&#1088;&#1089;&#1080;';
    lang_ua['COMPRAR']      = '&#1055;&#1088;&#1080;&#1076;&#1073;&#1072;&#1090;&#1080;';
    lang_ua['VENDER']       = '&#1055;&#1088;&#1086;&#1076;&#1072;&#1090;&#1080;';
    lang_ua['ENVIAR_IGM']   = 'Send IGM';
    lang_ua['LISTO']        = '&#1043;&#1086;&#1090;&#1086;&#1074;&#1086;';
    lang_ua['EL']           = '&#1085;&#1072;';
    lang_ua['A_LAS']        = '&#1091;';
    lang_ua['EFICIENCIA']   = '&#1045;&#1092;&#1077;&#1082;&#1090;&#1080;&#1074;&#1085;&#1110;&#1089;&#1090;&#1100;';
    lang_ua['NUNCA']        = '&#1053;&#1110;&#1082;&#1086;&#1083;&#1080;';
    lang_ua['PC']           = '&#1086;&#1076;&#1080;&#1085;&#1080;&#1094;&#1110; &#1082;&#1091;&#1083;&#1100;&#1090;&#1091;&#1088;&#1080;';
    lang_ua['FUNDAR']       = '&#1042;&#1080; &#1084;&#1086;&#1078;&#1077;&#1090;&#1077; &#1079;&#1072;&#1089;&#1085;&#1091;&#1074;&#1072;&#1090;&#1080; &#1072;&#1073;&#1086; &#1079;&#1072;&#1074;&#1086;&#1102;&#1074;&#1072;&#1090;&#1080; &#1085;&#1086;&#1074;&#1110; &#1089;&#1077;&#1083;&#1080;&#1097;&#1072;';
    lang_ua['ALDEAS']       = '&#1057;&#1077;&#1083;&#1080;&#1097;&#1077;(&#1072;)';
    lang_ua['ENV_TROPAS']   = '&#1055;&#1086;&#1089;&#1083;&#1072;&#1090;&#1080; &#1074;&#1110;&#1081;&#1089;&#1100;&#1082;&#1072;';
    lang_ua['RECURSO1']     = '&#1044;&#1077;&#1088;&#1077;&#1074;&#1086;';
    lang_ua['RECURSO2']     = '&#1043;&#1083;&#1080;&#1085;&#1072;';
    lang_ua['RECURSO3']     = '&#1047;&#1072;&#1083;&#1110;&#1079;&#1086;';
    lang_ua['RECURSO4']     = '&#1047;&#1077;&#1088;&#1085;&#1086;';
    lang_ua['TIEMPO']       = '&#1063;&#1072;&#1089;';
    lang_ua['COMP']         = '&#1040;&#1088;&#1093;&#1110;&#1074;&#1072;&#1090;&#1086;&#1088; &#1079;&#1074;&#1110;&#1090;&#1110;&#1074;';
    lang_ua['STAT']         = '&#1057;&#1090;&#1072;&#1090;&#1080;&#1089;&#1090;&#1080;&#1082;&#1072;';
    lang_ua['OFREZCO']      = '&#1047;&#1072;&#1087;&#1088;&#1086;&#1087;&#1086;&#1085;&#1091;&#1074;&#1072;&#1090;&#1080;';
    lang_ua['BUSCO']        = '&#1064;&#1091;&#1082;&#1072;&#1090;&#1080;';
    lang_ua['TIPO']         = '&#1058;&#1080;&#1087;';
    lang_ua['DISPONIBLE']   = '&#1051;&#1080;&#1096;&#1077; &#1076;&#1086;&#1089;&#1090;&#1091;&#1087;&#1085;&#1110;';
    lang_ua['CUALQUIERA']   = '&#1041;&#1091;&#1076;&#1100;-&#1103;&#1082;&#1110;';
    lang_ua['SI']           = '&#1058;&#1072;&#1082;';
    lang_ua['NO']           = '&#1053;&#1110;';
    lang_ua['LOGIN'] = 'Login';
    lang_ua['MARCADORES']   = '&#1047;&#1072;&#1082;&#1083;&#1072;&#1076;&#1082;&#1080;';
    lang_ua['ANYADIR']      = '&#1044;&#1086;&#1076;&#1072;&#1090;&#1080;';
    lang_ua['ENLACE']       = 'Нова закладка'; //prompt message doesn't allow HTML Entities
    lang_ua['TEXTO']        = 'Новий опис закладки'; //prompt message doesn't allow HTML Entities
    lang_ua['ELIMINAR']     = '&#1042;&#1080;&#1076;&#1072;&#1083;&#1080;&#1090;&#1080;';
    lang_ua['MAPA']         = '&#1050;&#1072;&#1088;&#1090;&#1072;';
    lang_ua['VERSION']      = '&#1044;&#1086;&#1089;&#1090;&#1091;&#1087;&#1085;&#1072; &#1074;&#1077;&#1088;&#1089;&#1110;&#1103;';
    lang_ua['MAXTIME']      = '&#1052;&#1072;&#1082;&#1089;&#1080;&#1084;&#1072;&#1083;&#1100;&#1085;&#1080;&#1081; &#1095;&#1072;&#1089;';
    lang_ua['CHECK']        = '&#1055;&#1077;&#1088;&#1077;&#1074;&#1110;&#1088;&#1080;&#1090;&#1080; &#1085;&#1086;&#1074;&#1091; &#1074;&#1077;&#1088;&#1089;&#1110;&#1102;';
	lang_ua['ARCHIVE']      = '&#1040;&#1088;&#1093;&#1110;&#1074;';
    lang_ua['RESUMEN']      = '&#1056;&#1077;&#1079;&#1102;&#1084;&#1077;';
    lang_ua['MAXTIME']                      = '&#1052;&#1072;&#1082;&#1089;&#1080;&#1084;&#1072;&#1083;&#1100;&#1085;&#1080;&#1081; &#1095;&#1072;&#1089;';
    lang_ua['VERSION']                      = '&#1053;&#1072;&#1081;&#1085;&#1086;&#1074;&#1110;&#1096;&#1072; &#1074;&#1077;&#1088;&#1089;&#1110;&#1103;';
    lang_ua['DETALLES']                     = '&#1044;&#1077;&#1090;&#1072;&#1083;&#1110;';
    lang_ua['MAP_EXT']                      = '&#1056;&#1086;&#1079;&#1096;&#1080;&#1088;&#1077;&#1085;&#1072; &#1082;&#1072;&#1088;&#1090;&#1072;';
    lang_ua['MAT_PRIMAS']           = '&#1056;&#1077;&#1089;&#1091;&#1088;&#1089;&#1080;';
    lang_ua['ATAQUES']                      = '&#1040;&#1090;&#1072;&#1082;&#1080;';
    lang_ua['CONSTR']                       = '&#1041;&#1091;&#1076;&#1110;&#1074;&#1085;&#1080;&#1094;&#1090;&#1074;&#1086;';
    lang_ua['TROPAS']                       = '&#1042;&#1110;&#1081;&#1089;&#1100;&#1082;&#1072;';
    lang_ua['ACTUALIZAR']           = '&#1055;&#1077;&#1088;&#1077;&#1074;&#1110;&#1088;&#1080;&#1090;&#1080; &#1085;&#1072;&#1103;&#1074;&#1085;&#1110;&#1089;&#1090;&#1100; &#1085;&#1086;&#1074;&#1086;&#1111; &#1074;&#1077;&#1088;&#1089;&#1110;&#1111;';
    lang_ua['RES']                          = '&#1044;&#1077;&#1088;&#1077;&#1074;&#1086; &#1091;&#1076;&#1086;&#1089;&#1082;&#1086;&#1085;&#1072;&#1083;&#1077;&#1085;&#1100;';
    lang_ua['STOREURL']         = 'Storage URL';
    lang_ua['STOREPASSWORD']    = 'Storage password';
    lang_ua['OPTIONS']                  = '&#1054;&#1087;&#1094;&#1110;&#1111;';
    lang_ua['VENTAS']                   = '&#1047;&#1073;&#1077;&#1088;&#1077;&#1078;&#1077;&#1085;&#1110; &#1087;&#1088;&#1086;&#1087;&#1086;&#1079;&#1080;&#1094;&#1110;&#1111;';
    lang_ua['SHOWINFO']                 = '&#1055;&#1086;&#1082;&#1072;&#1079;&#1072;&#1090;&#1080; &#1110;&#1085;&#1092;&#1086;&#1088;&#1084;&#1072;&#1094;&#1110;&#1102; &#1086; &#1088;&#1077;&#1089;&#1091;&#1088;&#1089;&#1072;&#1093;';
    lang_ua['HIDEINFO']                 = '&#1057;&#1093;&#1086;&#1074;&#1072;&#1090;&#1080; &#1110;&#1085;&#1092;&#1086;&#1088;&#1084;&#1072;&#1094;&#1110;&#1102; &#1086; &#1088;&#1077;&#1089;&#1091;&#1088;&#1089;&#1072;&#1093;';
    lang_ua['MAPSCAN']                  = '&#1057;&#1082;&#1072;&#1085;&#1091;&#1074;&#1072;&#1090;&#1080; &#1082;&#1072;&#1088;&#1090;&#1091;';



    var language=lang_en;

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
		[220, 160, 90, 40],
		[280, 205, 115, 50],
		[360, 260, 145, 65],
		[460, 335, 190, 85],
		[590, 430, 240, 105], 		// Level 5
		[755, 550, 310, 135],
		[970, 705, 395, 175],
		[1240, 900, 505, 225],
		[1585, 1155, 650, 290],
		[2030, 1475, 830, 370], 	// Level 10
		[2595, 1890, 1065, 470],
		[3325, 2420, 1360, 605],
		[4255, 3095, 1740, 775],
		[5445, 3960, 2230, 990],
		[6970, 5070, 2850, 1270], 	// Level 15
		[8925, 6490, 3650, 1625],
		[11425, 8310, 4275, 2075],
		[14620, 10635, 5980, 2660],
		[18715, 13610, 7655, 3405],
		[23955, 17420, 9800, 4355] 	// Level 20
	];

	// Molino
	var flourMillCost = [
		[0, 0, 0, 0], 			// Level 0
		[500, 440, 380, 1240],
		[900, 790, 685, 2230], 
		[1620, 1425, 1230, 4020],
		[2915, 2565, 2215, 7230],
		[5250, 4620, 3990, 13015], 	// Level 5
	];

	// Ladrillar
	var brickyardCost = [
		[0, 0, 0, 0], 			// Level 0
		[440, 480, 320, 50],
		[790, 865, 575, 90], 
		[1425, 1555, 1035, 160],
		[2565, 2800, 1865, 290],
		[4620, 5040, 3360, 525], 	// Level 5
	];

	// Serreria
	var sawmillCost = [
		[0, 0, 0, 0], 			// Level 0
		[520, 380, 290, 90], 
		[935, 685, 520, 160], 
		[1685, 1230, 940, 290],
		[3035, 2215, 1690, 525],
		[5460, 3990, 3045, 945], 	// Level 5
	];

	// Fundicion de hierro
	var ironFoundryCost = [
		[0, 0, 0, 0], 			// Level 0
		[200, 450, 510, 120],
		[360, 810, 920, 215], 
		[650, 1460, 1650, 390],
		[1165, 2625, 2975, 700],
		[2100, 4725, 5355, 1260], 	// Level 5
	];

	// Panaderia
	var bakeryCost = [
		[0, 0, 0, 0], 			// Level 0
		[1200, 1480, 870, 1600], 
		[2160, 2665, 1565, 2880],
		[3890, 4795, 2820, 5185],
		[7000, 8630, 5075, 9330],
		[12595, 15535, 9135, 16795], 	// Level 5
	];

	// Mercado
	var marketplaceCost = [
		[0, 0, 0, 0], 			// Level 0
		[80, 70, 120, 70],
		[100, 90, 155, 90], 
		[130, 115, 195, 115],
		[170, 145, 250, 145],
		[215, 190, 320, 190], 		// Level 5
		[275, 240, 410, 240],
		[350, 310, 530, 310],
		[450, 395, 675, 395],
		[575, 505, 865, 505], 
		[740, 645, 1105, 645], 		// Level 10
		[945, 825, 1415, 825], 
		[1210, 1060, 1815, 1060],
		[1545, 1355, 2320, 1355],
		[1980, 1735, 2970, 1735],
		[2535, 2220, 3805, 2220], 	// Level 15
		[3245, 2840, 4870, 2840],
		[4155, 3635, 6230, 3635],
		[5315, 4650, 7975, 4650],
		[6805, 5955, 10210, 5955],
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
		[5955, 7655, 14460, 5955],
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

	var greatWarehouseCost = [
		[0, 0, 0, 0],
		[650, 800, 450, 200],
		[830, 1025, 575, 255],
		[1065, 1310, 735, 330],
		[1365, 1680, 945, 420],
		[1745, 2145, 1210, 535],
		[2235, 2750, 1545, 685],
		[2860, 3520, 1980, 880],
		[3660, 4505, 2535, 1125],
		[4685, 5765, 3245, 1440],
		[5995, 7380, 4150, 1845],
		[7675, 9445, 5315, 2360],
		[9825, 12090, 6800, 3020],
		[12575, 15475, 8705, 3870],
		[16095, 19805, 11140, 4950],
		[20600, 25355, 14260, 6340],
		[26365, 32450, 18255, 8115],
		[33750, 41540, 23365, 10385],
		[43200, 53170, 29910, 13290],
		[55295, 68055, 38280, 17015],
		[70780, 87110, 49000, 21780]
	];

	var greatGranaryCost = [
		[0, 0, 0, 0],
		[400, 500, 350, 100],
		[510, 640, 450, 130],
		[655, 820, 575, 165],
		[840, 1050, 735, 210],
		[1075, 1340, 940, 270],
		[1375, 1720, 1205, 345],
		[1760, 2200, 1540, 440],
		[2250, 2815, 1970, 565],
		[2880, 3605, 2520, 720],
		[3690, 4610, 3230, 920],
		[4720, 5905, 4130, 1180],
		[6045, 7555, 5290, 1510],
		[7735, 9670, 6770, 1935],
		[9905, 12380, 8665, 2475],
		[12675, 15845, 11090, 3170],
		[16225, 20280, 14200, 4055],
		[20770, 25960, 18175, 5190],
		[26585, 33230, 23260, 6645],
		[34030, 42535, 29775, 8505],
		[43555, 54445, 38110, 10890]
	];

        var maravillaCost = [
		[0, 0, 0, 0],
		[66700, 69050, 72200, 13200],
		[68535, 70950, 74185, 13565],
		[70420, 72900, 76225, 13935],
		[72355, 74905, 78320, 14320],
		[74345, 76965, 80475, 14715],
		[76390, 79080, 82690, 15120],
		[78490, 81255, 84965, 15535],
		[80650, 83490, 87300, 15960],
		[82865, 85785, 89700, 16400],
		[85145, 88145, 92165, 16850], // Nivel 10
		[87485, 90570, 94700, 17315],
		[89895, 93060, 97305, 17790],
		[92365, 95620, 99980, 18280],
		[94905, 98250, 102730, 18780],
		[97515, 100950, 105555, 19300],
		[100195, 103725, 108460, 19830],
		[102950, 106580, 111440, 20375],
		[105785, 109510, 114505, 20935],
		[108690, 112520, 117655, 21510],
		[111680, 115615, 120890, 22100], // Nivel 20
		[114755, 118795, 124215, 22710],
		[117910, 122060, 127630, 23335],
		[121150, 125420, 131140, 23975],
		[124480, 128870, 134745, 24635],
		[127905, 132410, 138455, 25315],
		[131425, 136055, 142260, 26010],
		[135035, 139795, 146170, 26725],
		[138750, 143640, 150190, 27460],
		[142565, 147590, 154320, 28215],
		[146485, 151650, 158565, 28990], // Nivel 30
		[150515, 155820, 162925, 29785],
		[154655, 160105, 167405, 30605],
		[158910, 164505, 172010, 31450],
		[163275, 169030, 176740, 32315],
		[167770, 173680, 181600, 33200],
		[172380, 178455, 186595, 34115],
		[177120, 183360, 191725, 35055],
		[181995, 188405, 197000, 36015],
		[186995, 193585, 202415, 37005],
		[192140, 198910, 207985, 38025], // Nivel 40
		[197425, 204380, 213705, 39070],
		[202855, 210000, 219580, 40145],
		[208430, 215775, 225620, 41250],
		[214165, 221710, 231825, 42385],
		[220055, 227805, 238200, 43550],
		[226105, 234070, 244750, 44745],
		[232320, 240505, 251480, 45975],
		[238710, 247120, 258395, 47240],
		[245275, 253915, 265500, 48540],
		[252020, 260900, 272800, 49875], // Nivel 50
		[258950, 268075, 280305, 51245],
		[266070, 275445, 288010, 52655],
		[273390, 283020, 295930, 54105],
		[280905, 290805, 304070, 55590],
		[288630, 298800, 312430, 57120],
		[296570, 307020, 321025, 58690],
		[304725, 315460, 329850, 60305],
		[313105, 324135, 338925, 61965],
		[321715, 333050, 348245, 63670],
		[330565, 342210, 357820, 65420], // Nivel 60
		[339655, 351620, 367660, 67220],
		[348995, 361290, 377770, 69065],
		[358590, 371225, 388160, 70965],
		[368450, 381435, 398835, 72915],
		[378585, 391925, 409800, 74920],
		[388995, 402700, 421070, 76985],
		[399695, 413775, 432650, 79100],
		[410685, 425155, 444550, 81275],
		[421980, 436845, 456775, 83510],
		[433585, 448860, 469335, 85805], // Nivel 70
		[445505, 461205, 482240, 88165],
		[457760, 473885, 495505, 90590],
		[470345, 486920, 509130, 93080],
		[483280, 500310, 523130, 95640],
		[496570, 514065, 537520, 98270],
		[510225, 528205, 552300, 100975],
		[524260, 542730, 567490, 103750],
		[538675, 557655, 583095, 106605],
		[553490, 572990, 599130, 109535],
		[568710, 588745, 615605, 112550], // Nivel 80
		[584350, 604935, 632535, 115645],
		[600420, 621575, 649930, 118825],
		[616930, 638665, 667800, 122090],
		[633895, 656230, 686165, 125450],
		[651330, 674275, 705035, 128900],
		[669240, 692820, 724425, 132445],
		[687645, 711870, 744345, 136085],
		[706555, 731445, 764815, 139830],
		[725985, 751560, 785850, 143675],
		[745950, 772230, 807460, 147625], // Nivel 90
		[766460, 793465, 829665, 151685],
		[787540, 815285, 852480, 155855],
		[809195, 837705, 875920, 160140],
		[831450, 860745, 900010, 164545],
		[854315, 884415, 924760, 169070],
		[877810, 908735, 950190, 173720],
		[901950, 933725, 976320, 178495],
		[926750, 959405, 1003170, 183405],
		[952235, 985785, 1030760, 188450],
		[978425, 1012895, 1059105, 193630] // Nivel 100
        ];

	var buildingCost = new Array();
	buildingCost[0] = lenyadorCost;
	buildingCost[1] = barroCost;
	buildingCost[2] = hierroCost;
	buildingCost[3] = cerealCost;

	buildingCost[5] = sawmillCost;
	buildingCost[6] = brickyardCost;
	buildingCost[7] = ironFoundryCost;
	buildingCost[8] = flourMillCost;
	buildingCost[9] = bakeryCost;
	buildingCost[10] = warehouseCost;
	buildingCost[11] = granaryCost;
	buildingCost[12] = blacksmithCost;
	buildingCost[13] = armouryCost;
	buildingCost[14] = tournamentSquareCost;
	buildingCost[15] = mainBuildingCost;
	buildingCost[16] = rallyPointCost;
	buildingCost[17] = marketplaceCost;
	buildingCost[18] = embassyCost;
	buildingCost[19] = barracksCost;
	buildingCost[20] = stableCost;
	buildingCost[21] = workshopCost;
	buildingCost[22] = academyCost;
	buildingCost[23] = crannyCost;
	buildingCost[24] = ayuntamientoCost;
	buildingCost[25] = residenceCost;
	buildingCost[26] = palaceCost;
	buildingCost[27] = tesoroCost;
	buildingCost[28] = oficinaComercioCost;
	buildingCost[29] = greatBarrackCost;
	buildingCost[30] = greatStableCost;
	buildingCost[31] = wallGaulsCost;
	buildingCost[32] = wallRomansCost;
	buildingCost[33] = wallTeutonsCost;
	buildingCost[34] = canteroCost;
	buildingCost[35] = cerveceriaCost;
	buildingCost[36] = trampaCost;
	buildingCost[37] = casaHeroeCost;
	buildingCost[38] = greatWarehouseCost;
	buildingCost[39] = greatGranaryCost;
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
	uc[10] = [5800,5300,7200,5500,1600]; 	// Descubridor

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
	uc[20] = [7200,5500,5800,6500,1600]; 	// Descubridor

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
	uc[30] = [5500,7000,5300,4900,1600]; 	// Descubridor 

	// Fauna
	uc[31] = [0, 0, 0, 0, 0];		// Rata
	uc[32] = [0, 0, 0, 0, 0];		// Aranya
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

	var actual = new Array(4);		// Informacion de recursos almacenados termelesmennyiseg fajtankent
	var total = new Array(4);		// Capacidad de los almacenes y granero raktarkapacitas fajtankent
	var produccion = new Array(4);		// Produccion por segundo termeles fajtankent
	var imagenes = new Array();		// Imagenes pre-cargadas

	// Indica para que servidores esta disponible el servicio de Travian World
	// IMPORTANTE: Por favor, no cambiar / Please, don't change. Travian World is only available for the servers indicated below
	var tw_server = new Array();

	// Se estima cada linea como una altura de 20 pixeles
	var pixelsPorLinea = 20;

	// Imagen de un sobre para enviar IGM
	imagenes["igm"] = 'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAICAYAAAAvOAWIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QsKFws6qttDxQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAkUlEQVQY05XQTUpDQRAE4K8yz9BuPEduEH8C2Tw8haeT3CQbPZEiIeNmhLdIAvamqerqaqqDdxxwcr0mvAWv+MYHfi4I13hErXCuqmOSp9batFS11qYk26o64gzzmCXJPsl64DvskYHn1cKo995PvfdnPOBl5OjLa/PY3qEGtxm9Bh/MfwG/8Hkj4Bb3+c/rfgHKwRzhskmMfQAAAABJRU5ErkJggg==';
	// Imagen compuesta para el mercado con 3 secciones: enviar recursos, compra y venta
	imagenes["mercado"] = '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';
	// Imagen compuesta para militar con 4 secciones: plaza de reuniones, cuartel, establo / corral y taller
	imagenes["militar"] = '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';
	// Imagen de una grafica para las estadisticas
	imagenes["stat"] = 'R0lGODlhDAAKAIABAAAAAP///yH5BAEAAAEALAAAAAAMAAoAAAIVjA1wi82eFJP0RIhD1Xn77mhKIhoFADs=';

	// Imagenes de los tipos de murallas
	imagenes["empalizada"] = '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';
	imagenes["muralla"] = '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';
	imagenes["terraplen"] = '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';

	// Imagenes para cada una de las celdas productoras de un recurso
	imagenes["r0"] = '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';
	imagenes["r1"] = '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';
	imagenes["r2"] = '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';
	imagenes["r3"] = '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';

	
    
    
    
    
    
    // Itt kezdodnek a css-ek; 
    
    var cssStyle = "";
    cssStyle += "#resumen {top: 485px;position: relative; width:900px; float: right;}";
    cssStyle += "#tabla_mapa {position: relative; width:900px; margin-top: 16px; float: bottom;}";
    cssStyle += ".bttable {width:100%; height:129px;}";
    cssStyle += ".dcol {color:#A0A0A0;}";
    GM_addStyle(cssStyle);
    
    
    
    
    
    
    var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;		// Constante que devuelve el primer elemento por XPath
	var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Constante que devuelve una lista de elementos por XPath
	var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		// Constante que deuvelve un iterador de elementos por XPath

	/**
	 * A Fuggvenyek kezdetet jelzo flag
	 */
	function dummy(){}

	function getRandTimeRange(maxrange){ // input in milliseconds output in milliseconds
	    var nr = Math.floor(maxrange * (0.6+0.4*Math.random()));
		//log(3, "Calculated RandTimeRange : "+nr+" ms.");
		return nr;
	}


	/**
	 * Funcion que extrae el nombre de un fichero de una ruta o URL
	 *
	 * Params:
	 * 	path: Ruta o URL para extraer el nombre del fichero
	 *
	 * Returns:
	 *	El nombre del fichero al que apunta la ruta o URL
	 */
	function basename(path) { 
        return path.replace( /.*\//, "" ); 
    }

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
	 * Elimina un elemento
	 *
	 * Param:
	 *	elem	El elemento a eliminar
	 */
	function removeElement(elem){ if (elem) elem.parentNode.removeChild(elem) }

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
	function find(xpath, xpres,startnode){
		if (!startnode) {startnode=document;}
		var ret = document.evaluate(xpath, startnode, null, xpres, null);
		return  xpres == XPFirst ? ret.singleNodeValue : ret;
	}

	/**
	 * Crea o actualiza el valor de una cookie con una determinada duracion
	 *
	 * Params:
	 *	name	Nombre de la cookie
	 *	value	Contenido de la cookie
	 *	days	Duracion de la validez de la cookie
	 */
	function createCookie(name, value,callback){
        if  (callback==undefined)  {
           callback=dummy;
        }
        if (name == 'storepassword') {
           saveStorePassword(name,storepassword,value,callback);
           storepassword=value;
           GM_setValue(server+"_"+uid+"_"+name, encodeURIComponent(value));
           GM_setValue(server+"_"+uid+"_lastload","0");
        } else {
           GM_setValue(server+"_"+uid+"_"+name, encodeURIComponent(value));
           if (name == 'storeurl') {
              storeurl=value;
              GM_setValue(server+"_"+uid+"_lastload","0");
              callback("ok");
           } else if (storeurl != '')  {
              saveData(name,value,callback);
           } else {
              callback("ok");
           }
        }
	}

    function setOption(key, value) {
       var options = readCookie("options");
       if(options != '') options = options.split(",");
       else options = [];
       var myOption = options.indexOf(key);
       if(myOption < 0) {
          options.push(key);
          options.push(encodeURIComponent(value));
       } else {
          options[myOption + 1] = encodeURIComponent(value);
       }
       options.join(",");
       createCookie("options", options);
    }

    /**
     * @param key: name of the parameter in the cookie.
     * @param defaultValue: this is returned if the parameter is not found in the cookie.
     * @param type: if set, type conversion occurs. Values {string, integer, boolean} The conversion occurs only if it is not the defaultValue being returned.
     */
    function getOption(key, defaultValue, type) {
       var options = readCookie('options');
       options = options.split(",");
       var myOption = options.indexOf(key);
       if(myOption < 0) {return defaultValue;}
       switch(type) {
          case "boolean":
             var myOption = ( options[myOption + 1] == "true") ? true:false;
          break;
          case "integer":
             var myOption = parseInt(options[myOption + 1]);
          break;
          case "string":
          default:
             var myOption = decodeURIComponent(options[myOption + 1]);
             break;
       }
       return myOption;
    }


	/**
	 * Read data from Gm storage
	 * Params: name	
	 * Returns:
	 *	The value of the name key, "" if not exists
	 */
	function readCookie(name){
		return decodeURIComponent(GM_getValue(server+"_"+uid+"_"+name, ""));
	}


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
     * Custom log function .
     * @param {int} level
     * @param:{int} msg Message to log.
     */
    function log(level, msg) {
       if (level <= LOG_LEVEL) {
          if (console != undefined) {
             console.log(msg);
             if (storeurl!=''&& LOG_LEVEL>128)
               gmAjaxRequest(storeurl,"POST","cmd=log&namespace="+server+"_"+uid+"&msg="+encodeURIComponent(msg),dummy);
          }
       }
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
		var tablas = find("//div[@id='lmid2']/table[@class='f10' and not(@width)]", XPList);
        if (tablas.snapshotLength==0) tablas = find("//div[@id='lmid2']/form/table[@class='f10' and not(@width)]", XPList);
		var k = celdas.snapshotLength - 1;

		// Se comienza por el final para evitar confusiones con otra informacion, ya que suele
		// estar lo ultimo en el caso de un unico edificio
		for(var j = tablas.snapshotLength - 1; j >= 0; j--) {
			var tabla = tablas.snapshotItem(j);
			var celda = tabla.rows[0].firstChild;
			var recursos = celda.textContent.split("|").splice(0,4);
			if(recursos.length != 4) continue;

			var a = calculateResourceTime(recursos);
			var b = celdas.snapshotItem(k);
			// Por si hay mas tablas que celdas
			if (b){
				// Si lo que hay antes de la celda es un enlace, entonces se trata de la cola del Plus
				if (b.firstChild && b.previousSibling.previousSibling.nodeName == 'A') continue;
				// Se elimina la informacion existente antes de poner la nueva
				if (a != null){
					if (b.firstChild && b.previousSibling.previousSibling.nodeName == 'TABLE') while(b.hasChildNodes()) b.removeChild(b.firstChild);
					b.appendChild(div(a));
					b.appendChild(document.createElement('BR'));
					k--;
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
	 * Calcula el desplazamiento en pixeles a partir del 23 enlace 
	 * lateral (aldeas o enlaces personalizados)
	 *
	 * Returns:
	 *	El desplazamiento en pixeles
	 */
	function longitudPantalla(){
		var enlaces = 0;

		// Se estima que caben 19 enlaces hasta que empiecen a ser demasiados y a ser tenidos en cuenta
		var a = find("//div[@id='lright1']//span[text()]", XPList).snapshotLength;
		if (a > 0) a += 3;

		var b = obtenerValorCookie("marcadores").length+readCookie("notas").split("\n").length;;
		if (b > 0) a += b + 2;


		var c = find("//ul/li", XPList);
		if (c > 0) a += c + 2;

		a -= 23;
		if (a > 0) enlaces += a * pixelsPorLinea;

		// Se tiene en cuenta el numero de construcciones
		var a = find("//div[@id='ba']//table[@class='f10' and @width='100%']//tr", XPList).snapshotLength - 2;
		if (a) enlaces += pixelsPorLinea * (a > 0 ? a : 0);

		// Se tiene en cuenta el banner de publicidad
		var a = find("//iframe", XPFirst);
		if (a != null) enlaces += parseInt(a.height);

		return enlaces;
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
		var tiempo_max = 0;
		var a = null;
		var res_table = '';

		// Calcula y crea una cadena con lo que falta de cada recurso
        // A negy nyersanyagfajta 
		for (var i = 0; i < 4; i++){
           necesario[i]=necesario[i]-0;
            // kell meg = epiteshez szukseges- amink van
			var restante = necesario[i] - actual[i];
			if (restante > 0){
				var tiempo = Math.round(restante / produccion[i]);
				if (tiempo < 0 || total[i]-necesario[i]<0) {
                    tiempo_max = 'Infinity';
                    res_table += '<tr><td><img src="' + img('r/' + (i+1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '"></td><td align="right" id="timeout' + i + '">' + restante + '</td><td>' + T('NUNCA') + '</td></tr>';
                } else {
                   if (tiempo > tiempo_max && tiempo_max !='Infinity') {
                      tiempo_max = tiempo;
                   }
                   tiempo = formatear_tiempo(tiempo+5);
                   res_table += '<tr><td><img src="' + img('r/' + (i+1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '"></td><td align="right" id="timeout' + i + '">' + restante + '</td><td align="right" id="timeout" width="60">' + tiempo + '</td></tr>';
                }
			}
//            log(1,"v3 t:"+total[i]+" n:'"+necesario[i]+"' r:"+restante+ " tn:"+tiempo_max);
		}

		// Calcula y crea una cadena con el tiempo que falta hasta conseguir los recursos
		if (tiempo_max == 'Infinity'){
           // Soha nem lesz eleg nyertanyag szoveg.
            a = '<table align="left">'+res_table+'<tr><td colspan="2">'+T('LISTO') + '</td><td>' + T('NUNCA')+ '</td></tr></table>';
		}else if (tiempo_max > 0){
			var tiempo2 = formatear_tiempo(tiempo_max + 5); // Introduce un margen de 5 segundos para compensar la desviancion de los temporizadores de javascript
			var fecha = new Date();
			fecha.setTime(fecha.getTime() + (tiempo_max * 1000));
            
            // Meg kell szoveg: resourcecsik, ora Kesz ma szoveg, mikorra keszul
            // tl.
            a = '<table align="left">'+res_table+'<tr><td colspan="2">'+T('LISTO') + '</td><td>' + calcularTextoTiempo(fecha)+ '</td></tr></table>';
		}
//       log(1,a);
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
		var ahora = new Date();

		// Calcula la diferencia de horas entre la fecha dada y la actual
		// para saber si se trata de las proximas 72 horas
		var horas = ((fecha.getTime() - ahora.getTime()) / 1000 / 60 / 60);
		horas += ahora.getHours() + (ahora.getMinutes() / 60);
		var tiempo_restante='';
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

		for (var i = 0; i < 4; i++){
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
		var tbodyelem = get('l4').parentNode.parentNode;
		var filltr = document.createElement('TR');
		for (var i = 0; i < 4; i++){
			var tiempo = -1;
			if (produccion[i] < 0) {
				tiempo = Math.round(actual[i] / -produccion[i]);
			} else if (produccion[i] > 0) {
				tiempo = Math.round((total[i] - actual[i]) / produccion[i]);
			}

            var produccionHora = get('l' + (4-i)).title;
            var tiempoRestante = "<span id='timeouta' style='font-weight:bold;"+(produccion[i] < 0 ? ' color:#FF0000;':'')+"'>" + formatear_tiempo(tiempo) + "</span>";
            var celda = elem("TD", "(" + produccionHora +', '+tiempoRestante+')');
            celda.setAttribute("style","font-size:10px; color:#707070; text-align:left; padding-left: 7px;");
            celda.setAttribute("colspan","2");
            celda.setAttribute("valign","top");
			filltr.appendChild(celda);
		}
		tbodyelem.appendChild(filltr); 
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
		// Si una cadena concreta no esta traducida en el idioma, utiliza por defecto el castellano
		if (language[texto] == undefined) return lang_en[texto]; else return language[texto];
	}

	/**
	 * Traduce una cadena de texto usando el idioma global detectado
	 *
	 * Params:
	 *	texto: Cadena de texto a traducir
	 *	args: Argumentos a sustituir en la cadena a traducir
	 *
	 * Returns:
	 * 	Cadena de texto traducida
	 */
	function F(texto, args){
		// "args" debe ser un array asociativo del tipo {'a':'b', 'c':'d'} y puede ser opcional
		if (language[texto] == undefined) texto = lang_en[texto]; else texto = language[texto];

		if (args != undefined) for(var i in args) texto = texto.replace(i, args[i]);
		return texto;
	}

	/**
	 * Recupera informacion generica inicial para el resto de funciones
	 */
	function getGeneralData(){
        
		// Idioma
		find("//img[contains(@src, 'plus.gif')]", XPFirst).src.search(/\/img\/([^\/]+)\//);
		idioma = RegExp.$1;
        // Intenta usar el array del idioma, y si no esta disponible utiliza el castellano por defecto
        try{
            eval('language = lang_' + idioma);
        }catch(e){
        }

		// Ruta al pack grafico
		// empty graphics set support added
		var csshr = find("//link[@rel='stylesheet']", XPFirst).href;
		csshr.search(/^http:\/\/[^\/]*\/(.*\/)?(.*)\.css/);
		pack_grafico = RegExp.$1;
		if (!pack_grafico) pack_grafico='';

		// Identify the current village
		id_aldea = getIdAldea();

		// Identify the userid
        var menu= document.evaluate("//td[@class='menu']/a[3]", get("navi_table"), null, XPFirst, null).singleNodeValue;
		uid = ((menu.search.split("="))[1]);

		// Nombre del servidor
		location.href.search(/http:\/\/(.*)\//);
        var oldserver =  RegExp.$1;
		server = oldserver.replace(/\.travian\./,'');

		// Por cada tipo de recurso: cantidad actual almacenada, capacidad total del almacen / granero y produccion por segundo
		for (var i = 0; i < 4; i++){
			var a = get('l' + (4-i));
			actual[i] = a.innerHTML.split("/")[0];
			total[i] = a.innerHTML.split("/")[1];
			produccion[i] = a.title/3600;
		}

		// Plus
		if (find("//img[contains(@src, 'travian1.gif')]", XPFirst)) plus = true; else plus = false;
      
       // storage parameters
       storeurl=readCookie("storeurl");
       storepassword=readCookie("storepassword");
       LOG_LEVEL=getOption("loglevel",0,"integer");
        

	}

	/**
	 * Oculta el anuncio de publicidad
	 */
	function hideAd(){
		var ad = find("//iframe", XPFirst);
		if (ad) ad.style.display = 'none';
	}

	/**
	 * Crea nuevos enlaces en la barra de menu izquierda. Son enlaces internos y externos al juego separados por una linea
	 */
	function quickLinks(){
		var menu = find("//td[@class='menu']", XPFirst);
		for (var j = 0; j < 2; j++) for (var i = 0; i < menu.childNodes.length; i++) if (menu.childNodes[i].nodeName == 'BR') removeElement(menu.childNodes[i]);
		var links = [	0,
				[T('LOGIN دخول'), "login.php"],
				[T('ALIANZA'), "allianz.php"],
				[T('VB'), "allianz.php?s=2"],

				[T('ENV_TROPAS'), "a2b.php"],
				[T('SIM'), "warsim.php"],
                0,
				[T('COMP'), "http://trcomp.sourceforge.net/?lang=" + idioma, "_blank"],
				['سجل هنا لكسب الذهب مجانا', "http://www.AWSurveys.com/HomeMain.cfm?RefID=saalsalman"],
				['Toolbox صندوق الادوات', "http://www.traviantoolbox.com/index.php?lang=" + idioma, "tr3_toolbox"],
//				[T('MAPA'), "http://travmap.shishnet.org/?lang=" + idioma, "_blank"],
//				["Travian Beyond", "http://www.denibol.com/proyectos/travian_beyond/", "_blank"]
				[T('CHECK'), "http://userscripts.org/scripts/source/32667.user.js", "_blank"],
//				[T('RES'), "http://www.nmprog.hu/travian/buildingsandunitsv39ek.jpg", "tr3_buildingtree"],
//				[T('UPGRADET'), "http://userscripts.org/scripts/source/32667.user.js", "_blank"],
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
		/* var links = find("//img[contains(@src, 'del.gif')]", XPList);
		for (var i = 0; i < links.snapshotLength; i++){
			links.snapshotItem(i).setAttribute('onClick', 'javascript:return confirm("' + T('SEGURO') + '");');
		} */
	}

	/**
	 * Anyade nuevos enlaces a edificios en la barra superior
	 */
	function buildingLinks(){
		// Desplaza el menu del Plus a la izquierda para hacer hueco a las nuevas imagenes
		// Localiza la barra de enlaces superiores
		var barra = get('ltop5');//find("//div[@id='ltop5']", XPFirst);
        barra.style.left = '161px';
        barra.style.display='none';

		var a = find("//a[contains(@href, 'plus.php')]", XPFirst);
		a.style.marginLeft = '0px';
		a.style.position = 'absolute';
		a.style.left = '-250px';

		// Asocia el mapa del mercado con la imagen especifica creada
		barra.innerHTML += '<img usemap="#mercado" class="fl2" src="data:image/gif;base64,' + imagenes["mercado"] + '" border="0" title="' + T('MERCADO') + '">';

		// Asocia el mapa de los edificios militares con la imagen creada a tal efecto
		barra.innerHTML += '<img usemap="#militar" class="fl2" src="data:image/gif;base64,' + imagenes["militar"] + '" border="0" title="' + T('CUARTEL') + '">';

		// Mapa para el mercado
		barra.innerHTML += '<map name="mercado"><area shape="rect" coords="0,0,70,50" href="build.php?gid=17" title="' + T('ENVIAR') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=17&t=1" title="' + T('COMPRAR') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=17&t=2" title="' + T('VENDER') + '"></map>';

		// Mapa para los edificios militares
		barra.innerHTML += '<map name="militar"><area shape="rect" coords="0,0,35,50" href="build.php?gid=16" title="' + T('PUNTO') + '"><area shape="rect" coords="35,0,70,50" href="build.php?gid=19" title="' + T('CUARTEL') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=20" title="' + T('CORRAL') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=21" title="' + T('TALLER') + '"></map>';
        barra.style.display='';

	}

	/**
	 * Crea un enlace al servicio de estadisticas de Travian World que recibe la busqueda como parametro
	 *
	 * Params:
	 *	param	Parametro de busqueda para la estadistica
	 */
/*	function createStatLink(param){
		var statlink = elem('a', "<img src='data:image/gif;base64," + imagenes["stat"] + "' style='margin:0px 1px 0px 1px; display: inline' title='" + T('STAT') + "' alt='Stat' border=0>");
		statlink.href = "javascript:void(0);";
		var ref = 'http://www.denibol.com/proyectos/travian_world/stat2.php?server=' + server + '&' + param;
		statlink.addEventListener("mouseover", function(){ timeout = setTimeout(function(){ var a = get("tb_tooltip"); a.innerHTML = "<img src='" + ref + "' border='0'/>"; a.style.display = 'block'; }, 1000); }, 0);
		statlink.addEventListener("mouseout", function(){ clearTimeout(timeout); get("tb_tooltip").style.display = 'none'; }, 0);
		statlink.addEventListener("click", function(){ var popup = window.open(ref, 'popup', 'width=350, height=250'); popup.focus(); return false; }, 0);
		return statlink;
	}
*/
	/**
	 * Crea un enlace para mandar un IGM cuando aparece un enlace al perfil de un jugador, un enlace de
	 * ataque rapido cuando aparece un enlace a una ubicacion del mapa, y otro enlace de estadisticas si
	 * esta soportado para el idioma del servidor activo
	 */
	function playerLinks(){
		var links = document.getElementsByTagName("a");
		for(var i = 0; i < links.length; i++){
			// Por cada enlace a una ficha de jugador 
			if(links[i].href.search(/spieler.php\?uid=(\d+$)/) > 0) {
				var a = RegExp.$1;
                                if (a == 0) continue;
				if (links[i].parentNode.className == 'menu') continue;
//				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('uid=' + a), links[i].nextSibling);

				// Introduce el enlace para enviar mensajes usando su ID	
				var igmlink = elem('a', "<img src='data:image/gif;base64," + imagenes["igm"] + "' style='margin:3px 0px 1px 3px; display: inline' title='" + T('ENVIAR_IGM') + "' alt='' border=0>");
				igmlink.href = 'nachrichten.php?t=1&id=' + a;
				links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
			// Por cada enlace a una localizacion del mapa
			}else if (links[i].href.search(/karte.php\?d=(\d+)/) > 0){
				var a = RegExp.$1;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('id=' + a), links[i].nextSibling);

				// Agrega un enlace para lanzar un ataque usando su posicion
				var atklink = elem('a',"<img src='" + img("a/att_all.gif") + "' style='margin:3px 0px 1px 3px; display: inline' height='10' width='10' title='" + T('ATACAR') + "' alt='' border='0'>");
				atklink.href = 'a2b.php?z=' + a;
				links[i].parentNode.insertBefore(atklink, links[i].nextSibling);
			// Por cada enlace a la ficha de una alianza
			}else if (links[i].href.search(/allianz.php\?aid=(\d+$)/) > 0){
				var a = RegExp.$1;
                                if (a == 0) continue;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('aid=' + a), links[i].nextSibling);
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
		// Comprueba si esta el formulario de envio
		if (find("//form[@name='snd']", XPFirst) == null) return;
		var ciudades = new Array(); 

		// Recupera la coordenada X
		var n = find("//table[@class='dtbl']//td[@class='right dlist1']", XPList); 
		for(var i = 0; i < n.snapshotLength; i++){
			ciudades[i] = new Object();
			try{ ciudades[i].x = n.snapshotItem(i).innerHTML.split('(')[1]; }catch(e){}
		} 

		// Recupera la coordenada Y
		n = find("//table[@class='dtbl']//td[@class='left dlist3']", XPList); 
		for(var i = 0; i < n.snapshotLength; i++){ 
			try{ ciudades[i].y = n.snapshotItem(i).innerHTML.split(')')[0]; } catch(e){}
		} 

		// Por cada par de coordenadas crea un evento para copiarlas al formulario
		n = find("//table[@class='dtbl']//tr", XPList);
		for (var i = 0; i < ciudades.length; i++){
			var elem = n.snapshotItem(i);
			elem.setAttribute('onClick',"snd.x.value='" + ciudades[i].x + "';snd.y.value='" + ciudades[i].y + "'");
			elem.setAttribute('onMouseOver', 'this.style.color="red"');
			elem.setAttribute('onMouseOut', 'this.style.color="black"');
			elem.style.cursor = "pointer";
		}
	}

	/**
	 * Calcula y muestra informacion adicional en los informes de los ataques
	 * Codigo inicial de Bafox
	 */
	function reportBatalla(){ 
		var t = find("//table[@class='tbg']//table[@class='tbg']", XPList); 
		if (t.snapshotLength < 2) return;

		// Encuentra y suma todas las cantidades del botin
		var botin = null;
		var a = find("//tr[@class='cbg1']", XPList);
		if (a.snapshotLength >= 3){
			// FXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
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
					info_botin += '<img src="' + img('r/' + (i + 1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">';
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
			carry[g] = 0;	
			var tt = t.snapshotItem(g); 
			var num_elementos = tt.rows[1].cells.length - 1;
			for(var j = 1; j < 11; j++){ 
				// Recupera la cantidades de tropa de cada tipo que han intervenido
				var u = uc[tt.rows[1].cells[j].getElementsByTagName('img')[0].src.replace(/.*\/.*\//,'').replace(/\..*/,'')]; 
				var p = tt.rows[3] ? tt.rows[3].cells[j].innerHTML : 0; 
				// Basandose en el coste por unidad y su capacidad, se calculan las perdidas y la capacidad de carga total
				var ptu = arrayByN(u, p);
				perds[g] = arrayAdd(perds[g], ptu.slice(0, 4)); 
				carry[g] += (tt.rows[2] ? tt.rows[2].cells[j].innerHTML - p : 0) * u[4];
			}

			// Anyade la nueva informacion como una fila adicional en cada tabla
			var informe = document.createElement("TD");
			for (var i = 0; i < 4; i++){
				informe.innerHTML += '<img src="' + img('r/' + (i + 1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">';
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
			if (g == 0 && botin != null){
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
		for(var i = 0; i < 4; i ++) {
			grid[i] = new Array(26);
			for(var j = 0; j <= 25; j++) {
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

		find("//div[starts-with(@id, 'f')]", XPFirst).id.search(/f(\d)/);
		var tipo = RegExp.$1;

		// Recupera todas las casillas y rellena la matriz con los niveles detectados
		for (var i = 1; i <= 18; i++){
			var a = find("//img[@class='rf" + i + "']", XPFirst);
			if (a){
				a.src.search(/\/s(\d+).gif$/);
				grid[dist[tipo - 1][i - 1]][RegExp.$1]=i;
			}else{
				grid[dist[tipo - 1][i - 1]][0]=i;
			}
		}

		// Crea una tabla mostrando por cada tipo de recurso un representante de cada nivel que se ha encontrado
		// Muestra al lado de cada uno los recursos y tiempo restantes hasta poder subirlo de nivel
		var table = document.createElement('TABLE');
		table.setAttribute("class", "tbg");
//		table.setAttribute("width", "1000px");
		table.setAttribute("align", "left");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");
		var fila1 = document.createElement('TR');
		var fila2 = document.createElement('TR');
		fila1.setAttribute("class", "rbg");	
		table.appendChild(fila1);
		table.appendChild(fila2);
		for (var i = 0; i < 4; i++){
			var td1 = elem('TD', '<img src="' + img('r/' + (i+1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">');
            td1.setAttribute('width','25%');
			fila1.appendChild(td1);

			var td2 = document.createElement('TD');
			td2.setAttribute("valign", "top");
            td2.setAttribute('width','25%');
			fila2.appendChild(td2);

			var table2 = document.createElement('TABLE');
			table2.setAttribute("align", "center");
			table2.setAttribute("valign", "top");
			td2.appendChild(table2);
			for (var j = 0; j < 25; j++){
				if (grid[i][j] > 0 && buildingCost[i][j+1] != null){
					datos = 1;
					var fila3 = document.createElement('TR');
					var imagen = '<a href="/build.php?id='+grid[i][j]+'"><div style="width: 0%;"><img src="data:image/gif;base64,' + imagenes["r" + i] + '" border="0" title="' + T('RECURSO' + (i+1)) + '">';
					if (j > 0) {
                       imagen += '<img src="' + img('g/s/s' + j + '.gif') + '" style="position:relative; bottom:52px; left: -26px;" border="0">';
                    }
					imagen += '</div></a>';
					var td = elem("TD", imagen);
//                    td.setAttribute("rowspan","5");
					fila3.appendChild(td);

					var restante = calculateResourceTime(buildingCost[i][j+1]);
					var td3 = document.createElement('TD');
					td3.setAttribute('class', 'dcol f7');
					fila3.appendChild(td3);
					table2.appendChild(fila3);

					if (restante != null) { 
 					   td3.setAttribute('valign', 'bottom');
                       td3.innerHTML = restante;
                    } else {
					   td3.setAttribute('valign', 'center');
                       td3.innerHTML = T('SUBIR_NIVEL');
                    }
				}
			}
		}
//		table.style.position = 'absolute';
		table.setAttribute("id", "resumen");
		// Se desplaza la tabla hacia abajo para no interferir con la lista de aldeas / enlaces derecha
//		table.style.top = 580 + longitudPantalla() + 'px';
		if (datos == 1)  {
			var middleblock = get('lmidall');
			middleblock.appendChild(document.createElement('BR'));
			middleblock.appendChild(table);
           //find("//body/div[@id='lmidall']", XPFirst).appendChild(table);
        }
	}

	/**
	 * Realiza un resumen de la pagina de edificios de la aldea
	 */
	function preCalculate2(){
		var edificiosPorFila = 4; // hany epulet legyen egy sorban
		var datos = 0;
		var buildingsImages = new Array();
		var buildingsDescs = new Array();
		var buildingsLinks = new Array();

		// recoge los nombres de cada uno
		var xpathResult = find('//map[@name="map1"]/area/@title', XPIter);
		while ((buildingsDescs[buildingsDescs.length] = xpathResult.iterateNext())) {}

		// los enlaces para acceder directamente a ellos
		xpathResult = find('//map[@name="map1"]/area/@href', XPIter);
		while ((buildingsLinks[buildingsLinks.length] = xpathResult.iterateNext())) {}

		// Procesa as imagenes de los edificios
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
		table.setAttribute("align", "left");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");

		var j = 0;
		for(var i = 0; i < buildingsDescs.length - 3; i++) {
			if(buildingsDescs[i] != null && basename(buildingsImages[i].nodeValue) != 'iso.gif') {
				// Por cada edificio se recoge su nivel y su codigo en el juego
				var buildingLevel = buildingsDescs[i].nodeValue.split(" ");
				buildingLevel = parseInt(buildingLevel[buildingLevel.length-1]);

				var buildingCode = buildingsImages[i].nodeValue.split("/");
				buildingCode = buildingCode[buildingCode.length-1].split(".");
				if (buildingCode[0].search(/(\d+)/)) buildingCode = parseInt(RegExp.$1);
//				buildingCode = parseInt(buildingCode[0].substring(1, buildingCode[0].length));

				// Si es actualizable se muestra junto con los recursos que necesita
				if (buildingCost[buildingCode] != null && buildingCost[buildingCode][buildingLevel+1] != null){
					// Se reparten los edificios entre las columnas disponibles en las filas que haga falta
					if (j % edificiosPorFila == 0){
						var fila = document.createElement('TR');
						table.appendChild(fila);
					}
					j++;
					datos = 1;

					// Soporte para murallas
					switch(buildingCode){
						case 31: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["empalizada"]; break;
						case 32: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["muralla"]; break;
						case 33: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["terraplen"]; break;
					}

					var td = document.createElement("TD");
                    td.setAttribute('width','25%');
                    td.setAttribute('valign','bottom');
					fila.appendChild(td);

					var table2 = document.createElement('TABLE');
					table2.setAttribute("align", "left");
                    table2.setAttribute('class','bttable');
					td.appendChild(table2);

					var nametr = document.createElement('TR');
					table2.appendChild(nametr);
					var nametd = elem('TD','<a href="' + buildingsLinks[i].nodeValue + '">' + buildingsDescs[i].nodeValue+'</a>' );
                    nametd.setAttribute('colspan',"2");
                    nametd.setAttribute('class', 'f10');
					nametr.appendChild(nametd);

					var fila2 = document.createElement('TR');
					table2.appendChild(fila2);

					var td2 = document.createElement("TD");
					td2.setAttribute('class', 'f10');
					td2.innerHTML = '<a href="' + buildingsLinks[i].nodeValue + '"><img src="' + buildingsImages[i].nodeValue + '" border="0"></a>';
					fila2.appendChild(td2);

					var restante = calculateResourceTime(buildingCost[buildingCode][buildingLevel+1]);
					var td3 = document.createElement("TD");
					td3.setAttribute('class', 'dcol f7');
                    td3.setAttribute('valign','bottom');
					fila2.appendChild(td3);

					if (restante != null) { 
 					   td3.setAttribute('valign', 'bottom');
                       td3.innerHTML = restante;
                    } else {
					   td3.setAttribute('valign', 'center');
                       td3.innerHTML = T('SUBIR_NIVEL');
                    }
				}
			}
		}
		while (j % edificiosPorFila != 0) {
           fila.appendChild(document.createElement("TD"));
           j++;
        }
		//table.style.position = 'absolute';
		table.setAttribute("id", "resumen");
		// Se desplaza la tabla hacia abajo para no interferir con la lista de aldeas / enlaces derecha
		//table.style.top = 625 + longitudPantalla() + 'px';
		if (datos == 1)  {
			var middleblock = get('lmidall');
			middleblock.appendChild(document.createElement('BR'));
			middleblock.appendChild(table);
        }
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

	/**
	 * Convierte un elemento a un determinado tipo segun un argumento
	 *
	 * Params:
	 *	elemento: elemento a convertir
	 *	sDataType: nuevo tipo de datos (int o float)
	 *
	 * Returns:
	 *	El elemento convertido al nuevo tipo de datos
	 */
	function convert(element, sDataType) { 
		switch(sDataType) { 
			case "int": return ((element.nodeValue == null) || !element.nodeValue.match(/\d+/)) ? 0 : parseInt(element.nodeValue); 
			case "float": return ((element.nodeValue == null) || !element.nodeValue.match(/\d+/)) ? 0 : parseFloat(element.nodeValue); 
			default: return (element == null) ? '' : element.textContent.toLowerCase();
		} 
	} 

	/**
	 * Realiza una compare entre las casillas de la misma columna en distintas filas
	 *
	 * Params:
	 *	iCol: numero de columna dentro de la fila a comparar
	 *	sDataType: tipo de datos de la comparacion
	 *
	 * Returns:
	 * 	Devuelve -1, 1 o 0 segun el resultado de la comparacion
	 */
	function generateCompareTRs(iCol, sDataType) {       
		return function compareTRs(oTR1, oTR2) { 
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

	function blocNotas2(a,notas){


		// Crea la estructura HTML del bloc
		var tabla = document.createElement("TABLE");
		var tr = document.createElement("TR");
		var td = document.createElement("TD");
		var p1 = document.createElement("P");
		var p2 = document.createElement("P");
		var nl = 2;
		if (notas!=null&&notas!='') { nl+=notas.split("\n").length; }
		if (nl>30) nl=30;
		var textarea = elem("TEXTAREA", notas);
		var input = document.createElement("INPUT");
		var imh = document.createElement("IMG");
		imh.setAttribute("src",img('msg/block_bg21.gif', true));
		imh.setAttribute("width","210");

		tabla.setAttribute("width", "220");
		td.setAttribute("align", "center");
//		td.setAttribute("background", img('msg/block_bg21.gif', true));
		textarea.setAttribute("cols", "22");
		textarea.setAttribute("id", "notas");
		textarea.setAttribute("rows", nl);
		textarea.setAttribute("style", 'background-image: url(' + img('msg/underline.gif', true) + '); border : 0px; overflow:auto');
		input.setAttribute("type", "image");
		input.setAttribute("border", "0");
		input.setAttribute("src", img('b/s1.gif', true));
		// En el evento del boton de guardado actualiza el valor de la cookie (1 aďż˝o de duracion por defecto)
		input.addEventListener("click", function(){ createCookie("notas",textarea.value); alert(T('GUARDADO')); }, 0);

//		td.appendChild(elem("P", "&nbsp;"));
// 		p1.appendChild(textarea);
// 		td.appendChild(p1);
        td.appendChild(imh);
        td.appendChild(textarea);
		p2.appendChild(input);
		td.appendChild(p2);
		tr.appendChild(td);
		tabla.appendChild(tr);
		a.appendChild(document.createElement("P"));
		a.appendChild(tabla);
	}

	/**
	 * Crea una nueva columna en las ofertas del mercado para mostrar la alianza de los
	 * vendedores
	 * vasarlasnal kitolti a klanadatokat
	 */
	function alianzaMercado(){
		var a = find("//tr[@class='rbg']", XPFirst).parentNode;

		// Prepara la insercion de la nueva columna
		var b = a.getElementsByTagName("TR");
		// FXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
		b[0].childNodes[b[0].childNodes.length == 3 ? 1 : 0].setAttribute('colspan', '8');
		b[b.length - 1].childNodes[0].setAttribute("colspan", "8");

		// Crea e inserta la columna
		var columna = document.createElement("TD");
		columna.innerHTML = T('ALIANZA');
		b[1].appendChild(columna);

		// Rellena la columna con los nombres de las alianzas
		for(var i = 2; i < b.length - 1; i++){
			var alianza = document.createElement("TD");
			// FXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
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

	/**
	 * Inserta nuevas cantidades seleccionables al enviar recursos desde el mercado
	 * Piac nyersanyag kuldese
	 */
	function recursosMercado(){
		if (find("//input[@type='text']", XPList).snapshotLength != 7) return;

		// Array con las nuevas cantidades	
		var max_capacidad = parseInt(find("//p//b", XPFirst).innerHTML);
		var cantidades = [100, 250, 500, 1000];
		var repetido = false;
		for (var i = 0; i < cantidades.length; i++) if (max_capacidad == cantidades[i]){ repetido = true; break; }
		if (!repetido) cantidades = [100, 500, 1000, max_capacidad];
		var a = find("//table[@class='f10']", XPFirst);
		var k = 0;
		// FXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
		a = a.childNodes[a.childNodes.length == 2 ? 1 : 0].childNodes;
		for (var i = 0; i < a.length; a.length == 8 ? i += 2 : i++){
			// Se eliminan las posibilidades originales
			// FXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
			a[i].removeChild(a[i].childNodes[a[i].childNodes.length > 4 ? 5 : 3]);

			// Por cada nueva cantidad y recurso se crea un enlace con el evento asociado
			for(var j = 0; j < cantidades.length; j++){
				var enlace = document.createElement('A');
				enlace.href = "javascript:void(0)";
				enlace.innerHTML = '(' + cantidades[j] + ')';
				enlace.addEventListener('click', crearEventoRecursosMercado(k, cantidades[j]), false);

				a[i].appendChild(enlace);
			}
			k++;
		}
	}

	/**
	 * Calcula el numero de aldeas que se posee en funcion de los puntos de cultura disponibles.
	 * Funcion estandard no valida para version Speed
	 *
	 * Params:
	 *	puntos: cantidad de puntos de cultura
	 *
	 * Returns:
	 * 	el numero de aldeas que se dispone con esos puntos
	 */
	function pc2aldeas(cp){ 
		if (document.domain.indexOf("speed")>-1) {
			return Math.round(Math.pow(3*cp/1600, 1 / 2.3));
		} else {
			return Math.round(Math.pow(cp/1600, 1 / 2.3));
		}
	}

	/**
	 * Calcula el numero de puntos necesarios para obtener un determinada cantidad de aldeas
	 * Funcion estandard no valida para version Speed
	 *
	 * Params:
	 *	aldeas: numero de aldeas
	 *
	 * Returns:
	 * 	cantidad de puntos de cultura necesarios
	 */
	function aldeas2pc(aldeas){ 
		if (document.domain.indexOf("speed")>-1) {
			return Math.round(16/3 * Math.pow(aldeas, 2.3)) * 100;
		} else {
			return Math.round(16 * Math.pow(aldeas, 2.3)) * 100;
		}
	}

	/**
	 * Calcula y muestra los puntos de cultura necesarios para la siguiente aldea y el tiempo para conseguirlo, o
	 * las aldeas adicionales que se pueden fundar con los puntos actuales
	 */
	function puntosCultura(){
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

		var texto = '<table class="tbg" align="center" cellspacing="1" cellpadding="2"><tr class="rbg"><td>' + T('ALDEA') + '</td><td>' + T('PC') + "</td></tr>";
		for (var i = 0; i < 3; i++){
			texto += '<tr><td>' + (aldeas_actuales + i + 1) + '</td><td>';

			// PC necesarios para conseguir la siguiente aldea
			var pc_necesarios = aldeas2pc(aldeas_actuales + i);

			// Si hay PC de sobra
			if (pc_necesarios < pc_actual) texto += T('FUNDAR');
			else{
				// Tiempo en segundos hasta conseguir los puntos de cultura necesarios
				var tiempo = ((pc_necesarios - pc_actual) / pc_prod_total) * 86400;
	
				var fecha = new Date();
				fecha.setTime(fecha.getTime() + (tiempo * 1000));
				var texto_tiempo = calcularTextoTiempo(fecha);

				texto += T('FALTA') + ' <b>' + (pc_necesarios - pc_actual) + '</b> ' + T('PC') +'<br/>';
				texto += T('LISTO') + " " + texto_tiempo;
			}
			texto += '</td></tr>';
		}
		texto += '</table>';

		a.snapshotItem(4).parentNode.innerHTML += "<p>" + texto + "</p>";
	}

	/**
	 * Oculta un elemento y le asgina un atributo de tipo filtro
	 *
	 * Params:
	 *	oferta: elemento a modificar
	 *	filtro: nombre del filtro que se le aplicara como atributo

	 */
	function asignarFiltro(oferta, filtro){
		oferta.setAttribute("style", "display:none"); 
		oferta.setAttribute("filtro" + filtro, "on");
	}

	/**
	 * Elimina un atributo de tipo filtro de un elemento y elimina su estilo si no tiene ningun filtro activo
	 *
	 * Params:
	 *	oferta: elemento a modificar
	 *	filtro: nombre del filtro a quitar
	 *	filtros: lista de filtros a comprobar para quitar el estilo
	 */
	function quitarFiltro(oferta, filtro, filtros){
		oferta.removeAttribute("filtro" + filtro);
		var remove = true;
		for (var i = 0; i < filtros.length; i++) if (oferta.getAttribute("filtro" + filtros[i]) == 'on') remove = false;
		if (remove == true) oferta.removeAttribute("style");
	}

	/**
	 * Establece filtros por tipo de recurso y proporcion de intercambio en las oferta de venta del 
	 * mercado
	 * Arany es nyersanyagtipusbeallito
	 */
	function filtrosMercado(){

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
		return function () {
			setOption("market"+tipo,recurso);
			filterMarket(tipo,recurso);
		}
	}
	
	function filterMarket(tipo, recurso){
			var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]//tr[not(@class)]", XPList,get("lmid2"));
			for (var i = 0; i < a.snapshotLength - 1; i++){
				var b = a.snapshotItem(i);		

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
							case 1: if (ofrezco_cantidad <= busco_cantidad) asignarFiltro(b, "Tipo");
								else quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
							case 2: if (ofrezco_cantidad < busco_cantidad) asignarFiltro(b, "Tipo");
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
							a.setAttribute("style", "background-color:#E5E5E5");
						}else if (i == tipo){
							a.removeAttribute("style");
						}
					}
				}
			}
	}

	function applyMarketFilters() {
		var defaults=[5,5,4,2,4];
		for (var i = 0; i < 5; i++){
			var marketi = getOption("market"+i,defaults[i],"integer");
			if (marketi!=defaults[i]) filterMarket(i,marketi);
		}
	}
	
	function createPreloadFunc(page) {
		return function() {
				ajaxRequest("build.php?id="+linkid+"&t=1&u="+(page*40)+"#h2", "GET", null,
				function(t){
				  var ans = elem("DIV", t.responseText);
				  var ansdoc = document.implementation.createDocument("", "", null);
				  ansdoc.appendChild(ans);
 				  var xpres = ansdoc.evaluate("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]/tbody/tr", ans, null, XPList, null);
				  log(2,"preload return."+xpres.snapshotLength);
				  
				  var linktrl = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]/tbody/tr", XPList,get("lmid2"));
				  var linktrlind=3;
				  var linktr = linktrl.snapshotItem(linktrlind);
				  var linktimedata = calcular_segundos(linktr.childNodes[linktr.childNodes.length >= 12 ? 10 : 6].innerHTML);
				  
				  for(var i=2;i<xpres.snapshotLength-1; i++) {
					var mrow = xpres.snapshotItem(i);
					var timedata = calcular_segundos(mrow.childNodes[mrow.childNodes.length == 12 ? 10 : 6].innerHTML);
					var alianza = document.createElement("TD");
					var playercell = mrow.childNodes[mrow.childNodes.length == 12 ? 8 : 4];
					var alianza_txt = playercell.getAttribute('title');
					if (alianza_txt != null) alianza.innerHTML = alianza_txt;
					mrow.appendChild(alianza);
					
				    var atklink = elem('a',"<img src='" + img("a/att_all.gif") + "' style='margin:3px 0px 1px 3px; display: inline' height='10' width='10' title='" + T('ATACAR') + "' alt='' border='0'>");
				    atklink.href = 'a2b.php?z=' + playercell.innerHTML.match(/karte.php\?d=(\d+)/)[0];
				    playercell.insertBefore(atklink, playercell.firstChild.nextSibling);

					log(2,"mrow "+i+" time is: "+ timedata); // timedata is in seconds
					while(linktimedata<timedata&&linktrlind<linktrl.snapshotLength-1) {
						linktrlind++
						linktr = linktrl.snapshotItem(linktrlind);
						if (linktr.innerHTML.indexOf('class="rowpic"')<0) {
				  		   linktimedata = calcular_segundos(linktr.childNodes[linktr.childNodes.length >= 12 ? 10 : 6].innerHTML);
				  		} else {
				  		   linktimedata=999999;
				  		}
					    log(2,"mrow "+i+":"+linktrlind+" comptime is: "+ linktimedata+" lgt:"+linktrl.snapshotLength); // timedata is in seconds
  				    }
					linktr.parentNode.insertBefore(mrow,linktr);
				  }
				  applyMarketFilters();
				  var marketpreload = getOption("marketpreload",5,"integer");
				  if (page<marketpreload) {
				     setTimeout(createPreloadFunc(page+1),getRandTimeRange(600));
				  }
				}
			, dummy);
		}
	}
	

		var table = document.createElement("TABLE");
		table.setAttribute("class", "tbg");
		table.setAttribute("style", "width:100%");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");

		// Se crea la tabla con 3 filas, Ofrezco, Busco y Tipo
		var etiquetas = [T('OFREZCO'), T('BUSCO')];
		for (var j = 0; j < 2; j++){
			var marketj = getOption("market"+j,5,"integer");
			var tr = document.createElement("TR");
			tr.appendChild(elem("TD", etiquetas[j]));
			// Para Ofrezco y Busco se muestran 4 materiales y un quinto comodin
			for (var i = 0; i < 4; i++){
				var td = document.createElement("TD");
				td.setAttribute("id", "filtro" + j + i);
				var ref = elem("A", "<img src='" + img('r/' + (i+1) + '.gif') + "' width='18' height='12' border='0' title='" + T('RECURSO' + (i+1)) + "'>");
				if (i+1 == marketj) td.setAttribute("style", "background-color:#E5E5E5");
				td.addEventListener("click", funcionFiltrosMercado(j, i+1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			}
			var td = document.createElement("TD");
			if (marketj==5) td.setAttribute("style", "background-color:#E5E5E5");
			td.setAttribute("id", "filtro" + j + "4");
			var ref = elem("A", T('CUALQUIERA'));
			ref.setAttribute("href", "javascript:void(0)");
			td.addEventListener("click", funcionFiltrosMercado(j, 5), 0);
			td.appendChild(ref);
			tr.appendChild(td);
			table.appendChild(tr);
		}

		// Tipo de transaccion segun la relacion entre oferta y demanda
		var market2 = getOption("market2",4,"integer");
		var tr = document.createElement("TR");
		tr.appendChild(elem("TD", T('TIPO')));
		table.appendChild(tr);
		var etiquetas_tipo = ["1:>1", "1:1", "1:<1", "1:x"];
		for (var i = 0; i < 4; i++){
			var td = document.createElement("TD");
			td.setAttribute("id", "filtro" + 2 + i);
			if (i+1 == market2) td.setAttribute("style", "background-color:#E5E5E5");
			var ref = elem("A", etiquetas_tipo[i]); 
			ref.setAttribute("href", "javascript:void(0)"); 
			td.addEventListener("click", funcionFiltrosMercado(2, (i+1)), 0);
			td.appendChild(ref); 
			tr.appendChild(td);
		}
		tr.appendChild(document.createElement("TD"));

		// Tiempo maximo de transporte
		var market4 = getOption("market4",4,"integer");
		var tr = document.createElement("TR");
		tr.appendChild(elem("TD", T('MAXTIME')));
		table.appendChild(tr);
		var etiquetas_tipo = ["1", "2", "3", ">3"];
		for (var i = 0; i < 4; i++){
			var td = document.createElement("TD");
			td.setAttribute("id", "filtro" + 4 + i);
			if (i+1 == market4) td.setAttribute("style", "background-color:#E5E5E5");
			var ref = elem("A", etiquetas_tipo[i]); 
			ref.setAttribute("href", "javascript:void(0)"); 
			td.addEventListener("click", funcionFiltrosMercado(4, (i+1)), 0);
			td.appendChild(ref); 
			tr.appendChild(td);
		}
		tr.appendChild(document.createElement("TD"));

		// Filtro por disponibilidad de recursos y mercaderes
		var market3=getOption("market3",2,"integer");
		var tr = document.createElement("TR");
		tr.appendChild(elem("TD", T('DISPONIBLE')));
		table.appendChild(tr);
		var etiquetas_carencia = [T('SI'), T('NO')];
		for (var i = 0; i < 2; i++){
			var td = document.createElement("TD");
			td.setAttribute("colspan", "2");
			td.setAttribute("id", "filtro" + 3 + i);
			if (i+1 == market3) td.setAttribute("style", "background-color:#E5E5E5");
			var ref = elem("A", etiquetas_carencia[i]);
			ref.setAttribute("href", "javascript:void(0)");
			td.addEventListener("click", funcionFiltrosMercado(3, (i+1)), 0);
			td.appendChild(ref);
			tr.appendChild(td);
		}
		tr.appendChild(document.createElement("TD"));
		applyMarketFilters();

		// Busca la tabla de ofertas y la inserta justo antes
		var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]", XPFirst,get("lmid2"));
		var p = document.createElement("P");
		p.appendChild(table);
		a.parentNode.insertBefore(p, a);
		
		// market preload
		var linkid=find('//td[@class="rowpic"]/a',XPFirst,a).href.match('id=([0-9]*)&')[1];
		log(2,"linkid:"+linkid); // http://s3.travian.hu/build.php?id=30&t=1&u=40#h2
				
		var marketpreload = getOption("marketpreload",5,"integer");
		if (0<marketpreload) {
		     setTimeout(createPreloadFunc(1),getRandTimeRange(600));
		}
		
	}

	/**
	 * Crea una funcion encargada de calcular e insertar el coste necesario segun una cantidad de una casilla
	 *
	 * Params:
	 *	id: identificador de unidad
	 *	coste: coste de una sola unidad
	 *
	 * Returns:
	 *	la funcion de procesamiento
	 */
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
                        
			var div = document.createElement("DIV");
                        div.setAttribute("name", "exp" + (i+1));
                        var tr = document.createElement("TR");
                        var td = document.createElement("TD");
                        td.setAttribute("colspan", "2");
                        td.setAttribute("class", "dcol f7 s7");
                        td.appendChild(div);
                        tr.appendChild(td);

                        var d = b.childNodes;
                        d[d.length - 1].appendChild(tr);

                        b.parentNode.parentNode.getElementsByTagName("INPUT")[0].addEventListener("keyup", crearFuncionExplorarUnidades((i+1), c), 0);
                }
        }

        function tiempoExplorar(){
           var a = find("//div[@id='lmid2']//div/table[@class='f10']/tbody/tr/td", XPFirst,get('lmid2'));
		   //log(2,"buildinfo:"+a.childNodes.length+" ihtml:"+a.innerHTML); // should be 12
	       if (a == null || (a.childNodes.length != 12 && a.childNodes.length != 4)) return;
	
		   //log(2,"cn2:"+a.textContent);
		   var d = a.textContent.split("|").splice(0,4);
		   var e = calculateResourceTime(d);
		   if (e) a.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("span")[0].innerHTML=e;
		   return;
			
		   for (var i = 1; i < a.length; i++){
				var b = a[i];
				var c = b.getElementsByTagName("DIV"); // na ez most mar table es span
				if (c.length == 2 && c[1].className == 'c'){
					var d = b.getElementsByTagName("TD")[3].textContent.split("|").splice(0,4);
					var e = calculateResourceTime(d);
					if (e) c[1].innerHTML = e;
				}
			}
        }

        /**
         * Modifica el valor por defecto del tipo de ataque a enviar
         */
        function ataqueDefecto(){
                var accion = getOption('a2bdefault',4,'integer'); // 2 -> Defend, 3 -> Attack, 4 -> Steal

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
		var a = readCookie(cookie);
		if (a != null && a != '') a += "$$" + nuevo;
		else a = nuevo;
		createCookie(cookie, a);
	}

	/**
	 * Crea el evento de eliminar un marcador. Lo elimina y ademas refresca la lista donde estan mostrados
	 *
	 * Params:
	 * 	num:	Identificador de marcador a eliminar
	 */
	function crearEventoEliminarCookie(cookie, num, funcion){
                return function(){
			var a = readCookie(cookie);
			if (a != null){
				a = a.split("$$");
				a.splice(num, 1);
				a = a.join("$$");
				createCookie(cookie, a);
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

		var res = new Array();
		var a = readCookie(cookie);
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
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba){
			ba = document.createElement("DIV");
			ba.setAttribute("id", "lright1");
			find("//body/div[@id='lmidall']", XPFirst).appendChild(ba);
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

		// Se obtienen los marcadores y se insertan junto con un enlace para eliminarlos
		var marcadores = obtenerValorCookie("marcadores");
		for (var i = 0; i < marcadores.length; i++){
			var tr = document.createElement("TR");
			var td = elem("TD", "<span>&#8226;</span>&nbsp;<a href='" + marcadores[i][1] + "'>" + marcadores[i][0] + "</a>");
			var enlace = elem("A", " <img src='" + img('a/del.gif') + "' width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>");
			enlace.href = "javascript:void(0);";
			enlace.addEventListener("click", crearEventoEliminarCookie("marcadores", i, mostrarMarcadores), 0);
			td.appendChild(enlace);
			tr.appendChild(td);
			tabla.appendChild(tr);
		}
        blocNotas2(div,readCookie("notas"));
	}

	/**
	 * Crea enlaces directos en la lista de aldeas para enviar tropas o enviar comerciantes
	 */
        function cityLinks(){
		// Localiza la lista de aldeas
                var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
                if (!cities) return;

		cities = cities.firstChild;
		for (var i = 0; i < cities.childNodes.length; i++){
			// Utiliza el texto de las coordenadas para averiguar el ID necesario para los enlaces
			var city = cities.childNodes[i];
			city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
			var id = xy2id(RegExp.$1, RegExp.$2);
			city.appendChild(elem("TD", "<a href='a2b.php?z=" + id + "'><img src='" + img('a/def1.gif') + "' width='12' border='0' title='" + T('ENV_TROPAS') + "'></a>"));
			city.appendChild(elem("TD", "<a href='build.php?z=" + id + "&gid=17'><img src='" + img('r/4.gif') + "' height='12' border='0' title='" + T('ENVIAR') + "'></a>"));
		}
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
       if (get('configuracion')) return;
       var a = get('lmid2');
       if (!a) a = find("//form", XPFirst);
       var tabla = document.createElement("TABLE");
       tabla.setAttribute("cellspacing", "1");
       tabla.setAttribute("cellpadding", "2");
       tabla.setAttribute("class", "tbg");
       tabla.setAttribute("id", "configuracion");

       var fila = document.createElement("TR");
       var td = elem("TD", "Travian Beyond");
       td.setAttribute("class", "rbg");
       td.setAttribute("colspan", "3");
       fila.appendChild(td);
       tabla.appendChild(fila);

       // Parametros reconocidos
       var parametros = ["storeurl","storepassword","options", "marcadores" , "ventas"];
       var inparr = new Array(parametros.length);
       for (var i = 0; i < parametros.length; i++){
          fila = document.createElement("TR");
          fila.appendChild(elem("TD", T(parametros[i].toUpperCase())));
          var valor = readCookie(parametros[i]);

          var inptd = document.createElement("TD");
          inptd.setAttribute('style','width:360px');
          inparr[i] = document.createElement("INPUT");
          inparr[i].setAttribute('type','text');
          inparr[i].setAttribute('name',parametros[i]);
          inparr[i].setAttribute('value',(valor != null ? valor : ''));
          inparr[i].setAttribute('class','fm');
          inparr[i].setAttribute('style','width:360px');
          inparr[i].setAttribute("id", 'is_'+parametros[i]);
          inptd.appendChild(inparr[i]);
          fila.appendChild(inptd);
//          fila.appendChild(elem("TD", "<input type='text' name='" + parametros[i] + "' value='" + (valor != null ? valor : '') + "' class='fm' style='width:275px;'/>"));
          var impo = inparr[i];
          var tdimg = document.createElement("IMG");
          tdimg.setAttribute("src", img('a/b2.gif', false));
          tdimg.setAttribute("id", 's_'+parametros[i]);
          tdimg.addEventListener("click", function() {var inpo=get('i'+this.id);  createCookie(inpo.name,inpo.value,function (r) { if (r == "ok" ) {alert(T(inpo.name.toUpperCase())+' '+T('GUARDADO'));} else {alert(T(inpo.name.toUpperCase())+' '+T('GUARDADO')+' failed.');}});},0);

          var imgtd = document.createElement("TD");
          imgtd.appendChild(tdimg);
          fila.appendChild(imgtd);
          
          tabla.appendChild(fila);
       }

       var imagen = document.createElement("IMG");
       imagen.setAttribute("src", img('b/s1.gif', true));
       imagen.addEventListener("click", function(){
             var parametros = get('configuracion').getElementsByTagName("INPUT");
             for (var i = 0; i < parametros.length; i++) {
                createCookie(parametros[i].name, parametros[i].value);
             }
             createCookie('notas', get('notas').value);
             alert(T('GUARDADO'));
             }, 0);
       
 
       var bfila = document.createElement("TR");
       var btd = document.createElement("TD");
       btd.setAttribute("class", "rbg");
       btd.setAttribute("align", "center");
       btd.setAttribute("colspan", "3");
       bfila.appendChild(btd);
       btd.appendChild(imagen);
       tabla.appendChild(bfila);

       insertAfter(a, tabla);
     
/*       var p = document.createElement("P");
       p.setAttribute("align", "center");
       p.appendChild(imagen);
       insertAfter(tabla, p);
       */
    }

	/**
	 * Calcula y muestra el tiempo que ha tardado desde el inicio de ejecucion del script
	 */
	function calcularTiempoEjecucion(){
		tiempo_ejecucion[tiempo_ejecucion.length]=new Date().getTime();
        var timeval=""+(tiempo_ejecucion[tiempo_ejecucion.length-1]-tiempo_ejecucion[0]);
        for (var i = 1; i < tiempo_ejecucion.length; i++){
            timeval+=","+(tiempo_ejecucion[i]-tiempo_ejecucion[i-1])
        }
        var tbtime = elem("span", " TB: " +timeval + " ms");
        tbtime.setAttribute("class","b");
		tbtime.setAttribute("style", "z-index: 2; color: #FFFFFF;");
		var div = find("//div[@id='ltime']/br", XPFirst);
        div.parentNode.style.width="400px";
        div.parentNode.insertBefore(tbtime, div);
        var ltdiv = get('ltime');
        ltdiv.appendChild(document.createElement('BR'));
        var setupLink = elem('A','TBSetup');
        setupLink.setAttribute("href", '#');
        setupLink.setAttribute("id", 'tbsetup');
        setupLink.addEventListener("click", mostrarConfiguracion,0);
        ltdiv.appendChild(setupLink);

	}


	function installMapEventHandler() {
		var origpe = unsafeWindow.ve;
 		unsafeWindow.ve = function(pd,qd) {
		   var rv = origpe(pd,qd);
		   setTimeout(infoRecursos,10);
		   return rv;
		};
		
		for(var i=1;i<50;i++){
			var k1=(i-1)%7;
			var k2=Math.floor((49-i)/7);
			
		    var area = get("a_"+k1+"_"+k2);
  		    var mevobj = createMapInfoObj(area,i-1);
			area.addEventListener("mouseover",mevobj.mouseOverEvent,false);
			area.addEventListener("mouseout", mevobj.mouseOutEvent,false);
		}
	}
		function createMapInfoObj(area,pos){
			var mev = new Object();
			mev.area=area;
			mev.pict=get("i_"+area.id.substring(2));
			mev.pos=pos;
			mev.timeout=0;
			mev.mouseOverEvent = function(){
				 		    if (mev.pict.src.match(/\/(d|t)\d*.gif$/)) {
							mev.timeout = setTimeout(function(){ 
											ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) procesarCasilla(t,mev)}, dummy); }
											, 300); 
									}};
			mev.mouseOutEvent = function(){ clearTimeout(mev.timeout); mev.timeout = 0; get("tb_tooltip").style.display = 'none'; };
			mev.scan = function(){ ajaxRequest(mev.area.href, "GET", null, function(t) {parseFieldType(t,mev)}, dummy); };
			return mev;
		}
		
	
	function parseFieldType(t,mev){
		log(1,"fieldtypeparseresp: "+mev.pos);
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = document.createElement('DIV');
		ans.innerHTML = t.responseText;
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		// Parece haber dos versiones del juego, asi que se contemplan las dos
		if (ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue)
			ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue.id.search(/f(\d)/);
		else
			ansdoc.evaluate("//img[@id='resfeld']", ans, null, XPFirst, null).singleNodeValue.src.search(/\/f(\d)\.jpg$/);

		var fieldtype = RegExp.$1;
		//save to storage
		var pos = mev.area.href.match(/d=(\d+)/).pop();

		if (fieldtype>6) {
			log(1,"invalid fieldtype at pos:"+pos+" ft:"+fieldtype);
			return;
		}
		showCellInfo(mev.pos+1,fieldtype);
		
		if (storeurl!='') gmAjaxRequest(storeurl,"POST","cmd=mapset&namespace="+server+"&pos="+pos+"&value="+fieldtype,dummy);
		return fieldtype;		
	}

	function showCellInfo(pos,type) {
    	var itext=['','(9)','<img src='+img('r/3.gif',false)+'>','(6)','<img src='+img('r/2.gif',false)+'>','<img src='+img('r/1.gif',false)+'>','(15)'];
		log(3,"cellinfo pos:"+pos+" type:'"+type+"'");
		var celldiv = get('map_info_'+pos);
		celldiv.innerHTML=itext[type];
		var showInfo = getOption("showmapinfo",true,"boolean");
		celldiv.style.display=showInfo?'':'none';
	}

	/**
	 * Procesa una respuesta XmlHttpRequest de la pagina de una casilla para mostrar un tooltip con 
	 * informacion sobre sus recursos
	 * Terkepkocka valasz parser.
	 */
	function procesarCasilla(t,mev){
		var fieldtype=parseFieldType(t,mev);
		showFieldTypeInTooltip(fieldtype);
	}

	
	function showFieldTypeInTooltip(fieldtype) {
		// Solo hay 6 tipos de casillas
		var dist = [
			[3, 3, 3, 9],
			[3, 4, 5, 6],
			[4, 4, 4, 6],
			[4, 5, 3, 6],
			[5, 3, 4, 6],
			[1, 1, 1, 15]
		];
		var info = dist[fieldtype-1];
		var div = get("tb_tooltip");
		div.style.display = 'block';
		div.innerHTML = '';
		for (var i = 1; i < 5; i++) div.innerHTML += '<img src="' + img('r/' + i + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + i) + '">' + info[i-1] + ' ';
	}

	/**
	 * Agrega un evento para mostrar la informacion de recursos sobre las casillas del mapa
	 * Map resourceinfo generator
	 */
	function infoRecursos(){

	/**
	 * Actualiza la posicion del tooltip. Solo puede haber un tooltip a la vez porque solo hay un puntero de cursos
	 */
	function updateTooltip(e){
		var div = get("tb_tooltip");
		div.style.left = (e.pageX + 5) + "px";
		div.style.top = (e.pageY + 5) + "px";
	}
	
	function processMapGetResponse(r) {
		log(1,"server response is:'"+r+"'");
		var cellinfos = r.split(",");
		for (var i=0;i<49;i++) {
			if (cellinfos[i]>0&&cellinfos[i]<10) showCellInfo(i+1,cellinfos[i]);
		}
	}

	/**
	 * Crea el objeto usado para meter la informacion del tooltip
	 */
	function crearTooltip(){
		var div = document.createElement("DIV");
		div.setAttribute("id", "tb_tooltip");
		div.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 100; border: solid 1px #00C000; background-color: #FEFFE3; display: none;");
		document.body.appendChild(div);

		// Solo puede haber un tooltip simultaneamente
		document.addEventListener("mousemove", updateTooltip, 0);
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
	function createEventoMapa(i, href){
		var funcion = function (){
			var despl = [-801, 1, 801, -1];
			var d = parseInt(document.getElementsByName("desp")[0].value);
			if (isNaN(d) || d < 1) d = 1;
			setOption("desp", d);
			var base = parseInt(href.split("=")[1]);
            var zval = i<4?(base + (despl[i] * (d - 1))):(base + (despl[i%4] * 6));
//            log(1,"base: "+base+" i:"+i+" d:"+d+" despli:"+despl[i]+" zval:"+zval);
			ajaxRequest("ajax.php?action=map_content&z=" + zval, "GET", null,
				function(t){
					get("map_content").innerHTML = t.responseText;
					infoRecursos();
					removeElement(get("tabla_mapa"));
					genMapTable();
				}
			, dummy);
		};
		return funcion;
	}
	
	function mapScan() {
		var mapcontent=get('map_content');
		var j=0;
		for(var i=1;i<50;i++){
			if (get('map_info_'+i).innerHTML=='') {
				var k1=(i-1)%7;
				var k2=Math.floor((49-i)/7);
			    if (get("i_"+k1+"_"+k2).src.match(/\/(d|t)\d*.gif$/)) {
//			    log(1,'map cell should be scanned: '+i+" a_"+k1+"_"+k2);
				    var area = get("a_"+k1+"_"+k2);
		  		    var mevobj = createMapInfoObj(area,i-1);
				    setTimeout(mevobj.scan,j*600+getRandTimeRange(600));
			    j++;
			    }
			}
		}
	}

	function changeHide() {
		var showInfo = getOption("showmapinfo",true,"boolean");
		showInfo=!showInfo;
        var changeHidea = get("changehide");
        changeHidea.innerHTML=(showInfo?T('HIDEINFO'):T('SHOWINFO'));
		for(var i=1;i<50;i++){
			get('map_info_'+i).style.display=showInfo?'':'none';
		}

        setOption("showmapinfo",showInfo);	     
	}

	/**
	 */
	function desplazarMapa(){
		if (get('map_opts'))
	 	    removeElement(get('map_opts'));

		// Crea y anyade la casilla del desplazamiento
		var b = find("//form[@method='post']", XPFirst).parentNode;
		var ctable = document.createElement("TABLE");
		ctable.setAttribute("id", "map_opts");
		var ctbody = document.createElement("TBODY");
		
		if (storeurl!='') {
			var showInfo = getOption("showmapinfo",true,"boolean");
			var changeHidea = elem("A",showInfo?T('HIDEINFO'):T('SHOWINFO'));
			changeHidea.setAttribute("id", "changehide");
			changeHidea.addEventListener("click", changeHide, 0);
			changeHidea.href = 'javascript:void(0)';
			var trc = document.createElement("TR");
			var tdc = document.createElement("TD");
			tdc.setAttribute("colspan", 2);
			tdc.appendChild(changeHidea);
			trc.appendChild(tdc);
			ctbody.appendChild(trc);
	
			var mapScana = elem("A",T('MAPSCAN'));
			mapScana.setAttribute("id", "mapscan");
			mapScana.addEventListener("click", mapScan, 0);
			mapScana.href = 'javascript:void(0)';
			trc = document.createElement("TR");
			tdc = document.createElement("TD");
			tdc.setAttribute("colspan", 2);
			tdc.appendChild(mapScana);
			trc.appendChild(tdc);
			ctbody.appendChild(trc);
        }
		ctable.appendChild(ctbody);
		b.appendChild(ctable);
		
		document.addEventListener("mousemove", updateTooltip, 0);
		
		// Inserta los eventos para manipular los desplazamientos
//		var a = find("//map/area[@onclick]", XPList);
//		for (var i = 0; i < a.snapshotLength; i++){
//			var b = a.snapshotItem(i);
//			b.setAttribute("onclick", '');
//			b.addEventListener("click", createEventoMapa(i, b.href), 0);
//			b.href = 'javascript:void(0)';
//		}
	}

	/**
	 * Realiza un resumen de la pagina del mapa
	 */
	function genMapTable(){
		if (get('tabla_mapa'))
	 	    removeElement(get('tabla_mapa'));
		var table = document.createElement('TABLE');
		table.setAttribute("id", "tabla_mapa");
		table.setAttribute("sortCol", -1);
		table.setAttribute("class", "tbg");
		table.setAttribute("align", "left");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");
		var thead = document.createElement("THEAD"); 
		var tbody = document.createElement("TBODY"); 
		var fila = document.createElement('TR');
		fila.setAttribute('class', "rbg");
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
		var datos = 0;
		var area;
		for(var i = 0; i < 7; i++) 
			for(var j = 0; j < 7; j++) {
				area = document.getElementById('a_'+i+'_'+j).wrappedJSObject;//.getAttribute('details');//lmc.ad[i][j];
				var cellinfo=area.details;
//				log(1,'cellinfo i:'+i+' j:'+j+' x: '+cellinfo.x+' y: '+cellinfo.y);
				if (cellinfo && cellinfo.name !=null ) { 
					datos=1;
					var inforow = document.createElement('TR');
					inforow.appendChild(elem('TD', cellinfo.name));
					inforow.appendChild(elem('TD', cellinfo.ally));
					inforow.appendChild(elem('TD', cellinfo.dname));
					inforow.appendChild(elem('TD', cellinfo.ew));
					var href=area.href;
					inforow.appendChild(elem('TD', '<a href="' + href + '">' + cellinfo.x + ", " + cellinfo.y + '</a>'));
					inforow.appendChild(elem('TD', '<a href="' + href.replace("karte.php?d", "a2b.php?z") + '">' + T('ATACAR') + '</a> / <a href="' + href.replace("karte.php?d", "build.php?z") + '&gid=17">' + T('COMERCIAR') + '</a>'));
					tbody.appendChild(inforow);
				}
			}		

		table.appendChild(tbody);
		if (datos == 1)  {
			var middleblock = get('lmidall');
			//middleblock.appendChild(document.createElement('BR'));
			middleblock.appendChild(table);
        }
	}
	function genMapInfoBlock() {
		var mapinfo = get("map_info");
		if (mapinfo) { removeElement(mapinfo); }
		var firstpos=get("a_0_6").href.match(/d=(\d+)/).pop();
		log(1,"mapfirstpos:"+firstpos);
		mapinfo = document.createElement("div");
		mapinfo.setAttribute("id","map_info");
		for(var i=1;i<50;i++){
			var divs=elem('div','<div id="map_info_'+i+'" t="0" style="position:relative;left:31px;top:48px;z-index: 90;border: solid 1px #00C000; background-color: #FEFFE3;-moz-border-radius: 8px; display: none"></div>')
			divs.className='mt'+i;
			divs.setAttribute("style","z-index: 2;");
			mapinfo.appendChild(divs);
		}
		get("a_0_6").parentNode.appendChild(mapinfo);
		if (storeurl!='') gmAjaxRequest(storeurl,"POST","cmd=mapget&namespace="+server+"&pos="+firstpos,processMapGetResponse);
	}

		genMapTable();
		desplazarMapa();
		crearTooltip();
		var mapcontent=get('map_content');
		var casillas = find("//div[@class='mdiv' and @style='z-index: 2;']/img", XPList,mapcontent); // areatypeimage
		var areas = find("//map//area[@shape='poly' and (@coords)]", XPList,mapcontent);
		if (areas.snapshotLength>0) {
			genMapInfoBlock();			
			
		    var oasisdata='';
			for (var i = 0; i < casillas.snapshotLength; i++){
				var area = areas.snapshotItem(i);
				if (casillas.snapshotItem(i).src.match(/\/o(\d+)\.gif/)){
				    var otype = casillas.snapshotItem(i).src.match(/\/o(\d+)\.gif/).pop(); 
				    if (otype && storeurl!='') {
				        var pos = area.href.match(/d=(\d+)/).pop();
					    oasisdata+="&pos="+pos+"&value="+(Number(otype)+10);
					    log(2,"src["+i+"] pos:"+pos+" type:"+otype);
				    }
				}
			}
		    if (storeurl!=''&&oasisdata!='') gmAjaxRequest(storeurl,"POST","cmd=mapset&namespace="+server+oasisdata,dummy);
			
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

    	/**
	 * Funcion que realiza una peticion XML asincrona
	 *
	 * Params:
	 *	url: Direccion a la que realizar la peticion
	 *	method: Metodo de la peticion. Puede ser GET o POST
	 *	param: Parametros codificados como URI (solo con POST, null si no se usan)
	 *	onSuccess: Funcion a invocar cuando se reciba el resultado
	 */
	function gmAjaxRequest(url, method, param, onSuccess){
        GM_xmlhttpRequest({ method: method,url: url, headers:{'Content-type':'application/x-www-form-urlencoded'},
        data: param, onload: function(responseDetails) { onSuccess(responseDetails.responseText); }});
	}

   	function saveData(key,value,callback){
       value=encodeURIComponent(value);
       gmAjaxRequest(storeurl,"POST","cmd=set&namespace="+server+"_"+uid+(storepassword!=''?'&pass='+encodeURIComponent(storepassword):'')+"&key="+encodeURIComponent(key)+"&value="+value,callback);
	}

   	function saveStorePassword(key,oldpass,newpass,callback){
       oldpass=encodeURIComponent(oldpass);
       newpass=encodeURIComponent(newpass);
       gmAjaxRequest(storeurl,"POST","cmd=setpass&namespace="+server+"_"+uid+'&oldpass='+oldpass+"&newpass="+newpass,callback);
	}
/*
    function loadData(key,callback){
        gmAjaxRequest(storeurl,"POST","cmd=get&namespace="+server+"_"+uid+"&key="+encodeURIComponent(key),callback);
	}
*/

	function mostrarVentas(){
		if (!find("//input[@type='hidden' and @name='t' and @value='2']", XPFirst)) return;
		find("//form", XPFirst).setAttribute("name", "sell");

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
			tr.setAttribute("class", "rbg");	
			var columnas = [T('OFREZCO'), T('BUSCO'), T('MAXTIME'), T('ALIANZA'), T('VENDER'), T('ELIMINAR')];
			for (var i = 0; i < columnas.length; i++) tr.appendChild(elem("TD", columnas[i]));
			tabla.appendChild(tr);

			for (var i = 0; i < ventas.length; i++){
				var tr = document.createElement("TR");

				var td = elem("TD", '<img src="' + img('r/' + (ventas[i][2]) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][2])) + '"> ' + ventas[i][0]); tr.appendChild(td);
				td = elem("TD", '<img src="' + img('r/' + (ventas[i][3]) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][3])) + '"> ' + ventas[i][1]); tr.appendChild(td);
				td = elem("TD", ventas[i][5] == '1' ? ventas[i][4] : T('NO')); tr.appendChild(td);
				td = elem("TD", ventas[i][6] == '1' ? T('SI') : T('NO')); tr.appendChild(td);

				td = elem("TD", '<a href="javascript:void(0);" onClick="sell.m1.value=' + ventas[i][0] + ';sell.m2.value=' + ventas[i][1] + ';sell.rid1.value=' + ventas[i][2] + ';sell.rid2.value=' + ventas[i][3] + ';sell.d2.value=' + ventas[i][4] + ';sell.d1.checked=' + (ventas[i][5] == '1') + (ventas[i][6] ? ';sell.ally.checked=' + (ventas[i][6] == '1') : '') + ';sell.submit();"><img src="' + img('b/ok1.gif', true) + '" title="' + T('VENDER') + '" alt="' + T('VENDER') + '" border="0"></a>'); tr.appendChild(td);
				tabla.appendChild(tr);

				var enlace = elem("A", " <img src='" + img('a/del.gif') + "' width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoEliminarCookie("ventas", i, mostrarVentas), 0);
				var td = document.createElement("TD");
				td.appendChild(enlace);
				tr.appendChild(td);;
			}
			insertAfter(a, tabla);
		}
	}

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
			var txt_cant=cant;
			if (cant % 1000 == 0) txt_cant = (cant / 1000) + "k"; 
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
				// FXME: Apanyo para FF. Firefox mete nodos vacios
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
		
		// FXME: Firefox rendering bug
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
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba) return;

		var aldeas = ba.getElementsByTagName("A");
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
		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++){
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
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

	/**
	 * Modifica el estilo del mensaje de borrado de cuenta para adaptarlo a los cambios que realiza el script
	 */
	function borrarCuenta(){
		var a = find("//p[parent::div[@id='lleft'] and @style]", XPFirst);
		if (a){
			moveElement(a, document.body);
			a.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 2; border: solid 1px #00C000; background-color: #FEFFE3; width:130px; text-align:center; right:0px; top:0px;");
		}
	}

	/**
	 * Agrega una nueva opcion en cualquier menu superior de opciones
	 *
	 * Params:
	 *	texto: texto para colocar al final de menu
	 */
	function opcionMenuSuperior(texto){
		var a = find("//p[@class='txt_menue']", XPFirst);
                if (a) a.innerHTML += texto;
	}

	function opcionOcultaMensajes(){ if (!plus) opcionMenuSuperior(' | <a href="nachrichten.php?t=3">' + T('ARCHIVE') + '</a>'); }
	function opcionOcultaInformes(){ if (!plus) opcionMenuSuperior(' | <a href="berichte.php?t=5">' + T('ARCHIVE') + '</a>'); }


	/**
	 *  time and resource counters
	 */
	function setTimers(){

	function crearTemporizadorRecurso(i){
		var recursos = find("//*[@id='timeout" + i + "']", XPList);
		return function(){
			/*
			 * decrease the required amount of the i type resource
			 */
			actual[i]++;
			for (var j = 0; j < recursos.snapshotLength; j++){
				var cantidad = recursos.snapshotItem(j).innerHTML - 1; // calculate needed recource quantity
				if (cantidad >= 0) {
//                   log(1,"resource "+i+" changed: "+recursos.snapshotItem(j).innerHTML);
                   recursos.snapshotItem(j).innerHTML = cantidad;
                } else {
//                   log(1,"resource "+i+" document reload because: "+recursos.snapshotItem(j).innerHTML);
				   var tbodyNode = recursos.snapshotItem(j).parentNode.parentNode;
				   if (tbodyNode.childNodes.length<=2) {
				   	   var resourceCellNode = tbodyNode.parentNode.parentNode;
                       removeElement(tbodyNode.parentNode);
                       resourceCellNode.setAttribute('valign', 'center');
                       resourceCellNode.innerHTML = T('SUBIR_NIVEL');
				   } else {
                       removeElement(recursos.snapshotItem(j).parentNode);
				   }
                }
			}
		};
	}

	function createTimerHandler(){
		var relojes = find("//*[@id='timeout' or @id='timeouta']", XPList);
		return function () {
			/*
			 * decrease resource timers
			 */
			for (var i = 0; i < relojes.snapshotLength; i++){
				var tiempo = calcular_segundos(relojes.snapshotItem(i).innerHTML) - 1; // calculate in seconds
				if (tiempo >= 0) { // not reached
                    relojes.snapshotItem(i).innerHTML = formatear_tiempo(tiempo);
                } else if (relojes.snapshotItem(i).id == 'timeout') {
				   var tbodyNode = recursos.snapshotItem(j).parentNode.parentNode;
				   if (tbodyNode.childNodes.length<=2) {
				   	   var resourceCellNode = tbodyNode.parentNode.parentNode;
                       removeElement(tbodyNode.parentNode);
                       resourceCellNode.setAttribute('valign', 'center');
                       resourceCellNode.innerHTML = T('SUBIR_NIVEL');
				   } else {
                       removeElement(recursos.snapshotItem(j).parentNode);
				   }
                }
			}
		};
	}

		// Calcula cada cuantos segundos debe actualizar cada contador de recursos restantes para
		// aprovechar el temporizador del resto de relojes
		var frecuencia = new Array(4);
		for (var i = 0; i < 4; i++){
			frecuencia[i] = (1000.0 / Math.abs(produccion[i]));
			if (!isFinite(frecuencia[i]) || frecuencia[i] < 0||total[i] - actual[i] == 0) {
                frecuencia[i] = Number.POSITIVE_INFINITY;
            } else {
			 setInterval(crearTemporizadorRecurso(i), Math.floor(frecuencia[i]));
            }
		}
		setInterval(createTimerHandler(),1000);
	}

	function loadRemoteStore(callback) {
        var lastload=GM_getValue(server+"_"+uid+"_lastload");
        if (storeurl!='' && (!lastload||new Date().getTime()-lastload>600000)) { // 10 minutes between reloads
           var parametros = ["options", "marcadores", "notas" , "ventas"];
           var keystr="";
           for (var i = 0; i < parametros.length; i++){
              keystr=keystr+"&key="+encodeURIComponent(parametros[i]);
           }
           gmAjaxRequest(storeurl,"POST","cmd=multiget&namespace="+server+"_"+uid+(storepassword!=''?'&pass='+encodeURIComponent(storepassword):'')+keystr,
              function (r) {
                var ra=r.split("&");
                for (var i = 0; i < parametros.length; i++){
                   GM_setValue(server+"_"+uid+"_"+parametros[i], ra[i]);
                }
                GM_setValue(server+"_"+uid+"_lastload",""+new Date().getTime());
                callback();
              });
        } else {
           callback();
        }

    }

//	if (location.href.match(/karte2.php($|\?z=)/)){		desplazarMapa(); return; }

	/* Acciones generales a todas las paginas */
	getGeneralData();
	sanearEnlaces();
	hideAd();

    tiempo_ejecucion[tiempo_ejecucion.length]=new Date().getTime();
    loadRemoteStore(function() {
		tiempo_ejecucion[tiempo_ejecucion.length]=new Date().getTime();
    	quickLinks();
    	buildingLinks();
    	playerLinks();
    	calculateFillTime();
    	cityLinks();
    	borrarCuenta();
    	confirmDelete();
        mostrarMarcadores();

    	/* Acciones especificas para algunas paginas */
    	if (location.href.indexOf('build.php?') != -1){		quickCity(); recursosMercado(); }
    	if (location.href.indexOf('build.php') != -1){
     		calculateBuildTime(); tiempoExplorarUnidades(); tiempoExplorar(); mostrarVentas();
    	}
    	if (location.href.indexOf('dorf1') != -1)		preCalculate1();
    	if (location.href.indexOf('dorf2') !=
 -1)		preCalculate2();
    	if (location.href.indexOf('berichte.php?id=') != -1)	reportBatalla();
    	if (location.href.indexOf('a2b.php') != -1){		quickCity(); ataqueDefecto(); }
    	if (location.href.indexOf('nachrichten.php') != -1)	opcionOcultaMensajes();
    	if (location.href.indexOf('berichte.php') != -1)	opcionOcultaInformes();
    	if (location.href.match(/dorf3.php($|\?newdid=(\d+)$)/)) resumenAldeas();
    	if (location.href.match(/build.php\?(.*)&s=2/))		puntosCultura();
    	if (location.href.match(/build.php\?(.*)&t=1/)){	alianzaMercado(); filtrosMercado(); }
    	if (location.href.match(/karte.php($|\?z=|\?new)/)){ infoRecursos(); installMapEventHandler(); }
    	if (location.href.match(/nachrichten.php($|\?t=|\?s=)/) || location.href.match(/berichte.php($|\?t=|\?s=)/)) opcionesMensajes();
        if (location.href.match(/spieler.php\?s=2/))            mostrarConfiguracion();

    	/* Mas acciones generales */
    	if (getOption("starttimers",true,"boolean")) {
    		setTimers();
    	}
    	calcularTiempoEjecucion();
     });
};

/*window.addEventListener('DOMContentLoaded', funcionPrincipal, false);
if (document.body) funcionPrincipal();
*/
window.addEventListener( 'load', funcionPrincipal, false);

// ==UserScript==
// @name Travian3 Beyond - Japanized
// @author Victor Garcia (aka Croc), Szabka, ms99
// @namespace   t3
// @version 2.7.1J
// @description  Travian v3 addons originally by Victor Garcia (aka Croc); - updated by Szabka pl51-7.June 2008; - updated by ms99-23.June.2008, - updated by Jackie Jack Japanized Ver,2.7.1J
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
// @exclude *.css
// @exclude *.js
// ==/UserScript==

/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/ 
 */

// Funcion principal ejecutada cuando se ha cargado toda la pagina
function funcionPrincipal(e){
	// Momento de inicio de ejecucion del script
	var tiempo_ejecucion = new Array(1);
	tiempo_ejecucion[0] = new Date().getTime();

	var version = "2.6c MunLightDoll";

	var boolShowExtendedIcons = 0;
	var boolShowNoteBlock = 0;
	
	var lang_es = new Array();
	
	var lang_ar = lang_es;
	var lang_cl = lang_es;
	var lang_mx = lang_es;
	
	lang_es['ALIANZA'] 		= 'Alianza';
	lang_es['PERFIL'] 		= 'Perfil';
	lang_es['SIM'] 			= 'Simulador';
	lang_es['CALC'] 		= 'Calculadora';
	lang_es['SEGURO'] 		= 'Estas seguro?'; //prompt message doesn't allow HTML Entities
	lang_es['MARK'] 		= 'Marcar Todos';
	lang_es['PERDIDAS'] 	= 'P&eacute;rdidas en materiales';
	lang_es['RENT'] 		= 'Rentabilidad';
	lang_es['SUBIR_NIVEL'] 	= 'Ya puedes subirlo de nivel';
	lang_es['JUGADOR'] 		= 'Jugador';
	lang_es['ALDEA'] 		= 'Aldea';
	lang_es['HAB'] 			= 'Habitantes';
	lang_es['COORD'] 		= 'Coordenadas';
	lang_es['ACCION'] 		= 'Acciones';
	lang_es['ATACAR'] 		= 'Atacar';
	lang_es['COMERCIAR'] 	= 'Comerciar';
	lang_es['GUARDADO'] 	= 'Guardado'; //prompt message doesn't allow HTML Entities
	lang_es['DESP_ABR'] 	= 'Desp.';
	lang_es['FALTA'] 		= 'Falta';
	lang_es['HOY'] 			= 'hoy';
	lang_es['MANYANA'] 		= 'ma&ntilde;ana';
	lang_es['PAS_MANYANA'] 	= 'pasado ma&ntilde;ana';
	lang_es['MERCADO']		= 'Mercado';
	lang_es['CUARTEL']		= 'Cuartel';
	lang_es['PUNTO']		= 'Punto de encuentro';
	lang_es['CORRAL']		= 'Establo';
	lang_es['TALLER']		= 'Taller';
	lang_es['ENVIAR']		= 'Enviar';
	lang_es['COMPRAR']		= 'Comprar';
	lang_es['VENDER']		= 'Vender';
	lang_es['ENVIAR_IGM']	= 'Enviar IGM';
	lang_es['LISTO']		= 'Todo listo';
	lang_es['EL']			= 'el';
	lang_es['A_LAS']		= 'a las';
	lang_es['EFICIENCIA']	= 'Eficiencia';
	lang_es['NUNCA']		= 'Nunca';
	lang_es['PC']			= 'Punto(s) de cultura';
	lang_es['FUNDAR']		= 'Ya puedes fundarla o conquistarla';
	lang_es['ALDEAS']		= 'aldea(s)';
	lang_es['ENV_TROPAS']	= 'Enviar Tropas';
	lang_es['RECURSO1']		= 'Le&ntilde;a';
	lang_es['RECURSO2']		= 'Barro';
	lang_es['RECURSO3']		= 'Hierro';
	lang_es['RECURSO4']		= 'Cereales';
	lang_es['TIEMPO']		= 'Tiempo';
	lang_es['COMP']			= 'Compactador';
	lang_es['STAT']			= 'Estad&iacute;stica';
	lang_es['OFREZCO']		= 'Ofrezco';
	lang_es['BUSCO']		= 'Busco';
	lang_es['TIPO']			= 'Tipo';
	lang_es['CUALQUIERA']	= 'Cualquiera';
	lang_es['DETALLES']		= 'Detalles';
	lang_es['MAP_EXT']		= 'Mapa extendido';
	lang_es['DISPONIBLE']	= 'S&oacute;lo disponibles';
	lang_es['SI']			= 'S&iacute;';
	lang_es['NO']			= 'No';
	lang_es['LOGIN']		= 'Login';
	lang_es['MARCADORES']	= 'Marcadores';
	lang_es['ANYADIR']		= 'A&ntilde;adir';
	lang_es['ENLACE']		= 'Direccion del nuevo marcador'; //prompt message doesn't allow HTML Entities
	lang_es['TEXTO']		= 'Texto para el nuevo marcador'; //prompt message doesn't allow HTML Entities
	lang_es['ELIMINAR']		= 'Eliminar';
	lang_es['MAPA']			= 'Mapa';
	lang_es['VERSION']		= 'La &uacute;ltima versi&oacute;n disponible es';
	lang_es['MAXTIME']		= 'Tiempo m&aacute;ximo';
	lang_es['MAT_PRIMAS']	= 'Materias';
	lang_es['ATAQUES']		= 'Ataques';
	lang_es['CONSTR']		= 'Constr.';
	lang_es['TROPAS']		= 'Tropas';
	lang_es['CHECK']		= 'Actualizar';
	lang_es['ACTUALIZAR']	= 'Actualizar';
	lang_es['ARCHIVE']		= 'Archivo';
	lang_es['RESUMEN']		= 'Resumen';
	lang_es['BIGICONS']		= 'Show extended icons';
	lang_es['NOTEBLOCK']	= 'Show note block';

	// Por IcEye y Andres_age
	var lang_en = new Array();
	var lang_uk = lang_en;
	var lang_us = lang_en;
	
	lang_en['ALIANZA'] 		= 'Alliance';
	lang_en['PERFIL'] 		= 'User Profile';
	lang_en['SIM'] 			= 'Combat simulator';
	lang_en['CALC'] 		= 'Travian Calc';
	lang_en['SEGURO'] 		= 'Are you sure?'; //prompt message doesn't allow HTML Entities
	lang_en['MARK'] 		= 'Select all';
	lang_en['PERDIDAS'] 	= 'Loss';
	lang_en['RENT'] 		= 'Profit';
	lang_en['SUBIR_NIVEL'] 	= 'Extension available';
	lang_en['JUGADOR'] 		= 'Player';
	lang_en['ALDEA'] 		= 'Village';
	lang_en['HAB'] 			= 'Population';
	lang_en['COORD'] 		= 'Coords';
	lang_en['ACCION'] 		= 'Actions';
	lang_en['ATACAR'] 		= 'Attack';
	lang_en['COMERCIAR'] 	= 'Send resources';
	lang_en['GUARDADO'] 	= 'Saved'; //prompt message doesn't allow HTML Entities
	lang_en['DESP_ABR'] 	= 'Mov.';
	lang_en['FALTA'] 		= 'You need';
	lang_en['HOY'] 			= 'today';
	lang_en['MANYANA'] 		= 'tomorrow';
	lang_en['PAS_MANYANA'] 	= 'day after tomorrow';
	lang_en['MERCADO'] 		= 'Marketplace';
	lang_en['CUARTEL'] 		= 'Barracks';
	lang_en['PUNTO'] 		= 'Rally point';
	lang_en['CORRAL'] 		= 'Stable';
	lang_en['TALLER'] 		= 'Workshop';
	lang_en['ENVIAR'] 		= 'Send resources';
	lang_en['COMPRAR'] 		= 'Buy';
	lang_en['VENDER'] 		= 'Sell';
	lang_en['ENVIAR_IGM'] 	= 'Send IGM';
	lang_en['LISTO'] 		= 'Available';
	lang_en['EL'] 			= 'on';
	lang_en['A_LAS'] 		= 'at';
	lang_en['EFICIENCIA'] 	= 'Efficiency'; 
	lang_en['NUNCA']		= 'Never';
	lang_en['PC']           = 'Culture points';
	lang_en['FUNDAR']       = 'You can found or conquer a new village';
	lang_en['ALDEAS']       = 'Village(s)';
	lang_en['ENV_TROPAS'] 	= 'Rally point';
	lang_en['RECURSO1']     = 'Wood';
	lang_en['RECURSO2']     = 'Clay';
	lang_en['RECURSO3']     = 'Iron';
	lang_en['RECURSO4']     = 'Crop';
	lang_en['TIEMPO']       = 'Time';
	lang_en['COMP']         = 'Report Compressor';
	lang_en['STAT']			= 'Statistic';
	lang_en['OFREZCO']		= 'Offering';
	lang_en['BUSCO']		= 'Searching';
	lang_en['TIPO']			= 'Type';
	lang_en['DISPONIBLE']	= 'Only available';
	lang_en['CUALQUIERA']	= 'Any';
	lang_en['SI']			= 'Yes';
	lang_en['NO']			= 'No';
    lang_en['LOGIN'] 		= 'Login';
    lang_en['MARCADORES']   = 'Bookmarks';
    lang_en['ANYADIR']      = 'Add';
    lang_en['ENLACE']       = 'New Bookmark URL'; //prompt message doesn't allow HTML Entities
    lang_en['TEXTO']        = 'New Bookmark Text'; //prompt message doesn't allow HTML Entities
	lang_en['ELIMINAR']		= 'Delete';
	lang_en['MAPA']			= 'Map';
    lang_en['VERSION']      = 'Available version';
    lang_en['MAXTIME']      = 'Maximum time';
	lang_en['ARCHIVE']		= 'Archive';
	lang_en['RESUMEN']		= 'Summary';
	lang_en['MAXTIME']		= 'Max time';
	lang_en['VERSION']		= 'Newest version';
	lang_en['DETALLES']		= 'Details';
	lang_en['MAP_EXT']		= 'Extended map';
	lang_en['MAT_PRIMAS']	= 'Resources';
	lang_en['ATAQUES']		= 'Attack';
	lang_en['CONSTR']		= 'build';
	lang_en['TROPAS']		= 'Troops';
	lang_en['CHECK']		= 'Update TBeyond';
	lang_en['ACTUALIZAR']	= 'Update TBeyond';
	lang_en['RES'] 			= 'Research tree';
    lang_en['STOREURL']     = 'Storage URL';
    lang_en['STOREPASSWORD']= 'Storage password';
    lang_en['OPTIONS']    	= 'Options';
    lang_en['VENTAS']    	= 'Saved Offers';
    lang_en['SHOWINFO']    	= 'Show Res Info';
    lang_en['HIDEINFO']    	= 'Hide Res Info';
    lang_en['MAPSCAN']    	= 'Scan the map';
	lang_en['BIGICONS']		= 'Show extended icons';
	lang_en['NOTEBLOCK']	= 'Show note block';
	
	// Por IcEye (corregido y actualizado por rosfe y Danielle) 
	var lang_it = new Array(); 
	lang_it['ALIANZA'] 		= 'Alleanza'; 
	lang_it['PERFIL'] 		= 'Profilo'; 
	lang_it['SIM'] 			= 'Combat simulator'; 
	lang_it['CALC'] 		= 'Travian Calc'; 
	lang_it['SEGURO'] 		= 'Sei sicuro?'; 
	lang_it['MARK'] 		= 'Seleziona tutto'; 
	lang_it['PERDIDAS'] 	= 'Perdita in materiale'; 
	lang_it['RENT'] 		= 'Guadagno'; 
	lang_it['SUBIR_NIVEL'] 	= 'Ampliamento disponibile'; 
	lang_it['JUGADOR'] 		= 'Proprietario'; 
	lang_it['ALDEA'] 		= 'Villaggio'; 
	lang_it['HAB'] 			= 'Popolazione'; 
	lang_it['COORD'] 		= 'Coordinate'; 
	lang_it['ACCION'] 		= 'Azioni'; 
	lang_it['ATACAR'] 		= 'Invia truppe'; 
	lang_it['COMERCIAR'] 	= 'Invia mercanti'; 
	lang_it['GUARDADO'] 	= 'Salvato';
	lang_it['DESP_ABR'] 	= 'Disp.';
	lang_it['FALTA'] 		= 'Mancano'; 
	lang_it['HOY'] 			= 'oggi'; 
	lang_it['MANYANA'] 		= 'domani'; 
	lang_it['PAS_MANYANA'] 	= 'dopodomani'; 
	lang_it['MERCADO'] 		= 'Mercato'; 
	lang_it['CUARTEL'] 		= 'Campo d&quot; addestramento'; 
	lang_it['PUNTO'] 		= 'Caserma'; 
	lang_it['CORRAL'] 		= 'Scuderia'; 
	lang_it['TALLER'] 		= 'Officina'; 
	lang_it['ENVIAR'] 		= 'Invia risorse'; 
	lang_it['COMPRAR'] 		= 'Compra risorse'; 
	lang_it['VENDER'] 		= 'Vendi risorse'; 
	lang_it['ENVIAR_IGM'] 	= 'Invia messaggio'; 
	lang_it['LISTO'] 		= 'Ampliamento disponibile'; 
	lang_it['EL'] 			= 'il'; 
	lang_it['A_LAS'] 		= 'alle'; 
	lang_it['EFICIENCIA'] 	= 'Efficienza'; 
	lang_it['NUNCA'] 		= 'Mai'; 
	lang_it['PC'] 			= 'Punti cultura'; 
	lang_it['FUNDAR'] 		= 'Che puoi trovare e conquistare'; 
	lang_it['ALDEAS'] 		= 'Villaggio(i)'; 
	lang_it['ENV_TROPAS'] 	= 'Invia Truppe'; 
	lang_it['RECURSO1'] 	= 'Legno'; 
	lang_it['RECURSO2'] 	= 'Argilla'; 
	lang_it['RECURSO3'] 	= 'Ferro'; 
	lang_it['RECURSO4'] 	= 'Grano'; 
	lang_it['TIEMPO'] 		= 'Tempo'; 
	lang_it['COMP'] 		= 'Compattatore'; 
	lang_it['STAT'] 		= 'Statistica'; 
	lang_it['OFREZCO'] 		= 'Offerta'; 
	lang_it['BUSCO'] 		= 'Richiesta'; 
	lang_it['TIPO'] 		= 'Percentuale di scambio'; 
	lang_it['CUALQUIERA'] 	= 'Tutti'; 
	lang_it['DETALLES'] 	= 'Dettagli'; 
	lang_it['MAP_EXT'] 		= 'Mappa Estesa'; 
	lang_it['DISPONIBLE'] 	= 'Disponibile'; 
	lang_it['SI'] 			= 'Si'; 
	lang_it['NO'] 			= 'No'; 
	lang_it['MARCADORES'] 	= 'Obiettivi'; 
	lang_it['ANYADIR'] 		= 'Aggiungi obbiettivo'; 
	lang_it['ENLACE'] 		= 'Direzione del nuovo obbiettivo'; 
	lang_it['TEXTO'] 		= 'Caratteristiche del nuovo obbiettivo'; 
	lang_it['ELIMINAR'] 	= 'Eliminare'; 
	lang_it['LOGIN'] 		= 'Login'; 
	lang_it['MAPA'] 		= 'Mappa'; 
	lang_it['VERSION'] 		= 'L&quot; ultima versione disponible c'; 
	lang_it['MAXTIME'] 		= 'Tempo massimo'; 
	lang_it['CHECK'] 		= 'Nuove versioni'; 
	lang_it['MAT_PRIMAS'] 	= 'Risorse'; 
	lang_it['ATAQUES'] 		= 'Attacchi'; 
	lang_it['CONSTR'] 		= 'Costruz.'; 
	lang_it['TROPAS'] 		= 'Truppe'; 
	lang_it['ACTUALIZAR'] 	= 'Nuove versioni';
	lang_it['BIGICONS']		= 'Show extended icons';
	lang_it['NOTEBLOCK']	= 'Show note block';

	// Autor anonimo a peticion expresa (ampliado por Blabla Blubb)
	var lang_de = new Array();
	lang_de['ALIANZA'] 		= 'Allianz';
	lang_de['PERFIL'] 		= 'Profil';
	lang_de['SIM'] 			= 'Kampfsimulator';
	lang_de['CALC'] 		= 'Marktplatzrechner';
	lang_de['SEGURO'] 		= 'Sind Sie sicher?';
	lang_de['MARK'] 		= 'Alle';
	lang_de['PERDIDAS'] 	= 'Rohstoff-Verluste';
	lang_de['RENT'] 		= 'Rentabilit&auml;t';
	lang_de['SUBIR_NIVEL'] 	= 'Ausbau m&ouml;glich';
	lang_de['JUGADOR'] 		= 'Spieler';
	lang_de['ALDEA'] 		= 'Dorf';
	lang_de['HAB'] 			= 'Einwohner';
	lang_de['COORD'] 		= 'Koordinaten';
	lang_de['ACCION'] 		= 'Aktion';
	lang_de['ATACAR'] 		= 'Angreifen';
	lang_de['COMERCIAR'] 	= 'H&auml;ndler schicken';
	lang_de['GUARDADO'] 	= 'Gespeichert';
	lang_de['DESP_ABR'] 	= 'Felder';
	lang_de['FALTA'] 		= 'Ben&ouml;tige';
	lang_de['HOY'] 			= 'heute';
	lang_de['MANYANA'] 		= 'morgen';
	lang_de['PAS_MANYANA'] 	= '&uuml;bermorgen';
	lang_de['MERCADO'] 		= 'Marktplatz';
	lang_de['CUARTEL'] 		= 'Kaserne';
	lang_de['PUNTO'] 		= 'Versammlungsplatz';
	lang_de['CORRAL'] 		= 'Stall';
	lang_de['TALLER'] 		= 'Werkstatt';
	lang_de['ENVIAR'] 		= 'Marktplatz';
	lang_de['COMPRAR'] 		= 'Kaufen';
	lang_de['VENDER'] 		= 'Verkaufen';
	lang_de['ENVIAR_IGM'] 	= 'IGM schreiben';
	lang_de['LISTO'] 		= 'Genug';
	lang_de['EL'] 			= '';
	lang_de['A_LAS'] 		= 'um';
	lang_de['EFICIENCIA'] 	= 'Effektivit&auml;t';
	lang_de['NUNCA'] 		= 'Nie';
	lang_de['PC'] 			= 'Kulturpunkte';
	lang_de['FUNDAR'] 		= 'Genug Kulturpunkte';
	lang_de['ALDEAS'] 		= 'weitere Siedlung(en)';
	lang_de['ENV_TROPAS'] 	= 'Sammelplatz';
	lang_de['RECURSO1'] 	= 'Lehm';
	lang_de['RECURSO2'] 	= 'Holz';
	lang_de['MAXTIME'] 		= 'Maximale Dauer';
	lang_de['RECURSO3'] 	= 'Eisen';
	lang_de['RECURSO4'] 	= 'Getreide';
	lang_de['TIEMPO'] 		= 'Zeit';
	lang_de['COMP'] 		= 'KB 2 BBCode';
	lang_de['MAPA'] 		= 'Karte';
	lang_de['STAT'] 		= 'Statistik';
	lang_de['OFREZCO'] 		= 'Biete';
	lang_de['BUSCO'] 		= 'Suche';
	lang_de['TIPO'] 		= 'Tauschverh&auml;ltnis';
	lang_de['OPTIONS']    	= 'Optionen';
	lang_de['DISPONIBLE'] 	= 'Nur annehmbare Angebote';
	lang_de['CUALQUIERA'] 	= 'Beliebig';
	lang_de['SI'] 			= 'Ja';
	lang_de['NO'] 			= 'Nein';
	lang_de['MARCADORES'] 	= 'Lesezeichen';
	lang_de['ANYADIR'] 		= 'Hinzuf&uuml;gen';
	lang_de['ENLACE'] 		= 'URL von neuem Lesezeichen';
	lang_de['TEXTO'] 		= 'Text von neuem Lesezeichen';
	lang_de['ELIMINAR'] 	= 'Entfernen';
	lang_de['CHECK'] 		= 'Update TBeyond';
	lang_de['ACTUALIZAR'] 	= 'Update TBeyond';
	lang_de['ARCHIVE'] 		= 'Archiv';
	lang_de['VENTAS']    	= 'Gespeicherte Angebote';
	lang_de['RESUMEN'] 		= 'Zusammenfassung';
	lang_de['BIGICONS']		= 'Zusatzliche Icons';
	lang_de['NOTEBLOCK']	= 'Notizblock anzeigen';

	// Por Ferran -=(Killo)=- (ampliado y corregido por Prometeus)
	var lang_fr = new Array(); 
	lang_fr['ALIANZA'] 		= 'Alliance'; 
	lang_fr['PERFIL'] 		= 'Profil'; 
	lang_fr['SIM'] 			= 'Simulateur'; 
	lang_fr['CALC'] 		= 'Calculateur'; 
	lang_fr['MARK'] 		= 'Marquer tous'; 
	lang_fr['PERDIDAS'] 	= 'Pertes en mat&eacute;riels'; 
	lang_fr['RENT'] 		= 'Rentabilit&eacute;'; 
	lang_fr['SUBIR_NIVEL'] 	= 'Tu peux d&eacute;j&agrave; augmenter son niveau'; 
	lang_fr['JUGADOR'] 		= 'Joueur'; 
	lang_fr['ALDEA'] 		= 'Village'; 
	lang_fr['HAB'] 			= 'Population'; 
	lang_fr['COORD'] 		= 'Coordonn&eacute;es'; 
	lang_fr['ACCION'] 		= 'Actions'; 
	lang_fr['ATACAR'] 		= 'Attaquer'; 
	lang_fr['COMERCIAR'] 	= 'Commercer'; 
	lang_fr['GUARDADO'] 	= 'Sauvegarde'; 
	lang_fr['DESP_ABR'] 	= 'D&eacute;placer'; 
	lang_fr['FALTA'] 		= 'Il manque'; 
	lang_fr['HOY'] 			= 'aujourd\'hui'; 
	lang_fr['MANYANA'] 		= 'demain'; 
	lang_fr['PAS_MANYANA'] 	= 'apr&egrave;s-demain'; 
	lang_fr['MERCADO'] 		= 'Place du march&eacute;'; 
	lang_fr['CUARTEL'] 		= 'Caserne'; 
	lang_fr['PUNTO'] 		= 'Place de rassemblement'; 
	lang_fr['CORRAL'] 		= 'Ecurie'; 
	lang_fr['TALLER'] 		= 'Atelier'; 
	lang_fr['ENVIAR'] 		= 'Envoyer des ressources'; 
	lang_fr['COMPRAR'] 		= 'Acheter des ressources'; 
	lang_fr['VENDER'] 		= 'Vendre des resources'; 
	lang_fr['ENVIAR_IGM'] 	= 'Envoyer MSG'; 
	lang_fr['LISTO'] 		= 'Pr&ecirc;t'; 
	lang_fr['EL'] 			= 'le'; 
	lang_fr['A_LAS'] 		= '&agrave;'; 
	lang_fr['EFICIENCIA'] 	= 'Efficacit&eacute;'; 
	lang_fr['NUNCA'] 		= 'Jamais'; 
	lang_fr['PC'] 			= 'Point(s) de culture'; 
	lang_fr['FUNDAR'] 		= 'Tu peux d&eacute;j&agrave; coloniser ou conqu&eacute;rir'; 
	lang_fr['ALDEAS'] 		= 'village(s)'; 
	lang_fr['ENV_TROPAS'] 	= 'Envoyer unit&eacute;s'; 
	lang_fr['RECURSO1'] 	= 'Bois'; 
	lang_fr['RECURSO2'] 	= 'Terre'; 
	lang_fr['RECURSO3'] 	= 'Fer'; 
	lang_fr['RECURSO4'] 	= 'C&eacute;r&eacute;ales'; 
	lang_fr['TIEMPO'] 		= 'Temps'; 
	lang_fr['COMP'] 		= 'Compresseur';
	lang_fr['STAT']			= 'Statistiques';
	lang_fr['OFREZCO']		= 'Offre';
	lang_fr['BUSCO']		= 'Recherche';
	lang_fr['TIPO']			= 'Type';
	lang_fr['CUALQUIERA']	= 'Toutes';
	lang_fr['DETALLES']		= 'D&eacute;tail';
	lang_fr['MAP_EXT']		= 'Carte etendue';
    lang_fr['DISPONIBLE']   = 'Disponible';
    lang_fr['SI']           = 'Oui';
    lang_fr['NO']           = 'Non';
    lang_fr['MARCADORES']   = 'Liens';
    lang_fr['ANYADIR']      = 'Ajouter';
    lang_fr['ENLACE']       = 'URL du nouveau lien';
	lang_fr['TEXTO']        = 'Texte du nouveau lien';
	lang_fr['SEGURO'] 		= 'Es-tu certain ?'; 
	lang_fr['ELIMINAR'] 	= 'Supprimer'; 
	lang_fr['MAPA'] 		= 'Carte'; 
	lang_fr['VERSION'] 		= 'La derniere version disponible est la '; 
	lang_fr['MAXTIME']		= 'Temps maximum'; 
	lang_fr['CHECK'] 		= 'Update TBeyond';
	lang_fr['ACTUALIZAR'] 	= 'Update TBeyond';
	//lang_fr['CHECK'] 			= 'V&eacute;rifier version'; 
	lang_fr['ARCHIVE'] 		= 'Archive'; 
	lang_fr['RESUMEN'] 		= 'R&eacute;sum&eacute;';
	lang_fr['BIGICONS']		= 'Show extended icons';
	lang_fr['NOTEBLOCK']	= 'Show note block';

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
	lang_nl['ALDEA'] 	= 'Dorp';
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
	lang_nl['PC'] 		= 'Cultuur punten';
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
	lang_nl['BIGICONS']			= 'Show extended icons';
	lang_nl['NOTEBLOCK']		= 'Show note block';
	lang_nl['CHECK'] 	= 'Update TBeyond';
	lang_nl['ACTUALIZAR'] 	= 'Update TBeyond';
	
	// Por MikeP (Dedicado a Li), corregido y ampliado por Joao Frade
	var lang_pt = new Array();
	var lang_br = lang_pt; // Es realmente igual el brasilenyo al portugues? :S
	lang_pt['ACCION'] 	= 'Ac&ccedil;&otilde;es';
	lang_pt['A_LAS'] 	= '&agrave;s';
	lang_pt['ALDEA'] 	= 'Aldeia';
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
	lang_pt['PC'] 		= 'Pontos de cultura';
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
	lang_pt['CHECK'] 	= 'Update TBeyond';
	lang_pt['ACTUALIZAR'] 	= 'Update TBeyond';
	lang_pt['BIGICONS']			= 'Show extended icons';
	lang_pt['NOTEBLOCK']		= 'Show note block';
	
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
	lang_pl['CHECK']	= 'Aktualizuj TBeyond';
	lang_pl['MAT_PRIMAS']	= 'Sprawy';
	lang_pl['ATAQUES']	= 'Ataki';
	lang_pl['CONSTR']	= 'Budowa';
	lang_pl['TROPAS']	= 'Jednostki';
	lang_pl['ACTUALIZAR']	= 'Aktualizuj';
	lang_pl['ARCHIVE']	= 'Archiwum';
	lang_pl['RESUMEN']	= 'Podsumowanie';
	lang_pl['BIGICONS']			= 'Show extended icons';
	lang_pl['NOTEBLOCK']		= 'Show note block';
	
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
	lang_tr['CHECK'] 		= 'Update TBeyond';
	lang_tr['ACTUALIZAR'] 	= 'Update TBeyond';
	lang_tr['BIGICONS']		= 'Show extended icons';
	lang_tr['NOTEBLOCK']	= 'Show note block';
	
	// Rumano (travian.ro) gracias a Dan Aslau
	var lang_ro = new Array();
	lang_ro['ALIANZA']  	= 'Alianta';
	lang_ro['PERFIL']  		= 'Profil';
	lang_ro['SIM']   		= 'Simulator lupta';
	lang_ro['CALC']  		= 'Travian Calc';
	lang_ro['SEGURO']  		= 'Esti sigur?';
	lang_ro['MARK']  		= 'Selecteaza tot';
	lang_ro['PERDIDAS']  	= 'Pierderi';
	lang_ro['RENT']  		= 'Profit';
	lang_ro['SUBIR_NIVEL']  = 'Upgrade posibil acum';
	lang_ro['JUGADOR']  	= 'Jucator';
	lang_ro['ALDEA']  		= 'Sat';
	lang_ro['HAB']   		= 'Populatie';
	lang_ro['COORD']  		= 'Coordonate';
	lang_ro['ACCION']  		= 'Actiuni';
	lang_ro['ATACAR']  		= 'Ataca';
	lang_ro['COMERCIAR']  	= 'Trimite resurse';
	lang_ro['GUARDADO']  	= 'Salvat';
	lang_ro['DESP_ABR']  	= 'Randuri';
	lang_ro['FALTA']  		= 'Ai nevoie de';
	lang_ro['HOY']   		= 'azi';
	lang_ro['MANYANA']  	= 'maine';
	lang_ro['PAS_MANYANA']  = 'poimaine';
	lang_ro['MERCADO']  	= 'Targ';
	lang_ro['CUARTEL']      = 'Cazarma';
	lang_ro['PUNTO'] 		= 'Adunare';
	lang_ro['CORRAL'] 		= 'Grajd';
	lang_ro['TALLER'] 		= 'Atelier';
	lang_ro['ENVIAR'] 		= 'Trimite';
	lang_ro['COMPRAR'] 		= 'Cumpara';
	lang_ro['VENDER'] 		= 'Vinde';
	lang_ro['ENVIAR_IGM'] 	= 'Trimite mesaj';
	lang_ro['LISTO'] 		= 'Upgrade posibil';
	lang_ro['EL'] 			= 'in';
	lang_ro['A_LAS'] 		= 'la';
	lang_ro['EFICIENCIA'] 	= 'Eficienta';
	lang_ro['NUNCA'] 		= 'Niciodata';
	lang_ro['PC']           = 'Puncte de cultura';
	lang_ro['FUNDAR']       = 'Poti sa cuceresti sau sa formezi un nou sat';
	lang_ro['ALDEAS']       = 'Sat(e)';
	lang_ro['TROPAS']       = 'Adunare';
    lang_ro['ENV_TROPAS']   = 'Adunare';
	lang_ro['RECURSO1']     = 'Lemn';
	lang_ro['RECURSO2']     = 'Argila';
	lang_ro['RECURSO3']     = 'Fier';
	lang_ro['RECURSO4']     = 'Hrana';
	lang_ro['ACTUALIZAR']	= 'Update TBeyond';
	lang_ro['CHECK']		= 'Update TBeyond';
	lang_ro['TIEMPO']       = 'Timp';
	lang_ro['COMP'] 		= 'Arhivare rapoarte';
	lang_ro['STAT'] 		= 'Statistici';
	lang_ro['CUALQUIERA'] 	= 'Oricare';
	lang_ro['SI'] 			= 'Da';
	lang_ro['NO'] 			= 'Nu';
	lang_ro['OFREZCO'] 		= 'Ofera';
	lang_ro['BUSCO'] 		= 'Cauta';
	lang_ro['TIPO'] 		= 'Tip';
	lang_en['OPTIONS']    	= 'Optiuni';
	lang_ro['MAXTIME'] 		= 'Timp maxim';
	lang_ro['DISPONIBLE'] 	= 'Doar cele disponibile';
	lang_ro['MARCADORES'] 	= 'Scurtaturi';
	lang_ro['ANYADIR'] 		= 'Adauga';
	lang_ro['ENLACE'] 		= 'URL';
	lang_ro['TEXTO']		= 'Text';
	lang_ro['VENTAS']    	= 'Oferte salvate';
	lang_ro['ELIMINAR'] 	= 'Sterge';
	lang_ro['MAPA'] 		= 'Harta';
	lang_ro['BIGICONS']		= 'Afiseaza icoane suplimentare';
	lang_ro['NOTEBLOCK']	= 'Afiseaza bloc-notes';
	
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
	lang_cn['CHECK'] 		= '&#26816;&#26597;&#26032;&#29256;';
	lang_cn['ACTUALIZAR']	= '&#26816;&#26597;&#26032;&#29256';
	lang_cn['ARCHIVE'] 	= '&#23384;&#26723;';
	lang_cn['RESUMEN'] 	= '&#31616;&#25253;';
	lang_cn['BIGICONS']			= 'Show extended icons';
	lang_cn['NOTEBLOCK']		= 'Show note block';
	
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
	lang_fi['ACTUALIZAR']	= 'Tarkista uusi version';
	lang_fi['ARCHIVE'] 	= 'Arkisto';
	lang_fi['RESUMEN'] 	= 'Katsaus';
	lang_fi['BIGICONS']			= 'Show extended icons';
	lang_fi['NOTEBLOCK']		= 'Show note block';
	
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
	lang_se['CHECK']	= 'S&#246;k ny version';
	lang_se['MAXTIME']	= 'Max tid';
	lang_se['ARCHIVE'] 	= 'Arkiv';
	lang_se['RESUMEN'] 	= 'Summering';
	lang_se['BIGICONS']			= 'Show extended icons';
	lang_se['NOTEBLOCK']		= 'Show note block';
	
	
	// Checo (travian.cz) thanks to nofak and Darius
	var lang_cz = new Array();
	lang_cz['ALIANZA']      = 'Aliance';
	lang_cz['PERFIL']       = 'Profil';
	lang_cz['SIM']          = 'Bitevn&#237; simul&#225;tor';
	lang_cz['CALC']         = 'Travian kalkula&#269;ka';
	lang_cz['SEGURO']       = 'Jse? si jisty?';
	lang_cz['MARK']         = 'Vybrat v&scaron;e';
	lang_cz['PERDIDAS'] 	= 'Materi&aacute;ln&iacute; ztr&aacute;ta';
	lang_cz['RENT']         = 'V&yacute;nos';
	lang_cz['SUBIR_NIVEL']  = 'M&#367;&#382;e&scaron; stav&#283;t';
	lang_cz['JUGADOR']      = 'Hr&aacute;&#269;';
	lang_cz['ALDEA']        = 'Jm&eacute;no vesnice';
	lang_cz['HAB']          = 'Populace';
	lang_cz['COORD']        = 'Sou&#345;adnice';
	lang_cz['ACCION']       = 'Akce';
	lang_cz['ATACAR']       = 'Utok';
	lang_cz['ATAQUES'] 		= 'Utok';
	lang_cz['COMERCIAR']    = 'Poslat suroviny';
	lang_cz['GUARDADO'] 	= 'Ulozeno'; //prompt message doesn't allow HTML Entities
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
	lang_cz['FUNDAR'] 		= 'M??e? zalo?it nebo dobit vesnici';
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
	lang_cz['MAP_EXT'] 		= 'Roz?i?ena mapa';
	lang_cz['DISPONIBLE']   = 'Jen dostupn&eacute;';
	lang_cz['SI']           = 'Ano';
	lang_cz['NO']           = 'Ne';
	lang_cz['LOGIN']        = 'Login';
	lang_cz['MARCADORES']   = 'Z&aacute;lo&#382;ky';
	lang_cz['ANYADIR']      = 'P&#345;idat';
	lang_cz['ENLACE']       = 'URL adresa';
	lang_cz['TEXTO'] 		= 'Popisek zalozky'; //prompt message doesn't allow HTML Entities
	lang_cz['ELIMINAR']     = 'Smazat';
	lang_cz['MAPA']         = 'Mapa';
	lang_cz['VERSION']      = 'Dostupn&aacute; verze';
	lang_cz['MAXTIME']      = 'Maxim&aacute;ln&iacute; &#269;as';
	lang_cz['CHECK']        = 'Zjistit novou verzi';
	lang_cz['ACTUALIZAR']	= 'Zjistit novou verzi';
	lang_cz['MAT_PRIMAS']   = 'Materi&aacute;l';
    lang_cz['ATAQUES']      = 'Ataques';
    lang_cz['CONSTR'] 		= 'Stavba';
	lang_cz['TROPAS'] 		= 'Jednotky';
	lang_cz['ACTUALIZAR'] 	= 'Aktualizuj TBeyond';
	lang_cz['ARCHIVE'] 		= 'Archivovat';
    lang_cz['RESUMEN'] 		= 'P?ehled';
	lang_cz['BIGICONS'] 	= 'Zobraz velke ikony';
	lang_cz['NOTEBLOCK'] 	= 'Zobraz poznamkovy blok';

	
// Ruso (travian.ru) gracias a Vladimir Yu Belov, mod by 7bit
     var lang_ru = new Array();
    lang_ru['ALIANZA']      = '&#1040;&#1083;&#1100;&#1103;&#1085;&#1089;';
    lang_ru['LOGIN']        = '&#1042;&#1093;&#1086;&#1076;';
    lang_ru['ENV_TROPAS']   = '&#1055;&#1086;&#1089;&#1083;&#1072;&#1090;&#1100; &#1074;&#1086;&#1081;&#1089;&#1082;&#1072;';
    lang_ru['PERFIL']       = '&#1055;&#1088;&#1086;&#1092;&#1080;&#1083;&#1100;';
    lang_ru['SIM']          = '&#1057;&#1080;&#1084;&#1091;&#1083;&#1103;&#1090;&#1086;&#1088;';
    lang_ru['CALC']         = 'Travian Calc';
    lang_ru['SEGURO']       = '?? ????????'; //prompt message doesn't allow HTML Entities
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
    lang_ru['GUARDADO']     = '?????????'; //prompt message doesn't allow HTML Entities
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
    lang_ru['ENLACE']       = 'URL ????? ????????'; //prompt message doesn't allow HTML Entities
    lang_ru['TEXTO']        = '???????? ????? ????????'; //prompt message doesn't allow HTML Entities
    lang_ru['ELIMINAR']     = '&#1059;&#1076;&#1072;&#1083;&#1080;&#1090;&#1100;';
    lang_ru['MAPA']         = '&#1050;&#1072;&#1088;&#1090;&#1072;';
    lang_ru['DISPONIBLE']   = '&#1058;&#1086;&#1083;&#1100;&#1082;&#1086; &#1076;&#1086;&#1089;&#1090;&#1091;&#1087;&#1085;&#1099;&#1077; &#1076;&#1083;&#1103; &#1087;&#1086;&#1082;&#1091;&#1087;&#1082;&#1080;';
	lang_ru['CHECK'] 	= 'Update TBeyond';
	lang_ru['ACTUALIZAR'] 	= 'Update TBeyond';
	lang_ru['BIGICONS']			= 'Show extended icons';
	lang_ru['NOTEBLOCK']		= 'Show note block';

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
    lang_dk['PC']           = 'Kultur points';
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
    lang_dk['ENLACE']       = 'Nyt bogmarke URL'; //prompt message doesn't allow HTML Entities
    lang_dk['TEXTO']        = 'Nyt bogmarke tekst'; //prompt message doesn't allow HTML Entities
    lang_dk['ELIMINAR']     = 'Slet';
    lang_dk['MAPA']         = 'Kort';
    lang_dk['CHECK']        = 'Check ny version';
	lang_dk['ACTUALIZAR']	= 'Check ny version';
    lang_dk['ARCHIVE']      = 'Arkiv';
    lang_dk['RESUMEN']      = 'Resume';
	lang_dk['BIGICONS']			= 'Show extended icons';
	lang_dk['NOTEBLOCK']		= 'Show note block';
	
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
	lang_hr['ACTUALIZAR'] = 'Provjeri novu verziju';
	lang_hr['ARCHIVE'] 	= 'Arhiv'; 
	lang_hr['RESUMEN'] 	= 'Sa&#382;etak';
	lang_hr['BIGICONS']			= 'Show extended icons';
	lang_hr['NOTEBLOCK']		= 'Show note block';
	
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
	lang_bg['ACTUALIZAR'] 	= '&#1055;&#1088;&#1086;&#1074;&#1077;&#1088;&#1080; &#1079;&#1072; &#1085;&#1086;&#1074;&#1072; &#1074;&#1077;&#1088;&#1089;&#1080;&#1103;'; 
	lang_bg['CHECK'] 	= '&#1055;&#1088;&#1086;&#1074;&#1077;&#1088;&#1080; &#1079;&#1072; &#1085;&#1086;&#1074;&#1072; &#1074;&#1077;&#1088;&#1089;&#1080;&#1103;'; 
	lang_bg['ARCHIVE'] 	= '&#1040;&#1088;&#1093;&#1080;&#1074;'; 
	lang_bg['RESUMEN'] 	= '&#1054;&#1073;&#1097;&#1086;'; 
	lang_bg['LOGIN'] 	= '&#1042;&#1083;&#1080;&#1079;&#1072;&#1085;&#1077;'; 
	lang_bg['TIPO'] 	= '&#1050;&#1086;&#1077;&#1092;&#1080;&#1094;&#1080;&#1077;&#1085;&#1090;'; 
	lang_bg['MAXTIME'] 	= '&#1052;&#1072;&#1082;&#1089;. &#1074;&#1088;&#1077;&#1084;&#1077;';
	lang_bg['BIGICONS']			= 'Show extended icons';
	lang_bg['NOTEBLOCK']		= 'Show note block';
	
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
	lang_hu['PC']          	 	= 'Kult&#250;ra pontok';
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
	lang_hu['ACTUALIZAR']			= '&#218;j verzi&#243; keres&#233;se';
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
    lang_hu['VENTAS']    		= 'Mentett eladasok';
    lang_hu['SHOWINFO']    		= 'Nyersanyagot mutat';
    lang_hu['HIDEINFO']    		= 'Nyersanyagot elrejt';
    lang_hu['MAPSCAN']    		= 'Nyersanyagscan';
	lang_hu['BIGICONS']			= 'Show extended icons';
	lang_hu['NOTEBLOCK']		= 'Show note block';

	// Eslovaco - Slovakia (travian.sk) transl. Kolumbus
	var lang_sk = new Array();
	lang_sk['ALIANZA']      = 'Aliancia';
	lang_sk['PERFIL']       = 'Profil';
	lang_sk['SIM']          = 'Bojov&#253; simul&#225;tor';
	lang_sk['CALC']         = 'Travian kalkula&#269;ka';
	lang_sk['SEGURO']       = 'Si si isty?';
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
	lang_sk['GUARDADO']     = 'Ulo?ene';
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
	lang_sk['TEXTO']        = 'Popis zalo?ky';
	lang_sk['ELIMINAR']     = 'Zmaza&#357;';
	lang_sk['MAPA']         = 'Mapa';
	lang_sk['VERSION']      = 'Dostupn&#225; verzia';
	lang_sk['MAXTIME']      = 'Maxim&#225;lny &#269;as';
	lang_sk['CHECK']        = 'Zisti&#357; nov&#250; verziu';
	lang_sk['ACTUALIZAR']        = 'Zisti&#357; nov&#250; verziu';
	lang_sk['MAT_PRIMAS']   = 'Materi&#225;l';
    lang_sk['ATAQUES']      = '&#218;toky';
    lang_sk['CONSTR']       = 'V&#253;stavba';
    lang_sk['TROPAS']       = 'Jednotky';
    lang_sk['ACTUALIZAR']   = 'Aktualizuj';
    lang_sk['ARCHIVE']      = 'Archivova&#357;';
    lang_sk['RESUMEN']      = 'Preh&#318;ad';
	lang_sk['BIGICONS']			= 'Show extended icons';
	lang_sk['NOTEBLOCK']		= 'Show note block';
	
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
	lang_no['PC']           = 'Kulturpoeng';
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
	lang_no['ACTUALIZAR']        = 'Se etter ny versjon';
	lang_no['ARCHIVE']      = 'Arkiv';
	lang_no['RESUMEN']      = 'Fortsett';
	lang_no['BIGICONS']			= 'Show extended icons';
	lang_no['NOTEBLOCK']		= 'Show note block';
	
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
	lang_ba['ACTUALIZAR']    = 'Potrazi novu verziju';
    lang_ba['ARCHIVE']  = 'Arhiv';
    lang_ba['RESUMEN']  = 'Svota';
	lang_ba['BIGICONS']			= 'Show extended icons';
	lang_ba['NOTEBLOCK']		= 'Show note block';

    // Translation in Slovenian by Andraz Oberstar aka 5p1der
    // Prevedel v slovenscino Andraz Oberstar aka 5p1der
	var lang_si = new Array();
	lang_si['ALIANZA'] = 'Aliansa';
	lang_si['PERFIL'] = 'Profil';
	lang_si['SIM'] = 'Simulator bitk';
	lang_si['CALC'] = 'Travian Kalkulator';
	lang_si['SEGURO'] = 'Ali ste prepricani?';
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
	lang_si['ACTUALIZAR'] = 'Poglej za novo verzijo';
	lang_si['ARCHIVE'] = 'Arhiv';
	lang_si['RESUMEN'] = 'Vsota';
	lang_si['BIGICONS']			= 'Show extended icons';
	lang_si['NOTEBLOCK']		= 'Show note block';

	// Taiwanese (Trd. Chinese) translation
    var lang_tw = new Array();
    var lang_hk = lang_tw;
    lang_tw['ALIANZA']     = '\?\?';
    lang_tw['PERFIL']     = '\?\?\?\?';

    lang_tw['SIM']         = '\?\?\?\?\?';
    lang_tw['CALC']     = 'Travian\?\?\?';
	lang_tw['SEGURO']     = '\?\?\?\?\?\?';
    lang_tw['MARK']     = '\?\?';
    lang_tw['PERDIDAS']     = '\?\?';
    lang_tw['RENT']     = '\?\?';
    lang_tw['SUBIR_NIVEL']     = '\?\?\?\?\!';
    lang_tw['JUGADOR']     = '\?\?';
    lang_tw['ALDEA']     = '\?\?';
    lang_tw['HAB']         = '\?\?';
    lang_tw['COORD']     = '\?\?';
    lang_tw['ACCION']     = '\?\?';
    lang_tw['ATACAR']     = '\?\?';
    lang_tw['COMERCIAR']     = '\?\?\?\?';
    lang_tw['GUARDADO']     = '\?\?';
    lang_tw['DESP_ABR']     = '\?\?\?\?';
    lang_tw['FALTA']     = '\?\?';
    lang_tw['HOY']         = '\?\?';
    lang_tw['MANYANA']     = '\?\?';
    lang_tw['PAS_MANYANA']     = '\?\?';
    lang_tw['MERCADO']     = '\?\?';
    lang_tw['CUARTEL']     = '\?\?';
    lang_tw['PUNTO']     = '\?\?\?';
    lang_tw['CORRAL']     = '\?\?';
    lang_tw['TALLER']     = '\?\?';
    lang_tw['ENVIAR']     = '\?\?\?\?';
    lang_tw['COMPRAR']     = '\?';
    lang_tw['VENDER']     = '\?';
    lang_tw['ENVIAR_IGM']     = '\?IGM';
    lang_tw['LISTO']     = '\?\?\?\?';
    lang_tw['EL']         = '\-';
    lang_tw['A_LAS']     = '\-';
    lang_tw['EFICIENCIA']     = '\?\?';
    lang_tw['NUNCA']    = '\?\?';
    lang_tw['PC']           = '\?\?\?';
    lang_tw['FUNDAR']       = '\?\?\?\?\?\?\?\?\?\?\?\?\?';
    lang_tw['ALDEAS']       = '\?\?';
    lang_tw['ENV_TROPAS']    = '\?\?';
    lang_tw['RECURSO1']     = '\?\?';
    lang_tw['RECURSO2']     = '\?\?';
    lang_tw['RECURSO3']     = '\?\?';
    lang_tw['RECURSO4']     = '\?\?';
    lang_tw['TIEMPO']       = '\?\?';
    lang_tw['COMP']         = '\?\?\?\?\?';
    lang_tw['STAT']        = '\?\?';
    lang_tw['OFREZCO']    = '\?\?';
    lang_tw['BUSCO']    = '\?\?';
    lang_tw['TIPO']        = '\?\?';
    lang_tw['DISPONIBLE']    = '\?\?\?\?\?\?\?';
    lang_tw['CUALQUIERA']    = '\?\?';
    lang_tw['SI']        = '\?';
    lang_tw['NO']        = '\?';
    lang_tw['LOGIN']    = '\?\?';
    lang_tw['MARCADORES']   = '\?\?';
    lang_tw['ANYADIR']      = '\?\?';
    lang_tw['ENLACE']       = '\?\?\?\?\?';
    lang_tw['TEXTO']        = '?????(???????)';
    lang_tw['MAXTIME']    = '\?\?\?\?\?\?';
    lang_tw['ELIMINAR']    = '\?\?';
    lang_tw['MAPA']        = '\?\? \(TravMap\)';
    lang_tw['CHECK']    = '\?\?\?\?\?';
    lang_tw['ARCHIVE']    = '\?\?';
    lang_tw['RESUMEN']    = '\?\?';
	lang_tw['CHECK'] 	= 'Update TBeyond';
	lang_tw['ACTUALIZAR'] 	= 'Update TBeyond';
   	lang_tw['BIGICONS']			= 'Show extended icons';
	lang_tw['NOTEBLOCK']		= 'Show note block';
	
    // Lithuania translation
    var lang_lt = new Array();
    lang_lt['ALIANZA']     = 'Aljansas';
    lang_lt['PERFIL']     = 'Profilis';
    lang_lt['SIM']         = 'M&#363;&#353;i&#371; simuliatorius';
    lang_lt['CALC']     = 'Kalkuliatorius';
    lang_lt['SEGURO']     = 'Ar esi isitikines?';
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
    lang_lt['PC']           = 'Kult&#363;ros ta&#353;kai (-&#371;)';
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
    lang_lt['TEXTO']        = 'Nauja Tekstine nuoroda';
    lang_lt['ELIMINAR']    = 'I&#353;strinti';
    lang_lt['MAPA']        = '&#381;em&#279;lapis';
    lang_lt['MAXTIME']    = 'Maksimalus gabenimo laikas';
    lang_lt['CHECK']    = 'Naujos versijos tikrinimas';
	lang_lt['ACTUALIZAR']    = 'Naujos versijos tikrinimas';
    lang_lt['ARCHIVE']    = 'Archyvas';
    lang_lt['RESUMEN']    = 'Santrauka';
    lang_lt['LOGIN']    = 'Prisijungti';
    lang_lt['MAP_EXT']    = '&#381;em&#279;lapio i&#353;pl&#279;timas'; 
	lang_lt['BIGICONS']			= 'Show extended icons';
	lang_lt['NOTEBLOCK']		= 'Show note block';

	// Arabic Translate
	var lang_ae = new Array();
	lang_ae['ALIANZA'] = '&#1578;&#1581;&#1575;&#1604;&#1601;';
    lang_ae['PERFIL'] = '&#1575;&#1604;&#1605;&#1604;&#1601; &#1575;&#1604;&#1588;&#1582;&#1589;&#1610;';
    lang_ae['SIM'] = '&#1605;&#1581;&#1575;&#1603;&#1610; &#1575;&#1604;&#1605;&#1593;&#1585;&#1603;&#1607;';
    lang_ae['CALC'] = '&#1581;&#1575;&#1587;&#1576;&#1577; &#1578;&#1585;&#1575;&#1601;&#1610;&#1575;&#1606;';
    lang_ae['SEGURO'] = '?? ??? ??????';
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
    lang_ae['GUARDADO'] = '&#1581;&#1601;&#1592;';
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
    lang_ae['ENLACE'] = '&#1575;&#1604;&#1593;&#1606;&#1608;&#1575;&#1606;';
    lang_ae['TEXTO'] = '????';
    lang_ae['ELIMINAR'] = '&#1581;&#1584;&#1601;';
    lang_ae['MAPA'] = '&#1575;&#1604;&#1582;&#1585;&#1610;&#1591;&#1607;';
    lang_ae['CHECK'] = '&#1576;&#1581;&#1579; &#1593;&#1606; &#1578;&#1581;&#1583;&#1610;&#1579;';
	lang_ae['ACTUALIZAR'] = '&#1576;&#1581;&#1579; &#1593;&#1606; &#1578;&#1581;&#1583;&#1610;&#1579;';
    lang_ae['ARCHIVE'] = '&#1575;&#1604;&#1575;&#1585;&#1588;&#1610;&#1601;';
    lang_ae['RESUMEN'] = '&#1575;&#1604;&#1605;&#1608;&#1580;&#1586;';
	lang_ae['BIGICONS']			= 'Show extended icons';
	lang_ae['NOTEBLOCK']		= 'Show note block';

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
	lang_rs['CHECK'] 	= 'Update TBeyond';
	lang_rs['ACTUALIZAR'] 	= 'Update TBeyond';
	lang_rs['ATAQUES']	= '&#1053;&#1072;&#1087;&#1072;&#1076;&#1080;';
	lang_rs['CONSTR']	= '&#1043;&#1088;&#1072;&#1106;&#1077;&#1074;&#1080;&#1085;&#1072;';
	lang_rs['TROPAS']	= '&#1042;&#1086;&#1112;&#1089;&#1082;&#1072;';
	lang_rs['ACTUALIZAR']	= '&#1040;&#1078;&#1091;&#1088;&#1080;&#1088;&#1072;&#1112;';
	lang_rs['ARCHIVE'] 	= '&#1040;&#1088;&#1093;&#1080;&#1074;&#1072;'; 
	lang_rs['RESUMEN'] 	= '&#1055;&#1088;&#1077;&#1075;&#1083;&#1077;&#1076;';
	lang_rs['BIGICONS']			= 'Show extended icons';
	lang_rs['NOTEBLOCK']		= 'Show note block';

	var lang_gr = new Array();
	var lang_el = lang_gr;
	lang_gr['ALIANZA'] 	= 'S?μμa??a';
	lang_gr['PERFIL'] 	= '???f??';

	lang_gr['SIM'] 		= '???s?μ. μ????';
	lang_gr['CALC'] 	= 'Travian Calc';
	lang_gr['SEGURO'] 	= '??sa? s????????'; //prompt message doesn't allow HTML Entities
	lang_gr['MARK'] 	= '?p????? ????';
	lang_gr['PERDIDAS'] 	= '??μ??';
	lang_gr['RENT'] 	= '???d??';
	lang_gr['SUBIR_NIVEL'] 	= '??a??s?μ? a?as??μ?s? ';
	lang_gr['JUGADOR'] 	= '?a??t??';
	lang_gr['ALDEA'] 	= '???μa ??????';
	lang_gr['HAB'] 		= '?????sμ??';
	lang_gr['COORD'] 	= 'S??teta?μ??e?';
	lang_gr['ACCION'] 	= '?????e?e?';
	lang_gr['ATACAR'] 	= '?p??es?';

	lang_gr['COMERCIAR'] 	= '?p?st??? p??t?? ????';
	lang_gr['GUARDADO'] 	= '?p????e?t??a?'; //prompt message doesn't allow HTML Entities
	lang_gr['DESP_ABR'] 	= 'Mov.';
	lang_gr['FALTA'] 	= '??e???esa?';
	lang_gr['HOY'] 		= 's?μe?a';
	lang_gr['MANYANA'] 	= 'a????';
	lang_gr['PAS_MANYANA'] 	= 'μe?a????';
	lang_gr['MERCADO'] 	= '?????';
	lang_gr['CUARTEL'] 	= 'St?at??a?';

	lang_gr['PUNTO'] 	= '??ate?a s???e?t??se??';
	lang_gr['CORRAL'] 	= 'St?s???';
	lang_gr['TALLER'] 	= '???ast????';

	lang_gr['ENVIAR'] 	= '?p?st??? p??t?? ????';
	lang_gr['COMPRAR'] 	= '?????';
	lang_gr['VENDER'] 	= '????s?';
	lang_gr['ENVIAR_IGM'] 	= '?p?st??? μ???μat??';
	lang_gr['LISTO'] 	= '?t??μ?';
	lang_gr['EL'] 		= 't??';
	lang_gr['A_LAS'] 	= 'st??';
	lang_gr['EFICIENCIA'] 	= 'Efficiency'; 
	lang_gr['NUNCA']	= '??t?';


	lang_gr['PC']           = 'p??t??? p???t?sμ??';
	lang_gr['FUNDAR']       = '?p??e?? ?a ?d??se?? ? ?a ?ata?t?se?? ??? ?????';
	lang_gr['ALDEAS']       = '?????(?)';
	lang_gr['ENV_TROPAS'] 	= 'St?ate?μata';
	lang_gr['RECURSO1']     = '????';
	lang_gr['RECURSO2']     = '?????';
	lang_gr['RECURSO3']     = 'S?de??';
	lang_gr['RECURSO4']     = 'S?t???';
	lang_gr['TIEMPO']       = '??????';

	lang_gr['COMP']         = 'S?μp. a?af????';
	lang_gr['STAT']		= 'Stat?st???';
	lang_gr['OFREZCO']	= '???sf???';
	lang_gr['BUSCO']	= '??a??t?s?';
	lang_gr['TIPO']		= '??p??';
	lang_gr['DISPONIBLE']	= '???? d?a??s?μa';
	lang_gr['CUALQUIERA']	= '??a';
	lang_gr['SI']		= '?a?';
	lang_gr['NO']		= '???';
    lang_gr['LOGIN'] = 'S??des?';
    lang_gr['MARCADORES']   = 'Se??d?de??te?';
    lang_gr['ANYADIR']      = '???s????';
    lang_gr['ENLACE']       = 'URL se??d?de??t?'; //prompt message doesn't allow HTML Entities
    lang_gr['TEXTO']        = '?e?μe?? se??d?de??t?'; //prompt message doesn't allow HTML Entities
	lang_gr['ELIMINAR']	= '??a??af?';
	lang_gr['MAPA']		= '???t??';


    lang_gr['VERSION']      = '??a??s?μ? ??d?s?';
    lang_gr['MAXTIME']      = '????st?? ??????';
	lang_gr['CHECK']	= '??a ??d?s?';
	lang_gr['ACTUALIZAR']	= '??a ??d?s?';
	lang_gr['ARCHIVE']	= '???e????t?s?';
	lang_gr['RESUMEN']	= 'S?????';
	lang_gr['MAXTIME']			= '????st?? ??????';
	lang_gr['VERSION']			= '?e?te?? ??d?s?';
	lang_gr['DETALLES']			= '?ept?μ??e?e?';

	lang_gr['MAP_EXT']			= '??tetaμ???? ???t??';
	lang_gr['MAT_PRIMAS']		= '???te? ??e?';
	lang_gr['ATAQUES']			= '?p??es?';
	lang_gr['CONSTR']			= 'build';
	lang_gr['TROPAS']			= 'St?ate?μata';
	lang_gr['ACTUALIZAR']		= '??a ??d?s?';
	lang_gr['RES'] 				= 'Research tree';
    lang_gr['STOREURL']         = 'URL ?p????e?s??';
    lang_gr['STOREPASSWORD']    = '??d???? ?p????e?s??';
    lang_gr['OPTIONS']    		= '?p??????';
    lang_gr['VENTAS']    		= '?p????e?μ??e? ???sf????';
    lang_gr['SHOWINFO']    		= '?μf???s? p???. ??????';
    lang_gr['HIDEINFO']    		= '?p?????? p???. ??????';
    lang_gr['MAPSCAN']    		= 'S???s? t?? ???t?';
	lang_gr['BIGICONS']			= 'Show extended icons';
	lang_gr['NOTEBLOCK']		= 'Show note block';

	// *** lang_jp start ***/
	//thanks to Jackie Jack
	var lang_jp = new Array();
	lang_jp['ALIANZA'] = '同盟';
	lang_jp['PERFIL'] = 'プロフィール';
	lang_jp['SIM'] = '戦闘シミュレータ';
	lang_jp['CALC'] = 'トラビアンカルク';
	lang_jp['SEGURO'] = 'Estas seguro?'; //prompt message doesn't allow HTML Entities
	lang_jp['MARK'] = '全て選択';
	lang_jp['PERDIDAS'] = '損失';
	lang_jp['RENT'] = '利益';
	lang_jp['SUBIR_NIVEL'] = '準備完了';
	lang_jp['JUGADOR'] = 'プレイヤー';
	lang_jp['ALDEA'] = '村名';
	lang_jp['HAB'] = '人口';
	lang_jp['COORD'] = '座標';
	lang_jp['ACCION'] = 'Action';
	lang_jp['ATACAR'] = '攻撃';
	lang_jp['COMERCIAR'] = '資源の送付';
	lang_jp['GUARDADO'] = '保存しました'; //prompt message doesn't allow HTML Entities
	lang_jp['DESP_ABR'] = 'Mov.';
	lang_jp['FALTA'] = '不足';
	lang_jp['HOY'] = '今日';
	lang_jp['MANYANA'] = '明日';
	lang_jp['PAS_MANYANA'] = '明後日';
	lang_jp['MERCADO'] = '市場';
	lang_jp['CUARTEL'] = '兵舎';
	lang_jp['PUNTO'] = '集兵所';
	lang_jp['CORRAL'] = '馬舎';
	lang_jp['TALLER'] = '作業場';
	lang_jp['ENVIAR'] = '資源の送付';
	lang_jp['COMPRAR'] = '売方';
	lang_jp['VENDER'] = '買方';
	lang_jp['ENVIAR_IGM'] = 'メッセージの送付';
	lang_jp['LISTO'] = '準備完了予定';
	lang_jp['EL'] = 'on';
	lang_jp['A_LAS'] = 'at';
	lang_jp['EFICIENCIA'] = '効率';
	lang_jp['NUNCA'] = '不足';
	lang_jp['PC'] = '文化ポイント';
	lang_jp['FUNDAR'] = 'あなたは、新しい村を設立するか、または征服できます';
	lang_jp['ALDEAS'] = '村';
	lang_jp['ENV_TROPAS'] = '集兵所';
	lang_jp['RECURSO1'] = '木';
	lang_jp['RECURSO2'] = '粘土';
	lang_jp['RECURSO3'] = '鉄';
	lang_jp['RECURSO4'] = '穀物';
	lang_jp['TIEMPO'] = '時間';
	lang_jp['COMP'] = 'Report Compressor';
	lang_jp['STAT'] = '統計値';
	lang_jp['OFREZCO'] = '売方';
	lang_jp['BUSCO'] = '買方';
	lang_jp['TIPO'] = 'タイプ';
	lang_jp['CUALQUIERA'] = '全て';
	lang_jp['DETALLES'] = '概要';
	lang_jp['MAP_EXT'] = '拡張マップ';
	lang_jp['DISPONIBLE'] = '取引可能';
	lang_jp['SI'] = 'Yes;';
	lang_jp['NO'] = 'No';
	lang_jp['LOGIN'] = 'Login';
	lang_jp['MARCADORES'] = 'Bookmarks';
	lang_jp['ANYADIR'] = '追加';
	lang_jp['ENLACE'] = '追加するブックマークのURL'; //prompt message doesn't allow HTML Entities
	lang_jp['TEXTO'] = '追加するブックマークのタイトル'; //prompt message doesn't allow HTML Entities
	lang_jp['ELIMINAR'] = '削除';
	lang_jp['MAPA'] = 'マップ';
	lang_jp['VERSION'] = '最新バージョン';
	lang_jp['MAXTIME'] = '最大時間';
	lang_jp['CHECK'] = '最新バージョンのチェック';
	lang_jp['MAT_PRIMAS'] = '資源';
	lang_jp['ATAQUES'] = '攻撃';
	lang_jp['CONSTR'] = '建設';
	lang_jp['TROPAS'] = '兵士';
	lang_jp['ACTUALIZAR'] = '最新バージョンのチェック';
	lang_jp['ARCHIVE'] = 'アーカイブ';
	lang_jp['RESUMEN'] = '要約';
	lang_jp['BIGICONS']		= '拡張アイコンの表示';
	lang_jp['NOTEBLOCK']	= 'メモ帳の表示';

	/*** lang_jp end ***/
	
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
	imagenes["mercado"] = 'R0lGODlhRgBkAOf/AAABAAYIDhUDABgJAhAPCgQfBSEXBAAbTh8YDRsYHRcYKSsXAAQhQkcMAB0dGygcAzQYBDoeAyglFTEiDSYnERgyCzkmB0EpAAI1cSwuKiU5I10jCTs0D3cYAkMwEDs0HUkxC08wAjU5HEwyBD80HTk2KjU3OlYxAig7UEQ2MSJTAwJLiSNCYBpUIUs5Nz1APE09IVg8Dls5HFVADUhANUJHIVBCGEhBOy9WD2k7CExHIDpITUFGSWlAB1xANA9sHoI1EmdFDGRGFFVKKm87NVNFTC9ZVY42E2NNETVSdkJQYWRMGk9PTU5VNlBXK2FRH1VSRjRmOXNPEmJORlFUWHxPAGtQNHFSIXtSDWleF1RkOHFaKIRSIGBjLzOBCVlfZVljU15fXH5bHkBlk2RfWMI/CLRFD0RnjHlhHHdYVIlcEIxYIIlfBHBjN1dkeIdeGmhnTYVlCVpyPnZkPnNpMWBxVoBnOHJoXW10LmpxSIhhUZxkDHhqUWpta4hyBnJxSJRoHZloEm1wYmB0dn50KJNsJ99NBXZycIN+HoduaatvD3p3daFzIZV9DqhzEJ1+AnyFO0uEynp8eYh7W3OJTHGHXYyBOXl+gp96MHx/dnuCcLV4Do54e558RbF9I759CZCKVpqRG4mOaqiRCoGVY8iEEIqNio6XT8GHJIeaYY6RiJeRcpyZO5KSgYqSmrWaEJCVl5KjaM2SLNWTIZmcmaCehMOYSpyflpWgrZmmgpqiqsyrAOSbHaCmqN+gL5yruO6hG6mtqaa4jam1or23aqmzt928Aq22q/GsMbO1sqa6yMauuMK3l+fHA7e9v+zGAf61MbTHqrfDyrnNpvTPAbbI1rzKwMTGw7zSor/Ky77L0sLOvLzVrMrMyf3ZAtTQwsXZu8bT2s7VvMnYxczX2M3a0svY59XX087a4uzV0tze2tPqwdrm0Nfqydbk7N7o3tfo9+Xn4+Dp6+fr2ufr5ePw2d/t9Ob23+/y7uX1/fD26Pj37vb49PD7/P3//P///yH5BAEKAP8ALAAAAABGAGQAAAj+AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzpk2FknL2ctZNXbyfP891cwZLEs1e3fwpXcq0qT98RGEuxeePn9Wr/ARiZQoV1qGU6qb6s/e0qll+Z6+WReuvm0lYYcuSVTrXHlW7Y/PizUfVqtJrI5MpZVs2nVKqThEfXtx3cK9FHmHJG+xv8uR8S9NZ9pcOH7papOQZ5kyXaj5+iN1uDLMILT7EVEe/dtotFqtXjUj1U4p5sWHX/uJtnEy3stO5VPFtIxVqFzVv1EINQ6x56e7ZaLNibLx0M3HS8L7+kWrknNqzZ9SMnVJH2LjcxfwAWyxNuv7dv6dCGTNvzFiz89FJU9Z3xN2HmDMUhdUeU5iNJk8miDz3zC79NWPhebsIM1d9pAGHHIIRxcWZd03hMwwUUgTySnq7/PeMi+ZZItpclyk12mBoxQOiQyIy5eCNx3CgxiaKqLGfhf814x96r0Tj41K9TTYaWufI1xA6Sk22YVP5DKPDHkRuAkgj1FjYn3//edMMHt18V5Z7/vBVFT/9FGOlQkn5mA9Z96WzDh5qfLLJoHtg4s2LaCLZzCtOiJPXZhzqlWUyDUnpZpZKgROLHGiUUsqgmwQCyIVJomfMK4QEU5ZiTMnDKj7+aO2oUFNSLjWNKF3EMEIMWCjy6aBqOJckNbg14kcX47Bl2GTwuLesbMH1stB9bsazTR5bBBGEFG8EMYEUgg4qxijQKblLHB4IAYIFdIAyT282OjUVYtdImxCtecXThQUeBIHFEh70qogimwi6RyHG7GJLIzMg4EEVEVSSiw1/1IKPm82mgxmfeVUGi6wExVPfjfjMI4ITlMDQRitPfPKroJ6UIgQHSMywRAwBeODJBLmU04ooOszBDD753NiqWP4kQ+lBXLr3jRPDMMNJJeps8YmgqIS5CQjfcutJK1bwMosleQwjTC611ACHk8bJs09sTyXnzzmwINR2ie908U3+LS5U0o0UnpYiqCNEgiAEIJ4g44kPMkhRSCmegCJHNOxoAUUX9AR3jCqQDKPPm2NR9THTmC77lDpdiNMHBiiA8YQaQuzxqSOCBnHFG774YkYDAUyxTCKdoMIIKJXUUY4c8+AzjRMy9PBE2eps6U8vSxO0WJxilaNFLElgYIQGD8DAAQKAhxmEGJ74IosLKEjASTqcFOEJNLJg0kYqlNTDzz7f5OGBFFhAgx1qsSyqdKMX5ygIpuJlnHNwQAMrOAAFnsCvGIhBCpv41Qh0Rj8lMGAAMEiBBN4gC18gg34P0MTb0HKNGgzhCjmYQQ3Y0SpYqEYg5+iODvdWDjRIQQH+HwgBCEaAPlkE4moZnIABGIEMX0wAAULwRAwC0cQSMiIGA7gEO1yFj6dBQRCU0EINvqGl1/QiGwTpkcbKUokFwEEHskDFG2YgBFTI4o5bCNQsSsGvK4DAE3HM3R3jWIglWGAGF3hBNroxjW/AoQYsGIQ+hOGEbXBlJwQxXWbw0Y9VRGADG5jBGzwhBjvakRetwMUV9lCFCXhgADswQQ5MGEdZeOIK/JpBDCwgAF3kwxUfMIAEVuAGf9BDb6ShSjGql40ABEAAzgQAAAIAAHWswQxlMAMEAlDE3PFiD5mAhzkkMYAFLAAG2chEAgwAiCa+wQPwlEEIIvABSYTjF1b+6MEDIJCAHWCjHF2YpjOpWQx7/aMbfblKP/TBjmQcwRBl4AIMCpAFRsgCGZ+4gi6qoY1+5MMUNyCDLnBxCVpkoAQysIEHYhCDIIygBF/QRj6YQD5UBEIGEJiBDYbQBXYkNGnJSOA/nIEY14gDG9M4RyKAIANWQMILOODCJjCRiWrsCR3acEc++iGPLwBACUMhAwEQ0NITgGAR8vCoNqaQhg+MoBSoAMQMALGHLqzjKf9ASzYQKJBr9CUer4nGNszhjmqEQxuCwIEXVDABPlTDH+K0hzvC4Q552EMevfhCMeJU0AEI4AJQKAY/pLHZcIAhCsdYxASq4AtGAAMQYJj+Bnb8US+htokx7ShHNqqBDnf0oxp1wIEmZOoOZ+iBCL3IBznQ0dve5sMc1dCFTHVxA1NsVRcm+AIuvvCDH9AiH8pYhBiwYAddyEMd10DNU/aqDhwa6CnsYMc4pHFYczwXHv3oAwIksIAGUCEf7iAHObIhj3zowhKjeMUrQJENj+LDFTzggw3scIcWVMAEjwXvJaoBjwBHryzO0EV7/3GOyfwjL35hBz2skQ132EMbRYimNKVJgC9QAQDSyIc0/LAL9DzDGH7IMTy+YAdbCKETWwiAApIRDnLYAx7wYG40wLEUsiSjGCP2CVP80g+rTKMc8rjENAFQglIoYgwsmPH+NN1hjj84p8fP8MYrTNEPV8yYmtKk5iXQYQ908EDN00zAU3pxDXkI5LxxM9Bu+KEOB8yYFspAchLG4GhpvgDKq4Dzj3dBiGr04xclIACgM+AKyaLjGsPQRAak6YBF5BAfhCYIluBUVH+sWppfsKo7zhCJMQTCA9KcQHLJ0QZLEOPYdLgEPMKhDnSQQc0ZyEc+wnGNadSDKrQAQAYI5Iob/uMaOkymPw4xYwJ8uclMSEISCoEKaUZgAsHIxhfMAeVf3gLAfDbHnR1AjmtsQx71KEsCAgArfNgjHeqAi6zjVReoqLkPJbOGOWhBAzIoYxKinoEHgHCEL9ijHyCHBRn+eNAHdGTDHia4czTe8R4x02JLzuiFodMoL3+kfMYN5sc6wLFcc8jDHDyA5xjS0AELwMEUtMgEDATQAB/AQx7ZuHGej1EV6hDABGKBdfUGEhYSnQPQVceHPtYRjWtoIxz5QIcbIrGDC0jhBCcIgRBPUAY9RLkYfVCzKfLyGiYEwHRUkQcsyGEQEdXKFGq+QVHRoo9xsFiyv1DCCLAgC0YAQg2MaC0VnAFgctxCzVRgSjECYArgTOYasBCOQYxWFa/OOPQc46Q/2PGOY3A+G1CwwSzUd1Fg2IG31njH59TMA8NcLAEpwItsMHkQcjCGHzdQ8yXekxw6tUMc4TCHOS7+8QZUeH8TV/juNsDRD05WeppLWQQAwN0UdMBCqAeZNWJuPs33cSUt+HiHNchxT1VMohW6UAzkIA/3sBZMcGdEdQ4BcAjv4Sq00Av4kBA5tBkHOGPTRxaGQRZ8Ig+ooQ/v8G/0Rg7ccA/64BfJIWZ5tgz4YAImYHA+kg664G0GgQ4kg3gzhnX3pxSwkACT8Rr6cH3vAA7vYBXvFQzSl23LEG74oAvBwBDFQBwHB2jpQBa1gg/LAACLABuY0Q8A4CGMkQ5qZgIE0AeoERuYkQ2LUAxXMhr5FYajgRn4AAsAEHpwghoC0DEjMhZ0AmgJUB1MkXAgkxADuCr0BwAJ8DH+y7CDAHAIhGEPhAEASMMVhbhZC5QOv/B+D+EMrpJ+ogZoAOAASVgr9AGJfJclsOIPYTBjTCA3hpEPzkALaAQRzqCCfSEPtBAGL3ADJiAJgnEdxSEbAKAYxPEb/mCDAdCDTNENi7AMqgcRJ7cWcSJ7gwEbvFF1/hAANoIYvQEr5yAJi9ALVTYW3eAKzjBiIZKEHLMqpSiK90Fw2AMtW/IatdINnNAL5igR8qCC4oYXcBKOg4GN+PKLTpENsCBiF6EOWFaJmbExvlEVwWgcc8F6VMgZznAJyXCPFZEO0qCP4eYjxIEZ/ACQTpGBaDEa7tALsHCRHHEOy9B1NtIg8jK0GQRXKx9JK+ngCnzlEe6wDNWwRk1Rku7BD3eIPdczIOegCyk5cx+BD+cwi+pAIkdzjTpkGc+iC6aAQNohEvYwFMugGVAobvggAJvIIafmCjh5DhF4EvJADs4wi84wheEGkIGXDsswUrTQkmm5EvJwDtKgC365E8vQlgCwDMngl2ZJPSU2E/iAcEPhDErjDMt0Dd1QYll5E4nGRXl5E5q5mZzZmZ75maAZmqI5mqRZmqZ5EAEBADs=';
	// Imagen compuesta para militar con 4 secciones: plaza de reuniones, cuartel, establo / corral y taller
	imagenes["militar"] = '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';
	// Imagen de una grafica para las estadisticas
	imagenes["stat"] = 'R0lGODlhDAAKAIABAAAAAP///yH5BAEAAAEALAAAAAAMAAoAAAIVjA1wi82eFJP0RIhD1Xn77mhKIhoFADs=';
	//Image to replace the def1.gif
	imagenes["def1"] = 'R0lGODlhEAAQAPcAAP///xprJU5MlAd1CBRwGDY0Zgx5BfTy8g52DE9VlGN+Xwx6BRR0Gy0rVWObQzAuW0hGeBFzE0lHijteQAZ0CBJ1FChoQRNYKydmQUhHijw6fDc1ZxVxGRZ4HFBQnBpsJQ9PGT8/gEdFjluSQt3b3Pn1+JOclFmTQd2/NUVLjQdpBbu5vTU0aOnn6UZLhU9VlTw7bwp5BDp2SK63rRRxGdzZ3CBoOz16R9rAM3+OVf38/rm5vAxuFlRZnjEwXkREjhNWEg9kHBZQHhBSCzg2ahp+DEVEg0VDgtLU0E1MlTI0brW1txpTMwt4DBB4DlpaazFjMqKRZCFmNktRjRN6E1+YPXF0T0JIhufl5whcD8TExhNwGF5flnh8S2uAM/f29BttJxN0FiYlSYiOijd1O01Tkd6+LBeAG09NZ01SkQt4BA11DCsrVjc1ZgRzBklHi3eMISJnNUtJjmNhd8y7Menm6LScV05Tkbq4vBxrLU5MlQtNG36QexZvIBpULx5mMydnP2GDHBtiNhF1EwZOEkpIZA9SHkJGiEJDhQdYFK6zr2pvr0lNkAd0Ci5bLkZFiImYhcnIyubFUTk4avfy95OVlx9FJn10hyBsMRtpLiRpORV0GhBFHyJiPEJDgaCpnURGghBzEwFoA1NZnQp1Dk5NlQp3BS0sXG2DbV9hdUdWUgNJACxxNh1oPjQxYF2ZSRdwIoCrQgVzBm2HbZaLgkdFd0lPiZKdk7KytztAcmVqrSNjOnxyXlNQbzSCFEpJjSRoOfz9+zAuWbakektJjUtLnB1/IhtoLa6VYF2XQwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAj/AHeIaSDsgQ9XBWpBILKhTYFTTwCYyDIoQhgHZuB0CFWBx4QSALRMevTjUhRakuwMQ+ZBTxIYkQAAwOIoyIcAOMEkUqBDJoAZKmKoMdVIlhsKAwYYMLBA1Kw6lv7EkSLoBg4vrWwA03QBlcwvhUJIyHAoBaNfxBD1OuDTZyVOsPrsUUWiLQBcuVzYmlLmRQ9di0YluJPmSipFfnZ1khGryqtkJ0ZYwACIya0aQJqsKULFGJ1AZ3w5QUAKCqVgczS8kSOCCwpexQQIKMVihUwkQvIcY5XDShcymTAZ+tR2DKFNHAgQ2EKDAYgldgHgYePJyBFQStC0iO4T0qohfNjaAg0IADs=';
	//Image to replace the block_b21.gif
	imagenes["blockheader"] = 'R0lGODlhuAEpAPcAAP///wEBAhYXFwMIEhIREFBdaz4/Oh0eHGt8k3GCk2x7jSgyOyIqNDlGVYeKjQkTGouKh3F9lP///RgjLC0uKWtraZOWmmmBjSYnJlxdXVdmd1hXWEVRXUlHNlxvgIuMiy86R/39/f3//2+In5aZnIKCgg0MCWuClkFMVwoWL215hmR1hSQkGpCNiIiHhVVYWfz++n5+fvr+/niCinKEmjU0K3eIlru8u1NVWHd8hGZxeMTFxk9MRDc3N2RlZJWVlmN0ijExMmV8m/z3+rm4uYuNkGt1i7KyrLOys/f29bW2t4OIg8C8ib7Bwufq6mZ7lGV8jWp9meDg4f37+niFnf7+/m1zlfT082V3kP/+/dzc22Nrduzs66yojHiLn8LCwr+/wE1PTXh6eqCfoImGi8/Q0fr6+QIRBJqWlQ4NB+Pj4//9//38/vHy8vr69amqpqSkoaaqrc/Rze/u7ZudoXR1d62wqtXUy/78+xApEc3Mz3l2ce3u8I2RitLR0ZiWmniEk9TU0/X+/djX15aYlYF/ea6xskZHRWFdUMvFlZycm8G/wpCPkZqalWpqanp6dKWlo4J+g1JSUrW3scPDu+bl5/79/w4ODIeHc+fo5aurq2NtgWtpVszMy1dURoCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAC4ASkAQAj/AGHIEERQBIBBEAgECPDgAYEJGSYBABACgAwZIsxMGTJkIoAySFrEiFHiiB6KIULAEIhRI0ePIEWSNIlSJcuMGztOjDmy5MmUNi/ifLkzZE+aQFcKdanzo9GZP1MqbZkT5lOfNacObcoTatabTK3KxJoUbNWiY5FKNUvUadqoQam27Up27dKzbo/C1RoWrd6vd+deVRt3q9i/ZS/K5Tp4L1vGb796nDwxS4YACyJEiLJggAkBBASIHk069IABRhBE0HA6dGjRr2MTMI1aNesBrkfHhj1bwOnUq1uD1g2bN23gt3MXHw6692/bwl8zl30cOm7m0437rh38uvTdzat3/1eePfx25NGJT3fOPTl28LPFu/++PP556+Ths0fvXT31++O9V99++Am4HoEB0ncggPP5x9tyAXgUAAMBrADFBTYEQAFlHE5URQWYJRDFBSlg0GGHbHwY4oglnshhiiAuICKJJro4GYwr0mjjjSrKyGKNOwKAo486BilkjzO2aOSQSQK5I5M/GnlkjE1KCWWRQV6pZJZIRrlkl1g+CeaWYo7ppI1anukiG5OVEOFEAcQwmSEMTKABIDPowEEQGGDQgAozDPDmZEo8wMAKNEQAwgR58NDBGQbkMEEAY3RY6KGJLtroo5FOWimHlyKqKKOOQioppZYaKqqmpXaKKqiqZv9KKqenfkpZqLJuaqqnqWI6qq6u2kporL+2Wmuvq86666u3EssqrbzC6uuzywrrEa7FQsvssNMqGyyyuRobbbPdAnssuNlWiy6137Y5aAAlSCnvvPTWa++9+Oar77789uvvvwAHLPC/bkoY78AIJ6zwwgw37PDDEEfMb8ETTcGmFgQwoMIJUQhhBQinBTDABA1sgcFCKKP8QAEInDACEA1w0EADKOgwAwop58wQyy7DLDPNNuOss8o8vxzzzDXfPDTRLRv9c9JCL71y0z4jHfTSC03d89FAK4211k5b7bXURVfdddRDg2021FjvTDXXbH9dNtxXy/3203WTfbfYaOv/rDbdY6c9N96BC7732W3/TXjfKH8y2UIFXBAFApNSYqQEpymgeQED7CAv5gNorgDnnksJuuikf5755p2rHjrrpV+++uitmz576ra/TnvsQZ4Ou+uo1y677rgPHzzvO/q+O/C/537858oX3/vtws9LMQAmFLIGzhpccAEKD1RQiQs9GGBAD4VIwaEDAWiQgAINBLDEZEnsyL778MtPv/3tvx///B6pn43u5z/9BZB/+Pvf/gbYv/wBcCICdBEBHbhACTZQgQdkYAINCEEEFvCBAIjgiSaIwQ5q8IMVHOEFORhCD1Iwgxbc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';
	//Image to replace the underline.gif
	imagenes["underline"] = 'R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs='
	//Image to replace the att_all.gif
	imagenes["att_all"] = 'R0lGODlhEAAQAOZ/APT09Lq6ut7e3uKdOP39/bCwsOPj46WlpY+Pj7W1tfv7+8zMzKuGUfb29s/Pz+G6gb29vbmrlpOTk5SUlKmpqZ2dne/v76enp/7+/qiDTuzs7Orj19ra2ubm5s3Nzbi4uNLBqLGxsaGhodTBp9/f37KyspSBZLixp6x4Lefn57OISvDw8KOjo/j4+KaZhqWKYqRvJLe3t3R0dLN/NpiYmMSXU6x2Jf/QiLutl7V5JMTCv/+8WZaWltrSx+3t7c2LKunm4tPT06V4NsOHMczO0deQKtm4h9+gRrOEP/P2+vv49J99Sr+cae3r6MWAHKurq9CXQ8nJyYWFhaKkpf/Je+XayuTo7eDe3eXn6qNzL4V0XNeiVGlRL8Sxle3s6+zZvPbbtaSgmvT086yqqYeIiYFTEuCjS+inSbCys5dvNdXV1drVz4KCgq2mnejo6Ovr68zMzdyPIM25nbqwo5GRke2uUff39vf39/Ly8reRWo2NjYCAgLm5udHR0aioqP///yH5BAEAAH8ALAAAAAAQABAAAAfHgA4hIgl/hoeGAhUUMVILBAt8iIYWFAQaNAJ7QQAeHIgrHw0dEwd/BnpRdx8ChyUAAiwBh24yagoBHngIFik8E5MObBwtCRA+GgWmk399BwINdG8QfhjMhgESJB0IEteHT8oGChXMQEZdcERJZFNYVmgnDz2GG0hZKmAjYToRXw8wZoBAhOPGmR9LGNgYQIWJGERjUAyRo4RLmSob0hTRAsDQnBxO2hiy48XQFSFxTDR5AWVHBmvMXAyowyCDmS0Rvq3Jc6RGIAA7';
	//Image to replace the green bullet (b2.gif)
	imagenes["bulletGreen"] = 'R0lGODlhDAAMAMQfAILLgqrZquLx4heMFxiTGEqzSpPIkwmFCSSdJMnjyS2kLTytPE2mTm68bgF+ASybLAOCA1apVjalNiCRIOz37AyLDAaABwV/BQaABgiBCQyDDAmCCgR/BAeBCAN+A////yH5BAEAAB8ALAAAAAAMAAwAAAVk4PdRAVAwTSCIn2AWi/RMUTKaSzwPWiQEuYUCgeBdHIaGRDEkVA4Oh4chIRKcECnnMngQBhVIdmvpDBiHrPSC6WQ2DEPUw8FY3hqNQcColzcbeT4fCRFugYI2IgIGDBMTcSsfIQA7';
	//Image to replace the  del.gif
	imagenes["delIcon"] = 'R0lGODlhDAAMAMQQAMwzM88/P/zy8tllZfXZ2fnl5fLMzOyystJMTO+/v+mlpdVZWdxycuWZmeKMjN9/f////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABAALAAAAAAMAAwAQAVJIAQViiCKx0CICQAciLuYJ+MCwSoWw60UMtqp5zKcBAHAICFyABC6Q3KAilFFDVegFxCKkC7GaZxN4oSEJAJiuAEKiYdxbKCFAAA7';
	//Image to replace the bau.gif
	imagenes["constructIcon"] = 'R0lGODlhCgAQAOYAAP///7y+wFRVXuPSwlRXXsnIxHJ1e09SWnd8gXF0enp8gfT09djDsUhLU46RlI2QlMbHyP78+dO/r7q8v/39/fn18Lq7u8zNzeLj45qcnJeYmU1QWP38++7j2FtcYene0vXv5/Dr6Pj4+H+ChlNWXtbY2GBjabeqoPT19aqusWVnb0tOVo2QkY+SlFhcY6+xsKOlpN3PxFZYYHZ4flJSV6Gkp9G7qNTV1XN2fIiLkd3NvtO+rPn288rKy66wtN7NvdjOxtzd3+nq6tXCsWVnbXZ5f8LGx/r6+uzk3gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAKABAAAAdhgACCgwAVDCGEgx0SHImCPzGOABE7SJIgNjySH0OSAAM6nidAkihEPYkTKUYeEIRBLhsPNAoBJQALOAQNCCMwBUIUOSQHRQ4aFiIAPisyBi0ZF4MqAiYsLxiEMwk1N0eJgQA7'
	//Image to replace the 1.gif (small lumber icon)
	imagenes["img1"] = 'R0lGODlhEgAMAOYAAP/////+/v/++/38+/369/v6+fHt6e/p4+7n4u/f1OPc1tjUz9rTy9zRyNrQxfzIi/fEnvTEkdLGvfa/i+/BcO6+btK9pPSzgOe1g9e4lu+0b+u1dvGxiNe4ht60eOqwdeSxd/qradCxguinb+WnatOnh9+mdOGked6jfuCmU9CnZrSqnuWgcNyicdija+aeYrukkdqgVNGbctGadeOXZM+afNibVuOXXLeeitGaXNWaVLWcjtKUd9qXSKmckK+bibWYfr+UedCUSN6OWteSQbWVft2NRdqJRtyKOsSLV6qPbMWKRL6HZ8GKRZ6MgbuJU8qDTKiJb72CVNZ+NLaBadt7OcF8T8l5SMZ1W8Z4Qq96UsdyPqx1UrB3PbB1P7BxTLtpMaNnPKRkO3tiTptQKHpYM5BSLoxOOGNRSIBJNoFIOHNKKnk7Kmw7LGc7H10zGk4yJ0M0KEUzJ1YsIlArFEUuH0wlEjgiGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAAASAAwAAAeRgACCg4SCChYIAYqFgytOPzUnTFRDVg6MAAtRJRA5ZW0xWGoEjEVaLDdgb2wbPHMGjDMtLhdpcF80WXE7jEo9HSAyZ1wjV2hAhQVjKFVINlBiEVtudweDA0EmE09hdHY6Lw9mcoUJRykfFV51FBgqQms+hQ1TRhxNTRJEIRokMJg4kpDxwABABildRAjAxLBhIAA7';

	//Image to replace the 2.gif (small clay icon)
	imagenes["img2"] = 'R0lGODlhEgAMAOYAAJBcMPHWwMahh7R4VMdQHP727ci6sNt6VqtlPsltT+rl48JrQtivpbaIZ96FXI9YSOjGr+m1iNphNrxqPvPr3dGomc14VOVsSZxxSeCeduPHvPB8S9u+sqFWLubhwLteNP///8iwlNJpRcmKacldMNdrNeSJY9JuS6VkT+17U9CCWt62l92HTcl5Wvjz8PjdxeDEvLxwUfTQsKZhPNephfHg2JNhROrYz9jCs8OWduFpKtW3pZtzWu/mz8xvS/B+W8lyQOzMsfR+Q+qDVqxmTPDHp/fy6+ZrQMyZZrdtS+R1U86betSunNh9WeaWaNFgK9uzo7+Pcei0kp5bOtdxOeR6S869tNBZF//69o9jVu6BPqVbN8SRZvKQYOJ2SeHRx61jQeTPvfDh29a2qs1ySs2DYNh+Uu6GVMxyQpNaOPLWxdBrP7eLdOa1jORmN+ZzSr9jNNCslNyynMOAXfb19PTjyaRmQevYzqN1V+aLVb1rSv///wAAAAAAAAAAAAAAACH5BAUUAHsALAAAAAASAAwAAAeygHuCglhYg4eIg3Q5RWFhAS8FiYcKAxF4KAlmQZOCODtsNHMnKV1FnXsCMhQhZSYZEVxxapKDYndLIzwDJGQ2aWA+DhCHVnUQIxNUWiwICwcpVSuHBh49UWhvZ05JTUpKXipyhntWGA0qJVMAM3pAWw9EC2ZSRntfHXAlQjN2FiJVwGRp8WNDnhp7bnwgcEUHmglrJLghE+PJkQtDEGIZU4EJkzAcGDBgogEGFCgMOLgIBAA7';
	
	//Image to replace the 3.gif (small iron icon)
	imagenes["img3"] = 'R0lGODlhEgAMAOYAAA4SDOvhzaaOdXZrXM/EtFJKPv///7Ozqj05NIR5aPDu62VXT+jeyTAkFYZuXKWXkV9JM5yEb9nSynZuaCQiG8y/r+3n45N8bGlUQ6OSgVZTTd/f3Ec4MYtzZPr38q6bkSEbGMK1pW5XSD8xItvOxIuFepmGeOXXvH5zcHpnVGZWRkxBMrWjlK+bj2lkVOTe1/LlyF1JOYBxXMO2raCLcz0rGCkhGUM5Mt3TyaORe3VwZurl4HxtXPn49/bx7JRzY0dEPYt7amZfUpaCbsvGv7+3sDInHJqFcR4hH3JVQ1NRUK6gmpmJfHZjUPDmzVlLRYFzZEJCMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAYALAAAAAASAAwAAAeFgAaCg4SFhocWPoeLGxo6BAEMAYceOEsPSkgALicwToUKFSEVHxw2FFEFMzgHhAoJPBAtLCkqIUcrQAVChEUYTTEdOQIXDwsNHAMjhDNJPEFQCUMiIDc1ND8OhDsdHSsoCAMZRkwXIYczDilPICsyQjMkiwoZESYTJUQ9PYuCPS8S+PULBAA7';
	
	//Image to replace the 4.gif (small crop icon)
	imagenes["img4"] = 'R0lGODlhEgAMAOYAAIhNJfn05+LHqcyogumqOqKFYuGRKvvlxLp3Jt+ybP///+DEicSISODQwPHp3+GqY+vGj821ncORQ/j39OGfT+CpUPHIdu7Xr/HavNx7GujHnPPo1cWgbtezjfG6W6JSFtvBpvfw6NiBKv778LiQZ+zdw/DXs96+oPKWI+urUOjUtuy8Qfvq0//13ujRhPjIbOW2ctS1g//mxfzx4d7Fn8mMWuzRn82NNvbbqfrt0vHNgObYvNq9jP/89uiULvTZvOfNlv/55vz59ezgtv/x5evbzPbq2Y1VJfjsxt7FlPfm3vLGefTAXd69pfCyVeTKivG3dvvo0f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAFIALAAAAAASAAwAAAeCgFKCUkIhg4KFh4obMTlGIBsbJyo9ij0BQTQ8NkkcAxdAFwIHAYMBQ0gLC086LzAQHT8CKqWDPTsRGC4eK0wWF0QNIFGHMyVFRjhOBChLI4rQUgESCB8k0dATBUcANZXYgyMPIhk+LeCDQlApBhQs6IINCRU3DBrf4A4HJiYltYeBAAA7';
	// Imagenes de los tipos de murallas
	imagenes["empalizada"] = 'R0lGODdhSwBkAOf/ABYJAREMFBIRBCIMBxYQKiIaDS0YACQdAhk3AEAkBSEtODsnEzoqBjQuBCotJiwzHkcsAEIwADgwH0EvMS1HDEY+EyNSCFU4FVA8DktCAU48GVY8BEBFEmU3BFNBBWM7AkxGLyhhAkhMQF9ENj9bFEVPUGxLAFdPKGJRAGpKEUpTOHNJDGRTDSxyBH1HEDhsBmNUGVpTOWlPJkJiLlRbJ35OBWVXJTxuG3lWCG9cBnRWGWVbNGNkIDh/CGNiRkh9FndnDkp7KH9mD2BpWFp0LodjEmBqaYJmKV11QV9qeo5pAZhjCHtrLVN+OnZmXXxqOXJjeoNmPopuAXdtRYVzA0aSCYxoMHtrUoRyGnJzV1SMJW51ZZt6D518AIqCF7ZwAJR/DqN1G5N+IJp7H1KhGFCoAmWSQK51HF+bM6x9A4l/WJeIAnWKV2+QSoKDZZCFOZqBOX2FdJaCSKeGBlOzC4KApZGMT3+LipGFe6l/X2GxHIGTcqyLKqOPMLePDpmRZpOSc7OUFV+/FomWgcWQBJGThK2aHIqdbIeiXnavSMCbAaWOl4KqYbqhALqcO7SbW5GqdJimhqWhhJ+khaulYJimkLenQ7yjVqSkk9SkEcWtFM6qFLCofs2rMcWyOMquSKq0h567hqCyseOxBaqusd22Caq3lqi2oaCy0Leylda+DJXNbbS0o9e+Wa/Mo8fBoLXGubjIqODFTLnHsL7Io8fIi6/G2rHJxrzFxcbEsLfVjs7Hm7jSnsXHvsfQn6jawMTXyc7YstnVrc3Zwc3butjVwMXb2d3Wtc/X2dXYzsHd6sXa+dnmxtzkzNfnzcvl+d3k09Dj/drtudDq7+npu9Ts59Xp9c/s9+vl0eroxd3vx+DuztLt//HpweTs2PbqtvTqvObq5+vsz+fr4fb0lOH02tb0//7n4+bv+uDy+/3xvNz3++321vzwz+H39er16f3zxPvzy/ny3fTz6vD34Pr4wPL18fn5yvH2+fv41fz9vef+/ff68Pb7/vn7+P3//CwAAAAASwBkAAAI/gD/CRxIkKC/gwj9FVzI0GDChw0jSlzYr2I/fxYzYsx48eLDgwI5cvznsd/EkyMRekRo76O/lvPs2cOHLyFMlwdrKvynsCLDjA1NCnQps6i9mEaN8rP3bt68cU/HJRsHFanMc/b+nUPIM6RIgj4pIjx38VxNe1iLhkv61JtbbG69QXM2bNYpWsWmQg03LlxMf/PO8UxYkDDJi2C9XqT5Ep9MvkepUoXrtpyzy86aMYsVKxKbQ6ZiDSsGrTQ0bNjk8aMnr/U8eefmJayIESRJg0JtynTslKo3uJTFbWsmjhmxYMF4+QoFqU2TJm1CiRZNa1izbO3yaW/XTp441MnC/vkT/LGrw35mizp+bO9tOXGWvV1m5oxZMFe8QjFC9DxIEOiQhGKKKbQcQ0021IADTjf3xANPN8ewkksyM6m0klA+9eQPTfhgtRZf47jVjDPF0bdNfc4kxwgjiSSChn833OCfGfuBdkw34MSjI47dxAOhJKwUM05L4x2m0E4DlZQWTfb41RaJKNbHzInG6cIiGmRUocUNTcSoRZZotAEJLdncQ02PO1IjDC2hDQPNkPigd1BHO3lE1kVN5hkOiPKJI6Vx2kiDWShY0qEHGS00gcQMN1RBxqFoIOLLMe2Y6aOPvrwSiWjOvDkPY1wh6dVLM+nJFzQjzmccMbG4Io02/tCUo40ZaECqBRtxqBBEFXrQUYYeZtRyTDDCUENNPtQEQwtoxBg3GjLixUkWRgvlpFZs45Q2zDCYsRrLLLEQUw40/DjDSxMwIgCKEXs08UMPWf7QBiigsAGJL9TEIw4tmw7DDDPDnMJKL8hsJZR5t81p1jl8vZNMMbPYZQoxzWKmTTmWyTMLNO/84sAdhQwBggNbEMMGAhbcQAInPljQAgU0mAmIKcMQU1wzpgyCBx7FtMSTSQcDXZtj2Q4DDCynYFLIIJX4u83TzJQTjje8EEFEExaQMUMBeACywBX35DJCMZyYsugNL/Twwh5EUBAufaxOksUUV7wClUmihsTS/qnJAMMKJpiIIsodQ1RS34nlNIMxLWb0UAUddFgQxwNscIBEGztMEY/VFrhcRQudo9HDDbz8S0wkWcTwhByPYIPhbQ4dNQ80dcEiCimi4ELKHXHEwe3T5WxzMRst0CGIIHS0wIYFaISgRQ8/WGDGl47zGkIPZSBPBiSzBJzFDjAAIcYl7eRdGKm024UJLrggg4zud5RQyYjiaLMNO6aEwKuhhjpfxuOCKIPoyHA845FBf8cTRBUYMYtKfA8GOeDCGDyBDWpRpB/4eMq2GliJSrQPGdZ4nxGMsIVZlMMb7GCGN9jwA+TBiw5VeAEaAljAFvSgV8gThB6ap4cftCBR/nsQmQ1yIIQucOET7chKRJ4SsViYohKDGETudneHLRghDiKoxJSiVo5fhIAMvqpCFUKABAuIsQpqu0EIsFSG/40xRhTo3AxEEAMbsEAJXODCHD6RjXlEpB/vcAVzQhEJKA5iC0PYAiKHcIpK0Oxp8NlGLGZwvS1ZgAKsAMQl4UgDCsjocz8IgQX2AA03+OABKgCBDIAgBC50YQ5+4KP5BuIPZuiHEaBwxYBCE7HLEKNmzNCGNthRjkiwgh/ECAURVCABVuziHOLQRdsQ4IYRgOAUKXtB59zADnSUIxQiAEEFhFCELhjRD4H4RDfmEZaQ8IQfvFjFikLhimAcRxtb/nyaMJlBD2hgwggioFQ7AEEESFzBCeA4hzyQJYMr0KICcstCJUSRDFqMgx2xKMEDJAADHFBBCuacAyxb0Q3BMOQd79DFKhJhBkS4omL/ut+ILFMOYmQBEKmQR3bYcAMtBAEUTvhAHuTwBko8QQMicMIxQFCJUyCCEW0Ihja2QAo3eEAIrXzlHPgwB0c44hh+PFhW+kEPbah0pYyAxGVOWI5h0IMe5WigN/aVD3jEA1k/eFQLSOADK6wgBTA4ggs6kAAZyIADJNBCFcpABjZU4gA+sAEQwJDHV6bBiH14RM8Kwg+FlEMaq1gpSyEhrlh5gx7OiEMxWCEJ7cTjHveo/oc8hJFXOhwwC8c6Ri5ScIbeKuERPNUD8uiAABFUwAMoGIMRlzuHMfBBDpwohmzC4g2ZlOOsehgtMZxBj+6xwgeTaEY+XhsPcMDjG3ZVByVs+AISAIIeuRjYBc7wBULIoR2zmIHLbmCBABRgslJQQiC4cFk+cEEMcvhDKnomKme4gx6/UGmL0GAGSASjED7ARCoAMQlx5EMd94AHPBo03nqYiQ1NIAENqEGKwtGDE2FIgwkAsQ133KISM0CAAARQgRyAoQsCNqc5xQCHP3AiFeHpiUCG8Q5vBINFLgqCGUBBDUm8wsPjzQeD6gEPcIT4QVzmDjW0QYss4IEW7KDH/iHGcAYc7OEe2nhHHBqwAw2koA9dKMIcuhCINKSBD3x4gx0mcQpYrEVUxHhHFxkxPZ+2wReu7ZGIwVEPcLRDRyIesT4sHY9jcEIevdAGnMORiiV8oQZ7eMcwdnCCAcigCGDYqhLmwAVFzCEQXUDwzE4BjHDECXbEKI0rGG0GKSPiGPfgjoJEHI92oLfLIlYHl+MhD2z4YBD02EY2MEaPSph6CW4wAgQagAMwFCHGsFxCF8KQCXTCwQ6cmEQsYGGMtRQk2OWIBbHFFIpka9lBmDaveZvN7HxwAhDiOM39LsZdTHwhDDXYgQL6IAIx5CAHVFgDELpABS+swQ9rEMMb/v5A6FsAoxrpaOc/gJGtWEACQKCgBSckoaN4qEMd8OAOzuFxLO28ghlqcAN8LLMNb8iq221OAAYcYIAALKAAAgBABgCwgAUIQAML2AG8JVFoY1xjGuv49UASXY1ZQMJeoEjFFVAgg0tnuh0ipgZs75ENQGBiC9mYUvCc8TRnyCobqTgDBgxgiAYc4QAHsMQEGsCDCMDgBALYAAOGkIpUFPoWxpjGNNKhxIEMYxxlPwQbQCGMVGjAEkwYr4O+wekR74IatABEM95xP3bcbxs0dYY02PGHMwyAATk4wAcOgAIPsMAQDHAEFRrAgDGkYAiD6Lrmr5GOdMTpYO+wxzhg/rGHSOwCHKkYgSHgoKMvZ1pHr98FMQqRDNRuI5h6bwY0pAGNKXyBARjYhAY6UQFDSGEJhMACozAHDIADmZAD10Zvmad5m4cPBTEO/hAOubAFbvAK4CAMC2AIOIBsc2dXNQdb1HAMKrAxzpBC77ddzFAM0tALO/AFFVAEm4AChBABmoADUpAGKTAKXCAAUpAJMDAEomAMysCA61B9YicQsmEPvZAFavAK8SANEsAHVkAL+WB+OnJpDHIPwZAFWDQIwYNP2xIMr8ALtyADhAABY6AIHaAIHqAKOMAHacADOigAa7AJJ7AHXseA12AN1YcO1ycQceIPvaAGfyAMCyUB/mCQBqnQDjfXbK9lXnbVDe3QDX+ACQdQQnWxS5Z3BaZmAHMgBDLQBRkwChmQCVxQBKNwBALQbipwC5pnDtewDtewh2HngLDzEsWgBoBwDPCgDyIAA2mACfkADurAHfBQjB7oI9qRDZPgBiUUC5UQCdLoBiBwBmNQAH6gBCkwByiQCaMoBFJQCjoAAJugBENgDOtgDtMAi3s4DXz4h4txDoM4BX9QDPGQBAwQCHhQXiKmc5k2YjeHc1XIDLMQCVHUfSrwADAAAwDgB1JgAl2QAwE4CjjABaOgAxFQCjiwBWBnDrI4i9xgDdbgh2KXE8eQB1hwBDLgBE5wAIagBvkA/ncOMnCZJm31UA/SRnduoALSGAmQAEV/MAQHkAlUYINS4AcwsAkmwAWlkAIsUAoocAfrMJXmYA7WsIfc8AwjiSEvEQ6v8AhiwAVhgJEAMAdqwB0+YleZNndz9w3fYGL8MghD4JMdVAlDEAGjIAVSkAM3qANK2QWlsAE5MAobIAqyOJXrYA1Z+QzRgA5+KBQtIQ+5cAkElgaB4AUDEAgYoAapMF7QNmIDp2X3YF48IgyvAAh7cAiNZApGAASjwJd8qQQoUApK4AejAAFUsAkNcAseWZXcMIvK8AzPwA2MQRJoMQ+7cAlgEGNpAAYDwAU2YAAggGxrqR35cAyAEAN4/oANyuZswtANqfAHwHAKsSACg1lOLDAHSmACqlAEgUCYhpAJIqAM6VCV5rCYz6AMI/mYQ6F9ufAIY0BgYGAIA1AENlAAB4ANNmdXZsIJ1AgAASAAB4AJyiZwT4gLcUAMIGCRQpAGMjAHRYADpXCUipACmqAITrAO6ECV+MmHYYcY/yA7ufAHQFAEN9gHFXABWHACEiAMxlheQ1BnAzABAcAENAAAeCAP5KAO5HAOxEgO0qAMC8AHgTkHJqAJXLACqsAFhJAJLqAJa5AE71CVs8iYivmOf/gPRJMLgDAFTMACJpACV/cGiyACwvBa7WAHEGoHWDBZBQABBtAABbAL/rEVD295D8OACXggARkgBABwAACABSwwABjgBRjgAVLHA1CwD+m4mO2ID+mgokjyGL1QCW6gBlMQAQCgAhUQCFCAB7u3CxNQATAgABkABl7gBwzQCRGQARKQC/lQJvVAD5SgARiABTIAAiBAVXWQkFAAUEkQrUMwBLZwDb8pnM9Afe4QDkYodr4WDuNZCYcACD4gAbTwAH4QBbESBxxAdSbgAV5ACBugCAyQCRsAA4E6CfkgW5zAA57QCp/QB04QC8BwDfd5De6QjunIjpy6DllJnOngDtZgDn14ML6GD8bQSB0ECA1ADA6gCEeACQ8QAHYQAXiJA4HgByaQBvm4/gJisAA8cAD6IAxO4Ait0AmBwAd90AdvUAnVUA3LYA77MA3cAIvV4A7mUA2dOpXuUJ8iWYQ0IRR9EQ7G8At7EI1uwAHM4AAswJBDMAAsAAauuQKKUARFgAUeMAcroAkRYAAHIAk74AWtwAc6IAVC4AiyYAU7UAjpsA+xiJhKW5ULW4RFKJKG62tKNiThgAwdNAioEwOn4AAAIAAFwAIJ0AlcAAajkAKZAAR+kAM6UARKoAqWQAAMMABwIAtFIANggANw4AkygANYkAJ4gAwNW7TmEA3p+AxFSLH3KZyzeA3VIB7Usifg2kiR4AZXAACSKwABQAOG0AGZUANzkAko/jAKPEAIGmCjNdAIKNAATBABcFAETGAIKHAJj5AAJuAFJuAJlLAFtmAO5VCE3DCV1WAOCXuf0SCc1qAM1VBvh0YS0BIOvXAKS7MFIEAADZCrEZAGnYABo1AEfmAIMLgCm5ABXQAEOWCjnhABlOsFhpADlzAGEFC+G+AIm5ACcAAEkXCf6CC01bAP9euwnvp1xgAMwEAhShQe4ZAMrBAHWxADJ3ACWOWNmRAIG0CbmwBk4qibYZADOIADXWAIEeAAE5ABT9AJY5B4gZAAfNAKCyAFhkADb6AGuou/sOiw1xAN+zuL03DDsJAL0BAOQFMMe9ILhbAFPnACKOAJauuD/qMABiaQCTBIBUqgCCIaAXPAAg9JBRsAABIgARUgC3IwADqLAX3QCh5wBG+AAjnQChkwBYa5DjIMi8GZrdzwxuN5ChsTEwLRC3zBplNgR2CgCmNQm7MpBWIwCkKwCYmYjbqpCCYABh7ABQYAABFQADYgBAzAB2PAAH3QCRoAA4YwAuWbAP7KA6aADrq7DtMAkul4wxHTPUPSEUKSDK/wB0yABUIwB6WQA2lACEJQCkKwBpkgBKNABX5gRIpwAI0AA0qQAX5gABHgCRzAADAwB2KgAZ/gCRegA0gpBXJgAEIwBn3gCB5wB9FgDsowiwo7DUdzCjTzebIhEHaMDa9w/glwIAUE9s64JgWvGQjynJd+EAaBEAgMoAgbwAUeYAgaEAGNkAEw0AnI2gpzkABMwAcfYAifkABYQAUJIAZzcAkyMAS3MLT26Q6rTAu0QAzNMCQ7ISTYkJx9kEe2KQSZYE68vAmE4JpHGQZLLAGbAAFpgAKKsAAJoAgZAAReIAMBuwNg4AcncAl8MAJe4JxiwAeXgAJAIAc7IAr1ScrvcAqRYAov5QzYANYKIV1jTdh5RAiEgAWjcFkHqAiEMJg5MAdh0AhLAACacAFLwANzEAEbkAkAIAN4Kwcb8AligAKfgAUMQAVPMABY4Ad8wAGf/AlFcAWkQLHh4Lih0SzM/vDVFfIP2BAO2CAMnp2GijC6YWAIiLwJfrAEpUAIfuABPKCsjmy2YJADnPsAv2gJgTAGRSAElqDbjiAFECAHhsAFG1AEsoAFTAAER6ADecAKW5BF31Ix3lDOCjEO1ZacBpYG7cYFmYADiqAILqAIXSAFmxDBGLAFg4AJE7ABa3C2QiCDD0AKcjAF4QOwZisLfZAAVuAITEDNrRAFJkAFHpBZYPAAPuAG0Rcu1tHgLWES2DAPne0IP6YIMRbBjbAJS7AJqmAIBrABIwAId0AK6FAHLCAGw8wC8KwAt7MIMfAGlpADStAKmqABUWAIztcKrQAELFDgYiAEhkAFGlB5/lkQCeTJLUZOLU6R3ZcAS12gCGngB9OrCFWuAyiQAU6wC6BwB6IAdtZQAsE9BxDwiQpwC6iACqKgBhFgBa0gC8Vs4yzgCZ+gA2/gBSlgBUzgCUzwBBCSDaYgjUT+JsTbD4OenI7gB4auCJuA53k+AVfACtDQGf57Dc9QDqiAAbKgCHmtBCJgC7bg6agwBE/AB0WgA+O3AoGgyXxw42+wAZawA2BzD93QDdmwC69AC+HSDNhAJP/gFLN1CcDuB37ABYbgvb93Am4wC87wm/f5C8+wDNfwCxIgkRCgCDmgAstwC9iOClmQAeUbBSzQB5fAApZwCQsAA6mO7rC1Ixe4/iYFIiRE0g8ygQ3HQNiwtO8sAAQSIAJEMAOQYAvGIL/csAzckJXLkA6o0AA+mAkXMATrMIQTPwgcwAKOwAdHgAGfoJlR8ASWUAFgow/TpiAJIgzCQAzHABUgIRvzIAyUwAdahQVWj5oB8gvKcJ/coAw7X7TcUA3XIAIfkAGqUAFSOQ3LsAzXfguDYwJPYAViIOMyMAZYYAkRoAYmFg8mpiDgwHrsLgyo4TO8rvItPwZU0KdM4AapAAp7wJs+3/fDaZ8LawsBcKUFcAtT+c3PYO3WfgccAASyEAYrcAlr8AQR8AcN4iDMtiCQv+6pUdIkcRDFoM42YANBNwl7cAqu/hj3z3Cf9lmfVbkPzxAAYvDjbS+Livn6toALQXQCMJDJcBABGMAJ91CFaun7PLcg654N8sAVITEPmKAGQScJmDBRmdfRBou7vkv9AGFOYIkGB+5c43bNHDdr1sLdwrUHDyYJLLAwuAIu3r122eDFgwfv3r2P4Ey2ayev3z+WLP3Zy8WqUqVTt4whe6ZMoUCB7tbx5LlunbI7hYQ+E7guXTVnqSbdsTcIBIcGarqB+0gtXjd44EaGNNlNrLh5/vyxXNmvH7ZZlWABs3YN4U5z19Zx25d3H7eg5qqZ22fublx30IBVyhIpHDtpweLEyacvX7yNIUOOpEYSXLd4Keep/m3Zsl81Y8amCd3586e5dP/2pUP3jJtQwUL5mnO3zx2wU5FMmWIWfJs2WqbuUcs3GeRHsF05i82Grey/laH9pTN32u60urWFptvLLVq02YH9Ltz77h3vPXu0aRu+rZyz966y7JlsOR5Wk/dMxstGHGzMCi00fLi7ZhqF6AKsn33QES8adLCrRjV3qpmmGmJ628MUX+DbZhtmnHGGGW2cieUVWjgR6yRw2jFps2488we0Av/BZ50FT5vmNJ++I48bvlRbp0djYDmlkkiWnIUYZrJphkQnRxyxxFhMoUWbbGZsMcZuspFnnhvR6gc2uc4sUql0rHnmmWuesUYpwTIE/gaWSvDIYgof9ogkFmdEJJGZZoghtMQRiSmOFlqEOUasFrvJB6XpqisQnwnXjGuahhpq002dEpymNDsjyWKHEyo44YQhTHFGHGboIdEbQ0lsZsRgXClul2OEuapXlMIcU61+8LG0oWs2vSa2hpSxRsGbbhFlkD3c8OEEDDDYAIILYhhkGBOd8UZEcQwNjhlinCHGlWBiCWbXRrcE87Mx0cIHNmvQYfNNZtu0RhllQoV2kC2qPbWCDVJYYQMZdgAkl2YA3eZPcst1kph1g6Gl3WyyaUccYCkNTS1iY+M3GmXgVMa0BFPGBZMrZEhBBg2wTaEGHFZYGJAmo6SymVqb/hnGmaCFlpJQYYg5Bhtv5KnxrAKrGxad2KLpd9NlSysNWkCm0MGEFT5IYYMVaijChBSuUMOUWM49VNCKzS2RaKCHKcaZZrCxpyyngx3WUnytdmgaZKZJ+UhM/rCiiCWW+HoFHIqoQYcUngBkkliGIQZzoQnN/NwoSYQmdGiaGWcce87Bx6wan/6n6ZGlDqchTUM15pY6T5FEDTjCWLyIFRAuIngdpnDD8p1rtZtQzInx2WdvoCm99HDwsccskIO1h9h0wlkHn3DCqSac0upkhRVA5Nj9jDNwSCEFHY6w4ogn1PgjFVMyx3wYoH0WtJnQvSndPMYRDnuE4yX+OMdZ/q73tAP2TSjo+J4xknEkWLBCEn9AXxjgYIUoPMGDagBh5U4xi2EMQ3T+Ex00vOENAfLDHtWDofUWyDoyEcuGB/peMpKBjF7EhBOveEQQH/EHQEjigkZMBStykYtkFCN0KBTdO0z3wtRZL4Gro04W52UjtZiFev7w3vdKh4xk9PAVrzjGGZNYPiX2sBi9GEYyQpeMcYQuegR8YfW6KCwCaXFeY3LdS4hVwHOE4xyHPEcxznGMRDYSGWQMBzIiKUYpBvAd9nBh9bK4NwXOkG9ocUkXszfI74UjGYhU5ADDMY9CllKMYswjFfHRD9XtzSWg/GOwyKQ6WpolewUMIwENiPm9QcYyjLHMXh+vBxob5VKXIWsdAmmZQGQSC4x5PEfffrnN6lXRlpTypDNvlJbWCauctOxHAr+YugSqpXq1pN4saRlNMoVTnPe8kVmyWUsZWk+aq+OnDO2JT3wyUzS9rCXUOhlNgLbOjw8laERpSB1PzpOiWhTWQCW6UWge9KJ/BJk5OVqggAAAOw==';
	imagenes["muralla"] = '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';
	imagenes["terraplen"] = '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';

	// Imagenes para cada una de las celdas productoras de un recurso
	imagenes["r0"] = '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';
	imagenes["r1"] = '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';
	imagenes["r2"] = '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';
	imagenes["r3"] = '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';

	//Image to replace the sawmill (g5.gif)
	imagenes["sawmill"] = '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'
	
	//Image to replace the brickyard (g6.gif)
	imagenes["brickyard"] = 'R0lGODlhSwBkAOZ/AKq0nZukj6KrlmpwYU5SSJSbiH2DcVVZTVldUF1hVFJVSkpMQwQEAszMrO7st+jmssPClvPxu+LgrvHuuqWjf3p4YZ+bd/r1xm1rWLOnVfbmdt/Qa62iU+zcctbIZ87AY72xW6ecUTs4JMnEo7OvkoF+aZaTe0VEPFlSKMm7YJ6TTHJqN4J5P3hxRkhEK01JMi4sH2ZiSlVSQF9cSuvkveXeuNfRrc/JpsfBoJSQd42JcYmFbuzlvujhu+fgutrUsK6pjWlmVZyYf3NwXlJOOpGLa1tXQ0NAMu/nwOHatZmUe/PrxOriveTduOPct9PMqsC6m7mzlqKdhBgWD5GLdM6kJGpYHlxUOqB/HVpJFnthHIxsJqmDL0AwEUc7JWlCKVo0HkcqGe1nJV4pD4Y8FvtwK+VmJ+FkJttiJdNeJM1cI8FWIbxVIKVKHJ9IG5JBGfJsKu1qKbJQH61OHppFG49AGXk2FW0xE2UuEkAeDKBAEpxBFb5PGqBFGUohDf///yH5BAEAAH8ALAAAAABLAGQAQAf/gH+Cg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJl/MHNra2h0ZHZ2aGhyZXBxa3czmpkYbW94aWdkb3JkcHBvamRjbXJ1ZWtvaGozTk5JST5MIgOuil5saG1sfWZodWpvsatkdLhybG1mc2ReVl5BUEhLPstJSBXRigNzcGx+UyJGMzEYZmAYUsEImFhDdlRAksRJjQNESvzgEa/GkiAGBhjIVMAOnTVy8IxRA2eOnTts0pDpI+cNnTtpypyx44bPnCs2dMQYAq+GDSgkokhJkoPCjyE/b5TQsQNIly1WRGypguXFICpdqtAjFKCEUCUY7vBJFYeOnTptSuERxycMlB7x/+LRUCKjwpMKMzZ40KtiQwcOHjqAyKAiQ4YYQEoA1EHgjwEUWSJvyTKFi45BCQSUQDJCBpEXRGAYaVfDSZMmPkhIgUtDCIPXU0oEaUhjR5AFKzx0ccHCg4cUGz5k8BDigwoSMzYKGgADhogXFYZAWwTgSIUbTX4kacIDRwIYM4zkQEJCB40kPEy8ZjCliIwbPHrEOMDuR46tfwIYYfEhcAYKO9SjSAIDLBBDDgkIqOCCDDbo4IMQPtgRG3aEoUCEmlxxRh1jgMRGGW3QQYcfZMRBBkl0VONHHXaMIUUJMGBIiAhtuIFLh3G4oYYZdLxRhhxymOEGHm/4sQYcfAzxQ/8UM3iRhTowDDFDF35EiAB4FcQABhkx1cEGhXOUYQcubXwxQg9N2AADeyLIQAVF6AXBoAFfoOFGHUSWAeIYs6ihRhlq3BEGDEQMQYQMLdgGV1w1QGFDaTbM9oQNJTgBBQ7TITIAFlsUMgYcILaRCxt43FGHKXaQQaEcHqFCR4dofDGUMujtYMQQPABBQRTNfdBBBiGk8IERUVyKlBAidNGFFVxoIRkX0G4xhRZWCEAIADnQ8GgSTzxxAxRQJNEAFV+MZAYYDTCxDGczTLFDDDY4wYNOMxCxQgYfcJABCyCoAEK//3agAhUVtPDCFFcYcQURQQRxoSBd6FAAszqUAIH/BDfwlEQJIhAhwnPNMSDDDuACQcV5SJSwXnsz2MBdDjBUEMEQFavQQQj9qgCYByDsIEUAChqgQAlJXCAFBkKQtxB6JiBgrYxQRy311FRXbfXVWGet9dZX1CELG3/CcQarRmyNSAxtlPGSHX7E0UkZbqjqBx1tzGEGHGqc4YYXVweAVig5hjPmGcXsMscbeaixRi5i4EECE0wAMYXUGJDh9UxjEhOHSnV0DmiKd+TRBh8YLIODDVLEAAMKXfD9oBF0xNEHGWSckgYdcYcjxxhz1EFG3LnAUYcILqTTxRQzQEGDD/P8sQADEMLgBR1msHEGHXXIEYcfdQeKxuF1rEIE/wUW0UDCETBs1hATMch4xBSeyRBDBRUosGVaadhxuxpTwPBDE8kQAXvWJITzyGMID/oCHc4wBz/c4QyoWMMYYHAE+QUkBiXYQREsQBCGLKMG8IgLDSowhRKuRwQIYMTTEmGCF6RNDRwK0+7esIZQmaENdbiDj+CQhj7kYQpEKILGPoiDH1BgBFFAQqTAhYMd3EAJI5ATxKxwvAIIwgBawIIVC5GAT7ihDXdwwxw2pL9UkQGH58BDHHYxBjnAoQ8S8UFtZsCTHhRLVxiYAgpYwAIXDKEJN3hCCcAlhWU5CwtVqEIWvDCdyrSPECY4wRfkIAYz+KkcZJgDG97wBjscKf8OdujG94bQkLjwwFa4IgGMMpACFRBHX39hgRFegIIUdOBXKogBAyLDLGhBKwtPOd4gCrCDEYDrCVG4AQl28IU9qCFMatjkGvhwBScsKgk0GMENlEGDHMRgBkqIgV4AYxi9BIcFOjOOEtAXnhh4YQYL2OIfpDAFHSQAC1a4VgmWYIOP7WAitHoCFH7gAyYJgSJM2MHKimCEJ3DnXTEgAgiA08q9uLKVKkhBCipAgeZ87AouIMIRYgCFCzwgQV3YCAyq4ALnBSEBQ1jCE2bwAhfE4AowmAIDYPA4ZpDABOpKz8ps9QMnzCUGC/ACCrIEgl8FJmcg2EAFoICfQgBgEQv/KAIFcmAEH5imB0xQwglEqlMFiOAE4CoBRYQKG4Y6FAlBEAEELGCDCPxgCn3pTwc2wAHB7IAK9SjAaJBQg2XQAApHAAJ5zIPNHLwGBhhIwBSGkCBHBGAGLjgB0BrUBBMgLwcXwMEQeuCDJeggU2ZLrWpXy9rWuva1sI2tbGdL29ra9ra4za0kBlBZ3IZBDWuEw+LCgNrX6qAOabjDHMZwByGZQU9nKFNxzXaFNZwEDilSCRtChxI66KkMaHjDCy6TNRPUYYxuQEMoX1WKN2yOenTAAxnu4AcznAEMMbKaAe5QBlL5wk+ngKGoxmCKtAHjR0ZgghOeQTUYnCEN8n2D/xv6i5Y24EENB87dGOwAhz3sAE5IGEJ+oRaGH63lDWYwkR3mUDcQASlVc8DDc+1gAR4oowlMiMICJiejOsQhD1+aQ1nAIQc6WA8PnryDn96QBjV8oQHdAoLqnnS8PCjHQVdQA5LVpgazNDcOaFGD/kwUB1FljwwkqIAIIjOFLgxhBBfIYx6swqAYsEEOdwDGG9iwBh3l4w5oWIN34wYHmnyidVYA5gGAQINFhThCBXhBHZ4bBzVoTw1thCEtfjEiNMikdUZg9BKS0JQQIgEDMkJAXMGwhzPEwZKdc5ty72AHM5hBDzGQYxOg0C4YvODDy+CBFCNEAELRUTFeIAMfyv+QP1G1AQ5oyIMIGqKMNfUPBiYAMQIjlIAfiuAIRIiBP4YwBCMQYcWgkkMYYiCDZCjjCCM1ghQKG+xhN0gAKHE1HOSQB+fEQNwxCMKBdPAZC1RArctogg6AwAR6J6EGP1AdbBhwBPK64gttiAMoP7KS2AmXDBT8hxEiaoQilGAIBoyLdhryAwzgwAQymMIJgNCA6RKiAKxrxBBsYWI2ZO8NZLAkGeSLhjNA2w7OgcECgiDEEFYECDd4lA0wEAUdSCEHIwACFDJlAAQcQJ4DyKIiDKAjLmFPG3i2ry04zOwTdU65ZeBDcyqAgUXZAAckwPsThDDQCuhKtDhYuGgEgUj/LHShbH/QQRaqcGVCXGGBtRhJeJFMEjL4IUwmyuSeyXCkPoABABewFQZ8kKYbACGZJTiBCIYgBb9TwAasp4IUvKAFLlhBC1O5wiAEMIUqoJoQX9BkHPCABzQUegx3gkMb/HAK9UoYfJW+QwyYUSsjVMAHpoeCFEQAA+DsNQNDuAHqi1bILWzBWVwwPBcmowAGYGEFhUi2q5f8Bry1xA4Q3K4b6Ea7Ho5BCEtAK9VXATxAAjlABXiVAhwAAvyyAenzLTDgAi4wA/oCA11Qe77kS12QBVvQBQcwCAFgAFEQBHfgRmKwSdYAZnjAQEPHYawSBD7gcMFGBdbnBBQQBCvw/wEaFQKF4S975Rv+sRMmUATNERlPsgXQogV5gAUIgB/EFAVa9wMmEATNtGxpoArzlTZmMAZD0AACWAP01hpGgAHnowIawIMg8AE6mAL9cksq8AEzIAU59TEjNUxXQBk5xQXwB4JS8AOX8i3fggMjYAJfoAfGEAdoMAYz8AS00gM0sH0zUFTzIm4VwC/AgjMhwAEbkAFNpYYd0AKuIQJXcAUrQARL90iC4AUFUAHmVwg7wBAU8ASEpQzdAgU10AAlAAaTZUBNkAM6NQVK0FAPxW541VT9wgE4wzP8AhwtgBwq4AIIQwQgFQQUAAGIlwUl8AdZ8XsAsAAVsASdcQIUJP8EPgAXNXAD2rQEuhJUVLAeDFACLSMv72IELZCGfrGJGwACHsBKIcBXSrADHcN9EvgCFVRSEEAPH/gHGCACVzUABXBy4OgZE4hT6fMD6uJTQgAXPKAE7giPMxgDJ8ACGbCQroROyPgvrtQCOPB7hDAAAnQEinACFeAAsIcEN1BCvjYD3KdTGPAOSAAEShBUCtVW8dhNQRAl7fICG5AC/biPxbGUFUACgDUJRfAAF2ADMQBANokBCxAaOcUA3AcDClB158ED7dhWwjgPMFAsEDABFLACGsCGxcEBKpBROpADliAAXXcE7RB12GQDOwBuYpkAJnABULADZcmR6+Eeb7V+A1PwAw7gABdAAQMQADLQGxrAV7/CFK4QACdABTi2DDE4AiSwAFKwWInpjhH1AziAAFuUA40Hgpe5iTogAgoCU0/AA6ihY6epShSBBApFAHj5BwJwVaklAAggBBWwA+MBBQhHAxQgT7CVAAlwBFEQRUtwFLE5W91oArq1WoEAADs=';
	
	//Image to replace the  Iron Foundry (g7.gif)
	imagenes["ironfoundry"]  = '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';
	
	//Image to replace the grainmill (g8.gif)
	imagenes["grainmill"] = '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';
	
	//Image to replace the Bakery (g9.gif)
	imagenes["bakery"]  = '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';
	
	//Image to replace the warehouse (g10.gif)
	imagenes["warehouse"] = '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';

	//Image to replace the granary (g11.gif)
	imagenes["granary"] = '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';
	
	//Image to replace the blacksmith (g12.gif)
	imagenes["blacksmith"] = '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';
	
	//Image to replace the armoury (g13.gif)
	imagenes["armoury"] = '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';
	
	//Image to replace the  Tournament Square (g14.gif)
	imagenes["tournamentsquare"]  = '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';
	
	//Image to replace the mainbuilding (g15.gif)
	imagenes["mainbuilding"] = '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';
	
	//Image to replace the rally point (g16.gif)
	imagenes["rallypoint"] = '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';
	
	//Image to replace the marketplace (g17.gif)
	imagenes["marketplace"] = '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';
	
	//Image to replace the embassy (g18.gif)
	imagenes["embassy"] = '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';
    
	//Image to replace the barracks (g19.gif)
	imagenes["barracks"] = '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';
	
	//Image to replace the stable(g20.gif)
	imagenes["stable"] = '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';
	
	//Image to replace the workshop (g21.gif)
	imagenes["workshop"]  = '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';
	
	//Image to replace the academy (g22.gif)
	imagenes["academy"] = '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';
	
	//Image to replace the cranny (g23.gif)
	imagenes["cranny"]  = 'R0lGODlhSwBkAMQfAElfLFpnTdzo7ousYVaxE5ZjDauwsnKOTxEUBUmXECxXDTVsDJu/bY2Sk2R+QF1ACzVAIFu9FMPM0dnznLt9EX6DhaClp6/Jfra7vj+BD290cUNLOn2bTZidniQ4Df///yH5BAEAAB8ALAAAAABLAGQAAAX/4CeOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/oIEcBOK8TikGZ4clkFAi5+KBQ2BcKB2N1dnYKEAcAelwDB4SFGR4LBB4ODAcOHFYAC3UEfZAKHgkRBJSkGYtREB4RfqUIooCtpRERGQS2bVIBk6a5t4gHEHakprURu1CcucARnQEidAgZpcd3mlEAzcfPGQt627XACcpQDhkJpLbAGdkBd+kR6u5NHACVDh/boAl3CR7MeUCwAQKBBQAELWHAqo4HDwcG4IPTyUMcEQ7wIVDoQJURBpb2/TFUSSQAfB5G/wx48ACiNAcBDnBg8MGBQiEKAAZ4tGCBHYgXaO5LifEBBBIKYM0iUC/IhqRwEPjsAyiSBwgANDly0BHCgw3ZPijIRQrQvJs+AHyzdefhOosemCY4ekBqJIB+FIjAR66sxx0H1nW7ww7XpFIWO91aECEuJay4frFFcPQHA8bWgIlaxy6XT1e/Pv2S1HmcTsuekH2TF5qsAl/sEgAza83YPH9odait6muUrc7O7naz9mwBHFN+yCkIuyOn1Z4ZWKWTPC+XnwQ9Zf+KBCCWqZ6/Dv2Q6DZgRuPQ09EDCAjQa5+AOuYE9Evd3CASFejb12e+T6YPIfCQTz+J0gYfouRET/8f+xnBATWdyBYJTQFA4ABcd1g4AgdcSSIVBDEpAQAbT4mCAE0MbMRAdwGhQJADEAjlBANyAFAZKx9w8BUKECBwgSMBhKQEBwPImKImF3JYwC4oDvNQTZOMYo4RuyHExkoPzBTQAQU8AABLLBVAAVGjkFXZEej8hgtAHjzQJQKUUcCSnCxB0ONVArrGHBEX/vYbJQc8QEEBhMpZAAQDJCpNd5H9dmYRCtYHRxsrUWCppQ/IOAIAstkHx55CMNDfe354IBQHYl66AQkrQrCBJNdl0KAREIgiyQJ2hrVSqhQ0OEwFEmDgUF6aFjFAkCNO+QGWqe7nwAYWSCCAABUGoIH/hlUwIOil0QSwQQMGTDuttAJIsGq2YVrqqgYNdECuuOKeS4W2hRbgQQMaAPsuvAJUkJsTx27gppgFbGAtBuRKUMHCGmAwLVYb/JuEAxpYoIGgBINYAcICGADnxwgovEEHBoCFxLEBaFWxBRUMrG4A7k47EMgCBoDBzRg8OsQBNmNw7QYGWNBBBRAUSsHIFtysAc1wamAABhXYrAGoPgywQcU4Q9uBBQ0QbfQDGjjdwAZkgwyzBUFXYEAHOvvAwdk4d2AzyxVcfOmY1gZFU6IFfduuAQY0nPOsPTAQgAVo44yBAfiSLbDRLZIwAQMMXJBvBQ0kHfjCFVJtgxzQtosB/+IdkFwB2TZ6wOsDA0wwgQkHhI255g3ULoEBbd8QMNc3N2BtAERndY/LcjIw+QkaAJ/501DDLMHUOwTQHdDBYlChRplwwCHxrE9wAQoMdLA8zhZj0ADhNtyDDwQNjI4VPtlr78C2mLb+wQHfl3AA5iQr/jTuASgWDRKFCUwU5H3C0972VneA130gfyS4QNf6l7isgQgIdkodBzChPa/c7VAq4AC7EBc1cN3uetHwQSJSh4CTWMiDvJJTA0/gPW8FoEJkuyFWIOC5GWxQUwwgko2k9xDiWaoADnDgB5RYuWXxLCAWEqAOFHU/BXIlKxcISADg5CYw4e+BFyhSRAiHCSr0FU4E2ksUjRQRxJp4yVsyCaAJpMgEGglFKBdKgx73yMc++vGPgPRBCAAAOw==';
	
	//Image to replace the  town hall (g24.gif)
	imagenes["townhall"]  = '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';
	
	//Image to replace the residence (g25.gif)
	imagenes["residence"] = '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';
	
	//Image to replace the palace (g26.gif)
	imagenes["palace"] = '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';
	
	//Image to replace the Treasury (g27.gif)
	imagenes["treasury"]  = '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';
	
	//Image to replace the Trade Office (g28gif)
	imagenes["tradeoffice"]  = 'R0lGODlhSwBkAOZ/AINvCeLbtrB3Aurjvd7r8k5KN9i4DalKGywvKnEwEDImBpqUdsSGAoU4ErvIzsaoCvPsxaumibaaCLezlsnEooiEZbRVJerHDnyJj1lFEOzJDqqzuQYFA8RXInZjCp+agVhYR6OcdHp8a4uKcmdpWPLODpaSbVZbW0YyBCgVBOTCDqqQCUE4Hk0jCrnEq8rWu8K9nWVEAo9AGVE7BJlDGqSLCHRNA10pEIWOktLLp9zVsNfQrHV/hWFoa3p2XL2hCdpiKHFtVmJdR5Gan2ZiTmVWBYxfAkZKRez4/H2Dcp6orZeACWZMEN6+DsjU2mRuc5W0x9Hd5Gx0eYWVn21yZLauhNCxCl5iVT5DQTY8PMx1S0dNUHRrSoKfsoqRflpiZ2hUHnxVApqjjnY+IvCRYq1lQk9VV/NtK6KrlKu1nZCYhXhsK/bSDmJVNXtzTo1NMHJdFB4fGYF2Ob+3i7adFJCIVsvIkI+EObmzbotYE5FQDMLNs7irQ+XCBdjlyAAAACH5BAEAAH8ALAAAAABLAGQAQAf/gH+Cg4SFhoeIiYqLjI2OhWlJVEmPlZaXhFlfDlM9UnuYoaKHJFI4GEMOG5SjraIgW1JYZjxDVzUPVgZNKhcXBioGD3R3roZ3ABK5VswPzs5Wyg8/DxLWKwpYWE84PTgkKxq+4+S+JTUrBq0+Hg8rQnUoKAJGMzE2GUF1HjUl5RpNHixZ4kEBCg4pFAD4YeBCkxkoPKjwV66EhFBt/pCwN0NBnIQMQq7xYCNkSCMALoiL1kTcPwMAEjS4AcQCDRkyWgBJwDPBjQYJDhw4kwDEox5OnGRBECdOFigYMkyBwoVJFyhCMoBgwsGgh5bjNJQAwOBMBxkHZARtIFQGjQ40/8hYOJCgRYcOBSpMGAAhwIc2HhUhjZJER4ABIhAwERBSwRQkUioMCKBjB4UcEQqwsAIgRoobZxvgpAHkgBYtQBpYaFHGglsaESDswMKBA1MWPg5PUCPoCosUhbI4QXKCSJACApKHtKFgCIENMwSsMRzgMIk6IRZoz17gw4ABJApwKBAhRw47JnyEWC9kR3UdVFjEEAKCwmEYIlqNODGkh5cXJIzQ1wQBBKHeeiaAUIAYaPSwwGHVDZDDCCSwIEIEH0SwAAy6KcBAGEGAAMN3FORnzImEuHDFEUsVwAqKMMYo4yII9DCFEkqcgMaMPBIiRhYn4IADD1i40OORV+DgHP8STmyQ3xUKLAEAADVQuQIeR17CwkISsIBBFKYgEQUIElDkiwYGGCBOCQ8UYQUbxiSxxA9L1MBCEgFM8IEJASAAABvljCPBEjMgEKQDPWyAhANF1LDEA2AFqpIKKLRyBQAexMAECxxExxgDApQEagopqKmBChL0IumZBtAhABA3tCDDWTTI2kI7F6iwxCUkcCAFDyxA0QUTVEDBgwIngKFACijEgEIGoM6wwgqqBmrRDEzcBYQMoPF0QAMN3GRBAh20MMYbFrQxAAxCcDACI4OB4F51AeRgghlZLIXFUlu4sV4IJiBQhEoO5THGGEDhpMUYB7xRBk1C3cDTGTSMq4D/DWHEUMAIFPS1bgotpGCUIUc4gAQGmGFhQ3KMxYDAY1Kg0Aa91e1AxAJuZIDpDB7AUUEV6f3G1k5pWQAuF0EYpgMCBRQAwgc6fDfABF6I4gIICGxAQBRtCBAGgfWCF8R62o0QBAILfNcrUwggUJu7Ho/A4cf0hGjf1LxlWYkIIsAAgZ4LULBABN9NcITeiCeu+OKJ7FsbAoczjiICSuDgAAFDvCu5K2J80SQPDijx4uZW75vKEDjkTbooIpyAwQmJbkACIWCwcIIXJqzeCAn89QB6FEd48IME1DwjEKa6I4K1GUogQcAXSniRai8aVPNAQ7nSsQQfMpqwBgBryEHH//c/FOGBB0zUSbyUKwy6xRBKEEDAlxv08085bPwAwIkFoJBMESnAAgJYIC01qeCAvThgE6wgkCJkAQMbGMwThlADDbhkVRcoQTFcUYAVWGEJCblHBogAAwpEQAx36MMFz9SEKaWAA3HgQdsQ8AT/lUksFpTUqVgwCi5IwApw2IMbmGUSUNUDBQpQQJl0qIJoSCCDFmQDZwBgEJCl4CslMNMF1nAJEMRgBi+MAwu4UAGDKAdUoopWDVoSkAdg8AJsAMANxvAwGtzAaHYh1xgSQKoicM8SGfmDR7LwrDzEIIlGCEkMjOCsDKAgBQCgyAIDpYIH5CEFNpFJAsrwhgMAof8FB5CYXIDQAS3MhQtUiIMj2BaHqWSgWCJgwVR8YwYb3ANUCijCE1foCzZIoAU3OIBNOvAGMpRBKB3gSQvOYDShsKUFTLBlGxZQgCwsAgdRiAICcqCDKlyhbTGEQhAycJUTIGALTMECCBRAsAxaYQUCsEAyZ1IaC2zLWzehwRiSeZcK/M0HYLAlEyrgA4SIARFPiIITCkMvHXgBBEcQIPROUIEdzKEKVWBPEQDAGT3YYCbgOkDFNDmrBLiGBjIRaQIUIATC/Y0ITLsPyOrCw0J8KQojyMEA4mME5YRBlkh4AgkmQzMKECErElhgNcCYggTQoAHJNJpqUEqDm2DhPW7/a0pTQHCf0RliCybDQQ58UICeKicGXiLAFGZgBBFMxjIBIMII1lOBpplArgGgAEbnEAKyhuwGZ5CBEEIgL3p9RzYL2AEMckC1RbjASINwARXAkEgbsAAHBHDAYuCQA8P6oALZWUB2fJCFEXwnRGJkShyEwKEcXMYHnZ1aCuhBBBDEFgaqC8URsEkANzDACN6hgHd8MDbtmGABdV0ABKI2NRLQx20c4BsCIiC3DtWNCHeDgVdPhIYrkCACIlDQEQ56CC9cgXBEhYDgPgADvUxmAmFgAAoUhCEQkDd5heiBC9SAgBF4gbqxCYB/8UvgAhv4wAhOsIIZcQQEzOILI1vw/yKOoATURQEHEmbECSpXCweYKMOIyIIZntCDExwhDSBOBALMYAYs9GALKE6xIdCAhSb1YAgnyK2MBSECHkhhOFHggY53nIYjYGALPegBCCC740GAYApRcMAQkIAEKjSZEFT41QYcgAMlWPkPWJhBERQABgDUIcNJ2IIZhrABKbRuBDNYCDWogSk5uEHBu3UABMUkgjlRQxdNSBNn4OCDBJ/gCaBTRRQK8ENeOEQCNaiBmgTShAKTgEptgN8QeNA8NUjggiWwQg2sII5TBUMOq2MBOqxhpydgwBNDwoH9wtKEH4yjBAbwwK5Q5IPv5YJ41ZizM6ixgiUQzxpLwAIPtv9A5R44gASffqNKWoWiETDhhxIAgJiX0IRAeztNgWYgpD2QBct9wTlK2MASeBmoU8HBGFjIQKQzoBUTfKAAa8CDB0hNyYBo21A9+MIXeoCKJZSgCe2UFJsiLAo3AMCDRbABE7hAINeeQA4r0CI5PmibH3PaCTjIZQ2Syu5xsIEOrsgAHawAhjY80h4S50IEJoAHXfDSIlI6yNtqowAPZHxQF7BCtchRghWMAgSjBkAE6pDEkNAjA/cAIwBUwEtxqGkFDzhft60wPJjUYMxFMEAJVogmLoZC1T/IgBxmwAEUgMokyTECEj2Qw1z9g+orbIINbDCrz0hMIW86lQb2dwn/BBAyAymIAwhGwCyWodEkYVBAS9C0RAxaxAgWIMMbZBLMuUgsVrp8ACYMgo/Eu6GMClAOGKL5qQ8BwIDT0PitrdCCcIWy9mdgS10SMKuZpKUN21VEIBMvn0NyIJEmiYHTIaJLlTRhBT+o+gWKwITS3OAmWiBDB8b1kwSc5vM0aQAHgn8IHmLBS12IwRO6UIAYeOZiBoFIT1NQwVLfPOsCEArnS8MToKC0A2NwRwlABmTQAB8AARDFCDD0BcfSBV3wSlCQBOTUBb8xAx9SEgKQAQMxdGFBKUAhE3OhBWUAFL73LWmhFvYkA0kwTnLHAYxgCuiEADxQAFdgLDMwFUIA/wZdEBUxkBxdEWkceAHDoxYJAARmIRpVNRcdkBahlDCwoilt4AUB8DccUDWJwANOEAVmEAJBwC9PoAAYQBVWAQUF0AZQ8ARN0XZUx0IGUANj4BpFAy5BsRPh4jBFuH0yMAY5AAEQkAN/sUgZwAFXkAhPkIVHMC8BIAYskgVPYAZxgAFE0jZZMDYmkALrphJjMQMywBYdAC5LmHmmxBPBFBRMOAZeQAQZsHcZ4AN+MwEIoUqHkFBRIALUESF9mBhxwBRXcFEIEgJt0CgXsATFVgZrcQBlQAZBIRPhEhRLCC460QAZUwBp04cfoBsgEzI7kl/ZRIvvQQQf0QIokDVBZf9aOpADMFAFc+ADGaBLpEIu33IT2zcuaXET9cQTs9IGFPAdESAEcTAeubEuWfCNRaGNs7gDU8MCGXBWWdA8TyAZNcMhE0ACbbAQbYh4oMR/T3UaoeF9wtQBQoBVj6MACBAEXaUImzA/5hFmLEMPskQAUsABhEMzOUAE3kMl1WAFHlAAPvAbNPEW4xIURzhCSuM2A2RX96E5iLAFTjA/O2ACLJBIZ6UAmMUD9rAXDUWTJkAC9LZaIFABdoBRIVABLBAyQdF5CWAC7UEZREACD8IXAQADOxABQ0YIWGAyQ5ADsWRWitSSSjAPXPAenSVX22ECFVBXXjAZIMACG/KVXFD/AAqQACxgAoSFiBIyAljDITqgXYqABSfwBVSABiQwWYzBGGEQQ5llgWDQWTqwF0FQAduhHWKZNuABAlpFHpVhBxdVBWk5NcdnBCRQWG+JlI/gBy4gAplCOQTgBAXwIfahA4QjAqA1mDtpWhBAVrkokm9TBURVAXMzAQpgBEYQIt05l4/wAliATVxDD4SzAwYpBMWFXJ8ljSRCBE2DAIn3QhWgA1HDnfeRer7JWrphhaJwBFMgP0cAdYQDA9UoAuqxHWGJAB9JVJOxAEIgBOIxApa5ANU1ABGQAuBJAtilG+RXCWkgBjH2BycQBH6DgEEQAXXFcH8gBiRQjRK6AxnyUQEfQDXdWRIgIgQTIBskQJ4nkgQgIAInmghqQAJ7MRkwoB0TQiDrogAsgAZoEFFCmjyW6QMLoCcTMDgk8mU75gVFFgctOgERcAX3dWVqeiSBAAA7';
	
	//Image to replace the  Great Barracks (g29gif)
	imagenes["greatbarracks"]  = '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';
	
	//Image to replace the  Great Stable (g30.gif)
	imagenes["greatstable"]  = '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';
	
	//Image to replace the   (g31.gif)
	//imagenes["]  = '';
	
	//Image to replace the  (g32.gif)
	//imagenes[""]  = '';
	
	//Image to replace the   (g33.gif)
	//imagenes[""]  = '';
	
	//Image to replace the  stone mason (g34.gif)
	imagenes["stonemason"]  = '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';
	
	//Image to replace the  brewery (g35.gif)
	imagenes["brewery"]  = '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';
	
	//Image to replace the  trapper (g36.gif)
	imagenes["trapper"]  = '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';
	
	//Image to replace the hero's mansion (g37.gif)
	imagenes["herosmansion"] = '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';
	
	//Image to replace the  greatwarehouse (g38.gif)
	imagenes["greatwarehouse"]  = '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';
	
	//Image to replace the  great granary (g39.gif)
	imagenes["greatgranary"]  = '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';
	
	//Image to replace the WW (g40.gif)
	imagenes["ww"]  = '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';
	
	//Image to replace the building levels
	imagenes["s1"] = 'R0lGODlhEQAMAMQAAP34wf/6wv/8xCopIJqXdf//zP75wiMiG//+yre1juzntPb1wURDNC0sIv/7xA4OC///1v//y6OgfYiGanJwVzc2KlJQP5eUcpyZd//9x///xywrIv/9xZiVdP//zf//yiH5BAAAAAAALAAAAAARAAwAAAU+ICCOIheRKKopkmGk6LcwhxDAY5Y0T2XjIg9l0tn8gCIIZnAEBgoE5g0JgEqp1WgT6LnUpkiPxOIAIwPmUQgAOw==';
	imagenes["s2"] = 'R0lGODlhEQAMAMQAAP34wXRzWgMDAjc1KYqHav/9xv//zS4uJP//1P//yvz3wNfTpCgnHvLvu5mWdf/6w/75wf77xZ+bebOviP75whkYE6Ohfn99Yfz5wqmmgby4j4F+Yr29lZOQcMrInZ2ZdyH5BAAAAAAALAAAAAARAAwAAAVcICCOkWFGY5oWjRQ4TaGuzXAExxHPouEIDQSgQjDwAJGFpvBIMDbGYyEBQXwEC9kR8DBYBJLosUsQWAyULSURqHgQCS0vkRFcOJPJAjWDsHMMgR0JWwoACoiGKiEAOw==';
	imagenes["s3"] = 'R0lGODlhEQAMAMQAAP34wZmWdTs6Lerntv//yQMDAv/9xllYRP//1ffzvm1rVSwsIv//zeLdraOgff75wv/6w/74wbOviOXgrr+8kg0MCRwbFXp3XMXAliUlHPLuud3aqxEQDaekgP/7xGNhTCH5BAAAAAAALAAAAAARAAwAAAVgICCOHsMQz6iqRhJckgGtqpcIi2IpKC0SEs4AgSlMDD7AQzMhICSVATIJITQOhQAjkhQZNoHDYjP1GQglQkbBSBI6HwKBIfi0fQRKdhAoUAhJDwQOC4UdPV0ECRMJgCshADs=';
	imagenes["s4"] = 'R0lGODlhEQAMAMQAAP34wf//yzs6LQcHBYqKb/Dtuq2phCQkG//6w0tKOf75wVVTQf/+x///0KilgB0dFri0jNzXqRISDZyaef75wvn0vqKfe21rU/v5w358YIOAZMPAlv77xrGuh7y6kzAvJSH5BAAAAAAALAAAAAARAAwAAAVRICCOIhUwZEpSjBVhqto4gxPEJBM9g3HjAERAoPnYgIpGRsA4HHGBzaHQOHQaOATmICBoJAsPJ4aoXBaJxOAzQcUUgUAj8DBggSIEIAFx4/EhADs=';
	imagenes["s5"] = 'R0lGODlhEQAMAMQAAP34wQEBAS0sI5uYd///1cvHm+nmt0VENf//yf/+xhkYE///zfbyvaelgdrVpv75wf/7xKWifqGde/34wP/5wl1cSP76wyopIA4NCuThr+PerfHsuH57YLy4kLi1jWtpUiH5BAAAAAAALAAAAAARAAwAAAVmICCKU7KcCzSuI+REUmxY7Lp8mHAJBVKLlIRgQFgkLI8fALJRRBoeS0IJQBQCl4PiwKD9LA6OZqFRcBbKCYJAI1QO6B+i8UEkCIdKvIboBCQGEgEFUz8PCBI7Ag0ISVQIDBkMPiwhADs=';
	imagenes["s6"] = 'R0lGODlhEQAMAMQAAP34wcXBlmxrVEZFNf//3QQEA///yenntsvHnP/9xSQjG3h1W///zvXwu5uYdjk4LBMTDv75wSkpIdnVpv/6wxYVEYB+YjAvJKGee//7xFxaRuXhr6ilgPv6yY6LbJCNbiH5BAAAAAAALAAAAAARAAwAAAVdICCOkcEwyaiqZbB8h7GyhgUJj3KkM2BMBQTBcOHIegzPwxCYZHojBm4guSUoUGkB00EUjFmBwpBgDDSMrKOSMQ0E6V7iAFkcOIXAsWdAPCQSGAYRUCIGFBsNeyMhADs=';
	imagenes["s7"] = 'R0lGODlhEQAMAMQAAP34wf//zdXRov//ygEBAScmHisrIcjEmP/6w/77xXl3XP75wqKee///yf/+xuTfrfn1v8zInP/8xP//0D08LsK+lP75wVZUQaOgfaungoiGaJ+ceWtpUjU0KDg3Kv/+xSH5BAAAAAAALAAAAAARAAwAAAVNICCKTmCazaiKicC8WBYl6zhsRm4QSlCPCIlkoihAFj/RYjGIEA6DJHBAuQQsUlHDKUhlAQFOZ4D4IhYFje/reBAq0W9D4Hl8virkLwQAOw==';
	imagenes["s8"] = 'R0lGODlhEQAMAMQAAP34wQMDAv//zJKPcFlXRDc2KtfTpP//1UxLO83InOfltmtqVP/+xysqIfjzvf77xP76wv75wXt4XaShfrCth+PfriQkHJ+ce/75wsK+lB8eGH57YPr4w/r2wA8PDPz4wiH5BAAAAAAALAAAAAARAAwAAAViICCOj2A+Y5o+3yRdHaqOEEdoi4Vw0CwyhoDhUAlkGD4A0HgIJpBJwcCD8EgEkeRDUSBcCIWKbCbYWEyCwkIQXRQOjAOCwPYxMoGJghKg1GcRDBMNhAMMGEkiAg4VDgKIKSEAOw==';
	imagenes["s9"] = 'R0lGODlhEQAMAMQAAP34wbSwiY6Mbf//zAoJBxcWEWxqU+nnt0dGNnd0Wv//0/PwvP/9xtjUpf/6w1lXQ/75wZ6cfP34wGJhTCsqIT08L/77xeLfricmHv36wx8eF/j1wKWjf8fDmObisPLtuCH5BAAAAAAALAAAAAARAAwAAAVnICCOzmA6Y5oyW5QEFqqKkrUhmoFNjDwPEYJHcSAEBjPRwFAZQAaVBDI5EBQYikxhMp1ZPAVE5EEwdFWSweWB4CDMSYClEVAoBgXOOTXoGA8GGgsWSRJPAhgUFQ17Kk8fHgwDEhIpIQA7';
	imagenes["s10"] = 'R0lGODlhEQAMAMQAADo5LJeUc///zP34wbSxigkJB+nmtnh1Wx4eF//+xyUkHM7KnVhWQ///2EtJOffyvS8uJGlnUv/7wz49L4B9YYeFaKGeexIRDaekf93Zqfv5w3BuVmJgS2FfSuXhr/j2wSH5BAAAAAAALAAAAAARAAwAAAV34CAOiTBKQjquSYZJg/QEB5Gsg2BAgCB9E0jkUjGJEgTFxVGyXB4NQsFwI3EClEmKwRAkHheCUdTIpiYbn0QRqMYE2RLgoGaPc2aBI+IbICx3cFoCBz06BQtuOYVeCwUWBgwQGjgCARwJKBYKPBmKOCICDx4abiEAOw==';
	imagenes["s11"] = 'R0lGODlhEQAMAMQAAP34wf/+yMC8kv//yvr1vv/8xBcWEfDst//9xf75wv77xP//0MzIm09OPdDMnp6beb66kd7ZqailgAAAAAgIBg8OC0NBMh0cFRAPDMXBlmNhTPPvucK+lP78xe3ruf35wSH5BAAAAAAALAAAAAARAAwAAAVXICCKAzIC5TkmgxR1AOvCZ7E8kzDYuH4qHg2GkhkEh8VTgNNwXAQLptM3+hAGBIPumqWuEAftIAEWqwCFsC9tVrHX6sE5XYHI6fazYmNhBAB7fX9nhGchADs=';
	imagenes["s12"] = 'R0lGODlhEQAMAMQAADk4K///y/z3wOzotk9OPAUEA5yaecjEmf/+x7eziycmHXp3XJSRcR0cFmtqVf75wv/7xP/6wn98Yf//1YF+Yv34wWBeSfv4xC0sIqmmgbKwid/bqz8+MBAQDDAwJb26kSH5BAAAAAAALAAAAAARAAwAAAV7YCVWSDCWQRCNY7BlEDkwSybE7eABAbI1HEeDcFk9EBpFh1CyYAKTTeFjOloMEk4AcjggEINCwiR6TCjaIyISEA4QI3Y28KhAAovCgdyaHy8WHXssIgFzEBcEHgMTW4R4PHgFBh8aGgOPDBZwihgKn1SED3UVAqUCqCMhADs=';
	imagenes["s13"] = 'R0lGODlhEQAMAMQAAP//yzk4K/34wbKxiwQEA0hGN5iWdenmtcjFmv//1Hh1W//+x4yJa//6wy0sIiUkHH98YP75wuTgrx0dFv74wf77xYF+Yg8PDPDtuWJgSz49L6ilgMG+lP35w+DcrGZlUSH5BAAAAAAALAAAAAARAAwAAAWCoCAKCzCWAECNI+BtFbUcDMQBEQtgTgAsnknhczGYBJHF4HEppCCORYIxiTSQi4zBogE0DgdAAlq5iiIJLq4CQBQIN1YDAOlGkghDoYCp6Oo4C4IJGAQbRyJ0XQsQDD8NRYgCAAo+AAxwBwoXHgs6BhkLHRUWDz0IkiwicxgSFZ4iIQA7';
	imagenes["s14"] = 'R0lGODlhEQAMAMQAAP34wTc2KrWzjP//y5iVdE5MO9bTpOvntHp4Xf/+xwICAv//0/75wt/bqg0MCv/7w/77xFlYRIB9YYeHbj8+MCMiGxMSDuXhr/DsuP75wQoKBx0cFvn0vmFfSmJgS3FvViH5BAAAAAAALAAAAAARAAwAAAV1ICACyTCKz/Cc4tAIHCNCHHFA53AEwSAzA4TCkBBlEoKKo5CQDQQOB1HESHgIEooPgqkQNtMRY5FVDQofjCWMGpQHhMBCfTHlyhdFZPLRfAw4I25aFxEFBRQaFAJFggg9KQMLBxoNKjkEHk0iCRcUDY0soqIhADs=';
	imagenes["s15"] = 'R0lGODlhEQAMAMQAALWzjP//y3BvVpWScf34wQAAAMrHm+jltjs6Lv/9xv//0xgYEv/6wysrIX57YDU0KCUkHP75wv77xYSBZP74wfbxvEA/MZ6bee/ruKakf2JgS7+8kg8OC+PfrTAwJTg4KyH5BAAAAAAALAAAAAARAAwAAAWCICESSTAGKBqNYtBlUiQZ2XVlFXNiHhIwicei0UBgEoRIAgDhWAIJzMKggFJEMs1l8gwYFpuM4ceKKBzdS+GB4GgCKxEjgIZuHBVvAWA61SMBCgxzDQ59LXV0AwoJCQsDhwR0DygTBRsHAgsHEiwBAxoJEgkOEA0fYyyqBHMYHRKHIQA7';
	imagenes["s16"] = 'R0lGODlhEQAMAMQAADc2Kv//y/34wZqXdgICAaqog0xKOv//1uvouMbCl//9xhsbFVVUQSMiGmxrViwrIuDcq9TQov/6w4F+Yn98Yfn0vuTgrvv2wGNhSw8OC3t4XUE/MWFfSvr4wz49L/f3xSH5BAAAAAAALAAAAAARAAwAAAV5oCAKSjBKQSqNYwAVqyQV2iCsLQIAgaQwDUfD0MEpCo2MIVXIIA6WRkQhCmAGE0+K4fgkLIoLS3LIpjYGwCMzMJ0CFK3Ck0kEBoQpC64NABgHJQ1te3EpGBsqC4QtGjwKCQQDCBROVC0DGAooBQ+ediyhVRUWAm4CIQA7';
	imagenes["s17"] = 'R0lGODlhEQAMAMQAAP34wWRiTDg3KwcHBevntZaUc0xKOv//yf/9xf75wv//zS0tI7WzjKqngv/6wyIhGv77xnx5X6Gdev34wP75wfTxvIF+YuDcqxAQDL26kT49L9vXp8K+lKWifv//17CshiH5BAAAAAAALAAAAAARAAwAAAV4ICBOxwGQSpoikygeVwNBnGR3zQa5CrEIB0hkQXwMGiYKgvHAGA6JKOJgMCAcgAQkULBooFGFBEMwuRIeLxSAqGAKOxfAoVAnAIoCpoKQi+pfUQcCAQp+f3YIBAMZZn4KEUAJBwwDBH2HBwUBJgcfBhNYh4ctLXIhADs=';
	imagenes["s18"] = 'R0lGODlhEQAMAMQAADc2Kv34wZORcv//ywsLCEhHN3Z0WurntSQjG///1//9xrSxiqShfX57YIF+YmFfSvbyvaqngv/7w+/suBoZFNzYqWloVioqITAwJWJgS1JQPsTCmBQTD+Xgrvv3wD49LyH5BAAAAAAALAAAAAARAAwAAAV3YCAGyjCWgzmOQxVJ5CQ0i7IGw4QBg6IDFo5BRVogCJoSgxBILAgHGCkjcHxSz0NiOZGKEtaBZPCgFAgRYmDcuA42F4OgoIF4ce0UPTGAEBhqA3kDAAYJJRQCgQ08AwIEGwePFXeOGQoSEg4IFxgLajdrOR04IyEAOw==';
	imagenes["s19"] = 'R0lGODlhEQAMAMQAADY2KZaUdP//y/34wevotQYGBUtKOa2qhXRyWdTQoyYlHf//1P/+x+HermhmT8bDl2ppVP74wf75wn57YP77xv/6w8O/lT8+MIF+YlNSP2JgS/v5w/z2wBsaFP/8ww8PDCH5BAAAAAAALAAAAAARAAwAAAWC4CAOjDCWghCNo9AcUsQQwWQJEisQACAwDQUA0gmoBhLGQfExpCCKzcJSaDCQDE0Ac0kBEAtP5HMwiSQLbipjWCwaBeOoIph0GVRH4PKRt+wqCw8GBksHV39dFQ8PbnAJiCJ1PgIBBQkNFwYMOS0BGgwVGwgKChkEHiyqA3QEBAyRIQA7';
	imagenes["s20"] = 'R0lGODlhEQAMAMQAANbSpP//y5WScm1rU/34wezmtDo5LBsbFc3JnP//0xMSDqejfy0sI//+x11cSCclHbe0jfv3wfHuuk5MO/f1wAwMCbq4j/XzwP/7w4SCZd7aq7KuiMPAlX98YREQDeXgriH5BAAAAAAALAAAAAARAAwAAAWNICEGZCASZXOOSNdxZgB0mWaOS+U4lZBwHsdEoVFhIopOIiFQRAyD5cRhpGwKmMCG6IEFFocIZoRpXB6DTwXQCFg8BdVIYmBINOv2Oz7SPAwSAXgIJFsSKg0aBwMBCQEUBwtLGQxVDAcWEBsQDQMPGggKAiYNAAynD38SFA6pAxhjBBEnEbUEWQUFAbEhADs=';
	imagenes["s21"] = 'R0lGODlhEQAMAMQAADk4K///y/34wZmWdQUFBPHuu3h2XCcmHf//0/75wv/9xry4j4qIai8vJPv2wNfTpH98Yf/6w/77xYF+Yv74waKffKmmgbOwiRkYE2xtWWJgSz49L+Dcq01LOsrInb29lSH5BAAAAAAALAAAAAARAAwAAAV6oCAqQSmJY4CORWUMhSIGnCUlLNBkTVNIgUIDEMAJAgNCASHAMBCXA6FTFEkeC0UkcJggNIPJpppKIJIPhVlMFm0rhEqAsoWMjYItI66a2ckJAQYYHggBMkd/RgEWBBAfFxcPJ4JEOIE8DQebAypIGmooDgkOpaYrKCEAOw==';
	imagenes["s22"] = 'R0lGODlhEQAMAMQAADY1Kf34wUdFNtvYqenls5WSch0cFs3KngwMCf//yfr2wf//1CcmHqmmgiwrIr67k2RjTv//zf/6wvDuu/f0v//8xV1cSLGuh3t4XRUVEP/7w7ayi4F+Yv75wf75wn17YCH5BAAAAAAALAAAAAARAAwAAAWIYCAmUZSIHWmKbHJw35N4ycNxxzk2iAUhhUUBAbEgGieNIsNZCDMEoBPD8EgkiguhErkgCJcJt2CwBmiVBIVhMWkShAwmwgokJgCH2E5gCBQaLQN+EycuBn8VggYQJQkuGR8LJh0BGhQOBg8bFw9xAJudCh0VAw4ADKkCG6epfhSBCiKys7V1IQA7';
	imagenes["s23"] = 'R0lGODlhEQAMAMQAAGZlT///y+nlsv34wSYlHdjUpjg3K0hGNx4dF//+xqmmgfbyvf//1QwMCSsqIc3JnPDuuvv3wJWTc7i2joaEaP77xJGOboF+Yl1cSLGth8PAlX16X2FfS/f1wRUVEOHfsCH5BAAAAAAALAAAAAARAAwAAAWO4CAGZCAOZXKOz7VpZqJtlqCOSoNxjcRIDcCB8FFVIp4L4+eBECyMAOFiGkQygkog04AIFoEIwlJFVRILAieQSFAIhkFlFYAYHJDKXPGWlAMfcBAmAVoMFg0LcwkFCAABUQIHBZA5EAkVHQ4IExMZEwsOBx+NGDEFDqkOcAsfB6sAiiIRclYRt20CAoUiIQA7';
	imagenes["s24"] = 'R0lGODlhEQAMALMAAP34wX58YD89MO3otc3JnV5cSN3ZqR8eF66qhI6LbAAAAA8PCy8uJL66kZ6beE5NPCH5BAAAAAAALAAAAAARAAwAAARSEMhJayUhkIsqWkWxONNwCNUSSM4yiY83SN/sCAFqSUcBGAdDbjcQMGYCUiBWMTAEs4QikBAcEhSgj1Z4PBggCuPQaCAalOHEyRg/Z6ztbj6JAAA7';
	imagenes["s25"] = 'R0lGODlhEQAMALMAAP34wX58YD89MO3otc3JnV5cSJ6beN3ZqR8eF66qhAAAAA8PC766kS8uJI6LbG5sVCH5BAAAAAAALAAAAAARAAwAAARYEMhJayUhkJlM39xSFIsBEEqjBtTCAsYCN5aUDLY8MnctIQWAYCFoLBiWQVESSEgKiMqhIcBdFIfJAfGYDApZAGNhBTQQDB4SUd0GJVMVgjpQnru+Sp0SAQA7';
	
	// Itt kezdodnek a css-ek; 
    
    var cssStyle = "";
    cssStyle += "#resumen {position: relative; width:900px; float: bottom;}";
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
					res_table += '<tr><td><img src="data:image/gif;base64,' + imagenes["img" + (i+1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '"></td><td align="right" id="timeout' + i + '">' + restante + '</td><td>' + T('NUNCA') + '</td></tr>';
                } else {
                   if (tiempo > tiempo_max && tiempo_max !='Infinity') {
                      tiempo_max = tiempo;
                   }
                   tiempo = formatear_tiempo(tiempo+5);
				   res_table += '<tr><td><img src="data:image/gif;base64,' + imagenes["img" + (i+1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '"></td><td align="right" id="timeout' + i + '">' + restante + '</td><td align="right" id="timeout" width="60">' + tiempo + '</td></tr>';
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
            a = '<table align="left">'+res_table+'<tr><td colspan="1">'+T('LISTO') + '</td><td colspan="2">' + calcularTextoTiempo(fecha)+ '</td></tr></table>';
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


	/** Assigner une couleur en fonction du temps qui s'ecoule add on @quio moved hacked-fr*/
	function calculateHighlight (produccionHora, tiempo, tiempoRestante) {
		var color = '';

		if (produccionHora < 0) {
			color = '#FF0000';
		} else if (tiempo <= 3600) {
			color = 'Magenta';
		} else if (tiempo <= 18000) {
			color = '#ffa500';
		} else if (tiempo <= 36000) {
			color = '#7b68ee';
		}

		var ret = tiempoRestante;
		if (color != '') ret = '<font color="' + color + '">' + ret + '</font>';

		return ret;
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
//			var celda = elem("TD", "(" + produccionHora +', '+tiempoRestante+')');	//@quio
			var celda = elem("TD", "(" + (produccionHora > 0 ? '+' : '') + produccionHora + ", " + calculateHighlight(produccionHora, tiempo, tiempoRestante) + ")");
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
		//alert(oldserver);
		server = oldserver.replace(/\.travian\./,'');
		//alert(server);

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
		var links = [0,
				[T('LOGIN'), "login.php"],
				[T('ALIANZA'), "allianz.php"],
				[T('ENV_TROPAS'), "a2b.php"],
				[T('SIM'), "warsim.php"],
                0,
				['TSU', "http://travutils.com/en/?s=jp1", "_blank"],	// AddOn JJ
//JJ ComOut				[T('COMP'), "http://trcomp.sourceforge.net/?lang=" + idioma, "_blank"],
//JJ ComOut				['Travilog', "http://travilog.org.ua/"+idioma+"/", "tr3_travilog"],
//JJ ComOut				['Toolbox', "http://www.traviantoolbox.com/index.php?lang=" + idioma, "tr3_toolbox"],
//JJ ComOut				[T('CHECK'), "http://userscripts.org/scripts/source/28129.user.js", "_blank"],
//JJ ComOut				['World Analyser', "http://www.travian.ws/analyser.pl", "_blank"],
//				[T('MAPA'), "http://travmap.shishnet.org/?lang=" + idioma, "_blank"],
//				[T('RES'), "http://www.nmprog.hu/travian/buildingsandunitsv39ek.jpg", "tr3_buildingtree"],
//				[T('UPGRADET'), "http://www.nmprog.hu/travian/traviantaskqueue.user.js", "_blank"],
		];

		for(var i = 0; i < links.length; i++){
			if(links[i]){
				var a = elem("A", links[i][0]);
				a.href = links[i][1];
				if(links[i][2]) a.setAttribute('target', links[i][2]);
				menu.appendChild(a);
			} else menu.appendChild(document.createElement('HR'));
		}
	}

	/**
	 * Anyade nuevos enlaces a edificios en la barra superior
	 */
	function buildingLinks(boolShowAdditionalIcons){
		// Desplaza el menu del Plus a la izquierda para hacer hueco a las nuevas imagenes
		// Localiza la barra de enlaces superiores
		
		var barra = get('ltop5');//find("//div[@id='ltop5']", XPFirst);
        //barra.style.left = '250px';
        
		if (boolShowAdditionalIcons > 0) {
			barra.style.left = '161px';
			barra.style.display='none';

			var a = find("//a[contains(@href, 'plus.php')]", XPFirst);
			a.style.marginLeft = '0px';
			a.style.position = 'absolute';
			a.style.left = '500px';

			// Asocia el mapa del mercado con la imagen especifica creada
			barra.innerHTML += '<img usemap="#mercado" class="fl2" src="data:image/gif;base64,' + imagenes["mercado"] + '" border="0" title="' + T('MERCADO') + '">';

			// Asocia el mapa de los edificios militares con la imagen creada a tal efecto
			barra.innerHTML += '<img usemap="#militar" class="fl2" src="data:image/gif;base64,' + imagenes["militar"] + '" border="0" title="' + T('CUARTEL') + '">';

			// Mapa para el mercado
			barra.innerHTML += '<map name="mercado"><area shape="rect" coords="0,0,70,50" href="build.php?gid=17" title="' + T('ENVIAR') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=17&t=1" title="' + T('COMPRAR') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=17&t=2" title="' + T('VENDER') + '"></map>';

			// Mapa para los edificios militares
			barra.innerHTML += '<map name="militar"><area shape="rect" coords="0,0,35,50" href="build.php?gid=16" title="' + T('PUNTO') + '"><area shape="rect" coords="35,0,70,50" href="build.php?gid=19" title="' + T('CUARTEL') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=20" title="' + T('CORRAL') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=21" title="' + T('TALLER') + '"></map>';
		}
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

				// Introduce el enlace para enviar mensajes usando su ID	
				var igmlink = elem('a', "<img src='data:image/gif;base64," + imagenes["igm"] + "' style='margin:3px 0px 1px 3px; display: inline' title='" + T('ENVIAR_IGM') + "' alt='' border=0>");
				igmlink.href = 'nachrichten.php?t=1&id=' + a;
				links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
			// Por cada enlace a una localizacion del mapa
			}else if (links[i].href.search(/karte.php\?d=(\d+)/) > 0){
				var a = RegExp.$1;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('id=' + a), links[i].nextSibling);

				// Agrega un enlace para lanzar un ataque usando su posicion
				var atklink = elem('a',"<img src='data:image/gif;base64," + imagenes["att_all"] + "' style='margin:3px 0px 1px 3px; display: inline' height='10' width='10' title='" + T('ATACAR') + "' alt='' border='0'>");
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
					info_botin += '<img src="data:image/gif;base64,' + imagenes["img" + (i+1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">';
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
				informe.innerHTML += '<img src="data:image/gif;base64,' + imagenes["img" + (i+1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">';
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
            var td1 = elem('TD', '<img src="data:image/gif;base64,' + imagenes["img" + (i+1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">');
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
						if (j > 25) {
							imagen += '<img src="' + img('g/s/s' + j + '.gif') + '" style="position:relative; bottom:52px; left: 27px;" border="0">';
						} else {
							imagen += '<img src="data:image/gif;base64,' + imagenes["s" + j] + '" style="position:relative; bottom:52px; left: 27px;" border="0">';
					   }
                    }
					imagen += '</div></a>';
					var td = elem("TD", imagen);
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
//						td3.innerHTML = T('SUBIR_NIVEL');	//@quio
                       td3.innerHTML = '<a style="color: #FF8C00"; "href="build.php?id=' + grid[i][j] + '>' + T('SUBIR_NIVEL') + '</a>';	//Add @quio
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
						//31,32,33 - palisade, wall, earth wall
						case 31: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["empalizada"]; break;
						case 32: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["muralla"]; break;
						case 33: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["terraplen"]; break;
						//other buildings - dorf2
						case 5: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["sawmill"]; break;
						case 6: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["brickyard"]; break;
						case 7: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["ironfoundry"]; break;
						case 8: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["grainmill"]; break;
						case 9: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["bakery"]; break;
						case 10: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["warehouse"]; break;
						case 11: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["granary"]; break;
						case 12: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["blacksmith"]; break;
						case 13: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["armoury"]; break;
						case 14: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["tournamentsquare"]; break;
						case 15: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["mainbuilding"]; break;
						case 16: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["rallypoint"]; break;
						case 17: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["marketplace"]; break;
						case 18: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["embassy"]; break;
						case 19: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["barracks"]; break;
						case 20: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["stable"]; break;
						case 21: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["workshop"]; break;
						case 22: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["academy"]; break;
						case 23: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["cranny"]; break;
						case 24: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["townhall"]; break;
						case 25: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["residence"]; break;
						case 26: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["palace"]; break;
						case 27: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["treasury"]; break;
						case 28: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["tradeoffice"]; break;
						case 29: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["greatbarracks"]; break;
						case 30: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["greatstable"]; break;
						case 34: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["stonemaso"]; break;
						case 36: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["trapper"]; break;
						case 37: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["herosmansion"]; break;
						case 38: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["greatwarehouse"]; break;
						case 39: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["greatgranary"]; break;
						case 40: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["ww"]; break;
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
//						td3.innerHTML = T('SUBIR_NIVEL');	//@quio
                       td3.innerHTML = '<a href="' + buildingsLinks[i].nodeValue + '" style="color: #FF8C00">' + T('SUBIR_NIVEL') + '</a>';	// Add @quio

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
		imh.setAttribute("src", 'data:image/gif;base64,' + imagenes["blockheader"]);
		imh.setAttribute("width","210");

		tabla.setAttribute("width", "220");
		td.setAttribute("align", "center");
		textarea.setAttribute("cols", "22");
		textarea.setAttribute("id", "notas");
		textarea.setAttribute("rows", nl);
		textarea.setAttribute("style", 'background-image: url(' + 'data:image/gif;base64,' +imagenes["underline"] + '); border : 0px; overflow:auto');
		input.setAttribute("type", "image");
		input.setAttribute("border", "0");
		input.setAttribute("src", img('b/s1.gif', true));
		// En el evento del boton de guardado actualiza el valor de la cookie (1 adz?o de duracion por defecto)
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
			if (aldeas > 1) {
				return Math.round(16 * Math.pow(aldeas, 2.3)) * 100;
			} else {
				return 2000;
			}
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
		for (var i = 0; i < 5; i++){
			texto += '<tr><td>' + "No. " + (aldeas_actuales + i + 1) + '</td><td>';

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
					
				    var atklink = elem('a',"<img src='data:image/gif;base64," + imagenes["att_all"] + "' style='margin:3px 0px 1px 3px; display: inline' height='10' width='10' title='" + T('ATACAR') + "' alt='' border='0'>");
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
				var ref = elem("A", "<img src='data:image/gif;base64," + imagenes["img" + (i+1)] + "' width='18' height='12' border='0' title='" + T('RECURSO' + (i+1)) + "'>");
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
			var enlace = elem("A", " <img src='data:image/gif;base64," + imagenes["delIcon"] + " 'width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>");
			enlace.href = "javascript:void(0);";
			enlace.addEventListener("click", function() {if (confirm(T('ELIMINAR') + ". " + T('SEGURO')) == true) {crearEventoEliminarCookie("marcadores", i, mostrarMarcadores);}}, 0);
			td.appendChild(enlace);
			tr.appendChild(td);
			tabla.appendChild(tr);
		}
		
		var xShowNoteBlock = obtenerValorCookie("noteblock")
		for (var i = 0; i < xShowNoteBlock.length; i++) {
			boolShowNoteBlock = parseInt(xShowNoteBlock[i])
		}
		
        if (boolShowNoteBlock > 0) {blocNotas2(div,readCookie("notas"))};
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
			city.appendChild(elem("TD", "<a href='a2b.php?z=" + id + "'><img src='data:image/gif;base64," + imagenes["def1"] + "' width='12' border='0' title='" + T('ENV_TROPAS') + "'></a>"));
			city.appendChild(elem("TD", "<a href='build.php?z=" + id + "&gid=17'><img src='data:image/gif;base64," + imagenes["img4"] + "' height='12' border='0' title='" + T('ENVIAR') + "'></a>"));
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
       var parametros = ["storeurl", "storepassword", "options", "marcadores" , "ventas", "bigicons" , "noteblock"];
       var inparr = new Array(parametros.length);
	   var strLabel = "";
	   var strAddInfo =  "(0 = Hide, 1 = Show)";
       for (var i = 0; i < parametros.length; i++){
          fila = document.createElement("TR");
		  strLabel = T(parametros[i].toUpperCase());
		  if (parametros[i] == "bigicons" || parametros[i] == "noteblock") {
			strLabel = strLabel + "<br>" + strAddInfo + "</br>";
		  };
		  
          fila.appendChild(elem("TD", strLabel));
          var valor = readCookie(parametros[i]);

          var inptd = document.createElement("TD");
          inptd.setAttribute('style','width:360px');
          inparr[i] = document.createElement("INPUT");
		  inparr[i].setAttribute('name', T(parametros[i].toUpperCase()));
		  inparr[i].setAttribute('type','text');
		  inparr[i].setAttribute('name', parametros[i]);
		  inparr[i].setAttribute('value',(valor != null ? valor : ''));
          inparr[i].setAttribute('class','fm');
          inparr[i].setAttribute('style','width:360px');
          inparr[i].setAttribute("id", 'is_'+parametros[i]);
          inptd.appendChild(inparr[i]);
          fila.appendChild(inptd);
		  //fila.appendChild(elem("TD", "<input type='text' name='" + parametros[i] + "' value='" + (valor != null ? valor : '') + "' class='fm' style='width:275px;'/>"));
          var impo = inparr[i];
          var tdimg = document.createElement("IMG");
		  tdimg.setAttribute("src", 'data:image/gif;base64,' + imagenes["bulletGreen"]);
          tdimg.setAttribute("id", 's_'+parametros[i]);
          tdimg.addEventListener("click", function() {
			var inpo =  get('i'+this.id);
			createCookie(inpo.name,inpo.value,function (r) {
				if (r == "ok" ) {
					alert(T('GUARDADO') + ': ' + T(inpo.name.toUpperCase()));
					}
				else {
					alert(T('GUARDADO') + ': ' + T(inpo.name.toUpperCase())+' -> ' + ' ERROR !');
				}
			});
		  },0);

          var imgtd = document.createElement("TD");
          imgtd.appendChild(tdimg);
          fila.appendChild(imgtd);
          
          tabla.appendChild(fila);
       }

       var imagen = document.createElement("IMG");
	   var listOptions = ': ';
       imagen.setAttribute("src", img('b/s1.gif', true));
       imagen.addEventListener("click", function(){
             var parametros = get("configuracion").getElementsByTagName("INPUT");
             for (var i = 0; i < parametros.length; i++) {
				if (parametros[i].value !== '')	{
					listOptions = listOptions + T(parametros[i].name.toUpperCase());
					if (i < parametros.length - 1) listOptions = listOptions + ', ';
				}
                createCookie(parametros[i].name, parametros[i].value);
             }
             if (boolShowNoteBlock > 0) createCookie('notas', get('notas').value);
             alert(T('GUARDADO') + listOptions);
			 location.reload(true);
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
		tiempo_ejecucion[1] = new Date().getTime();
        var timeval="" + (tiempo_ejecucion[1]-tiempo_ejecucion[0]);
        //for (var i = 1; i < tiempo_ejecucion.length; i++){
        //    timeval+=","+(tiempo_ejecucion[i]-tiempo_ejecucion[i-1])
        //}
        var tbtime = elem("span", " | Travian Beyond time: " + timeval + " ms");
        tbtime.setAttribute("class","b");
		tbtime.setAttribute("style", "z-index: 2; color: #FFFFFF;");
		var div = find("//div[@id='ltime']/br", XPFirst);
        div.parentNode.style.width="400px";
        div.parentNode.insertBefore(tbtime, div);
        var ltdiv = get('ltime');
        ltdiv.appendChild(document.createElement('BR'));
		ltdiv.appendChild(document.createElement('BR'));
		ltdiv.appendChild(document.createElement('BR'));
        var setupLink = elem('A',"<font style='font-size:12px' color=#0000FF>Travian Beyond Setup</font>");
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
		var itext=['','(9)','<img src="data:image/gif;base64,' + imagenes['img3'] + '">','(6)','<img src="data:image/gif;base64,' + imagenes['img2'] + '">','<img src="data:image/gif;base64,' + imagenes['img1'] + '">','(15)'];
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
		for (var i = 1; i < 5; i++) div.innerHTML += '<img src="data:image/gif;base64,' + imagenes["img" + i] + '" width="18" height="12" border="0" title="' + T('RECURSO' + i) + '">' + info[i-1] + ' ';
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
	   if (storeurl !== '')
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
				var td = elem("TD", '<img src="data:image;base64,' + imagenes["img" + (ventas[i][2])] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][2])) + '"> ' + ventas[i][0]); tr.appendChild(td);
				td = elem("TD", '<img src="data:image;base64,' + imagenes["img" + (ventas[i][3])] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][3])) + '"> ' + ventas[i][1]); tr.appendChild(td);
				td = elem("TD", ventas[i][5] == '1' ? ventas[i][4] : T('NO')); tr.appendChild(td);
				td = elem("TD", ventas[i][6] == '1' ? T('SI') : T('NO')); tr.appendChild(td);

				td = elem("TD", '<a href="javascript:void(0);" onClick="sell.m1.value=' + ventas[i][0] + ';sell.m2.value=' + ventas[i][1] + ';sell.rid1.value=' + ventas[i][2] + ';sell.rid2.value=' + ventas[i][3] + ';sell.d2.value=' + ventas[i][4] + ';sell.d1.checked=' + (ventas[i][5] == '1') + (ventas[i][6] ? ';sell.ally.checked=' + (ventas[i][6] == '1') : '') + ';sell.submit();"><img src="' + img('b/ok1.gif', true) + '" title="' + T('VENDER') + '" alt="' + T('VENDER') + '" border="0"></a>'); tr.appendChild(td);
				tabla.appendChild(tr);

				var enlace = elem("A", " <img src='data:image;base64," + imagenes['delIcon'] + "' width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>");
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
			c += '<img src="data:image;base64' + imagenes["img" + i] + '" border="0" title="' + T('RECURSO' + i) + '">';
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
				b[i] = '<nobr><img src="data:image;base64' + imagenes["constructIcon"] + '" title="' + a.firstChild.childNodes[i].childNodes[1].innerHTML + '"/> <span id="timeouta">' + a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0] + "</span></nobr>"; 
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
           var parametros = ["options", "marcadores", "notas" , "ventas", "bigicons", "noteblock"];
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

	//Center Numbers section
	var _setValue, _getValue, _removeValue, glStorage, nameSpace = 'CN.';

	function CenterNumbersSaveValue() {
		if (typeof GM_setValue != "undefined") {
			_setValue = function(name, value) { GM_setValue(name, value)};
			_getValue = function(name,defaultValue) { return GM_getValue(name, defaultValue)};
			_removeValue = function(name) { GM_setValue(name, '')};
		} else {
			_setValue = function(name, value) {
				document.cookie = nameSpace + name + '=' + escape(value) + ';expires="";path=/';
			};
			_getValue = function(name, defaultValue) {
				var reg = new RegExp(nameSpace + name + "=([^;\n\r]*);?", "i");
				var data = reg.exec(document.cookie);
				if (data == null || data.length <= 1) {
					return defaultValue;	
				} else 	return unescape(data[1]);
			};
			_removeValue = function(name) {
				_setValue(name, '');
			};
		}
	}

	function ShowCenterNumbers(){
		if (location.href.indexOf('dorf2') != -1){
			var cssString = '.CNbuildingtags{' +
			'background-color:#FDF8C1;' + 
			'border:thin solid #000000;' +
			'-moz-border-radius: 2em;' +
			'border-radius: 2em;' +
			'padding-top: 3px;' +
			'font-family: Verdana, Arial, Helvetica, sans-serif;' +
			'font-size:8pt;' +
			'font-weight:bold;' +
			'text-align:center;' +
			'position:absolute;' +
			'width:18px;' +
			'height:15px;' +
			'cursor:pointer;' +
			'visibility:hidden;' +
			'z-index:26;}'
			GM_addStyle(cssString);
			CenterNumbersSaveValue();
			CenterNumbersShowNumbers();
		}
	}

	function CenterNumbersShowNumbers(){
		// Map1 holds building names, level and building spot IDs in area elements
		var map1Element = document.getElementsByName('map1')[0];
		if (map1Element){
			// Map1 ONLY has area children. 
			var areaElements = map1Element.getElementsByTagName('area');	
			var lvlBuilding, aDIV, coords;
			var BuildingURL = new Array(21);
		
			for (var i = 0; i < 22; i++) {
				lvlBuilding = /(\d+)/.exec(areaElements[i].getAttribute("title"));
				BuildingURL = areaElements[i].getAttribute("href");
				coords = areaElements[i].coords.split(',');

				// Only show spots if buildings are available
				if (lvlBuilding){
					var imgId = parseInt(BuildingURL.match(/id\=(\d+)/).pop()) - 18;
					if (imgId == 21) imgId = 'x1';
					if (imgId == 22) {
						gid = 100;
					} else {
						var gid = document.evaluate('//img[@class="d' + imgId + '"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute('src').match(/g(\d+)/).pop();
					}
					aDIV = addDiv('CNbuildingtag' + i,'CNbuildingtags',lvlBuilding[0],false);
					aDIV.style.top = parseInt(coords[1]) + parseInt(60) + 'px';
					aDIV.style.left = parseInt(coords[0]) + parseInt(95) + 'px';
					aDIV.style.visibility = "visible";
					if (lvlBuilding[0] == getMaxLevel(gid)) {
						aDIV.style.backgroundColor = '#0e0';
					}
				}
			}

		}
	}

	// Generic div.
	function addDiv(id,style,html,parent){
		var body, aDIV;
		if (!parent){body = document.getElementsByTagName('body')[0];}else{body = document.getElementsByTagName(parent);}
		if (!body) { return false; }
		aDIV = document.createElement('div');
		aDIV.id = id;
		aDIV.className = style;
		if (html){aDIV.innerHTML = html;}
		document.getElementById('lmid2').appendChild(aDIV);
		return aDIV;
	}

	function getMaxLevel(gid) {
		var maxLevel;
		switch (gid) {
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				maxLevel = 5;
				break;
			case '23':
			case '27':
				maxLevel = 10;
				break;
			case '40':
				maxLevel = 100;
				break;
			default:
				maxLevel = 20;
		}
		return (maxLevel)
	}

	/* Acciones generales a todas las paginas */
	getGeneralData();
	sanearEnlaces();
	hideAd();

    tiempo_ejecucion[tiempo_ejecucion.length]=new Date().getTime();
    loadRemoteStore(function() {
		tiempo_ejecucion[tiempo_ejecucion.length]=new Date().getTime();
    	quickLinks();
		
		var xShowExtendedIcons = obtenerValorCookie("bigicons")
		for (var i = 0; i < xShowExtendedIcons.length; i++) {
		boolShowExtendedIcons = parseInt(xShowExtendedIcons[i])
		}
		
    	buildingLinks(boolShowExtendedIcons);
    	playerLinks();
    	calculateFillTime();
    	cityLinks();
    	borrarCuenta();
        mostrarMarcadores();
		ShowCenterNumbers();

    	/* Acciones especificas para algunas paginas */
    	if (location.href.indexOf('build.php?') != -1){		quickCity(); recursosMercado(); }
    	if (location.href.indexOf('build.php') != -1){
     		calculateBuildTime(); tiempoExplorarUnidades(); tiempoExplorar(); mostrarVentas();
    	}
    	if (location.href.indexOf('dorf1') != -1)		preCalculate1();
    	if (location.href.indexOf('dorf2') != -1)		preCalculate2();
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

/*** Start ***/
// Your ally name
var ally = "Astray";


var server = location.hostname.match(/(\w+[.]travian[.]\w+([.]\w+)?)/i)[1];
var svr = location.hostname.match(/travian[.](\w+)/i)[1] + location.hostname.match(/(\d)[.]travian/i)[1];

var w = window.innerWidth;
var h = window.innerHeight;

var popW = 768, popH = 512;

var leftPos = (w-popW)/2, topPos = (h-popH)/2;

var IMG_UTIL = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQW' +
	'RvYmUgSW1hZ2VSZWFkeXHJZTwAAAIlSURBVHjaNJHLaxNRGMXP3HsnM5NWtBNTm6LmVQ1pQWtFKVWxCtql9YFKFSy1' +
	'qFtXunDlyn9AhII1LgrWRd1YiwsX1kfVgEhFqDVNQkg1TWuSJplJMk8nCw+c3Y+P75zDHX16BH3hPvi3+iFL8k2JSa' +
	'OEciHYHCzDSqqm+mSplJ64GozAw1xgcEQ4slPRq58pSGeDb4AR1uTRMGrtlUa5f1Ndv0tI9KDDFRkhBAWlMG9ZVmdN' +
	'qEM0JfDUBcs24eYEXNw1jHzbRvDRl1j8/vEzXbRyoHa7ZqqX3aIAX4sX7YIMZtjYVEpIFtNYy2exX+7GMf8p+eOP9x' +
	'4G3RgLi16MBM7CRztQqVWQ1zaww7UdK7kkHq7F8Db5CrPX46gWB0bZcM9g5PGlGXxanMO1mXFobht7O0IYiV5AtxRA' +
	'JBzAUNcJVEq/EfswuYWd6znPN4N/zS5gWUmjjfcikUtjni6gBQI8ooypN9N4vTSOVa1gMEOvZRx+963Td5DT/2Lq+0' +
	'uodQ0vludgGgYMzbFpgjrNudziTxod8rRm1v+c7A0OoFfeh2fxaaioQ3CaooRCICIEXgSxnbMmHnCZwnNE711JDIb6' +
	'w4rZQEpbBROa8xBwNoFhG9CrOqolJcFRbg/hwIHx7kOz396lFzcTkLwSBJ8E0SeC38ZDUzQUs6W0qZuHm1n/L10kNg' +
	'uWf5VvqCl1jAo0COcFo66nrLo1SVvpBBVpE8U/AQYAVk3b/vK4ngQAAAAASUVORK5CYII=';

function append(IMG,r) { 
  var child = document.createElement("a");
  child.setAttribute("onclick", "window.open('" + url + "', new Date().getTime(), 'scrollbars=1,width="+popW+",height="+popH+",top="+topPos+",left="+leftPos+"'); return false;");
  child.setAttribute("href", url);
  child.setAttribute("style", "display: inline; margin-left: 3px; margin-right: "+r+"px;");
  child.innerHTML = '<img src="'+IMG+'" />';
  a.parentNode.insertBefore(child,a.nextSibling);
}

for (var i = 0; i < document.links.length; i++) {
  var a = document.links[i];
  if (a.parentNode.className != 'menu') {
    if (a.getAttribute('href').search(/allianz[.]php[?]aid=/i) != -1) {
      var who = a.getAttribute('href').replace(/allianz[.]php[?]aid=/, '');
      url = "http://travutils.com/en/?s="+svr+"&ida="+who;
      append(IMG_UTIL,0);
    } else if (a.getAttribute('href').search(/spieler[.]php[?]uid=/i) != -1) {
      var who = a.getAttribute('href').replace(/spieler[.]php[?]uid=/, '');
      url = "http://travutils.com/en/?s="+svr+"&idu="+who;
      append(IMG_UTIL,0);
    }
  }
}
/*** end ***/


/*window.addEventListener('DOMContentLoaded', funcionPrincipal, false);
if (document.body) funcionPrincipal();
*/
window.addEventListener( 'load', funcionPrincipal, false);
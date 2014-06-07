// ==UserScript==
// @name Travian3 Beyond
// @author Apurba Aka Anxious :D
// @include http://*.travian3.*/*.php*
// @exclude http://*.travian3.*/hilfe.php*
// @exclude http://*.travian3.*/log*.php*
// @exclude http://*.travian3.*/index.php*
// @exclude http://*.travian3.*/anleitung.php*
// @exclude http://*.travian3.*/impressum.php*
// @exclude http://*.travian3.*/anmelden.php*
// @exclude http://*.travian3.*/gutscheine.php*
// @exclude http://*.travian3.*/spielregeln.php*
// @exclude http://*.travian3.*/links.php*
// @exclude http://*.travian3.*/geschichte.php*
// @exclude http://*.travian3.*/tutorial.php*
// @exclude http://*.travian3.*/ad/*
// @exclude http://*.travian3.*/chat/*
// @exclude http://forum.travian3.*
// @exclude http://shop.travian3.*
// @version 2.4 fr
// @description  Extension Travian pour greasemonkey en Francais
// ==/UserScript==

/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/ 
 */

// Funcion principal ejecutada cuando se ha cargado toda la pagina
function funcionPrincipal(e){
	// Momento de inicio de ejecucion del script
	var tiempo_ejecucion = new Date().getTime();

	var version = "2.4";

	var lang_es = new Array();
	lang_es['ALIANZA'] 	= 'Alianza';
	lang_es['PERFIL'] 	= 'Perfil';
	lang_es['SIM'] 		= 'Simulador';
	lang_es['CALC'] 	= 'Calculadora';
	lang_es['SEGURO'] 	= 'Estas seguro?';
	lang_es['MARK'] 	= 'Marcar Todos';
	lang_es['PERDIDAS'] 	= 'Pérdidas en materiales';
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
	lang_es['MANYANA'] 	= 'mañana';
	lang_es['PAS_MANYANA'] 	= 'pasado mañana';
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
	lang_es['TROPAS']	= 'Enviar Tropas';
	lang_es['RECURSO1']	= 'Leña';
	lang_es['RECURSO2']	= 'Barro';
	lang_es['RECURSO3']	= 'Hierro';
	lang_es['RECURSO4']	= 'Cereales';
	lang_es['TIEMPO']	= 'Tiempo';
	lang_es['COMP']		= 'Compactador';
	lang_es['STAT']		= 'Estadística';
	lang_es['OFREZCO']	= 'Ofrezco';
	lang_es['BUSCO']	= 'Busco';
	lang_es['TIPO']		= 'Tipo';
	lang_es['CUALQUIERA']	= 'Cualquiera';
	lang_es['DETALLES']	= 'Detalles';
	lang_es['MAP_EXT']	= 'Mapa extendido';
	lang_es['DISPONIBLE']	= 'Sólo disponibles';
	lang_es['SI']		= 'Sí';
	lang_es['NO']		= 'No';
	lang_es['LOGIN']	= 'Login';
	lang_es['MARCADORES']	= 'Marcadores';
	lang_es['ANYADIR']	= 'Añadir';
	lang_es['ENLACE']	= 'Direccion del nuevo marcador';
	lang_es['TEXTO']	= 'Texto para el nuevo marcador';
	lang_es['ELIMINAR']	= 'Eliminar';
	lang_es['MAPA']		= 'Mapa';
	lang_es['VERSION']	= 'La ultima version disponible es';
	lang_es['MAXTIME']	= 'Tiempo máximo';

	var text_es = new Array();
	text_es['Coordinadas']	= 'Coordenadas';
	text_es['coordinadas']	= 'coordenadas';
	text_es['Corral'] 	= 'Establo';
	text_es['corral']	= 'establo';
	text_es['oder']		= 'o';
	text_es['Ankunft']	= 'Llegada';
	text_es['Plaza reunione']	= 'Plaza de reuniones';

	// Por IcEye y Andres_age
	var lang_en = new Array();
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
	lang_en['COMPRAR'] 	= 'Buy';
	lang_en['VENDER'] 	= 'Sell';
	lang_en['ENVIAR_IGM'] 	= 'Send IGM';
	lang_en['LISTO'] 	= 'Extension available';
	lang_en['EL'] 		= 'on';
	lang_en['A_LAS'] 	= 'at';
	lang_en['EFICIENCIA'] 	= 'Efficiency'; 
	lang_en['NUNCA']	= 'Never';
	lang_en['PC']           = 'culture points';
	lang_en['FUNDAR']       = 'You can found or conquer a new village';
	lang_en['ALDEAS']       = 'Village(s)';
	lang_en['TROPAS']       = 'Send troops';
	lang_en['RECURSO1']     = 'Wood';
	lang_en['RECURSO2']     = 'Clay';
	lang_en['RECURSO3']     = 'Iron';
	lang_en['RECURSO4']     = 'Crop';
	lang_en['TIEMPO']       = 'Time';
	lang_en['COMP']         = 'Report Compressor';
	lang_en['STAT']		= 'Statistic';
	lang_en['CUALQUIERA']	= 'Any';
	lang_en['SI']		= 'Yes';
	lang_en['NO']		= 'No';
        lang_en['MARCADORES']   = 'Bookmarks';
        lang_en['ANYADIR']      = 'Add';
        lang_en['ENLACE']       = 'New Bookmark URL';
        lang_en['TEXTO']        = 'New Bookmark Text';
	lang_en['ELIMINAR']	= 'Delete';
	lang_en['MAPA']		= 'Map';

	// Por IcEye (corregido y actualizado por rosfe)
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
	lang_it['COORD'] 	= 'Coorinate'; 
	lang_it['ACCION'] 	= 'Azioni'; 
	lang_it['ATACAR'] 	= 'Invia truppe'; 
	lang_it['COMERCIAR'] 	= 'Invia mercanti'; 
	lang_it['GUARDADO'] 	= 'GUARDADO';   // FIXME? 
	lang_it['DESP_ABR'] 	= 'Desp.';   // FIXME? 
	lang_it['FALTA'] 	= 'Mancano'; 
	lang_it['HOY'] 		= 'oggi'; 
	lang_it['MANYANA'] 	= 'domani'; 
	lang_it['PAS_MANYANA'] 	= 'dopodomani'; 
	lang_it['MERCADO'] 	= 'Mercato'; 
	lang_it['CUARTEL'] 	= 'Campo d" addestramento'; 
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
	lang_it['PC'] 		= 'punti di cultura'; 
	lang_it['FUNDAR'] 	= 'Che puoi trovare e conquistare'; 
	lang_it['ALDEAS'] 	= 'Villaggio(i)'; 
	lang_it['TROPAS'] 	= 'Invia Truppe'; 
	lang_it['RECURSO1'] 	= 'Legno'; 
	lang_it['RECURSO2'] 	= 'Argilla'; 
	lang_it['RECURSO3'] 	= 'Ferro'; 
	lang_it['RECURSO4'] 	= 'Grano'; 
	lang_it['TIEMPO'] 	= 'Tempo'; 
	lang_it['COMP'] 	= 'Compattatore'; 
	lang_it['STAT'] 	= 'Statistica'; 
	lang_it['OFREZCO'] 	= 'Richiesta'; 
	lang_it['BUSCO'] 	= 'Offerta'; 
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

	// Autor anonimo a peticion expresa
	var lang_de = new Array();
	lang_de['ALIANZA'] 	= 'Allianz';
	lang_de['PERFIL'] 	= 'Profil';
	lang_de['SIM'] 		= 'Kampfsimulator';
	lang_de['CALC'] 	= 'Marktplatzrechner';
	lang_de['SEGURO'] 	= 'Wirklich?';
	lang_de['MARK'] 	= 'Alle';
	lang_de['PERDIDAS'] 	= 'Rohstoff-Verluste';
	lang_de['RENT'] 	= 'Rentabilität';
	lang_de['SUBIR_NIVEL'] 	= 'Ausbau möglich';
	lang_de['JUGADOR'] 	= 'Spieler';
	lang_de['ALDEA'] 	= 'Dorf';
	lang_de['HAB'] 		= 'Einwohner';
	lang_de['COORD'] 	= 'Koordinaten';
	lang_de['ACCION'] 	= 'Aktion';
	lang_de['ATACAR'] 	= 'Angreifen';
	lang_de['COMERCIAR'] 	= 'HÃ½ndler schicken';
	lang_de['GUARDADO'] 	= 'Gespeichert';
	lang_de['DESP_ABR'] 	= 'Felder';
	lang_de['FALTA'] 	= 'Benötige';
	lang_de['HOY'] 		= 'heute';
	lang_de['MANYANA'] 	= 'morgen';
	lang_de['PAS_MANYANA'] 	= 'übermorgen';
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
	lang_de['EFICIENCIA'] 	= 'Effektivität';
	lang_de['NUNCA'] 	= 'Nie';
	lang_de['PC'] 		= 'Kulturpunkte';
	lang_de['FUNDAR'] 	= 'Genug Kulturpunkte';
	lang_de['ALDEAS'] 	= 'weitere Siedlung(en)';
	lang_de['TROPAS'] 	= 'Truppen senden';
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
	lang_fr['SEGURO'] 	= 'Es-tu sûr?'; 
	lang_fr['MARK'] 	= 'Marquer tous'; 
	lang_fr['PERDIDAS'] 	= 'Pertes en matériels'; 
	lang_fr['RENT'] 	= 'Rentabilité'; 
	lang_fr['SUBIR_NIVEL'] 	= 'Tu peux déjà augmenter son niveau'; 
	lang_fr['JUGADOR'] 	= 'Joueur'; 
	lang_fr['ALDEA'] 	= 'Village'; 
	lang_fr['HAB'] 		= 'Population'; 
	lang_fr['COORD'] 	= 'Coordonnées'; 
	lang_fr['ACCION'] 	= 'Actions'; 
	lang_fr['ATACAR'] 	= 'Attaquer'; 
	lang_fr['COMERCIAR'] 	= 'Commercer'; 
	lang_fr['GUARDADO'] 	= 'Sauvegarde'; 
	lang_fr['DESP_ABR'] 	= 'Déplacer'; 
	lang_fr['FALTA'] 	= 'Il manque'; 
	lang_fr['HOY'] 		= 'aujourd\'hui'; 
	lang_fr['MANYANA'] 	= 'demain'; 
	lang_fr['PAS_MANYANA'] 	= 'après-demain'; 
	lang_fr['MERCADO'] 	= 'Place du marché'; 
	lang_fr['CUARTEL'] 	= 'Caserne'; 
	lang_fr['PUNTO'] 	= 'Place de rassemblement'; 
	lang_fr['CORRAL'] 	= 'Ecurie'; 
	lang_fr['TALLER'] 	= 'Atelier'; 
	lang_fr['ENVIAR'] 	= 'Envoyer des ressources'; 
	lang_fr['COMPRAR'] 	= 'Acheter des ressources'; 
	lang_fr['VENDER'] 	= 'Vendre des resources'; 
	lang_fr['ENVIAR_IGM'] 	= 'Envoyer MSG'; 
	lang_fr['LISTO'] 	= 'Prêt'; 
	lang_fr['EL'] 		= 'le'; 
	lang_fr['A_LAS'] 	= 'à'; 
	lang_fr['EFICIENCIA'] 	= 'Efficacité'; 
	lang_fr['NUNCA'] 	= 'Jamais'; 
	lang_fr['PC'] 		= 'point(s) de culture'; 
	lang_fr['FUNDAR'] 	= 'Tu peux déjà coloniser ou conquérir'; 
	lang_fr['ALDEAS'] 	= 'village(s)'; 
	lang_fr['TROPAS'] 	= 'Envoyer unités'; 
	lang_fr['RECURSO1'] 	= 'Bois'; 
	lang_fr['RECURSO2'] 	= 'Terre'; 
	lang_fr['RECURSO3'] 	= 'Fer'; 
	lang_fr['RECURSO4'] 	= 'Céréales'; 
	lang_fr['TIEMPO'] 	= 'Temps'; 
	lang_fr['COMP'] 	= 'Compresseur';
	lang_fr['STAT']		= 'Statistiques';
	lang_fr['OFREZCO']	= 'Offre';
	lang_fr['BUSCO']	= 'Recherche';
	lang_fr['TIPO']		= 'Type';
	lang_fr['CUALQUIERA']	= 'Toutes';
	lang_fr['DETALLES']	= 'Détail';
	lang_fr['MAP_EXT']	= 'Carte etendue';
        lang_fr['DISPONIBLE']   = 'Disponible';
        lang_fr['SI']           = 'Oui';
        lang_fr['NO']           = 'Non';
        lang_fr['MARCADORES']   = 'Liens';
        lang_fr['ANYADIR']      = 'Ajouter';
        lang_fr['ENLACE']       = 'URL du nouveau lien';
        lang_fr['TEXTO']        = 'Texte du nouveau lien';

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
	lang_nl['COORD'] 	= 'Coörd';
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
	lang_nl['EFICIENCIA'] 	= 'Efficiëntie';
	lang_nl['NUNCA'] 	= 'Nooit';
	lang_nl['PC'] 		= 'cultuur punten';
	lang_nl['FUNDAR'] 	= 'Je kan een nieuwe stad oprichten of veroveren';
	lang_nl['ALDEAS'] 	= 'Dorp(en)';
	lang_nl['TROPAS'] 	= 'Stuur troepen';
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

	// Por MikeP (Dedicado Ã¡ Li), corregido y amplicado por JoÃ£o Frade
	var lang_pt = new Array();
	lang_pt['ACCION'] 	= 'Acções';
	lang_pt['A_LAS'] 	= 'ás';
	lang_pt['ALDEA'] 	= 'Nome da Aldeia';
	lang_pt['ALDEAS'] 	= 'Aldeia(s)';
	lang_pt['ALIANZA'] 	= 'Aliança';
	lang_pt['ANYADIR']	= 'Adicionar';
	lang_pt['ATACAR'] 	= 'Atacar';
	lang_pt['BUSCO']	= 'Pede';
	lang_pt['CALC'] 	= 'Calculadora';
	lang_pt['COMERCIAR'] 	= 'Enviar recursos';
	lang_pt['COMP'] 	= 'Compactador de Batalhas';
	lang_pt['COMPRAR']	= 'Comprar matérias primas';
	lang_pt['COORD'] 	= 'Coordenadas';
	lang_pt['CORRAL'] 	= 'Cavalariça';
	lang_pt['CUALQUIERA'] 	= 'Qualquer';
	lang_pt['CUARTEL'] 	= 'Quartel';
	lang_pt['DESP_ABR'] 	= 'Mov.';
	lang_pt['DETALLES']	= 'Detalhes';
	lang_pt['DISPONIBLE']	= 'Só disponíveis';
	lang_pt['EFICIENCIA'] 	= 'Eficiência';
	lang_pt['EL'] 		= 'a';
	lang_pt['ELIMINAR']	= 'Eliminar';
	lang_pt['ENLACE']	= 'Sitio do novo atalho';
	lang_pt['ENVIAR']	= 'Enviar matérias primas';
	lang_pt['ENVIAR_IGM'] 	= 'Enviar IGM';
	lang_pt['FALTA'] 	= 'Faltam';
	lang_pt['FUNDAR'] 	= 'Podes fundar ou conquistar uma nova aldeia';
	lang_pt['GUARDADO'] 	= 'Guardado';
	lang_pt['HAB'] 		= 'Habitantes';
	lang_pt['HOY'] 		= 'hoje';
	lang_pt['JUGADOR'] 	= 'Jogador';
	lang_pt['LISTO'] 	= 'Disponível';
	lang_pt['LOGIN']	= 'Login';
	lang_pt['MANYANA'] 	= 'amanhã';
	lang_pt['MAP_EXT']	= 'Mapa extendido';
	lang_pt['MARCADORES']	= 'Atalhos';
	lang_pt['MARK'] 	= 'Seleccionar tudo';
	lang_pt['MERCADO']	= 'Mercado';
	lang_pt['NO'] 		= 'Não';
	lang_pt['NUNCA']	= 'Nunca';
	lang_pt['OFREZCO']	= 'Oferece';
	lang_pt['PAS_MANYANA'] 	= 'depois de amanhã';
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
	lang_pt['STAT'] 	= 'Estatística';
	lang_pt['SUBIR_NIVEL'] 	= 'Já podes subir de nível';
	lang_pt['TALLER'] 	= 'Oficina';
	lang_pt['TEXTO']	= 'Texto para o novo atalho';
	lang_pt['TIEMPO'] 	= 'Tempo';
	lang_pt['TIPO']		= 'Tipo';
	lang_pt['TROPAS'] 	= 'Enviar tropas';
	lang_pt['VENDER']	= 'Vender matérias primas';

	// Por Vladimir Yu Belov
	var lang_ru = new Array();
	lang_ru['ALIANZA'] 	= ';LO=A';
	lang_ru['PERFIL'] 	= '@>D8;L';
	lang_ru['SIM'] 		= '!8<C;OB>@ A@065=8O';
	lang_ru['CALC'] 	= 'Travian Calc';
	lang_ru['SEGURO'] 	= 'K C25@5=K?';
	lang_ru['MARK'] 	= 'K1@0BL 2A5';
	lang_ru['PERDIDAS'] 	= '>B5@8';
	lang_ru['RENT'] 	= '>E>4';
	lang_ru['SUBIR_NIVEL'] 	= '>7<>6=> @0728B85';
	lang_ru['JUGADOR'] 	= '3@>:';
	lang_ru['ALDEA'] 	= '0720=85 ?>A5;5=8O';
	lang_ru['HAB'] 		= '0A5;5=85';
	lang_ru['COORD'] 	= '>>@48=0BK';
	lang_ru['ACCION'] 	= '59AB28O';
	lang_ru['ATACAR'] 	= 'B0:>20BL';
	lang_ru['COMERCIAR'] 	= '>A;0BL @5AC@AK';
	lang_ru['GUARDADO'] 	= 'Saved';
	lang_ru['DESP_ABR'] 	= 'Mov.';
	lang_ru['FALTA'] 	= '5>1E>48<>';
	lang_ru['HOY'] 		= 'A53>4=O';
	lang_ru['MANYANA'] 	= '702B@0';
	lang_ru['PAS_MANYANA'] 	= '?>A;5702B@0';
	lang_ru['MERCADO'] 	= ' K=>:';
	lang_ru['CUARTEL'] 	= '070@<0';
	lang_ru['PUNTO'] 	= 'C=:B A1>@0';
	lang_ru['CORRAL'] 	= '>=NH=O';
	lang_ru['TALLER'] 	= '0AB5@A:0O';
	lang_ru['ENVIAR'] 	= '>A;0BL @5AC@AK';
	lang_ru['COMPRAR'] 	= 'C?8BL';
	lang_ru['VENDER'] 	= '@>40BL';
	lang_ru['ENVIAR_IGM'] 	= '>A;0BL A>>1I5=85';
	lang_ru['LISTO'] 	= ' 0728B85 1C45B 2>7<>6=>';
	lang_ru['EL'] 		= '';
	lang_ru['A_LAS'] 	= '2';
	lang_ru['EFICIENCIA'] 	= 'Efficiency'; 
	lang_ru['NUNCA']	= '8:>340';
	lang_ru['PC']           = '548=8F :C;LBC@K';
	lang_ru['FUNDAR']       = 'K <>65B5 >A=>20BL =>2>5 8;8 70E20B8BL GC6>5 ?>A5;5=85';
	lang_ru['ALDEAS']       = 'Village(s)';
	lang_ru['TROPAS']       = '>A;0BL 2>9A:0';
	lang_ru['RECURSO1']     = '@525A8=0';
	lang_ru['RECURSO2']     = ';8=0';
	lang_ru['RECURSO3']     = '5;57>';
	lang_ru['RECURSO4']     = '5@=>';
	lang_ru['TIEMPO']       = 'Time';
	lang_ru['COMP']         = 'Report Compressor';
	lang_ru['STAT']		= '!B0B8AB8:0';
	lang_ru['OFREZCO']	= '@>4060';
	lang_ru['BUSCO']	= '>:C?:0';
	lang_ru['TIPO']		= '!>>B=>H5=85';
	lang_ru['CUALQUIERA']	= 'A5';
	lang_ru['SI']		= '0';
	lang_ru['NO']		= '5B';
        lang_ru['MARCADORES']   = '0:;04:8';
        lang_ru['ANYADIR']      = '>1028BL';
        lang_ru['ENLACE']       = 'URL =>2>9 70:;04:8';
        lang_ru['TEXTO']        = '03>;>2>: =>2>9 70:;04:8';
	lang_ru['ELIMINAR']	= '#40;8BL';
	lang_ru['MAPA']		= 'Map';
	lang_ru['DISPONIBLE']	= '">;L:> 4>ABC?=K5 4;O ?>:C?:8';

/*
	// Turco (travian.com.tr)
	var lang_tr = new Array(); 

	// Polaco (travian3.pl)
	var lang_pl = new Array(); 

	// Rumano (travian.ro)
	var lang_ro = new Array();

	// Danes (travian.dk)
	var lang_dk = new Array();
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
		[500, 440, 380, 1240],  	// Level 1
		[900, 790, 685, 2230],  	// Level 2
		[1620, 1425, 1230, 4020],  	// Level 3
		[2915, 2565, 2215, 7230], 	// Level 4
		[5250, 4620, 3990, 13015], 	// Level 5
	];

	// Ladrillar
	var brickyardCost = [
		[0, 0, 0, 0], 			// Level 0
		[440, 480, 320, 50],  		// Level 1
		[790, 865, 575, 90],  		// Level 2
		[1425, 1555, 1035, 160],  	// Level 3
		[2565, 2800, 1865, 290], 	// Level 4
		[4620, 5040, 3360, 525], 	// Level 5
	];

	// Serreria
	var sawmillCost = [
		[0, 0, 0, 0], 			// Level 0
		[520, 380, 290, 90],  		// Level 1
		[935, 685, 520, 160],  		// Level 2
		[1685, 1230, 940, 290],  	// Level 3
		[3035, 2215, 1690, 525], 	// Level 4
		[5460, 3990, 3045, 945], 	// Level 5
	];

	// Fundicion de hierro
	var ironFoundryCost = [
		[0, 0, 0, 0], 			// Level 0
		[200, 450, 510, 120],  		// Level 1
		[360, 810, 920, 215],  		// Level 2
		[650, 1460, 1650, 390],  	// Level 3
		[1165, 2625, 2975, 700], 	// Level 4
		[2100, 4725, 5355, 1260], 	// Level 5
	];

	// Panaderia
	var bakeryCost = [
		[0, 0, 0, 0], 			// Level 0
		[1200, 1480, 870, 1600],  	// Level 1
		[2160, 2665, 1565, 2880],  	// Level 2
		[3890, 4795, 2820, 5185],  	// Level 3
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

	var buildingCost = new Array(38);
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
	uc[32] = [0, 0, 0, 0, 0];		// AraÃ±a
	uc[33] = [0, 0, 0, 0, 0];		// Serpiente
	uc[34] = [0, 0, 0, 0, 0];		// Murcielago
	uc[35] = [0, 0, 0, 0, 0];		// Jabali
	uc[36] = [0, 0, 0, 0, 0];		// Lobo
	uc[37] = [0, 0, 0, 0, 0];		// Oso
	uc[38] = [0, 0, 0, 0, 0];		// Cocodrilo
	uc[39] = [0, 0, 0, 0, 0];		// Tigre
	uc[40] = [0, 0, 0, 0, 0];		// Elefante

	uc[98] = [0, 0, 0, 0, 0];		// Trampa?
	uc[99] = [0, 0, 0, 0, 0];		// Trampa?

	var actual = new Array(4);		// Informacion de recursos almacenados
	var total = new Array(4);		// Capacidad de los almacenes y granero
	var produccion = new Array(4);		// Produccion por segundo
	var imagenes = new Array();		// Imagenes pre-cargadas

	// Indica para que servidores esta disponible el servicio de Travian World
	// IMPORTANTE: Por favor, no cambiar / Please, don't change. Travian World is only available for the servers indicated below
	var tw_server = ["s3.travian.net"];

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
	imagenes["empalizada"] = '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
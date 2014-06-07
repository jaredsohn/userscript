// ==UserScript==
// @name           Easy Rider OA
// @namespace      Snaquekiller
// @version        0.4.7a
// @author       snaquekiller (93% ) & Mushroom ( 3% ) & Vulca (3%) & Martineli (1%)
// @description   Easy Rider OA
// @date 2010-09-07
// @include        http://*/game/index.php?page=*
// @history	0.4.6a correction d'un bug si le scan ettait ;;;;;;;;;;x 
// @history	0.4.5a correction d'un bug si le classement etait different.
// @exclude http://*/game/index.php?page=buddies*
// @exclude http://*/game/index.php?page=notices*
// @exclude http://*/game/index.php?page=search*

// ==/UserScript==

/*=================================================================================================================

	
// if ( document.getElementById('playerName') ||document.getElementById('combatreport') || document.getElementsByClassName("playerName")[0] || document.getElementsByClassName("contentBoxBody")[0] )//## verification qu'on est bien sur les anciens uni.
// {

/************************************************************** VARIABLE DE BASE ******************************************************************/
/* ******************************************************************************************************************************************** */
	// variable : 
	var Version = '0.4.7';
	var url = location.href;
	var adresse = location.href.split('/')[4]; // location.href c'est l'adresse internet de la page
	var adresse_e = adresse.split('&')[0];
	
	//merci vulca ^^
	var serveur = url.split('/')[2];

	var date = new Date();

	var session = document.location.href.replace(/^.*&session=([0-9a-f]*).*$/i,"$1");
	var date = new Date();
	var start_time = (new Date()).getTime();
	
	// on recupere le pseudo
	if(document.getElementById('playerName'))
	{
		var pseudo = document.getElementById("playerName").getElementsByTagName('span')[0].innerHTML;
		GM_setValue('pseudo_' + serveur, pseudo); 
	}
	else {var pseudo = GM_getValue('pseudo_' + serveur, '0'); }


// ############### Option #####################"
	//arme/bouclier/protect/combus/impul/hyper/coordonee/date/option/ressource/classement/sauvegard auto/temps garde scan/exversion
	// /coul_att/coul_att_g/coul_dest/lien/remplace/lien esp/rec/itesse/tps_vol/nom_j/nom_p/coord_q/prod_h/ress_h

//var option_split_ancien = GM_getValue('option'+ serveur, '0/0/0/0/0/0/x:xxx:x/1/0/0/12/1/4320/'+ Version +'/#C7050D/#E71558/#FFB027/1/0/0/0/10/0/1/1/1/0/0/1/0').split('/'); 

var option1 = GM_getValue('option1'+ serveur, '0/0/0/0/0/0/x:xxx:x/4000/0.3/0');
var option2 = GM_getValue('option2'+ serveur, '0/100/100/0/12/1/0/4320/1/1');
var option3 = GM_getValue('option3'+ serveur, '#C7050D/#025716/#FFB027/#E75A4F/#33CF57/#EFE67F');
var option4 = GM_getValue('option4'+ serveur, '1/0/0/0/1/1/1/1/0/0/0/1/0/0/0/0/1/0');
var option5 = GM_getValue('option5'+ serveur, navigator.language);
var ex_version = GM_getValue('exversion'+ serveur, '38');

if(ex_version.replace( /[^0-9-]/g, "") < 36)
{
	//GM_setValue('option'+ serveur, '0/0/0/0/0/0/x:xxx:x/1/0/0/12/1/4320/'+ Version +'/#C7050D/#E71558/#FFB027/1/0/0/0/10/0/1/1/1/0/0/1/0'); 
		GM_setValue('option1'+ serveur, '0/0/0/0/0/0/x:xxx:x/4000/0.3/0');
		GM_setValue('option2'+ serveur, '0/100/100/0/12/1/0/4320/1/1');
		GM_setValue('option3'+ serveur, '#C7050D/#025716/#FFB027/#E75A4F/#33CF57/#EFE67F');
		GM_setValue('option4'+ serveur, '1/0/0/0/1/1/1/1/0/0/0/1/0/0/0/0/1/0');
		GM_setValue('exversion'+ serveur, Version);
		
		GM_setValue('scan'+ serveur, '')
	fadeBoxx(text.vari_res, 0, 10000);
	var option1 = GM_getValue('option1'+ serveur, '0/0/0/0/0/0/x:xxx:x/4000/0.3/0');
	var option2 = GM_getValue('option2'+ serveur, '0/100/100/0/12/1/0/4320/1/1');
	var option3 = GM_getValue('option3'+ serveur, '#C7050D/#025716/#FFB027/#E75A4F/#33CF57/#EFE67F');
	var option4 = GM_getValue('option4'+ serveur, '1/0/0/0/1/1/1/1/0/0/0/1/0/0/0/0/1/0');
}
else if(ex_version.replace( /[^0-9-]/g, "") < 38)
{
	GM_setValue('option2'+ serveur, '0/100/100/0/12/1/0/4320/1/1');
	GM_setValue('option3'+ serveur, '#C7050D/#025716/#FFB027/#E75A4F/#33CF57/#EFE67F');
	GM_setValue('option4'+ serveur, '1/0/0/0/1/1/1/1/0/0/0/1/0/0/0/0/1/0');
	var option2 = GM_getValue('option2'+ serveur, '0/100/100/0/12/1/0/4320/1/1');
	var option3 = GM_getValue('option3'+ serveur, '#C7050D/#025716/#FFB027/#E75A4F/#33CF57/#EFE67F');
	var option4 = GM_getValue('option4'+ serveur, '1/0/0/0/1/1/1/1/0/0/0/1/0/0/0/0/1/0');
	
}else if(ex_version.replace( /[^0-9-]/g, "") < 39)
{
	GM_setValue('option2'+ serveur, '0/100/100/0/12/1/0/4320/1/1');
	GM_setValue('option4'+ serveur, '1/0/0/0/1/1/1/1/0/0/0/1/0/0/0/0/1/0');
	GM_setValue('exversion'+ serveur, Version);

	fadeBoxx(text.vari_res, 0, 10000);
	var option2 = GM_getValue('option2'+ serveur, '0/100/100/0/12/1/0/4320/1/1');
	var option4 = GM_getValue('option4'+ serveur, '1/0/0/0/1/1/1/1/0/0/0/1/0/0/0/0/1/0');
	var ex_version = GM_getValue('exversion'+ serveur, '34');
}else if(ex_version.replace( /[^0-9-]/g, "") < 42)
{
	GM_setValue('exversion'+ serveur, Version);
	GM_setValue('scan'+ serveur, '')

	fadeBoxx(text.vari_res, 0, 10000);
	var ex_version = GM_getValue('exversion'+ serveur, '34');
}

var option1_split = option1.split('/');
var option2_split = option2.split('/');
var option3_split = option3.split('/');
var option4_split = option4.split('/');
var option5_split = option5;


//votre compte
	var tech_arme_a = option1_split[0];
	var tech_bouclier_a = option1_split[1];
	var tech_protect_a = option1_split[2];

	var tech_combus_a = option1_split[3];
	var tech_impul_a = option1_split[4];
	var tech_hyper_a = option1_split[5];

	var pos_depart = option1_split[6];
	var vaisseau_lent = option1_split[7];
	if(option1_split[8]){var pourcent_cdr =  parseFloat(option1_split[8]);}else{var pourcent_cdr = 0.3;}
	if(option1_split[9]){var pourcent_cdr_def =  parseFloat(option1_split[9]);}else{var pourcent_cdr_def = 0;}
	
	// if(option1_split[10]){var vitesse_uni = option1_split[10];}else{var vitesse_uni = 1;}
	var vitesse_uni = parseInt(GM_getValue('vitesse_uni', '1'));

//choix
	var nb_scan_accpte = option2_split[0];// valeur de ressource a partir de laquel il prend le scan
	var valeur_cdr_mini = option2_split[1];// valeur de cdr a partir de laquel il prend le scan
	var valeur_tot_mini = option2_split[2];// valeur de total a partir de laquel il prend le scan
	var type_prend_scan = option2_split[3];// valeur de ressource a partir de laquel il prend le scan
	var classement = option2_split[4];//0 date ; 1 coordonee ; 2 joueur ; 3 nom ^planette ; 4 ressource  metal; 5 cristal ; 6 deut ; 7 activite  ; 8 cdr possible ; 9 vaisseau; 10 defense ; 11 idrc ; 12 ressource total,13 reherche , 14 type de planette (lune ou planette)	
	var scan_preenrgistre = option2_split[5];// si le scan est enregistre lorsqu'on le regarde ou seulement quand on clique sur enregistre.
	var scan_remplace = option2_split[6];
	var nb_minutesgardescan = option2_split[7];
		var minutes_opt = Math.floor(parseInt(nb_minutesgardescan)%60);
		var nb_minutesgardescan2 = parseInt(nb_minutesgardescan) - minutes_opt;
		var heures_opt = Math.floor(Math.floor(parseInt(nb_minutesgardescan2)/60)%24);
		var nb_minutesgardescan2 = parseInt(nb_minutesgardescan2) - heures_opt*60;
		var jours_opt = Math.floor(parseInt(nb_minutesgardescan2)/60/24);
		var nb_ms_garde_scan = nb_minutesgardescan*60*1000 ;
	var import_q_rep = option2_split[8];
	if(option2_split[9] != undefined){var reverse = option2_split[9];}else{var reverse = 0;}


//couleur
	var col_att = option3_split[0];
	var col_att_g = option3_split[1];
	var col_dest = option3_split[2];
	var col_att_r = option3_split[3];
	var col_att_g_r = option3_split[4];
	var col_dest_r = option3_split[5];

//afichage	
	var lien_h_g = option4_split[0];
	var espionnage_lien = option4_split[1];
	var cdr_quest = option4_split[2];
	var tps_vol_q = option4_split[3];
	var nom_j_q_q = option4_split[4];
	var nom_p_q_q = option4_split[5];
	var coor_q_q = option4_split[6];
	var date_affiche = option4_split[7];//0 date non affiche, 1 date affiche
	var q_date_type_rep = option4_split[8];
	var prod_h_q = option4_split[9];
	var prod_gg = option4_split[10];
		var prod_min_g = Math.floor(parseInt(prod_gg)%60);
		var nb_minutesgardescan3 = parseInt(prod_gg) - prod_min_g;
		var prod_h_g = Math.floor(Math.floor(parseInt(nb_minutesgardescan3)/60)%24);
		nb_minutesgardescan3 = parseInt(nb_minutesgardescan3) - prod_h_g*60;
		var prod_j_g = Math.floor(parseInt(nb_minutesgardescan3)/60/24);
	var simulateur = option4_split[11];
	var q_mess = option4_split[12];
	var nb_scan_page = option4_split[13];
	var question_rassemble_col = option4_split[14];
	var q_techzero = option4_split[15];
	if(option4_split[16] != undefined){var q_icone_mess = option4_split[16];}else{var q_icone_mess = 1;}
	if(option4_split[17] != undefined){var q_vid_colo = option4_split[17];}else{var q_vid_colo = 0;}

// langue
	var langue = option5_split;

// ########################################## BBCODE ###################################################
	var option_bccodes = GM_getValue('option_bbcode'+ serveur, '#872300/#EF8B16/#DFEF52/#CDF78B/#6BD77A/#6BD7AC/#6BC5D7/#6B7ED7/1/1/0/1'); 
var option_bbcode_split = option_bccodes.split('/');
var center_typeq = option_bbcode_split[8];
var q_url_type = option_bbcode_split[9];
var q_centre = option_bbcode_split[10];
var q_cite = option_bbcode_split[11];

var couleur2 = new Array();
var bbcode_baliseo = new Array();
var bbcode_balisem = new Array();
var bbcode_balisef = new Array();

	// couleur2[0]= option_bbcode_split[0];           // 
	couleur2[1]= option_bbcode_split[1];		// 
	couleur2[2]= option_bbcode_split[2];		// 
	couleur2[3]= option_bbcode_split[3];			// 
	couleur2[4]= option_bbcode_split[4];			// 
	couleur2[5]= option_bbcode_split[5];			// 
	couleur2[6]= option_bbcode_split[6];		// 
	couleur2[7]= option_bbcode_split[7];			// 
	// couleur2[8]='#956BD7';			// 
	// couleur2[9]='#BD6BD7';			// 
	// couleur2[10]='#D76BCB';			// 
	// couleur2[11]='#D76B6F';			// 

	bbcode_baliseo[0] = '[b]'; //balise gras ouvert
	bbcode_balisef[0] = '[/b]'; //balise gras fermer
	
	bbcode_baliseo[1] = '[i]';//balise italique ouvert
	bbcode_balisef[1] = '[/i]';//balise italique fermer		
	
	bbcode_baliseo[2] = '[u]';//balise souligne ouvert
	bbcode_balisef[2] = '[/u]';//balise souligne fermer

	bbcode_baliseo[3] = '[u]';//balise souligne ouvert
	bbcode_balisef[3] = '[/u]';//balise souligne fermer
	
	bbcode_baliseo[4] = '[quote]';//balise citation ouvert
	bbcode_balisef[4] = '[/quote]';//balise citation fermer
	
	if(option_bbcode_split[9] == 1)
	{
		bbcode_baliseo[5] = '[url=\'';//balise citation ouvert
		bbcode_balisem[5] = '\']';//balise citation ouvert
		bbcode_balisef[5] = '[/url]';//balise citation fermer
	}
	else{
		bbcode_baliseo[5] = '[url=';//balise citation ouvert
		bbcode_balisem[5] = ']';//balise citation ouvert
		bbcode_balisef[5] = '[/url]';//balise citation fermer
	}
	
	if(option_bbcode_split[8] == 1){
		bbcode_baliseo[10] = '[align=center';//balise align ouvert
		bbcode_balisem[10] = ']';//balise align milieu
		bbcode_balisef[10] = '[/align]';//balise align fermer
	}else{							
		bbcode_baliseo[10] = '[center';//balise align ouvert
		bbcode_balisem[10] = ']';//balise align milieu
		bbcode_balisef[10] = '[/center]';//balise align fermer
	}	
	
	bbcode_baliseo[8] = '[color=';//balise color ouvert
	bbcode_balisem[8] = ']';//balise color milieu
	bbcode_balisef[8] = '[/color]';//balise color fermer
/******************************************************************** LANGUE ******************************************************************/
//######################################## / Langue  /################################################/
	var text = new Array();
	var vari = new Array();

	text = 
	{
//option mon compte 
		moncompte:'Mon compte ',
		vos_techno:'Vos techno : ',		
		q_coord:'Coordonnées de départ de vos flottes',
		q_vaisseau_min:'Quelle est votre vaisseau le plus lent dans la flotte que vous utilisez ?',
		pourcent:'Votre univers met combien de pourcentage de vaisseaux dans le cdr ?',
		pourcent_def:'Votre univers met combien de pourcentage de defense dans le cdr ?',
		vitesse_uni:'Quelle est la vitesse de votre univers ?',
		
		// option variable
		choix_certaine_vari:'Choix pour certaine variable',
		q_apartir:'Ne prendre les scans qu\'à partir de',
		apartir:'de ressources total .',
		q_cdrmin:'Cdr minimum ',
		q_totmin:'Cdr + Ressources récupérables minimum',
		q_prend_type:'Ne prendre les scans avec ',
			rep_0_prend:' Cdr> x ou ressource > y',
			rep_1_prend:' Cdr> x et ressource > y',
			rep_2_prend:' Cdr + ressource > z',
		q_class:'Classer le tableau par ',
			c_date:'Date',
			c_coo:'Coordonnées',
			c_nj:'Nom de Joueur',
			c_np:'Nom de Planète',
			c_met:'Métal',
			c_cri:'Cristal',
			c_deu:'Deut',
			c_acti:'Activité',
			c_cdr:'Cdr possible',
			c_nbv:'Nb Vaisseau',
			c_nbd:'Nb Défense',
			c_ress:'Ressource Total',
			c_type:'Type (lune ou planette)',
			c_cdrress:'Ressource+Cdr',
		ressourcexh:'Ressource dans x heures',
		prod_classement:'Production', 
		q_reverse:'Le classement sera par ordre :',
			descroissant:' decroissant',
			croissant:' croissant',
		q_sae_auto:'Sauvegarde automatique des scans dès leur visionnage? ',
		remp_scn:'Remplacer automatiquement les scans sur une meme planète ? ',
		q_garde:'Ne prend pas et supprime les scans vieux de plus ',
			jours:'jours',
			heures:'heures',
			min:'minutes',
		import_q:'Lors de l\'importation, les scans ',
			import_q0:'remplacent les autres ',
			import_q1:' sont ajoutés aux autres',	
			
		//couleur ligne
		couleur_ligne:'Couleur ligne ',
		q_color:' Couleur de la ligne d\'une cible si une flotte arrive en mode',
		attt:'Attaquer',
		ag:'Attaque Groupée ',
		det:'Détruire',	
		att_r:'Attaquer (R)',
		ag_r:'Attaque Groupée (R)',
		det_r:'Détruire (R)',
		
		//option affichage
		option_affichage:'Option d\'affichage ',
		lienraide:'Mettre le lien Raide-Facile ',
			En_haut:'En haut',
			gauche:'A Gauche',
		lienespi:'Le lien d\'espionnage emmène :',
			page_f:'Sur la page flotte',
			page_g:'Sur la page galaxie',
		cdr_q:'Le comptage de cdr est affiché : ',
			recyclc:' en nombre de recycleur ',
			ressousrce:'en nombre de ressource',
		tps_vol:'Afficher le temps de vol ?',
		nom_j_q:'Afficher le nom du joueur ?',
		nom_p_q:'Afficher le nom de la planète ?',
		autre_planette:'Supprimer le nom de planète mais l\'afficher en passant la souris sur les coordonnées',
		coor_q:'Afficher de les coordonnés de la planète ?',
		q_date:'Afficher la date dans le tableau ?',
		q_date_type:'Pour la date on affiche ?',
			q_date_type0:'Un chrono',
			q_date_type1:'L\'heure du scan',
		q_prod:'Afficher la production par heure de la planète ?',
		q_ress_h:'Afficher les ressources dans (0 = pas affiché)',
		mess_q:'Afficher un lien vers le véritable message ?',
		q_simul:'Quel simulateur voulez-vous utiliser ?',
			drago:'Dragosim',
			speed:'Speedsim',
			ogwinner:'Ogame-Winner',
			simu_exte:'ou mettre le scan dans une zone de texte pour l\'exporté autre part.',			
		page:'Combien de scan voulez afficher par page ?(0=tous)',		
		question_rassemble_cdr_ress:'Voulez-vous rassembler les colones de ressources et de cdr ?',
		q_techn_sizero:'Voulez-vous mettre vos techno a 0 si celle de la cible sont inconnue ?',
		question_afficher_icone_mess:'Voulez-vous affichez les icones dans la partie messages ?',
		q_afficher_dernier_vid_colo:'Afficher l\'heure du dernier vidage de la colonie(approximatif) ?',
		
		//option bbcode
		text_centre:'Voulez-vous centrer le bbcode ?',
		text_cite:'Voulez-vous mettre en citation le bbcode ?',
		balise_centre:'Quelle balise utilisez-vous pour centrer le texte ?',
		balise1_center:'[align=center]',
		balise2_center:'[center]',
		balise_url:'Quelle balise utilisez-vous pour les url ?',
		balise1_url:'[url=\'adress\']',
		balise2_url:'[url=adresse]',
		color:'couleur',
		
		// tableau icone et autre
		espionner:'|Espionner',
		eff_rapp:'|Effacer ce rapport',
		att:'|Attaquer',
		simul:'|Simuler',
		mise_jours:'Mise à jour possible pour Raide-Facile',
		cdr_pos:'Cdr poss',		
		dated:'Date',		
		th_nj:'Joueur',
		th_coo:'Coordonnées',
		th_np:'Planète',
		th_ress:'Ressource(pt/gt)',
		th_nv:'# Flottes',
		th_nd:'# Défense',
		metal:'Métal',
		met_rc:'Métal Recyclable',
		cristal:'Cristal',
		cri_rc:'Cristal Recyclable',
		nb_rc:'Nombre de Recycleur',
		deut:'Deut',
		nb_recycl:'Nb Recyleur',
		retour_f:'Retour ',
		arriv_f:'Arrivée ',
		tmp_vol_th:'Temps de Vol',
		prod_h_th:'Prod/h',
		ressource_xh_th:'Ressource x Heures',
		th_ress_cdr_col:'Cdr+Ress',
		th_h_vidage:'Heure vidage',
		
		//autre messages.
		vari_res:'Variables de raides et options remis à zéro dû au changement de version, désolé.',
		q_reset:'Voulez-vous remettre à zero toutes les variables de raide?',
		reset:'Remise a zero effectué. Actualisé la page pour voir la différence.',
		q_reset_o:'Voulez-vous remetre à zero toute les options ?',
		reset_s:'Remise à zéro effectuée. Actualisez la page pour voir la différence.',
		option_sv:'Options de Raide-Facile sauvegardées',
		raide_facil:'Raide-Facile',
		del_scan:'Scans supprimés, rafraîchissement de la page',
		del_scan_d:'|Effacer ce message',
		del_scan_script:'Effacer mess + scan script',
		del_script:'Effacer scan script',
		enleve_script:'|Enlever le scan du script',
		add_scan:'|Ajouter le scan du script',
		add_scan_d:'Ajouter scan script',
		save_optis:'Sauvegarder les options',
		remis_z:'Remise à zéro.',
		supr_scan_coche:'Supprimer les scans cochés',
		supr_scan_coche_nnslec:'Supprimer les scans non cochés',
		oui:'oui',
		non:'non',
		batiment_non_visible:'Batiment non visible',
		rep_mess_supri:'Messages Suprimmés',
		
		//import / export	
		export_scan_se:'exporter les scans selectionnés',
		export_scan_nnse:'exporter les scans non selectionnés',
		importer_scan:'Importer les scans',
		import_rep:'Scan importé et ajouté a votre base de données',
		importt:'Import :',
		exportt:'Export :',
			
		//bouton messages
		spr_scrptscan_a:'Supprimer Scan et Scan script affiché',
		spr_scrptscan_ns:'Supprimer Scan et Scan script non sélectionné',
		spr_scrptscan_s:'Supprimer Scan et Scan script sélectionné',
		spr_scan_a:'Supprimer Scan script affiché',
		spr_scan_ns:'Supprimer Scan script non sélectionné',
		spr_scan_s:'Supprimer Scan script sélectionné',
		add_scan_a:'Ajouter Scan Affiché ',
		add_scan_ns:'Ajouter Scan Non Sélectionné',
		add_scan_s:'Ajouter Scan Sélectionné',
		rep_mess_add:'Scan ajoutés',
		
		//option langue
		option_langue:'Language',
		q_langue:'Dans quelle langue voulez-vous le script ?',
		francais:'Français',
		anglais:'English',
		autre:'Autre',
		

		
	}

if(langue == 'en' || langue != 'fr')// merci a ridounet pour la premiere traduction puis a Mad Mad pour la traduction plus anglaise ^^.
{
    text =
    {
        //option mon compte
		moncompte:'My account ',
        vos_techno:'Your technologies : ',
        q_coord:'Coordinates of departure fleet',
        q_vaisseau_min:'What\'s your slowest ship in your fleet that you use',
		pourcent:'What percentage of your fleet is converted to DF in your universe?',
		pourcent_def:'What percentage of your defense is converted to DF in your universe?',
       
        // option variable
        choix_certaine_vari:'Choice for some variables',
        q_apartir:'take scan from',
        apartir:'total resources.',
        q_cdrmin:'Minimal Debris field ',
        q_totmin:'Debris Field + minimum of Resources recoverable ',
        q_prend_type:'Take only scans with ',
            rep_0_prend:'Debris Field> x or resources > y',
            rep_1_prend:'Debris Field> x and resources > y',
            rep_2_prend:' Debris Field + resources > z',
        q_class:'Sort the table by',
            c_date:'Date',
            c_coo:'Coordinates',
            c_nj:'Name of Player',
            c_np:'Name of  Planet',
            c_met:'Metal',
            c_cri:'Crystal',
            c_deu:'Deut',
            c_acti:'Activity',
            c_cdr:'Possible Debris Field',
            c_nbv:'Nr of ships',
            c_nbd:'Nr of Defense',
            c_ress:'Total resources',
            c_type:'Type (moon or planet)',
            c_cdrress:'Resource+DF',
            prod_classement:'Production',
            ressourcexh:'resources in x hours',
        q_reverse:'the ranking will be in order :',
          descroissant:' decreasing',
          croissant:' increasing',
        q_sae_auto:'Automatic backup of scans where they are viewed ? ',
        remp_scn:'Automatic replacement of scans if they are from the same planet ? ',
        q_garde:'Do not make and erase scans older than ',
            jours:'days',
            heures:'hours',
            min:'minutes',
        import_q:'When importing, each scan ',
            import_q0:' replaces the other ',
            import_q1:' are added to the others ',   
           
        //couleur ligne
        couleur_ligne:'Colour line ',
        q_color:' Color of the line of the target if your fleet mode is',
        attt:'Attack',
        ag:'ACS attack ',
        det:'Destroy',   
        att_r:'Attack (R)',
        ag_r:' ACS attack (R)',
        det_r:'Destroy (R)',
       
        //option affichage
        option_affichage:'Display Options ',
        lienraide:' Put the link of Raide-Facile ',
            En_haut:'On the top',
            gauche:'At the left',
        lienespi:'The link in the spy-report takes you to :',
            page_f:'The fleet view',
            page_g:'The galaxy view',
        cdr_q:'The amount of Debris Field is displayed : ',
            recyclc:' in numbers of Recyclerss ',
            ressousrce:'in numbers of resource',
        tps_vol:'Show flight time?',
        nom_j_q:'Show name of the player ?',
        nom_p_q:'Show name of the planet ?',
        autre_planette:'Don\'t show the name directly but it show when you click on the coordinates',
        coor_q:'Show of the coordinates of the panet ?',
        q_date:'Show date in the table ?',
        q_date_type:'For the date we show ?',
            q_date_type0:'Current time',
            q_date_type1:'Time of the scan',
        q_prod:'Show the hourly production of the planet',
        q_ress_h:'Show the resource (0 = Not shown)',
        mess_q:'Show a link to messages ?',
        q_simul:'What flight Simulator do you want to use ?',
            drago:'Dragosim',
            speed:'Speedsim',
            ogwinner:'Ogame-Winner', 
			simu_exte:'ou mettre le scan dans une zone de texte pour l\'exporté autre part.',			
        page:'How many scans you want to display per page ?(0=all)',       
        question_rassemble_cdr_ress:'Do you want to gather resources and Debris Fields ?',
        q_techn_sizero:'Do you want to put your tech to 0 when the scan do not display the opponent\'s tech ?',
        question_afficher_icone_mess:'Do you want to display icons ?',
        q_afficher_dernier_vid_colo:'Display the time of the last raids (approximate) ?',
       
        //option bbcode
        text_centre:'Do you want to center the bbcode ?',
        text_cite:'Do you want the BBcode in quotes ?',
        balise_centre:'What tags do you use for center text ?',
        balise1_center:'[align=center]',
        balise2_center:'[center]',
        balise_url:'What tags do you use for the "URL" ?',
        balise1_url:'[url=\'address\']',
        balise2_url:'[url=address]',
        color:'color',
       
        // tableau icone et autre
        espionner:'|spying',
        eff_rapp:'|Remove this espionage report',
        att:'|Attack',
        simul:'|Simulate',
        mise_jours:'Possible Update of Raid Facile',
        cdr_pos:'Debris Field location',       
        dated:'Date',       
        th_nj:'Player',
        th_coo:'Coordinates',
        th_np:'Planet',
        th_ress:'Resource(ct/ht)',
        th_nv:'# fleet',
        th_nd:'# Defense',
        metal:'Metal',
        met_rc:'Metal Recyclable',
        cristal:'Crystal',
        cri_rc:'Crystal Recyclable',
        nb_rc:'Number of Recyclers',
        deut:'Deut',
        nb_recycl:'Nr of Recyclers',
        retour_f:'Return ',
        arriv_f:'Arrival ',
        tmp_vol_th:'Flight time',
        prod_h_th:'Output/h',
        ressource_xh_th:'Resource x Hours',
        th_ress_cdr_col:'DF+Res',
        th_h_vidage:'Raid Time',
       
        //autre messages.
        vari_res:'Raid variables and options have been reset because of the upgrade. Sorry!',
        q_reset:'Do you want to reset all variables and options ?',
        reset:'Reset done. Refresh the page to see the result.',
        q_reset_o:'Do you want to reset all options ?',
        reset_s:'Reset done. Refresh the page to see the result.',
        option_sv:'Options of Raide-Facile saved',
        raide_facil:'Raide-Facile',
        del_scan:'Spying reports deleted, pages refresh',
        del_scan_d:'|delete this message',
        del_scan_script:'delete mess + scan script',
        del_script:'delete scan script',
        enleve_script:'|delete the espionage report but not the script',
        add_scan:'|Add the esp report from the script',
        add_scan_d:'Add the script from this spying reports',
        save_optis:'Save options',
        remis_z:'Reset.',
        supr_scan_coche:'Delete selected esp reports',
        supr_scan_coche_nnslec:'Delete unselected esp reports',
        oui:'yes',
        non:'no',
        batiment_non_visible:'Building not shown',
        rep_mess_supri:'Posts deleted',
       
        //import / export   
        export_scan_se:'export selected esp reports',
        export_scan_nnse:'export unselected esp reports',
        importer_scan:'Import esp reports',
        import_rep:'esp report imported and added to your Database',
        importt:'Import :',
        exportt:'Export :',
           
        //bouton messages
        spr_scrptscan_a:'Delete esp report and displayed Scan script',
        spr_scrptscan_ns:'Delete esp report and unselected Scan script',
        spr_scrptscan_s:'Delete esp report and selected Scan script',
        spr_scan_a:'Delete displayed Scan script',
        spr_scan_ns:'Delete unselected Scan script',
        spr_scan_s:'Delete selected Scan script ',
       
        add_scan_a:'Add displayed esp report ',
        add_scan_ns:'Add unselected esp report',
        add_scan_s:'Add selected esp Report',
        rep_mess_add:'esp Report added',
       
        //option langue
        option_langue:'Language',
        q_langue:'In what Language do you want to use the script ?',
        francais:'Français',
        anglais:'English',
        autre:'Other',
    }   
}
	vari = 
	{
		sur:'at ',		
		tech_arm: 'Weapons Technology',tech_bouc: 'Shielding Technology',tech_pro: 'Armour Technology',
		tech_hyp: 'Hyperspace Drive',tech_com: 'Combustion Drive',tech_imp: 'Impulse Drive',
		pt: 'Small Cargo',gt: 'Large Cargo',cle: 'Light Fighter',clo: 'Heavy Fighter',cro: 'Cruiser',vb: 'Battleship',vc: 'Colony Ship',rec: 'Recycler',esp: 'Espionage Probe',bb: 'Bomber',sat: 'Solar Satellite',dest: 'Destroyer',edlm: 'Deathstar',tra: 'Battlecruiser',
		lm: 'Rocket Launcher',lle: 'Light Laser',llo: 'Heavy Laser',gauss: 'Gauss Cannon',ion: 'Ion Cannon',pla: 'Plasma Turret',pb: 'Small Shield Dome',gb: 'Large Shield Dome',mic: 'Anti-Ballistic Missiles',mip: 'Interplanetary Missiles',
	
		// ressource:'Ressources',//pour antigame
		mine_m:'Metal Mine',
		mine_c:'Crystal Mine',
		mine_d:'Deuterium Synthesizer',

	}


if((location.href.indexOf('.ogame.fr',0)) >=0)
{	vari = 
	{
		sur:'sur ',
		pt: 'Petit transporteur',gt: 'Grand transporteur',cle: 'Chasseur léger',clo: 'Chasseur lourd',cro: 'Croiseur',vb: 'Vaisseau de bataille',vc: 'Vaisseau de colonisation',rec: 'Recycleur',esp: 'Sonde d`espionnage',bb: 'Bombardier',sat: 'Satellite solaire',dest: 'Destructeur',edlm: 'Étoile de la mort',tra: 'Traqueur',
		lm: 'Lanceur de missiles',lle: 'Artillerie laser légère',llo: 'Artillerie laser lourde',gauss: 'Canon de Gauss',ion: 'Artillerie à ions',pla: 'Lanceur de plasma',pb: 'Petit bouclier',gb: 'Grand bouclier',mic: 'Missile d`interception',mip: 'Missile Interplanétaire',
		tech_arm:'Technologie Armes', tech_bouc:'Technologie Bouclier', tech_pro:'Technologie Protection des vaisseaux spatiaux',
		tech_com:'Technologie Combustion', tech_imp:'Technologie Impulsion', tech_hyp:'Technologie Hyper-Espace',
		mine_m:'Mine de métal',
		mine_c:'Mine de cristal',
		mine_d:'Synthétiseur de deutérium',

	}
}


// ######################################### FUNCTION  ##################################################
/**** function de vulca pour autre navigateur que firefox ***/
var FireFox = navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1;
var nomScript = FireFox? '' : 'Raide_facile';
var Opera = navigator.userAgent.indexOf('Opera')>-1;


	// Google Chrome 
	if(!FireFox) 
	{
		function GM_getValue(key,defaultVal) 
		{
			var retValue = localStorage.getItem(key);
			if ( !retValue ) 
			{
				return defaultVal;
			}
			return retValue;
		}

		function GM_setValue(key,value) 
		{
			localStorage.setItem(key, value);
		}
	}

/** mes fonction **/

function reset(serveur){
	var continuer = confirm(text.q_reset);
	if(continuer == true)
	{
		GM_setValue('scan'+ serveur, '');
		fadeBoxx(text.reset, 0, 15000);
	}
}

function resetoption(serveur){
	var continuer = confirm(text.q_reset_o);
	if(continuer == true)
	{
		GM_setValue('option1'+ serveur, '0/0/0/0/0/0/x:xxx:x/4000/0.3/0');
		GM_setValue('option2'+ serveur, '0/100/100/0/12/1/0/4320/1/1');
		GM_setValue('option3'+ serveur, '#C7050D/#025716/#FFB027/#E75A4F/#33CF57/#EFE67F');
		GM_setValue('option4'+ serveur, '1/0/0/0/1/1/1/1/0/0/0/1/0/0/0/0/1/0');
		GM_setValue('exversion'+ serveur, Version);

	fadeBoxx(text.reset_s, 0, 13000);
	}
}

// separateur de milier
function addPoints(nombre)
{
	if (nombre == '?') {return nombre;} 
	else if (nombre==0) {return nombre;} 
	else 
	{
		var signe = '';
		if (nombre<0)
		{
			nombre = Math.abs(nombre);
			signe = '-';
		}
		var str = nombre.toString(), n = str.length;
		if (n <4) {return signe + nombre;} 
		else 
		{
			return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
		}
	}
}


// function suprimer un scan depuis le pop-up
function supr_scan1(serveur){

		var dateojk = document.getElementsByClassName('material spy')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML
		
				var date_totalde2 = dateojk.split('\')')[1].split('-'); 
		
		var date_total_sec_part = date_totalde2[1].split(' ');
			var jours = date_total_sec_part[0];
			var mois = date_totalde2[0].replace( /[^0-9-]/g, "");
			var annee = date.getFullYear();
			mois = mois - 1;
			
		var heure_sec_min = date_total_sec_part[1].split(':');
			var heure = heure_sec_min[0].replace( /[^0-9-]/g, "");;
			var min = heure_sec_min[1];
			var sec = heure_sec_min[2];
				
		var date_scan = (new Date(annee, mois, jours, heure, min, sec)).getTime();
	
	var scan_info = GM_getValue('scan'+ serveur, '').split('#');
	var listeDateRC = '';
	for(var sqf=0; sqf<scan_info.length ; sqf++)
	{
		 listeDateRC = scan_info[sqf].split(';')[0];
		if(listeDateRC == date_scan)
		{
			scan_info[sqf] = '';	
		}	
	}
	
	var scan_info2 = '';

	scan_info2 = scan_info.join('#');
	scan_info2 = scan_info2.replace( /\#{2,}/g, "#");

	GM_setValue('scan'+ serveur, scan_info2);
}

// fonction pour savoir le nombre de pt et gt qu'il faut pour prendre le maximum de reosourcce en raidant
function shipCount(m, k, d, cargo)
{
	return Math.ceil ((Math.ceil (Math.max (m + k + d, Math.min (0.75 * (m * 2 + k + d), m * 2 + d))) / 2) / cargo);
}

function trim(string)
{return string.replace(/(^\s*)|(\s*$)/g,'');} 

//suprimer les 0 devants.
function supr0(number){ 
    number = number.toString();
    var i = 0;
    for(; i < number.length-1 && number[i] == 0; ++i)
    	number[i] = '';
    return number.substring(i, number.length);
}

// suprime les espaces dans la variable
function suprime_espace(serveur)
{
	scan_info = GM_getValue('scan'+ serveur, '').split('#');
	var scani = '1';
	for(var g=0; g< scan_info.length;g++)
	{
		if(scan_info[g] != '' && scan_info[g] != ' ' && scan_info[g] != null)
		{
			if(scani.replace(/[^0-9-]/g, "") != '1')
			{scani = scani +'#'+ scan_info[g];}
			
			else{scani = scan_info[g];}	
		}
	}
	if(scani =='1'){scani = '';}
	GM_setValue('scan'+ serveur, scani);
}

//raccourcisseur de noms 
function raccourcir(nomAraccourcir)
{
	// conditions ? si c'est vrai : si c'est faut
	return nomAraccourcir.length >= 10 ? nomAraccourcir.substring(0,10) : nomAraccourcir;
}

/* function recup_flotte_mv()
{// sur la page mouvement

	var nb_flotte = document.getElementsByClassName('fleetDetails detailsOpened').length;	
	var destination_flotte_f = new Array();
	var type_missions_f = new Array();
	
	for(var k=0; k<nb_flotte ; k++)
	{
		var doc2 = document.getElementsByClassName('fleetDetails detailsOpened')[k];
		if(doc2.getElementsByClassName('mission hostile textBeefy')[0])
		{
				
				var destination_flotte = doc2.getElementsByClassName('destinationCoords tipsStandard')[0].getElementsByTagName('a')[0].innerHTML;
				destination_flotte_f[k] = destination_flotte;

				var type_missions = doc2.getElementsByClassName('mission hostile textBeefy')[0].innerHTML;
				type_missions_f[k] = type_missions;
		}		
	}
	
	var nb_flotte = document.getElementsByClassName('fleetDetails detailsClosed').length;	
	for(var k=0; k<nb_flotte ; k++)
	{
		var doc2 = document.getElementsByClassName('fleetDetails detailsClosed')[k];
		if(doc2.getElementsByClassName('mission hostile textBeefy')[0])
		{
				
				var destination_flotte = doc2.getElementsByClassName('destinationCoords tipsStandard')[0].getElementsByTagName('a')[0].innerHTML;
				destination_flotte_f[k] = destination_flotte;

				var type_missions = doc2.getElementsByClassName('mission hostile textBeefy')[0].innerHTML;
				type_missions_f[k] = type_missions;
		}		
	}
		GM_setValue("attaque_cours_d", destination_flotte_f.join(';'));
		GM_setValue("attaque_cours_t", type_missions_f.join(';'));
} */

function recup_flotte_mv()
{// sur la page mouvement
    var nb_flotte = document.getElementsByClassName('fleetDetails').length;    
    var destination_flotte_f = new Array();
    var type_missions_f = new Array();
    
    for(var k=0; k<nb_flotte ; k++)
    {
		var doc2 = document.getElementsByClassName('fleetDetails')[k];
	 
		 if(doc2.getElementsByClassName('mission hostile textBeefy')[0])
		 {
			 var destination_flotte = doc2.getElementsByClassName('destinationCoords tipsStandard')[0].getElementsByTagName('a')[0].innerHTML;
			 destination_flotte_f[k] = destination_flotte;

			 var type_missions = doc2.getElementsByClassName('mission hostile textBeefy')[0].innerHTML;
			 if(!doc2.getElementsByClassName('reversal')[0] && type_missions.indexOf('(R)') == -1) {// si il n'y as pas de bouton "rappel de flotte",
				 type_missions += " (R)";// c'est que la flotte est forcement sur le retour
			 }
			 type_missions_f[k] = type_missions;
		 }
    }
    GM_setValue("attaque_cours_d", destination_flotte_f.join(';'));
    GM_setValue("attaque_cours_t", type_missions_f.join(';'));
}


function save_option(serveur)
{
//mon compte
	var techno_arme = document.getElementsByClassName('valeur_arme')[0].value;
	var techno_boulier = document.getElementsByClassName('valeur_boulier')[0].value;
	var techno_protect = document.getElementsByClassName('valeur_protection')[0].value;

	var techno_combu = document.getElementsByClassName('valeur_combustion')[0].value;
	var techno_impu = document.getElementsByClassName('valeur_impulsion')[0].value;
	var techno_hyper = document.getElementsByClassName('valeur_hyper')[0].value;

	var coordonee_depa = document.getElementsByClassName('valeur_coordonee')[0].value;
	
	// vitesse du vaisseaux le plus lent.
	var vaisseau_vitesse = document.getElementById('vaisseau_vite').value;

	// pourcentage de vaisseau dans le cdr
	var pourcent_cdr = document.getElementById('cdr_pourcent').value;	
	pourcent_cdr = Math.round(parseFloat(pourcent_cdr)/10);
	pourcent_cdr = pourcent_cdr/10;

	// pourcentage de defense dans le cdr
	var pourcent_cdr_def = document.getElementById('cdr_pourcent_def').value;
	pourcent_cdr_def = Math.round(parseFloat(pourcent_cdr_def)/10);
	pourcent_cdr_def = pourcent_cdr_def/10;

	// pourcentage de defense dans le cdr
	// var vitesse_uni_q = document.getElementById('vitesse_uni').value;	
	var vitesse_uni_q = 1;	
	
	var option1 = techno_arme +'/'+ techno_boulier +'/'+ techno_protect +'/'+ techno_combu +'/'+ techno_impu 
				+'/'+ techno_hyper +'/'+ coordonee_depa +'/'+ vaisseau_vitesse +'/'+ pourcent_cdr +'/'+ pourcent_cdr_def
				+'/'+ vitesse_uni_q; 
	GM_setValue('option1'+ serveur, option1);	
	
//choix variable	
	var ressource_prend = document.getElementsByClassName('valeur_ressource_mini')[0].value;
	var cdr_prend = document.getElementById('valeur_cdr_mini').value;
	var tot_prend = document.getElementById('valeur_tot_mini').value;
	
	var prend_type0 = document.getElementById("prend_type0").checked;
	var prend_type1 = document.getElementById("prend_type1").checked;
	var prend_type2 = document.getElementById("prend_type2").checked;
	if(prend_type0 == true)
		{var prend_type_x = 0;}
	else if(prend_type1 == true)
		{var prend_type_x = 1;}
	else if(prend_type2 == true)
		{var prend_type_x = 2;}
		
	var selection = document.getElementById('classement').value;
	
	var q_reverse_c1 = document.getElementById("q_reverse_c1").checked;
	var q_reverse_c0 = document.getElementById("q_reverse_c0").checked;
	if(q_reverse_c0 == true)
		{var q_reverse_c = 0;}
	else if(q_reverse_c1 == true)
		{var q_reverse_c = 1;}

	var option__save_oui_q = document.getElementById("option_scan_save_oo").checked;
	var option__save_non_q = document.getElementById("option_scan_save_on").checked;
	if(option__save_non_q == true)
		{var option_respon_save = 0;}
	else if(option__save_oui_q == true)
		{var option_respon_save = 1;}
	
	var option_scan_remplace_oui = document.getElementById("scan_remplace_o").checked;
	var option_scan_remplace_non = document.getElementById("scan_remplace_n").checked;
	if(option_scan_remplace_non == true)
		{var option_respon_remplace = 0;}
	else if(option_scan_remplace_oui == true)
		{var option_respon_remplace = 1;}	
		
	var heures_opt2 = parseInt(document.getElementsByClassName('heures')[0].value);
	var jours_opt2 = parseInt(document.getElementsByClassName('jours')[0].value);
	var minutes_opt2 = parseInt(document.getElementsByClassName('minutes')[0].value);	
	var minutes_opt3 = Math.floor(minutes_opt2 + (heures_opt2*60) + parseInt((jours_opt2*60*24)));	
	
	var import_qq0 = document.getElementById("import_q0").checked;
	var import_qq1 = document.getElementById("import_q1").checked;
	if(import_qq0 == true)
		{var import_qq_rep = 0;}
	else if(import_qq1 == true)
		{var import_qq_rep = 1;}

	var option2 = ressource_prend +'/'+ cdr_prend +'/'+ tot_prend +'/'+ prend_type_x +'/'
				+ selection +'/'+ option_respon_save +'/'+ option_respon_remplace +'/'+ minutes_opt3 
				+'/'+ import_qq_rep +'/'+ q_reverse_c;
	GM_setValue('option2'+ serveur, option2);				

//couleur ligne		
	var coll_att = document.getElementsByClassName('att')[0].value;
	var coll_att_g = document.getElementsByClassName('att_group')[0].value;
	var coll_dest = document.getElementsByClassName('det')[0].value;

	var coll_att_r = document.getElementsByClassName('att_r')[0].value;
	var coll_att_g_r = document.getElementsByClassName('att_group_r')[0].value;
	var coll_dest_r = document.getElementsByClassName('det_r')[0].value;
	
	var option3 = coll_att +'/'+ coll_att_g +'/'+ coll_dest +'/'+ coll_att_r +'/'+ coll_att_g_r +'/'+ coll_dest_r;
	GM_setValue('option3'+ serveur, option3);

//affichage	
	var option_lieu_h = document.getElementById("lien_raide_h").checked;
	var option_lieu_g = document.getElementById("lien_raide_g").checked;
	if(option_lieu_g == true)
		{var option_lien_save = 0;}
	else if(option_lieu_h == true)
		{var option_lien_save = 1;}
		
	var option_scan_espionn_gala = document.getElementById("espionn_g").checked;
	var option_scan_espionn_flott = document.getElementById("espionn_f").checked;
	if(option_scan_espionn_gala == true)
		{var option_respon_lien_espi = 0;}
	else if(option_scan_espionn_flott == true)
		{var option_respon_lien_espi = 1;}	
		
		//type d'affichage du rc	
	var option_q_recycl_0 = document.getElementById("recycleur_type_0").checked;
	var option_q_recycl_1 = document.getElementById("recycleur_type_1").checked;
	if(option_q_recycl_0 == true)
		{var option_respon_rec = 0;}
	else if(option_q_recycl_1 == true)
		{var option_respon_rec = 1;}	
	
	var option_tps_vol0 = document.getElementById("tps_vol0").checked;
	var option_tps_vol1 = document.getElementById("tps_vol1").checked;
	if(option_tps_vol0 == true)
		{var option_tps_vol = 0;}
	else if(option_tps_vol1 == true)
		{var option_tps_vol = 1;}		
	
	var affiche_nom_joueur0 = document.getElementById("nom_j_q0").checked;
	var affiche_nom_joueur1 = document.getElementById("nom_j_q1").checked;
	if(affiche_nom_joueur0 == true)
		{var affiche_nom_joueur = 0;}
	else if(affiche_nom_joueur1 == true)
		{var affiche_nom_joueur = 1;}	
	
	var affiche_nom_planet0 = document.getElementById("nom_p_q0").checked;
	var affiche_nom_planet1 = document.getElementById("nom_p_q1").checked;
	var affiche_nom_planet2 = document.getElementById("nom_p_q2").checked;
	if(affiche_nom_planet0 == true)
		{var affiche_nom_planet = 0;}
	else if(affiche_nom_planet1 == true)
		{var affiche_nom_planet = 1;}
	else if(affiche_nom_planet2 == true)
		{var affiche_nom_planet = 2;}
		
	var affiche_coor_q0 = document.getElementById("coor_q0").checked;
	var affiche_coor_q1 = document.getElementById("coor_q1").checked;
	if(affiche_coor_q0 == true)
		{var affiche_coor_q = 0;}
	else if(affiche_coor_q1 == true)
		{var affiche_coor_q = 1;}	
		
	var date_non_q = document.getElementById("date_qn").checked;
	var date_oui_q = document.getElementById("date_qo").checked;	
	if(date_non_q == true)
		{var date_respon = 0;}
	else if(date_oui_q == true)
		{var date_respon = 1;}
	
	var qq_date_type0 = document.getElementById("q_date_type0").checked;
	var qq_date_type1 = document.getElementById("q_date_type1").checked;
	if(qq_date_type0 == true)
		{var qq_date_type_rep = 0;}
	else if(qq_date_type1 == true)
		{var qq_date_type_rep = 1;}
		
	var prod_h_qq0 = document.getElementById("prod_h_q0").checked;
	var prod_h_qq1 = document.getElementById("prod_h_q1").checked;
	if(prod_h_qq0 == true)
		{var affiche_prod_h = 0;}
	else if(prod_h_qq1 == true)
		{var affiche_prod_h = 1;}
	
	var ress_nb_j = parseInt(document.getElementsByClassName('ress_nb_j')[0].value);
	var ress_nb_h = parseInt(document.getElementsByClassName('ress_nb_h')[0].value);
	var ress_nb_min = parseInt(document.getElementsByClassName('ress_nb_min')[0].value);	
	var ress_x_h = Math.floor(ress_nb_min + (ress_nb_h*60) + parseInt((ress_nb_j*60*24)));
		
	var qq_sim_q_dra = document.getElementById("sim_q_dra").checked;
	var qq_sim_q_speed1 = document.getElementById("sim_q_speed").checked;
	var qq_sim_q_ogwin = document.getElementById("sim_q_ogwin").checked;
	var sim_q_autre = document.getElementById("sim_q_autre").checked;
	if(qq_sim_q_dra == true)
		{var qq_sim_q = 0;}
	else if(qq_sim_q_speed1 == true)
		{var qq_sim_q = 1;}
	else if(qq_sim_q_ogwin == true)
		{var qq_sim_q = 2;}
	else if(sim_q_autre == true)
		{var qq_sim_q = 3;}	
		
	var qq_mess_q0 = document.getElementById("mess_q0").checked;
	var qq_mess_q1 = document.getElementById("mess_q1").checked;
	if(qq_mess_q0 == true)
		{var qq_mess = 0;}
	else if(qq_mess_q1 == true)
		{var qq_mess = 1;}

	var q_nb_scan_page = document.getElementById('nb_scan_page').value;
	if(q_nb_scan_page == '' || q_nb_scan_page.replace( /[^0-9-]/g, "") == '') {q_nb_scan_page = 0;}

	var rassemble_qq0 = document.getElementById("rassemble_q0").checked;
	var rassemble_qq1 = document.getElementById("rassemble_q1").checked;
	if(rassemble_qq0 == true)
		{var rassemble_qrep = 0;}
	else if(rassemble_qq1 == true)
		{var rassemble_qrep = 1;}

	var qq_techzero0 = document.getElementById("q_techzero0").checked;
	var qq_techzero1 = document.getElementById("q_techzero1").checked;
	if(qq_techzero0 == true)
		{var qq_techzero = 0;}
	else if(qq_techzero1 == true)
		{var qq_techzero = 1;}

	var q_icone_mess0 = document.getElementById("q_icone_mess0").checked;
	var q_icone_mess1 = document.getElementById("q_icone_mess1").checked;
	if(q_icone_mess0 == true)
		{var q_icone_mess_rep = 0;}
	else if(q_icone_mess1 == true)
		{var q_icone_mess_rep = 1;}
		
	var q_vid_colo0 = document.getElementById("q_vid_colo0").checked;
	var q_vid_colo1 = document.getElementById("q_vid_colo1").checked;
	if(q_vid_colo0 == true)
		{var q_vid_colo_rep = 0;}
	else if(q_vid_colo1 == true)
		{var q_vid_colo_rep = 1;}

	var option4 = option_lien_save +'/'+ option_respon_lien_espi +'/'+ option_respon_rec +'/'+ option_tps_vol 
			+'/'+ affiche_nom_joueur +'/'+ affiche_nom_planet +'/'+ affiche_coor_q +'/'+ date_respon 
			+'/'+ qq_date_type_rep +'/'+ affiche_prod_h +'/'+ ress_x_h +'/'+ qq_sim_q
			+'/'+ qq_mess +'/'+ q_nb_scan_page +'/'+ rassemble_qrep + '/'+ qq_techzero + '/'+ q_icone_mess_rep
			+'/'+ q_vid_colo_rep;
	
	GM_setValue('option4'+ serveur, option4);

// option de langue
	var q_langue = document.getElementById('langue').value;
	var option5 = q_langue;
	GM_setValue('option5'+ serveur, option5);
	
	GM_setValue('exversion'+ serveur, ex_version);

	//arme/bouclier/protect/combus/impul/hyper/coordonee/date/option/ressource/classement/sauvegard auto/temps garde scan/exversion
	// /coul_att/coul_att_g/coul_dest/lien/remplace/lien esp/rec/itesse/tps_vol/nom_j/nom_p/coord_q/prod_h/ress_h
	//	
	fadeBoxx(text.option_sv, 0, 10000);
}

function save_optionbbcode(serveur)
{
	var col1 = document.getElementById('col_1').value;
	var col2 = document.getElementById('col_2').value;
	var col3 = document.getElementById('col_3').value;
	var col4 = document.getElementById('col_4').value;
	var col5 = document.getElementById('col_5').value;
	var col6 = document.getElementById('col_6').value;
	var col7 = document.getElementById('col_7').value;
	
	var q_cite0 = document.getElementById("cite0").checked;
	var q_cite1 = document.getElementById("cite1").checked;
	if(q_cite0 == true)
		{var q_cite = 0;}
	else if(q_cite1 == true)
		{var q_cite = 1;}
		
	var q_centre0 = document.getElementById("centre0").checked;
	var q_centre1 = document.getElementById("centre1").checked;
	if(q_centre0 == true)
		{var q_centre = 0;}
	else if(q_centre1 == true)
		{var q_centre = 1;}	
		
	var q_centre_type0 = document.getElementById("centre_type0").checked;
	var q_centre_type1 = document.getElementById("centre_type1").checked;
	if(q_centre_type0 == true)
		{var rep_center_type = 0;}
	else if(q_centre_type1 == true)
		{var rep_center_type = 1;}	
		
	var q_url_type0 = document.getElementById("url_type0").checked;
	var q_url_type1 = document.getElementById("url_type1").checked;
	if(q_url_type0 == true)
		{var q_url_type = 0;}
	else if(q_url_type1 == true)
		{var q_url_type = 1;}
		
	var option_save_bbcode = col1 +'/'+	col2 +'/'+ col3 +'/'+ col4 +'/'+ col5 +'/'+	col6 +'/'+ col7 +'/'+	
			rep_center_type +'/'+ q_url_type +'/'+ q_centre +'/'+ q_cite;
	GM_setValue('option_bbcode'+ serveur, option_save_bbcode);
	fadeBoxx(text.option_sv, 0, 15000);	
	
}

function save_scan(serveur, id_rc){

		if(id_rc != 0)
		{			
			var nom_spatio = 'spioDetails_'+ id_rc;
			var document_spatio = document.getElementById(nom_spatio);
			
			var nom_entete = id_rc + 'TR';
			var document_entete = document.getElementById(nom_entete);
		}
		else{
			var document_spatio = document;
			var document_new2 = document;
		}

		var dateojk = document_spatio.getElementsByClassName('material spy')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML;
		var date_totalde2 = dateojk.split('\')')[1].split('-'); 
		
		var date_total_sec_part = date_totalde2[1].split(' ');
			var jours = date_total_sec_part[0];
			var mois = date_totalde2[0].replace( /[^0-9-]/g, "");
			var annee = date.getFullYear();
			mois = mois - 1;
			
		var heure_sec_min = date_total_sec_part[1].split(':');
			var heure = heure_sec_min[0].replace( /[^0-9-]/g, "");
			var min = heure_sec_min[1];
			var sec = heure_sec_min[2];
		var date_scan = (new Date(annee, mois, jours, heure, min, sec)).getTime();

		
		var planette_et_joueur_scan = document_spatio.getElementsByClassName('material spy')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML;
		var nom_joueur_scan = planette_et_joueur_scan.split('</a>')[1].split(' \'')[1];
		var nom_joueur = nom_joueur_scan.split('\') ')[0];
		if(nom_joueur.indexOf('war-riders.de') != -1){nom_joueur = document_spatio.getElementsByClassName('material spy')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[0].getElementById("player_name").innerHTML;}
		
		var coordonnee = document_spatio.getElementsByClassName('material spy')[0].getElementsByClassName('area')[0].getElementsByTagName('a')[0].innerHTML;

		if(planette_et_joueur_scan.indexOf('<span>')>= 0)
		{
			var nom_plannette = planette_et_joueur_scan.split(' <span>')[0];
				nom_plannette = nom_plannette.split(vari.sur)[1];
		}
		else{
			var nom_plannette = planette_et_joueur_scan.split(' <a')[0];
				nom_plannette = nom_plannette.split(vari.sur)[1];
		
		}
			
		if(nom_plannette.indexOf('#')>=0){
			nom_plannette = nom_plannette.replace( /\#/g, "1diez1");		
		}	
		
		if( url.indexOf('index.php?page=messages')>=0)//oui
		{
			var idRC = id_rc;		
		}
		else {
			var idRC = url.split('&msg_id=')[1];
			if(url.indexOf('&mids')==-1)
			{
				idRC = idRC.split('&cat')[0];
			}
			else {idRC = idRC.split('&mids')[0];}
		}
	
		var urlcoo = document_spatio.getElementsByClassName('defenseattack spy')[0].getElementsByClassName('attack')[0].innerHTML.split('href=')[1].split('>')[0].split('"')[1];
		var type_planette = urlcoo.split('=')[6].split('&amp;mission')[0]; // merci vulca ^^
		
		
		if (GM_getValue('scan'+ serveur, '').indexOf(idRC)==-1)
			{	var newscan = '0';}
		else{var newscan = 'nan';}

		if((start_time - nb_ms_garde_scan ) < parseInt(date_scan) && newscan == '0')
		{			
			var ressource_m_scan = document_spatio.getElementsByClassName('material spy')[0].getElementsByClassName('fragment spy2')[0].getElementsByTagName('td')[1].innerHTML;//23.03.2010 22:27:56
			var ressource_c_scan = document_spatio.getElementsByClassName('material spy')[0].getElementsByClassName('fragment spy2')[0].getElementsByTagName('td')[3].innerHTML;//23.03.2010 22:27:56
			var ressource_d_scan = document_spatio.getElementsByClassName('material spy')[0].getElementsByClassName('fragment spy2')[0].getElementsByTagName('td')[5].innerHTML;//23.03.2010 22:27:56
				ressource_m_scan = ressource_m_scan.replace( /[^0-9-]/g, "");
				ressource_c_scan = ressource_c_scan.replace( /[^0-9-]/g, "");
				ressource_d_scan = ressource_d_scan.replace( /[^0-9-]/g, "");
		
			var activite_scan = document_spatio.getElementsByClassName('aktiv spy')[0].innerHTML;//23.03.2010 22:27:56
			activite_scan = activite_scan.split('</div></div></span>')[1]; 
			activite_scan = activite_scan.replace( /[^0-9-]/g, "");
			if( activite_scan == '')
			{activite_scan = 'rien';}
		
		
			var vaisseau = new Array(vari.pt, vari.gt, vari.cle, vari.clo, vari.cro, vari.vb, vari.vc, vari.rec, vari.esp, vari.bb, vari.sat, vari.dest, vari.edlm, vari.tra);
			
			
			var vaisseau_perte = new Array("4000", "12000", "4000", "10000", "27000", "60000", "30000", "16000", "1000" ,"75000", "2000", "1100000", "9000000", "70000");
			var vaisseau_perte_m = new Array("2000", "6000", "3000", "6000", "20000", "45000", "10000", "10000", "0" ,"50000", "0", "60000", "5000000", "30000");
			var vaisseau_perte_c = new Array("2000", "6000", "1000", "4000", "7000",  "15000", "20000", "6000",  "1000" ,"25000", "2000", "50000", "4000000", "40000");
		
			var def_perte = new Array("2000", "2000", "8000", "35000", "8000", "100000", "20000", "100000", "0" ,"0");
			var def_perte_m = new Array("2000", "1500", "6000", "20000", "2000", "50000", "10000", "50000", "0" ,"0");
			var def_perte_c = new Array("0", "500", "2000", "15000",  "6000", "50000", "10000", "50000", "0" ,"0");

/* 			var vaisseau_cdr = new Array("1200", "3600", "1200", "3000", "8100", "18000", "9000", "4800", "300", "22500", "600", "33000", "2700000", "21000")
			var vaisseau_cdr_m = new Array("600", "1800", "900", "1800", "6000", "13500", "3000", "3000", "0", "15000", "0", "18000", "1500000", "9000")
			var vaisseau_cdr_c = new Array("600", "1800", "300", "1200", "2100", "4500", "6000", "1800", "300", "7500", "600", "15000", "1200000", "12000")
 */			
			var defense = new Array(vari.lm, vari.lle, vari.llo, vari.gauss, vari.ion, vari.pla, vari.pb, vari.gb, vari.mic, vari.mip);
			var recherche = new Array(vari.tech_arm, vari.tech_bouc, vari.tech_pro );
			var mine = new Array(vari.mine_m, vari.mine_c, vari.mine_d );
			
			var cdr_possible_def = 0;
			var cdr_possible_def_m = 0;
			var cdr_possible_def_c = 0;

			var cdr_possible = 0;
			var cdr_possible_m = 0;
			var cdr_possible_c = 0;
			
			var nb_vaisseau_s = 0;
			var nb_def_s = 0;
			var vaisseau_scan = new Array("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
			var defense_scan = new Array("0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
			var recherche_scan = new Array("0", "0", "0");
			var mine_scan = new Array("0", "0", "0");
			var nb_vaisseau_type = ' ';
			var nb_def_type = ' ';
			var nb_recherche = '';
			var nb_mine = '';
			
			// on recupere les vaisseaux et le cdr creables.
		/******* VAISSEAU + CDR *******/	
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[0]){
				var flotte_inter = document_spatio.getElementsByClassName('fleetdefbuildings spy')[0].innerHTML;
			}else{flotte_inter ='';}
			
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[0] && flotte_inter.indexOf('area plunder' ,0) == -1 ){
				var anti_antigame = document_spatio.getElementsByClassName('fleetdefbuildings spy')[0].innerHTML;
				var anti_antigame = anti_antigame.split('</tr><tr>')[0];
				
				if(anti_antigame != '<tbody><tr><th class="area plunder" colspan="4">'+ 'area plunder' +'</th>')
				{
					var nb_type_vaisseau = document_spatio.getElementsByClassName('fleetdefbuildings spy')[0].getElementsByClassName('key').length;
					for(var j=0; j<nb_type_vaisseau ; j++)
					{
						var type_vaisseau = document_spatio.getElementsByClassName('fleetdefbuildings spy')[0].getElementsByClassName('key')[j].innerHTML;//23.03.2010 22:27:56
						for(var k=0; k<vaisseau.length ; k++)
						{
							if(type_vaisseau == vaisseau[k])
							{
								nb_vaisseau_type = (document_spatio.getElementsByClassName('fleetdefbuildings spy')[0].getElementsByClassName('value')[j].innerHTML).replace( /[^0-9-]/g, "");
								
								/* cdr_possible = parseInt(cdr_possible) + parseInt(vaisseau_cdr[k])*parseInt(nb_vaisseau_type);
								cdr_possible_m = parseInt(cdr_possible_m) + parseInt(vaisseau_cdr_m[k])*parseInt(nb_vaisseau_type);
								cdr_possible_c = parseInt(cdr_possible_c) + parseInt(vaisseau_cdr_c[k])*parseInt(nb_vaisseau_type);
 */
								cdr_possible = parseInt(cdr_possible) + parseInt(vaisseau_perte[k])*parseInt(nb_vaisseau_type);
								cdr_possible_m = parseInt(cdr_possible_m) + parseInt(vaisseau_perte_m[k])*parseInt(nb_vaisseau_type);
								cdr_possible_c = parseInt(cdr_possible_c) + parseInt(vaisseau_perte_c[k])*parseInt(nb_vaisseau_type);
								
								vaisseau_scan[k] = parseInt(vaisseau_scan[k]) + parseInt(nb_vaisseau_type);
								nb_vaisseau_s = parseInt(nb_vaisseau_s) + parseInt(nb_vaisseau_type);
							}
						}
					
					}
				}
				else {
					cdr_possible = '?';
					nb_vaisseau_type = '?';
					vaisseau_scan = new Array("?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?");
					nb_vaisseau_s = -1;
				}			
			}		
			else {cdr_possible = '?';
				nb_vaisseau_type = '?';
				vaisseau_scan = new Array("?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?");
				nb_vaisseau_s = -1;
			}			
			if(cdr_possible == '' || cdr_possible == ' '){cdr_possible = 0;}
			
			
			/******* DEFENSE *******/		
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[1]){
				var flotte_inter1 = document_spatio.getElementsByClassName('fleetdefbuildings spy')[1].innerHTML;
			}else{flotte_inter1 ='';}
			
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[1] && flotte_inter1.indexOf('area plunder' ,0) == -1 ){
				var nb_type_def = document_spatio.getElementsByClassName('fleetdefbuildings spy')[1].getElementsByClassName('key').length;
				for(var j=0; j<nb_type_def ; j++)
				{
					var type_def = document_spatio.getElementsByClassName('fleetdefbuildings spy')[1].getElementsByClassName('key')[j].innerHTML;//23.03.2010 22:27:56
					for(var k=0; k<defense.length ; k++)
					{ 
						if(type_def == defense[k])
						{
							nb_def_type = (document_spatio.getElementsByClassName('fleetdefbuildings spy')[1].getElementsByClassName('value')[j].innerHTML).replace( /[^0-9-]/g, "");
							defense_scan[k] = parseInt(defense_scan[k]) + parseInt(nb_def_type);
							nb_def_s = parseInt(nb_def_s) + parseInt(nb_def_type);
							
							cdr_possible_def = parseInt(cdr_possible_def) + parseInt(def_perte[k])*parseInt(nb_def_type);
							cdr_possible_def_m = parseInt(cdr_possible_def_m) + parseInt(def_perte_m[k])*parseInt(nb_def_type);
							cdr_possible_def_c = parseInt(cdr_possible_def_c) + parseInt(def_perte_c[k])*parseInt(nb_def_type);
							
						}
					}
				
				}
				var cdr_def = cdr_possible_def +'/'+ cdr_possible_def_m +'/'+ cdr_possible_def_c;
			}
			else{nb_def_type = '?';
			var cdr_def = '?/?/?';
			defense_scan = new Array("?", "?", "?", "?", "?", "?", "?", "?", "?", "?")
			nb_def_s = -1;}
				
			
			
		/******* Batiment (MINE) *******/
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[2]){
				var flotte_inter2 = document_spatio.getElementsByClassName('fleetdefbuildings spy')[2].innerHTML;
			}else{flotte_inter2 ='';}
			
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[2] && flotte_inter2.indexOf('area plunder' ,0) == -1 ){
				var nb_type_mine = document_spatio.getElementsByClassName('fleetdefbuildings spy')[2].getElementsByClassName('key').length;
				for(var jj=0; jj<nb_type_mine ; jj++)
				{
				var type_mine = document_spatio.getElementsByClassName('fleetdefbuildings spy')[2].getElementsByClassName('key')[jj].innerHTML;//23.03.2010 22:27:56
					for(var kk=0; kk<mine.length ; kk++)
					{ if(type_mine == mine[kk])
						{
							nb_mine = document_spatio.getElementsByClassName('fleetdefbuildings spy')[2].getElementsByClassName('value')[jj].innerHTML;
							mine_scan[kk] = parseInt(nb_mine);
						}
					}
				
				}
			}
			else{ nb_mine = '?';
			mine_scan = new Array("?", "?", "?");}	

		/******* RECHERCHE *******/
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[3]){
				var flotte_inter3 = document_spatio.getElementsByClassName('fleetdefbuildings spy')[3].innerHTML;
			}else{flotte_inter3 ='';}
			
			if(document_spatio.getElementsByClassName('fleetdefbuildings spy')[3] && flotte_inter3.indexOf('area plunder' ,0) == -1 ){
				var nb_type_recherche = document_spatio.getElementsByClassName('fleetdefbuildings spy')[3].getElementsByClassName('key').length;
				for(var j=0; j<nb_type_recherche ; j++)
				{
				var type_recherche = document_spatio.getElementsByClassName('fleetdefbuildings spy')[3].getElementsByClassName('key')[j].innerHTML;//23.03.2010 22:27:56
					for(var k=0; k<recherche.length ; k++)
					{ if(type_recherche == recherche[k])
						{
							nb_recherche = document_spatio.getElementsByClassName('fleetdefbuildings spy')[3].getElementsByClassName('value')[j].innerHTML;
							recherche_scan[k] = parseInt(nb_recherche);
						}
					}
				
				}
			}
			else{ nb_recherche = '?';
			recherche_scan = new Array("?", "?", "?");}
			
			var cdr_possible2 = Math.round(cdr_possible*pourcent_cdr) + Math.round(cdr_possible_def*pourcent_cdr_def);
			
		/* ******* INFO FINAL ********* */
			var ressource_pillable = parseInt(ressource_m_scan) + parseInt(ressource_c_scan) + parseInt(ressource_d_scan);
			if(((type_prend_scan == 0 && (cdr_possible2 >= parseInt(valeur_cdr_mini) || ressource_pillable > parseInt(nb_scan_accpte) ))
				|| (type_prend_scan == 1 && cdr_possible2 > parseInt(valeur_cdr_mini) && ressource_pillable > parseInt(nb_scan_accpte) )
				|| (type_prend_scan == 2 && (cdr_possible2 + (ressource_pillable)/2) > valeur_tot_mini)) && coordonnee != '')
			{
				var info_final = date_scan + ';' + coordonnee + ';' + nom_joueur +  ';' + nom_plannette //0-1-2-3
								+ ';' + ressource_m_scan + ';' + ressource_c_scan + ';' + ressource_d_scan + ';' //4-5-6
								+ activite_scan + ';' + cdr_possible + ';' + vaisseau_scan.join('/') //7-8-9
								+ ';' + defense_scan.join('/') + ';' + idRC + ';' + ressource_pillable //10-11-12
								+ ';' + recherche_scan.join('/') + ';' + type_planette /*13/14*/
								+ ';' + cdr_possible_m + ';' + cdr_possible_c  + ';' + nb_vaisseau_s  + ';' + nb_def_s //15-16-17-18
								+ ';' + mine_scan.join('/') + ';x'+ ';'+ cdr_def;//19-20-21

				var scan_info = GM_getValue('scan'+ serveur, '').split('#');
				
				// on suprime les scan trop vieux
				if(nb_ms_garde_scan != 0)
				{
					for(var i=0; i<scan_info.length ; i++)
					{
						var scan_info25 = scan_info[i].split(';');
						if(start_time - nb_ms_garde_scan > parseInt(scan_info25[0]))
						{
							scan_info[i]='';
						}
					}
				}
				
				// puis on sauvegarde
				if(GM_getValue('scan'+ serveur, '').indexOf(coordonnee)!=-1 && scan_remplace == 1)
				{
					for(var p=0; p<scan_info.length ; p++)
					{
						var date_scan_infoi = scan_info[p].split('/')[7];
						if(scan_info[p].indexOf(coordonnee)!=-1 && parseInt(date_scan_infoi) < parseInt(date_scan))
						{
							scan_info[p] = info_final;					
						}					
					}
					
					var scan_info2 = scan_info.join('#');
					scan_info2 = scan_info2.replace( /\#{2,}/g, "#");

					if(scan_info2 == '' || scan_info2 == '#')
					{					
						GM_setValue('scan'+ serveur, '');		
					}
					else{
						GM_setValue('scan'+ serveur, scan_info2);
					}
					
				}
				else{	
				
				var scan_info2 = scan_info.join('#');
					scan_info2 = scan_info2.replace( /\#{2,}/g, "#");

					if(scan_info2 == '' || scan_info2 == '#')
					{					
						GM_setValue('scan'+ serveur, info_final);		
					}
					else{
						GM_setValue('scan'+ serveur, scan_info2 +'#' + info_final);
					}
				}
			
			}
		}
}

// afficher le lien pour raide facile a dorite ou a gauche
function afficher_lien(url_1)
{
	if(lien_h_g == 1){		
		var texte_a_afficher = '<a href="'+url_1+'&raidefacil=scriptOptions" style="cursor:pointer;" id="lien_raide">'+ text.raide_facil +'</a>';
			
		var sp1 = document.createElement("li"); // on cree une balise span
		sp1.setAttribute("id", "Affichage3"); // on y ajoute un id
		var sp1_content = document.createTextNode('');
		sp1.appendChild(sp1_content); 
		var sp2 = document.getElementById('bar').getElementsByTagName('li')[6] ; // Lieu où on veut afficher (A remplacer par ce que vous voulez 
		var parentDiv = sp2.parentNode;
		parentDiv.insertBefore(sp1, sp2.nextSibling);
		var tableau = document.createElement("span");
		tableau.innerHTML = texte_a_afficher; // Ce qu'on veut afficher 
		document.getElementById('Affichage3').insertBefore(tableau, document.getElementById('Affichage3').firstChild); // Affichage
	}
	else{
		var texte_a_afficher = '<span class="menu_icon"></span>'
		+ '<a target="_self" accesskey="" style="text-align:center;" href="'+url_1+'&raidefacil=scriptOptions" class="menubutton " id="lien_raide">'
			   +'<span class="textlabel">'+ text.raide_facil +'</span>'
		   +' </a>';

		var sp1 = document.createElement("li"); // on cree une balise span
		sp1.setAttribute("id", "Affichage3"); // on y ajoute un id
		var sp1_content = document.createTextNode('');
		sp1.appendChild(sp1_content); 
		var sp2 = document.getElementById('menuTable').getElementsByTagName('li')[10] ; // Lieu où on veut afficher (A remplacer par ce que vous voulez 
		var parentDiv = sp2.parentNode;
		parentDiv.insertBefore(sp1, sp2.nextSibling);
		var tableau = document.createElement("span");
		tableau.innerHTML = texte_a_afficher; // Ce qu'on veut afficher 
		document.getElementById('Affichage3').insertBefore(tableau, document.getElementById('Affichage3').firstChild); // Affichage
	}
}

// pouvoir suprimer plusieurs scan. depuis raide-facile grace au checbox
function del_scan_checkbox(serveur , check)
{
	var id_num;
	var scan_info = GM_getValue('scan'+ serveur, '').split('#');
	var nb = scan_info.length;

		var nb = scan_info.length ;
		if(nb_scan_page != 0)
		{
			var num_page = url.split('&page_r=')[1];
			var nb_page_poss = Math.ceil(nb/nb_scan_page);
			
			if(num_page == undefined || num_page == 1)
			{var p = 0;
			var nb_scan_fin = nb_scan_page}
			
			else if(num_page >= 1)
			{
			var p = (parseInt(num_page) - 1)*nb_scan_page;
			var nb_scan_fin = parseInt(num_page)*nb_scan_page;}
		}
		else{var nb_scan_fin = nb;var p =0;}
		
	for(p; p<nb_scan_fin; p++)
	{
		id_num = 'check_'+ p +'';
		if(scan_info[p] != '' && scan_info[p] != ' ' && scan_info[p])
		{
			if(document.getElementById(id_num).checked == check)
			{
				scan_info[p] = '';
			}
		}
	}
	var scan_info2 ='';
	scan_info2 = scan_info.join('#');			
	scan_info2 = scan_info2.replace( /\#{2,}/g, "#");
	GM_setValue('scan'+ serveur, scan_info2);
	// alert(text.del_scan);
	fadeBoxx(text.del_scan, 0, 10000);
}

function vitesse_vaisseau(impulsion ,hyper_h ,combus, value_select)
{
/***********  vitessse minimum *********************/	
	var vaisseau_type = new Array(vari.pt, vari.gt, vari.cle, vari.clo, vari.cro, vari.vb, vari.vc, vari.rec, vari.esp, vari.bb, vari.dest, vari.edlm, vari.tra);
	
	if(parseInt(impulsion) >= 5){var vitesse_pt = "10000"; var prop_pt = "imp";}
	else{var vitesse_pt = "5000";var prop_pt = "comb";}

	if(parseInt(hyper_h) >= 8){var vitesse_bb = "5000";var prop_bb = "hyp";}
	else{var vitesse_bb = "4000";var prop_bb = "imp";}
	
	var vaisseau_vitess_deb = new Array(vitesse_pt, "7500", "12500", "10000", "15000", "10000", "2500", "2000", "100000000", vitesse_bb, "5000", "100", "10000");
	var vaisseau_type_prop = new Array(prop_pt, "comb", "comb", "imp", "imp", "hyp", "imp", "comb", "comb", prop_bb, "hyp", "hyp", "hyp");

	if(vaisseau_type_prop[value_select] == "comb")
	{
		var vitesse_mini = Math.round(parseInt(vaisseau_vitess_deb[value_select])*(1 + (0.1 * parseInt(combus))));
	}
	if(vaisseau_type_prop[value_select] == "imp")
	{
		var vitesse_mini = Math.round(parseInt(vaisseau_vitess_deb[value_select])*(1 + (0.2 * parseInt(impulsion))));
	}
	if(vaisseau_type_prop[value_select] == "hyp")
	{
		var vitesse_mini = Math.round(parseInt(vaisseau_vitess_deb[value_select])* (1 + (0.3 * parseInt(hyper_h))));
	}
	return vitesse_mini;
}


function vaisseau_vitesse_mini(impulsion ,hyper_h ,combus, value_select, coordonee_cible , vitesse_uni)
{
	var distance;	
	var vitesse_mini = vitesse_vaisseau(impulsion ,hyper_h ,combus, value_select);
/***************  Distance *********************/	
	if(document.getElementsByClassName('planetlink active tipsStandard')[0])
	{
		var planette_selec = document.getElementsByClassName('planetlink active tipsStandard')[0].getElementsByClassName('planet-koords')[0].innerHTML;
	}else{
		if(pos_depart != 'x:xxx:x')
		{var planette_selec = pos_depart;}
		else{var planette_selec = document.getElementsByClassName('planetlink  tipsStandard')[0].getElementsByClassName('planet-koords')[0].innerHTML;}
	
	}
	//[5:36:7]
	var planette_selec_split = planette_selec.split(':');
	var galaxie_j = planette_selec_split[0].replace( /[^0-9-]/g, "");
	var system_j = planette_selec_split[1].replace( /[^0-9-]/g, "");
	var planet_j = planette_selec_split[2].replace( /[^0-9-]/g, "");

	var coordonee_cible_split = coordonee_cible.split(':');
	var galaxie_c = coordonee_cible_split[0].replace( /[^0-9-]/g, "");
	var system_c = coordonee_cible_split[1].replace( /[^0-9-]/g, "");
	var planet_c = coordonee_cible_split[2].replace( /[^0-9-]/g, "");
	
	if(galaxie_j != galaxie_c)
	{
		distance = 20000*Math.abs(parseInt(galaxie_j) - parseInt(galaxie_c));
	
	}
	else{
		if(system_j != system_c)
		{
			distance = 2700 + 95*Math.abs(parseInt(system_j) - parseInt(system_c));		
		}
		else{
			distance = 1000 + 5*Math.abs(parseInt(system_j) - parseInt(system_c));			
		}
	}
	
/***************  Temps de vol  *********************/

	var temps_de_vol_sec = 10 + ((35000/100) * (Math.sqrt((distance*1000)/vitesse_mini)));
	temps_de_vol_sec = Math.round(temps_de_vol_sec/vitesse_uni);

	var minutes = Math.floor(temps_de_vol_sec/60);
	var heures = Math.floor(minutes/60);
	var jours = Math.floor(heures/24);
	var secondes = Math.floor(temps_de_vol_sec%60);
		minutes = Math.floor(minutes%60);
		heures = Math.floor(heures%24);
		
	var temp_vol = jours +'j '+	heures +'h '+ minutes +'min'+ secondes +'s';
	var sec_arrive = parseInt(start_time) + parseInt(temps_de_vol_sec)*1000;
	var date_arrive = new Date();
	date_arrive.setTime(parseInt(sec_arrive));
	var date_arrive_f = date_arrive.getDate() +'/'+ date_arrive.getMonth() +'/'+ date_arrive.getFullYear() +' à '+ date_arrive.getHours() +'h '+ date_arrive.getMinutes() +'min'+ date_arrive.getSeconds()+'s';
	
	var sec_retour = parseInt(start_time) + parseInt(temps_de_vol_sec)*2000;
	var date_retour = new Date();
	date_retour.setTime(sec_retour);
	var date_retour_f = date_retour.getDate() +'/'+ date_retour.getMonth() +'/'+ date_retour.getFullYear() +' à '+ date_retour.getHours() +'h '+ date_retour.getMinutes() +'min'+ date_retour.getSeconds()+'s';

	var acconyme_temps = '<acronym title=" '+ text.arriv_f +' : '+ date_arrive_f +' | '+ text.retour_f +' : '+ date_retour_f +'">'+ temp_vol + '</acronym>';
	
return acconyme_temps;
}

//function petit rectangle affiche (genre pop up) 0 V , 1 erreur
function fadeBoxx(message, failed, temps){
	var $; 
	try { $ = unsafeWindow.$; } 
	catch(e) { $ = window.$; } 
	
	var unsafe = window;
	try {unsafe = unsafeWindow} catch (e) {}
	unsafe.tb_remove();

    if (failed) {
	    $("#fadeBoxStyle").attr("class", "failed");
	} else {
	    $("#fadeBoxStyle").attr("class", "success");
	}
	$("#fadeBoxContent").html(message);
	$("#fadeBox").stop(false, true).show().fadeOut(temps);
}


//calcul la production en met/cri/deut par heure selon les coordonees , les mines et la temperature max.
function calcule_prod(mine_m, mine_c, mine_d, coordonee, tmps_max, vitesse_uni)
{
	if(mine_m != '?' && mine_m != '?' && mine_m != '?')
	{
		var prod_m = Math.round((30*parseInt(mine_m)*Math.pow(1.1, parseInt(mine_m)))*vitesse_uni);
		var prod_c = Math.round((20*parseInt(mine_c)*Math.pow(1.1, parseInt(mine_c)))*vitesse_uni);

			if(tmps_max == '?' || tmps_max == ' ' || tmps_max == ''){
				var pos_planette = coordonee.split(':')[2].replace( /[^0-9-]/g, "");
				if(pos_planette <= 3)
					{tmps_max = 123;}
				else if(pos_planette <= 6)
					{tmps_max = 65;}
				else if(pos_planette <= 9)
					{tmps_max = 35;}
				else if(pos_planette <= 12)
					{tmps_max = 15;}
				else if(pos_planette <= 15)
					{tmps_max = -40;}
			}
			var math_d = parseInt(mine_d)*(-0.002*parseInt(tmps_max) + 1.28);

		// var prod_d = Math.round((10*parseInt(mine_d)*Math.pow(1.1, math_d))*vitesse_uni);
		var prod_d = vitesse_uni * parseInt(Math.floor(10 * parseInt(mine_d) * (Math.pow(1.1,parseInt(mine_d)) * (1.44 - (tmps_max * 0.004) ))));

		var retour = prod_m +'/'+ prod_c +'/'+prod_d;
		return retour;
	}
	else{var retour = '?/?/?';
		return retour;}
}

//function d'export des scans.
function export_scan(serveur , check)
{
	var id_num;
	var scan_info = GM_getValue('scan'+ serveur, '').split('#');
	var nb = scan_info.length;
	var export_f ='';

	for(var p=0; p<nb; p++)
	{
		id_num = 'check_'+ p +'';
		if(scan_info[p] != '' && scan_info[p] != ' ' && scan_info[p])
		{
			if(document.getElementById(id_num).checked == check)
			{
				export_f = export_f +'#' +scan_info[p];
			}
		}
	}
	document.getElementById("area_export").innerHTML = export_f;
}

//function d'import des scans.
function import_scan(serveur , variable_q)
{
	var scan_info = GM_getValue('scan'+ serveur, '').split('#');
	var scan_add = document.getElementById("area_import").value;
	scan_add = scan_add.split('#');
	var scan_info3 ='';
	
	for(var p=0; p<scan_add.length; p++)
	{
		if(scan_add[p].split(';').length > 2 && variable_q == 1)
		{scan_info3 = scan_info3 + '#'+ scan_add[p];}
		
		else if(scan_add[p].split(';').length > 2  && variable_q == 0)
		{
			if(p == 0){scan_info3 = scan_info3 + scan_add[p];}
			else{scan_info3 = scan_info3 + '#'+ scan_add[p];}
		}
	}
	
	var scan_info2 ='';
	
	if(variable_q == 1){	
		scan_info2 = scan_info.join('#');			
		scan_info2 = scan_info2 + scan_info3;	
	}
	else{scan_info2 = scan_info3;}
	
	scan_info2 = scan_info2.replace( /\#{2,}/g, "#");
	GM_setValue('scan'+ serveur, scan_info2);
	fadeBoxx(text.import_rep, 0, 10000);
}


function supr_scan_dep_mess(type_clique, check_q)
{
//type_clique 1=affiche, 2 = select juste supr scan script , 3/4 idem mais script +scan
	var info_scan = GM_getValue('scan'+ serveur, '');
	var info_scan_i = info_scan.split('#');
	var nb_scan_total_a_enr = document.getElementsByClassName('material spy').length;

	var tout_mess = document.getElementById('messageContent').innerHTML;
	tout_mess = tout_mess.split('switchView(\'spioDetails_');
	var nb_scan_plus_un = tout_mess.length;
	var id_rc;
	
	if(type_clique == 2)
	{
		for(var nb_scan_s = 1 ; nb_scan_s < nb_scan_plus_un ; nb_scan_s++){ 		
			id_rc = tout_mess[nb_scan_s].split('\');')[0];
			if(info_scan.indexOf(id_rc) >=0 && document.getElementById(id_rc).checked == check_q)
			{
				for(var p=0; p<info_scan_i.length; p++) 
				{
					if(info_scan_i[p].indexOf(id_rc, 0) >=0){info_scan_i[p] = '';}		
				}		
			}			
		}
	}
	else if(type_clique == 1){
		for(var nb_scan_s = 1 ; nb_scan_s < nb_scan_plus_un ; nb_scan_s++){ 			
			id_rc = tout_mess[nb_scan_s].split('\');')[0];
			if(info_scan.indexOf(id_rc, 0) >=0)
			{
				for(var p=0; p<info_scan_i.length; p++) 
				{
					if(info_scan_i[p].indexOf(id_rc, 0) >=0){info_scan_i[p] = '';}		
				}		
			}			
		}	
	}
	info_scan_i = info_scan_i.join('#');	
 	info_scan_i = info_scan_i.replace( /\#{2,}/g, "#");
	GM_setValue('scan'+ serveur, info_scan_i);
	fadeBoxx(text.rep_mess_supri, 0, 5000);
}

function add_scan_dep_mess(type_clique, check_q)
{
//type_clique 1=affiche, 2 = select juste supr scan script , 3/4 idem mais script +scan
	var nb_scan_total_a_enr = document.getElementsByClassName('material spy').length;

	var tout_mess = document.getElementById('messageContent').innerHTML;
	tout_mess = tout_mess.split('switchView(\'spioDetails_');
	var nb_scan_plus_un = tout_mess.length;	
	
	if(type_clique ==2)
	{
		for(var nb_scan_s = 1 ; nb_scan_s < nb_scan_plus_un ; nb_scan_s++){ 
		
			var id_rc = tout_mess[nb_scan_s].split('\');')[0];
			if(document.getElementById(id_rc).checked == check_q)
			{
				save_scan(serveur, id_rc);
			}
			
		}
	}
	else if(type_clique == 1){
		for(var nb_scan_s = 1 ; nb_scan_s < nb_scan_plus_un ; nb_scan_s++){ 
			
			var id_rc = tout_mess[nb_scan_s].split('\');')[0];
				save_scan(serveur, id_rc);		
		}	
	}
	else{fadeBoxx('Error', 0, 5000);}
	fadeBoxx(text.rep_mess_add, 0, 5000);
}

function calcul_dernier_vidage(metal, cristal, deut, prod_m, prod_c, prod_d, heure_scan, mine_m)
{
	//prod_par_h on change en prod par minutes.
	if(mine_m != '?' && prod_m != 0 && prod_m != '?')
	{
		var prod_m_sec = parseInt(prod_m)/3600;
		var prod_c_sec = parseInt(prod_c)/3600;
		var prod_d_sec = parseInt(prod_d)/3600;

		var nb_sec_m = Math.round(parseInt(metal)/prod_m_sec);
		var nb_sec_c = Math.round(parseInt(cristal)/prod_c_sec);
		var nb_sec_d = Math.round(parseInt(deut)/prod_d_sec);

		function sortNumber(a,b)
		{
			return a - b;
		}
		var array_nb_sec = [nb_sec_m, nb_sec_c, nb_sec_d];
		array_nb_sec.sort(sortNumber);

		var heure_dernier_vidage = parseInt(heure_scan) - parseInt(array_nb_sec[0])*1000;
		
		var datecc = new Date();
		datecc.setTime(heure_dernier_vidage);
		var date_final = datecc.getDate()+'/'+ (parseInt(datecc.getMonth()) + 1) +'/'+datecc.getFullYear()+ ' '
						+datecc.getHours()+ 'h '+ datecc.getMinutes()+ 'min '+ +datecc.getSeconds()+ 's'  ;

		return date_final;
	}
	else{
		var date_final = '?';
		return date_final;
	}
}

function setSpeed()// fonction by sylvercloud
{
	var revMBase =document.getElementById('inhalt').getElementsByClassName('undermark')[0].innerHTML; // récupération de revenu de base de metal
	var vitesse2 =revMBase/20; // calcul de la vitesse

	GM_setValue('vitesse_uni', vitesse2); // enregistrement de la vitesse
}


////*********************************************/ PAGE DE RESSOURCE /*********************************************************	* /
if((url.indexOf('index.php?page=resourceSettings',0)) >=0)
{setSpeed();}

////*********************************************/ PAGE DE MESSAGES /*********************************************************	* /
function bouton_supr_scan_depuis_mess()
{
	if(document.getElementById('Bouton_Rf') == null && document.getElementById('mailz'))
	{
		var style_css = ' <style type="text/css">'
						+'.Buttons_scan_mess input {'
						+'	-moz-background-inline-policy:continuous;'
						+'	border:0 none; cursor:pointer;'
						+'	height:32px; text-align:center; width:35px;'
						+'}</style>';

		// document.getElementById.getElementsByClassName('infohead')[0].getElementsByTagName('td')[0].innerHTML;
		var lien_dossier_icone = 'http://snaquekiller.free.fr/ogame/messraide/raidefacile%20mess/';
		var bouton_supr_mess_et_scan = '<BR /><div class="Buttons_scan_mess"> <input type="button" title="'+ text.spr_scrptscan_a +'" style=\'background:url("'+ lien_dossier_icone +'supscan2aff.png") no-repeat scroll transparent;\' id="scan_mess_a" mod="9"/>'
									+ '<input type="button" title="'+ text.spr_scrptscan_ns +'" style=\'background:url("'+ lien_dossier_icone +'supscan2nsel.png") no-repeat scroll transparent;\' id="scan_mess_ns" mod="10" />'
									+ '<input type="button" title="'+ text.spr_scrptscan_s +'" style=\'background:url("'+ lien_dossier_icone +'supscan2sel.png") no-repeat scroll transparent;\'  id="scan_mess_s" mod="7"/>';
									
		var bouton_supr_scan = ' '+ ' '+'<input type="button" title="'+ text.spr_scan_a +'" style=\'background:url("'+ lien_dossier_icone +'supscanaff.png") no-repeat scroll transparent;\' id="scan_a" />'
									+ '<input type="button" title="'+ text.spr_scan_ns +'" style=\'background:url("'+ lien_dossier_icone +'supscannsel.png") no-repeat scroll transparent;\'  id="scan_ns" />'
									+ '<input type="button" title="'+ text.spr_scan_s +'" style=\'background:url("'+ lien_dossier_icone +'supscansel.png") no-repeat scroll transparent;\'  id="scan_s" />';

		var bouton_add_scan = ' '+ ' '+'<input type="button" title="'+ text.add_scan_a +'" style=\'background:url("'+ lien_dossier_icone +'ajscanaff2.png") no-repeat scroll transparent;\' id="scan_add_a" />'
									+ '<input type="button" title="'+ text.add_scan_ns +'" style=\'background:url("'+ lien_dossier_icone +'ajscannsel2.png") no-repeat scroll transparent;\'  id="scan_add_ns" />'
									+ '<input type="button" title="'+ text.add_scan_s +'" style=\'background:url("'+ lien_dossier_icone +'ajscansel2.png") no-repeat scroll transparent;\'  id="scan_add_s" /></div>';

									
		var texte_a_affichers = style_css + bouton_supr_mess_et_scan + bouton_supr_scan + bouton_add_scan;

		var sp1 = document.createElement("span"); // on cree une balise span
		sp1.setAttribute("id", "Bouton_Rf"); // on y ajoute un id
		var sp1_content = document.createTextNode('');
		sp1.appendChild(sp1_content); 
		var sp2 = document.getElementById('mailz'); // Lieu où on veut afficher (A remplacer par ce que vous voulez 
		var parentDiv = sp2.parentNode;
		parentDiv.insertBefore(sp1, sp2.nextSibling);
		var tableau = document.createElement("span");
		tableau.innerHTML = texte_a_affichers; // Ce qu'on veut afficher 
		document.getElementById('Bouton_Rf').insertBefore(tableau, document.getElementById('Bouton_Rf').firstChild); // Affichage
	
	// merci a sylvercloud pour les icones 	
	document.getElementById("scan_mess_a").addEventListener("click", function(event){supr_scan_dep_mess(1, true);if(FireFox){unsafeWindow.mod = 9;}else{window.mod = 9;};document.getElementsByClassName('buttonOK deleteIt')[0].click();}, true);
	document.getElementById("scan_mess_s").addEventListener("click", function(event){supr_scan_dep_mess(2, true);if(FireFox){unsafeWindow.mod = 7;}else{window.mod = 7;};;document.getElementsByClassName('buttonOK deleteIt')[0].click();}, true);
	document.getElementById("scan_mess_ns").addEventListener("click", function(event){supr_scan_dep_mess(2, false);if(FireFox){unsafeWindow.mod = 10;}else{window.mod = 10;};;document.getElementsByClassName('buttonOK deleteIt')[0].click();}, true);

	document.getElementById("scan_a").addEventListener("click", function(event){supr_scan_dep_mess(1, true);}, true);
	document.getElementById("scan_s").addEventListener("click", function(event){supr_scan_dep_mess(2, true);}, true);
	document.getElementById("scan_ns").addEventListener("click", function(event){supr_scan_dep_mess(2, false);}, true);
	// unsafeWindow.executeAction(delIds, -mod);

	document.getElementById("scan_add_a").addEventListener("click", function(event){add_scan_dep_mess(1, true);}, true);
	document.getElementById("scan_add_s").addEventListener("click", function(event){add_scan_dep_mess(2, true);}, true);
	document.getElementById("scan_add_ns").addEventListener("click", function(event){add_scan_dep_mess(2, false);}, true);
	}
}


////*********************************************/ PAGE DE MESSAGES AVEC POP UP /*********************************************************	* //
if ((url.indexOf('index.php?page=showmessage',0)) >=0)
{
	if(document.getElementsByClassName('note')[0].getElementsByClassName('material spy')[0])
	{
		if(scan_preenrgistre == 1){save_scan(serveur, 0);}
				
		var script_poursuprimermessage1 = document.getElementsByTagName('script')[7].innerHTML;
		var script_poursuprimermessage = '<script type="text/javascript">' + script_poursuprimermessage1+'</script>';
		
		if(document.getElementById('contentPageNavi').getElementsByTagName('a')[2] && document.getElementById('contentPageNavi').getElementsByTagName('a')[2].href != ''){
			var lien_suivant_message = document.getElementById('contentPageNavi').getElementsByTagName('a')[2].href ;
		}
		else{var lien_suivant_message = '';}
		var tout_supr = script_poursuprimermessage + '<li class="delete" > <a title="'+ text.del_scan_d +'" class="tips2 action" id="2" href="#"><span class="delscan" >'+ text.del_scan_script +'</span></a></li>' 
						+ '<li class="delete" > <a title="'+ text.enleve_script +'" href="'+ lien_suivant_message + '"><span class="delscan" >'+ text.del_script +'</span></a></li>';
		if(scan_preenrgistre == 0){
			tout_supr = tout_supr + '<li class="delete" > <a title="'+ text.add_scan +'" href="#"><span class="addscan" >'+ text.add_scan_d +'</span></a></li>'; 
		}
		
		var newElement = document.createElement("div"); // On cree un nouvelle element div
		newElement.innerHTML = tout_supr; // On ecrit le code source qu'il contient
		document.getElementsByClassName('toolbar')[0].insertBefore(newElement, document.getElementsByClassName('toolbar')[0].getElementsByTagName('li')[1]); // On l'affiche
		document.getElementsByClassName("delscan")[0].addEventListener("click", function(event){supr_scan1(serveur);}, true);
		document.getElementsByClassName("delscan")[1].addEventListener("click", function(event){supr_scan1(serveur);}, true);
		if(scan_preenrgistre == 0){
			document.getElementsByClassName("addscan")[0].addEventListener("click", function(event){save_scan(serveur, 0);}, true);
		}
	}
}

/******************************************************************************************************************************************************/
// on affiche le lien raide-facile
if(FireFox)
{
	var menuTable = document.getElementById("menuTable");
	if(document.getElementById("eventboxLoading") && url.indexOf("page=galaxy") == -1){
	  var $; 
	 try { $ = unsafeWindow.$; } 
	 catch(e) { $ = window.$; } 
	 $("#eventboxLoading").ajaxSuccess(function(e,xhr,settings){ 
	  if (settings.url.indexOf("page=fetchEventbox") == -1) return; 

		if(document.getElementById("eventFriendly") != '' && document.getElementById("eventFriendly") != ' ' && document.getElementById("eventFriendly") && document.getElementById("eventFriendly").innerHTML > 0)
		{
			var url_1 = document.getElementById("menuTable").getElementsByClassName('menu_icon')[7].getElementsByTagName('a')[0].href;
		}else{var url_1 = document.getElementById("menuTable").getElementsByClassName('menubutton')[7].href;}
		var bar = document.getElementById("bar").innerHTML;
		var menugauche = document.getElementById("links").innerHTML;
		if((bar.indexOf('Raide-Facile',0)) == -1 && (menugauche.indexOf('Raide-Facile',0)) == -1)
		{
			afficher_lien(url_1);
		}
	 }); 
	}
	else if(menuTable != null )
	{
		var url_1 = document.getElementById("menuTable").getElementsByClassName('menubutton')[7].href;
		afficher_lien(url_1);
	}	
}
else{
	if(document.getElementById("eventboxLoading") && url.indexOf("page=galaxy") == -1)
	{
		function verifier_url(){		
			if(document.getElementById("eventboxBlank").style.display == 'none')
			{
				var url_1 = document.getElementById("menuTable").getElementsByClassName('menu_icon')[7].getElementsByTagName('a')[0].href;
				var bar = document.getElementById("bar").innerHTML;
				var menugauche = document.getElementById("links").innerHTML;
				if((bar.indexOf('Raide-Facile',0)) == -1 && (menugauche.indexOf('Raide-Facile',0)) == -1)
				{
					afficher_lien(url_1);
				}
				else{
					if(document.getElementById("lien_raide").href != url_1){
						document.getElementById("lien_raide").href == url_1;
					}
				}
			}
			else{
				var url_1 = document.getElementById("menuTable").getElementsByClassName('menubutton')[7].href;
				var bar = document.getElementById("bar").innerHTML;
				var menugauche = document.getElementById("links").innerHTML;
				if((bar.indexOf('Raide-Facile',0)) == -1 && (menugauche.indexOf('Raide-Facile',0)) == -1)
				{
					afficher_lien(url_1);
				}
				else{
					if(document.getElementById("lien_raide").href != url_1){
						document.getElementById("lien_raide").href == url_1;
					}				
				}			
			}
		}
		setInterval(verifier_url(),30000);		

	}
	else if(menuTable != null )
	{
		var url_1 = document.getElementById("menuTable").getElementsByClassName('menubutton')[7].href;
		afficher_lien(url_1);
	}

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
// ************************************** ************************ SCAN PREVOUERT : *******************************************************************/
if((url.indexOf('index.php?page=messages',0)) >=0)
{	
	if(FireFox)
	{
		function sauve_option2(){

			var nb_scan_total_a_enr = document.getElementsByClassName('material spy').length;

			var tout_mess = document.getElementById('messageContent').innerHTML;
			tout_mess = tout_mess.split('switchView(\'spioDetails_');
			var nb_scan_plus_un = tout_mess.length;			
			for(var nb_scan_s = 1 ; nb_scan_s < nb_scan_plus_un ; nb_scan_s++){ 
				var id_rc = tout_mess[nb_scan_s].split('\');')[0];
				if(scan_preenrgistre == 1){save_scan(serveur, id_rc);}
			}
		}

		function safeWrap(f) {
			return function() {
				setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
			};
		}

		unsafeWindow.$(".mailWrapper").ajaxSuccess(safeWrap(function(e,xhr,settings){
			//l'url de la requête ajax contient page=messages
			if (settings.url.indexOf("page=messages") == -1) return;
			if (settings.data.indexOf("displayPage") == -1) return; 
			// on affiche l'onglet charge
			var cat = settings.data.replace(/^.*displayCategory=([\d-]*).*$/,"$1");
			switch (cat) {/*7 espionner , 5combat , 6joueur , 8expe,2 alli, 4 divers ^^*/
				case "9":
				case "7":		
					sauve_option2();
					if(q_icone_mess == 1){bouton_supr_scan_depuis_mess();}
					break;
				// case "5":		
					// sauve_option2();
					// break;
				case "10":
					// alert("Boîte de reception");
					sauve_option2();
					if(q_icone_mess == 1){bouton_supr_scan_depuis_mess();}
					break;
				case "3":
					// alert("Corbeille");
					break;
				default:
					// alert("Carnet d'adresse");
					break;
			}
		}));
	}
	else{
		setInterval(bouton_supr_scan_depuis_mess(),5000);
	}
} 


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
// ******************************************************************* TABLEAU : **********************************************************************/
if ((url.indexOf('&raidefacil=scriptOptions',0)) >=0)
{
/* ********************** On recupere les infos ************************/
		suprime_espace(serveur);
		var url_2 = url.split('&raidefacil=scriptOptions')[0];
		var scan_i = GM_getValue('scan'+ serveur, '').split('#');
		var html_export = ' ';
		var bbcode_export = ' ';

		if ((url.indexOf('&del_scan=',0)) >=0)
		{
			var numero_scan = url.split('del_scan=')[1].split('&')[1];
			
			scan_i[numero_scan] = '';
			var scan_info2 = '';

			scan_info2 = scan_i.join('#');
			
			scan_info2 = scan_info2.replace( /\#{2,}/g, "#");
			GM_setValue('scan'+ serveur, scan_info2);
			suprime_espace(serveur);
			scan_i = GM_getValue('scan'+ serveur, '').split('#');
		}		
	

	/********************** Trie du tableau ******************/
		var ligne_tableau = ' ';
		var nb = scan_i.length ;
		if(nb_scan_page != 0)
		{
			var num_page = url.split('&page_r=')[1];
			var nb_page_poss = Math.ceil(nb/nb_scan_page);
			
			if(num_page == undefined || num_page == 1)
			{
				var nb_scan_deb = 0;
				var nb_scan_fin = nb_scan_page;
			}
			else if(num_page >= 1)
			{
				var nb_scan_deb = (parseInt(num_page) - 1)*nb_scan_page;
				var nb_scan_fin = parseInt(num_page)*nb_scan_page;
			}
		}
		else{var nb_scan_fin = nb;var nb_scan_deb =0;}
		
		
		
		for (var h =0 ; h<nb ; h++)
		{
			scan_i[h] = scan_i[h].split(';');	
		}

		if(parseInt(classement.replace( /[^0-9-]/g, "")) == 1)//si le classement est par coordonee on fait que les coordonees soit classable
		{
			var transition;
			for (var gh = 0 ; gh<nb ; gh++)
			{
				if(scan_i[gh] != undefined && scan_i[gh].indexOf(';;;;;;;;;;;;;;;;;x') == -1 ) 
				{
					var scan_info_i = scan_i[gh];
					if(scan_info_i[9] != undefined){
						var coordonee = scan_i[gh][1];

							var coordosplit = coordonee.split(':');
						var galaxie = coordosplit[0].replace( /[^0-9-]/g, "");
						var systeme = coordosplit[1].replace( /[^0-9-]/g, "");
						var planette = coordosplit[2].replace( /[^0-9-]/g, "");
						
						if(parseInt(systeme) <100){
							if(parseInt(systeme) <10){
								systeme = '00'+''+systeme;					
							}
							else{systeme = '0'+''+systeme;}	
						}
						
						if(parseInt(planette) <10)
						{
							planette = '0'+''+planette;		
						}
						transition = galaxie +''+ systeme +''+ planette;
						scan_i[gh][1] = parseInt(transition);
					}
				}
			}
		}
		else if(classement == '20c')//si c'est le classement autre, mettre une autre variable quand il y aura plusieur autre ^^.
		{
			for (var gh = 0 ; gh<nb ; gh++)
			{
				if(scan_i[gh] != undefined) 
				{
					if(scan_i[gh][9] != undefined && scan_i[gh].indexOf(';;;;;;;;;;;;;;;;;x') == -1){
					//ressource				
						var ressource_m = scan_i[gh][4];
						var ressource_c = scan_i[gh][5];
						var ressource_d = scan_i[gh][6];
						var ressource_total = parseInt(ressource_m) + parseInt(ressource_c) + parseInt(ressource_d);

						//cdr possible
						var cdr_possible = Math.round(parseInt(scan_i[gh][8])*pourcent_cdr);					
						var cdr_possible_m = Math.round(parseInt(scan_i[gh][15])*pourcent_cdr);					
						var cdr_possible_c = Math.round(parseInt(scan_i[gh][16])*pourcent_cdr);
							
						var cdr_ressource = ressource_total + parseInt(cdr_possible_m) + parseInt(cdr_possible_c);
						scan_i[gh][20] = cdr_ressource;
					}else{scan_i[gh][20] = '-1';}	
				}
			}
		}
		else if(classement == '20d')//si c'est le classement autre, mettre une autre variable quand il y aura plusieur autre ^^.
		{
			for (var gh = 0 ; gh<nb ; gh++)
			{
				if(scan_i[gh] != undefined) 
				{
					var scan_info_i = scan_i[gh];
					if(scan_info_i[9] != undefined && scan_info_i[gh] != ';;;;;;;;;;;;;;;;;x')
					{		
						// batiment adversaire + prodh + resrrouce x h
						//+bat +prod/h
						var coordonee = scan_info_i[1];
						var mine_array = scan_info_i[19].split('/');
						var mine_m = mine_array[0];		
						var mine_c = mine_array[1];		
						var mine_d = mine_array[2];
						
						if(mine_array != '?/?/?')
						{
							var prod_t = calcule_prod(mine_m, mine_c, mine_d, coordonee, '?', vitesse_uni).split('/');

							var prod_m_h = prod_t[0];
							var prod_c_h = prod_t[1];
							var prod_d_h = prod_t[2];
						}
		
						//ressource x h
						if(mine_array != '?/?/?')
						{
							var prod_m_xh = parseInt(prod_m_h)*(parseInt(prod_gg)/60);
							var prod_c_xh = parseInt(prod_c_h)*(parseInt(prod_gg)/60);
							var prod_d_xh = parseInt(prod_d_h)*(parseInt(prod_gg)/60);
							
							var ressource_m_xh = parseInt(ressource_m) + prod_m_xh;
							var ressource_c_xh = parseInt(ressource_c) + prod_c_xh;
							var ressource_d_xh = parseInt(ressource_d) + prod_d_xh;				
							var ressource_tt_xh = ressource_m_xh + ressource_c_xh + ressource_d_xh;
						}
						
					scan_i[gh][20] = ressource_tt_xh;
					}
					else{scan_i[gh][20] = '-1';}						
				}
			}
		}else if(classement == '20e')//si c'est le classement autre, mettre une autre variable quand il y aura plusieur autre ^^.
		{
			for (var gh = 0 ; gh<nb ; gh++)
			{
				if(scan_i[gh] != undefined && scan_i[gh].indexOf(';;;;;;;;;;;;;;;;;x') == -1) 
				{
					var scan_info_i = scan_i[gh];
					if(scan_info_i[9] != undefined)
					{		
						// batiment adversaire + prodh + resrrouce x h
						//+bat +prod/h
						var mine_array = scan_info_i[19].split('/');
						var mine_m = mine_array[0];		
						var mine_c = mine_array[1];		
						var mine_d = mine_array[2];
						
						if(mine_array != '?/?/?')
						{
							var prod_t = calcule_prod(mine_m, mine_c, mine_d, coordonee, '?', vitesse_uni).split('/');

							var prod_m_h = prod_t[0];
							var prod_c_h = prod_t[1];
							var prod_d_h = prod_t[2];
							var prod_tot = parseInt(prod_m_h) + parseInt(prod_c_h) + parseInt(prod_d_h);
						}						
					scan_i[gh][20] = prod_tot;
					}else{scan_i[gh][20] = '-1';}						
				}
			}
		}	
		
		
		function sort_Info(a,b) { return b[parseInt(classement.replace( /[^0-9-]/g, ""))]-a[parseInt(classement.replace( /[^0-9-]/g, ""))]; }
		if(parseInt(classement.replace( /[^0-9-]/g, "")) > -1){scan_i.sort(sort_Info);}
		
		if(reverse == '0'){scan_i.reverse();}
				
		if(parseInt(classement.replace( /[^0-9-]/g, "")) == 1)//si le classement est par coordonee
		{
			for (var gh=0 ; gh<nb ; gh++)
			{
				if(scan_i[gh] != undefined && scan_i[gh].indexOf(';;;;;;;;;;;;;;;;;x') == -1) 
				{
					var scan_info_i = scan_i[gh];
					if(scan_info_i[9] != undefined){
						var coordonee = ''+scan_i[gh][1] +'';
						var galaxie = coordonee.substr(0, 1);
						var systeme = coordonee.substr(1, 3);
						var planette = coordonee.substr(4, 2);

						galaxie = supr0(galaxie);
						systeme = supr0(systeme);
						planette = supr0(planette);
						
						scan_i[gh][1] = '['+ galaxie + ':' + systeme + ':' + planette + ']';
					}	
				}	
			}
		}else if(parseInt(classement.replace( /[^0-9-]/g, "")) == '20')//si c'est le classement autre, mettre une autre variable quand il y aura plusieur autre ^^.
		{
			for (var gh = 0 ; gh<nb ; gh++)
			{	
				if(scan_i[gh] != undefined) 
				{ scan_i[gh][20] = 'x';
				}
			}
		}
		
		for (var h =0 ; h<nb ; h++)
		{
			scan_i[h] = scan_i[h].join(';');	
		}
		
		/********************** on affiche le tableau ******************/
			GM_setValue('scan'+ serveur, scan_i.join('#'));
			scan_info = scan_i;
			
		// on les utilises et les place
		for(var i= nb_scan_deb; i<nb_scan_fin; i++)
		{	
			if(scan_info[i] != undefined && scan_info[i] != ';;;;;;;;;;;;;;;;;x') 
			{
				var scan_info_i = scan_info[i].split(';');
				if(scan_info_i[9] != undefined){
				
				// date
					var date_scan = scan_info_i[0];
						var datecc = new Date();
						datecc.setTime(date_scan);
					var date_final = datecc.getDate()+'/'+datecc.getMonth() +'/'+datecc.getFullYear()+ ' '
									+datecc.getHours()+ 'h '+ datecc.getMinutes()+ 'min '+ +datecc.getSeconds()+ 's'  ;
					
					if(q_date_type_rep == 0){
						var datecc2 = parseInt(start_time) - parseInt(date_scan);			
						var seconde = Math.floor(datecc2/1000); // pour avoir le nb de seconde qui s'est ecouler depuis le scan.
						var minutes = Math.floor(seconde/60);
						var heures = Math.floor(minutes/60);
						var jours = Math.floor(heures/24);
							seconde = Math.floor(seconde%60);
							minutes = Math.floor(minutes%60);
							heures = Math.floor(heures%24);
						
						
						if(seconde != 0){
							var date2 = seconde +'sec'; 
						if(minutes != 0)
						{
							date2 = minutes + 'min '+date2;
							if(heures != 0)
							{
							date2 = heures + 'h '+date2;
								if (jours != 0){
									date2 = jours + 'j,'+date2;
								}
							}			
						}
						}
						else{ var date2 = '--:--:--';}
					}
					else{
					var date2 = date_final;}

				//coordonee url
					var type_planette = scan_info_i[14];
					var l_q ='';
					var coordonee = scan_info_i[1];
							var coordonee_split = coordonee.split(':');
						var galaxie = (coordonee_split[0]).replace( /[^0-9-]/g, "");
						var systeme = (coordonee_split[1]).replace( /[^0-9-]/g, "");
						var planette = (coordonee_split[2]).replace( /[^0-9-]/g, "");
						var url_galaxie = document.getElementById("menuTable").getElementsByClassName('menubutton ')[8].href;
					
					var url_fleet1 = document.getElementById("menuTable").getElementsByClassName('menubutton ')[7].href;
					if(espionnage_lien == 1)
					{var espionnage = url_fleet1 +'&galaxy='+ galaxie + '&system='+ systeme + '&position='+ planette + '&type='+ type_planette +'&mission=6';}
					else if(espionnage_lien == 0)
					{var espionnage = url_galaxie +'&galaxy='+ galaxie + '&system='+ systeme + '&position='+ planette + '&planetType=1&doScan=1';}
					
					if(type_planette != 1){l_q = ' (L)';}
					
					var coordonee_fin = '<a href="'+url_galaxie +'&galaxy='+ galaxie + '&system='+ systeme + '&position='+ planette +'" title="Coordonée">'+ coordonee + l_q + '</a>';
								
				//ligne du tableau <tr> de toute les infos du scan
					ligne_tableau = ligne_tableau + '\n<tr class="'+ coordonee +'">';
				
				//nom joueur et planette
					var nom_joueur = scan_info_i[2];
					var nom_planete2 = scan_info_i[3];
					if(nom_planete2.indexOf('1diez1')>=0){
						nom_planete2 = nom_planete2.replace( /1diez1/g, "#");		
					}
					var nom_planete = raccourcir(nom_planete2);

					//si rassemble coordonee et planette
					var coordonee_fin2 = '<a href="'+url_galaxie +'&galaxy='+ galaxie + '&system='+ systeme + '&position='+ planette +'" title=" Planette : '+ nom_planete +'">'+ coordonee + l_q + '</a>';

				//ressource				
					var ressource_m = scan_info_i[4];
					var ressource_c = scan_info_i[5];
					var ressource_d = scan_info_i[6];
					var nb_pt = shipCount(parseInt(ressource_m), parseInt(ressource_c), parseInt(ressource_d), 5000);
					var nb_gt = shipCount(parseInt(ressource_m), parseInt(ressource_c), parseInt(ressource_d), 25000);
					var gt_pt = '('+ addPoints(nb_pt) +'/'+ addPoints(nb_gt) +')';
					var ressource_total = parseInt(ressource_m) + parseInt(ressource_c) + parseInt(ressource_d);
					
					if(question_rassemble_col == 0)
					{
						var ressource = '<acronym title=" '+ text.metal +' : ' + addPoints(Math.round(parseInt(ressource_m)/2)) + ' | '+ text.cristal +' : ' + addPoints(Math.round(parseInt(ressource_c)/2)) + ' | '+ text.deut +' : ' + addPoints(Math.round(parseInt(ressource_d)/2)) + ' ">'+  addPoints(Math.round(parseInt(ressource_total)/2)) + gt_pt + '</acronym>';
					}
					
				//activite
					var activite = scan_info_i[7];
					if(activite == 'rien'){ var activite_fin = ' ';}
					else {var activite_fin = '<img style="width: 12px; height: 12px;" src="img/galaxy/activity.gif" alt="'+ activite +' min " title="'+ activite +' min"/>';}
				
				// vitesse minimum.
					var accronyme_temp_vol = vaisseau_vitesse_mini(tech_impul_a ,tech_hyper_a ,tech_combus_a, vaisseau_lent, coordonee, vitesse_uni);
				
				//cdr possible
					var cdr_possible = Math.round(parseInt(scan_info_i[8])*pourcent_cdr);
					
					var cdr_possible_m = Math.round(parseInt(scan_info_i[15])*pourcent_cdr);
					var cdr_possible_c = Math.round(parseInt(scan_info_i[16])*pourcent_cdr);

					if(cdr_possible == '?' || isNaN(cdr_possible)){var cdr_aff = 0;cdr_possible = '?'}else{var cdr_aff = cdr_possible;}

					if(scan_info_i[21]){var cdr_def = scan_info_i[21].split('/');}else{var cdr_def = '?';}
					if(cdr_def[0] != '?' &&  pourcent_cdr_def != 0 && cdr_def != 'undefined'){	
						var cdr_possible_def = Math.round(parseInt(cdr_def[0])*pourcent_cdr_def);
						var cdr_possible_def_m = Math.round(parseInt(cdr_def[1])*pourcent_cdr_def);
						var cdr_possible_def_c = Math.round(parseInt(cdr_def[2])*pourcent_cdr_def);
					}
					else{
						var cdr_possible_def = 0;				
						var cdr_possible_def_m = 0;
						var cdr_possible_def_c = 0;				
					}
					
					cdr_possible = cdr_possible + cdr_possible_def;
					cdr_aff = cdr_aff + cdr_possible_def;
					cdr_possible_m = cdr_possible_m + cdr_possible_def_m;
					cdr_possible_c = cdr_possible_c + cdr_possible_def_c;
					if(isNaN(cdr_aff)){cdr_aff = 0;}else{cdr_aff = cdr_aff;}

					if(question_rassemble_col == 0)
					{
						if(cdr_quest == 0){			
							var cdr_aco = '<acronym title=" '+ text.met_rc +' : ' + addPoints(cdr_possible_m) + ' | '+ text.cri_rc +' : ' + addPoints(cdr_possible_c) + ' | '+ text.nb_rc +' : ' + addPoints(Math.ceil(cdr_aff/20000)) + ' ">'+  addPoints(cdr_possible) + '</acronym>';
						}else {
							var cdr_aco = '<acronym title=" '+ text.met_rc +' : ' + addPoints(cdr_possible_m) + ' | '+ text.cri_rc +' : ' + addPoints(cdr_possible_c) + ' | '+ text.cdr_pos +' : ' + addPoints(cdr_possible) + ' ">'+  addPoints(Math.ceil(cdr_aff/20000)) + '</acronym>';
						}
					}
					
				// colo cdr +  resource
					if(question_rassemble_col == 1)
					{
						var col_cdr = '<acronym title=" '+ text.metal +' : ' + addPoints(Math.round(parseInt(ressource_m)/2)) + ' | '+ text.cristal +' : ' + addPoints(Math.round(parseInt(ressource_c)/2)) + ' | '+ text.deut +' : ' + addPoints(Math.round(parseInt(ressource_d)/2)) + ' '+ gt_pt +'; '+ text.met_rc +' : ' + addPoints(parseInt(cdr_possible_m)) + ' | '+ text.cri_rc +' : ' + addPoints(parseInt(cdr_possible_c)) + ' | '+ text.nb_rc +' : ' + addPoints(Math.ceil(cdr_aff/20000)) + ' ">'+  addPoints(parseInt(cdr_aff) + Math.round(parseInt(ressource_total)/2)) +' '+ gt_pt +'</acronym>';				
					}
					
				//recupere vaisseau et defense
					var vaisseau_type = new Array(vari.pt, vari.gt, vari.cle, vari.clo, vari.cro, vari.vb, vari.vc, vari.rec, vari.esp, vari.bb, vari.sat, vari.dest, vari.edlm, vari.tra);
					var defense_type = new Array(vari.lm, vari.lle, vari.llo, vari.gauss, vari.ion, vari.pla, vari.pb, vari.gb, vari.mic, vari.mip);
					
					//type pour les different simulateur.
					var vaisseau_speed = new Array("ship_d0_0_b", "ship_d0_1_b", "ship_d0_2_b", "ship_d0_3_b", "ship_d0_4_b", "ship_d0_5_b", "ship_d0_6_b", "ship_d0_7_b", "ship_d0_8_b", "ship_d0_9_b", "ship_d0_10_b", "ship_d0_11_b", "ship_d0_12_b", "ship_d0_13_b");
					var def_speed = new Array("ship_d0_14_b", "ship_d0_15_b", "ship_d0_16_b", "ship_d0_17_b", "ship_d0_18_b", "ship_d0_19_b", "ship_d0_20_b", "ship_d0_21_b", "abm_b", "");
					
					var vaisseau_win = new Array("d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10", "d11", "d12", "d13");
					var def_win = new Array("d14", "d15", "d16", "d17", "d18", "d19", "d20", "d21", "", "");

					var vaisseau_drag = new Array("numunits[1][0][k_t]", "numunits[1][0][g_t]", "numunits[1][0][l_j]", "numunits[1][0][s_j]", "numunits[1][0][kr]", "numunits[1][0][sc]", "numunits[1][0][ko]", "numunits[1][0][re]", "numunits[1][0][sp]", "numunits[1][0][bo]", "numunits[1][0][so]", "numunits[1][0][z]", "numunits[1][0][t]", "numunits[1][0][sk]");
					var def_drag = new Array("numunits[1][0][ra]", "numunits[1][0][l_l]", "numunits[1][0][s_l]", "numunits[1][0][g]", "numunits[1][0][i]", "numunits[1][0][p]", "numunits[1][0][k_s]", "numunits[1][0][g_s]", "missiles_available_v", "");
					
					var url_dragosim = '';
					var url_speedsim = '';
					var url_ogamewinner = '';
					
					// def et vaisseau variable
					var acronyme_vaisseau = ' ';
					var nb_totalvaisseau = 0;
					var acronyme_def = ' ';
					var nb_totaldef = 0;
				
					var vaisseau22 = scan_info_i[9];
					if(vaisseau22 != '?/?/?/?/?/?/?/?/?/?/?/?/?/?')
					{
						var vaisseau = vaisseau22.split('/');				
							for(var k=0; k<vaisseau.length ; k++)
								{
								if( parseInt(vaisseau[k]) != 0)
									{
										acronyme_vaisseau = acronyme_vaisseau + ' | '+ vaisseau_type[k] + ' : ' + addPoints(parseInt(vaisseau[k]));
										nb_totalvaisseau = parseInt(nb_totalvaisseau) + parseInt(vaisseau[k]);
										
										url_speedsim = url_speedsim + '&amp;' + vaisseau_speed[k] + '=' + parseInt(vaisseau[k]);
										url_dragosim = url_dragosim + '&amp;' + vaisseau_drag[k] + '=' + parseInt(vaisseau[k]);
										url_ogamewinner = url_ogamewinner + '&amp;' + vaisseau_win[k] + '=' + parseInt(vaisseau[k]);
									}
								}
						nb_totalvaisseau = addPoints(parseInt(nb_totalvaisseau));		
					}
					else{var vaisseau = vaisseau22.split('/');
						acronyme_vaisseau = '?';
						nb_totalvaisseau = '?';}
						
					var defense2 = scan_info_i[10];
					if(defense2 != '?/?/?/?/?/?/?/?/?/?')
					{
						var defense = defense2.split('/');		
							for(var k=0; k<defense.length ; k++)
							{ 
								if(parseInt(defense[k]) != 0)
								{
									acronyme_def = acronyme_def + ' | '+ defense_type[k] + ' : ' + addPoints(parseInt(defense[k]));
									url_speedsim = url_speedsim + '&amp;' + def_speed[k] + '=' + parseInt(defense[k]);
									url_dragosim = url_dragosim + '&amp;' + def_drag[k] + '=' + parseInt(defense[k]);
									url_ogamewinner = url_ogamewinner + '&amp;' + def_win[k] + '=' + parseInt(defense[k]);
									
									if(k != 8 && k != 9){
										nb_totaldef = parseInt(nb_totaldef) + parseInt(defense[k]);
									}
								}
							}
						nb_totaldef = addPoints(parseInt(nb_totaldef));
					}
					else{var defense = defense2.split('/');
						acronyme_def = '?';
						nb_totaldef = '?';}
					
					acronyme_vaisseau2 = '<acronym title=" '+ acronyme_vaisseau +'">'+ nb_totalvaisseau   + '</acronym>';
					acronyme_def2 = '<acronym title=" '+ acronyme_def +'">'+ nb_totaldef   + '</acronym>';
				

				
				//recherhe adersersaire
					var recherche_ad = scan_info_i[13].split('/');
					var tech_arme_d = recherche_ad[0];		
					var tech_bouclier_d = recherche_ad[1];		
					var tech_protect_d = recherche_ad[2];

					var url_fleet1 = document.getElementById("menuTable").getElementsByClassName('menubutton ')[7].href;
					var url_attaquer = url_fleet1 + '&galaxy='+ galaxie +'&system='+ systeme +'&position='+ planette +'&type='+ type_planette +'&mission=1';
					
					if(q_techzero == 1 && recherche_ad.join(';') == "?;?;?")
					{
						var tech_arme_a_sim = 0;
						var tech_protect_a_sim = 0;
						var tech_bouclier_a_sim = 0;		
					
					}else{
						var tech_arme_a_sim = tech_arme_a;
						var tech_protect_a_sim = tech_protect_a;
						var tech_bouclier_a_sim = tech_bouclier_a;		
					}
					
					var url_spedsim_fi = 'http://websim.speedsim.net/index.php?version=1&lang=fr&tech_a0_0='+ tech_arme_a_sim +'&tech_a0_1='+ tech_bouclier_a_sim +'&tech_a0_2='+ tech_protect_a_sim +'&engine0_0='+ tech_combus_a +'&engine0_1='+ tech_impul_a +'&engine0_2='+ tech_hyper_a +'&start_pos='+ pos_depart
										+ '&tech_d0_0='+ tech_arme_d +'&tech_d0_1='+ tech_bouclier_d +'&tech_d0_2='+ tech_protect_d
										+ '&enemy_name=' + nom_planete +'&enemy_pos='+ coordonee +'&enemy_metal='+ parseInt(ressource_m) +'&enemy_crystal='+ parseInt(ressource_c) +'&enemy_deut='+ parseInt(ressource_d) + url_speedsim;
				
				
					var url_dragosim_fi = 'http://drago-sim.com/index.php?style=new&template=New&lang=french&'+ 'techs[0][0][w_t]='+ tech_arme_a_sim +'&techs[0][0][s_t]='+ tech_bouclier_a_sim +'&techs[0][0][r_p]='+ tech_protect_a_sim +'&engine0_0='+ tech_combus_a +'&engine0_1='+ tech_impul_a +'&engine0_2='+ tech_hyper_a +'&start_pos='+ pos_depart
										+ '&techs[1][0][w_t]='+ tech_arme_d +'&techs[1][0][s_t]='+ tech_bouclier_d +'&techs[1][0][r_p]='+ tech_protect_d
										+ '&v_planet=' + nom_planete +'&v_coords='+ coordonee +'&v_met='+ parseInt(ressource_m) +'&v_kris='+ parseInt(ressource_c) +'&v_deut='+ parseInt(ressource_d) + url_dragosim;
					
					var url_ogamewinner_fi = 'http://www.referencement-moteurs-gratuit.com/csim/?'+'&aattack='+ tech_arme_a_sim +'&ashield='+ tech_bouclier_a_sim +'&aarmory='+ tech_protect_a_sim
										+ '&dattack='+ tech_arme_d +'&dshield='+ tech_bouclier_d +'&darmory='+ tech_protect_d
										+ '&enemy_name=' + nom_planete +'&enemy_pos='+ coordonee +'&dmetal='+ parseInt(ressource_m) +'&dcrystal='+ parseInt(ressource_c) +'&ddeut='+ parseInt(ressource_d) + url_ogamewinner;
				
					if(simulateur == 0){var url_simul = url_dragosim_fi;}
					else if(simulateur == 1){var url_simul = url_spedsim_fi;}
					else if(simulateur == 2){var url_simul = url_ogamewinner_fi;}
					
				// batiment adversaire + prodh + resrrouce x h
					//+bat +prod/h
					var mine_array = scan_info_i[19].split('/');
					var mine_m = mine_array[0];		
					var mine_c = mine_array[1];		
					var mine_d = mine_array[2];
					
					if(mine_array != '?,?,?')
					{
						var prod_t = calcule_prod(mine_m, mine_c, mine_d, coordonee, '?', vitesse_uni).split('/');

						var prod_m_h = prod_t[0];
						var prod_c_h = prod_t[1];
						var prod_d_h = prod_t[2];
						var prod_tot = parseInt(prod_m_h) + parseInt(prod_c_h) + parseInt(prod_d_h);
						
						var acro_prod_h = '<acronym title=" '+ text.metal +' : ' + addPoints(parseInt(prod_m_h)) + ' | '+ text.cristal +' : ' + addPoints(parseInt(prod_c_h)) + ' | '+ text.deut +' : ' + addPoints(parseInt(prod_d_h)) + ' ">'+  addPoints(parseInt(prod_tot)) + '</acronym>';
					}
					else {var acro_prod_h = '<acronym title="'+ text.batiment_non_visible +'"> ? </acronym>';
					}
					
					//ressource x h
					if(mine_array != '?,?,?')
					{
						var prod_m_xh = parseInt(prod_m_h)*(parseInt(prod_gg)/60);
						var prod_c_xh = parseInt(prod_c_h)*(parseInt(prod_gg)/60);
						var prod_d_xh = parseInt(prod_d_h)*(parseInt(prod_gg)/60);
						var prod_tt_xh = prod_m_xh + prod_c_xh + prod_d_xh;
						
						var ressource_m_xh = parseInt(ressource_m) + prod_m_xh;
						var ressource_c_xh = parseInt(ressource_c) + prod_c_xh;
						var ressource_d_xh = parseInt(ressource_d) + prod_d_xh;				
						var ressource_tt_xh = ressource_m_xh + ressource_c_xh + ressource_d_xh;
						
						var acro_ress_xh = '<acronym title=" '+ text.metal +' : ' + addPoints(ressource_m_xh) + '(+'+  addPoints(prod_m_xh) +') | '+ text.cristal +' : ' + addPoints(ressource_c_xh) + '(+'+  addPoints(prod_c_xh) +') | '+ text.deut +' : ' + addPoints(ressource_d_xh) + '(+'+  addPoints(prod_d_xh) +') | +'+  addPoints(prod_tt_xh) +' ">'+  addPoints(ressource_tt_xh) + '</acronym>';
					}
					else {var acro_prod_h = '<acronym title="'+ text.batiment_non_visible +'"> ? </acronym>';}
					
					//case simuler en mode exporter vers un autre simulateur.
					if(simulateur == 3){						
						var saut ='\n';
						var tabulation ='&nbsp;&nbsp;&nbsp;&nbsp;';
						var export_scan_simul = 'Ressources sur Mirage ' + coordonee +' (joueur \''+ nom_joueur +'\') le ' + datecc.getMonth() +'-'+datecc.getDate()+ ' '+datecc.getHours()+ 'h '+ datecc.getMinutes()+ 'min '+ +datecc.getSeconds()+ 's' 
						+saut	
						+saut + 'Métal:'+ tabulation + addPoints(parseInt(ressource_m))+ tabulation +'Cristal:'+ tabulation+ addPoints(parseInt(ressource_c))
						+saut + 'Deutérium:'+ tabulation+ addPoints(parseInt(ressource_d)) +tabulation +' Energie:'+tabulation+'5.000'
						+saut	
						+saut+ 'Activité'
						+saut+ 'Activité'
						+saut+ 'Activité signifie que le joueur scanné était actif sur la planète au moment du scan ou qu`un autre joueur a eu un contact de flotte avec cette planète à ce moment là.'
						+saut+ 'Le scanner des sondes n`a pas détecté d`anomalies atmosphériques sur cette planète. Une activité sur cette planète dans la dernière heure peut quasiment être exclue.'
						+saut+ 'Flottes';
						var vaisseau_nom = new Array(vari.pt, vari.gt, vari.cle, vari.clo, vari.cro, vari.vb, vari.vc, vari.rec, vari.esp, vari.bb, vari.sat, vari.dest, vari.edlm, vari.tra);
						var q_saut_v =0;
						if(vaisseau22 != '?/?/?/?/?/?/?/?/?/?')
						{
							var vaisseau = vaisseau22.split('/');		
								for(var k=0; k<vaisseau.length ; k++)
								{ 
									if(parseInt(vaisseau[k]) != 0)
									{
										if(q_saut_v <3){export_scan_simul = export_scan_simul + ' | '+ vaisseau_nom[k] +tabulation +' : ' + addPoints(parseInt(vaisseau[k]));q_saut_v++;}
										else{export_scan_simul = export_scan_simul + saut + ' | '+ vaisseau_nom[k] +tabulation +' : ' + addPoints(parseInt(vaisseau[k]));q_saut_v= 0;}
									}
								}
						}

						export_scan_simul = export_scan_simul +saut+ 'Défense';

						var defense_nom = new Array(vari.lm, vari.lle, vari.llo, vari.gauss, vari.ion, vari.pla, vari.pb, vari.gb, vari.mic, vari.mip);
						var q_saut =0;
						if(defense2 != '?/?/?/?/?/?/?/?/?/?')
						{
							var defense = defense2.split('/');		
								for(var k=0; k<defense.length ; k++)
								{ 
									if(parseInt(defense[k]) != 0)
									{
										if(q_saut <3){export_scan_simul = export_scan_simul + ' | '+ defense_nom[k] +tabulation +' : ' + addPoints(parseInt(defense[k]));q_saut++;}
										else{export_scan_simul = export_scan_simul + saut + ' | '+ defense_nom[k] +tabulation +' : ' + addPoints(parseInt(defense[k]));q_saut= 0;}
									}
								}
						}		

						export_scan_simul = export_scan_simul +saut+'Bâtiment'
						+saut+ vari.mine_m +tabulation + mine_m +tabulation  +vari.mine_c +tabulation + mine_c
						+saut+ vari.mine_d +tabulation + mine_d +tabulation  
						+saut+'Recherche'
						+saut+ vari.tech_arm +tabulation	+ tech_arme_d + tabulation +vari.tech_bouc +tabulation + tech_bouclier_a + tabulation 
						+saut+ vari.tech_pro +tabulation + tech_protect_d
						+saut+ 'Probabilité de contre-espionnage : 0 %';
					}
					
				//tableau	
					ligne_tableau = ligne_tableau +'<td><input type="checkbox" name="delcase" value="'+ i +'" id="check_'+ i +'"/></td>'
									+ '<td class="marqueur"></td>';
									
					if(nom_j_q_q == 1){ligne_tableau = ligne_tableau +'<td>' + nom_joueur +  '</td>';}
					if(coor_q_q == 1 && nom_p_q_q != 2){ligne_tableau = ligne_tableau +'<td class="coordonee">' + coordonee_fin +  '</td>';}
					else if(coor_q_q == 1 && nom_p_q_q == 2){ligne_tableau = ligne_tableau +'<td class="coordonee">' + coordonee_fin2 +  ' </td>';}
					
					ligne_tableau = ligne_tableau +'<td>' + activite_fin +  '</td>';
					if(nom_p_q_q == 1){ligne_tableau = ligne_tableau +'<td>' + nom_planete +  '</td>';}
					if(date_affiche == 1){ligne_tableau = ligne_tableau + '<td>' + date2 + '</td>';}
					if(tps_vol_q == 1){ligne_tableau = ligne_tableau + '<td>' + accronyme_temp_vol + '</td>';}
					if(prod_h_q == 1){ligne_tableau = ligne_tableau + '<td>' + acro_prod_h + '</td>';}
					if(prod_gg != 0){ligne_tableau = ligne_tableau + '<td>' + acro_ress_xh + '</td>';}
					if(q_vid_colo == 1){ligne_tableau = ligne_tableau + '<td>' + calcul_dernier_vidage(ressource_m, ressource_c, ressource_d, prod_m_h, prod_c_h, prod_d_h, date_scan, mine_m) + '</td>';}
									

					var url_href = 'index.php?page=showmessage&session=' + session + '&ajax=1&msg_id=' + scan_info_i[11] + '&cat=7&height=500&width=770&TB_iframe=1';
					var url_message = '<a class="ajax_thickbox" href="'+ url_href +'" id="'+ scan_info_i[11] +'"><img src="http://snaquekiller.free.fr/ogame/messages.jpg" height="16" width="16"/></a>';
					
					if(question_rassemble_col == 0)
					{
						ligne_tableau = ligne_tableau +'<td>' + ressource +  '</td>';
						ligne_tableau = ligne_tableau + '<td>' + cdr_aco +'</td>';
					}else{
						ligne_tableau = ligne_tableau +'<td>' + col_cdr +  '</td>';
					}
					ligne_tableau = ligne_tableau + '<td>' + acronyme_vaisseau2 +  '</td>' + '<td>' + acronyme_def2 +  '</td>'
									+ '<td> <a href="'+ espionnage +'" title="'+ text.espionner +'"> <img src="img/icons/auge.gif" height="16" width="16"/></a></td>'
									+ '<td> <a href="'+ url_2 +'&amp;raidefacil=scriptOptions&amp;del_scan='+i+'" title="'+ text.eff_rapp +'" ><img src="img/icons/trash.gif" height="16" width="16"/></a></td>'
									+ '<td> <a href="'+ url_attaquer +'" title="'+ text.att +'" ><img src="img/icons/fastforward.gif" height="16" width="16"/></a></td>';
							if(q_mess == 1 ){ligne_tableau = ligne_tableau +'<td>'+ url_message +'</td>';}
								
							if(simulateur != 3){ligne_tableau = ligne_tableau + '<td> <a href="'+ url_simul +'" title="'+ text.simul +'" target="_blank"><img src="http://snaquekiller.free.fr/ogame/simuler.jpg" height="16" width="16"/></a></td></tr>';}
							else{ligne_tableau = ligne_tableau + '<td> <a href="#" title="'+ text.simul +'" id="simul_'+ i +'" ><img src="http://snaquekiller.free.fr/ogame/simuler.jpg" height="16" width="16"/></a></td></tr>';}
				
					if(simulateur == 3)
					{
						ligne_tableau = ligne_tableau + '<tr style="display:none;" id="textarea_'+ i +'">'+ '<TD COLSPAN=20> <textarea style="width:100%;background-color:transparent;color:#999999;text-align:center;">'+ export_scan_simul +'</textarea></td></tr>';
					}
					
					/**************** HTML EXPORT **************/
						html_export = html_export +'\n<tr class="'+ coordonee +'">';
						if(nom_j_q_q == 1){html_export = html_export +'<td>' + nom_joueur +  '</td>';}
						if(coor_q_q == 1){html_export = html_export +'<td class="coordonee">' + coordonee_fin +  '</td>';}
						html_export = html_export +'<td>' + activite_fin +  '</td>';
						if(nom_p_q_q == 1){html_export = html_export +'<td>' + nom_planete +  '</td>';}
						html_export = html_export +'<td>' + ressource +  '</td>';
						if(date_affiche == 1){html_export = html_export + '<td>' + date2 + '</td>';}
						if(tps_vol_q == 1){html_export = html_export + '<td>' + accronyme_temp_vol + '</td>';}
						if(prod_h_q == 1){html_export = html_export + '<td>' + acro_prod_h + '</td>';}
						
						html_export = html_export + '<td>' + cdr_aco +  '</td><td>' + acronyme_vaisseau2 +  '</td>' + '<td>' + acronyme_def2 +  '</td></tr>';
				
					/**************** BBCODE EXPORT **************/
						// bbcode_export = bbcode_export + coordonee +'==>';
						bbcode_export = bbcode_export + bbcode_baliseo[8] + couleur2[1] + bbcode_balisem[8] + nom_joueur +  ''+ bbcode_balisef[8];
						if(coor_q_q == 1){bbcode_export = bbcode_export +  bbcode_baliseo[8] + couleur2[2] + bbcode_balisem[8] +' ==> ' + coordonee +''+ bbcode_balisef[8];}
						// bbcode_export = bbcode_export +'==>' + activite_fin +  '';
						if(nom_p_q_q == 1){bbcode_export = bbcode_export +  bbcode_baliseo[8] + couleur2[3] + bbcode_balisem[8] +' ==> ' + nom_planete2 +  ''+ bbcode_balisef[8];}
						bbcode_export = bbcode_export +  bbcode_baliseo[8] + couleur2[4] + bbcode_balisem[8] +' ==> ' + addPoints(parseInt(ressource_m)) +'metal ,'+ addPoints(parseInt(ressource_c)) +'cristal ,'+ addPoints(parseInt(ressource_d)) +'deut ('+ nb_pt +'/'+nb_gt +')' +  ''+ bbcode_balisef[8];
						bbcode_export = bbcode_export +  bbcode_baliseo[8] + couleur2[5] + bbcode_balisem[8] + ' ==> ' + addPoints(parseInt(cdr_possible_m)) +' metal ,'+ addPoints(parseInt(cdr_possible_c)) +' cristal ,'+ addPoints(Math.round(parseInt(cdr_possible)/25000))+' rc '+ bbcode_balisef[8];
						if(acronyme_vaisseau != ' '){ bbcode_export = bbcode_export +  bbcode_baliseo[8] + couleur2[6] + bbcode_balisem[8] + ' ==> ' + acronyme_vaisseau +  ''+ bbcode_balisef[8];}
						if(acronyme_vaisseau != ' '){ bbcode_export = bbcode_export +  bbcode_baliseo[8] + couleur2[7] + bbcode_balisem[8] + ' ==> ' + acronyme_def +  '\n'+ bbcode_balisef[8];}
						else{bbcode_export = bbcode_export + '\n\n';}
				}		
			}else if(scan_i[gh] && scan_i[gh].indexOf(';;;;;;;;;;;;;;;;;x') == -1){scan_i[gh] = '';}
		}
		
		//recupere les flottes en vol.
		if ((url.indexOf('page=movement',0)) >=0)
		{
			recup_flotte_mv();
		}	
		
/* ******************************Recherche des MaJ ********************************///by vulca 
		if( FireFox )
		{				
			GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://snaquekiller.free.fr/ogame/version_raide.txt',				
					onload: function(response) 
					{
						var Derniere_Version = response.responseText;
						Derniere_Version = Derniere_Version.replace( /[^0-9-]/g, "");
						version2 = Version.replace( /[^0-9-]/g, "");
						
						if(version2 < Derniere_Version){GM_setValue("aJours_d",false);}
						else{GM_setValue("aJours_d",true);}
					}
				});	
		}
		else if(!Opera)
		{
			var xdr = new XMLHttpRequest(); 			
			xdr.onload = function() 
			{			
				var Derniere_Version = xdr.responseText
				Derniere_Version = Derniere_Version.replace( /[^0-9-]/g, "");
				version2 = Version.replace( /[^0-9-]/g, "");
						
				if(version2 < Derniere_Version){GM_setValue("aJours_d",false);}
				else{GM_setValue("aJours_d",true);}
				
			}							
			xdr.open("GET", "http://snaquekiller.free.fr/ogame/version_raide.txt");
			xdr.send();
		}
		var AJours = GM_getValue("aJours_d",true);
	/* ******************************Variable des MaJ ********************************/
		if (!AJours)
		{
			var affiche_mise_ajours = '<a id="MaJ" href="http://userscripts.org/scripts/source/72438.user.js"><img src="http://snaquekiller.free.fr/ogame/attention.gif" alt="'+ text.mise_jours +'" title="'+ text.mise_jours +'" /></a>';
		}
		else {var affiche_mise_ajours = ' ';}			


//########### anti reload  automatique de la page. ##########

/* (function() {
	var unsafe = window;
	try {unsafe = unsafeWindow} catch (e) {}

	if ( !unsafe.$ ) return;
	
	unsafe.reload_page = function() {};
})() */

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.setAttribute("language","javascript");
script.text = 'function reload_page() {' +
'}';
document.body.appendChild(script);

//########### Option du scripts ##########
		var option_html = '<div id="option_script" style="width:100%;background-color:transparent;color:#999999;text-align:center;" >'//display:none;
				+ '<div class="sectiontitre" id="moncomptetitre" > '+ text.moncompte +': </div>'
				+ '<div id="mon_compte" style="width:100%;background-color:transparent;color:#999999;text-align:left;" >'//display:none;
					+'<table style="padding-top:0px;border-bottom:0px;">'
					+ '<tr><td colspan="4" style="text-indent:40px;font-size:15px;font-weight:bolder;text-decoration:underline;"><strong>'+ text.vos_techno +' </strong><td></tr>'
					+ '<tr><td><BR /><label for="valeur_a"> '+ vari.tech_arm +' : </label></td><td><input type="text" id="valeur_a" class="valeur_arme" value="'+ tech_arme_a +'" style="width:20px;" /></td></tr>'
					+ '<tr><td><BR /><label for="valeur_b"> '+ vari.tech_bouc +' : </label></td><td><input type="text" id="valeur_b" class="valeur_boulier"  value="'+ tech_bouclier_a +'" style="width:20px;" /></td></tr>'
					+ '<tr><td><BR /><label for="valeur_p"> '+ vari.tech_pro +' : </label></td><td><input type="text" id="valeur_p" class="valeur_protection"  value="'+ tech_protect_a +'" style="width:20px;" /></td></tr>'
										
					+ '<tr><td><BR /><label for="valeur_c"> '+ vari.tech_com +' : </label></td><td><input type="text" id="valeur_c" class="valeur_combustion"  value="'+ tech_combus_a +'" style="width:20px;" /></td></tr>'
					+ '<tr><td><BR /><label for="valeur_i"> '+ vari.tech_imp +' : </label></td><td><input type="text" id="valeur_i" class="valeur_impulsion"  value="'+ tech_impul_a +'" style="width:20px;" /></td></tr>'
					+ '<tr><td><BR /><label for="valeur_h"> '+ vari.tech_hyp +' : </label></td><td><input type="text" id="valeur_h" class="valeur_hyper"  value="'+ tech_hyper_a +'" style="width:20px;" /></td></tr>'
					
					+ '<BR /><BR />'
					+ '<tr><td colspan="4" style="text-indent:40px;font-size:15px;font-weight:bolder;text-decoration:underline;"><strong> Autre : </strong><td></tr>'
					+ '<BR /><tr><td><label for="valeur_co"> '+ text.q_coord +' : </label></td><td><input type="text" id="valeur_co" class="valeur_coordonee" value="'+ pos_depart +'" style="width:55px;" /></td></tr>'
					+ '<BR /><tr><td><label for="vaisseau_vite"> '+ text.q_vaisseau_min +' </label></td><td><select name="vaisseau_vite" id="vaisseau_vite" style="width:160px;">'
						+ '<option value="0" id="selec_q_0" >'+ vari.pt +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 0) +')'+ '</option>'
						+ '<option value="1" id="selec_q_1">'+ vari.gt +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 1) +')'+ '</option>'
						+ '<option value="2" id="selec_q_2">'+ vari.cle +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 2) +')'+ '</option>'
						+ '<option value="3" id="selec_q_3">'+ vari.clo +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 3) +')'+ '</option>'
						+ '<option value="4" id="selec_q_4">'+ vari.cro +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 4) +')'+ '</option>'
						+ '<option value="5" id="selec_q_5">'+ vari.vb +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 5) +')'+ '</option>'
						+ '<option value="6" id="selec_q_6">'+ vari.vc +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 6) +')'+ '</option>'
						+ '<option value="7" id="selec_q_7">'+ vari.rec +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 7) +')'+ '</option>'
						+ '<option value="8" id="selec_q_8">'+ vari.esp +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 8) +')'+ '</option>'
						+ '<option value="9" id="selec_q_9">'+ vari.bb +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 9) +')'+ '</option>'
						+ '<option value="10" id="selec_q_10">'+ vari.dest +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 10) +')'+ '</option>'
						+ '<option value="11" id="selec_q_11">'+ vari.edlm +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 11) +')'+ '</option>'
						+ '<option value="12" id="selec_q_12">'+ vari.tra +'('+ vitesse_vaisseau(tech_impul_a ,tech_hyper_a ,tech_combus_a, 12) +')'+ '</option>'
					+ ' </select></td></tr>'
					+ '<BR /><tr><td><label for="cdr_pourcent"> '+ text.pourcent +' : </label></td><td><input type="text" id="cdr_pourcent"  value="'+ (pourcent_cdr*100) +'" style="width:20px;" /></td></tr>'			
					+ '<BR /><tr><td><label for="cdr_pourcent_def"> '+ text.pourcent_def +' : </label></td><td><input type="text" id="cdr_pourcent_def"  value="'+ (pourcent_cdr_def*100) +'" style="width:20px;" /></td></tr>'			
				//+ '<BR /><label> '+ text.vitesse_uni +' : </label><input type="text" id="vitesse_uni"  value="'+ vitesse_uni +'" style="width:20px;" />
					+'</table>'
				+'</div>'			

				
				+ '<BR /><div class="sectiontitre" id="choixtitre">'+text.choix_certaine_vari +' : </div>'
				+ '<div id="choix_var" style="width:100%;background-color:transparent;color:#999999;text-align:left;display:none;" >'
					+ '<label for="val_res_min" > '+ text.q_apartir +' : </label><input type="text" id="val_res_min" class="valeur_ressource_mini"  value="'+ nb_scan_accpte +'" style="width:50px;" /> '+text.apartir + '(Y)'
					+ '<BR /><label for="valeur_cdr_mini"> '+ text.q_cdrmin +' : </label><input type="text" id="valeur_cdr_mini"  value="'+ valeur_cdr_mini +'" style="width:50px;" /> (X)'
					+ '<BR /><label for="valeur_tot_mini"> '+ text.q_totmin +' : </label><input type="text" id="valeur_tot_mini"  value="'+ valeur_tot_mini +'" style="width:50px;" />(Z)'
					+ '<BR /><label> '+ text.q_prend_type +' : </label> <label for="prend_type0"> '+ text.rep_0_prend +'</label> <input type="radio" name="prend_type" value="0" id="prend_type0" /> <label for="prend_type1">'+ text.rep_1_prend +'</label> <input type="radio" name="prend_type" value="1" id="prend_type1" /><label for="prend_type2">'+ text.rep_2_prend +'</label> <input type="radio" name="prend_type" value="2" id="prend_type2" />'

				//0 date ; 1 coordonee ; 2 joueur ; 3 nom ^planette ; 4 ressource  metal; 5 cristal ; 6 deut ; 7 activite  ; 8 cdr possible ; 9 vaisseau; 10 defense ; 11 idrc ; 12 ressource total,13 reherche , 14 type de planette (lune ou planette)						
					+ '<BR /><BR /><label for="classement"> '+ text.q_class +': </label><select name="classement" id="classement">'
						+ '<option value="0" id="selec_0" >'+ text.c_date +'</option>'
						+ '<option value="1" id="selec_1">'+ text.c_coo +'</option>'
						+ '<option value="2" id="selec_2">'+ text.c_nj +'</option>'
						+ '<option value="3" id="selec_3">'+ text.c_np +'</option>'
						+ '<option value="4" id="selec_4">'+ text.c_met +'</option>'
						+ '<option value="5" id="selec_5">'+ text.c_cri +'</option>'
						+ '<option value="6" id="selec_6">'+ text.c_deu +'</option>'
						+ '<option value="7" id="selec_7">'+ text.c_acti +'</option>'
						+ '<option value="8" id="selec_8">'+ text.c_cdr +'</option>'
						+ '<option value="17a" id="selec_9">'+ text.c_nbv +'</option>'
						+ '<option value="18b" id="selec_10">'+ text.c_nbd +'</option>'
						+ '<option value="12" id="selec_12">'+ text.c_ress +'</option>'
						+ '<option value="14" id="selec_14">'+ text.c_type +'</option>'
						+ '<option value="20c" id="selec_15">'+ text.c_cdrress +'</option>'
						+ '<option value="20d" id="selec_16">'+ text.ressourcexh +'</option>'
						+ '<option value="20e" id="selec_17">'+ text.prod_classement +'</option>'
					+ ' </select>'
					+ '<BR /><label> '+ text.q_reverse +'</label> <label for="q_reverse_c1">'+ text.descroissant +'</label> <input type="radio" name="q_reverse" value="1" id="q_reverse_c1" /> <label for="q_reverse_c0">'+ text.croissant +'</label> <input type="radio" name="q_reverse" value="0" id="q_reverse_c0" />'

					+ '<BR /><BR /><label> '+ text.q_sae_auto +'</label> <label for="option_scan_save_oo">'+ text.oui +'</label> <input type="radio" name="option_scan_save_o" value="1" id="option_scan_save_oo" /> <label for="option_scan_save_on">'+ text.non +'</label> <input type="radio" name="option_scan_save_o" value="0" id="option_scan_save_on" />'
					+ '<BR /><BR /><label> '+ text.remp_scn +' </label>  <label for="scan_remplace_o">'+ text.oui +'</label> <input type="radio" name="scan_remplace" value="1" id="scan_remplace_o" /> <label for="scan_remplace_n">'+ text.non +'</label> <input type="radio" name="scan_remplace" value="0" id="scan_remplace_n" />'
					+ '<BR /><BR /><label for="jourrr"> '+ text.q_garde +' : </label> <input type="text" id="jourrr" class="jours"  value="'+ jours_opt +'" style="width:20px;" /> '+ text.jours +' <input type="text" class="heures"  value="'+ heures_opt +'" style="width:20px;" /> '+ text.heures +' <input type="text" class="minutes"  value="'+ minutes_opt +'" style="width:20px;" />'+ text.min +' '
					+ '<BR /><label> '+ text.import_q +' </label>  <label for="import_q1">'+ text.import_q1 +'</label><input type="radio" name="import_q" value="1" id="import_q1" /> <label for="import_q0">'+ text.import_q0 +'</label> <input type="radio" name="import_q" value="0" id="import_q0" />'
				+'</div>'
			
			
				+ '<BR /><div class="sectiontitre" id="colortitre"> '+ text.couleur_ligne +' : </div>'
				+ '<div id="color_ligne" style="width:100%;background-color:transparent;color:#999999;text-align:left;display:none;" >'
					+ ''+ text.q_color +' : '
					+ '<BR /> <label> '+ text.attt +' : </label><input type="text" class="att" value="'+ col_att +'" style="width:60px;background-color:'+ col_att +';" />'
					+ '<BR /> <label> '+ text.ag +' : </label><input type="text" class="att_group" value="'+ col_att_g +'" style="width:60px;background-color:'+ col_att_g +';" />'
					+ '<BR /> <label> '+ text.det +' : </label><input type="text" class="det" value="'+ col_dest +'" style="width:60px;background-color:'+ col_dest +';" />'
					
					+ '<BR /> <label> '+ text.att_r +' : </label><input type="text" class="att_r" value="'+ col_att_r +'" style="width:60px;background-color:'+ col_att_r +';" />'
					+ '<BR /> <label> '+ text.ag_r +' : </label><input type="text" class="att_group_r" value="'+ col_att_g_r +'" style="width:60px;background-color:'+ col_att_g_r +';" />'
					+ '<BR /> <label> '+ text.det_r +' : </label><input type="text" class="det_r" value="'+ col_dest_r +'" style="width:60px;background-color:'+ col_dest_r +';" />'
				+ '</div>'
				
				
				+ '<BR /><div class="sectiontitre" id="titreaffichage"> '+ text.option_affichage +': </div>'
				+ '<div id="choix_affichage" style="width:100%;background-color:transparent;color:#999999;text-align:left;display:none;" >'
					+ '<label> '+ text.lienraide +'</label> <label for="lien_raide_h"> '+ text.En_haut +'</label> <input type="radio" name="lien_raide" value="1" id="lien_raide_h" /> <label for="lien_raide_g">'+ text.gauche +'</label> <input type="radio" name="lien_raide" value="0" id="lien_raide_g" />'
					+ '<BR /><BR /><label> '+ text.lienespi +' </label> <label for="espionn_g">'+ text.page_g +'</label> <input type="radio" name="espionn" value="0" id="espionn_g" /> <label for="espionn_f">'+ text.page_f +'</label> <input type="radio" name="espionn" value="1" id="espionn_f" />'
					+ '<BR /><BR /><label> '+ text.cdr_q +' </label> <label for="recycleur_type">'+ text.recyclc +'</label> <input type="radio" name="recycleur_type" value="1" id="recycleur_type_1" /> <label for="recycleur_type_0">'+ text.ressousrce +'</label> <input type="radio" name="recycleur_type" value="0" id="recycleur_type_0" />'
					+ '<BR /><label> '+ text.tps_vol +' </label> <label for="tps_vol1">'+ text.oui +'</label> <input type="radio" name="tps_vol" value="1" id="tps_vol1" />  <label for="tps_vol0">'+ text.non +'</label> <input type="radio" name="tps_vol" value="0" id="tps_vol0" />'
					+ '<BR /><BR /><label> '+ text.nom_j_q +' </label> <label for="nom_j_q1">'+ text.oui +'</label> <input type="radio" name="nom_j_q" value="1" id="nom_j_q1" />  <label for="nom_j_q0">'+ text.non +'</label> <input type="radio" name="nom_j_q" value="0" id="nom_j_q0" />'
					+ '<BR /><label> '+ text.nom_p_q +' </label> <label for="nom_p_q1">'+ text.oui +'</label> <input type="radio" name="nom_p_q" value="1" id="nom_p_q1" />  <label for="nom_p_q0">'+ text.non +'</label> <input type="radio" name="nom_p_q" value="0" id="nom_p_q0" />'+ text.autre_planette +' <input type="radio" name="nom_p_q" value="2" id="nom_p_q2" />'
					+ '<BR /><label> '+ text.coor_q +' </label> <label for="coor_q1">'+ text.oui +'</label> <input type="radio" name="coor_q" value="1" id="coor_q1" />  <label for="coor_q0">'+ text.non +'</label> <input type="radio" name="coor_q" value="0" id="coor_q0" />'
					+ '<BR /><label> '+ text.q_date +' </label> <label for="date_qo">'+ text.oui +'</label><input type="radio" name="date_q" value="1" id="date_qo" />  <label for="date_qn">'+ text.non +'</label> <input type="radio" name="date_q" value="0" id="date_qn" />'
					+ '<BR /><label> '+ text.q_date_type +' </label> <label for="q_date_type1">'+ text.q_date_type1 +'</label><input type="radio" name="q_date_type" value="1" id="q_date_type1" />  <label for="q_date_type0">'+ text.q_date_type0 +'</label> <input type="radio" name="q_date_type" value="0" id="q_date_type0" />'

					+ '<BR /><label> '+ text.q_prod +' </label> <label for="prod_h_q1">'+ text.oui +'</label><input type="radio" name="prod_h_q" value="1" id="prod_h_q1" />  <label for="prod_h_q0">'+ text.non +'</label> <input type="radio" name="prod_h_q" value="0" id="prod_h_q0" />'
					+ '<BR /><BR /><label> '+ text.q_ress_h +' : </label><input type="text" class="ress_nb_j"  value="'+ prod_j_g +'" style="width:20px;" /> '+ text.jours +' <input type="text" class="ress_nb_h"  value="'+ prod_h_g +'" style="width:20px;" /> '+ text.heures +' <input type="text" class="ress_nb_min"  value="'+ prod_min_g +'" style="width:20px;" />'+ text.min +' '				
					
					+ '<BR /><label> '+ text.mess_q +' </label> <label for="mess_q1">'+ text.oui +'</label><input type="radio" name="q_mess" value="1" id="mess_q1" /> <label for="mess_q0">'+ text.non +'</label> <input type="radio" name="q_mess" value="0" id="mess_q0" />'
					+ '<BR /><BR /><label> '+ text.q_simul +' : </label> <label for="sim_q_dra">'+ text.drago +'</label><input type="radio" name="q_sim" value="0" id="sim_q_dra" /> <label for="sim_q_speed">'+ text.speed +'</label> <input type="radio" name="q_sim" value="1" id="sim_q_speed" />'+ text.ogwinner +' <input type="radio" name="q_sim" value="2" id="sim_q_ogwin" />'	+ text.simu_exte +' <input type="radio" name="q_sim" value="3" id="sim_q_autre" />'				
					+ '<BR /><BR /><label> '+ text.page +' : </label><input type="text" id="nb_scan_page" value="'+ nb_scan_page +'" style="width:40px;" /> '				
					+ '<BR /><label> '+ text.question_rassemble_cdr_ress +' </label> <label for="rassemble_q1">'+ text.oui +'</label><input type="radio" name="rassemble_q" value="1" id="rassemble_q1" /> <label for="rassemble_q0">'+ text.non +'</label> <input type="radio" name="rassemble_q" value="0" id="rassemble_q0" />'
					+ '<BR /><label> '+ text.q_techn_sizero +' </label> <label for="q_techzero1">'+ text.oui +'</label><input type="radio" name="q_techzero" value="1" id="q_techzero1" /> <label for="q_techzero0">'+ text.non +'</label> <input type="radio" name="q_techzero" value="0" id="q_techzero0" />'
					+ '<BR /><label> '+ text.question_afficher_icone_mess +' </label> <label for="q_icone_mess1">'+ text.oui +'</label><input type="radio" name="q_icone_mess" value="1" id="q_icone_mess1" /> <label for="q_icone_mess0">'+ text.non +'</label> <input type="radio" name="q_icone_mess" value="0" id="q_icone_mess0" />'
					+ '<BR /><label> '+ text.q_afficher_dernier_vid_colo +' </label> <label for="q_vid_colo1">'+ text.oui +'</label><input type="radio" name="q_vid_colo" value="1" id="q_vid_colo1" /> <label for="q_vid_colo0">'+ text.non +'</label> <input type="radio" name="q_vid_colo" value="0" id="q_vid_colo0" />'
				+ '</div>'
				
				+ '<BR /><div class="sectiontitre" id="titrelangue"> '+ text.option_langue +': </div>'
				+ '<div id="choix_langue" style="width:100%;background-color:transparent;color:#999999;text-align:center;display:none;" >'
					+ '<BR /><BR /><label> '+ text.q_langue +': </label><select name="langue" id="langue">'
						+ '<option value="fr" id="langue0" >'+ text.francais +'</option>'
						+ '<option value="en" id="langue1">'+ text.anglais +'</option>'
						// + '<option value="2" id="langue2">'+ text.autre +'</option>'
					+ ' </select>'				
				+ '</div>'
				
				+ '<BR /><BR /><input type="submit" value="'+ text.save_optis +'" id="sauvegarder_option" href=# /></div>';		

//############### Option BBCODE ##########################
var option_bbcode = '<div id="option_bbcode" style="width:100%;background-color:transparent;color:#999999;text-align:center;display:none;" >'
				+'<div class="sectiontitre" id="choixtitre"> BBCode : </div>'
				+ '<BR />Couleurs : '
				
					+ '<BR /> <label> '+ text.color +'1 : </label><input type="text" id="col_1" value="'+ couleur2[1] +'" style="width:60px;background-color:'+ couleur2[1] +';" />'
					+ '<BR /> <label> '+ text.color +'2 : </label><input type="text" id="col_2" value="'+ couleur2[2] +'" style="width:60px;background-color:'+ couleur2[2] +';" />'
					+ '<BR /> <label> '+ text.color +'3 : </label><input type="text" id="col_3" value="'+ couleur2[3] +'" style="width:60px;background-color:'+ couleur2[3] +';" />'
					+ '<BR /> <label> '+ text.color +'4 : </label><input type="text" id="col_4" value="'+ couleur2[4] +'" style="width:60px;background-color:'+ couleur2[4] +';" />'
					+ '<BR /> <label> '+ text.color +'5 : </label><input type="text" id="col_5" value="'+ couleur2[5] +'" style="width:60px;background-color:'+ couleur2[5] +';" />'
					+ '<BR /> <label> '+ text.color +'6 : </label><input type="text" id="col_6" value="'+ couleur2[6] +'" style="width:60px;background-color:'+ couleur2[6] +';" />'
					+ '<BR /> <label> '+ text.color +'7 : </label><input type="text" id="col_7" value="'+ couleur2[7] +'" style="width:60px;background-color:'+ couleur2[7] +';" />'

				+ '<BR /><BR /><label> '+ text.text_cite +' </label> '+ text.oui +' <input type="radio" name="cite" value="1" id="cite1" /> '+ text.non +' <input type="radio" name="cite" value="0" id="cite0" />'
				+ '<BR /><label> '+ text.text_centre +' </label> '+ text.oui +' <input type="radio" name="centre" value="1" id="centre1" /> '+ text.non +' <input type="radio" name="centre" value="0" id="centre0" />'
				+ '<BR /><label> '+ text.balise_centre +' </label> '+ text.balise1_center +' <input type="radio" name="centre_type" value="1" id="centre_type1" /> '+ text.balise2_center +' <input type="radio" name="centre_type" value="0" id="centre_type0" />'
				+ '<BR /><label> '+ text.balise_url +' </label> '+ text.balise1_url +' <input type="radio" name="url_type" value="1" id="url_type1" /> '+ text.balise2_url +' <input type="radio" name="url_type" value="0" id="url_type0" />'
		

+ '<BR /><BR /><input type="submit" value="'+ text.save_optis +'" id="sauvegarder_bbcode" href=# /></div><BR />';
//########### TABLEAU A AFFICHER ##########
		
		var style_css = '<style type="text/css">' +
						' caption{font-size: 17px;font-weight: bold;}' + ' acronym{cursor: pointer;}' +
						' a{cursor: pointer;}' + ' #haut_table2{background-color: black;}' +
						' #corps_tableau2{background-color: black;}' + ' #bas_tableau2{background-color: black;}' + 
						' #collapse{border-collapse:separate ;}' + 
						' .sectiontitre{text-align:center;cursor:pointer;border:1px solid #0A2C3F;font-size:15px;font-weight: bold;color:#0A6FA7;background-color: black;}'+
						' </style>';
		
		var texte_a_afficher =  style_css + option_html + option_bbcode;
		
		/************** TABLEAU INGAME ***************/

			if(nb_scan_page != 0)
			{
				var page_bas = 'Page : ';
				if(num_page == undefined){num_page =1;}
				for(var i=1; i<(nb_page_poss+1) ; i++)
				{
					if(i != num_page){
					page_bas = page_bas + ' <a href="'+ url_2 +'&amp;raidefacil=scriptOptions&amp;page_r='+ i +'" >'+ i +'</a>';}
					else{page_bas = page_bas + ' '+ i;}
					
					if(i != nb_page_poss){page_bas = page_bas +',';}
				}
			}else{var page_bas = '';}
			

		var text3_afficher = '<table style="text-align:center;border: 1px solid black;font-size:10px;"><caption>Raide Facile. '+ affiche_mise_ajours +'<BR /><a style="float:right;font-size:10px;cursor:pointer;" id=htmlclique >[HTML]</a>'
						+'<a style="float:right;font-size:10px;cursor:pointer;" id=bbcodeclique >[BBcode]</a>'
						+'<a style="float:right;font-size:10px;cursor:pointer;" id=bbcode_option_clique >[BBcode option]</a>'
						+'<a style="float:right;font-size:10px;cursor:pointer;" id=imp_exp_clique >[Import/Export]</a>'
						+'<a style="float:right;font-size:10px;cursor:pointer;" id=optionclique >[Option]</a> <BR /></caption>'
						+ '\n<thead id=haut_table2><tr><th></th><th></th>';
						
			if(nom_j_q_q == 1){text3_afficher = text3_afficher +'<th>'+ text.th_nj +'</th>';}
			if(coor_q_q == 1){text3_afficher = text3_afficher +'\n<th>'+ text.th_coo +'</th>';}
			text3_afficher = text3_afficher +'\n<th></th>';
			if(nom_p_q_q == 1){text3_afficher = text3_afficher +'\n<th>'+ text.th_np +'</th>';}
									
			if(date_affiche == 1){ text3_afficher = text3_afficher + '\n<th>'+ text.dated +'</th>\n';}
			if(tps_vol_q == 1){ text3_afficher = text3_afficher + '\n<th>'+ text.tmp_vol_th +'</th>\n';}
			if(prod_h_q == 1){ text3_afficher = text3_afficher + '\n<th>'+ text.prod_h_th +'</th>\n';}
			if(prod_gg != 0){ text3_afficher = text3_afficher + '\n<th>'+ text.ressource_xh_th +'</th>\n';}
			if(q_vid_colo != 0){ text3_afficher = text3_afficher + '\n<th>'+ text.th_h_vidage +'</th>\n';}
			
			if(question_rassemble_col == 0)
			{
								text3_afficher = text3_afficher +'\n<th>'+ text.th_ress +'</th>';
				if(cdr_quest == 0){text3_afficher = text3_afficher +'<th>' + text.cdr_pos;}
				else if(cdr_quest == 1){text3_afficher = text3_afficher +'<th>' + text.nb_recycl;}
			}else{
					text3_afficher = text3_afficher +'\n<th>'+ text.th_ress_cdr_col +'</th>';
			}
			// var url_2 = url.split('&raidefacil=scriptOptions')[0];			
		
			text3_afficher = text3_afficher +'</th>\n<th>'+ text.th_nv +'</th>\n<th>'+ text.th_nd +'</th>\n</tr>\n</thead>\n'
						+ '\n<tbody id=corps_tableau2>'	+ ligne_tableau	+ '\n</tbody>'
						+ '\n</table>\n<a id="zero">'+ text.remis_z +'</a> <div style="float:right;">'+ page_bas +'</div>'
						+ '<center><a href="'+ url_2 +'&amp;raidefacil=scriptOptions" id="supr_scan"><input type="submit" value="'+ text.supr_scan_coche +'" href="#" /> </a></center>'
						+ '<BR /><center><a href="'+ url_2 +'&amp;raidefacil=scriptOptions" id="supr_scan_nn_selec"><input type="submit" value="'+ text.supr_scan_coche_nnslec +'" href="#" /> </a></center>';
		
		
		/**************** HTML EXPORT **************/
			
		var tab_html = '<table style="text-align:center;border: 1px solid black;font-size:10px;"><caption>Raide Facile. </caption>'
						+ '<thead id=haut_table2><tr>';
			if(nom_j_q_q == 1){tab_html = tab_html +'<th>'+ text.th_nj +'</th>';}
			if(coor_q_q == 1){tab_html = tab_html +'<th>'+ text.th_coo +'</th>';}
			tab_html = tab_html +'<th></th>';
			if(nom_p_q_q == 1){tab_html = tab_html +'<th>'+ text.th_np +'</th>';}
			tab_html = tab_html +'<th>'+ text.th_ress +'</th>';
						
			if(date_affiche == 1){ tab_html = tab_html + '<th>'+ text.dated +'</th>';}
			if(tps_vol_q == 1){ tab_html = tab_html + '<th>'+ text.tmp_vol_th +'</th>';}
			if(prod_h_q == 1){ tab_html = tab_html + '<th>'+ text.prod_h_th +'</th>';}
			
			if(cdr_quest == 0){tab_html = tab_html +'<th>' + text.cdr_pos;}
			else if(cdr_quest == 1){tab_html = tab_html +'<th>' + text.nb_recycl;}
			
			tab_html = tab_html +'</th><th>'+ text.th_nv +'</th><th>'+ text.th_nd +'</th></tr></thead>'
						+ '<tbody id=corps_tableau2>'
						+ html_export
						+ '</tbody>'
						+ '</table>';
			
			var text_area_html = '<BR /><textarea style="width:100%;background-color:black;color:#999999;text-align:center;display:none;" id=text_html>'+
							tab_html +'</textarea>';

		/**************** BBCODE EXPORT **************/
		var	bbcode_haut = ' ';
		if(q_centre == 1){bbcode_haut = bbcode_haut + bbcode_baliseo[10] +bbcode_balisem[10];}
		if(q_cite == 1){bbcode_haut = bbcode_haut + bbcode_baliseo[4] ;}
		bbcode_haut = bbcode_haut + bbcode_baliseo[8] + couleur2[1] + bbcode_balisem[8] + text.th_nj +  '' + bbcode_balisef[8];
			if(coor_q_q == 1){bbcode_haut = bbcode_haut + bbcode_baliseo[8] + couleur2[2] + bbcode_balisem[8] +' ==> ' + text.th_coo + '' + bbcode_balisef[8] ;}
			// bbcode_haut = bbcode_haut +'==>' + activite_fin +  '';
			if(nom_p_q_q == 1){bbcode_haut = bbcode_haut + bbcode_baliseo[8] + couleur2[3] + bbcode_balisem[8] +' ==> ' + text.th_np +  ''+ bbcode_balisef[8] ;}
			bbcode_haut = bbcode_haut + bbcode_baliseo[8] + couleur2[4] + bbcode_balisem[8] +' ==> '+ text.th_ress +' metal , cristal ,deut (pt/gt)' +  ''+ bbcode_balisef[8] ;
			bbcode_haut = bbcode_haut + bbcode_baliseo[8] + couleur2[5] + bbcode_balisem[8] + ' ==> '+ text.cdr_pos+' metal , cristal ,'+ text.nb_rc + bbcode_balisef[8] ;
			bbcode_haut = bbcode_haut + bbcode_baliseo[8] + couleur2[6] + bbcode_balisem[8] + ' ==> pt/gt/cle/clo/cro/vb/vc/rec/esp/bb/sat/dest/edlm/tra'+ bbcode_balisef[8];
			bbcode_haut = bbcode_haut + bbcode_baliseo[8] + couleur2[7] + bbcode_balisem[8] + ' ==> lm/lle/llo/gauss/ion/plas/pb/gb/mic/mip \n\n'+ bbcode_balisef[8];
			
			bbcode_export = bbcode_export +'\n\n\n' +bbcode_baliseo[1] + bbcode_baliseo[5] + 'http://board.ogame.fr/index.php?=Thread&postID=10726546#post10726546'+ bbcode_balisem[5] +'par Raide-Facile'+bbcode_balisef[5]+ bbcode_balisef[1];
			if(q_centre == 1){bbcode_export = bbcode_export + bbcode_balisef[10];}
			if(q_cite == 1){bbcode_export = bbcode_export + bbcode_balisef[4] ;}
			var text_area_bbcode = '<BR /><BR /><textarea style="width:100%;background-color:black;color:#999999;text-align:center;display:none;" id=text_bbcode >'+
							bbcode_haut + bbcode_export +'</textarea>';	

		/**************** IMPORT / EXPORT **************/
			var text_area_export = '<div id="div_import_exp" style="display:none;"><BR /><BR />'+ text.exportt +'<BR /><textarea style="width:100%;background-color:black;color:#999999;text-align:center;" id=area_export ></textarea>';
			var text_area_import = '<BR />'+ text.importt +'<BR /><textarea style="width:100%;background-color:black;color:#999999;text-align:center;" id=area_import ></textarea>';
			var text_buto_expor_s = '<center><a href="#" id="export_script"><input type="submit" value="'+ text.export_scan_se +'" href="#" /> </a></center>';
			var text_buto_expor_ns = '<center><a href="#" id="export_script_ns"><input type="submit" value="'+ text.export_scan_nnse +'" href="#" /> </a></center>';
			var text_buton_import = '<center><a href="#" id="import_scan"><input type="submit" value="'+ text.importer_scan +'" href="#" /> </a></center></div>';
			
		var import_export = text_area_export +	text_area_import + text_buto_expor_s + text_buto_expor_ns + text_buton_import;
	
		/****************************/
	texte_a_afficher = texte_a_afficher +  text3_afficher + text_area_html + text_area_bbcode + import_export;		
			
	document.getElementById('inhalt').innerHTML = texte_a_afficher;

	// option preselectionner
	
	function preselectiionne(variable1, check0 , check1)
	{
		if(variable1 == 0)
			{document.getElementById(check0).checked = "checked";}
		else if(variable1 == 1)
			{document.getElementById(check1).checked = "checked";}
	}	

		//mon compte
		document.getElementById('vaisseau_vite').value = vaisseau_lent;	
		
		//variables
		if(type_prend_scan == 0)
			{document.getElementById("prend_type0").checked = "checked";}
		else if(type_prend_scan == 1)
			{document.getElementById("prend_type1").checked = "checked";}
		else if(type_prend_scan == 2)
			{document.getElementById("prend_type2").checked = "checked";}
		document.getElementById('classement').value = classement;	
		preselectiionne(reverse, "q_reverse_c0" , "q_reverse_c1");
		preselectiionne(scan_preenrgistre, "option_scan_save_on" , "option_scan_save_oo");
		preselectiionne(scan_remplace, "scan_remplace_n" , "scan_remplace_o");
		preselectiionne(import_q_rep, "import_q0" , "import_q1");
		
		// affichages
		preselectiionne(lien_h_g, "lien_raide_g" , "lien_raide_h");		
		preselectiionne(espionnage_lien, "espionn_g" , "espionn_f");
		preselectiionne(cdr_quest, "recycleur_type_0" , "recycleur_type_1");
		preselectiionne(tps_vol_q, "tps_vol0" , "tps_vol1");
		preselectiionne(nom_j_q_q, "nom_j_q0" , "nom_j_q1");
		if(nom_p_q_q == 0)
			{document.getElementById('nom_p_q0').checked = "checked";}
		else if(nom_p_q_q == 1)
			{document.getElementById('nom_p_q1').checked = "checked";}
		else if(nom_p_q_q == 2)
			{document.getElementById('nom_p_q2').checked = "checked";}
		preselectiionne(coor_q_q, "coor_q0" , "coor_q1");
		preselectiionne(date_affiche, "date_qn" , "date_qo");		
		preselectiionne(q_date_type_rep, "q_date_type0" , "q_date_type1");
		preselectiionne(prod_h_q, "prod_h_q0" , "prod_h_q1");
		preselectiionne(q_mess, "mess_q0" , "mess_q1");
		if(simulateur == 0)
			{document.getElementById("sim_q_dra").checked = "checked";}
		else if(simulateur == 1)
			{document.getElementById("sim_q_speed").checked = "checked";}
		else if(simulateur == 2)
			{document.getElementById("sim_q_ogwin").checked = "checked";}
		else if(simulateur == 3)
			{document.getElementById("sim_q_autre").checked = "checked";}			
		preselectiionne(question_rassemble_col, "rassemble_q0" , "rassemble_q1");
		preselectiionne(q_techzero, "q_techzero0" , "q_techzero1");	
		preselectiionne(q_icone_mess, "q_icone_mess0" , "q_icone_mess1");
		preselectiionne(q_vid_colo, "q_vid_colo0" , "q_vid_colo1");
		
		/** langue **/
		document.getElementById('langue').value = langue;
		
		/** bbcode **/
		preselectiionne(q_cite, "cite0" , "cite1");
		preselectiionne(q_centre, "centre0" , "centre1");
		preselectiionne(center_typeq, "centre_type0" , "centre_type1");
		preselectiionne(q_url_type, "url_type0" , "url_type1");
	
	//remise a 0
	document.getElementById("zero").addEventListener("click", function(event){reset(serveur);}, true);

	//remise a 0
	document.getElementById("supr_scan").addEventListener("click", function(event){del_scan_checkbox(serveur, true);}, true);		
	document.getElementById("supr_scan_nn_selec").addEventListener("click", function(event){del_scan_checkbox(serveur, false);}, true);		
	
function ouvert_fermer(idclique, idouvre_f)
{
	document.getElementById(idclique).addEventListener("click", function(event) 
		{
			var cellule = document.getElementById(idouvre_f);
			if (cellule.style.display == 'none') 
				{cellule.style.display = '';}
			else 
				{cellule.style.display = 'none';}
		}, true);
}
	
	//option ouvert/fermer
	ouvert_fermer("optionclique", 'option_script');
		//interieur option
		ouvert_fermer("moncomptetitre", 'mon_compte');
		ouvert_fermer("choixtitre", 'choix_var');
		ouvert_fermer("titreaffichage", 'choix_affichage');
		ouvert_fermer("colortitre", 'color_ligne');
		ouvert_fermer("titrelangue", 'choix_langue');

	//option bbcode ouvert/fermer
	ouvert_fermer("bbcode_option_clique", 'option_bbcode');
	
	//html ouvert/fermer
	ouvert_fermer("htmlclique", 'text_html');

			
	//bbcode ouvert/fermer
	ouvert_fermer("bbcodeclique", 'text_bbcode');

	//import/export ouvert/fermer
	ouvert_fermer("imp_exp_clique", 'div_import_exp');
	
	//ouvrir fermer export scan simulateur
	if(simulateur == 3)
	{
		for(p=0 ; p<i ; p++)
		{
			if(document.getElementById('simul_'+ p))
			{
				ouvert_fermer('simul_'+p , 'textarea_'+p );		
			}
		}
	}
			
	// sauvegarder option si clique			
	document.getElementById("sauvegarder_option").addEventListener("click", function(event){save_option(serveur);}, true);
	document.getElementById("sauvegarder_bbcode").addEventListener("click", function(event){save_optionbbcode(serveur);}, true);
	
	document.getElementById("export_script").addEventListener("click", function(event){export_scan(serveur , true);}, true);
	document.getElementById("export_script_ns").addEventListener("click", function(event){export_scan(serveur , false);}, true);
	
	document.getElementById("import_scan").addEventListener("click", function(event){import_scan(serveur, import_q_rep);}, true);

	//mise a jours clique
		if (!AJours){
				/* ******************************A Jours apres clique ********************************/
				document.getElementById("MaJ").addEventListener("click", function(event){GM_setValue("aJours_d",true);}, true);
		}
	

/* ############################## Flotte en vol ######################*/
	
	function colorier_ligne(){
		var destination_flotte = GM_getValue("attaque_cours_d", "").split(';');
		var type_missions_f = GM_getValue("attaque_cours_t", "").split(';');
		for(var h=0; h<type_missions_f.length ; h++)
		{	
			var destin = destination_flotte[h];
			if(document.getElementsByClassName(destin)[0]){
				var ligne_tableau = document.getElementsByClassName(destin)[0];
				if(type_missions_f[h] == text.attt){ligne_tableau.style.color = col_att;}
				else if(type_missions_f[h] == text.det){ligne_tableau.style.color = col_dest;}
				else if(type_missions_f[h] == text.ag){ligne_tableau.style.color = col_att_g;}	

				else if(type_missions_f[h] == text.att_r){ligne_tableau.style.color = col_att_r;}
				else if(type_missions_f[h] == text.det_r){ligne_tableau.style.color = col_dest_r;}
				else if(type_missions_f[h] == text.ag_r){ligne_tableau.style.color = col_att_g_r;}
			}
		}
	}
	
	if ((url.indexOf('page=movement',0)) >=0)
	{
			colorier_ligne();
	}	
}

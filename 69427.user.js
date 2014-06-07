// ==UserScript==
// @name           Deut dépensé & Renta raide [Redesign]
// @namespace      Snaquekiller
// @version        3.0.5
// @author         snaquekiller (96% ) & Martineli ( 2% ) & Vulca (2%)
// @description    Comptage de deut dépensé et de rentabilité de raide v3.0.5
// @include        http://*.ogame.*/game/index.php?page=fleet*
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// @include        http://*.ogame.*/game/index.php?page=combatreport*
// @include        http://*.ogame.*/game/index.php?page=resourceSettings*
// @exclude http://*.ogame.*/game/index.php?page=buddies*
// @exclude http://*.ogame.*/game/index.php?page=notices*
// @exclude http://*.ogame.*/game/index.php?page=search*
// @exclude http://*.ogame.*/game/index.php?page=eventList*
// @exclude http://*.ogame.*/game/index.php?page=jump*
// @exclude http://*.ogame.*/game/index.php?page=phalanx*
// @exclude http://*.ogame.*/game/index.php?page=techtree*
// @exclude http://*.ogame.*/game/index.php?page=techinfo*
// @exclude http://*.ogame.*/game/index.php?page=globalTechtree*
// ==/UserScript==

/*=================================================================================================================
 DERNIERE MISE A JOUR : 01/05/2010
 TOPIC DU FORUM OFFICIEL : http://board.ogame.fr/index.php?page=Thread&threadID=971633
 SCRIPT POUR OGAME.FR v 1.3/
 
//http://snaquekiller.free.fr/ogame/version_deut_r.txt 
// http://userscripts.org/scripts/source/69427.user.js
/*=================================================================================================================*/
/*		changelog::start
je ne gere pas les match nul !!! 
2.0.4a

		changelog::end*/
		
	/**** function de vulca et mushrorn pour autre navigateur que firefox ***/
var FireFox = navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1;
var nomScript = FireFox? '' : 'Deut_depense';
var Opera = navigator.userAgent.indexOf('Opera')>-1;
	// Google Chrome  
	if(!FireFox){ //&& ! window.GM_getValue


			GM_getValue = function(key, defaultValue) {
			var retValue = localStorage.getItem(key);
				if (!retValue) {
					retValue = defaultValue;
				}
				return retValue;
			}

			GM_setValue = function(key, value) {
				localStorage.setItem(key, value);
			}

			GM_deleteValue = function(key) {
				localStorage.removeItem(key);
			}

			GM_addStyle = function (css) {
				var NSURI = 'http://www.w3.org/1999/xhtml';
				var hashead = document.getElementsByTagName('head')[0];
				var parentel = hashead || document.documentElement;
				var newElement = document.createElementNS(NSURI,'link');
				newElement.setAttributeNS(NSURI,'rel','stylesheet');
				newElement.setAttributeNS(NSURI,'type','text/css');
				newElement.setAttributeNS(NSURI,'href','data:text/css,'+encodeURIComponent(css));
				if( hashead ) {
					parentel.appendChild(newElement);
				} else {
					parentel.insertBefore(newElement,parentel.firstChild);
				}
			}

	}	
	
/* *****************************************************************************************************/		
//********************************* Options du script modifiable ***************************************/
// *************************** NE MODIFIER QUE CE QUI SUIT ET RIEN D'AUTRE ! ***************************/
	//GM_setValue('option'+ serveur, 'black/#33CCFF/#0000ff/#00ff00/#ff9999/#99ffff/#ff99ff/24/12/1/1/0/'+ navigator.language+'/#9CCBFF');
/** partie option bbcode **/{
	var option = GM_getValue('option'+ serveur, 'black/#33CCFF/#0000ff/#00ff00/#ff9999/#99ffff/#ff99ff/24/12/1/1/0/'+ navigator.language+'/#9CCBFF').split('/');
	if(!option[18]){
		GM_setValue('option'+ serveur, 'black/#33CCFF/#0000ff/#00ff00/#ff9999/#99ffff/#ff99ff/24/12/1/1/0/'+ navigator.language+'/#9CCBFF');
		var option = GM_getValue('option'+ serveur, 'black/#33CCFF/#0000ff/#00ff00/#ff9999/#99ffff/#ff99ff/24/12/1/1/0/'+ navigator.language+'/#9CCBFF').split('/');
	}
		var couleur2 = new Array();
		var sizeset = new Array();
		var alignebb = new Array();
		var bbcode_baliseo = new Array();
		var bbcode_balisem = new Array();
		var bbcode_balisef = new Array();
                            // ne modifier que le nom des couleurs, ne pas oublier le # pour les héxadécimaux 
							
									couleur2[0]= option[0];           // couleur2 haut tableau
									couleur2[1]= option[1];		// couleur2 corps_tableau
									couleur2[2]= option[2];		// couleur2 bas_tableau
									couleur2[3]= option[3];			// couleur2 des bordures de tableau
									
									couleur2[4]= option[4];			// Couleur du titre deut dépense dans bbcode
									couleur2[5]= option[5];			// Couleur de aujourd'hui , hier  ... dans bbcode
									couleur2[6]= option[6];			// Couleur de  deut dépensé et rentabilité dans bbcode
									couleur2[7]= option[7];			// Couleur de  total raide et recyclage (texte) dans bbcode
									couleur2[8]= option[8];			// Couleur de  total raide et recyclage (chiffres) dans bbcode
									couleur2[9]= option[9];			// Couleur de  renta total ( rc + raide) (texte) dans bbcode
									couleur2[10]= option[16];			// Couleur de  renta total ( rc + raide) (chiffres) dans bbcode
									
									couleur2[11]= option[17];			// Couleur de  renta total ( rc + raide) (chiffres) dans bbcode
									couleur2[12]= option[18];			// Couleur de  renta total ( rc + raide) (chiffres) dans bbcode
									
									sizeset[0] = option[10]; // taille du titre deut dépense dans bbcode
									sizeset[1] = option[11]; // taille de rentabilité et deut dépensés dans bbcode
																				
									bbcode_baliseo[0] = '[b]';//balise gras ouvert
									bbcode_balisef[0] = '[/b]';//balise gras fermer
									
									bbcode_baliseo[1] = '[i]';//balise italique ouvert
									bbcode_balisef[1] = '[/i]';//balise italique fermer		
									
									bbcode_baliseo[2] = '[u]';//balise souligné ouvert
									bbcode_balisef[2] = '[/u]';//balise souligné fermer
									
									bbcode_baliseo[3] = '[s]';//balise barré ouvert
									bbcode_balisef[3] = '[/s]';//balise barré fermer
									
									bbcode_baliseo[4] = '[img]';//balise image ouvert
									bbcode_balisef[4] = '[/img]';//balise image fermer
									
									bbcode_baliseo[5] = '[quote]';//balise citation ouvert
									bbcode_balisef[5] = '[/quote]';//balise citation fermer
									
									bbcode_baliseo[6] = '[code]';//balise code ouvert
									bbcode_balisef[6] = '[/code]';//balise code fermer
									
									bbcode_baliseo[7] = '[spoiler]';//balise spoiler ouvert
									bbcode_balisef[7] = '[/spoiler]';//balise spoiler fermer
																													
									bbcode_baliseo[8] = '[color=';//balise color ouvert
									bbcode_balisem[8] = ']';//balise color milieu
									bbcode_balisef[8] = '[/color]';//balise color fermer
											
									bbcode_baliseo[9] = '[url=';//balise url ouvert
									bbcode_balisem[9] = ']';//balise url milieu
									bbcode_balisef[9] = '[/url]';//balise url fermer
								
								
								var balise_align = option[13];// true pour les forume ou il faut center avec  [align=center] et false pour celle [center]
								if(balise_align == 1){
									bbcode_baliseo[10] = '[align=';//balise align ouvert
									bbcode_balisem[10] = ']';//balise align milieu
									bbcode_balisef[10] = '[/align]';//balise align fermer
									alignebb[0] = 'center'; // alignement de  deut dépense dans bbcode
								}else{							
									bbcode_baliseo[10] = '[center';//balise align ouvert
									bbcode_balisem[10] = ']';//balise align milieu
									bbcode_balisef[10] = '[/center]';//balise align fermer
									alignebb[0] = ''; // laisser comme sa 
								}			
									bbcode_baliseo[11] = '[size=';//balise size ouvert
									bbcode_balisem[11] = ']';//balise size milieu
									bbcode_balisef[11] = '[/size]';//balise size fermer
									
							var text_total_centre =  option[12];//centré	tout le texte si variable = true
							var deut_div_deux_sta =  option[14];//si true quand missions stationné le deut dépensé est divisé par deux .	
							var langue =  option[15];//si true quand missions stationné le deut dépensé est divisé par deux .	
																										
	if(text_total_centre == 1)
	{
		var balise_text1 = bbcode_baliseo[10] + alignebb[0] + bbcode_balisem[10];
		var balise_text2 = bbcode_balisef[10];
	}
	else{
		var balise_text1 = '';
		var balise_text2 = '';
	}
}

{//######################################## / Langue  /################################################/

	var text = new Array();
	var vari = new Array();
	text = 
	{
		Question_var_t : 'Voulez-vous remetre à zero toute les variables ?',
		Reset:'Remise a zero effectué. Actualisé la page pour voir la différence.' ,
		Question_var_r:'Voulez-vous remetre à zero toute les variables de raide?',
		Met_RC:'Métal Recyclé',
		Cri_RC:'Cristal Recyclé',
		
		var_moi_z:'La variable du mois a été remise a 0, du a une mise a jours.',
		A_jour1:'Merci de votre mise a jours pour la version ',
		A_jour2:'.Les variables on cependant été remise a 0 pour que le script fonctionne bien car une variable importante a été changé.',
		remises:'Remise a zero effectué des raides, du a la mise a jours. Si vous rencontrez un bug signalez le sur le forum, ainsi que toute idées.',
		mise_jours:'Mise a jour possible',
		mise_jours_pos:'Mise a jour possible pour deut-dépensé',
		total_ins:'Total depuis installation',
		missionss:' missions ',
		aujourdhui:'Aujourd\'hui',
		hier:'Hier',
		dernier_sept:'7 Derniers Jours',
		jours:'Jours',
		avanhier:'Avant-Hier',
		de_deut:' de deut.',
		de_ressource:' de ressource.',
		total:'Total :',
		renta:'Rentabilité ',
		met_pil:'Metal Pillé : ',
		cri_pil:'Cristal Pillé : ',
		deut_pil:'Deut Pillé : ',
		
		tot_pil:'Total Pillé :',
		perte_pil:'Pertes : ',
		tot_rc:'Total Recyclé :',
		tot_rent:'Rentabilité Total :',
		deu_dep:'Deut dépensé ',
		deu_dep_renta:'Deut dépensé et Rentabilité ',
		moisde:' Mois : ',
		dep_le:'Depuis le ',
		nb_mission:' Nombre de missions ',
		rese_raid:'Remise à 0 raide.',
		rese:'Remise à zero.',
		renta_ac_ss_rc:'Rentabilité avec/sans recyclage : ',
		Metal:'Métal',
		Cristal:'Cristal',
		Deut:'Deut',
		Perte:'Perte',
		defenseur:'Defenseur',
		attaquant:'Attaquant',

		q_variable_reset_raide:'Voulez-vous remetre à zero toute les variables de raide ?',
		nom_script:'Deut dépensé & rentabilité',		
				
		//option bbcode
		option_bbcode:'Option BBcode',
		text_centre:'Voulez-vous centrer le bbcode ?',
		balise_centre:'Quelle balise utilisez-vous pour centrer le texte ?',
			balise1_center:'[align=center]',
			balise2_center:'[center]',
		color:'Couleur',
		option_save:'Option sauvegarder.',
		
		q_color_haut_tab:'Couleur du haut du tableau : ',
		q_color_corps_tab:'Couleur du corps du tableau : ',
		q_color_bas_tab:'Couleur du bas du tableau : ',
		color_bordure_tab:'Couleur des bordues du tableau  :',
		color_titre_tab:'Couleur du titre deut dépense dans bbcode :',
		color_ajourd_tab:'Couleur de aujourd\'hui , hier  ... dans bbcode :',
		color_deut_dep_tab:' Couleur de  deut dépensé et rentabilité dans bbcode : ',
		color_total_tab:'Couleur de total raide et recyclage (texte) dans bbcode :',
		color_total_chiffre_tab:' Couleur de  total raide et recyclage (chiffres) dans bbcode :',
		color_rentatot_text_tab:' Couleur de  renta total ( rc + raide) (texte) dans bbcode :',
		color_rentatot_chiffre_tab:' Couleur de  renta total ( rc + raide) (chiffres) dans bbcode :',
		taille_text_tab:' Taille du titre deut dépense dans bbcode : ',
		taille_textrenta_tab:' taille de rentabilité et deut dépensés dans bbcode : ',
		
		//option langue
		option_langue:'Language',
		q_langue:'Dans quelle langue voulez-vous le script ?',
		francais:'Français',
		anglais:'English',
		autre:'Autre',
				
		q_moitier_deut:'Voulez-vous comptez la moitiez du deut depensé pour les missions stationné ?',
		q_coleur_fond_tableau1:'Couleur d\'une des couleurs de fond du tableau des raides : ',
		q_coleur_fond_tableau2:'Couleur de l\'autre des couleurs de fond du tableau des raides : ',

		vague_attaque:'Vague d\'attaque :',
		raide_raide:'Raide :',
		unit_metal:'unités de métal,',
		unit_cristal:' unités de cristal et ',
		unit_deut:' unités de deutérium. Pertes subit :',
		unit_deut2:' unités de deutérium.',
		recyclage:' Reyclage : ',
		unit_met_rc:' unités de métal recyclées, ',
		unit_cri_rc:' unités de cristal recyclées',
		bilan:' Bilan : ',
		Soit:'Soit : ',
		scan_deleete:'Scan supprimer',
		scan_all_deleete:'Tout les scan on été supprimmés',

		//th
		num:'n°',
		date:'Date',
		coordonne:'Coordonnée',
		met_rc_poss:'Métal rc/possible',
		cri_rc_poss:'Cristal rc/possible',
		
		// bouton
		export_selec:'Exporter rapport selectionné',
		export_nn_selec:'Exporter rapport non selectionné',
		supr_selec:'Suprimmer rapport selectionné',
		supr_nn_selec:'Suprimmer rapport non selectionné',
		
		//ajout de raide/deut/rc
		choix:'Choisisez',
		date_reperc:'date ( avec repercution sur les dates antérieurs)',
		perte_att:'Perte attaquant',
		perte_def:'Perte défenseur',
		cdr_cre:'Cdr crée de ',
		coordone:'Coordonée ',
		gagnant:'Gagnant :',
		save_raide_deut_rc:'Les informations on été rajoutés.',
		
		//autre
		save_optis:'Sauvegarder les options',
		oui:'oui',
		non:'non',
		mois:
		{
					jan:'Janvier',
					fev:'Fevrier',
					mar:'Mars',
					avr:'Avril',
					mai:'Mai',
					juin:'Juin',
					jui:'Juillet',
					aou:'Aout',
					sep:'Septembre',
					oct:'Octobre',
					nov:'Novembre',
					dec:'Decembre',
					
		}
	}
	if(navigator.language == 'en')
	{
	   text =
		{
			Question_var_t : 'Do you want to reset all the variables ?',
			Reset:'Reset done. Refresh the page to see the difference.' ,
			Question_var_r:'Do you want to reset all the raid variables?',
			Met_RC:'Metal recycled',
			Cri_RC:'Crystal Recycled',
		   
			var_moi_z:'The month variable has been reseted, due to an update.',
			A_jour1:'Thanks for updating the script. ',
			A_jour2:'.The variables has been reseted in order to make the script works, because an important variable has been modified.',
			remises:'Reset of the raids done, due to the update. If you encounter any bug, please report it on the board. Your ideas, suggestions as well are welcome.',
			mise_jours:'Update possible',
			mise_jours_pos:'Update possible for the script deut-dépensé',
			total_ins:'Total since installation',
			missionss:' missions ',
			aujourdhui:'Today',
			hier:'Yesterday',
			dernier_sept:'7 Last Days',
			jours:'Days',
			avanhier:'Before Yesterday',
			de_deut:' of deut.',
			de_ressource:' of ressources.',
			total:'Total :',
			renta:'Profitability ',
			met_pil:'Metal looted : ',
			cri_pil:'Crystal looted : ',
			deut_pil:'Deut looted : ',
		   
			tot_pil:'Total looted :',
			perte_pil:'Losses : ',
			tot_rc:'Total Recycled :',
			tot_rent:'Total Profitability :',
			deu_dep:'Deut used ',
			deu_dep_renta:'Deut used and profitability ',
			moisde:' Month : ',
			dep_le:'Since the ',
			nb_mission:' Nomber of missions ',
			rese_raid:'Reset raid.',
			rese:'Reset.',
			renta_ac_ss_rc:'Profitability with/without recycling : ',
			Metal:'Metal',
			Cristal:'Crystal',
			Deut:'Deut',
			Perte:'Loss',
			defenseur:'Defender',
			attaquant:'Attacker',

			q_variable_reset_raide:'Do you want to reset all your raid variables ?',
			nom_script:'Deut dépensé & rentabilité',// This is the name of the script in french...       
				   
			//option bbcode
			option_bbcode:'BBcode Option',
			text_centre:'Do you want to center the BBCode ?',
			balise_centre:'Which taf do you want to use to center the text ?',
				balise1_center:'[align=center]',
				balise2_center:'[center]',
			color:'Color',
			option_save:'Option save.',
		   
			q_color_haut_tab:'Top of the table color: ',
			q_color_corps_tab:'Body of the table color: ',
			q_color_bas_tab:'Bottom of the table color : ',
			color_bordure_tab:'Couleur des bordues du tableau  :',
			color_titre_tab:'Color of the title Deut Used in the bbcode :',
			color_ajourd_tab:'Color of today , yesterday ...in the bbcode :',
			color_deut_dep_tab:' Color of used deut and profitability in the bbcode : ',
			color_total_tab:'Color of total raid and recycling (text) in the bbcode :',
			color_total_chiffre_tab:' Color of  total raid and recycling (numbers) in the bbcode :',
			color_rentatot_text_tab:' Color of total profitability ( DF + raid) (texte) in the bbcode :',
			color_rentatot_chiffre_tab:' Color of total profitability ( DF + raid) (numbers) in the bbcode :',
			taille_text_tab:' Size of the title used deut in the bbcode : ',
			taille_textrenta_tab:' Size of profitability and used deut in the BCCode : ',
		   
			//option langue
			option_langue:'Language',
			q_langue:'In which language do you want to use the script ?',
			francais:'French',
			anglais:'English',
			autre:'Others',
				   
			q_moitier_deut:'Do you want to count the half of the used deut for the missions stay(in your ally member) ?', // technical word ... :S
			q_coleur_fond_tableau1:'Background first color of the raid table : ',
			q_coleur_fond_tableau2:'Background second color of the raid table : ',

			vague_attaque:'attack wave :',
			raide_raide:'Raids :',
			unit_metal:' metal units,',
			unit_cristal:' crystal units and ',
			unit_deut:' deuterium units, without losses :',// Please check the initial meaning.
			unit_deut2:' deuterium units.',
			recyclage:' Recycling : ',
			unit_met_rc:' Metal units recycled, ',
			unit_cri_rc:' Crystal units recycled',
			bilan:' Balance sheet : ',
			Soit:'Soit : ',
			scan_deleete:'Scan Delete',
			scan_all_deleete:'All the scans have been deleted',

			//th
			num:'n°',
			date:'Date',
			coordonne:'Coordonnates',
			met_rc_poss:'Metal recycled/possible',
			cri_rc_poss:'Crystal recycled/possible',
		   
			// bouton
			export_selec:'Export the selected reports',
			export_nn_selec:'Export the non-selected reports',
			supr_selec:'Delete the selected reports',
			supr_nn_selec:'Delete the non-selected reports',
		   
			//ajout de raide/deut/rc
			choix:'Choose',
			date_reperc:'date ( with effects on previous dates)',
			perte_att:'Loss attacker',
			perte_def:'Loss defender',
			cdr_cre:'DF created of ',
			coordone:'Coordonnates ',
			gagnant:'Winner :',
			save_raide_deut_rc:'The data has been added.',
		   
			//autre
			save_optis:'Save the settings',
			oui:'yes',
			non:'no',
			mois:
			{
						jan:'January',
						fev:'February',
						mar:'March',
						avr:'April',
						mai:'May',
						juin:'June',
						jui:'July',
						aou:'August',
						sep:'September',
						oct:'October',
						nov:'November',
						dec:'December',
					   
			}
		}
	}	
	if((location.href.indexOf('.ogame.fr',0)) >=0)
	{	vari = 
		{
			et:' et ',
			de:' de',
			rapport_col:'Vous avez collecté',
			rapport_ex:'exploitation du champ',
		}
	}
	else if((location.href.indexOf('.ogame.org',0)) >=0)
	{	vari = 
		{
			et:'and',
			de:' from',
			rapport_col:'You have harvested',
			rapport_ex:'Harvesting report',
		}
	}
}

{//#################################### #### / FONCTION  /################################################/
// separateur de milier
function addPoints(nombre){
	if (nombre==0) {return nombre;} 
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

// merci mushroonm et Lame noire qui mon donner cette function
function insertAfter(elem, after) {
	var dad = after.parentNode;
	if(dad.lastchild == after)
		dad.appendChild(elem);
	else 
		dad.insertBefore(elem, after.nextSibling);
}

function trim(string){return string.replace(/(^\s*)|(\s*$)/g,'');} 

//function petit rectangle affiche (genre pop up) 0 V , 1 erreur
function fadeBoxx(message, failed, temps){

	if(FireFox)
	{
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
	else{
		alert(message);
	}
}

// pour suprime les 0 en trop de devant des chiffres
function supr0(chiffre){
		if(chiffre.indexOf('0') == 0){
			var chiffre = chiffre.substring(1);
		}
	return chiffre;
}

// pour colorier en vert ou rouge si si l'argument 1 est positif ou negatif.
function couleur() {
	var nb = parseInt(arguments[0]);
	if(arguments[1] != undefined){var avant_nb = arguments[1];}else{var avant_nb = '';}
	if(arguments[2] != undefined){var apres_nb = arguments[2];}else{var apres_nb = '';}
	
	if(nb > 0){var color = 'green';}
	else if(nb==0){ var color = 'blue';}
	else{ var color = 'red';}
	var a_retourner = '<span style="color:'+ color +';">'+ avant_nb + addPoints(nb) + apres_nb +'</span>';
	return a_retourner;
}

function couleur_bbcode() {
	var nb = parseInt(arguments[0]);
	if(arguments[1] != undefined){var avant_nb = arguments[1];}else{var avant_nb = '';}
	if(arguments[2] != undefined){var apres_nb = arguments[2];}else{var apres_nb = '';}
	
	if( nb > 0){var color = 'green';}
	else if(nb==0){ var color = 'blue';}
	else{ var color = 'red';}
	var a_retourner = '[color="'+ color +'"]'+ avant_nb + addPoints(nb) + apres_nb +'[/color]';
	return a_retourner;
}

function listederoulante(type){
	// alert(this.id);
	if(type == 0){//type jours
		var datejj = document.getElementById("jours_s").value;
		var jour_jj = (nombreJoursdepuis1970 - (parseInt(datejj)/20))%7;      // on recupere un nombre entre 0 et 6 comprit pour connaitre le numero du jours demanders
		var rrc_var2 = GM_getValue('rrc_7j'+ serveur ,'0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#'+ jours +'/'+ (jours+1000*3600*24*7) +'').split('#')[jour_jj];
		var dm_var2 = GM_getValue('dm_7j' + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#'+ jours +'/'+ (jours+1000*3600*24*7) +'').split('#')[jour_jj];
		var id_ligne = '7dl';
	}else{
		var mois1 = document.getElementById("mois_s").value;
		mois1 = parseInt(mois1)/10;
		var dm_var2 = GM_getValue('dm_mois'+ mois1 + serveur , '0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0');
		var rrc_var2 = GM_getValue('rrc_mois'+ mois1 + serveur , '0;0;0;0/0;0');
		var id_ligne = 'mois';
	}
	
	//deut + mission.
		dm_var2 = dm_var2.split('/');
		var array_mission = '';var array_deut = '';var dm_temporaire = '';
		for(var u=0;u<(dm_var2.length -1);u++){
			dm_temporaire = dm_var2[u].split(';');
			array_mission = array_mission + ' | ' + mission_type_detail_g[u] + ' : ' + addPoints(parseInt(dm_temporaire[1])) ;
			array_deut = array_deut + ' | ' + mission_type_detail_g[u] + ' : ' + addPoints(parseInt(dm_temporaire[0])) ;
		}
		dm_temporaire = dm_var2[10].split(';');			
		var aff_miss = '<acronym title="' + array_mission + '">'+  addPoints(parseInt(dm_temporaire[1])) +'</acronym>';
		var aff_deut = '<acronym title="' + array_deut + '">'+ addPoints(parseInt(dm_temporaire[0])) +'</acronym>';
    
	//renta
		rrc_var2 = rrc_var2.split('/');
		rrc_var2[0] = rrc_var2[0].split(';');rrc_var2[1] = rrc_var2[1].split(';');
		var raide_la_acro = text.Metal +' : ' + addPoints(parseInt(rrc_var2[0][0])) +' | '+ text.Cristal +' : '+ addPoints(parseInt(rrc_var2[0][1])) ;
			raide_la_acro = raide_la_acro + ' | '+ text.Deut +' : '+ addPoints(parseInt(rrc_var2[0][2])) +' | '+ text.Perte +' : '+ addPoints(parseInt(rrc_var2[0][3]));
			raide_la_acro = raide_la_acro +' | '+ text.Met_RC +' : '+ addPoints(parseInt(rrc_var2[1][0])) +' | '+ text.Cri_RC +' : '+ addPoints(parseInt(rrc_var2[1][1]));
			var renta_tt = addPoints(parseInt(rrc_var2[0][0]) + parseInt(rrc_var2[0][1]) + parseInt(rrc_var2[0][2]) - parseInt(rrc_var2[0][3]) + parseInt(rrc_var2[1][0]) + parseInt(rrc_var2[1][1]));
	raide_la_acro = '<acronym title="'+ raide_la_acro +'"> '+ renta_tt +'</acronym>';
	
	document.getElementById(id_ligne).getElementsByTagName('td')[1].innerHTML = aff_miss;
	document.getElementById(id_ligne).getElementsByTagName('td')[2].innerHTML = aff_deut;
	document.getElementById(id_ligne).getElementsByTagName('td')[3].innerHTML = raide_la_acro;
}

function reset(serveur, pseudo){
	var continuer = confirm(text.Question_var_t);
	if(continuer == true){		
		GM_setValue('dm_total' + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0');
		GM_setValue('dm_archive' + serveur ,'#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0/0');
		GM_setValue('dm_7j' + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#'+ jours +'/'+ (jours+1000*3600*24*7) +'');
		for (var sd=0 ; sd<12 ; sd++){
			GM_setValue('dm_mois'+sd + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0');
		}
		alert(text.Reset);
	}	
}
function reset_raide(serveur, pseudo){
	var continuer = confirm(text.q_variable_reset_raide);
	if(continuer == true){		
		GM_setValue('rrc_total' + serveur ,'0;0;0;0/0;0');
		GM_setValue('rrc_archive'+ serveur ,'#0;0;0;0/0;0/0/0');
		GM_setValue('rrc_7j'+ serveur ,'0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#'+ jours +'/'+ (jours+1000*3600*24*7) +'');
		GM_setValue('DateRecyclage'+ serveur , '');
		GM_setValue('DateCombat'+ serveur , '');
			for (var sd=0 ; sd<12 ; sd++){
				GM_setValue('rrc_mois'+sd + serveur ,'0;0;0;0/0;0');
			}		
		alert(text.Reset);
	}
}

function creer_bloc_bbcode(text_nom,deut_var, rrc_var, id_tr){
	//deut + mission
		if(id_tr != 'mois' && id_tr != 'tt'){deut_var = deut_var.split('/');}
		var retour = '\n '+ bbcode_baliseo[8] + couleur2[5]+ bbcode_balisem[8] + bbcode_baliseo[11] +sizeset[1]+ bbcode_balisem[11] + bbcode_baliseo[2] + bbcode_baliseo[0] +''+ text_nom  +'  :'+ bbcode_balisef[0] + bbcode_balisef[2] + bbcode_balisef[11] + bbcode_balisef[8] +
							 '\n '+ bbcode_baliseo[8] +couleur2[6]+ bbcode_balisem[8] + bbcode_baliseo[2] + bbcode_baliseo[0] +''+ text.deu_dep +' :'+ bbcode_balisef[0] + bbcode_balisef[2]+'\n'+ bbcode_balisef[8];

		for(var u=0;u<(deut_var.length -1);u++){
			dm_temporaire = deut_var[u].split(';');
			retour = retour + addPoints(parseInt(dm_temporaire[1])) + bbcode_baliseo[1] +''+ text.missionss  +''+ mission_type_detail_g[u] + bbcode_balisef[1] +' : '+ addPoints(parseInt(dm_temporaire[0])) +''+ text.de_deut +'\n';
		}
		dm_temporaire = deut_var[10].split(';');	
		retour = retour + bbcode_baliseo[8] +couleur2[7]+ bbcode_balisem[8]+ bbcode_baliseo[2] +' '+ text.total +' '+bbcode_balisef[2]+ bbcode_balisef[8] +' ' + bbcode_baliseo[8] +couleur2[8]+ bbcode_balisem[8] +addPoints(parseInt(dm_temporaire[1])) +' '+ text.missionss +' : '+ addPoints(parseInt(dm_temporaire[0])) +''+ text.de_deut +''+bbcode_balisef[8];				
	
	//renta
	if(id_tr != 'mois' && id_tr != 'tt'){rrc_var = rrc_var.split('/');}
	
	rrc_var[0] = rrc_var[0].split(';');rrc_var[1] = rrc_var[1].split(';');
	var renta_tt = addPoints(parseInt(rrc_var[0][0]) + parseInt(rrc_var[0][1]) + parseInt(rrc_var[0][2]) - parseInt(rrc_var[0][3]) + parseInt(rrc_var[1][0]) + parseInt(rrc_var[1][1]));
	retour = retour + '\n\n'+ bbcode_baliseo[8] +couleur2[6]+ bbcode_balisem[8] +bbcode_baliseo[2] + bbcode_baliseo[0] +'Rentabilité :'+ bbcode_balisef[0] + bbcode_balisef[2]+'\n'+bbcode_balisef[8]
		+ bbcode_baliseo[1] +' '+ text.met_pil +' '+ bbcode_balisef[1] + addPoints(parseInt(rrc_var[0][0])) + ' | '
		+ bbcode_baliseo[1] +''+ text.cri_pil +''+ bbcode_balisef[1] + addPoints(parseInt(rrc_var[0][1])) + ' | '
		+ bbcode_baliseo[1] +''+ text.deut_pil +''+ bbcode_balisef[1] + addPoints(parseInt(rrc_var[0][2])) + ' | '
		+ bbcode_baliseo[1] +''+ text.perte_pil +''+ bbcode_balisef[1] + addPoints(parseInt(rrc_var[0][3])) +' \n'
		+ bbcode_baliseo[8] + couleur2[7]+ bbcode_balisem[8] + bbcode_baliseo[2] +''+ text.tot_pil +' ' + bbcode_balisef[2] + bbcode_balisef[8] +' ' + bbcode_baliseo[8] +couleur2[8]+ bbcode_balisem[8] + addPoints(parseInt(rrc_var[0][0]) + parseInt(rrc_var[0][1]) + parseInt(rrc_var[0][2]) - parseInt(rrc_var[0][3])) +' de ressource.\n\n'+ bbcode_balisef[8]
		
		+ bbcode_baliseo[1] +''+ text.Met_RC +' : '+ bbcode_balisef[1] + addPoints(parseInt(rrc_var[1][0])) + ' | '
		+ bbcode_baliseo[1] +''+ text.Cri_RC +' : '+ bbcode_balisef[1] + addPoints(parseInt(rrc_var[1][1])) + ' \n '
		+ bbcode_baliseo[8] +couleur2[7]+ bbcode_balisem[8] + bbcode_baliseo[2] +' '+ text.tot_rc +' ' + bbcode_balisef[2]+ bbcode_balisef[8] +' ' + bbcode_baliseo[8] +couleur2[8]+ bbcode_balisem[8] + addPoints(parseInt(rrc_var[1][0]) + parseInt(rrc_var[1][1])) +' de ressource.\n'+ bbcode_balisef[8]
		+ bbcode_baliseo[8] +couleur2[9]+ bbcode_balisem[8] + bbcode_baliseo[2] +' '+ text.tot_rent +' ' + bbcode_balisef[2]+ bbcode_balisef[8] +' ' + bbcode_baliseo[8] +couleur2[10]+ bbcode_balisem[8] + addPoints(renta_tt) +' de ressource.\n\n'+ bbcode_balisef[8];

	return retour;
}
function bccode_create(serveur, pseudo){
		var mois = date.getMonth();
		var mois4513 = new Array( text.mois.jan , text.mois.fev  , text.mois.mar, text.mois.avr, text.mois.mai, text.mois.juin, text.mois.jui, text.mois.aou, text.mois.sep, text.mois.oct, text.mois.nov, text.mois.dec);
		var dm_mois = GM_getValue('dm_mois'+mois + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0').split('/');
		var dm_total = GM_getValue('dm_total' + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0').split('/');
		var dm_archive = GM_getValue('dm_archive' + serveur ,'#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0/0').split('#');
		var dm_7j = GM_getValue('dm_7j' + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#'+ jours +'/'+ (jours+1000*3600*24*7) +'').split('#');
		var rrc_mois = GM_getValue('rrc_mois'+mois + serveur ,'0;0;0;0/0;0').split('/');
		var rrc_total = GM_getValue('rrc_total' + serveur ,'0;0;0;0/0;0').split('/');
		var rrc_archive = GM_getValue('rrc_archive'+ serveur ,'#0;0;0;0/0;0/0/0').split('#');
		var l_rrc_archive = rrc_archive.length;
		var rrc_7j = GM_getValue('rrc_7j'+ serveur ,'0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#'+ jours +'/'+ (jours+1000*3600*24*7) +'').split('#');
		var jour1script = GM_getValue('jours_1script' + serveur ,j_m_ar);
		
		var bbcode_cree = creer_bloc_bbcode('Aujourd\'hui',dm_7j[mod], rrc_7j[mod], 'au');
		bbcode_cree = bbcode_cree + creer_bloc_bbcode('Hier',dm_7j[(mod -1+7)%7], rrc_7j[(mod -1+7)%7], '7dl');
		bbcode_cree = bbcode_cree + creer_bloc_bbcode('7 dernier jours',dm_7j[7], rrc_7j[7], '7dj');	
		bbcode_cree = bbcode_cree + creer_bloc_bbcode(mois4513[mois], dm_mois, rrc_mois, 'mois');		
		bbcode_cree = bbcode_cree + creer_bloc_bbcode('Total depuis installation ('+ jour1script +')',dm_total, rrc_total,'tt');
	document.getElementById("textearea").innerHTML = bbcode_cree;
}

function save_option(serveur){
// option de langue
	var q_langue = document.getElementById('langue').value;
	var col4 = document.getElementById('col_4').value;
	var col5 = document.getElementById('col_5').value;
	var col6 = document.getElementById('col_6').value;
	var col7 = document.getElementById('col_7').value;
	var col8 = document.getElementById('col_8').value;
	var col9 = document.getElementById('col_9').value;
	var col10 = document.getElementById('col_10').value;
	var col11 = document.getElementById('col_11').value;
	
	var taille1 = document.getElementById('taille1').value;
	var taille2 = document.getElementById('taille2').value;
			
	var q_centre0 = document.getElementById("centre0s").checked;
	var q_centre1 = document.getElementById("centre1s").checked;
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

	var qstatior0 = document.getElementById("qstatio0").checked;
	var qstatior1 = document.getElementById("qstatio1").checked;
	if(qstatior0 == true)
		{var qstatio_rep = 0;}
	else if(qstatior1 == true)
		{var qstatio_rep = 1;}	
		
		
	var option_save_bbcode =  col4 +'/'	+ col5 +'/'+ col6 +'/'+ col7 +'/'+ col8 +'/'+ col9 +'/'+ col10 +'/'
			+ taille1 +'/'+ taille2 +'/'+ q_centre +'/'+ rep_center_type +'/'+ qstatio_rep +'/'+ q_langue +'/'+ col11 ;
	GM_setValue('option'+ serveur, option_save_bbcode);
	fadeBoxx(text.option_save, 0, 1000)
}	

/**** page tableau deut-depense fleet1 ***/
	// function pour ajouter des raides 
function rajout_raide_deut(){
		// le choix du type
		var type_select ='<label> Ajout de : </label><select name="type" id="type_add">'
			+ '<option value="rien" id="rien" > '+ text.choix +'</option>'
			+ '<option value="raide_add" id="raide" > '+ text.raide_raide +'</option>'
			+ '<option value="rc_add" id="rc"> '+ text.recyclage +' </option>'
			+ '<option value="deut_dep_demande" id="deut_dep">'+ text.deu_dep +'</option>'
			+ ' </select>';


		// le choix de la date	
		var date_liste = ' <Br/> <label> '+ text.date_reperc +'  : </label>'
			+ '<select name="date" id="date">'
				+ '<option value="1" id="auj" >'+ text.aujourdhui +'</option>'
				+ '<option value="20" id="hier"> '+ text.hier +' </option>'
				+ '<option value="40"> '+ text.avanhier +'</option>'
				+ '<option value="60"> J-3</option>'
				+ '<option value="80"> J-4</option>'
				+ '<option value="100"> J-5</option>'
				+ '<option value="120"> J-6</option>'
				+ '<option value="500" id="mois"> '+ text.moisde +'</option>'
				+ '<option value="1000" id="total"> '+ text.total +'</option>'
			+ ' </select>';				

		//choix si c'est du deut depensé	
			var type_mission_liste = '';
			var type_missions_total =mission_type_detail_g;
			for(var t= 0 ; t<type_missions_total.length; t++){
				type_mission_liste += '<option value="'+ type_missions_total[t] +'" id="auj" >'+ type_missions_total[t] +'</option>';		
			}
			var deut_dep_demande = '<div id="deut_dep_demande" style="display:none;">'
							+'<Br>Type de missions : <select name="missions" id="type_mission" style="width:100px;">' + type_mission_liste +'  </select>'
							+'<Br>Deut dépensé : <input id="deut_depense_add" type="text" value="0" style="width:60px;" /></div>';
		// choix si c'est un raide	
		var raide_add = '<div id="raide_add" style="display:none;"> '+text.Metal +' : <input id="met_raide_add" type="text" value="0" style="width:60px;" />, '
						+'<Br>'+text.Cristal +' : <input id="cri_raide_add" type="text" value="0" style="width:60px;" />, '
						+'<Br>'+text.Deut +' : <input id="deut_raide_add" type="text" value="0" style="width:60px;" />, '
						+'<Br>'+ text.vous +': <input id="perte_vous" type="text" value="Vos pertes" /></div>';

		// choix si c'est un rc	

		var rc_add = '<div id="rc_add" style="display:none;">'+ text.Met_RC +' : <input id="met_rc_add" type="text" value="0" style="width:60px;" />, '
						+'<Br>'+ text.Cri_RC +' : <input id="cri_rc_add" type="text" value="0" style="width:60px;" /></div>';			
		var option_ajout = type_select + date_liste + deut_dep_demande + raide_add + rc_add +' <input type="submit" value="Save" id="sauvegarder_option2" href=# />';
		document.getElementById("option_ajout").innerHTML = option_ajout;
		
		// on rajoute les events pour afficher seulement la partie qui nous interesse
		document.getElementById("sauvegarder_option2").addEventListener("click", function(event){
			enregistre_ajout(pseudo,serveur);
			fadeBoxx(text.save_raide_deut_rc, 0, 10000);
		}, true);
		
		document.getElementById("type_add").addEventListener("change", function(event){
			var valeur_type = document.getElementById("type_add").value;
			var array = new Array('raide_add', 'rc_add', 'deut_dep_demande');
			for(var b=0; b<3; b++){
				if(valeur_type == array[b]){document.getElementById(array[b]).style.display = '';}
				else{document.getElementById(array[b]).style.display = 'none';}
			}		
		}, true);
}

function enregistre_ajout(pseudo,serveur){
		var date_selectionner = parseInt(document.getElementById("date").value);
		var mod_e = (nombreJoursdepuis1970 - (parseInt(date_selectionner)/20))%7;
		var type_add = document.getElementById("type_add").value
		
		//si c'est du deut qui est depense
		if(type_add == 'deut_dep_demande'){
			var dm_mois = GM_getValue('dm_mois'+mois + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0').split('/');
			var dm_total = GM_getValue('dm_total' + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0').split('/');
			var dm_archive = GM_getValue('dm_archive' + serveur ,'#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0/0').split('#');
			var dm_7j = GM_getValue('dm_7j' + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#'+ jours +'/'+ (jours+1000*3600*24*7) +'').split('#');
			envoyer_flotte(pseudo, serveur, 1);		
		}
		else if(type_add = "rc"){ 
			var rrc_mois = GM_getValue('rrc_mois'+mois + serveur ,'0;0;0;0/0;0').split('/');
			var rrc_total = GM_getValue('rrc_total' + serveur ,'0;0;0;0/0;0').split('/');
			var rrc_archive = GM_getValue('rrc_archive'+ serveur ,'#0;0;0;0/0;0/0/0').split('#');
			var l_rrc_archive = rrc_archive.length;
			var rrc_7j = GM_getValue('rrc_7j'+ serveur ,'0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#'+ jours +'/'+ (jours+1000*3600*24*7) +'').split('#');

		var metal_collecte = document.getElementById("met_rc_add").value.replace( /[^0-9-]/g, "");
		var cristal_collecte = document.getElementById("cri_rc_add").value.replace( /[^0-9-]/g, "");

		if(date_selectionner <= 120){
			//pour le jours
			rrc_7j[mod_e] = rrc_7j[mod_e].split('/');
			var rrc_7j_d = rrc_7j[mod_e][1].split(';');
				var rrc_7j_d_m = parseInt(rrc_7j_d[0]) + metal_collecte;
				var rrc_7j_d_c = parseInt(rrc_7j_d[1]) + cristal_collecte;				
				rrc_7j[mod_e][1] = rrc_7j_d_m +';'+ rrc_7j_d_c;
				rrc_7j[mod_e] = rrc_7j[mod_e].join('/');
			//pour le total 
			rrc_7j[7] = rrc_7j[7].split('/');
				var rrc_7j_t = rrc_7j[7][1].split(';');
				var rrc_7j_t_m = parseInt(rrc_7j_t[0]) + metal_collecte;
				var rrc_7j_t_c = parseInt(rrc_7j_t[1]) + cristal_collecte;				
				rrc_7j[7][1] = rrc_7j_t_m +';'+ rrc_7j_t_c;	
				rrc_7j[7] = rrc_7j[7].join('/');
			GM_setValue('rrc_7j'+ serveur ,rrc_7j.join('#'));						
		}
		
		
		if(date_selectionner <= 500){						
		//met a jours le mois
			rrc_mois[1] = rrc_mois[1].split(';');
			var rc_mois_m = parseInt(rrc_mois[1][0]) + metal_collecte;
			var rc_mois_c = parseInt(rrc_mois[1][1]) + cristal_collecte;
			rrc_mois[1] = rc_mois_m +';'+ rc_mois_c;
			GM_setValue('rrc_mois'+ mois + serveur ,rrc_mois.join('/'));	
		}
		//met a jours le total
			rrc_total[1] = rrc_total[1].split(';');
			var rc_total_m = parseInt(rrc_total[1][0]) + metal_collecte;
			var rc_total_c = parseInt(rrc_total[1][1]) + cristal_collecte;
			rrc_total[1] = rc_total_m +';'+ rc_total_c;
			GM_setValue('rrc_total'+ serveur ,rrc_total.join('/'));
			
	}
	else if(type_add == 'raide_add'){
		var rrc_mois = GM_getValue('rrc_mois'+mois + serveur ,'0;0;0;0/0;0').split('/');
		var rrc_total = GM_getValue('rrc_total' + serveur ,'0;0;0;0/0;0').split('/');
		var rrc_archive = GM_getValue('rrc_archive'+ serveur ,'#0;0;0;0/0;0/0/0').split('#');
		var l_rrc_archive = rrc_archive.length;
		var rrc_7j = GM_getValue('rrc_7j'+ serveur ,'0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#'+ jours +'/'+ (jours+1000*3600*24*7) +'').split('#');
		
		if(date_selectionner <= 120){
			//pour le jours
			rrc_7j[mod_e] = rrc_7j[mod_e].split('/');
			var rrc_7j_d = rrc_7j[mod_e][0].split(';');
				var rrc_7j_d_m = parseInt(rrc_7j_d[0]) + renta_met;
				var rrc_7j_d_c = parseInt(rrc_7j_d[1]) + renta_cri;				
				var rrc_7j_d_d = parseInt(rrc_7j_d[2]) + renta_deut;				
				var rrc_7j_d_p = parseInt(rrc_7j_d[3]) + perte;				
				rrc_7j[mod_e][0] = rrc_7j_d_m +';'+ rrc_7j_d_c +';'+ rrc_7j_d_d +';'+ rrc_7j_d_p;
				rrc_7j[mod_e] = rrc_7j[mod_e].join('/');
				
			//pour le total 
				rrc_7j[7] = rrc_7j[7].split('/');
				var rrc_7j_t = rrc_7j[7][0].split(';');
				var rrc_7j_t_m = parseInt(rrc_7j_t[0]) + renta_met;
				var rrc_7j_t_c = parseInt(rrc_7j_t[1]) + renta_cri;				
				var rrc_7j_t_d = parseInt(rrc_7j_t[2]) + renta_deut;				
				var rrc_7j_t_p = parseInt(rrc_7j_t[3]) + perte;				
				rrc_7j[7][0] = rrc_7j_t_m +';'+ rrc_7j_t_c +';'+ rrc_7j_t_d +';'+ rrc_7j_t_p;
				rrc_7j[7] = rrc_7j[7].join('/');
			GM_setValue('rrc_7j'+ serveur ,rrc_7j.join('#'));						
		}

	    if(date_selectionner <= 500){	
		//met a jours le mois
			rrc_mois[0] = rrc_mois[0].split(';');
			var rc_mois_m = parseInt(rrc_mois[0][0]) + renta_met;
			var rc_mois_c = parseInt(rrc_mois[0][1]) + renta_cri;
			var rc_mois_d = parseInt(rrc_mois[0][2]) + renta_deut;
			var rc_mois_p = parseInt(rrc_mois[0][3]) + perte;
			rrc_mois[0] = rc_mois_m +';'+ rc_mois_c +';'+ rc_mois_d +';'+ rc_mois_p;
			GM_setValue('rrc_mois'+ mois + serveur ,rrc_mois.join('/'));	
        }
		
		//met a jours le total
			rrc_total[0] = rrc_total[0].split(';');
			var rc_total_m = parseInt(rrc_total[0][0]) + renta_met;
			var rc_total_c = parseInt(rrc_total[0][1]) + renta_cri;
			var rc_total_d = parseInt(rrc_total[0][2]) + renta_deut;
			var rc_total_p = parseInt(rrc_total[0][3]) + perte;
			rrc_total[0] = rc_total_m +';'+ rc_total_c +';'+ rc_total_d +';'+ rc_total_p;
			GM_setValue('rrc_total'+ serveur ,rrc_total.join('/'));
	}
}
function envoyer_flotte(pseudo, serveur, type){
	if(type == 0){// on est en temps normal
		var mission = document.getElementById('missionName').innerHTML;
		var deutdep = document.getElementById("consumption").getElementsByClassName('undermark')[0].innerHTML;
			deutdep = parseInt(deutdep.replace( /[^0-9-]/g, ""));//on suprime le séparateur des milliers
		var date_selectionner = 1;
		var mod_e = mod;		
	}
	else{// on est dans la partie ajout manuel
		var date = new Date();
		var timestamp = (new Date()).getTime();// on a le nb de mili seconde d'aujourd'hui
		var nombreJoursdepuis1970 = Math.floor(timestamp/1000/24/3600);  // on le met pour savoir le nb de jours depuis 1970
		var mission = document.getElementById("type_mission").value;
		var deutdep = parseInt(document.getElementById("deut_depense_add").value.replace( /[^0-9-]/g, ""));
		var date_selectionner = parseInt(document.getElementById("date").value);
		var mod_e = (nombreJoursdepuis1970 - (Math.round(parseInt(date_selectionner)/20)))%7;
	}

	//var date_demande = (nombreJoursdepuis1970 - Math.round(parseInt(date_c)/20))%7;      // on recupere un nombre entre 0 et 6 comprit pour connaitre le numero du jours demanders
	if(deut_div_deux_sta == 1 && mission == 'Stationner'){
		deutdep = Math.round(deutdep/2);	
	}
		
	for(var i =0 ; i<10 ; i++){
		if(mission_type_detail_g[i] == mission){
		
			if(date_selectionner <= 500){			
			//touche au variable mois	
				// rajoute pour une mission
				dm_mois[i] = dm_mois[i].split(';');
					var deut_mois_m = parseInt(dm_mois[i][0]) + deutdep;
					var mission_mois_m = parseInt(dm_mois[i][1]) +1;
					dm_mois[i] = deut_mois_m +';'+ mission_mois_m;
				// rajoute au total interne	
				dm_mois[10] = dm_mois[10].split(';');
					var deut_mois_t = parseInt(dm_mois[10][0]) + deutdep;
					var mission_mois_t = parseInt(dm_mois[10][1]) +1;
					dm_mois[10] = deut_mois_t +';'+ mission_mois_t;				
				GM_setValue('dm_mois'+mois + serveur , dm_mois.join('/'));
			}
			
			//touche au variable total depuis installation
				// rajoute pour une mission
				dm_total[i] = dm_total[i].split(';');
					var deut_total_m = parseInt(dm_total[i][0]) + deutdep;
					var mission_total_m = parseInt(dm_total[i][1]) +1;
						dm_total[i] = deut_total_m +';'+ mission_total_m;
				// rajoute au total interne
				dm_total[10] = dm_total[10].split(';');
					var deut_total_t = parseInt(dm_total[10][0]) + deutdep;
					var mission_total_t = parseInt(dm_total[10][1]) +1;
					dm_total[10] = deut_total_t +';'+ mission_total_t;					
				GM_setValue('dm_total' + serveur , dm_total.join('/'));
			
			
			if(date_selectionner <= 120){
			//touche au variable 7jours		
				// rajoute pour une mission
				dm_7j[mod_e] = dm_7j[mod_e].split('/');
				dm_7j[mod_e][i] = dm_7j[mod_e][i].split(';');
					var deut_7j_m = parseInt(dm_7j[mod_e][i][0]) + deutdep;
					var mission_7j_m = parseInt(dm_7j[mod_e][i][1]) +1;
					dm_7j[mod_e][i] = deut_7j_m +';'+ mission_7j_m;
					
					dm_7j[mod_e][10] = dm_7j[mod_e][10].split(';');
					dm_7j[mod_e][10] = (parseInt(dm_7j[mod_e][10][0]) + deutdep) +';'+ (parseInt(dm_7j[mod_e][10][1]) +1) ;
						dm_7j[mod_e] = dm_7j[mod_e].join('/');					
				// rajoute au total interne
				dm_7j[7] = dm_7j[7].split('/');
					dm_7j[7][i] = dm_7j[7][i].split(';');
					var deut_7j_t = parseInt(dm_7j[7][i][0]) + deutdep;
					var mission_7j_t = parseInt(dm_7j[7][i][1]) +1;
					dm_7j[7][i] = deut_7j_t +';'+ mission_7j_t;
					
					dm_7j[7][10] = dm_7j[7][10].split(';');
					dm_7j[7][10] = (parseInt(dm_7j[7][10][0]) + deutdep) +';'+ (parseInt(dm_7j[7][10][1]) +1);
						
					dm_7j[7] = dm_7j[7].join('/');
						
				GM_setValue('dm_7j' + serveur , dm_7j.join('#'));
			}		
		break;
		}	
	}
} 	
}

//////////////////////////////////////////////// Variable de base  //////////////////////////////////////////////////////
/*** partie variable ***/{
	var url = location.href;
	var serveur = url.split('/')[2];
	var adresse_e = url.split('/')[4].split('&')[0];
	var date = new Date();
	var timestamp = (new Date()).getTime();// on a le nb de mili seconde d'aujourd'hui
	var nombreJoursdepuis1970 = Math.floor(timestamp/1000/24/3600);  // on le met pour savoir le nb de jours depuis 1970
	var mod = nombreJoursdepuis1970%7;
	var mission_type_detail_g = new Array('Stationner', 'Transporter', 'Recycler champ de débris', 'Attaquer', 'Espionner', 'Détruire', 'Stationner chez cet allié', 'Attaque groupée', 'Expédition', 'Coloniser');//10
	var mois = date.getMonth();
	var jours = (new Date(date.getFullYear(), date.getMonth(), date.getDate())).getTime();
	var Version = '3.0.5';
	var ex_version = GM_getValue('exversion'+ serveur ,'0');
	
	// if(parseInt(ex_version.replace( /[^0-9-]/g, "")) < 3){
		// var ancien_r7j = GM_getValue('raid_7j_renta' + serveur ,'0/0/0/0;0/0/0/0;0/0/0/0;0/0/0/0;0/0/0/0;0/0/0/0;0/0/0/0');
	
		// var ancien_mission_total = GM_getValue('nb_missiontotal' + serveur ,'0;0;0;0;0;0;0;0;0;0;0').split(';');
		// var ancien_deut_total = GM_getValue('deutdeptotal' + serveur ,'0;0;0;0;0;0;0;0;0;0;0').split(';');
		// var nouveau_total_md = '';
		// for(var m=0; m<ancien_mission_total.length; m++){
			// nouveau_total_md = nouveau_total_md + ancien_mission_total[m] + ';'+ ancien_deut_total[m]
			// if(m!= 9){nouveau_total_md = nouveau_total_md + '/';}
		// }
		// GM_setValue('rrc_total' + serveur ,nouveau_rrc)
		
		// var ancien_total_raide = GM_getValue('raid_tt_renta' + serveur ,'0;0;0;0;0').split(';');
		// var ancien_total_rc = GM_getValue('recyclage' + serveur ,'0|0;0|0;0|0;0|0;0|0;0|0;0|0;0|0').split(';')[7].split('|');
		// var nouveau_rrc = ancien_total_raide[1] +';'+ ancien_total_raide[2] +';'+ ancien_total_raide[3] +';'+ ancien_total_raide[4] +'/'+
						// ancien_total_rc[0] +';'+ ancien_total_rc[1];
		// GM_setValue('rrc_total' + serveur ,nouveau_rrc)		
	// }
	
		// on recupere le pseudo
	if( document.getElementById('playerName')){
		var pseudo = document.getElementById("playerName").getElementsByTagName('span')[0].innerHTML;
		GM_setValue('pseudo_' + serveur, pseudo); 
	}else {var pseudo = GM_getValue('pseudo_' + serveur, '0'); }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
{////*********************************************/ variable interne au script/*********************************************************	* 
	var dm_mois = GM_getValue('dm_mois'+mois + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0').split('/');
	var dm_total = GM_getValue('dm_total' + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0').split('/');
	var dm_archive = GM_getValue('dm_archive' + serveur ,'#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0/0').split('#');
	var dm_7j = GM_getValue('dm_7j' + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#'+ jours +'/'+ (jours+1000*3600*24*7) +'').split('#');
		
	var rrc_mois = GM_getValue('rrc_mois'+mois + serveur ,'0;0;0;0/0;0').split('/');
	var rrc_total = GM_getValue('rrc_total' + serveur ,'0;0;0;0/0;0').split('/');
	var rrc_archive = GM_getValue('rrc_archive'+ serveur ,'#0;0;0;0/0;0/0/0').split('#');
	var l_rrc_archive = rrc_archive.length;
	var rrc_7j = GM_getValue('rrc_7j'+ serveur ,'0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#'+ jours +'/'+ (jours+1000*3600*24*7) +'').split('#');

	var date_rc = GM_getValue('DateRecyclage'+ serveur , '');
	var date_combat_sauve = GM_getValue('DateCombat'+ serveur , '');
	var date_expe = GM_getValue('Dateexpe'+ serveur , '');
	
	var j_m_ar = date.getDate() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getFullYear(); 
	if(GM_getValue('jours_1script' + serveur ,'0') == "0"){		
		GM_setValue('jours_1script' + serveur ,j_m_ar);
	}	
	var jour1script = GM_getValue('jours_1script' + serveur ,j_m_ar);
	var deniere_vision = GM_getValue('last_view'+ serveur , ''+timestamp +'');	
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
{////*********************************************/ PARTIE mise ajours variable /*********************************************************	* /
	var fff = new Date(parseInt(deniere_vision));
	var jours_dernier_vsitie = Math.floor(fff.getTime()/(1000*24*3600));
	if(jours_dernier_vsitie != nombreJoursdepuis1970){
		if(parseInt(fff.getMonth()) != parseInt(date.getMonth())){//nouveau mois donc on met a 0 le nouveau mois.
			GM_setValue('dm_mois'+ mois + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0');
			GM_setValue('rrc_mois'+ mois + serveur ,'0;0;0;0/0;0');			
		}
	
		// on regarde si sa fait plus de 7 jours qu'on a visiter les pages ogames
		if(jours_dernier_vsitie < (nombreJoursdepuis1970 - 7)){
			rrc_archive = rrc_archive +'#'+ rrc_7j[7] + '/'+ rrc_7j[8];
			GM_setValue('rrc_archive'+ serveur ,rrc_archive);

			dm_archive = dm_archive +'#'+ dm_7j[7] + '/'+ dm_7j[8];
			GM_setValue('dm_archive'+ serveur ,dm_archive);	
			GM_setValue('dm_7j' + serveur ,'0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0/0;0#'+ jours +'/'+ (jours+1000*3600*24*7) +'');
			GM_setValue('rrc_7j'+ serveur ,'0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#0;0;0;0/0;0#'+ jours +'/'+ (jours+1000*3600*24*7) +'');
		}
		else{//si sa fait moin de 7jours
			var date_rrc7j = rrc_7j[8].split('/');
			if(parseInt(date_rrc7j[1]) >= jours){
				//si sa fait une déja une semaine d'archive. on met la variable semaine dans l'archive et on change les dates dans la semaine
				rrc_archive = rrc_archive +'#'+ rrc_7j[7] + '/'+ rrc_7j[8];
				GM_setValue('rrc_archive'+ serveur ,rrc_archive);

				dm_archive = dm_archive +'#'+ dm_7j[7] + '/'+ dm_7j[8];
				GM_setValue('dm_archive'+ serveur ,dm_archive);	
				
				rrc_7j[8] = jours+'/'+ (jours+1000*3600*24*7);
				dm_7j[8] = jours+'/'+ (jours+1000*3600*24*7);
				GM_getValue('rrc_7j'+ serveur ,rrc_7j.join('#'));
				GM_getValue('dm_7j'+ serveur ,dm_7j.join('#'));
			}
		
		//on met a jours le total en enlevant le deut/renta du jours de la semaine derniere
			var dm_7j_hier  = dm_7j[(mod -1+7)%7].split('/');
			var dm_7j_tot  = dm_7j[7].split('/');
			for(var y=0;y<10;y++){
				dm_7j_tot[y] = dm_7j_tot[y].split(';');
				dm_7j_hier[y] = dm_7j_hier[y].split(';');
				dm_7j_tot[y][0] = parseInt(dm_7j_tot[y][0]) - parseInt(dm_7j_hier[y][0]);
				dm_7j_tot[y][1] = parseInt(dm_7j_tot[y][1]) - parseInt(dm_7j_hier[y][1]);
			}
			
			var rrc_7j_hier  = rrc_7j[(mod -1+7)%7].split('/');
			var rrc_7j_tot  = rrc_7j[7].split('/');
				dm_7j_tot[0] = dm_7j_tot[0].split(';');dm_7j_tot[1] = dm_7j_tot[1].split(';');
				rrc_7j_hier[0] = rrc_7j_hier[0].split(';');rrc_7j_hier[1] = rrc_7j_hier[1].split(';');
				dm_7j_tot[0][0] = parseInt(dm_7j_tot[0][0]) - parseInt(rrc_7j_hier[0][0]);
				dm_7j_tot[0][1] = parseInt(dm_7j_tot[0][1]) - parseInt(rrc_7j_hier[0][1]);
				dm_7j_tot[0][2] = parseInt(dm_7j_tot[0][2]) - parseInt(rrc_7j_hier[0][2]);
				dm_7j_tot[0][3] = parseInt(dm_7j_tot[0][3]) - parseInt(rrc_7j_hier[0][3]);
				dm_7j_tot[1][0] = parseInt(dm_7j_tot[1][0]) - parseInt(rrc_7j_hier[1][0]);
				dm_7j_tot[1][1] = parseInt(dm_7j_tot[1][1]) - parseInt(rrc_7j_hier[1][1]);
		}

			//on fait le vide dans les combats et recyclage trop vieux en les supprimant si +vieux de 15jours
			var liste_date_rc = date_rc.split('|');
			for(var i=0; i<liste_date_rc.length ; i++){
				if(timestamp - 15*24*3600*1000 > parseInt(liste_date_rc[i])){
					liste_date_rc[i]='';
				}
			}				
			var date_rc = liste_date_rc.join('|').replace( /\|{2,}/g, "|");
			GM_setValue('DateRecyclage'+ serveur , date_rc+'');

			var liste_date_combat = date_combat_sauve.split('|');
			for(var i=0; i<liste_date_combat.length ; i++){
				if(timestamp - 15*24*3600*1000 > parseInt(liste_date_combat[i])){
					liste_date_combat[i]='';
				}
			}				
			var date_combat_sauve = liste_date_combat.join('|').replace( /\|{2,}/g, "|");
			GM_setValue('DateCombat'+ serveur , date_combat_sauve + '');
			GM_setValue('last_view'+ serveur , ''+timestamp +'');
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
////*********************************************/ Partie script/*********************************************************	* / 
if(adresse_e == 'index.php?page=fleet3'){	
		function safeWrap(f) {
			return function() {
				setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
			};
		}
		
 			var input = document.createElement("input");
			input.type = "submit";
			input.id = "formSubmit";
			input.style.display = "none";
			document.getElementsByName("sendForm")[0].appendChild(input);

			var script = document.createElement("script");
			script.setAttribute("type","text/javascript");
			script.setAttribute("language","javascript");
			script.text = 
			'function trySubmit() {' +
				'if (validated) {' +
					'document.getElementById("formSubmit").click();' +
					'validated = false;' +
					'}' +
			'}';
			document.body.appendChild(script);
		document.getElementsByName("sendForm")[0].addEventListener("submit", safeWrap(function() { envoyer_flotte(pseudo ,serveur, 0);}), false);
	}
else if(adresse_e == 'index.php?page=showmessage'){
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ************************************** ************************ RAPPORT D'EXPLOITATION DE CDR : **************************************************/
	var messages2 = document.getElementsByClassName('infohead')[0].getElementsByTagName('tr')[2].getElementsByTagName('td')[0].innerHTML;	
	var messages = document.getElementById('messagebox').getElementsByClassName('note')[0].innerHTML;
	if(messages2.indexOf(vari.rapport_ex) > -1){//si c'est un rapport de recyclage qu'on regarde
		
		//on prend les groupement de chiffres.	
		var nombre_messages = document.getElementById('messagebox').getElementsByClassName('note')[0].innerHTML.match(/([0-9]{1,3}.){1,}/g);
		// ressource collectes
			var metal_collecte = parseInt(nombre_messages[4].replace( /[^0-9-]/g, ""));
			var cristal_collecte = parseInt(nombre_messages[5].replace( /[^0-9-]/g, ""));		
			
		{//date combats
			var heure_total_recyclage = document.getElementsByClassName('infohead')[0].getElementsByTagName('tr')[3].getElementsByTagName('td')[0].innerHTML;//01.03.2010 10:00:57
				var partie1_date_rc = heure_total_recyclage.split(' ')[0].split('.');
			var mois_rc = parseInt(supr0(partie1_date_rc[1])) - 1;
			var jours_rc = partie1_date_rc[0];				
			var annee_rc = partie1_date_rc[2];
			
				var partie2_date_rc = heure_total_recyclage.split(' ')[1].split(':');
			var heure_rc = partie2_date_rc[0];
			var min_rc = partie2_date_rc[1];
			var sec_rc = partie2_date_rc[2];		
				
			var combat_milisec = (new Date(annee_rc, mois_rc, jours_rc, heure_rc, min_rc, sec_rc)).getTime();// on a le nb de mili seconde du rapport de combat depuis 1970
			var nb_jour_dep = Math.floor(combat_milisec/1000/24/3600);  // on le met pour savoir le nb de jours depuis 1970
		}
		
		//on verifie puis enregistre le tout
		if(date_rc.indexOf(combat_milisec) == -1 && (nombreJoursdepuis1970 - 15) < nb_jour_dep)
		{var newRc = true;}
		else {var newRc = false;}
		
		if(newRc == true){				
			if((nombreJoursdepuis1970 - 7) < nb_jour_dep){//si on est moin de 7jours
				var mod_j = nb_jour_dep%7; // on recupere un nombre entre 0 et 6 comprit
				//pour le jours
				rrc_7j[mod_j] = rrc_7j[mod_j].split('/');
				var rrc_7j_d = rrc_7j[mod_j][1].split(';');
					var rrc_7j_d_m = parseInt(rrc_7j_d[0]) + metal_collecte;
					var rrc_7j_d_c = parseInt(rrc_7j_d[1]) + cristal_collecte;				
					rrc_7j[mod_j][1] = rrc_7j_d_m +';'+ rrc_7j_d_c;
					rrc_7j[mod_j] = rrc_7j[mod_j].join('/');
				//pour le total 
				rrc_7j[7] = rrc_7j[7].split('/');
					var rrc_7j_t = rrc_7j[7][1].split(';');
					var rrc_7j_t_m = parseInt(rrc_7j_t[0]) + metal_collecte;
					var rrc_7j_t_c = parseInt(rrc_7j_t[1]) + cristal_collecte;				
					rrc_7j[7][1] = rrc_7j_t_m +';'+ rrc_7j_t_c;	
					rrc_7j[7] = rrc_7j[7].join('/');
				GM_setValue('rrc_7j'+ serveur ,rrc_7j.join('#'));						
			}
			// met a jours l'archive de la semaine derniere
			rrc_archive[l_rrc_archive -1] = rrc_archive[l_rrc_archive -1].split('/');
			var archive2_cote_rc = rrc_archive[l_rrc_archive -1][1].split(';');
				var archvie_met = parseInt(archive2_cote_rc[0]) + metal_collecte;
				var archvie_cri = parseInt(archive2_cote_rc[1]) + cristal_collecte;
				rrc_archive[l_rrc_archive -1][1] = archvie_met +';'+ archvie_cri;
				rrc_archive[l_rrc_archive -1] = rrc_archive[l_rrc_archive -1].join('/');
				GM_setValue('rrc_archive'+ serveur ,rrc_archive.join('#'))
									
			//met a jours le mois
				rrc_mois[1] = rrc_mois[1].split(';');
				var rc_mois_m = parseInt(rrc_mois[1][0]) + metal_collecte;
				var rc_mois_c = parseInt(rrc_mois[1][1]) + cristal_collecte;
				rrc_mois[1] = rc_mois_m +';'+ rc_mois_c;
				GM_setValue('rrc_mois'+ mois + serveur ,rrc_mois.join('/'));	

			//met a jours le total
				rrc_total[1] = rrc_total[1].split(';');
				var rc_total_m = parseInt(rrc_total[1][0]) + metal_collecte;
				var rc_total_c = parseInt(rrc_total[1][1]) + cristal_collecte;
				rrc_total[1] = rc_total_m +';'+ rc_total_c;
				GM_setValue('rrc_total'+ serveur ,rrc_total.join('/'));
				
			GM_setValue('DateRecyclage'+ serveur , date_rc +'|'+ combat_milisec );	
				
		}			
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ************************************** ************************ RAPPORT De combat : **************************************************/
	else if(document.getElementById('battlereport')){
		{// date
		var date_complet_combat = document.getElementsByClassName('infohead')[0].getElementsByTagName('td')[3].innerHTML;//exemple : 02-09 10:39:35
		var jours_mois_anne_combat = date_complet_combat.split('.');
		var mois_combat = parseInt(supr0(jours_mois_anne_combat[1])) - 1 ;
		var jours_combat = parseInt(supr0(jours_mois_anne_combat[0]));
		var anne_combat = parseInt(jours_mois_anne_combat[2].split(' ')[0]);
		
		var sec_min_heure_combat = date_complet_combat.split(' ')[1].split(':');
		var heures_combat = sec_min_heure_combat[0];
		var min_combat = sec_min_heure_combat[1];
		var sec_combat = sec_min_heure_combat[2];
		
		var date_combat_ms = (new Date(date.getFullYear(), mois_combat, jours_combat, heures_combat, min_combat, sec_combat)).getTime();
		var nombreJoursdepuis1970_combat = Math.floor(date_combat_ms/1000/24/3600);  // on le met pour savoir le nb de jours depuis 1970
	}
	
	// on recupere les infos du rapports de combat
		if (pseudo.indexOf(vari.de) != -1){var pseudo_de = pseudo.split(vari.de)[0];}
		else{var pseudo_de = pseudo;}
		
		var bloc_attaquant = document.getElementById("combatants").getElementsByTagName('div')[0].innerHTML.split('<p>');
		var attaquant = new Array();
		for(var k =1 ; k<bloc_attaquant.length ; k++){
			attaquant[k] = bloc_attaquant[k].split(vari.de)[0];
		}
		
		var bloc_defenseur = document.getElementById("combatants").getElementsByTagName('div')[2].innerHTML.split('<p>');
		var defenseur = new Array();
		for(var l =1 ; l<bloc_defenseur.length ; l++){
			defenseur[l] = bloc_defenseur[l].split(vari.de)[0];
		}
		
		var gagnant1 = document.getElementById("shortreport").getElementsByClassName('summary')[0].getElementsByTagName('td')[2].innerHTML;// pren le 1er <p>
		var sous_array = gagnant1.match(/([0-9]{1,3}.){1,}/g);//merfci vulca
			var sous_gagneM = parseInt(sous_array[0].replace( /[^0-9-]/g, ""));
				if(sous_gagneM == ""){sous_gagneM = 0;}
			var sous_gagneC = parseInt(sous_array[1].replace( /[^0-9-]/g, ""));
				if(sous_gagneC == ""){sous_gagneC = 0;}
			var sous_gagneD = parseInt(sous_array[2].replace( /[^0-9-]/g, ""));
				if(sous_gagneD == ""){sous_gagneD = 0;}
		
		var pertea = parseInt(document.getElementById('shortreport').getElementsByTagName('tr')[1].getElementsByClassName('value')[0].innerHTML.replace( /[^0-9-]/g, ""));
		var perted = parseInt(document.getElementById('shortreport').getElementsByTagName('tr')[1].getElementsByClassName('value')[1].innerHTML.replace( /[^0-9-]/g, ""));
		
		var cdr = document.getElementById('shortreport').getElementsByClassName('summary')[0].getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerHTML;// pren le 1er <p>
			cdr = cdr.match(/([0-9]{1,3}.){1,}/g);//merfci vulca
			var cdr_m = parseInt(cdr[0].replace( /[^0-9-]/g, ""));
			var cdr_c = parseInt(cdr[1].replace( /[^0-9-]/g, ""));
		var perte = ' ';			
		// possible de resumer grace a un indexof
		// coté défenseur
		for (var j=1; j<bloc_defenseur.length; j++){
			if(defenseur[j] == pseudo_de){
				var renta_met = - sous_gagneM;
				var renta_cri = - sous_gagneC;
				var renta_deut = - sous_gagneD;
				perte = perted;								
			}
		}
		
		// coté attaquant
		for (var a=1; a<bloc_attaquant.length; a++){
			if (attaquant[a] == pseudo_de){
				var renta_met = sous_gagneM;
				var renta_cri = sous_gagneC;
				var renta_deut = sous_gagneD;
				perte = pertea;
			}		
		}

		// 
		if(date_combat_sauve.indexOf(date_combat_ms) == -1 && nombreJoursdepuis1970_combat > nombreJoursdepuis1970-15){
			if((nombreJoursdepuis1970 - 7) < nombreJoursdepuis1970_combat){//si on est moin de 7jours
				var mod_j = nombreJoursdepuis1970_combat%7; // on recupere un nombre entre 0 et 6 comprit
				//pour le jours
				rrc_7j[mod_j] = rrc_7j[mod_j].split('/');
				var rrc_7j_d = rrc_7j[mod_j][0].split(';');
					var rrc_7j_d_m = parseInt(rrc_7j_d[0]) + renta_met;
					var rrc_7j_d_c = parseInt(rrc_7j_d[1]) + renta_cri;				
					var rrc_7j_d_d = parseInt(rrc_7j_d[2]) + renta_deut;				
					var rrc_7j_d_p = parseInt(rrc_7j_d[3]) + perte;				
					rrc_7j[mod_j][0] = rrc_7j_d_m +';'+ rrc_7j_d_c +';'+ rrc_7j_d_d +';'+ rrc_7j_d_p;
					rrc_7j[mod_j] = rrc_7j[mod_j].join('/');
					
				//pour le total 
					rrc_7j[7] = rrc_7j[7].split('/');
					var rrc_7j_t = rrc_7j[7][0].split(';');
					var rrc_7j_t_m = parseInt(rrc_7j_t[0]) + renta_met;
					var rrc_7j_t_c = parseInt(rrc_7j_t[1]) + renta_cri;				
					var rrc_7j_t_d = parseInt(rrc_7j_t[2]) + renta_deut;				
					var rrc_7j_t_p = parseInt(rrc_7j_t[3]) + perte;				
					rrc_7j[7][0] = rrc_7j_t_m +';'+ rrc_7j_t_c +';'+ rrc_7j_t_d +';'+ rrc_7j_t_p;
					rrc_7j[7] = rrc_7j[7].join('/');
				GM_setValue('rrc_7j'+ serveur ,rrc_7j.join('#'));						
			}
			// met a jours l'archive de la semaine derniere
			rrc_archive[l_rrc_archive -1] = rrc_archive[l_rrc_archive -1].split('/');
			var archive2_cote_rc = rrc_archive[l_rrc_archive -1][0].split(';');
				var archvie_met = parseInt(archive2_cote_rc[0]) + renta_met;
				var archvie_cri = parseInt(archive2_cote_rc[1]) + renta_cri;
				var archvie_d = parseInt(archive2_cote_rc[2]) + renta_deut;
				var archvie_p = parseInt(archive2_cote_rc[3]) + perte;
				rrc_archive[l_rrc_archive -1][0] = archvie_met +';'+ archvie_cri +';'+ archvie_d +';'+ archvie_p;
				rrc_archive[l_rrc_archive -1] = rrc_archive[l_rrc_archive -1].join('/');
				GM_setValue('rrc_archive'+ serveur ,rrc_archive.join('#'))

			//met a jours le mois
				rrc_mois[0] = rrc_mois[0].split(';');
				var rc_mois_m = parseInt(rrc_mois[0][0]) + renta_met;
				var rc_mois_c = parseInt(rrc_mois[0][1]) + renta_cri;
				var rc_mois_d = parseInt(rrc_mois[0][2]) + renta_deut;
				var rc_mois_p = parseInt(rrc_mois[0][3]) + perte;
				rrc_mois[0] = rc_mois_m +';'+ rc_mois_c +';'+ rc_mois_d +';'+ rc_mois_p;
				GM_setValue('rrc_mois'+ mois + serveur ,rrc_mois.join('/'));	

			//met a jours le total
				rrc_total[0] = rrc_total[0].split(';');
				var rc_total_m = parseInt(rrc_total[0][0]) + renta_met;
				var rc_total_c = parseInt(rrc_total[0][1]) + renta_cri;
				var rc_total_d = parseInt(rrc_total[0][2]) + renta_deut;
				var rc_total_p = parseInt(rrc_total[0][3]) + perte;
				rrc_total[0] = rc_total_m +';'+ rc_total_c +';'+ rc_total_d +';'+ rc_total_p;
				GM_setValue('rrc_total'+ serveur ,rrc_total.join('/'));
			GM_setValue('DateCombat'+ serveur , date_combat_sauve +'|'+ date_combat_ms );	
		}

	// Affichage de la rentabilité attaquant /defenseur
		var renta_attaquant_sscdr = sous_gagneD - pertea + sous_gagneC + sous_gagneM;
		var renta_attaquant_avcdr = renta_attaquant_sscdr + cdr_m + cdr_c;
		var renta_def_sscdr = - sous_gagneD - sous_gagneC - sous_gagneM - perted;
		var renta_def_avcdr = renta_def_sscdr + cdr_m + cdr_c;
		
		
		var acromnym_a_acrc = '<acronym title=" '+ text.Metal +' : ' + addPoints(sous_gagneM) +' | '+ text.Cristal +' : '+ addPoints(sous_gagneC) +' | '+ text.Deut +' : '+ addPoints(sous_gagneD) + ' | '+ text.Perte +' : '+ addPoints(pertea) +' | '+ text.Met_RC +' : '+ addPoints(cdr_m) +' | '+ text.Cri_RC +' : '+ addPoints(cdr_c) +'"> '; 
		var acromnym_a_ss_rc = '<acronym title=" '+ text.Metal +' : ' + addPoints(sous_gagneM) +' | '+ text.Cristal +' : '+ addPoints(sous_gagneC) +' | '+ text.Deut +' : '+ addPoints(sous_gagneD) + ' | '+ text.Perte +' : '+ addPoints(pertea) +'"> ';		
		var acromnym_d_acrc = '<acronym title=" '+ text.Metal +' : ' + addPoints(- sous_gagneM) +' | '+ text.Cristal +' : '+ addPoints(- sous_gagneC) +' | '+ text.Deut +' : '+ addPoints(- sous_gagneD) + ' | '+ text.Perte +' : '+ addPoints(perted) +' | '+ text.Met_RC +' : '+ addPoints(cdr_m) +' | '+ text.Cri_RC +' : '+ addPoints(cdr_c) +'"> '; 
		var acromnym_d_ss_rc = '<acronym title=" '+ text.Metal +' : ' + addPoints(- sous_gagneM) +' | '+ text.Cristal +' : '+ addPoints(- sous_gagneC) +' | '+ text.Deut +' : '+ addPoints(- sous_gagneD) +  ' | '+ text.Perte +' : '+ addPoints(perted) +'"> '; 
		var texte_a_afficher ='<center><strong style="text-decoration:underline;" >'+ text.renta_ac_ss_rc +' </strong><br/>'
								+ ' '+ text.attaquant +' : '+ couleur(renta_attaquant_avcdr, acromnym_a_acrc,'</acronym>') + '/' + couleur(renta_attaquant_sscdr, acromnym_a_ss_rc,'</acronym>')
								+ '<br/> '+ text.defenseur +' : '+ couleur(renta_def_avcdr, acromnym_d_acrc,'</acronym>') + '/' + couleur(renta_def_sscdr, acromnym_d_ss_rc,'</acronym>') + '</center>';
			
		var sp1 = document.createElement("span");
			sp1.setAttribute("id", "Affichage"); // on y ajoute un id
			sp1.setAttribute("style", "text-align:center;display:block;"); 
			sp1.setAttribute("classe", "col01"); 
			sp1.innerHTML = texte_a_afficher; // Ce qu'on veut afficher 
        document.getElementById("battlereport").appendChild(sp1);		
	}
	else if(messages2.indexOf('Résultat de l`expédition') != -1){
		
		{//date combats
			var heure_total_recyclage = document.getElementsByClassName('infohead')[0].getElementsByTagName('tr')[3].getElementsByTagName('td')[0].innerHTML;//01.03.2010 10:00:57
				var partie1_date_rc = heure_total_recyclage.split(' ')[0].split('.');
			var mois_rc = parseInt(supr0(partie1_date_rc[1])) - 1;
			var jours_rc = partie1_date_rc[0];				
			var annee_rc = partie1_date_rc[2];
			
				var partie2_date_rc = heure_total_recyclage.split(' ')[1].split(':');
			var heure_rc = partie2_date_rc[0];
			var min_rc = partie2_date_rc[1];
			var sec_rc = partie2_date_rc[2];		
				
			var combat_milisec = (new Date(annee_rc, mois_rc, jours_rc, heure_rc, min_rc, sec_rc)).getTime();// on a le nb de mili seconde du rapport de combat depuis 1970
			var nb_jour_dep = Math.floor(combat_milisec/1000/24/3600);  // on le met pour savoir le nb de jours depuis 1970
		}
		
					//on verifie puis enregistre le tout
		if(date_expe.indexOf(combat_milisec) == -1 && (nombreJoursdepuis1970 - 15) < nb_jour_dep)
		{var newRc = true;}
		else {var newRc = false;}
		
		if(newRc == true){
			var metal = 0;
			var cristal = 0;
			var deut = 0;

			if(messages.indexOf('Vous avez collecté') > -1 || messages.indexOf("L'attaquant obtient") > -1){
			var vaisseau_add = 0;
				var nombre_de_ressource = parseInt(messages.replace( /[^0-9-]/g, ""));
				if(messages.indexOf('Métal') > -1){
					metal = nombre_de_ressource;
				}
				else if(messages.indexOf('Cristal') > -1){
					cristal = nombre_de_ressource;
				}
				else if(messages.indexOf('Deut') > -1){
					deut = nombre_de_ressource;
				}
				else{//antimatiere			
				}
			}
			else if(messages.indexOf('vaisseaux qui s`y sont joints :') > -1){
				var nb_vaisseau ='';
				var vaisseau_add = 1;
				vari = {
					pt: 'Petit transporteur',gt: 'Grand transporteur',cle: 'Chasseur léger',clo: 'Chasseur lourd',cro: 'Croiseur',vb: 'Vaisseau de bataille',vc: 'Vaisseau de colonisation',rec: 'Recycleur',esp: 'Sonde d`espionnage',bb: 'Bombardier',dest: 'Destructeur',edlm: 'Étoile de la mort',tra: 'Traqueur',
				}
				var vaisseau_gain = new Array('4', '12', '4', '10', '29', '60', '40', '18', '1' ,'90', '125', '10000', '85');
				var vaisseau_gain_m = new Array('2', '6', '3', '6', '20', '45', '10', '10', '0' ,'50', '60', '5000', '30');
				var vaisseau_gain_c = new Array('2', '6', '1', '4', '7', '15', '20', '6', '1' ,'25', '50', '4000', '40');
				var vaisseau_gain_d = new Array('0', '0', '0', '0', '2', '0', '10', '2', '0' ,'15', '15', '1000', '15');
				var vaisseau = new Array(vari.pt, vari.gt, vari.cle, vari.clo, vari.cro, vari.vb, vari.vc, vari.rec, vari.esp, vari.bb, vari.dest, vari.edlm, vari.tra);
				
				// a modifier
				var nombre_de_type = messages.split('vaisseaux qui s`y sont joints :')[1].split('<br>');
				for(var u=1; u<(nombre_de_type.length -1);u++){
					for(var k=0; k<vaisseau.length ; k++){
						if(nombre_de_type[u].indexOf(vaisseau[k]) > -1){
							nb_vaisseau = parseInt(nombre_de_type[u].replace( /[^0-9-]/g, ""));
							metal = metal + nb_vaisseau*parseInt(vaisseau_gain_m[k]);
							cristal = cristal + nb_vaisseau*parseInt(vaisseau_gain_c[k]);
							deut = deut + nb_vaisseau*parseInt(vaisseau_gain_d[k]);
						}
					}
				}		
			}

			if(metal !=0 || cristal!= 0 || deut !=0){
				if(vaisseau_add == 1){
					metal = metal *1000;
					cristal = cristal *1000;
					deut = deut *1000;
				}
				if((nombreJoursdepuis1970 - 7) < nb_jour_dep){//si on est moin de 7jours
						var mod_j = nb_jour_dep%7; // on recupere un nombre entre 0 et 6 comprit
						//pour le jours
						rrc_7j[mod_j] = rrc_7j[mod_j].split('/');
						var rrc_7j_d = rrc_7j[mod_j][0].split(';');
							var rrc_7j_d_m = parseInt(rrc_7j_d[0]) + metal;
							var rrc_7j_d_c = parseInt(rrc_7j_d[1]) + cristal;				
							var rrc_7j_d_d = parseInt(rrc_7j_d[2]) + deut;				
							var rrc_7j_d_p = parseInt(rrc_7j_d[3]);				
							rrc_7j[mod_j][0] = rrc_7j_d_m +';'+ rrc_7j_d_c +';'+ rrc_7j_d_d +';'+ rrc_7j_d_p;
							rrc_7j[mod_j] = rrc_7j[mod_j].join('/');
							
						//pour le total 
							rrc_7j[7] = rrc_7j[7].split('/');
							var rrc_7j_t = rrc_7j[7][0].split(';');
							var rrc_7j_t_m = parseInt(rrc_7j_t[0]) + metal;
							var rrc_7j_t_c = parseInt(rrc_7j_t[1]) + cristal;				
							var rrc_7j_t_d = parseInt(rrc_7j_t[2]) + deut;				
							var rrc_7j_t_p = parseInt(rrc_7j_t[3]);				
							rrc_7j[7][0] = rrc_7j_t_m +';'+ rrc_7j_t_c +';'+ rrc_7j_t_d +';'+ rrc_7j_t_p;
							rrc_7j[7] = rrc_7j[7].join('/');
						GM_setValue('rrc_7j'+ serveur ,rrc_7j.join('#'));						
					}
					// met a jours l'archive de la semaine derniere
					rrc_archive[l_rrc_archive -1] = rrc_archive[l_rrc_archive -1].split('/');
					var archive2_cote_rc = rrc_archive[l_rrc_archive -1][0].split(';');
						var archvie_met = parseInt(archive2_cote_rc[0]) + metal;
						var archvie_cri = parseInt(archive2_cote_rc[1]) + cristal;
						var archvie_d = parseInt(archive2_cote_rc[2]) + deut;
						var archvie_p = parseInt(archive2_cote_rc[3]);
						rrc_archive[l_rrc_archive -1][0] = archvie_met +';'+ archvie_cri +';'+ archvie_d +';'+ archvie_p;
						rrc_archive[l_rrc_archive -1] = rrc_archive[l_rrc_archive -1].join('/');
						GM_setValue('rrc_archive'+ serveur ,rrc_archive.join('#'))
		
					//met a jours le mois
						rrc_mois[0] = rrc_mois[0].split(';');
						var rc_mois_m = parseInt(rrc_mois[0][0]) + metal;
						var rc_mois_c = parseInt(rrc_mois[0][1]) + cristal;
						var rc_mois_d = parseInt(rrc_mois[0][2]) + deut;
						var rc_mois_p = parseInt(rrc_mois[0][3]);
						rrc_mois[0] = rc_mois_m +';'+ rc_mois_c +';'+ rc_mois_d +';'+ rc_mois_p;
						GM_setValue('rrc_mois'+ mois + serveur ,rrc_mois.join('/'));	

					//met a jours le total
						rrc_total[0] = rrc_total[0].split(';');
						var rc_total_m = parseInt(rrc_total[0][0]) + metal;
						var rc_total_c = parseInt(rrc_total[0][1]) + cristal;
						var rc_total_d = parseInt(rrc_total[0][2]) + deut;
						var rc_total_p = parseInt(rrc_total[0][3]);
						rrc_total[0] = rc_total_m +';'+ rc_total_c +';'+ rc_total_d +';'+ rc_total_p;
						GM_setValue('rrc_total'+ serveur ,rrc_total.join('/'));
					GM_setValue('Dateexpe'+ serveur , date_combat_sauve +'|'+ date_combat_ms );	
			}
		}	
	}
}
else if ( adresse_e == 'index.php?page=fleet1' && (url.indexOf('&raidefacil=scriptOptions',0)) ==-1){
	
	/* ******************************RECHERCHE DES MAJ ********************************/
		if(FireFox){
			GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://snaquekiller.free.fr/ogame/version_deut_r.txt ',				
					onload: function(response){
						var Derniere_Version = response.responseText;
						Derniere_Version = Derniere_Version.replace( /[^0-9-]/g, "");
						version2 = Version.replace( /[^0-9-]/g, "");
						
						if(version2 < Derniere_Version){GM_setValue("aJours_d",false);}
						else{GM_setValue("aJours_d",true);}
					}
				});	
		}
		else if(!Opera){
			var xdr = new XMLHttpRequest(); 			
			xdr.onload = function(){			
				var Derniere_Version = xdr.responseText
				Derniere_Version = Derniere_Version.replace( /[^0-9-]/g, "");
				version2 = Version.replace( /[^0-9-]/g, "");
						
				if(version2 < Derniere_Version){GM_setValue("aJours_d",false);}
				else{GM_setValue("aJours_d",true);}
				
			}							
			xdr.open("GET", "http://snaquekiller.free.fr/ogame/version_deut_r.txt");
			xdr.send();
		}
		var AJours = GM_getValue("aJours_d",true);
		/* ///////////////// Variable des MaJ ///////////////////////// */
		if (!AJours){
					var affiche_mise_ajours = '<a id="MaJ" href="http://userscripts.org/scripts/source/69427.user.js"><img src="http://snaquekiller.free.fr/ogame/attention.gif" alt="'+ text.mise_jours +'" title="'+ text.mise_jours_pos +'" />'+ text.mise_jours_pos +'</a>';
			}
		else {var affiche_mise_ajours = ' ';}
		
		function creer_ligne_tableau(text_nom, deut_var, rrc_var, id_tr){
			//deut + mission
				if(id_tr != 'mois' && id_tr != 'tt'){deut_var = deut_var.split('/');}
				var array_mission = '';var array_deut = '';var dm_temporaire = '';
				for(var u=0;u<(deut_var.length -1);u++){
					dm_temporaire = deut_var[u].split(';');
					array_mission = array_mission + ' | ' + mission_type_detail_g[u] + ' : ' + addPoints(parseInt(dm_temporaire[1])) ;
					array_deut = array_deut + ' | ' + mission_type_detail_g[u] + ' : ' + addPoints(parseInt(dm_temporaire[0])) ;
				}
				dm_temporaire = deut_var[10].split(';');			
				var aff_miss = '<acronym title="' + array_mission + '">'+  addPoints(parseInt(dm_temporaire[1])) +'</acronym>';
				var aff_deut = '<acronym title="' + array_deut + '">'+ addPoints(parseInt(dm_temporaire[0])) +'</acronym>';
			
			//renta
			if(id_tr != 'mois' && id_tr != 'tt'){rrc_var = rrc_var.split('/');}
				
				rrc_var[0] = rrc_var[0].split(';');rrc_var[1] = rrc_var[1].split(';');
				var raide_la_acro = text.Metal +' : ' + addPoints(parseInt(rrc_var[0][0])) +' | '+ text.Cristal +' : '+ addPoints(parseInt(rrc_var[0][1])) ;
					raide_la_acro += ' | '+ text.Deut +' : '+ addPoints(parseInt(rrc_var[0][2])) +' | '+ text.Perte +' : '+ addPoints(parseInt(rrc_var[0][3]));
					raide_la_acro += ' | '+ text.Met_RC +' : '+ addPoints(rrc_var[1][0]) +' | '+ text.Cri_RC +' : '+ addPoints(rrc_var[1][1]);
					var renta_tt = addPoints(parseInt(rrc_var[0][0]) + parseInt(rrc_var[0][1]) + parseInt(rrc_var[0][2]) - parseInt(rrc_var[0][3]) + parseInt(rrc_var[1][0]) + parseInt(rrc_var[1][1]));
			raide_la_acro = '<acronym title="'+ raide_la_acro +'"> '+ renta_tt  +'</acronym>';
			var retour = '<tr id="'+ id_tr +'"><td class="nom_deut">'+ text_nom +'</td><td class="miss">'+ aff_miss +'</td><td class="deut">'+ aff_deut +'</td><td class="renta">'+ raide_la_acro +'</td></tr>';
			return retour;
		}
		
		var jliste_liste = '<select name="jours" id="jours_s" ><option value="20">'+ text.hier +' </option><option value="40">'+ text.avanhier  +'</option><option value="60">J-3</option><option value="80">J-4</option><option value="100">J-5</option><option value="120">J-6</option></select>' 
		var mois_liste = '<select name="mois" id="mois_s" ><option value="0">'+ text.mois.jan +' </option><option value="10">'+ text.mois.fev +'</option><option value="20">'+ text.mois.mar +'</option><option value="30">'+ text.mois.avr+'</option><option value="40">'+ text.mois.mai +'</option><option value="50">'+ text.mois.juin +'</option><option value="60">Juillet</option><option value="70">'+ text.mois.aou +'</option><option value="80">'+ text.mois.sep +'</option><option value="90">'+ text.mois.oct +'</option><option value="100">'+ text.mois.nov +'</option><option value="110">'+ text.mois.dec +'</option></select>';
		var ttal_dps_instal = '<acronym title="' + jour1script + '">'+ text.total_ins +' </acronym>';
		var url_1 = document.getElementById("menuTable").getElementsByClassName('menu_icon')[1].getElementsByTagName('a')[0].href;

		
		var afficher = '<thead><tr><th>Jours</th><th>Missions</th><th>Deut-dépensé</th><th>Renta</th></tr></thead><tbody>';
		afficher = afficher + creer_ligne_tableau('Aujourd\'hui',dm_7j[mod], rrc_7j[mod], 'au');
		afficher = afficher + creer_ligne_tableau(jliste_liste,dm_7j[(mod -1+7)%7], rrc_7j[(mod -1+7)%7], '7dl');
		afficher = afficher + creer_ligne_tableau('7 dernier jours',dm_7j[7], rrc_7j[7], '7dj');		
		afficher = afficher + creer_ligne_tableau(mois_liste, dm_mois, rrc_mois, 'mois');
		afficher = afficher + creer_ligne_tableau(ttal_dps_instal,dm_total, rrc_total,'tt');
		afficher = afficher + '</tbody></table>';
		var html = '<textarea style="width:100%;background-color:transparent;color:#999999;text-align:center;display:none;" id="html"><table id="tableau_deut_dep"><caption>Deut-Depensé</caption>'+ afficher +'</textarea>';
		afficher = '<table id="tableau_deut_dep"><caption><a style="float:right;font-size:10px;cursor:pointer;" id=bbcodeclique >[BBcode]</a> <a style="float:right;font-size:10px;cursor:pointer;" id=htmlclique >[Html]</a> <a style="float:right;font-size:10px;cursor:pointer;" id=optionclcique >[Option]</a>  '+ text.deu_dep +' ' + affiche_mise_ajours + '<a style="float:right;font-size:10px;cursor:pointer;" id="ajout" >[Ajout]</a></caption>'
					+ afficher;

		
		var remise0 = '<a id="zero">'+ text.rese +' </a>\n <br/><a id="zero_r">'+ text.rese_raid +' </a><br/><br/><br/>';
		var text_area = '<textarea style="width:100%;background-color:transparent;color:#999999;text-align:center;display:none;" id="textearea"></textarea>';

	/************ partie o^ption **************/	
	var partie_ajout = '<div id="option_ajout" style="width:100%;background-color:transparent;color:#999999;text-align:center;display:none;" ></div>'
	var option_total = '<div id="option" style="width:100%;background-color:transparent;color:#999999;text-align:center;display:none;" >'
			+'<div class="sectiontitre" id="titrebbcode"> '+ text.option_bbcode +': </div>'
			+'<div id="option_bbcode" style="width:100%;background-color:transparent;color:#999999;text-align:center;display:none;" >'
				+ 'Couleurs : '				
					+ '<BR /> <label> '+ text.color_bordure_tab +' </label><input type="text" id="col_4" value="'+ couleur2[3] +'" style="width:60px;background-color:'+ couleur2[3] +';" />'
					+ '<BR /> <label> '+ text.color_titre_tab +' </label><input type="text" id="col_5" value="'+ couleur2[4] +'" style="width:60px;background-color:'+ couleur2[4] +';" />'
					+ '<BR /> <label> '+ text.color_ajourd_tab +' </label><input type="text" id="col_6" value="'+ couleur2[5] +'" style="width:60px;background-color:'+ couleur2[5] +';" />'
					+ '<BR /> <label> '+ text.color_deut_dep_tab +' </label><input type="text" id="col_7" value="'+ couleur2[6] +'" style="width:60px;background-color:'+ couleur2[6] +';" />'
					+ '<BR /> <label> '+ text.color_total_tab +' </label><input type="text" id="col_8" value="'+ couleur2[7] +'" style="width:60px;background-color:'+ couleur2[7] +';" />'
					+ '<BR /> <label> '+ text.color_total_chiffre_tab +' </label><input type="text" id="col_9" value="'+ couleur2[8] +'" style="width:60px;background-color:'+ couleur2[8] +';" />'
					+ '<BR /> <label> '+ text.color_rentatot_text_tab +' </label><input type="text" id="col_10" value="'+ couleur2[9] +'" style="width:60px;background-color:'+ couleur2[9] +';" />'
					+ '<BR /> <label> '+ text.color_rentatot_chiffre_tab +' </label><input type="text" id="col_11" value="'+ couleur2[10] +'" style="width:60px;background-color:'+ couleur2[10] +';" />'
				
				+ '<BR /><BR /><label>  '+ text.taille_text_tab +'</label><input type="text" id="taille1" value="'+ sizeset[0] +'" style="width:60px;" />'
				+ '<BR /><BR /><label>  '+ text.taille_textrenta_tab +' </label><input type="text" id="taille2" value="'+ sizeset[1] +'" style="width:60px;" />'

				+ '<BR /><label> '+ text.text_centre +' </label> '+ text.oui +' <input type="radio" name="centre" value="1" id="centre1s" /> '+ text.non +' <input type="radio" name="centre" value="0" id="centre0s" />'
				+ '<BR /><label> '+ text.balise_centre +' </label> '+ text.balise1_center +' <input type="radio" name="centre_type" value="1" id="centre_type1" /> '+ text.balise2_center +' <input type="radio" name="centre_type" value="0" id="centre_type0" />'
			
			+ '</div><BR /><div class="sectiontitre" id="titrelangue"> '+ text.option_langue +': </div>'
				+ '<div id="choix_langue" style="width:100%;background-color:transparent;color:#999999;text-align:center;display:none;" >'
					+ '<BR /><BR /><label> '+ text.q_langue +': </label><select name="langue" id="langue">'
						+ '<option value="fr" id="langue0" >'+ text.francais +'</option>'
						+ '<option value="en" id="langue1">'+ text.anglais +'</option>'
					+ ' </select>'				
				+ '</div>'
				
			+ '<BR /><div class="sectiontitre" id="titreautre"> Autre : </div>'
				+ '<div id="choix_autre" style="width:100%;background-color:transparent;color:#999999;text-align:center;display:none;" >'
					+ '<BR /><label> '+ text.q_moitier_deut +' </label> '+ text.oui +' <input type="radio" name="qstatio" value="1" id="qstatio1" /> '+ text.non +' <input type="radio" name="qstatio" value="0" id="qstatio0" />'
				+ '</div>'
				
				+ '<BR /><BR /><input type="submit" value="'+ text.save_optis +'" id="sauvegarder_option" href=# /></div><BR /><BR />';		


		var css = '<style type="text/css">#tableau_deut_dep{border:3px double #000000;width:450px;text-align:center;}' +
						' #tableau_deut_dep td,#tableau_deut_dep th,#tableau_deut_dep tr{border:1px solid black;}'+
						' #tableau_deut_dep caption{font-size: 16px;font-weight:bold;}' +
						' #tableau_deut_dep acronym{cursor: pointer;text-decoration: underline;}' +
						' a{cursor: pointer;}' +
						' #tableau_deut_dep thead{background-color:'+ couleur2[0] +';}' +
						' #tableau_deut_dep tbody{background-color: #021D28;}' + //couleur2[1]
						' .sectiontitre{text-align:center;cursor:pointer;border:2px solid #024957;font-size:15px;font-weight: bold;}'+
						' #collapse{ border-collapse:collapse;}</style>';

		afficher = css + afficher + remise0 + text_area + html + option_total +partie_ajout ;
		
		var sp1 = document.createElement("center"); // on crée une balise span
			sp1.setAttribute("id", "Affichage2"); // on y ajoute un id
			sp1.innerHTML = afficher;		
		if (!document.getElementById('warning')){var menu_lien = document.getElementById('buttonz');
			if(!document.getElementById('calculator')){sp1.setAttribute("style", "position:relative;right:40%;top:80px;");}
			 // on y ajoute un id /*Lieu où on veut afficher (A remplacer par ce que vous voulez 	*/
			}
		else{var menu_lien = document.getElementById('warning'); /*Lieu où on veut afficher (A remplacer par ce que vous voulez */}
		insertAfter(sp1, menu_lien);
		
		document.getElementById('mois_s').selectedIndex = date.getMonth();//selectionne par dÃ©faut le mois du moment
		/* ************ Element cliquable *************/
			//remise a zero
			document.getElementById("zero").addEventListener("click", function(event){reset(serveur, pseudo);}, true);
			document.getElementById("zero_r").addEventListener("click", function(event){reset_raide(serveur, pseudo);}, true);
			
			document.getElementById("jours_s").addEventListener("click", function(event){var liste_jours_set = setInterval(listederoulante("0"), 500);}, true);
			document.getElementById("jours_s").addEventListener("blur", function(event){clearInterval(liste_jours_set);}, true);

			document.getElementById("mois_s").addEventListener("click", function(event){var liste_mois_set = setInterval(listederoulante(nombreJoursdepuis1970, 1, mission_type_detail_g), 500);}, true);
			document.getElementById("mois_s").addEventListener("blur", function(event){clearInterval(liste_mois_set);}, true);

			document.getElementById("bbcodeclique").addEventListener("click", function(event){bccode_create(serveur, pseudo);}, true);


		function preselectiionne(variable1, check0 , check1){
			if(variable1 == 0){document.getElementById(check0).checked = "checked";}
			else if(variable1 == 1)	{document.getElementById(check1).checked = "checked";}
		}	
		/** langue **/
		document.getElementById('langue').value = langue;
		
		/** bbcode **/
		preselectiionne(text_total_centre, "centre0s" , "centre1s");
		preselectiionne(balise_align, "centre_type0" , "centre_type1");
		
		/** autre **/
		preselectiionne(deut_div_deux_sta, "qstatio0" , "qstatio1");
		
	// option ouvrir/fermer	
		function ouvert_fermer(idclique, idouvre_f){
			document.getElementById(idclique).addEventListener("click", function(event){
					var cellule = document.getElementById(idouvre_f);
					if (cellule.style.display == 'none'){cellule.style.display = '';}
					else {cellule.style.display = 'none';}
				}, true);
		}

		//interieur option
			ouvert_fermer("titrebbcode", 'option_bbcode');
			ouvert_fermer("titrelangue", 'choix_langue');
			ouvert_fermer("titreautre", 'choix_autre');		
		
		// sauvegarder option si clique			
			document.getElementById("sauvegarder_option").addEventListener("click", function(event){save_option(serveur);}, true);
		//bbcode ouvert/fermer
			ouvert_fermer("bbcodeclique", 'textearea');
		//html ouvert/fermer
			ouvert_fermer("htmlclique", 'html');
		//option ouvert/fermer
			ouvert_fermer("optionclcique", 'option');
		//option ouvert/fermer
			ouvert_fermer("ajout", 'option_ajout');
		//ajout de la partie ajout
			rajout_raide_deut();
			
		//mise a jours
		if (!AJours){
				/* ******************************A Jours apres clique ********************************/
				document.getElementById("MaJ").addEventListener("click", function(event){GM_setValue("aJours_d",true);}, true);
		}		
	
	}
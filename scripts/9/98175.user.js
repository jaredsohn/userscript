// ==UserScript==
// @name           Affiche renta-attaque [Redesign]
// @namespace      Snaquekiller
// @version        0.1
// @author       snaquekiller (98% ) & autre(7%)
// @description  Affiche renta-attaque  v0.1
// @date 2011-03-02
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// @include        http://*.ogame.*/game/index.php?page=combatreport*


// ==/UserScript==
/*=================================================================================================================
 DERNIERE MISE A JOUR : 16/02/2011
 TOPIC DU FORUM OFFICIEL : http://board.ogame.fr/index.php?page=Thread&threadID=978693
 SCRIPT POUR OGAME.FR v 1.5.7*/
	var adresse = location.href.split('/')[4]; // location.href c'est l'adresse internet de la page
	var adresse_e = adresse.split('&')[0];
	
// pour suprimé les 0 en trop de devant des chiffres
function supr0(chiffre){
		if(chiffre.indexOf('0') == 0){
			var chiffre = chiffre.substring(1);
		}
	return chiffre;
}	

// separateur de milier
function addPoints(nombre)
{
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

	var text = new Array();
	text = 
	{
		renta_ac_ss_rc:'Rentabilité avec/sans recyclage : ',
		Metal:'Métal',
		Cristal:'Cristal',
		Deut:'Deut',
		Perte:'Perte',
		defenseur:'Defenseur',
		attaquant:'Attaquant',
		Met_RC:'Métal Recyclé',
		Cri_RC:'Cristal Recyclé',
		et:'et',
	}
		
// On recupere les info de renta  , rapport de combat
if (adresse_e == 'index.php?page=showmessage' )
	{
		var messages = document.getElementById('messagebox').getElementsByClassName('note')[0].innerHTML;
		if(document.getElementById('battlereport'))
		{
	
		// on recupere les infos du rapports de combat
			var gagnant1 = document.getElementById("shortreport").getElementsByClassName('summary')[0].getElementsByTagName('td')[2].innerHTML;// pren le 1er <p>

			var sous_array = gagnant1.match(/([0-9]{1,3}.){1,}/g);//merfci vulca
			var sous_gagneM = sous_array[0].replace( /[^0-9-]/g, "")
			if(sous_gagneM == ""){sous_gagneM = 0;}
			var sous_gagneC = sous_array[1].replace( /[^0-9-]/g, "");
			if(sous_gagneC == ""){sous_gagneC = 0;}
			var sous_gagneD = sous_array[2].replace( /[^0-9-]/g, "");
			if(sous_gagneD == ""){sous_gagneD = 0;}
			sous_gagneM = parseInt(sous_gagneM);
			sous_gagneC = parseInt(sous_gagneC);
			sous_gagneD = parseInt(sous_gagneD);
			
			var pertea = parseInt(document.getElementById('shortreport').getElementsByTagName('tr')[1].getElementsByClassName('value')[0].innerHTML.replace( /[^0-9-]/g, ""));

			var perted = parseInt(document.getElementById('shortreport').getElementsByTagName('tr')[1].getElementsByClassName('value')[1].innerHTML.replace( /[^0-9-]/g, ""));
			
			var cdr = document.getElementById('shortreport').getElementsByClassName('summary')[0].getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerHTML;// pren le 1er <p>
				var cdr_array = cdr.match(/([0-9]{1,3}.){1,}/g);//merfci vulca
				var cdr_m = parseInt(cdr_array[0].replace( /[^0-9-]/g, ""));
				var cdr_c = parseInt(cdr_array[1].replace( /[^0-9-]/g, ""));
		
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
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
// ************************************** ************************ RAPPORT DE COMBAT DÉTAILLÉ : *******************************************************/
else if (adresse_e == 'index.php?page=combatreport')
	{	
		// Affichage de la rentabilité attaquant /defenseur	
		var gagnant1 = document.getElementById("combat_result").getElementsByTagName('p')[0].innerHTML;// pren le 1er <p>	
			if(gagnant1.indexOf('attaquant',0) != -1)
			{
				var sous_array = gagnant1.match(/([0-9]{1,3}.){1,}/g);//merfci vulca
				var sous_gagneM = sous_array[0].replace( /[^0-9-]/g, "");
					if(sous_gagneM == ""){sous_gagneM = 0;}
					sous_gagneM = parseInt(sous_gagneM);
				
				var sous_gagneC = sous_array[1].replace( /[^0-9-]/g, "");
					if(sous_gagneC == ""){sous_gagneC = 0;}
					sous_gagneC = parseInt(sous_gagneC);
				
				var sous_gagneD = sous_array[2].replace( /[^0-9-]/g, "");
					if(sous_gagneD == ""){sous_gagneD = 0;}				
					sous_gagneD = parseInt(sous_gagneD);
			}else{
				var sous_gagneM = 0;
				var sous_gagneC = 0;
				var sous_gagneD = 0;			
			}
			
			var array_nombre_resultat = document.getElementById("combat_result").getElementsByTagName('p')[1].innerHTML.match(/([0-9]{1,3}.){1,}/g);//merci vulca
			
			var pertea = parseInt(array_nombre_resultat[0].replace( /[^0-9-]/g, ""));
			var perted = parseInt(array_nombre_resultat[1].replace( /[^0-9-]/g, ""));
			var cdr_m = parseInt(array_nombre_resultat[2].replace( /[^0-9-]/g, ""));
			var cdr_c = parseInt(array_nombre_resultat[3].replace( /[^0-9-]/g, ""));

			var renta_attaquant_sscdr = sous_gagneD + sous_gagneC + sous_gagneM - pertea;
			var renta_attaquant_avcdr = renta_attaquant_sscdr + cdr_m + cdr_c;
			var renta_def_sscdr = - sous_gagneD - sous_gagneC - sous_gagneM - perted;
			var renta_def_avcdr = renta_def_sscdr + cdr_m + cdr_c;		
			
			var acromnym_a_acrc = '<acronym title=" '+ text.Metal +' : ' + addPoints(sous_gagneM) +' | '+ text.Cristal +' : '+ addPoints(sous_gagneC) +' | '+ text.Deut +' : '+ addPoints(sous_gagneD) + ' | '+ text.Perte +' : '+ addPoints(pertea) +' | '+ text.Met_RC +' : '+ addPoints(cdr_m) +' | '+ text.Cri_RC +' : '+ addPoints(cdr_c) +'"> '; 
			var acromnym_a_ss_rc = '<acronym title=" '+ text.Metal +' : ' + addPoints(sous_gagneM) +' | '+ text.Cristal +' : '+ addPoints(sous_gagneC) +' | '+ text.Deut +' : '+ addPoints(sous_gagneD) + ' | '+ text.Perte +' : '+ addPoints(pertea) +'"> ';		
			var acromnym_d_acrc = '<acronym title=" '+ text.Metal +' : ' + addPoints(- sous_gagneM) +' | '+ text.Cristal +' : '+ addPoints(- sous_gagneC) +' | '+ text.Deut +' : '+ addPoints(- sous_gagneD) + ' | '+ text.Perte +' : '+ addPoints(perted) +' | '+ text.Met_RC +' : '+ addPoints(cdr_m) +' | '+ text.Cri_RC +' : '+ addPoints(cdr_c) +'"> '; 
			var acromnym_d_ss_rc = '<acronym title=" '+ text.Metal +' : ' + addPoints(- sous_gagneM) +' | '+ text.Cristal +' : '+ addPoints(- sous_gagneC) +' | '+ text.Deut +' : '+ addPoints(- sous_gagneD) +  ' | '+ text.Perte +' : '+ addPoints(perted) +'"> '; 
			var texte_a_afficher ='<br/><center><strong style="text-decoration:underline;" >'+ text.renta_ac_ss_rc +'</strong><br/>'
								+ ' '+ text.attaquant +' : '+ couleur(renta_attaquant_avcdr, acromnym_a_acrc, '</acronym>') + '/' + couleur(renta_attaquant_sscdr, acromnym_a_ss_rc, '</acronym>')
								+ '<br/> '+ text.defenseur +' : '+ couleur(renta_def_avcdr, acromnym_d_acrc, '</acronym>') + '/' + couleur(renta_def_sscdr, acromnym_d_ss_rc, '</acronym>') + '</center><br/>';
		
					var sp1 = document.createElement("tr");
				sp1.setAttribute("id", "Affichage"); // on y ajoute un id
				sp1.setAttribute("style", "text-align:center;display:block;"); 
				sp1.setAttribute("classe", "col01"); 
				sp1.innerHTML = texte_a_afficher; // Ce qu'on veut afficher 
            document.getElementById("combatreport").appendChild(sp1);
	}	
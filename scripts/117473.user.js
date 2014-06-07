// ==UserScript==
// @name           OneOverNyne
// @namespace      OON
// @description    Script pour le Jeu ONE OVER NYNE
// @include        http://fondation.oneovernyne.com/core.run*
// @include        http://fondation.oneovernyne.com/chan_live.run*
// ==/UserScript==



// Variables à modifier par l'utilisateur
var user = new Array();
user['menu_active']	= true;								// true ou false pour afficher ou non le menu 
user['menu_url']	= 'http://aliarecorp.forumgratuit.fr/';
user['menu_name']	= 'Forum Aliare';
user['puissance_flotte_active']	= true;					// true ou false pour afficher ou non la puissance réelle et effective des flottes en vol
user['puissance_raid_active']	= true;					// true ou false pour afficher ou non la puissance réelle et effective dans les RC
// -------------------------------------


var url=location.href;

if (url.indexOf('chan_live.run')>=0)
	GM_addStyle('DIV.zone {overflow:auto;}');
else if (url.indexOf('core.run')>=0) {
	var main=document.getElementById('main');
	var page=main.getElementsByClassName('page')[0];

	function shiptype (nom) {
		if (nom=='twinner' || nom=='twinner f')
			return 1; // Carrier Gen 1
		else if (nom=='kobbe 25r' || nom=='breeder 20r')
			return 2; // Fight Gen 1
		else if (nom=='dca automatique')
			return 3; // Canon Gen 1
		else if (nom=='trooper' || nom=='drooper')
			return 4; // Carrier Gen 2
		else if (nom=='klubber 300' || nom=='maya 20' || nom=='maya 60' || nom=='komawax w50' || nom=='komawax k105' || nom=='breeder 30' || nom=='kobbe 25')
			return 5; // Fight Gen 2
		else if (nom=='batterie laser' || nom=='batterie légère' || nom=='batterie proton')
			return 6; // Canon Gen 2
		else if (nom=='trailer' || nom=='cluster')
			return 7; // Carrier Gen 3
		else if (nom=='klubber 500' || nom=='maya 30' || nom=='maya 90' || nom=='komawax w100' || nom=='komawax k110')
			return 8; // Fight Gen 3
		else if (nom=='batterie lourde multicible' || nom=='batterie lourde plasma')
			return 9; // Canon Gen 3
		else
			return false;
	}

	function isFurtif (nom) {
		if (nom=='twinner f' || nom=='kobbe 25f' || nom=='breeder 40f')
			return true;
		else
			return false;
	}

	if (user['menu_active'] == true) {
		var div_bod	 = main.getElementsByClassName('menuB')[0].firstChild;
		var new_menu = document.createElement('a');
		new_menu.className = 'menu ok';
		new_menu.textContent = user['menu_name'];
		new_menu.setAttribute('href', user['menu_url']);
		new_menu.setAttribute('target', '_new');
		div_bod.insertBefore(new_menu, div_bod.childNodes[4]);
	}

	//Page de gestion d'une flotte en vol
	if (url.indexOf('c=location') >= 0 && page) {
		var tbody_pave	 = page.getElementsByClassName('pave')[0].firstChild.firstChild;
		
		var tr_unites = tbody_pave.childNodes[8];
		var td_unites = tr_unites.childNodes[1];
		var nb_Preel = 0; //Puissance réelle, sans carrier
		var furtif = true;
		
		for (var i=0;i<td_unites.childNodes.length;i++) {
			div_ins = td_unites.childNodes[i];
			img_alt = div_ins.firstChild.getAttribute('alt').toLowerCase();
			nombre = div_ins.textContent;
			type = shiptype(img_alt);
			
			if (furtif==true && isFurtif(img_alt) == false) {
				furtif = false;
			}
			
			if (type==2) {
				nb_Preel += Math.round(nombre);
			}
			else if (type==5) {
				nb_Preel += Math.round(2*nombre);
			}
			else if (type==8) {
				nb_Preel += Math.round(4*nombre);
			}
		}
		
		
		//Affichage puissance réelle et effective
		if (nb_Preel>0 && user['puissance_flotte_active'] == true) {
			var tr_puissance = tbody_pave.childNodes[9];
			var td_puissance = tr_puissance.childNodes[1];
			var nb_puissance = td_puissance.firstChild.textContent;
			var td_etat2	 = tr_puissance.childNodes[3];
			var nb_percent	 = td_etat2.textContent.split(' ')[1];
			var nb_Peff		 = Math.round(nb_puissance*nb_percent/10)/10;
			var nb_Pref		 = Math.round(nb_Preel*nb_percent/10)/10;
			
			var tr_new = document.createElement('tr');
			
			var td_new = document.createElement('td');
			td_new.className = 'spec';
			td_new.textContent = 'p. réel';
			tr_new.appendChild(td_new);
			
			var td_new = document.createElement('td');
			td_new.className = 'spec2';
			td_new.textContent = '('+nb_Preel+')';
			tr_new.appendChild(td_new);
					
			var td_new = document.createElement('td');
			td_new.className = 'spec';
			td_new.textContent = 'p. effectif';
			tr_new.appendChild(td_new);
					
			var td_new = document.createElement('td');
			td_new.className = 'spec2';
			td_new.textContent = nb_Peff+' ('+nb_Pref+')';
			tr_new.appendChild(td_new);
			
			tbody_pave.insertBefore(tr_new,tbody_pave.childNodes[10]);
		}
		else if (nb_Preel==0 || furtif==true) {
			var tbody_specs     = page.getElementsByClassName('specs')[0].firstChild;
			for (var i=0;i<tbody_specs.childNodes.length;i++) {
				var a_bu = tbody_specs.childNodes[i].firstChild.firstChild;
				if (a_bu.textContent == 'remplacer') {
					a_bu.setAttribute('href', '#');
				}
				else if (a_bu.textContent == 'raid' ) {
					url=a_bu.getAttribute('href');
					if (furtif==true)
						txt_furtif = ' (furtif)';
					else
						txt_furtif = '';
					a_bu.setAttribute('href', "javascript: if(confirm('Voulez vous vraiment raider"+txt_furtif+" ?')) document.location.href='"+url+"';");
				}
			}
		}
		
		var return_specs = page.getElementsByClassName('specs')[1].firstChild;
		var a_return = return_specs.firstChild.firstChild.firstChild;
		url=a_return.getAttribute('href');
		a_return.setAttribute('href', "javascript: if(confirm('Voulez vous vraiment rentrer ?')) document.location.href='"+url+"';");


	}
	//Rapport de combat
	else if (url.indexOf('c=db_war_read') >= 0 && page && user['puissance_raid_active'] == true) {
		var puissance 		= new Array(0,0,0);
		var puissancereel	= new Array(0,0,0);
		var puissanceSA		= 0;
		var etat			= new Array(0,0,-1,0,0,0);
		
		var div_bod	 = page.getElementsByClassName('bod')[0];
		
		var divs_bloc3 = div_bod.getElementsByClassName('bloc3');
		if (divs_bloc3.length>0) {
			for (var i=0;i<divs_bloc3.length;i++) {
				temp= divs_bloc3[i].childNodes[1].textContent.split(' ');
				etat[i]=Math.round(temp[1]*10)/10;
			}
		}
		
		var divs_bloc = div_bod.getElementsByClassName('bloc');
		var h=0;
		var j=0;
		for (var i=0;i<divs_bloc.length;i++) {
			divs_half = divs_bloc[i].getElementsByClassName('half');
			if (divs_half.length>0) {
				puissance[i] = 0;
				for (var j=0;j<divs_half.length;j++) {
					nom = divs_half[j].firstChild.textContent.toLowerCase();
					nombre = Math.round(divs_half[j].childNodes[1].firstChild.textContent);
					type = shiptype(nom);
					if (type==1) {
						puissance[h] += nombre;
					}
					else if (type==2 || type==3) {
						puissance[h] += nombre;
						puissancereel[h] += nombre;
						if (type==3) puissanceSA += nombre;
					}
					else if (type==4) {
						puissance[h] += 2*nombre;
					}
					else if (type==5 || type==6) {
						puissance[h] += 2*nombre;
						puissancereel[h] += 2*nombre;
						if (type==6) puissanceSA += 2*nombre;
					}
					else if (type==7) {
						puissance[h] += 4*nombre;
					}
					else if (type==8 || type==9) {
						puissance[h] += 4*nombre;
						puissancereel[h] += 4*nombre;
					}
				}
				if (h==0 || Math.round(etat[1])==Math.round(etat[2]) || etat[2]==-1)
					peffectif_av = Math.round(etat[h]*puissance[h]/10)/10;
				else if (etat[1] != etat[2]) {
					p1 = etat[1]*(puissance[h]-puissanceSA)+etat[2]*puissanceSA;
					p2 = etat[2]*puissance[h];
					mini = Math.round(Math.min(p1,p2)/10)/10;
					maxi = Math.round(Math.max(p1,p2)/10)/10;
					peffectif_av = mini + ' <> ' + maxi;
				}
				else
					peffectif_av = '?';
					
				if (puissance[h]>0)
					divs_bloc[i].innerHTML = '<h1>Puissance : '+puissance[h]+'&nbsp;&nbsp;|&nbsp;&nbsp;P. réel : '+puissancereel[h]+'&nbsp;&nbsp;|&nbsp;&nbsp;P. effectif : '+peffectif_av+'</h1>'+divs_bloc[i].innerHTML;
				else
					divs_bloc[i].innerHTML = '<h1>Puissance : '+puissance[h]+'</h1>'+divs_bloc[i].innerHTML;
				
				
				h++;
			}
			else if (divs_bloc[i].childNodes[1]) {
				if(j==2) j++;
				temp= divs_bloc[i].childNodes[1].textContent.split(' ');
				etat[j]=temp[1];
				j++;
			}
		}
		for (var h=0;h<2;h++) {
			if (h==0 || etat[4]==etat[5] || etat[2]==-1)
				peffectif_ap = Math.round(etat[h+3]*puissance[h]/10)/10;
			else if (etat[4] != etat[5]) {
					p1 = etat[4]*(puissance[h]-puissanceSA)+etat[5]*puissanceSA;
					p2 = etat[5]*puissance[h];
					mini = Math.round(Math.min(p1,p2)/10)/10;
					maxi = Math.round(Math.max(p1,p2)/10)/10;
					peffectif_ap = mini + ' <> ' + maxi;
				}
			else
				peffectif_ap = '?';
		
			div_bod.innerHTML += '<div class="bloc"><h1><s>P. effectif : '+peffectif_ap+'</s></h1></div>';
		}
	}
}
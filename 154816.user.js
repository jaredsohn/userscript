// ==UserScript==
// @name        Kra v6 - Compact (Commerces)
// @namespace    
// @include     http://www.kraland.org*
// @version     2.201
// @UpdateVersion 16
// @downloadURL http://userscripts.org/scripts/source/154816.user.js
// @updateURL   http://userscripts.org.nyud.net/scripts/source/154816.meta.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @icon		http://www.kramages.org/2/star.gif
// @grant       GM_addStyle
// ==/UserScript==

if(jQuery.type(jQuery('li.on').find('a').html()) != "undefined" && jQuery('li.on').find('a').html().substr(0,3) == "Se " && jQuery.type(jQuery('#mapname').html()) == "undefined"){

	jQuery('div.right-frame').find('table').attr('id','boutique');

	// Feuille de style
	GM_addStyle("th.thb, th.ths{text-transform:capitalize}");
	GM_addStyle("#boutique {width:50%;}");
	jQuery('#boutique').attr('style','');
	
	GM_addStyle(".itemV6 {padding:0 3px;background:white;box-shadow:2px 2px 5px gray; font-size:10px; text-decoration:none!important; color:black!important; border-radius:5px; margin:1px; margin-right:2px; display:inline-block; border:1px solid gray}");
	
	GM_addStyle(".itemV6 img {border-radius:inherit}");
	GM_addStyle(".red {background:rgba(255,0,0,0.4)}");
	GM_addStyle(".green {background:rgba(0,200,0,0.3)}");
	GM_addStyle(".orange {background:rgba(255,150,0,0.4)}");
	
	if(jQuery('head').find('link').first().attr('href').substr(3,3) == "/4/"){
		//Theme Moderne	
		GM_addStyle("#boutique {text-align:center;background:rgba(0,0,0,0.2);border-radius:15px;margin-bottom:10px}");
		GM_addStyle("#boutique td:last-child {border:none}");
	} else {
		GM_addStyle("#boutique {text-align:center;background:white;border-radius:15px;margin-bottom:10px}");
	}
		
	
	jQuery('#boutique').find('tr').each(function(){
			
		if (jQuery.type(jQuery(this).find('th.thb').html()) != "undefined" || jQuery.type(jQuery(this).find('th.ths').html()) != "undefined" ) {
			// Création d'une entête rouge
			tr = document.createElement('tr');
			th = jQuery(this).find('th').first();
			
			jQuery(tr).append(th);

			tab_texte = jQuery(th).text().toLowerCase().split(' ');

			if(tab_texte[0].length >1 && jQuery.inArray('(impôt',tab_texte)!= -1 ){
					j = jQuery.inArray('(impôt',tab_texte);
					jQuery(th).html('');
					for(i=0;i<j;i++){
						jQuery(th).append(tab_texte[i]+' ');
					}
			} else {
				jQuery(th).html(jQuery(th).html().toLowerCase());
			}
			jQuery('#boutique').append(tr);
			tr = document.createElement('tr');
			td = document.createElement('td');
			
			jQuery(tr).append(td);
			jQuery('#boutique').append(tr);
		
		} else if (jQuery.type(jQuery(this).find('th[colspan=3]').html()) != "undefined" && jQuery.type(jQuery(this).find('th[colspan=3]').html()) != "&nbsp;") {
		// Création d'une entête saumon
			tr = document.createElement('tr');
			th = jQuery(this).find('th');
			jQuery(tr).append(th);
			tab_texte = jQuery(th).text().split(' ');
			jQuery(th).text(tab_texte[0]+' '+tab_texte[1]);

		} else if (jQuery.type(jQuery(this).find('td[colspan=3]').html()) != "undefined") {
			tr = document.createElement('tr');
			td = document.createElement('td');
			jQuery(tr).append(td);
			
			if(jQuery.type(jQuery(this).find('div.c').html()) == "undefined" ){
				// Ordres spécifiques, pouvoirs spéciaux
				lien = jQuery(this).find('a');
				jQuery(td).append(lien);
			} else {
				// état du bâtiment
				tab_pdb = jQuery(this).find('a').html().split(' ');
				tab_pdb = tab_pdb[0].split('/');
				
				if(tab_pdb[0] >= tab_pdb[1]*0.75) {
					jQuery(this).find('a').css({color:'green'});
				} else if(tab_pdb[0] >= tab_pdb[1]*0.50) {
					jQuery(this).find('a').css({background:'gold',color:'black'});
				} else if(tab_pdb[0] >= tab_pdb[1]*0.25) {
					jQuery(this).find('a').css({color:'orange'});
				} else {
					jQuery(this).find('a').css({color:'red'});
				}
				jQuery(td).append(jQuery(this).find('a'));
				
			}
			jQuery('#boutique').append(tr);
		
		} else if (jQuery.type(jQuery(this).find('td.tdb').html()) != "undefined") {
			td = jQuery('#boutique').find('td').last();
			picto = jQuery(this).find('td.tdbc').first().find('img');
			lien = jQuery(this).find('td.tdb').find('a');
			nom = jQuery(lien).text();
						
			clone = jQuery(this).find('td.tdb').clone();
			clone_quantite = clone.clone();
			jQuery(clone_quantite).find('a').remove();
			jQuery(clone_quantite).find('p').remove();
				
			quantite = jQuery(clone_quantite).text();
			p_quantite = document.createElement('p');
			jQuery(p_quantite).append(quantite);



			p_prix = document.createElement('p');
			jQuery(p_prix).html(' '+jQuery(this).find('td.tdbc').last().find('p').first().text());
	
			if(lien.attr('class') == 'text-bold'){
				jQuery(p_quantite).attr('class','text-bold');
				jQuery(lien).attr('class','itemV6 green');
			} else {
				jQuery(lien).attr('class','itemV6');
			}
	
			jQuery(lien).attr('title',nom);
			
			jQuery(picto).attr('alt',nom);
			

			if (nom !== "Caisse") {
				if(quantite.trim().substr(0,5) == "(0/0)" ){
				} else if( quantite=="" || jQuery(p_prix).html().trim() == "-"){
					// Matériel au sol, tels les véhicules
					jQuery(lien).html(picto);
					jQuery(td).append(lien);
				} else {
					if(quantite.trim().substr(1,1) == "0"){
						// En cas de stocks vides, mais productible, le fond est orange
						if(jQuery(lien).attr('class') != 'itemV6 green'){
							jQuery(lien).attr('class','itemV6 red');
						} else {
							jQuery(lien).attr('class','itemV6 orange');
						}
					}
					jQuery(lien).html(p_quantite);
					jQuery(lien).append(picto);
					jQuery(lien).append(p_prix);
					jQuery(td).append(lien);
				}
			} else {
				jQuery(lien).html(picto);
				jQuery(picto).css({verticalAlign:'middle'});
				jQuery(lien).append(quantite);
				jQuery(td).append(lien);
			}
		}
		jQuery(this).remove();
	});
	// Nettoyage des lignes inutiles
	jQuery('#boutique').find('td').each(function(){
		if(jQuery(this).html() == ""){
			jQuery(this).parent().remove();
		}
	});
}


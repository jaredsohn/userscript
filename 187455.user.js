// ==UserScript==
// @name        	DC - Date
// @namespace   	DreadCast
// @include     	http://www.dreadcast.net/Main
// @grant       	none
// @author 			Ianouf
// @date 			07/01/2014
// @version 		1.0
// @description 	Affichage de la date grégorienne et DCienne
// @compat 			Firefox, Chrome
// @require      	http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

jQuery.noConflict();

jQuery(document).ready(function() {
	//Affichage de la date:
	jQuery('#bandeau ul.menus').eq(0)
		.prepend('<li id="affichageDateDC" class="couleur5" ></li>'
				+'<li class="separator"></li>'
				+'<li id="affichageDate" class="couleur5" ></li>'
				+'<li class="separator"></li>');
	
	setInterval(function(){
		var d = new Date();
		var thedate = d.toLocaleString();
		
		day = d.getDate(); // jour 1 - 31
		month = d.getMonth()+1; //mois 1-12
		year = d.getYear()-100; // année 00-99 (donc 2000 a 2099)

		dchep = Math.floor(day / 7)+1; //heptade 
		dcday = (day%7);              //jour de l'heptade 
		dcyear = 70+(year*12)+month;   //année, basé sur le fais que janvier 2000 est l'an 70 de DC.
		
		//le jour 0 est plutot le dernier jour de l'heptade précédente!
        	if(dcday == 0){
            		dchep--;
            		dcday=7;
        	}
        
		dcddate = dcday+'/'+dcyear+'.'+dchep;
		
		jQuery('#affichageDate').html(thedate);
		jQuery('#affichageDateDC').html(dcddate);
	},1000);
});
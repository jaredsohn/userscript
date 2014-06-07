// ==UserScript==
// @name			Loteries - autoplay
// @include			http://www.cmonjour.com/loterie-du-koodpo.php
// @include			http://www.lotoprestige.com/
// @include			http://www.lotoprestige.com/play
// @include			http://www.lotoprestige.com/gameover
// @include			http://www.lotoprestige.com/static/submit
// @include			http://www.kalifoo.fr/*
// @include			http://www.cadowin.com/*
// @include			http://www.butineo.fr/
// @run-at			document-end
// @grant			none
// @require			http://code.jquery.com/jquery-1.8.3.min.js
// @version			1.3
// ==/UserScript==


var favorites = {
	'global'	: [2, 4, 7, 13, 21, 42],
	'koodpo'	: [2, 4, 7, 13, 21, 42, 49],
	'cadowin'	: [2, 4, 7, 13, 21],
};

var loteries = {
	'cmonjour' : {
		'url'	: "http://www.cmonjour.com/loterie-du-koodpo.php"
	},
	'lotoprestige' : {
		'url'	: "http://www.lotoprestige.com/play"
	},
	'kalifoo' : {
		'url'	: "http://www.kalifoo.fr/loterie.php"
	},
	'cadowin' : {
		'url'	: "http://www.cadowin.com/grille.php"
	},
	'butineo' : {
		'url'	: "http://www.butineo.fr"
	}
};

/**
 * Retourne le nom du domaine courant
 */
function Get_Host()
{
	var host_name	= window.location.hostname;
	return window.location.hostname.replace('http://', '').replace('www.', '').replace('.fr', '').replace('fr.', '').replace('.com', '');
}

/**
 * Redirige vers la loterie suivante
 */
function Go_To_Next_Loterie()
{
	var host		= Get_Host();

	var current_loterie_found = false;
	var next_loterie_url = '';
	for (c_host in loteries)
	{
		if (current_loterie_found == true)
		{
			next_loterie_url = loteries[c_host]['url'];
			break;
		}
		if (c_host == host)
		{
			current_loterie_found = true;
		}
	}

	if (next_loterie_url != '')
	{
		window.location.href = next_loterie_url;
	}
}

/**
 * joue automatiquement
 * 
 * @param	string	play_type	Type de jeu : random|favorites
 */
function Autoplay(play_type)
{
	var url			= window.location.href;
	var host		= Get_Host()

	if (host == 'cmonjour')
	{
		if (url.match(/loterie-du-koodpo.php/))
		{
			if ($("form[name='loginForm'] input.ok").length == 0) // Seulement si connecté
			{
				/* Sélection des numéros */
				if (play_type == 'random')
				{
					$("div#tools a.grandom").click();
				}
				else if (play_type == 'favorites')
				{
					for (var index in favorites['koodpo'])
					{
						$("td#Item" + favorites['koodpo'][index] + ".gridItem").click();
					}
				}
	
				if ($("form#form_Banners").length > 0)
				{
					/* Validation */
					$("form#form_Banners div.banniere:first").click();
					$("div.nocoregistration input#noanswer").click();
					$("form#lotteryform input.valider").click();
				}
				else
				{
					Go_To_Next_Loterie();
				}
			}
			else
			{
				window.setTimeout(
					function(){
						if ($("input#username").val() != '' && $("input#username").val() != '')
						{
							$("form[name='loginForm'] input.ok").click();
							// redirection
							window.location.href = "#";
						}
					},
					2000
				);
			}
		}
	}
	else if (host == 'lotoprestige')
	{
		if ($("form#user-login-form input#edit-submit-1").length > 0) // Non connecté
		{
			window.setTimeout(
				function(){
					if ($("input#edit-name-1").val() != '' && $("input#edit-pass-1").val() != '')
					{
						$("form#user-login-form input#edit-submit-1").click();
					}
				},
				2000
			);
		}
		
		if (url.match(/play/))
		{
			/* Sélection des numéros */
			if (play_type == 'random')
			{
				random();
			}
			else if (play_type == 'favorites')
			{
				for (var index in favorites['global'])
				{
					set_num(favorites['global'][index]);
				}
			}
			
			$("div.bannersplay a:first").click();
			// redirection
			//window.location.href = "/play";
		}
		else if (url.match(/submit/))
		{
			// redirection
			window.open("/play");
//			window.location.href = "/play";

			var max_delay		= 10000; // 10s
			var delay			= 500; // 0.5s
			var pasted_delay	= 0;
			var interval_banner = window.setInterval(
				function() {
					if (pasted_delay > max_delay)
					{
						window.clearInterval(interval_banner);
					}
	
					var back_button = $("div#blacklink a");
					if (back_button.length > 0)
					{
						window.clearInterval(interval_banner);
						back_button.click();
					}
					pasted_delay += delay;
				},
				delay
			);
		}
		else if (url.match(/gameover/))
		{
			Go_To_Next_Loterie();

			window.clearTimeout();
			window.setTimeout( // execution auto après qq secondes pour charger tout le js
				function() {
					$("#appnext_close_button").click();
				},
				2000 // 2s
			);
		}
	}
	else if (host == 'kalifoo')
	{
		if (url.match(/loterie.php/) || url.match(/grille-verte.php/))
		{
			// Fermeture des fenetres de pub
			window.clearTimeout();
			window.setTimeout( // execution auto après qq secondes pour charger tout le js
				function() {
//					$("div.dojoxDialogCloseIcon").click();
				},
				2000 // 2s
			);


			window.clearTimeout();
			window.setTimeout( // execution auto après qq secondes pour charger tout le js
				function() {
					/* Sélection des numéros */
					if (play_type == 'random')
					{
						choixAutomatique();
					}
					else if (play_type == 'favorites')
					{
						for (var index in favorites['global'])
						{
							caseSelectionnee(favorites['global'][index]);
						}
					} 

//					$("div#contenu_validation div#cadre p img:first").click();
//					var fenetre_validation = window.open('/loterie_validation.php', 'fenetre_validation', 'left=0,top=0, width=410, height=470, scrollbars=0, resizable=0, toolbar=0, location=0, menubar=0, status=0, directories=0');
//					fenetre_validation.close();
// 					$("form[name='FLI_coregistration'] input[type='radio'][value='non'], form[name='FLI_coregistration'] input[type='radio'][value='no']").attr('checked', true);
// 					$("form[name='FLI_coregistration'] div.cadre img").each(function(){
// 						if ($(this).attr('src').match(/bouton_valid/))
// 						{
// 							$(this).click();
// 						}
// 					}):
				},
				2000 // 2s
			);
//			window.location.href = "/loterie_validation.php";
		}
		else if (url.match(/loterie_validation.php/))
		{
			// redirection
			// window.location.href = "/loterie.php";
			var max_delay		= 10000; // 10s
			var delay			= 500; // 0.5s
			var pasted_delay	= 0;
			var interval_banner = window.setInterval(
				function() {
					if (pasted_delay > max_delay)
					{
						window.clearInterval(interval_banner);
					}

					var button = $("div#valide img:first");
					if (button.length > 0)
					{
						window.clearInterval(interval_banner);
						button.click();
					}
					pasted_delay += delay;
				},
				delay
			);
		}
		else if (url.match(/jeux-gratuits.php/))
		{
			if (!url.match(/erreur/))
			{
				// redirection
				window.location.href = "/loterie.php";
			}
			else
			{
				Go_To_Next_Loterie();
			}
		}
		else if (url.match(/booster-jeux.php/))
		{
			Go_To_Next_Loterie();
		}
	}
	else if (host == 'cadowin')
	{
		window.clearTimeout();
		window.setTimeout( // execution auto après qq secondes pour charger tout le js
			function() {
				var login_button = $("form[name='connex_form'] input[type='image'][name='ok2']");
				if (login_button.length > 0)
				{
					login_button.click();
				}
			},
			2000 // 2s
		);

		if (url.match(/grille.php/))
		{
			if (true)
			{
				/* Sélection des numéros */
				if (play_type == 'random')
				{
					quickPicks();
				}
				else if (play_type == 'favorites')
				{
					for (var index in favorites['cadowin'])
					{
						setNumber('number' + (favorites['cadowin'][index] < 10 ? '0' : '') + favorites['cadowin'][index]);
					}
				}

//				sub_form(1);
			}
			else
			{
				Go_To_Next_Loterie();
			}
		}
		else if (url.match(/result.php/))
		{
			window.location.href = "/grille.php";
		}
	}
}

$(document).ready(function(){
//	Autoplay('favorites');
	Autoplay('random');
});

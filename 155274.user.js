// ==UserScript==
// @name				Pas interessé
// @namespace		http://www.butineo.fr/*
// @description	Coche toutes les offres avec "Non merci"

// @include		http://www.butineo.fr/*

// @exclude		www.facebook.com
// @exclude		http://www.butineo.fr/mon-compte
// @exclude		http://www.butineo.fr/logon/popin
// @exclude		http://www.butineo.fr/revenez-demain
// @exclude		http://www.butineo.fr/parrainage?*
// @exclude		http://www.luckysurf.fr/*
// @exclude		http://fr.bananalotto.com/*
// @exclude		http://www.kingoloto.com/*

// @run-at		document-end
// @grant		none
// @require		http://code.jquery.com/jquery-1.6.1.min.js
// @require		http://code.jquery.com/jquery-1.8.3.min.js
// @version     2
// ==/UserScript==

/*
 * Vérifie si la page contient des radios contenant les labels "Oui" et "Non"
 */
function Has_Radios()
{
	var has_radios = false;
	$("label").each(function(){ // cherche tout les labels
		if (
			($(this).html().match(/Oui/) || $(this).html().match(/Non/))
			&& $("#" + $(this).attr('for') + "[type='radio']")
		)
		{
			has_radios = true;
		}
	});
	return has_radios;
}

/*
 * Coche/Décoche tout les radios souhaités ("Oui" ou "Non")
 */
function Valid_All(accept)
{
	if (typeof accept == 'undefined')
	{
		accept = false;
	}

	// Recherche des labels comprenant le texte "Oui"
	$("label").each(function(){
		var check_input = (
			(accept == true && $(this).html().match(/Oui/))
			|| (accept == false && $(this).html().match(/Non/))
		);
		$("#" + $(this).attr('for')).attr('checked', check_input);
	});

	// Validation
	$("form input[type='submit']").click();
}

$(document).ready(function(){
	if (Has_Radios() == true)
	{
		var buttons_all = $("<div style='width:100%;text-align:center;'></div>")
			.append(
				/* Tout accepter */
				$("<input type='button' id='id_accept_all' value='Tout accepter'>").click(function(){
					Valid_All(true);
				})
			).append(
				/* Tout refuser */
				$("<input type='button' id='id_deny_all' value='Tout refuser'>").click(function(){
					Valid_All(false);
				})
			).append(
				"<br><br>"
		);
//		$("body").prepend(buttons_all);
		
		// Tout refuser automatique
//		Valid_All(false);
	}

	if (window.location.hostname == "www.butineo.fr")
	{
		if (window.location.href.match(/www.butineo.fr\/$/)) // Page www.butineo.fr/
		{
			if ($("div.box ul.account-links a[href='/mon-compte']").length > 0) // Connecté
			{
				// Redirection vers la première url pour participer
				window.location.href = $("div#content div.slide div.holder a.button-participate:first").attr('href');
			}
			else
			{
				// Connexion
//				$("div.content-header ul.links a.openFancybox").click();
//				window.location.href = "/logon/popin";
			}
		}

		if (window.location.href.match(/concours-termine/))
		{
			// récupération de l'identifiant du concours terminé
			var link_current_concours = window.location.href;
			var link_current_concours_start_pos = link_current_concours.lastIndexOf('/');
			if (link_current_concours_start_pos > 0)
			{
				var id_link_current_concours = link_current_concours.substr(link_current_concours_start_pos + 1);

				// Redirection vers la première url valide pour participer
				$("div.nav-box div.nav-box-holder nav ul#nav.scaling-active li div.drop div.lists div.lists-holder ul li a").each(function(){
					// récupération de l'identifiant du concours
					var link_concours = $(this).attr('href');
					var link_concours_start_pos = link_concours.lastIndexOf('-');
					if (link_concours_start_pos > 0)
					{
						var id_link_concours = link_concours.substr(link_concours_start_pos + 1);
						if (id_link_concours != id_link_current_concours)
						{
							window.location.href = link_concours;
						}
					}
				});
			}
		}

		if (
			!window.location.href.match(/mon-compte/)
			&& !window.location.href.match(/logon\/popin/)
			&& !window.location.href.match(/revenez-demain/)
			&& !window.location.href.match(/parrainage/)
		)
		{
			// Validation
			$("form input[type='submit']").click();

			// lien vers le concours suivant
			var a_link = $("div.entry-content div.button-box a:first");
			if (a_link.length > 0)
			{
				// Choisissez parmi vos lots préférés :
				// 1er choix automatique
				//$("div.entry-content div.button-box a:first").click(); 
				if (a_link.attr('href') != 'javascript:;')
				{
					// redirection
					window.location.href = a_link.attr('href');
				}
				else
				{
					// gestion du choix du bonus
					$("#PrizeIdSelected").val(a_link.attr('id').replace("bt-", ""));
					$('#form-bonus').submit();
					return;
				}
			}
		}
	}
});
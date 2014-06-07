// ==UserScript==
// @name        Mediastay loteries - autoplay
// @namespace   http://www.luckysurf.fr/*
// @include     http://www.luckysurf.fr/subscribe.html*
// @include     http://www.luckysurf.fr/play.php
// @include     http://www.luckysurf.fr/tracker.php?*
// @include     http://www.luckysurf.fr/dmbp.php*
// @include     http://www.luckysurf.fr/nomore.php
// @include     http://www.luckysurf.fr/tellAFriend.html
// @include     http://www.kingoloto.com/subscribe.html*
// @include     http://www.kingoloto.com/play.php
// @include     http://www.kingoloto.com/tracker.php?*
// @include     http://www.kingoloto.com/dmbp.php*
// @include     http://www.kingoloto.com/nomore.php
// @include     http://www.kingoloto.com/tellAFriend.html
// @include     http://fr.bananalotto.com/subscribe.html*
// @include     http://fr.bananalotto.com/play.php
// @include     http://fr.bananalotto.com/tracker.php?*
// @include     http://fr.bananalotto.com/dmbp.php*
// @include     http://fr.bananalotto.com/nomore.php
// @include     http://fr.bananalotto.com/tellAFriend.html

// @include     http://mdsmatch.mediastay.net/cdv/*
// @include     http://track.mdsmatch.com/*
// @include     http://tracker.*
// @include     http://www.3suisses.fr/*ad-validation*
// @include     http://www1.3suisses.fr/*ad-validation*
// @include     *fr.minisite.*
// @include     http://www.spartoo.com/*
// @include		http://www.big49.com/*
// @include		http://www.jeudeloterie.cashpot.fr/*
// @include		http://jeu.turbo.fr/*
// @include		http://event.webcarcenter.com/*
// @include		http://www.20minutes.fr/*
// @include		*ad-validation*

// @run-at		document-end
// @grant		none
// @require		http://code.jquery.com/jquery-1.8.3.min.js
// @version     1.3
// ==/UserScript==


var favorites = [2, 4, 7, 13, 21, 42];

var loteries = {
	'luckysurf' : {
		'url'	: "http://www.luckysurf.fr/play.php"
	},
	'kingoloto' : {
		'url'	: "http://www.kingoloto.com/play.php"
	},
	'bananalotto' : {
		'url'	: "http://fr.bananalotto.com/play.php"
	},
	'cmonjour' : {
		'url'	: "http://www.cmonjour.com/loterie-du-koodpo.php"
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
	var host		= Get_Host();

	if (host == 'kingoloto')
	{
		/* le js ne marche pas en jouant mes favoris, donc je jouerais en mode random pour kingoloto */
		play_type = 'random';
	}

	$("a#fancybox-close").click();
	if (url.match(/subscribe/))
	{
		window.setTimeout(
			function(){
				if ($("input#connect_email").val() != '' && $("input#connect_pass").val() != '')
				{
					$("input.login_valid").click();
				}
			},
			2000
		);
	}
	else if (url.match(/nomore.php/))
	{
		// fin des actions

		//redirection vers la loterie suivante
		Go_To_Next_Loterie();
	}
	else if (url.match(/play.php/))
	{
		/* Sélection des numéros */
		if (play_type == 'random')
		{
			$("div#gridBtn a.random").click();
		}
		else if (play_type == 'favorites')
		{
			for (var index in favorites)
			{
				var number = favorites[index];
				if (number < 10)
				{
					number  = '0' + number;
				}

				$("img#number" + number).parents("a").click();
			}
		}

		/* Validation */
		var max_delay		= 10000; // 10s
		var delay			= 500; // 0.5s
		var pasted_delay	= 0;
		var interval_banner = window.setInterval(
			function() {
				if (pasted_delay > max_delay)
				{
					window.clearInterval(interval_banner);
				}

				var banner = $("div#cdvBanners div.cdvBanner a:first");
				if (banner.length > 0)
				{
					window.clearInterval(interval_banner);
					banner.click();
				}
				pasted_delay += delay;
			},
			delay
		);
	}
	else
	{
		// si une autre url qu'une loterie est affichée, on redirige vers www.luckysurf.fr qui redirigera vers la loterie courante

		// redirection
		window.location.href = "http://www.luckysurf.fr/play.php";
	}
}

$(document).ready(function(){
//	Autoplay('favorites');
	Autoplay('random');

	window.setTimeout(
		function(){
			if (window.location.href.match(/play.php/))
			{
				window.location.href = window.location.href;
			}
		},
		5000 // rafraichissement après 5s si rien ne s'est passé
	);
});

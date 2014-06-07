// ==UserScript==
// @name           AlloCine - Critiques d'un membre
// @namespace   http://userscripts.org./users/129016
// @description  Ajoute un lien près de l'avatar d'un membre pour voir toutes ses critiques.
// @include        http://www.allocine.fr/film/fichefilm_*
// @include        http://www.allocine.fr/film/critiquepublic_gen_*
// ==/UserScript==

	//----------------------------------------------------------------------------------------
	// Allocine, utilise JQuery, on attend que le script soit chargé avant de modifier
	// la page.
	//----------------------------------------------------------------------------------------
    function GM_wait()
	{
		if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
		else { $ = unsafeWindow.jQuery; JQueryReady(); }
    }
    GM_wait();

	//----------------------------------------------------------------------------------------
	// Traitements a effectuer lorsque JQuery est prêt.
	//----------------------------------------------------------------------------------------
    function JQueryReady()
	{		
		$(".datablock.member .functionsbar.fs11").each(
			function( intIndex )
			{
				// Récupère l'id de l'utilisateur
				var userID = $("span.community_friendbuttonlink",this).attr("userid");
				// Ajouter un lien vers les critiques de cet utilisateur
				$("ul.functionsmenu",this).append('<li class="vseparatorl"><a href="http://www.allocine.fr/communaute/membre/critiques_membre_gen_userid=' + userID + '.html"><img src="http://sites.google.com/site/humerde/_/rsrc/1264533845819/allo-les-faignasse/film_edit.png" Alt="Critiques" /></li>');
			}
		);
    }
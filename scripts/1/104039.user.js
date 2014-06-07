// ==UserScript==
// @name           Nolife Online - Navigation entre les vidéos
// @namespace      localhost
// @description    Ajoute des boutons "Vidéo précédente" et "Vidéo suivante" lors du visionnage d'une vidéo sur Nolife Online
// @include        http://online.nolife-tv.com/index.php?*
// ==/UserScript==

jQuery = unsafeWindow.jQuery;

var current = jQuery('._current');
if(current.length > 0)
{
	
	var lienP = jQuery('<a>Vidéo précédente</a>');
	var lienS = jQuery('<a>Vidéo suivante</a>');
	
	var precedente = current.next();
	var suivante = current.prev();
	
	var urlP = precedente.children().attr('href');
	if(urlP != undefined)
	{
		lienP.attr('href', urlP);
		
		jQuery('#tags').prepend('<br />').prepend(lienP);
	}
	else
	{
		var autrePage = jQuery('.span_pagination_current').eq(0).parent().next();
		if(autrePage.length > 0)
		{
			var url = "http://online.nolife-tv.com/" + autrePage.attr('href');
			
			jQuery.get(url, function(data){		
					var lien = jQuery('.ligne_video', data).first().children().attr('href');
					lienP.attr('href', lien);
					 jQuery('#tags').prepend('<br />').prepend(lienP);
			});
		}
	}
	
	var urlS = suivante.children().attr('href');
	if(urlS != undefined)
	{
		lienS.attr('href', urlS);
		
		jQuery('#tags').prepend('<br />').prepend(lienS);
	}
	else
	{
		var autrePage = jQuery('.span_pagination_current').eq(0).parent().prev();
		if(autrePage.length > 0)
		{
			var url = "http://online.nolife-tv.com/" + autrePage.attr('href');
			
			jQuery.get(url, function(data){		
					var lien = jQuery('.ligne_video', data).last().children().attr('href');
					lienS.attr('href', lien);
					 jQuery('#tags').prepend('<br />').prepend(lienS);
			});
		}
	}
}
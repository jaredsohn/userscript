// ==UserScript==
// @name           E&R AutoLoad Comments
// @namespace      E&R
// @include        http://www.egaliteetreconciliation.fr/*
// ==/UserScript==

if ($('.affcomprec').is(":visible"))
{
	myshowpreccom(id_article);
}
function myshowpreccom(idart){
	$.get('spip.php?page=inc-forum-plus-anciens&id_article='+idart,
		function(data){ $('#zoneforums').html(data);
						$('.affcomprec').hide()
		}
	)
}

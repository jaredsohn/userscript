// ----------------------------------------------------------
// ==UserScript==
// @name           Modification Menu
// @version        1.0
// @author         ExTaza?! & www.webidev.pl
// @include        http://pl*.plemiona.pl/game.php*
// ==/UserScript==
// --------------------------------------------------------------// 


link = jQuery(jQuery('.menu-item')[1]).html();
jQuery(jQuery('#menu_row2_village')).html(link+jQuery('#menu_row2_village').html());

jQuery(jQuery('.menu-item')[3]).after(jQuery(jQuery('.menu-item')[7])); jQuery(jQuery('.menu-item')[7]).remove();

jQuery(jQuery('.menu-item')[1]).remove();
/*
jQuery('#rank_rank, #rank_points').css('color','#000');

$(jQuery('.rank')[0]).css('color','#000');

$(jQuery('.bg')[0]).css('color','#000');

$(jQuery('.grey')[0]).css('color','#000');
*/ // JEŚLI UŻYWASZ WŁASNEGO STYLU CSS, odkomentuj to, RANKING, staje się czytelny.

jQuery('.ranking-top3')[0].remove(); // USUWA TOP3 z rankingu
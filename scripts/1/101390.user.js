// ==UserScript==
// @name           Close/Open All Spoilers
// @version        1.0
// @namespace      wtf
// @description    Close/Open Spoliers
// @author         NAT
// @include        http://*ulanovka.ru/*
// ==/UserScript==

function CloseAllSP() {
	jQuery('div.spoiler-body').each(function(n,element) { 
  	if (jQuery(element).prev().hasClass('unfolded')) 
	{
		jQuery(element).slideUp('fast');
		jQuery(element).next().slideUp('fast');
		jQuery(element).prev().toggleClass('unfolded'); 
	}});
}

function OpenAllSP() {
	jQuery('div.spoiler-body').each(function(n,element) { 
	
	if (jQuery(element).hasClass('inited') && !jQuery(element).prev().hasClass('unfolded')) 
	{
		jQuery(element).after('<div class="spoiler-head unfolded clickable" onclick="spHide(jQuery(this));">Закрыть</div>').addClass('inited');
		initImages(jQuery(element));
		
		jQuery(element).prev().toggleClass('unfolded');
		jQuery(element).slideDown('fast');
	}
	
  	if (!jQuery(element).hasClass('inited')) 
	{
		jQuery(element).after('<div class="spoiler-head unfolded clickable" onclick="spHide(jQuery(this));">Закрыть</div>').addClass('inited');
		initImages(jQuery(element));
		
		jQuery(element).prev().toggleClass('unfolded');
		jQuery(element).slideDown('fast');
	}});
}

var el0=document.createElement('script');
el0.innerHTML="jQuery('a.gensmall').each(function(n,element) { if (jQuery(element).attr('title') == 'Линк на это сообщение') \
 {jQuery(element).after(' <a class=\"gensmall\" href=\"javascript:OpenAllSP();\">Развернуть </a> \
 <a class=\"gensmall\" href=\"javascript:CloseAllSP();\">Свернуть спойлеры</a>');}}); \
 " + CloseAllSP.toString() + OpenAllSP.toString();
document.body.insertBefore(el0, document.body.firstChild);

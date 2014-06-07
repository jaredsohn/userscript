// ==UserScript==
// @name           Huffington Post Facebook Link Remover
// @namespace      http://www.huffingtonpost.com/
// @description    Remove Facebook Connect link on HuffingtonPost.com
// @include        http://www.huffingtonpost.com/*
// ==/UserScript==

function kill_links()
{
	adBox = document.getElementById('all_fsocial_buttons');  
	if (adBox) adBox.parentNode.removeChild(adBox);
	adBox = document.getElementById('all_social_buttons');  
	if (adBox) adBox.parentNode.removeChild(adBox);
	adBox = document.getElementById('n_fbconnect_upperleft');  
	if (adBox) adBox.parentNode.removeChild(adBox);
	adBox = document.getElementById('n_fbconnect_lowerright');  
	if (adBox) adBox.parentNode.removeChild(adBox);
	adBox = document.getElementById('footer_fbconnect');  
	if (adBox) adBox.parentNode.removeChild(adBox);
	adBox = document.getElementById('footer_popup_content');  
	if (adBox) adBox.parentNode.removeChild(adBox);
	adBox = document.getElementById('footer_bottom_popup_tr');  
	if (adBox) adBox.parentNode.removeChild(adBox);
	adBox = document.getElementById('footer_content_popup_tr');  
	if (adBox) adBox.parentNode.removeChild(adBox);
	adBox = document.getElementById('footer_top_popup_tr');  
	if (adBox) adBox.parentNode.removeChild(adBox);
	adBox = document.getElementById('bottom_popup_tr');  
	if (adBox) adBox.parentNode.removeChild(adBox);
	adBox = document.getElementById('content_popup_tr');  
	if (adBox) adBox.parentNode.removeChild(adBox);
	adBox = document.getElementById('top_popup_tr');  
	if (adBox) adBox.parentNode.removeChild(adBox);	
	adBox = document.getElementById('popup_content');  
	if (adBox) adBox.parentNode.removeChild(adBox);	
	adBox = document.getElementById('popup_modal');  
	if (adBox) adBox.parentNode.removeChild(adBox);	
}
kill_links();

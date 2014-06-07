// ==UserScript==
// @name           Role - Ignore List
// @namespace      role_ignore_list
// @include        http://www.asso-role.fr/phpBB/viewtopic.php*
// @require			http://code.jquery.com/jquery-1.6.4.min.js
// ==/UserScript==

jQuery('td').each(function(){
	if(jQuery(this).find('b') && jQuery(this).find('b').html() == 'Kookie' ){
		jQuery(this).parent().hide();
	}
});
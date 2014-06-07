// ==UserScript==
// @name       coolsex image direct enter
// @namespace  
// @version    0.1
// @description  coolsex image direct enter get torrent from http://sukebei.nyaa.se/
// @match      http://coolsex.biz/*/*
// @copyright  2012+, You
// ==/UserScript==

jQuery('img[alt="Download Free JAV Mediafire"]').each(function() {
	jQuery(this).parent().attr('href',jQuery(this).attr('src').replace('_thumb',''));
})
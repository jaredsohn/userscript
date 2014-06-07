// ==UserScript==
// @name        Thunderlink for Jira
// @author		Alexey Kartashev <alex@kartashev.me>
// @version		0.2
// @source 		http://kartashev.me/userjs
// @description	Adding direct links to the letters in Thunderbird, derived from the addon Thunderlink (https://addons.mozilla.org/en-us/thunderbird/addon/thunderlink/)
// @include   	http*://jira*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==
jQuery('*:contains("thunderlink")').each(function(){
     if(jQuery(this).children().length < 1) 
          jQuery(this).html( 
               jQuery(this).text().replace(
               			jQuery(this).text(),
               			'<a href="'+jQuery(this).text()+'">'+jQuery(this).text()+'</a>'
               		)
           ) 
});
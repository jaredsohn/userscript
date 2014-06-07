// ==UserScript==
// @name        General(Φασουλάδα)
// @namespace   Φασουλάδα
// @author	Φασουλάδα development team	
// @description	Φασουλάδα development team :)
// @include        http://m*.ikariam.*/index.php?view=embassyGeneralAttacksToAlly&id=*&position=*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

var sa_SoundNotify 	= 'http://www.wav-sounds.com/various/m16.wav';


jQuery(document).ready(function() {

var tet = GM_getValue("final_list", false);

var list = "";

jQuery('.table01 tr.rowRanks').each(function() {

var units = jQuery(this).children('td:nth-child(3)').html();    
var attacker = jQuery(this).children('td:nth-child(4)').children().html(); 
var alliance_member = jQuery(this).children('td:nth-child(5)').children().html(); 
  
list = list+units+"-"+attacker+"-"+alliance_member+"\n";


});


if(tet) {
	if(tet != list) {
		jQuery('body').append("<embed src='"+sa_SoundNotify+"' autostart=true loop=false volume=100 hidden=true>"); 
	}
}


GM_setValue("final_list", list);


    

});
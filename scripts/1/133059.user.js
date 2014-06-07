// ==UserScript==
// @name        General(lkjad
// @namespace   Φασουλάδα
// @author Φασουλάδα development team 
// @description Φασουλάδα development team :)
// @include        http://m*.ikariam.*/index.php?view=embassyGeneralAttacksToAlly&id=*&position=*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require https://raw.github.com/douglascrockford/JSON-js/master/json2.js
// ==/UserScript==

var sa_SoundNotify  = 'http://www.wav-sounds.com/various/m16.wav';

jQuery(document).ready(function() {
 //var old_val = GM_getValue("final_list", false);
 var list = new Array();
 var i = 0;
 
 var table_elements = new Array(3);
 
 jQuery('.table01 tr.rowRanks').each(function() {
  table_elements[0] = jQuery(this).children('td:nth-child(3)').html();   // Units    
  table_elements[1] = jQuery(this).children('td:nth-child(4)').children().html(); // Attacker
  table_elements[2] = jQuery(this).children('td:nth-child(5)').children().html(); // Alliance_Member
  
  // Create the 2D array of data. Each row of the array contains a row of the table
  list[i] = new Array(3);
  for (j=0; j<3; j++) {
   list[i][j] = table_elements[j];
  }
  
  i++;  
 });
 
 // Serialize the array
    var jsonStr = JSON.stringify(list);
        alert(jsonStr);
/*
 if(old_val) {
  if(old_val != list) {
   jQuery('body').append("<embed src='"+sa_SoundNotify+"' autostart=true loop=false volume=100 hidden=true>"); 
  }
 }


 GM_setValue("final_list", list);
 */
});
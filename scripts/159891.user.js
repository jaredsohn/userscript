// ==UserScript==
// @name        Cyberrepublik Multi Fight
// @namespace   CyberrepublikMF
// @include     http://www.cyberrepublik.com/en/battle/*
// @homepage    http://userscripts.org/users/Mertcane
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright   2012, Mertcane (mertcane@gmail.com)
// @version       1
// ==/UserScript==


var battle_id;



var regexi_battle = /var BattleLoopID=(\d*);/;

$('head').html().match(regexi_battle);
battle_id = RegExp.$1;

$('.links').prepend('<a onclick="mult_fight();" id="Mertcane-Fight" href="javascript:void(0)">Fight! </a>');



document.getElementById('Mertcane-Fight').addEventListener('click', mult_fight, false);


function mult_fight(){


var arr = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
jQuery.each(arr, function(index, value) {
       console.log(this);
	   	GM_xmlhttpRequest({
  method: "POST",
  url: "http://www.cyberrepublik.com/en/ajax-query",
  data: "action=battle-fight&data="+battle_id,
   headers: {
					"Content-Type": "application/x-www-form-urlencoded",
                    "Referer": "http://www.cyberrepublik.com/en/battle/"+battle_id

                  },
  	onload: function(e) {  }
    
});
       
   });


	
	
}
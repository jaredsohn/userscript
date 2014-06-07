// ==UserScript==
// @name           TMU Final Match Result 
// @namespace      *ultra.trophymanager.com/matches*
// @include        *ultra.trophymanager.com/matches*
// @description    Know the score before the end of the match.Script for Ultra.TrophyManager.com
// @version        1.0
// @grant          none
// ==/UserScript==

//Match ID
var MatchId = document.URL.split(".com/")[1].split("/")[1].split("#")[0].split("?")[0];

$.ajax({ 
    type: 'GET', 
    url: 'https://ultra.trophymanager.com/ajax/match.ajax.php', 
    data: { id: MatchId }, 
    dataType: 'json',
    success: function (data) { 
    	var ObjectReport = data.report;
        
        if (ObjectReport == null){
            $(".mv_top").before("<br /><p style='font-family: arial; font-size: 27px;'>Match not started !</p>");
   		} else {
			var size = Object.keys(ObjectReport).length;
			var keys = Object.keys(ObjectReport)[size-1];
			var lastString = data.report[keys][0].chance.text;
    		var tableBefore = lastString.toString().split(' ');
     	
            for (var i = 0; i < tableBefore.length; i++) {	
    			var index = tableBefore[i].indexOf('-');
        		
                if (index > -1) {
           			lastIndex=i;
        		}      
			}  
        
        	$(".mv_top").before("<br /><p style='font-family: arial; font-size: 27px;'>Final Score : <b>" + tableBefore[lastIndex] + "</b></p>");
    	}
   	}
});
           
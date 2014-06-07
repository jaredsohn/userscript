// ==UserScript==
// @name           TM Final Match Result 
// @namespace      *trophymanager.com/matches*
// @include        *trophymanager.com/matches*
// @description    Know the score before the end of the match.Script for TrophyManager.com
// @version        1.0
// @grant          none
// ==/UserScript==

//Match ID
var MatchId = document.URL.split(".com/")[1].split("/")[1].split("#")[0].split("?")[0];

$.ajax({ 
    type: 'GET', 
    url: 'http://trophymanager.com/ajax/match.ajax.php', 
    data: { id: MatchId}, 
    dataType: 'json',
    success: function (data) { 
	//Table Report
	//
    var ObjectReport =data.report;
    if (ObjectReport==null){
    	$('.welcome_text').append("<br></br> <p style='font-family:arial;font-size:27px;'>Match not started !</p>");
     }
    else{
		var size=Object.keys(ObjectReport).length;
		var keys=Object.keys(ObjectReport)[size-1];
		var lastString=data.report[keys][0].chance.text;
		//
    	var tableBefore= lastString.toString().split(' ');
     	for (var i = 0; i < tableBefore.length; i++) {	
    	var index = tableBefore[i].indexOf('-');
        if (index > -1) {
           lastIndex=i;
        	}      
		}  
    	$('.welcome_text').append("<br></br> <p style='font-family:arial;font-size:27px;'>Final Score :</p> <p style='font-family:arial;font-size:27px;'<strong>"+tableBefore[lastIndex]+"</strong></p>");
    }
   }
});
           
// ==UserScript==
// @name           Hasil akhir match TM
// @namespace      *trophymanager.com/matches*
// @include        *trophymanager.com/matches*
// @description    Mengetahui hasil akhir pertandingan di TM
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
    	$('.welcome_text').append("<p align='left' style='font-family:arial;font-size:12px;'>------------------------------------------------------------------- </p> <p align='left' style='font-family:arial;font-size:12px;'>Script ini hanya untuk membantu saja </p> <p align='left' style='font-family:arial;font-size:12px;'>apabila kurang berkenan silahkan Disable saja </p> <b> <p align='left' style='font-family:arial;font-size:17px;'>By Phoenix Slash™ </p> </b> <p align='left' style='font-family:arial;font-size:12px;'>------------------------------------------------------------------- <br></br> <b> <p align='center' style='font-family:arial;font-size:28px;color:yellow;'>Laga Ini Belum Dimulai !!</p> </b>");
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
    	$('.welcome_text').append("<p align='left' style='font-family:arial;font-size:12px;'>------------------------------------------------------------------- </p> <p align='left' style='font-family:arial;font-size:12px;'>Script ini hanya untuk membantu saja </p> <p align='left' style='font-family:arial;font-size:12px;'>apabila kurang berkenan silahkan Disable saja </p> <b> <p align='left' style='font-family:arial;font-size:17px;'>By Phoenix Slash™ </p> </b> <p align='left' style='font-family:arial;font-size:12px;'>------------------------------------------------------------------- <br></br> <b> <p align='center' style='font-family:arial;font-size:28px;color:yellow;'>Hasil Akhir Laga Ini !!</p> </b> <p align='center' style='font-family:arial;font-size:33px;color:yellow;'<b><strong>"+tableBefore[lastIndex]+"</strong></b></p>");
    }
   }
});
           
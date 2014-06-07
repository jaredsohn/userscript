// ==UserScript==
// @name           TM Final Match Result
// @namespace      *trophymanager.com/matches*
// @include        *trophymanager.com/matches*
// @description    لمعرفة نتيجة مباراتك النهائية على تروفى مانجر
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
    	$('.welcome_text').append("<p align='left' style='font-family:arial;font-size:12px;'>------------------------------------------------------------------- </p> <p align='left' style='font-family:arial;font-size:12px;'>هذا السكربت للمساعدة فقط </p> <p align='left' style='font-family:arial;font-size:12px;'>قام بترجمته السيد شندى</p> <b>  <p align='left' style='font-family:arial;font-size:12px;'> Killùa ZöldYk وتعديله من طرف </p> <b>  <b> <p align='left' style='font-family:arial;font-size:17px;'>By Phoenix Slash™ </p> </b> <p align='left' style='font-family:arial;font-size:12px;'>------------------------------------------------------------------- <br></br> <b> <p align='center' style='font-family:arial;font-size:28px;color:yellow;'>!! المباراة لم تبدأ بعد</p> </b>");
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
    	$('.welcome_text').append("<p align='left' style='font-family:arial;font-size:12px;'>------------------------------------------------------------------- </p> <p align='left' style='font-family:arial;font-size:12px;'>هذا السكربت للمساعدة فقط</p> <p align='left' style='font-family:arial;font-size:12px;'> قام بترجمته السيد شندى </p> <b>  <p align='left' style='font-family:arial;font-size:12px;'> Killùa ZöldYk وتعديله من طرف </p> <b> <p align='left' style='font-family:arial;font-size:17px;'>By Phoenix Slash™ </p> </b> <p align='left' style='font-family:arial;font-size:12px;'>------------------------------------------------------------------- <br></br> <b> <p align='center' style='font-family:arial;font-size:28px;color:yellow;'>™ نتيجة المباراة النهائية ™</p> </b> <p align='center' style='font-family:arial;font-size:33px;color:yellow;'<b><strong>"+tableBefore[lastIndex]+"</strong></b></p>");
    }
   }
});
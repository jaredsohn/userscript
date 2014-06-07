// ==UserScript==
// @name           Polslplan
// @namespace      https://plan.polsl.pl/
// @description    Planplosl
// @include        https://plan.polsl.pl/*
// @require		   https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

Date.prototype.getWeek = function (dowOffset) {
    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0;
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset;
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() - 
    (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};
function zwrocStart(dzien){
	switch(dzien){
	case 1:
	  return 33;
	  break;
	case 2:
	  return 129;
	  break;
	case 3:
	  return 225;
	  break;
	case 4:
	  return 321;
	  break;
	case 5:
	  return 417;
	  break;
	default:
	  return -1000;
	}
}
function zwrocNazweDnia(dzien){
	switch(dzien){
	case 1:
	  return "Poniedziałek";
	  break;
	case 2:
	  return "Wtorek";
	  break;
	case 3:
	  return "Środa";
	  break;
	case 4:
	  return "Czwartek";
	  break;
	case 5:
	  return "Piątek";
	  break;
	default:
	  return false;
	}
}
var jq = $.noConflict(true);
jq(function(){
	var schowane = true;
	var now = new Date();
	var parzysty = ((now.getWeek())%2==0) ? true : false;
	var godzina = now.getHours();
	var minuta = now.getMinutes();
	//var roznica_godzin = godzina - 8;
	//var suma_minut = 60*(godzina - 8) + minuta;
	var ile_kwadratow_do_zamalowania = (60*(godzina - 8) + minuta)/15;
	var dzien = now.getDay();
	jq('div:contains(", wyk")').hide();
	jq('div:contains("PI, wyk")').show();
	jq('div:contains("AMiAL, wyk")').show();
	jq('<div id="pnl" style="position: absolute; top: 67px; left: 693px; height: 118px"><input type="button" style="position:absolute" id="shw" value="Pokaż wykłady"></div>').insertAfter('#weekBrowser');
	jq('#shw').click(function(){
		if(schowane == true){ 
			jq('div:contains(", wyk")').slideDown("slow");
			schowane = false;
		}
		else{
			jq('div:contains(", wyk"):not(:contains("PI, wyk")):not(:contains("AMiAL, wyk"))').slideUp("slow");
			schowane = true;
		}
		});
	jq('.cd:contains("'+zwrocNazweDnia(dzien)+'")').css("background-color","#AFAFAF");
	if(parzysty==true){
		jq(".cd:contains('P'):not(:contains('Pi')):not(:contains('Pon'))").css("background-color","#AFAFAF");
		for(i=zwrocStart(dzien); i<zwrocStart(dzien)+ile_kwadratow_do_zamalowania; i++){
			jq("div[id=1-P-"+i+"]").css("background-color","#AFAFAF");
			jq("div[id=1-P-"+i+"]").css("border","1px solid #000");
			jq("div[id=1-P-"+i+"]").css("z-index","50"); 
			jq("div[id=1-P-"+i+"]").css("opacity","0.5");
			jq("div[id=1-P-"+i+"]").css("pointer-events","none");
		}
	}
	else{
		jq(".cd:contains('N')").css("background-color","#AFAFAF");
		for(i=zwrocStart(dzien); i<zwrocStart(dzien)+ile_kwadratow_do_zamalowania; i++){
			jq("div[id=1-N-"+i+"]").css("background-color","#AFAFAF");
			jq("div[id=1-N-"+i+"]").css("border","1px solid #000");
			jq("div[id=1-N-"+i+"]").css("z-index","50"); //
			jq("div[id=1-N-"+i+"]").css("opacity","0.5");
			jq("div[id=1-N-"+i+"]").css("pointer-events","none");
		}
	}
});
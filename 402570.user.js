// ==UserScript==
// @name           PolslplanNew
// @namespace      https://plan.polsl.pl/
// @description    PlanploslNew
// @include        https://plan.polsl.pl/*
// @require		   https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
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
	
	
	var obiekty = new Array();
    var stringobiektow = GM_getValue("obiekty");
	if(typeof stringobiektow!=="undefined"){ // typeof(variable) == 'undefined'
		obiekty = JSON.parse(GM_getValue("obiekty"));
		for(var i=0; i<(obiekty.length); i++){
			rysujObiekt(obiekty[i][0], obiekty[i][1], obiekty[i][2], obiekty[i][3]);
		}
	}
	var schowane = true;
	var now = new Date();
	var parzysty = ((now.getWeek())%2==0) ? true : false;
	var godzina = now.getHours();
	var minuta = now.getMinutes();
	var ile_kwadratow_do_zamalowania = (60*(godzina - 8) + minuta)/15;
	var dzien = now.getDay();
	jq('div:contains(", wyk")').hide();
	jq('<div id="pnl" style="position: absolute; top: 67px; left: 693px; height: 118px"><input type="button" id="shw" value="Pokaż wykłady"></div>').insertAfter('#weekBrowser');
	jq('#shw').click(function(){
		if(schowane == true){ 
			jq('div:contains(", wyk")').slideDown("slow");
			schowane = false;
		}
		else{
			jq('div:contains(", wyk")').slideUp("slow");
			schowane = true;
		}
	});
	
	jq('.cd:contains("'+zwrocNazweDnia(dzien)+'")').css("background-color","#AFAFAF");
	var litera = '';
	if(parzysty==true) litera = 'P';
	else litera = 'N';
	var ktoryDzien = zwrocStart(dzien);
	jq(".cd:contains('"+litera+"'):not(:contains('Pi')):not(:contains('Pon'))").css("background-color","#AFAFAF");
	for(i=ktoryDzien; i<ktoryDzien+ile_kwadratow_do_zamalowania; i++){
		jq("div[id=1-"+litera+"-"+i+"]").css("background-color","#AFAFAF");
		jq("div[id=1-"+litera+"-"+i+"]").css("border","1px solid #000");
		jq("div[id=1-"+litera+"-"+i+"]").css("z-index","50"); 
		jq("div[id=1-"+litera+"-"+i+"]").css("opacity","0.5");
		jq("div[id=1-"+litera+"-"+i+"]").css("pointer-events","none");
	}
	

	jq('#pnl').append('<br /><input id="nazwa" type="text" placeholder="Nazwa"/><select id="dzien"></select><select id="godzina"></select><br />Czas trwania: <select id="czasTrwania"></select><br /><button id="dodaj">Dodaj</button><br /><div id="ajaxin"></div>');

	for(var i=1; i<=5; i++){
		jq("#dzien").append(jq("<option></option>")
			  	 .attr("value",88+(i-1)*235.5+((i-1)/2))
			 	  .text(zwrocNazweDnia(i)));
	}
	var godzina=10;
	for(var i=0; i<19; i++){
		jq("#godzina").append(jq("<option></option>")
			  	 .attr("value",327+i*23.5-i)
			 	 .text(godzina+":"+((i%2)?"30":"00")));
		(i%2)?(godzina++):0;
	}
	godzina = 0;
	for(var i=1; i<=8; i++){
		jq("#czasTrwania").append(jq("<option></option>")
			  	 .attr("value",i*22.3)
			 	 .text(godzina+":"+((i%2)?"30":"00")));
		(i%2)?(godzina++):0;
	}
	jq(".coursediv").css("z-index","48"); 
	
	jq("#dodaj").click(function(){
		obiekty.push(new Array(jq("#dzien").find(":selected").val(), jq("#godzina").find(":selected").val(), jq("#czasTrwania").find(":selected").val(), jq("#nazwa").val())); //left, top, height, nazwa
		GM_setValue("obiekty", JSON.stringify(obiekty));
		rysujObiekt(jq("#dzien").find(":selected").val(), jq("#godzina").find(":selected").val(), jq("#czasTrwania").find(":selected").val(), jq("#nazwa").val());
		animation();
	});
		jq('body').on('dblclick', '.removeme', function() {
			for(var i=0; i<(obiekty.length); i++){
				if(obiekty[i][3]==jq(this).text()){
					obiekty.splice(i, 1);
					break;
				}
			}
			jq(this).remove();
			GM_setValue("obiekty", JSON.stringify(obiekty));
		});
	
});
function rysujObiekt(left, top, height, nazwa){

	var div = jq('<div class="removeme">'+nazwa+'</div>').css({
					   left : left + 'px',
					   top : top + 'px',
					   width : '234px',
					   height : height + 'px',
					   border : '1px solid rgb(102, 102, 102)',
					   'background-color': '#FF0000',
					   'color': '#FFF',
					   'z-index': '49',
					   display: 'block',
					   position: 'absolute',
					   'text-align': 'center'
					});
		jq('body').append(div);
}

function animation(){
	var div = jq('<div id="animacja"></div>').css({
					   width : '1331px',
					   height : '621px',
					   'background': "url('http://i.imgur.com/hnSL1Vf.jpg')",
					   'z-index': '55',
					   display: 'none',
					   position: 'absolute',
					   'text-align': 'center'
					});
		jq('body').append(div);
	jq('#animacja').fadeIn(1000,function(){
       jq(this).fadeOut(1500);
     });  
}
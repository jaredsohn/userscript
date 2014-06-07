// ==UserScript==
// @name          gDate2Cal_FR 0.1
// @namespace     http://ajaxorized.com/gdate2cal
// @description   UserScript to replace dates in gmail with links to google calendar (French Version)
// @include       http://mail.google.com/*
// @include		  https://mail.google.com/*
// @author		  Willem Spruijt & Matt22
// ==/UserScript==

var curDate = new Date();
var messageCount = 0;

var aRegExpMonthsFr = 'Janvier|Fevrier|Février|Mars|Avril|Mai|Juin|Juillet|Aout|Août|Septembre|Octobre|Novembre|Decembre|Décembre';
var aRegExpMonthsFrShort = 'Jan|Fev|Juil|Sept|Oct|Nov|Dec';
var aRegExpMonthsEn = 'January|February|March|April|May|June|July|August|September|October|November|December';
var aRegExpMonth = aRegExpMonthsFr + '|' + aRegExpMonthsFrShort + '|' + aRegExpMonthsEn;


var getMonthByStr = function(strMonth) {
	
	if(strMonth == 'Janvier' || strMonth == 'janvier' || strMonth == 'jan' || strMonth == 'Jan') return '1';
	if(strMonth == 'Fevrier' || strMonth == 'Fev' || strMonth == 'fev' || strMonth == 'fevrier' || strMonth == 'février')	return '2';	
	if(strMonth == 'Mars' || strMonth == 'mars') 				return '3';
	if(strMonth == 'Avril' || strMonth == 'avril') return '4';	
	if(strMonth == 'Mai' || strMonth == 'mai')		return '5';
	if(strMonth == 'Juin' || strMonth == 'juin')	return '6';
	if(strMonth == 'Juillet'  || strMonth == 'juillet')	return '7';	
	if(strMonth == 'Aout' || strMonth == 'Août' || strMonth == 'aout' || strMonth == 'août')		return '8';	
	if(strMonth == 'Septembre' || strMonth == 'septembre' || strMonth == 'sept' || strMonth == 'Sept') return '9';
	if(strMonth == 'Octobre' || strMonth == 'Oct' || strMonth == 'octobre' || strMonth == 'oct')		return '10';
	if(strMonth == 'Novembre' || strMonth == 'novembre' || strMonth == 'Nov' || strMonth == 'nov')		return '11';
	if(strMonth == 'Decembre' || strMonth == 'decembre' || strMonth == 'Décembre' || strMonth == 'décembre' || strMonth == 'Dec' || strMonth == 'dec')		return '12';
}		

var buildGCalLink = function(sYear, iMonth, iDay) {
	var sDate = sYear;
	
	if(iMonth.length == 1) sDate += '0';
	sDate += iMonth;
	
	if(iDay.length == 1) sDate += '0';
	sDate += iDay;
	var sLink = 'https://www.google.com/calendar/render?mode=week&date='+sDate;
	sLink = '<a href = "'+sLink+'" target = "_blank">'+aMatch[0]+'</a>';
	
	return sLink;
}

var getYearByMonth = function(sMonth, sYear) {
//alert(sYear);
	if(sYear) {
		var sYear = sYear;
	} else {
    var iMonth = parseInt(sMonth);
		var iCurMonth = curDate.getMonth() + 1;
		if(iMonth >= iCurMonth) {
			iYear = curDate.getFullYear();
		} else {
			iYear = curDate.getFullYear() + 1;
		}
		sYear = iYear.toString();
	}
	return sYear;	
}

var replaceDates = function() {
	
	var messageCount = 0;
	
	// if(document.getElementById('msgs')) {		
	while(document.getElementById('mb_'+messageCount)) {
		var msgHtml = document.getElementById('mb_'+messageCount).innerHTML; // Prototype, we miss you :(
		
    var sNewMsgHtml = msgHtml;	
		// Try to match the patterns	
		//var sRegExp1 = new RegExp("([0-9]+)(er|st)?\\s*("+aRegExpMonthsEn+")\\s*(20([0-9]{2}))", "gi"); 
		var sRegExp2 = new RegExp("([0-9]+)-([0-9]+)(-20([0-9]{2}))?(-([0-9]{2}))?", "g");
		var sRegExp3 = new RegExp("([0-9]+)\/([0-9]+)(\/20([0-9]{2}))?(\/([0-9]{2}))?", "g");
		var sRegExp4 = new RegExp("([0-9]+)\\s*("+aRegExpMonth+")\\s*(20([0-9]{2}))?", "gi");
	
		while(aMatch = sRegExp2.exec(msgHtml)) {
			//alert("2:"+aMatch[0]+"_"+aMatch[1]+"_"+aMatch[2]+"_"+aMatch[3]+"_"+aMatch[4]+"_"+aMatch[5]);
			var sMonth = aMatch[2];
			var sDay = aMatch[1];
			//var sYear = '20'+aMatch[3];
			if(aMatch[4])
  			var sYear = getYearByMonth(sMonth, '20'+aMatch[4]);
  		else var sYear = getYearByMonth(sMonth, aMatch[4]);
			var sLink = buildGCalLink(sYear, sMonth, sDay);
			sNewMsgHtml = sNewMsgHtml.replace(aMatch[0], sLink);
		}
	
		while(aMatch = sRegExp3.exec(msgHtml)) {
			//alert("3:"+aMatch[0]+"_"+aMatch[1]+"_"+aMatch[2]+"_"+aMatch[3]+"_"+aMatch[4]+"_"+aMatch[5]);
			var sMonth = aMatch[2];
			var sDay = aMatch[1];
			//var sYear = '20'+aMatch[3];
			if(aMatch[4])
  		  var sYear = getYearByMonth(sMonth, '20'+aMatch[4]);
			else var sYear = getYearByMonth(sMonth, aMatch[4]);
			var sLink = buildGCalLink(sYear, sMonth, sDay);				
			sNewMsgHtml = sNewMsgHtml.replace(aMatch[0], sLink);
		}
		
	/*	while(aMatch = sRegExp1.exec(msgHtml)) {
		  alert("1:"+aMatch[0]+"_"+aMatch[1]+"_"+aMatch[2]+"_"+aMatch[3]+"_"+aMatch[4]+"_"+aMatch[5]);
			var sMonth = getMonthByStr(aMatch[3]);
			var sDay = aMatch[1];	
 			var sYear = getYearByMonth(sMonth, aMatch[3]);
			var sLink = buildGCalLink(sYear, sMonth, sDay);					
			var replaceRegexp = new RegExp(aMatch[0], "g");
			sNewMsgHtml = sNewMsgHtml.replace(replaceRegexp, sLink);	
		}*/

		while(aMatch = sRegExp4.exec(msgHtml)) {
			//alert("4:"+aMatch[0]+"_"+aMatch[1]+"_"+aMatch[2]+"_"+aMatch[3]+"_"+aMatch[4]+"_"+aMatch[5]);
			var sMonth = getMonthByStr(aMatch[2]);
			var sDay = aMatch[1];	
      var sYear = getYearByMonth(sMonth, aMatch[3]);
			var sLink = buildGCalLink(sYear, sMonth, sDay);			
			var replaceRegexp = new RegExp(aMatch[0], "g");
			sNewMsgHtml = sNewMsgHtml.replace(replaceRegexp, sLink);	
		}		

		
		document.getElementById('mb_'+messageCount).innerHTML = sNewMsgHtml;	
		messageCount++;
	}
}

replaceDates();

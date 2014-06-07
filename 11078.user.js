// ==UserScript==
// @name          gDate2Cal 0.1
// @namespace     http://ajaxorized.com/gdate2cal
// @description   UserScript to replace dates in gmail with links to google calendar
// @include       http://mail.google.com/*
// @include		  https://mail.google.com/*
// @author		  Willem Spruijt
// ==/UserScript==

var curDate = new Date();
var messageCount = 0;

var aRegExpMonthsEn = 'January|February|March|April|May|June|July|August|September|October|November|December';
var aRegExpMonthsNl = 'Januari|Februari|Maart|April|Mei|Juni|Juli|Augustus|September|Oktober|November|December'

var getMonthByStr = function(strMonth) {	
	if(strMonth == 'January' || strMonth == 'Januari' || strMonth == 'january' || strMonth == 'januari')		return '1';
	if(strMonth == 'February' || strMonth == 'Februari' || strMonth == 'february' || strMonth == 'februari')	return '2';	
	if(strMonth == 'March' || strMonth == 'Maart' || strMonth == 'march' || strMonth == 'maart') 				return '3';
	if(strMonth == 'April' || strMonth == 'april') 																return '4';	
	if(strMonth == 'May' || strMonth == 'Mei' || strMonth == 'may' || strMonth == 'mei')						return '5';
	if(strMonth == 'June' || strMonth == 'Juni' || strMonth == 'june' || strMonth == 'juni')					return '6';
	if(strMonth == 'July'  || strMonth == 'Juli' || strMonth == 'july'  || strMonth == 'juli')					return '7';	
	if(strMonth == 'August' || strMonth == 'Augustus' || strMonth == 'august' || strMonth == 'augustus')		return '8';	
	if(strMonth == 'September' || strMonth == 'september')							 							return '9';
	if(strMonth == 'October' || strMonth == 'Oktober' || strMonth == 'october' || strMonth == 'oktober')		return '10';
	if(strMonth == 'November' || strMonth == 'november')														return '11';
	if(strMonth == 'December' || strMonth == 'dedember')							 							return '12';
}		

var buildGCalLink = function(sYear, iMonth, iDay) {
	var sDate = sYear;
	
	if(iMonth.length == 1) sDate += '0';
	sDate += iMonth;
	
	if(iDay.length == 1) sDate += '0';
	sDate += iDay;
	
	var sLink = 'https://www.google.com/calendar/render?mode=day&date='+sDate;
	sLink = '<a href = "'+sLink+'" target = "_blank">'+aMatch[0]+'</a>';
	
	return sLink;
}

var getYearByMonth = function(sMonth, sYear) {
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
		var sRegExp1 = new RegExp("("+aRegExpMonthsEn+")\\s*([0-9]+)(st|nd|rd|th)?\\s*(20([0-9]{2}))?", "gi"); 
		var sRegExp2 = new RegExp("20([0-9]{2})-([0-9]+)-([0-9]+)", "g");
		var sRegExp3 = new RegExp("20([0-9]{2})\/([0-9]+)\/([0-9]+)", "g");
		var sRegExp4 = new RegExp("([0-9]+)\\s*("+aRegExpMonthsNl+")\\s*(20([0-9]{2}))?", "gi");
	
		while(aMatch = sRegExp1.exec(msgHtml)) {
			var sMonth = getMonthByStr(aMatch[1]);
			var sDay = aMatch[2];	
			var sYear = getYearByMonth(sMonth, aMatch[4]);			
			var sLink = buildGCalLink(sYear, sMonth, sDay);					
			var replaceRegexp = new RegExp(aMatch[0], "g");
			sNewMsgHtml = sNewMsgHtml.replace(replaceRegexp, sLink);	
		}
				
		while(aMatch = sRegExp2.exec(msgHtml)) {
			var sMonth = aMatch[2];
			var sDay = aMatch[3];
			var sYear = '20'+aMatch[1];
			var sLink = buildGCalLink(sYear, sMonth, sDay);				
			sNewMsgHtml = sNewMsgHtml.replace(aMatch[0], sLink);
		}
	
		while(aMatch = sRegExp3.exec(msgHtml)) {
			var sMonth = aMatch[2];
			var sDay = aMatch[3];
			var sYear = '20'+aMatch[1];
			var sLink = buildGCalLink(sYear, sMonth, sDay);				
			sNewMsgHtml = sNewMsgHtml.replace(aMatch[0], sLink);
		}
		
		while(aMatch = sRegExp4.exec(msgHtml)) {
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
// ==UserScript==
// @name        Achievo Gebuchte Stunden
// @author      Malte Kastner (m.kastner@his.de)
// @namespace   sva
// @description Hervorhebung von gebuchten Stunden und Stunden-Übernahme aus QISSVA 
// @include     https://achievo.his.de/*
// @version     1
// @grant       none

// ==/UserScript==
var $ = unsafeWindow.jQuery;

// GEBUCHTE ZEITEN HERVORHEBEN
var list = document.getElementsByClassName("already_booked_content");
for (var i = 0; i < list.length; i++) {
	if(list[i].innerHTML != '00:00'){
		list[i].style.fontWeight = 'bold';
		list[i].style.color = '#000';
		list[i].style.fontSize = '0.9em';
	}
}

// SVA ZEITEN IMPORTIEREN
//document.domain = "his.de";
var svaBaseURL = 'http://qissva.his.de/qisserver/';
var svaWS = 'rds?ws=ws';
var svaStart = '&state=user&type=0';
var svaSva = '&state=sva&moduleParameter=timesheet&next=timesheet/timeSheet.vm&subdir=sva';

var selectedMonth = "selectedMonth=";
var selectedYear = "selectedYear=";
var presenceObjectArray;
var weekDates;
minsPerDayArray = new Array();

var myframe = $('<iframe name="myframe" id="myframe" style="height:1px;width:1px;border:0;" src="' + svaBaseURL + svaWS + svaStart + '">asd</iframe>');
$('#form_menu').append(myframe);

window.addEventListener('message', receiveMessage, false);

/**
Callback empfangen
*/
function receiveMessage(evt)
{
	obj = JSON.parse(evt.data);
	if(obj.name == 'asi'){
		loc = document.location;
		
		curDate = '';
		curYear = '';
		curMonth = '';
		curDay = '';
		reload = '';
		Aussage = loc+"";
		Ergebnis = Aussage.match(/filterdate=\d\d\d\d-\d\d-\d\d/g);
		
		if (Ergebnis){
			for (var i = 0; i < Ergebnis.length; ++i){
				curDate = Ergebnis[i].replace('filterdate=', '');
				
				dateArr = curDate.split('-');
				curYear = dateArr[0];
				curMonth = dateArr[1];
				curDay = dateArr[2];
				reload = "&reload=reload"; // Es wird ein Reload benötigt, da man nicht in den richtigen Monat der Zeiterfassung springen kann
			}
		}
		
		newSvaUrl = svaBaseURL + svaWS + svaSva + '&asi=' + obj.value + '&' + selectedMonth + curMonth + '&' + selectedYear + curYear + reload;
		myframe.attr('src', newSvaUrl);
	}
	// Der angeordnete Reload der Seite wurde durchgeführt
	else if(obj.name == 'reload'){
		myframe.attr('src', newSvaUrl.replace('&reload=reload', ''));
	}
	// Login-Versuch wurde vorgenommen. Ein weiterer Versuch ist nicht nötig.
	else if(obj.name == 'loginComplete'){
		myframe.load(function (){
			myframe.attr('src', svaBaseURL + svaWS + svaStart + '&noLogin=noLogin');
			myframe.unbind('load');
		});
	}
	// Zeiten wurden geparsed
	else {
		presenceObjectArray = obj.value;
		weekDates = new Array();
		$('th.weekview_date').each(function(){
			curDate = $(this).html();
			weekDates.push(curDate)
			curPresenceObj = getPresenceObjectForDate(curDate);
		});
		showPresence();
	}
}

/**
Generiert die Tabellen-Spalte der Anwesenheitsstunden
*/
function showPresence(){
	trString = '<tr><td style="border-top:1px solid #000;padding:5px;color:#000">Anwesenheit</td>';
	for (var i = 0; i < weekDates.length; ++i){
		curPresenceObject = getPresenceObjectForDate(weekDates[i]);
		dateString = '';
		if(curPresenceObject){
			dateString = getDateDisplay(curPresenceObject);
		};
		trString += '<td style="text-align:center;border-top:1px solid #000;padding:5px;color:#000">';
		trString += dateString;
		trString += '</td>';
	}
	
	trString += '</tr>';
	trString += '<tr id="dynamicTr"></tr>';
	$('#result tr:last').after(trString);
	refreshView();
}

/**
Generiert die Inhalte der Tabellen-Spalte für gebuchten Stunden
*/
function refreshView(){
	c = 0;
	accHours = new Array();
	$('#result td div.already_booked_content').each(function(){
		i = c % 7;
		
		if(!accHours[i])
			accHours[i] = new Array();
		curTimeObj = new Object();
		
		minsInt = getMins($(this).html());
		
		curTimeObj.minsInt = minsInt;
		curTimeObj.mins = minsInt%60;
		curTimeObj.hours = (minsInt-curTimeObj.mins)/60;
		
		accHours[i].push(curTimeObj);
		c++;
	});
	
	dynTr = '<td style="padding:5px;color:#000">bereits gebucht</td>';
	for (var i = 0; i < accHours.length; ++i){
		dynTr += '<td style="text-align:center;font-weight:bold">';
		var sumMinsPerDay = 0;
		for (var j = 0; j < accHours[i].length; ++j){
			sumMinsPerDay += accHours[i][j].minsInt;
		}
		minsPerDayArray.push(sumMinsPerDay);
		dynTr += getTimeDisplayFromMins(sumMinsPerDay);
		dynTr += '</td>';
	}
	$('#dynamicTr').html(dynTr);
	$('.hisid').each(function(index){
		var applyMinutesLink = $('<a href="#" style="cursor:pointer;display:inline-block;margin:5px;font-weight:bold;font-size:15px">SVA</a> ');
		applyMinutesLink.click(function(){setApplyMinutesIntoSelection(index);});
		
		$(this).before(applyMinutesLink);
	});
}

/**
Setze (Anwesenheitszeit am Tag - Bereits Gebuchte Stunden am Tag) abgerundet
in die jeweiligen Eingabefelder zur einfachen Buchung der fehlenden Stunden
*/
function setApplyMinutesIntoSelection(row){
	for (var i = 0; i < weekDates.length; ++i){
		presentObject = getPresenceObjectForDate(weekDates[i]);
		
		//hours
		mins = minsPerDayArray[i];
		curBookedHours = (mins-(mins%60))/60;
		
		myHours = presentObject.hours;
		myHours = myHours-curBookedHours;
		selectHours = myHours;
		selector = 'select.weekday_'+(i+1)+'.input_hours option[value='+selectHours+']:eq('+row+')';
		$(selector).attr('selected','selected').change();
		
		//minutes
		curBookedMins = mins%60;
		myMins = presentObject.mins;
		myMins = myMins - curBookedMins;
		selectMins = Math.floor((myMins/15))*15;
		selector = 'select.weekday_'+(i+1)+'.input_minutes option[value='+selectMins+']:eq('+row+')';
		$(selector).attr('selected','selected').change();
	}
}

function getDateDisplay(presenceObject){
	curH = presenceObject.hours+"";
	curM = presenceObject.mins+"";
	if(curM.length == '1'){
		curM = '0'+curM;
	}
	return curH + ':' + curM;
}

/**
Liefert ANwesenheitsstunden für einen speziefischen Tag
*/
function getPresenceObjectForDate(date){
	date = date.replace('.20', '.');
	for (var i = 0; i < presenceObjectArray.length; ++i){
		if(presenceObjectArray[i].date == date){
			return presenceObjectArray[i];
		}
	}
}

function getMins(curHour){
	time = curHour.split(':');
	return ((time[0]*60) + (time[1]*1));
}
function getTimeDisplayFromMins(mins){
	h = (mins-(mins%60))/60;
	m = mins%60;
	if((''+m).length == '1'){
		m = '0'+m;
	}
	return h + ':' + m;
}



// ==UserScript==
// @name           Alerte TV
// @namespace      marclucchini
// @description    Alerte Google Agenda pour un programme TV
// @include        http://www.programme-tv.net/programme/*
// ==/UserScript==

function makeGAgendaEntry(channel, title, date)
{
	// channel : "France 4"
	// title   : "Jt nuit : - Télé Loisirs"
	// date    : "Lun 24 à 22h40"

	var entryMonth;
	var entryDay;
	var entryHour;
	var entryMin;
	
	// Récupération des données du programme
	var splitDate = date.split(' ');
	var splitTime = splitDate[splitDate.length - 1].split('h');
	entryDay  = splitDate[1];
	entryHour = splitTime[0];
	entryMin  = splitTime[1];

	// Récupération des données courantes
	var curDate  = new Date();
	var curYear  = curDate.getFullYear();
	var curMonth = curDate.getMonth();
	var curDay   = curDate.getDate();
	
	// Quel mois ?
	if (curDay > entryDay)
		curMonth++;
	curMonth = curMonth % 12;
	curDate.setMonth(curMonth);
	
	// Quel jour ?
	curDate.setDate(entryDay);
	
	// A quelle heure ?
	curDate.setHours(entryHour);
	curDate.setMinutes(entryMin);
	
	// Formatage pour Google Agenda
	var dateOffset = 2*60*60*1000; // - 2h
	curDate.setTime(curDate.getTime() - dateOffset);
	entryMonth  = curDate.getMonth() + 1;
	entryMonth  = entryMonth < 10 ? '0' + entryMonth : entryMonth;
	entryDay    = curDate.getDate();
	entryDay    = entryDay < 10 ? '0' + entryDay : entryDay;
	entryHour   = curDate.getHours();
	entryHour   = entryHour < 10 ? '0' + entryHour : entryHour;
	entryMin    = curDate.getMinutes();
	entryMinEnd = curDate.getMinutes() + 1;
	entryMin    = entryMin < 10 ? '0' + entryMin : entryMin;
	entryMinEnd = entryMinEnd < 10 ? '0' + entryMinEnd : entryMinEnd;

	var date1 = curDate.getFullYear() + entryMonth + entryDay + 'T' + entryHour + entryMin + '00Z';
	var date2 = curDate.getFullYear() + entryMonth + entryDay + 'T' + entryHour + entryMinEnd + '00Z';
	var dates = date1 + '/' + date2;
	var entry = '<a href="http://www.google.com/calendar/event?action=TEMPLATE&text=' + title + '&dates=' + dates + '&details=&location=' + channel + '&trp=false&sprop=&sprop=name:" target="_blank"><img src="http://www.google.com/calendar/images/ext/gc_button1_fr.gif" border=0></a>';

	return entry;
}

var title    = document.title;
var channels = document.evaluate('/html/body/div[1]/div[6]/div[1]/div/div[2]/ul/li/a[2]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var dates    = document.evaluate('/html/body/div[1]/div[6]/div[1]/div/div[2]/ul/li/strong', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < channels.snapshotLength; i++)
{
    var channel = channels.snapshotItem(i);
	var channelText = channel.innerHTML;
	
	var date = dates.snapshotItem(i);
	var dateText = date.innerHTML;
	
	channel.parentNode.appendChild(document.createElement("a"), channel).innerHTML = makeGAgendaEntry(channelText, title, dateText);
}

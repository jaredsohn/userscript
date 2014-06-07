// ==UserScript==
// @name           Elisa Viihde in English
// @namespace      ElisaViihdeFI2EN
// @description    Converts the text of the Elisa Viihde interface into English
// @include        http://elisaviihde.fi/etvrecorder/*
// ==/UserScript==

function convertToEnglish() {
	var translations = new Array();
	translations['Ohjelmakartta'] = 'TV Guide';
	translations['Tallennetut ohjelmat'] = 'Saved Recordings';
	translations['Tulevat tallenteet'] = 'Recording Schedule';
	translations['Aina tallentuvat'] = 'Series-link';
	translations['Asetukset'] = 'Preferences';
	translations['Maksukanavat'] = 'Premium Channels';
	translations['Tallenna ohjelma'] = 'Record programme';
	translations['Poista'] = 'Remove';
	
	translations['Ohjelma'] = 'Programme';
	translations['Kanava'] = 'Channel';
	translations['Kesto'] = 'Duration';
	translations['Aika'] = 'Time';
	translations['Lisätty'] = 'Added';
	translations['Kansio'] = 'Folder';
	translations['Voimassa'] = 'Active';

	var translations_days = new Array();
	translations_days['Ma'] = 'Mon';
	translations_days['Ti'] = 'Tue';
	translations_days['Ke'] = 'Wed';
	translations_days['To'] = 'Thu';
	translations_days['Pe'] = 'Fri';
	translations_days['La'] = 'Sat';
	translations_days['Su'] = 'Sun';

	///////////////////////////// CODE STARTS HERE
	
	// Global
	
	var nav = document.getElementById('main_navigation');
	var navList = nav.getElementsByTagName('a');
	for (i=0; i<navList.length ;i++) {
		if (translations[navList[i].innerHTML] != null) {
			navList[i].innerHTML = translations[navList[i].innerHTML];
		}
	}

	// for the Saved Recordings page
	var progs = document.getElementsByClassName('programview');
	if (progs) {
		for (p=0; p<progs.length ;p++) {
			date = progs[p].getElementsByClassName('last')[0];
			date.innerHTML = convertDate(date.innerHTML);
		}
	}

	// For the TV Guide page
	var datedrop = document.getElementById('datedrop');
	if (datedrop) {
		var options = datedrop.getElementsByTagName('option');
		for (o=0; o<options.length ;o++) {
			options[o].innerHTML = convertDate(options[o].innerHTML);
		}
	}

	// For the Recording Schedule page
	var recordings = document.getElementById('recordings');
	if (recordings && recordings.className=='help') {
		dates = recordings.getElementsByClassName('first');
		for (d=0; d<dates.length ;d++) {
			date = dates[d];
			date.innerHTML = convertDate(date.innerHTML);
		}
	}
	
	var programInfo = document.getElementsByClassName('programInfo_middle');
	if (programInfo) {
		for (pi=0; pi<programInfo.length ;pi++) {
			programInfo_links = programInfo[pi].getElementsByTagName('a');
console.log(programInfo_links.length);
			if (programInfo_links) {
				for (pil=0; pil<programInfo_links.length ;pil++) {
					programInfo_link = programInfo_links[pil];
console.log(programInfo_link.innerHTML);
					if (translations[programInfo_link.innerHTML] != null) {
						programInfo_link.innerHTML = translations[programInfo_link.innerHTML];
					}
				}
			}

			
		}
	}
	
	var tableHeaders = document.getElementsByTagName('th');
	if (tableHeaders) {
console.log(tableHeaders.length);
		for (th=0; th<tableHeaders.length ;th++) {
console.log(tableHeaders[th]);
			tableHeader_link = tableHeaders[th].getElementsByTagName('a');
console.log(tableHeader_link);
			if (tableHeader_link.length > 0) {
console.log('route 1');
				if (translations[tableHeader_link[0].innerHTML] != null) {
					tableHeader_link[0].innerHTML = translations[tableHeader_link[0].innerHTML];
				}
			} else {
console.log('route 2');
				if (translations[tableHeaders[th].innerHTML] != null) {
					tableHeaders[th].innerHTML = translations[tableHeaders[th].innerHTML];
				} else {
					
				}
			}
		}
console.log('out of the loop');
	}
}

function convertDate(dateString) {
	var translations_days = new Array();
	translations_days['Ma'] = 'Mon';
	translations_days['Ti'] = 'Tue';
	translations_days['Ke'] = 'Wed';
	translations_days['To'] = 'Thu';
	translations_days['Pe'] = 'Fri';
	translations_days['La'] = 'Sat';
	translations_days['Su'] = 'Sun';

	day = dateString.substr(0,2);
	if (translations_days[day]) {
		dateString = dateString.replace(day, translations_days[day]);
	}
	dateString = dateString.replace(/\./g,'/');
	return dateString;
}

convertToEnglish();
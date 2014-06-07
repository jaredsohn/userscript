// ==UserScript==
// @name Ogame Redesign : Better Reports
// @namespace http://userscripts.org/scripts/show/63322
// @description This script uses the site at http://konwerter.wtk300.pl/en/ to convert the combat report to forum friendly BB code automatically.
// @version 0.2
// @date 2009-12-03
// @creator mkey
// @include http://*.ogame.org/game/index.php?page=combatreport*
// @include http://konwerter.wtk300.pl/en/*
// @exclude
// ==/UserScript==

	var intID;
	
(function () {
	if (document.location.href.indexOf('combatreport') != -1) { GM_setValue('cr_flag', 0); intID = setInterval(InitReport, 100); }	// the ogame combat report page
	else if (document.location.href.indexOf('convert') != -1) GetBBReport();		// the wtk300 converted page
	else PasteReport();
})()

// note the order of pages loading
function InitReport() {
	var flag = GM_getValue('cr_flag', 0);
	
	if (!flag) { GM_setValue('cr_flag', 2); BuildReport(); CreateFrame(); }
	else if (flag == 1) { PasteConvertedReport(); clearInterval(intID); }
}

// copy the converted report in BB code format from the wtk300 site
function GetBBReport() {
	if (GM_getValue('cr_flag', 0) != 2) return;
	GM_setValue('cr_data', document.getElementsByTagName('textarea')[0].textContent);
	GM_setValue('cr_flag', 1);
}

// create a text report
function BuildReport() {
	var table; var elem; var a; var t;
	var span; var i; var j; var k; var data;
	
	// combat rounds
	var table = document.getElementsByClassName('combat_round');
	if (!table) return;
	data = ' ';
	
	for (i=0; i<table.length; i++) {
		// combat rundown
		elem = table[i].getElementsByTagName('p');
		data += elem[0].textContent + ' ' + elem[1].textContent + ' ';
		
		t = table[i].getElementsByClassName('newBack');
		
		for (k=0; k<t.length; k++) {
			span = t[k].getElementsByTagName('span');
			a = t[k].getElementsByTagName('a');
			
			// player name
			data += span[0].textContent + ' ';
			if (a.length>0) {
				// coords and techs
				if (span.length>1) data += a[0].textContent + ' ' + span[1].textContent + ' ';
				else data += a[0].textContent + ' ';
				
				// unit summary
				// headers
				elem = t[k].getElementsByTagName('th');
				for (j=0; j<elem.length; j++) data += elem[j].textContent + '';
				
				// units
				elem = t[k].getElementsByTagName('td');
				for (j=0; j<elem.length; j++) data += elem[j].textcontent + ' ';
			}
		}
	}
	
	// the closing comment
	elem = document.getElementById('combat_result').getElementsByTagName('p');
	data += elem[0].textContent + ' ' + elem[1].textContent + ' ';
	GM_setValue('cr_data', data);
}

// create a hidden frame and load konwerter.wtk300.pl in it
function CreateFrame() {
	var iframe;
	
	iframe = document.createElement('iframe');
	iframe.src = 'http://konwerter.wtk300.pl/en/';
	iframe.style.display = 'none';
	document.body.appendChild(iframe);
}

// paste the report to konwerter.wtk300.pl site
function PasteReport() {
	if (GM_getValue('cr_flag', 0) != 2) return;
	document.getElementsByTagName('textarea')[0].textContent = GM_getValue('cr_data', ' ');
	document.forms[0].submit();
}

// create a text area and display BB code in the report window
function PasteConvertedReport() {
	var textarea; var div;
	
	// create text area
	textarea = document.createElement('textarea');
	textarea.setAttribute('readonly', 'readonly');
	textarea.setAttribute('onclick', 'javascript:this.focus(); this.select();');
	textarea.setAttribute('style', 'background-color:#161616; color:#F0F0F0;');
	textarea.setAttribute('cols', 74);
	textarea.setAttribute('rows', 4);
	div = document.createElement('div');
	div.setAttribute('align', 'center');
	div.appendChild(textarea);
	document.body.appendChild(div);
	
	// paste converted report to text area
	textarea.textContent = GM_getValue('cr_data', ' ');
	GM_setValue('cr_data', 0);			// perform cleanup
}

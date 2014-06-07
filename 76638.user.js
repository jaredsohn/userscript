// ==UserScript==
// @name           TheWestInsider Compare Labor
// @namespace      armeagle.nl
// @description    Store and compare labor points between different setups on the job calculator of TheWestInsider.
// @include        http://www.thewestinsider.com/job_calc.php
// @require        http://userscripts.org/scripts/source/75442.user.js
// @resource  meta http://userscripts.org/scripts/source/76638.meta.js
// @author         ArmEagle
// @version        0.31
// ==/UserScript==

/*
version 0.31:
  - TWI was changed back, so changing the script to just find the right column now.
version 0.3:
  - TWI was updated, moving the Luck column to the right-hand side. Changed this script accordingly.
version 0.2:
  - Changed a very small thing to make script cooperate with another script I wrote: The West - Job Equip | http://userscripts.org/scripts/show/59109
*/

// code namespace
if ( unsafeWindow.AEG === undefined ) {
	unsafeWindow.AEG = {};
}

function AEG_TWI_DOM_script() {
	var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
	script.setAttribute('type', 'text/javascript');
	return script.textContent=AEG_TWI_DOM_script.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1");

	// first find the 'your best items' cell by going trough the headers, looking for the image strings
	AEG.LPcell = 0;
	var table_header_cells = document.getElementById('mainTableBody').parentNode.querySelectorAll('thead > tr:nth-child(2) > td');
	while ( table_header_cells[AEG.LPcell] && table_header_cells[AEG.LPcell].innerHTML.indexOf('title_labor.png') < 0 ) {
		AEG.LPcell++;
	}

	// apply function 'call' to all job rows. Passes the row ID and all cells in the row to the function
	AEG.applyToAllJobs = function(call) {
		var tblrows = document.querySelectorAll('#mainTableBody > tr');
		for (rowind = 0; rowind < tblrows.length; rowind++) {
			call(tblrows[rowind].getAttribute('id'),
				tblrows[rowind].getElementsByTagName('td'));
		}
	}

	AEG.storeLaborPoints = function() {
		var jobLaborPoints = new Object();
		AEG.applyToAllJobs(function call(rowID, cells) {
			jobLaborPoints[rowID] = Number(cells[AEG.LPcell].getElementsByTagName('span')[0].textContent);
		});
		localStorage['AEG_TWIlaborPoints'] = JSON.stringify(jobLaborPoints);
		//console.log('stored: '+ localStorage['AEG_TWIlaborPoints']);
	}

	AEG.recoverStoredLabor = function() {
		// remove all previously inserted elements (class: AEG_inserted)
		while ( inserted = document.getElementsByClassName('AEG_inserted')[0] ) {
			inserted.parentNode.removeChild(inserted);
		}
		// now add the stored labor points
		//console.log('recovering: '+ localStorage['AEG_TWIlaborPoints']);
		if ( localStorage['AEG_TWIlaborPoints'] !== null ) {
			var jobLaborPoints = JSON.parse(localStorage['AEG_TWIlaborPoints']);
			AEG.applyToAllJobs(function call(rowID, cells) {
				var newLp = Number(cells[AEG.LPcell].textContent);
				var oldLp = jobLaborPoints[rowID];
				var color = ' rgb(144, 0, 0);';
				var LpDiff = newLp - oldLp;
				if ( isNaN(LpDiff) ) {
					LpDiff = '?';
					color = ' rgb(0, 0, 144);';
				} else if ( LpDiff > 0 ) {
					color = ' rgb(0, 200, 0);';
				}
				
				var oldLpSpan = document.createElement('span');
				oldLpSpan.setAttribute('style', 'font-size: 0.8em; font-weight: bold; cursor: help; color: '+ color);
				oldLpSpan.setAttribute('title', 'Compared to stored labor points');
				oldLpSpan.setAttribute('class', 'AEG_inserted');
				oldLpSpan.textContent = LpDiff;
				var br = document.createElement('br');
				br.setAttribute('class', 'AEG_inserted');
				cells[AEG.LPcell].appendChild(br);
				cells[AEG.LPcell].appendChild(oldLpSpan);
			});
		}
	}
	
	AEG.init = function() {
		var element = document.querySelector('#mainTableBody');
		while ( element.className != 'work_stats' ) {
			element = element.parentNode;
		}
		AEG.insertLinks(element.parentNode, element);
		AEG.insertLinks(element.parentNode, element.nextSibling);
	}
	AEG.insertLinks = function(parentNode, beforeElement) {
		var container = document.createElement('div');
		container.setAttribute('style', 'margin: 5px 10px; font-weight: bold;');
		
		var store = document.createElement('a');
		store.setAttribute('href', 'javascript:AEG.storeLaborPoints();');
		store.textContent = 'Store labor points';
		container.appendChild(store);
		container.appendChild(document.createTextNode(' | '));
		var recover = document.createElement('a');
		recover.setAttribute('href', 'javascript:AEG.recoverStoredLabor();');
		recover.textContent = 'Compare to stored labor points';
		container.appendChild(recover);
		
		parentNode.insertBefore(container, beforeElement);
	}
	
	AEG.init();
}
AEG_TWI_DOM_script();
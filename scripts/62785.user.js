//===========================================================================================================================================================================
// ==UserScript==
// @name           IPS Uren Addon
// @namespace      IPS Uren Addon
// @include        http://ips/ips_planning.php?action=input*
// version         0.3
// ==/UserScript==
//===========================================================================================================================================================================

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('td.ips { border : 1px solid black; color : blue; padding-left : 5px; font-weight : bold; }');

var strBaseURL = 'http://ips/ips_uren.php?action=mod&week=<WEEKNUMBER>&jaar=<YEAR>&vURD_user=<USERNAME>&vURD_datum=<DATE>&vS_code=Maak%20een%20keuze&vURD_tijd=<TIJD>&vURD_reis=<REISTIJD>&fsm=&vI_project=<PROJECT>&vURD_opm=<OPMERKING>';

var allB = document.getElementsByTagName('b');
var strProject = allB[2].innerHTML;

var allInputs = document.getElementsByTagName('input');
var strDate = allInputs[6].value; 
var strUsername = allInputs[5].value; 

var allTextareas = document.getElementsByTagName('textarea');
var strDescription = allTextareas[0].value

var allTables = document.getElementsByTagName('table');
var intTableID = allTables.length - 1;
var rowCount = allTables[intTableID].rows.length; 

var arrDate = strDate.split('-');
var intDay = arrDate[0];
var intMonth = arrDate[1];
var intYear = arrDate[2];

//===========================================================================================================================================================================
// functions
//===========================================================================================================================================================================
window.getWeek = function() {
    var determinedate = new Date();
    determinedate.setFullYear(intYear, intMonth - 1, intDay);
    var D = determinedate.getDay();
    if(D == 0) D = 7;
    determinedate.setDate(determinedate.getDate() + (4 - D));
    var YN = determinedate.getFullYear();
    var ZBDoCY = Math.floor((determinedate.getTime() - new Date(YN, 0, 1, -6)) / 86400000);
    var WN = 1 + Math.floor(ZBDoCY / 7);
    return WN;
}

function newsubmit(event) {
    var target = event ? event.target : this;

	if (allInputs[8].checked == true)
	{
		//build correct url
		strBaseURL = strBaseURL.replace('<WEEKNUMBER>', getWeek());
		strBaseURL = strBaseURL.replace('<YEAR>', intYear);
		strBaseURL = strBaseURL.replace('<USERNAME>', strUsername);
		strBaseURL = strBaseURL.replace('<DATE>', strDate);
		strBaseURL = strBaseURL.replace('<PROJECT>', strProject);
		strBaseURL = strBaseURL.replace('<TIJD>', document.getElementById('strTijd').value);
		strBaseURL = strBaseURL.replace('<REISTIJD>', document.getElementById('strReistijd').value);
		strBaseURL = strBaseURL.replace('<OPMERKING>', strDescription);
		
		window.open(strBaseURL, '', 'height=680,left=0,width=1010,top=0,status=yes,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no');
	}

    this._submit();
}

// capture the onsubmit event on all forms
window.addEventListener('submit', newsubmit, true);



//===========================================================================================================================================================================
// row1
//===========================================================================================================================================================================
var row = allTables[intTableID].insertRow(rowCount - 1); 
var cell1 = row.insertCell(0); 
cell1.colSpan = 2;
cell1.className = 'ips';
var element1 = document.createElement('img');
element1.src = 'data:image/gif;base64,R0lGODdhGAAYAP8AAP7%2B%2Fv76x%2FsyAMnIyf76qvIxBOkyCv36u%2F1MItMtEuIuC6Y1M%2BI0E7VEQv08C%2BS1KSkmMzg0RNTU1P31Ou3s7PMrAf%2FyZv%2F7m95kUv72nfx0Uv%2Bxnc0qE7lDQf21oqSiovXnQeTk5NrY2P%2F6kZc5Ov5jO%2BV1Xbi%2Butvbk6suKPuYgntaW7IyK%2Fh5Wv%2F1huVsJvWSev2TevjoNIU7PP%2BLbTQwPVRHN4JkZf%2F6aOd5Yv%2BOcP%2BTdZotLuOrK5d2eP9aMUZCXv9aLoNzdP%2BkjM3UxtEpD3xJS9orDcMkErqpqeVnQtQnEf9rRf7ySPPz86DJ%2F%2FwqAOjl5d7T07dIR%2FI0CLpYWubdVt1xHP6okv32kv%2Boj%2FY8Fv66p%2FzzjLhVVf%2FzWbQ%2FP0JAO%2BhfP9xzP5pGSJyASNeMQpZ%2FQ7ZBPfheQM%2BdPIxyPNNPPtVRQOOmN9k6F8tDF9ZFFNxlFv5HGbMkHOI8HKwfG9tZG%2BBLD%2F44Bt4mB%2B0uA%2B0wBuFEDM4mDt8wD9IlDdU4Dc9MHTMuNdtMNepSNMCiNKmJNf9gNtaHN7Q6NuJRNuCIMuRAINx5IOJKHrQoIKUiISclK%2B3PLel2Id5UJcfNlp2wmr2am%2BTkj2Bbk7eSlMump6%2FCqPDrqZ%2BdnWZgpr6lp7vIg%2FTxhf77hU9Mgsd%2FgqShgsjOjf7pjs2Nj6aGiGBai%2FahjG2O63yf65q96%2BTR0W2Q54Oh55zG%2FYCq%2F464%2F3ea8Hqe8n6l%2BrrIt8nTue3uueTprMWxsdS2t5Gvya67yuLOzuHkw9TFxYqpyfftXP%2BAXUI%2BXsupV9lqWta1XP%2F6Yd1xYud3YlxYXrZdXvl4YOZxSvJqS9atS0I8ScJQSd18SYJ1TfxyTsyeUKhLTN6kTLKwTExIcPiHclFMdLhpa6eia1dQbbOwefPse%2F%2F1e%2BSDdJCMda2sdkVAZYiAZv%2BGZ%2FfbYoN9Y76yZOnIafXvaf70asWsZ398aOd8aAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAGAAYAAAI%2FwABCBw4kJgpLw2mQMNEgaBDh5watJnGpEQQBAwgbXroMIoXZTFosNNQqA4DA1SKbBPBEYCwBq2GDNFBiMMRBQYqFBBQgE6oh7E6eNiwIQeHBEsCyXF0BU8FAQKQJCFIoYEHLlwwHIVDrRMwHMy6HeojwEEKlgKrwMDiAUMCP4lI7XpyK4s4UONkMHDAwIfAX2x0qDBRZAk3AgeIzAqGApy3NU0ebEFAIgSAKSU0tEhwxMyBAKAPHHgGxEY7CxMeBUkxQAogBD8aKRBEALRtdBFqLBuFStQLRCxOqNpTVoEeeLZBn4IAocwIXU%2BKUWISvArUCgbiXEhOT10EG6lGnP%2FAdemFhgUD0EA1UIBRrwG2a7CKMIjciHLGZChpMUMCmAIAVqANLbkMA1oYEEgSATLuxPPFA9FgcENVBvAhABTJ1OIKL6J5Mg82EAChyToTjLHDAh8AEI4CClzoBgoZECCjjBe8U00pZ%2FTwjTNGSAGAL0j8AdUVOHRxQQYZXJBFJuZYYcgDOajAQ4oCLZAAFXkYAII8LrjQBQqwvGJBE5OYoEUHQlgm0AB27DXHHSB8YYEFltgiywQ91LOBNSsQ4VASkUyGQCUPgDCBFemocY0KWHSwwgAcDUDGGz%2BUkIYYSkhjQgxanMODEJC25MQqKSySzTE07ABDM4oY8YmaLQkbJIEPJCywAAkz3PCBBE7E%2BlAUEgwwgAgNxRoQADs%3D';
cell1.appendChild(element1);

//===========================================================================================================================================================================
// row2
//===========================================================================================================================================================================
var row = allTables[intTableID].insertRow(rowCount); 
var cell1 = row.insertCell(0); 
var element1 = document.createTextNode('Tijd');
cell1.appendChild(element1);  
cell1.className = 'ips';
var cell2 = row.insertCell(1);  
cell2.className = 'ips';
var element1 = document.createElement('input');
element1.id = 'strTijd';
element1.size = 4;
cell2.appendChild(element1);

//===========================================================================================================================================================================
// row3
//===========================================================================================================================================================================
var row = allTables[intTableID].insertRow(rowCount + 1); 
var cell1 = row.insertCell(0);  
var element1 = document.createTextNode('Reistijd');
cell1.appendChild(element1);
cell1.className = 'ips';
var cell2 = row.insertCell(1);  
cell2.className = 'ips';
var element1 = document.createElement('input');
element1.id = 'strReistijd';
element1.size = 4;
cell2.appendChild(element1);

//===========================================================================================================================================================================
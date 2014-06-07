scr_meta=<><![CDATA[ // For Autoupdate script : http://userscripts.org/scripts/show/38017
// ==UserScript==
// @name          Fido Transaction History Extractor
// @namespace     http://userscripts.org/users/81476
// @description   Extracts Call and Transaction History from fido's web page and displays it in CSV format.
// @version       1.5.1
// @include       https://www.fido.ca/web/Fido.portal?*_pageLabel=Ecare_PaymentHistory*
// ==/UserScript==
]]></>.toString();

//***********************************************
//*           User Configurable Data            *
//*---------------------------------------------*

var ShowAll = false;  // Default : false
	// true : Extracts all the available data by default
	// false : Shows only new history since last extraction by default
	//         The script sets preferences in about:config with the last date/time extracted
	//         (it uses the table names - 'currentdetail_01' & 'currentdetail_02' - as the preferences name)

var CombinedHistory = true;  // Default : true
	// Set to true to have both Call and Transaction Histories merged in one list
	// Set to false to have two lists, one for Call History and one for Transaction Histroy

var OutputWidth = 85;  // Default : 85
	// Used for the width of the CSV fields
	// Default value (85) is for a desktop width of 1280 with Firefox maximized

var OutputHeightCall = 15;  // Default : 15
	// Used for the height of the Call CSV field (when CombinedHistory is false)

var OutputHeightTransaction = 10;  // Default : 10
	// Used for the height of the Transaction CSV field (when CombinedHistory is false)

var OutputHeightCombined = 30;  // Default : 30
	// Used for the height of the Combined CSV field (when CombinedHistory is true)

//*---------------------------------------------*
//*       End of User Configurable Data         *
//***********************************************



// Helper functions
// ================

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
};

function StrToDate(s) {
	var y = s.substring(0,4);
	var m = s.substring(5,7);
	var d = s.substring(8,10);
	var h = s.substring(11,13);
	var n = s.substring(14,16);
	return new Date(y, m-1, d, h, n, 0);
}

function RemoveDollar(str) {
	// Based on : http://javascript.internet.com/forms/money-filter.html
	re = /\$/g;
	tmp = str.replace(re, '');
	return tmp.replace(',', '.');
}

// Object to hold one line of data
// ===============================
function DataLine(pTimeStamp, pTimeString, pDbt, pCrdt, pNumber, pDesc, pType) {
	this.timeStamp = pTimeStamp;
	this.timeString = pTimeString;
	this.debit = pDbt;
	this.credit = pCrdt;
	this.number = pNumber;
	this.description = pDesc;
	this.type = pType;
}

// Sort function for data array
// ============================
function compareTimeStamps(a, b) {
return a.timeStamp - b.timeStamp;
}


// Builds HTML to display results
// ==============================
function DataDisplay(pID, pLabel, pWidth, pHeight) {
	return '<p id="FTHE_P' + pID + '" style="margin-top: ' + ((pID == 2) ? '5' : '0') + ';"><b style="float:left;margin-left:2px"> ' +
		pLabel + ' history :</b></p><textarea id="TextArea' + pID + '" cols="' + pWidth + '" rows="' + pHeight + '"></textarea>';
}

// Extracts data from a table
// ==========================
function ExtractTable(tbName, frstCol, skipCol, lstCol, allData, vData) {
	// Based on : http://www.experts-exchange.com/Web_Development/Web_Languages-Standards/ASP/Q_24342226.html
	var tbData = '';
	var lstTmStmp = StrToDate(GM_getValue(tbName, '2000/01/01 00:00'));
	var keepLine = false;
	var curTmStmp, cellVal;
	
	var tb = document.getElementById(tbName).getElementsByTagName('TABLE')[0];
	for ( var n = (tb.rows.length-1) ; n > 0 ; n-- ) {
		line = tb.rows[n].cells[frstCol].textContent.trim();
		curTmStmp = StrToDate(line);
		if (allData || (curTmStmp > lstTmStmp)) {
			// Keep the time stamp in the vector
			if (vData) {
				currLine = vData.length;
				vData[currLine] = new DataLine();
				vData[currLine].timeStamp = curTmStmp;
				vData[currLine].timeString = line;
			}
			for ( var m = frstCol+skipCol ; m <= lstCol ; m += skipCol ) {
				cellVal = tb.rows[n].cells[m].textContent;
				if ( m == 3 ) { cellVal = RemoveDollar(cellVal); }
				cellVal = cellVal.trim();

				// If we use the vector, we need to put the value in the correct property
				if (vData) {
					switch ( m ) {
						case 3:
							vData[currLine].debit = cellVal;
							// We'll see later if we need to move this value to 'credit'
							break;
						case 5:
							if ( lstCol == 9 ) {
								vData[currLine].number = cellVal;
							}
							else {
								vData[currLine].description = cellVal;
								// If it's a refill, we move amount to credit property
								if ( cellVal.match(/refill/i) || cellVal.match(/réapprovisionnement/i) ) {
									vData[currLine].credit = vData[currLine].debit;
									vData[currLine].debit = null;
								}
							}
							break;
						case 7:
							vData[currLine].description = cellVal;
							break;
						case 9:
							vData[currLine].type = cellVal;
							break;
					}
				}
				else {
					line += ';' + cellVal;
				}
			}
			if ( !vData ) {
				if ( tbData !== '' ) { tbData += '\n'; }
				tbData += line;
			}
		}
	}
	if ( !allData ) {
		lstTmStmp = tb.rows[1].cells[1].textContent.trim();
		GM_setValue(tbName, lstTmStmp);
		}
	return tbData;
}

// Extracts Call History data
// ==========================
function ExtractCall(allData) {
	document.getElementById('TextArea1').value = ExtractTable('currentdetail_01', 1, 2, 9, allData);
}

// Extracts Transaction History data
// =================================
function ExtractTransaction(allData) {
	document.getElementById('TextArea2').value = ExtractTable('currentdetail_02', 1, 2, 5, allData);
}

// Extracts Combined History data
// ==============================
function ExtractCombined(allData) {
	var fidoData = new Array();
	// Dummy item so array exists.
	fidoData[0] = new DataLine();
	fidoData[0].timeStamp = new Date(2000, 0, 1, 1, 1, 0);
	
	ExtractTable('currentdetail_01', 1, 2, 9, allData, fidoData);
	ExtractTable('currentdetail_02', 1, 2, 5, allData, fidoData);
	fidoData.sort(compareTimeStamps);
	var tbData = '';
	// Skip dummy item in array.
	for ( var i = 1 ; i < fidoData.length ; i++ ) {
		if ( tbData !== '' ) { tbData += '\n'; }
		tbData += fidoData[i].timeString + ';';
		tbData += ( (fidoData[i].debit) ? fidoData[i].debit : '' ) + ';';
		tbData += ( (fidoData[i].credit) ? fidoData[i].credit : '' ) + ';';
		tbData += ( (fidoData[i].number) ? fidoData[i].number : '' ) + ';';
		tbData += fidoData[i].description + ';';
		tbData += ( (fidoData[i].type) ? fidoData[i].type : '' )
	}
	document.getElementById('TextArea3').value = tbData;
}

// functions with parameters for event listeners
// =============================================
function _ExtractCallAll () { ExtractCall(true); }
function _ExtractTransactionAll () { ExtractTransaction(true); }
function _ExtractCombinedAll () { ExtractCombined(true); }

// ***********************
// Actual work starts here
// ***********************
GM_addStyle(
	'.bea-portal-body { margin:0 0 0 5px }' +
	'#FTHEData { position:absolute; top:168px; right:5px; background:#ffffff; z-index:99999;opacity: 0.6;}' +
	'#FTHEData textarea { font-size:7.5pt; }' +
	'.FTHELink { float:right; margin-right:5px; color:#555555 }'
);

var bShowingCallAll = ShowAll;
var bShowingTransactionAll = ShowAll;
var bShowingCombinedAll = !ShowAll;
var elDiv, elLink;

// Add HTML to display extracted data
elDiv = document.createElement('div');
elDiv.id = 'FTHEData';
if ( CombinedHistory ) {
	elDiv.innerHTML = DataDisplay(3, 'Combined', OutputWidth, OutputHeightCombined);
}
else {
	elDiv.innerHTML = DataDisplay(1, 'Call', OutputWidth, OutputHeightCall) +
		DataDisplay(2, 'Transaction', OutputWidth, OutputHeightTransaction);
}
document.body.insertBefore(elDiv, document.body.lastChild.nextSibling);

// If we show new data only, we add links to view all available data.
if ( !ShowAll ) {
	elLink = document.createElement('a');
	elLink.setAttribute('href','javascript:void(0)');
	elLink.setAttribute('class', 'FTHELink');
	elLink.textContent = 'Extract All';

	if ( CombinedHistory ) {
		elLink.addEventListener('click', _ExtractCombinedAll, false);
		document.getElementById('FTHE_P3').appendChild(elLink);
		}
	else {
		elLink.addEventListener('click', _ExtractCallAll, false);
		document.getElementById('FTHE_P1').appendChild(elLink);
		elLink = elLink.cloneNode(true);
		elLink.addEventListener('click', _ExtractTransactionAll, false);
		document.getElementById('FTHE_P2').appendChild(elLink);
		}
	}

// Extracts data
if ( CombinedHistory ) {
	ExtractCombined(ShowAll);
}
else {
	ExtractCall(ShowAll);
	ExtractTransaction(ShowAll);
}


// Autoupdate Script v1.1.6
// ========================
// from : http://userscripts.org/scripts/show/38017

aaus_38017={i:'51482',d:7,n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match("the page you requested doesn't exist")||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&typeof GM_xmlhttpRequest!='undefined')aaus_38017.ch();
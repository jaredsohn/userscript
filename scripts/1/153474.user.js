// ==UserScript==
// @name        IRActivate
// @description aktiviert das ausgecheckte Produkt im IR
// @include     http://generator.cxo.name/exec/inputmask.pl*
// @grant		GM_addStyle
// @version     8.10.2013 15:50
// ==/UserScript==

var zNode       = document.createElement ('div');
zNode.innerHTML = 
		  '<input type="button" id="tczBtnActivateCurrent" name="tczBtnActivateCurrent" value="mm/yy" />'
		+ '&nbsp;&nbsp;&nbsp; ID:&nbsp;'
		+ '<input name="tczID" type="text" size="8" />'
		+ '<input type="button" id="tczBtnActivateNext" name="tczBtnActivateNext" type="button" value="mm/yy" />'
		+ '<button id="tczBtnOff" name="tczBtnOff" type="button">Off</button>'
		+ '<br>'
		+ '<input id="tczGH" name="tczGH" type="text" size="80" />'
/*
		+ '<input name="tczClip" type="text" size="55" />'
		+ '<script type="text/javascript" src="http://team.testlabor.de/tools/ZeroClipboard.js"></script>'
*/
	;

zNode.setAttribute('id', 'tczContainer');
zNode.setAttribute('style', 'position: absolute; top: 36px; left: 700px; width: 450px; height: 50px; z-index: 2000; display: block; padding: 5px; align: center;');
document.body.appendChild (zNode);

//--- Activate the newly added buttons
document.getElementById ("tczBtnActivateCurrent").addEventListener ("click", btnActivateCurrentAction, false);
document.getElementById ("tczBtnActivateNext").addEventListener ("click", btnActivateNextAction, false);
document.getElementById ("tczBtnOff").addEventListener ("click", btnDeactivateAction, false);


// test
var current = new tczActivation();
console.log('current: CHIP '+current.cm+"/"+current.cy+", act: "+current.actDate);
var next = new tczActivation(true);
console.log('next: CHIP '+next.cm+"/"+next.cy+", act: "+next.actDate);

UpdateUI(tczMmYy(current.cm, current.cy), "NEXT: " + tczMmYy(next.cm, next.cy));
// ZeroClipboard.setDefaults( { moviePath: 'http://team.testlabor.de/tools/ZeroClipboard.swf' } );

function tczSetFreigaben(on)
{
	tcSetCheckBox("_20883_12_94", on);				// Freigabe Online
	tcSetCheckBox("_20884_12_94", on);				// Freigabe Chip Print
	tcSetCheckBox("_20888_12_94", on);				// Freigabe Chip CD
	tcSetCheckBox("_20885_12_94", on);				// Freigabe Foto & Video
	tcSetCheckBox("_20886_12_94", on);				// Freigabe Test & Kauf
	tcSetCheckBox("_20889_12_94", on);				// Freigabe PC Powerplay
	tcSetCheckBox("_25653_12_94", on);				// Freigabe Tomorrow
	tcSetCheckBox("_31414_12_94", on);				// Freigabe International
	tcSetCheckBox("_20887_12_94", on);				// Freigabe Labor
}


function tczActionActivate(nextMonth)
{
	var $ = unsafeWindow.jQuery;					// get access to jQuery()
	var debug = false;
	var controlledBy = "tcz";
	
	$('#btn-checkout').children().trigger("click");	// Check-out first; doesn't work (takes too long?)
	// fill in the form
	tcSetCheckBox("_23830_12_94", true);			// Qualitätskontrolle
	tcSetCheckBox("_4913_12_94", true);				// erscheint nur in Bestenliste
	tcSetCheckBox("_25_12_94", true);				// aktive fuer Preisupdate
	
	tczSetFreigaben(true);

	var act = new tczActivation(nextMonth);
	
	if(tcGetText('_23833_9_0') == "")				// falls noch nicht ausgefüllt:
		tcSetText('_23833_9_0', controlledBy);		// durch Mitarbeiter ...
	
	if(!tcGetCombo('_4871_161_97'))					// falls noch nicht ausgefüllt:
		tcSetCombo('_4871_161_97', act.cm + 1);		// Monat
	if(!tcGetCombo('_4872_160_97'))					// falls noch nicht ausgefüllt:
		tcSetCombo('_4872_160_97', act.cy % 100);	// Jahr
	
	if(act.actDate != "") {
		tcSetTextFixed('RELxEVTx3190', act.actDate);		// TPDB CHIP CD Freigabe - Datum
		tcSetTextFixed('RELxEVTxTIMEx3190', act.actTime);	// TPDB CHIP CD Freigabe - Uhrzeit
		tcSetTextFixed('RELxEVTx3097', act.actDate);		// TPDB CHIP Print Freigabe - Datum
		tcSetTextFixed('RELxEVTxTIMEx3097', act.actTime);	// TPDB CHIP Print Freigabe - Uhrzeit
	}
	$('#btn-checkin').children().trigger("click");	// Save & Check-in
	UpdateUI();
//	copyIntoClipboard(document.getElementById("tczGH"));
	
}

function UpdateUI(current, next)
{
	var $ = unsafeWindow.jQuery;					// get access to jQuery()
	var debug = false;

	var gh = tcGetText('_43739_2_0');
	if(debug) {
		console.log("GH: "+gh);
	}
	var id = $("#beitrag_id").val();
	if(debug) {
		console.log("ID: "+id);
	}
	
//	tcSetTextFixed('tczGH', gh);		// preislink
	tcSetTextFixed('tczID', id);		// ID
	tcSetBtnText('tczBtnActivateCurrent', current);
	tcSetBtnText('tczBtnActivateNext', next);
	// Hersteller (lang):	input id="IDx521695718_11_18_3"
	// Serienstatus		select id="IDx521695704_23806_490_97"
	// Preis			input id="IDx521695726_780_9_0"
	
	var price = tcGetText("_780_9_0");
	var tab = '\t';
//	tcSetTextFixed('tczClip', price+tab+gh+tab+id);		// PREIS + GeizhalsLink + IR_ID
	var prodManuf = tcGetText('_11_18_3');				// Manufacturer:	IDx594371066_11_18_3
	var prodModel = tcGetText('_9_2_0');				// Model:			IDx594371068_9_2_0
	var prodArt = tcGetText('_10_18_3');				// Produktart:		IDx594371067_10_18_3
	var subkat = "";									// TODO 			extend: digicams, SAT-Receiver, Ultrabooks
	tcSetTextFixed('tczGH',   id + tab 
							+ prodManuf + tab
							+ prodModel + tab
							+ price + tab
							+ prodArt + tab
							+ subkat + tab
							+ gh + tab
							);					// Excel-Export
	
	TuneInterred();
}

function TuneInterred() {
	document.getElementById("homebuttons-logo").setAttribute('style', 'display: none; visibility: hidden;');
}

function tczActivation(next)
// OBJECT containing calculated chip activation month, year and publishing date
// if next, activate for the next month, not the already running issue
{
	// Sperrfrist: in der ersten Hälfte des Monats ist es der 15.
	// 	ab den 15. braucht man für die laufende Ausgabe keine Sperre mehr
	//	wenn der Monat abgeschlossen ist (so ab 25.-28.), soll man bereits für den nächsten Monat aktivieren
	// Aktuelle CHIP-Ausgabe ist immer aktueller Monat + 3
	// Die Sperre ist nur nach der Abgabe der aktuellen Ausgabe sinvoll (20.-31.), und immer bis zum 15.
	this.today = new Date();
	this.dd = this.today.getDate();
	this.mm = this.today.getMonth();		// 0..11
	this.yy = this.today.getFullYear();
	
	// activation lock
	if(next) {
		this.am = this.mm + 1;
		if(this.am < 12) {
			this.ay = this.yy;
		} else {
			this.ay = this.yy + 1;
			this.am = this.am % 12;
		}
	} else {
		if(this.dd < 15) {
			this.am = this.mm;
			this.ay = this.yy;
		}
	}
	if (next || (this.dd < 15)) {
		this.actDate = this.ay+"-"+((this.am<9)?"0":"")+(this.am+1)+"-15";
		this.actTime = "00:00";
	} else {
		this.actDate = "";
		this.actTime = "";
	}
	
	// chip issue - month and year
	this.cm = this.mm + 3 + (next ? 1 : 0);
	if (this.cm < 12) {
		this.cy = this.yy;
	} else {
		this.cm = this.cm % 12;
		this.cy = this.yy + 1;
	}

	console.log('tczActivation(): next? ' + next + ', dd ' +this.dd + ', mm ' + this.mm + ', yy ' + this.yy 
		+ ', cm ' + this.cm + ', cy ' + this.cy 
		+ ', actDate ' + this.actDate);
}

function btnActivateCurrentAction (zEvent)	{ tczActionActivate(false);}
function btnActivateNextAction (zEvent)		{ tczActionActivate(true);}

function btnGeizhalsAction (zEvent)
{
	var debug = false;
	
	var gh = tcGetText('_43739_2_0');				// preislink
	var model = tcGetText('_9_2_0');
	if(gh) {
		var newtab = window.open(gh, "_blank");
	} else {
		var newtab = window.open("http://gh.de?fs="+model, "_blank");
	}
}

function btnDeactivateAction (zEvent)
{
	tczSetFreigaben(false);
}



function tcSetBtnText(ids, txt)
{
	var $ = unsafeWindow.jQuery;					// get access to jQuery()
	var debug = false;
	var sel = 'input[id="' + ids + '"]';
	
	if(debug) {
		console.log($(sel).attr("id") + " before: " + $(sel).val());
	}
	$(sel).val(txt);
	if(debug) {
		console.log($(sel).attr("id") + " after: " + $(sel).val());
	}
}

function tcSetCheckBox(ids, on)
{
	var $ = unsafeWindow.jQuery;					// get access to jQuery()
	var debug = false;
	var sel = 'input[name^="IDx"][name$="' + ids + '"]';
	
	if( $(sel).attr("checked") ) {
		if(!on) {
			$(sel).click();
		}
	} else {
		if(debug) {
			alert($(sel).attr("id") + "NOT YET checked - checking now...");
		}
		if(on) {
			$(sel).click();
		}
	}
}

function tcSetText(ids, txt)
{
	var $ = unsafeWindow.jQuery;					// get access to jQuery()
	var debug = false;
	var sel = 'input[name^="IDx"][name$="' + ids + '"]';
	
	if(debug) {
		alert($(sel).attr("id") + " before: " + $(sel).val());
	}
	$(sel).val(txt);
	$(sel).trigger("change");
	if(debug) {
		alert($(sel).attr("id") + " after: " + $(sel).val());
	}
}

function tcSetCombo(ids, txt)
{
	var $ = unsafeWindow.jQuery;					// get access to jQuery()
	var debug = false;
	var sel = 'select[name^="IDx"][name$="' + ids + '"]';
	
	if(debug) {
		alert($(sel).attr("id") + " before: " + $(sel+' option:selected').text());
	}
	$(sel).val(txt);
	$(sel).trigger("change");
	if(debug) {
		alert($(sel).attr("id") + " after: " + $(sel).val());
	}
}

function tcGetCombo(ids)
{
	var $ = unsafeWindow.jQuery;					// get access to jQuery()
	var debug = false;
	var sel = 'select[name^="IDx"][name$="' + ids + '"]';
	
	if(debug) {
		alert($(sel).attr("id") + " text: " + $(sel+' option:selected').text() + " val: " + $(sel+' option:selected').val());
	}
	return $(sel).val();
}

function tcSetTextFixed(ids, txt)
{
	var $ = unsafeWindow.jQuery;					// get access to jQuery()
	var debug = false;
	var sel = 'input[name="' + ids + '"]';
	
	if(debug) {
		alert($(sel).attr("id") + " before: " + $(sel).val());
	}
	$(sel).val(txt);
	$(sel).trigger("change");
	if(debug) {
		alert($(sel).attr("id") + " after: " + $(sel).val());
	}
}

function tcGetText(ids)
{
	var $ = unsafeWindow.jQuery;					// get access to jQuery()
	var debug = false;
	var sel = 'input[name^="IDx"][name$="' + ids + '"]';
	
	if(debug) {
		alert($(sel).attr("id") + ": " + $(sel).val());
	}
	return $(sel).val();
}

function tczMmYy(mm,yy)
// takes month number (0..1) and year (YYYY), returns "MM/YY"
{
	var m = mm + 1;
	var y = yy % 1000;
	return ((m < 10) ? "0" : "")
		+ m
		+ "/"
		+ y
	;
}

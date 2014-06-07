// ==UserScript==
// @name				Omerta Beyond 
// @version				1.7
// @date				28-05-2008
// @author				vBm ( vbm AT omertabeyond DOT com )
// @author				Igloo ( igloo AT omertabeyond DOT com )
// @author				Dopedog ( dopedog AT omertabeyond DOT com )
// @namespace			omertabeyond.com
// @identifier			http://www.omertabeyond.com/newbeyond.user.js
// @description			Omerta Beyond 1.7 (The greatest addon for Omerta available!)
// @include				http://www.omertabeyond.com/*
// @include				http://barafranca.gen.tr/*
// @include				http://barafranca.nl/*
// @include				http://www.barafranca.gen.tr/*
// @include				http://www.barafranca.nl/*

// ==/UserScript==
//
// --------------------------------------------------------------
//		Most parts of this script is under GPL licence except those
// that we have permission to use. All 3rd party code was and will 
// be properly credited.
// --------------------------------------------------------------
//
// This script was made for our own personal use but we decided
// to make it public because of all the support we got. You are
// welcome to use this script for your own use, you may edit the
// source but make sure you tell us what you did so we can maybe
// use it ourselves, and of course give you the credit :)
//
// --------------------------------------------------------------
//
// We would like to thank to all our users and to all who reported
// bugs and gave ideas for future releases.
//
// ---------------------------------------------------------------

// get language vars
var langs = {
	en: {
		version: '_com',
		prefslink: '/beyond/prefs.html',
		prefsname: 'Preferences',
		prefs: [
			"Beyond submenu on the left",//0
			"Cocaine Prices in the marquee",//1
			"Fingon's News in the info menu",//2
			"Jail Highlighter",//3
			"Remove 'shooting bottle' from crime page",//4
			"Click bank amount to fill in bank form",//5
			"Remove Jailbusting skill",//6
			"Disable Imageshack/Photobucket/XS images on profiles",//7
			"Enable autoforms (bullets, heist, bloodbank, car, crime and booze/narcs)",//8
			"Change title of the Omerta page to 'Omerta (COM)'",//9
			"Refresh Crimes/Car Nick page after waiting time is over",//10
			"Return to page after wrong image code",//11
			"Remove Capo Money texts",//12
			"Add fampage/profile nickreader etc",//13
			"Remove Kill Password texts",//14
			"Add Alt+Shift+U Hotkey for buying out on I_am_in_jail page",//15
			"Add detailed wealth/raceform to profiles",//16
			"Enable booze prices popup in marquee",//17
			"Add price per bullet on Obay",//18
			"Add individual delete/reply buttons to message inbox",//19
			"Clean up login page"//20
		],
		maxprefs: 21,
		marquee: ['Are you sure you want to travel to ','? This will cost you $ ','All Prices','Cocaine prices at: '],
		newmenu: 'Detected new menu content! Please update your preferences.',
		fucked: ['You fucked up Beyond :O<br>Click the button to reset.','Make sure you DO <br>have a "Preferences" button while setting your buttons'],
		customs: " settings updated! Returning to normal menu..<br><br>Click <a href='javascript:location.href=\"menu.php\"'>here</a> if this stays longer then 5 seconds",
		bullets: ['pocket','buy',4,'bullets'],
		fingon: 5,
		wrongcode: ["The code you", "<br><center><b>Learn to type, analphabetic!</b><br><br><a href=\"javascript:history.back()\">Click here to go back or wait a second</a></center>"],
		crimes: "Do a crime",
		timeUp: ["minutes","s",5,"e",2],
		cars: "Nick a car",
		profile: ["Marital status:","SMS Status","Family Buster of"],
		wealth: ["Straydog","Poor","Nouveau Riche","Very rich","Too rich to be true","Richer than God","Rich"],
		driver: ["Rookie","Co-Driver","Driver","Advanced Driver","Master Driver","Chauffeur","Advanced Chauffeur","Master Chauffeur","Racing Driver","Race Supremo","Champion"],
		requesting: '/gm/requesting.js',
		friends: "Friends:",
		loading: "loading..",
		bank: [3,"You"],
		family: "<td class='title'>Members:</td><td class='title' align='right'><span><sup>(italic is objectowner) - (underlined is capo/top3) - (colored is online > blue: member | orange: capo | red: top3)</sup></span></td>",
		smuggling: ["Pocket:","Booze","Narcs","Current Booze/Narcotics Prices","All Prices","Both"],
		obay: "Pack of bullets",
		notify: "Notification",
		adminmsg: "(Admin message)",
		title: "Omerta (COM)",
	},
	nl: {
		version: '_nl',
		prefslink: '/beyond/prefs_nl.html',
		prefsname: 'Voorkeuren',
		prefs: [
			"Beyond submenu in het menu",//0
			"Coke prijzen in de bovenbalk (Met andere prijzen popup en 'klik om te reizen')",//1
			"Fingon's Nieuws in het info menu",//2
			"Gevangenis Highlighter",//3
			"Verwijder 'schiet het flesje' van de Misdaden pagina",//4
			"Klik op bankrekening om dit in te vullen",//5
			"Verwijder Uitbraakervaring",//6
			"Maak Imageshack/Photobucket/XS plaatjes op profielen onbruikbaar",//7
			"Automatisch invullen (kogels, heist, bloodbank, auto, misdaad en smokkelen)",//8
			"Verander de titel van de Omerta pagina naar 'Omerta (NL)'",//9
			"Ververs Misdaden/Steel een auto pagina nadat de wachttijd voorbij is",//10
			"Ga terug automatisch terug nadat je een verkeerde code hebt ingetoetst",//11
			"Verwijder 'Capo opbrengsten' tekst",//12
			"Gedetaileerde familiepagina met nicklezer (ook op profielen)",//13
			"Verwijder moord wachtwoord teksten",//14
			"Voeg Alt+Shift+U sneltoets toe voor het uitkopen op de ik-zit-in-de-gevangenis pagina",//15
			"Voeg gedetaileerd vermogen en racevorm toe aan profielen",//16
			"Maak extra drank/drugs prijzen mogelijk in een popup in de bovenbalk",//17
			"Voeg de prijs per kogel toe op Obay",//18
			"Voeg individuele verwijder/antwoord knoppen toe aan de berichten in de inbox",//19
			"Opgeruimde login pagina",//20
			"Verwijder 'IRC Chat' uit de bovenbalk",//21
		],
		maxprefs: 22,
		marquee: ['Weet je zeker dat je wil reizen naar ','? Dit kost je $ ','Alle Prijzen','Coke prijzen om: '],
		newmenu: 'Nieuwe menu indeling gevonden! Selecteer opnieuw je voorkeuren.',
		fucked: ['Je hebt Beyond opgekloot :O<br>Klik op de knop om te resetten','Zorg ervoor dat je wel "Voorkeruen" in je menu hebt als je je voorkeuren selecteerd'],
		customs: " indeling geupdate! <br><br>Click <a href='javascript:location.href=\"menu.php\"'>Wacht of klik hier</a>",
		bullets: ['zak','kunt',5,'kogels'],
		fingon: 3,
		wrongcode: ["De code die","<br><center><b>Leer typen, analphabeet!</b><br><br><a href=\"javascript:history.back()\">Klik hier om terug te gaan of wacht een ogenblik</a></center>"],
		crimes: "Doe een misdaad",
		timeUp: ["minuten","se",7,"en",3],
		cars: "Steel een auto",
		profile: ["Burgerlijke staat:","SMS Status","Familie uitbreker van"],
		wealth: ["Sloeber","Arm","Modaal","Erg rijk","Te rijk om waar te zijn","Rijker dan God","Rijk"],
		driver: ["Nieuweling","Bijrijder","Bestuurder","Ervaren Bestuurder","Perfecte Bestuurder","Chauffeur","Ervaren Chauffeur","Sublieme Chauffeur","Racer","Coureur","Kampioen"],
		requesting: '/gm/requesting_nl.js',
		friends: "Vrienden:",
		loading: "laden..",
		bank: [2,"Je"],
		family: "<td class='title'>Members:</td><td class='title' align='right'><span><sup>(schuin is objectowner) - (onderstreept is capo/top3) - (colored is online > blauw: member | oranje: capo | rood: top3)</sup></span></td>",
		smuggling: ["Zak: ","Drank","Drugs","Huidige Drank/Drugs Prijzen","Alle Prijzen","Beide"],
		obay: "Pak met kogels",
		notify: "Mededeling",
		adminmsg: "(Admin bericht)",
		title: "Omerta (NL)",
	}
}
var url = "_" + location;//set language
if(url.indexOf('com') != -1 ) var lang = langs.en;
if(url.indexOf('nl') != -1 ) var lang = langs.nl;

var ScriptName, ScriptVersion, ScriptSubVersion, SiteLink, FingonUrl;
ScriptName = 'Omerta Beyond';
ScriptVersion = '1.7';
ScriptSubVersion = '16';
SiteLink = 'http://www.omertabeyond.com';
PrefsLink = SiteLink + lang.prefslink;
FingonUrl = 'http://89.149.221.178/~fingon';


GM_registerMenuCommand(ScriptName + ' v' + ScriptVersion, function(){ alert('You are using ' + ScriptName + '\nVersion:\t' + ScriptVersion + '\nRevision:\t' + ScriptSubVersion )});

var maxbit = lang.maxprefs; //set the amount of preferences

function decbin(dec,max) {
	var bin = new Array();
	for(i=max; i>=0; i--) {
		if(dec >= Math.pow(2,i)) {
			dec -= Math.pow(2,i);
			bin[i] = true;
		} 
		else { bin[i] = false; }
	}
	return bin;
}

function GetParam(name) {
	var start=location.search.indexOf("?"+name+"=");
	if (start<0) start=location.search.indexOf("&"+name+"=");
	if (start<0) return '';
	start += name.length+2;
	var end=location.search.indexOf("&",start)-1;
	if (end<0) end=location.search.length;
	var result='';
	for(I=start;I<=end;I++) {
		var c=location.search.charAt(I);
		result=result+(c=='+'?' ':c);
	}
	return unescape(result);
}

function setIcon(icon) {
	var head = top.document.getElementsByTagName("head")[0];
	var links = head.getElementsByTagName("link");
	for (var I = 0; I < links.length; I++)
		if (links[I].type == "image/x-icon" &&
			(links[I].rel == "shortcut icon" || links[I].rel=="icon") &&
			links[I].href != icon)
			head.removeChild(links[I]);
		else if(links[I].href == icon) return;
	var newIcon = document.createElement("link");
	newIcon.type = "image/x-icon";
	newIcon.rel = "shortcut icon";
	newIcon.href = icon;
	return head.appendChild(newIcon);
}

//load integer prefs as a boolean array
var prefs = decbin(getValue('prefs', 0),maxbit);
//load any GET querys
var querys = [
	'menu_randomquote',
	'menu_cocaine',
	'menu_dailyfams',
	'families',
	'colours',
	'jailint',
	'priority',
	'newsamount',
	'custombg',
	'comments',
	'bold',
	'high',
	'low',
	'colour',
	'refresh',
	'marqstyle'
];
//beyond menu descriptions
var descr = [
	lang.prefsname,
	"Random Quote",
	"Cocaine Prices",
	"Fingon's Daily Famstats"
];
//beyond menu links
var qlinks = [
	PrefsLink,
	SiteLink+'/omerta.php?randomquote',
	SiteLink+'/omerta.php?prices',
	FingonUrl+'/latestpicture.php'
];
var calcName = ["OC","SH","Bank"];

function xpath(query) { return document.evaluate(query, document, null, 6, null); }

function del(query) {
	var elem = xpath(query).snapshotItem(0);
	try { elem.parentNode.removeChild(elem); }
	catch(err) {}
}

function delall(query){
	var allelem = xpath(query);
	for (I=0;I<allelem.snapshotLength;I++) {
		var elem = allelem.snapshotItem(I);
		try { elem.parentNode.removeChild(elem); }
		catch(err) {}
	}
}

function $x( xpath, root ) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
	switch (got.resultType) {
		case got.STRING_TYPE: 
			return got.stringValue;
		case got.NUMBER_TYPE:
			return got.numberValue;
		case got.BOOLEAN_TYPE:
			return got.booleanValue;
		default:
			while (next = got.iterateNext())
				result.push( next );
			return result;
	}
}

function $X( xpath, root ) {
	var got = $x( xpath, root );
	return got instanceof Array ? got[0] : got;
}

function getID(id) { return document.getElementById(id); }
function getTAG(tag) { return document.getElementsByTagName(tag); }
function getTXT(xpath) { return $X(xpath).textContent; }
function getELNAME(name){ return document.getElementsByName(name); }
function cEL(name) { return document.createElement(name); }
function getValue(name,standard) { return GM_getValue(name+lang.version,standard); }
function setValue(name,value) { GM_setValue(name+lang.version,value); }

function gsPATH(path) {
	var r = $X(path).innerHTML;
	return r.replace(/%| |/g,'');
}

function extJS(url){
	var script = cEL("script");
	script.setAttribute('type','text/javascript');
	script.setAttribute('src',url);
	$X("//head").appendChild(script);
}

var dl, dlp, dls, dlh, lh, ls, db, i;

dl = document.location;
db = document.body;
dlp = dl.pathname;
dls = dl.search;
dlh = dl.hostname;
lh = location.href;
ls = dls;

//---------------- Preference Pane ----------------
if(lh == PrefsLink + ls ) {
	var x = db.innerHTML;
	function go() {

		extJS(SiteLink+'/gm/color.js');

		var hexs = ["00","33","66","99","CC","FF"];
		var str = 'var colors = ["';
		for(i=0;i<=5;i++){ //set up colors array
			var a = hexs[i];
			for(j=0;j<=5;j++){
				var b = hexs[j];
				for(k=0;k<=5;k++){
					var c = hexs[k];
					if(!(i==5&&j==5&&k==5)) { var str = str + b + a + c + '","'; }
					else { var str = str + b + a + c + '"];'; eval(str); }
				}
			}
		}

		string = '';
		string += '<script>cp.writeDiv();</script><div style="visibility: hidden; position: absolute;" id="colorPickerDiv"><table cellspacing="1" cellpadding="0" border="1"><tbody>';
		for(i=0;i<=198;i++) {
			if(Math.round(i/11)==(i/11)) { string += '<tr>'; }
			string += '<td bgcolor="#'+colors[i]+'"><font size="-3"><a style="text-decoration: none;" onmouseover="ColorPicker_highlightColor(\'#'+colors[i]+'\',window.document)" onclick="ColorPicker_pickColor(\'#'+colors[i]+'\',window.popupWindowObjects[1]);return false;" href="#"></a></font></td>'
			if(Math.round((i+1)/11)==((i+1)/11)) { string += '</tr>'; }
		}
		string += '<tr><td bgcolor="#ffffff" id="colorPickerSelectedColor" colspan="9" style="background-color: rgb(0, 0, 102);"></td><td align="center" id="colorPickerSelectedColorValue" colspan="9">FFFFFF</td></tr></tbody></table></td></tr></tbody></table></div>';

		db.innerHTML = db.innerHTML + string;

		var prefs = decbin(getValue('prefs', 0),maxbit);
		if(ls.length > 1) {
			if(ls.indexOf("=") == -1) {
				setValue('prefs', ls.substring(1)); //save integer prefs
				var prefs = decbin(getValue('prefs', 0),maxbit);
			}
			for(j=0; j<querys.length; j++) if(GetParam(querys[j]) != '') setValue(querys[j], GetParam(querys[j]));
		}
		var prefstr = lang.prefs;

		var string = '';
		string = string + '<table>';
		for(i=0; i<maxbit; i++) {
			string += '<tr><td><input type=checkbox id=check' + i + ' name=check' + i + '><\/td><td>' + prefstr[i] + '<\/td><\/tr>';
		}
		string += '<\/table><input type=button value="Update '+lang.prefsname+'" onclick=updateprefs()>';
		string += '<table width=100%><tr><td align=center class=small>Page will need to be refreshed for some options to go into effect</td></tr>';
		string += '</tr></tbody></table></td></tr></table>';

		getID('page').innerHTML = string;

		for(i=0; i<maxbit; i++) getID('check' + i).checked = prefs[i];

		var family = getValue('families', '').split(",");
		var colour = getValue('colours', '').split(",");
		var priority = getValue('priority', '').split(",");
		var jailint = getValue('jailint', 6);

		var string = "<table style=\"width:100%;\"><tr><td>Family or Ingame</td><td>Colour</td><td>Priority</td></tr>";
		for(i=0; i<jailint; i++) {
			if(family[i] == null) family[i] = "";
			if(colour[i] == null) colour[i] = "";
			if(priority[i] == null) priority[i] = "";
			string += '<tr><td><input type=text id="family' + i + '" value="' + family[i] + '" size=30><\/td><td><input type=text id="colour' + i + '" value="' + colour[i] + '" size=7 maxlength=6><\/td><td><input type=text id="priority' + i + '" value="' + priority[i] + '" size=2 maxlength=1><\/td><\/tr>';
		}
		string += '</table><table width=100%>';
		string += '<tr><td colspan=3>Colorpicker: <input type="text" size="7" value="" id="color"/><span id="pick" onMouseover="this.style.cursor=\'pointer\'" onclick="cp2.select(document.getElementById(\'color\'),\'pick\');return false;" href="#">&nbsp;<img border="0" src="http://www.barafranca.gen.tr/static/images/game/generic/palette.gif"/></span></td></tr>';
		string += '<tr><td colspan=3><input type=button value="Add" onclick="location.href = \'?jailint=' + (parseInt(jailint)+1) + '\'"> <input type=button value="Remove" onclick="location.href = \'?jailint=' + (parseInt(jailint)-1) + '\'"></td></tr>';
		string += '<tr><td colspan=3><input type=submit value="Save" onclick="location.href = \'?families=\'';
		for(i=0; i<jailint; i++) string += " + document.getElementById('family" + i + "').value.toUpperCase() + ','";
		string += " + '&colours='";
		for(i=0; i<jailint; i++) string += " + document.getElementById('colour" + i + "').value.replace('#', '') + ','";
		string += " + '&priority='";
		for(i=0; i<jailint; i++) string += " + document.getElementById('priority" + i + "').value + ','";
		string += '"></td></tr>';
		string += '<tr><td colspan=3 class=small>Note: If someone in jail is more than one of these settings, they will be highlighted with the colour of lowest priority number</td></tr>';
		string += '<tr><td colspan=3 class=small>Note 2: The default priority number of friends list is 3 and family is 9.</td></tr>';
		string += '</table>';

		getID('jailprefs').innerHTML = string;

		var string = '<table style="width:100%">';
		if(lh == PrefsLink + ls ) {
			string += '<tr><td>Number of news articles: <input type=text size=3 maxlength=2 id=newsamount value="' + getValue('newsamount', '5') + '"></td></tr>';
		}
		string += '<tr><td>Number of comments per page: <input type=text size=3 maxlength=2 id=comments value="' + getValue('comments', '10') + '"></td></tr>';
		string += '<tr><td>Custom background URL: <input type=text size=40 id=custombg value="' + getValue('custombg', '') + '"></td></tr>';
		string += '<tr><td><input type=submit value="Save Settings" onclick="document.location.href = \'?custombg=\' + document.getElementById(\'custombg\').value + \'&newsamount=\' + document.getElementById(\'newsamount\').value + \'&comments=\' + document.getElementById(\'comments\').value"></td></tr>';
		string += '<tr><td class=small>Note: Fingon still needs to finnish the comments part of his news. Poke him until he does ;)</td></tr>';
		string += '</table>';

		getID('newsprefs').innerHTML = string;

		var str = 'document.location.href = "?bold=" + (document.getElementById("bold").checked ? "1" : "0") + "&colour=" + document.getElementById("colour").value + "&high=" + document.getElementById("high").value + "&low=" + document.getElementById("low").value';
		var string = '<table style="width:100%">';
		string += '<tr><td>Text Colour: <input type=text id=colour size=7 maxlength=6></td></tr>';
		string += '<tr><td>High Colour: <input type=text id=high size=7 maxlength=6></td></tr>';
		string += '<tr><td>Low Colour: <input type=text id=low size=7 maxlength=6></td></tr>';
		string += '<tr><td>Bold: <input type=checkbox id=bold></td></tr><hr>';
		string += "<tr><td><input type='submit' value='Save Settings' onClick='" + str +"'></td></tr>";
		string += '</table>';

		getID('marqueeprefs').innerHTML = string;

		getID('bold').checked = (getValue('bold', '0') == '1');
		getID('colour').value = getValue('colour', '');
		getID('high').value = getValue('high', '');
		getID('low').value = getValue('low', '');

		var string = '<table style="width:100%">';
		for(j=0; j<querys.length; j++) {
			if(querys[j].indexOf("menu_") != -1) string += '<tr><td><input type=checkbox id="' + querys[j] + '"> ' + descr[j] + '</td></tr>';
		}
		string += '<tr><td><center><input type=submit value="Save Settings" onclick="' + "document.location.href = '?";
		for(j=0; j<querys.length; j++) {
			if(querys[j].indexOf("menu_") != -1) string += querys[j] + "=' + (document.getElementById('" + querys[j] + "').checked ? '1' : '0') + '&' + '";
			else break;
		}
		string += '\'"></center>';
		string += '</td></tr></table>';

		getID('menuprefs').innerHTML = string;

		for(j=0; j<querys.length; j++) {
			if(querys[j].indexOf("menu_") != -1) getID(querys[j]).checked = (getValue(querys[j], '0') == '1');
			else break;
		}

	}
	if(x.indexOf("404") == -1) { go(); }
}

//---------------- Cocaine Prices ----------------
if(dlp == '/marquee.php') {
	if(prefs[1]) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: SiteLink+'/beyond/prices'+lang.version+'.xml.php',
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'application/xml,text/xml' },
			onload: function(responseDetails) {
				var marquee = $X('//div');
				marquee.innerHTML = "";

				var parser = new DOMParser();
				var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
				
				function getPrice(drug, city) {
					return dom.getElementsByTagName(drug)[0].getElementsByTagName(city.replace(' ', ''))[0].textContent;
				}

				var title;
				var pb = getPrice('Cocaine', 'Baltimore');
				var pc = getPrice('Cocaine', 'Chicago');
				var pn = getPrice('Cocaine', 'NewYork');
				var pp = getPrice('Cocaine', 'Philadelphia');
				var pd = getPrice('Cocaine', 'Detroit');
				var pl = getPrice('Cocaine', 'LasVegas');
				var pco = getPrice('Cocaine', 'Corleone');
				var ppa = getPrice('Cocaine', 'Palermo');

				var highelem = dom.getElementsByTagName('High');
				if(highelem[0]) var high = highelem[0].textContent
				var lowelem = dom.getElementsByTagName('Low');
				if(lowelem[0]) var low = lowelem[0].textContent;
				var timeelem = dom.getElementsByTagName('Time');
				if(timeelem[0]) var time = timeelem[0].textContent;

				function ColorLow(text) { return '<span style="color:#' + getValue('low', '00ff00') + ';">' + text + '</span>'; }
				function ColorHigh(text) { return '<span style="color:#' + getValue('high', 'ff0000') + ';">' + text + '</span>'; }
				switch(low) {
					case 'Baltimore': pb = ColorLow(pb); break;
					case 'Chicago': pc = ColorLow(pc); break;
					case 'NewYork': pn = ColorLow(pn); break;
					case 'Philadelphia': pp = ColorLow(pp); break;
					case 'Detroit': pd = ColorLow(pd); break;
					case 'LasVegas': pl = ColorLow(pl); break;
					case 'Corleone': pco = ColorLow(pco); break;
					case 'Palermo': ppa = ColorLow(ppa); break;
				}
				switch(high) {
					case 'Baltimore': pb = ColorHigh(pb); break;
					case 'Chicago': pc = ColorHigh(pc); break;
					case 'NewYork': pn = ColorHigh(pn); break;
					case 'Philadelphia': pp = ColorHigh(pp); break;
					case 'Detroit': pd = ColorHigh(pd); break;
					case 'LasVegas': pl = ColorHigh(pl); break;
					case 'Corleone': pco = ColorHigh(pco); break;
					case 'Palermo': ppa = ColorHigh(ppa); break;
				}

				pb = 'Baltimore: ' + pb;
				pc = 'Chicago: ' + pc;
				pn = 'New York: ' + pn;
				pp = 'Philadelphia: ' + pp;
				pd = 'Detroit: ' + pd;
				pl = 'Las Vegas: ' + pl;
				pco = 'Corleone: ' + pco;
				ppa = 'Palermo: ' + ppa;

				function separatorSpan() {
					var separator = cEL('span');
					separator.innerHTML = ' || ';
					return separator;
				}

				var hoverdiv = cEL('div');
				hoverdiv.id = 'hiddenbox';
				hoverdiv.style.display = 'none';
				hoverdiv.style.position = 'absolute';
				hoverdiv.style.backgroundColor = '#000000';
				hoverdiv.style.border = 'solid white 1px';
				hoverdiv.style.fontSize = "9px";
				hoverdiv.style.top = "2px";
				hoverdiv.style.width = "520px";
				hoverdiv.style.textAlign = "center";
				marquee.appendChild(hoverdiv);

				function hoverlink(city, priceStr) {
					var link = cEL('a');
					link.href = "#";
					link.style.color = '#' + getValue('colour', 'ffffff');
					link.style.fontSize = '10px';
					if(city == "Palermo" || city == "Corleone" || city == "Las Vegas" || city == "Detroit")
						link.addEventListener('mouseover', function(event) { hovermenu(city, event.clientX - 525) }, true);
					else
						link.addEventListener('mouseover', function(event) { hovermenu(city, event.clientX + 25) }, true);
					link.addEventListener('mouseout', function(event) { hovermenuout() }, true);
					link.innerHTML = priceStr;

					return link;
				}

				function hovermenu(city, x) {
					var hoverdiv = getID('hiddenbox');
					hoverdiv.style.display = 'inline';
					hoverdiv.style.left = x + "px";

					var hoverhtml = 'Morphine: ' + getPrice("Morphine", city) + ' || ';
					hoverhtml += 'Heroin: ' + getPrice("Heroin", city) + ' || ';
					hoverhtml += 'Opium: ' + getPrice("Opium", city) + ' || ';
					hoverhtml += 'Whiskey: ' + getPrice("Whiskey", city) + ' || ';
					hoverhtml += 'Amaretto: ' + getPrice("Amaretto", city) + ' || ';
					hoverhtml += 'Rum: ' + getPrice("Rum", city);

					hoverdiv.innerHTML = hoverhtml;
				}

				function hovermenuout() {
					var hoverdiv = getID('hiddenbox');
					hoverdiv.style.display = 'none';
				}

				function flytolink(city, priceStr, priceToFly, cityId) {
					var link = cEL('a');
					link.href = "#";
					link.id = city;
					link.style.color = '#' + getValue('colour', 'ffffff');
					link.style.fontSize = '10px';
					link.addEventListener('click', function() { flyto(city, priceToFly, cityId) }, true);

					if(prefs[17]){
						if(city == "Palermo" || city == "Corleone" || city == "Las Vegas" || city == "Detroit") {
							link.addEventListener('mouseover', function(event) { hovermenu(city, event.clientX - 525); this.style.textDecoration='underline' }, true);
						}
						else {
							link.addEventListener('mouseover', function(event) { hovermenu(city, event.clientX + 25); this.style.textDecoration='underline' }, true);
						}
						link.addEventListener('mouseout', function(event) { hovermenuout(); this.style.textDecoration='none' }, true);
					}
					else {
						link.addEventListener('mouseover', function() { this.style.textDecoration='underline' }, true);
						link.addEventListener('mouseout', function() { this.style.textDecoration='none' }, true);
					}

					link.innerHTML = priceStr;
					return link;
				}

				function flyto(city, costs, cityid) {
					var del = confirm(lang.marquee[0] + city + lang.marquee[1] + costs);
					if (del == true) {
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://' + dlh + '/travel.php',
							onload: function(responseDetails) {
								if(responseDetails.responseText.match("<script ") != null) {
									GM_xmlhttpRequest({
										method: 'GET',
										url: 'http://' + dlh + '/travel.php?whereto=' + cityid,
										onload: function(responseDetails) {
											try { 
												alert(responseDetails.responseText.slice((responseDetails.responseText.indexOf('</head>'))+7).replace(/<\S[^><]*>/g,''));
											} 
											catch(e) { 
												alert("Error while traveling to "+ city + "..."); 
											}
										}
									});
								} 
								else {
									alert(responseDetails.responseText.substr(responseDetails.responseText.indexOf('</head>') + 7).replace(/<\S[^><]*>/g,''));
								}
							}
						});
					}
				}

				var span = cEL('span');

				var priceandtime = cEL('span');

				function saC(x) { span.appendChild(x); }
				saC(priceandtime);
				saC(flytolink('Chicago', pc, 500, '1'));
				saC(separatorSpan());
				saC(flytolink('Baltimore', pb, 500, '6'));
				saC(separatorSpan());
				saC(flytolink('New York', pn, 500, '3'));
				saC(separatorSpan());
				saC(flytolink('Philadelphia', pp, 500, '5'));
				saC(separatorSpan());
				saC(flytolink('Detroit', pd, 500, 'nul'));
				saC(separatorSpan());
				saC(flytolink('Las Vegas', pl, 500, '4'));
				saC(separatorSpan());
				saC(flytolink('Corleone', pco, 500, '7'));
				saC(separatorSpan());
				saC(flytolink('Palermo', ppa, 500, '2'));
				saC(separatorSpan());

				var link = cEL('a');
				link.href = "prices.php";
				link.target = 'main';
				link.innerHTML = lang.marquee[2];
				if(getValue('bold', '0') == '1') link.style.fontWeight = 'bold';
				link.style.color = '#' + getValue('colour', 'ffffff');
				link.style.fontSize = '10px';
				link.addEventListener('mouseover', function() { this.style.textDecoration='underline' }, true);
				link.addEventListener('mouseout', function() { this.style.textDecoration='none' }, true);
				span.appendChild(link);
				priceandtime.innerHTML = lang.marquee[3] + time + ' || ';

				if(getValue('bold', '0') == '1') span.style.fontWeight = 'bold';
				span.style.color = '#' + getValue('colour', 'ffffff');
				span.style.fontSize = '10px';
				marquee.appendChild(span);

				var refresh = 120 * 1000;
				window.onload = setTimeout("window.location.reload()", refresh);
			}
		});
	}
}

//---------------- Menu and submenus ----------------
if(dlp == '/menu.php') {
	//change all users link
	db.innerHTML = db.innerHTML.replace('allusers.php', 'allusers.php?start=0&order=lastrank&sort=DESC');
//--add additional menus
	function appMenu(x){
		innerHTML += '</tbody></table></div></td></tr></tbody>';
		subMenu.innerHTML = innerHTML;
		subMenu.setAttribute('cellspacing','0');
		subMenu.setAttribute('cellpadding','0');

		var table = $X('/html/body/table/tbody/tr/td/table['+x+']');
		table.parentNode.insertBefore(subMenu, table);
	}
	var xp = '/html/body/table/tbody/tr/td/table[3]/tbody/tr[2]/td/div/table/tbody';
	if(prefs[0]){
		var subMenu = cEL('table');
		var innerHTML = '<tbody><tr><th onclick="Menu.toggle(this);">Beyond</th></tr><tr><td><div style="overflow: hidden;"><table cellspacing="0" cellpadding="0"><tbody>';
		for(i=0;i<qlinks.length;i++) {
			innerHTML += '<tr><td><a target="main" onmousedown="return false;" href="'+ qlinks[i];
			innerHTML += '" class="menuLink">'+descr[i]+'</a></td></tr>';
		}
		appMenu(3);
	}
	else $X(xp).innerHTML = '<tr><td><a target="main" onmousedown="return false;" href="'+PrefsLink+'" class="menuLink">'+lang.prefsname+'</a></td></tr>' + $X(xp).innerHTML;
	
	var subMenu = cEL('table');
	var innerHTML = '<tbody><tr><th onclick="Menu.toggle(this);">Calculators</th></tr><tr><td><div style="overflow: hidden;"><table cellspacing="0" cellpadding="0"><tbody>';
	for(i=0;i<calcName.length;i++) {
		innerHTML += '<tr><td><a target="main" onmousedown="return false;" href="'+ SiteLink + '/old/calculators/'+ calcName[i].toLowerCase() + '.html';
		innerHTML += '" class="menuLink">'+calcName[i]+' Calculator</a></td></tr>';
	}
	appMenu(7);
//--end adding menus
//--start assembling vars
	if(dls.indexOf('reset') != -1) { //mode = oh noes!
		setValue('submenus','0');
	}

	var submenus = getValue('submenus',0);

	//get # of submenu's
	var tables = $X('/html/body/table/tbody/tr/td').getElementsByTagName('table').length;
	var subs = tables/2;
	if(db.innerHTML.search('Crew</th>') != -1) subs--;//check for crew submenu


	//get # of buttons in submenu's
	var buttons = new Array();
	for(i=1,j=0;i<=subs;i++,j++){
		var num = parseInt($X('/html/body/table/tbody/tr/td/table['+i+']/tbody/tr[2]/td/div/table/tbody').getElementsByTagName('tr').length);
		buttons[j] = num;
		if(i==subs) { buttons[j] = buttons[j] - 1; }
	}

	if(submenus!=0) { //don't act if nothing is saved in GM
		
		//get menuprefs from GM or set ghostprefs
		if(getValue('buttonpref1','0')!=0) { var act1 = "getValue('buttonpref"; var act2 = "')"; }
		else if(getValue('keypref1','0')!=0){ var act1 = "getValue('keypref"; var act2 = "').replace(/[^a-z.]/ig,'1')"; }
		var str="[";
		for(i=1;i<=submenus-1;i++) { 
			str += act1+i+act2;
			if(i!=submenus) { str += ","; } 
		}
		str += "]";
		var menuprefs = eval(str);
		
		//get keyprefs from GM or set ghostprefs
		if(getValue('keypref1','0')!=0) { var act1 = "getValue('keypref"; var act2 = "')"; }
		else { var act1 = "getValue('buttonpref"; var act2 = "').replace(/0|1/g,'*')"; }
		var str="[";
		for(i=1;i<=submenus-1;i++) { 
			str += act1+i+act2;
			if(i!=submenus) { str += ","; } 
		}
		str += "]";
		var keyprefs = eval(str);

		var mprefs = new Array(); var i=0;//see if submenu can be deleted totaly
		menuprefs.forEach(function($n){if(menuprefs[i].indexOf('1')==-1){mprefs[i]=0;}else{mprefs[i]=1;}i++;});
	}
	var QL_xp ='//td[@class="container"]'
//--end assembling vars

//--customs script
	//add buttons
	$X(QL_xp).innerHTML = $X(QL_xp).innerHTML + 'Menu: <img onMouseover="style.cursor=\'pointer\'" title="Customize Menu" onClick="location.href=\'menu.php?menu\'" src="'+SiteLink+'/gm/menu.png"> <img onMouseover="style.cursor=\'pointer\'" title="Customize hotkeys" onClick="location.href=\'menu.php?keys\'" src="'+SiteLink+'/gm/key.png"> <img onMouseover="style.cursor=\'pointer\'" title="Reset menu" onClick="location.href=\'menu.php?reset\'" src="'+SiteLink+'/gm/reset.png">';
	//check 'mode' and add corresponding html
	if(!dls || dls.indexOf('reset') != -1){//mode=normal
		if(submenus != 0){
			//check current menu matches with saved prefs
			var uptodate=1;var i=0;
			if(menuprefs.length!=subs){var uptodate=0;}
			buttons.forEach(function($n){if($n != menuprefs[i].length){uptodate=0;}i++;});
			if(uptodate==0){alert(lang.newmenu);return}

			for(i=subs;i>=1;i--){
				if(mprefs[i-1]==0) { del('/html/body/table/tbody/tr/td/table['+i+']'); }
				else {
					for(j=buttons[i-1];j>=1;j--) { //delete button or add hotkey
						var xp_tr = '/html/body/table/tbody/tr/td/table['+i+']/tbody/tr[2]/td/div/table/tbody/tr['+j+']';
						var kpref = keyprefs[i-1].slice(j-1,j);
						if(menuprefs[i-1].slice(j-1,j) == 0) del(xp_tr);
						else if(kpref != '*') { 
							var but = $X(xp_tr + '/td/a');
							but.accessKey = kpref;
							but.innerHTML = but.innerHTML + " ("+ kpref.toUpperCase() +")"
						}
					}
				}
			}
		}
		//checker
		if(db.innerHTML.indexOf(lang.prefsname) == -1) { db.innerHTML = '<br><p style="color:yellow; font-weight:bold; text-align: center;">'+lang.fucked[0]+'</p><p style="color:#DFDFDF; text-align: center;">'+lang.fucked[1]+'</p><br><center><input type="button" onclick="location.href=\'menu.php?reset\'" value="Reset!" style="width: 70px; height: 22px; font-weight: bold;"/></center>'; }
	} 
	else {
		//add style for customs
		var style = '';
		style+='#beyondadd{padding-left:5px;width:20px;background:#808F8F;BORDER-BOTTOM:#707f7f 1px solid;}';
		style+='#beyondadd input{width:20px;}';
		style+='a.menuOmertaBeyond{background-color: #808f8f;border-bottom: 1px solid #707f7f;color: #fff;display: block;font-size: 11px;margin: 0;padding: 5px 5px;text-decoration: none;}';
		style+='a.menuOmertaBeyond:hover{background-color: #606f6f;color: #dddd00;text-decoration: none;}';
		GM_addStyle(style);

		if(dls.indexOf('?newmenu=') != -1) { var mode = ['Menu','newmenu','rawmenuprefs','buttonpref']; }
		if(dls.indexOf('?newkeys=') != -1) { var mode = ['Hotkey','newkeys','rawkeyprefs','keypref']; }
		
		if((dls.indexOf('?newmenu=') != -1) || (dls.indexOf('?newkeys=') != -1)) { //mode = updated menu/keys
			$X('html/body').innerHTML = "<font color='red'>" + mode[0] + lang.customs + "</font>" + $X('html/body').innerHTML;
			var newprefs = GetParam(mode[1]); 
			setValue(mode[2],newprefs);
			for(i=0;i<=buttons.length-1;i++) {
				setValue(mode[3]+(i+1),newprefs.slice(0,buttons[i]));
				var newprefs = newprefs.slice(buttons[i]);
			}
			setValue('submenus',i+1);
			setTimeout("location.href='menu.php'", 2000);
		}

		//mode = customize
		if(dls.indexOf('menu') != -1) var upmenu=1;
		if(dls.indexOf('keys') != -1) var upkeys=1;
		if(upmenu || upkeys) {
			window.addEventListener("load", function() {
				if(upmenu) { var raw = getValue('rawmenuprefs','*'); }
				else { var raw = getValue('rawkeyprefs','0'); }
				for(i=1,q=1;i<=subs;i++){
					for(j=1;j<=buttons[i-1];j++,q++) {
						var xp_tr = '/html/body/table/tbody/tr/td/table['+i+']/tbody/tr[2]/td/div/table/tbody/tr['+j+']';
						var xp_a = xp_tr + '/td/a';

						var href = $X(xp_a).href;
						var content = $X(xp_a).innerHTML;
						var prefx = raw.slice(q-1,q)

						if(upmenu){
							$X(xp_tr).innerHTML = '<td id="beyondadd"><input type="checkbox" checked="0" id="ip'+q+'"></td><td><a target="main" onmousedown="return false;" href="'+href+'" class="menuOmertaBeyond">'+content+'</a></td>';
							if(prefx == '0' && submenus != 0) { getID('ip'+q).checked = false; }
						}
						else {
							$X(xp_tr).innerHTML = '<td id="beyondadd"><input type="text" style="text-align: center;" maxlength="1" id="ip'+q+'"/></td><td><a target="main" onmousedown="return false;" href="'+href+'" class="menuOmertaBeyond">'+content+'</a></td>';
							if(raw != '0' && prefx != '*' && submenus != 0) { getID('ip'+q).value = prefx; }
						}
					}
				}
			}, true);

			//get # of inputs
			for(i=1,q=1;i<=subs;i++){for(j=1;j<=buttons[i-1];j++,q++){inputs=q+1;}}

			//add save button
			if(upmenu){ var savebutton = 'var query=\'\';for(i=1;i<='+(inputs-1)+';i++){query += document.getElementById(\'ip\'+i).checked;}location.search = \'?newmenu=\'+query.replace(/false/g,0).replace(/true/g,1);'; }
			else { var savebutton = 'var query=\'\';for(i=1;i<='+(inputs-1)+';i++){query += document.getElementById(\'ip\'+i).value;if(document.getElementById(\'ip\'+i).value==\'\'){query +=\'*\'}}location.search = \'?newkeys=\'+query;'; }

			var xp1 = '//td[@class="container"]';
			var str = '';
			str += '<input type="button" onclick="'
			str += savebutton;
			str += '" value="Save!" style="width: 70px; height: 22px; font-weight: bold;"/>';
			$X(QL_xp).innerHTML = str;

		}
		$X(QL_xp).setAttribute("colspan", "2");//addept quick lookup colspan to match customs lay-out
	}
}

//---------------- Status page ----------------
if(dlp == '/information.php') {
	var x, capoMoneyXpath, myNameXpath, testamentXpath, tcXpath;
	if(prefs[6]) { //if remove Jailbusting Skill is on
		del("/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[6]");
	}
	x = '/html/body/center/table/tbody/tr/td/table/tbody/tr[';
	if(prefs[12]) { //if remove Capo Money is on
		capoMoneyXpath = x+'5]/td[2]';
		$X(capoMoneyXpath).innerHTML = $X(capoMoneyXpath).innerHTML.slice(0,$X(capoMoneyXpath).innerHTML.indexOf(" ("));
	}
	myNameXpath = x+'3]/td[2]';
	$X(myNameXpath).innerHTML = "<a href=user.php?nick=" + getTXT(myNameXpath) + ">"+ getTXT(myNameXpath) +"</a>";
	testamentXpath = x+'12]/td[2]';
	$X(testamentXpath).innerHTML = "<a href=user.php?nick=" + getTXT(testamentXpath).split("\t")[1] + ">"+ getTXT(testamentXpath).split("\t")[1] +"</a>";
}

//--------------- Bullet form --------------
if(dlp == '/bullets2.php'){
	if(prefs[8]) { //If auto fill form is on
		var x, xpath, td, str, sp1, sp2, str, bfxp, bftd, bfstr, bfsp1, bfsp2, bfstr, BFTextXp, BFText;

		x = db.innerHTML;
		if (x.search(/table/i) != -1) {
			xpath = "//html/body/center/table/tbody/tr[3]/td";
			td = $X(xpath).innerHTML; 
			str = td.slice(td.search(lang.bullets[0]));
			sp1 = str.search(lang.bullets[1]) + lang.bullets[2];
			sp2 = str.search(lang.bullets[3]) - 1;
			str = str.slice(sp1,sp2);

			if( str >= 400) { getTAG('input')[0].value = 400; }
			else { getTAG('input')[0].value = str; }

			bfxp = "/html/body/center[2]/table/tbody/tr[3]/td";
			bftd = $X(bfxp).innerHTML; 
			bfstr = bftd.slice(bftd.search(lang.bullets[0]));
			bfsp1 = bfstr.search(lang.bullets[1]) + lang.bullets[2];
			bfsp2 = bfstr.search(lang.bullets[3]) - 1;
			bfstr = bfstr.slice(bfsp1,bfsp2).replace(/,/g,'');
			getTAG('input')[4].value = bfstr;

			window.addEventListener("load", function() { getTAG('input')[1].focus(); }, true);
		}
	}
	BFTextXp = '/html/body/center[2]/table/tbody/tr/td'
	BFText = getTXT(BFTextXp).split(' ');
	$X(BFTextXp).innerHTML = BFText[0] + " " + BFText[1] + " " + BFText[2] + " " +  "<a href=user.php?nick=" + BFText[3].replace('\.','').toLowerCase() + "><b><i>"+ BFText[3] +"</i></b></a>"+ " " + BFText[4] + " " + BFText[5] + " " +  "<i>" + BFText[6] + "</i>" + " " + BFText[7];
}

//---------------- Fingons News ----------------
if(dlp == '/info.php') {
	var menu, url;
	if(prefs[2]) { //If Fingon's News menu preference is on
		menu = getTAG("link")[0].href;
		url = FingonUrl+'/beyond-news.php?num=' + getValue('newsamount', 5) + '&version='+lang.fingon+'&css='+ menu +'&url=' + dlh;
		if(getValue('custombg', '') != '') url += '&pron=' + getValue('custombg');
		location.href = url;
	}
}

//---------------- Jail Highlighter and Jail autoform ----------------
if(dlp == '/jail.php') {
	var x = db.innerHTML;
	if (x.search(/table/i) != -1) {
		if(prefs[3]) { //If Jail highlighter preference is on
			var words = getValue('families', '').split(",");
			var bgColors = getValue('colours', '').split(",");
			var priority = getValue('priority', '').split(",");
			var thispri = new Array();
			var flag = 1;
			for(p=9;p>=0;p--) {
				for (i=0;i<words.length;i++) {
					if(priority[i] != p) continue;
					var xpath = "//tr[contains(translate(.,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'" + words[i] + "')]";
					var results = document.evaluate(xpath, document, null, 7, null);
					for (j=results.snapshotLength-1;j>=0;j--) {
						//if the guy is a friend
						if(results.snapshotItem(j).bgColor == 'yellow') {
							if(priority[i] > 3) continue;
							else {
								results.snapshotItem(j).childNodes[9].childNodes[0].checked = true;
								flag = 0;
							}
						}
						else if(bgColors[i].length > 0) {
							results.snapshotItem(j).style.backgroundColor = '#' + bgColors[i];
							results.snapshotItem(j).childNodes[9].childNodes[0].checked = true;
							flag = 0;
						}
					}
				}
			}
		}
		if(flag==1) {
			var radios = $x('//input[@type="radio"]');
			radio = radios[Math.floor(radios.length*Math.random())]; 
			radio.checked = true;
		}
		if(getTAG('input')[0] != null) getTAG('input')[0].focus();
	}
}
// In jail type box focus
if(dlp == '/iminjail.php') {
	if(getTAG('input')[0] != null) { getTAG('input')[0].focus(); }
	var x = db.innerHTML;
	if(prefs[15]) { if(x.indexOf("<img") != -1) { $X("/html/body/table/tbody/tr/td/a").accessKey = 'u'; } } //buy out hotkey
}

//---------------- wrongcode --------------
if((dlp + dls == '/BeO/webroot/index.php?module=Crimes&action=docrime' || dlp + dls == '/BeO/webroot/index.php?module=Cars&action=docar' || dlp == '/smuggling.php')  && prefs[11]) {
	var txt = db.innerHTML;
	if (txt.search(lang.wrongcode[0]) != -1) { 
		db.innerHTML = lang.wrongcode[1];
		setTimeout("history.back()",1000);
	}
}

//---------------- Crime page ----------------
if(dlp + dls == '/BeO/webroot/index.php?module=Crimes') {
	var x = db.innerHTML;
	if (x.search(/table/i) != -1) {
		if(prefs[4]) { //If remove shooting bottle is on
			del("/html/body/center/table/tbody/tr[3]/td/table/tbody/tr[6]");
			window.addEventListener("load", function() { getTAG('input')[6].focus(); }, true);
		}
		if(prefs[8]){ //If autoforms are on
			if(getTAG('input')[6] != null) {
				if(prefs[4]){ 
					body = db.innerHTML;
					if (body.search(lang.crimes) != -1) {

						var xpath = "/html/body/center/table/tbody/tr[3]/td/table/tbody/tr[";
						for(i=1;i<=5;i++) { //Get percentages
							var xpath2 = xpath + i + "]/td[3]"
							var y = "p" + i;
							eval(y+"= gsPATH(xpath2)")
						}

						var x = Math.min(p1,p2,p3,p4,p5); //Select Lowest percentage
						if (p1 == x) { getTAG('input')[1].checked = true; }
						if (p2 == x) { getTAG('input')[2].checked = true; }
						if (p3 == x) { getTAG('input')[3].checked = true; }
						if (p4 == x) { getTAG('input')[4].checked = true; }
						if (p5 == x) { getTAG('input')[5].checked = true; }
						window.addEventListener("load", function() { getTAG('input')[6].focus(); }, true); 
					}
				}
				else {
					getTAG('input')[6].checked = true;
					getTAG('input')[7].focus();
				}
			}
		}
	}
	else {
		if(prefs[10]){
			var x = x.slice(x.indexOf(":"));//slice string to just minutes
			var m = x.slice(0,x.indexOf(lang.timeUp[0]));
			var m = m.slice(2,3);

			var sp1 = x.indexOf(lang.timeUp[1]) + lang.timeUp[2]; //slice string to just seconds
			var sp2 = x.indexOf(lang.timeUp[3]) + lang.timeUp[4];
			var s = x.slice(sp2,sp1);
			var s = s.slice(0,2);
			var s = s.replace(/ /ig,"");

			var ms = (s - 1 + (m * 60)) * 1000; 
			setTimeout("window.location.reload()", ms);
		}
	}
}

//----------------- Cars Page --------------------
if(dlp + dls == '/BeO/webroot/index.php?module=Cars') {
	var x = db.innerHTML;
	if (x.search(/table/i) != -1) {
		if(prefs[8]){ //If auto select highest percentage at Car Nick is on
			body = db.innerHTML;
			if (body.search(lang.cars) != -1) {

				var xp = "/html/body/center/table/tbody/tr[3]/td/form/table/tbody/tr[";
				for(i=1;i<=4;i++) { //Get percentages
					var xpath2 = xp + i + "]/td[3]"
					var y = "p" + i;
					eval(y+"= gsPATH(xpath2)")
				}

				var x = Math.max(p1,p2,p3,p4); //Select Highest percantage
				if (p1 == x) { getTAG('input').checked = true; }
				if (p2 == x) { getTAG('input')[2].checked = true; }
				if (p3 == x) { getTAG('input')[3].checked = true; }
				if (p4 == x) { getTAG('input')[4].checked = true; }
			}
		}
		if(getTAG('input')[5] != null) { getTAG('input')[5].focus(); }
	}
	else {
		if(prefs[10]){ //If autoreload is on
			var x = x.slice(x.indexOf(":")); //slice string to just minutes
			var m = x.slice(0,x.indexOf(lang.timeUp[0])); 
			var m = m.slice(2,3);

			var sp1 = x.indexOf(lang.timeUp[1]) + lang.timeUp[2]; //slice string to just seconds
			var sp2 = x.indexOf(lang.timeUp[3]) + lang.timeUp[4];
			var s = x.slice(sp2,sp1);
			var s = s.slice(0,2);
			var s = s.replace(/ /ig,"");

			var ms = (s - 1 + (m * 60)) * 1000; 
			setTimeout("window.location.reload()", ms);
		}
	}
}

//---------------- DC+ info bar ----------------
if(dlp == '/mid.php') {
	var healthXpath, healthXpathBar, ksXpath, ksXpathBar, boXpath;
	healthXpath = '/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td[5]'
	healthXpathBar = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td[6]/dl/dt'
	ksXpath = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[3]/td[5]'
	ksXpathBar = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[3]/td[6]/dl/dt';
	boXpath = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[4]/td[5]'
	if(!$X(healthXpath) == 0 ) { $X(healthXpath).innerHTML = "<a href=bloodbank.php target=main>" + $X(healthXpath).innerHTML + "</a>"; }
	if(!$X(healthXpathBar) == 0 ) { $X(healthXpathBar).innerHTML = "<a href=bloodbank.php target=main>" + $X(healthXpathBar).innerHTML + "</a>"; }
	if(!$X(boXpath) == 0 ) { $X(boXpath).innerHTML = "<a href=jail.php target=main>" + $X(boXpath).innerHTML + "</a>"; }
	if(!$X(ksXpath) == 0 ) { 
		if(Math.round(getTXT(ksXpathBar).replace('%','')) >= '75'){ $X(ksXpath).innerHTML = "<a href=BeO/webroot/index.php?module=Crimes target=main>" + $X(ksXpath).innerHTML + "</a>"; }
		else $X(ksXpath).innerHTML = "<a href=range.php target=main>" + $X(ksXpath).innerHTML + "</a>";
	}
	setTimeout("window.location.reload()", '60000');
}

//---------------- User Profile ---------------------
if((dlp + dls) == ('/user.php' + dls)){
	if(prefs[7]) { // if Remove ImageShack / PhotoBucket / XS links option is on
		var xpath = "//img[contains(@src, 'imageshack.us')] | //img[contains(@src, 'photobucket.com')] | //img[contains(@src, 'xs.to')]";
		var results = document.evaluate(xpath, document, null, 7, null);
		for (i=0;i<results.snapshotLength;i++) {
			var img = results.snapshotItem(i);
			var link = cEL('a');
			var br = cEL('br');
			link.setAttribute('href',img.getAttribute('src'));
			link.innerHTML = img.getAttribute('src');
			img.parentNode.appendChild(link);
			img.parentNode.appendChild(br);
			link.parentNode.removeChild(img);
		}
	}
	
	if(prefs[16] && db.innerHTML.search('table') != -1) { //if detailed w/r is on
		//Wealth
		var tr = 11;
		var x = db.innerHTML.search(lang.profile[0]);
		var y = db.innerHTML.search(lang.profile[1]);
		var z = db.innerHTML.search(lang.profile[2]);

		if(x==-1) tr--;
		if(y==-1) tr--;
		if(z==-1) tr--;
		var xpath = "/html/body/center/table/tbody/tr["+tr+"]/td[2]";
		var wlth = $X(xpath).innerHTML;

		function setwealth(wealth) { $X(xpath).innerHTML = $X(xpath).innerHTML + wealth; }

		if(wlth.search(lang.wealth[0]) != -1) { setwealth(" (0 - 50.000)") }
		else if(wlth.search(lang.wealth[1]) != -1) { setwealth(" (50.000 - 100.000)") }
		else if(wlth.search(lang.wealth[2]) != -1) { setwealth(" (100.000 - 500.000)") }
		else if(wlth.search(lang.wealth[3]) != -1) { setwealth(" (1.000.000 - 5.000.000)") }
		else if(wlth.search(lang.wealth[4]) != -1) { setwealth(" (5.000.000 - 15.000.000)") }
		else if(wlth.search(lang.wealth[5]) != -1) { setwealth(" ( > 15.000.000)"); }
		else if(wlth.search(lang.wealth[6]) != -1) { setwealth(" (500.000 - 1.000.000)"); }

		//Raceform
		var xpath = "/html/body/center/table/tbody/tr["+(tr+1)+"]/td[2]";
		var rf = $X(xpath).innerHTML;

		var x = lang.driver;
		for(i=0;i<=10;i++) {
			var y=x[i];
			if(rf.indexOf(y) == 0) { $X(xpath).innerHTML = (i+1) + " - " + $X(xpath).innerHTML; }
		}
	}

	if(prefs[13] && db.innerHTML.search('table') != -1){ //if Nickreader is on
		extJS(SiteLink+lang.requesting);

		var style = '';
		style += ".pop{position: relative;z-index:0;}";
		style += ".pop:hover{background-color:transparent;z-index:1;text-decoration:none;}";
		style += ".pop span{position:absolute;background-color:#A8A8A8;padding:5px;left:-1000px;width:250px;border:1px dashed gray;visibility:hidden;color:black;text-decoration:none;}";
		style += ".pop:hover span{visibility:visible;top:+45px;left:-20px;text-decoration:none;}";
		style += ".lol:hover {text-decoration:underline;}";
		GM_addStyle(style);

		for(j=1;j<=2;j++) {//both lines
			var xpath = "/html/body/center/table/tbody"; //get friends row

			var trs = $X(xpath).getElementsByTagName('tr').length;
			for(i=1;i<=trs;i++) {
				var xpath = "/html/body/center/table/tbody/tr[" + i + "]/td";

				var trcontent = $X(xpath).innerHTML;
				if (trcontent.indexOf(lang.friends) != -1) { tr = i; i = trs; }
			}

			var xpath = "/html/body/center/table/tbody/tr[" + tr + "]/td[2]/table/tbody/tr/td[" + j + "]"; //get nicks

			var num = $X(xpath).getElementsByTagName('a').length;
			var a = $X(xpath).getElementsByTagName('a');	
			var num = num*2;
			for(i=0;i<num;i=i+2) {//add popup
				var nick = $X(xpath).getElementsByTagName('a')[i].innerHTML;
				a[i].setAttribute("class","pop");
				a[i].innerHTML = "<a class='lol'>" + a[i].innerHTML + "</a><span id='" + j + i + "'> "+lang.loading+"</span>"; 
				var str = "$X(xpath).getElementsByTagName('a')["+i+"].setAttribute(\"onMouseover\",\"makeHttpRequest('user.php?nick=" + nick + "','" + j + i + "')\")";
				eval(str);
			}
		}
	}
}

//---------------- Take all out of bank ----------------
if(dlp == '/bank.php') {
	var table, td, td2, bank, pocket;
	if(prefs[5]) { //If All in/out of Bank preference is on
		table = $x("//table")[2];
		td = table.getElementsByTagName("td")[2];

		if(td.textContent.substring(0, lang.bank[0]) == lang.bank[1]) var o = 2; else var o = 9;
		td2 = table.getElementsByTagName("td")[o];

		bank = td.textContent.replace(/[^0-9.]/g,'');
		td.innerHTML = '<a href="#" onclick="document.getElementsByName(\'amounttpob\')[0].value = \'' + bank +'\'; document.getElementsByTagName(\'input\')[8].checked = true;">' + td.textContent + '</a>';	
		pocket = td2.textContent.replace(/.*\$| .*/,'').replace(/[^0-9.]/g,'');
		td2.innerHTML = '<a href="#" onclick="document.getElementsByName(\'amounttpob\')[0].value = \'' + pocket +'\'; document.getElementsByTagName(\'input\')[7].checked = true;">' + td2.textContent + '</a>';
	}
}

//---------------- Garage Crusher ----------------
if(dlp == '/garage.php') {
	var rows = $x('//tr').length;

	var xpath = "/html/body/form/center/table/tbody/tr[" + rows + "]/td"//add menu
	var string = '<td><label><input type="checkbox" checked="1" ';
	$X(xpath).innerHTML = $X(xpath).innerHTML + 
	' <br><br><hr><br>' +
	' Select if worth is <select size="1" id="X"><option value="1">under</option><option value="0">above</option></select>: $ <input type="text" value="6000" maxlength="5" size="8" id="max"/>' +
	'<table><tr>' +
	string+'id="heist">Skip Heist cars</label></td>' +
	string+'id="oc">Skip OC cars</label></td>' + 
	'</tr><tr>' +
	string+'id="truck">Skip Trucks</label></td>' +
	string+'id="moc">Skip MOC cars</label></td>' +
	'</tr><tr>' +
	string+'id="nodam">Skip 0% cars</label></td><td>&nbsp;</td>' +
	'</tr></table>' +
	' <input type="button" onclick="javascript:document.location.href = \'?max=\' + document.getElementById(\'max\').value + \'&X=\' + document.getElementById(\'X\').value + \'&truck=\' + (document.getElementById(\'truck\').checked ? \'1\' : \'0\') + \'&oc=\' + (document.getElementById(\'oc\').checked ? \'1\' : \'0\') + \'&moc=\' + (document.getElementById(\'moc\').checked ? \'1\' : \'0\') + \'&heist=\' + (document.getElementById(\'heist\').checked ? \'1\' : \'0\') + \'&nodam=\' + (document.getElementById(\'nodam\').checked ? \'1\' : \'0\');" value="Go" name="action"/>'
	;


	if(ls.length > 1) {//select cars
		if(ls.indexOf('heist') != -1 || ls.indexOf('nodam') != -1 || ls.indexOf('max') != -1 || ls.indexOf('oc') != -1) {
			var max = 0;
			var truck = 0;
			var oc = 0;
			var moc = 0;
			var heist = 0;
			var nodam = 0;

			var a = 0;

			function checkcar(car) {
				switch(car) {
					case 'Hudson-Essex Super Six': hcar = 1; break;
					case 'Packard 1100 Sedan': hcar = 1; break;
					case 'Packard 740 Roadster': hcar = 1; break;
					case 'Bentley 3.5 Litre Coupï¿½': hcar = 1; break;
					case 'Lincoln KA': hcar = 1; break;
					case 'Reo Royale 8 Convertible': hcar = 1; break;
					case 'Mercedes-Benz 320 Cabriolet': hcar = 1; break;
					case 'Bugatti Type 35': hcar = 1; break;
					case 'Duesenberg SJ': hcar = 1; break;
					case 'Bugatti Type 32 \'Tank\'': hcar = 1; break;
					case 'Alfa Romeo Spyder': hcar = 1; break;
					case 'Bugatti 57C Atalante': hcar = 1; break;
				}
				switch(car) {
					case 'Crossley Kegresse Half-Track Truck': occar = 1; break;
					case 'Rolls Royce Phantom II': occar = 1; break;
					case 'Cadillac V16 Series 452 C Fleetwood Towncar Cabriolet 193': occar = 1; break;
					case 'Alpha Romeo Sport Touring Berlinetta': occar = 1; break;
					case 'Bentley 3 Litre Vanden Plas Tourer': occar = 1; break;
					case 'Bugatti Type 50 Coupeï¿½ Profileï¿½': occar = 1; break;
					case 'Duesenberg J Rollston Berline': occar = 1; break;
					case 'Auburn 851 SC': occar = 1; break;
					case 'Ford DeLuxe': occar = 1; break;
					case 'Auburn 852 Supercharged': var occar = 1; break;
				}
				switch(car) {
					case 'Duesenberg X Locke': moccar = 1; break;
					case 'Packard Custom': moccar = 1; break;
					case 'Dodge Thunderbolt Concept': moccar = 1; break;
				}
				switch(car) {
					case 'Crossley Kegresse Half-Track Truck': trcar = 1; break;
					case 'Packard Custom': trcar = 1; break;
					case 'Oshkosh Model A': trcar = 1; break;
				}
			}

			for(i=2;i<rows-2;i++) {
				var i=i+2;
				var y = "/html/body/form/center/table/tbody/tr["+i+"]/td[2]/a";//get car
				var car = $X(y).innerHTML;
				var z = "/html/body/form/center/table/tbody/tr["+i+"]/td[3]";//get percentage damage
				var perc = $X(z).innerHTML;

				i--;
				var perc = parseInt(perc.slice(0,perc.indexOf("%")));

				var hcar = 0;
				var occar = 0;
				var trcar = 0;
				var moccar = 0;
				checkcar(car);

				var stop = 0; //check if car needs to be skipped
				if(GetParam('heist') == 1 && hcar == 1) var stop = 1;
				if(GetParam('oc') == 1 && occar == 1) var stop = 1;
				if(GetParam('truck') == 1 && trcar == 1) var stop = 1;
				if(GetParam('moc') == 1 && moccar == 1) var stop = 1;
				if(GetParam('nodam') == 1 && perc == 0) var stop = 1;
				
				if(stop == 0) {
					tr = getTAG('tr')[i].innerHTML //get worth
					if(tr.indexOf(")") == -1 ) tr = tr.slice(tr.indexOf("%"));
					else tr = tr.slice(tr.indexOf(")"));
					tr = tr.replace("<td>","");
					tr = tr.slice(tr.indexOf("$")+6);
					tr = tr.replace("<td>","");
					tr = tr.slice(0,tr.indexOf("<")-3);
					tr = tr.replace(",","");
					tr = parseInt(tr);
					tr = tr + 0;

					if(tr < GetParam('max') && GetParam('X') == 1) { 
						var x = "/html/body/form/center/table/tbody/tr["+(i+1)+"]/td[6]/input[2]";
						$X(x).checked = true;
					}
					if(tr > GetParam('max') && GetParam('X') == 0) { 
						var x = "/html/body/form/center/table/tbody/tr["+(i+1)+"]/td[6]/input[2]";
						$X(x).checked = true;
					}
				}
				i--;
			}
		}
	}
}

//---------------- Statistics ----------------
if(dlp + dls == '/compress.php?r=statistics') {
		var a, b, x, y;
		$X('/html/body/center').innerHTML = "<table class='thinline' width='600' rules='none' cellspacing='0' cellpadding='2'><tbody><tr><td class='tableheader' align='center' colspan='4'><a href='#dfams'><b>Dead Fams</b></a> - <a href='#honour'><b>Honoured</b></a> - <a href='#cdtc'><b>CDTC</b></a> - <a href='#fams'><b>Families</b></a> - <a href='#bf'><b>BF</b></a> - <a href='#book'><b>Bookie</b></a> - <a href='#roul'><b>Roullie</b></a> - <a href='#num'><b>Numbers</b></a> - <a href='#slot'><b>Slots</b></a> - <a href='#bj'><b>BJ</b></a> - <a href='#pb'><b>PB</b></a></td></tr><tr></tr><td colspan='3' bgcolor='black' height='1'></td></tr></tbody></table>" + $X('/html/body/center').innerHTML;
		a = "/html/body/center/table[";
		b = "]/tbody/tr/td";
		x = new Array();
		y = ['dfams','honour','cdtc','fams','bf','book','roul','num','slot','bj','pb'];
		for(i=0;i<=10;i++) {
			j=i+5;
			x[i]=a+j+b;
			$X(x[i]).innerHTML = "<a name='" + y[i] + "'>"  + $X(x[i]).innerHTML + "</a>";
		}
}

//---------------- Append Beyond's credits to Omerta's ----------------
if(dlp == '/credits.php' && lh.indexOf('beyond') == -1) {
	if(ls != '?raw') db.innerHTML = "(<b>Omerta Beyond Credits</b>) | (<a href='credits.php?raw'>Omerta Credits</a>) | (<a href='credits-trans.php'>Translation credits</a>)<br><br><b>Developers:</b><br>vBm<br>Igloo<br>Dopedog<br><br><b>Graphics:</b><br>Kareem<br><br><b>News:</b><br>Fingon<br>Sbanks<br><br>For detailed credits see <a href='"+SiteLink+"/' target='_blank'>www.omertabeyond.com</a>"
	else db.innerHTML = db.innerHTML.replace('<b>Game Credits</b>','(<a href="credits.php">Omerta Beyond Credits</a>) | (<b>Omerta Credits</b>) ');
}

//---------------- Family page ----------------
if((dlp + dls) == ('/family.php' + dls)){
	if(prefs[13]) {
		var numtop = 1;//get num of tops
		var con = 0;
		var sot = 0;
		var xpath = "/html/body/center/center/table/tbody";
		var result = $X(xpath).innerHTML;
		if(result.indexOf("Consiglieri:") != -1) { var numtop = numtop+1; var con=1; }
		if(result.indexOf("Sottocapo:") != -1) { var numtop = numtop+1; var sot=1; }

		var capoListXpath = "/html/body/center/center/table/tbody/tr[6]/td/table/tbody";
		var trs = $X(capoListXpath).getElementsByTagName('tr');
		var numtr = trs.length;
		var capos = 0;
		for(i=3;i<=numtr;i=i+2) {
			var tr = $X("/html/body/center/center/table/tbody/tr[6]/td/table/tbody/tr["+i+"]");
			var tds = tr.getElementsByTagName('td');
			var numtd = tds.length;
			var numtd = numtd-2;
			var rowcapos = 0;
			for(j=0;j<=numtd;j=j+2) { //get capos from collumn
				var q = tr.getElementsByTagName('td')[j].innerHTML;
				var str = "capo" + capos + "=q";
				eval(str);
				var capos = capos + 1;
				var rowcapos = rowcapos +1;
				if(rowcapos == 3) { j = numtd+1;}
			}
		}
		var capocontent = '';
		var capos=capos-1;
		var donxp = '/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[4]/td[2]';
		var don = $X(donxp).innerHTML;
		for(i=0;i<=capos;i++) {//assemble capo's
			var str = "capo" + i;
			if(don!=eval(str)) {//remove don from capo list
				if(i != '0') { capocontent = capocontent + ", ";}
				capocontent = capocontent + eval(str);
			}
		}
		var pos = 4 + numtop;//count for # of tops

		var capoRowXpath = "/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[" + pos + "]";
		var result = $X(capoRowXpath);

		var row = cEL('tr');//create capo row in family info table
		var cell_L = row.appendChild(cEL('td'));
		cell_L.textContent = 'Capo\'s:';
		cell_L.id = 'left';
		var cell_R = row.appendChild(cEL('td'));
		cell_R.textContent = "capocontent";
		cell_R.id = 'right';

		result.parentNode.insertBefore(row,result);

		getID('left').setAttribute('class','left');//append style+capo's to cells
		getID('right').setAttribute('class','right');
		getID('right').innerHTML = capocontent;

		//Nick Reader
		extJS(SiteLink+lang.requesting);

		var style = '';
		style += '.pop{position: relative;z-index:0;}';
		style += '.pop:hover{background-color:transparent;z-index:1;text-decoration:none;}';
		style += '.pop span{position:absolute;background-color:#A8A8A8;padding:5px;left:-1000px;width:250px;border:1px dashed gray;visibility:hidden;color:black;text-decoration:none;}';
		style += '.pop:hover span{visibility:visible;top:+45px;left:-20px;text-decoration:none;}';
		style += '.mem:hover {text-decoration:underline;cursor:pointer;}';
		style += '.top {text-decoration:underline;cursor:pointer;}';
		style += '.top:hover {text-decoration:underline;cursor:pointer;}';
		GM_addStyle(style);

		var getNicksXpath = "/html/body/center/center/table/tbody/tr[5]/td/table/tbody/tr[3]/td";
		var num = $X(getNicksXpath).getElementsByTagName('a').length;
		var a = $X(getNicksXpath).getElementsByTagName('a');
		var on = 0;//online

		var TopsXp = "/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[";//get tops
		var FirstTopsXp = TopsXp + "5";
		var topcontent ='';

		function appendTop(xp){ topcontent += $X(xp+"]/td[2]").innerHTML; }

		appendTop(TopsXp + "4");
		if (con==1) { appendTop(FirstTopsXp); }
		if (sot==1 && numtop==2) { appendTop(FirstTopsXp); }
		if (sot==1 && numtop==3) { appendTop(FirstTopsXp); appendTop(TopsXp + "6"); }

		//get object owners
		var objectsXpath = '/html/body/center/center/table/tbody/tr[2]/td/table';
		var trs = $X(objectsXpath).getElementsByTagName('tr').length;
		var objectcontent = "";
		for(i=4;i<=trs-1;i++){
			var nick = $X(objectsXpath).getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerHTML;
			var objectcontent = objectcontent + "<a href='user.php?nick=" + nick + "'>" + nick + "</a>";
			$X(objectsXpath).getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerHTML = "<a href='user.php?nick=" + nick + "'>" + nick + "</a>";
		}

		for(i=0;i<num;i++) {//add popups
			var nick = $X(getNicksXpath).getElementsByTagName('a')[i].innerHTML;
			a[i].setAttribute("class","pop"); //check for capo/top/object
			if(capocontent.indexOf(nick) != -1) { a[i].innerHTML = "<label id='b"+i+"' class='top'>" + a[i].innerHTML + "</label><span id='" + i + "'> "+lang.loading+"</span>"; }
			else if(topcontent.indexOf(nick) != -1) { a[i].innerHTML = "<label id='b"+i+"' class='top'>" + a[i].innerHTML + "</label><span id='" + i + "'> "+lang.loading+"</span>"; }
			else if(objectcontent.indexOf(nick) != -1) { a[i].innerHTML = "<label class='mem'><i>" + a[i].innerHTML + "</i></label><span id='" + i + "'> "+lang.loading+"</span>"; }
			else { a[i].innerHTML = "<label class='mem'>" + a[i].innerHTML + "</label><span id='" + i + "'> "+lang.loading+"</span>"; }
			var str = "$X(getNicksXpath).getElementsByTagName('a')["+i+"].setAttribute(\"onMouseover\",\"makeHttpRequest('user.php?nick=" + nick + "','" + i + "')\")";
			eval(str);
			if(a[i].getAttribute("style")) {
				var on = on +1;//save # peeps online
				if (capocontent.indexOf(nick) != -1) { //give online capo's orange color
					getID("b" + i).setAttribute("style","color: orange;");
				}
				if (topcontent.indexOf(nick) != -1) { //give online tops red color
					getID("b" + i).setAttribute("style","color: red;");
				}
			}
		}
		//addept membertable title
		var xp = "/html/body/center/center/table/tbody/tr[5]/td/table/tbody/tr";
		$X(xp+"[2]/td").setAttribute("colspan","2");
		$X(xp+"[3]/td").setAttribute("colspan","2");
		$X(xp).innerHTML = lang.family;

		//add % of peeps online
		var pos = 6 + numtop;//count for # of tops 
		var x="/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[";
		var xpath = x + pos + "]/td[1]";
		$X(xpath).innerHTML = "Members online:"
		var xpath = x + pos + "]/td[2]";
		var prcnt = Math.round((on / $X(xpath).innerHTML )*100,1);
		$X(xpath).innerHTML = prcnt + "% (" + on + " / " + $X(xpath).innerHTML + ")";
	}
}

//---------------- Kill password remover ----------------
if(prefs[14]) {
	var x = db.innerHTML;
	if(dlp == '/kill.php') {
		if(x.indexOf("table") != -1 ) {
			del("/html/body/center/table/tbody/tr[5]");
		}
	}
	if(dlp == '/profile.php') {
		if(x.indexOf("table") != -1 ) {
			del("/html/body/center/table/tbody/tr[9]");
			del("/html/body/center/table/tbody/tr[9]");
		}
	}
}

//---------------- Heist AF ----------------
if(dls == '?module=Heist2' || dls == '?module=Heist') {
	if(prefs[8]){
		if (/Leader:/.test(db.innerHTML)) {
			getELNAME('bullets')[0].value = '50';
			getELNAME("gun")[0].value = "real";
			getELNAME("driver")[0].focus();
		}
		if (/carid/.test(db.innerHTML)) {
			getELNAME("carid")[0].focus();
		}
	}
}

//---------------- Blood AF -------------
if(prefs[8]) {
	if(dlp == '/information.php'){
		var hlthxpath, typeXpath, bloodTypeTC;
		hlthxpath = '/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[4]/td[2]/a/table/tbody/tr';
		typeXpath = '/html/body/center/table/tbody/tr/td/table/tbody/tr[10]/td[2]';
		bloodTypeTC = getTXT(typeXpath);
		setValue('bloodType',bloodTypeTC);
		if($X(hlthxpath)) {
			var Health = '100' - getTXT(hlthxpath).replace('%','')
			setValue('missingHealth',Health);
		}
	}
	if(dlp == '/bloodbank.php'){
		if(getTAG('input')[0]) {
			getTAG('input')[0].value = getValue('missingHealth');
			var TypeA, TypeB, TypeAB, Type0, x, y, z;

			TypeA = getTXT('/html/body/table/tbody/tr[2]/td/blockquote/font/table/tbody/tr[3]/td[2]').replace('\$','');
			TypeB = getTXT('/html/body/table/tbody/tr[2]/td/blockquote/font/table/tbody/tr[3]/td[3]').replace('\$','');
			TypeAB = getTXT('/html/body/table/tbody/tr[2]/td/blockquote/font/table/tbody/tr[3]/td[4]').replace('\$','');
			Type0 = getTXT('/html/body/table/tbody/tr[2]/td/blockquote/font/table/tbody/tr[3]/td[5]').replace('\$','');

				if(getValue('bloodType') == 'B'){
					x = Math.min(TypeB,Type0); 
					if (TypeB == x) { $X('//option').value = "B"; $X('//option').textContent = "B";}
					if (Type0 == x) { $X('//option').value = "0"; $X('//option').textContent = "0";}
				}
				if(getValue('bloodType') == 'A'){
					y = Math.min(TypeA,Type0);
					if (TypeA == y) { $X('//option').value = 'A'; $X('//option').textContent = "A";}
					if (Type0 == y) { $X('//option').value = '0'; $X('//option').textContent = "0";}
				}
				if(getValue('bloodType') == 'AB'){
					z = Math.min(TypeA,TypeB,TypeAB,Type0);
					if (TypeA == z) { $X('//option').value = 'A'; $X('//option').textContent = "A";}
					if (TypeB == z) { $X('//option').value = 'B'; $X('//option').textContent = "B";}
					if (TypeAB == z) { $X('//option').value = 'AB'; $X('//option').textContent = "AB";}
					if (Type0 == z) { $X('//option').value = '0'; $X('//option').textContent = "0";}
				}
				if(getValue('bloodType') == '0'){ $X('//option').value = '0'; $X('//option').textContent = "0";}
		}
	}
}

//---------------- Compatibility page ----------------
if(dlp == '/servers.php'){
	var getServers = "/html/body/table/tbody/tr/td/ul/font/li";
	$x(getServers)[2].innerHTML = $x(getServers)[2].innerHTML +" - Omerta Beyond Compatible";
	$x(getServers)[7].innerHTML = $x(getServers)[7].innerHTML +" - Omerta Beyond Compatible";
}

//---------------- Smuggling ----------------
if(prefs[8]) {
	if(dlp == '/smuggling.php' && db.innerHTML.indexOf('table') != -1) {
		var bn_xp = '/html/body/center/form/table/tbody/tr[1]/td';
		var bn_text = $X(bn_xp).innerHTML.split("<br>");

		var booze = parseInt(bn_text[1].replace(/[^0-9.]/g,''));
		var narcs = parseInt(bn_text[2].replace(/[^0-9.]/g,''));

		var carry_b = 0;
		var carry_n = 0;
		var xpb = '/html/body/center/form/table/tbody/tr[2]/td/table/tbody/tr[2]/td/table/tbody/tr[';
		var xpn = '/html/body/center/form/table/tbody/tr[2]/td/table/tbody/tr[2]/td[2]/table/tbody/tr[';

		var b_amount = [0,0,0,0,0,0];
		var n_amount = [0,0,0,0,0,0];
		for(i=0;i<=15;i++) { 
			if(i<7) { 
				var x = i + 4;
				var carry_b = carry_b + parseInt($X(xpb+x+']/td[3]').innerHTML);
				b_amount[i] = parseInt($X(xpb+x+']/td[3]').innerHTML)
				getTAG('input')[i].value = b_amount[i];
				$X(xpb+x+']/td').innerHTML = "<a href='#' accesskey='"+(i+1)+"' onClick='for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value =0;}document.getElementsByTagName(\"input\")[" + i + "].value = " + booze + ";document.getElementsByTagName(\"input\")[18].focus();'>"+(i+1)+" " + $X(xpb+x+']/td').innerHTML + "</a>";
			}
			if(i>8) { 
				var x = i - 5;
				var carry_n = carry_n + parseInt($X(xpn+x+']/td[3]').innerHTML);
				n_amount[(i-9)] = parseInt($X(xpn+x+']/td[3]').innerHTML);
				getTAG('input')[i].value = parseInt($X(xpn+x+']/td[3]').innerHTML);
				$X(xpn+x+']/td').innerHTML = "<a href='#' onClick='for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value =0;}document.getElementsByTagName(\"input\")[" + i + "].value = " + narcs + ";document.getElementsByTagName(\"input\")[18].focus();'>" + $X(xpn+x+']/td').innerHTML + "</a>";
			}
		}
		var b_amounts = '';
		for(i=0;i<=6;i++) { 
			var b_amounts = b_amounts + b_amount[i]; 
			if(i!=6) var b_amounts = b_amounts + ",";
		}
		var n_amounts = '';
		for(i=0;i<=6;i++) { 
			var n_amounts = n_amounts + n_amount[i]; 
			if(i!=6) var n_amounts = n_amounts + ",";
		}
		var notempty = false;
		if(carry_n != 0) { var notempty = true; }
		var info_xp = '/html/body/center/form/table/tbody/tr/td';
		var part = $X(info_xp).innerHTML.split("<br>");
		var str = ''
		str += lang.smuggling[0] + part[0].slice(part[0].indexOf("$ "),part[0].indexOf(" i")) + "<br>";
		str += "Max "+lang.smuggling[1]+": " + part[1].slice(part[1].indexOf("t ")+1,part[1].indexOf(" e")) + "<br>";
		str += "Max "+lang.smuggling[2]+": " + part[2].slice(part[2].indexOf("t ")+1,part[2].indexOf(" e")) + "<br><br>"; 
		str += part[3].replace(lang.smuggling[3],lang.smuggling[4]);
		str += "<hr><a href='#' accesskey='[' onClick='for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=0;}if("+notempty+"){var n_amount = ["+n_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[(i+9)].value=n_amount[i];}}else{document.getElementsByTagName(\"input\")[12].value = "+narcs+";}document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[2]+" ([)</a>";
		str += " - <a href='#' accesskey=']' onClick='for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value=0;}var b_amount = ["+b_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=b_amount[i];}document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[1]+" (])</a>";
		str += " - <a href='#' accesskey='=' onClick='var b_amount = ["+b_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=b_amount[i];}document.getElementsByTagName(\"input\")[12].value = "+(narcs - carry_n)+";document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[5]+" (=)</a><br>";
		$X(bn_xp).innerHTML = str;
		if(carry_b==booze) getTAG('input')[7].checked = 1;
		if(carry_n==narcs) getTAG('input')[16].checked = 1;
		else if(getTAG('input')[12].value == carry_n && carry_n == 0) getTAG('input')[12].value = narcs;
		getTAG('input')[18].focus();
	}
	
}

//---------------------- OBAY --------------------
if(prefs[18] && dlp == '/obay.php' && db.innerHTML.indexOf('<table') != -1)
	if(dls.indexOf('specific') == -1 ) { //on view object page
		function addPrice(num) {
			var bullets = parseInt($X(xpath).getElementsByTagName('td')[(1+num)].innerHTML.replace(/[^0-9.]/g,''));
			var price = parseInt($X(xpath).getElementsByTagName('td')[(2+num)].innerHTML.replace(/[^0-9.]/g,''));
			$X(xpath).getElementsByTagName('td')[(1+num)].innerHTML = $X(xpath).getElementsByTagName('td')[(1+num)].innerHTML + " ($ " + Math.round(price/bullets) + ")";
		}
		if(dls.indexOf('type=11') != -1) {
			for(i=5;i<=19;i++) {
				var xpath = '/html/body/center/table[3]/tbody/tr['+i+']';
				addPrice(0);
			}
		}
		else {
			for(i=4;i<=19;i++) {
				var xpath = '/html/body/center/table[3]/tbody/tr['+i+']';
				if($X(xpath).innerHTML.indexOf(lang.obay) != -1) { addPrice(1); }
			}
		}
	}
	else if(db.innerHTML.indexOf(lang.obay) != -1) { //on objects page
		var xpath = '/html/body/center/table/tbody/tr[3]/td[3]';
		var price = $X(xpath).innerHTML.split("<br>")[3].replace(/[^0-9.]/g,'');
		var xpath2 = '/html/body/center/table/tbody/tr[4]/td';
		var bullets = $X(xpath2).innerHTML.replace(/[^0-9.]/g,'');
		$X(xpath2).innerHTML = $X(xpath2).innerHTML + "<br><b>$ " + Math.round(price/bullets) + "</b>";
		getTAG('input')[2].checked = true;
		getTAG('input')[1].select();
		getTAG('input')[1].focus();
}

//---------------- Inbox ---------------------------
if(dlp == '/messages.php' && (dls == '' || dls.indexOf('action=delete') !=-1) && prefs[19]) {
	var xpath, trs, xpath2, content, href, href2, id, xpath3, xpath4
	xpath = '/html/body/center/form[2]/table[2]/tbody';
	trs = $X(xpath).getElementsByTagName('tr').length;
	
	$x('//table')[1].setAttribute('width','565');
	getID('tblMsgs').setAttribute('width','565');
	for(i=5;i<=trs;i=i+2) {
		xpath2 = '/html/body/center/form[2]/table[2]/tbody/tr[' + i + ']';
		content = $X(xpath2).innerHTML;
		href = content.slice(content.indexOf('"m'));
		href2 = href.slice(0,href.indexOf('">'));
		id = href2.slice(href2.indexOf('g=')+2);

		xpath3 = xpath2+'/td[2]';//check sender
		var sender = $X(xpath3).innerHTML;
		if(sender.search(lang.notify) != -1 || sender.search(lang.adminmsg) != -1) { var replyImg = ' ' }
		else { var replyImg = '&nbsp;<img onMouseover="style.cursor=\'pointer\'" title="Reply" onClick="location.href=\'msg.php?replyid=' + id + '\'" width="20" height="20" border="0" src="/static/images/game/messages/reply.gif">'; }

		xpath4 = xpath2+'/td[3]';//add image(s)
		$X(xpath4).setAttribute('width','200');
		$X(xpath4).innerHTML = $X(xpath4).innerHTML + ' &nbsp;<img onMouseover="style.cursor=\'pointer\'" title="Delete" onClick="location.href=\'messages.php?action=delete&delid=' + id + '\'" width="20" height="20" border="0" src="/static/images/game/messages/del.gif"/>' + replyImg;
	}
}

//---------------- Title changer ----------------
if((dlp == '/' || dlp == '/index.php' || dlp == '/game.php') && prefs[9] && lh.indexOf('beyond') == -1) document.title = lang.title;

//---------------- Update Notifier --------------
var GM_update = function(title, scriptName, version, updateUrl, versionUrl) {
	var title, today, last, current, answer, updateUrl, versionUrl;
	title = title;
	today = new Date();
	today = today.getDate();
	last = getValue(title);
	current;
	answer;
	updateUrl = updateUrl;
	versionUrl = versionUrl;
	this.init = function() {
		if(last !== undefined) {
			if(today - last >= 3 || today - last <= -24) {
				setValue(title, today);
				this.check();
			}
		} else {
			setValue(title, today);
			this.check();
		}
	}
	this.check = function() {
		GM_xmlhttpRequest({
			method:"GET",
			url:versionUrl,
			onreadystatechange:this.finish
		});
	}
	this.finish = function(o) {
		if(o.readyState == 4) {
			current = o.responseText;
			current = current.split(".");
			version = version.split(".");
			if(version[0] < current[0]) {
				answer = confirm("Update " + scriptName + " to version " + current.join(".") + "?");
				if(answer) { GM_openInTab(updateUrl); }
				} else if(version[1] < current[1]) {
					answer = confirm("Update " + scriptName + " to version " + current.join(".") + "?");
					if(answer) { GM_openInTab(updateUrl); }
				} else if(version[2] < current[2]) {
					answer = confirm("Update " + scriptName + " to version " + current.join(".") + "?");
					if(answer) { GM_openInTab(updateUrl); }
				} else {
					alert("I'm very sorry mate :-(\nThere's no new version of " + ScriptName + " this time.\nWe're just lazy :x");
				}
			}
		}
		//start
		this.init();
	}
GM_update('OBUpdate', ScriptName, ScriptVersion, SiteLink, SiteLink+'/version.txt');

//---------------- Omerta Beyond Logo ----------------
comlogo = 'data:image/png;base64,' +
	'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';

//---------------- Beyond Logo Replacer ----------------------
var comlogoxpath = "//img[contains(@src, 'logo0.gif')] | //img[contains(@src, 'omertalo.gif')]";
$x(comlogoxpath).forEach(function(node){node.src = comlogo});
//---------------- Beyond Favicon Replacer ----------------------
window.addEventListener('load', function() { setIcon(SiteLink + '/images/favicon.png'); }, true);

//---------------- IRC Chat Remover ----------------------
if(prefs[21] && lang.version=='_nl') { del('//div[@class="chat"]'); }

//---------------- Clean login page ----------------
if((dlp == '/' || dlp == '/index.php') && lh.indexOf('beyond') == -1 && prefs[20]) {
	del('//td[@valign="bottom"]'); 
	del('//table[@align="right"]'); 
	del('//td[@width="160"]');
	del('//td[@style="text-align: justify;"]');
	$x('//b')[1].innerHTML = 'Nick:';
	$x('//b')[2].innerHTML = 'Pass:';
	del("//a[@href='game-register.php']");
	$x('//a')[0].href = SiteLink;
	$x('//a')[0].target = '_blank';

	$X("//td[@background='homeinclude/img/bar.gif']").innerHTML = '<font color="#cccccc" size="1"><b><center><a href="'+PrefsLink+'" target="_blank">'+lang.prefsname+'</a> - <a href="http://www.omertabeyond.com/" target="_blank">Beyond</a> - <a href="http://www.fingon.be" target="_blank">Fingon\'s</a></center><br><br><br><br></b></font>';
	var circle = "//table[contains(@background, 'circle.GIF')]";
	$x(circle).forEach(function($n){$n.style.backgroundImage = "none"});
}
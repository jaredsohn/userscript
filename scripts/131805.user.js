// ==UserScript==
// @name 		Another My Brute List
// @description 	Shows your other Brutes in the cellule to switch between them quickly.

// ==/UserScript==
var version = '1.11';

if (window.location.href != "http://"+brute()+".mybrute.com/login") {
	var body=document.getElementById('tournament');
	if(!body){return false;}
}	

function trim(s) {
  return s.replace(/\s+$/,"").replace(/^\s+/,"");
}

// Get the name of the current Brute
function brute() {
	return window.location.href.split("//")[1].split(".")[0];
}

// Get the cellule address by means of the Brute name
function cellule(abrute) {
	return "http://"+abrute+".mybrute.com/cellule";
}

function init() {

/* Cellule Page Start */
if (window.location.href == cellule(brute())) {

var cbrutes = "";

// If a login is necessary
var lognec = false;
for (var atest=0; atest <= 20; atest++) {
	if (document.getElementsByTagName('a')[atest].href == 'http://'+brute()+'.mybrute.com/login') { lognec = true; }
}
//cbrutes += document.getElementsByTagName('a')[9].href;

// If Brutes are set
if (GM_getValue('brutelistnum') > 0) {

var brutes = new Array("");
var bruteaddarr = "";

// Put all Brutes into the array
for (var a=1; a<=GM_getValue('brutelistnum'); a++) {
	bruteaddarr = brutes.push(GM_getValue('brutelistbrute'+a));
	if (lognec && GM_getValue('brutelistbrute'+a) == brute()) {
		window.location.href = 'http://'+brute()+'.mybrute.com/login';
	}
}

// Put the Brute list into the text
for (var i=1; i < brutes.length; i++) {
	if (brutes[i] != brute()) { cbrutes += '<br><a href="'+cellule(brutes[i])+'">'+brutes[i]+'</a>'; } else { cbrutes += ""; }
}

// Register all Burtes for tournament
function regBfT() {
	for (var t=1; t<brutes.length; t++) {
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://'+brutes[t]+'.mybrute.com/sub',
			headers: {
				"User-Agent":"Mozilla/5.0",
				"Accept":"text/xml"
			}
		});
	}
	window.location.reload();
}

// If there's only one Brute set
if (brutes[--i] == brute() && GM_getValue('brutelistnum') == 1) {
	cbrutes += '<br>You have configured only this Brute'; }
cbrutes += '<br><br><a href="javascript:void(null)" id="tregbutton">Register all Brutes for tournament</a>'+
'<br><a href="cellule/brutelistconfig" target="_tab">Configure Brutes</a>';

// If no Brutes are set
} else {
cbrutes += '<br><b>My Brute List</b>'+
'<br><a href="cellule/brutelistconfig" target="_tab">Please configure your Brutes!</a>';
}

var blist=document.createElement("div");
blist.innerHTML=cbrutes;
body.appendChild(blist);
document.getElementById('tregbutton').addEventListener('click', regBfT, false);
/* Cellule Page End */

/* Auto Login Page Start */
} else if (window.location.href == "http://"+brute()+".mybrute.com/login") {

if(document.getElementsByTagName('INPUT')[0].value != "")
{ 
	document.getElementsByTagName('INPUT')[1].click();
}
/* Auto Login Page End */

/* Config Page Start */
} else if (window.location.href == cellule(brute())+"/brutelistconfig") {

GM_addStyle('#global, #footer { display: none !important; }');

// Save the new Brute
function saveConfig() {
if (!GM_getValue('brutelistnum') > 0 || GM_getValue('brutelistnum') == "undefined") { // If no Brutes are set
GM_setValue('brutelistnum', 1);
GM_setValue('brutelistbrute1', document.getElementById('mainbrute').value);
} else { // If Brutes are set
GM_setValue('brutelistnum', GM_getValue('brutelistnum')+1);
GM_setValue('brutelistbrute'+GM_getValue('brutelistnum'), document.getElementById('newbrute').value);
}
window.location.reload();
}

// Deletes the checked Brute
function deleteBrute() {
for (var d = 2; d <= GM_getValue('brutelistnum'); d++) {
	if (document.getElementById('deletebrute'+d).checked) {
	GM_deleteValue('brutelistbrute'+d); break; }
}

// Lower Brutes with higher ID
for (;d < GM_getValue('brutelistnum');) {
	GM_setValue('brutelistbrute'+d, GM_getValue('brutelistbrute'+(++d)));
}
GM_deleteValue('brutelistbrute'+GM_getValue('brutelistnum'));
GM_setValue('brutelistnum', GM_getValue('brutelistnum')-1);
window.location.reload();
}

// Reset everything!!
function resetConfig() {
for (var i = 1; i <= GM_getValue('brutelistnum'); i++) {
	GM_deleteValue('brutelistbrute'+i); }
GM_deleteValue('brutelistnum');
window.location.reload();
}

// Put the saved Brutes into the text
var configtext = '<br><h1>Brute List Config</h1>'+
'<table border="0" cellspacing="10" cellpadding="10" align="center">';

if (!GM_getValue('brutelistnum') > 0 || GM_getValue('brutelistnum') == "undefined") { // If no Brutes are set
	configtext += '<tr><td>Add your main Brute</td><td>&nbsp;&nbsp;&nbsp;</td><td><input type="text" id="mainbrute"></td></tr>';
} else { // If Brutes are set
	configtext += '<tr><th>Brute</th><th>&nbsp;&nbsp;&nbsp;</th><th>Delete</th></tr>'+
	'<tr height="19"><td>'+GM_getValue('brutelistbrute1')+'</td><td></td><td>You cannot delete your main Brute</td></tr>';
	if (GM_getValue('brutelistnum') > 1) { // If more than one Brute are set
		for (i=2; i<=GM_getValue('brutelistnum'); i++) { // List the saved Brutes
			configtext += '<tr><td>'+GM_getValue('brutelistbrute'+i)+'</td><td></td><td><input type="radio" name="deletebrute" id="deletebrute'+i+'"></td></tr>';
		}
	} configtext += '<tr height="15"></tr><tr><td>Add another Brute</td><td></td><td><input type="text" id="newbrute"></td></tr>';
}

configtext += '<tr height="10"></tr><tr align="center"><td colspan="3">'+
'<a href="javascript:void(null)" id="savebutton">Save</a>&nbsp;&nbsp;&nbsp;'+
'<a href="javascript:void(null)" id="deletebutton">Delete</a>&nbsp;&nbsp;&nbsp;'+
'<a href="javascript:void(null)" id="resetbutton">Reset</a>&nbsp;&nbsp;&nbsp;'+
'<a href="javascript:window.close();">Close</a></td></tr>'+
'</table>';

var configbody=document.getElementById('gradientBG');
var config=document.createElement("div");
config.setAttribute('style', 'margin-top: -18px !important;');
config.innerHTML=configtext;
configbody.appendChild(config);
document.getElementById('savebutton').addEventListener('click', saveConfig, false);
document.getElementById('deletebutton').addEventListener('click', deleteBrute, false);
document.getElementById('resetbutton').addEventListener('click', resetConfig, false);
/* Config Page End */

/* Changelog Page Start */
} else if (window.location.href == cellule(brute())+"/brutelistchangelog") {

GM_addStyle('#global, #footer { display: none !important; }');

// Get the changelog text
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://userscripts.org/scripts/show/51102',
	headers: {
		"User-Agent":"Mozilla/5.0",
		"Accept":"text/xml"
	},
	onload: function(response) {
		changelogtext = '<br><br><a href="javascript:window.close();">Close</a><br><br>'+
		trim(response.responseText.split(' ')[1])+
		'<br><br><a href="javascript:window.close();">Close</a><br><br>';
		
		var changelogbody=document.getElementById('gradientBG');
		var changelog=document.createElement("div");
		changelog.setAttribute('style', 'margin-top: -18px !important;');
		changelog.innerHTML=changelogtext;
		changelogbody.appendChild(changelog);
	}
});
/* Changelog Page End */
}
}

/* Check for updates */
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://userscripts.org/scripts/source/51102.user.js',
	headers: {
		"User-Agent":"Mozilla/5.0",
		"Accept":"text/xml"
	},
	onload: function(response) {
		last_update = trim(response.responseText.split('@version')[1].split('//')[0]);
		
		if (version != last_update && window.location.href != cellule(brute())+"/brutelistchangelog") {
			var updatetext = '<br><b>My Brute List</b><br>'+
			'<br><a href="http://userscripts.org/scripts/source/51102.user.js">A new update is available!</a><br>'+
			'<br>Your version: '+version+'<br>New version: '+last_update+'<br>'+
			'<a href="/cellule/brutelistchangelog" target="_tab">Changelog</a>';
			var update=document.createElement("div");
			update.innerHTML=updatetext;
			body.appendChild(update);
		} else {
			init();
		}
		
	}
});
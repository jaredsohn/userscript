scr_meta=<><![CDATA[
// ==UserScript==
// @name           Mafiosi Custom Menu
// @namespace      Mafiosi Custom Menu
// @description    Aanpasbaar menu zonder kennis van enige scripttaal
// @include        http://mafiosi.nl/*
// @include        http://www.mafiosi.nl/*
// @Author		Jordy Kroeze
// @Copyright		Jordy Kroeze
// @Email		info@jordykroeze.com   
// @version		1.0.4
// @require http://sizzlemctwizzle.com/updater.php?id=88565&days=1
// ==/UserScript==
]]></>.toString();

// Update checker toegevoegd.
// Credits voor de update checker naar: http://userscripts.org/users/sizzle

// Vragen kunnen worden gevraagd in het topic, via pm naar pekeltje, of via de mail: info@jordykroeze.com
var domein = "http://" + document.domain;
var data = GM_getValue('opslag');
var status = GM_getValue('status');
var doneerstatus = GM_getValue('doneerstatus'); 


if(!data){
GM_setValue('opslag', 'status~status.php~\nprofiel~profiel.php~\nInbox~inbox.php~\nForum~forum.php~'); 
}

if(!status){
GM_setValue('status', 'uit'); 
}

if(!doneerstatus){
GM_setValue('doneerstatus', 'uit'); 
}

var data = GM_getValue('opslag');
var status = GM_getValue('status');
var doneerstatus = GM_getValue('doneerstatus'); 

function loguitfunctie(){
var alert = confirm("Wil je echt uitloggen?");
if (alert == true){ 
parent.location.href = domein + '/logout2.php';
}
}

function save(){
	var code = document.getElementById('code').value;
	GM_setValue('opslag', code);
	var status = document.getElementById('status').value;
	GM_setValue('status', status);
	var doneerstatus = document.getElementById('doneerstatus').value;
	GM_setValue('doneerstatus', doneerstatus);
	parent.location.href = domein + '/index2.php';
}

function settingsmenu(){
	var settings = document.getElementById('settings');
if(settings.style.display == 'none'){
	settings.style.display = 'block';
} else  {
	settings.style.display = 'none';
}
}

// settings pagina (home)
if(window.location == domein + "/home.php"){

document.body.innerHTML += "<center><a href='#' id='hideshow' name='hideshow' style='text-decoration: none;'>Hide/Show Settings.</a><div id='settings' name='settings' style='display: none;'><textarea name='code' id='code' rows='25' cols='50'>" + data + "</textarea><br />Custom menu gebruiken? <input type='text' value='" + status + "' name='status' id='status'><br />(aan voor het aanzetten, elke andere waarde schakeld het custom menu uit.)<br />Doneerstatus: <input type='text' value='" + doneerstatus + "' name='doneerstatus' id='doneerstatus'><br /><input type='button' id='save' name='save' value='save'><br /><br />Extra links zijn toe te voegen op de volgende methode:<br />Text~link~<br />Dus bijvoorbeeld: status~status.php~<br /><br />Home (Met settingspagina) word bovenaan weergeven.<br />Loguit en de zoekform worden standaard al onderaan weergeven.<br /><br /><b>Letop: </b> Na de wijzigingen vernieuwd het venster.</div></center>";

var button = document.getElementById('save');
button.addEventListener('click', save, false);

var hideshow = document.getElementById('hideshow');
hideshow.addEventListener('click', settingsmenu, false);

}


// menu pagina

if(window.location == domein + "/menu.php"){
var data = GM_getValue('opslag');
var status = GM_getValue('status'); 
var doneerstatus = GM_getValue('doneerstatus'); 
if(status == 'aan'){
var totaal = "";

	var home = "<a href='home.php' target='right' style='text-decoration: none; color: white;'>Home</a><br />";

var menu = data.split(/~/);
var aantal = ((menu.length-1)/2);

for(teller = '0'; teller < aantal; teller++){
	var teller2 = teller * 2;
if(teller > '0'){
	var teller3 = teller2 + 1;
} else {
	var teller3 = '1';
}
	var totaal = totaal + "<a href='"+menu[teller3]+"' target='right' style='text-decoration: none; color: white;'>" + menu[teller2] + "</a><br />";
}

var doneer = "<iframe height='175' frameborder='0' width='200' scrolling='no' name='inlineframecounter' id='inlineframecounter' marginwidth='0' marginheight='0' src='stats_counter.php?color=0&type=1'>Stats inline frame</iframe><br />";

totaal = home + totaal;

if(doneerstatus == 'aan'){
totaal = doneer + totaal;
}

document.body.innerHTML = totaal + "<a href='#' id='loguit' name='loguit' style='text-decoration: none; color: white;'>Loguit</a><br /><form method='get' action='user.php' target='right'><font color='white'><b>Zoek:</b></font><br /><input type='text' name='naam'><input type='submit' value='Zoek!' name='zoek'></form>";

var loguit = document.getElementById('loguit');
loguit.addEventListener('click', loguitfunctie, false);

}
}
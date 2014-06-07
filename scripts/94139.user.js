// ==UserScript==
// @name           Early Distant Warning
// @namespace      twilight_heros
// @description    This script will check your digitizer and recyclizer before you RETCON so that you won't waste digits or units.
// @include        http://www.twilightheroes.com/retcon-device.php
// ==/UserScript==
//---------------------------------------------------------------------------------------------------------------------------------
//This script is meant to help make sure that you don't waste digits or units when getting ready to initiate a RETCON. It will just
//warn you if you have digits or units and tell you how many you have so you can decide if you want to use them on anything. It could
//also check other things like the computers to make sure you switch out to electronics.

/* RETRIEVE THE HTML BODY CODE */
var text = document.getElementsByTagName('body')[0].innerHTML;

//Since the retcon-device page does mulitple things we check for the Intiate and Verify pages (the pre-retcon version of the page) and stop
//the script if its not the right page
if (!(/Initiate retcon/.test(text))) {
	return;
}

/* USE REGULAR EXPRESSION TO FIND ALL THE TAGS AND INNER VALUES */
var regex = /<[a-z]>[[A-Za-z0-9_].+<.[a-z]>/ig;
var result = text.match(regex);

var mybox = document.createElement("div");

mybox.innerHTML = '<div id="recon_warning_box" style="margin: 0 auto 0 auto; ' +
'width:175px; opacity: .75; filter: alpha(opacity=75); z-index:100; ' +
'margin: 5px; padding: 5px; overflow: hidden; height: auto; ' +
'font-size: 8pt; font-weight: bold; font-family: arial, sans-serif; background-color: #ccffcc; ' +
'color: #000000;"> ' +
'<span id="recycle">Loading Recylzer...</span> <br />' +
'<span id="digitizer">Loading Digitizer...</span> <br/> ' +
'<span id="pouch">Checking For Pouches...</span> <br />' +
'<span id="computer">Checking For Computers...</span>' +
'</div>';

document.body.insertBefore(mybox, document.body.lastChild);

GM_xmlhttpRequest({
method: 'GET',
url: 'http://www.twilightheroes.com/digitizer.php',
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'text/plain, text/html',
},
onload: function(responseDetails) {
// get the digitizer page
var digitizerResponse = responseDetails.responseText;
//get the amount of digits if they exist

var digitizerSpan = document.getElementById('digitizer');
var digitsFound = digitizerResponse.match(/contains (\d{1,3}(?:[,]\d{3})*) digits./);
//alert(digitsFound[1]);
if ((digitsFound != null)&&(digitsFound[1] != null)) {
	digitizerSpan.innerHTML = '<br />You need to spend <span style=\'background-color: rgb(221, 221, 238);font-weight:bold;font-size:1.2em;\'>'+digitsFound[1]+'</span> <a href=\"/digitizer.php\">digits</a> or you lose them';
} else {
	digitizerSpan.innerHTML = '<br />You have no unspent digits.';
}
},
onerror: function(responseDetails) {
// get the digitizer page
var digitizerSpan = document.getElementById('digitizer');
digitizerSpan.innerHTML = 'Error Getting Digitizer Information';
}

});

GM_xmlhttpRequest({
method: 'GET',
url: 'http://www.twilightheroes.com/recyclonizer.php',
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'text/plain, text/html',
},
onload: function(responseDetails) {
// get the Recyclonizer page
var recyclonizerResponse = responseDetails.responseText;
//var condition = xmlobject.getElementsByTagName('description')[1];
var recyclonizerSpan = document.getElementById('recycle');
var unitsFound = recyclonizerResponse.match(/contains (\d{1,3}(?:[,]\d{3})*) units/);
if ((unitsFound != null)&&(unitsFound[1] != null)) {
	recyclonizerSpan.innerHTML = '<br />You need to spend <span style=\'background-color: rgb(221, 221, 238);font-weight:bold;font-size:1.2em;\'>'+unitsFound[1]+'</span> <a href=\"/recyclonizer.php\">units</a> or you lose them';
} else {
	recyclonizerSpan.innerHTML = '<br />You have no unspent units.';
}

},
onerror: function(responseDetails) {
// get the Recyclonizer page
var recyclonizerSpan = document.getElementById('recycle');
recyclonizerSpan.innerHTML = 'Error Getting Recyclonizer Information';
}

});

GM_xmlhttpRequest({
method: 'GET',
url: 'http://www.twilightheroes.com/computer-lab.php',
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'text/plain, text/html',
},
onload: function(responseDetails) {
// get the computer page
var computerResponse = responseDetails.responseText;
var computerSpan = document.getElementById('computer');
	if (/Computer Bay .<\/strong><BR>Positronic computer/.test(computerResponse)) {
		computerSpan.innerHTML = '<br />You have <span style=\'background-color: rgb(221, 221, 238);font-weight:bold;font-size:1.2em;\'>Positronic</span> <a href=\"/computer-lab.php\">computers</a>, you should switch them to electronic computers.';
	} else {
		computerSpan.innerHTML = '<br />You do not have positronic computers in your bay.';
	}
},
onerror: function(responseDetails) {
var computerSpan = document.getElementById('computer');
recyclonizerSpan.innerHTML = 'Error Getting Computer Information';
}

});

GM_xmlhttpRequest({
method: 'GET',
url: 'http://www.twilightheroes.com/wear.php',
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'text/plain, text/html',
},
onload: function(responseDetails) {
// get the computer page
var computerResponse = responseDetails.responseText;
var computerSpan = document.getElementById('pouch');
	if (/Pouch of (Many|Several|Few|a Couple|One) Lost Thing/.test(computerResponse)) {
		computerSpan.innerHTML = '<br />You have a <span style=\'background-color: rgb(221, 221, 238);font-weight:bold;font-size:1.2em;\'>Pouch of Lost Things</span> <a href=\"/wear.php\">that needs to be dumped</a>.';
	} else {
		computerSpan.innerHTML = '<br />You don\'t need to dump a Pouch.';
	}
},
onerror: function(responseDetails) {
var computerSpan = document.getElementById('pouch');
recyclonizerSpan.innerHTML = 'Error Getting Pouch Information';
}

});
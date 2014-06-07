// ==UserScript==
// @name           mafiosi bericht signature
// @namespace      mafiosi bericht signature
// @include        http://mafiosi.nl/send_message*
// @include        http://www.mafiosi.nl/send_message*
// ==/UserScript==

var signature = GM_getValue('signature');
var status = GM_getValue('status');

if(!signature){
GM_setValue('signature', ' \n\nHier je groet.'); 
}

if(!status){
GM_setValue('status', 'uit'); 
}
var signature = GM_getValue('signature');
var status = GM_getValue('status');


function save(){
	var signature = document.getElementById('signature').value;
	GM_setValue('signature', signature);
	var status = document.getElementById('status').value;
	GM_setValue('status', status);
	window.location = window.location;
}

document.body.innerHTML += "<center><div id='settings' name='settings'><textarea name='signature' id='signature' rows='5' cols='50'>" + signature + "</textarea><br />Signature gebruiken? <input type='text' value='" + status + "' name='status' id='status'><br />(aan voor het aanzetten, elke andere waarde schakeld signature uit.)<br /><input type='button' id='save' name='save' value='save'><br />Letop: Na uw wijziging vernieuwd dit venster, uw huidige ingetypte bericht gaat hierbij verloren.</div></center>";

var button = document.getElementById('save');
button.addEventListener('click', save, false);

if(status == 'aan'){
document.getElementById('bericht').innerHTML += signature;
}
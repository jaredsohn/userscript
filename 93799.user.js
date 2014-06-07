// ==UserScript==
// @name           Quick License
// @namespace      Quick License
// @include        http://callofduty.wikia.com/*&action=edit*

// ==/UserScript==

document.getElementById('toolbar').innerHTML += "<select onchange=\"document.getElementById('wpTextbox1').value +=(this.value);\">" +
"<option value=''>Licenses</option>"+
"<option value='\n{{PD}}'>Public domain (PMG)</option>"+
"<option value='\n{{CM}}'>Game Screenshot</option>"+
"<option value='\n{{Fairuse}}'>Fair use</option>"+
"</select>";
// ==UserScript==
// @name           pruebas_mobil
// @version        0.0.1
// @description    pruebas_mobil
// @namespace      http://elotrolado.net
// @author         e3skudo
// ==/UserScript==
function addJavascript(jsname,pos) {
var th = document.getElementsByTagName(pos)[0];
var s = document.createElement('script');
s.setAttribute('type','text/javascript');
s.setAttribute('src',jsname);
th.appendChild(s);
}

addJavascript('/styles/estiloeol/template/editor_v1.js','head');

document.getElementById('attach-panel').id = "smiley-box";
var headID = document.getElementsByTagName("head")[0]; 
/*
var newScript0 = document.createElement('script');
newScript0.type = 'text/javascipt';
newScript0.src = '/styles/estiloeol/template/editor_v1.js';
headID.appendChild(newScript0);     

var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'http://userscripts.org/scripts/source/93621.user.js';
headID.appendChild(newScript);
*/

addJavascript('http://userscripts.org/scripts/source/93621.user.js','head');

var form_name = 'postform';
var text_name = 'message';
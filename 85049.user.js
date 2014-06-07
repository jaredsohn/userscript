// ==UserScript==
// @name           Ikariam Fast Login
// @autor          WTF
// @version        1.2
// @include        http://*.ikariam.com/index.php
// @include        http://*.ikariam.com
// @include        http://*.ikariam.com/
// @include        http://s*.ikariam.com/index.php?view=options
// ==/UserScript==

var url_now = location.href;
if(/http:\/\/s/.test(url_now)) {
var url_split = url_now.split('http://s');
var url_split2 = url_split[1].split('.');
var world2 = url_split2[0];
var server2 = url_split2[1];
}

function openInNewTab(URL) {
var temporalForm = document.createElement('form');
with (temporalForm) {
setAttribute('method', 'GET');
setAttribute('action', URL);
setAttribute('target', '_blank');
}

var paramsString = URL.substring(URL.indexOf('?') + 1, URL.length);
var paramsArray = paramsString.split('&');

for (var i = 0; i < paramsArray.length; ++i) {
var elementIndex = paramsArray[i].indexOf('=');
var elementName = paramsArray[i].substring(0, elementIndex);
var elementValue = paramsArray[i].substring(elementIndex + 1, paramsArray[i].length);

var temporalElement = document.createElement('input');
with(temporalElement) {
setAttribute('type', 'hidden');
setAttribute('name', elementName);
setAttribute('value', elementValue);
}

temporalForm.appendChild(temporalElement);
}

document.body.appendChild(temporalForm);
temporalForm.submit();
document.body.removeChild(temporalForm);
}
				 	
const VERSION = "1.2";

if(GM_getValue('ws_server')!=null) { var server = GM_getValue('ws_server'); } else {  if(server2) { var server = server2; } else { var server = '';  }}
if(GM_getValue('ws_world')!=null) { var world = GM_getValue('ws_world'); } else {  if(world2) { var world = world2; } else { var world = ''; } }
if(GM_getValue('ws_nick')!=null) { var nick = GM_getValue('ws_nick'); } else {  var nick = ''; }
if(GM_getValue('ws_pass')!=null) { var pass = GM_getValue('ws_pass'); } else {  var pass = ''; }

if(/=options/.test(url_now)) {  

function SetValues() {
	var ws_server = document.getElementById('ws_server').value;
	GM_setValue('ws_server',ws_server);
	var indice = document.getElementById('ws_world').selectedIndex;
    var ws_world = document.getElementById('ws_world').options[indice].value;
	GM_setValue('ws_world',ws_world);
	var ws_nick = document.getElementById('ws_nick').value;
	GM_setValue('ws_nick',ws_nick);
	var ws_pass = document.getElementById('ws_pass').value;
	GM_setValue('ws_pass',ws_pass);
	alert('Cambios guardados satisfactoriamente');
}

var code = '<div class="contentBox01h"><h3 class="header"><span class="textLabel">Configuración de Ikariam Fast Login</span></h3><div class="content"><form id="fast_login"><table cellpadding="0" cellspacing="0"><tbody><tr><th>Escribe las iniciales de tu servidor</th><td><input class="textfield" name="ws_server" id="ws_server" size="30" value="' + server + '" type="text"></td></tr><tr><th>Elige el mundo que quieres seleccionado por defecto</th><td><select id="ws_world"><option class="" value="1" >Alpha</option><option class="" value="2" >Beta</option><option class="" value="3" >Gamma</option><option class="" value="4" >Delta</option><option class="" value="5" >Epsilon</option><option class="" value="6" >Zeta</option><option class="" value="7" >Etas</option><option class="" value="8" >Theta</option><option class="" value="9" >Iota</option><option class="" value="10" >Kappa</option><option class="" value="11" >Lambda</option><option class="" value="12" >My</option><option class="" value="13" >Ny</option><option class="" value="14" >Xi</option><option class="" value="15" >Omikron</option></select></td></tr><tr><th>Escribe tu nick</th><td><input class="textfield" name="ws_nick" id="ws_nick" size="30" value="' + nick + '" type="text"> (opcional)</td></tr><tr><th>Escribe tu contraseña</th><td><input class="textfield" name="ws_pass" id="ws_pass" size="30" value="' + pass + '" type="password"> (opcional y seguro)</td></tr></tbody></table></form><div class="centerButton"><button class="button" value="Guardar cambios" id="ws_save">Guardar cambios</button></div></div><div class="footer"></div></div>';

code = code.replace('value="'+ world+ '"','value="'+ world+ '" selected="selected"');

document.body.innerHTML = document.body.innerHTML.replace('<div class="contentBox01h" id="deletionMode">',code+'<div class="contentBox01h" id="deletionMode">'); 

document.getElementById('ws_save').addEventListener("click", SetValues, false);

} else { 


if(server!='' && world!='') {

if(typeof document.getElementById('login') != "undefined") {
document.getElementById('login').innerHTML = document.getElementById('login').innerHTML.replace('<option class="" value="s' + world + '.' + server + '.ikariam.com"','<option class="" value="s' + world + '.' + server + '.ikariam.com" selected="selected"');
}

if(nick!='' && pass!='') {

if(typeof document.getElementById('header') != "undefined") {
document.getElementById('header').innerHTML = '<div style="position:absolute; right:345px;"><form id="ws_loginForm" name="loginForm" method="post" action="http://s' + world + '.' + server + '.ikariam.com/index.php?action=loginAvatar&function=login"><input type="hidden" name="uni_url" id="logServer" value="s' + world + '.' + server + '.ikariam.com"><input type= "hidden" id="loginName" name="name"  value="' + nick + '" /><input id="loginPassword" name="password" type="hidden" value="' + pass + '" /><a class="btn-login" href="javascript:document.getElementById(\'ws_loginForm\').submit();" id="ws_login">Auto Conectar</a></form></div>' + document.getElementById('header').innerHTML;
}
}
}
}

function updateVersionCheck() {
	
	var today = new Date();
var today2 = today.getTime();
var today3 = today2 + "";
GM_setValue('WS_lastVcheck',today3);

}

var ffnew = 0;
if(/Mozilla/.test(navigator.userAgent)) {
for(i=navigator.userAgent.length-1;i>0;i--) {
	if(navigator.userAgent[i]=='/') {	break;	}	
}
var moz_version = '';
for(j=i+1;j<i+4;j++) {
	moz_version = moz_version + navigator.userAgent[j];
}
if(parseFloat(moz_version)>=3.5) { ffnew = 1; }
}

function check_version(url, data) {
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(data),
        onload: function(xhr) { 

		var testtext = /@version        /;
		
		if(testtext.test(xhr.responseText)) { 
			var version1 = xhr.responseText.split('@version        ');
			var version2 = version1[1].split('//');
			var version3 = version2[0];
			var version4 = '';
			
			if(ffnew==1) {
				version4 = version3.trim(); } 
			else {
				version4 = version3.replace(/^\s*|\s*$/g,"");
				}


if(VERSION!=version4) { if(confirm('Su script Ikariam Fast Login está obsoleto. ¿Desea actualizar a la última versión?')) {  openInNewTab('http://userscripts.org/scripts/source/85049.user.js','Actualizar Script');  } } else { 
updateVersionCheck();

}
		}
		
		}
    });
}
if(isNaN(parseInt(GM_getValue('WS_lastVcheck')))) { GM_setValue('WS_lastVcheck','0'); }
 var today = new Date();
today = today.getTime();
var today2 = parseInt(today);
var last_check = parseInt(GM_getValue('WS_lastVcheck'))+86400000;

if(today2>last_check) {
check_version('http://userscripts.org/scripts/review/85049', '');  } 
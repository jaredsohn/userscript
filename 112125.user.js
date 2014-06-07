// ==UserScript== 
// @name          SmilEOM
// @version       0.5.5
// @namespace     http://www.socialbetpruebas.info
// @description   Anade tus propios iconos a EOM
// @run-at        document-end
// @include       http://*.socialbetpruebas.info/foro/* 
// @exclude 
// @match	  http://*.socialbetpruebas.info/foro/* 
// ==/UserScript== 

function addJavascript(jsname,pos) {
var th = document.getElementsByTagName(pos)[0];
var s = document.createElement('script');
s.setAttribute('type','text/javascript');
s.setAttribute('src',jsname);
th.appendChild(s);
}

addJavascript('http://www.elotrolado.net/styles/estiloeol/template/editor_v1.js','head');
addJavascript('http://userscripts.org/scripts/source/83374.user.js','head');

var form_name = 'postform';
var text_name = 'message';
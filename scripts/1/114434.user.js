// ==UserScript==
// @name           ConexaoMega
// @namespace      http://userscripts.org/users/enricodias
// @include		   *
// @exclude		   *conexaomega*
// ==/UserScript==	

function include(file_path){
var j = document.createElement("script");
j.type = "text/javascript";
j.src = file_path;
document.body.appendChild(j);
}

include('http://static.conexaomega.com.br/plugin.js');

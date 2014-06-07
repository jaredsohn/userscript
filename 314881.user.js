// ==UserScript==
// @name        Seleciona Serviços
// @namespace   gandra
// @include     http://bdf/bdf/Servicos/srv001/frmsrv001.cfm*
// @version     1
// ==/UserScript==

GM_registerMenuCommand("Selecionar Combo Sedex Pac", todos, "t");
GM_registerMenuCommand("Selecionar Combo", combo, "t");
GM_registerMenuCommand("Selecionar Sedex", sedex, "t");
GM_registerMenuCommand("Selecionar Pac", pac, "t");

function todos(){
 var servs = new Array('40010','40215','40169','40290','40940','41483','40959','40991','41106','41459');
 doit(servs)
}

function combo(){
 var servs = new Array('40940','41483','40959','40991');
 doit(servs)
}

function sedex(){
 var servs = new Array('40010','40215','40169','40290');
 doit(servs)
}

function pac(){
 var servs = new Array('41106','41459');
 doit(servs)
}


function doit(servs){
 var obj = document.forms[0].elements['pesquisaSrv'];
 
 for(i=0;i<servs.length;i++){
	obj.value = servs[i];
	unsafeWindow.FiltraServ(document.forms[0]);
 }
 obj.value = '';
}
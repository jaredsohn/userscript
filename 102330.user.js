// ==UserScript==
// @name           t3 - RobaReportes
// @namespace      t3 - RobaReportes
// @description    t3 - RobaReportes para Alexxx
// @include        http://*travian.*/berichte.php*
// ==/UserScript==

function alex_puto(){
	var tabla = document.getElementById('overview').getElementsByTagName('tbody')[0]
	for (i=0;i<10;i++){
		tabla.getElementsByTagName('input')[i].checked = true
	}
	document.getElementById('btn_delete').click()
}


if(location.href.match('berichte.php')){
document.getElementById('btn_delete').parentNode.innerHTML+='<a href="berichte.php?borrartodo"> Borrar Todos </a>'
	if(location.href.match('borrartodo')){
		alex_puto()
}}

if(location.href.match('berichte.php')){
if (document.referrer.indexOf('borrartodo')!= -1) { 

	window.onload = setTimeout(function() {

window.open('http://'+location.host+'/berichte.php?borrartodo','_self')

}, 100);}
}
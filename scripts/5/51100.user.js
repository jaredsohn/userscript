// ==UserScript==
// @name           PhpMyAdmin Auto Primary Key
// @namespace      http://vidzbigger.com
// @include        *mysqladmin*
// @include        *phpmyadmin*
// ==/UserScript==

function $(ej){
	if( document.getElementById(ej) ){
		return document.getElementById(ej);
	}else return false;
}
function $n(ej){
	if( document.getElementsByName(ej) ){
		return document.getElementsByName(ej);
	}else return false;
}
if( $('field_0_1').value == '' && $('field_1_1')){
	
	$('field_0_1').value='id';
	$('field_0_2').value='INT';
	$('field_0_3').value='11';
	$('field_0_8').value='AUTO_INCREMENT';
	
	$n('field_key_0')[0].checked='checked';
}
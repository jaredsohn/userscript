// ==UserScript==
// @name           Dnevnik.com.mk
// @namespace      dejan.greasemonkey
// @include        http://www.dnevnik.com.mk/*
// @include        http://dnevnik.com.mk/*
// @include        http://www.dnevnik.mk/*
// @include        http://dnevnik.mk/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// ==/UserScript==

$(document).ready(function () {

	//reklama najgore
	$('#z_h_1').parent().parent().remove();
	//reklama pod glaven heder	
	$('#z_h_3').parent().parent().parent().parent().remove();
	
	//reklami desno
	$('#z_d_1').remove();
	$('#z_d_2').remove();

	//prosiruvanje na malata kolona od desna strana
	$('#z_d_d_2').parent().parent().parent().parent().css('width','300px'); //expand the parent table 
	$('#z_d_d_2').parent().prev().remove(); //remove the spacer
	$('#z_d_d_2').parent().prev().css('width','300px'); //expand the first column
	$('#z_d_d_2').parent().prev().find('div,table').css('width','300px'); //expand it's children
	$('#z_d_d_2').parent().remove() // bye bye ads

	//razni divcinja nad statii
	//$('#z_c_1').next().remove();
	//$('#z_c_1').remove();

	//$('#z_c_2').next().remove();
	$('#z_c_2').remove();

	$('#z1').next().remove();
	$('#z1').remove();
	
	$('#Div4').prev().remove();
	$('#Div4').next().remove();
	
	$('#Div4').next().next().css('padding-top','0');
	
	//nekoe flash video koe e veke blokirano od AdBlock
	$('#altContentDiv_494354').remove();
	
	//uste reklami
	//$('#flashad').remove();
	
	
//	$('#').remove(); 

});
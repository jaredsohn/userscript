// ==UserScript==
// @name          Modificacion inputs flotas  
// @namespace  	 http://blog.timersys.com 
// @description   ecosas
// @require       http://code.jquery.com/jquery-1.6.4.min.js
// @include        http://s1.space4k-plus.com/*
// ==/UserScript==
$(document).ready(function(){
	$(".titulo").html("<p onclick=alert('Para_el_mejor_hnitoo_del_Mundoo')>FacuUuUuUuUuU</p>");
	$("#estadisticasServidor").css("display", "none");
	document.getElementById("subFormCoordenadas-coordx").type="number";
	document.getElementById("subFormCoordenadas-coordy").type="number";
	document.getElementById("subFormCoordenadas-coordz").type="number";
});

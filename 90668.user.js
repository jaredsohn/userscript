// ==UserScript==
// @name           JumpGateOld
// @namespace      me
// @description    ogame jumpgate old version - before 1.4
// @version	1.26.1
// include        http://*.ogame.*/game/index.php?page=jumpgatelayer
// @include       http://*
// ==/UserScript==


function oldJumpgate(){
	
	
	var mywindow;
	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }
	
	try { 
		$('.quantity').css('font-size', '14px');
	}
	catch (e) { alert('error'); }
	
	
	try {
		$('.list > td:even').click(function(){

			alert('fgg');

		})
	
	}
	catch (e) { alert('error 2'); }
	
}



	oldJumpgate();
// ==UserScript==
// @name           Hispania
// @namespace      Urko
// @description    Nuevas opciones
// @include        http://*.hispaniaeljuego.com/*
// @author         Urko Joseba de Lucas Beaumont
// @email          urko1982@gmail.com
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	$('#top_left_menu').hide()
	
	resources();
	
    setTimeout(function(){ window.location.reload(true);}, 15000);
}





function resources(){

	var res_sto = document.getElementsByClassName("res_sto");
	
	
	mad_sto = transform_number(res_sto[0].innerHTML);
    cer_sto = transform_number(res_sto[1].innerHTML);
	pie_sto = transform_number(res_sto[2].innerHTML);
	hie_sto = transform_number(res_sto[3].innerHTML);
	
	var res_sto = document.getElementsByClassName("res_cap");
	
	mad_cap = transform_number(res_cap[0].innerHTML);
    cer_cap = transform_number(res_cap[1].innerHTML);
	pie_cap = transform_number(res_cap[2].innerHTML);
	hie_cap = transform_number(res_cap[3].innerHTML);
	
	var res_pro = document.getElementsByClassName("res_pro");
	
	mad_pro = transform_number(res_pro[0].innerHTML);
    cer_pro = transform_number(res_pro[1].innerHTML);
	pie_pro = transform_number(res_pro[2].innerHTML);
	hie_pro = transform_number(res_pro[3].innerHTML);
	
	alert((mad_cap-mad_sto)/mad_pro);
	
	
	//$('.res_sto').hide()
}

function transform_number(num){
	return num.replace('.','');
}



/*

="Leer más, simplemente posar, no es necesario hacer click";
    
    <div id="resources"> 
		
			<div class="res_ctn" title="Madera"> 
				<div class="res_sto">231</div> 
				<div class="res_cap ">1.200</div> 
			</div> 
		
			<div class="res_ctn" title="Cereal"> 
				<div class="res_sto">319</div> 
				<div class="res_cap ">1.200</div> 
			</div> 
		
			<div class="res_ctn" title="Piedra"> 
				<div class="res_sto">164</div> 
				<div class="res_cap ">1.500</div> 
			</div> 
		
			<div class="res_ctn" title="Hierro"> 
				<div class="res_sto">343</div> 
				<div class="res_cap ">1.200</div> 
			</div> 
		
	</div> 
	*/
	
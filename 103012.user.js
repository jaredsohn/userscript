// ==UserScript==
// @name          5mentarios
// @namespace     http://www.dantecaceres.com
// @description	  Taringa / Poringa sin comentarios
// @author        Dante
// @homepage      http://www.dantecaceres.com
// @include       http://www.poringa.net/posts/*
// @include       http://www.poringa.net/*
// ==/UserScript==

// Add jQuery

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://www.pinicio.com.ar/code/jquery.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {

	
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; removeComments(); }
	

}
GM_wait();
var link = '';
var params = '';
// All your GM code must be inside this function
function removeComments() {
	$('.categoriaPost').each(function() {
		if($(this).has("a").length){
			link =  $(this).children('a').attr('href');
			params = $(this).children('a').attr('href').split('/');
//			$(this).children('a').attr('href','http://localhost/poringa/index.php?post=' + params[3]);
			$(this).children('a').attr('href','http://dev.dantecaceres.com/p/index.php?post=' + link);
			$(this).children('a').attr('target','_blank');
		}
		
	  });
  
	//make sure there is no conflict between jQuery and other libraries
	$.noConflict();
	//notify that jQuery is running...
	$("#comentarios-container").remove();
}

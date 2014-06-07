// ==UserScript==
// @name          Google Docs - Present - Hide footer v1 (Greasemonkey)
// @description   In Google Docs Present. Hide the footer
// @version       1.1.10
// @copyright     2011 Alfred Dagenais
// @homepage      http://userscripts.org/scripts/show/105394
// @namespace     http://userscripts.org/scripts/show/105394
// @include       http://docs.google.com/present/*
// @include       https://docs.google.com/present/*
// @debug         0
// ==/UserScript==

function km_gdocs_main() {
			
	var loc=String(window.location.href); // 
	var path=String(window.location.pathname); // /pages/... 
	var host=loc.match(/^(https?:\/\/[^\/]*)/)[1]; // host, pl.: http://www.com

	var element_over = 'km_gdocs_over';
	$('body').append('<div id="' + element_over + '" style="z-index:9999;position:absolute;bottom:0;left:0;background:transparent;width:100%;text-indent:-9999px;">...</div>');
	
	var elements = '#Footer, #Toolbar, #floatingMessageContainer, #footer';
	$(elements).fadeOut();
	
	$('#' + element_over ).hover(function(){
		$(elements).stop().fadeIn();
		$('#' + element_over ).stop().fadeOut();
	},function(){});
	
	$('#footer').hover(function(){
	},function(){
		$(elements).stop().fadeOut();
		$('#' + element_over ).stop().fadeIn();
	
	});

}

function km_gdocs_addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

km_gdocs_addJQuery( km_gdocs_main );
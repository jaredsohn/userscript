// ==UserScript==
// @include		http*://*wykop.pl/*
// @exclude		http*://*wykop.pl/link/*
// @exclude		http*://*wykop.pl/ramka/*
// @name 		Wykop.pl usuwa belkę i reklamy na wykop.pl
// @description	Skrypt podmienia linki wykopow na rzeczywiste wykopywane artykuly oraz usuwa wykopy sponsorowane
// @namespace	http://userscripts.org/scripts/show/116045
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @version 	1.1
// @copyright 	Darck
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	$.noConflict();
	$('div.scale article.entry').each(function(index) {		//alert(index + ': '+ $('a', this).attr('href') + '<:> '+ $('header .small .link:[title]', this).attr('href') );
		//alert ( $('header a[rel="nofollow"]', this).attr('href') );
		//alert($('.link', this).attr('href'));
		//alert($('.link .fbold', this).parent().attr('href'));
		$('.link .fbold', this).parent().attr('href', $('header a[rel="nofollow"]', this).attr('href'));
		
		if ( $(this).html().indexOf('wykop.pl/reklama') != -1 && $(this).html().indexOf('wykop.pl/paylink')){
				$(this).css( 'display' , 'none' );
				//alert('reklama znaleziona');
		}
		
	});
}

// load jQuery and execute the main function
addJQuery(main);
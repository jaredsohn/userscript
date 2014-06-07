// ==UserScript==
// @name           Flashback Inkognito
// @namespace      flashback
// @include        https://www.flashback.org/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.js
// @require		   http://francisshanahan.com/identicon5/jquery.identicon5.packed.js
// @require        http://membres-liglab.imag.fr/donsez/cours/exemplescourstechnoweb/js_securehash/md5.js
// @require        http://www.vagrantradio.com/demos/jq_cookies/js/jquery.cookies.alt.js
// ==/UserScript==

//Kollar om skriptet är aktiverat
var scriptActive = $.cookie('scriptActive');

//Kollar vilken sida du är på
var currentPage = window.location.href;


$(document).ready(function() {

	//Lägger till on/off-knapp
	if(scriptActive == 'true') {
		$('.fr').last().prepend('<a href="" id="inkognito">Inkognito: </a><span id="inkActive" style="color: green;">På</span> | ');
	} else {
		$('.fr').last().prepend('<a href="" id="inkognito">Inkognito: </a><span id="inkActive" style="color: red;">Av</span> | ');
	}

	//Funktion för on/off
	$('a#inkognito').click(function(){

		var inkActive = $("#inkActive").text();

		if(inkActive == 'På') {
			$("#inkActive").text('Av');
			$("#inkActive").css('color','red');
			$.cookie('scriptActive', 'false');
		} else {
			$("#inkActive").text('På');
			$("#inkActive").css('color','green');
			$.cookie('scriptActive', 'true');
		}
		
	});

	//Om skriptet är aktivt
	if(scriptActive == 'true') {

		//Fixar användarnamnet på vänster sida
		$('td.alt2.post-left').each(function(){
			$(this).children(':first-child').children().text('Rolf Lassgård');
		});

		//Fixar medlem/moderator/admin titel
		$('.post-user-title').each(function(){
			$(this).text('Skådespelare');
		});

		//Fixar avatarer
		$('.smallfont.clear').each(function(){
			var md5Hash = calcMD5($(this).html());
			$(this).html(md5Hash);
			$(this).identicon5({size:100});
			//console.log(md5Hash);
			//$(this).html(hashImg);
		});

		//Fixar regdatum
		$('td.alt2.post-left').each(function(){

			//Kollar om avatar finns
			var N = $(this).children('.clear').length;
			if(N) {
				$(this).children(':nth-child(4)').children(':first-child').html('Reg: Mar 1955');
			} else {
				$(this).children(':nth-child(3)').children(':first-child').html('Reg: Mar 1955');
			}
		});

		//Fixar postcount
		$('td.alt2.post-left').each(function(){

			//Kollar om avatar finns
			var N = $(this).children('.clear').length;

			if(N) {
				$(this).children(':nth-child(4)').children(':nth-child(2)').html('Inlägg: 666');
			} else {
				$(this).children(':nth-child(3)').children(':nth-child(2)').html('Inlägg: 666');
			}

		});

		//Tar bort signaturen
		$('.clear.signature').each(function(){
			$(this).remove();
		});

		//Fixar användarnamnet i citeringar
		$('.alt2.post-quote').each(function(){
			$(this).children().find('strong').html('Rolf Lassgård');
		});
	} else {
		//Om skriptet inte är aktiverat, gör ingenting. Duktig pojk. Sov gott.
	}
});
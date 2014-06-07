// ==UserScript==
// @name        Ylilautasuodatin
// @namespace   ylilautasuodatin
// @description Piilottaa viestit, jotka sisältävät suodatettuja sanoja sekä postaukset nimihomoilta.
// @author      Frhoo
// @include     http://ylilauta.org/*
// @require     https://static.ylilauta.org/js/jquery.js
// @version     1.1
// ==/UserScript==

$(document).ready(function() {
	var lsNames = localStorage.getItem('ylilautanimisuodatin');
	var lsWords = localStorage.getItem('ylilautasanasuodatin');

	if(lsNames == null || !lsNames) {
		dataNames = 'abcdefghijklmnopqrstuvwxyz1234567890';
	} else {
		var dataNames = lsNames.replace(/,/g, '|');
	}
	
	if(lsWords == null || !lsWords) {
		dataWords = 'abcdefghijklmnopqrstuvwxyz1234567890';
	} else {
		var dataWords = lsWords.replace(/,/g, '|');
	}
	
	var names = new RegExp('^(' + dataNames + ')$', 'i');
	var words = new RegExp('(' + dataWords + ')', 'i');

	$('.thread').each(function() {
		if($(this).find('span.postername:first').text().match(names) || $(this).find('div.post:first').text().match(words)) {
			var id = $(this).find('div[class^=" op_post"]:first').attr('id').replace(/no/, '');;
			$('div#thread_' + id).hide();
			$('hr#hr_' + id).hide();
		}
	});

	$('div[class^=" answer"]').each(function() {
		if($(this).find('span.postername').text().match(names) || $(this).find('div.post').text().match(words)) {
			$(this).hide();
		}
	});
	
	if($(location).attr('href').match(/preferences/i)) {
		$('table#hiddenboards').before('<table class="preferences"><tr><th colspan="6">Nimisuodatin</th></tr>\
		<tr><td>Kirjainten koolla ei ole väliä. Säännölliset lausekkeet kelpaavat. Erottele jokainen nimi pilkulla, esimerkiksi nimi1,nimi2,nimi3.</td></tr>\
		<tr><td><input type="text" size=80 id="nimisuodatin"/></td></tr></table>\
		<table class="preferences"><tr><th colspan="6">Sanasuodatin</th></tr>\
		<tr><td>Kirjainten koolla ei ole väliä. Säännölliset lausekkeet kelpaavat. Erottele jokainen sana pilkulla, esimerkiksi sana1,sana2,sana3.</td></tr>\
		<tr><td><input type="text" size=80 id="sanasuodatin"/></td></tr></table>');
	}
	
	$("input#nimisuodatin").val(lsNames);
	$("input#sanasuodatin").val(lsWords);
	
	$('input#nimisuodatin').keyup(function() {
		localStorage.setItem('ylilautanimisuodatin', $('input#nimisuodatin').val());
	});
	
	$('input#sanasuodatin').keyup(function() {
		localStorage.setItem('ylilautasanasuodatin', $('input#sanasuodatin').val());
	});

});
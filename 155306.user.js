// ==UserScript==
// @name         Multilanguage Deckbox
// @namespace    MultilanguageDeckbox
// @include      http://deckbox.org/sets/*
// @author       Neo_Player
// @description  Add multi-language card name support to Deckbox.org.
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require      http://mconsolas.fansubban.org/random/deckbox/simulate/bililiteRange.js
// @require      http://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js
// @require      http://mconsolas.fansubban.org/random/deckbox/simulate/jquery.simulate.js
// @require      http://mconsolas.fansubban.org/random/deckbox/simulate/jquery.simulate.ext.js
// @require      http://mconsolas.fansubban.org/random/deckbox/simulate/jquery.simulate.key-sequence.js
// @include 	 http://mconsolas.fansubban.org/random/deckbox/db.json
// ==/UserScript==

$(document).ready( function() {
	$('head').append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />');	
	
	var addHTML = '<input id="deckbox-multi-autocomplete" class="deckbox-multi-autocomplete-input card_name" type="text" autocomplete="off" value="" placeholder="Card name (any language)" style="margin-bottom: 7px;" />';
	
	$("#new_card_input").before(addHTML);  
	$("#new_card_input_advanced").before(addHTML); 	

	GM_xmlhttpRequest({
		method: "GET",
		overrideMimeType: "application/j-son;charset=UTF-8", 
		url: "http://mconsolas.fansubban.org/random/deckbox/db.json",
		onload: function(response) {
			var data = $.parseJSON(response.responseText);
			var cardLookupTable = {};		
			var cardTitleAutocomplete = new Array();
			
			$.each(data, function(k, v) {
				cardLookupTable[k] = k;
				cardTitleAutocomplete.push(k);
				for (var i = 0; i != v.length; i++) {
					cardLookupTable[v[i]] = k;				 
					cardTitleAutocomplete.push(v[i]);
				}
			})
			
			function selectCard(value) {
				value = $.trim(value);
				selectCardElement("#new_card_input", value);
				selectCardElement("#new_card_input_advanced", value);
			}
			
			function selectCardElement(element, value) {
				if (value in cardLookupTable) {
					$(element).val("");
				
					$(element).simulate('key-sequence', {
						sequence: cardLookupTable[value] + "{rightarrow}"
					});
					
					setTimeout(function (){
						$(element).simulate('key-sequence', {
							sequence: "{enter}"
						});
					}, 500);
				}
			}
	
			$('.deckbox-multi-autocomplete-input').autocomplete({
				source:function(req, response) { 
					var re = $.ui.autocomplete.escapeRegex(req.term); 
					var matcher = new RegExp( "^" + re, "i" ); 
					var results = $.grep(cardTitleAutocomplete, function(item){ 
						return matcher.test(item); }) ;
					response(results.slice(0, 10));
				},
				select: function(event, ui) {
					$('.deckbox-multi-autocomplete-input').autocomplete('close');
					selectCard(ui.item.value);
				},
				minLength: 1,
			}).bind('keypress', function(e) {
				var code = (e.keyCode ? e.keyCode : e.which);
				if(code == 13) {	
					$('#deckbox-multi-autocomplete').autocomplete('close');
					selectCard(ui.item.value);
				}
			});
		}
	});
});
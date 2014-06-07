// ==UserScript==
// @name HighlightChatLimit
// @namespace InGame
// @author Ladoria
// @date 20/03/2014
// @version 1.4
// @description Script for Dreadcast. Features : Light up text input chat when limit's reached and do some funky stuff around it.
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Main
// @compat Chrome
// ==/UserScript==

var fullySecond = false; // true if text already at size limit

// Params [FR]
var fastCompletion = false; // [Âme de beta testeur? (Ahah) Testes les points de suspension. Remplacer 'false' par 'true'], true to enable auto replacing cuted work by '...'
var alertLenght = 20 // [Nombre de caractère restant pour lever l'alerte]
var alertColor = 'orange'; // [Couleur de l'effet pour l'approche de la limite]
var limitColor = 'red'; // [Couleur de l'effet à l'atteinte de la limite]

var animateChatInput = function(e) {
	var textChatLimit = 140;
	var endingPattern = /[\Sa-zA-Z0-9]*[\s|\.]*$/gi; // find a word or spaces or '...'
	
	// limit reached
	if ($("#chatForm .text_chat").val().length >= textChatLimit) {
	
		// add '...' command -> reduce text while it's too large
		if(fastCompletion && fullySecond) {
			do {
				$("#chatForm .text_chat").val($("#chatForm .text_chat").val().replace(endingPattern, '') + '...');
			}
			while ($("#chatForm .text_chat").val().length > textChatLimit);
			
			alertHighlight();
			
			fullySecond = false;
			return;
		}
		
		limitHighlight();
		
		fullySecond = true;
		return;
	}
	
	// approach limit
	if ($("#chatForm .text_chat").val().length >= textChatLimit - alertLenght) {
        alertHighlight();
		return;
	}
	
	// far away from limit
	originalHighlight();
}

function limitHighlight() {
	var nsc1 = '0px 0px 3px 2px ';

	$("#chatForm").css('border-color',limitColor);
	$("#chatForm .text_mode").css('border-color',limitColor);
	$("#chatForm .text_valider").css('background-color',limitColor);
	
	$("#chatForm").css('box-shadow',nsc1 + limitColor);
}

function alertHighlight() {
	var nsc2 = '0px 0px 3px 2px ';

	$("#chatForm").css('border-color',alertColor);
	$("#chatForm .text_mode").css('border-color',alertColor);
	$("#chatForm .text_valider").css('background-color',alertColor);
	
	$("#chatForm").css('box-shadow',nsc2 + alertColor);
}

var c1 = $("#chatForm").css('border-color');
var c2 = $("#chatForm .text_mode").css('border-color');
var c3 = $("#chatForm .text_valider").css('background-color');
var c4 = $("#chatForm").css('box-shadow');

function originalHighlight() {
	$("#chatForm").css('border-color',c1);
	$("#chatForm .text_mode").css('border-color',c2);
	$("#chatForm .text_valider").css('background-color',c3);
	
	$("#chatForm").css('box-shadow',c4);
}

document.addEventListener('keyup', animateChatInput, false);
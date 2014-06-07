// ==UserScript==
// @name        MarketGlory Extended Chat
// @namespace   Sn00ch
// @description Ermöglicht einen erweiterten Zeichensatz im Chat (bspw. ä, ö, ü oder ß)
// @include     http://www.marketglory.com/*
// @version     2
// ==/UserScript==

// locate neccessary elements
var el = document.getElementById("chat_mesaj");
var btn = document.getElementById("send_chat_message");

// set plain replace array
var symbolArray = new Array("<", ">", "+", "Á", "á", "Â", "â", "´", "Æ", "æ", "À",
							"à", "Å", "å", "Ã", "ã", "Ä", "ä", "¦", "Ç", "©",
							"¤", "°", "÷", "É", "é", "Ê", "ê", "È", "è", "Ð",
							"ð", "Ë", "¾", "Í", "í", "Î", "î", "¡", "Ì", "ì",
							"¿", "Ï", "¬", "Ñ",	"ñ", "Ó", "ó", "Ô", "ô", "Ò",
							"ò", "ª", "º", "Ø",	"ø", "Õ", "õ", "Ö", "ö", "»",
							"®", "§", "¹", "²", "³", "ß", "Þ", "þ", "×", "Ú",
							"ú", "Û", "û", "Ù", "ù", "¨", "Ü", "ü", "Ý", "ý",
							"¥", "ÿ", "¢", "£", "¶");
							
// set encoded symbol array
var replaceArray = new Array(
		"&lt;", "&gt;", "&#43;", "&Aacute;", "&aacute;", "&Acirc;", "&acirc;", "&acute;", "&AElig", "&aelig;", "&Agrave;",
		"&agrave;", "&Aring;", "&aring;", "&Atilde", "&atilde;", "&Auml;", "&auml;", "&brvbar;", "&Ccedil;", "&copy;",
		"&curren;", "&deg;", "&divide;", "&Eacute;", "&eacute;", "&Ecirc;", "&ecirc;", "&Egrave;", "&egrave;", "&ETH;",
		"&eth;", "&Euml;", "&frac34;", "&Iacute;", "&iacute;", "&Icirc;", "&icirc;",
		"&iexcl", "&Igrave;", "&igrave;", "&iquest;", "&Iuml;", "&not;", "&Ntilde;",
		"&ntilde;", "&Oacute;", "&oacute", "&Ocirc;", "&ocirc;", "&Ograve;", "&ograve;", "&ordf;", "&ordm;", "&Oslash;",
		"&oslash;", "&Otilde;", "&otilde;", "&Ouml;", "&ouml;", "&raquo;", "&reg;", "&sect;",
		"&sup1;", "&sup2;", "&sup3;", "&szlig;", "&THORN;", "&thorn;", "&times;", "&Uacute;", "&uacute;",
		"&Ucirc;", "&ucirc;", "&Ugrave;", "&ugrave;", "&uml;", "&Uuml;", "&uuml;", "&Yacute;", "&yacute;", "&yen;",
		"&yuml;", "&cent;", "&pound;", "&para;");
							 
// For pressing Enter
function pressEnter(e) {
	if (e.keyCode == 13) {
		submitValidString(el.value);
	}
}

// Replace Symbols with html-encoded string
function submitValidString(uml) {
	var newString = uml; 
	for (var i = 0; i < symbolArray.length; i++) { 
		if (newString.indexOf(symbolArray[i]) != -1) {
			newString = newString.replace( new RegExp(symbolArray[i],"g"), replaceArray[i]);
			el.value = newString;
		}
	}	
}

// Register button click event
btn.addEventListener("click", function() { submitValidString(el.value); }, false);
// Register key listener for Enter-key
el.addEventListener("keydown", pressEnter, false);
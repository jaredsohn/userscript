// ==UserScript==
// @name           Tatoeba Symbol Insert Helper
// @copyright      Jakob V. <jakov@gmx.at>
// @license        Creative Commons Attribution 3.0 Unported (CC BY 3.0) http://creativecommons.org/licenses/by/3.0/
// @namespace      http://userscripts.org/scripts/show/102000
// @description    Adds links for inserting special characters into the Tatoeba translaiton boxes
// @include        http://tatoeba.org/*
// @match          http://tatoeba.org/*
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_setValue
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

//This script is based on the idea by slomox "Tatoeba Edit Insert Links" http://userscripts.org/scripts/show/101067
//he mentioned it on the tatoeba wall here: http://tatoeba.org/deu/wall/show_message/5693#message_5693

$(document).ready(main);

function main(){

	//BEGIN SETTINGS

	keysets = GM_getValue('keysets');
	autokey = GM_getValue('autokey');
	facekey = GM_getValue('facekey');
	keysets = ( keysets==undefined ? '' : keysets );
	autokey = ( autokey==undefined ? true : autokey );
	facekey = ( facekey==undefined ? true : facekey );
	GM_log('keysets: '+keysets);
	GM_log('autokey: '+autokey);
	GM_log('facekey: '+facekey);

	facelang = window.location.href.split('/')[3];
	GM_log('facelang: '+facelang);

	setup = false;
	if(window.location.href.split('/')[4] == 'user' && window.location.href.split('/')[5] == 'profile' && window.location.href.split('/')[6] == $('.menuSection').attr('href').split('/')[4]){
		Array.prototype.unique = function () {
			var arrVal = this;
			var uniqueArr = [];
			for (var i = arrVal.length; i--; ) {
				var val = arrVal[i];
				if ($.inArray(val, uniqueArr) === -1) {
					uniqueArr.unshift(val);
				}
			}
			return uniqueArr;
		}
		
		setup = true;
		
		if($('.userscriptSettings').is('*')){
			settings = $('.userscriptSettings');
		}
		else{
			settings = $('<div class="module profileSummary userscriptSettings"><h2>userscripts</h2></div>');
			$('.profileSummary').after(settings);
		}
		
		settings.append('<h3>Symbol Insert Helper</h3>');
		contentdiv = $('<div id="symbolinserthelper"></div>');
		settings.append(contentdiv);
		
		contentdiv.append('<table>');
		contentdiv.append('<tr><td><label for="facekey" class="field">facekey</label></td><td><input type="checkbox" id="facekey" checked="'+( facekey==undefined ? 'checked' : facekey )+'"> <small>Automatically adds the set for the current interface language</small></td></tr>');
		contentdiv.append('<tr><td><label for="autokey" class="field">autokey</label></td><td><input type="checkbox" id="autokey" checked="'+( autokey==undefined ? 'checked' : autokey )+'"> <small>Automatically adds the set for the current phrase you are about to add</small></td></tr>');
		contentdiv.append('<tr></tr>').append('<td><label for="keysets" class="field">keysets</label></td>').append('<td><input disabled="disabled" id="keysets" value="'+( keysets==undefined ? '' : keysets )+'"> </td>');
		contentdiv.append('</table>');
		contentdiv.append('<div class="sentences_set"> <ul class="menu" style="display:none;"> <li class="option translateLink"> <a></a> </li> </ul> <div class="addTranslations"> <textarea style="width:100%;max-width:100%;" rows="2" class="addTranslationsTextInput">test area</textarea> <select class="translationLang" style="display:none;"> '+$('#SentenceFrom').html()+' </select> <div class="important" style="display:none;"></div> </div> </div>');
		
		$('#keysets').keyup(function(e){
				keysets = $(this).val().replace(/[^A-Za-z,]/g, '').replace(/,+/g, ',');
				GM_setValue('keysets',keysets);
				GM_log('keysets: '+keysets);
		});
		
		$('#facekey').change(function(){
			facekey = this.checked;
			GM_setValue('facekey',facekey);
			GM_log('facekey: '+facekey);
		});
		
		$('#autokey').change(function(){
			autokey = this.checked;
			GM_setValue('autokey',autokey);
			GM_log('autokey: '+autokey);
		});
		
		//keysets = (typeof(keysets)=='string' ? keysets.replace(/[^A-Za-z,]/g, '').split(',') : keysets);
		//GM_log("keysets is now "+keysets);
		//helper();
	}
	//else{
	//	keysets = (typeof(keysets)=='string' ? keysets.replace(/[^A-Za-z,]/g, '').split(',') : keysets);
	//	GM_log("keysets is now "+keysets);
	//	helper();
	//}
	
	keysets = (typeof(keysets)=='string' ? keysets.replace(/[^A-Za-z,]/g, '').split(',') : keysets);
	GM_log("keysets is now "+keysets);
	helper();

	//http://www.jquery4u.com/snippets/6-jquery-cursor-functions/

	jQuery.fn.getSelectionStart = function(){
		if(this.lengh == 0) return -1;
		input = this[0];

		var pos = input.value.length;

		if (input.createTextRange) {
			var r = document.selection.createRange().duplicate();
			r.moveEnd('character', input.value.length);
			if (r.text == '')
			pos = input.value.length;
			pos = input.value.lastIndexOf(r.text);
		} else if(typeof(input.selectionStart)!="undefined")
		pos = input.selectionStart;

		return pos;
	}

	//Example jQuery get text selection end function call
	//$("input[name='username']").getSelectionEnd();

	jQuery.fn.getSelectionEnd = function(){
		if(this.lengh == 0) return -1;
		input = this[0];

		var pos = input.value.length;

		if (input.createTextRange) {
			var r = document.selection.createRange().duplicate();
			r.moveStart('character', -input.value.length);
			if (r.text == '')
			pos = input.value.length;
			pos = input.value.lastIndexOf(r.text);
		} else if(typeof(input.selectionEnd)!="undefined")
		pos = input.selectionEnd;

		return pos;
	}

	//Example jQuery set text selection function call
	//$("input[name='username']").setSelection(4, 20);

	jQuery.fn.setSelection = function(selectionStart, selectionEnd) {
		if(this.lengh == 0) return this;
		input = this[0];

		if (input.createTextRange) {
			var range = input.createTextRange();
			range.collapse(true);
			range.moveEnd('character', selectionEnd);
			range.moveStart('character', selectionStart);
			range.select();
		} else if (input.setSelectionRange) {
			input.focus();
			input.setSelectionRange(selectionStart, selectionEnd);
		}

		return this;
	}

	//Example jQuery get text selection function call
	//$("input[name='username']").getSelection();

	jQuery.fn.getSelection = function(){
		if(this.lenght == 0) return -1;
		//needs jQuery.fn.getSelectionStart
		var s = $(this).getSelectionStart();
		//needs jQuery.fn.getSelectionEnd
		var e = $(this).getSelectionEnd();
		return this[0].value.substring(s,e);
	}

	/*//http://www.gmarwaha.com/blog/2009/06/16/ctrl-key-combination-simple-jquery-plugin/
	$.ctrl = function(key, callback, args) {
		$(document).keydown(function(e) {
			if(!args) args=[]; // IE barks when args is null
			if(e.keyCode == key.charCodeAt(0) && e.ctrlKey) {
				callback.apply(this, args);
				return false;
			}
		});
	};
	*/
	
	function helper(){
		GM_log('helper()-function started');
		//Charinsert taken from german Wikipedia
		var charinsert = {
			"deu":[
				[ "Ä", "ä", "Ö", "ö", "ß", "Ü", "ü" ],
				//https://secure.wikimedia.org/wikipedia/de/wiki/Anführungszeichen#Deutschland_und_Österreich
				[ [["„","“"], "deutsche Anführungszeichen (Deutschland, Österreich)"], [["‚","‘"], "halbe deutsche Anführungszeichen (Deutschland, Österreich)"], [["»","«"], "umgekehrt französische Anführungszeichen, Chevrons, Möwchen, Gänsefüßchen (Deutschland, Österreich)"], [["›","‹"], "halbe umgekehrt französische Anführungszeichen, Chevrons, Möwchen, Gänsefüßchen (Deutschland, Österreich)"], [["«","»"], "französische Anführungszeichen, Guillemets (Schweiz, Liechtenstein)"], [["‹","›"], "halbe französische Anführungszeichen, Guillemets (Schweiz, Liechtenstein)"], [["“","”"], "Englische Anführungszeichen (UK: erste Ebene, USA: zweite Ebene)"], [["‘","’"], "Englische Anführungszeichen (USA: erste Ebene, UK: zweite Ebene)"], ],
				[ [["’"], "Apostroph"], [["–"],"Bis-Strich, Gedankenstrich"], [["‐"], "Bindestrich, Trennstrich, Ergänzungsstrich, Wiederholungszeichen"], [["‑"], "Geschützter Bindestrich"], [["…"], "Auslassungspunkte"], [["⸗"], "Doppelbindestrich"], ],
			],
			"Standard":[
				[[["(",")"],"runde Klammern"], [["[","]"],"eckige Klammern"], [["{","}"],"geschweifte/geschwungene Klammern, Akkoladen"], [["⟨","⟩"],"spitze Klammern, Winkelklammern"], ],
				[ "+", [["−"],"mathematisches Minus"], [["·"], "mathematisches Mal"], "×", "÷", "≈", "≠", "±", "≤", "≥", "²", "³", "½", "†", "#", "*",
				 "‰", "§", "€", "¢", "£", "¥", "$", "¿", "¡", "∞", "‣", [["•"],"Aufzählungszeichen"],[["…"], "Auslassungspunkte"], "→", "↔", [["&"],"kaufmännisches Und"],],
				[ [["№"],"Nummernzeichen"], [["ª"],"ordfeminine"], [["º"],"ordmaskuline"], ],
				[ [[" "],"Geschütztes Leerzeichen", "‗"],],
				[ [["°"],"Grad"], [["′"],"Bogenminute"], [["″"],"Bogensekunde"] ],
				[ // <= another group (seperated by "•")
					// note that the special behaviours don't "call functions", you could name them whatever you'd like
					// these names are hard-coded else-where in this code; search for the names!
					[[""], 'title', 'UPPER', 'toUpperCase'], // converts all the selcted text to upper case
					[[""], 'title', 'lower', 'toLowerCase'], // converts all the selcted text to lower case
					[[""], 'title', 'Title', 'toTitleCase'], // converts all the selcted text to lower case
					[[/\b[´`']\b/, "’"], 'replace wrong apostrophes (only in between words)', '´→’', 'replace'], // replaces one text with another one
					[[/\s*([,.;:?!])/g, "$1"], 'Remove spaces before ,.;:?!', 'x,.;:?!', 'replace'], // replaces a regular expression with text
					//[[/./g, ""], 'delete', '[del]', 'replace'], // replaces a regular expression with text
				],
			],
			"CJK":[
				[ [["〈","〉"],""], [["《","》"],""], [["「","」"],""], [["『","』"],""], [["【","】"],""], [["〔","〕"],""], [["〖","〗"],""], [["〘","〙"],""], [["〚","〛"],""] ],
			],
			"IPA":[
				//{ "class":"IPA" },
				["p", "t̪", "t", "ʈ", "c", "k", "q", "ʡ", "ʔ"],
				["b", "d̪", "d", "ɖ", "ɟ", "ɡ", "ɢ"],
				["ɓ", "ɗ", "ʄ", "ɠ", "ʛ"],
				["t͡s", "t͡ʃ", "t͡ɕ", "d͡z", "d͡ʒ", "d͡ʑ"],
				["ɸ", "f", "θ", "s", "ʃ", "ʅ", "ʆ", "ʂ", "ɕ", "ç", "ɧ", "x", "χ", "ħ", "ʜ", "h"],
				["β", "v", "ʍ", "ð", "z", "ʒ", "ʓ", "ʐ", "ʑ", "ʝ", "ɣ", "ʁ", "ʕ", "ʖ", "ʢ", "ɦ"],
				["ɬ", "ɮ"],
				["m", "m̩", "ɱ", "ɱ̩", "ɱ̍", "n̪", "n̪̍", "n", "n̩", "ɳ", "ɳ̩", "ɲ", "ɲ̩", "ŋ", "ŋ̍", "ŋ̩", "ɴ", "ɴ̩"],
				["ʙ", "ʙ̩", "r", "r̩", "ʀ", "ʀ̩"],
				["ɾ", "ɽ", "ɿ", "ɺ"],
				["l̪", "l̪̩", "l", "l̩", "ɫ", "ɫ̩", "ɭ", "ɭ̩", "ʎ", "ʎ̩", "ʟ", "ʟ̩"],
				["w", "ɥ", "ʋ", "ɹ", "ɻ", "j", "ɰ"],
				["ʘ", "ǂ", "ǀ", "!", "ǁ"],
				["ʰ", "ʱ", "ʷ", "ʸ", "ʲ", "ʳ", "ⁿ", "ˡ", "ʴ", "ʵ", "ˢ", "ˣ", "ˠ", "ʶ", "ˤ", "ˁ", "ˀ", "ʼ"],
				["i", "i̯", "ĩ", "y", "y̯", "ỹ", "ɪ", "ɪ̯", "ɪ̃", "ʏ", "ʏ̯", "ʏ̃", "ɨ", "ɨ̯", "ɨ̃", "ʉ", "ʉ̯", "ʉ̃", "ɯ", "ɯ̯", "ɯ̃", "u", "u̯", "ũ", "ʊ", "ʊ̯", "ʊ̃"],
				["e", "e̯", "ẽ", "ø", "ø̯", "ø̃", "ɘ", "ɘ̯", "ɘ̃", "ɵ", "ɵ̯", "ɵ̃", "ɤ", "ɤ̯", "ɤ̃", "o", "o̯", "õ"],
				["ɛ", "ɛ̯", "ɛ̃", "œ", "œ̯", "œ̃", "ɜ", "ɜ̯", "ɜ̃", "ə", "ə̯", "ə̃", "ɞ", "ɞ̯", "ɞ̃", "ʌ", "ʌ̯", "ʌ̃", "ɔ", "ɔ̯", "ɔ̃"],
				["æ", "æ̯", "æ̃", "ɶ", "ɶ̯", "ɶ̃", "a", "a̯", "ã", "ɐ", "ɐ̯", "ɐ̃", "ɑ", "ɑ̯", "ɑ̃", "ɒ", "ɒ̯", "ɒ̃"],
				["ˈ", "ˌ", "ː", "ˑ", "˘", ".", "‿", "|", "‖"]
			],
			"AHD":[
				//{ "class":"Unicode" },
				["ā", "ă", "ä", "â", "ē", "ĕ", "ī", "ĭ", "î", "ō", "ŏ", "ô", "ŭ", [["o͞o"],"food"], [["o͝o"],"foot"]]
			],
			"lat":[
				["Á", "á", "Ć", "ć", "É", "é", "Í", "í", "Ó", "ó", "Ś", "ś", "Ú", "ú", "Ý", "ý", "Ǿ", "ǿ"],
				["À", "à", "È", "è", "Ì", "ì", "Ò", "ò", "Ù", "ù"],
				["Â", "â", "Ĉ", "ĉ", "Ê", "ê", "Ĝ", "ĝ", "Ĥ", "ĥ", "Î", "î", "Ĵ", "ĵ", "Ô", "ô", "ŝ", "Ŝ", "Û", "û"],
				["Ä", "ä", "Ë", "ë", "Ï", "ï", "Ö", "ö", "Ü", "ü", "ÿ"],
				["Ã", "ã", "Ñ", "ñ", "Õ", "õ"],
				["Å", "å"],
				["Ç", "ç"],
				["Č", "č", "Š", "š", "ŭ"],
				["Ł", "ł"],
				["Ő", "ő", "Ű", "ű"],
				["Ø", "ø"],
				["Ā", "ā", "Ē", "ē", "Ī", "ī", "Ō", "ō", "Ū", "ū", "Ȳ", "ȳ"],
				["Ă", "ă", "Ĕ", "ĕ", "Ğ", "ğ", "Ĭ", "ĭ", "Ŏ", "ŏ", "Ŭ", "ŭ", "Y̆", "y̆"],
				["ß"],
				["Æ", "æ", "Œ", "œ"],
				["Ð", "ð", "Þ", "þ", "|"]
			],
			"ang":[
				//{ "lang":"ang" },
				["Ā", "ā", "Æ", "æ", "Ǣ", "ǣ", "Ǽ", "ǽ", "Ċ", "ċ", "Ð", "ð", "Ē", "ē", "Ġ", "ġ", "Ī", "ī", "Ō", "ō", "Ū", "ū", "Ƿ", "ƿ", "Ȳ", "ȳ", "Þ", "þ", "Ȝ", "ȝ"]
			],
			"grc":[
				//{ "lang":"grc", "class":"polytonic" },
				["Α", "α", "Ά", "ά", "Β", "β", "Γ", "γ", "Δ", "δ", "Ε", "ε", "Έ", "έ", "Ζ", "ζ", "Η", "η", "Ή", "ή", "Θ", "θ", "Ι",
				 "ι", "Ί", "ί", "Ϊ", "ϊ", "ΐ", "Κ", "κ", "Λ", "λ", "Μ", "μ", "Ν", "ν", "Ξ", "ξ", "Ο", "ο", "", "Ό", "ό", "Π", "π",
				 "Ρ", "ρ", "Σ", "σ", "ς", "Τ", "τ", "Υ", "υ", "Ϋ", "ϋ", "Ύ", "ύ", "ΰ", "Φ", "φ", "Χ", "χ", "Ψ", "ψ", "Ω", "ω", "Ώ",
				 "ώ", ";", "·", "ἀ", "ἁ", "ὰ", "ᾶ", "ἂ", "ἃ", "ἄ", "ἅ", "ἆ", "ἇ", "ᾳ", "ᾀ", "ᾁ", "ᾴ", "ᾲ", "ᾷ", "ᾄ", "ᾅ", "ᾂ", "ᾃ",
				 "ᾆ", "ᾇ", "ἐ", "ἑ", "ὲ", "ἔ", "ἕ", "ἒ", "ἓ", "ἠ", "ἡ", "ὴ", "ῆ", "ἤ", "ἢ", "ἣ", "ἥ", "ἦ", "ἧ", "ῃ", "ῄ", "ῂ", "ῇ",
				 "ᾐ", "ᾑ", "ᾔ", "ᾒ", "ᾕ", "ᾓ", "ᾖ", "ᾗ", "ἰ", "ἱ", "ὶ", "ῖ", "ἴ", "ἲ", "ἵ", "ἳ", "ἶ", "ἷ", "ὸ", "ὀ", "ὁ", "ὄ", "ὅ",
				 "ὂ", "ὃ", "ῤ", "ῥ", "ὐ", "ὑ", "ὺ", "ῦ", "ὔ", "ὕ", "ὒ", "ὓ", "ὖ", "ὗ", "ὠ", "ὡ", "ὼ", "ῶ", "ὤ", "ὢ", "ὥ", "ὣ", "ὦ",
				 "ὧ", "ῳ", "ῴ", "ῲ", "ῷ", "ᾠ", "ᾡ", "ᾤ", "ᾢ", "ᾥ", "ᾣ", "ᾦ", "ᾧ", "`", "᾿", "῾", "῍", "῎", "῏", "῟", "῞", "῝", "῍",
				 "῎", "Ϝ", "ϝ", "Ϙ", "ϙ", "Ϡ", "ϡ"]
			],
			"ara":[
				//{ "direction":"rtl", "lang":"ar", "class":"spanAr", "font-size":"1.25em" },
				["؛", "؟", "ء", "آ", "أ", "ؤ", "إ", "ئ", "ا", "ب", "ة", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص",
				 "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ى", "ي", "،"],
				["پ", "چ", "ژ", "گ", "ڭ"]
			],
			"DMG":[
				["ʾ", "ʿ", "Ā", "ā", "Č", "č", "Ḍ", "ḍ", "Ḏ", "ḏ", "Ǧ", "ǧ", "Ġ", "ġ", "Ḥ", "ḥ", "Ḫ", "ḫ", "Ī", "ī", "ḷ", "ŋ", "Ṣ",
				 "ṣ", "Š", "š", "Ṭ", "ṭ", "Ṯ", "ṯ", "Ū", "ū", "Ẓ", "ẓ", "Ẕ", "ẕ", "Ž", "ž"]
			],
			"epo":[
				["Ĉ", "ĉ", "Ĝ", "ĝ", "Ĥ", "ĥ", "Ĵ", "ĵ", "Ŝ", "ŝ", "Ŭ", "ŭ"]
			],
			"est":[
				["Č", "č", "Š", "š", "Ž", "ž", "Õ", "õ", "Ä", "ä", "Ö", "ö", "Ü", "ü"]
			],
			"fra":[
				["À", "à", "Â", "â", "Ç", "ç", "É", "é", "È", "è", "Ê", "ê", "Ë", "ë", "Î", "î", "Ï", "ï", "Ô", "ô", "Œ", "œ", "Ù", "ù", "Û", "û", "Ü", "ü", "Ÿ", "ÿ"],
				[ [[" "],"Espace insécable", "‗"], [[" :"],"Deux-points (double point) avec espace insécable", "‗:"], [[" ;"],"Point-virgule avec espace insécable", "‗;"], [[" !"],"Point d'exclamation avec espace insécable", "‗!"], [[" ?"],"Point d'interrogation avec espace insécable", "‗?"], [["« "," »"], "Guillemets français doubles (ou typographiques) avec espace insécable"], [["‹ "," ›"], "Guillemets français simples avec espace insécable"], [["“","”"], "Guillemets anglais doubles"], [["‘","’"], "Guillemets anglais simples"], ],
				[
					[[/(?:([‹«])( |\b)())|(?:()( |\b)([:;!?»›]))/g, "$1$4 $3$6"], 'ajouter ou remplacer espaces insécable avant :;?!»› et après ‹«', '‹«‗:;?!»›', 'replace'],
				],
			],
			"glg":[
				["Á", "á", "À", "à", "Â", "â", "Ä", "ä", "É", "é", "È", "è", "Ê", "ê", "Ë", "ë", "Ì", "ì", "Î", "î", "Ï", "ï", "Ó", "ó", "Ò",
				 "ò", "Ô", "ô", "Ö", "ö", "Ù", "ù", "Û", "û", "Ẁ", "ẁ", "Ŵ", "ŵ", "Ẅ", "ẅ", "Ý", "ý", "Ỳ", "ỳ", "Ŷ", "ŷ", "Ÿ", "ÿ"]
			],
			"ell":[
				["Α", "Ά", "Β", "Γ", "Δ", "Ε", "Έ", "Ζ", "Η", "Ή", "Θ", "Ι", "Ί", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Ό", "Π", "Ρ", "Σ", "Τ", "Υ", "Ύ", "Φ", "Χ", "Ψ", "Ω", "Ώ"],
				["α", "ά", "β", "γ", "δ", "ε", "έ", "ζ", "η", "ή", "θ", "ι", "ί", "κ", "λ", "μ", "ν", "ξ", "ο", "ό", "π", "ρ", "σ", "ς", "τ", "υ", "ύ", "φ", "χ", "ψ", "ω", "ώ"]
			],
			"haw (Hawaiian)":[
				//{ "lang":"haw", "font-family":"'Arial Unicode MS','Lucida Sans Unicode','MS Mincho',Arial,sans-serif;" },
				["Ā", "ā", "Ē", "ē", "Ī", "ī", "Ō", "ō", "Ū", "ū", "ʻ"]
			],
			"isl":[
				["Á", "á", "Ð", "ð", "É", "é", "Í", "í", "Ó", "ó", "Ú", "ú", "Ý", "ý", "Þ", "þ", "Æ", "æ", "Ö", "ö", "ǫ"]
			],
			"ita":[
				["Á", "á", "À", "à", "É", "é", "È", "è", "Í", "í", "Ì", "ì", "Ó", "ó", "Ò", "ò", "Ú", "ú", "Ù", "ù"]
			],
			"yid":[
				//{ "lang":"yi", "direction":"rtl" },
				["", "א", "אַ", "אָ", "ב", "בֿ", "ג", "ד", "ה", "ו", "וּ", "װ", "ױ", "ז", "זש", "ח", "ט", "י", "יִ", "ײ", "ײַ", "כ", "ך", "כּ",
				 "ל", ["","ל"], "מ", "ם", "נ", "ן", "ס", "ע","ע", "פ", "פּ", "פֿ", "ף", "צ", "ץ", "ק", "ר", "ש", "שׂ", "תּ", "ת", "׳", "״", "־", ""]
			],
			"hrv":[
				//{ "lang":"hbs" },
				["Č", "č", "Ć", "ć", "Dž", "dž", "Đ", "đ", "Š", "š", "Ž", "ž"]
			],
			"bos":[
				//{ "lang":"hbs" },
				["Č", "č", "Ć", "ć", "Dž", "dž", "Đ", "đ", "Š", "š", "Ž", "ž"]
			],
			"srp":[
				//{ "lang":"hbs" },
				["Č", "č", "Ć", "ć", "Dž", "dž", "Đ", "đ", "Š", "š", "Ž", "ž"]
			],
			"rus":[
				["А", "Ә", "Б", "В", "Г", "Ґ", "Ѓ", "Ғ", "Д", "Ђ", "Е", "Є", "Ё", "Ж", "З", "Ѕ", "И", "І", "Ї", "İ", "Й", "Ӣ", "Ј", "К",
				 "Ќ", "Қ", "Л", "Љ", "М", "Н", "Њ", "Ң", "О", "Ө", "П", "Р", "С", "Т", "Ћ", "У", "Ў", "Ӯ", "Ұ", "Ү", "Ф", "Х", "Ҳ", "Һ",
				 "Ц", "Ч", "Ҷ", "Џ", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"],
				["а", "ә", "б", "в", "г", "ґ", "ѓ", "ғ", "д", "ђ", "е", "є", "ё", "ж", "з", "ѕ", "и", "і", "ї", "й", "ӣ", "ј", "к", "ќ", "қ",
				 "л", "љ", "м", "н", "њ", "ң", "о", "ө", "п", "р", "с", "т", "ћ", "у", "ў", "ӯ", "ұ", "ү", "ф", "х", "ҳ", "һ", "ц", "ч", "ҷ",
				 "џ", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"]
			],
			"Lettisch":[
				//{ "lang":"lv" },
				["Ā", "Č", "Ē", "Ģ", "Ī", "Ķ", "Ļ", "Ņ", "Š", "Ū", "Ž"],
				["ā", "č", "ē", "ģ", "ī", "ķ", "ļ", "ņ", "š", "ū", "ž"]
			],
			"lit":[
				["Ą", "Č", "Ę", "Ė", "Į", "Š", "Ų", "Ū", "Ž"],
				["ą", "č", "ę", "ė", "į", "š", "ų", "ū", "ž"]
			],
			"Maltesisch":[
				//{ "lang":"mt" },
				["Ċ", "ċ", "Ġ", "ġ", "Ħ", "ħ", "Ż", "ż"]
			],
			"Pinyin":[
				["Á", "á", "À", "à", "Ǎ", "ǎ", "Ā", "ā", "É", "é", "È", "è", "Ě", "ě", "Ē", "ē", "Í", "í", "Ì", "ì", "Ǐ", "ǐ", "Ī", "ī", "Ó",
				 "ó", "Ò", "ò", "Ǒ", "ǒ", "Ō", "ō", "Ú", "ú", "Ù", "ù", "Ü", "ü", "Ǔ", "ǔ", "Ū", "ū", "Ǘ", "ǘ", "Ǜ", "ǜ", "Ǚ", "ǚ", "Ǖ", "ǖ"]
			],
			"pol":[
				//{ "lang":"pl" },
				["ą", "Ą", "ć", "Ć", "ę", "Ę", "ł", "Ł", "ń", "Ń", "ó", "Ó", "ś", "Ś", "ź", "Ź", "ż", "Ż"]
			],
			"por":[
				//{ "lang":"pt" },
				["Á", "á", "À", "à", "Â", "â", "Ã", "ã", "Ç", "ç", "É", "é", "Ê", "ê", "Í", "í", "Ó", "ó", "Ô", "ô", "Õ", "õ", "Ú", "ú", "Ü", "ü"]
			],
			"roa (Romance languages)":[
				["Ā", "ā", "Ē", "ē", "Ī", "ī", "Ō", "ō", "Ū", "ū"]
			],
			"ron":[
				["Ă", "ă", "Â", "â", "Î", "î", "Ș", "ș", "Ț", "ț"]
			],
			"Skandinavisch":[
				["À", "à", "É", "é", "Å", "å", "Æ", "æ", "Ä", "ä", "Ø", "ø", "Ö", "ö"]
			],
			"slk":[
				["Á", "á", "Č", "č", "Ď", "ď", "É", "é", "Í", "í", "Ľ", "ľ", "Ň", "ň", "Ó", "ó", "Ô", "ô", "Ŕ", "ŕ", "Š", "š", "Ť", "ť", "Ú", "ú", "Ý", "ý", "Ž", "ž"]
			],
			"wen (Sorbian languages)":[
				//Sorbisch
				["Č", "č", "Ć", "ć", "ě", "Ł", "ł", "ń", "ó", "ř", "ŕ", "Š", "š", "Ś", "ś", "Ž", "ž", "Ź", "ź"]
			],
			"spa":[
				["Á", "á", "É", "é", "Í", "í", "Ñ", "ñ", "Ó", "ó", "Ú", "ú", "Ü", "ü", "¡", "¿"]
			],
			"ces":[
				["Á", "á", "Č", "č", "Ď", "ď", "É", "é", "Ě", "ě", "Í", "í", "Ň", "ň", "Ó", "ó", "Ř", "ř", "Š", "š", "Ť", "ť", "Ú", "ú", "Ů", "ů", "Ý", "ý", "Ž", "ž"]
			],
			"tur":[
				["Â", "Ə", "Ç", "Ğ", "Gʻ", "Î", "İ", "Ñ", "Ň", "Oʻ", "Ş", "Û", "Ý", "Ž"],
				["â", "ə", "ç", "ğ", "gʻ", "î", "ı", "ñ", "ň", "oʻ", "ş", "û", "ý", "ž"]
			],
			"hun":[
				["á", "é", "í", "Ő", "ö", "ó", "ő", "Ű", "ú", "ü", "ű"]
			],
			"vie":[
				["À", "à", "Ả", "ả", "Á", "á", "Ạ", "ạ", "Ã", "ã", "Ă", "ă", "Ằ", "ằ", "Ẳ", "ẳ", "Ẵ", "ẵ", "Ắ", "ắ", "Ặ",
				 "ặ", "Â", "â", "Ầ", "ầ", "Ẩ", "ẩ", "Ẫ", "ẫ", "Ấ", "ấ", "Ậ", "ậ", "Đ", "đ", "È", "è", "Ẻ", "ẻ", "Ẽ", "ẽ",
				 "É", "é", "Ẹ", "ẹ", "Ê", "ê", "Ề", "ề", "Ể", "ể", "Ễ", "ễ", "Ế", "ế", "Ệ", "ệ", "Ỉ", "ỉ", "Ĩ", "ĩ", "Í",
				 "í", "Ị", "ị", "Ì", "ì", "Ỏ", "ỏ", "Ó", "ó", "Ọ", "ọ", "Ò", "ò", "Õ", "õ", "Ô", "ô", "Ồ", "ồ", "Ổ", "ổ",
				 "Ỗ", "ỗ", "Ố", "ố", "Ộ", "ộ", "Ơ", "ơ", "Ờ", "ờ", "Ở", "ở", "Ỡ", "ỡ", "Ớ", "ớ", "Ợ", "ợ", "Ù", "ù", "Ủ",
				 "ủ", "Ũ", "ũ", "Ú", "ú", "Ụ", "ụ", "Ư", "ư", "Ừ", "ừ", "Ử", "ử", "Ữ", "ữ", "Ứ", "ứ", "Ự", "ự", "Ỳ", "ỳ",
				 "Ỷ", "ỷ", "Ỹ", "ỹ", "Ỵ", "ỵ", "Ý", "ý"]
			],
			"examples":[
				[ // <= That's the group (you need to have at least one group)
					"x", //<= single symbol, inserted before (just as typing it)
					["x"], //<= single symbol, inserted before (shown as "x")
					["x", "y"], //<= x inserted before, y inserted after (shown as "x…y")
					["x", ""], //<= single symbol, inserted before (shown as "x…")
					["", "y"], //<= nothing inserted before, y inserted after (shown as "…y")
					[["x", "y"], "title"], //<= x inserted before, y inserted after, with link-title
					[["x", "y"], "title", "text"], //<= x inserted before, y inserted after, with link-title and description
					[["x", "y"], "", "text"], //<= x inserted before, y inserted after, with description (empty titles are ignored)
				],
				[ // <= another group (seperated by "•")
					[["‽"], "Interrobang"], [["⁂"],"Asterism"], [["〈","〉"],"Buchtitelzeichen (Chinesisch)"], [[""],""],
				],
			]
		};
		
		//only for debuging
		//$('.addTranslations').show();
		
		function addsymbols(){
			GM_log('addsymbols');
			if(!$(this).hasClass('symbol_insert_helper_active')){
				$(this).addClass('symbol_insert_helper_active');
			
				var addTranslations = $(this).find('.addTranslations');

				var translatelink = $(this).find('.translateLink a');
				//chrome needs this:
				//translatelink.click(function(){addTranslations.show();});
				
				var cancelbutton = $(this).find('input[type="button"][id$="cancel"]');
				cancelbutton.click(function(){addTranslations.hide();});
				
				var detector = addTranslations.find('select');
				var textarea = addTranslations.find('textarea');
				var important = addTranslations.find('.important');
				important.css({'font-size': '90%'});
				
				var superbox = $('<div></div>').css({'line-height': '1.8em'});
				superbox.css({'word-spacing': '0.2em'});
				
				var select = $('<select></select>').css({'margin-right':'0.5em'});
				var more = $('<option value="default">&hellip;</option>');
				select.append(more);
				select.css({'width':'5em', 'border': '1px solid #CCCCCC', 'border-radius': '3px', 'background-image': '-webkit-gradient( linear, left top, left bottom, color-stop(0, rgb(245,245,245)), color-stop(0.7, rgb(255,255,255)) )', 'background-image': '-moz-linear-gradient( center top, rgb(245,245,245) 0%, rgb(255,255,255) 70% )'});
				
				var langnameselect = addTranslations.find('select.translationLang');

				$.each(charinsert, function(index, value){
					var name = langnameselect.find('option[value="'+index+'"]').text();
					var option = $('<option value="'+index+'">'+(name ? name : index)+'</option>');
					select.append(option);
				});
				
				//$('select.translationLang').css({'border': '1px solid #CCCCCC', 'border-radius': '3px', 'background-image': '-webkit-gradient( linear, left bottom, left top, color-stop(0, #888888), color-stop(0.7, rgb(255,255,255)) )', 'background-image': '-moz-linear-gradient( center bottom, #888888 0%, rgb(255,255,255) 70% )'});
				
				//$('input[type="button"]').css({'border': '1px solid #CCCCCC', 'border-radius': '3px', 'background-image': '-webkit-gradient( linear, left bottom, left top, color-stop(0, #888888), color-stop(0.7, rgb(255,255,255)) )', 'background-image': '-moz-linear-gradient( center bottom, #888888 0%, rgb(255,255,255) 70% )'});
				
				var closebuttonlangs = $("<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABhSURBVCjPY/jPgB8y0FHBkb37/+/6v+X/+v8r/y/ei0XB3v+H4HDWfywKtgAl1oLhof8TsClYA5SAgEP/27EpWIxkQj02BbOQ3FCGTcGEdV3/W4B6K/+X/M9fNzAhSbYCAMiTH3pTNa+FAAAAAElFTkSuQmCC'/>").css({'vertical-align': 'text-bottom', 'margin-left':'0.2em', 'cursor':'pointer', 'float': 'none'});
				
				var closebutton = $("<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPzdAxDoAgEERRzsFp95JbGI2ASA2SCOX3Ahtr8tuXTDIO959bCxRfpOitWS5vA+lMJg9JbKCTTmMQ1QS3ThqVQbBBlsbgpXLYE8lHCXrqLptf9km7Dzv+FwGTaznIAAAAAElFTkSuQmCC'/>").css({'vertical-align': 'text-bottom', 'float': 'none'});
				
				var veryfirst = true;
				
				select.change(function(){
					var supergroupbox = $('<span class="supergroup"></span>').css({'border': '1px solid #CCCCCC', 'border-radius': '8px', 'padding-left': '0.5em', 'margin-left': '0.5em', 'background-image': '-webkit-gradient( linear, left top, left bottom, color-stop(0, rgb(245,245,245)), color-stop(0.7, rgb(255,255,255)) )', 'background-image': '-moz-linear-gradient( center top, rgb(245,245,245) 0%, rgb(255,255,255) 70% )'});
					var optval = $(this).find(':selected').val();

					insertlength = $(charinsert[optval]).length;
					$(charinsert[optval]).each(function(groupindex, group){
						groupbox = $('<span class="group"></span>');
						grouplength = $(group).length;
						$(group).each(function(symbolindex, symbol){
							var before = '';
							var after = '';
							var posstart = 0;
							var posend = 0;
							var ellipse = '';
							var text = '';
							var title = '';
							var special = '';
							var beforelink = false;
							var afterlink = false;
							var bothlink = false;
							var linkspan = $('<span></span>');

							
							if(typeof(symbol)=='string'){
								before = symbol;
								//text = symbol;
								beforelink = $('<a'+title+'>'+before+'</a>');
							}
							else{
								if(typeof(symbol[0])=='string'){
									before = symbol[0];
									after = (typeof(symbol[1])=='string' ? symbol[1] : '');
									ellipse = (typeof(symbol[1])=='string' ? '&hellip;' : '');

									//text = before+ellipse+after;
									//link = $('<a'+title+'>'+text+'</a>');
									beforelink = $('<a'+title+'>'+before+'</a>');
									bothlink = $('<a'+title+'>&hellip;</a>');
									afterlink = $('<a'+title+'>'+after+'</a>');
								}
								else {
									before = symbol[0][0];
									after = (typeof(symbol[0][1])=='string' ? symbol[0][1] : '');
									ellipse = (typeof(symbol[0][1])=='string' ? '&hellip;' : '');
									text = (typeof(symbol[2])=='string' ? symbol[2] : '');
									special = (typeof(symbol[3])=='string' ? symbol[3] : '');
									title = ( (typeof(symbol[1])=='string' && symbol[1]!="") ? ' title="'+symbol[1]+'"' : '');
									//link = $('<a'+title+'>'+text+'</a>');
									beforelink = $('<a'+title+'>'+before+'</a>');
									if(typeof(symbol[0][1])=='string'){
										bothlink = $('<a'+title+'>&hellip;</a>');
									}
									if(text!=""){
										bothlink = $('<a'+title+'>'+text+'</a>');
									}
									afterlink = $('<a'+title+'>'+after+'</a>');
								}
							}

							posstart = before.length;
							posend = before.length;
							if(beforelink && text==""){
								
									beforelink.click(function(e){
										if(e.ctrlKey) {
											bothlink.click();
										}
										else{
											value = textarea.val();
											start = textarea.getSelectionStart();
											end = textarea.getSelectionEnd();
											textarea.val( value.substr(0, start) + before + value.substr(start) )
											.setSelection(start+posstart, end+posend);
										}
									});
								
								linkspan.append(beforelink);
							}
							if(bothlink){
								if(special=="toUpperCase"){
									bothlink.click(function(e){
											value = textarea.val();
											start = textarea.getSelectionStart();
											end = textarea.getSelectionEnd();
											textarea.val( value.substr(0, start) + value.substr(start, end-start).toUpperCase() + value.substr(end) )
											.setSelection(start, end);
									});
								}
								else if(special=="toLowerCase"){
									bothlink.click(function(e){
											value = textarea.val();
											start = textarea.getSelectionStart();
											end = textarea.getSelectionEnd();
											textarea.val( value.substr(0, start) + value.substr(start, end-start).toLowerCase() + value.substr(end) )
											.setSelection(start, end);
									});
								}
								else if(special=="toTitleCase"){
									bothlink.click(function(e){
											value = textarea.val();
											start = textarea.getSelectionStart();
											end = textarea.getSelectionEnd();
											textarea.val( value.substr(0, start) + value.substr(start, 1).toUpperCase() + value.substr(start+1, end-start-1) + value.substr(end) )
											.setSelection(start, end);
									});
								}
								else if(special=="replace"){
									bothlink.click(function(e){
											value = textarea.val();
											start = textarea.getSelectionStart();
											end = textarea.getSelectionEnd();
											var replace = value.substr(start, end-start).replace(before, after);
											textarea.val( value.substr(0, start) + replace + value.substr(end) )
											.setSelection(start, end+replace.length-(end-start));
									});
								}
								else {
									bothlink.click(function(e){
											value = textarea.val();
											start = textarea.getSelectionStart();
											end = textarea.getSelectionEnd();
											textarea.val( value.substr(0, start) + before + value.substr(start, end-start) + after + value.substr(end) )
											.setSelection(start+posstart, end+posend);
									});
								}
								linkspan.append(bothlink);
							}
							if(afterlink && text==""){
								afterlink.click(function(e){
									if(e.ctrlKey) {
										bothlink.click();
									}
									else{
										value = textarea.val();
										start = textarea.getSelectionStart();
										end = textarea.getSelectionEnd();
										textarea.val( value.substr(0, start) + value.substr(start, end-start) + after + value.substr(end) )
										.setSelection(start, end);
									}
								});
								linkspan.append(afterlink);
							}
							groupbox.append(linkspan);
							
							if(symbolindex+1<grouplength){
								groupbox.append(' ');
							} else if(groupindex+1<insertlength)
							{
								groupbox.append(closebutton.clone());
							}
						});
						supergroupbox.append(groupbox);
						superbox.append(supergroupbox);
						select.find('option[value="default"]').attr('selected', 'selected');
						select.find('option[value="'+optval+'"]').hide();
					});
					var name = langnameselect.find('option[value="'+optval+'"]').text();
					supergroupbox.append(closebuttonlangs.clone().attr('title', (name!="" ? name : optval)).click(function(){
						select.find('option[value="'+optval+'"]').show();supergroupbox.hide('slow').remove();
						if(setup){
							keysets = (typeof(keysets)=='string' ? keysets : keysets.join(','));
							keysets = (keysets+'').replace(optval, '');
							keysets = (keysets+'').replace(/,+/g, ',').replace(/^,/g, '').split(',').unique().join(',');
							
							GM_setValue('keysets',keysets);
							GM_log('keysets: '+keysets);
							$('#keysets').val(keysets);
						}
					}));
					if(setup){
						keysets = (typeof(keysets)=='string' ? keysets : keysets.join(','));
						keysets += ','+optval;
						keysets = (keysets+'').replace(/,+/g, ',').replace(/^,/g, '').split(',').unique().join(',');
						
						GM_setValue('keysets',keysets);
						GM_log('keysets: '+keysets);
						$('#keysets').val(keysets);
					}
				});
				superbox.append(select);
				
				//add all keysets defined by the user
				$(keysets).each(function(langindex, lang){
					if(charinsert[lang])
					{
						select.find(':selected').removeAttr('selected');
						select.find('option[value="'+lang+'"]').attr('selected', 'selected');
						select.change();
					}
				});
				
				//add the keyset for the lang of the interface (selected in the top right corner)
				//but only if the user specified so via "facekey" true
				if(facekey && !setup){
					select.find(':selected').removeAttr('selected');
					select.find('option[value="'+facelang+'"]').attr('selected', 'selected');
					select.change();
				}
				
				//add the keyset for the lang that the user selected as the sentences' language instead of "automatic recognition"
				//but only if the user specified so via "autokey" true
				if(autokey){
					langnameselect.change(function(){
						var lang = $(this).find(':selected').val();
						if(charinsert[lang])
						{
							select.find(':selected').removeAttr('selected');
							select.find('option[value="'+lang+'"]').attr('selected', 'selected');
							select.change();
						}
					});
				}
				
				important.before(superbox);
			}
		}
		
		//$('.sentences_set').live("mouseover", addsymbols);
		$('.sentences_set').each(addsymbols);
		$('a#showRandom').after($('<a title="Tatoeba Symbol Insert Helper"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIMSURBVDjLY/j//z8DJZiBZgY4tN9wcO6+0erZd2uKc+fNfoeWGxMcW27Msiq+3GWUdIZXL/okI14D7JqvB+csf3Rv4p6X//t3Pf/fvf35/8Ilj3471V3bph9zmougC6xrr8mETbu7q3jl40/FKx5+LVzy8Ltd+eUZBvGnOYjygk3llfKCZY++u3fcWutcd21B07on/61yz88kKgwsCi8qJc++9yhu2p37ppnnQ4C4oWblo/9WOReXEjTANOsCs1PD9VVZ8+9/N0k7m6Yfe5LLOPFMR+Wyh/9dqq5eUvc6xIbXALOs8zEZc+9/C+q+ddEw/rSfXuRxLfP0swuqgAYEt934pOq2nxenAUbJZ0TjJt9+Vbn80X+v5huXrbLOb7LMOLfVterqjYp5C/7nTo7/n9bn/z+yxeGTZ4VeDYoBBrGnGe1LLs8G+dU87QxKYIXUNt9oXJ34f8uVqf8vPNv1v3931v/wft3/5tmSPWAF+jGnuIDR41K65OH/iJ5bb3SCjtnCNKu47heOaXP7vfHyhP8br036DwI9e1L/9+9JBxnwHRLqGefWxfbf+pcw4fb/gObrb7UDjvQqO+0VULLfo6Xte3iRT7Xh/21X5vxHBpsuTQUZQFx6t8yR/t69K+l/+64EsOb2nQmoLiCEgQpbgns0/vfuSgHbDKJBfHgYEGlIBxB/AjkbSneAxAHhJKUiPzK8ogAAAABJRU5ErkJggg==" alt="Tatoeba Symbol Insert Helper"/></a>').css({'vertical-align': 'sub'}).click(function(){$('.random_sentences_set .sentences_set').each(addsymbols);}));
	}
}
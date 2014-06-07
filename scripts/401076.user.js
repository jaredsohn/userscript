// ==UserScript==
// @name        MorseCode
// @namespace   angelforest
// @include     http://dobrochan.com/b/res/2688610.xhtml*
// @grant       unsafeWindow
// ==/UserScript==

//reply-replyText
//replyText
//fieldtable

$ = unsafeWindow.jQuery;
original_GetReplyForm = unsafeWindow.GetReplyForm;
morse_button_loaded = false;

morse_code = {"А": ".-",
              "Б": "-...",
			  "В": ".--",
			  "Г": "--.",
			  "Д": "-..",
			  "Е": ".",
			  "Ё": ".",
			  "Ж": "...-",
			  "З": "--..",
			  "И": "..",
			  "Й": ".---",
			  "К": "-.-",
			  "Л": ".-..",
			  "М": "--",
			  "Н": "-.",
			  "О": "---",
			  "П": ".--.",
			  "Р": ".-.",
			  "С": "...",
			  "Т": "-",
			  "У": "..-",
			  "Ф": "..-.",
			  "Х": "....",
			  "Ц": "-.-.",
			  "Ч": "---.",
			  "Ш": "----",
			  "Щ": "--.-",
			  "Ъ": "--.--",
			  "Ы": "-.--",
			  "Ь": "-..-",
			  "Э": "..-..",
			  "Ю": "..--",
			  "Я": ".-.-",
			  "1": ".----",
			  "2": "..---",
			  "3": "...--",
			  "4": "....-",
			  "5": ".....",
			  "6": "-....",
			  "7": "--...",
			  "8": "---..",
			  "9": "----.",
			  "0": "-----",
			  ".": "......",
			  ",": ".-.-.-",
			  ":": "---...",
			  ";": "-.-.-.",
			  "?": "..--..",
			  "!": "--..--",
			  " ": "-...-",
			  "\n": "-...-",
			  "-": "-....-",
			  "Конец связи": "..-.-"
			  };
			  
morse_code_rev = {".-.-.-": ",",
				"......": ".",
				"-----": "0",
				"..---": "2",
				"....-": "4",
				"-....": "6",
				"---..": "8",
				"---...": ":",
				"-...": "Б",
				"--.": "Г",
				".": "Е",
				"--..": "З",
				".---": "Й",
				".-..": "Л",
				"-.": "Н",
				".--.": "П",
				"...": "С",
				"..-": "У",
				"....": "Х",
				"---.": "Ч",
				"--.-": "Щ",
				"-.--": "Ы",
				"..-..": "Э",
				".-.-": "Я",
				"--..--": "!",
				".----": "1",
				"...--": "3",
				".....": "5",
				"--...": "7",
				"----.": "9",
				"-.-.-.": ";",
				"..--..": "?",
				".-": "А",
				".--": "В",
				"-..": "Д",
				"...-": "Ж",
				"..": "И",
				"-.-": "К",
				"--": "М",
				"---": "О",
				".-.": "Р",
				"-": "Т",
				"..-.": "Ф",
				"-.-.": "Ц",
				"----": "Ш",
				"--.--": "Ъ",
				"-..-": "Ь",
				"..--": "Ю",
				"-...-": " ",
				"-....-": "-",
				"..-.-": "Конец связи"
			  };
			  

unsafeWindow.GetReplyForm = function(click, board, tid, pid) {
	original_GetReplyForm(click, board, tid, pid);
	
	if(!morse_button_loaded) {
		table = $('#fieldtable > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > table:nth-child(1)');
		if(table.length < 1)
			return;
		table.append('<tr><td>' +
					 '<button type="button" onclick="TextToMorse();">Шифровать</button>' +
					 '<button type="button" onclick="MorseToText();">Дешифровать</button>' +
					 '</td></tr>');
		morse_button_loaded = true;
	}
}

function get_code(ch) {
	if(ch in morse_code)
		return morse_code[ch];
	return '';
}

function get_letter(code) {
	if(code in morse_code_rev)
		return morse_code_rev[code];
	return '';
}

unsafeWindow.TextToMorse = function() {
	in_text = $('#reply-replyText').prop('value').toUpperCase();
	out_text = '';
	for(var i in in_text) {
		out_text += get_code(in_text[i]) + ' ';
	}
	$('#reply-replyText').prop('value', out_text)
}

unsafeWindow.MorseToText = function() {
	in_array = $('#reply-replyText').prop('value').split(' ');
	out_text = '';
	for(var i in in_array) {
		out_text += get_letter(in_array[i]);
	}
	
	$('#reply-replyText').prop('value', out_text)
}








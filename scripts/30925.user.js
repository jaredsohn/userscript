// ==UserScript==
// @name           Google Language Code Changer
// @namespace      http://brainroom.ae35.de
// @description    Add a select-box for the hl parameter on google result pages.
// @version        1.9
// @copyright      2010+, kleingeist (http://github.com/kleingeist/userscripts)
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http*://*.google.tld/search?*
// @include        http*://*.google.tld/#*q=*
// @include        http*://*.google.tld/
// @include        http*://*.google.tld/webhp*
// @include        http*://*.google.tld/images?*
// @include        http*://*.google.tld/imghp*
// @exclude        http*://*.google.tld/s?*
// ==/UserScript==

// Initial list
var list = [];

// Check if Greasemonkey specific functions are available (for Cross-Browser support)
var GM_functions = !((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined));
if (GM_functions) {
	list = GM_getValue("selectedLangs", "").split(" ");
}


// If we are on a NOT on a start page and the ajax isn't enabled, we can insert the selector instantly...
if (!(window.location.hash.match(/q\=/) || window.location.pathname == '/' || window.location.pathname == '/webhp' || window.location.pathname == '/imghp')) {
	insertSelector(list);
}

//... but to be on the safe site we always add the listener
document.addEventListener('DOMAttrModified', DOMAttrModifiedListener, true);

function DOMAttrModifiedListener(e) {
	// thanks to http://www.amirharel.com/2009/07/19/manipulating-google-results-ajax-version/ for the #foot hint
	if (e.target.id == 'foot' && !document.getElementById('glccHl')) {
		insertSelector(list);
	}
}

	
if (GM_functions) {
	GM_registerMenuCommand('Select Language Codes', function() { 
		GM_setValue('selectedLangs'
			, window.prompt('Languages shown in the selection (ex. de for german see http://sites.google.com/site/tomihasa/google-language-codes for full list)'
				  , GM_getValue('selectedLangs', "")
			)
		);
	}, '', 's');
}

function insertSelector(list) {	

	// Thanks to http://sites.google.com/site/tomihasa/google-language-codes for the list
	var codes = 
	['af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bh', 'xx-bork', 'bs',
	'br', 'bg', 'km', 'ca', 'zh-CN', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 
	'xx-elmer', 'en', 'eo', 'et', 'fo', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 
	'el', 'gn', 'gu', 'xx-hacker', 'ha', 'iw', 'hi', 'hu', 'is', 'id', 'ia', 'ga', 
	'it', 'ja', 'jw', 'kn', 'kk', 'rw', 'rn', 'xx-klingon', 'ko', 'ku', 'ky', 
	'lo', 'la', 'lv', 'ln', 'lt', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mo', 
	'mn', 'sr-ME', 'ne', 'no', 'nn', 'oc', 'or', 'om', 'ps', 'fa', 'xx-pirate', 
	'pl', 'pt-BR', 'pt-PT', 'pa', 'qu', 'ro', 'rm', 'ru', 'gd', 'sr', 'sh', 'st', 
	'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 
	'te', 'th', 'ti', 'to', 'tr', 'tk', 'tw', 'ug', 'uk', 'ur', 'uz', 'vi', 'cy', 
	'xh', 'yi', 'yo', 'zu'];
	
	var names =
	['Afrikaans', 'Albanian', 'Amharic', 'Arabic', 'Armenian', 'Azerbaijani', 
	'Basque', 'Belarusian', 'Bengali', 'Bihari', 'Bork, bork, bork!', 'Bosnian', 
	'Breton', 'Bulgarian', 'Cambodian', 'Catalan', 'Chinese (Simplified)', 
	'Chinese (Traditional)', 'Corsican', 'Croatian', 'Czech', 'Danish', 'Dutch', 
	'Elmer Fudd', 'English', 'Esperanto', 'Estonian', 'Faroese', 'Filipino', 
	'Finnish', 'French', 'Frisian', 'Galician', 'Georgian', 'German', 'Greek', 
	'Guarani', 'Gujarati', 'Hacker', 'Hausa', 'Hebrew', 'Hindi', 'Hungarian', 
	'Icelandic', 'Indonesian', 'Interlingua', 'Irish', 'Italian', 'Japanese', 
	'Javanese', 'Kannada', 'Kazakh', 'Kinyarwanda', 'Kirundi', 'Klingon', 'Korean', 
	'Kurdish', 'Kyrgyz', 'Laothian', 'Latin', 'Latvian', 'Lingala', 'Lithuanian', 
	'Macedonian', 'Malagasy', 'Malay', 'Malayalam', 'Maltese', 'Maori', 'Marathi', 
	'Moldavian', 'Mongolian', 'Montenegrin', 'Nepali', 'Norwegian', 
	'Norwegian (Nynorsk)', 'Occitan', 'Oriya', 'Oromo', 'Pashto', 'Persian', 
	'Pirate', 'Polish', 'Portuguese (Brazil)', 'Portuguese (Portugal)', 'Punjabi', 
	'Quechua', 'Romanian', 'Romansh', 'Russian', 'Scots Gaelic', 'Serbian', 
	'Serbo-Croatian', 'Sesotho', 'Shona', 'Sindhi', 'Sinhalese', 'Slovak', 
	'Slovenian', 'Somali', 'Spanish', 'Sundanese', 'Swahili', 'Swedish', 'Tajik', 
	'Tamil', 'Tatar', 'Telugu', 'Thai', 'Tigrinya', 'Tonga', 'Turkish', 'Turkmen', 
	'Twi', 'Uighur', 'Ukrainian', 'Urdu', 'Uzbek', 'Vietnamese', 'Welsh', 'Xhosa', 
	'Yiddish', 'Yoruba', 'Zulu']

	if (!list || !list.length || list.length == 0 || (list.length == 1 && list[0] == "")) {
		list = codes;
	}

	var hl = document.getElementsByName('hl');
	var current = list[0]; // default
	if (hl.length > 0) {
		current = hl[0].value;
	}
	
	function generateOption(k) {
		var index = codes.indexOf(k);
		return '<option value="' + k + '"' + ((k == current)? ' selected="selected"' : '') + '>' + ((index == -1) ? k : names[index]) + '</option>';
	};
	
	var container = document.createElement('span');
	container.style.lineHeight = "30px";
	
	var sel = document.createElement('select');
	sel.setAttribute('id','glccHl');
	sel.style.margin = "0 2px";
	sel.innerHTML = list.map(generateOption).join("\n");
	container.appendChild(sel);
	
	var button = document.getElementsByName('btnG')[0];
	button.parentNode.style.whiteSpace = "nowrap";
	button.parentNode.appendChild(container);
	
	sel.addEventListener("change", function (event) {
		document.getElementsByName('hl')[0].value = this.options[this.selectedIndex].value;
		document.getElementsByName('btnG')[0].click();
	}, true);
}

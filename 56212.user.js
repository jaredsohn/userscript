// ==UserScript==
// @name           Highlight2Translate 2.0
// @namespace      google
// @include        *
// @author	   Originally created by Fredar, Later Modifications by Endy
// ==/UserScript==

// Mod Notes: No longer attempts to translate in the same language as its set for
// doesn't attempt to translate " ", and minor beautification done.

//languageAfterTranslationSet shows the list of languages after translation

var languageAfterTranslationSet = {
  'AFRIKAANS' : 'af',
  'ALBANIAN' : 'sq',
  'AMHARIC' : 'am',
  'ARABIC' : 'ar',
  'ARMENIAN' : 'hy',
  'AZERBAIJANI' : 'az',
  'BASQUE' : 'eu',
  'BELARUSIAN' : 'be',
  'BENGALI' : 'bn',
  'BIHARI' : 'bh',
  'BULGARIAN' : 'bg',
  'BURMESE' : 'my',
  'CATALAN' : 'ca',
  'CHEROKEE' : 'chr',
  'CHINESE' : 'zh',
  'CHINESE_SIMPLIFIED' : 'zh-CN',
  'CHINESE_TRADITIONAL' : 'zh-TW',
  'CROATIAN' : 'hr',
  'CZECH' : 'cs',
  'DANISH' : 'da',
  'DHIVEHI' : 'dv',
  'DUTCH': 'nl',  
  'ENGLISH' : 'en',
  'ESPERANTO' : 'eo',
  'ESTONIAN' : 'et',
  'FILIPINO' : 'tl',
  'FINNISH' : 'fi',
  'FRENCH' : 'fr',
  'GALICIAN' : 'gl',
  'GEORGIAN' : 'ka',
  'GERMAN' : 'de',
  'GREEK' : 'el',
  'GUARANI' : 'gn',
  'GUJARATI' : 'gu',
  'HEBREW' : 'iw',
  'HINDI' : 'hi',
  'HUNGARIAN' : 'hu',
  'ICELANDIC' : 'is',
  'INDONESIAN' : 'id',
  'INUKTITUT' : 'iu',
  'ITALIAN' : 'it',
  'JAPANESE' : 'ja',
  'KANNADA' : 'kn',
  'KAZAKH' : 'kk',
  'KHMER' : 'km',
  'KOREAN' : 'ko',
  'KURDISH': 'ku',
  'KYRGYZ': 'ky',
  'LAOTHIAN': 'lo',
  'LATVIAN' : 'lv',
  'LITHUANIAN' : 'lt',
  'MACEDONIAN' : 'mk',
  'MALAY' : 'ms',
  'MALAYALAM' : 'ml',
  'MALTESE' : 'mt',
  'MARATHI' : 'mr',
  'MONGOLIAN' : 'mn',
  'NEPALI' : 'ne',
  'NORWEGIAN' : 'no',
  'ORIYA' : 'or',
  'PASHTO' : 'ps',
  'PERSIAN' : 'fa',
  'POLISH' : 'pl',
  'PORTUGUESE' : 'pt-PT',
  'PUNJABI' : 'pa',
  'ROMANIAN' : 'ro',
  'RUSSIAN' : 'ru',
  'SANSKRIT' : 'sa',
  'SERBIAN' : 'sr',
  'SINDHI' : 'sd',
  'SINHALESE' : 'si',
  'SLOVAK' : 'sk',
  'SLOVENIAN' : 'sl',
  'SPANISH' : 'es',
  'SWAHILI' : 'sw',
  'SWEDISH' : 'sv',
  'TAJIK' : 'tg',
  'TAMIL' : 'ta',
  'TAGALOG' : 'tl',
  'TELUGU' : 'te',
  'THAI' : 'th',
  'TIBETAN' : 'bo',
  'TURKISH' : 'tr',
  'UKRAINIAN' : 'uk',
  'URDU' : 'ur',
  'UZBEK' : 'uz',
  'UIGHUR' : 'ug',
  'VIETNAMESE' : 'vi',
  'UNKNOWN' : ''
};


//you can edit the languageAfterTranslation variable to customize the language after translation
//default is 'ENGLISH'
languageAfterTranslation=languageAfterTranslationSet['ENGLISH']




//create the hidden translation box adn set its style
window.div=document.createElement("div")
var divStyle="position:absolute;display:none; opacity: .75; filter: alpha(opacity=75);z-index:1000;border-left:solid 0.5px #3c8fa7;border-top:solid 1px #3c8fa7;border-right:solid 1.5px #3c8fa7;border-bottom:solid 1px #3c8fa7;background-color:white;padding-left:5px;padding: 1pt 3pt 1pt 3pt;font-size: 10pt;color: #000000;"
window.div.setAttribute("style",divStyle)
document.body.appendChild(window.div);

//when the google scripts are loaded, add a mouseup event to the page
function languageLoaded() {
	window.addEventListener("mouseup",window.mouseUp,false)
	}

//the mouseup event get the highlighted text and pass the text to window.detectLanguage function
window.mouseUp=function (event){
						window.event=event
						if (window.event.target==window.div)
						return
						window.div.style.display="none"
						window.text=window.getSelection();
						if (window.text=="")
							return;
						if (window.text==" ")
							return;
						unsafeWindow.google.language.detect(window.text,window.detectLanguage)
					}
					

//detect the language of the hightlighted text and translate it
window.detectLanguage=function(result) {
						if (result.language==languageAfterTranslation)
							return;

							window.text = window.text.toString()
							unsafeWindow.google.language.translate(window.text,result.language,languageAfterTranslation.toString(),translateResult)
							}
							
//if translation exists, display the translation box with the translation
window.translateResult=function(result){
							if (result.translation)
							{
							window.div.innerHTML=result.translation;
							//you can customize the horizontal position of the translation box by changing "10" to other numbers
							window.div.style.left=(window.event.clientX+window.scrollX+10).toString()+"px"
							//you can customize the vertical position of the translation box by changing "10" to other numbers
							window.div.style.top=(window.event.clientY+window.scrollY+10).toString()+"px"
							window.div.style.display="inline"
							}
						}

//include the google ajax language api script
unsafeWindow.doneLoadingJSAPI = function() { unsafeWindow.google.load('language','1', {"callback" : languageLoaded}); }
var script = document.createElement('script'); script.src = 'https://www.google.com/jsapi?callback=doneLoadingJSAPI'; script.type = "text/javascript"; document.getElementsByTagName('head')[0].appendChild(script); 










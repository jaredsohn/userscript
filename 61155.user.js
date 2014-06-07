// ==UserScript==
// @name           Traductor Plus 3.0
// @namespace      Juampi_Mix
// @description    Traduce una seleccion de texto, usando el motor de traduccion de Google, esta configurado para traducir todo al EspaÃ±ol
// @include        *
// @author	   Basado sobre Highlight2Translate 2.0, Creado originalmente por Fredar, Traducido y modificado pro Juampi_Mix
// @url            http://userscripts.org/scripts/show/58197
// @require http://userscripts.org/scripts/source/60792.user.js
// @version 3.00
// ==/UserScript==

//languageAfterTranslationSet muestra la lista de idiomas despuÃ©s de la traducciÃ³n

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


//Usted puede editar languageAfterTranslation y cambiarlo por su idioma local
//Por defecto es 'Spanish'
languageAfterTranslation=languageAfterTranslationSet['SPANISH']




//Crear el cuadro de traduccion, y establecer el estilo 
window.div=document.createElement("div")
var divStyle="position:absolute;display:none; opacity: .75; filter: alpha(opacity=75);z-index:1000;border-left:solid 0.5px #3c8fa7;border-top:solid 1px #3c8fa7;border-right:solid 1.5px #3c8fa7;border-bottom:solid 1px #3c8fa7;background-color:black;padding-left:5px;padding: 1pt 3pt 1pt 3pt;font-size: 10pt;color: #FFFFFF;"
window.div.setAttribute("style",divStyle)
document.body.appendChild(window.div);

//Una vez cargado los script de google, agregar el evento mouseup a la pagina
function languageLoaded() {
	window.addEventListener("mouseup",window.mouseUp,false)
	}

//El evento mouseup obtiene el texto resaltado y lo pasa por la funcion window.detectLanguage 
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
					

//detectar el idioma del texto subrayado y traducirlo
window.detectLanguage=function(result) {
						if (result.language==languageAfterTranslation)
							return;

							window.text = window.text.toString()
							unsafeWindow.google.language.translate(window.text,result.language,languageAfterTranslation.toString(),translateResult)
							}
							
//una vez traducido el texto, mostrarlo en un cuadro
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

//incluyeir el script de traduccion de google AJAX API 
unsafeWindow.doneLoadingJSAPI = function() { unsafeWindow.google.load('language','1', {"callback" : languageLoaded}); }
var script = document.createElement('script'); script.src = 'http://www.google.com/jsapi?callback=doneLoadingJSAPI'; script.type = "text/javascript"; document.getElementsByTagName('head')[0].appendChild(script); 








autoUpdate (58197, "3.00");

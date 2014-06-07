// ==UserScript==
// @name          Google Preferences Without Cookies
// @version       1.1
// @date          2009-12-12
// @description   Allows setting some Google preferences without having cookies enabled.
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @copyright     Copyright 2009 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @require       http://usocheckup.dune.net/64112.js?maxage=3
// @include       http*://*.google.tld/*
// ==/UserScript==

/*
Interface Language (hl)
default: probably depends on the domain
2-letter code, ex: en

Search language (lr)
default: all languages (english); local language (other domains)
multiple languages possible (ex: lang_en|lang_eo|lang_fr)

Safesearch (safe)
off
images (default)
active

Number of results per page (num)
default: 10 (google says this provides the fastest results)
Any number 1-100
*/

var interfaceLanguage = GM_getValue('google.hl', '');
var searchLanguage    = GM_getValue('google.lr', '');
var safeSearch        = GM_getValue('google.safe', 'images');
var numberOfResults   = GM_getValue('google.num', 10);

if (top.location == location) { // get rid of google's stupid facebook-like ajax magic search query loading stuff that breaks the script really badly
   // (somehow managing to make firefox load itself inside itself, if you want to know)
   // this code and the following function are basically taken from my other script, Facebook URL Cleaner v6 (http://userscripts.org/scripts/show/29910)
   var reg = /^(https?:\/\/([a-z]+\.)*google((\.[a-z]{1,3}){1,2})\/)[^#]*#((.*&)?q=.+)/i;
   document.addEventListener('DOMNodeInserted', checkURL, true);
}

function checkURL() {
   if (reg.test(location.href)) {
      document.removeEventListener('DOMNodeInserted', checkURL, true); // we need to remove the event listener or we might cause an infinite loop
      var newURL = location.href.replace(reg, '$1search?$5');
      newURL = newURL.replace(/&fp=[^&]*/i, ''); // remove fp also, otherwise the new page will be blank
      location.replace(newURL);
   }
}

// if on a search page
if (/[?#](.*&)?q=/i.test(location.href)) {
   var queryString = location.href.substring(location.href.indexOf('?'));
   var origQueryString = queryString;
   // change the query string if necessary
   // if hl (interface language) is specified, change it because it is only specified from the preferences
   // (or set by virtue of the domain name, e.g. google.fr) - not specified by advanced search.
   if (interfaceLanguage) {
      var hlSetRight = new RegExp('[?&]hl='+interfaceLanguage);
      if (!hlSetRight.test(queryString)) {
         // remove hl (if it exists) and add it back with the right value
         queryString = queryString.replace(/(.*?)[?&]hl=[^&]*(.*)/,'$1$2');
         queryString += '&hl=' + interfaceLanguage;
      }
   }
   if (searchLanguage) {
      var lrSetRight = new RegExp('[?&]lr='+searchLanguage);
      if (!lrSetRight.test(queryString)) { // include case where lr equals nothing (i.e., Google's own default)
         queryString = queryString.replace(/(.*?)[?&]lr=[^&]*(.*)/,'$1$2');
         queryString += '&lr=' + searchLanguage;
      }
   }
   if (!/[?&]safe=/.test(queryString)) {
      queryString += '&safe=' + safeSearch;
   }
   // including num in the URL messes with OptimizeGoogle's results streaming, so don't include it unless it's necessary
   if (!/[?&]num=/.test(queryString) && numberOfResults != 10) {
      queryString += '&num=' + numberOfResults;
   }
   // see if anything changed
   if (origQueryString != queryString) {
      //alert(queryString);
      if (queryString.indexOf('?') != 0) {
         queryString = '?' + queryString; // add back the leading question mark if we accidentally got rid of it (man, this is messy)
      }
      location.replace(location.href.substring(0, location.href.indexOf('?')) + queryString);
   }
}

// if on preferences page, set preferences
if (location.href.indexOf('/preferences') > 0) {
   // set title and blank out body
   document.getElementsByTagName('head')[0].innerHTML = '<title>Google Preferences Without Cookies</title>';
   GM_addStyle('\
   body {background: #ffffff; margin: 0; padding: 20px 150px 10px 150px; font-family: arial, sans-serif; font-size: 10pt; color: #000000}\
   h1 {font-weight: bold; font-size: 14pt; background: #e5ecf9; border-top: 1px solid #3366cc; margin: 0 0 10px 0; padding: 2px 5px}\
   fieldset {margin: 10px 0; padding: 5px; border: 3px solid #e5ecf9}\
   legend {font-weight: bold}\
   table {font-size: 10pt; margin: 0 20px 8px 20px; padding: 0}\
   td {margin: 0; padding: 0 10px 0 0}\
   p {margin: 8px; padding: 0}\
   p#scriptLinkParagraph {font-size: 8pt; text-align: center}\
   input {margin: 0; padding: 0}\
   a:link {color: #0000cc}\
   a:visited {color: #551a8b}\
   a:active {color: #ff0000}\
   ');
   document.getElementsByTagName('body')[0].innerHTML = '';
   var pageBody = '<h1>Google Preferences Without Cookies</h1>';
   
   // interface language
   pageBody += '<fieldset><legend>Interface Language</legend>';
   var interfaceLanguages = {
      "": "Default (varies by domain)",
      "af": "Afrikaans",
      "ak": "Akan",
      "sq": "Albanian",
      "am": "Amharic",
      "ar": "Arabic",
      "hy": "Armenian",
      "az": "Azerbaijani",
      "eu": "Basque",
      "be": "Belarusian",
      "bn": "Bengali",
      "bh": "Bihari",
      "xx-bork": "Bork, bork, bork!",
      "bs": "Bosnian",
      "br": "Breton",
      "bg": "Bulgarian",
      "km": "Cambodian",
      "ca": "Catalan",
      "zh-CN": "Chinese (Simplified)",
      "zh-TW": "Chinese (Traditional)",
      "co": "Corsican",
      "hr": "Croatian",
      "cs": "Czech",
      "da": "Danish",
      "nl": "Dutch",
      "xx-elmer": "Elmer Fudd",
      "en": "English",
      "eo": "Esperanto",
      "et": "Estonian",
      "fo": "Faroese",
      "tl": "Filipino",
      "fi": "Finnish",
      "fr": "French",
      "fy": "Frisian",
      "gl": "Galician",
      "ka": "Georgian",
      "de": "German",
      "el": "Greek",
      "gn": "Guarani",
      "gu": "Gujarati",
      "xx-hacker": "Hacker",
      "ha": "Hausa",
      "haw": "Hawaiian",
      "iw": "Hebrew",
      "hi": "Hindi",
      "hu": "Hungarian",
      "is": "Icelandic",
      "ig": "Igbo",
      "id": "Indonesian",
      "ia": "Interlingua",
      "ga": "Irish",
      "it": "Italian",
      "ja": "Japanese",
      "jw": "Javanese",
      "kn": "Kannada",
      "kk": "Kazakh",
      "rw": "Kinyarwanda",
      "rn": "Kirundi",
      "xx-klingon": "Klingon",
      "ko": "Korean",
      "ku": "Kurdish",
      "ky": "Kyrgyz",
      "lo": "Laothian",
      "la": "Latin",
      "lv": "Latvian",
      "ln": "Lingala",
      "lt": "Lithuanian",
      "lg": "Luganda",
      "mk": "Macedonian",
      "mg": "Malagasy",
      "ms": "Malay",
      "ml": "Malayalam",
      "mt": "Maltese",
      "mi": "Maori",
      "mr": "Marathi",
      "mfe": "Mauritian Creole",
      "mo": "Moldavian",
      "mn": "Mongolian",
      "sr-ME": "Montenegrin",
      "ne": "Nepali",
      "no": "Norwegian",
      "nn": "Norwegian (Nynorsk)",
      "oc": "Occitan",
      "or": "Oriya",
      "om": "Oromo",
      "ps": "Pashto",
      "fa": "Persian",
      "xx-pirate": "Pirate",
      "pl": "Polish",
      "pt-BR": "Portuguese (Brazil)",
      "pt-PT": "Portuguese (Portugal)",
      "pa": "Punjabi",
      "qu": "Quechua",
      "ro": "Romanian",
      "rm": "Romansh",
      "ru": "Russian",
      "gd": "Scots Gaelic",
      "sr": "Serbian",
      "sh": "Serbo-Croatian",
      "st": "Sesotho",
      "sn": "Shona",
      "sd": "Sindhi",
      "si": "Sinhalese",
      "sk": "Slovak",
      "sl": "Slovenian",
      "so": "Somali",
      "es": "Spanish",
      "su": "Sundanese",
      "sw": "Swahili",
      "sv": "Swedish",
      "tg": "Tajik",
      "ta": "Tamil",
      "tt": "Tatar",
      "te": "Telugu",
      "th": "Thai",
      "ti": "Tigrinya",
      "to": "Tonga",
      "tr": "Turkish",
      "tk": "Turkmen",
      "tw": "Twi",
      "ug": "Uighur",
      "uk": "Ukrainian",
      "ur": "Urdu",
      "uz": "Uzbek",
      "vi": "Vietnamese",
      "cy": "Welsh",
      "xh": "Xhosa",
      "yi": "Yiddish",
      "yo": "Yoruba",
      "zu": "Zulu"
   }
   pageBody += '<p><label>Display Google tips and messages in: <select id="GPWOC_hl">';
   for (var i in interfaceLanguages) {
	   pageBody += '<option value="' + i + '"' + ((interfaceLanguage==i)?' selected="selected"':'') + '>' + interfaceLanguages[i] + '</option>';
   }
   pageBody += '</select></label></p></fieldset>';
   
   // search language
   pageBody += '<fieldset><legend>Search Languages</legend>';
   pageBody += '<p><input type="radio" name="GPWOC_search" id="GPWOC_searchAll"';
   pageBody += (searchLanguage) ? '' : ' checked="checked"';
   pageBody += ' /> Search for pages written in any language (default)</p><p><input type="radio" name="GPWOC_search" id="GPWOC_searchSome"';
   pageBody += (searchLanguage) ? ' checked="checked"' : '';
   pageBody += ' /> Prefer pages written in these language(s):</p>';
   var searchLanguages = {
      "af": "Afrikaans",
      "ar": "Arabic",
      "hy": "Armenian",
      "be": "Belarusian",
      "bg": "Bulgarian",
      "ca": "Catalan",
      "zh-CN": "Chinese (Simplified)",
      "zh-TW": "Chinese (Traditional)",
      "hr": "Croatian",
      "cs": "Czech",
      "da": "Danish",
      "nl": "Dutch",
      "en": "English",
      "eo": "Esperanto",
      "et": "Estonian",
      "tl": "Filipino",
      "fi": "Finnish",
      "fr": "French",
      "de": "German",
      "el": "Greek",
      "iw": "Hebrew",
      "hu": "Hungarian",
      "is": "Icelandic",
      "id": "Indonesian",
      "it": "Italian",
      "ja": "Japanese",
      "ko": "Korean",
      "lv": "Latvian",
      "lt": "Lithuanian",
      "no": "Norwegian",
      "fa": "Persian",
      "pl": "Polish",
      "pt": "Portuguese",
      "ro": "Romanian",
      "ru": "Russian",
      "sr": "Serbian",
      "sk": "Slovak",
      "sl": "Slovenian",
      "es": "Spanish",
      "sw": "Swahili",
      "sv": "Swedish",
      "th": "Thai",
      "tr": "Turkish",
      "uk": "Ukrainian",
      "vi": "Vietnamese"
   }
   var searchLanguagesLength = 0;
   for (var i in searchLanguages) {
      searchLanguagesLength++;
   }
   var colHeight = Math.ceil(searchLanguagesLength / 4);
   var searchLangCount = 0;
   var searchLangColCount = 0;
   pageBody += '<table><tr><td valign="top">';
   for (var i in searchLanguages) {
      searchLangCount++;
      searchLangColCount++;
	   pageBody += '<label><input type="checkbox" id="GPWOC_lr' + searchLangCount + '" value="lang_' + i + '"' + ((searchLanguage.indexOf("lang_"+i)>=0)?' checked="checked"':'') + '/> ' + searchLanguages[i] + '</label><br />';
	   if (searchLangColCount == colHeight) {
	      pageBody += '</td><td valign="top">';
	      searchLangColCount = 0;
	   }
   }
   pageBody += '</td></tr></table></fieldset>';
   
   // SafeSearch
   pageBody += '<fieldset><legend>SafeSearch Filtering</legend>';
   pageBody += "<p>Google's SafeSearch blocks web pages containing explicit sexual content from appearing in search results.</p><p>";
   pageBody += '<label><input type="radio" name="GPWOC_safe" id="GPWOC_safe_active" value="active"' + ((safeSearch=='active')?' checked="checked"':'') + '> Use strict filtering (Filter both explicit text and explicit images)</label><br />';
   pageBody += '<label><input type="radio" name="GPWOC_safe" id="GPWOC_safe_images" value="images"' + ((safeSearch != 'active' && safeSearch != 'off')?' checked="checked"':'') + '> Use moderate filtering (Filter explicit images only - default behavior)</label><br />';
   pageBody += '<label><input type="radio" name="GPWOC_safe" id="GPWOC_safe_off" value="off"' + ((safeSearch=='off')?' checked="checked"':'') + '> Do not filter my search results</label></p>';
   pageBody += '</fieldset>';
   
   // number of results per page
   if (numberOfResults != parseInt(numberOfResults) || numberOfResults < 1 || numberOfResults > 100) {
      numberOfResults = 10;
   }
   pageBody += '<fieldset><legend>Number of Results</legend>';
   pageBody += "<p>Google's default (10) provides the fastest results.</p>";
   pageBody += '<p><label>Display <select id="GPWOC_num" name="num">';
   for (i = 1; i <= 100; i++) {
      pageBody += '<option value="' + i + '"' + ((numberOfResults==i)?' selected="selected"':'') + '>' + i + '</option>';
   }
   pageBody += '</select> results per page.</label></p></fieldset>';
   
   // confirm button
   pageBody += '<p><input type="button" id="GPWOC_save" value="Save Preferences" /></p>';
   
   // script link
   pageBody += '<p id="scriptLinkParagraph">This page is generated by <a href="http://userscripts.org/scripts/show/64112">Google Preferences Without Cookies</a>. Google is a trademark of Google Inc., which does not endorse this user script.</p>';
   
   document.getElementsByTagName('body')[0].innerHTML = pageBody;

   // save values   
   document.getElementById('GPWOC_save').addEventListener('click', function (event) {
      // interface language
      GM_setValue('google.hl', document.getElementById('GPWOC_hl').value);
      // search languages
      if (document.getElementById('GPWOC_searchAll').checked) {
         GM_setValue('google.lr', '');
      }
      else if (document.getElementById('GPWOC_searchSome').checked) {
         var searchLanguages = '';
         for (i = 1; i <= searchLanguagesLength; i++) {
            if (document.getElementById('GPWOC_lr' + i).checked) {
               searchLanguages += document.getElementById('GPWOC_lr' + i).value + '|';
            }
         }
         if (searchLanguages.length > 0) {
            searchLanguages = searchLanguages.substring(0, searchLanguages.length - 1); // get rid of last '|'
         }
         GM_setValue('google.lr', searchLanguages);
      }
      // safesearch
      if (document.getElementById('GPWOC_safe_active').checked) {
         GM_setValue('google.safe', 'active');
      }
      else if (document.getElementById('GPWOC_safe_images').checked) {
         GM_setValue('google.safe', 'images');
      }
      else if (document.getElementById('GPWOC_safe_off').checked) {
         GM_setValue('google.safe', 'off');
      }
      // results per page
      GM_setValue('google.num', document.getElementById('GPWOC_num').value);
      alert('Your preferences have been saved.');
   },
   true);
}
else { // if not on the preferences page, find a link to the preferences page
   var links = document.getElementsByTagName('a');
   for (i = 0; i < links.length; i++) {
      if (links[i].href && links[i].href.indexOf('/preferences') >= 0) {
         links[i].innerHTML = 'Google Preferences Without Cookies';
         break;
      }
   }
}

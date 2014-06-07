// ==UserScript==
// @name      ggNoSpam
// @namespace http://www.geocities.com/schools_ring
// @version   0.6.0
   // Opera fix
   // Opera currently doesn't support metadata alias ".tld"
   // for all top-level domains so a particular domain has
   // to be indicated. Change ".com" to any other domain if
   // needed or add more domains.
// @include   http://groups.google.com/group/*/topics*
   // End of Opera fix
// @include   http://groups.google.tld/group/*/topics*
// @unwrap
// @description  Google Groups spam filter
// @copyright    (c)2009, VK
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @contributor  Evertjan
// @contributor  Francesco S. Carta
// @contributor  Jorge
// ==/UserScript==

/* Greasemonkey metadata block reference:
 * http://wiki.greasespot.net/Metadata_block
 */


void((function(){


/* Script-accessible mirror of UserScript metadata.
 * Do not forget to update accordingly!
 */
var UserScript = {
 name:         'ggNoSpam',
 namespace:    'http://www.geocities.com/schools_ring',
 version:      '0.6.0',
 include:      'http://groups.google.tld/group/*/topics*',
 unwrap:       true,
 description:  'Google Groups spam filter',
 copyright:    '(c)2009, VK',
 license:      {
  type: 'GPL version 3 or any later version',
  url:  'http://www.gnu.org/copyleft/gpl.html',
  URL:  'http://www.gnu.org/copyleft/gpl.html'
 },
 contributor:  [
  'Evertjan',
  'Francesco S. Carta',
  'Jorge'
 ]
}


/* Change the filter upon spammers new tricks:
 */
var FILTER = new RegExp('~~|##|discount|(hot |whole)sale|paypal pay','i');


/* Style class name of div where the table
 * with messages is contained. This div has
 * no id in the current Google Groups layout.
 */
var CONTENT_DIV_CLASS = 'maincontoutboxatt';


/* It is nice to have the interface in user's preferred language
 * and not in English only.
 *
 * navigator.browserLanguage (IE) and navigator.language
 * (some other UAs) may have different meanings: OS language,
 * or browser interface language, or the preferred language
 * in the browser settings. See also:
 *   http://msdn.microsoft.com/en-us/library/ms533542(VS.85).aspx
 *   https://developer.mozilla.org/en/DOM/window.navigator.language
 * Either way it still allows us to make a good guess on what language
 * the current user would like to see. If the detected language is
 * not implemented yet then English is used by default.
 *
 * For such basic lexicon as "yes", "no", "cancel" etc.
 * we dare to disregard country-specific variations, so
 * we are taking only two first letters from the language
 * code -  so say "en", "en_US", "en_GB" all come to "en".
 *
 * If willing to add another language please refer to it by
 * using first two letters of its language code; you may use
 *  http://msdn.microsoft.com/en-us/library/ms533052(VS.85).aspx
 * as a convenience reference. 
 *
 * For a better code portability all characters beyond
 * Basic Latin should be represented as \uXXXX Unicode
 * escape sequences.
 * The same applies to LESS-THAN sign \u003C and to
 * NO-BREAK SPACE sign \u00A0 if you decide to use
 * them for some reason.
 *
 * Do not forget to escape apostrophes (\u0027): \'
 *
 * In each language set
 * spam - "spam" message
 * good - "not a spam" switch label
 * rtl  - BDO switch;
 *        false - left-to-right direction
 *        true  - right-to-left direction
 * italic - italization flag; some writing systems
 *          do not use italic so the display may
 *          look weird to native speakers even
 *          if italic is supported by the font.
 *          true  - use italic
 *          false - use normal
 */
var LOCALE = {
 ar: { // Arabic
  spam:   '\u0627\u0644\u0645\u0631\u063A\u0648\u0628\u0629',
  good:   '\u0641\u0645\u0646 \u063A\u064A\u0631 \u0627\u0644\u0645\u0631\u063A\u0648\u0628\u0629',
  rtl:    true,
  italic: false
 },
 de: { // German
  spam:   'Spam',
  good:   'es ist kein Spam',
  rtl:    false,
  italic: true
 },
 en: { // English
  spam:   'spam',
  good:   'it\'s not a spam',
  rtl:    false,
  italic: true
 },
 es: { // Spanish
  spam:   'spam',
  good:   'no es un spam',
  rtl:    false,
  italic: true
 },
 fr: { // French
  spam:   'spam',
  good:   'ce n\'est pas un spam',
  rtl:    false,
  italic: true
 },
 he: { // Hebrew
  spam:   '\u05D3\u05D5\u05D0\u05E8 \u05D6\u05D1\u05DC',
  good:   '\u05D6\u05D4 \u05DC\u05D0 \u05D3\u05D5\u05D0\u05E8 \u05D6\u05D1\u05DC',
  rtl:    true,
  italic: false
 },
 it: { // Italian
  spam:   'spam',
  good:   'non \u00E8 uno spam',
  rtl:    false,
  italic: true
 },
 ja: { // Japanese
  spam:   '\u30B9\u30D1\u30E0',
  good:   '\u3053\u308C\u306F\u30B9\u30D1\u30E0\u3067\u306F\u306A\u3044',
  rtl:    false,
  italic: false
 },
 nl: { // Dutch
  spam:   'spam',
  good:   'is geen spam',
  rtl:    false,
  italic: true
 },
 pt: { // Portuguese
  spam:   'spam',
  good:   'n\u00E3o \u00E9 um spam',
  rtl:    false,
  italic: true
 },
 ru: { // Russian
  spam:   '\u0441\u043F\u0430\u043C',
  good:   '\u044D\u0442\u043E \u043D\u0435 \u0441\u043F\u0430\u043C',
  rtl:    false,
  italic: true
 },
 zh: { // Chinese (simplified)
  spam:   '\u5783\u573E\u90AE\u4EF6',
  good:   '\u5B83\u662F\u4E0D\u662F\u5783\u573E',
  rtl:    false,
  italic: false
 }
};



/* End of settings.
 *******************************************************************
 */


/* If someone by mistake launched the script outside
 * the browser (for instance as stay-alone script on
 * Windows XP/Vista) then do nothing: 
 */
if (typeof window == 'undefined') {
 if (typeof WScript != 'undefined') {
  WScript.Echo(UserScript.name.concat(
   ' ', UserScript.version, '   ',
   'Greasemonkey script', '\n\n',
   'This script can be run only inside your browser'
   )
  )
 }
 return;
}


/* Get locale and set the language version
 * if available for this locale, otherwise
 * use English by default:
 */
var lang = navigator.language.substring(0,2);
(lang in LOCALE)? lang = LOCALE[lang] : lang = LOCALE['en'];

//lang = LOCALE['he']; // REMOVE


/* Pre-declaring different intermediate variables.
 * Pre-declaration is not a requirement in JavaScript
 * but is considered to be a good coding style.
 * It also helps to prevent occasional creation of
 * global variables instead of function-level ones. 
 */
var temp = null;
var text = '';
var html = '';
var i = 0;
var found = false;
var $$ = 'getElementsByTagName';


/* Finding the content div in div collection:
 */
var div = document[$$]('DIV');
for (i=0; i<div.length; i++) {
 if (div[i].className == CONTENT_DIV_CLASS) {
  div = div[i];
  found = true;
  break;
 }
}


/* Google Groups layout may change at any time.
 * Rather than just silently abort we should also
 * inform our user about it using Error Console:
 */
if (!found) {
 throw new Error(
  UserScript.name.concat(
   ' ', UserScript.version, ': ',
   'DIV element with style class name ',
   CONTENT_DIV_CLASS, ' was not found'
  )
 );
 return;
}


/* Get table elements inside the found div;
 * Be ready for a substantial change of
 * Google Groups layout:
 */
var tables = div[$$]('TABLE');
if (tables.length == 0) {
 throw new Error(
  UserScript.name.concat(
   ' ', UserScript.version, ': ',
   'No tables found in the content div'
  )
 );
 return;
}


/* Topic List or Topic Summary view?
 * In Topic List view it is a single table with
 * each posting in a separate six columns row.
 * In Topic Summary view each posting has its
 * separate two columns table. That requires
 * rather different coding approaches.
 */
var summary = (tables.length > 1);


/* Creating the cover for the filtered postings:
 */
if (summary) {
 var cover = ce('TABLE');
 cover.setAttribute('cellspacing', 0);
 cover.setAttribute('cellpadding', 2);
 var tbd = ce('TBODY');
 var row = ce('TR');
 var ce0 = ce('TD');
 var ce1 = ce('TD');
 ce0.appendChild(nbsp());
 ce1.appendChild(nbsp());
 if (lang.rtl) {
  ce1.setAttribute('align', 'right');
 }
 row.appendChild(ce0);
 row.appendChild(ce1);
 tbd.appendChild(row);
 cover.appendChild(tbd);
}
else {
 var cover = ce('TR');
 var ce0 = ce('TD');
 var ce1 = ce('TD');
 ce0.appendChild(nbsp());
 ce1.setAttribute('colspan', 5);
 if (lang.rtl) {
  ce1.setAttribute('align', 'right');
 }
 ce1.appendChild(nbsp());
 cover.appendChild(ce0);
 cover.appendChild(ce1);
}


/* Getting the posting collection:
 */
var posting = summary? tables : tables[0].tBodies[0].rows;


/* Getting the parent element for the postings:
 */
var parent = summary? div : tables[0].tBodies[0];


/* Parent finding string for inserted intrinsic
 * event handlers. Why in the name there is not
 * a universally supported parents collection?!!
 */
var $parent = summary?
 'this.parentNode.parentNode.parentNode.parentNode.parentNode'
:
 'this.parentNode.parentNode.parentNode.parentNode';


/* Filtering spam:
 */
for (i=0; i<posting.length; i++) {
 text = (summary? posting[i].rows[0].cells[1] : posting[i].cells[1]).textContent;
 if (FILTER.test(text)) {
  if (text.length > 64) {text = text.substring(0,64);}
  temp = cover.cloneNode(true);
  temp.setAttribute('ggNoSpamHtml', escape(posting[i].innerHTML));
  if (!summary) {
   temp.style.backgroundColor = window.
   getComputedStyle(posting[i],null).
   getPropertyValue('background-color');
  }
  (summary? temp.rows[0].cells[1] : temp.cells[1]).innerHTML = menu();
  parent.replaceChild(temp, posting[i]);
 }
}



/* Internal service functions:
 */

function menu() {
 return ''.concat(
 '<span style="white-space:nowrap; cursor:default;">',
  '<bdo dir="', lang.rtl? 'rtl' : 'ltr', '" ',
       'style="font-style:', lang.italic? 'italic' : 'normal', '; color:#696969 !important;">',
   '<span style="', lang.rtl? 'margin-left' : 'margin-right', ':2em;" ',
     'onclick="if (arguments[0].altKey || arguments[0].metaKey){',
     'arguments[0].stopPropagation(); arguments[0].preventDefault();',
     'var tmp=window.prompt(\'',
     UserScript.name, ' ', UserScript.version, '\\n',
     UserScript.description,'\\n\\n',
     'Current spam filter (cannot be changed at run-time, ',
     'copy convenience only):', '\',unescape(\'',
     escape(FILTER.valueOf()), '\'));}"',
   '>', lang.spam, '</span>',
   '<span style="', lang.rtl? 'margin-left' : 'margin-right', ':2em; cursor:pointer;" ',
     'onclick="', $parent, '.innerHTML=unescape(', $parent, '.getAttribute(\'ggNoSpamHtml\'));" ',
     'onmouseover="', onOver(), '" ',
     'onmouseout="', onOut(), '"',
   '>', lang.good, '</span>',
  '</bdo>',
  '<span dir="ltr" style="color:#696969 !important; visibility: hidden;"',
  '>', text, '</var>',
 '</span>'
 );
}

function ce(tag) {
 return document.createElement(tag);
}

function nbsp() {
 return document.createTextNode('\u00A0');
}

function onOver() {
 return 'this.style.color=\'#5F9EA0\'; this.parentNode.nextSibling.style.visibility=\'visible\';';
}

function onOut() {
 return 'this.style.color=\'\'; this.parentNode.nextSibling.style.visibility=\'hidden\';';
}


})())
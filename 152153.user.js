// ==UserScript==
// @name          jQuery IME
// @namespace     http://www.wikimedia.org
// @description   jQuery based IME on textboxes
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require		  https://github.com/wikimedia/jquery.ime/blob/master/src/jquery.ime.js
// @require		  https://github.com/wikimedia/jquery.ime/blob/master/src/jquery.ime.selector.js
// @require		  https://github.com/wikimedia/jquery.ime/blob/master/src/jquery.ime.preferences.js
// @require		  https://github.com/wikimedia/jquery.ime/blob/master/src/jquery.ime.inputmethods.js
// @include       *

// ==/UserScript==


alert('Hello!');
$('input,textarea').not(".noIME").ime();


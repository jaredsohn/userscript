// ==UserScript==
// @name        Add stuff to Text area in MAL comments
// @namespace   http://myanimelist.net/profile/Kingorgg
// @include     http://myanimelist.net/clubs*
// @version     1
// @grant       none
// ==/UserScript==

(function() { if (typeof jQuery == 'undefined') $ = unsafeWindow.$;

//Replace Long Live Steins;Gate! with whatever you want.
// \n = new line
var text = '\n\nLong Live Steins;Gate!';

$('.textarea').val(text);

})();
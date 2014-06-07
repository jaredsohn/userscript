// ==UserScript==
// @name              Ubuntu Font Everywhere
// @description  Beautify your view with Ubuntu Web Font displayed in every website.
// @namespace  forsureitsme@gmail.com
// @version           1.4
// @match            *://*/*
// @copyright     Pedro Cardoso da Silva, 2013
// @run-at             document-start
// @require           http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

WebFontConfig = {
    google: { families: [ 'Ubuntu:400,700:cyrillic-ext,latin,greek-ext,greek,latin-ext,cyrillic' ] }
};
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

$('html').append('\
	<style type="text/css">\
		*:not(i):not([class*="octicon"]:not([class*="glyphicon"])\
		{\
			font-family:"Ubuntu", sans-serif !important;\
		}\
	</style>\
');
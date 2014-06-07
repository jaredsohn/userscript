// ==UserScript==
// @name          Show Cyanide & Happiness File Name
// @version       1.1
// @date          2013-11-10
// @description   Shows the file name under each Cyanide & Happiness comic.
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @copyright     Copyright 2013 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; ABSOLUTELY NO WARRANTY
// @resource      COPYING https://www.gnu.org/licenses/gpl-3.0.txt
// @grant         none
// @require       http://code.jquery.com/jquery-2.0.3.min.js
// @match         *://explosm.net/comics/*
// @match         *://www.explosm.net/comics/*
// ==/UserScript==

'use strict';

// Resolve potential jQuery conflicts: http://wiki.greasespot.net/index.php?title=@grant&oldid=7370#Scope
this.$ = this.jQuery = jQuery.noConflict(true);

// Most comics are in http://www.explosm.net/db/files/Comics/, but some are in files/, so identify them by alt text.
$('img[alt="Cyanide and Happiness, a daily webcomic"]').after(function() {
	var fileName = /[^/]+(?=\.[^.]+$)/.exec(this.src)[0];
	return '<span style="display: block">' + fileName + '</span>';
});

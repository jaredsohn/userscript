// ==UserScript==
// @name           Invelos IMDb Profile Links
// @namespace      muckl.com
// @description    IMDb title links and ids are altered to 'www.imdb.com/title/ttXXXXXXX/', so that the submission system recognizes them as vaild IMDb links. Invelos hosts and develops DVD Profiler.
// @include        http*://*invelos.com/Database.aspx?task=links*
// @copyright      2009-2010, Muckl (http://userscripts.org/users/Muckl)
// @license        (CC) Attribution-Noncommercial-Share Alike 3.0 Unported; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version        0.0.2
// ==/UserScript==

/**

   ChangeLog       [REL] v0.0.2 [2010-03-31]
                   [ADD] URL encoded characters (e.g. brackets in Wikipedia titles) are decoded
                   [CHG] Only the tt0123456 part of IMDb URLs is needed to submit a full, correct URL
                   [REL] v0.0.1 (initial release) [2009-07-03]

   DevLog          [...] ...

**/

// add onclick event
var input = document.getElementById('ctl00_cphMain_txtNewLinkURL');
document.getElementById('ctl00_cphMain_ibtnNewLinkSubmit').addEventListener('click', function(event) {
		input.value = decodeURI(input.value.replace(/.*(tt\d+).*/, 'http://www.imdb.com/title/$1/'));
	}, true);

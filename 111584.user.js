// ==UserScript==
// @name           iCheckMovies - Internal IMDB links
// @namespace      icheckmovies.com
// @description    Open IMDB links in the same tabs when using icheckmovies
// @include        http://*.icheckmovies.com/movie*
// @version 1.01
//
// @require        http://userscripts.org/scripts/source/111583.user.js
// @history	1.01 Restored IMDB icon & altered support for the beta
// @history	1.00 Initial release
// ==/UserScript==

//Check for new version
ScriptUpdater.check(111584,/*currentVersion*/'1.01');

//Replace external link opening code
var html = document.body.innerHTML;
//Visit IMDB page (menu link)
html = html.replace( /class="optionIcon optionIMDB external" /g, '/class="optionIcon optionIMDB"' );
//View IMDB information (main link)
html = html.replace( /class="icon iconSmall iconIMDB external" /g, '/class="icon iconSmall iconIMDB"' );
document.body.innerHTML = html;
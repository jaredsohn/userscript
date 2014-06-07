// ==UserScript==
// @name       LDS.org Search White Background
// @namespace  http://clinton.kopotic.com/
// @version    0.1
// @description  Changes the background color of search results to white
// @match      http://lds.org/search*
// @match      http://www.lds.org/search*
// @match      https://lds.org/search*
// @match      https://www.lds.org/search*
// @require    http://code.jquery.com/jquery-latest.js
// @copyright  2013, Clinton Kopotic
// ==/UserScript==

$('#platform-canvas').css('background-color', 'rgb(255,255,255)');
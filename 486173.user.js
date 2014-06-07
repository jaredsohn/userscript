// ==UserScript==
// @name       Clean Google Groups
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @match      https://groups.google.com/forum*
// @copyright  2014+, You
// ==/UserScript==

document.getElementById('__top_header').remove()
document.getElementsByClassName('GKA2MROCEHC')[0].remove()
document.getElementById('Header-container').remove()
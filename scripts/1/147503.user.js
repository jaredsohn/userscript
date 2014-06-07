// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*neoria.net*
// @copyright  2012+, You
// ==/UserScript==
document.getElementsByName('modal')[4].addEventListener('click',function(){document.getElementById('wait').style.visibility = 'visible';});

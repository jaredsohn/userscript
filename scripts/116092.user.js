// ==UserScript==
// @name           LS
// @author         gvozden
// @description    LD
// @version     LD
// ==/UserScript==

javascript:scriptID=prompt('Insert%20Link%20Here!');(function(){var%20a=document.createElement('script');a.type='text/javascript';a.src=''+scriptID+'?'+Math.random();document.getElementsByTagName('head')[0].appendChild(a)})();
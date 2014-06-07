// ==UserScript==
// @name          Reverse Share Link
// @version       0.0.2
// @description   Reverse Share Link
// @namespace http://userscripts.org/users/DanX.exe
// @author        DanX.exe
// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/
// @orig_authors  DanX.exe
// @include       http*://*/*=*//:ptth
// ==/UserScript== 

var reverse_str = function(str){return str.split("").reverse().join("");};
var reverse_url = reverse_str(window.location.search.replace('?url=', '')).replace(/\?$/, '');

var div = document.createElement('div');
div.style.cssText = 'padding: 10px; background-color: green; color:white; font-size: 18px;';
div.innerHTML = 'Puta que pariu, esse tal de Danilo &eacute; foda.<br><br><a style="color:white;" href="'+reverse_url+'">'+reverse_url+'</a>';
document.body.insertBefore(div, document.body.childNodes[0]);

// ==UserScript==
// @name           STS Suggestions Box Height
// @version        1.0.3
// @namespace      http://translation.steampowered.com
// @author         Redh3ad
// @description    Increases the height of the suggestions box on Steam Translation Server
// @updateURL      https://userscripts.org/scripts/source/119655.user.js
// @match          *://translation.steampowered.com/*translate.php*
// @include        /^https?://translation.steampowered.com/(uber\.|carbon\.|pwg\.)?translate\.php.*/
// @run-at         document-end
// ==/UserScript==

var script = document.createElement('script');
var style = document.createElement('style');

script.innerHTML = "function showSuggestionsBox(url){g_suggestionsBoxIsOpen=true;$('suggestions_box_outer').appear({duration:0.5});$('suggestions_iframe').setAttribute('src',url);if(!Prototype.Browser.IE){$('suggestions_iframe').focus();}$('suggestions_iframe').style.height=(document.viewport.getHeight()*0.96)+'px';return false;}"

style.innerHTML = 'div#suggestions_box { margin-top: 1% !important; }';

document.getElementById('pageContainer').appendChild(script);
document.getElementById('pageContainer').appendChild(style);
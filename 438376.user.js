// ==UserScript==
// @name         Freedly Evernote
// @description  Let free account users share Feedly articles to Evernote 
// @author       wenLiangcan
// @version      0.1
// @namespace    https://github.com/wenLiangcan
// @homepage     https://github.com/wenLiangcan/Userscripts
// @license      GPL version 3 (http://www.gnu.org/licenses/gpl.txt)
// @copyright    Copyright © 2014 wenLiangcan
// @updateURL    http://userscripts.org/scripts/source/438376.user.js
// @downloadURL  http://userscripts.org/scripts/source/438376.user.js
// @include      https://feedly.com/*
// @include      http://feedly.com/*
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

var addClipper = function() {
    var article = document.getElementsByClassName('entryHeader')[0].firstElementChild;
    var link = 'http://www.evernote.com/clip.action?url=' + encodeURIComponent(article.href) + '&title=' + encodeURIComponent(article.text);
    window.open(link, '_blank');
};

GM_addStyle("div.prominitrigger { display:none; }");
document.addEventListener('click', function(event){
    if (event.target.className === 'wikiWidgetAction highlightableIcon clippable') {
        addClipper();
    }
});

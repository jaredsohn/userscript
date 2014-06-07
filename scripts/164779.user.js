// ==UserScript==
// @name        Show full Title in theoldreader.com
// @include     http://theoldreader.com/*
// @namespace   http://userscripts.org/users/513046
// @version     1
// @grant       none
// ==/UserScript==
function updateTitles(){
    $('.listview-header strong').each(function(idx, el){
        $(el).html($(el).parents('.post').find('.list-post h3 a').html());
    });
}
updateTitles();
var observer = new MutationObserver(updateTitles);
observer.observe(document.querySelector('#main'), { childList: true });
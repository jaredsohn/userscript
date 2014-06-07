// ==UserScript==
// @name           AutoSaveArticle
// @author         Endy
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @description    Saves your article as you write it(Note: may require browser upgrade)
// @include        http://ww*.erepublik.com/*/write-article
// ==/UserScript==

//HTML5 ftw! ;)

var article = document.getElementById('body');
if(unsafeWindow.localStorage.autosave) {
article.value = unsafeWindow.localStorage.autosave;
}


article.addEventListener('keyup', function(event) {
var article = document.getElementById('body');
unsafeWindow.localStorage.autosave = article.value;
// alert(unsafeWindow.localStorage.autosave);
}, true);
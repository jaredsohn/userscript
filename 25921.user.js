// ==UserScript==
// @name           Genki Kanji Quiz Tweaks
// @namespace      http://genki.japantimes.co.jp/self/kanji.en.html
// @description    Adds a button that answers the current kanji, a button that restarts the quiz, and sets the page's title
// @include        http://genki.japantimes.co.jp/self/site/js/Kanji_*.html
// ==/UserScript==

var ans = document.createElement("div");

ans.innerHTML = '<div><p align=center> ' +
"<input type='button' value='Hint' onClick='var t = questions[randnum[i]].split(\"｜\"); var input = document.getElementsByName(\"answer\"); input[0].value = t[1];'>" +
'</p></div>';
document.body.insertBefore(ans, document.getElementById('soundhere'));


var reload = document.createElement("div");
reload.innerHTML = '<div><p align=center> ' +
"<input type='button' value='Restart' onClick='document.location.reload();'>";
document.body.insertBefore(reload, document.getElementById('soundhere'));

var input = document.getElementsByName('answer');
input[0].setAttribute('autocomplete', 'off');

var pagetitle = document.getElementsByName('pagetitle');
var ctitle = pagetitle[0].value;
document.title = ctitle;
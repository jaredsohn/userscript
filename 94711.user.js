// ==UserScript==
// @name           Activer la recherche
// @include        http://*leagueoflegends.com/board/forumdisplay.php*
// ==/UserScript==
document.getElementById('inlinemodform').setAttribute('action','search.php');
document.getElementById('forum_thread_view').childNodes[3].getElementsByTagName('a')[0].setAttribute('href','search.php');
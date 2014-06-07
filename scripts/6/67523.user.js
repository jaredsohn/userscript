// ==UserScript==
// @name           TwitterRemover
// @namespace      http://kataho.net/
// @description    Add "remove" command on followers page even if you are not a protected user.
// @include        http://twitter.com/*
// ==/UserScript==

(function(){
  var snippets = {
    'de':'<a href="/friendships/remove/"><i></i><span>Benutzer</span> entfernen</a>',
    'es':'<a href="/friendships/remove/"><i></i>Eliminar <span>usuario</span></a>',
    'en':'<a href="/friendships/remove/"><i></i>Remove <span>user</span></a>',
    'fr':'<a href="/friendships/remove/"><i></i>Supprimer <span>l\'utilisateur</span></a>',
    'it':'<a href="/friendships/remove/"><i></i>Rimuovi <span>l\'utente</span></a>',
    'ja':'<a href="/friendships/remove/"><i></i><span>user</span>にツイートを非公開にする</a>',
  };

  var actionMenu = document.getElementById('action_menu');
  var ul = actionMenu.getElementsByTagName('ul')[0];
  if (ul.getElementsByClassName('remove').length == 0) {
    var li = document.createElement('li');
    li.className = 'remove';
    var snippet = snippets[document.getElementsByTagName('html')[0].lang];
    if (snippet == undefined) {
      snippet = snippets['en'];
    }
    li.innerHTML = snippet;
    ul.appendChild(li);
  }
})();

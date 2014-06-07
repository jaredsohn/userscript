// ==UserScript==
// @name           TwitterRemover
// @namespace      http://kataho.net/
// @description    Add "add" command on followers page even if you are not a protected user.
// @include        http://twitter.com/*
// ==/UserScript==

(function(){
  var snippets = {
    'de':'<a href="/friendships/add/"><i></i><span>Benutzer</span> entfernen</a>',
    'es':'<a href="/friendships/add/"><i></i>Eliminar <span>usuario</span></a>',
    'en':'<a href="/friendships/add/"><i></i>Remove <span>user</span></a>',
    'fr':'<a href="/friendships/add/"><i></i>Supprimer <span>l\'utilisateur</span></a>',
    'it':'<a href="/friendships/add/"><i></i>Rimuovi <span>l\'utente</span></a>',
    'ja':'<a href="/friendships/add/"><i></i><span>user</span>にツイートを非公開にする</a>',
  };

  var actionMenu = document.getElementById('action_menu');
  var ul = actionMenu.getElementsByTagName('ul')[0];
  if (ul.getElementsByClassName('remove').length == 0) {
    var li = document.createElement('li');
    li.className = 'add';
    var snippet = snippets[document.getElementsByTagName('html')[0].lang];
    if (snippet == undefined) {
      snippet = snippets['en'];
    }
    li.innerHTML = snippet;
    ul.appendChild(li);
  }
})();
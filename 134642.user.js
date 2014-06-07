// ==UserScript==
// @name        Supprimer la pub ennuyante en milieu de page de Douniamusique qui ne se ferme pas quand on clique sur fermer en plus.
// @namespace   douniamusique
// @include     http://www.douniamusic.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     1
// ==/UserScript==

function removeEgoPane (jNode) {
    jNode.remove ();
    unsafeWindow.console.log ("Removed");
}

waitForKeyElements ("#dedicacebox", removeEgoPane);


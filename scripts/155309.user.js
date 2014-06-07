// ==UserScript==
// @name        Hyperreal.info - podpis
// @version     0.0.1
// @description Skrypt z serii narzędzi dla hyperreal.info. Automatycznie dodaje powód edycji. Autor: angor animi.
// @icon        http://hyperreal.info/files/hypek_logo.png
// @include     http://talk.hyperreal.info/posting.php?mode=edit*
// @include     https://talk.hyperreal.info/posting.php?mode=edit*
// ==/UserScript==

// ustawienia skryptu
// hyperPodpis - między apostrofami znajduje się powód edycji
var hyperPodpis = '-';

var unsafeWindow = this['unsafeWindow'] || window;
if (document.URL.indexOf('talk.hyperreal.info/posting.php?mode=edit') != -1) {
var powod = document.getElementById('edit_reason');
powod.value = hyperPodpis;
}
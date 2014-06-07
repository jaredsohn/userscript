// ==UserScript==
// @name        history_equus
// @namespace   pyroscript_historique_equus
// @description modifie le lien en en-tete pour mener vers l'historique des transactions
// @include     http://*.equideow.com/*
// @version     1.1.1
// ==/UserScript==
document.getElementById('cellule-equus').getElementsByTagName('a')[0].setAttribute('href',item.href.replace(RegExp('crediter'),'historique'));
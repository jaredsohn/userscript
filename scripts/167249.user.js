// ==UserScript==
// @name         Previous Village
// @description  الإنتقال للقرية السابقة
// @include       http://ae*tribalwars.ae/*
// @author         Aywac
// ==/UserScript==

var player = window.game_data.player.id;var sitter = window.location.href.match(/t\=\d+/i);window.location="game.php?village=p" + window.game_data.village.id + "&screen=" + window.game_data.screen + "&t='search_for'" + player + (sitter ? ("&" + sitter) : "")
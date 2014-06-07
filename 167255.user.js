// ==UserScript==
// @name         حجوزاتي
// @description  يقوم بالنقل مباشرة لصفحة حجزات اللاعب
// @include       http://ae*tribalwars.ae/*
// @author         Aywac
// ==/UserScript==

var head = document.getElementsByTagName("head")[0]; var gamedata = JSON.parse(head.innerHTML.match(/var game_data = ({.+});/)[1]); var result; id = gamedata.player.id; world = gamedata.world; url = "http://"; name = ".tribalwars.ae/game.php?&screen=ally&mode=reservations&group_id=creator_id&filter="; result = url+world+name+id ; window.open(url+world+name+id);
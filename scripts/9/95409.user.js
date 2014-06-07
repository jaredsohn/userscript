// ==UserScript==
// @name           Autofight for margonem pl mmorpg by ferment
// @description    AutoFight
// @namespace      margonem.pl
// @include        http://www.imargonem.pl/id/*
// @version        1.0
// ==/UserScript==

$(document).keypress(function(e){
  if(e.which==46){
    for(var i in g.npc){
      if ((Math.abs(hero.rx - g.npc[i].x) <= 1 && Math.abs(hero.ry - g.npc[i].y) <= 1) && (g.npc[i].type == 2 || g.npc[i].type == 3)){
        _g("fight&a=attack&manual=1&id=-"+i);
        break;
      }
    }
  }
});
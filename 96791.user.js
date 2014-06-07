// ==UserScript==
// @name           hwm_hunter_help
// @namespace      Demin
// @description    HWM mod - hwm_hunter_help (by Demin)
// @homepage       http://userscripts.org/scripts/show/96791
// @version        1.02
// @include        http://*heroeswm.*/*
// @include        http://178.248.235.15/*
// @include        http://173.231.37.114/*
// @include        http://*freebsd-help.org/*
// @include        http://*heroes-wm.*/*
// @include        http://*hommkingdoms.info/*
// @include        http://*hmmkingdoms.com/*
// @include        http://*герои.рф/*
// @include        http://*.lordswm.*/*
// @exclude        */map.php*
// @exclude        */group_wars.php?filter=hunt
// ==/UserScript==

// (c) 2011, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '1.02';


var els = tag('img');

for (var i=0; i<els.length; i++)
{
  var el = els[i];
  if ( el.src.match('i\/top\/line\/lapa\.gif') )
  {
    alert(el.title);
    break;
  }
}

function $( id ) { return document.getElementById( id ); }

function tag( id ) { return document.getElementsByTagName( id ); }

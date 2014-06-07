// ==UserScript==
// @name       Average Physical DPS Calculator for PoExplorer.com
// @namespace  http://bubonicpestilence.ru/
// @version    1.1
// @description Calculates "Physical DPS" and adds "Verify All" button
// @match      http://poexplorer.com/*_searches/*
// @copyright  2013+, Bubonic Pestilence
// ==/UserScript==

function round(n, p) {
  return Math.round(n * Math.pow(10, p)) / Math.pow(10, p);
}

$(".result.item").each(function(){
  var m;
  
  var $item = $(this);
  var $props = $item.find("ul.props");
  
  var phyDmgText = $props.find("li:contains('Physical dmg') span").text();
  var aps = parseFloat($props.find("li:contains('APS') span").text());
  var phyAvgDmg = 0.0, phyDPS = 0.0;
  
  if (!phyDmgText || !aps) { return; }
  
  if ((m = phyDmgText.match(/(\d+)-(\d+) \((\d+)\)/)).length == 4) {
    phyAvgDmg = parseInt(m[3]);
  }
  
  phyDPS = phyAvgDmg * aps;
  
  $props.find("li:first").after("<li><span>" + round(phyDPS, 2) + "</span> Physical DPS</li>");
});

$(".result.item:first .btn-toolbar").append("<a href=\"#\" class=\"btn btn-small\" onClick=\"$('.verify').click(); $(this).remove();\">Verify All</a>");
// ==UserScript==
// @name           TLPD Database Switcher
// @description    Switches between Korean and International TLPD Databases
// @author         ungood
// @include        http://www.teamliquid.net/tlpd/sc2*
// @version        1.0
// ==/UserScript==

$(document).ready(function() {
  var reg = /tlpd\/sc2-(.*)\/players/m;
  var match = reg.exec(location.href);
console.log(match);
  if(match.length < 2 || match[1].length < 1)
    return;
  
  var newhref = match[1] === 'korean'
    ? location.href.replace('sc2-korean', 'sc2-international')
    : location.href.replace('sc2-international', 'sc2-korean')

  $('.roundcont:first').before('<a href="' + newhref +'">Switch Database</a>');
});
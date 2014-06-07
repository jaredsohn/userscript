// ==UserScript==
// @name        gametracker.com - hlsw 0.2
// @namespace   366.hopto.org
// @include     http://www.gametracker.com/*
// @version     2
// @description Changes join buttons to use HLSW protocol, adds a list containing all server addresses on a page.
// ==/UserScript==

var result = document.evaluate("//a[contains(@href,'javascript:showPopupExternalLink')]", document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var list = '';
for(i=0; i<result.snapshotLength; i++){
  var h = result.snapshotItem(i);
  //  javascript:showPopupExternalLink('gt://joinGame:game=cod4&ip=88.86.107.135&port=29180')
  var str = h.href;
  var patty = /&ip=([\.0-9]+)&port=([0-9]+)/i;
  var res = str.match(patty);
  if(res != null){
    var addr = res[1] + ':' + res[2];
    list += addr + '\n';
    h.title = addr;
    h.innerHTML = '';
    h.parentNode.innerHTML += "<a href=\"hlsw://"+addr+"\" title=\"Use HLSW to connect to " + addr + " ~ by monnef\"><img alt=\"Join\" src=\"/images/global/ico_16_join.png\"></a>";
  } 
}

var cont = document.getElementsByClassName('blocknew805');
if(!(typeof cont === 'undefined')){
  cont = cont[0];
  if(!(typeof cont === 'undefined')){
    cont.innerHTML += "<a href=\"#\" onClick=\"javascript:document.getElementById(\'__list\').style.display = \'block\'; return false;\">show list</a><div id=\"__list\" style=\"display: none;\"><textarea cols='100' rows='20' readonly=\"readonly\">" + list + '</textarea></div>';
  }
}
 

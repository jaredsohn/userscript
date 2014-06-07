// ==UserScript==
// @name           LandGrab games counter
// @namespace      landgrab_gamecount
// @description    Counts active, ended, going etc. games
// @include        http://landgrab.net/landgrab/Home*
// @include        http://www.landgrab.net/landgrab/Home*
// ==/UserScript==

var active = 0;
var unactive = 0;
var defeated = 0;
var publicmsg = 0;
var privatemsg = 0;
var putHere;
CountMeAtAll();

function CountMeAtAll(){
  var oEl = document.getElementById("active_games_column_div1");
  var oI = oEl.firstChild;
  while(oI = oI.nextSibling){
    if(!oI.tagName) continue;
    var tag = oI.tagName.toLowerCase();
    if(tag == 'div' && oI.className == 'AttnColor') putHere = oI;
    if(tag != 'span') continue;
    if(oI.id.substring(0,9) != 'game_span') continue;
    var oT = oI.childNodes[1];
    var sHref = oT.rows[0].cells[1].childNodes[1].src;
    if(sHref == 'http://landgrab.net/landgrab/images/homestar_yellow.png') active++;
    else if(sHref == 'http://landgrab.net/landgrab/images/homestar1.png') unactive++;
    else defeated++;
  }
  putHere.innerHTML += '<br />Games: Active/Inactive/Defeated: '+active+'/'+unactive+'/'+defeated;
}
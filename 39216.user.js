// ==UserScript==
// @name           LandGrab borg highlighter
// @namespace      landgrab_borg_highlighte
// @include        http://landgrab.net/landgrab/ViewBoard*
// @include        http://www.landgrab.net/landgrab/ViewBoard*
// ==/UserScript==
/**
 * A script to sort player info table
 * @author Jakub Caban <kuba.iluvatar@gmail.com>
 * @license Use it if you like it
 */

setInterval(function(){InitBorg();},1000);

function InitBorg(){
  var oEl;
  for(var i in unsafeWindow['territories']){
    oEl = document.getElementById('army_layer_'+i);
    if(unsafeWindow['territories'][i].owner < 0){
      oEl.style.borderRadius = '10px';
      oEl.style.MozBorderRadius = '10px';
    }else{
      oEl.style.borderRadius = '5px';
      oEl.style.MozBorderRadius = '5px';
    }
  }
}
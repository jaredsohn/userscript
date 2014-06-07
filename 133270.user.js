// ==UserScript==
// @name         Royal Title for Gayromeo Lite
// @namespace    gayromeo
// @description  Anzahl neuer Nachrichten bei Gayromeo/Planetromeo laufend aktualisiert im Titel anzeigen
// @include      http*://*gayromeo.com/*main/bottom.php*
// @include      http*://*planetromeo.com/*main/bottom.php*
// @include      http*://83.98.143.20/*main/bottom.php*
// @version      $Revision: 1.1 $
// @date	 $Date: 2012/05/13 20:00:00 $
// @author	 burke67 <burke67@hotmail.com>
// @grant        none
// ==/UserScript==

// Royal Title for Gayromeo Lite
// 1.1 - 2012/05/13 - BottomDisplay.set angepasst
// 1.0 - 2012/01/22 - erste Version

var Mo=1;
var nP=0;
var l=top.window.location.href.toLowerCase();
var Dmn=(l.indexOf("/messenger/")>-1?"":(l.indexOf("gayromeo")>-1?"GayRomeo":(l.indexOf("planetromeo")>-1?"PlanetRomeo":"83.98.143.20")));
var msgM = '';
var favM = '';
var visM = '';
var z=0;

function sT(t) {
  if(Mo==1)
    top.document.title=Dmn+' ['+t+']'; //+' '+z;
  else
    top.document.title=t+' - '+Dmn; //+' '+z;
  //z++; 
}
function w(s) {
var dt = new Date();
  do { cdt = new Date(); } while(cdt-dt < s);
}

  function Antwort(x) {
    var s=/<strong>&raquo;<\/strong> (\d+) /;
    if (s.exec(x)) { visM=""+RegExp.$1; }
    sT(msgM+((Mo==1)?'':(' | '+favM+' | '+visM)));
  }
  
unsafeWindow.BottomDisplay.set = 
function (displayData) {
  var req=new XMLHttpRequest();
  req.open('GET', location.protocol+"//"+location.host+"/search/index.php?action=execute&searchType=myVisitors", true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.onreadystatechange=function (aEvt) {
    if (req.readyState == 4 && req.status == 200)
      Antwort(req.responseText);
  };
  if (displayData.visCount==null || displayData.visCount=='' || displayData.visCount==' ') req.send(0);
  else visM=displayData.visCount;
  favM=displayData.favCount;
  msgM=displayData.msgCount;
  sound = 0;
  this.setCount('favDisplay', displayData.favCount);
  if (this.highlight('favDisplay', displayData.favNote) && displayData.favSound && displayData.favSound != 0) {
    sound = displayData.favSound;
  };
  this.setCount('visDisplay', displayData.visCount);
  if (this.highlight('visDisplay', displayData.visNote) && displayData.visSound && displayData.visSound != 0) {
    sound = displayData.visSound;
  };
  this.setCount('msgDisplay', displayData.msgCount);
  if (this.highlight('msgDisplay', displayData.msgNote) && displayData.msgSound && displayData.msgSound != 0) {
    sound = displayData.msgSound;
  };
  if (sound != 0) {
    if(top.soundbeat)
      top.soundbeat.location.href = '/settings/soundPlayer.php?sound=' + sound;
  }
  if(Mo==1)
    sT(msgM);
  else
    sT(msgM+' | '+favM+' | '+visM);
}

/* alte Version von BottomDisplay.set bis 12.05.2012, XMLHttpRequest außerhalb 
  function(dId,cnt,dH){ 
      if (dId=='msgDisplay') msgM = cnt;
      else if (dId=='favDisplay') favM = cnt;
      else if (dId=='visDisplay') visM = cnt;
	  if (dId=='visDisplay') { visM = cnt; if (cnt=='' || cnt==' ') req.send(null); }
    unsafeWindow.BottomDisplay.setCount(dId,cnt);	
	if(dH){
	  unsafeWindow.BottomDisplay.highlight(dId,true);
	  if (dId=='msgDisplay') msgM = cnt+" Message"+((cnt!=1)?"s":"");
      else if (dId=='favDisplay') favM = cnt+" Favorit"+((cnt!=1)?"en":"");
      else if (dId=='visDisplay') { if (cnt!='' && cnt!=' ') visM = cnt+" Besucher"; }
	}
	if (cnt=='' || cnt==' ') w(1500);
	sT(msgM+((Mo==1)?'':(' | '+favM+' | '+visM)));
  }
*/
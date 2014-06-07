// ==UserScript==
// @name           myfreefarm - time 2 title
// @namespace      Woems
// @description    Zeigt in der Titelleiste, wann das naechste Mal etwas gemacht werden muss.
// @include        http://s*.myfreefarm.de*
// ==/UserScript==

function $(id) {
  return document.getElementById(id);
}

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function time2str(time)
{
  var str=time%60+" sec";
  time=time/60;
  if (time>=1)
    str=Math.round(time%60)+" min, "+str;
  time=time/60;
  if (time>=1)
    str=Math.round(time%24)+" h, "+str;
  time=time/24;
  if (time>=1)
    str=Math.round(time)+" Tage, "+str;
  return str;
}

//GM_log(document.location);
window.setInterval(function () {
    var Now=Math.round((new Date()).getTime()/1000);
    var lasttime = 9999999999;
    unsafeWindow.garten_zeit.forEach(function (z) {
      if (lasttime > z && z!=0)
        lasttime=z;
    });
    if (lasttime == 9999999999)
      lasttime=Now;
    if (lasttime-Now<=0)
      document.title="FERTIG - My Free Farm";
    else
      document.title=time2str(lasttime-Now)+" - My Free Farm";
},500);

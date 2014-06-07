// ==UserScript==
// @name           Wurzelimperium - Time 2 Title
// @namespace      Woems
// @description    Zeigt im Titel, wann es wieder was zu tun gibt.
// @include        http://s*.wurzelimperium.de*
// ==/UserScript==

/******** BASE FUNCTIONS ********/
function $(ID) {return document.getElementById(ID)}
function $xs(xpath, rootdir) {return document.evaluate(xpath, rootdir || document, null, 9, null).singleNodeValue;}
function $x(p, context) {
  var i, arr = [], xpr = document.evaluate(p, context || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
function loop(xpath, func, rootdir) {
	xpath = document.evaluate(xpath, rootdir || document, null, 6, null);
	var I = xpath.snapshotLength;
	while(--I>=0) func(xpath.snapshotItem(I));
}
function createElement(type, attributes, append){
  var node = document.createElement(type);
  for (var attr in attributes) if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
  if (append) append.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
function remove(node) {if(node)node.parentNode.removeChild(node);return remove;}
function Interval(func, interval) { func(); window.setInterval(func,interval); }
function Timer(func, interval) { window.setTimer(func,interval); }
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
/********************************/

var loc=document.location.toString().match(/http:\/\/s(.*?)\.wurzelimperium\.de\/(.*?)\.php/);
switch (loc[2]) {
case "garten_map" : do_garten_map(); break;
}

function time2str(time)
{
  var str=time%60+" sec";
  time=time/60;
  if (time>=1)
    str=Math.round(time%60)+" min, "+str;
  time=time/60;
  if (time>=1)
    str=Math.round(time)+" h, "+str;
  return str;
}

function soundplay()
{
  if (!$("player"))
  {
    var player = createElement('div', {'id': 'player', 'style': 'text-align:left;border: 1px solid black; position:absolute; top:2px; left:2px; padding:2px; z-index:1; background-color:white; color:black;'}, document.body);
    player.innerHTML='\
<object height="32" width="84" data="http://emff.sourceforge.net/codegenerator/skins/emff_silk.swf" type="application/x-shockwave-flash">\
  <param value="http://emff.sourceforge.net/codegenerator/skins/emff_silk.swf" name="movie"/>\
  <param value="high" name="quality"/>\
  <param value="#000033" name="bgcolor"/>\
  <param value="src=http://emff.sourceforge.net/codegenerator/test.mp3&amp;autostart=yes" name="FlashVars"/>\
  It seems that you do not have a Flash Plugin. Please install the latest <a href="http://www.macromedia.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash">Flash Player</a>.\
</object>';
  }
}

function soundstop()
{
  if (!$("player"))
  {
    remove($("player")); 
  }
}

function do_garten_map()
{
  var lasttime = 9999999999;
  window.setInterval(function () {
    var Now=Math.round((new Date()).getTime()/1000);
    lasttime = 9999999999;
    unsafeWindow.garten_zeit.forEach(function (z) {
      if (lasttime > z && z!=0)
        lasttime=z;
    });
    if (lasttime == 9999999999)
      lasttime=Now;
    if (lasttime-Now<=0)
    { soundplay(); parent.document.title="FERTIG - Wurzelimperium"; }
    else
    { soundstop(); parent.document.title=time2str(lasttime-Now)+" - Wurzelimperium"; }
  },500);
}

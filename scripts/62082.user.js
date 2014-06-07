// ==UserScript==
// @name           Wurzelimperium - Sort
// @namespace      Woems
// @description    Sortiert die Gl�ser
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
function createElement(type, attributes, base){
  var node = document.createElement(type);
  for (var attr in attributes) if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
  if (base) append.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
function remove(node) {if(node)node.parentNode.removeChild(node);return remove;}
function Interval(func, interval) { func(); window.setInterval(func,interval); }
function Timer(func, interval) { window.setTimer(func,interval); }
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
/********************************/

var loc = document.location; 
var reg = /http:\/\/s(.*?)\.wurzelimperium\.de\/(.*?)\.php/i;
var server = reg.exec(loc)[1];
var page = reg.exec(loc)[2];

switch (page) {
case "main"	  : do_main();break;
case "garten_map" : do_garten_map();break;
case "verkauf_map": do_verkauf_map();break;
default: GM_log(page); break;
}

function swapPos(a, b)
{
  var top=a.style.top;
  var left=a.style.left;
  a.style.top=b.style.top;
  a.style.left=b.style.left;
  b.style.top=top;
  b.style.left=left;
}

function getAnzahl(bottle)
{
  return $x("div[3]/div",bottle)[0].innerHTML;
}

function jetzt()
{
  return new Date().getTime();
}

function getHour(duration)
{
  var endtime=new Date((jetzt()+duration));
  return endtime.getHours();
}

function do_main()
{  
  var top=25;
  var left=22;
  for (var i=0; i<20; i++)
  {
    GM_addStyle('div[pos="'+i+'"] \
                { position: absolute !important; \
                  top: '+top+'px !important; \
                  left: '+left+'px !important; }');
    left+=45;
    if (left > 157) { left=22; top+=75; }
  }
 Interval(function () {
  var bottles=$x("id('rackItems')/div[not(contains(@style,'display: none'))]");
  var bottlesAll=new Array();
  for (var i=0; i<bottles.length; i++)
  {
    var Nr=bottles[i].id.replace(/glass/,"");
    bottlesAll.push({
      id: bottles[i].id,
      nr: Nr,
      wert: getAnzahl(bottles[i]),
      top: bottles[i].style.top,
      left: bottles[i].style.left,
      name: unsafeWindow.rackElement[Nr].image,
      duration: unsafeWindow.rackElement[Nr].duration,
      anz: unsafeWindow.rackElement[Nr].number
    });
  }
  //bottlesAll.sort(function (a,b) { return a.wert - b.wert });
  bottlesAll.sort(function (a,b) { return a.duration - b.duration });
  //bottlesAll.sort(function (a,b) { return (a.wert<200)?-1: (b.wert<200)?1:0 }); // kleiner 200 nach vorne
  //bottlesAll.sort(function (a,b) { return (a.wert<200 && b.wert<200)?a.wert-b.wert: (a.wert<200)?-1: (b.wert<200)?1:a.duration - b.duration }); // kleiner 200 nach vorne
  /*bottlesAll.sort(function (a,b) { return (a.wert<100  && b.wert<100 )? a.wert     - b.wert     : (a.wert<100 )? -1 : (b.wert<100 )? 1 :
                                          (a.wert<1000 && b.wert<1000)? a.duration - b.duration : (a.wert<1000)? -1 : (b.wert<1000)? 1 :
                                          a.duration - b.duration });*/
  //bottlesAll.sort(function (a,b) { return (a.wert<1000 && b.wert<1000)?a.duration - b.duration: (a.wert<1000)?-1: (b.wert<1000)?1:a.duration - b.duration }); // kleiner 200 nach vorne
  //bottlesAll.sort(function (a,b) { var ha=getHour(a.duration); var hao=(ha>8 && ha<10)?1:0;
  //                                 var hb=getHour(b.duration); var hbo=(hb>8 && hb<10)?1:0;
  //                                 return ha-hb; } );
  bottlesAll=bottlesAll.map(function (a) { a.color=(a.wert<100)?"red":(a.wert<1000)?"black":"#AAA"; return a; });
  bottlesAll=bottlesAll.map(function (a) { /*GM_log(a.name+": "+a.duration+" "+getHour(a.duration));*/ a.bgcolor=(getHour(a.duration)>8 && getHour(a.duration)<16)?"#FFB":0; return a; });
  var top=25;
  var left=22;
  for (var i=0; i<bottlesAll.length; i++)
  {
    $(bottlesAll[i].id).setAttribute("pos",i);
    if (bottlesAll[i].color) $("t"+bottlesAll[i].nr).style.color=bottlesAll[i].color;
    if (bottlesAll[i].bgcolor) $("t"+bottlesAll[i].nr).style.backgroundColor=bottlesAll[i].bgcolor;
    left+=45;
    if (left > 157) { left=22; top+=75; }
  }
 },1000);
  /*
  window.setInterval(function () {
    var bottles=$x("id('rackItems')/div");
    var bottlesPos=new Array();
    for (var i=0; i<bottles.length; i++)
      bottlesPos[((bottles[i].style.top.replace(/px/,"")-25)/75*4+(bottles[i].style.left.replace(/px/,"")-22)/45)]=i;
    for (var i=1; i<bottlesPos.length; i++)
      if ( getAnzahl(bottles[bottlesPos[i-1]])*1 > getAnzahl(bottles[bottlesPos[i]])*1 )
      {
        swapPos(bottles[bottlesPos[i-1]],bottles[bottlesPos[i]]);
        var tmp=bottlesPos[i-1];
        bottlesPos[i-1]=bottlesPos[i];
        bottlesPos[i]=tmp;
        //GM_log(bottlesPos+" "+getAnzahl(bottles[bottlesPos[0]])+" "+getAnzahl(bottles[bottlesPos[1]])+" "+getAnzahl(bottles[bottlesPos[3]]));
        i=0;
      }
    for (var i=0; i<bottles.length; i++)
      style(bottles[i]);
  },5000);
  */
}
function do_garten_map()
{
}
function do_verkauf_map()
{
}


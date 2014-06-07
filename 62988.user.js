// ==UserScript==
// @name           Wurzelimperium - Feld aufraeumen
// @namespace      Woems
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
function Timeout(func, interval) { window.setTimeout(func,interval); }  // Timeout(function () {},1000);
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
function onClick(button,func,type) { button.addEventListener(type || "click",function(event){ func(event); event.stopPropagation(); event.preventDefault(); }, true); }
GM_log=function (){}
/********************************/

function LogFeldInfo(i)
{
  GM_log("\n\
"+i+":\n\
 prod("+unsafeWindow.parent.garten.garten_prod[i]+")\n\
 pos("+unsafeWindow.parent.garten.garten_x[i]+"/"+unsafeWindow.parent.garten.garten_y[i]+")\n\
 max("+unsafeWindow.parent.garten.garten_max_x[i]+"/"+unsafeWindow.parent.garten.garten_max_y[i]+")\n\
 name("+unsafeWindow.parent.garten.garten_name[i]+")\n\
 gttpic("+unsafeWindow.parent.garten.garten_gttpic[i]+")\n\
 zeit("+unsafeWindow.parent.garten.garten_zeit[i]+")\n\
 ernte("+unsafeWindow.parent.garten.garten_ernte[i]+")\n\
 wasser("+unsafeWindow.parent.garten.garten_wasser[i]+")\n\
 kath("+unsafeWindow.parent.garten.garten_kategorie[i]+")\n\
 entf("+unsafeWindow.parent.garten.garten_entf[i]+")");
}

var urldata = document.location.toString().match(/http:\/\/s(.*?)\.wurzelimperium\.de\/(.*?)\.php/i);
var server=urldata[1];
var page=urldata[2];

switch (page) {
//case "main"	  : do_main();break;
case "garten_map" : do_garten_map();break;
case "verkauf_map": do_verkauf_map();break;
}

function aufraeumen(id)
{
  LogFeldInfo(id);
  var feld=unsafeWindow.parent.garten.document.getElementById("f"+id);
  feld.setAttribute("onclick","parent.cache_me("+id+", garten_prod["+id+"], garten_kategorie["+id+"] )");
  feld.setAttribute("onmouseover","parent.show_built("+id+",'over');displayMenuTooltip("+id+");");
  feld.setAttribute("onmouseout","parent.show_built("+id+",'out');parent.gclr();");
  window.location.href="javascript: parent.cache_me("+id+","+unsafeWindow.parent.garten.garten_prod[id]+",'"+unsafeWindow.parent.garten.garten_kategorie[id]+"')";
  window.location.href="javascript: parent.raeumeFeld("+id+")";
}

function do_garten_map()
{
  for (var i=1; i<=204; i++) // 1-204
  {
    if (unsafeWindow.garten_kategorie[i]=="u")
    {
      //LogFeldInfo(i);
      $("f"+i).removeAttribute("onclick");
      $("f"+i).removeAttribute("onmouseover");
      $("f"+i).removeAttribute("onmouseout");
    }
  }
}

function do_verkauf_map()
{
  createElement("span",{id:"aufraeumen", class:"link", title:"Unkraut entferner", style:"background: transparent url(http://d3o68bgrbhx8hn.cloudfront.net/pics/verkauf/kunde_6_still.gif) no-repeat scroll left top; position: absolute; z-index: 0; width: 40px; height: 45px; top: 0px; right: 380px;"},$('helfer_all'));
  onClick($("aufraeumen"),function (e) {
    var minGeld=0;
    var geld=parent.document.getElementById("bar").textContent.replace(/ wT/,"").replace(/,/,".");
    
    for (var i=1; i<=204; i++) // 1-204
    {
      if (geld <= minGeld+2.5) { GM_log("Unkraut: "+geld+"<="+(minGeld+2.5)); alert("Nicht genügend Geld vorhanden um das Unkraut zu entfernen"); return; }
      if (unsafeWindow.parent.garten.garten_kategorie[i]=="u" && unsafeWindow.parent.garten.garten_name[i]=="Unkraut") { aufraeumen(i); geld=geld-2.5; }
    }
    for (var i=1; i<=204; i++) // 1-204
    {
      if (geld <= minGeld+50) { GM_log("Stein: "+geld+"<="+(minGeld+50)); alert("Nicht genügend Geld vorhanden um die Steine zu entfernen"); return; }
      if (unsafeWindow.parent.garten.garten_kategorie[i]=="u" && unsafeWindow.parent.garten.garten_name[i]=="Stein") { aufraeumen(i); geld=geld-50; }
    }
    for (var i=1; i<=204; i++) // 1-204
    {
      if (geld <= minGeld+250) { GM_log("Baumstumpf: "+geld+"<="+(minGeld+250)); alert("Nicht genügend Geld vorhanden um Baumstuempfe zu entfernen"); return; }
      if (unsafeWindow.parent.garten.garten_kategorie[i]=="u" && unsafeWindow.parent.garten.garten_name[i]=="Baumstumpf") { aufraeumen(i); geld=geld-250; }
    }
    for (var i=1; i<=204; i++) // 1-204
    {
      if (geld <= minGeld+500) { GM_log("Maulwurf: "+geld+"<="+(minGeld+500)); alert("Nicht genügend Geld vorhanden um den Maulwurf zu entfernen"); return; }
      if (unsafeWindow.parent.garten.garten_kategorie[i]=="u" && unsafeWindow.parent.garten.garten_name[i]=="Maulwurf") { aufraeumen(i); geld=geld-500; }
    }
    alert("Alles entfernt");
  });

}

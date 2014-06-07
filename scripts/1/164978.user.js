// ==UserScript==
// @name           Wurzelimperium - Mehr Zwerge
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

var urldata = document.location.toString().match(/http:\/\/s(.*?)\.wurzelimperium\.de\/(.*?)\.php/i);
var server=urldata[1];
var page=urldata[2];
switch (page) {
//case "main"	  : do_main();break;
case "garten_map" : do_garten_map(); break;
case "verkauf_map": do_verkauf_map();break;
}

function do_garten_map()
{
  for (var rowid=0; rowid<12; rowid++)
  {
    var button = createElement('button', {type: 'button', id: 'g_saehen_'+rowid, nr:rowid, style: 'position:fixed;top:'+(rowid*40+35)+'px;left:2px;width:10px;height:20px;'});
    document.body.appendChild(button);
    button.innerHTML='>';
    button.addEventListener("click",function(e){
      e.target.disabled=true;
      start=e.target.getAttribute('nr')*17+1;
      stop=start+17;
      for (var i=start; i<stop; i++)
      {
        if (unsafeWindow.garten_kategorie[i]=='')
        {
          window.location.href="javascript: parent.cache_me("+i+","+unsafeWindow.garten_prod[i]+",'"+unsafeWindow.garten_kategorie[i]+"')";
         }
      }
      e.target.disabled=false;
    },true); 
  }
}

function do_verkauf_map()
{
  createElement("span",{id:"autogiesszwerg", class:"link", title:"Giesshelfer", style:"background: transparent url(http://d3o68bgrbhx8hn.cloudfront.net/pics/verkauf/kannenzwerg.gif) no-repeat scroll left top; position: absolute; z-index: 0; width: 25px; height: 45px; top: 0px; right: 230px;"},$('helfer_all'));
  onClick($("autogiesszwerg"),function (e) {
    //window.location.href="javascript: parent.selectMode(2,true,top.selected);";
    window.location.href="javascript: parent.selectMode(2,true,parent.selected);";
    for (var i=1; i<unsafeWindow.parent.garten.garten_name.length; i++)
    {
      if (unsafeWindow.parent.garten.garten_kategorie[i]=="v" && unsafeWindow.parent.garten.garten_wasser[i]<(new Date()).getTime()/1000)
      {
        window.location.href="javascript: parent.show_built("+i+",'over');";
        window.location.href="javascript: displayMenuTooltip("+i+");";
        window.location.href="javascript: parent.cache_me("+i+","+unsafeWindow.parent.garten.garten_prod[i]+",'"+unsafeWindow.parent.garten.garten_kategorie[i]+"')";
        window.location.href="javascript: parent.show_built("+i+",'out');";
        window.location.href="javascript: parent.gclr();";
      }
    }
  });
  createElement("span",{id:"autopflanzzwerg", class:"link", title:"Pflanzhelfer", style:"background: transparent url(http://d3o68bgrbhx8hn.cloudfront.net/pics/verkauf/kunde_4_still.gif) no-repeat scroll left top; position: absolute; z-index: 0; width: 33px; height: 45px; top: 0px; right: 330px;"},$('helfer_all'));
  onClick($("autopflanzzwerg"),function (e) {
    window.location.href="javascript: parent.selectMode(0,true,parent.selected);";
     var list=new Array();
    for (var i=1; i<unsafeWindow.parent.garten.garten_name.length; i++)
      if (unsafeWindow.parent.garten.garten_kategorie[i]=="")
        list.push(i);
    var len=prompt("Anzahl: ",list.length);
    for (var i=0;i<len;i++){
      window.setTimeout(function () {
        if (list) {
          var j=list.shift();
          if (j && unsafeWindow.parent.garten.garten_kategorie[j]==''){
            window.location.href="javascript: parent.show_built("+j+",'over');";
            window.location.href="javascript: displayMenuTooltip("+j+");";
            window.location.href="javascript: parent.cache_me("+j+","+unsafeWindow.parent.garten.garten_prod[j]+",'"+unsafeWindow.parent.garten.garten_kategorie[j]+"')";
            window.location.href="javascript: parent.show_built("+j+",'out');";
            window.location.href="javascript: parent.gclr();";
          }
        }
      },100*i);
    }  });
}

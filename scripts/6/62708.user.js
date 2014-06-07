// ==UserScript==
// @name           MyFreeFarm - Autologin
// @namespace      Woems
// @include        http://*myfreefarm.de/*
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
function Timeout(func, interval) { window.setTimeout(func,interval); } // Timeout(function (){},1000);
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
function onClick(button,func,type) { button.addEventListener(type || "click",function(event){ func(event); event.stopPropagation(); event.preventDefault(); }, true); }
GM_log=function (){}
/********************************/

//$("loginbubble").onclick
switch (window.location.pathname)
{
  case '/':
    if (window.location.search=="")
      Timeout(function (){
        document.location.href='http://www.myfreefarm.de/login.php?start=1';
      },30*1000);
    else
      alert(window.location.search);
    break;
  case '/login.php':
    var server=10;
    //$x("//select[@name='server']").forEach(function (s) { s.selectedIndex=server-1; });
    $x("//select[@name='server']")[0].selectedIndex=server-1;
    $x("//select[@name='server']")[1].selectedIndex=server-1;
    Timeout(function (){
      $("submitlogin").click();
    },30*1000);
    break;
  case '/main.php':
    unsafeWindow.specialZoneFieldHandler(1);
    break;
  default:
    alert(window.location.pathname);
    break;
}

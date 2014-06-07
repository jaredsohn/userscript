// ==UserScript==
// @name           OTR - Weasel
// @namespace      Woems
// @include        http://www.onlinetvrecorder.com/buyclicks/weasel.php*
// @include        http://www.onlinetvrecorder.com/buyclicks/bcbf.php*
// @include        http://www.onlinetvrecorder.com/?aktion=click_confirmation
// @include        http://www.onlinetvrecorder.com/
// @include        *
// ==/UserScript==

/******** BASE FUNCTIONS ********/
function $(ID) {return document.getElementById(ID)}
// XPath
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
// Edit Nodes
function createElement(type, attributes, append){
  var node = document.createElement(type);
  for (var attr in attributes) if (attributes.hasOwnProperty(attr)) try { node[attr]=attributes[attr]; } catch(e) { node.setAttribute(attr, attributes[attr]); }
  if (append) append.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
function remove(node) {if(node)node.parentNode.removeChild(node);return remove;}
function insertAfter(newNode, node) { return node.parentNode.insertBefore(newNode, node.nextSibling); }
function insertBefore(newNode, node) { return node.parentNode.insertBefore(newNode, node); }
function onClick(button,func,type) { button.addEventListener(type || "click",function(event){ func(event.target,event); event.stopPropagation(); event.preventDefault(); }, true); }
// Position
function PosX(Node) { var ONL=Node.offsetLeft; var P = Node.offsetParent; while (P) { ONL+=P.offsetLeft; P = P.offsetParent; } return ONL; }
function PosY(Node) { var ONL=Node.offsetTop; var P = Node.offsetParent; while (P) { ONL+=P.offsetTop; P = P.offsetParent; } return ONL; }
function PosXY(obj) { var p = { x:0, y:0 }; do { p.x += obj.offsetLeft; p.y += obj.offsetTop; } while (obj = obj.offsetParent); return p; }
// Timer
function Interval(func, interval) { func(); window.setInterval(func,interval); }
function Timeout(func, interval) { window.setTimeout(func,interval); }  // Timeout(function () {},1000);
// Save
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
// XHTML
function get(url, cb) { GM_xmlhttpRequest({ method: "GET", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } });}
function head(url, cb) { GM_xmlhttpRequest({ method: "HEAD", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } }); }
// Text
function trim(text) { return text.replace(/(^\s*|\s*$)/g,""); }
// Array
function uniq(array) { var last=""; return array.filter(function (e) { if (e!=last && e!='') { last=e; return true; } else { last=e; return false; } }); }
function Object2HTMLTable(obj) { var rows=""; for (var i in obj) rows+="<tr><td><b>"+i+":</b></td><td>"+obj[i]+"</td></tr>"; return "<table>"+rows+"</table>"; }
function aa(obj) { alert(uneval(obj)); }
function ga(obj) { GM_log(uneval(obj)); }
function getParam(key) { var a=location.search.match(/([^?=&]+)=([^?=&]+)/g); var r={}; for (var i in a) if (a.hasOwnProperty(i)) { var m=a[i].match(/([^?=&]+)=([^?=&]+)/); r[m[1]]=m[2]; } return (key)?r[key]:r; }
function getHost() { return location.host; } // hash, host, hostname, href, pathname, port, protocol, search
//GM_log=function (){}
/********************************/

runtimer();

Timeout(function () {
  if (location.host=="www.onlinetvrecorder.com")
  switch (location.pathname)
  {
    case "/buyclicks/weasel.php": weasel(); break;
    case "/buyclicks/bcbf.php": werbeseiten(); break;
    case "/buyclicks/adbrite.php": break; // Keine Klickbare Werbung mehr
    case "/buyclicks/newrunningcampaigns_with_adult.php": GM_openInTab("http://www.onlinetvrecorder.com/buyclicks/weasel.php"); break;
    case "/": case "/index.php": startseite(); break;
    default: findweasel(); break;
    //default: alert("OTR - Weasel: "+location.pathname); break;
  }
}, 10000);

function runtimer()
{
  Interval(function () {
    var day=new Date().getDate();
    if (GM_getValue("Day",0)!=day)
    {
      GM_setValue("Day",day);
      GM_openInTab("http://www.onlinetvrecorder.com");
    }
  },12*60*60*1000);
}

function startseite()
{
  var JaButton=$xs("id('container')//td[contains(text(),'Wiesel')]/a[text()='Ja']");
  if (JaButton) createElement("input",{ type:"button", onClick:JaButton.getAttribute("onclick"), style:"display:none" }, JaButton).click();
}

function weasel()
{
 if (!$("warning") || $("warning").textContent.indexOf("Sie können noch 0 Banner anklicken.")==-1)
 {
  Interval(function () {
    var Banner=$x("id('weaselcontent')//div[@onmouseup][img]");
    GM_log("Anz Banner: "+Banner.length);
    if (Banner[0])
    {
      var link1=Banner[0].getAttribute("onmouseup");
      var ow=link1.match(/openbcbfwindow\('([^']*)','([^']*)','([^']*)','([^']*)','([^']*)','([^']*)','([^']*)','([^']*)'\)/);
      unsafeWindow.openbcbfwindow(ow[1],ow[2],ow[3],ow[4],ow[5],ow[6],ow[7],ow[8]);
      unsafeWindow.setCSession();
    }
  }, 10000);
 } else {
  location.href="http://www.onlinetvrecorder.com/index.php";
 }
}

function werbeseiten()
{
  Timeout(function () { window.close(); location.href="about:blank"; },10000);
}



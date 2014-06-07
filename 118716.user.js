// ==UserScript==
// @name           kgforum
// @namespace      Woems
// @description    Verbesserungen
// @include        http://www.kgforum.org*
// ==/UserScript==

// ==UserScript==
// @name           Funktionssammlung
// @namespace      Woems
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

var param=location.pathname.match(/\/([a-z]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+))?)?)?)?)?/);
// http://www.kgforum.org/display_5_2407_85377_42_52.html
// http://www.kgforum.org/threads_5_2407.html

switch(param[1])
{
  case 'threads': threads(); break;
  case 'display': display(); break;
  default: alert('Parameter 1 unbekannt: '+uneval(param)); break;
} // switch(param[1])

function threads() // Uebersicht über alle Treads
{
} // threads()

function display() // Einzelner Tread mit den Beitraegen der User
{
  $xs("/html/body/center[2]").id="wContent";
  $xs("id('wContent')/table/tbody/tr/td/table[2]").id='wTread';

  var Titel=$xs("//font[img[@src='http://www2.forennet.org/images/theme1/folder-3.gif']]").lastChild.textContent;
  document.title="KG-Forum - "+Titel.replace(/^\s*|\s*$/g,"");

  if (location.hash=="") $("wContent").scrollIntoView()
  $x("id('wTread')/tbody/tr/td[@rowspan=3]").forEach(function (ZelleAutor,i) {
    var Name=ZelleAutor.firstChild.name;
    var AktuellerBeitrag="display_"+param[2]+"_"+param[3]+"_"+param[4]+"_"+(param[6]*1+i)+"_"+(param[6]*1+i);
    var Links=createElement('font', { size:1 }, ZelleAutor);

    createElement('br', {  }, Links);
    createElement('a', { href:AktuellerBeitrag+".html#"+Name, innerHTML:"[ Beitrag nach Oben ]" }, Links);

    createElement('br', {  }, Links);
    createElement('a', { href:"display_"+param[2]+"_"+param[3]+"_"+param[4]+"_"+param[5]+"_"+(param[6]*1-1)+".html", innerHTML:"[ zurück ]" }, Links);
    createElement('a', { href:"display_"+param[2]+"_"+param[3]+"_"+param[4]+"_"+param[5]+"_"+(param[6]*1+1)+".html", innerHTML:"[ weiter ]" }, Links);

    createElement('br', {  }, Links);
    createElement('br', {  }, Links);
    var next=createElement('a', { href:"#", name:"display_"+param[2]+"_"+param[3]+"_"+param[4]+"_"+(param[6]*1-1)+"_"+(param[6]*1-1), innerHTML:"[ Darüber Sichtbar ]" }, Links);
    next.addEventListener("click",function(event){
      var ausgeblendet=deserialize("ausgeblendet",{});
      if (!ausgeblendet[event.target.name]) alert(event.target.name);
      ausgeblendet[event.target.name]=false;
      serialize("ausgeblendet",ausgeblendet);
      event.stopPropagation();
      event.preventDefault();
    }, true);
    createElement('br', {  }, Links);
    var prev=createElement('a', { href:"#", name:"display_"+param[2]+"_"+param[3]+"_"+param[4]+"_"+(param[6]*1+1)+"_"+(param[6]*1+1), innerHTML:"[ Darunter Sichtbar ]" }, Links);
    prev.addEventListener("click",function(event){
      var ausgeblendet=deserialize("ausgeblendet",{});
      if (!ausgeblendet[event.target.name]) alert(event.target.name);
      ausgeblendet[event.target.name]=false;
      serialize("ausgeblendet",ausgeblendet);
      event.stopPropagation();
      event.preventDefault();
    }, true);

    createElement('br', {  }, Links);
    createElement('br', {  }, Links);
    var hide=createElement('a', { href:AktuellerBeitrag+".html", innerHTML:"[ ausblenden ]" }, Links);
    hide.addEventListener("click",function(event){
      $x('../../.. | ../../../following-sibling::tr[1] | ../../../following-sibling::tr[2]',event.target).forEach(function (e) {
        e.style.display="none"
      });

      var ausgeblendet=deserialize("ausgeblendet",{});
      ausgeblendet[AktuellerBeitrag]=true;
      serialize("ausgeblendet",ausgeblendet);

      event.stopPropagation();
      event.preventDefault();
    }, true);
    var ausgeblendet=deserialize("ausgeblendet",{});
    if (ausgeblendet[AktuellerBeitrag])
      $x('.. | ../following-sibling::tr[1] | ../following-sibling::tr[2]',ZelleAutor).forEach(function (e) {
        e.style.display="none"
      });
  });
} // display()



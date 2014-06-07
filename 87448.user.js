// ==UserScript==
// @name           Crazy Heels - Detail Uebersicht
// @namespace      Woems
// @include        http://www.crazy-heels.de*
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
  for (var attr in attributes)
    try { node[attr]=attributes[attr]; }
    catch(e) { node.setAttribute(attr, attributes[attr]); }
  if (append) append.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
function text(t) { return document.createTextNode(t); }
function remove(node) {if(node)node.parentNode.removeChild(node);return remove;}
function insertAfter(newNode, node) { return node.parentNode.insertBefore(newNode, node.nextSibling); }
function insertBefore(newNode, node) { return node.parentNode.insertBefore(newNode, node); }
function onClick(button,func,type) { button.addEventListener(type || "click",function(event){ func(event.target,event); event.stopPropagation(); event.preventDefault(); }, true); }
// Position
function PosX(Node) { var ONL=Node.offsetLeft; var P = Node.offsetParent; while (P) { ONL+=P.offsetLeft; P = P.offsetParent; } return ONL; }
function PosY(Node) { var ONL=Node.offsetTop; var P = Node.offsetParent; while (P) { ONL+=P.offsetTop; P = P.offsetParent; } return ONL; }
// Timer
function Interval(func, interval) { func(); window.setInterval(func,interval); }
function Timeout(func, interval) { window.setTimeout(func,interval); }  // Timeout(function () {},1000);
// Save
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
// XHTML
function get(url, cb) { GM_xmlhttpRequest({ method: "GET", url: url, onload: function(xhr) { cb(url, xhr.responseText, xhr.responseHeaders); } });}
function head(url, cb) { GM_xmlhttpRequest({ method: "HEAD", url: url, onload: function(xhr) { cb(url, xhr.responseText, xhr.responseHeaders); } }); }
// Text
function trim(text) { return text.replace(/(^\s*|\s*$)/g,""); }
// Array
function uniq(array) { var last=""; return array.filter(function (e) { if (e!=last && e!='') { last=e; return true; } else { last=e; return false; } }); }
function Object2HTMLTable(obj) { var rows=""; for (var i in obj) rows+="<tr><td><b>"+i+":</b></td><td>"+obj[i]+"</td></tr>"; return "<table>"+rows+"</table>"; }
//GM_log=function (){}
/********************************/

var loc=location.href.match(/\/shop\/([A-Za-z\_]+).php(.*)/);
// http://www.crazy-heels.de/shop/product_info.php/info/p9415_TABOO-708G.html
// http://www.crazy-heels.de/shop/index.php/cat/c14_bis-20-cm-Absatz.html/page/2

if (!loc[1]) alert("loc: "+loc+"\n"+uneval(loc));
switch (loc[1])
{
  case "index": Index(); break;
  case "product_info": Product(); break;
  default: p=deserialize("page",{}); p[loc[1]]=1; serialize("page",p); break;
  //default: alert("Datailuebersicht: "+uneval(loc)); break;
}

function Index()
{
  $xs("//table[@class='hauptrahmen']").id="wlist";
  var data=deserialize("data",{});
  $x("id('wlist')//a[img]").forEach(function (f) {
    var tmp=data[f.href];
    if (tmp)
    {
      var text=createElement("div",{ innerHTML:"Size: "+tmp["size"] });
      insertBefore(text,$xs("following::td[2]/text()",f));
    }
  });
}

function Product()
{
  // id: cart_quantity=product
  $xs("id('cart_quantity')//h1").id="wtitel";
  $xs("id('cart_quantity')//img[contains(@src,'product_images/popup_images')]").id="wpicture";
  $xs("id('cart_quantity')/table[1]//table[2]//tr[1]/td[1]/table//table//table").id="wsize";
  $xs("id('cart_quantity')//span[@class='priceproduct']/strong").id="wpreis";

  var data=deserialize("data",{});
  data[location.href]={
    titel:       $("wtitel").textContent,
    picture_src: $("wpicture").src,
    size:        $x("id('wsize')//tr/td/font").map(function (e) {
                   return (
                     (trim(e.textContent)=="45")?"<font color=green>"+trim(e.textContent)+"</font>":
                     (e.parentNode.getAttribute("bgcolor")=="#cc0000")?
                         "<font color=#777>"+trim(e.textContent)+"</font>":
                         trim(e.textContent)
                   );
                 }).join("|"),
    preis:       $("wpreis").textContent
  };
  serialize("data",data);
  //alert(uneval(data));
}

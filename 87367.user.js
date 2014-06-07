// ==UserScript==
// @name           Crazy Heels - Product Save
// @namespace      Woems
// @include        http://www.crazy-heels.de/shop/product_info.php*
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
function text(text,append) { var node=document.createTextNode(text); if (append) append.appendChild(node); return node; }
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

// id: cart_quantity=product
$xs("id('cart_quantity')//h1").id="wtitel";
$xs("id('cart_quantity')//img[contains(@src,'product_images/popup_images')]").id="wpicture";
//$xs("id('cart_quantity')/table[1]//table[2]//tr[1]/td[1]/table//table//table").id="wsize";
$xs("id('cart_quantity')//span[@class='priceproduct']/strong").id="wpreis";


//var addbutton=createElement("a",{ textContent:"+", style:"padding-left:10px" });
//insertAfter(addbutton,$("wtitel"));
//addbutton.addEventListener("click",function (e) {
$('wtitel').addEventListener("click",function (e) {
  var tmp={
            titel:    $('wtitel').textContent,
            picture:  $('wpicture').src,
            url:      location.href,
            popup:    $('wpicture').parentNode.href,
            preis:    $('wpreis').textContent.replace("Preis: ",""),
            preisnum: $('wpreis').textContent.replace(/.* ([0-9]+),([0-9]{2}) EUR.*/,"$1.$2")*1
          };
  var data=deserialize("data",[]);
  data.push(tmp);
  //alert(uneval(data));
  serialize("data",data);
  alert("'"+$('wtitel').textContent+"' gespeichert");
},true);

createElement("br",{},$('cart_quantity'));

head_titel=createElement("table",{ id: "gespeicherte_Artikel", cellspacing:"0", cellpadding:"0", border:"0", width:"100%" },$('cart_quantity'));
head_row=createElement("tr",{},head_titel);
head_cell=createElement("td",{ style:"border-bottom: 1px solid rgb(204, 204, 204); border-color: rgb(204, 204, 204);", className:"main", innerHTML:"<strong>Gespeicherte Artikel:</strong>" },head_row);

createElement("br",{},$('cart_quantity'));

contentborder_titel=createElement("table",{ cellspacing:"0", cellpadding:"0", border:"0", width:"100%" },$('cart_quantity'));
contentborder_row=createElement("tr",{},contentborder_titel);
contentborder_cell=createElement("td",{},contentborder_row); 
contentborder_div=createElement("div",{ align:"center"}, contentborder_cell); 

content_titel=createElement("table",{ cellspacing:"0", cellpadding:"0", border:"0", align:"left", width:"100%" },contentborder_div);
content_row=createElement("tr",{},content_titel);
content_cell=createElement("td",{ align:"left", valign:"top", className:"main" },content_row); 

var data=deserialize("data",[]);
data.sort(function (a,b) {
  //GM_log("A: "+uneval(a)+" / B: "+uneval(b));
  //GM_log("A: "+a.preis.replace(/.* ([0-9]+),([0-9]{2}) EUR.*/,"$1.$2")*1+" / B: "+b.preis.replace(/.* ([0-9]+),([0-9]{2}) EUR.*/,"$1.$2")*1);
  //GM_log("A: "+a.preis*1+" / B: "+b.preis*1);
  return a.preis.replace(/.* ([0-9]+),([0-9]{2}) EUR.*/,"$1.$2")*1 > b.preis.replace(/.* ([0-9]+),([0-9]{2}) EUR.*/,"$1.$2")*1;
  //return a.titel<b.titel;
});
object_titel=createElement("table",{ cellspacing:"0", cellpadding:"0", border:"0", width:"50" },content_cell);
var line=-1;
for (i in data)
{
  if (line!=Math.floor(i/4+1))
  {
    object_row=createElement("tr",{},object_titel);
    line=Math.floor(i/4+1);
  }
  object_cell=createElement("td",{  align:"center", className:"main" },object_row); 
  object_link=createElement("a",{ href: data[i]["popup"] || data[i]["url"] },object_cell);
  object_image=createElement("img",{ src: data[i]["picture"].replace(/popup_images/,"thumbnail_images"), border:"0", vspace:"2", hspace:"1" },object_link);
  object_br=createElement("br",{ },object_cell);
  object_title=createElement("a",{ href:data[i]["url"], style:"font-weight:bold", textContent:data[i]["titel"] },object_cell); 
  object_br=createElement("br",{ },object_cell);
  if (data[i]["preis"]) text(data[i]["preis"],object_cell);
  object_br=createElement("br",{ },object_cell);
  object_del=createElement("a",{ href:data[i]["url"], id:i, textContent:"löschen" },object_cell);
  object_del.addEventListener("click",function (e) {
    var data=deserialize("data",[]);
    var newdata=new Array();
    var j=0;
    for (var i=0; i<data.length; i++)
      if (data[i]["url"] != e.target.href || j++ != 0)
        newdata.push(data[i]);
    //data.splice(e.target.id,1);
    //alert("Vorher: "+data.length+" / Nachher: "+newdata.length);
    serialize("data",newdata);
    e.target.parentNode.style.color="gray";
    e.stopPropagation();
    e.preventDefault();
  },false);
}
/*
<table cellspacing="0" cellpadding="0" border="0" width="100%">
  <tbody>
    <tr>
      <td>
        <div align="center">
          <table cellspacing="0" cellpadding="0" border="0" align="left" width="50">
            <tbody>
              <tr>

                <td align="left" valign="top" class="main">
                  <table cellspacing="0" cellpadding="0" border="0" width="50">
                    <tbody>
                      <tr>
                        <td align="center" class="main">
                          <a href="http://www.crazy-heels.de/shop/product_info.php/info/p237_SEDUCE-2033.html">
                            <img border="0" vspace="2" hspace="1" alt="SEDUCE-2033" src="images/product_images/thumbnail_images/237_0.jpg">
                          </a>
                          <br>
                          <b>SEDUCE-2033</b>
                          <br>
                          79,00 EUR
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>

                <td align="left" valign="top" class="main">
                  <table cellspacing="0" cellpadding="0" border="0" width="50">
                    <tbody>
                      <tr>
										<td align="center" class="main">
										<a href="http://www.crazy-heels.de/shop/product_info.php/info/p3374_SEDUCE-1033---Lack-Schwarz.html"><img border="0" vspace="2" hspace="1" alt="SEDUCE-1033 - Lack Schwarz" src="images/product_images/thumbnail_images/3374_0.jpg"></a><br><b>SEDUCE-1033 - Lack Schwarz</b><br> 59,00 EUR										</td>
									</tr>
								</tbody></table>
							</td>
													 
														<td align="left" valign="top" class="main">
								<table cellspacing="0" cellpadding="0" border="0" width="50">
									<tbody><tr>
										<td align="center" class="main">
										<a href="http://www.crazy-heels.de/shop/product_info.php/info/p8259_DOMINA-3000---PU-Schwarz.html"><img border="0" vspace="2" hspace="1" alt="DOMINA-3000 - PU Schwarz" src="images/product_images/thumbnail_images/8259_0.jpg" style="width: 109px; height: 110px;"></a><br><b>DOMINA-3000 - PU Schwarz</b><br> 69,00 EUR										</td>
									</tr>
								</tbody></table>
							</td>
																		</tr>
				</tbody></table>
			</div>
		</td>
	</tr>
</tbody></table>*/


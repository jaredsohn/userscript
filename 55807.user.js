// ==UserScript==
// @name           eJapan Orders
// @version        0.3
// @namespace      http://www.erepublik.com/en/citizen/profile/1455034
// @description    Retrieves the military orders for the eJapanese army and shows them on your eRepublik homepage.
// @include        http://www.erepublik.com/*
// ==/UserScript==

var ordersurl = "http://nipponblog.net/forum/viewtopic.php?f=8&t=566";

var selectedunit = GM_getValue("defaultunit");
if (selectedunit==undefined) selectedunit = 1;
var units = ["JIA", "A", "B", "C", "D"];
var colours = ["#FFDDCC", "#CCFFCC", "#FFCCCC", "#EEEEFF", "#FFFFCC"];
var ordersarr = [];

function tabclick(ID)
{
 document.getElementById("orderstabs").getElementsByClassName("on")[0].className = "";
 document.getElementById(ID).getElementsByTagName("a")[0].className = "on";
 x = parseInt(ID.substr(4));
 GM_setValue("defaultunit", x)
 selectedunit = x;
 if(ordersarr[x]!=undefined)document.getElementById("ordersdiv").innerHTML = ordersarr[x];
 document.getElementById("ordersdiv").style.backgroundColor = colours[x];
}

function main()
{
 box = document.createElement("div");
 box.className = "box";
 box.id = "ordersbox";

 title = document.createElement("div");
 title.className = "title";
 title.innerHTML = '<embed class="sIFR-flash" width="250" height="28" src="/flash/delicious.swf" quality="best" flashvars="txt=Orders&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" style="width: 250px; height: 28px;"/>'
 box.appendChild(title);

 tabs = document.createElement("ul");
 tabs.className = "tabs"; //pma pa so pnf pmc
 tabs.id = "orderstabs";

 for (x in units)
 { 
  newtab = document.createElement("li");
  newtab.id = "tab_" + x;
  if (x==4) newtab.className = "last";
  newlink = document.createElement("a");
  newlink.innerHTML = "<span>" + units[x] + "</span>";
  newlink.href = "#";
  if (x==selectedunit) newlink.className = "on";
  newtab.addEventListener("click", function(){tabclick(this.id);}, false);
  newtab.appendChild(newlink);
  tabs.appendChild(newtab);
 }

 box.appendChild(tabs);

 ordersdiv = document.createElement("div");
 ordersdiv.innerHTML = (ordersarr[selectedunit]?ordersarr[selectedunit]:"Loading orders...");
 ordersdiv.id = "ordersdiv";
 ordersdiv.style.backgroundColor = colours[selectedunit];
 ordersdiv.style.cssFloat = "left";
 ordersdiv.style.padding = "10px";
 ordersdiv.style.width = "313px";
 ordersdiv.style.fontSize = "14px";
 box.appendChild(ordersdiv);

 shouts = document.getElementById("shouts");
 shouts.parentNode.insertBefore(box,shouts);

 GM_addStyle("#orderstabs {margin: 0px;} #orderstabs li a {padding-left:20px;} #orderstabs li a span {padding-right:20px;padding-left:0px;}#content #ordersbox.box .title {border-bottom:0 none;margin-bottom:0;}")

}

if(document.getElementById("shouts"))
{
 GM_xmlhttpRequest({
  method: "GET",
  url: ordersurl,
  onload:function(response){
   orders = response.responseText;
   for (x in units)
   {
    var unit = units[x];
    start = orders.indexOf("&lt;" + unit + "&gt;");
    end = orders.indexOf("&lt;/" + unit + "&gt;");
    if (start==-1||end==-1) ordersarr[x] = "Could not retrieve " + unit + " orders.";
    else ordersarr[x] = orders.substring(start + ("&lt;" + unit + "&gt;").length,end);
   }
   tabclick("tab_" + selectedunit);
  }
 });
 
 window.addEventListener("load", main, false);
}
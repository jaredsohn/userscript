// ==UserScript==
// @name           Genç Lazokrat Emirleri
// @version        1
// @releasedate   20101207
// @include        http://www.erepublik.com/*
// ==/UserScript==


CurrentReleaseDate = "20101207";

var ordersurl = "http://bit.ly/lazokrasi";

var selectedunit = GM_getValue("defaultunit");
if (selectedunit==undefined) selectedunit = 1;
var units = ["GençLazokrat", "Duyurular"];
var colours = ["#ffffff ", "#ffffff "];
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
 title.innerHTML = '<embed class="sIFR-flash" width="250" height="28" src="/flash/delicious.swf" quality="best" flashvars="txt=GençLazokrat&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" style="width: 250px; height: 28px;"/>'
 box.appendChild(title);

 tabs = document.createElement("ul");
 tabs.className = "tabs"; 
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
 ordersdiv.innerHTML = (ordersarr[selectedunit]?ordersarr[selectedunit]:"Emirler Güncelleniyor");
 ordersdiv.id = "ordersdiv";
 ordersdiv.style.backgroundColor = colours[selectedunit];
 ordersdiv.style.cssFloat = "left";
 ordersdiv.style.padding = "10px";
 ordersdiv.style.width = "313px";
 ordersdiv.style.fontSize = "14px";
 box.appendChild(ordersdiv);

 shouts = document.getElementById("shouts");
 shouts.parentNode.insertBefore(box,shouts);

 GM_addStyle("#orderstabs {margin: 0px;} #orderstabs li a {padding-left:15px;} #orderstabs li a span {padding-right:15px;padding-left:0px;}#content #ordersbox.box .title {border-bottom:0 none;margin-bottom:0;}")

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

var updateCheck = function (){
	if (window.location.href == "http://www.erepublik.com/en") 
	{ 
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/87185.meta.js',
	
			onload:function(updateDetails){
				var updateText = updateDetails.responseText.match(/@releasedate\s*\d+/);
				if (updateText[0].match(/\d+/) > CurrentReleaseDate) {
					var updatehere = '<br><hr><a href="http://userscripts.org/scripts/show/87185" target="_blank">';
					var updatehere = updatehere +'<center><strong>Güncelleme<br />Gerekli!</strong></center></a><hr>';
					document.getElementById("UpdateYesNo").innerHTML = updatehere;
				}
			}
		});
	}
	else { return true };
}
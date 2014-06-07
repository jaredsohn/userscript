// ==UserScript==
// @name           ePhilippines Orders
// @version        0.5
// @namespace      http://www.erepublik.com/en/organization/1411204
// @description    Retrieves the military orders for the ePhilippines army and shows them on your eRepublik homepage.
// @include        http://www.erepublik.com/*
// ==/UserScript==

function main()
{
 box = document.createElement("div");
 box.className = "box";
 
 ordersdiv = document.createElement("div");
 ordersdiv.id = "ordersdiv";
 ordersdiv.style.cssFloat = "left";
 ordersdiv.style.padding = "4px 8px";
 ordersdiv.style.width = "313px";
 ordersdiv.innerHTML = "Loading...";
 
 title = document.createElement("div");
 title.className = "title";
 title.innerHTML = '<embed class="sIFR-flash" width="250" height="28" src="/flash/delicious.swf" quality="best" flashvars="txt=Orders&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" style="width: 250px; height: 28px;"/>'
 title.style.borderBottomWidth = "0px";
 title.style.marginBottom = "0px";
 
 box.appendChild(title);
 box.appendChild(ordersdiv);
 
 shouts = document.getElementById("shouts");
 shouts.parentNode.insertBefore(box,shouts);

 citizenID = document.getElementsByClassName("avatarholder")[0].getElementsByTagName("a")[0].href.match(/\d+/);

 var script = document.createElement("script");
 script.type = "application/javascript";
 script.src = "http://ephilippines.comlu.com/military/gmorders.php?id="+citizenID;

 document.body.appendChild(script);
}

if(document.getElementById("shouts"))
{
 window.addEventListener("load", main, false);
}
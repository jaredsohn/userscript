// ==UserScript== 
// @name Universo Ninja [Naruto] 
// @namespace Naruto
// @description Script para la comunidad Universo Ninja [Naruto]
// @include *taringa.net/* 
// @exclude *http://www.taringa.net/comunidades/universoninja/* 
// ==/UserScript== 

function byClass(clsName, tag) { 
var arrayElements = new Array(); 
if (tag == null){ tag="*";} 
var elements = document.getElementsByTagName(tag); 

for(var i = 0;i < elements.length;i++) 
{ 
if(elements.className.indexOf(" ";) >= 0) 
{ 
var classes = elements.className.split(" ";); 
for(var j = 0;j < classes.length;j++) 
{ 
if(classes[j] == clsName) 
arrayElements.push(elements); 
} 
} 
else if(elements.className == clsName) 
arrayElements.push(elements); 
} 

for (element in arrayElements) 
{ 
return arrayElements[element]; 
} 
} 

byClass('menuTabs').innerHTML += "<li id="tabbedWTF" class="tabbed">n <a href="http://www.taringa.net/comunidades/universoninja/" onclick="menu('Universo Ninja [Naruto] ', this.href);return false;" title="Ir a la comunidad!">Universo Ninja [Naruto] <img src=n"" alt="" /></a>n</li>"; 

var ancho=200; 


var estiloCuadrito="width:"+ancho+"px;background-color:white;position:fixed;left:0px;top:0px;border:1px solid #40BF00;padding:0px;-moz-border-radius:5px;" 
var div=document.createElement("div";); 

var con; 
function verPost(url) 
{ 
//alert(url); 
con=new XMLHttpRequest(); 
con.onreadystatechange = procesarEventos; 
//con.overrideMimeType("text/xml;)" 
con.open('GET',url, true); 
con.send(null); 
} 

function procesarEventos() 
{ 
if(con.readyState == 4) 
{ 
var ndiv=document.createElement("div";); 
ndiv.innerHTML=con.responseText; 
var autor=""; 
var texto=""; 
var spanes=ndiv.getElementsByTagName("span";); 
if(spanes.length>0) 
{ 
for(x=0;x<spanes.length;x++){ 
if(spanes[x].getAttribute("property";)=="dc:content";) 
{ 
texto=spanes[x].textContent.substr(0,200); 
} 
if(spanes[x].getAttribute("class";)=="given-name";) 
autor=spanes[x].textContent; 
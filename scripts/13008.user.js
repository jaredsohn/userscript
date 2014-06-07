// ==UserScript==
// @name           SellHelp
// @namespace      Test
// @include        http://www.gaiaonline.com/marketplace/mystore/sell/?item_id=*&item_param=*
// ==/UserScript==
var a,b,curprice,minprice,c;

function a1()
{
var a=document.forms.namedItem("sellform");
a.elements.namedItem("buy_now_price").value=a.elements.namedItem("per_price").value*a.elements.namedItem("item_param").value;
}

function a2()
{
var a=document.forms.namedItem("sellform");
a.elements.namedItem("per_price").value=(a.elements.namedItem("buy_now_price").value/a.elements.namedItem("item_param").value).toFixed(2);
}

a=document.getElementById('vend_detail');
var curitem=a.innerHTML.match(/<h1.*>.*<\/h1>/)+'';
curitem=curitem.match(/[a-zA-Z 0-9]+(?=<)/);
a=document.getElementById('transactionWindowInfoTopLeft');
var avgprice=a.innerHTML.match(/ [0-9.,]+(?=g)/)+'';
avgprice=avgprice.replace(',','')+'';
avgprice=avgprice.match(/[0-9.]+/);
if (curitem=='Yellow Kitchen Clock1') minprice=20;
if (!minprice) minprice=Math.ceil(avgprice);
a=document.forms.namedItem("sellform");
a.elements.namedItem("vend_type").value=3;
a.elements.namedItem("starting_bid").disabled=true;
a.elements.namedItem("increment").disabled=true;
a.elements.namedItem("starting_bid").disabled=true; 
if (a.elements.namedItem("item_param").type!='hidden')
{
a.elements.namedItem("buy_now_price").value=minprice*a.elements.namedItem("item_param").value;
a.elements.namedItem("item_param").addEventListener('keyup',a1,true);
a.elements.namedItem("buy_now_price").addEventListener('keyup',a2,true);
b=document.getElementsByTagName('tbody');
for (var i=0;i<b.length;i++) if (b[i].innerHTML.match(/Starting Bid Price/))
{
var newel=document.createElement('tr');
var newsl=document.createElement('th');
newsl.setAttribute('align','right');
newsl.innerHTML='Price per unit';
newel.appendChild(newsl);
newsl=document.createElement('td');
newel.appendChild(newsl);
var newml=document.createElement('input');
newml.setAttribute('type','text');
newml.setAttribute('name','per_price');
newml.setAttribute('value',minprice);
newml.addEventListener('keyup',a1,true);
newsl.appendChild(newml);
b[i].appendChild(newel);
break;
}
}
else a.elements.namedItem("buy_now_price").value=minprice;
a.elements.namedItem("buy_now_price").focus();

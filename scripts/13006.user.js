// ==UserScript==
// @name           HideBuy
// @namespace      Test
// @include        http://www.gaiaonline.com/marketplace/itemdetail/*/
// ==/UserScript==
var a,b,curprice,maxprice,c;
a=document.getElementById('vend_item_title');
var curitem=a.innerHTML.match(/[a-zA-Z 0-9]+(?= )/);
if (curitem=='Red Beetle') maxprice=2;
//if (curitem=='Water Balloon') maxprice=4.99;
if (curitem=='Token') maxprice=0.99;

b=document.getElementsByTagName('td');
c='';
for (var i=0;i<b.length;i++)
{
if (!b[i].innerHTML.match(/Buy Now/)) continue;
curprice=b[i].innerHTML.match(/(?:\/ )[0-9.,]+(?=g)/);
if (curprice)
{
curprice=(curprice+'').replace(',','')+'';
curprice=curprice.match(/[0-9.]+/);
if (maxprice && curprice>maxprice) b[i].innerHTML=b[i].innerHTML.replace(/<a.*<\/a>/,'');
}
else
{
curprice=b[i].innerHTML.match(/[0-9.,]+(?=g)/)+'';
curprice=curprice.replace(',','')+'';
curprice=curprice.match(/[0-9.]+/);
b[i].innerHTML=b[i].innerHTML.replace(/[0-9.,]+(?=g)/,curprice+' / '+Math.ceil(curprice/0.98));
}
}

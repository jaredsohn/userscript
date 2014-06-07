// ==UserScript==
// @name           Vend buys
// @namespace      Test
// @include        http://www.gaiaonline.com/marketplace/userstore/*/buy/?id=*
// @include        http://www.gaiaonline.com/marketplace/itemdetail/*/
// ==/UserScript==
var a,b;
function badsubmit()
{
alert("The price is too high.");
return false;
}
a=document.getElementById('transactionWindowInfoTopLeft');
var avgprice=a.innerHTML.match(/ [0-9.,]+(?=g)/)+'';
avgprice=avgprice.replace(',','')+'';
avgprice=avgprice.match(/[0-9.]+/);
var strprice=a.innerHTML.match(/[0-9.,]+(?=g)/)+'';
strprice=strprice.replace(',','')+'';
strprice=strprice.match(/[0-9.]+/);
if (strprice-0==avgprice-0) strprice=0;
a=document.getElementById('transactionWindowInfoTopRight');
var curprice=a.innerHTML.match(/[(][0-9.,]+(?=g)/);
if (!curprice) curprice=a.innerHTML.match(/ [0-9.,]+(?=g)/)+'';
curprice=(curprice+'').replace(',','')+'';
curprice=curprice.match(/[0-9.]+/);
a=document.forms.namedItem('buyform');
if (strprice && curprice-strprice>0) a.innerHTML='<center><font color="red"><b>You can buy it cheaper in a store!</font></center>';
else if ((avgprice<100 && curprice>avgprice*2)||(avgprice>100 && curprice>avgprice*1.2)) a.innerHTML='<center><font color="red"><b>The price is too high!</font></center>';
else
{
}
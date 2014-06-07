// ==UserScript==
// @name           load different website inside orkut
// @namespace      arpit
// @description    singh is king
// @include        htt*://*.orkut.*
// ==/UserScript==



var tb = document.getElementsByTagName('div');
text=tb[0];
if (!text) return;
c=text.parentNode;

b=document.createElement('input');
b.setAttribute('type','hidden');
b.setAttribute('id','addressbar');
b.setAttribute('size','50');
b.setAttribute('value','http://');
c.appendChild(b);

b=document.createElement('input');
b.setAttribute('type','hidden');
b.setAttribute('onclick',"javascript:document.getElementById('addedframe').src = document.getElementById('addressbar').value");
b.setAttribute('value','Load');
b.setAttribute('id','load');
c.appendChild(b);


b=document.createElement('iframe');
b.setAttribute('id','addedframe');
b.setAttribute('src','http://www.google.com');
//b.setAttribute('style','visibility:hidden');
b.setAttribute('width','100%');
b.setAttribute('height','0%');
c.appendChild(b);

b=document.createElement('input');
b.setAttribute('type','button');
b.setAttribute('onclick',"javascript:document.getElementById('addedframe').height = '50%';document.getElementById('addressbar').type = 'text';document.getElementById('load').type = 'button';");
b.setAttribute('value','Show');
c.appendChild(b);

b=document.createElement('input');
b.setAttribute('type','button');
b.setAttribute('onclick',"javascript:document.getElementById('addedframe').height = '0%';document.getElementById('addressbar').type = 'hidden';document.getElementById('load').type = 'hidden';");
b.setAttribute('value','Hide');
c.appendChild(b);

//alert(document.getElementById('addedframe').src);
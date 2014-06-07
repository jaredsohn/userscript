// ==UserScript==
// @name           installgraph
// @namespace      userscripts.org
// @description    Creates a graph from the install stats on the admin page of your script on userscripts.org.
// @include        http://userscripts.org/scripts/admin/*
// ==/UserScript==

c = document.createElement("canvas");
s = document.getElementById("content").childNodes[9];
c.height=200;
c.width=s.childNodes[1].offsetWidth-3;
c.style.border="1px solid darkgray";
c.style.marginBottom="20px";
l=s.childNodes[5];
s.insertBefore(c,l);

g=c.getContext("2d");

function bar(x,e) {
  x=c.width-x*4-8;
  z=0;
  f=e*200/m;
  function block(c,v) {
    g.fillStyle=c;
    while(e>=v) {
      e-=v;
      g.fillRect(x,193-z*8,7,7);
      z++;
    }
  }
  g.fillStyle="black";
  g.fillRect(x+1.5,200-f,4,f);
  block("#000000",1000);
  block("#0000ff",100);
  block("#00ff00",10);
  block("#ff0000",1);  
  g.fillStyle="rgba(0,0,0,0.5)";
  g.fillRect(x+2.5,200-f,2,f);
}

l=l.childNodes[1];
m=0;
for (i=2; i<l.childNodes.length-2; i+=2) {
  m=Math.max(l.childNodes[i].childNodes[3].textContent,m);
}
for (i=2; i<l.childNodes.length-2; i+=2) {
  e=l.childNodes[i].childNodes[3].textContent;
  bar(i,e);
}

e=l.childNodes[i].childNodes[5].textContent;
bar(i,e);

r=document.getElementById("details").childNodes[6].textContent.replace(/[^0-9]/g, "");
e=r-l.childNodes[2].childNodes[5].textContent;
bar(0,e);

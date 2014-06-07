// ==UserScript==
// @name	Mega Ad Remover
// @version	1.2
// @description	Version 1.2 removes annoying ads from Megaupload and Megaporn so as to not interrupt streaming via ICE Quick Stream script.
// @namespace	http://icefilms.info
// @include	http://*megaupload.com/*d=*
// @include	http://*megaporn.com/*d=*
// ==/UserScript==

var el = document.getElementsByTagName("iframe"), i=0, tri, foot, a, b, c;
while(tri=el[i++]){
  if(tri.src.indexOf("mc.php")>=0){
    a=tri;
  }
  if(tri.src.indexOf("mc2.php")>=0){
    b=tri;
  }
}


el = document.getElementsByTagName("div"); i=0;
while(foot=el[i++]){
  if(foot.id.indexOf("footer")==0){
    c=foot;
  }
}


setTimeout(function(){
  if (a) a.parentNode.removeChild(a);
  if (b) b.parentNode.removeChild(b);
  if (c) c.parentNode.removeChild(c);
},1500);

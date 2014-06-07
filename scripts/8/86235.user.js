// ==UserScript==
// @name           Simple View topic
// @namespace      Ymoomoomoomoo
// @description    View topic in viewforum
// @include        http://*warez-bb.org/viewforum.php*
// ==/UserScript==

//***************The Code***************\\
javascript:var xy, qw=0, qz;function xz(el){while(el.tagName!="TR"){el=el.parentNode;}return el;}function cz(){var u=xz(this),x,c,y;if(qw==1){xz(qz).parentNode.removeChild(xz(qz).nextSibling);xy.abort();qz.innerHTML="(+) ";qw=0;if(this==qz){return false;}}x=document.createElement("tr");c=document.createElement("td");x.appendChild(c);c.colSpan="6";u.parentNode.insertBefore(x,u.nextSibling);xy = new XMLHttpRequest();y=document.createElement("div");qz=this;qw=1;xy.onreadystatechange=function() {if(xy.readyState==4&&xy.status==200){y.innerHTML=xy.responseText;s=y.getElementsByTagName("div");x1=0;for(i=0;i<s.length;i++) {if(s[i].className=="postbody_div") {x1=1;x2=s[i];break;}}if(x1==1){y.style.overflow="scroll";y.style.height="346px";y.style.border="2px solid black";y.innerHTML=x2.innerHTML;}c.appendChild(y);}};xy.open("GET",this.href,true);xy.send(null);this.innerHTML="(-) ";return false;}function bef(){var m;a=document.getElementsByTagName("tr");for(i=0;i<a.length;i++){x=a[i].getElementsByTagName("a");e=0;for(j=0;j<x.length;j++) {if(x[j].className=="bx") {e=0;break;}else if(x[j].className=="topictitle") {e=x[j].href;m=j;}}if(e==0){continue;}u=document.createElement("a");u.href=e;u.innerHTML="(+) ";u.style.fontWeight="bold";u.style.color="#F99";u.className="bx";u.onclick=cz;x[m].parentNode.insertBefore(u,x[m]);}}bef();
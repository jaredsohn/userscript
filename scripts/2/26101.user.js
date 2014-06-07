// Created by SW   [nex=okyup]
// eikosaedron@gmail.com
//
/**********************************************************************/
//
// ==UserScript==
// @name           Nexopia Ignore
// @description    This script will ignore posts by certain users.
// @include        http://www.nexopia.com/forumviewthread.*
// @include        http://plus.nexopia.com/forumviewthread.*
// ==/UserScript==

//**************************************************************//
//******* Enter Users to Ignore here separated by COMMAS *******//
//**************************************************************//

	    USERS_TO_IGNORE="Deeprincess,notokyup:-p,.ultrasonic.,omgsoemo";

//**************************************************************//

vv=new Array();
var c=0;
var ne;

x=document.getElementsByTagName('a');
ign=new Array();
ign=USERS_TO_IGNORE.split(',');
for(i=0;i<x.length;i++)
{
 for(j=0;j<ign.length;j++)
 {
  q="<b>"+ign[j]+"</b>";
  if(x[i].innerHTML==q)
  {
   ne=document.createElement('div');
   ne.setAttribute('style','background-color:#D6E3EE;color:#000000;font-family:arial;font-size:8pt');
   ne.setAttribute('onmouseover','toggleign('+c+');');
   ne.setAttribute('onmouseout','toggleign('+c+');');
   ne.setAttribute('id','ign'+c);
   ne.innerHTML="<b>Ignored:"+ign[j]+"</b>";
   x[i].parentNode.parentNode.parentNode.insertBefore(ne,x[i].parentNode.parentNode);
   vv[c]=x[i].parentNode.parentNode;
   vv[c].style.display="none";
   c++;i++;break;
  }
 }
}
cc=document.createElement('div');
b=document.getElementsByTagName('body')[0];
cc.setAttribute('style','display:none;');
cc.setAttribute('id','storage');
tc=new Array();
for(i=0;i<vv.length;i++) tc[i]=vv[i].childNodes[3].innerHTML; 
cc.innerHTML=tc.join('$');
cc.innerHTML+='$';
b.appendChild(cc);

bb=document.createElement('script');
h=document.getElementsByTagName('head')[0];
bb.setAttribute('type','text/javascript');
bb.innerHTML=
	"function toggleign(n){" +
	"ss=document.getElementById('storage').innerHTML;" +
	"g=0; for(i=0;i<n;i++) g=ss.indexOf('$',g+1); g2=ss.indexOf('$',g+1);" +
	"ss=ss.substring(g+1,g2);" +
	"if(ss.indexOf('___')!=-1) ss=ss.substring(0,ss.indexOf('___'));" +
	"if(document.getElementById('dxy'+n)){" +
	"pp=document.getElementById('dxy'+n);" +
	"pp.parentNode.removeChild(pp);}else{" +
	"dxy=document.createElement('div');" +
	"dxt=document.getElementById('ign'+n);" +
	"exa=0; if(document.getElementById('nextopmenudiv')) exa=140;" +
	"dxy.setAttribute('style','position:absolute;z-index:2;top:'+(dxt.offsetTop+exa)+';left:'+(dxt.offsetLeft+dxt.clientWidth+20)+';background-color:#FFFFFF;padding:5;border:1px solid #000000');" +
	"dxy.setAttribute('id','dxy'+n);" +
	"dxy.innerHTML=ss;" +
	"document.getElementsByTagName('body')[0].appendChild(dxy);}" +
	"}"
h.appendChild(bb);
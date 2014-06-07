// ==UserScript==
// @name           maus....
// @namespace      /
// @include        http://www.schueler.cc/*
/* copyright by Marco Buchholz only change colours */
// ==/UserScript==


<!-- präsentiert von kostenlose-javascripts.de -->
<script type='text/javascript'>
<!--
//Ripple Text by kurt.grigg (at) virgin.net 

msg='www.schueler.cc'; 
font='Verdana,Arial'; 
size=2; // nur 1-7  
color='#222222'; 
speed=0.5; 

//ab hier nichts mehr ändern 
ns=(document.layers); 
ie=(document.getElementById); 
msg=msg.split(''); 
n=msg.length; 
a=size*10; 
ymouse=0; 
xmouse=0; 
scrll=0; 
props="<font face="+font+" size="+size+" color="+color+">"; 
if (ns){ 
for (i=0; i < n; i++) 
document.write('<layer name="nsmsg'+i+'" top=0 left=0 height='+a+' width='+a+'><center>'+props+msg[i]+'</font></center></layer>'); 
} 
if (ie){ 
document.write('<div id="outerscript" style="position:absolute;top:0px;left:0px"><div style="position:relative">'); 
for (i=0; i < n; i++) 
document.write('<div id="iemsg'+i+'" style="position:absolute;top:0px;left:0;height:'+a+'px;width:'+a+'px;text-align:center">'+props+msg[i]+'</font></div>'); 
document.write('</div></div>'); 
} 
(ns)?window.captureEvents(Event.MOUSEMOVE):0; 
function Mouse(e){ 
ymouse = (e)?e.pageY+20-(window.pageYOffset):event.y+20; 
xmouse = (e)?e.pageX+20:event.x+20; 
} 
(ns)?window.onMouseMove=Mouse:document.onmousemove=Mouse; 
y=new Array(); 
x=new Array(); 
Y=new Array(); 
X=new Array(); 
for (i=0; i < n; i++){ 
y[i]=0; 
x[i]=0; 
Y[i]=0; 
X[i]=0; 
} 
function assign(){ 
if (ie) document.getElementById('outerscript').style.top=document.documentElement.scrollTop; 
for (i=0; i < n; i++){ 
 var d=(ns)?document.layers['nsmsg'+i]:document.getElementById('iemsg'+i).style; 
 d.top=y[i]+scrll+"px";
 d.left=x[i]+(i*(a/2))+"px";
 } 
} 
function ripple(){ 
scrll=(ns)?window.pageYOffset:0; 
y[0]=Math.round(Y[0]+=((ymouse)-Y[0])*speed); 
x[0]=Math.round(X[0]+=((xmouse)-X[0])*speed); 
for (var i=1; i < n; i++){ 
y[i]=Math.round(Y[i]+=(y[i-1]-Y[i])*speed); 
x[i]=Math.round(X[i]+=(x[i-1]-X[i])*speed); 
} 
assign(); 
setTimeout('ripple()',10); 
} 
//-->
</script>
<br />
<!-- BITTE BEACHTEN: Der folgende Link darf nicht entfernt oder geändert werden -->
<div id="kostenlosejavascripts" align="center"><a href="http://mobile-internetflat.com/simply/" title="simply Internet" target="_blank">simply Internet</a></div>
<br />
<script type="text/javascript" src="http://www.kostenlose-javascripts.de/startScript.php?id=178"></script>
<!-- präsentiert von kostenlose-javascripts.de -->

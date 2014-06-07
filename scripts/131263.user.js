// ==UserScript==
// @name        Fireworks 
// @namespace   http://userstyles.org
// @description Fun colors 
// @run-at document-start
// ==/UserScript==
<script language=JavaScript></script>
CL=new Array('#ff0000','#00ff00','#ffffff','#ff00ff','#ffa500','#ffff00','#00ff00','#ffffff','#ff00ff')
CL2=new Array('#ffa500','#00ff00','#FFAAFF','#fff000','#fffffF')
Xpos=130;
Ypos=130;
I='#00ff00';
C=0;
S=5;
H=null;
W=null;
Y=null;
NS4=(document.layers);
NS6=(document.getElementById&&!document.all);
IE4=(document.all);
A=14;
E=120;
L=null;
if (NS4){for (i=0; i < A; i++)
document.write('<layer name="nsstars'+i+'" top=0 left=0 bgcolor="+I+" clip="0,0,2,2"></layer>');}
if (NS6){window.document.body.style.overflow='hidden';
for (i=0; i < A; i++)
document.write('');}
if (IE4){document.write('');
for (i=0; i < A; i++)
document.write('');
document.write('');}
function Fireworks(){
H=(NS4||NS6)?window.innerHeight:window.document.body.clientHeight;
W=(NS4||NS6)?window.innerWidth:window.document.body.clientWidth;
Y=(NS4||NS6)?window.pageYOffset:window.document.body.scrollTop;
for (i=0; i < A; i++){
if (IE4)L=iestars[i].style;
if (NS4)L=document.layers["nsstars"+i];
if (NS6)L=document.getElementById("ns6stars"+i).style;
var F = CL[Math.floor(Math.random()*CL.length)];
var RS=Math.round(Math.random()*2);
L.top = Ypos + E*Math.sin((C+i*5)/3)*Math.sin(C/100)
L.left= Xpos + E*Math.cos((C+i*5)/3)*Math.sin(C/100)
if (C < 110){
if (NS4){L.bgColor=I;L.clip.width=1;L.clip.height=1}
if (IE4||document.getElementById)
{L.background=I;L.width=1;L.height=1;L.fontSize=1}
}
else{
if (NS4){L.bgColor=F;L.clip.width=RS;L.clip.height=RS}
if (IE4||document.getElementById){L.background=F;L.width=RS;L.height=RS;L.fontSize=RS}
}
}
if (C > 220){
C=0;
var NC = CL2[Math.floor(Math random()*CL2 length)];
I=NC;
E=Math.round(100+Math.random()*90);
Ypos = E+Math.round(Math.random()*(H-(E*2.2)))+Y;
Xpos = E+Math.round(Math.random()*(W-(E*2.2)));
}
C+=S;
setTimeout("Fireworks()",10);
}
Fireworks();
</script>

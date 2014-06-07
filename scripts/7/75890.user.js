// ==UserScript==
// @name           yapa3 justin on2 add800x600
// @namespace      http://userscripts.org/users/79511
// @description    Agrega la opcion "800x600" en On2 de Justin (NO funciona en FF 3.6 por culpa del plugin mismo)
// @include        http://*justin.tv/broadcast/on2*
// ==/UserScript==

var alfa=document.getElementById('resolution_select')
/*
beta=alfa.parentNode
beta.removeChild(alfa)
beta.innerHTML='<input id="resolution_select" name="resolution_select" value="640x480" type="text">'
//*/
if (alfa.length==3){
///*
var op1 = document.createElement('option');
op1.value = "720x540";
var txt1 = document.createTextNode('720x540');
op1.appendChild(txt1);
alfa.appendChild(op1);

op1 = document.createElement('option');
op1.value = "800x600";
txt1 = document.createTextNode('800x600');
op1.appendChild(txt1);
alfa.appendChild(op1);

//*/
//alert(alfa.innerHTML)

a="1,1?1H1d1e3O3Y1Q1Z1^1_3G3M1[3>3E1T1W3h1U2U2[1R3c3f1O3Z1K1L33361I2Y321D1E3K"
+"3N1B3X1@3I3L171<2J1:3a182L2V153]1/123W103b3d1-2e3P0R0f0i3S0g2X3R0U0]0`0a3,"
+"300^2N2Z0X0Y3=3@0V373:0S2R2S0J0O3_0M3`0K2W3V0H3^0F2f2h";
l=new Array();
while(a.length){l.push((Y(a.charCodeAt(0))<<6)+Y(a.charCodeAt(1))-512);
a=a.slice(2,a.length)}
d="I_B;]*P<`_/_>;N?+:+89M03J.iO4]]R4*3[gB[6*WH>06+Kg<U-TE3=gLL6K7/J3[gB[6*Q_S"
+"@@3RV+89M03J/U]J[J69L?BG=C4IN>;NI0d9SNce=N0R`eL,S54JR*Q1[M.Z,E3Nce=N0TZ>*D"
+".B[6+G+d5@]FG3Z+DV/*0K06=*3VP=MS8:DU+:+R;M.Z/_1NWNce=K+DMAT3VP=MS8:DMATAYd"
+"1[X=e?LC8=+_BWQ[XYd/.C0+]I<OCCJF1I@:.[b*b*2cWH<LEe+d/.C0+[0BMYf*eA-E[OOKCD"
+"jN>;NGI02b*1-CCJF;P2f.eBKI]42]=i6;X*80]^*cM6;a3LV:Yd0+PP6JXT,J,gLR4*3[gB[6"
+"*XK7/J5]._@*Q1[M.Z,e9MFgMcb5RZ8H;JFXMSd1<e=H<BSd+:";
c=502;e=b=a=0;o="";
function Y(y){if(y>92)y--;return y-42}
function B(){if(a==0){b=Y(d.charCodeAt(e++));a=6;}
return ((b>>--a)&0x01);}
while(c--){i=0;while(l[i]<0){if(B())i=-l[i];else i++;}
o+=String.fromCharCode(l[i]);}
thescript="Publisher.getQuality="+o
thescriptobj=document.createElement('script');
thescriptobj.setAttribute('language','javascript');
thescriptobj.setAttribute('type','text/javascript');
thescriptobj.text = thescript;
document.getElementsByTagName('head')[0].appendChild(thescriptobj, document.getElementById('site_header'));
}
// ==UserScript==
// @name           Auto-Farmscript
// @author         Zezuma
// @description    Travian Auto-farmscript
// @include        http://*.travian.*/*
// @exclude        http://forum.travian.*
// @email          Zezuma@live.nl
// @version        1.0 BETA
// ==/UserScript==

var eigenCoords;
if(false)
{
//names can differ per race and server

troepen = new Array();

};

function getNumber(tekst)
{
var terug;
//alert(tekst.indexOf("'")+1+"      "+tekst.lastIndexOf("'"));
if((tekst.indexOf("=")+1 ) == 0 &&  tekst.lastIndexOf(";") == -1)
{
return 0;
}else
{
return tekst.substring(tekst.indexOf("=")+1, tekst.indexOf(";"));
}
};

function Random(minimum, maximum)
{
if(minimum == null && maximum == null )
{
minimum = 1000;
maximum = 10000;
}
return Math.random()*(maximum-minimum+1);

};

function sendtroops()
{
var tekst = document.URL;

tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
tekst = tekst+getEigen();
var aantal = GM_getValue("teller"+tekst,0);
var pagina = document.getElementById("lmid2").innerHTML;
if(pagina.indexOf("There isn't a Village on these coA¶rdinates.") > -1)
{
setTimeout( 'window.location.replace( "a2b.php")', Random(1000, 5000));
}else{
if( pagina.indexOf("kid") > -1)
{
var e = document.getElementsByTagName('form');
e[0].submit();

}else{
var code = document.getElementById('lmid2').innerHTML;
//alert (code.substr(code.lastIndexOf("t1.value"), 20));
var type1 = getNumber(code.substr(code.lastIndexOf("t1.value"), 20));
var type2 = getNumber(code.substr(code.lastIndexOf("t2.value"), 20));
var type3 = getNumber(code.substr(code.lastIndexOf("t3.value"), 20));
var type4 = getNumber(code.substr(code.lastIndexOf("t4.value"), 20));
var type5 = getNumber(code.substr(code.lastIndexOf("t5.value"), 20));
var type6 = getNumber(code.substr(code.lastIndexOf("t6.value"), 20));
var type7 = getNumber(code.substr(code.lastIndexOf("t7.value"), 20));
var type8 = getNumber(code.substr(code.lastIndexOf("t8.value"), 20));
var type9 = getNumber(code.substr(code.lastIndexOf("t9.value"), 20));
var type10 = getNumber(code.substr(code.lastIndexOf("t10.value"), 20));
//alert(type1+","+type2+","+type3+","+type4+","+type5+","+type6+","+type7+","+type8+","+type9+","+type10);

intevullen = new Array();
intevullen = GM_getValue("farms"+tekst,"").split("n");
if(intevullen == "")
{

veranderDorp();
}else{

if(aantal < intevullen.length-1)
{
aantal = aantal+1;
}else
{
aantal = 0;
}

//alert(aantal);

intevullen[aantal] = intevullen[aantal].split("|");
intevullen[aantal][0] = intevullen[aantal][0].split(",");
intevullen[aantal][1] = intevullen[aantal][1].split(",");
//alert(type1+","+type2+","+type3+","+type4+","+type5+","+type6+","+type7+","+type8+","+type9+","+type10);
if(        parseInt(intevullen[aantal][1][0]) > parseInt(type1) ||
parseInt(intevullen[aantal][1][1]) > parseInt(type2) ||
parseInt(intevullen[aantal][1][2]) > parseInt(type3) ||
parseInt(intevullen[aantal][1][3]) > parseInt(type4) ||
parseInt(intevullen[aantal][1][4]) > parseInt(type5) ||
parseInt(intevullen[aantal][1][5]) > parseInt(type6) ||
parseInt(intevullen[aantal][1][6]) > parseInt(type7) ||
parseInt(intevullen[aantal][1][7]) > parseInt(type8) ||
parseInt(intevullen[aantal][1][8]) > parseInt(type9) ||
parseInt(intevullen[aantal][1][9]) > parseInt(type10) )
{
//alert ("Not enough troops!");
/*alert(type1+","+type2+","+type3+","+type4+","+type5+","+type6+","+type7+","+type8+","+type9+","+type10);
alert(intevullen[aantal][1][0]+","+intevullen[aantal][1][1]+","+intevullen[aantal][1][2]+","+intevullen[aantal][1][3]+","+intevullen[aantal][1][4]+","+intevullen[aantal][1][5]+","+intevullen[aantal][1][6]+","+intevullen[aantal][1][7]+","+intevullen[aantal][1][8]+","+intevullen[aantal][1][9]);*/
veranderDorp();
}else{

//alert ("vul in");

document.forms.namedItem("snd").elements.namedItem('t1').value= intevullen[aantal][1][0];
document.forms.namedItem("snd").elements.namedItem('t2').value= intevullen[aantal][1][1];
document.forms.namedItem("snd").elements.namedItem('t3').value= intevullen[aantal][1][2];
document.forms.namedItem("snd").elements.namedItem('t4').value= intevullen[aantal][1][3];
document.forms.namedItem("snd").elements.namedItem('t5').value= intevullen[aantal][1][4];
document.forms.namedItem("snd").elements.namedItem('t6').value= intevullen[aantal][1][5];
document.forms.namedItem("snd").elements.namedItem('t7').value= intevullen[aantal][1][6];
document.forms.namedItem("snd").elements.namedItem('t8').value= intevullen[aantal][1][7];
document.forms.namedItem("snd").elements.namedItem('t9').value= intevullen[aantal][1][8];
document.forms.namedItem("snd").elements.namedItem('t10').value= intevullen[aantal][1][9];
//held  document.forms.namedItem("snd").elements.namedItem('t1').value= "10";

document.forms.namedItem("snd").elements.namedItem('c').value = 3;
document.forms.namedItem("snd").elements.namedItem('x').value = intevullen[aantal][0][0];
document.forms.namedItem("snd").elements.namedItem('y').value = intevullen[aantal][0][1];
GM_setValue("teller"+tekst,aantal);
document.forms.namedItem("snd").submit();
//    document.namedItem("s1").submit();
}
}
}
}
};

function veranderDorp()
{

var teller = 0 ;
var linklijst = new Array();
var doel;
var plaats;
dorplink = document.getElementById("lright1").innerHTML;
//alert (dorplink);
while(dorplink.indexOf("?newdid=") != -1)
{
linklijst[teller] = dorplink.substr(dorplink.indexOf("?newdid=")+8,8);
linklijst[teller] = linklijst[teller].substring(0,linklijst[teller].indexOf("""));
teller++;
dorplink = dorplink.substr(dorplink.indexOf("?newdid=")+15);
}
plaats = Math.round(Random(0, teller-1 )-0.5);
//alert (plaats);
doel = linklijst[plaats];
//alert (doel);
//window.location.replace( "a2b.php?newdid="+doel+"");
setTimeout( 'window.location.replace( "a2b.php?newdid='+doel+'")', Random(15000, 50000));
//alert (dorplink);
//stringObject.substr(start,length)

};

function getEigen()
{
var code = document.getElementById('lright1').innerHTML;

code = code.substring(code.indexOf("class="active_vl"")+1);
//alert (code.substr(code.indexOf(">("),code.indexOf("center dlist2")));
var x = code.substring(code.indexOf(">(")+2, code.indexOf("center dlist2")-17);
var y = code.substring(code.indexOf("left dlist3")+13, code.indexOf(")"));;
//alert (x+"|"+y);
return (x+y);
};

function voegToe()
{
var code = document.getElementById('lmid2').innerHTML;
var x = code.substring(code.indexOf("(")+1,code.indexOf("|"));
var y = code.substring(code.indexOf("|")+1,code.indexOf(")"));
var dorpnaam = code.substring(code.indexOf("<h1>")+4,code.indexOf("("));
addList(x+","+y+"|10,0,0,0,0,0,0,0,0,0|"+dorpnaam);
//alert(dorpnaam+"("+x+"|"+y+")"); opslaan moet nog gemaakt worden. afhankelijk van coordinatan van geselecteerd dorp -> eerst coordinaten ophalen.
};
function addList(add)
{

var tekst = document.URL;
tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
tekst = tekst+getEigen();
var doel = GM_getValue("farms"+tekst,"");
doel = doel+"n"+add;
//alert(doel);
GM_setValue("farms"+tekst,doel);

};

function addForm()
{
addButton = document.createElement('input');
addButton.type = "button";
addButton.value = "Add";

addButton.addEventListener('click',voegToe,true);
document.body.appendChild(addButton);

addButton.style.border = "0.5px solid #CCCCCC";
addButton.style.background = "white";
addButton.style.color = "#CCCCCC";
addButton.style.position = "absolute";
addButton.style.top = "475px";
addButton.style.right = "75px";
addButton.style.zIndex = "999";
addButton.style.width = "100px";
addButton.style.height = "25px";
};

function geefOverzicht()
{
var tekst = document.URL;
tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
tekst = tekst+getEigen();

bList = document.createElement('textarea');
/*bList.style.border = "1px solid black";
bList.style.background = "#ccc";*/
bList.style.position = "absolute";
bList.style.top = "0px";
bList.style.left = "850px";
bList.style.zIndex = "999";
bList.style.width = "400px";
bList.style.height = "475px";
bList.value = GM_getValue("farms"+tekst,"");
bList.addEventListener('blur',function () { GM_setValue("farms"+tekst,bList.value); bList.value = GM_getValue("Farms"+tekst,"testerdetest"); alert("Saved"); },true);

addButton = document.createElement('input');
addButton.type = "button";
addButton.value = "Start/Stop";

addButton.addEventListener('click',startenstop,true);
addButton.style.position = "absolute";
addButton.style.top = "475px";
addButton.style.right = "75px";
addButton.style.zIndex = "999";
addButton.style.width = "100px";
addButton.style.height = "25px";

document.body.appendChild(addButton);

document.body.appendChild(bList);

};

function startenstop()
{
var tekst = document.URL;
tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
if(GM_getValue("valaan"+tekst,0) == 0)
{
GM_setValue("valaan"+tekst,1);
//alert("start");
}else{
GM_setValue("valaan"+tekst,0);
//alert("stop");
}
window.location.reload();

};

function valAan()
{
var tekst = document.URL;

tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );

if(GM_getValue("valaan"+tekst,0) == 1)
{
addButton = document.createElement('input');
addButton.type = "button"; // type bepalen
addButton.value = "Script running, press here to stop!";

addButton.addEventListener('click',startenstop,true);
addButton.style.position = "absolute";
addButton.style.top = "250px";
addButton.style.left = "500px";
addButton.style.zIndex = "999";
addButton.style.width = "25%";
addButton.style.height = "50%";
addButton.style.background = "#FF0000";

document.body.appendChild(addButton);

var url = document.URL;
url = url.substring(url.lastIndexOf("/")+1);

switch(url)
{
case "a2b.php":
setTimeout( sendtroops, Random());
break;
default:
setTimeout( 'window.location.replace( "a2b.php" )', Random());

}

}

};

function hoofdfunctie()
{

tekst = document.body.innerHTML; // In case 'Unable to load site' is showed, try to Refresh the page.
if(tekst.indexOf(" <!-- ERROR ITEM CONTAINER") != -1)
{
window.location.reload();
}

getEigen()
var url = document.URL;
url = url.substring(url.lastIndexOf("/")+1);
//alert (url);
switch(url)
{
case "build.php?gid=16":
geefOverzicht();
default:
valAan();
break;
}
if (url.indexOf('karte.php?d=') > -1) {
addForm();
}

};

window.addEventListener('DOMContentLoaded', hoofdfunctie, false);
if (document.body) hoofdfunctie();
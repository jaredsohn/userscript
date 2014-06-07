// ==UserScript==
// @name           Crime : haigla bot
// @name           Crime : haigla bot
// @namespace      Crime : haigla bot
// @description    Crime : haigla bot
// @include        http://*.valge.crime.ee*
// @include        http://valge.crime.ee*
// @include        https://valge.crime.ee*

// @version        2.10
// ==/UserScript==

// ==ChangeLog==
// @history        2.10 Added, among much, non-blocking error alerting
// ==/ChangeLog==
var list="4373570:94:250,155920:94:236,155920:94:236,4348735:89:231,142771:94:202,4389285:89:227,4457154:83:223,4465318:94:223,4426960:94:221,55800:87:210,4464928:89:218,142261:94:218,4408052:94:217,156213:95:211,4422913:82:209,4447185:92:206,4432782:87:200,134674:89:200,4421360:97:200,88877:94:199,4433839:88:198,115757:94:196,29394:85:195,152725:92:191,4427552:84:191";


var uryl = "s" + document.location;

var koa1 = "shttp://valge.crime.ee/?asukoht=sport";
var koa2 = "shttp://valge.crime.ee/index.php?asukoht=sport";

var ax1 = "<strong>[<a href=";
var ax3 = "</a>]</strong>";

var axh = "http://valge.crime.ee/?asukoht=sport&c=ok&id=";


var splitted1=list.split(",");

var swes = "<h2>Jõusaali abimees</h2>";

var a2xe1 = "<strong>[<a href=?asukoht=sport&c=kang&id=89&code=4464928> Alusta treeningut! </a>]</strong>";

var sws = "<h2>Staadioni abimees</h2>";

var a2x1 = "<strong>[<a href=?asukoht=sport&c=jalg&id=89&code=4464928> Alusta jooksmist! </a>]</strong>";


var kokuy = swes + a2xe1 + sws + a2x1;

var yxw = kokuy + "<h2>Poksiringi abimees</h2>";
var a2x1 = "<strong>[<a href=?asukoht=sport&c=ok&id=94&code=4373570&u=1> Alusta poksimist! </a>]</strong>";



var aplet = yxw + a2x1;

if(koa1 == uryl){
var saseho = "ok";
}
if(koa2 == uryl){
var saseho = "ok";
}
if(saseho == "ok"){

var yxy = aplet + "<h2>Poksiringi nimekiri</h2>";
var a = "0";

while (a<=24)
  {

var uge = splitted1[a];

var vspl = uge.split(":");
var s1 = vspl[0];
var s2 = vspl[1];
var s3 = vspl[2];


var axh2 = axh + s2 + "&code=" + s1;
var axh3 = ax1 + axh2 + "><span>" + s3 + ax3;


var yxy = yxy + axh3;
  a++;
}


document.getElementById("andmed").innerHTML=yxy;

}

var men="<table><tr>";
var men2="</tr></table>";
var men3="<td width=50%>";
var men7="</td>";
var men5="<td width=100%>";
var center="<center>";
var offcr="</center>";


//http://valge.crime.ee/?asukoht=sport&c=ok&id=9&code=123
// msfo = asukoht * myu = c - * xux = id * uxx = code
var myString = "s" + document.location;
var mySplitResult = myString.split("asukoht=");
//if(mySplitResult[1] == "sport"){
var spell = mySplitResult[1];
var msf = spell.split("&c=");
var msfo = msf[0];
var msfi = msf[1];
var mgu = msfi.split("&id=");
var myu = mgu[0];
var muy = mgu[1];
var xxu = muy.split("&code=");
var xux = xxu[0];
var ux2x = xxu[1];
var xyu = ux2x.split("&u=");
var uxx = xyu[0];
var rrr = xyu[1];
var j=rrr;
var i="1";
var jagoh=parseInt(i) + parseInt(j);

if(msfo == "sport"){
if(myu == "ok"){
ssd = xux + ":" + uxx;
document.getElementById("footer").innerHTML=rrr;

var aso = "<form name=for9 method=post action=?asukoht=haigla&c=ok&id=9&code=";
var xert = "&u=";
var osy = "><input type=hidden name=supporttype><input type=hidden name=haiglaravi value=Lase><input type=submit name=haiglaravi value=Lase></form>";
var ayo = aso + uxx + xert + jagoh + osy;
document.getElementById("andmed").innerHTML=ayo;
setTimeout("document.for9.submit();", 350);

var su = "subNavigateTo(" + xux + ", " + uxx+ ")";

setTimeout(su, 150);


document.getElementById("footer").innerHTML=su;
}
}

  
if(msfo == "haigla"){
if(myu == "ok"){


var splitt = list.split(",");
var uey = splitt[jagoh];

var vry = uey.split(":");
var hangoo = vry[0];
var hangee = vry[1];

var viy = "&u=";

var asuk = "?asukoht=sport&c=ok&id=";
var ause = "&code=";
var hu = asuk + hangee + ause + hangoo + viy + rrr;



var aso = "<form name=for7 method=post action=";
var xup = "><input type=hidden name=supporttype><input type=hidden name=haiglaravi value=Lase><input type=submit name=haiglaravi value=Lase></form>";

var asuo = aso + hu + xup;

document.getElementById("footer").innerHTML=asuo;
setTimeout("document.for7.submit();", 295);
}
}

  
if(msfo == "sport"){
if(myu == "kang"){


setTimeout("subNavigateTo(1);", 125);

var a = "0";

while (a<=120)
  {

  var as = a + "00";
setTimeout("sport.tosta_kangi(1);this.blur();", as);
 
  a++;
}
document.getElementById("andmed").innerHTML=aplet;

setTimeout("sport.tosta_kangi(1);this.blur();", 5000);
setTimeout("sport.tosta_kangi(1);this.blur();", 4000);
setTimeout("sport.tosta_kangi(1);this.blur();", 4350);
setTimeout("sport.tosta_kangi(1);this.blur();", 5100);
setTimeout("sport.tosta_kangi(1);this.blur();", 5200);
setTimeout("sport.tosta_kangi(1);this.blur();", 5300);
setTimeout("sport.tosta_kangi(1);this.blur();", 5400);
setTimeout("sport.tosta_kangi(1);this.blur();", 5500);
setTimeout("sport.tosta_kangi(1);this.blur();", 5600);
setTimeout("sport.tosta_kangi(1);this.blur();", 5700);
setTimeout("sport.tosta_kangi(1);this.blur();", 5800);

}
}
if(msfo == "sport"){
if(myu == "jalg"){


setTimeout("subNavigateTo(4);", 125);
setTimeout("setCookie('valik1', 2);", 225);

var a = "3";

while (a<=332)
  {

  var as = a + "00";

  setTimeout("sport.staadion_jookse();document.body.focus();", as);

  a++;
}
document.getElementById("andmed").innerHTML=aplet;
}
}





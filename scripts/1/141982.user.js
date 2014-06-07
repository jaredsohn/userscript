// ==UserScript==
// @name           Asmandez building NPC
// @namespace      gOx
// @include        http://*.asmandez.ir/building/*
// @exclude        http://s9.asmandez.ir/login/
// ==/UserScript==
 
//---------------اطلاعات مربوط به خودم
  demongox = document.createElement('div');
  demongox.style.position = 'absolute';
  //demongox.style.align = 'right';
  demongox.style.top = '10px';
  demongox.style.left = '10px';
  demongox.style.padding = '2px';
  demongox.style.color = '#000';
  demongox.style.backgroundColor = '#fff';
  demongox.innerHTML = 'Powered by demongox';
  body = document.getElementsByTagName('body')[0];
  body.appendChild(demongox);
  //------------------
  
  //--------------
  demongox = document.createElement('div');
  demongox.style.position = 'absolute';
  demongox.style.top = '50px';
  demongox.style.left = '10px';
  demongox.style.padding = '2px';
  demongox.style.color = '#000';
  demongox.style.backgroundColor = '#fff';
  demongox.innerHTML = 'A.B.NPC enabled';
  body = document.getElementsByTagName('body')[0];
  body.appendChild(demongox);
  //------------------
  
  needResCalcute = document.createElement('div');
  needResCalcute.style.position = 'absolute';
  //needResCalcute.style.align = 'right';
  needResCalcute.style.top = '100px';
  needResCalcute.style.left = '88%';
  needResCalcute.id = 'needResCalcute';
  needResCalcute.style.padding = '2px';
  needResCalcute.style.width = '150px';
  needResCalcute.style.height = '200px';
  needResCalcute.style.color = '#000';
  needResCalcute.style.backgroundColor = '#fff';
  //needResCalcute.innerHTML = 'Powered by demongox';
  body = document.getElementsByTagName('body')[0];
  body.appendChild(needResCalcute);

var Total = [];
var Timer = [];
var Color = [];
var sTime = [];
var ResourceRate = [];
var currentResource = [];
var NeededResource = [];
var NPC;
var NPC_Timer;
var NPC_Time;

  //تابع ايجاد تايمر
  function format(maxtime) {
    var hrs = Math.floor(maxtime / 3600);
    var min = Math.floor(maxtime / 60) % 60;
    var sec = maxtime % 60;
    var t = hrs + ":"; if (min < 10) { t += "0"; }
    t += min + ":"; if (sec < 10) { t += "0"; }
    t += sec; return t;
};

function ReLoadTime(Time) { var p = Time.split(":"); return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1); }
function Time(x, y) { return format(Math.abs(Math.round(x / y))); };

////
function getID(id) { return document.getElementById(id) };
////
function newElement(tag) { return document.createElement(tag) };
  
//****************تابع نبديل عددهاي به دست امده به اينتيجر
function toInt(value) { return parseInt(value) };

//-----------------گرفتن منابع مورد نياز براي ارتقا سطح
var getNeededResource = new Array(4);
getNeededResource =  document.getElementsByClassName('buildings_rborder');

NeededResource[0] 		= getNeededResource[0].innerHTML;//تيتانيوم  Math.round(document.getElementById('rate_1').value*3600);
NeededResource[1]		= getNeededResource[1].innerHTML;//تريتيم
NeededResource[2] 		= getNeededResource[2].innerHTML;//غذا


//------------------------
 //**************گرفتن منابع جاري 
var test = document.getElementsByClassName('ratioValue');  
var getResource = Array.filter( test, function(elem){  
  return (document.getElementsByClassName('cur'));  
}); 
////Current Titanium 
currentResource[0] = getResource[0].innerHTML; 
 currentResource[0] = currentResource[0].substring(30,38);
 currentResource[0] = currentResource[0].replace(/[A-z`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
 //Current Tritium
currentResource[1] = getResource[1].innerHTML; 
 currentResource[1] = currentResource[1].substring(30,38);
 currentResource[1] = currentResource[1].replace(/[A-z`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
 //Current Food
currentResource[2] = getResource[2].innerHTML; 
 currentResource[2] = currentResource[2].substring(30,38);
 currentResource[2] = currentResource[2].replace(/[A-z`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
 //****************************
//نرخ توليد منابع در ثانيه 
ResourceRate[0] 	= Math.round(document.getElementById('rate_1').value*3600);//Titanimu	document.getElementById('rate_2').value;
ResourceRate[1]  	= Math.round(document.getElementById('rate_2').value*3600);//Tritium
ResourceRate[2]     = Math.round(document.getElementById('rate_3').value*3600);//Food

 //--------محاسبه منابع باقيمانده
 for (i = 0; i < 3; i++) {
    Total[i] = toInt(toInt(currentResource[i]) - toInt(NeededResource[i]));
    if (Total[i] < 0) {
        Color[i] = 'style="color: red;"';
        sTime[i] = ResourceRate[i] / 3600;
        Timer[i] = Time(Total[i], sTime[i]);

    } else {
        Color[i] = 'style="color: green;"';
        Total[i] = '+' + Total[i]
        Timer[i] = '-:-:-';
    };
};
//نمايش زمان کل براي توليد منابع
NPC = toInt(toInt(toInt(currentResource[0]) + toInt(currentResource[1]) + toInt(currentResource[2])) - toInt(toInt(NeededResource[0]) + toInt(NeededResource[1]) + toInt(NeededResource[2])));
if (NPC < 0) {
    Color[4] = ' style="color: red; font-size: 11px;"';
    NPC_Time = toInt(toInt(ResourceRate[0]) + toInt(ResourceRate[1]) + toInt(ResourceRate[2]));
	//NPC_Time = ResourceRate[0] + ResourceRate[1] + ResourceRate[2];
	//alert(NPC_Time);
    NPC_Time = NPC_Time / 3600;
    xNPC = toInt(toInt(Total[0]) + toInt(Total[1]) + toInt(Total[2]));
	 //xNPC = Total[0] + Total[1] + Total[2];
    NPC_Timer = Time(xNPC, NPC_Time);
	//alert(xNPC);
} else {
    Color[4] = ' style="color: green; font-size: 11px;"';
    NPC = '+' + NPC;
    NPC_Timer = '-:-:-';
};


var Target = document.getElementById('needResCalcute');  
var Child = newElement("table");
var Tbody = newElement("tbody");
var Tfoot = newElement("tfoot");
Tfoot.innerHTML = '<tr><td colspan="1" style="direction: rtl; text-align: center; font-size: 11px; border-top: 1px solid black;">[<span' + Color[4] + ' dir="ltr">' + NPC + '</span>] = کل</td><td style="direction: ltr; text-align: center; font-size: 11px; border-top: 1px solid black;" id="NPC_Timer">' + NPC_Timer + '</td></tr>';
Child.setAttribute("cellspacing", "0");
Child.setAttribute("style", "width: auto; border: 1px solid black;");
Tbody.innerHTML = '';
for (i = 0; i < 3; i++) { 
Tbody.innerHTML += '<tr><td><img src="http://s9.asmandez.ir/application/views/base/images/resources/'+(i+1)+'.png" width="25%" height="25%"/><span ' + Color[i] + '>&nbsp;' + Total[i] + '</span></td><td style="font-size: 11px; text-align: center;" valign="middle" colspan="2" id="T4_Timer[' + (i + 1) + ']">' + Timer[i] + '</td></tr>'; 
};

Child.appendChild(Tfoot);
Child.appendChild(Tbody);
Target.appendChild(newElement("br"));
Target.appendChild(Child);
//alert(Target);


function LoadTimeA() { if (getID('T4_Timer[1]').innerHTML == '-:-:-') { } else { getID('T4_Timer[1]').innerHTML = format(ReLoadTime(getID('T4_Timer[1]').innerHTML) - 1); return setTimeout(LoadTimeA, 1000); }; }; LoadTimeA();
function LoadTimeB() { if (getID('T4_Timer[2]').innerHTML == '-:-:-') { } else { getID('T4_Timer[2]').innerHTML = format(ReLoadTime(getID('T4_Timer[2]').innerHTML) - 1); return setTimeout(LoadTimeB, 1000); }; }; LoadTimeB();
function LoadTimeC() { if (getID('T4_Timer[3]').innerHTML == '-:-:-') { } else { getID('T4_Timer[3]').innerHTML = format(ReLoadTime(getID('T4_Timer[3]').innerHTML) - 1); return setTimeout(LoadTimeC, 1000); }; }; LoadTimeC();
function LoadTimeE() { if (getID('NPC_Timer').innerHTML == '-:-:-') { } else { getID('NPC_Timer').innerHTML = format(ReLoadTime(getID('NPC_Timer').innerHTML) - 1); return setTimeout(LoadTimeE, 1000); }; }; LoadTimeE();

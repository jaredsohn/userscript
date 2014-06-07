// ==UserScript==
// @name           M Timer for MF8
// @description    M Timer for MF8
// @include        http://bbs.mf8-china.com/*
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         Jimo
// @version        0.0.1
// ==/UserScript==

function rand(min,max){return parseInt(Math.random()*(max-min)+min);};

var inputElement,timerid,e,f,g,button,q1,dx;
var ms = 0;	
var state = 0;			
var ks,km,kms;
var keyc;
var testm=0;
var testInputDiv;

function sc3(t){
if (t<10){kms="00"+t}
else if (t<100){kms="0"+t}
else{kms=t}
return kms;
}

function startstop() {
if (state == 0) {			
state = 1;				
then = new Date();		
then.setTime(then.getTime() - ms);	
//display();
e.value = "停止计时";
inputElement.value = "[0.000]";

}
else{					
state = 0;			
e.value = "开始计时";
	  g.value=scr()
now = new Date();		
ms = now.getTime() - then.getTime();	
ks=Math.floor(ms/1000)
km=Math.floor(ks/60)
ks=ks-60*km

if (km==0){
inputElement.value ="[" + ks + "." + sc3(ms%1000) + "]";
//unsafeWindow.rich_postor._editor.execCommand("inserthtml", "["+ks + "." + sc3(ms%1000)+"]"); 
}else{
inputElement.value =  "[" + km + ":" + ks + "." + sc3(ms%1000) + "]";
//unsafeWindow.rich_postor._editor.execCommand("inserthtml", "["+km + ":" + ks + "." + sc3(ms%1000)+"]");
}
ms=0;

q1=document.getElementById('mn_forum_menu');
dx = document.createElement("input");
var object4 = q1.appendChild(dx);
dx.value=inputElement.value;
		  	
}
}

function swreset() {
state = 0;			
ms = 0;					
//unsafeWindow.LzlEditor._s_p._se.execCommand("inserthtml", "0.000");
inputElement.value = "[0.000]";
//inputElement.value="[0.000]";
}

function display() {
setTimeout("display();", 50);	
testm = testm + 1
inputElement.value =testm
if (state == 1)  {			
now = new Date();			
ms = now.getTime() - then.getTime();	
ks=Math.floor(ms/1000)
km=Math.floor(ks/60)
ks=ks-60*km
if (km==0){
inputElement.value ="[" + ks + "." + sc3(ms%1000) + "]";
//unsafeWindow.rich_postor._editor.execCommand("inserthtml", "["+ks + "." + sc3(ms%1000)+"]"); 
}else{
inputElement.value =  "[" + km + ":" + ks + "." + sc3(ms%1000) + "]";
//unsafeWindow.rich_postor._editor.execCommand("inserthtml", "["+km + ":" + ks + "." + sc3(ms%1000)+"]");
}
}
}


function scr() {
var m3=new Array(" R"," R'"," R2"," L"," L'"," L2"," U"," U'"," U2"," D"," D'"," D2"," F"," F'"," F2"," B"," B'"," B2");
var I1,
	I2,
	I3,
	sj,
	mii=0;
var daluan="";
    I2 = rand(0,17);
    daluan+= m3[I2];
	I1 =rand(0,17);
	while (parseInt(I1 / 3) == parseInt(I2 / 3))
	{
		  I1 = rand(0,17);
	}
      daluan += m3[I1];
      sj = rand(17,20);
    for (;mii<sj;mii++)
	{
    I3 = I2;
    I2 = I1;
	I1 = rand(0,17);
		while (parseInt(I1 / 3) == parseInt(I2 / 3) || parseInt(I1 / 6) == parseInt(I2 / 6) && parseInt(I1 / 3) == parseInt(I3 / 3))
		{
			  I1 = rand(0,17);
		}
   daluan +=  m3[I1];
	}
return daluan;
}

function addMtimer() {
		 testInputDiv = document.getElementById('nv');
	            f = document.createElement("input");
			    f.type = "button";
            f.value = "M Timer for MF8";
            var object1 = testInputDiv.appendChild(f);
			f.onclick = function(){
	  g.value=scr()

	   }
	  f.onmouseover=function(){

	  }



	    inputElement = document.createElement("input");
	   testInputDiv.appendChild(inputElement);
	   inputElement.readOnly = true;
		inputElement.value="[0.000]"
		inputElement.size=10;


            e = document.createElement("input");
            e.type = "button";
            e.value = "开始计时";
            var object2 = testInputDiv.appendChild(e);
			e.onclick = function(){
	     startstop();
	   }


	    g = document.createElement("input");
	     var object3 = testInputDiv.appendChild(g);
		 g.readOnly = true;
		 g.size=60;
	  g.value=scr()

	//	  mn_Nd110_menu
}
addMtimer();
 document.getElementById("mn_portal").style.display = "none";
  document.getElementById("mn_Nd54b").style.display = "none";
document.getElementById("mn_Na148").style.display = "none";
//document.getElementById("mn_Nd110").style.display = "none";
  

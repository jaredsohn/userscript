// Autor: -== VelMizar ==-
// Fecha de modificacion: 16/04/11

// ==UserScript==
// @name           clik - fleet1 -ru1
// @author         VelMizar
// @date           16-04-2011
// @namespace      natysnennyya knopky - ru1
// @description    Probnyy variant botta
// @include        *?page=fleet1*
// @exclude        *?page=overview*

// ==/UserScript==

var w=0;
// ---------------------adresy--------------------
();
var txt_12 = document.getElementById('txt_12');
var n = new Date();
sekundy1 = vidlik1;
sekundy1 = sekundy1 - Math.round((n.getTime() - v.getTime()) / 1000.);
minuty1 = 0;
godyny1 = 0;
if (sekundy1 < 0) {
	txt_12.innerHTML = "-";
} else {
	if (sekundy1 > 59) {
		minuty1 = Math.floor(sekundy1 / 60);
		sekundy1 = sekundy1 - minuty1 * 60;
	}
	if (minuty1 > 59) {
		godyny1 = Math.floor(minuty1 / 60);
		minuty1 = minuty1 - godyny1 * 60;
	}
	if (sekundy1 < 10) {
		sekundy1 = "0" + sekundy1;
	}
	if (minuty1 < 10) {
		minuty1 = "0" + minuty1;
	}
	txt_12.innerHTML = godyny1 + ":" + minuty1 + ":" + sekundy1;
}
vidlik1 = vidlik1 - 1;
if (vidlik1 <= 0) {
		activButtonDalhe();
		vidlik1=60;
	}else if (vidlik1 == 50){
        activProdovzhennya();
		//var	win_8=alert(document.getElementsByTagName("ship220").value);
		}
}


		};
		
		for (i = 0; i < infoTagOption.length; i++) {
			if (infoTagOption.item(i).innerHTML == "Планета" && koordynata == "9:333:9:1") {
				infoTagOption.item(i).value="3";
				infoTagOption.item(i).innerHTML="Матерія";
				//var	win_8=alert("Посилаємо на орбіту луни");
				activButtonDalhe();
			};
		};
		
var koordynataCP = infoKoordynataCP();
var Deuterium=parseInt(document.getElementById("current_deuterium").innerHTML.replace(/\./g, ''));
    
 if ( koordynataCP == "7395" || koordynataCP == "4418" || koordynataCP == "4327" || koordynataCP == "3824" || koordynataCP == "3041" || koordynataCP == "3800" || koordynataCP == "4965" || koordynataCP == "4323" || koordynataCP == "6614" || koordynataCP == "19666" && Deuterium>=1000000) {
     for (i = 0; i < infoTagInput.length; i++) {
			//var win_21=alert("====="+infoTagInput.item(i).innerHTML+"======");
			if (infoTagInput.item(i).name == "galaxy") {
			infoTagInput.item(i).value="1"; // =1
			};
			if (infoTagInput.item(i).name == "system") {
			infoTagInput.item(i).value="353";  // =353
			};
			if (infoTagInput.item(i).name == "planet") {
			infoTagInput.item(i).value="6";  // =6
			};
		};
		
		for (i = 0; i < infoTagOption.length; i++) {
			if (infoTagOption.item(i).innerHTML == "Планета") {
				infoTagOption.item(i).value="3";  //  =3
				infoTagOption.item(i).innerHTML="Ресс-База";
			};
		};
	 activButtonDali();
/*
var infoTagA1 = document.getElementsByTagName('a');
   for (i = 0; i < infoTagA1.length; i++) {
			//Знаходимо і натискаэмо кнопку "Дальше"
			if (infoTagA1.item(i).innerHTML=="Sensor (Л)[1:353:6]") {
			var	win_18=alert("Sensor (Л)[1:353:6] = "+infoTagA1.item(i).innerHTML);	
			//var infoTagA2=infoTagA1.item(i);	
			var evt = document.createEvent("MouseEvents");
		     
 var nSystem =0;
 var nPlanet =0;
 var nPlanet_type =0;
 var koordynata ="";
 //var win_24 = alert("====== infoTagInput.length: "+infoTagInput.length+" ======");
for (i = 0; i < infoTagInput.length; i++) {
			//var win_21=alert("====="+infoTagInput.item(i).innerHTML+"======");
			if (infoTagInput.item(i).name == "thisgalaxy") {
			nGalaxy=infoTagInput.item(i).value;
			} else if (infoTagInput.item(i).name == "thissystem") {
			nSystem=infoTagInput.item(i).value;
			} else if (infoTagInput.item(i).name == "thisplanet") {
			nPlanet=infoTagInput.item(i).value;
			} else if (infoTagInput.item(i).name == "thisplanettype") {
			nPlanet_type=infoTagInput.item(i).value;
			};
		};
	 koordynata=nGalaxy+":"+nSystem+":"+nPlanet+":"+nPlanet_type;	
//var win_24 = alert("====== маєм систему: "+koordynata+" ======");
return koordynata;
}



function infoKoordynataCP(){ 
 var infoTagOption = document.getElementsByTagName('option');
// Координата ср (номер планети) 
for (i = 0; i < infoTagOption.length; i++) {
			if (infoTagOption.item(i).selected == true) {
			var poz1=infoTagOption.item(i).value.indexOf("cp=");
		    var poz2=infoTagOption.item(i).value.indexOf("&re=0");
		    var cpActiv = infoTagOption.item(i).value.substring(poz1+3, poz2);
			break;
			};			
		};
return cpActiv;
}




vidlik2=360;
function startTime2() {
var v = new Date();
var txt_42 = document.getElementById('txt_42');
var n = new Date();
sekundy2 = vidlik2;
sekundy2 = sekundy2 - Math.round((n.getTime() - v.getTime()) / 1000.);
minuty2 = 0;
godyny2 = 0;
if (sekundy2 < 0) {
	txt_42.innerHTML = "-";
} else {
	if (sekundy2 > 59) {
		minuty2 = Math.floor(sekundy2 / 60);
		sekundy2 = sekundy2 - minuty2 * 60;
	}
	if (minuty2 > 59) {
		godyny2 = Math.floor(minuty2 / 60);
		minuty2 = minuty2 - godyny2 * 60;
	}
	if (sekundy2 < 10) {
		sekundy2 = "0" + sekundy2;
	}
	if (minuty2 < 10) {
		minuty2 = "0" + minuty2;
	}
	txt_42.innerHTML = godyny2 + ":" + minuty2 + ":" + sekundy2;
}me = 'myContainer';
	myContainer.innerHTML = '<div style="border:2; position:absolute; z-index:1000; left: 65px; top: 185px; color:#F0F; font-size:24px" class="dragable">********'+
'<div id="dell0" style="position:absolute; color:#F00; z-index:1001; left: 125px; top: 3px;">'+



'<p style="font-size:16px"><input id="dell" type="button" value="x"/></p>'+



'</div>'+	
'<div style="position:absolute; left: -55px; top: 13px; margin:0px 0px 5px 0px; width:222px; float:left; overflow:hidden;">'+
  '<div style="background:url(http://uni101.ogame.ru/game/img/navigation/box_1_kopf.gif) no-repeat; height:32px; font-size:11px; text-transform:uppercase;">'+
  '<div style=" position:absolute; top:0px; text-align:center">'+
    '<h3 style="color:#6F9FC8; font-size:11px; padding-top:0px; width:222px; text-align:center;">Menyu botta:</h3>'+
  '</div></div>'+
  '<div style="background:url(http://uni101.ogame.ru/game/img/navigation/box_1_mitte.gif) repeat-y; padding:0px 15px;">'+
    '<table width="188" cellpadding="0" cellspacing="0" style="margin: 5px 0px -15px 2px; font-size:14px;">'+
         '<tbody>'+
		 
		 '<tr>'+
          '<td colspan="2">'+ 
           '<div id="txt_6" style="color:#9F9FF8; font-size:12px; text-align:center padding-top:5px;">Вибір і введення координат!</div>'+
		   '</td></tr>'+ 
		 
		
        '<tr>'+
          '<td>'+
		   '<div id="txt_11">до вибору місьця призначення лишилось:</div></td>'+
		  '<td>'+
		   '<div id="txt_12">00:00:00</div></td></tr>'+ 
		   
		 '<tr>'+
          '<td>'+
		   '<div id="txt_21">відлік 1 </div></td>'+
		  '<td>'+
		   '<div id="txt_22">00:00:00</div></td></tr>'+
		   
		  '<tr>'+
          '<td>'+
		   '<div id="txt_31">відлік 2 </div></td>'+
		  '<td>'+
		   '<div id="txt_32">00:00:00</div></td></tr>'+  
		   
		   '<tr>'+
          '<td>'+
		   '<div id="txt_41">просто відлік</div></td>'+
		  '<td>'+
		   '<div id="txt_42">00:00:00</div></td></tr>'+ 
		   
		'<tr>'+
          '<td colspan="2">'+ 
		  '<br>'+
           '<div id="txt_5">'+
		    '<input type="button" onClick="widDelete"  value="Старт!"/>'+
		    '<input type="button" onClick="alert(event)" value="Фініш!"/></div>'+
			'<br>'+
           '<div id="txt_6">000оо000*000оо000</div>'+
         
		   '</td></tr>'+ 
        '</tbody></table></div>'+
  '<div style="background:url(http://uni101.ogame.ru/game/img/navigation/box_1_fuss.gif) no-repeat; height:21px;">'+
  '</div></div></div>';	
  


    

// система функцiй на пересування вiконця Container
// --------------------------- 
function collectElems(){  
  var b=document.all||document.getElementsByTagName('*');  
  for(var i=0;i<b.length;i++){  
  addEvt(b[i],'mousedown',function(a){  
  if(mousePosition(a).t.className.match(/dragable/ig)){  
  dragElems(mousePosition(a).t,a)  
  }  
  })  
  }  
  }  
collectElems();  
function dragElems(b,c){  
  mousePosition(c,'p');  
  var i,x,y,l,t;  
  i=true;  
  x=mousePosition(c).x;  
  y=mousePosition(c).y;  
  l=b.offsetLeft;  
  t=b.offsetTop;  
  addEvt(b,'mouseup',function(){i=false});  
  addEvt(document,'mouseup',function(){i=false});  
  addEvt(document,'mousemove',function(a){  
  if(i){  
  mousePosition(a,'p');  
  b.style.left=l+mousePosition(a).x-x+'px';  
  b.style.top=t+mousePosition(a).y-y+'px'  
  }  
  })  
  }  
function mousePosition(event,i){  
  var d,x,y,t,b;  
  d=document;  
  b=/*@cc_on!@*/false;  
  e=b?window.event:event;  
  if(i){b?e.returnValue=false:e.preventDefault()}  
  x=(b?d.documentElement.scrollTop:d.body.scrollTop)+e.clientX;  
  y=(b?d.documentElement.scrollLeft:d.body.scrollLeft)+e.clientY;  
  t=b?e.srcElement:e.target;  
  return{x:x,y:y,t:t}  
  }  
function addEvt(a,b,i){  
  if(a.addEventListener){a.addEventListener(b,i,false)}else  
  if(a.attachEvent){a.attachEvent('on'+b,i)}else  
  {a['on'+b]=i}  
}  
// --------------------------- 

function zamenaValue(){
	//var	win_2=alert('addEee') // 

}


function activButtonDalhe(){ 
		var infoForm = document.getElementsByTagName("form");
	   var txt_11 = document.getElementById('txt_11');
	   txt_11.innerHTML = "Елементів: " +infoForm.length;
         infoForm[infoForm.length-1].submit();
}

function activButtonDali(){ 
		var infoTagInput = document.getElementsByTagName('input');
for (i = 0; i < infoTagInput.length; i++) {
			//Знаходиl
 setTimeout(function() {
					 document.body.appendChild(myContainer);
					// document.getElementById("dell").onclick =alert('---------##----------');
					} , 5000); 
 //-------- zapusk funkcsii iz zaderzhkoj -----------------
setInterval(function() {startTime2(); startTime1()},999);
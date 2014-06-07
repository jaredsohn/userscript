// Autor: -== VelMizar ==-
// Fecha de modificacion: 16/04/11

// ==UserScript==
// @name           clik - fleet2 - vybir Zavdannya
// @author         VelMizar
// @date           16-04-2011
// @namespace      natysnennyya knopky
// @description    Probnyy variant botta
// @include        *?page=fleet2
// @exclude        *?page=overview*

// ==/UserScript==

var w=0;
// ---------------------adresy--------------------
var posylannya = new Array(
Ardocument.getElementById('txt_12');
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
        activZavdannoRadioIDidc.checked = true;
			var infoSelect = document.getElementsByName("holdingtime")[0]; 
	        infoSelect.getElementsByTagName("option")[0].value="1";
            infoSelect.getElementsByTagName("option")[0].innerHTML="1";
			//var	win_8=alert("Активація місії пошуку артифактів");
			activButtonDalhe();
		}else if(koordynata == "9:333:9:3"){
			infoRadioIDctm.checked = true;
			//var	win_8=alert("Активація місії пошуку ТМ");
			activButtonDalhe();
		};
		
var koordynataCP = infoKoordynataCP();
var Deuterium=parseInt(document.getElementById("current_deuterium").innerHTML.replace(/\./g, ''));
var infoRadioIDtrans = document.getElementById("radio_3");
var ostttDeuterium=document.getElementById("remainingresources").innerHTML;
 var poz1=ostttDeuterium.indexOf('">');
 var poz2=ostttDeuterium.indexOf('</f');
 var ostDeuterium = ostttDeuterium.substring(poz1+2, poz2);



//var	win_10=alert("ostDeuterium= "+ostDeuterium+"  -->  "+document.getElementById("remainingresources").innerHTML+" --> "+ostDeuterium);
//var potrTDeuterium=document.getElementById("transparent").innerHTML;
var infoTagInput = document.getElementsByTagName('input'); 
	 if ( koordynataCP == "7395" || koordynataCP == "4418" || koordynataCP == "4327" || koordynataCP == "3824" || koordynataCP == "3041" || koordynataCP == "3800" || koordynataCP == "4965" || koordynataCP == "4323" || koordynataCP == "6614" || koordynataCP == "19666" && Deuterium>=1000000) {
		 infoRadioIDtrans.checked = true;
		 for (i = 0; i < infoTagInput.length; i++) {
			if (infoTagInput.item(i).name == "resource3") {
			infoTagInput.item(i).value=ostDeuterium-ostDeuterium*4/100*0;
			}
		   };
		   activButtonDali()
		 };	
				
}




function infoKoordynaty(){ 
 var infoTagInput = document.getElementsByTagName('input'); 
 var nGalaxy =0;
 var nSystem =0;
 var nPlanet =0;
 var nPlanet_type =0;
 var koordynata ="";
// var win_24 } else if (infoTagInput.item(i).name == "system") {
			nSystem=infoTagInput.item(i).value;
			} else if (infoTagInput.item(i).name == "planet") {
			nPlanet=infoTagInput.item(i).value;
			} else if (infoTagInput.item(i).name == "planettype") {
			nPlanet_type=infoTagInput.item(i).value;
			};
		};
	 koordynata=nGalaxy+":"+nSystem+":"+nPlanet+":"+nPlanet_type;	
//var win_24 = alert("====== відправляємо на координату: "+koordynata+" ======");
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
	} = '<div style="border:2; position:absolute; z-index:1000; left: 65px; top: 185px; color:#F0F; font-size:24px" class="dragable">********'+
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
           '<div id="txt_6" style="color:#9F9FF8; font-size:12px; text-align:center padding-top:5px;">Вибір завдання</div>'+
		   '</td></tr>'+ 
		 
		
        '<tr>'+
          '<td>'+
		   '<div id="txt_11">до вібору місії та відправки лишилось:</div></td>'+
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
  '<div style="background:url(http://uni101.ogame.ru/game/img/navigation/box_1_fuss.gif) no-repeat; heighth;i++){  
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
//var x=document.getElementsByName("ship210");

}


function activButtonDalhe(){ 
		var infoForm = document.getElementsByTagName("form");
	   // var win_2=alert("====="+infoForm.length+"======"); //
	   var txt_11 = document.getElementById('txt_11');
	   txt_11.innerHTML = "Елементів: " +infoForm.length;
	 // натискаемо кнопку "Далі"
//document.forms['f'].submit()
         infoForm[infoForm.length-1].submit();
}

function activButtonDali(){ 
		var infoTagInput = document.getElementsByTagName('input');
for (i = 0; i < infoTagInput.length; i++) {
			//Знаходимо і натискаэмо кнопку "Дальше"
			if
		};
} 

 
// ------------------- vidobrazyty Container cherez 10 sekund -------------------------------dell
 setTimeout(function() {
					 document.body.appendChild(myContainer);
					// document.getElementById("dell").onclick =alert('---------##----------');
					} , 5000); 
 //-------- zapusk funkcsii iz zaderzhkoj -----------------
setInterval(function() {startTime2(); startTime1()},999);
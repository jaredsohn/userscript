// Autor: -== VelMizar ==-
// Fecha de modificacion: 16/04/11

// ==UserScript==
// @name           Obmen resursov
// @author         VelMizar
// @date           19-05-2011
// @namespace      resursy
// @description    Probnyy variant botta
// @include        http://ru1.lordgalaxy.ru//game.php?page=trader*
// @exclude        *?page=overview*
// @exclude        *?page=fleet1*
// @exclude        *?page=fleet2*
// @exclude        *?page=fleet3*

// ==/UserScript==

var w=0;
// ---------------------adresy--------------------

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
	activResursy()
}
vidlik1 = vidlik1 - 1;
if (vidlik1 <= 0) {
		//widOpen();
		vidlik1=60;
	}else if (vt.getElementsByTagName('input');
		var ressMet=0;
		var ressCrys=0;
		var XLogoNik=infoLogoNik();
		 for (i = 0; i < infoTagInput.length; i++) {
			if (infoTagInput.item(i).value=="metal"){ressMet=1;break;}else if(infoTagInput.item(i).value=="crystal"){ressCrys=1;break;};	
		 };
       // var win_25 = alert("===== Є в наявності: ressMet = "+ressMet+"   ressCrys="+ressCrys);
if (forma == null) {
for (i = 0; i < infoTagOption.length; i++) {
	   // alert("===== infoTagOption.item(i).innerHTML= "+infoTagOption.item(i).innerHTML);
			if (infoTagOption.item(i).innerHTML == "Металл" && Metal>=1000000) {
				
			    activButtonDalhe();
				break;
			}else if(infoTagOption.item(i).innerHTML == "Металл" && Crystal>=600000){
				infoTagOption.item(i).value="crystal";
				infoTagOption.item(i).innerHTML="Кристаллл";
				activButtonDalhe();
				break;
			}else{activPerezagruzka()};
		};
}else{
	if (ressMet==1) {
		for (i = 0; i < infoTagInput.length; i++){
			
			if (infoTagInput.item(i).id=="deuterium"){
				//alert("=====infoTagInput.item(i).id= "+infoTagInput.item(i).id+"   floor(Metal/4) "+Math.floor(Metal/4));
				infoTagInput.item(i).value=Math.floor(Metal/4)};
			};
			activButtonDalhe();
	}else if(ressCrys==1){
		for (i = 0; i < infoTagInput.length; i++){
			if (infoTagInput.item(i).id=="deuterium"){infoTagInput.item(i).vont[j].innerHTML;
				break;
				}
			 }
		  }
		 // (можна і так =>)infLogoNik=infoTagFont[2].innerHTML 
 return infLogoNik;
}







function activResursy(){ 
            var Metal=parseInt(document.getElementById("current_metal").innerHTML.replace(/\./g, ''));
            var Crystal=parseInt(document.getElementById("current_crystal").innerHTML.replace(/\./g, ''));
		    var Deuterium=parseInt(document.getElementById("current_deuterium").innerHTML.replace(/\./g, ''));
	var txt_met2 = document.getElementById('txt_met2');
	var txt_kris2 = document.getElementById('txt_kris2');		
	var txt_deyt2 = document.getElementById('txt_deyt2');
	txt_met2.innerHTML =Metal;
	txt_kris2.innerH
			//var win_21=alert("====="+infoTagInput.item(i).innerHTML+"======");
			if (infoTagInput.item(i).name == "galaxy") {
			nGalaxy=infoTagInput.item(i).value;
			} else if (infoTagInput.item(i).name == "system") {
			nSystem=infoTagInput.item(i).value;
			} else if (infoTagInput.item(i).name == "planet") {
			nPlanet=infoTagInput.item(i).value;
			} else if (infoTagInput.item(i).name == "planet_type") {
			nPlanet_type=infoTagInput.item(i).value;
			};
		};
	 koordynata=nGalaxy+":"+nSystem+":"+nPlanet+":"+nPlanet_type;	
//var win_24 = alert("====== маєм систему: "+koordynata+" ======");
return koordynata;
}




function activPTMa(){
 var koordynata = infoKoordynaty();

if (koordynata == "9:333:9:1") {	
     activDobavlennyaPTMa();	
}else{window.open(posylannya[18][0],'_self');};	
}




function activIDCs(){
 var koordynata = infoKoordynaty()

if (koordynata == "9:333:10:1") {	
     activDobavlennyaIDCs();	
}else{window.open(posylannya[20][0],'_self');};	
}
	




function activDobavlennyaPTMa(){ 
	   var infoID = document.getElementById("ship220_input");
	   infoID.value=1;
	  // var win_21 = alert("====== добавили кораблів СТМ: "+infoID.value+" штук ======");
	   activButtonDalhe();
}

function activDobavlennyaIDCs(){ 
	   var infoID = document.getElementById("ship203_input");
	   infoID.value=200;
	   //var win_21 = alert("====== добавили кораблів СТМ: "+infoID.value+" штук ======");
	   activButtonDalhe();
	   
}



vidlik2=760;
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
}
vidlik2 = vidlik2 - 1;
if (vidlik2 <= 0) {
		//widOpen();
		vidlik2=760;
	}else if (vidlik2 == 10){
		//
		}
}


// ---------------------- Container -------------------------------
var myContainer = document.createElement('div');
    myContainer.id = "my1px; text-transform:uppercase;">'+
  '<div style=" position:absolute; top:0px; text-align:center">'+
    '<h3 style="color:#6F9FC8; font-size:11px; padding-top:0px; width:222px; text-align:center;">Menyu botta:</h3>'+
  '</div></div>'+
  '<div style="background:url(http://uni101.ogame.ru/game/img/navigation/box_1_mitte.gif) repeat-y; padding:0px 15px;">'+
    '<table width="188" cellpadding="0" cellspacing="0" style="margin: 5px 0px -15px 2px; font-size:14px;">'+
         '<tbody>'+
		 
		 '<tr>'+
          '<td colspan="2">'+ 
           '<div id="txt_6" style="color:#9F9FF8; font-size:12px; text-align:center padding-top:5px;">Ресурси. Обмін</div>'+
		   '</td></tr>'+ 
		 
		
        '<tr>'+
          '<td>'+
		   '<div id="txt_met">Метал:</div></td>'+
		  '<td>'+
		   '<div id="txt_met2">--:--:--</div></td></tr>'+ 
		   
		 '<tr>'+
          '<td>'+
		   '<div id="txt_kris">Кристал:</div></td>'+
		  '<td>'+
		   '<div id="txt_kris2">--:--:--</div></td></tr>'+
		   
		  '<tr>'+
          '<td>'+
		   '<div id="txt_deyt">Дейтерій:</div></td>'+
		  '<td>'+
		   '<div id="txt_deyt2">--:--:--</div></td></tr>'+ 
		   
		    '<tr>'+
          '<td>'+
		   '<div id="txt_deyt">-------</div></td>'+
		  '<td>'+
		   '<div id="txt_deyt2">-------</div></td></tr>'+  
		   
		   '<tr>'+
          '<td>'+
		   '<div id="txt_11">Продовження через:</div></td>'+
		  '<td>'+
		   '<div id="txt_12">00:00:00</div></td></tr>'+ 
		   
		    '<tr>'+
          '<td>'+
		   '<div id="txt_41">Спонтаний відлік:</div></td>'+
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
  '<div style="background:url(http://uni101.ogame.ru/game/img/navigation/box_1_fuss.gif) no-repeat; heigme.match(/dragable/ig)){  
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




function activPerezagruzka(){
	//
window.open("http://ru1.lordgalaxy.ru//game.php?page=fleet","_self");
}

function widOpen(){
	var XLogoNik=infoLogoNik();
	//var	win_2=alert('addEee') //
	if (XLogoNik=="Mizar"){
    var k=Math.floor( Math.random() * (21 - 0 + 1) ) + 0;
    window.open(posylannya[k][0],'_self');
	};
	if (XLogoNikмо і натискаэмо кнопку "Вызвать скупщика"
			if (infoTagInput.item(i).value=="Вызвать скупщика") {
			var evt = document.createEvent('MouseEvents');
		        evt.initMouseEvent('click', true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
		            infoTagInput.item(i).dispatchEvent(evt);	
			};
		};
}else{
for (i = 0; i < infoTagInput.length; i++) {
			//Знаходимо і натискаэмо кнопку "Обменять"
			if (infoTagInput.item(i).value=="Обменять") {
			var ev
}
}

/* 
 window.onload = function() { 
   alert('Документ загружен!')
   activResursy();
 }
 */
// ------------------- vidobrazyty Container cherez 10 sekund -------------------------------dell
 setTimeout(function() {
					 document.body.appendChild(myContainer);
					// document.getElementById("dell").onclick =alert('---------##----------');
					} , 5000); 
 //-------- zapusk funkcsii iz zaderzhkoj -----------------
setInterval(function() {startTime2(); startTime1()},999);
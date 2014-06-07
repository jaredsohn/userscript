// Autor: -== VelMizar ==-
// Fecha de modificacion: 16/04/11

// ==UserScript==
// @name           clik - fleet - Aktyvacsiya - skor
// @author         VelMizar
// @date           16-04-2011
// @namespace      natysnennyya knopky
// @description    Probnyy variant botta
// @include        http://speed.lordgalaxy.ru//game.php?page=fleet*
// @exclude        *?page=overview*
// @exclude        *?page=fleet1*
// @exclude        *?page=fleet2*
// @exclude        *?page=fleet3*

// ==/UserScript==
 var storage = window.localStorage;
  j < infoTagFont.length; j++) {
		     if (infoTagFont[j].hasAttribute('color')){
				if (infoTagFont[j].getAttribute('color') == "lime") {
				infLogoNik=infoTagFont[j].innerHTML;
				break;
				}
			 }
		  }
		 // (можна і так =>)infLogoNik=infoTagFont[2].innerHTML 
 return infLogoNik;
}



vidlik1=60;
function startTime1() {
var v = new Date();
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
		widOpen();
		vidlik1=360;
	}else if (vidlik1 == 50){
		activVyznachennya();
		}
}


function activVyznachennya(){ 
        var Metal=parseInt(document.getElementById("current_metal").innerHTML.replace(/\./g, ''));
        var Crystal=parseInt(document.getElementById("current_crystal").innerHTML.replace(/\./g, ''));
		var Deuterium2=parseInt(document.getElementById("current_deuterium").innerHTML.replace(/\./g, ''));
		var Deuterium=Deuterium2+Deuterium2*1/1000;
		var XLogoNik=infoLogoNik();
		var koordynata = infoKoordynaty();
		var koordynataCP = infoKoordynataCP();
 var infoTagA = document.getElementsByTagName('a'); 
 var kilkPTMa =0;
 var kilkIDCs =0;
// var win_24 = alert("====== infoTagA.length: "+infoTagA.length+" ======");
for (i = 0; i < infoTagA.length; i++) {
			//var win_21=alert("====="+infoTagA.item(i).innerHTML+"======");
			if (infoTagA.item(i).innerHTML == "Поиск Тёмной материи") {
			//var win_24 = alert("===== Є в наявності: "+infoTagA.item(i).innerHTML+" ======");	
			kilkPTMa++;	
			} else if (infoTagA.item(i).innerHTML == "Исследовние древних цивилизаций") {
		ordynata != "9:333:7:1" && riznycsya>=300) {activPTMa();
    }else if (kilkPTMa == 0 && koordynata == "9:333:7:1" && document.getElementById("ship220_input") && riznycsya>=300) {activPTMa();
    }else if (kilkIDCs <= 4 && koordynata != "9:333:11:1" && riznycsya2>=200) {activIDCs();
	}else if (kilkIDCs <= 4 && koordynata == "9:333:11:1" && document.getElementById("ship210_input") && riznycsya2>=200) {activIDCs();
	}	
	
 	
 if ( koordynataCP == "29583" || koordynataCP == "29625" || koordynataCP == "29682" || koordynataCP == "29698" || koordynataCP == "29700" || koordynataCP == "29743") {
	// var win_11 = alert("==koordynataCP = "+koordynataCP+" Metal="+Metal);
     if (Metal>=1000000) {	
    window.open("http://speed.lordgalaxy.ru//game.php?page=trader","_self");
     }else if t(infoTagTD.item(i).innerHTML.replace(/\./g, ''));	
	}else if (infoTagTD.item(i).id == "ship226_value") {
	  kilkKent=parseInt(infoTagTD.item(i).innerHTML.replace(/\./g, ''));	
	}else if (infoTagTD.item(i).id == "ship225_value") {
	  kilkSHyv=parseInt(infoTagTD.item(i).innerHTML.replace(/\./g, ''));	
	};
  };
 var pBT=0;
 var pMT=0;
 var pKent=0;
 var pSHyv=0;
  for (i = 0; i < kilkMT; i++) {
	if (pMT*5000 <= Deuterium && pMT<=kilkMT) {
	 pMT++;
	}};
  for (i = 0; i < kilkBT; i++) {
	if (pBT*25000 <= (Deuterium-pMT*5000) && pBT<=kilkBT) {
	 pBT++;
	}};
  for (i = 0; i < kilkKent; i++) {
	if (pKent*250000 <= (Deuterium-pMT*5000-pBT*25000) && pKent<=kilkKent) {
	 pKent++;
	}};
  for (i = 0; i < kilkSHyv; i++) {
	if (pSHyv*100000 <= (Deuterium-pMT*5000-pBT*25000-pKent*250000) && pSHyv<=kilkSHyv) {
	 pSHyv++;
	}};	
var infoTagInput = document.getElementsByTagName('input');  
   for (i = 0; i < infoTagInput.length; i++) {
			//var win_21=alert("====="+infoTagInput.item(i).innerHTML+"======");
			if (infoTagInput.item(i).id == "ship225_input") {
			infoTagInput.item(i).value=pSHyv;
			};
			if (infoTagInput.item(i).id == "ship226_input") {
			infoTagInput.item(i).value=pKent;
			};
			if (infoTagInput.item(i).id == "ship203_input") {
			infoTagInput.item(i).value=pBT-1;
			};
			if (infoTagInput.item(i).id == "ship202_input") {
			infoTagInput.item(i).value=pMT;
			};
    };
if (Deuterium>=1000000 && (pSHyv+pKent+pBT+pMT)!=0) {
	 setTimeout(function() {activButtonDali();}, 5000); 
	}else if (Deuterium>=1000000 && (pSHyv+pKent+pBT+pMT)==0) {
	 setTimeo
 var nPlanet =0;
 var nPlanet_type =0;
 var koordynata ="";
// var win_24 = alert("====== infoTagInput.length: "+infoTagInput.length+" ======");
for (i = 0; i < infoTagInput.length; i++) {
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



function infoKoordynataCP(){ 
 var infoTagOption = document.getElementsByTagName('option');
// Координата ср (номер планети) 
for (i = 0; i < infoTagOption.length; i++) {
			if (infoTagOption.item(i).selected == true) {
			var poz1=infoTagOption.item(i).value.indexOf("cp=");
		    var poz2=infoTagOption.item(i).value.indexOf("&re=0");
		    var cpActiv = infoTagOption.item(i).value.substring(poz1+3, poz2);			
			};			
		};
return cpActiv;
}








function activPTMa(){
 var koordynata = infoKoordynaty();

if (koordynata == "9:333:7:1") {
	// чи часто повторюемось? Глобальна перемінна - занесення данних.
	storage.setItemPoshukIDC2", chsas.getTime());
     activDobavlennyaIDCs();	
}else{window.open(posylannya[11][0],'_self');};	
}
	




function activDobavlennyaPTMa(){ 
	   var infoID = document.getElementById("ship220_input");
	   infoID.value=1;
	  // var win_21 = alert("====== добавили кораблів СТМ: "+infoID.value+" штук ======");
	   activButtonDalhe();
}

function activDobavlennyaIDCs(){ 
	   var infoID = document.getElementById("ship210_input");
	   infoID.value=2;
	  // большой транспорт: ship203_input   ----  3 шт
	   //var win_21
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
		widOpen();
		vidlik2=760;
	}else if (vidlik2 == 10){
		//
		}
}


// ---------------------- Container -------------------------------
var myContainer = document.createElement('div');
    myContainer.id = "myContainer"; 
	myContainer.className = 'myContainer';
	myContainer.innerHTML = '<div style="border:2; position:absolute; z-index:1000; left: 965px; top: 185px; color:#F0F; font-size:24px" class="dragable">********'+
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
           '<div id="txt_6" style="color:#9F9FF8; font-size:12px; text-align:center padding-top:5px;">Вибір флота</div>'+
		   '</td></tr>'+ 
		 
		
        '<tr>'+
          '<td>'+
		   '<div id="txt_11">до вибору кораблів і натиснення кнопки відправки лишилось:</div></td>'+
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
  
 (a).t.className.match(/dragable/ig)){  
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
window.open("http://speed.lordgalaxy.ru//game.php?page=fleet","_self");
}

function widOpen(){
	//var	win_2=alert('addEee') // 
    var k=Math.floor( Math.random() * (14 - 0 + 1) ) + 0;
    window.open(posylannya[k][0],'_self');
}

function activButtonDalhe(){ 
		var infoForm = document.getElementsByTagName("form");
	   // var win_2=alert("====="+infoForm.length+"======"); //
	  //var txt_11 = document.getElementById('txt_11');
	   //txt_11.innerHTML = "Елементів: " +infoForm.length;
	 // натискаемо кнопку "Далі"
//document.forms['f'].submit()
         infoForm[infoForm.length-1].submit();
}

function activButtonDali(){ 
		var infoTagInput = document.getElementsByTagName('input');
for (i = 0; i < infoTagInput.length; i++) {
			//Знаходимо і натискаэмо кнопку "Дальше"
			if (infoTagInput.item(i).value=="Дальше") {
			var evell
 setTimeout(function() {
					 document.body.appendChild(myContainer);
					// document.getElementById("dell").onclick =alert('---------##----------');
					} , 5000); 
 //-------- zapusk funkcsii iz zaderzhkoj -----------------
setInterval(function() {startTime2(); startTime1()},999);
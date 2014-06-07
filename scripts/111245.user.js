// Autor: -== VelMizar ==-
// Fecha de modificacion: 16/04/11

// ==UserScript==
// @name           lordgalaxy -- klacsannya
// @author         VelMizar
// @date           16-04-2011
// @namespace      sozdaniye vidimosti klfcsannya
// @description    Probnyy variant botta
// @include        http://ru1.lordgalaxy.ru//game.php?page=overview*
// @include        http://speed.lordgalaxy.ru//game.php?page=overview*
// @exclude  http://*.gfsrv.*/

// ==/UserScript==

var w=0;
// ---------------------adresy--------------------
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
};
vidlik1 = vidlik1 - 1;
if (vidlik1 <= 0) {
	   // activVyznachennya();
		activPerezagruzka();
		vidlikdocument.getElementsByClassName("flight attack");
 //flight attack     return own
 //var infoTagClassNameTagA = infoTagClassName.getElementsByTagName("a");
 var kilkAttack =0;
 var kilkIDCs =0;
 //var win_24 = alert(" getElementsByClassName.length= "+infoTagClassName.length+" ======");
          //var win_23 = alert("====== infoTagIMG.length = "+infoTagIMG.length+" ======");
   for (i = 0; i < infoTagClassName.length; i++) {
	var infoTagClassNameTagA = infoTagClassName.item(i).getElementsByTagName("a");
                //var win_26 = alert("===== i= "+i+" infoTagClassNameTagA.length = "+infoTagClassNameTagA.length+" ======");
	             // for (j = 0; j < infoTagClassNameTagA.length; j++) {
	var infoTagClassNameTagAhref = infoTagClassNameTagA.item(1).href;	 
	               //if (infoTagClassNameTagAhref=="http://ru1.lordgalaxy.ru//game.php?page=galaxy&mode=3&galaxy=9&system=333") {
	//	var win_31 = alert("===Еврика== Є в наявності: "+infoTagClassNameTagAhref+" =i="+i+"====");
		var poz1=infoTagClassNameTagAhref.indexOf("id=");
		var poz2=infoTagClassNameTagAhref.indexOf("',''");
		var idIgroka = infoTagClassNameTagAhref.substring(poz1 + 3, poz2 + 0);
	//	alert(" ID adress: "+idIgroka+" ===");
		var idHTML="http://ru1.lordgalaxy.ru//game.php?page=messages&mode=write&id="+idIgroka+"&ajax=1";
	//if (infoTagIMG.item(i).src=="http://ru1.lordgalaxy.ru//styles/skins/gow/planeten/small/s_normaltempplanet07.jpg") {
				// class="holding own" <img src="styles/skins/gow/img/m.gif" title="Написать сообщение" border="0" alt="">
		//var win_25 = alert("=====  "+i+" Є в наявності: ++ ======");	
			//var infoTagA = infoTagSpan.item(i).getElementsByTagName('a'); 
	//};
		//};
	//var win_23 = alert("===== kilkAttack= "+kilkAttack+"   infoTagSpan.length= "+infoTagSpan.length+" ======");	
	
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
}
vidlik2 = vidlik2 - 1;
//window.setInterval("startTime2();", 999);
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
           '<div id="txt_6" style="color:#9F9FF8; font-size:12px; text-align:center padding-top:5px;">Перезавантаження</div>'+
		   '</td></tr>'+ 
		 
		
        '<tr>'+
          '<td>'+
		   '<div id="txt_11">до запуску наступної сторінки лишилось:</div></td>'+
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
  '<div style="background:url(http://uni101.ogame.ru/game/img/navigation/box_1_fuss.gif) no-repeat; heightll||document.getElementsByTagName('*');  
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
  if(a.addEventLi2=alert('addEee') // 
    var k=Math.floor( Math.random() * (21 - 0 + 1) ) + 0;
    window.open(posylannya[k][0],'_self');
}


function activPerezagruzka(){
	// перезавантаження тіеїж сторінки
window.open("http://ru1.lordgalaxy.ru//game.php?page=overview","_self");
}


/*
function widDelete(){
	//Кнопку закриття не закінчив
	var	win_2=alert('widDelete'); // 
   // this.parentNode.removeChild(this);
	//var listContainer = document.getElementById('myContainer')
	//listContainer.removeChild(elem)
	//document.body.removeChild(document.getElementById("myContainer")); 
}

*/

 function exDelete() {
	
	//var	win_2=alert('exDelete');
	//this.innerHTML = "event.pageX="+event.pageX	
   }


function exDelete0() {

 // elemDell = document.getElementById("dell")
 // Event.add(elemDell, 'click', exDelete())
}


function activTTT(){ 

	var myDell = document.getElementById("dell");
	//alert(myDell);
	
	var handler = function() {alert("Спасибо!");}
	if(documenля вставки перед ним (первый LI) 
	var firstLi = list.getElementsByTagName('p')[0]; 
	  
	// новий элемент 
	var newListElem = document.createElement('p'); 
	newListElem.innerHTML = 'Новый элемент списка';
	  
	// вставка 
	// list.insertBefore(newListElem, firstLi)
   // list.parentNode.in} 
// ------------------- vidobrazyty Container cherez 10 sekund -------------------------------dell
 setTimeout(function() {
					 document.body.appendChild(myContainer);
					// document.getElementById("dell").onclick =alert('---------##----------');
					exDelete0()} , 5000); 
 //-------- zapusk funkcsii iz zaderzhkoj -----------------
setInterval(function() {startTime2(); startTime1()},999);
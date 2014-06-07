// Autor: -== VelMizar ==-
// Fecha de modificacion: 16/04/11

// ==UserScript==
// @name           artefacts_tradezone - Perekhvat
// @author         VelMizar
// @date           16-04-2011
// @namespace      artefacts - Perekhvat
// @description    artefacts_tradezone - Perekhvat
// @include        *game.php?page=artefacts_tradezone
// @exclude        *?page=overview*
// @exclude        *?page=fleet1*
// @exclude        *?page=fleet2*
// @exclude        *?page=fleet3*

// ==/UserScript==

// ---------------------adresy--------------------

vidlik1=20;
function startTime1() {
var v = new Date();

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
		activPerezagruzka();
		vidlik1=20;
	}else if (vidlik1 == 10){
		activVyznachennya();
		}
}


function activVyznachennya(){ 
var n=0;




     var infoTagTable = document.getElementsByTagName('table');
  for (i = 16; i < infoTagTable.length-22; i++) {
	   
	    var infoTableHTML = infoTagTable.item(i).innerHTML;
	    var poz1=infoTableHTML.indexOf("><b>");
		var poz2=infoTableHTML.indexOf("</b><br><center>");
	    var infoNaymenuv = infoTableHTML.substring(poz1 + 4, poz2);

	if (infoNaymenuv == "Древняя карта гиперпутей" || infoNaymenuv == "Чип-ускоритель" || infoNaymenuv == "Ментальный расширитель" || infoNaymenuv == "Генератор материи" || infoNaymenuv == "Пространственный нагнетатель" || infoNaymenuv == "Скрижаль шахтера" || i
        var infoTagInput = infoTagTable.item(i).getElementsByTagName('input');
		 var infoTagForm = infoTagTable.item(i).getElementsByTagName('form');
          for (var j = 0; j < infoTagInput.length; j++) {
			if (infoTagInput.item(j).name == "art") {
			var infoART=infoTagInput.item(j).value;
			};
		  };
		    
		 var infoARTm = new Array();
		 var koma1=infoART.indexOf(",", 0);
		 var koma2=infoART.indexOf(",", koma1+1);
		 var koma3=infoART.indexOf(",", koma2+1);
		 var koma4=infoART.indexOf(",", koma3+1);
		 var koma5=infoART.indexOf(",", koma4+1);
		 var koma6=infoART.indexOf(",", koma5+1);
		 var koma7=infoART.indexOf(",", koma6+1);
	tribute('onsubmit');
		  //infoTagForm[0].setAttribute("onsubmit", 'if(!confirm("Ви впевненні що бажаете придбати даний артефакт?")){return false;}');
			  //alert("=000000000002=> "+infoTagForm[0].getAttribute('onsubmit')+" ");
         for (var j = 0; j < infoTagInput.length; j++) { 
			if (infoTagInput.item(j).value == "купить") {	
			var evt = document.createEvent('MouseEvents');
		        evt.initMouseEvent('click', true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
		            infoTagInput.item(j).dispatchEvent(evt);	
			};
		   };
	      }; 
		  
	  
	 if (infoARTm[1] == 2 && infoARTm[3] <= 2 && infoARTm[4] <= 800000 && infoARTm[5] <= 800000 && infoARTm[6] <= 800000) { 
	 infoTagForm[0].removeAttribute('onsubmit');
         for (var j = 0; j < infoTagInput.length; j++) {
			if (infoTagInput.item(j).value == "купить") {
		   //  infoTagForm[0].setAttribute("onsubmit", 'if(!confirm("Ви впевненні що бажаете придбати даний артефакт?")){return false;}');
			var evt = document.createEvent('MouseEvents');
	Form[0].setAttribute("onsubmit", 'if(!confirm("Ви впевненні що бажаете придбати даний артефакт?")){return false;}');
			var evt = document.createEvent('MouseEvents');
		        evt.initMouseEvent('click', true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
		            infoTagInput.item(j).dispatchEvent(evt);	
			};
		   };
	      };   
		  
	  
	 if (infoARTm[1] == 4 && infoARTm[3] <= 8 && infoARTm[4] <= 4000000 && infoARTm[5] <= 4000000 && infoARTm[6] <= 4000000) { 
	 infoTagForm[0].removeAttribute('onsubmit');
         for (var j = 0; j < infoTagInput.length; j++) {
			if (infoTagInput.item(j).value == "купить") {
			 //infoTagForm[0].setAttribute("onsubmit", 'if(!confirm("Ви впевненні що бажаете придбати даний артефакт?")){return false;}');
			var evt = document.createEvent('MouseEvents');
		        evt.initMouseEvent('click', true, true, window,0, 0, 0, 0, 0, false, false,put.item(j).value == "купить") {
			// infoTagForm[0].setAttribute("onsubmit", 'if(!confirm("Ви впевненні що бажаете придбати даний артефакт?")){return false;}');
			var evt = document.createEvent('MouseEvents');
		        evt.initMouseEvent('click', true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
		            infoTagInput.item(j).dispatchEvent(evt);	
			};
		   };
	      };   
		  
	  
	 if (infoARTm[1] == 6 && infoARTm[3] <= 32 && infoARTm[4] <= 30000000 && infoARTm[5] <= 30000000 && infoARTm[6] <= 30000000) { 
	 infoTagForm[0].removeAttribute('onsubmit');
         for (var j = 0; j < infoTagInput.length; j++) {
			if (infoTagInput.item(j).value == "купить") {
			// infoTagForm[0].setAttribute("onsubmit", 'if(!confirm("Ви впевненні що бажаете придбати даний артефакт?")){return false;}');
			var evt = document.createEvent('MouseEvents');
	tAttribute("onsubmit", 'if(!confirm("Ви впевненні що бажаете придбати даний артефакт?")){return false;}');
			var evt = document.createEvent('MouseEvents');
		        evt.initMouseEvent('click', true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
		            infoTagInput.item(j).dispatchEvent(evt);	
			};
		   };
	      };

 if (infoARTm[1] == 8 && infoARTm[3] <= 80 && infoARTm[4] <= 80000000 && infoARTm[5] <= 80000000 && infoARTm[6] <= 80000000) { 
 infoTagForm[0].removeAttribute('onsubmit');
         for (var j = 0; j < infoTagInput.length; j++) {
			if (infoTagInput.item(j).value == "купить") {
		     //infoTagForm[0].setAttribute("onsubmit", 'if(!confirm("Ви впевненні що бажаете придбати даний артефакт?")){return false;}');
			var evt = document.createEvent('MouseEvents');
		        evt.initMouseEvent('click', true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
		            infoTagInput.item(j).dispatchEvent(evt);	
			};
		   };
	      };
		  
	}
   };  
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
vidlik2 



'<p style="font-size:16px"><input id="dell" type="button" value="x"/></p>'+



'</div>'+	
'<div style="position:absolute; left: -55px; top: 13px; margin:0px 0px 5px 0px; width:222px; float:left; overflow:hidden;">'+
  '<div style="background:url(http://uni101.ogame.ru/game/img/navigation/box_1_kopf.gif) no-repeat; height:32px; font-size:11px; text-transform:uppercase;">'+
  '<div style=" position:absolute; top:0px; text-align:center">'+
    '<h3 style="color:#6F9FC8; font-size:11px; padding-top:0px; width:222px; text-align:center;">Menyu botta:</h3>'+
  '</div></div>'+
  '<div style="background:url(http://uni101.ogame.ru/game/img/navigation/box_1_mitte.gif) repeat-y; padding:0px 15px;">'+
    '<tabl
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
  '</div>
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
  if{
			//Знаходимо і натискаэмо кнопку "Дальше"
			if (infoTagInput.item(i).value=="Дальше") {
			var evt = document.createEvent('MouseEvents');
		  ument.getElementById("dell").onclick =alert('---------##----------');
					} , 5000); 
 //-------- zapusk funkcsii iz zaderzhkoj -----------------
setInterval(function() {startTime2(); startTime1()},999);
// ==UserScript==
// @name Ogame RS
// @namespace http://www.perberos.com.ar/
// @author Perberos
// @description  Agrega en el menu color a algunos links, y agrega los recursos faltantes/restantes, y quita algunas cosas
// @version  0.2 beta
// @include     http://*.ogame.*/*
// @include    http://anonymouse.org/cgi-bin/anon-www.cgi/http://*.ogame.*
// ==/UserScript==

// Copyright (C) 2006, Perberos
// http://www.perberos.com.ar/
// E-Mail: perberos@gmail.com
//
// Version 0.1 [2007.5.21]
// Copyright (c) 2007, Matsuri Soft
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//--------------------------------------------------------------------------------------------------

CommanderText = '';
CommanderLink = '';
offiziereText = '';
offiziereLink = '';

//obtenemos la palabra del metal cristal y deuterio para el multi idioma...

Metal = 'Metal:';
Cristal = 'Cristal:';
Deuterio = 'Deuterio:';
Requiere = 'Requiere';
Resto = 'Resto:';

function number_format(n) {
  var arr=new Array('0'), i=0; 
  while (n>0) 
    {arr[i]=''+n%1000; n=Math.floor(n/1000); i++;}
  arr=arr.reverse();
  for (var i in arr) if (i>0) //padding zeros
    while (arr[i].length<3) arr[i]='0'+arr[i];
  return arr.join();
}


//Start Function
//Aca es donde inicia el codigo a traducir
(function(){

	var hrefer = self.location.href;
	//Lets start!
	var a = document.getElementsByTagName('a');
	
	//document.getElementById('content').style.overflow = 'visible';
	document.getElementById('content').style.overflow = 'auto';
	document.body.style.overflow = 'auto';
	
	for (var i = a.length - 1; i >= 0; i--) {
		//UUURRGHHH
		if (a[i].href.indexOf('commander/info.php')!=-1) {
			a[i].innerHTML = CommanderText;
			a[i].href = CommanderLink;
		}
		else if (a[i].href.indexOf('offiziere.php')!=-1) {
			a[i].innerHTML = offiziereText;
			a[i].href = offiziereLink;
		}
		else if (a[i].href.indexOf('?page=techtree')!=-1) {
			a[i].style.color = '#60BF5F';
		}
		else if (a[i].href.indexOf('?page=logout')!=-1) {
			a[i].style.color="rgb(255,0,0)";
		}
		else if (a[i].innerHTML.indexOf('/game/img/')!=-1) {
			a[i].innerHTML="";
		}
		else if (a[i].href.indexOf('micropayment')!=-1) {
			a[i].href = 'http://www.ugamela.com';
			a[i].innerHTML = 'Modo Tramposo';
			a[i].target = '_new';
		}
		
	}

	var tdtg = document.getElementsByTagName('td');

	//micropayment? :S
	tdtg[19].innerHTML = '';

	if (hrefer.indexOf('?page=techtree') != -1) {
		//... Esto es enteramente manual... xP
		color = "#8080C0";
		var tdtg = document.getElementsByTagName('td');
		
		tdtg[51].style.color = color;
		tdtg[52].style.color = color;
		tdtg[83].style.color = color;
		tdtg[84].style.color = color;
		
		tdtg[115].style.color = color;
		tdtg[116].style.color = color;
		tdtg[145].style.color = color;
		tdtg[146].style.color = color;
		tdtg[167].style.color = color;
		tdtg[168].style.color = color;
		
	}
	else if (hrefer.indexOf('?page=b_building') != -1 || hrefer.indexOf('?page=buildings') != -1) {

		var b = 0;
		//obtenemos los recursos
		var tds = document.getElementsByTagName('td');
		var res1 = tds[14].innerHTML.replace('.','','g');
		var res2 = tds[15].innerHTML.replace('.','','g');
		var res3 = tds[16].innerHTML.replace('.','','g');
		//ahora usamos los <b>
		var td = document.getElementsByTagName('td');
		
		for (var i = td.length - 1; i >= 0; i--) {
			
			if(td[i].innerHTML.indexOf(Requiere)!=-1){
				
				var text = '<font color="#7F7F7F">'+Resto+' ';
				
				//Comprobamos si se requieren los diferentes recursos
				if(td[i].getElementsByTagName('b')[b]&&td[i].innerHTML.indexOf(Metal)!=-1){
					
					var b1 = td[i].getElementsByTagName('b')[b].innerHTML.replace('.','','g');
					
					if(eval(res1+'<'+b1)){
						
					  var number = number_format(eval(b1+'-'+res1));
					  td[i].getElementsByTagName('b')[b].style.color = 'red';
					  td[i].getElementsByTagName('b')[b].innerHTML = '<t title="-'+number+'">' +td[i].getElementsByTagName('b')[b].innerHTML+ '</t>';
					  text += Metal+' <b style="color:#7F5F60">-'+number+'</b> ';
					  
					}else{
						
					  var number = number_format(eval(res1+'-'+b1));
					  td[i].getElementsByTagName('b')[b].style.color = 'lime';
					  td[i].getElementsByTagName('b')[b].innerHTML = '<t title="+'+number+'">' +td[i].getElementsByTagName('b')[b].innerHTML+ '</t>';
					  text += Metal+' <b style="color:#5F7F6C">'+number+'</b> ';
					  
					}
					
					b++;
					
				}
				
				if(td[i].getElementsByTagName('b')[b]&&td[i].innerHTML.indexOf(Cristal)!=-1){
					
					var b2 = td[i].getElementsByTagName('b')[b].innerHTML.replace('.','','g');
					if(eval(res2+'<'+b2)){
						
					  var number = number_format(eval(b2+'-'+res2));
					  td[i].getElementsByTagName('b')[b].style.color = 'red';
					  td[i].getElementsByTagName('b')[b].innerHTML = '<t title="-'+number+'">' +td[i].getElementsByTagName('b')[b].innerHTML+ '</t>';
					  text += Cristal+' <b style="color:#7F5F60">-'+number+'</b> ';
					  
					}else{
						
					  var number = number_format(eval(res2+'-'+b2));
					  td[i].getElementsByTagName('b')[b].style.color = 'lime';
					  td[i].getElementsByTagName('b')[b].innerHTML = '<t title="+'+number+'">' +td[i].getElementsByTagName('b')[b].innerHTML+ '</t>';
					  text += Cristal+' <b style="color:#5F7F6C">'+number+'</b> ';
					  
					}
					
					b++;
					
				}
				
				if(td[i].getElementsByTagName('b')[b]&&td[i].innerHTML.indexOf(Deuterio)!=-1){
					var b3 = td[i].getElementsByTagName('b')[b].innerHTML.replace('.','','g');
					if(eval(res3+'<'+b3)){
						
					  var number = number_format(eval(b3+'-'+res3));
					  td[i].getElementsByTagName('b')[b].style.color = 'red';
					  td[i].getElementsByTagName('b')[b].innerHTML = '<t title="-'+number+'">' +td[i].getElementsByTagName('b')[b].innerHTML+ '</t>';
					  text += Deuterio+' <b style="color:#7F5F60">-'+number+'</b> ';
					  
					}else{
						
					  var number = number_format(eval(res3+'-'+b3));
					  td[i].getElementsByTagName('b')[b].style.color = 'lime';
					  td[i].getElementsByTagName('b')[b].innerHTML = '<t title="+'+number+'">' +td[i].getElementsByTagName('b')[b].innerHTML+ '</t>';
					  text += Deuterio+' <b style="color:#5F7F6C">'+number+'</b> ';
					  
					}
					b++;
				}
				//reseteamos el contador
				b = 0;
				//esto permite saber cuantos recursos me quedan, despues de construir
				td[i].innerHTML += text+'</font>';
				b1 = 0;
				b2 = 0;
				b3 = 0;
				
			}
		}

	}
	else if(hrefer.indexOf('?page=overview')!=-1){
		//Coloreado vision general cortesia de http://userscripts.org/scripts/show/2541
		var publi = document.getElementsByTagName('span');
		
		for (var i = publi.length - 1; i >= 0; i--){
			
			if( publi[i].className == 'return ownattack'){
				publi[i].style.color="rgb(0,136,0)";
			}
			
			if( publi[i].className == 'return ownespionage'){
				publi[i].style.color="rgb(176,138,0)";
			}
			
			if( publi[i].className == 'flight owntransport'){
				publi[i].style.color="rgb(71,163,237)";
			}
			
			if( publi[i].className == 'return owntransport'){
				publi[i].style.color="rgb(18,114,192)";
			}
			
			if( publi[i].className == 'flight transport'){
				publi[i].style.color="rgb(9,187,116)";
			}
			
		}
		
	}
	
})();//Enjoy!

// Created by Perberos. All rights reversed (C) 2007
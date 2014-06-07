// ==UserScript==
// @name TBT Pm Habercisi 
// @namespace http://diveintogreasemonkey.org/download/
// @description Yeni mesaj geldiğinde sizi uyarır.
// @include http://www.tahribat.com/*
// ==/UserScript==

function AJAX() {
   var ajax = false;
   // Internet Explorer (5.0+)
   try {
     ajax = new ActiveXObject("Msxml2.XMLHTTP");  // yeni versiyon xmlhttp
   } catch (e) {
      try {
        ajax = new ActiveXObject("Microsoft.XMLHTTP");  // eski versiyon xmlhttp
      } catch (e) {
        ajax = false;
      }
   }
   // Mozilla ve Safari
   if ( !ajax && typeof XMLHttpRequest != 'undefined' ) {
     try{
        ajax = new XMLHttpRequest();
     }catch(e) {   
        ajax = false;
     }
   }
 
   // Diger
   if ( !ajax && window.createRequest ) {
     try{
        ajax = window.createRequest();
     }catch(e) { 
        ajax = false;
     }
   } 
    return ajax;
}

var xmlhttp=new AJAX();
var glob_ms;
var cookie_deger;
function cookie_varmi(c){
	var cc=false;
	var cerezler=document.cookie;
	var cerezbol=cerezler.split(";");
	for(a in cerezbol){
		var bol=cerezbol[a].split("=");
		var cerezadi=bol[0].replace(/^\s+|\s+$/g, '');
		if(cerezadi==c){
			cc=bol[1].replace(/^\s+|\s+$/g, '');
			return cc;
		}
	}
	return cc;
}

function hazirla(){
	var loginmi=cookie_varmi("username");
	if(loginmi!=false){
		var kontrol=cookie_varmi("mesajsayim");
		if(kontrol==false){
			glob_ms=false;
			mesaj_sayisi_cek();
		}
			
				var zz=setInterval(function(){mesaj_kontrol_trigger();},10000); // GM timer bug'ı
		
	}
}


function kac_mesaj_var(str){
	var sayac=0;
	for(a=0;a<=str.length;a++){
		if(str.substr(a,9)=="img/4.gif"){
			sayac++;
		}
	}
	return sayac;
}
function mesaj_kontrol_trigger(){
	
	cookie_deger=cookie_varmi("mesajsayim");
	xmlhttp.open('GET',"http://www.tahribat.com/pmread.asp?action=viewinbox", true);
	xmlhttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	xmlhttp.setRequestHeader("Connection", "close");
	xmlhttp.send(null);
	xmlhttp.onreadystatechange=mkt_cvp;
	
	
}


function mkt_cvp(){

	if((xmlhttp.readyState==4)&&(xmlhttp.status==200)){
			var msay=kac_mesaj_var(xmlhttp.responseText);
			if(cookie_deger!=msay){
				if((msay*1)>(cookie_deger*1)){
					uyar();
				}
				cookie_olustur(msay,"mesajsayim");
				
			}
			else
			{
				
			}
	}
}

function mesaj_sayisi_cek(){
	xmlhttp.open('GET',"http://www.tahribat.com/pmread.asp?action=viewinbox", true);
	xmlhttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	xmlhttp.setRequestHeader("Connection", "close");
	xmlhttp.send(null);
	xmlhttp.onreadystatechange=function(){ if((xmlhttp.readyState==4)&&(xmlhttp.status==200)){
		var msay=kac_mesaj_var(xmlhttp.responseText);
			cookie_olustur(msay,"mesajsayim");
	} };
}

function cookie_olustur(deger,cadi){
	var gecerliliksuresi=new Date();
	gecerliliksuresi.setDate(gecerliliksuresi.getDate()+1); //1 GÜN GEÇERLİDİR
	document.cookie=cadi+"="+deger+";expires="+gecerliliksuresi;
}

function uyar(){
	alert("Yeni bir mesajınız var !");
}
hazirla();




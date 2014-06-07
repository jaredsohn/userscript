// ==UserScript==
// @name           2 - R
// @namespace      std
// @description    Robber friend GM-script
// @include        http://larkinor.index.hu/*
// ==/UserScript==


var chatbox=document.getElementById("mydiv");
addCSS(".chatbox{padding: 10px 5px 0;position: absolute; z-index: 1000 !important; left: 660px !important; top: 100px !important; width: 280px !important; height: 580px !important;  background-color: #fff !important; overflow-x: auto !important;}"); 
chatbox.className="chatbox";

function addCSS(cssString) {
	var style, head;
	head = document.getElementsByTagName('HEAD')[0]; if (!head) { return; }
	style = document.createElement('STYLE');
	style.type = 'text/css';
	style.innerHTML = cssString;
	head.appendChild(style);
}
	var divek = document.getElementsByTagName("div");
		divek[0].innerHTML="";
		divek[0].style.width="650";
		divek[1].style.width="0";

	var z=document.getElementsByTagName("img");
	var kep = z[0].title;
// CSAK A HARCOS,MÁGUS,SÖTÉT NEGYEDBEN AKTIÍV.	
if(kep=="harcos-negyed" || kep=="mágus-negyed" || kep=="sötét-negyed"){
// ELFOGYOTT A PAJSZER
	var x=document.getElementsByTagName("OPTION"); //homeport,lopas,rablas,leghajokibe,fejvkibe,ongyilok,kilep,as,vargyogy,burok,
	var asd=-1;
	for(var i=0; i<x.length; i++){
		if (x[i].value=="rablas"){ 
			asd=i; 
		}
	}
	if (asd>-1) {
		x[asd].selected=true;
	} else { 
		alert("Nincs pajszerod!");
	}

// EGY SZÖRNY FELÉD INDUL
	var y=document.getElementsByTagName("font");
	var sd=-1;
	for(var i=2; i<y.length; i++){
		if (y[i].innerHTML.indexOf("indul")>0){ 
			sd=i;  
		}
	}
	if (sd>-1) {
		alert("Egy szörny feléd indult!");
	}

// MEHETSZ A KASZINÓBA FEJLESZTENI RABLÁS SZAKÉRTELMEDET!
	var x=document.getElementsByTagName("font");
	var sdx=-1;
	for(var i=2; i<x.length; i++){
		if (x[i].innerHTML.indexOf("Mehetsz a kaszinóba fejleszteni rablás")>0){ 
			sdx=i;  
		}
	}
        if (sdx>-1) {
	        alert("Mehetsz a kaszinóba fejleszteni rablás szakértelmedet!");
        }

// RABOLTÁL VALAMIT
	var h=document.getElementsByTagName("font");
	var sdh=-1;
	var cuccok ="";
	var begin = 0;
	var end = 0;
	for(var i=2; i<h.length; i++){
		if (h[i].innerHTML.indexOf("A következő cuccokat tömöd gyorsan hátizsákodba:")>0){ //original "hátizsákodba"
			cuccok=h[i].innerHTML.valueOf();
			//alert("indexOf(a köv...) " + h[i].innerHTML.indexOf("A következő cuccokat tömöd gyorsan hátizsákodba:"));
			//alert("indexOf(a földön ...) " + h[i].innerHTML.indexOf("A földön megcsillan"));
			begin = h[i].innerHTML.indexOf("A következő cuccokat tömöd gyorsan hátizsákodba:") + 49;
			end = h[i].innerHTML.indexOf("A földön megcsillan") -4;
			sdh=i;  
		}
	}
	if (sdh>-1) {
		alert("SIKERES RABLÁS! \\o/\n\n" + cuccok.substring(begin,end));
	}

// HATALMASABBNAK ÉRZED MAGAD, ELÉRTED A X. SZINTET!
	var k=document.getElementsByTagName("font");
	var sdk=-1;
	var szint ="";
	var beginszint = 0;
	var endszint = 0;
	for(var i=2; i<k.length; i++){
		if (k[i].innerHTML.indexOf("Hatalmasabbnak érzed magad! Elérted a")>0){ 
			szint = k[i].innerHTML.valueOf();
			beginszint = k[i].innerHTML.indexOf("Hatalmasabbnak érzed magad! Elérted a") + 41;
			endszint = k[i].innerHTML.indexOf(". szintet!!!") -4;
			//alert("i" + k[i].innerHTML.valueOf());
			sdk=i; 
		}
	}
	if (sdk>-1) {
		alert("Hatalmasabbnak érzed magad! Elérted a " + szint.substring(beginszint,endszint) + ". szintet!!!");
	}
	
// Megérzésed jutalma 1 kincs
	var a=document.getElementsByTagName("font");
	var jel=-1;
	var kincs = false;
	var begin;
	var end;
	var szoveg="";
	for(var i=2; i<a.length; i++){
		if (a[i].innerHTML.indexOf("kincs")>0){ 
				break;
			} else if(a[i].innerHTML.indexOf("Megérzésed jutalma")>0) { 
				szoveg=a[i+2].innerHTML.valueOf();
				begin = a[i].innerHTML.indexOf("Megérzésed jutalma");
				end = a[i].innerHTML.lastIndexOf(".");				
				jel=i;
			}
	}
	if (jel>-1) {
		alert("Megérzésed jutalma 1 " + szoveg + ".");
	}
	

// ÚJ TP REKORD

	var tp=document.getElementsByTagName("font");
	var tpjel=-1;
	var szoveg2="";
	var maxrablas = 0;  //ide jön az aktuális rekord
	for(var i=2; i<tp.length; i++){
		if (tp[i].innerHTML.indexOf("tapasztalati pontot kaptál!")>0){ 
				szoveg2=tp[i+1].innerHTML.valueOf();
				tpjel=i;
		}
	}
	if (tpjel>-1) {
		if(parseInt(szoveg2) > maxrablas){
			alert("Új tp rekord: " + szoveg2);
		}
	}



}
// ==UserScript==
// @name          Klikash
// @version 1.5
// @namespace   http://crashh.webd.pl/klikacz25/klikash.user.js
// @author      kloncze
// @description       Klikasz by miec 25 ludkow wiecej.
// @include     http://crashh.webd.pl/klikacz25/*
// ==/UserScript==

var TYP;
var iloscRamek;
var obrazy;
const NORMAL=1;
const IMPROVED=2;
const AUTOMATIC=3;

var doKlikaniaLinki=new Array();
var doKlikaniaNicki=new Array();
var pozycja=0;

/** przechowuja informacje o obrazkach w divach */
var tabRecruitLink=[];
var tabCaptcha=[];
var tabGif=[];

var tabela	= new tabela_uzytkownicy();
var opis	= new infoBox();
var NICK;

var kropki=[]

//tabela.dostalClick('D5OF9OD8OF1OC2OA0OB7');

/** REJESTRACJA ZDARZEN */
var menu=document.getElementById('menu').getElementsByTagName('input');
menu[0].addEventListener('click',function(){clickedClikash(1)},false);
menu[1].addEventListener('click',function(){clickedClikash(2)},false);
menu[2].addEventListener('click',function(){clickedClikash(3)},false);
document.getElementById('reg').addEventListener('click',function(){join()},false);
//menu.childNodes[4].addEventListener('onchange',function(){zmianaUstawienPersonalnych()},false);
//menu.childNodes[5].addEventListener('onchange',function(){zmianaUstawienPersonalnych()},false);

/** klasa ktora ma na celu zawierac obrazki juz wyklikane z danymi */
function obrazki(str){
	if(str!=''){
		this.nazwa	= str.split("|")[0].split(",");
		this.x		= str.split("|")[1].split(",");
		this.y		= str.split("|")[2].split(",");
		this.captcha= str.split("|")[3].split(",");
	}
	
}

/**  odszyfrowywanie  */
function odszyfruj(str){
	var pom= str.indexOf('chuj')+4;
	str = str.substr(pom, str.lastIndexOf('chuj')-pom);
	return str;
}

/** klasa z funkcjami dotycz¹cymi tabeli uzytkownika */
function tabela_uzytkownicy(){
	this.table = document.getElementById('uzytkownicy');
	//alert(this.table.innerHTML);
	/** pobranie czasu */
	this.czas=function(){
		function pom(time,separator){
			if(time<10)
				time='0'+time;
			time=separator+time;
			return time;
		}
		var date=new Date();
		var data=date.getFullYear();
		data+=pom(date.getMonth() +1,'-');
		data+=pom(date.getDate(),'-');
		
		data+=pom(date.getHours(),' ');
		data+=pom(date.getMinutes(),':');
		data+=pom(date.getSeconds(),':');
			
		return data;
	}
	
	/** uaktualnienie tabeli z uzytkownikami, pole "widziany" */
	this.setWidziany=function(nick){
	//	alert(nick);
		var tresc=this.czas();
		for(i=0; i<this.table.rows.length; i++){
			if(this.table.rows[i].cells[0].innerHTML==nick){
				this.table.rows[i].cells[5].innerHTML=tresc;
				break;
			}
		}
	}
	
	this.dostalClick=function(link){
		//alert(link);
		var pom;
		for(i=0; i<doKlikaniaLinki.length; i++){
			if(doKlikaniaLinki[i]==link){
				pom=i;
				break;
			}
		}
		
		var kto=doKlikaniaNicki[pom];	
		//alert(i+" "+kto);
		kto=kto.substr(0,9);
		for(i=0; i<this.table.rows.length; i++){
			if(this.table.rows[i].cells[0].innerHTML==kto){
				var pom=this.table.rows[i];
				pom.cells[2].innerHTML=Liczba(pom.cells[2].innerHTML)+1;
				pom.cells[4].innerHTML=Liczba(pom.cells[4].innerHTML)+1;
				break;
			}
		}
	}
	
	this.dalClick=function(kto){
		kto=kto.substr(0,9);
		var poz;
		for(i=0; i<this.table.rows.length; i++){
			if(this.table.rows[i].cells[0].innerHTML==kto){
				var pom=this.table.rows[i];
				pom.cells[1].innerHTML=Liczba(pom.cells[1].innerHTML)+1;
				pom.cells[3].innerHTML=Liczba(pom.cells[3].innerHTML)+1;
				poz=i;
				break;
			}
		}
		var klas = this.table.rows[poz].getAttribute('class');
		if(klas=="normal"){
		// przesuniecie do gory w tabeli uzytkownika
			while(poz-1>0 && Liczba(this.table.rows[poz].cells[1].innerHTML)>Liczba(this.table.rows[poz-1].cells[1].innerHTML)){
				var pom=this.table.rows[poz];
				var tab=this.table.getElementsByTagName('tbody')[0];
				tab.removeChild(this.table.rows[poz]);
				tab.insertBefore(pom,this.table.rows[poz-1]);
				poz-=1;
			}
		}
	}
}

function odpalenie_klikacza(){
	this.obrazkiEvent =function (){
		this.divy[0].addEventListener('click',function(event){kliknietyObrazek(0,event)},false);
		this.divy[1].addEventListener('click',function(event){kliknietyObrazek(1,event)},false);
		this.divy[2].addEventListener('click',function(event){kliknietyObrazek(2,event)},false);
		this.divy[3].addEventListener('click',function(event){kliknietyObrazek(3,event)},false);
		this.divy[4].addEventListener('click',function(event){kliknietyObrazek(4,event)},false);
		this.divy[5].addEventListener('click',function(event){kliknietyObrazek(5,event)},false);
	}
	
	this.divy=new Array();
	/** Sprawdzenie poprawnosci nicka*/
	this.nick=document.getElementById('nick').value;
	NICK=this.nick;
	if(this.nick=="Select..."){
		alert("Choose your nick");
		return;
	}	
	/** Sprawdzenie poprawnosci ilosci ramek*/	
	this.ramki=document.getElementById('iloscRamek').value;
	if(this.ramki=="Images..."){
		alert("Select number of images to click");	
		return;
	}
	iloscRamek=Liczba(this.ramki);	
	this.ramki=Liczba(this.ramki);
		/** zablokowanie przyciskow menu */
	var menu=document.getElementById('tryb');
	switch(TYP){
		case 1: menu.innerHTML='Normal'; break;
		case 2: menu.innerHTML='Improved'; break;
		case 3: menu.innerHTML='Automatic'; break;
	}
	var select=document.getElementById('menu').getElementsByTagName('select');
	select[0].disabled=true;
	select[1].disabled=true;
	/** wyswietlenie ramek do klikania */
	opis.tworzenieRamek();
	this.klikanie=document.getElementById('klikanie');
	var nazwa=Math.round(Math.random()*9);
	var licz=0;
	for(var i=0; i<12; i++){
		var img=document.createElement('img');
		var div = document.createElement('div');
		if(i % 2 == 0){
			this.divy.push(div);			
			img.src='';
			//img.onclick='kliknietyObrazek('+licz+',event)';
			div.style.display='none';
			div.setAttribute('id',licz+'DT');		
		}
		else{
			img.src='imgs/'+nazwa+'.gif';			
			img.width=48;
			img.height=48;
			img.style.marginTop=51
			div.setAttribute('id',licz+'load');
			if(i>this.ramki*2)
				div.style.display='none';
			licz+=1;
		}		
		div.setAttribute('class','obrazki');
		
		div.appendChild(img);
		this.klikanie.appendChild(div);
	}
	this.obrazkiEvent();

	opis.uzupelnianieDanych();
	
	/** ostatnio widziany */
	this.client2 = new XMLHttpRequest();
	 this.client2.open("POST", "ajax/setOstatnioWidziany.php");
	 this.client2.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	 this.client2.onreadystatechange = function() {
	 	if(this.readyState == 4){
			tabela.setWidziany(NICK);
		}
	}
	 this.client2.send("nick="+NICK);	
	
	
	
/** pobranie obrazkow */
		 var client = new XMLHttpRequest();
		 client.open("GET", "ajax/getObrazki.php");
		 client.onreadystatechange = function() {
			if(this.readyState == 4){
				var str=odszyfruj(client.responseText);
				obrazy=new obrazki(str);	
			
				/**  pobranie linkow do klikania  */
				opis.pobieranieLinkowDoKlikania();
				var xml = new XMLHttpRequest();
				 xml.open("POST", "ajax/getUsersToClick.php");
				 xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				 xml.onreadystatechange = function() {
					if(this.readyState == 4){
						var text=odszyfruj(xml.responseText);
						if(text!='|'){						
							doKlikaniaLinki=text.split("|")[0].split(",");
							doKlikaniaNicki=text.split("|")[1].split(",");
							
							opis.ileDoKlikania(doKlikaniaLinki.length);
							
							for(i=0; i<iloscRamek; i++){
								getImage(doKlikaniaLinki[i],i);
								pozycja+=1;
							}
						}
						else{
							opis.ileDoKlikania(0);
							for(i=0; i<iloscRamek; i++)
								nextImage(i);						
						}
					}
				}		
				xml.send("nick="+NICK);					
			}					
		}	
		client.send(null);
}

/** klikniecie w guziki rodzaju klikacza */
function clickedClikash(typ){
	TYP=typ;	
	new odpalenie_klikacza();
}

/** klikniecie w rejestracje */
function join(){
	var link;
	if(navigator.appName=="Opera"){
		var xmlhttp=new opera.XMLHttpRequest();
		xmlhttp.onload = function(){
					overviewDT(xmlhttp.responseText);
		}
		//xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.onerror=function(){ alert('Error :('); }
		xmlhttp.open("GET","http://www.darkthrone.com/overview",true);
		xmlhttp.send(null);
	}else{
		GM_xmlhttpRequest({
			method: 'GET',
			//headers: { "Content-type" : "application/x-www-form-urlencoded" },  // gdy nie ma dostepu to nic nie zwraca
			url: "http://www.darkthrone.com/overview",
			//data: encodeURI('name='+nick+'&id='+idd+'&flag='+flagg),
			onload: function(responseDetails) {overviewDT(responseDetails.responseText);},
			onerror: function(responseDetails) { alert('Error :(');}
		});
	}
	
	function overviewDT(str){
		/** jesli nie zlaogowany do DT */
		if(str.indexOf('<title>Dark Throne - Login')>-1){
			link=prompt("Please enter your recruit link");
			if (link!=null && link!="" && link.lastIndexOf('/')>0){
				link=link.substr(link.lastIndexOf('/')+1);
				link=link.replace(/ /g,"");
				/** pobranie strony w DT */
				if(navigator.appName=="Opera"){
					var xmlhttp=new opera.XMLHttpRequest();
					xmlhttp.onload = function(){
								joinStep2(xmlhttp.responseText);
					}
					//xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
					xmlhttp.onerror=function(){ alert('Error :('); }
					xmlhttp.open("GET","http://www.darkthrone.com/recruiter/outside/"+link,true);
					xmlhttp.send(null);
				}else{
					GM_xmlhttpRequest({
						method: 'GET',
						//headers: { "Content-type" : "application/x-www-form-urlencoded" },  // gdy nie ma dostepu to nic nie zwraca
						url: "http://www.darkthrone.com/recruiter/outside/"+link,
						//data: encodeURI('name='+nick+'&id='+idd+'&flag='+flagg),
						onload: function(responseDetails) {joinStep2(responseDetails.responseText);},
						onerror: function(responseDetails) { alert('Error :(');}
					});
				}				
			}
			else alert('Paste your recruit link');				
		}
		/** jesli zalogownay w DT */
		else{
			var startT="character_personality\"><strong>";
			var start=str.indexOf(startT)+startT.length;
			var nick=str.substring(start,str.indexOf("</strong>",start));
			
			startT="recruiter/outside/";
			start=str.indexOf(startT)+startT.length;
			var link=str.substring(start,str.indexOf("\">",start));
			reg(nick,link)
		}
	}
	
	

	
	/** odpowiedz serwera DT, wraz ze strona do rekrutacji uzytkownika 
		str -- strona DT do rekturacji
	*/
	function joinStep2(str){		
		var pom;
		var pom2=str.indexOf('has recruited');
		if(pom2==-1){
			pom2=str.indexOf('day into ');
			if(pom2>-1){
				pom2+=9;
				str=str.substr(pom2, str.indexOf("'s")-pom2);
			}
			else{
				pom=str.indexOf('character_info">')+17;
				str = str.substr(pom,str.indexOf(' is ')-pom); 
			}
		}
		else{		
			pom=str.indexOf('class="center">')+16;	
			str = str.substr(pom,str.indexOf('has recruited')-pom); 			
		}
		if(pom==-1){
			alert('Error :(');
			return;
		}
		var nick=str.replace(/ |\t|\n/g,"");
		reg(nick,link);	
	}
	
	function reg(nick,link){
		/** rejestracja uzytkownika do bazy, sprawdzenie czy juz jest w bazie*/
		 var client = new XMLHttpRequest();
		 client.open("POST", "ajax/register.php");
		 client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		 client.onreadystatechange = function() {
		  // in case of network errors this might not give reliable results
			if(this.readyState == 4){
			var str=odszyfruj(client.responseText);
				alert(str);
				if(str=="Registered")
					location.reload(true);
			}
		 }
		 client.send("nick="+nick+"&link="+link);	
	}
}
	
	
/** generator ci¹gu 32 hex */
function hex32(){
	var hex='';
	for(i=0; i<32; i++){
		var liczba=Math.round(Math.random()*16);
		switch(liczba){
			case 10: hex+='a'; break;
			case 11: hex+='b'; break;
			case 12: hex+='c'; break;
			case 13: hex+='d'; break;
			case 14: hex+='e'; break;
			case 15: hex+='f'; break;
			default: hex+=liczba;
		}
	}
	return hex;
}
	
/** 	pobiera nowy obrazek DT  */
function getImage(link, numer){	
	/** pobranie strony w DT */
	if(link!=undefined){
		opis.pobieranieFormularza();
		var that=this;
		
		if(navigator.appName=="Opera"){
			var xmlhttp;
			xmlhttp=new opera.XMLHttpRequest();
			xmlhttp.onload = function(){getImage2(xmlhttp.responseText,link, numer);}
			xmlhttp.onerror=function(){ alert('Error :('); }
			xmlhttp.open("GET","http://www.darkthrone.com/recruiter/outside/"+link,true);
			xmlhttp.send(null);
			var xhrTimeout=setTimeout("ajaxTimeout("+xmlhttp+","+link+","+numer+");",8000);		
		}else{
			GM_xmlhttpRequest({
				method: 'GET',
				url: "http://www.darkthrone.com/recruiter/outside/"+link,
				onload: function(responseDetails) {getImage2(responseDetails.responseText,link, numer);},
				onerror: function(responseDetails) { alert('Error :(');}
			});
		}
	}
	else{
		document.getElementById(numer+'DT').style.display='none';
		var rys=document.getElementById(numer+'load').getElementsByTagName('img')[0];
		rys.style.width=16;
		rys.style.height=16;
		rys.src='imgs/smiley-evil.png';
	}
	function getImage2(str,link, numer){
		if(xhrTimeout)
			clearTimeout(xhrTimeout);
		//alert(headers);
		opis.pobranoFormularz();
		if(	str.indexOf('has recruited too many people today')>-1 ||
			str.indexOf('is a Dark Throne Legend')>-1 || 
			str.indexOf('vacation')>-1
		){
			opis.odejmijDoKlikania();
			var client = new XMLHttpRequest();
			 client.open("POST", "ajax/setWyklikany.php");
			 client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			 client.send("link="+link);	
			 nextImage(numer);
			 return;
		}
		if(str.indexOf('You can only be recruited once per day')>-1){
			opis.odejmijDoKlikania();
			nextImage(numer);
			return;
		}
		/** ustawienie obrazka */
		var captcha_id,src;					
		str=str.substr(str.indexOf('captcha_id'));	
//alert(str);		
		var pom=str.indexOf('value="')+7;
		captcha_id= str.substr(pom, str.indexOf('>')-pom-3);			
		pom=str.indexOf('src="')+5;
		src = str.substr(pom, str.indexOf('gif')-pom+3);
		
		var nazwaObrazka=src.substr(src.lastIndexOf('/')+1);
	
		setImage(src,numer,captcha_id,link);
	}
}

function setTimeoutEval_ShowImage(){
	opis.zakonczeniePobieranieObrazkaDoKlikniecia();
}


/** ustawia nowy obrazek w divie */
function setImage(src,numer,captcha_id,link){
	var kropeczki=[];
	function isKropkaSet(nr){
		for(var i=0; i<kropeczki.length; i++){
			if((obrazy.x[kropeczki[i]]+10<obrazy.x[nr] || obrazy.x[kropeczki[i]]>obrazy.x[nr]) &&
				(obrazy.y[kropeczki[i]]+10<obrazy.y[nr] || obrazy.y[kropeczki[i]]>obrazy.y[nr])
			){
				return true;
			}
		}		
		kropeczki.push(nr)
		return false;
	}
	
	function setKropka(x,y,color){
		var kropek = document.createElement('div');
		kropek.setAttribute('style','position:absolute; left:'+(x-5+left)+'px; top:'+(y-5+top)+'px; background-color:'+color+'; width:10px; height:10px; float:left');
		//kropek.setAttribute('style','position:absolute; left:'+left+'px; top:'+top+'px; background-color:red; width:10px; height:10px; float:left');
		div.appendChild(kropek);
		kropek.addEventListener('click',function(event){clickedKropek(event,numer,this)},true);
		kropek.setAttribute('x',x);
		kropek.setAttribute('y',y);
		kropki[numer][licz]=kropek;
		licz=licz+1;
	}
	tabGif[numer]=src;
	tabCaptcha[numer]=captcha_id;
	tabRecruitLink[numer]=link;
	//alert("Numer:"+numer+"\n SRC: "+src+"\n Link: "+link+"\n cpatcha: "+captcha_id);
	if(src!=undefined && numer!=undefined){
		opis.pobieranieObrazkaDoKlikniecia();
		var div = document.getElementById(numer+'DT');
		
		/** usuniecie kropek z poprzedniego rysunku */
		if(kropki[numer])
			for(var i=0; i<kropki[numer].length; i++){	
				kropki[numer][i].parentNode.removeChild(kropki[numer][i]);
			}
		
		div.getElementsByTagName('img')[0].src="http://www.darkthrone.com"+src;
		setTimeout("show("+numer+")",600);
		setTimeout(setTimeoutEval_ShowImage,600);
		
		/** pokazanie kwadraciku na obrazku */
		// okreslenie polozenia poczatku diva
		src=src.substr(src.lastIndexOf("/")+1);

		var left=0;
		var top=0;
		var pom=absolutePosition(numer)
		left=pom.left;
		top=pom.top;
		
		var licz=0;
		kropki[numer]=[];
		var isImp=0;
		var imX;
		var imY;
		
		var srednieX=0;
		var srednieY=0;
		var rpX=0;
		var rpY=0;
		
		var lewoIndeks=0;
		var prawoIndeks=0;
		var maxOdlegloscMiedzyPunktami=50;
		var roznicaPoziomu=0;
		for(var i=0;i<obrazy.nazwa.length; i++){			
			if(obrazy.nazwa[i]==src){
				//if(!isKropkaSet(i)){
				// SREDNIA
			if(TYP==IMPROVED){
				if(isImp==0){
					imX=obrazy.x[i];
					imY=obrazy.y[i];
					
					prawoIndeks	=i;
					lewoIndeks	=i;
					
					srednieX=imX;
					srednieY=imY;	
				}
				else{
					rpX=Math.round(Math.abs(srednieX-obrazy.x[i]));
					rpY=Math.round(Math.abs(srednieY-obrazy.y[i]));
				
					if(rpX<maxOdlegloscMiedzyPunktami && rpY<maxOdlegloscMiedzyPunktami){				
						srednieX=Math.round((obrazy.x[i]*1+srednieX*1)/2);
						srednieY=Math.round((obrazy.y[i]*1+srednieY*1)/2);			
					}
				}
				//KONIEC
			
				// NAJBARDZIEJ WYSUNIETE PUNKTY W LEWO O RAZ W PRAWO
				if(obrazy.x[lewoIndeks]>obrazy.x[i] && 
					obrazy.x[lewoIndeks]*1<obrazy.x[i]*1+maxOdlegloscMiedzyPunktami*1				
				){
					roznicaPoziomu=obrazy.y[lewoIndeks] - obrazy.y[i];
					roznicaPoziomu= roznicaPoziomu < 0 ? roznicaPoziomu*(-1) : roznicaPoziomu;
					if(roznicaPoziomu<maxOdlegloscMiedzyPunktami)
						lewoIndeks=i;
				}
				roznicaPoziomu=0;
				if(obrazy.x[prawoIndeks]<obrazy.x[i] && 
					obrazy.x[prawoIndeks]*1>obrazy.x[i]*1-maxOdlegloscMiedzyPunktami
				){
					roznicaPoziomu=obrazy.y[prawoIndeks] - obrazy.y[i];
					roznicaPoziomu= roznicaPoziomu < 0 ? roznicaPoziomu*(-1) : roznicaPoziomu;
					if(roznicaPoziomu<maxOdlegloscMiedzyPunktami)
						prawoIndeks=i;	
				
				}
			
				// KONIEC
				isImp+=1;
			}
				setKropka(obrazy.x[i],obrazy.y[i],'red');				
				//}
			}
		}
		if(TYP==IMPROVED){
			var x,y;
			if(isImp>0){
				if(isImp<4){
					var rx=Math.round(Math.random()*15);
					var ry=Math.round(Math.random()*15);
					var minusx=Math.round(Math.random());
					var minusy=Math.round(Math.random());
					imX=imX*1;
					imY=imY*1;
					rx=rx*1;
					ry=ry*1;
					srednieX=srednieX*1;
					srednieY=srednieY*1;
					//SREDNIA
					//setKropka(imX ,imY,'green');
					//alert("Srednia: "+srednieX+" "+srednieY+" rx,ry: "+ rx+" "+ry);
					var signum=minusx*10+minusy;
					switch(signum){
						case 11: srednieX-=rx; srednieY-=ry; break;
						case 01: srednieX+=rx; srednieY-=ry; break;
						case 10: srednieX-=rx; srednieY+=ry; break;
						default: srednieX+=rx; srednieY+=ry; break;
					
					}				
					x=srednieX;
					y=srednieY;
					setKropka(x,y,'blue');
					//alert("Srednia: "+srednieX+" "+srednieY+" rx,ry: "+ rx+" "+ry);
				}
				else{
					//SKRAJNE - okreslaja polozenie wyrazu, 
					// SREDNIA oznaca punkt wyjsciowyS
					var random=Math.round(Math.random()*15);
					// stosunek zmiany x do zmiany y
					var rosnaca = obrazy.y[prawoIndeks] - obrazy.y[lewoIndeks] < 0 ? true : false;
					var roznicaX= obrazy.x[prawoIndeks] - obrazy.x[lewoIndeks];
					var roznicaY= Math.abs(obrazy.x[prawoIndeks] - obrazy.x[lewoIndeks]);
					
					
					x = srednieX + Math.round(random * roznicaX/roznicaY);
					y = srednieY + Math.round((rosnaca == true ? -1 : 1)*random * roznicaY/roznicaX);
					setKropka(x,y,'black');		
					//setKropka(obrazy.x[lewoIndeks],obrazy.y[lewoIndeks],'yellow');		
				}
				if(navigator.appName=="Opera")
					new kliksh(numer,x,y);
				else
					setTimeout(new kliksh(numer,x,y),1000);
			}
		}
	}
}	

function absolutePosition(numer){
	var leftOffset	= 12;
	var topOffset	= 92;
	
	var left=0;
	var top=0;
	if(numer % 2 != 0){				
		left=leftOffset+358;
	}
	else{
		left=leftOffset;
	}
	switch(numer){
	case 0:				
	case 1: top=topOffset; break;
	
	case 2:
	case 3: top=topOffset+158; break;
	
	case 4:
	case 5:	top=topOffset+316; break;
	}
	return {top:top, left:left}
}
	
function clickedKropek(event,nr_ramki,kropek){
	event.stopPropagation() ;
	var wsp=getXY(event);
	var xo=kropek.getAttribute('x');
	var yo=kropek.getAttribute('y');	
	
	var	x=1*xo+wsp.x-5;
	var	y=1*yo+wsp.y-5;
	
	

	//alert(xo+" "+yo);
	new kliksh(nr_ramki,x,y);

}
	
function nextImage(nr){
	//alert('nextImage: '+nr+" link: "+doKlikaniaLinki[pozycja]);
	if(doKlikaniaLinki[pozycja]!=undefined){
		getImage(doKlikaniaLinki[pozycja],nr);
		pozycja+=1;
	}else{
		document.getElementById(nr+'DT').style.display='none';
		var rys=document.getElementById(nr+'load').getElementsByTagName('img')[0];
		rys.style.width=16;
		rys.style.height=16;
		rys.src='imgs/smiley-evil.png';
	}
}	

function getXY(event){
	var x,y;
	if(event.offsetX){
		x=event.offsetX;
		y=event.offsetY;
	}
	else{
		var sender = event;
		var target= sender.target;      	
		var nodeTop = target.offsetTop;  
		var nodeLeft = target.offsetLeft;
		y=sender.pageY-nodeTop;
		x=sender.pageX-nodeLeft;
	}
	return {x:x,y:y}
}

	
/** klikniecie w obrazek! */
function kliknietyObrazek(nr,event){
	var wsp = getXY(event);
	new kliksh(nr,wsp.x,wsp.y);
}	
	
function ajaxTimeout(obj,link,numer){
	obj.abort();
	alert('Timeout!');
	getImage(link, numer);
}	
	
	
function kliksh(nr_ramki,x,y){
	if(	x=='' || x==undefined || x>350 || x<0 ||
		y=='' || y==undefined || y>150 || y<0	)
	{
		alert('Error: undefined position :(')
		return;
	}
	//return;
	this.captcha = tabCaptcha[nr_ramki];
	this.gif	 = tabGif[nr_ramki];
	this.x=x;
	this.y=y;
	this.src=tabRecruitLink[nr_ramki];
	this.nr=nr_ramki;
	
	document.getElementById(this.nr+'DT').style.display='none';
	document.getElementById(this.nr+'load').style.display='';
	
	//alert(this.captcha+"\n"+this.x+"\n"+this.y+"\n"+this.src+"\n")
	/** Wyslanie zapytania do DT z kliknieciem */
	var that=this;
//	alert('captcha_id='+this.captcha+'&x='+this.x+'&y='+this.y+'   SRC: '+this.src);
//	return;
	
	if(navigator.appName=="Opera"){
		var xmlhttp=new opera.XMLHttpRequest();
		xmlhttp.onload = function(){that.klikshStep2(xmlhttp.responseText);}
		xmlhttp.onerror=function(){ alert('Error :('); }
		xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		
		xmlhttp.open("POST","http://www.darkthrone.com/recruiter/outside/"+this.src,true);
		xmlhttp.send('captcha_id='+this.captcha+'&x='+this.x+'&y='+this.y);
		var xhrTimeout=setTimeout("ajaxTimeout("+xmlhttp+","+this.src+","+	this.nr+");",8000);
	//	alert('captcha_id='+this.captcha+'&x='+this.x+'&y='+this.y+'   SRC: '+this.src);
	}else{
		GM_xmlhttpRequest({
			method: 'POST',
			url: "http://www.darkthrone.com/recruiter/outside/"+this.src,
			headers: { "Content-type" : "application/x-www-form-urlencoded" }, 
			data: encodeURI('captcha_id='+this.captcha+'&x='+this.x+'&y='+this.y),			
			
			onload: function(responseDetails) {that.klikshStep2(responseDetails.responseText);},
			onerror: function(responseDetails) { alert('Error :(');}
		});
	}
	
	this.klikshStep2=function(str){
		if(xhrTimeout)
			clearTimeout(xhrTimeout);
		//alert(this.src)
		if(str.indexOf('Please click the word')>-1){	
			//alert('zle slowo')		
			getImage(this.src,this.nr);
			return;
		}	
		
		if(str.indexOf('You have just increased')>-1){  //population
			var gif=this.gif.substr(this.gif.lastIndexOf("/")+1);
			
			//alert("kto="+NICK+"&komulink="+this.src+'captcha='+this.captcha+'&x='+this.x+'&y='+this.y+'&gif='+gif);
			
			opis.odejmijDoKlikania();
			var client = new XMLHttpRequest();
			 client.open("POST", "ajax/poprawneKlikniecie.php");
			 client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			// client.onload = function(){alert(client.responseText);}s		
			 client.send("kto="+NICK+"&komulink="+this.src+'&captcha='+this.captcha+'&x='+this.x+'&y='+this.y+'&gif='+gif);
			 tabela.dalClick(NICK);			 
			 tabela.dostalClick(this.src);			 
			 nextImage(this.nr);
			 return;
		}			
		alert('Unclassified error');
		nextImage(this.nr);
	}
}

	
function Liczba(str){
	if(navigator.appName=="Opera")
		 return parseFloat(str);
	else
		return Number(str);
 }
	
function infoBox(){
	this.spans = document.getElementById('info').getElementsByTagName('span');
	this.text1 = this.spans[0];
	this.text2 = this.spans[1];
	this.text3 = this.spans[2];
	
	
	this.iloscMozliwychKlikniec;
	this.licznikPobranFormularza=0;
	this.licznikPobranObrazkow=0;
	
	this.tworzenieRamek	= function(){
		this.text1.innerHTML	= "Creating frames...";
	}
	/** ustawienie pola ostatnio widziany oraz pobranie kliknietych dobrze obrazkow */
	this.uzupelnianieDanych = function(){
		this.text1.innerHTML	= "Filling data...";
	}
	this.pobieranieLinkowDoKlikania = function(){
		this.text1.innerHTML = "Downloading recruit`s link to click...";
	}
	this.ileDoKlikania = function (liczba){
		this.iloscMozliwychKlikniec=liczba;
		this.text1.innerHTML = "To click: "+this.iloscMozliwychKlikniec;
	}
	
	this.odejmijDoKlikania = function (){
		this.iloscMozliwychKlikniec-=1;
		this.text1.innerHTML = "To click: "+this.iloscMozliwychKlikniec;
	}
	
	this.pobieranieFormularza = function(){
		this.licznikPobranFormularza+=1;
		this.text2.innerHTML = "Downloading "+this.licznikPobranFormularza+ " form(s)";
	}
	
	this.pobranoFormularz = function(){
		this.licznikPobranFormularza-=1;
		if(this.licznikPobranFormularza!=0)
			this.text2.innerHTML = "Downloading "+this.licznikPobranFormularza+ " form(s)";
		else
			this.text2.innerHTML = "";
	}
	this.pobieranieObrazkaDoKlikniecia = function(){
		this.licznikPobranObrazkow+=1;
		this.text3.innerHTML = "Downloading "+ this.licznikPobranObrazkow + " img(s)";
	}
	this.zakonczeniePobieranieObrazkaDoKlikniecia = function(){
		this.licznikPobranObrazkow-=1;
		if(this.licznikPobranObrazkow!=0)
			this.text3.innerHTML = "Downloading "+ this.licznikPobranObrazkow + " img(s)";
		else
			this.text3.innerHTML = "";
	}
}	
	
	
	
	
	
	
	

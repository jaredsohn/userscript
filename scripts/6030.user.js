//Niniejszy skrypt jest darmowy mozesz go 
//rozprowadzac dalej i/lub modyfikowac 
//pod warunkiem nie pobierania z tego tytulu oplat
//(z wyjatkiem ceny nosnika)
//i zachowania tej informacji

//Niniejszy skrypt rozpowszechniany jest 
// BEZ JAKIEJKOLWIEK GWARANCJI 

//Uzywanie skryptu moze byc niezgodne z regulaminem gry

// ==UserScript==
// @name           Ladownosc floty
// @namespace      li-on@wp.pl
// @description    Ogame - show capacity of fleet
// @include        http://*/game/flotten1.php*
// ==/UserScript==

function kropka(wart){
	var wynik='';
	if(wart<0){
		wart=0-wart;
		var minus='-';
	}else{
		var minus='';
	}
	wynik+=(wart%1000);
	wart=Math.floor(wart/1000);
	while(wart>=1){
		if(wynik<100) wynik='0'+wynik;
		if(wynik<10) wynik='0'+wynik;
		wynik=(wart%1000)+'.'+wynik;
		wart=Math.floor(wart/1000);
	}
	return minus+wynik;
}

function przelicz(){
var suma1=0;
var suma2=0;
var suma3=0;
	for(i=202; i<215; i++){
		x=document.getElementsByName("ship"+i);
		y=document.getElementsByName("capacity"+i);
		u=document.getElementsByName("speed"+i);
		v=document.getElementsByName("consumption"+i);
		if(x.length && y.length && x[0].value!=''){
			a=parseInt(x[0].value);
			b=parseInt(y[0].value);
			c=parseInt(u[0].value);
			d=parseInt(v[0].value);
			suma1+=a*b;
			if((suma2 > c || suma2 == 0) && a>0 ) suma2=c;
			suma3+=a*d;
		}
	}
	if(surowce>suma1){
		surstr=kropka(surowce-suma1);
		surstr+='&nbsp;&nbsp;<a ondblclick="maxShip(\'ship202\');document.getElementsByName(\'ship202\')[0].focus();" onclick="document.getElementsByName(\'ship202\')[0].value='+Math.ceil((surowce-suma1)/5000)+';" >MT: '+kropka(Math.ceil((surowce-suma1)/5000))+'&nbsp;&nbsp;<a ondblclick="maxShip(\'ship203\');document.getElementsByName(\'ship203\')[0].focus();" onclick="document.getElementsByName(\'ship203\')[0].value='+Math.ceil((surowce-suma1)/25000)+';" >DT: '+kropka(Math.ceil((surowce-suma1)/25000))+'</a>';
	}else{
		surstr='0';
	}
 s[k].innerHTML='<font color="#AAAAFF">Pozostalo: '+surstr+' </font>&nbsp;&nbsp;<font color="#00FF00">Ladownosc: '+kropka(suma1)+
 //' Predkosc: '+kropka(suma2)+' Zuzycie: '+kropka(suma3)+
 '</font>';
}

//pobieranie ilosci surowcow
var komorki=document.getElementsByTagName("td");
var metstr=komorki[18].innerHTML.replace(/\./g,'');
var krystr=komorki[19].innerHTML.replace(/\./g,'');
var deustr=komorki[20].innerHTML.replace(/\./g,'');
metstr=metstr.replace(/<font[^>]*>/g,'').replace(/<\/font[^>]*>/g,'');
krystr=krystr.replace(/<font[^>]*>/g,'').replace(/<\/font[^>]*>/g,'');
deustr=deustr.replace(/<font[^>]*>/g,'').replace(/<\/font[^>]*>/g,'');

/*
if(metstr.indexOf('<font color')!=-1) {
	metstr=metstr.substring(22,metstr.indexOf('</font'));
}
if(krystr.indexOf('<font color')!=-1) {
	krystr=krystr.substring(22,krystr.indexOf('</font'));
}
if(deustr.indexOf('<font color')!=-1) {
	deustr=deustr.substring(22,deustr.indexOf('</font'));
}
*/
surowce=parseInt(metstr)+parseInt(krystr)+parseInt(deustr);
surstr=kropka(surowce);
surstr+='&nbsp;&nbsp;<a ondblclick="maxShip(\'ship202\');document.getElementsByName(\'ship202\')[0].focus();" onclick="document.getElementsByName(\'ship202\')[0].value='+Math.ceil(surowce/5000)+';" >MT: '+kropka(Math.ceil(surowce/5000))+'&nbsp;&nbsp;<a ondblclick="maxShip(\'ship203\');document.getElementsByName(\'ship203\')[0].focus();" onclick="document.getElementsByName(\'ship203\')[0].value='+Math.ceil(surowce/25000)+';" >DT: '+kropka(Math.ceil(surowce/25000))+'</a>';
//surstr+='&nbsp;&nbsp;<a href="javascript:maxShip(\'ship202\');" >MT: '+kropka(Math.ceil(surowce/5000))+'</a>&nbsp;&nbsp;<a href="javascript:maxShip(\'ship203\');" >DT: '+kropka(Math.ceil(surowce/25000))+'</a>';
//ladownosc
var s=document.getElementsByTagName('th');
for(k=s.length-1;;k--) if(s[k].innerHTML.indexOf("Dalej")!=-1) break;
k++;
s[k].innerHTML='<font color="#9999FF">Surowce: '+surstr+' </font>&nbsp;&nbsp;<font color="#00FF00">Ladownosc: 0 '+
//'Predkosc: 0 Zuzycie: 0'+
'</font>';
for(i=202; i<216; i++){
	x=document.getElementsByName("ship"+i);
	if(x.length){
		x[0].addEventListener('keyup',przelicz,true);
		x[0].addEventListener('focus',przelicz,true);
		x[0].addEventListener('click',przelicz,true);
		
		document.getElementsByName("ship"+i)[0].value='';
		
	}
}

str = GM_getValue("fr");
	if(str==null){ 
	alert(unescape("Niniejszy%20skrypt%20jest%20darmowy%20mo%u017Cesz%20go%20%0Arozprowadza%u0107%20dalej%20i/lub%20modyfikowa%u0107%20%0Apod%20warunkiem%20nie%20pobierania%20z%20tego%20tytu%u0142u%20%0Aop%u0142at%20%28z%20wyj%u0105tkiem%20ceny%20no%u015Bnika%29%0Ai%20zachowania%20tej%20informacji%0ANiniejszy%20skrypt%20rozpowszechniany%20jest%20%0A%0ABEZ%20JAKIEJKOLWIEK%20GWARANCJI%20%0A%0AU%u017Cywanie%20skryptu%20mo%u017Ce%20by%u0107%20niezgodne%20z%20regulaminem%20gry"));
	GM_setValue("fr","lion")
	}

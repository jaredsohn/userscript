// ==UserScript==
// @name           Ogame menu flota
// @namespace      darthtonico@gmail.com
// @description    Ogame 1 - varias mejoras en menu de flota
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
	if(recursos>suma1){
		surstr=kropka(recursos-suma1);
		surstr+='&nbsp;&nbsp;CP: '+kropka(Math.ceil((recursos-suma1)/5000))+'&nbsp;&nbsp;CG: '+kropka(Math.ceil((recursos-suma1)/25000));
	}else{
		surstr='0';
	}
 s[k].innerHTML='<font color="#AAAAFF">Sobra: '+surstr+' </font>&nbsp;&nbsp;<font color="#00FF00">Capacidad: '+kropka(suma1)+
 //' Predkosc: '+kropka(suma2)+' Zuzycie: '+kropka(suma3)+
 '</font>';
}

//pobieranie ilosci surowcow
var komorki=document.getElementsByTagName("td");
var metstr=komorki[18].innerHTML.replace(/\./g,'');
var krystr=komorki[19].innerHTML.replace(/\./g,'');
var deustr=komorki[20].innerHTML.replace(/\./g,'');

if(metstr.indexOf('<font color')!=-1) {
	metstr=metstr.substring(22,metstr.indexOf('</font'));
}
if(krystr.indexOf('<font color')!=-1) {
	krystr=krystr.substring(22,krystr.indexOf('</font'));
}
if(deustr.indexOf('<font color')!=-1) {
	deustr=deustr.substring(22,deustr.indexOf('</font'));
}
recursos=parseInt(metstr)+parseInt(krystr)+parseInt(deustr);
surstr=kropka(recursos);
surstr+=' CP: '+kropka(Math.ceil(recursos/5000))+' CG: '+kropka(Math.ceil(recursos/25000));
//Capacidade
var s=document.getElementsByTagName('th');
k=s.length-1;
s[k].innerHTML='<font color="#9999FF">recursos: '+surstr+' </font>&nbsp;&nbsp;<font color="#00FF00">Capacidad: 0 '+
//'Predkosc: 0 Zuzycie: 0'+
'</font>';
for(i=202; i<215; i++){
	x=document.getElementsByName("ship"+i);
	if(x.length){
		x[0].addEventListener('keyup',przelicz,true);
		x[0].addEventListener('click',przelicz,true);
	}
}

//*Script original de assser http://userscripts.org/scripts/show/6130*\\
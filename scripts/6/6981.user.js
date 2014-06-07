// ==UserScript==
// @name           Ogame fleet capacity En
// @description    Ogame - show capacity of fleet En
// @include        http://*/game/flotten1.php*
// ==/UserScript==

function dot(wart){
	var equals='';
	if(wart<0){
		wart=0-wart;
		var minus='-';
	}else{
		var minus='';
	}
	equals+=(wart%1000);
	wart=Math.floor(wart/1000);
	while(wart>=1){
		if(equals<100) equals='0'+equals;
		if(equals<10) equals='0'+equals;
		equals=(wart%1000)+'.'+equals;
		wart=Math.floor(wart/1000);
	}
	return minus+equals;
}

function count(){
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
	if(Resources>suma1){
		surstr=dot(Resources-suma1);
		surstr+='&nbsp;&nbsp;SC: '+dot(Math.ceil((Resources-suma1)/5000))+'&nbsp;&nbsp;LC: '+dot(Math.ceil((Resources-suma1)/25000));
	}else{
		surstr='0';
	}
 s[k].innerHTML='<font color="#AAAAFF">Remaining: '+surstr+' </font>&nbsp;&nbsp;<font color="#00FF00">Capacity: '+dot(suma1)+
 //' speed: '+dot(suma2)+' Consumption: '+dot(suma3)+
 '</font>';
}

//Resource usage
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
Resources=parseInt(metstr)+parseInt(krystr)+parseInt(deustr);
surstr=dot(Resources);
surstr+=' SC: '+dot(Math.ceil(Resources/5000))+' LC: '+dot(Math.ceil(Resources/25000));
//Capacity
var s=document.getElementsByTagName('th');
k=s.length-1;
s[k].innerHTML='<font color="#9999FF">Resources: '+surstr+' </font>&nbsp;&nbsp;<font color="#00FF00">Capacity: 0 '+
//'Speed: 0 Consumption: 0'+
'</font>';
for(i=202; i<215; i++){
	x=document.getElementsByName("ship"+i);
	if(x.length){
		x[0].addEventListener('keyup',count,true);
		x[0].addEventListener('click',count,true);
	}
}

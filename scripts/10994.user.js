// ==UserScript==
// @name		TWAlarm
// @author 		r0nin
// @version 		1.0
// @description 	Tribal Wars/Plemiona/Die Staemme Alarm script
// @include		http://*.ds.innogames.net/*
// @include		http://pl*.plemiona.pl/*
// @include		http://*.tribalwars.*/*
// @include		http://*.diestaemme.*/*
// ==/UserScript==

function start(){

var tables = document.getElementsByTagName('TABLE');
var MIN = 30000; // minimum value (in milisecs)
var MAX = 60000; // maximum value (in milisecs)

/////////////////////////////
//*************************//
//set interval
//
function interval(){  // generates a random value in the default time interval
ti = Math.random() * (MAX-MIN);
ti = Math.round(ti);
return parseInt(MIN) + ti;
} 
//
//*************************//
/////////////////////////////

/////////////////////////////
//*************************//
//load cookie
//
function getCookie(n){ 
	c=document.cookie
	if((p=c.indexOf(n+='='))<0||(p>0&&c.charAt(p-1)!=' '))return 
	p+=n.length;if((k=c.indexOf(';',p))<0)
	k=c.length;return unescape(c.slice(p,k))
}
//
//*************************//
///////////////////////////// 


/////////////////////////////
//*************************//
//save cookie
//
function setCookie(n,v,e,p,d,s){
    	document.cookie=n+'='+escape(v)+
    	(e?';expires='+e.toGMTString():'')+
    	(p?';path='+p:'')+(d?';domain='+d:'')+(s?';secure':'')
}
//
//*************************//
/////////////////////////////

/////////////////////////////
//*************************//
//searching new attack
//
function play(){
	//************************SOUNDS********************************//
	//var a = new Audio("http://prac.cba.pl/alert.wav");	
	var a = new Audio("http://www.moviewavs.com/0028375953/WAVS/Movies/Star_Wars/imperial.wav");
	//**************************************************************//
	var strIndex = tables[5].tBodies[0].rows[0].cells[0].innerHTML.indexOf('att.png');
	if(strIndex!=-1)
	{				
		var tmp=tables[5].tBodies[0].rows[0].cells[0].innerHTML;
		var numAttack=tmp.charAt(strIndex+18);
		if(tmp.charAt(strIndex+19)!=")") numAttack+=tmp.charAt(strIndex+19);
		var numN=parseInt(numAttack);		
		var numB=parseInt(getCookie('attack'));
		if(numB<numN)
		{
			if(navigator.appName.indexOf('Opera')!=-1) { a.play(); }
			else{ alert("Zainstaluj najnowszą wersje przegladrki Opera"); }
			setCookie('attack',numAttack);
		}	
		
	}else{
		setCookie('attack','0')
	}
}
//
//*************************//
/////////////////////////////

/////////////////////////////
//*************************//
//refresh window
//
function reload(){ 
	window.location.reload(); 
}
//
//************************//
////////////////////////////


var i=interval();

setTimeout(function() { reload(); }, i);
play();

}

onload=start();
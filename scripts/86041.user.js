// version 2 Edited by Derrin (Fan)
// Copyright (c) 2010-09-03, Musat Lucian
//
// ==UserScript==
// @name          Travian Attack Alarm
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Travian Attack Alarm
// @include 	http://*.travian*.*/dorf1.php*
// @exclude 	http://www.travian*.*

// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude 	http://*.travian*.*/dorf2.php*

// @exclude 	http://*.travian*.*/nachrichten.php*
// @exclude 	http://*.travian*.*/karte.php*
// @exclude 	http://*.travian*.*/statistiken.php*
// @exclude 	http://*.travian*.*/berichte.php.php*




// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*/*log
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==

/* getElementByClass
/**********************/
	
    
	


    b=GM_getValue("key", 1);
	
var main, newElement,t;
main = document.getElementById('movements');

function on()
{

	var a=GM_setValue("key", 1);
	location.reload(true);

}

function off()
{
	
	var a=GM_setValue("key", 0);
	location.reload(true);

}



if (main) {
	var infobar = document.createElement("div");
    
	infobar.innerHTML = '<div id="status" align="center" style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; ' +
    'color: red;"> ' +
    '<b></b></div> ';
	if(b==1)
	{
	
	infobar.innerHTML=infobar.innerHTML + '<span style="color:green">هشدار حمله : روشن</span></marquee>';

var buttonnode= document.createElement('div');

buttonnode.innerHTML='<div id="status" align="center" style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; ' +
    'color: red;"> ' +
    '<b><a href="#">غیر فعال کردن</a></b></div> ';

infobar.appendChild(buttonnode);
buttonnode.addEventListener('click', off, false);

	}
	else
	{
			infobar.innerHTML=infobar.innerHTML + '<span style="color:red">هشدار حمله : خاموش</span></marquee>';
			var buttonnode= document.createElement('div');

buttonnode.innerHTML='<div id="status" align="center" style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; ' +
    'color: red;"> ' +
    '<b><a href="#">فعال کردن</a></b></div> ';

infobar.appendChild(buttonnode);
buttonnode.addEventListener('click', on, false);
	}
	
		
    main.parentNode.insertBefore(infobar, main);
	
}





var logo = document.createElement("div");


var allHTMLTags = new Array();


function attack(){
allHTMLTags=document.getElementsByTagName("*");



for (i=0; i<allHTMLTags.length; i++) {

if (allHTMLTags[i].className=="att1") {

  
   

logo.innerHTML = '<div  style="margin: 0 auto 0 auto;width:0px;height:0px; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #000000; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    '</p></div>';
logo.style.visibility = "hidden";
document.body.insertBefore(logo, document.body.firstChild);
clearTimeout(t);
break;
   
   
}



}


t=setTimeout("attack()",4000);	


}
if(b==1)
{
setTimeout("location.reload(true);",60000);
attack();
}



	

	
//var myinterval = setInterval(attack(), 8000);
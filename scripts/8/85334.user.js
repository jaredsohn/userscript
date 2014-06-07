// version 0.1 BETA!
// 2010-09-03
// Copyright (c) 2010, Musat Lucian
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Travian Attack Alarm
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Travian Attack Alarm
// @include 	http://*.travian.com*.*/dorf1.php*
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
    '<b>Attack Alarm</b></div> ';
	if(b==1)
	{
	
	infobar.innerHTML=infobar.innerHTML + '<marquee scrollamount="2" behavior="alternate"><span style="color:green">Alarm is now on...</span></marquee>';

var buttonnode= document.createElement('div');

buttonnode.innerHTML='<div id="status" align="center" style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; ' +
    'color: red;"> ' +
    '<b><a href="#">Dezactivate</a></b></div> ';

infobar.appendChild(buttonnode);
buttonnode.addEventListener('click', off, false);

	}
	else
	{
			infobar.innerHTML=infobar.innerHTML + '<marquee scrollamount="2" behavior="alternate"><span style="color:red">Alarm is off...</span></marquee>';
			var buttonnode= document.createElement('div');

buttonnode.innerHTML='<div id="status" align="center" style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; ' +
    'color: red;"> ' +
    '<b><a href="#">Activate</a></b></div> ';

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
    '<iframe width="448" height="55" name="sound" id="sound" frameborder="0" scrolling="no" src="http://www.youtube.com/v/AfuQd_xZlKw&autoplay=1&loop=1"></iframe> ' +
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
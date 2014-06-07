// version 0.1 BETA!
// 2010-09-03
// Copyright (c) 2010, Musat Lucian & Reza Moghadam
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
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Travian Attack Alarm Farsi V.2
// @namespace     Travian
// @description   Travian Attack Alarm Farsi V.2
// @include 	http://*.travian*.*
// @exclude 	http://www.travian*.*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/hilfe.php*
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

var allDivs, thisDiv; // find tag
var countvillages=0; // village number
var adress= new Array();  //store village tag adress
var villages=new Array();// store village's id
var cur=window.location; // page's url
var cur1=cur.toString().split("=");//split url
var l=0;//for check function
var saved; //for playsouynd function

var host=window.location.hostname;// get travian server

var c=cur1[0].match(/newdid/i);
var activename=host+"activ";
if(cur1[1]!=null && c!=null && cur1[1]!="one")
{
	var a=GM_setValue(host,cur1[1]); //save the last clicked village

}


//==============================================================
    var m=GM_getValue(activename, 1); // sound on/off
	
var main, newElement,t;
main = document.getElementById('movements');

function on()
{

	var a=GM_setValue(activename, 1);
	location.reload(true);

}

function off()
{
	
	var a=GM_setValue(activename, 0);
	location.reload(true);

}

function changes()
{
	var code=prompt("آدرس فایل صدا را وارد کنید .");
	var a=GM_setValue(host+"sound",code); //save the sound code
	location.reload(true);
}

if (main) {
	var infobar = document.createElement("div");
    
	infobar.innerHTML = '<div id="status" align="center" style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; ' +
    'color: red;"> ' +
    '<b>هشدار حمله</b></div> ';
	if(m==1) //of sound is activated
	{
	
	infobar.innerHTML=infobar.innerHTML + '<marquee scrollamount="2" behavior="alternate"><span style="color:green">هشدار حمله : روشن</span></marquee>';

var buttonnode= document.createElement('div');

buttonnode.innerHTML='<div id="status" align="center" style="margin: 0 auto 0 auto; ' +
    'border-bottom: 0px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; ' +
    'color: red;"> ' +
    '<b><a href="#">غیر فعال کردن</a></b></div> ';

infobar.appendChild(buttonnode);
buttonnode.addEventListener('click', off, false);

	}
	else //if sound is disabled
	{
			infobar.innerHTML=infobar.innerHTML + '<marquee scrollamount="2" behavior="alternate"><span style="color:red">هشدار حمله : خاموش</span></marquee>';
			var buttonnode= document.createElement('div');

buttonnode.innerHTML='<div id="status" align="center" style="margin: 0 auto 0 auto; ' +
    'border-bottom: 0px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; ' +
    'color: red;"> ' +
    '<b><a href="#">فعال کردن</a></b></div> ';

infobar.appendChild(buttonnode);
buttonnode.addEventListener('click', on, false);
	}
	
	var changesound= document.createElement('div'); //create change sound button

changesound.innerHTML='<div id="status" align="center" style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; ' +
    'color: red;"> ' +
    '<b><a href="#">کلیک برای تغییر صدا</a></b></div> ';

infobar.appendChild(changesound);
changesound.addEventListener('click', changes, false);
	
	
		
    main.parentNode.insertBefore(infobar, main);
	
}
                 
//===================================================================

function playsound()
{
	
	 var sound=GM_getValue(host+"sound", "FoX7vd30zq8"); //get the sound coode.
	
	if(saved)
	saved.parentNode.removeChild(saved); //delete last element
	var logo = document.createElement("div");
	logo.id="text";
	logo.innerHTML = '<div  style="margin: 0 auto 0 auto;width:0px;height:0px; ' +
    'border-bottom: 0px solid #000000; margin-bottom: 0px; ' +
    'font-size: small; background-color: #000000; ' +
    'color: #ffffff;"><p style="margin: 0px 0 0px 0;"> ' +
    '<iframe width="0" height="0" name="sound" id="sound" frameborder="0" scrolling="no" src="http://www.youtube.com/v/'+sound+'&autoplay=1&loop=1"></iframe> ' +
    '</p></div>';
logo.style.visibility = "hidden";
document.body.insertBefore(logo, document.body.firstChild);
saved=logo;

}


allDivs = document.evaluate(
    "//a[contains(@href,'?newdid=')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) 
	{  //get villages url
    	thisDiv = allDivs.snapshotItem(i);

		var num=thisDiv.toString().split("=");//get villages id


		villages[i]=num[1];
		adress[i]=thisDiv;  //save village's id and  adress
    	countvillages++;  //increase villages number
	}
	
if(countvillages==0)
{
	countvillages=1;
	villages[0]="one";
	adress[0]=infobar;
}


function check(l)
{
	 xmlhttp=new XMLHttpRequest();

xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		var bod=xmlhttp.responseText;
	var r=bod.match(/Arriving attacking Troops/i);
	 
		
	
	adres=adress[l];
			if (adres && r!=null) 
			{
				var newElement;
    			newElement = document.createElement('div');
				newElement.id="text";
				newElement.innerHTML="<div style='color:red;'><blink><b>دهکده زیر حمله است<b></blink></div>";
    			adres.parentNode.insertBefore(newElement, adres.nextSibling);
				if(m==1)
				playsound();
			}
			else
			{  
			var newElement;
				newElement = document.createElement('div');
				newElement.id="text";
				newElement.innerHTML="<div style='color:green;'>هیچ حمله ای در راه نیست</div>";
    			adres.parentNode.insertBefore(newElement, adres.nextSibling);
			}
			
	l=l+1;
	if(l<countvillages)
	{
	check(l);
	}else
	{
		var b= GM_getValue(host,villages[0]);
       xmlhttp.open("GET",'http://'+host+'/dorf1.php?newdid='+b +"&" + Math.random(),true);
	   xmlhttp.send();
	}
    }
  }
  
xmlhttp.open("GET",'http://'+host+'/dorf1.php?newdid='+villages[l] +"&" + Math.random(),true);
xmlhttp.send();

}

function result()
{

for(k=0;k<countvillages+1;k++)
{
	var adSidebar = document.getElementById('text');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
}
	check(0);
	
setTimeout(result, 20000);
}
check(0);
setTimeout(result, 20000);


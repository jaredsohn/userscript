// OilFight script
// version 0.1 BETA!
// 2007-01-03
// Copyright (c) 2005, Charles Gomes
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "OilFight", and click Uninstall.
//
// This script isn't meant to be a cheating script, it just add usefull tools
// That means you can be more productive.
// I understand that the host of the game can completely ban this if He
// disagres with the usage. This is a proof of concept, you can always
// improve. New features are very welcome but don't  forget to share!
// Let me know if you have made it more usefull. Post comment at:
// UserScripts.org
//
// TODO:
// Auto Buy Attack + Hire Mercenaries
// Auto Buy Spies
// Auto Buy Defense + Hire Mercenaries
// Clock showing auto time remaining.
//
// INFO:
// If you click Buy All Defense and enable Auto-Mode, it will auto buy
// defense every X minutes
// Change the autointerval variable to what you preffer.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          OilFight
// @namespace     http://widesol.com/~charles/scripts/
// @description   script to misc functions on oilfight
// @include       http://oilfight.com/*
// @include       http://www.oilfight.com/*
// ==/UserScript==

//Change the Interval for the auto mode Here:
var autointerval=900000;  // 15 minutes should be good

var type="0";
var budget="0";


if(document.URL.match(/buyallnoedomotua/i)){
	automode=0;
	GM_setValue("automode",0);
}
if(document.URL.match(/buyalledomotua/i)){
	automode=1;
	GM_setValue("automode",1);
}
var automode=GM_getValue("automode",0);
var htmldata = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #000000; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    '<a href="armory.php?buyallattack=1">Buy All Attack</a> ' +
    '<a href="armory.php?buyalldefense=1">Buy All Defense</a> ';

    if(automode==0){
	htmldata+='<a href="armory.php?buyalledomotua=1">Auto-Mode</a></p></div>';
    } else {
	htmldata+='<a href="armory.php?buyallnoedomotua=1">Disable Auto-Mode</a></p></div>';
    }
var accessbar = document.createElement("div");
accessbar.innerHTML = htmldata;
document.body.insertBefore(accessbar, document.body.firstChild);


function match(input, regexp) {
	return ((input.name && input.name.match(regexp)) ||
		(input.id && input.id.match(regexp)));
}


function fillField(input) {

	if(type=="spo"){
		if (match(input,/numspies/i)) //numspies
			input.value="1";
		else if (input.name=="numturns") //numspies
			input.value="1";
		else if(input.name=="spyType" && input.value=="spyOil")
			input.checked=true;
	} 
	else if(type=="spd"){
		if (match(input,/numspies/i)) //numspies
			input.value="1";
		else if (input.name=="numturns") //numspies
			input.value="1";
		else if(input.name=="spyType" && input.value=="spyDef")
			input.checked=true;
	} 
	else if(type=="sbd"){
		if (match(input,/numspies/i)) //numspies
			input.value="10";
		else if (input.name=="numturns") //numspies
			input.value="5";
		else if(input.name=="spyType" && input.value=="sabDef")
			input.checked=true;
	} else if(type=="buyallweapon") {
		if (match(input,/buy_w6/i)) //best weapon
			input.value=budget;
	}
}

function getElementsByTag(oElm, strTagName){
	var arrReturnElements = (strTagName == '*' && document.all)? document.all : oElm.getElementsByTagName(strTagName);
	return (arrReturnElements);
}

function buystuff(){
	table = getElementsByTag(document, 'table')[0];
	cells = getElementsByTag(table, 'td')[1];
	table1= getElementsByTag(cells, 'table')[3];
	cell1 = getElementsByTag(table1, 'td');
	var TotalOil=cell1[0].innerHTML.replace(/<.*?>/g,'').replace(/[A-Za-z.,:]+/g, '');
	if(document.URL.match(/armory/i)) {
		budget= Math.floor(TotalOil / 839000);
		if(budget > 0 ){
			var finished=0;
			var inputElements = document.getElementsByTagName('input');
			for (var i = 0; i < inputElements.length; i++) {
		                if (match(inputElements[i],/buy_w6/i) && autobuy=="attack" ) { //best weapon 
		                        inputElements[i].value=budget;
					GM_setValue("autobuy", "attack"); 
					finished=1;
		                }else if (match(inputElements[i],/buy_dw5/i) && autobuy=="defense" ) { //best weapon 
		                        inputElements[i].value=budget;
					GM_setValue("autobuy", "defense"); 
					finished=1;
				}else if (match(inputElements[i],/buybut/i) && finished==1) { //send form
					inputElements[i].click();
					//alert("vo clica");
				}
			}
		}else if(automode==1)
			window.location.reload();
	}
}


var pageAddr, links, a, href;
pageAddr = window.location.href;
links = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);
    href = a.href;
    
    // stats
    if ((href.match(/stats\.php/i))) {

	//spy
	var spo = document.createElement("a");
	spo.innerHTML = ' SpO';
	spo.title="Spy Oil";
	spo.href=href;
	spo.href = href.replace(/stats.php\?/g, 'spy.php?spo=1&');
	var spd = document.createElement("a");
	spd.innerHTML = ' SpD';
	spd.title="Spy Defense";
	spd.href=href;
	spd.href = href.replace(/stats.php\?/g, 'spy.php?spd=1&');
	var sbd = document.createElement("a");
	sbd.innerHTML = ' SBD';
	sbd.title="SaBotage Defense (MAX)";
	sbd.href=href;
	sbd.href = href.replace(/stats.php\?/g, 'spy.php?sbd=1&');
	//attack
	var atk = document.createElement("a");
	atk.innerHTML = ' ATK';
	atk.title="Attack";
	atk.href=href;
	atk.href = href.replace(/stats.php/g, 'attack.php');
	//insert
	a.parentNode.insertBefore(sbd, a.nextSibling);
	a.parentNode.insertBefore(spo, a.nextSibling);
	a.parentNode.insertBefore(spd, a.nextSibling);
	a.parentNode.insertBefore(atk, a.nextSibling);
    }



    if (href != a.href) {
	a.href = href;
	a.onclick = null;
    }

}

if((document.URL.match(/spo\=1/i))) {
	type = "spo";
	var f=document.forms[0];
	for (var i=0; i<f.elements.length; i++)
		fillField(f.elements[i]);
	f.submit();
}
else if((document.URL.match(/spd\=1/i))) {
	type = "spd";
	var f=document.forms[0];
	for (var i=0; i<f.elements.length; i++)
		fillField(f.elements[i]);
	f.submit();
}
else if((document.URL.match(/sbd\=1/i))) {
	type = "sbd";
	var f=document.forms[0];
	for (var i=0; i<f.elements.length; i++)
		fillField(f.elements[i]);
	f.submit();
}
else if(automode==1 || document.URL.match(/buyall/i)) {
	var autobuy="none";
	var interval=1;
	if(document.URL.match(/buyallattack/i)){
		autobuy="attack";
	        GM_setValue("autobuy", autobuy);
	}
	else if(document.URL.match(/buyalldefense/i)){
		autobuy="defense";
	        GM_setValue("autobuy", autobuy);
	}else if(GM_getValue("automode",0)==1 || document.URL.match(/buyalledomotua/i)){
		if(GM_getValue("autobuy",0)!=0)
			autobuy=GM_getValue("autobuy","attack");
		var automode = 1;
		GM_setValue("automode", 1);
		if(!document.URL.match(/armory/i)){
			var href ="http://"+ window.location.host+"/armory.php";
			window.location.href=href;
		}
		interval=autointerval;
	}else if(GM_getValue("automode",0)==1 && document.URL.match(/buyallnoedomotua/i)){
		GM_setValue("automode",0);
		interval=3600000;
	}
	setTimeout(buystuff, interval);
}


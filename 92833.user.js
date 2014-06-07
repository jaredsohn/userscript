// Advanced Launch Pad Greasemonkey fleet script
// version 1.1!
// 18-Oct-2007
// Copyright (c) 2007, Birinight
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Evo Assasssins", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Advanced Launch Pad (POD additon) (Modded by HACKhalo2)
// @namespace     POD Launch Pad (Modded by HACKhalo2)
// @description   This script launch fleats at the same time. Now with Autocomplete!
// @include	  http://ev5-dev.neondragon.net/fleets
// ==/UserScript==
var flag1 = false;
var flag2 = false;
var flag3 = false;
var flag4 = false;
var flag5 = false;
var flag6 = false;
var flag7 = false;
var flag8 = false;
var flag9 = false;
var flag10 = false;
var flag11 = false;
var flag12 = false;
var flag13 = false;
var flag14 = false;
var flag15 = false;
var flag16 = false;
var flag17 = false;
var flag18 = false;
var flag19 = false;
var flag20 = false;
var flag21 = false;
var flag22 = false;
var flag23 = false;
var flag24 = false;
var flag25 = false;
var flag26 = false;
var flag27 = false;
var flag28 = false;
var flag29 = false;
var flag30 = false;
var flag31 = false;
var flag32 = false;
var flag33 = false;
var flag34 = false;
var flag35 = false;
var flag36 = false;
var flag37 = false;
var flag38 = false;
var flag39 = false;
var flag40 = false;
var flag41 = false;
var flag42 = false;
var flag43 = false;
var flag44 = false;
var flag45 = false;
var flag46 = false;
var flag47 = false;
var flag48 = false;
var flag49 = false;
var flag50 = false;
var fleetschecked;
var num;

function getCoords() 
{
	var x = document.getElementById("fleetx1").value;
	var y = document.getElementById("fleety1").value;
	var z = document.getElementById("fleetz1").value;
	var c = document.getElementsByName("f_c[1]")[0].value;
	if(x == "" || y == "" || z == "" || c == "")
		return;
	
	//show all 50 fleets (minus the first fleet
	for(var i = 2; i < 51; i++)
	{
		var a = document.getElementById("fleetx" + i);
		if(a != null)
			a.value = x;
	
		var b = document.getElementById("fleety" + i);
		if(b != null)
			b.value = y;
	
		var d = document.getElementById("fleetz" + i);
		if(d != null)
		  	d.value = z;
	
		var e = document.getElementsByName("f_c["+i+"]")[0];
		if(e != null)
		  	e.value = c;    
	}
}

function numChecked()
{
	var num = 0;
	if (flag1)
		num+= document.getElementsByName('f_submit[1]')[0].checked;
	if (flag2)
		num+= document.getElementsByName('f_submit[2]')[0].checked;
	if (flag3)
		num+= document.getElementsByName('f_submit[3]')[0].checked;
	if (flag4)
		num+= document.getElementsByName('f_submit[4]')[0].checked;
	if (flag5)
		num+= document.getElementsByName('f_submit[5]')[0].checked;
	if (flag6)
		num+= document.getElementsByName('f_submit[6]')[0].checked;
	if (flag7)
		num+= document.getElementsByName('f_submit[7]')[0].checked;
	if (flag8)
		num+= document.getElementsByName('f_submit[8]')[0].checked;
	if (flag9)
		num+= document.getElementsByName('f_submit[9]')[0].checked;
	if (flag10)
		num+= document.getElementsByName('f_submit[10]')[0].checked;
	if (flag11)
		num+= document.getElementsByName('f_submit[11]')[0].checked;
	if (flag12)
		num+= document.getElementsByName('f_submit[12]')[0].checked;
	if (flag13)
		num+= document.getElementsByName('f_submit[13]')[0].checked;
	if (flag14)
		num+= document.getElementsByName('f_submit[14]')[0].checked;
	if (flag15)
		num+= document.getElementsByName('f_submit[15]')[0].checked;
	if (flag16)
		num+= document.getElementsByName('f_submit[16]')[0].checked;
	if (flag17)
		num+= document.getElementsByName('f_submit[17]')[0].checked;
	if (flag18)
		num+= document.getElementsByName('f_submit[18]')[0].checked;
	if (flag19)
		num+= document.getElementsByName('f_submit[19]')[0].checked;
	if (flag20)
		num+= document.getElementsByName('f_submit[20]')[0].checked;
	if (flag21)
		num+= document.getElementsByName('f_submit[21]')[0].checked;
	if (flag22)
		num+= document.getElementsByName('f_submit[22]')[0].checked;
	if (flag23)
		num+= document.getElementsByName('f_submit[23]')[0].checked;
	if (flag24)
		num+= document.getElementsByName('f_submit[24]')[0].checked;
	if (flag25)
		num+= document.getElementsByName('f_submit[25]')[0].checked;
	if (flag26)
		num+= document.getElementsByName('f_submit[26]')[0].checked;
	if (flag27)
		num+= document.getElementsByName('f_submit[27]')[0].checked;
	if (flag28)
		num+= document.getElementsByName('f_submit[28]')[0].checked;
	if (flag29)
		num+= document.getElementsByName('f_submit[29]')[0].checked;
	if (flag30)
		num+= document.getElementsByName('f_submit[30]')[0].checked;
	if (flag31)
		num+= document.getElementsByName('f_submit[31]')[0].checked;
	if (flag32)
		num+= document.getElementsByName('f_submit[32]')[0].checked;
	if (flag33)
		num+= document.getElementsByName('f_submit[33]')[0].checked;
	if (flag34)
		num+= document.getElementsByName('f_submit[34]')[0].checked;
	if (flag35)
		num+= document.getElementsByName('f_submit[35]')[0].checked;
	if (flag36)
		num+= document.getElementsByName('f_submit[36]')[0].checked;
	if (flag37)
		num+= document.getElementsByName('f_submit[37]')[0].checked;
	if (flag38)
		num+= document.getElementsByName('f_submit[38]')[0].checked;
	if (flag39)
		num+= document.getElementsByName('f_submit[39]')[0].checked;
	if (flag40)
		num+= document.getElementsByName('f_submit[40]')[0].checked;
	if (flag41)
		num+= document.getElementsByName('f_submit[41]')[0].checked;
	if (flag42)
		num+= document.getElementsByName('f_submit[42]')[0].checked;
	if (flag43)
		num+= document.getElementsByName('f_submit[43]')[0].checked;
	if (flag44)
		num+= document.getElementsByName('f_submit[44]')[0].checked;
	if (flag45)
		num+= document.getElementsByName('f_submit[45]')[0].checked;
	if (flag46)
		num+= document.getElementsByName('f_submit[46]')[0].checked;
	if (flag47)
		num+= document.getElementsByName('f_submit[47]')[0].checked;
	if (flag48)
		num+= document.getElementsByName('f_submit[48]')[0].checked;
	if (flag49)
		num+= document.getElementsByName('f_submit[49]')[0].checked;
	if (flag50)
		num+= document.getElementsByName('f_submit[50]')[0].checked;
	return num;
}

function fleetsChecked()
{

	var num = new Array(0,0,0);
	if (flag1)
		num[0] = document.getElementsByName('f_submit[1]')[0].checked;
	if (flag2)
		num[1] = document.getElementsByName('f_submit[2]')[0].checked;
	if (flag3)
		num[2] = document.getElementsByName('f_submit[3]')[0].checked;
	if (flag4)
		num[3] = document.getElementsByName('f_submit[4]')[0].checked;
	if (flag5)
		num[4] = document.getElementsByName('f_submit[5]')[0].checked;
	if (flag6)
		num[5] = document.getElementsByName('f_submit[6]')[0].checked;
	if (flag7)
		num[6] = document.getElementsByName('f_submit[7]')[0].checked;
	if (flag8)
		num[7] = document.getElementsByName('f_submit[8]')[0].checked;
	if (flag9)
		num[8] = document.getElementsByName('f_submit[9]')[0].checked;
	if (flag10)
		num[9] = document.getElementsByName('f_submit[10]')[0].checked;
	if (flag11)
		num[10] = document.getElementsByName('f_submit[11]')[0].checked;
	if (flag12)
		num[11] = document.getElementsByName('f_submit[12]')[0].checked;
	if (flag13)
		num[12] = document.getElementsByName('f_submit[13]')[0].checked;
	if (flag14)
		num[13] = document.getElementsByName('f_submit[14]')[0].checked;
	if (flag15)
		num[14] = document.getElementsByName('f_submit[15]')[0].checked;
	if (flag16)
		num[15] = document.getElementsByName('f_submit[16]')[0].checked;
	if (flag17)
		num[16] = document.getElementsByName('f_submit[17]')[0].checked;
	if (flag18)
		num[17] = document.getElementsByName('f_submit[18]')[0].checked;
	if (flag19)
		num[18] = document.getElementsByName('f_submit[19]')[0].checked;
	if (flag20)
		num[19] = document.getElementsByName('f_submit[20]')[0].checked;
	if (flag21)
		num[20] = document.getElementsByName('f_submit[21]')[0].checked;
	if (flag22)
		num[21] = document.getElementsByName('f_submit[22]')[0].checked;
	if (flag23)
		num[22] = document.getElementsByName('f_submit[23]')[0].checked;
	if (flag24)
		num[23] = document.getElementsByName('f_submit[24]')[0].checked;
	if (flag25)
		num[24]= document.getElementsByName('f_submit[25]')[0].checked;
	if (flag26)
		num[25]= document.getElementsByName('f_submit[26]')[0].checked;
	if (flag27)
		num[26]= document.getElementsByName('f_submit[27]')[0].checked;
	if (flag28)
		num[27]= document.getElementsByName('f_submit[28]')[0].checked;
	if (flag29)
		num[28]= document.getElementsByName('f_submit[29]')[0].checked;
	if (flag30)
		num[29]= document.getElementsByName('f_submit[30]')[0].checked;
	if (flag31)
		num[30]= document.getElementsByName('f_submit[31]')[0].checked;
	if (flag32)
		num[31]= document.getElementsByName('f_submit[32]')[0].checked;
	if (flag33)
		num[32]= document.getElementsByName('f_submit[33]')[0].checked;
	if (flag34)
		num[33]= document.getElementsByName('f_submit[34]')[0].checked;
	if (flag35)
		num[34]= document.getElementsByName('f_submit[35]')[0].checked;
	if (flag36)
		num[35]= document.getElementsByName('f_submit[36]')[0].checked;
	if (flag37)
		num[36]= document.getElementsByName('f_submit[37]')[0].checked;
	if (flag38)
		num[37]= document.getElementsByName('f_submit[38]')[0].checked;
	if (flag39)
		num[38]= document.getElementsByName('f_submit[39]')[0].checked;
	if (flag40)
		num[39] = document.getElementsByName('f_submit[40]')[0].checked;
	if (flag41)
		num[40] = document.getElementsByName('f_submit[41]')[0].checked;
	if (flag42)
		num[41] = document.getElementsByName('f_submit[42]')[0].checked;
	if (flag43)
		num[42] = document.getElementsByName('f_submit[43]')[0].checked;
	if (flag44)
		num[43] = document.getElementsByName('f_submit[44]')[0].checked;
	if (flag45)
		num[44] = document.getElementsByName('f_submit[45]')[0].checked;
	if (flag46)
		num[45] = document.getElementsByName('f_submit[46]')[0].checked;
	if (flag47)
		num[46] = document.getElementsByName('f_submit[47]')[0].checked;
	if (flag48)
		num[47] = document.getElementsByName('f_submit[48]')[0].checked;
	if (flag49)
		num[48] = document.getElementsByName('f_submit[49]')[0].checked;
	if (flag50)
		num[49] = document.getElementsByName('f_submit[50]')[0].checked;
	return num;
}

function compareFleets(fleet1, fleet2)
{
	for(i=0;i < 4; ++i)
		if(fleet1[i] != fleet2[i])
			return (false);
	return (true)
}

function compareWindows()
{
	num = numChecked();

	if(num < 2)
		return true;
	fleetschecked = fleetsChecked();
	for(i = 0; i < 3;++i)
		for(j=0; j<3; ++j)
		{
			if(i!=j)
				if(fleetschecked[i] && fleetschecked[j])
					if(!compareFleets(unsafeWindow.traveltimes[i],unsafeWindow.traveltimes[j]))
						return(false);
		}
	return true;
}

function submitFleets()
{
	if(confirm("Autocomplete?"))
		getCoords();
	var message = "";
	if(!compareWindows())
		message+= "The fleets weight are not equal\n";
	
	message = message + "Are you sure you want to send the fleets?";
	if(confirm(message))			
		document.getElementsByName('launchform')[0].submit();
}
document.getElementsByName('f_submit[2]')[0]


if(document.getElementsByName('f_submit[1]')[0]) {
	document.getElementsByName('f_submit[1]')[0].type='checkbox';
	flag1=true;
}
if(document.getElementsByName('f_submit[2]')[0]) {
	document.getElementsByName('f_submit[2]')[0].type='checkbox';
	flag2=true;
}
if(document.getElementsByName('f_submit[3]')[0]) {
	document.getElementsByName('f_submit[3]')[0].type='checkbox';
	flag3=true;
}
if(document.getElementsByName('f_submit[4]')[0]) {
	document.getElementsByName('f_submit[4]')[0].type='checkbox';
	flag4=true;
}
if(document.getElementsByName('f_submit[5]')[0]) {
	document.getElementsByName('f_submit[5]')[0].type='checkbox';
	flag5=true;
}
if(document.getElementsByName('f_submit[6]')[0]) {
	document.getElementsByName('f_submit[6]')[0].type='checkbox';
	flag6=true;
}
if(document.getElementsByName('f_submit[7]')[0]) {
	document.getElementsByName('f_submit[7]')[0].type='checkbox';
	flag7=true;
}
if(document.getElementsByName('f_submit[8]')[0]) {
	document.getElementsByName('f_submit[8]')[0].type='checkbox';
	flag8=true;
}
if(document.getElementsByName('f_submit[9]')[0]) {
	document.getElementsByName('f_submit[9]')[0].type='checkbox';
	flag9=true;
}
if(document.getElementsByName('f_submit[10]')[0]) {
	document.getElementsByName('f_submit[10]')[0].type='checkbox';
	flag10=true;
}
if(document.getElementsByName('f_submit[11]')[0]) {
	document.getElementsByName('f_submit[11]')[0].type='checkbox';
	flag11=true;
}
if(document.getElementsByName('f_submit[12]')[0]) {
	document.getElementsByName('f_submit[12]')[0].type='checkbox';
	flag12=true;
}
if(document.getElementsByName('f_submit[13]')[0]) {
	document.getElementsByName('f_submit[13]')[0].type='checkbox';
	flag13=true;
}
if(document.getElementsByName('f_submit[14]')[0]) {
	document.getElementsByName('f_submit[14]')[0].type='checkbox';
	flag14=true;
}
if(document.getElementsByName('f_submit[15]')[0]) {
	document.getElementsByName('f_submit[15]')[0].type='checkbox';
	flag15=true;
}
if(document.getElementsByName('f_submit[16]')[0]) {
	document.getElementsByName('f_submit[16]')[0].type='checkbox';
	flag16=true;
}
if(document.getElementsByName('f_submit[17]')[0]) {
	document.getElementsByName('f_submit[17]')[0].type='checkbox';
	flag17=true;
}
if(document.getElementsByName('f_submit[18]')[0]) {
	document.getElementsByName('f_submit[18]')[0].type='checkbox';
	flag18=true;
}
if(document.getElementsByName('f_submit[19]')[0]) {
	document.getElementsByName('f_submit[19]')[0].type='checkbox';
	flag19=true;
}
if(document.getElementsByName('f_submit[20]')[0]) {
	document.getElementsByName('f_submit[20]')[0].type='checkbox';
	flag20=true;
}
if(document.getElementsByName('f_submit[21]')[0]) {
	document.getElementsByName('f_submit[21]')[0].type='checkbox';
	flag21=true;
}
if(document.getElementsByName('f_submit[22]')[0]) {
	document.getElementsByName('f_submit[22]')[0].type='checkbox';
	flag22=true;
}
if(document.getElementsByName('f_submit[23]')[0]) {
	document.getElementsByName('f_submit[23]')[0].type='checkbox';
	flag23=true;
}
if(document.getElementsByName('f_submit[24]')[0]) {
	document.getElementsByName('f_submit[24]')[0].type='checkbox';
	flag24=true;
}
if(document.getElementsByName('f_submit[25]')[0]) {
	document.getElementsByName('f_submit[25]')[0].type='checkbox';
	flag25=true;
}
if(document.getElementsByName('f_submit[26]')[0]) {
	document.getElementsByName('f_submit[26]')[0].type='checkbox';
	flag26=true;
}
if(document.getElementsByName('f_submit[27]')[0]) {
	document.getElementsByName('f_submit[27]')[0].type='checkbox';
	flag27=true;
}
if(document.getElementsByName('f_submit[28]')[0]) {
	document.getElementsByName('f_submit[28]')[0].type='checkbox';
	flag28=true;
}
if(document.getElementsByName('f_submit[29]')[0]) {
	document.getElementsByName('f_submit[29]')[0].type='checkbox';
	flag29=true;
}
if(document.getElementsByName('f_submit[30]')[0]) {
	document.getElementsByName('f_submit[30]')[0].type='checkbox';
	flag30=true;
}
if(document.getElementsByName('f_submit[31]')[0]) {
	document.getElementsByName('f_submit[31]')[0].type='checkbox';
	flag31=true;
}
if(document.getElementsByName('f_submit[32]')[0]) {
	document.getElementsByName('f_submit[32]')[0].type='checkbox';
	flag32=true;
}
if(document.getElementsByName('f_submit[33]')[0]) {
	document.getElementsByName('f_submit[33]')[0].type='checkbox';
	flag33=true;
}
if(document.getElementsByName('f_submit[34]')[0]) {
	document.getElementsByName('f_submit[34]')[0].type='checkbox';
	flag34=true;
}
if(document.getElementsByName('f_submit[35]')[0]) {
	document.getElementsByName('f_submit[35]')[0].type='checkbox';
	flag35=true;
}
if(document.getElementsByName('f_submit[36]')[0]) {
	document.getElementsByName('f_submit[36]')[0].type='checkbox';
	flag36=true;
}
if(document.getElementsByName('f_submit[37]')[0]) {
	document.getElementsByName('f_submit[37]')[0].type='checkbox';
	flag37=true;
}
if(document.getElementsByName('f_submit[38]')[0]) {
	document.getElementsByName('f_submit[38]')[0].type='checkbox';
	flag38=true;
}
if(document.getElementsByName('f_submit[39]')[0]) {
	document.getElementsByName('f_submit[39]')[0].type='checkbox';
	flag39=true;
}
if(document.getElementsByName('f_submit[40]')[0]) {
	document.getElementsByName('f_submit[40]')[0].type='checkbox';
	flag40=true;
}
if(document.getElementsByName('f_submit[41]')[0]) {
	document.getElementsByName('f_submit[41]')[0].type='checkbox';
	flag41=true;
}
if(document.getElementsByName('f_submit[42]')[0]) {
	document.getElementsByName('f_submit[42]')[0].type='checkbox';
	flag42=true;
}
if(document.getElementsByName('f_submit[43]')[0]) {
	document.getElementsByName('f_submit[43]')[0].type='checkbox';
	flag43=true;
}
if(document.getElementsByName('f_submit[44]')[0]) {
	document.getElementsByName('f_submit[44]')[0].type='checkbox';
	flag44=true;
}
if(document.getElementsByName('f_submit[45]')[0]) {
	document.getElementsByName('f_submit[45]')[0].type='checkbox';
	flag45=true;
}
if(document.getElementsByName('f_submit[46]')[0]) {
	document.getElementsByName('f_submit[46]')[0].type='checkbox';
	flag46=true;
}
if(document.getElementsByName('f_submit[47]')[0]) {
	document.getElementsByName('f_submit[47]')[0].type='checkbox';
	flag47=true;
}
if(document.getElementsByName('f_submit[48]')[0]) {
	document.getElementsByName('f_submit[48]')[0].type='checkbox';
	flag48=true;
}
if(document.getElementsByName('f_submit[49]')[0]) {
	document.getElementsByName('f_submit[49]')[0].type='checkbox';
	flag49=true;
}
if(document.getElementsByName('f_submit[50]')[0]) {
	document.getElementsByName('f_submit[50]')[0].type='checkbox';
	flag50=true;
}

var Element = document.getElementsByName('launchform')[0].parentNode;

if(Element && (flag1 || flag2 || flag3 || flag4 || flag5 || flag6 || flag7 || flag8 || flag9 || flag10 || flag11 || flag12 || flag13 || flag14 || flag15 || flag16 || flag17 || flag18 || flag19 || flag20 || flag21 || flag22 || flag23 || flag24 || flag25 || flag26 || flag27 || flag28 || flag29 || flag30 || flag31 || flag32 || flag33 || flag34 || flag35 || flag36 || flag37 || flag38 || flag39 || flag40 || flag41 || flag42 || flag43 || flag44 || flag45 || flag46 || flag47 || flag48 || flag49 || flag50))
{
	var button = document.createElement('input');
	button.type = "button";
	button.style.color = "#FFFF00";
	button.value = " **** Launch Fleets ***** ";
	button.addEventListener('click', submitFleets,true);	
	Element.insertBefore(button, Element.lastChild);
	
}
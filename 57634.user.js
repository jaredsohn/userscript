// Ikariam Kalkulator Tawerny
// version 0.9
// 2009-09-12
// Copyright (c) 2009, Parsiuk
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
// select "Test script", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ikariam Kalkulator Tawerny
// @namespace     http://parsiuk.net/
// @description   Skrypt podmienia liste wyboru w tawernie podpowiadajac na jak dlugo wystarczy wina przy okreslonym zuzyciu.
// @include       http://*.ikariam.pl/*
// ==/UserScript==

var tempOption;
var WineField = document.getElementById('value_wine');
var WineCurrent = document.getElementById('sliderbg_wine');
var WineCurrentUsage;

WineCurrentUsage = returnUsage(WineCurrent.title);

var tWineField = WineField.innerHTML.replace(/[^0-9]+/g,'');
var hTimer = parseInt(tWineField) / WineCurrentUsage;

var allOptions, thisOption;
allOptions = document.getElementsByTagName('option');
for (var i = 0; i < allOptions.length; i++)
{
    thisOption = allOptions[i];
    hTimer = parseInt(tWineField)/returnUsage(i + '');
    thisOption.innerHTML = returnUsage(i + '') + "/h (Wystarczy na " + hTimer.toFixed(2) + " godzin)";
}

function returnUsage(lvl)
{
	switch (lvl)
	{
		case "0":
			return(0);
			break;
		case "1":
			return(4);
			break;
		case "2":
			return(8);
			break;
		case "3":
			return(13);
			break;
		case "4":
			return(18);
			break;
		case "5":
			return(24);
			break;
		case "6":
			return(30);
			break;
		case "7":
			return(37);
			break;
		case "8":
			return(44);
			break;
		case "9":
			return(51);
			break;
		case "10":
			return(60);
			break;
		case "11":
			return(68);
			break;
		case "12":
			return(78);
			break;
	
		case "13":
			return(88);
			break;
		case "14":
			return(99);
			break;
		case "15":
			return(110);
			break;
		case "16":
			return(122);
			break;
		case "17":
			return(136);
			break;
		case "18":
			return(150);
			break;
		case "19":
			return(165);
			break;
		case "20":
			return(180);
			break;
		case "21":
			return(197);
			break;
		case "22":
			return(216);
			break;
		case "23":
			return(235);
			break;
		case "24":
			return(255);
			break;
	}	
}

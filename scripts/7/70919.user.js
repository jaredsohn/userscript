// Automatic Bangla Phontic Web Script
// Author : Shafiul Azam
// Powered by PROGmaatic Developer Network, All rights reserved
// http://progmaatic.com
// version: See below

// Major Update Log


// ==UserScript==
// @name          Automatic Bangla Phonetic
// @namespace     http://muktosource.com/giga/samu
// @description   Automatically makes all Text input & text areas Bangla phonetic compatible. use Ctrl + m to switch between Bangla & English
// @include       *
// @exclude 	  http://www.somewhereinblog.net/*
// ==/UserScript==

// abp_version = "1.0";

// Enought, start work
	// Make all txt inputs phonetic enabled
	var all_txt_inp = document.getElementsByTagName('input');
	var curTxtInpId;
	var i, totConverted = 0;
	for(i=0; i< all_txt_inp.length; i++){
		if(all_txt_inp[i].type == "text"){
			var x = all_txt_inp[i];
			// get or set id
			curTxtInpId = x.id;
			if(curTxtInpId == ""){
				x.id = curTxtInpId = "AutoBnPhId" + i;
			}
			// Make phonetic enabled
			x.setAttribute("onmouseover", "makePhoneticEditor('" + curTxtInpId + "');");
			//x.setAttribute("title", x.id);
			//totConverted++;
		}
	}
	// now manage the Text Areas
	all_txt_inp = document.getElementsByTagName('textarea');
	for(i=0; i< all_txt_inp.length; i++){
			var x = all_txt_inp[i];
			// get or set id
			curTxtInpId = x.id;
			if(curTxtInpId == ""){
				x.id = curTxtInpId = "AutBnTxtId" + i;
			}
			// Make phonetic enabled
			x.setAttribute("onmouseover", "makePhoneticEditor('" + curTxtInpId + "');");
			//x.setAttribute("title", x.id);
			//totConverted++;
	}
	// include the js
	var ourNewJs = document.createElement("script");
	ourNewJs.src = "http://giga.muktosource.com/p.js";
	ourNewJs.type = 'text/javascript'; 
	var headArr = document.getElementsByTagName('head');
	headArr[0].appendChild(ourNewJs);
	// Done
	//document.title = "b1.7 " + totConverted + " " + document.title;

// Copyright (c) Shafiul Azam | shafiul@progmaatic.com
// The script can be modified for personal use only. 
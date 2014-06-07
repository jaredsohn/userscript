// ==UserScript==
// @name           Inventar 2
// @namespace      http://www.erepublik.com/en/referrer/ivicaSR
// @description    Inventar 2
// @version        0.21
// @include        http://ww*.erepublik.com/*
// ==/UserScript==




var liTags = document.getElementById('owninv').getElementsByTagName('li');

for (var i=0;i<liTags.length;i++) {
	var liTagWidth = liTags[i].getElementsByTagName('span')[0].innerHTML;
	var botSplit1 = liTagWidth.split("width: ");
	var botSplit2 = botSplit1[1].split("%");    //u botSplit2[0] se cuva vrednost pokazivaca... 20-40-60-80-100
	
	var pictureTemp = liTags[i].getElementsByTagName('img');
	
	if (pictureTemp[0].src.match('/images/parts/icon_industry_weapon.gif')) {
		switch(botSplit2[0]) {
			case "20": pictureTemp[0].src = "http://img227.imageshack.us/img227/604/q1puca.gif";break;
			case "40": pictureTemp[0].src = "http://img260.imageshack.us/img260/761/q2puca.gif";break;
			case "60": pictureTemp[0].src = "http://img260.imageshack.us/img260/305/q3puca.gif";break;
			case "80": pictureTemp[0].src = "http://img221.imageshack.us/img221/8285/q4puca.gif";break;
			case "100": pictureTemp[0].src = "http://img144.imageshack.us/img144/9760/q5puca.gif";break;
		}
		
	}
	if (pictureTemp[0].src.match('/images/parts/icon_industry_food.gif')) {
		switch(botSplit2[0]) {
			case "20": pictureTemp[0].src = "http://img87.imageshack.us/img87/165/q1hrana.gif";break;
			case "40": pictureTemp[0].src = "http://img440.imageshack.us/img440/4626/q2hrana.gif";break;
			case "60": pictureTemp[0].src = "http://img260.imageshack.us/img260/5697/q3hrana.gif";break;
			case "80": pictureTemp[0].src = "http://img84.imageshack.us/img84/295/q4hrana.gif";break;
			case "100": pictureTemp[0].src = "http://img87.imageshack.us/img87/1192/q5hrana.gif";break;
		}
		//pictureTemp[0].src = "http://img515.imageshack.us/img515/137/producttangerine55x55.gif";
	}
	if (pictureTemp[0].src.match('/images/parts/icon_industry_gift.gif')) {
		switch(botSplit2[0]) {
			case "20": pictureTemp[0].src = "http://img402.imageshack.us/img402/3351/heart55x55.gif";break;
			case "40": pictureTemp[0].src = "http://img402.imageshack.us/img402/3351/heart55x55.gif";break;
			case "60": pictureTemp[0].src = "http://img402.imageshack.us/img402/3351/heart55x55.gif";break;
			case "80": pictureTemp[0].src = "http://img402.imageshack.us/img402/3351/heart55x55.gif";break;
			case "100": pictureTemp[0].src = "http://img402.imageshack.us/img402/3351/heart55x55.gif";break;
		}
		//pictureTemp[0].src = "http://img402.imageshack.us/img402/3351/heart55x55.gif";
	}
	if (pictureTemp[0].src.match('/images/parts/icon_industry_house.gif')) {
		switch(botSplit2[0]) {
			case "20": pictureTemp[0].src = "http://img221.imageshack.us/img221/6961/q1kuca.gif";break;
			case "40": pictureTemp[0].src = "http://img87.imageshack.us/img87/4687/q2kuca.gif";break;
			case "60": pictureTemp[0].src = "http://img440.imageshack.us/img440/2342/q3kuca.gif";break;
			case "80": pictureTemp[0].src = "http://img227.imageshack.us/img227/3770/q4kuca.gif";break;
			case "100": pictureTemp[0].src = "http://img221.imageshack.us/img221/1296/q5kuca.gif";break;
		}
		//pictureTemp[0].src = "http://img208.imageshack.us/img208/4332/hawaiibeachsmallb.gif";
	}
	if (pictureTemp[0].src.match('/images/parts/icon_industry_movingtickets.gif')) {
		switch(botSplit2[0]) {
			case "20": pictureTemp[0].src = "http://img218.imageshack.us/img218/9701/shipinocean55x55.gif";break;
			case "40": pictureTemp[0].src = "http://img218.imageshack.us/img218/9701/shipinocean55x55.gif";break;
			case "60": pictureTemp[0].src = "http://img218.imageshack.us/img218/9701/shipinocean55x55.gif";break;
			case "80": pictureTemp[0].src = "http://img218.imageshack.us/img218/9701/shipinocean55x55.gif";break;
			case "100": pictureTemp[0].src = "http://img218.imageshack.us/img218/9701/shipinocean55x55.gif";break;
		}
		//pictureTemp[0].src = "http://img218.imageshack.us/img218/9701/shipinocean55x55.gif";
	}

	
}




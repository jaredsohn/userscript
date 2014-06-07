// ==UserScript==
// @name           Slanje poruka
// @namespace      http://www.erepublik.com/en/referrer/ivicaSR
// @description    Slanje poruka
// @version        0.21
// @include        http://ww*.erepublik.com/*
// ==/UserScript==

//var thisImg 
//var backImg = document.evaluate("//img[contains(@src, 'icon_industry_weapon.gif')",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

//for (var i=0;i<backImg.snapshotLength;i++) { 
//  var thisImg = backImg.snapshotItem(i); 
//  var src = thisImg.src; 
//  var srcMatch = src.match('/images/parts/icon_industry_weapon.gif'); 
//  if (srcMatch != null) { 
//    thisImg.src = 'http://img137.imageshack.us/img137/1354/bananag.gif';
//  } 
//}

var allImgs;

//var botProfileName = document.getElementById('owninv').getElementsByTagName('li')[0].getElementsByTagName('span')[0].innerHTML;

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




//document.getElementById('profileavatar').innerHTML = botSplit2[0];


/*allImgs = document.getElementsByTagName('img');

for (var i = 0; i < allImgs.length; i++)  {
	if (allImgs[i].src.match('/images/parts/icon_industry_weapon.gif')) {
		allImgs[i].src = "http://www.t2-studio.com/erep/ikonice/banana55x55.gif";
	}
	if (allImgs[i].src.match('/images/parts/icon_industry_food.gif')) {
		allImgs[i].src = "http://img515.imageshack.us/img515/137/producttangerine55x55.gif";
	}
	if (allImgs[i].src.match('/images/parts/icon_industry_gift.gif')) {
		allImgs[i].src = "http://img402.imageshack.us/img402/3351/heart55x55.gif";
	}
	if (allImgs[i].src.match('/images/parts/icon_industry_house.gif')) {
		allImgs[i].src = "http://img208.imageshack.us/img208/4332/hawaiibeachsmallb.gif";
	}
	if (allImgs[i].src.match('/images/parts/icon_industry_movingtickets.gif')) {
		allImgs[i].src = "http://img218.imageshack.us/img218/9701/shipinocean55x55.gif";
	}
	
	//raw
	if (allImgs[i].src.match('/images/parts/icon_industry_grain.gif')) {
		allImgs[i].src = "http://img192.imageshack.us/img192/2630/psenica55x55.gif";
	}
	if (allImgs[i].src.match('/images/parts/icon_industry_diamonds.gif')) {
		allImgs[i].src = "http://img208.imageshack.us/img208/7238/dijamanti55x55.gif";
	}
	if (allImgs[i].src.match('/images/parts/icon_industry_iron.gif')) {
		allImgs[i].src = "http://img710.imageshack.us/img710/4293/iron55x55.gif";
	}
	if (allImgs[i].src.match('/images/parts/icon_industry_oil.gif')) {
		allImgs[i].src = "http://img707.imageshack.us/img707/3127/oil55x55.gif";
	}
	if (allImgs[i].src.match('/images/parts/icon_industry_wood.gif')) {
		allImgs[i].src = "http://img709.imageshack.us/img709/6066/drvo55x55.gif";
	}
	//hosp def
	if (allImgs[i].src.match('/images/parts/icon_industry_hospital.gif')) {
		allImgs[i].src = "http://img10.imageshack.us/img10/5079/sexynurse55x55.gif";
	}
	if (allImgs[i].src.match('/images/parts/icon_industry_defensesystem.gif')) {
		allImgs[i].src = "http://img10.imageshack.us/img10/9690/bodljikava55x55.gif";
	}
}
*/

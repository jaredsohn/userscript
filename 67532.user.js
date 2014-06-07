// ==UserScript==
// @name           Inventar
// @namespace      http://www.erepublik.com/en/referrer/ivicaSR
// @description    Inventar
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
allImgs = document.getElementsByTagName('img');

for (var i = 0; i < allImgs.length; i++)  {
	if (allImgs[i].src.match('/images/parts/icon_industry_weapon.gif')) {
		allImgs[i].src = "http://img210.imageshack.us/img210/3504/banana55x55.gif";
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


// ==UserScript==
// @name           monetary market
// @namespace      http://www.erepublik.com/en/referrer/ivicaSR
// @description    monetary market
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

//var allImgs;
//allImgs = document.getElementsByTagName('img');

//for (var i = 0; i < allImgs.length; i++)  {
//	if (allImgs[i].src.match('/images/parts/icon_industry_weapon.gif')) {
//		allImgs[i].src = "http://www.t2-studio.com/erep/ikonice/banana55x55.gif";
//	}
	
//}

//Sun Mar 07 2010 13:13:04 GMT+0100 (Central Europe Standard Time)

ourDate = new Date();

var dan = ourDate.getDate();
var mesec = ourDate.getMonth()+1;
var sat = ourDate.getHours();
var minuti = ourDate.getMinutes();

if (mesec<10) mesec = "0" + mesec;

if (minuti<10) minuti = "0" + minuti;

if (sat<10) {
	sat = "0."+sat;
} else {
	sat = ""+sat;
	var sati1 = sat.charAt(0);
	var sati2 = sat.charAt(1);
	sat = sati1 + "." + sati2;
}

var vreme = dan + "" + mesec + "" + sat + "" + minuti;

document.getElementsByName('form_amount')[0].value="0.01";
document.getElementsByName('form_exchange_rate')[0].value=vreme;

// ==UserScript==
// @name        Hiszilla Neuanlage Zielversion
// @namespace   his
// @description Bei Hiszilla-Tickets die Zielversion umsortieren und den aktuellen Branch hervorheben 
// @include     https://hiszilla.his.de/hiszilla/*
// @version     1.1
// ==/UserScript==

var lbList = document.getElementsByName("target_milestone");

var date = new Date();
var selected = "";

for( var k=0; k < lbList.length; k++ ) {
	var lb = lbList[k];
	arrTexts = new Array();	
	var x = lb.length-1;
	for(i=1; i<lb.length; i++)  {
	  arrTexts[x] = lb.options[i].text;	  
	  x--;
	  if (lb.options[i].selected == true) {
		selected = lb.options[i].text;
	  }
	}
	
	var aktuellerBranch = null;
	for(i=1; i<arrTexts.length; i++)  {
	  var text = arrTexts[i];
	  if (text == selected) {
		lb.options[i].selected = true;
	  }
	  if (isAktuellerMonat(text, date) == true) {
		text = text + " (!)";
		lb.options[i].style.color = "#1A7BBD";		
	  }
	  lb.options[i].text = text;	  
	  lb.options[i].value = arrTexts[i];
	  
	  if (isAktuellerMonat(text, date) == true) {
		aktuellerBranch = lb.options[i];
	  }
	}
	
	
}

function isAktuellerMonat(text,date) {
	//3.0.8 (Mai 2012)
	var x = (text.indexOf(".0."+(date.getMonth() + 4)) != -1) && (text.indexOf((date.getYear() + 1900)) != -1);	
	//alert(text + ", " + " m: " + (".0."+(date.getMonth() + 1)) + ",  " + (date.getYear() + 1900) + " x: " + x + (text.indexOf(".0."+(date.getMonth() + 1)) != -1) + (text.indexOf((date.getYear() + 1900)) != -1));
	return x;
}



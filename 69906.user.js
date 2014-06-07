// ==UserScript==
// @name           TheSource Percentage Calculator
// @namespace      http://www.thesource.ca/*
// @include        http://www.thesource.ca
// ==/UserScript==



var alltds = document.getElementsByTagName("span");
var price;
var original;
for (var i=0; i<alltds.length; i++) {

    if (alltds[i].className=="ProductPrice") {
        var mytd = alltds[i];   	    
    	  mytd = mytd.innerHTML.replace("$", "");
    	  mytd = mytd.replace(",", "");
   	    price = parseFloat(mytd);
   	    alltds[i].innerHTML = "<font color='#C0C0C0'>" + alltds[i].innerHTML + "</font>";
    } 
    if (alltds[i].className=="MenuText" && alltds[i].innerHTML.indexOf("orig.") != -1) {
        var mytd = alltds[i];
        mytd = mytd.innerHTML.replace("orig. $", "");
   	    mytd = mytd.replace(",", "");
   	    original = parseFloat(mytd);
   	    var percentage = parseInt((1-(price/original))*100).toString();
   	    var color = "#000000";
   	    if (percentage.substring(0,1) == "0" || percentage.substring(0,1) == "1" || percentage.substring(0,1) == "2" || percentage.substring(0,1) == "3" || percentage.substring(0,1) == "4")
   	    	color = "#D8D8D8";
   	    if (percentage.substring(0,1) == "5" || percentage.substring(0,1) == "6" || percentage.substring(0,1) == "7" )
   	    	color = "#C0C0C0";

   	    alltds[i].innerHTML = alltds[i].innerHTML + "\n <h2><font color='"+color+"' style='font-weight:5'>" + percentage + "%</h2>";   	    
    }
  
}



var alltds1 = document.getElementsByTagName("img");
for (var i=0; i<alltds1.length; i++) {
 
    if (alltds1[i].src.indexOf("price") != -1) {
        var mytd = alltds1[i];
        mytd.src = null;
        mytd.height =0;
        mytd.width =0;
    } 
}

var alltds2 = document.getElementsByTagName("td");
for (var i=0; i<alltds2.length; i++) {
 
    if (alltds2[i].bgColor.indexOf("71920") != -1) {
        alltds2[i].bgColor = "white";
    } 
	  if (alltds2[i].vAlign == "middle" && alltds2[i].align == "center")
	  {
	  	alltds2[i].style.backgroundImage = 'url()';
	  }
}
// ==UserScript==
// @name           DX
// @namespace      ru.ryotsuke
// @description    Шаблон для описания DX фигни
// @include        http://www.dealextreme.com/details.dx/*
// @include        http://dealextreme.com/details.dx/*
// ==/UserScript==
var header = document.getElementById("_ctl0_content_HeadLine1").innerHTML;

var price = document.getElementById("_ctl0_content_Price").innerHTML;

var b=true;
var images = "";
var i;
for(i=0; b; i++) {
	
	if (document.getElementById("imgGallery"+i)==null) {
		b = false;
	} else {
		
		images+="<img src='"+document.getElementById("imgGallery"+i).src+"'/>";
	}
}

var bigImage = document.getElementById("Table3").getElementsByTagName("img")[0].src;
var s=""+window.location;
var SKU=s.substring(s.lastIndexOf(".")+1);

var newdiv = document.createElement('div');
newdiv.setAttribute('id',"dx");


var d1 = "<textarea style='font-family: arial; font-size: 9px; width: 100%; height: 100px;'><b>"+header+" "+price+" SKU "+SKU+"</b>\n<br><a href='"+window.location+"'>"+images+"</a></textarea></br>\n";
var d2 = ""+header+"</br>\n"+price+"</br>\n"+s+"</br>\n"+bigImage;



document.getElementById("tabPageOverview").innerHTML=document.getElementById("tabPageOverview").innerHTML+"<div>"+d1+d2+"</div>";









///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
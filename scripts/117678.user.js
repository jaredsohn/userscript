// ==UserScript==
// @name           ht-comp
// @namespace      xpert.ru
// @include        http://*xpert.ru/* 
// @include        http://*profitcomp.ru/*
// ==/UserScript==

var img = document.evaluate("//img[contains(@src, 'phone.gif')]",document,null,9,null).singleNodeValue;
if (img){img.src = "http://ht-comp.ru/images/logo.png"};

var img_logo = document.evaluate("//img[contains(@src, 'logo.gif')]",document,null,9,null).singleNodeValue;
if (img_logo!= null){img_logo.parentNode.removeChild(img_logo);};

var img_p1 = document.evaluate("//img[contains(@src, 'tmpl13_1_left_img.gif')]",document,null,9,null).singleNodeValue;
if (img_p1!= null){
	but="<div style='position: absolute; height:220px; width:100%; background-color:white;' name='kur' id='kur'>"+
	"<img style='margin-left:23%; margin-top:20px;' src='http://ht-comp.ru/images/logo.png'><br/><br/>"+
	"<span style='margin-left:35%; font-size:40px; font-weight:bold; color:red;'>502-24-52, 973-97-17</span>"+
	"</div>";
	var kur = document.createElement("div");
	kur.innerHTML = but;
	document.body.insertBefore(kur, document.body.firstChild);

};

//alert ('okok');
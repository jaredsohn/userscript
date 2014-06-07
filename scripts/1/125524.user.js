// ==UserScript==
// @name	KHVFilterEvade
// @author	Slaughtermatic
// @include	http://www.kh-vids.net/*
//@match http://www.kh-vids.net/*

// @version	1
// ==/UserScript==
var form;
var btn;
var box;
if(document.forms.namedItem("vbform")!= null)
{   form = document.forms.namedItem("vbform");
    if(form.elements.namedItem("vB_Editor_001_save") != null)
    {
    btn = form.elements.namedItem("vB_Editor_001_save");
    box = form.elements.namedItem("vB_Editor_001_textarea");
    }
    else
    {btn = form.elements.namedItem("qr_submit");
     box = form.elements.namedItem("vB_Editor_QR_textarea");
     }
}

else
{
form = document.forms.namedItem("quick_reply");
btn = form.elements.namedItem("qr_submit");
box = form.elements.namedItem("vB_Editor_QR_textarea");
}
function herp(){

while(box.value.toLowerCase().indexOf("fuck") != -1)
{if(box.value.indexOf("fuck") != -1)
box.value = box.value.replace("fuck", "fuсk");
if(box.value.indexOf("Fuck") != -1)
box.value = box.value.replace("Fuck", "Fuсk");
if(box.value.indexOf("FUCK") != -1)
box.value = box.value.replace("FUCK", "FUСK");}

while(box.value.toLowerCase().indexOf("shit") != -1)
{
if(box.value.indexOf("shit") != -1)
box.value = box.value.replace("shit", "shіt");
if(box.value.indexOf("Shit") != -1)
box.value = box.value.replace("Shit", "Shіt");
if(box.value.indexOf("SHIT") != -1)
box.value = box.value.replace("SHIT", "SHІT");}

while(box.value.toLowerCase().indexOf("cunt") != -1)
{if(box.value.indexOf("cunt") != -1)
box.value = box.value.replace("cunt", "сunt");
if(box.value.indexOf("Cunt") != -1)
box.value = box.value.replace("Cunt", "Сunt");
if(box.value.indexOf("CUNT") != -1)
box.value = box.value.replace("CUNT", "СUNT");}

while(box.value.toLowerCase().indexOf("asshole") != -1)
{if(box.value.indexOf("asshole") != -1)
box.value = box.value.replace("asshole", "аsshole");
if(box.value.indexOf("Asshole") != -1)
box.value = box.value.replace("Asshole", "Аsshole");
if(box.value.indexOf("ASSHOLE") != -1)
box.value = box.value.replace("ASSHOLE", "АSSHOLE");}

while(box.value.toLowerCase().indexOf("bastard") != -1)
{if(box.value.indexOf("bastard") != -1)
box.value = box.value.replace("bastard", "bаstard");
if(box.value.indexOf("Bastard") != -1)
box.value = box.value.replace("Bastard", "Вastard");
if(box.value.indexOf("BASTARD") != -1)
box.value = box.value.replace("BASTARD", "ВASTARD");}

clickedelm = this.value;
}
btn.addEventListener("click", herp, true);


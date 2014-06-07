// ==UserScript==
// @name	KHV Autocolor
// @author	Slaughtermatic
// @include	http://www.kh-vids.net/*
//@match http://www.kh-vids.net/*

// @version	1
// ==/UserScript==
/*
var newbtn = document.write("<input type='button' value='Format Post' onClick='herp();' />");
var defbtn = document.getElementById("qr_submit");
var parentBtnDiv = defbtn.parentNode;
parentBtnDiv.insertBefore(newbtn, defbtn);
*/
$(document).ready(function(){
var box = $("#ctrl_message")[0];
var btn = $(".button.primary")[0];
function herp(){
 box.value = box.value.replace(/,/g , "[color=#ff8c00],[/color]");
 box.value = box.value.replace(/\./g , "[color=#ff8c00].[/color]");
 box.value = box.value.replace(/\?/g, "[color=#ff8c00]?[/color]");
 box.value = box.value.replace(/!/g, "[color=#ff8c00]![/color]");
 box.value = box.value.replace(/@/g, "[color=#ff8c00]@[/color]");
 box.value = box.value.replace(/\$/g, "[color=#ff8c00]$[/color]");
 box.value = box.value.replace(/%/g, "[color=#ff8c00]%[/color]");
 box.value = box.value.replace(/\^/g, "[color=#ff8c00]^[/color]");
 box.value = box.value.replace(/&/g, "[color=#ff8c00]&[/color]");
 box.value = box.value.replace(/\*/g, "[color=#ff8c00]*[/color]");
 box.value = box.value.replace(/\(/g, "[color=#ff8c00]([/color]");
 box.value = box.value.replace(/\)/g, "[color=#ff8c00])[/color]");
 box.value = box.value.replace(/-/g, "[color=#ff8c00]-[/color]");
 box.value = box.value.replace(/_/g, "[color=#ff8c00]_[/color]");
 box.value = box.value.replace(/\+/g, "[color=#ff8c00]+[/color]");
 box.value = box.value.replace(/:/g, "[color=#ff8c00]:[/color]");
 box.value = box.value.replace(/"/g, "[color=#ff8c00]\"[/color]");
 box.value = box.value.replace(/'/g, "[color=#ff8c00]'[/color]");
 box.value = box.value.replace(/</g, "[color=#ff8c00]<[/color]");
 box.value = box.value.replace(/>/g, "[color=#ff8c00]>[/color]");
box.value = ("[color=#4169e1]" + box.value + "[/color]");

}
btn.addEventListener("click", herp, true);});
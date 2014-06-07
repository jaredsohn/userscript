// ==UserScript==
// @name           SMS flooder
// @namespace      supriya
// @include        http://freesms.cloudapp.net/*
// ==/UserScript==

// Edit these!
var no="ur number "; // Number to flood
var msg="u rock :P"; // Message to send

// Dont edit below :P
var v=document.getElementById("verify");
document.getElementById("phone_number").value=no;
document.getElementById("message").value=msg;
v.focus();
v.value="";
v.focus();
v.setAttribute("onkeyup","javascript:if(document.getElementById('verify').value.length==4){__doPostBack('submit_btn','')}voiid(0)");
-- 
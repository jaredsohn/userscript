// ==UserScript==
// @name SOPAVision
// @namespace sopavision
// @version 1
// @include http://*
// @description Lets you view the internet as it will be if SOPA is passed.
// @copyright 2011 - Yogurt
// ==/UserScript==
var rand = Math.floor(Math.random()*6);
console.log(rand);
if(rand == 1){
	var body = document.getElementsByTagName("body")[0];
	var head = document.getElementsByTagName("head")[0];
	for(var i = 0; i < body.attributes.length; i++){
		body.removeAttribute(body.attributes[i].name);
	}
	head.innerHTML = "<title>Domain siezed under SOPA</title>";
	body.setAttribute("style", "text-align: center; padding-top:200px; font-weight: bold; font-size: 50px;");
	body.innerHTML = "THIS DOMAIN HAS BEEN SEIZED BY THE UNITED STATES GOVERNMENT UNDER THE STOP ONLINE PIRACY ACT.<br/> <a href='http://americancensorship.org/'>Please protest this bill.</a>";
}
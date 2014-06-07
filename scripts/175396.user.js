// ==UserScript==
// @name       	ChurButton
// @namespace  	http://www/joshlowry.com/
// @version    	1.0
// @description	Kiwifies the Facebook Like button
// @match		http://www.facebook.com/
// @match		http://www.facebook.com/*
// @copyright	2013 Josh Lowry
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

window.onload = function() {
	var likeButton = document.getElementById("timelineHeadlineLikeButton").getElementsByTagName("input");
	likeButton[0].value = "Chur";
	
	var likeIcon = document.getElementById("timelineHeadlineLikeButton").getElementsByTagName("i");
	var attr = document.createAttribute('style');
	attr.nodeValue = "background-image:url('http://iforce.co.nz/i/y3blh3zj.g3n.png');background-position:0px;width:14px;";
	likeIcon[0].setAttributeNode(attr);	
}
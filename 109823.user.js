// ==UserScript==
// @name		Yah's LinkCheck Helper
// @include		http://*.thecavernforum.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// version		0.021 10 Aug 2011
// ==/UserScript==

// Purpose: Tweak the cavernforum look and feel.

// Code
function start(){		
	//Find the correct location to insert the button
	var ul = $("#member_alpha .active, #forum_table .maintitle");
	
	//alert(ul.html);
	
	ul.html(ul.html() + "&nbsp;&nbsp;<button id='btn_open_tabs'>Open Topics in Tabs</button>");
	var btn_open_tabs = document.getElementById("btn_open_tabs");
	btn_open_tabs.addEventListener("click", open_tabs, false);
	
}
	
function open_tabs(){
	//alert("Opening tabs.");
	var count = 1
	//$('a[href*="\?showtopic="][title="View result"]').each(function(){
	$('a[title="View result"],a[title*="View topic"]').each(function(){
		//if (count < 5){
			window.open($(this).attr("href"), '_blank');
			
			count = count + 1;
		//}
	})
}

$(document).ready(function(){
	start();
 });
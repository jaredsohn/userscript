// ==UserScript==
// @name        Anandmaratha appended
// @namespace   None
// @include     http://www.anandmaratha.com/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.js
// ==/UserScript==
$(document).ready(function(){

	$(".text_list2").find("a").each(function(){
		$(this).after("<img src='"+"girls/"+$(this).html().toLowerCase()+".jpg"+"'>");
	});
	
	$(".text_list1").find("a").each(function(){
		$(this).append("<img src='"+"girls/"+$(this).html().toLowerCase()+".jpg"+"'>");
	});

});
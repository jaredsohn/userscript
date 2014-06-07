// ==UserScript==
// @name        çoklu dönerme
// @namespace   çokldu önerme
// @description çoklud önerme
// @include     http://www.facebook.com/
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @include     http://www.facebook.com/ajax/*
// @include     https://www.facebook.com/ajax/*
// @include     http://www.facebook.com/
// @include     https://www.facebook.com/
// @require 	http://code.jquery.com/jquery-1.8.3.min.js
// @version     1
// ==/UserScript==
var html_text = "<input type='button' value='Çoklu Öner' class='onerme' style='position:fixed;top:95px;left:0px;z-index:9999'/>";


$("html,body").append(html_text);


$(".onerme").click(function(){

	//uiButton _1sm
	var element_arr = new Array();
	var element = $("._1sm");
	$.each(element , function(k,v){
		var pos = $(v);
		element_arr.push(pos);
	});
	
	var element_l = element_arr.length;
	for(var i = 0 ; i <= element_l; i++)
	{
		$(element_arr[i]).children(".uiButtonText").click();
	}
	alert("finish");
})

function hepsi()
{
	alert(2);
}



function scroll(){
	var d = $(".fbProfileBrowserResult").scrollTop();
	var f = d + 99999999;
	$(".fbProfileBrowserResult").scrollTop(Math.round(f));
}
setInterval(scroll,100);
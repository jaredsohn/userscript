// ==UserScript==
// @name        Reddit NSFW ON/OFF button
// @description Hides or showes NSFW content on reddit.
// @namespace   perrep.dk
// @include     http://www.reddit.com/*
// @version     1
// @require     http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==


 var tjeck = GM_getValue("tjeck");
		$("#header-bottom-right").append(" | <a href='#' class='nsfw' id='on'>NSFW On</a>");
		$("#header-bottom-right").append(" <a href='#' class='nsfw' id='off'>NSFW Off</a>");
		$(".nsfw").hide();
		 set();
		 changeAppend();
 function changeAppend(){
	if (tjeck == true){ 
 		$("#on").show();
 		$("#off").hide();
 	}
 	else {
 		$("#off").show();
 		$("#on").hide();
 	}
}
 
 function hideNSFW(){
	$(".nsfw-stamp").parent().parent().parent().css('display', 'none');
}
 
function showNSFW(){
 $(".nsfw-stamp").parent().parent().parent().css('display', 'block');
}
  $(".nsfw").live("click", function(){
  set();
  changeAppend();
 });
  function set() {
  		if (tjeck == false){
  		hideNSFW();
  		tjeck = true;
  		GM_setValue("tjeck", false);
  	}
  	else{
  		showNSFW();
  		tjeck = false;
  		GM_setValue("tjeck", true);
  	}
  }

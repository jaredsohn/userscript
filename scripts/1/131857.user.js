// ==UserScript==
// @name           noKincstura
// @include        http://www.geocaching.hu/*
// @version        0.1
// @description    A geocaching.hu oldalon talalhato Kincstura jatek reklambannereinek eltuntetese.
// @author         perRetZ
// @require		   http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==


$(document).ready(function(){
	$("img").each(function(){
		if($(this).attr("src").indexOf("unilever")>-1){
			$(this).remove();
		}
	})
	$("td").each(function(){
		if($(this).css("background-image").indexOf("unilever")>-1){
			$(this).css("background-image","");
		}
	})
})

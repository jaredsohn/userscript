// ==UserScript==
// @name           Animelist Quicksearch
// @namespace      MAL Mods
// @description    why load a new page if it can be done client side?
// @include        http://myanimelist.net/animelist/*
// @include        http://myanimelist.net/mangalist/*
// ==/UserScript==

$ = unsafeWindow.jQuery;

$("#search input").keyup(function () {
	doChange();
}).keyup();


function doChange(){
	
	var check = $("#searchBox").val().toString();	
	if((check != "Search") && (check != "")){
		
		var re = new RegExp('^'+check, 'i');
		
		$("#list_surround>table").each(function(){
		
			var hit = re.test($(".animetitle>span",this).html());
			
			if(hit || ($(".animetitle>span",this).html() == null))
				$(this).css("display", "inline-table");
			else 
				$(this).css("display", "none");
			
		});
	}
	else{
		$("table", "#list_surround").css("display", "inline-table");
	}
}
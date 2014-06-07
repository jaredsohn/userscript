// ==UserScript==
// @name           TimeGrip static header
// @namespace      paera.creuna
// @description    Fast tabellhuvud
// @include        http://timegrip.creuna.se/*
// ==/UserScript==

// set up jQuery variable
var $;

// Add jQuery
var GM_JQ = document.createElement("script");
GM_JQ.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
GM_JQ.type = "text/javascript";

document.body.appendChild(GM_JQ);

// Check if jQuery's loaded
var checker=setInterval(function(){
	if(typeof ($ = unsafeWindow.jQuery) != "undefined") {
		  clearInterval(checker);
		  letsJQuery();
	}
},100);


function letsJQuery() {
	
	if($("#allocationTable").length !== 0){
		var $button = $(document.createElement("button")).text("fäst tabellhuvud");
		
		$button.click(function(){
			var $table = $("#allocationTable");
			$table.css(
				{
				'display':'block',
				'overflow':'auto',
				'height':'500px'
				}
			);
			var $thead = $(document.createElement("tbody")).addClass("new-head");
			$table.find("tbody:first > tr:not(.row2)").find("td,th").each(function(){
				$(this).width($(this).width());
				
			});
			$thead.append($table.find("tbody:first > tr:not(.row2)").clone());
			$thead.css({'position':'fixed','background-color':'#fff'})
			$table.prepend($thead);

			return false;
		});
		
		$button.insertBefore($("#allocationTable"));
	}
}
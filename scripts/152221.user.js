// ==UserScript==
// @name           kaskusFusedNavbar
// @namespace      com.orangdalam.blogsome
// @version        1.0
// @description    Switch between Kaskus navbar and hot category navbar
// @include        http://www.kaskus.co.id/*
// @include        http://kaskus.co.id/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
$(document).ready(function(){
	var switchButton = '<li class="shortcut dropdown tools-panel"><a href="javascript:void(0);" id="fSwitch"><b><i>F</i></b></a></li>';
	var hcContainer = '<div id="hcContainer" style="display:none; z-index:999; position:fixed; top:0px; left:0px; right:0px; color:black !important"></div>';
	$("body").prepend(hcContainer);
	$("div.log-bar > ul").append(switchButton);
	$("#hot-cat").clone(true).appendTo("div#hcContainer");
	$("#fSwitch").click(function(){
		$("div.iee-header").hide('fast', function(){
			$("#hcContainer").show(800);
		});
		
	})
	$("#hcContainer").click(function(){
		$("#hcContainer").hide('fast', function(){
			$("div.iee-header").show(800);
		});
	})

})

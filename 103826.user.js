// ==UserScript==
// @name           Facebook Poll Percent
// @namespace      pollpercent
// @description    Show Percentage in Facebook Polls
// @include        http://*.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


$(function(){
	setInterval(addPercentage,3000);
})

function addPercentage(){
	$.each($('table.pollOptions .shaded'),function(){
		var w = this.style.width;
		var span = $(this).parent().find('.auxlabel span');
		var text = $(span).text();
		var percent = $(span).attr('percent');
		if(typeof percent == "undefined")
		$(span).text(w + " " + text).attr('percent','yes');
	});	
}
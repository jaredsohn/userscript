// ==UserScript==
// @name           Change title to current artist/song
// @namespace      jango
// @include        http://www.jango.com/*
// @require				 http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==


//Take care of things like &amp; being in a band name / title
String.prototype.unescapeHtml = function () {
    var temp = document.createElement("div");
    temp.innerHTML = this;
    var result = temp.childNodes[0].nodeValue;
    temp.removeChild(temp.firstChild)
    return result;
}

var newTitle, titleElem, artistElem, timerElem;
var title, artist, time;
var default_template = '%artist% - %title% [%time%]';
var alternate_1_template = '[%time%] - %artist% - %title%';
var alternate_2_template = '[%time%] - %title% - %artist%';
var current_template = default_template;

setInterval(function() {
	titleElem		= document.getElementById('current-song');
	artistElem	= document.getElementById('player_current_artist');
	timerElem		= document.getElementById('timer');
	
	if(titleElem && artistElem && artistElem.innerHtml != '') {
		time		= timerElem.innerHTML.replace(/-/, '');
		artist	= artistElem.innerHTML;
		title		= titleElem.innerHTML;
		newTitle = current_template.replace('%time%', time).replace('%artist%', artist).replace('%title%', title).unescapeHtml();
		if(top.document.title != newTitle) {
			top.document.title = newTitle;
		}
	}
}, 500);

jQuery(function($) {
	$("body").append("<div id='title_template_container' style='text-align: left; position: absolute; top: 20px; left: 20px;'></div>");
	$("#title_template_container").append('<label style="display: block;">Use template:</label><select id="template-select"><option value="0">%artist% - %title% [%time%]</option><option value="1">[%time%] - %artist% - %title%</option><option value="2">[%time%] - %title% - %artist%</option><option value="c">CUSTOM</option></select>');
	$("#title_template_container").append('<label style="display: block;">Custom Template:</label><input id="custom-template" />');
	$("#template-select").change(function() {
		if($(this).val() == default_template ||
				$(this).val() == alternate_1_template ||
				$(this).val() == alternate_2_template) {
			current_template = $(this).val();
		} else if($(this).val() == 'CUSTOM') {
			current_template = $("#custom-template").val();
		}
	});
});